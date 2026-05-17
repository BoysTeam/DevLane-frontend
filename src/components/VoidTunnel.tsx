import { useRef, useEffect } from 'react';

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_speed;
uniform float u_darkness;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float star(vec2 uv, float flare) {
  float d = length(uv);
  float m = u_darkness * 0.01 / d;
  m *= smoothstep(0.5, 0.1, d);
  float flare_term = pow(max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0)), 2.0) * flare;
  flare_term += max(0.0, 1.0 - abs(uv.x * 20.0)) * 0.2 * flare;
  flare_term += max(0.0, 1.0 - abs(uv.y * 20.0)) * 0.2 * flare;
  return m + max(0.0, 1.0 - d) * flare * 0.1 + flare_term;
}

float starLayer(vec2 uv) {
  uv *= 15.0;
  vec2 id = floor(uv);
  vec2 f = fract(uv) - 0.5;
  float rnd = hash(id);
  if (rnd > 0.95) {
    f.x += sin(u_time * 0.5 + id.y * 10.0) * 0.2;
    f.y += cos(u_time * 0.5 + id.x * 10.0) * 0.2;
    return star(f, smoothstep(0.95, 1.0, rnd));
  }
  return 0.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  float t = u_time * u_speed;
  vec2 tunnelUV = vec2(angle / 6.2831 + 0.5, 1.0 / (radius + 0.05) - t);
  float wobble = sin(tunnelUV.y * 0.5 + t) * 0.02 + sin(angle * 3.0 + t * 0.5) * 0.01;
  tunnelUV.x += wobble;
  float darknessFactor = mix(1.5, 0.3, u_darkness);
  vec3 col = vec3(0.0);
  float layers = 3.0;
  for (float i = 0.0; i < 3.0; i++) {
    float fi = i / layers;
    float speed = 0.1 + fi * 0.2;
    vec2 layerUV = tunnelUV * (1.0 + fi * 0.5) + vec2(t * speed, -t * speed);
    float stars = starLayer(layerUV);
    col += vec3(0.4 + fi * 0.3, 0.3 + fi * 0.2, 0.8 - fi * 0.2) * stars * darknessFactor;
  }
  col.r += max(0.0, 1.0 - radius * 2.0) * 0.05;
  col.b += max(0.0, 1.0 - radius * 1.5) * 0.05;
  float vig = 1.0 - dot(uv, uv) * 0.8;
  col *= max(0.0, vig);
  col = mix(col, vec3(0.02, 0.0, 0.05), smoothstep(0.2, 1.0, radius));
  col += vec3(0.1, 0.05, 0.15) * (1.0 - radius) * 0.1;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function VoidTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShader, gl.FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uDarkness = gl.getUniformLocation(program, 'u_darkness');

    gl.uniform1f(uSpeed, 0.2);
    gl.uniform1f(uDarkness, 0.8);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
