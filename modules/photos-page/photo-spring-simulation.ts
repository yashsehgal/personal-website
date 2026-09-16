import type { PhotoRestRect } from "@/modules/photos-page/photo-layout";

const STIFFNESS = 180;
const DAMPING = 24;
const DRAG_FOLLOW = 72;
const MIN_DRAG_SCALE = 0.9;
const FIELD_RADIUS = 280;
const RIPPLE_SPEED_THRESHOLD = 900;
const WAVE_SPEED = 1400;
const MAX_DT = 1 / 30;

export type SimPhoto = {
  id: string;
  src: string;
  alt: string;
  restX: number;
  restY: number;
  restW: number;
  restH: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  vsx: number;
  vsy: number;
  color: number;
  vColor: number;
  rippleApplied: boolean;
};

export type Ripple = {
  x: number;
  y: number;
  t: number;
  mag: number;
};

export type Simulation = {
  photos: SimPhoto[];
  width: number;
  height: number;
  draggedId: string | null;
  hoveredId: string | null;
  grabX: number;
  grabY: number;
  pointerX: number;
  pointerY: number;
  lastPointerX: number;
  lastPointerY: number;
  pointerVx: number;
  pointerVy: number;
  ripple: Ripple | null;
  time: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / Math.max(1e-5, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function springStep(position: number, velocity: number, target: number, dt: number) {
  const acceleration = (target - position) * STIFFNESS - velocity * DAMPING;
  const nextVelocity = velocity + acceleration * dt;
  const nextPosition = position + nextVelocity * dt;
  return { position: nextPosition, velocity: nextVelocity };
}

function restCenter(photo: SimPhoto) {
  return {
    x: photo.restX + photo.restW / 2,
    y: photo.restY + photo.restH / 2,
  };
}

export function createSimulation(
  rects: PhotoRestRect[],
  width: number,
  height: number,
): Simulation {
  return {
    photos: rects.map((rect) => ({
      id: rect.id,
      src: rect.src,
      alt: rect.alt,
      restX: rect.x,
      restY: rect.y,
      restW: rect.w,
      restH: rect.h,
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2,
      sx: 1,
      sy: 1,
      vx: 0,
      vy: 0,
      vsx: 0,
      vsy: 0,
      color: 0,
      vColor: 0,
      rippleApplied: false,
    })),
    width,
    height,
    draggedId: null,
    hoveredId: null,
    grabX: 0,
    grabY: 0,
    pointerX: 0,
    pointerY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    pointerVx: 0,
    pointerVy: 0,
    ripple: null,
    time: 0,
  };
}

export function applyRestLayout(
  simulation: Simulation,
  rects: PhotoRestRect[],
  width: number,
  height: number,
) {
  simulation.width = width;
  simulation.height = height;
  simulation.draggedId = null;
  simulation.ripple = null;

  const idsMatch =
    simulation.photos.length === rects.length &&
    simulation.photos.every((photo, index) => photo.id === rects[index]?.id);

  if (!idsMatch) {
    simulation.photos = createSimulation(rects, width, height).photos;
    return;
  }

  const nextById = new Map(rects.map((rect) => [rect.id, rect]));

  for (const photo of simulation.photos) {
    const rect = nextById.get(photo.id);
    if (!rect) {
      continue;
    }

    photo.restX = rect.x;
    photo.restY = rect.y;
    photo.restW = rect.w;
    photo.restH = rect.h;
    photo.x = rect.x + rect.w / 2;
    photo.y = rect.y + rect.h / 2;
    photo.sx = 1;
    photo.sy = 1;
    photo.vx = 0;
    photo.vy = 0;
    photo.vsx = 0;
    photo.vsy = 0;
    photo.rippleApplied = false;
  }
}

export function photoBounds(photo: SimPhoto) {
  const width = photo.restW * photo.sx;
  const height = photo.restH * photo.sy;
  return {
    left: photo.x - width / 2,
    top: photo.y - height / 2,
    width,
    height,
  };
}

export function hitTest(simulation: Simulation, x: number, y: number) {
  for (let index = simulation.photos.length - 1; index >= 0; index -= 1) {
    const photo = simulation.photos[index];
    const bounds = photoBounds(photo);
    if (
      x >= bounds.left &&
      x <= bounds.left + bounds.width &&
      y >= bounds.top &&
      y <= bounds.top + bounds.height
    ) {
      return photo.id;
    }
  }

  return null;
}

export function beginDrag(simulation: Simulation, id: string, x: number, y: number) {
  const photo = simulation.photos.find((item) => item.id === id);
  if (!photo) {
    return;
  }

  simulation.draggedId = id;
  simulation.hoveredId = id;
  simulation.grabX = x - photo.x;
  simulation.grabY = y - photo.y;
  simulation.pointerX = x;
  simulation.pointerY = y;
  simulation.lastPointerX = x;
  simulation.lastPointerY = y;
  simulation.pointerVx = 0;
  simulation.pointerVy = 0;
}

export function movePointer(simulation: Simulation, x: number, y: number, dt: number) {
  const safeDt = Math.max(dt, 1 / 120);
  simulation.pointerVx = (x - simulation.pointerX) / safeDt;
  simulation.pointerVy = (y - simulation.pointerY) / safeDt;
  simulation.lastPointerX = simulation.pointerX;
  simulation.lastPointerY = simulation.pointerY;
  simulation.pointerX = x;
  simulation.pointerY = y;

  if (!simulation.draggedId) {
    simulation.hoveredId = hitTest(simulation, x, y);
  }
}

export function endDrag(simulation: Simulation) {
  const dragged = simulation.photos.find((photo) => photo.id === simulation.draggedId);
  const speed = Math.hypot(simulation.pointerVx, simulation.pointerVy);

  if (dragged && speed > RIPPLE_SPEED_THRESHOLD) {
    simulation.ripple = {
      x: dragged.x,
      y: dragged.y,
      t: simulation.time,
      mag: clamp(speed / 2400, 0.35, 1),
    };
    for (const photo of simulation.photos) {
      photo.rippleApplied = false;
    }
  }

  simulation.draggedId = null;
}

function neighborTarget(
  photo: SimPhoto,
  dragged: SimPhoto,
  dragDx: number,
  dragDy: number,
  intensity: number,
) {
  const rest = restCenter(photo);
  const draggedRest = restCenter(dragged);
  const offsetX = rest.x - draggedRest.x;
  const offsetY = rest.y - draggedRest.y;
  const distance = Math.hypot(offsetX, offsetY) || 1;
  const normalX = offsetX / distance;
  const normalY = offsetY / distance;
  const dragLength = Math.hypot(dragDx, dragDy) || 1;
  const toward = Math.max(0, (dragDx * normalX + dragDy * normalY) / dragLength);
  const field = Math.exp(-distance / FIELD_RADIUS) * intensity;
  const aligned = field * (0.35 + 0.65 * toward);

  let targetX = rest.x + normalX * aligned * 48;
  let targetY = rest.y + normalY * aligned * 48;
  let targetSx = 1 - aligned * 0.22;
  let targetSy = 1 - aligned * 0.22;

  if (Math.abs(normalX) > Math.abs(normalY)) {
    targetSx -= aligned * 0.12;
  } else {
    targetSy -= aligned * 0.12;
  }

  const draggedWidth = dragged.restW * dragged.sx;
  const draggedHeight = dragged.restH * dragged.sy;
  const photoWidth = photo.restW * photo.sx;
  const photoHeight = photo.restH * photo.sy;
  const overlapX = (draggedWidth + photoWidth) / 2 - Math.abs(dragged.x - photo.x);
  const overlapY = (draggedHeight + photoHeight) / 2 - Math.abs(dragged.y - photo.y);

  if (overlapX > 0 && overlapY > 0) {
    const push = Math.min(overlapX, overlapY);
    targetX += normalX * push;
    targetY += normalY * push;
    targetSx *= 1 - Math.min(0.28, overlapX / Math.max(1, photo.restW));
    targetSy *= 1 - Math.min(0.28, overlapY / Math.max(1, photo.restH));
  }

  return {
    x: targetX,
    y: targetY,
    sx: clamp(targetSx, 0.55, 1),
    sy: clamp(targetSy, 0.55, 1),
  };
}

export function stepSimulation(simulation: Simulation, dt: number) {
  const step = Math.min(Math.max(dt, 0), MAX_DT);
  if (step <= 0) {
    return;
  }

  simulation.time += step;
  const dragged = simulation.photos.find((photo) => photo.id === simulation.draggedId);
  const draggedRest = dragged ? restCenter(dragged) : null;
  const dragDx = dragged ? simulation.pointerX - simulation.grabX - draggedRest!.x : 0;
  const dragDy = dragged ? simulation.pointerY - simulation.grabY - draggedRest!.y : 0;
  const dragLength = Math.hypot(dragDx, dragDy);
  const dragSize = dragged ? Math.max(dragged.restW, dragged.restH) : 1;
  const intensity = dragged ? smoothstep(0, dragSize * 0.85, dragLength) : 0;

  if (simulation.ripple) {
    const age = simulation.time - simulation.ripple.t;
    for (const photo of simulation.photos) {
      if (photo.rippleApplied) {
        continue;
      }

      const rest = restCenter(photo);
      const distance = Math.hypot(rest.x - simulation.ripple.x, rest.y - simulation.ripple.y);
      const delay = distance / WAVE_SPEED;
      if (age < delay) {
        continue;
      }

      photo.rippleApplied = true;
      const falloff = Math.exp(-distance / 480);
      const dirX = distance < 1 ? 0 : (rest.x - simulation.ripple.x) / distance;
      const dirY = distance < 1 ? 0 : (rest.y - simulation.ripple.y) / distance;
      const impulse = simulation.ripple.mag * falloff * 240;
      photo.vx += dirX * impulse;
      photo.vy += dirY * impulse;
      photo.vsx -= simulation.ripple.mag * falloff * 1.35;
      photo.vsy -= simulation.ripple.mag * falloff * 1.35;
    }

    if (age > 1.25) {
      simulation.ripple = null;
    }
  }

  for (const photo of simulation.photos) {
    const rest = restCenter(photo);
    let targetX = rest.x;
    let targetY = rest.y;
    let targetSx = 1;
    let targetSy = 1;
    const targetColor =
      photo.id === simulation.hoveredId || photo.id === simulation.draggedId ? 1 : 0;

    if (dragged && photo.id === dragged.id) {
      targetX = clamp(simulation.pointerX - simulation.grabX, 0, simulation.width);
      targetY = clamp(simulation.pointerY - simulation.grabY, 0, simulation.height);
      targetSx = MIN_DRAG_SCALE;
      targetSy = MIN_DRAG_SCALE;

      const follow = 1 - Math.exp(-DRAG_FOLLOW * step);
      photo.x = mix(photo.x, targetX, follow);
      photo.y = mix(photo.y, targetY, follow);
      photo.vx = simulation.pointerVx;
      photo.vy = simulation.pointerVy;

      const nextSx = springStep(photo.sx, photo.vsx, targetSx, step);
      const nextSy = springStep(photo.sy, photo.vsy, targetSy, step);
      const nextColor = springStep(photo.color, photo.vColor, targetColor, step);
      photo.sx = nextSx.position;
      photo.vsx = nextSx.velocity;
      photo.sy = nextSy.position;
      photo.vsy = nextSy.velocity;
      photo.color = nextColor.position;
      photo.vColor = nextColor.velocity;
      continue;
    } else if (dragged) {
      const neighbor = neighborTarget(photo, dragged, dragDx, dragDy, intensity);
      targetX = neighbor.x;
      targetY = neighbor.y;
      targetSx = neighbor.sx;
      targetSy = neighbor.sy;
    }

    const nextX = springStep(photo.x, photo.vx, targetX, step);
    const nextY = springStep(photo.y, photo.vy, targetY, step);
    const nextSx = springStep(photo.sx, photo.vsx, targetSx, step);
    const nextSy = springStep(photo.sy, photo.vsy, targetSy, step);
    const nextColor = springStep(photo.color, photo.vColor, targetColor, step);

    photo.x = nextX.position;
    photo.vx = nextX.velocity;
    photo.y = nextY.position;
    photo.vy = nextY.velocity;
    photo.sx = nextSx.position;
    photo.vsx = nextSx.velocity;
    photo.sy = nextSy.position;
    photo.vsy = nextSy.velocity;
    photo.color = nextColor.position;
    photo.vColor = nextColor.velocity;
  }
}
