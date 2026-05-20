import React, { useRef, useEffect } from 'react';
import { makeSpectrum } from './signal';

type Props = {
  palette: string[];
  speed?: number;
  bins?: number;
  mode?: 'rainbow' | 'cycle';
  intensity?: number;
};

export default function SpectrumBars({ palette, speed = 1, bins = 64, mode = 'rainbow', intensity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const specRef = useRef(makeSpectrum(2));
  const speedRef = useRef(speed);
  const paletteRef = useRef(palette);
  const modeRef = useRef(mode);
  const binsRef = useRef(bins);
  const intensityRef = useRef(intensity);
  const smoothIntensityRef = useRef(intensity);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { paletteRef.current = palette; }, [palette]);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { binsRef.current = bins; }, [bins]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

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
    let smooth: Float32Array | null = null;
    let peaks: Float32Array | null = null;

    function tick(now: number) {
      const t = ((now - start) / 1000) * speedRef.current;
      const w = cvs!.width, h = cvs!.height;
      ctx!.clearRect(0, 0, w, h);

      // Smooth intensity transition
      smoothIntensityRef.current += (intensityRef.current - smoothIntensityRef.current) * 0.05;
      const si = smoothIntensityRef.current;

      const n = binsRef.current;
      if (!smooth || smooth.length !== n) { smooth = new Float32Array(n); peaks = new Float32Array(n); }
      const data = specRef.current(t, n);
      const gap = 2 * dpr;
      const bw = (w - gap * (n - 1)) / n;
      const pal = paletteRef.current;

      for (let i = 0; i < n; i++) {
        smooth[i] = smooth[i] * 0.75 + data[i] * 0.25;
        const v = smooth[i] * si;
        if (v > peaks![i]) peaks![i] = v;
        else peaks![i] = Math.max(0, peaks![i] - 0.008);
        const bh = v * h * 0.95;
        const x = i * (bw + gap);
        const y = h - bh;

        if (modeRef.current === 'rainbow') {
          const grd = ctx!.createLinearGradient(0, h, 0, 0);
          for (let g = 0; g < pal.length; g++) {
            grd.addColorStop(g / (pal.length - 1), pal[g]);
          }
          ctx!.fillStyle = grd;
        } else {
          ctx!.fillStyle = pal[i % pal.length];
        }
        ctx!.fillRect(x, y, bw, bh);

        const py = h - peaks![i] * h * 0.95;
        ctx!.fillStyle = pal[pal.length - 1];
        ctx!.fillRect(x, py - 1.5 * dpr, bw, 1.5 * dpr);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
}
