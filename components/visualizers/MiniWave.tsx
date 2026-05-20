import React, { useRef, useEffect } from 'react';
import { makeSignal } from './signal';

type Props = {
  palette: string[];
  speed?: number;
  seed?: number;
  height?: number;
};

export default function MiniWave({ palette, speed = 1, seed = 1, height = 36 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
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

    const sig = makeSignal(seed);
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = ((now - start) / 1000) * speed;
      const w = cvs!.width, h = cvs!.height;
      ctx!.clearRect(0, 0, w, h);
      const n = Math.floor(w / dpr / 2);
      for (let i = 0; i < n; i++) {
        const v = Math.abs(sig(t, i, n));
        const bh = v * h * 0.85;
        const colorIdx = Math.floor((i / n) * (palette.length - 1));
        ctx!.fillStyle = palette[colorIdx];
        const x = (i / n) * w;
        ctx!.fillRect(x, (h - bh) / 2, Math.max(1, w / n - 1 * dpr), bh);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [palette, speed, seed]);

  return <canvas ref={ref} style={{ display: 'block', width: '100%', height }} />;
}
