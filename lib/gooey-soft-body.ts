import { rubberBand, type Vec2 } from "@/lib/gooey-math";

const COLS = 16;
const ROWS = 11;
const MAX_STRETCH = 148;
const SOLVER_ITERATIONS = 8;
const SETTLE_SPEED = 0.04;
const SETTLE_DRIFT = 0.55;
const RECOIL_STIFFNESS = 240;
const RECOIL_DAMPING = 9.2;
const SETTLE_STIFFNESS = 62;
const SETTLE_DAMPING = 11.5;
const GRAB_BLEND_DECAY = 1.15;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  restX: number;
  restY: number;
};

type DistanceConstraint = {
  a: number;
  b: number;
  rest: number;
};

type ReleasePhase = "recoil" | "settle";

function particleIndex(column: number, row: number) {
  return row * COLS + column;
}

function triangleArea(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export class GooeySoftBody {
  width = 0;
  height = 0;
  grabbing = false;

  private particles: Particle[] = [];
  private constraints: DistanceConstraint[] = [];
  private restArea = 0;
  private grabRestX = 0;
  private grabRestY = 0;
  private pointerX = 0;
  private pointerY = 0;
  private tipVx = 0;
  private tipVy = 0;
  private lastTipX = 0;
  private lastTipY = 0;
  private hasTipSample = false;
  private releasing = false;
  private releasePhase: ReleasePhase = "settle";
  private grabBlend = 0;
  private stretchDirX = 1;
  private stretchDirY = 0;
  private grabSigma = 48;

  resize(width: number, height: number) {
    const nextWidth = Math.max(width, 1);
    const nextHeight = Math.max(height, 1);
    const sameSize =
      Math.abs(nextWidth - this.width) < 0.5 &&
      Math.abs(nextHeight - this.height) < 0.5;

    if (sameSize && this.particles.length > 0) {
      return;
    }

    this.width = nextWidth;
    this.height = nextHeight;
    this.grabSigma = 0.52 * Math.min(nextWidth, nextHeight);
    this.particles = [];
    this.constraints = [];

    for (let row = 0; row < ROWS; row += 1) {
      for (let column = 0; column < COLS; column += 1) {
        const x = (column / (COLS - 1)) * nextWidth;
        const y = (row / (ROWS - 1)) * nextHeight;

        this.particles.push({
          x,
          y,
          px: x,
          py: y,
          restX: x,
          restY: y,
        });
      }
    }

    const addConstraint = (a: number, b: number) => {
      const left = this.particles[a];
      const right = this.particles[b];

      if (!left || !right) {
        return;
      }

      this.constraints.push({
        a,
        b,
        rest: Math.hypot(right.restX - left.restX, right.restY - left.restY),
      });
    };

    for (let row = 0; row < ROWS; row += 1) {
      for (let column = 0; column < COLS; column += 1) {
        if (column + 1 < COLS) {
          addConstraint(particleIndex(column, row), particleIndex(column + 1, row));
        }

        if (row + 1 < ROWS) {
          addConstraint(particleIndex(column, row), particleIndex(column, row + 1));
        }

        if (column + 1 < COLS && row + 1 < ROWS) {
          addConstraint(
            particleIndex(column, row),
            particleIndex(column + 1, row + 1),
          );
          addConstraint(
            particleIndex(column + 1, row),
            particleIndex(column, row + 1),
          );
        }
      }
    }

    this.restArea = this.measureArea();
    this.resetTip();
  }

  grab(x: number, y: number) {
    this.grabRestX = x;
    this.grabRestY = y;
    this.pointerX = x;
    this.pointerY = y;
    this.lastTipX = x;
    this.lastTipY = y;
    this.tipVx = 0;
    this.tipVy = 0;
    this.hasTipSample = false;
    this.grabbing = true;
    this.releasing = false;
    this.grabBlend = 1;
    this.releasePhase = "recoil";
  }

  drag(x: number, y: number) {
    const offset = rubberBand(x - this.grabRestX, y - this.grabRestY, MAX_STRETCH);

    this.pointerX = this.grabRestX + offset.x;
    this.pointerY = this.grabRestY + offset.y;
  }

  release() {
    if (!this.grabbing) {
      return;
    }

    this.grabbing = false;
    this.releasing = true;
    this.releasePhase = "recoil";
    this.grabBlend = 1;

    const dx = this.pointerX - this.grabRestX;
    const dy = this.pointerY - this.grabRestY;
    const length = Math.hypot(dx, dy) || 1;

    this.stretchDirX = dx / length;
    this.stretchDirY = dy / length;

    const snap = 720 + length * 6;
    this.tipVx -= this.stretchDirX * snap;
    this.tipVy -= this.stretchDirY * snap;

    for (const particle of this.particles) {
      const weight = this.weightAtRest(particle);

      if (weight < 0.02) {
        continue;
      }

      const targetX = this.grabRestX + (particle.restX - this.grabRestX);
      const targetY = this.grabRestY + (particle.restY - this.grabRestY);
      particle.px = particle.x - (targetX - particle.x) * weight * 0.28;
      particle.py = particle.y - (targetY - particle.y) * weight * 0.28;
    }
  }

  step(dt: number) {
    const clampedDt = Math.min(dt, 1 / 30);
    const viscosity = this.grabbing
      ? 9.5
      : this.releasePhase === "recoil"
        ? 2.6
        : mix(4.2, 2.8, this.grabBlend);
    const damping = Math.exp(-viscosity * clampedDt);
    const restStiffness = this.grabbing
      ? 0.035
      : mix(0.05, 0.024, this.grabBlend);
    const distanceStiffness = this.grabbing ? 0.42 : mix(0.5, 0.36, this.grabBlend);
    const areaStiffness = this.grabbing ? 0.18 : mix(0.28, 0.2, this.grabBlend);

    this.sampleTipVelocity(clampedDt);
    this.stepTip(clampedDt);

    for (const particle of this.particles) {
      const vx = (particle.x - particle.px) * damping;
      const vy = (particle.y - particle.py) * damping;
      particle.px = particle.x;
      particle.py = particle.y;
      particle.x += vx;
      particle.y += vy;
    }

    const grabStrength = this.grabbing ? 1 : this.grabBlend * 0.88;

    if (grabStrength > 0.001) {
      this.applyGrab(grabStrength);
    }

    for (let iteration = 0; iteration < SOLVER_ITERATIONS; iteration += 1) {
      this.solveDistances(distanceStiffness);
      this.solveRestShape(restStiffness);
      this.solveArea(areaStiffness);

      if (grabStrength > 0.001) {
        this.applyGrab(grabStrength);
      }
    }

    return this.isMoving();
  }

  writePositions(target: Float32Array) {
    for (let index = 0; index < this.particles.length; index += 1) {
      const particle = this.particles[index];

      if (!particle) {
        continue;
      }

      target[index * 2] = particle.x;
      target[index * 2 + 1] = particle.y;
    }
  }

  getCorners(): {
    topLeft: Vec2;
    topRight: Vec2;
    bottomLeft: Vec2;
    bottomRight: Vec2;
  } {
    const topLeft = this.particles[particleIndex(0, 0)];
    const topRight = this.particles[particleIndex(COLS - 1, 0)];
    const bottomLeft = this.particles[particleIndex(0, ROWS - 1)];
    const bottomRight = this.particles[particleIndex(COLS - 1, ROWS - 1)];

    return {
      topLeft: { x: topLeft?.x ?? 0, y: topLeft?.y ?? 0 },
      topRight: { x: topRight?.x ?? this.width, y: topRight?.y ?? 0 },
      bottomLeft: { x: bottomLeft?.x ?? 0, y: bottomLeft?.y ?? this.height },
      bottomRight: {
        x: bottomRight?.x ?? this.width,
        y: bottomRight?.y ?? this.height,
      },
    };
  }

  get cols() {
    return COLS;
  }

  get rows() {
    return ROWS;
  }

  get deformation() {
    if (this.grabbing) {
      return 1;
    }

    return Math.min(1, Math.max(this.grabBlend, this.maxDrift() / 14));
  }

  maxDrift() {
    let drift = 0;

    for (const particle of this.particles) {
      drift = Math.max(
        drift,
        Math.hypot(particle.x - particle.restX, particle.y - particle.restY),
      );
    }

    return drift;
  }

  private resetTip() {
    this.grabbing = false;
    this.releasing = false;
    this.grabBlend = 0;
    this.tipVx = 0;
    this.tipVy = 0;
    this.hasTipSample = false;
    this.releasePhase = "settle";
  }

  private sampleTipVelocity(dt: number) {
    if (!this.grabbing) {
      return;
    }

    if (this.hasTipSample) {
      this.tipVx = (this.pointerX - this.lastTipX) / dt;
      this.tipVy = (this.pointerY - this.lastTipY) / dt;
    }

    this.lastTipX = this.pointerX;
    this.lastTipY = this.pointerY;
    this.hasTipSample = true;
  }

  private stepTip(dt: number) {
    if (!this.releasing) {
      return;
    }

    const stiffness =
      this.releasePhase === "recoil" ? RECOIL_STIFFNESS : SETTLE_STIFFNESS;
    const damping =
      this.releasePhase === "recoil" ? RECOIL_DAMPING : SETTLE_DAMPING;
    const ax = (this.grabRestX - this.pointerX) * stiffness - this.tipVx * damping;
    const ay = (this.grabRestY - this.pointerY) * stiffness - this.tipVy * damping;

    this.tipVx += ax * dt;
    this.tipVy += ay * dt;
    this.pointerX += this.tipVx * dt;
    this.pointerY += this.tipVy * dt;

    const offsetX = this.pointerX - this.grabRestX;
    const offsetY = this.pointerY - this.grabRestY;
    const side = offsetX * this.stretchDirX + offsetY * this.stretchDirY;
    const distance = Math.hypot(offsetX, offsetY);
    const speed = Math.hypot(this.tipVx, this.tipVy);

    if (this.releasePhase === "recoil" && (side < -6 || (distance < 14 && speed < 70))) {
      this.releasePhase = "settle";
    }

    if (this.releasePhase === "settle" && distance < 22 && speed < 160) {
      this.grabBlend *= Math.exp(-GRAB_BLEND_DECAY * dt);

      if (this.grabBlend < 0.018) {
        this.grabBlend = 0;
        this.releasing = false;
      }
    }
  }

  private weightAtRest(particle: Particle) {
    const dx = particle.restX - this.grabRestX;
    const dy = particle.restY - this.grabRestY;
    return Math.exp(-(dx * dx + dy * dy) / (2 * this.grabSigma * this.grabSigma));
  }

  private applyGrab(strength: number) {
    for (const particle of this.particles) {
      const weight = this.weightAtRest(particle) * strength;

      if (weight < 0.012) {
        continue;
      }

      const targetX = this.pointerX + (particle.restX - this.grabRestX);
      const targetY = this.pointerY + (particle.restY - this.grabRestY);
      particle.x += (targetX - particle.x) * weight;
      particle.y += (targetY - particle.y) * weight;

      if (this.grabbing && weight > 0.55) {
        particle.px = particle.x;
        particle.py = particle.y;
      }
    }
  }

  private solveDistances(stiffness: number) {
    for (const constraint of this.constraints) {
      const a = this.particles[constraint.a];
      const b = this.particles[constraint.b];

      if (!a || !b) {
        continue;
      }

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 0.0001) {
        continue;
      }

      const difference = ((distance - constraint.rest) / distance) * 0.5 * stiffness;
      const ox = dx * difference;
      const oy = dy * difference;

      a.x += ox;
      a.y += oy;
      b.x -= ox;
      b.y -= oy;
    }
  }

  private solveRestShape(stiffness: number) {
    for (const particle of this.particles) {
      particle.x += (particle.restX - particle.x) * stiffness;
      particle.y += (particle.restY - particle.y) * stiffness;
    }
  }

  private solveArea(stiffness: number) {
    const area = this.measureArea();

    if (area === 0) {
      return;
    }

    const error = ((this.restArea - area) / this.restArea) * stiffness;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    for (const particle of this.particles) {
      particle.x += (particle.x - centerX) * error;
      particle.y += (particle.y - centerY) * error;
    }
  }

  private measureArea() {
    let area = 0;

    for (let row = 0; row < ROWS - 1; row += 1) {
      for (let column = 0; column < COLS - 1; column += 1) {
        const p00 = this.particles[particleIndex(column, row)];
        const p10 = this.particles[particleIndex(column + 1, row)];
        const p01 = this.particles[particleIndex(column, row + 1)];
        const p11 = this.particles[particleIndex(column + 1, row + 1)];

        if (!p00 || !p10 || !p01 || !p11) {
          continue;
        }

        area += triangleArea(p00.x, p00.y, p10.x, p10.y, p01.x, p01.y);
        area += triangleArea(p10.x, p10.y, p11.x, p11.y, p01.x, p01.y);
      }
    }

    return area;
  }

  private isMoving() {
    if (this.grabbing || this.releasing || this.grabBlend > 0.001) {
      return true;
    }

    for (const particle of this.particles) {
      const speed = Math.hypot(particle.x - particle.px, particle.y - particle.py);
      const drift = Math.hypot(
        particle.x - particle.restX,
        particle.y - particle.restY,
      );

      if (speed > SETTLE_SPEED || drift > SETTLE_DRIFT) {
        return true;
      }
    }

    return false;
  }
}

export { COLS as GOOEY_COLS, ROWS as GOOEY_ROWS };
