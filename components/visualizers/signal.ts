export function makeSignal(seed = 1) {
  const a = 0.81 + seed * 0.07;
  const b = 1.13 + seed * 0.03;
  const c = 1.71 + seed * 0.05;
  return (t: number, i: number, n: number) => {
    const x = i / n;
    const env = 0.55 + 0.45 * Math.sin(t * 0.7 + x * 6.28 * 0.5);
    const s =
      Math.sin((x * 18.0 + t * a) * Math.PI * 2) * 0.45 +
      Math.sin((x * 32.0 - t * b) * Math.PI * 2) * 0.25 +
      Math.sin((x * 6.0 + t * c) * Math.PI * 2) * 0.30 +
      (Math.sin((x * 91.0 + t * 3.4) * Math.PI * 2) * 0.10);
    return Math.max(-1, Math.min(1, s * env));
  };
}

export function makeSpectrum(seed = 1) {
  const sig = makeSignal(seed);
  return (t: number, bins: number) => {
    const out = new Float32Array(bins);
    for (let i = 0; i < bins; i++) {
      const base = Math.abs(sig(t, i, bins));
      const tilt = Math.pow(1 - i / bins, 0.6) * 0.8 + 0.2;
      const flicker = 0.85 + 0.15 * Math.sin(t * 6 + i * 0.9);
      out[i] = Math.min(1, base * tilt * flicker * 1.4);
    }
    return out;
  };
}
