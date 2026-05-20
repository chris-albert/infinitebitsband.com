import React, { useRef, useEffect } from 'react';
import { makeSignal } from './signal';

type Props = {
  palette: string[];
  speed?: number;
  density?: number;
  glow?: boolean;
  seed?: number;
  intensity?: number;
};

export default function Oscilloscope({ palette, speed = 1, density = 3, glow = true, seed = 1, intensity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const sigRef = useRef(makeSignal(seed));
  const speedRef = useRef(speed);
  const paletteRef = useRef(palette);
  const densityRef = useRef(density);
  const glowRef = useRef(glow);
  const intensityRef = useRef(intensity);
  const smoothIntensityRef = useRef(intensity);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { paletteRef.current = palette; }, [palette]);
  useEffect(() => { densityRef.current = density; }, [density]);
  useEffect(() => { glowRef.current = glow; }, [glow]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);
  useEffect(() => { sigRef.current = makeSignal(seed); }, [seed]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const r = cvs!.getBoundingClientRect();
      cvs!.width = Math.max(1, r.width * dpr);
      cvs!.height = Math.max(1, r.height * dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cvs);

    const start = performance.now();
    function tick(now: number) {
      const t = ((now - start) / 1000) * speedRef.current;
      const w = cvs!.width, h = cvs!.height;
      ctx!.fillStyle = 'rgba(10,10,10,0.18)';
      ctx!.fillRect(0, 0, w, h);

      // Smooth intensity transition
      smoothIntensityRef.current += (intensityRef.current - smoothIntensityRef.current) * 0.05;
      const amp = 0.35 * smoothIntensityRef.current;

      const n = Math.max(120, Math.floor(w / dpr / 4));
      const pal = paletteRef.current;
      const passes = Math.max(1, densityRef.current | 0);

      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';

      for (let p = 0; p < passes; p++) {
        const phase = t + p * 0.18;
        const color = pal[p % pal.length];
        ctx!.strokeStyle = color;
        ctx!.lineWidth = (1.2 + (passes - p) * 0.4) * dpr;
        if (glowRef.current) {
          ctx!.shadowBlur = 18 * dpr * smoothIntensityRef.current;
          ctx!.shadowColor = color;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.globalAlpha = (p === 0 ? 1 : 0.6 - p * 0.08) * Math.max(0.4, smoothIntensityRef.current);

        ctx!.beginPath();
        for (let i = 0; i <= n; i++) {
          const x = (i / n) * w;
          const v = sigRef.current(phase, i, n);
          const y = h / 2 + v * (h * amp);
          if (i === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }

      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
}
