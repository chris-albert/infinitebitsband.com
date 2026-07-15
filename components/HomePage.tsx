import React from 'react';
import dynamic from 'next/dynamic';
import { BAND, PALETTES } from '../lib/content';
import useSoundCloudPlayer, { formatTime } from '../hooks/useSoundCloudPlayer';

const Oscilloscope = dynamic(() => import('./visualizers/Oscilloscope'), { ssr: false });
const SpectrumBars = dynamic(() => import('./visualizers/SpectrumBars'), { ssr: false });
const MiniWave = dynamic(() => import('./visualizers/MiniWave'), { ssr: false });
const NowPlayingBar = dynamic(() => import('./NowPlayingBar'), { ssr: false });

/* Social SVG icon paths (viewBox 0 0 24 24) */
const SOCIAL_ICONS: Record<string, string> = {
  instagram:
    'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
  spotify:
    'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  bandcamp:
    'M0 18.75l7.437-13.5H24l-7.438 13.5H0z',
  soundcloud:
    'M11.56 8.87V17h8.76a3.12 3.12 0 0 0 .72-6.17c-.28-2.81-2.65-5.02-5.55-5.02-1.14 0-2.2.35-3.08.96-.16.11-.19.15-.19.33v.77h-.01.35zm-1.23-.35v8.48h.56V8.37c-.2.04-.39.09-.56.15zm-1.2.94v7.54h.57V9.03a6.53 6.53 0 0 0-.57.43zm-1.19 1.7v5.84h.57V11.5c-.2.2-.39.42-.57.66zm-1.2 1.86v3.98h.58v-4.2a8.1 8.1 0 0 0-.58.22zM5.55 14v3h.57v-3.28c-.2.07-.39.17-.57.28zm-1.2.78v2.2h.58v-2.04a2.45 2.45 0 0 0-.58-.16zm-1.2.38v1.84h.58v-1.8c-.2.01-.39-.01-.58-.04zm-1.19.1v1.59c.08.06.17.11.27.15.1.03.2.04.3.04v-1.96a1.15 1.15 0 0 0-.57.18z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  'apple music':
    'M15.5 2.1c-.3-.1-.5 0-.7.1l-7 3.2c-.3.1-.5.4-.5.7v9.4c-.6-.4-1.3-.5-2-.5-1.9 0-3.3 1.2-3.3 2.8S3.4 20.5 5.3 20.5s3.3-1.2 3.3-2.7V9.4l5.7-2.6v6.7c-.6-.4-1.3-.5-2-.5-1.9 0-3.3 1.2-3.3 2.8s1.4 2.7 3.3 2.7 3.3-1.2 3.3-2.7V2.8c0-.3-.1-.6-.4-.7h-.2z',
};

/* Render a social icon SVG with CMB background via mask */
function SocialIcon({ name }: { name: string }) {
  const path = SOCIAL_ICONS[name];
  if (!path) return <span className="glyph">{name}</span>;
  const viewBox = '0 0 24 24';
  const id = `cmb-${name.replace(/\s+/g, '-')}`;
  return (
    <svg className="glyph-icon" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id={id}>
          <rect width="100%" height="100%" fill="black" />
          <path d={path} fill="white" />
        </mask>
      </defs>
      <image
        href="/images/Cosmic_Microwave_Background_(CMB).jpeg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        mask={`url(#${id})`}
      />
    </svg>
  );
}

const palette = PALETTES.cosmic;
const speed = 1;
const density = 4;
const accent = palette[Math.floor(palette.length / 2) + 1]; // #7ec8e3
const warm = palette[palette.length - 2]; // #e76f51

