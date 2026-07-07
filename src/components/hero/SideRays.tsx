import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './SideRays.css';

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

type Origin = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const originToFlip = (origin: Origin): [number, number] => {
  switch (origin) {
    case 'top-left':     return [1, 0];
    case 'bottom-right': return [0, 1];
    case 'bottom-left':  return [1, 1];
    default:             return [0, 0];
  }
};

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

// GLSL shaders
const VERT = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 src, vec2 dir, vec2 coord, float sA, float sB, float spd) {
  vec2 d = coord - src;
  float c = dot(normalize(d), dir);
  return clamp(
    (0.45 + 0.15 * sin(c * sA + iTime * spd)) +
    (0.30 + 0.20 * cos(-c * sB + iTime * spd)),
    0.0, 1.0) *
    clamp((iResolution.x - length(d)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  if (iFlipX > 0.5) fc.x = iResolution.x - fc.x;
  if (iFlipY > 0.5) fc.y = iResolution.y - fc.y;
  vec2 coord = vec2(fc.x, iResolution.y - fc.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);
  float tr = iTilt * 3.14159265 / 180.0;
  float cs = cos(tr); float sn = sin(tr);
  vec2 rel = coord - rayPos;
  vec2 tc = vec2(rel.x*cs - rel.y*sn, rel.x*sn + rel.y*cs) + rayPos;
  float hs = iSpread * 0.275;
  vec2 d1 = normalize(vec2(cos(0.785398 + hs), sin(0.785398 + hs)));
  vec2 d2 = normalize(vec2(cos(0.785398 - hs), sin(0.785398 - hs)));
  vec4 r1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, d1, tc, 36.2214, 21.11349, iSpeed);
  vec4 r2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, d2, tc, 22.3991, 18.0234, iSpeed * 0.2);
  vec4 color = r1 * (1.0 - iBlend) * 0.9 + r2 * iBlend * 0.9;
  float dist = length(fc.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(dist, 0.001), iFalloff);
  color.rgb *= brightness;
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);
  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

export function SideRays({
  speed = 1.0,
  rayColor1 = '#8B5CF6',
  rayColor2 = '#3B82F6',
  intensity = 1.0,
  spread = 1.0,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.0,
  blend = 0.75,
  falloff = 2.0,
  opacity = 1.0,
  className = '',
}: SideRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer — only run WebGL when visible
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // WebGL init / teardown
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; }

    let cancelled = false;

    const init = async () => {
      await new Promise(r => setTimeout(r, 10));
      if (cancelled || !containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(gl.canvas);

      const [flipX, flipY] = originToFlip(origin);
      const uniforms: Record<string, { value: unknown }> = {
        iTime:       { value: 0 },
        iResolution: { value: [1, 1] },
        iSpeed:      { value: speed },
        iRayColor1:  { value: hexToRgb(rayColor1) },
        iRayColor2:  { value: hexToRgb(rayColor2) },
        iIntensity:  { value: intensity },
        iSpread:     { value: spread },
        iFlipX:      { value: flipX },
        iFlipY:      { value: flipY },
        iTilt:       { value: tilt },
        iSaturation: { value: saturation },
        iBlend:      { value: blend },
        iFalloff:    { value: falloff },
        iOpacity:    { value: opacity },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!containerRef.current || !rendererRef.current) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        (uniforms.iResolution.value as number[]) = [w * renderer.dpr, h * renderer.dpr];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current) return;
        (uniforms.iTime.value as number) = t * 0.001;
        try { renderer.render({ scene: mesh }); } catch { return; }
        rafRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener('resize', resize);
      resize();
      rafRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', resize);
        try {
          const ext = gl.getExtension('WEBGL_lose_context');
          if (ext) ext.loseContext();
          gl.canvas.parentNode?.removeChild(gl.canvas);
        } catch { /* noop */ }
        rendererRef.current = null;
        uniformsRef.current = null;
      };
    };

    init();
    return () => {
      cancelled = true;
      if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Prop updates without reinit
  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    const [flipX, flipY] = originToFlip(origin);
    u.iSpeed.value      = speed;
    u.iRayColor1.value  = hexToRgb(rayColor1);
    u.iRayColor2.value  = hexToRgb(rayColor2);
    u.iIntensity.value  = intensity;
    u.iSpread.value     = spread;
    u.iFlipX.value      = flipX;
    u.iFlipY.value      = flipY;
    u.iTilt.value       = tilt;
    u.iSaturation.value = saturation;
    u.iBlend.value      = blend;
    u.iFalloff.value    = falloff;
    u.iOpacity.value    = opacity;
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />;
}
