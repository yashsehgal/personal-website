"use client";

import {
  applyRestLayout,
  beginDrag,
  createSimulation,
  endDrag,
  hitTest,
  movePointer,
  stepSimulation,
  type Simulation,
} from "@/modules/photos-page/photo-spring-simulation";
import {
  layoutPhotoRects,
  type PhotoInput,
} from "@/modules/photos-page/photo-layout";
import { PHOTOS } from "@/modules/photos-page/photos";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";

const MAX_TEXTURE_EDGE = 1024;

type PhotosDragGalleryProps = {
  photos: readonly PhotoInput[];
};

function limitTextureImage(image: HTMLImageElement, maxEdge: number) {
  const longest = Math.max(image.width, image.height);
  if (longest <= maxEdge) {
    return image;
  }

  const scale = maxEdge / longest;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    return image;
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function usePhotoTextures(srcs: readonly string[]) {
  const [textures, setTextures] = useState<Record<string, THREE.Texture>>({});

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    const loaded: THREE.Texture[] = [];

    srcs.forEach((src) => {
      loader.load(src, (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }

        const image = texture.image as HTMLImageElement;
        texture.image = limitTextureImage(image, MAX_TEXTURE_EDGE) as typeof texture.image;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        loaded.push(texture);
        setTextures((current) => ({ ...current, [src]: texture }));
      });
    });

    return () => {
      cancelled = true;
      loaded.forEach((texture) => texture.dispose());
    };
  }, [srcs]);

  return textures;
}

type ManualOrthographicCamera = THREE.OrthographicCamera & { manual?: boolean };

function fitOrthographicCamera(
  camera: THREE.Camera,
  width: number,
  height: number,
) {
  const orthographic = camera as ManualOrthographicCamera;
  orthographic.manual = true;
  orthographic.left = 0;
  orthographic.right = width;
  orthographic.top = 0;
  orthographic.bottom = -height;
  orthographic.near = 0.1;
  orthographic.far = 1000;
  orthographic.position.set(0, 0, 10);
  orthographic.rotation.set(0, 0, 0);
  orthographic.updateProjectionMatrix();
}

function FitCamera({ width, height }: { width: number; height: number }) {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    fitOrthographicCamera(camera, width, height);
  }, [camera, height, width]);

  return null;
}

function PhotoMeshes({
  simulation,
  textures,
}: {
  simulation: Simulation;
  textures: Record<string, THREE.Texture>;
}) {
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const materialRefs = useRef<Array<THREE.MeshBasicMaterial | null>>([]);

  useFrame((_, delta) => {
    stepSimulation(simulation, delta);

    simulation.photos.forEach((photo, index) => {
      const mesh = meshRefs.current[index];
      const material = materialRefs.current[index];
      if (!mesh) {
        return;
      }

      mesh.position.set(
        photo.x,
        -photo.y,
        photo.id === simulation.draggedId ? 2 : 0,
      );
      mesh.scale.set(photo.restW * photo.sx, photo.restH * photo.sy, 1);
      if (material) {
        const amount = material.userData.uColorAmount as { value: number } | undefined;
        if (amount) {
          amount.value = photo.color;
        }
      }
    });
  });

  return (
    <>
      {simulation.photos.map((photo, index) => {
        const texture = textures[photo.src];
        if (!texture) {
          return null;
        }

        return (
          <mesh
            key={photo.id}
            ref={(node) => {
              meshRefs.current[index] = node;
            }}
            position={[photo.x, -photo.y, 0]}
            scale={[photo.restW, photo.restH, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              ref={(node) => {
                materialRefs.current[index] = node;
                if (node && !node.userData.uColorAmount) {
                  node.userData.uColorAmount = { value: photo.color };
                }
              }}
              map={texture}
              side={THREE.DoubleSide}
              toneMapped={false}
              customProgramCacheKey={() => "photo-luma-mix"}
              onBeforeCompile={(shader) => {
                const material = materialRefs.current[index];
                const amount = material?.userData.uColorAmount ?? { value: 0 };
                if (material) {
                  material.userData.uColorAmount = amount;
                }
                shader.uniforms.uColorAmount = amount;
                shader.fragmentShader = shader.fragmentShader
                  .replace(
                    "#include <common>",
                    "#include <common>\nuniform float uColorAmount;",
                  )
                  .replace(
                    "#include <map_fragment>",
                    /* glsl */ `
                    #include <map_fragment>
                    float luma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
                    diffuseColor.rgb = mix(vec3(luma), diffuseColor.rgb, uColorAmount);
                    `,
                  );
              }}
            />
          </mesh>
        );
      })}
    </>
  );
}

function localPoint(
  element: HTMLElement,
  event: ReactPointerEvent<HTMLDivElement>,
) {
  const bounds = element.getBoundingClientRect();
  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  };
}

export function PhotosDragGallery({ photos = PHOTOS }: PhotosDragGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<Simulation | null>(null);
  const lastMoveRef = useRef(0);
  const srcs = useMemo(() => photos.map((photo) => photo.src), [photos]);
  const textures = usePhotoTextures(srcs);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width <= 0) {
        return;
      }

      const layout = layoutPhotoRects(photos, width);
      setSize((current) =>
        current.width === width && current.height === layout.height
          ? current
          : { width, height: layout.height },
      );

      if (simulationRef.current) {
        applyRestLayout(simulationRef.current, layout.rects, width, layout.height);
        return;
      }

      const next = createSimulation(layout.rects, width, layout.height);
      simulationRef.current = next;
      setSimulation(next);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [photos]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = simulationRef.current;
    const element = wrapperRef.current;
    if (!current || !element) {
      return;
    }

    const point = localPoint(element, event);
    const id = hitTest(current, point.x, point.y);
    if (!id) {
      return;
    }

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic or already-released pointers can throw; dragging still works.
    }
    beginDrag(current, id, point.x, point.y);
    lastMoveRef.current = performance.now();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = simulationRef.current;
    const element = wrapperRef.current;
    if (!current || !element) {
      return;
    }

    const now = performance.now();
    const dt = Math.min(0.05, (now - lastMoveRef.current) / 1000);
    lastMoveRef.current = now;
    const point = localPoint(element, event);
    movePointer(current, point.x, point.y, dt);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = simulationRef.current;
    if (!current) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer may already have been released.
      }
    }

    const elapsed = (performance.now() - lastMoveRef.current) / 1000;
    if (elapsed > 0.05) {
      current.pointerVx = 0;
      current.pointerVy = 0;
    }

    endDrag(current);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full select-none"
      style={{
        height: size.height > 0 ? size.height : undefined,
        minHeight: size.height > 0 ? undefined : 320,
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onPointerLeave={() => {
        const current = simulationRef.current;
        if (current && !current.draggedId) {
          current.hoveredId = null;
        }
      }}
    >
      {simulation && size.width > 0 && size.height > 0 ? (
        <Canvas
          orthographic
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{
            position: [0, 0, 10],
            left: 0,
            right: size.width,
            top: 0,
            bottom: -size.height,
            near: 0.1,
            far: 1000,
          }}
          style={{ pointerEvents: "none", width: "100%", height: "100%" }}
        >
          <FitCamera width={size.width} height={size.height} />
          <PhotoMeshes simulation={simulation} textures={textures} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default PhotosDragGallery;