export default function HomePage() {
  const [player, controls] = useSoundCloudPlayer(BAND.lp.tracks);

  const css = `
    .c-root { --bg: #07080a; --panel: #0e1014; --fg: #e8e6e1; --dim: #7a7872; --line: rgba(255,255,255,0.08);
      --line-bright: rgba(255,255,255,0.18);
      background: var(--bg); color: var(--fg); font-family: 'JetBrains Mono', ui-monospace, monospace;
      width: 100%; min-height: 100vh; font-size: 13px;
      padding: 16px;
      ${player.currentTrack ? 'padding-bottom: 80px;' : ''}
    }
    .c-rack { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }

    .c-panel { background: var(--panel); border: 1px solid var(--line); position: relative; overflow: hidden;
      display: flex; flex-direction: column;
    }
    .c-bar { display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; border-bottom: 1px solid var(--line);
      font-size: 9px; letter-spacing: 0.28em; color: var(--dim);
      background: rgba(255,255,255,0.02);
    }
    .c-bar .id { color: var(--fg); }
    .c-bar .leds { display: flex; gap: 4px; }
    .c-bar .led { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.1); }
    .c-bar .led.on { background: ${accent}; box-shadow: 0 0 6px ${accent}; }
    .c-bar .led.warm { background: ${warm}; box-shadow: 0 0 6px ${warm}; }
    .c-body { padding: 16px; flex: 1; position: relative; }

    /* HERO PANEL */
    .c-hero { grid-column: span 12; height: 540px; }
    .c-hero .c-body { padding: 0; }
    .c-hero .scope { position: absolute; inset: 0; }
    .c-hero .gridlines { position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
      color: ${accent};
      background:
        repeating-linear-gradient(0deg, transparent 0 60px, currentColor 60px 61px),
        repeating-linear-gradient(90deg, transparent 0 60px, currentColor 60px 61px);
    }
    .c-hero .vignette { position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(7,8,10,0.7) 95%);
    }
    .c-hero .center { position: absolute; inset: 0; display: flex; flex-direction: column;
      justify-content: center; align-items: center; gap: 24px; padding: 0 80px; pointer-events: none;
    }
    .c-hero .center img { width: 100%; max-width: 960px; height: auto; filter: drop-shadow(0 0 30px rgba(0,0,0,0.6)); }
    .c-hero .center .sub { font-size: 11px; letter-spacing: 0.5em; color: var(--dim); }
    .c-hero .corners { position: absolute; inset: 16px; pointer-events: none; }
    .c-hero .corner { position: absolute; width: 18px; height: 18px; border: 1px solid ${accent}; }
    .c-hero .corner.tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
    .c-hero .corner.tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
    .c-hero .corner.bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
    .c-hero .corner.br { bottom: 0; right: 0; border-left: 0; border-top: 0; }
    .c-hero .ticker { position: absolute; bottom: 12px; left: 12px; right: 12px;
      display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.2em; color: var(--dim);
    }
    .c-hero .ticker .blink { color: ${accent}; animation: cblink 1s steps(2) infinite; }
    @keyframes cblink { 50% { opacity: 0; } }

    /* LP COVER PANEL */
    .c-cover { grid-column: span 4; align-self: start; }
    .c-cover .c-body { padding: 0; aspect-ratio: 1; }
    .c-cover .c-body img { width: 100%; height: 100%; object-fit: contain; display: block; background: #000; }

    /* TRACKS PANEL */
    .c-tracks { grid-column: span 8; grid-row: span 2; }
    .c-tracks .c-body { padding: 8px 0; }
    .c-side-divider { display: flex; align-items: center; gap: 12px;
      padding: 14px 16px 8px; font-size: 10px; letter-spacing: 0.32em; color: var(--dim);
    }
    .c-side-divider .lbl { color: ${accent}; font-weight: 500; }
    .c-side-divider .rule { flex: 1; height: 1px; background: var(--line); }
    .c-side-divider .meta { color: var(--dim); }
    .c-track { display: grid; grid-template-columns: 36px 1fr 140px 60px;
      gap: 14px; padding: 11px 16px; align-items: center; border-bottom: 1px solid var(--line);
      cursor: pointer; transition: background 120ms;
    }
    .c-track:last-child { border-bottom: 0; }
    .c-track:hover { background: rgba(255,255,255,0.04); }
    .c-track .n { color: var(--dim); font-size: 10px; letter-spacing: 0.2em; position: relative; }
    .c-track .n .num { display: block; }
    .c-track .n .play-hover { display: none; color: ${accent}; font-size: 18px; letter-spacing: 0; }
    .c-track:not(.no-audio):not(.active):hover .n .num { display: none; }
    .c-track:not(.no-audio):not(.active):hover .n .play-hover { display: block; }
    .c-track .t { font-size: 13px; letter-spacing: 0.02em; }
    .c-track .w { height: 22px; }
    .c-track .d { color: var(--dim); font-size: 10px; text-align: right; letter-spacing: 0.1em; }
    .c-track:hover .t { color: ${accent}; }

    /* Active track */
    .c-track.active { background: rgba(126, 200, 227, 0.06); }
    .c-track.active .n { color: ${accent}; }
    .c-track.active .t { color: ${accent}; }

    /* No-audio track */
    .c-track.no-audio { cursor: default; opacity: 0.5; }
    .c-track.no-audio:hover { background: none; }
    .c-track.no-audio:hover .t { color: var(--fg); }

    /* Playing indicator */
    .c-track .playing-icon { color: ${accent}; animation: cblink 1s steps(2) infinite; }

    /* SPECTRUM PANEL */
    .c-spec { grid-column: span 4; }
    .c-spec .c-body { padding: 8px; height: 240px; }
    .c-spec .c-body > div { width: 100%; height: 100%; }

    /* SHOWS PANEL */
    .c-shows { grid-column: span 8; }
    .c-shows .c-body { padding: 0; }
    .c-show-list { display: flex; flex-direction: column; }
    .c-show { display: grid; grid-template-columns: 130px 1fr 1fr 110px;
      gap: 16px; padding: 18px 16px; align-items: center; border-bottom: 1px solid var(--line);
      cursor: pointer; transition: background 160ms;
    }
    .c-show:last-child { border-bottom: 0; }
    .c-show:hover { background: rgba(255,255,255,0.04); }
    .c-show .date { font-size: 13px; letter-spacing: 0.1em; color: ${accent}; }
    .c-show .date .time { display: block; color: var(--dim); font-size: 10px; margin-top: 3px; }
    .c-show .venue { font-size: 14px; letter-spacing: 0.05em; }
    .c-show .city { color: var(--dim); font-size: 11px; letter-spacing: 0.1em; }
    .c-show .tix { font-size: 10px; letter-spacing: 0.25em; padding: 7px 10px;
      border: 1px solid var(--line); color: var(--dim); text-align: center; transition: all 200ms;
    }
    .c-show:hover .tix { border-color: ${accent}; color: ${accent}; }

    .c-past-block { padding: 14px 16px; border-top: 1px solid var(--line); background: rgba(255,255,255,0.015); }
    .c-past-block .h { font-size: 9px; letter-spacing: 0.3em; color: var(--dim); margin-bottom: 10px; }
    .c-past { display: grid; grid-template-columns: 100px 1fr 1fr; gap: 14px;
      padding: 6px 0; font-size: 11px; color: var(--dim);
    }
    .c-past .v { color: var(--fg); letter-spacing: 0.03em; }

    /* MAP / BOOKING PANEL */
    .c-book { grid-column: span 4; }
    .c-book .c-body { display: flex; flex-direction: column; gap: 18px; padding: 22px; }
    .c-book .h { font-family: 'Orbitron', monospace; font-size: 26px; font-weight: 600; letter-spacing: 0.05em; }
    .c-book .p { font-size: 12px; line-height: 1.6; color: var(--dim); }
    .c-book .email { padding: 14px 16px; border: 1px solid var(--line); display: flex; justify-content: space-between;
      align-items: center; cursor: pointer; transition: all 200ms; text-decoration: none; color: var(--fg);
      font-size: 12px; letter-spacing: 0.1em;
    }
    .c-book .email:hover { border-color: ${accent}; color: ${accent}; }
    .c-book .coords { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 10px; letter-spacing: 0.15em; }
    .c-book .coord { display: flex; flex-direction: column; gap: 3px; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--line); }
    .c-book .coord .k { color: var(--dim); font-size: 9px; letter-spacing: 0.3em; }

    /* SOCIALS */
    .c-soc { grid-column: span 12; }
    .c-soc .c-body { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1px; background: var(--line); padding: 0; }
    .c-social { background: var(--panel); padding: 26px; display: flex; flex-direction: column; gap: 6px;
      text-decoration: none; color: var(--fg); transition: background 200ms; position: relative; min-height: 140px;
    }
    .c-social:hover { background: rgba(255,255,255,0.04); }
    .c-social .glyph-icon { width: 36px; height: 36px; }
    .c-social .name { font-size: 11px; letter-spacing: 0.2em; margin-top: 16px; }
    .c-social .handle { font-size: 10px; letter-spacing: 0.08em; color: var(--dim); }
    .c-social .arr { position: absolute; top: 22px; right: 22px; color: var(--dim);
      transition: transform 200ms, color 200ms;
    }
    .c-social:hover .arr { transform: translate(3px, -3px); color: ${accent}; }

    /* FOOT */
    .c-foot { grid-column: span 12; padding: 32px 16px 16px; display: flex; justify-content: space-between;
      font-size: 10px; letter-spacing: 0.22em; color: var(--dim);
    }

    /* ---- TABLET (768-1199px) ---- */
    @media (max-width: 1199px) {
      .c-root { padding: 10px; }
      .c-rack { gap: 10px; }

      .c-hero { height: 380px; }
      .c-hero .center { padding: 0 40px; }

      .c-cover { grid-column: span 12; }
      .c-cover .c-body { aspect-ratio: auto; max-height: 400px; }
      .c-tracks { grid-column: span 12; grid-row: span 1; }
      .c-spec { grid-column: span 12; }
      .c-spec .c-body { height: 180px; }
      .c-shows { grid-column: span 12; }
      .c-book { grid-column: span 12; }

      .c-soc .c-body { grid-template-columns: repeat(3, 1fr); }
      .c-social { min-height: 120px; padding: 20px; }
      .c-social .glyph { font-size: 28px; }
    }

    /* ---- MOBILE (<768px) ---- */
    @media (max-width: 767px) {
      .c-root { padding: 6px; font-size: 12px; }
      .c-rack { gap: 6px; }

      /* Hero */
      .c-hero { height: 280px; }
      .c-hero .center { padding: 0 20px; gap: 14px; }
      .c-hero .center .sub { font-size: 8px; letter-spacing: 0.3em; }
      .c-hero .corners { inset: 8px; }
      .c-hero .corner { width: 12px; height: 12px; }
      .c-hero .ticker { font-size: 7px; letter-spacing: 0.1em; bottom: 6px; left: 6px; right: 6px; }

      /* Bar labels */
      .c-bar { padding: 6px 8px; font-size: 7px; letter-spacing: 0.15em; }

      /* Socials */
      .c-soc .c-body { grid-template-columns: repeat(2, 1fr); }
      .c-social { min-height: 100px; padding: 16px; }
      .c-social .glyph { font-size: 24px; }
      .c-social .name { font-size: 9px; margin-top: 10px; }
      .c-social .handle { font-size: 8px; }

      /* Cover + Tracks */
      .c-cover { grid-column: span 12; }
      .c-cover .c-body { aspect-ratio: 1; max-height: none; }
      .c-tracks { grid-column: span 12; grid-row: span 1; }

      /* Track row — hide waveform on mobile */
      .c-track { grid-template-columns: 28px 1fr 50px; gap: 8px; padding: 9px 10px; }
      .c-track .w { display: none; }
      .c-track .t { font-size: 12px; }
      .c-track .n { font-size: 9px; }
      .c-track .d { font-size: 9px; }
      .c-side-divider { padding: 10px 10px 6px; font-size: 9px; }

      /* Spectrum */
      .c-spec { grid-column: span 12; }
      .c-spec .c-body { height: 160px; }

      /* Shows */
      .c-shows { grid-column: span 12; }
      .c-show { grid-template-columns: 1fr; gap: 6px; padding: 14px 12px; }
      .c-show .date { font-size: 12px; }
      .c-show .date .time { display: inline; margin-top: 0; margin-left: 8px; }
      .c-show .venue { font-size: 13px; }
      .c-show .city { font-size: 10px; }
      .c-show .tix { justify-self: start; padding: 5px 8px; font-size: 9px; }

      /* Past shows */
      .c-past { grid-template-columns: 90px 1fr; gap: 8px; font-size: 10px; }
      .c-past-block { padding: 10px 12px; }

      /* Booking */
      .c-book { grid-column: span 12; }
      .c-book .c-body { padding: 16px; gap: 14px; }
      .c-book .h { font-size: 20px; }
      .c-book .p { font-size: 11px; }
      .c-book .email { font-size: 10px; padding: 12px; }
      .c-book .coords { font-size: 9px; }

      /* Footer */
      .c-foot { flex-direction: column; gap: 8px; align-items: center; text-align: center;
        padding: 20px 12px 12px; font-size: 9px;
      }
    }
  `;

  const isActive = (n: string) => player.currentTrack?.n === n;
  const isTrackPlaying = (n: string) => isActive(n) && player.isPlaying;

  return (
    <div className="c-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="c-rack">

        {/* HERO */}
        <div className="c-panel c-hero">
          <div className="c-bar">
            <div><span className="id">{"CH·01"}</span> &nbsp; / &nbsp; HERO_BUS</div>
            <div className="leds">
              <div className="led on" /><div className="led on" /><div className="led warm" />
              <div className={`led${player.isPlaying ? ' on' : ''}`} />
            </div>
            <div>{"44.1kHz · 24bit"}</div>
          </div>
          <div className="c-body">
            <div className="scope">
              <Oscilloscope
                palette={palette}
                speed={speed}
                density={density}
                glow
                seed={player.currentTrack?.seed ?? 1}
                intensity={player.isPlaying ? 1.0 : 0.5}
              />
            </div>
            <div className="gridlines" />
            <div className="vignette" />
            <div className="corners">
              <div className="corner tl" /><div className="corner tr" />
              <div className="corner bl" /><div className="corner br" />
            </div>
            <div className="center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/wordmark-keyed.png" alt="INFINITE BITS" />
              <div className="sub">{"A L G O R I T H M I C   B A N D   ·   S F"}</div>
            </div>
            <div className="ticker">
              <div style={{ marginLeft: 34 }}>{"WAVEFORM MONITOR"}</div>
              <div>{"●"} <span style={{ color: accent }}>{player.isPlaying ? 'STREAMING' : 'SIGNAL LOCK'}</span> &nbsp; {player.isPlaying ? 'PLAY' : 'LIVE'}</div>
              <div>{"BPM 92 · KEY A·MIN ·"} <span className="blink">{"▸"}</span></div>
            </div>
          </div>
        </div>

        {/* CHANNELS */}
        <div className="c-panel c-soc">
          <div className="c-bar"><div><span className="id">{"CH·02"}</span> {"·"} OUTBOUND CHANNELS</div><div>6 ENDPOINTS</div></div>
          <div className="c-body">
            {BAND.socials.map(s => (
              <a className="c-social" href={s.url} target="_blank" rel="noreferrer" key={s.name}>
                <SocialIcon name={s.name} />
                <div className="name">{s.name.toUpperCase()}</div>
                <div className="handle">{s.handle}</div>
                <div className="arr">{"↗"}</div>
              </a>
            ))}
          </div>
        </div>

        {/* RELEASE ROW: COVER / TRACKS */}
        <div className="c-panel c-cover">
          <div className="c-bar"><div><span className="id">{"CH·03"}</span> {"·"} ART</div><div>{"2200×2200"}</div></div>
          <div className="c-body">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BAND.lp.cover} alt={BAND.lp.title} />
          </div>
        </div>

        <div className="c-panel c-tracks">
          <div className="c-bar">
            <div><span className="id">{"CH·04"}</span> {"·"} TRACKLIST</div>
            <div>
              {player.currentTrack && player.isPlaying ? (
                <span>
                  <span style={{ color: accent }}>{"▸"}</span>{" "}
                  {player.currentTrack.title.toUpperCase()}{" · "}
                  {formatTime(player.currentTime)}
                </span>
              ) : (
                <>{BAND.lp.tracks.length} TRACKS {"·"} {BAND.lp.runtime}</>
              )}
            </div>
          </div>
          <div className="c-body">
            {BAND.lp.tracks.map((t, i) => {
              const prev = BAND.lp.tracks[i - 1];
              const showDivider = !prev || prev.side !== t.side;
              const trackActive = isActive(t.n);
              const hasAudio = !!t.soundcloudUrl;
              return (
                <React.Fragment key={t.n}>
                  {showDivider && (
                    <div className="c-side-divider">
                      <span className="lbl">SIDE {t.side}</span>
                      <span className="rule" />
                      <span className="meta">
                        {BAND.lp.tracks.filter(x => x.side === t.side).length} TRACKS
                      </span>
                    </div>
                  )}
                  <div
                    className={`c-track${trackActive ? ' active' : ''}${!hasAudio ? ' no-audio' : ''}`}
                    onClick={() => hasAudio && controls.playTrack(t)}
                  >
                    <div className="n">
                      {isTrackPlaying(t.n)
                        ? <span className="playing-icon">{"▸"}</span>
                        : <><span className="num">{t.n}</span><span className="play-hover">{"▸"}</span></>}
                    </div>
                    <div className="t">{t.title}</div>
                    <div className="w">
                      <MiniWave
                        palette={palette}
                        speed={speed}
                        seed={t.seed}
                        height={22}
                        active={isTrackPlaying(t.n)}
                        dimmed={player.isPlaying && !trackActive}
                      />
                    </div>
                    <div className="d">{t.dur}</div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* SPECTRUM (under cover) */}
        <div className="c-panel c-spec">
          <div className="c-bar">
            <div><span className="id">{"CH·05"}</span> {"·"} FFT {"·"} 64 BIN</div>
            <div className="leds">
              <div className="led on" /><div className="led on" /><div className="led warm" />
            </div>
            <div>-12 / 0 dB</div>
          </div>
          <div className="c-body">
            <div>
              <SpectrumBars
                palette={palette}
                speed={speed}
                bins={64}
                mode="rainbow"
                intensity={player.isPlaying ? 1.0 : 0.4}
              />
            </div>
          </div>
        </div>

        {/* SHOWS + BOOKING */}
        <div className="c-panel c-shows">
          <div className="c-bar">
            <div><span className="id">{"CH·06"}</span> {"·"} LIVE SCHEDULE</div>
            <div>{BAND.shows.upcoming.length} UPCOMING / {BAND.shows.past.length} ARCHIVED</div>
          </div>
          <div className="c-body">
            <div className="c-show-list">
              {BAND.shows.upcoming.map(s => (
                <div className="c-show" key={s.date}>
                  <div className="date">{s.date}<span className="time">{s.time}</span></div>
                  <div className="venue">{s.venue}</div>
                  <div className="city">{s.city}</div>
                  <div className="tix">{s.tix!.toUpperCase()} {"→"}</div>
                </div>
              ))}
            </div>
            <div className="c-past-block">
              <div className="h">{"▸"} ARCHIVE</div>
              {BAND.shows.past.map(s => (
                <div className="c-past" key={s.date + s.venue}>
                  <div>{s.date}</div>
                  <div className="v">{s.venue}</div>
                  <div>{s.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="c-panel c-book">
          <div className="c-bar"><div><span className="id">{"CH·07"}</span> {"·"} BOOKING</div><div>INBOUND</div></div>
          <div className="c-body">
            <div className="h">Book the<br/>signal.</div>
            <div className="p">For live dates, festivals, and other transmissions — write us. We will reply within one phrase.</div>
            <a href={`mailto:${BAND.booking}`} className="email">
              <span>{BAND.booking}</span>
              <span style={{ color: accent }}>{"→"}</span>
            </a>
            <div className="coords">
              <div className="coord"><div className="k">LAT</div><div>37.7596 N</div></div>
              <div className="coord"><div className="k">LON</div><div>122.4346 W</div></div>
              <div className="coord"><div className="k">TZ</div><div>{"PST · UTC−8"}</div></div>
              <div className="coord"><div className="k">EST</div><div>2022</div></div>
            </div>
          </div>
        </div>

        <div className="c-foot">
          <div>{"© INFINITE BITS · 2025"}</div>
          <div>{"SAN FRANCISCO · CA"}</div>
          <div>{"NO COOKIES · NO TRACKING · NO LATENCY"}</div>
        </div>

      </div>

      {/* Now Playing Transport Bar */}
      {player.currentTrack && (
        <NowPlayingBar
          track={player.currentTrack}
          isPlaying={player.isPlaying}
          progress={player.progress}
          currentTime={player.currentTime}
          duration={player.duration}
          onPlayPause={controls.togglePlayPause}
          onNext={controls.nextTrack}
          onPrev={controls.prevTrack}
          onSeek={controls.seekTo}
          accent={accent}
        />
      )}
    </div>
  );
}
