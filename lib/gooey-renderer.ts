import {
  BufferAttribute,
  BufferGeometry,
  Color,
  LinearFilter,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  SRGBColorSpace,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";

const VERTEX = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BLOB_FRAGMENT = `
varying vec2 vUv;

uniform vec2 uSize;
uniform float uRadius;
uniform float uInflate;

float sdRoundedBox(vec2 position, vec2 halfSize, float radius) {
  vec2 q = abs(position) - halfSize + radius;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
}

void main() {
  vec2 point = (vUv - 0.5) * uSize;
  float distance = sdRoundedBox(point, uSize * 0.5, uRadius) - uInflate;
  float alpha = 1.0 - smoothstep(-1.2, 1.2, distance);
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
`;

const BLUR_FRAGMENT = `
varying vec2 vUv;

uniform sampler2D uMap;
uniform vec2 uDirection;
uniform float uRadius;

void main() {
  vec2 texel = uDirection * uRadius;
  float alpha = texture2D(uMap, vUv).a * 0.227027;
  alpha += texture2D(uMap, vUv + texel).a * 0.1945946;
  alpha += texture2D(uMap, vUv - texel).a * 0.1945946;
  alpha += texture2D(uMap, vUv + texel * 2.0).a * 0.1216216;
  alpha += texture2D(uMap, vUv - texel * 2.0).a * 0.1216216;
  alpha += texture2D(uMap, vUv + texel * 3.0).a * 0.054054;
  alpha += texture2D(uMap, vUv - texel * 3.0).a * 0.054054;
  alpha += texture2D(uMap, vUv + texel * 4.0).a * 0.016216;
  alpha += texture2D(uMap, vUv - texel * 4.0).a * 0.016216;
  gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
`;

const COMPOSITE_FRAGMENT = `
varying vec2 vUv;

uniform sampler2D uMap;
uniform vec3 uColor;
uniform vec3 uHighlight;
uniform float uThreshold;
uniform float uSoftness;

void main() {
  float field = texture2D(uMap, vUv).a;
  float alpha = smoothstep(uThreshold - uSoftness, uThreshold + uSoftness, field);
  float rim = smoothstep(uThreshold - 0.04, uThreshold + 0.1, field)
    - smoothstep(uThreshold + 0.08, uThreshold + 0.42, field);
  float sheen = smoothstep(0.72, 0.18, vUv.y) * 0.045 * alpha;
  vec3 color = uColor + uHighlight * (rim * 0.18 + sheen);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

function parseCssRgb(color: string): [number, number, number, number] {
  const match = color.match(/rgba?\(([^)]+)\)/);

  if (!match?.[1]) {
    return [0.145, 0.145, 0.145, 0.94];
  }

  const parts = match[1].split(/[\s,/]+/).filter(Boolean);
  const red = Number(parts[0] ?? 37) / 255;
  const green = Number(parts[1] ?? 37) / 255;
  const blue = Number(parts[2] ?? 37) / 255;
  const alpha = parts[3] === undefined ? 0.94 : Number(parts[3]);

  return [red, green, blue, Number.isFinite(alpha) ? alpha : 0.94];
}

export function readSurfaceColor(element: HTMLElement): [number, number, number] {
  const view = element.ownerDocument.defaultView;

  if (!view) {
    return [0.145, 0.145, 0.145];
  }

  const token = view.getComputedStyle(element).getPropertyValue("--background").trim();
  const probe = element.ownerDocument.createElement("span");
  probe.style.backgroundColor = token || "canvas";
  element.ownerDocument.body.append(probe);
  const computed = view.getComputedStyle(probe).backgroundColor;
  probe.remove();

  const [red, green, blue] = parseCssRgb(computed);
  return [red, green, blue];
}

export class GooeyRenderer {
  readonly canvas: HTMLCanvasElement;

  private renderer: WebGLRenderer;
  private camera: OrthographicCamera;
  private blobScene = new Scene();
  private effectScene = new Scene();
  private blobGeometry: PlaneGeometry;
  private blobMesh: Mesh;
  private blobMaterial: ShaderMaterial;
  private blurMaterial: ShaderMaterial;
  private compositeMaterial: ShaderMaterial;
  private effectMesh: Mesh;
  private targetA: WebGLRenderTarget;
  private targetB: WebGLRenderTarget;
  private pad: number;
  private cols: number;
  private rows: number;
  private playerWidth = 1;
  private playerHeight = 1;
  private pixelRatio = 1;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, cols: number, rows: number, pad: number) {
    this.canvas = canvas;
    this.cols = cols;
    this.rows = rows;
    this.pad = pad;

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setClearColor(new Color(0, 0, 0), 0);
    this.renderer.autoClear = false;

    this.camera = new OrthographicCamera(0, 1, 0, 1, -1, 1);

    this.blobGeometry = new PlaneGeometry(1, 1, cols - 1, rows - 1);
    this.blobMaterial = new ShaderMaterial({
      uniforms: {
        uSize: { value: new Vector2(1, 1) },
        uRadius: { value: 20 },
        uInflate: { value: 1.6 },
      },
      vertexShader: VERTEX,
      fragmentShader: BLOB_FRAGMENT,
      transparent: true,
      toneMapped: false,
      depthTest: false,
      depthWrite: false,
    });
    this.blobMesh = new Mesh(this.blobGeometry, this.blobMaterial);
    this.blobScene.add(this.blobMesh);

    const effectGeometry = new BufferGeometry();
    effectGeometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]), 3),
    );
    effectGeometry.setAttribute(
      "uv",
      new BufferAttribute(new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2),
    );
    effectGeometry.setIndex([0, 2, 1, 1, 2, 3]);

    this.blurMaterial = new ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uDirection: { value: new Vector2(0, 0) },
        uRadius: { value: 1 },
      },
      vertexShader: VERTEX,
      fragmentShader: BLUR_FRAGMENT,
      toneMapped: false,
      depthTest: false,
      depthWrite: false,
    });
    this.compositeMaterial = new ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uColor: { value: new Color().setRGB(0.145, 0.145, 0.145, SRGBColorSpace) },
        uHighlight: { value: new Color().setRGB(1, 1, 1, SRGBColorSpace) },
        uThreshold: { value: 0.42 },
        uSoftness: { value: 0.12 },
      },
      vertexShader: VERTEX,
      fragmentShader: COMPOSITE_FRAGMENT,
      transparent: true,
      toneMapped: false,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
    });
    this.effectMesh = new Mesh(effectGeometry, this.blurMaterial);
    this.effectScene.add(this.effectMesh);

    this.targetA = this.createTarget(1, 1);
    this.targetB = this.createTarget(1, 1);
  }

  setSize(playerWidth: number, playerHeight: number, pixelRatio: number) {
    this.playerWidth = playerWidth;
    this.playerHeight = playerHeight;
    this.pixelRatio = Math.min(pixelRatio, 2);

    const width = playerWidth + this.pad * 2;
    const height = playerHeight + this.pad * 2;

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.style.left = `${-this.pad}px`;
    this.canvas.style.top = `${-this.pad}px`;

    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(width, height, false);
    this.camera.right = width;
    this.camera.bottom = height;
    this.camera.updateProjectionMatrix();

    const bufferWidth = Math.max(1, Math.round(width * this.pixelRatio));
    const bufferHeight = Math.max(1, Math.round(height * this.pixelRatio));
    this.targetA.setSize(bufferWidth, bufferHeight);
    this.targetB.setSize(bufferWidth, bufferHeight);

    this.blobMaterial.uniforms.uSize?.value.set(playerWidth, playerHeight);
    this.effectMesh.scale.set(width, height, 1);
  }

  setAppearance(color: [number, number, number], radius: number, inflate: number) {
    if (this.blobMaterial.uniforms.uRadius) {
      this.blobMaterial.uniforms.uRadius.value = radius;
    }

    if (this.blobMaterial.uniforms.uInflate) {
      this.blobMaterial.uniforms.uInflate.value = inflate;
    }

    this.compositeMaterial.uniforms.uColor?.value.setRGB(
      color[0],
      color[1],
      color[2],
      SRGBColorSpace,
    );
  }

  updateVertices(positions: Float32Array) {
    const attribute = this.blobGeometry.attributes.position;

    if (!attribute) {
      return;
    }

    for (let index = 0; index < this.cols * this.rows; index += 1) {
      attribute.setXYZ(
        index,
        (positions[index * 2] ?? 0) + this.pad,
        (positions[index * 2 + 1] ?? 0) + this.pad,
        0,
      );
    }

    attribute.needsUpdate = true;
  }

  render() {
    if (this.disposed) {
      return;
    }

    const width = this.playerWidth + this.pad * 2;
    const height = this.playerHeight + this.pad * 2;
    const texelX = 1 / Math.max(width * this.pixelRatio, 1);
    const texelY = 1 / Math.max(height * this.pixelRatio, 1);

    this.renderer.setRenderTarget(this.targetA);
    this.renderer.clear();
    this.renderer.render(this.blobScene, this.camera);

    this.effectMesh.material = this.blurMaterial;

    if (this.blurMaterial.uniforms.uMap) {
      this.blurMaterial.uniforms.uMap.value = this.targetA.texture;
    }

    this.blurMaterial.uniforms.uDirection?.value.set(texelX, 0);

    if (this.blurMaterial.uniforms.uRadius) {
      this.blurMaterial.uniforms.uRadius.value = 2.4;
    }

    this.renderer.setRenderTarget(this.targetB);
    this.renderer.clear();
    this.renderer.render(this.effectScene, this.camera);

    if (this.blurMaterial.uniforms.uMap) {
      this.blurMaterial.uniforms.uMap.value = this.targetB.texture;
    }

    this.blurMaterial.uniforms.uDirection?.value.set(0, texelY);
    this.renderer.setRenderTarget(this.targetA);
    this.renderer.clear();
    this.renderer.render(this.effectScene, this.camera);

    this.effectMesh.material = this.compositeMaterial;

    if (this.compositeMaterial.uniforms.uMap) {
      this.compositeMaterial.uniforms.uMap.value = this.targetA.texture;
    }
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.effectScene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.blobGeometry.dispose();
    this.blobMaterial.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();
    this.effectMesh.geometry.dispose();
    this.targetA.dispose();
    this.targetB.dispose();
    this.renderer.dispose();
  }

  private createTarget(width: number, height: number) {
    const target = new WebGLRenderTarget(width, height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
    target.texture.colorSpace = NoColorSpace;
    return target;
  }
}
