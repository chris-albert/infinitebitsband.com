import React, { useCallback } from 'react';
import type { Track } from '../lib/content';
import { formatTime } from '../hooks/useSoundCloudPlayer';

type Props = {
  track: Track;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (fraction: number) => void;
  accent: string;
};

export default function NowPlayingBar({
  track, isPlaying, progress, currentTime, duration,
  onPlayPause, onNext, onPrev, onSeek, accent,
}: Props) {
  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(fraction);
  }, [onSeek]);

  const css = `
    .c-transport {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
      background: #0e1014; border-top: 1px solid rgba(255,255,255,0.12);
      display: flex; align-items: center; gap: 16px; padding: 16px 24px;
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px;
      color: #e8e6e1;
    }
    .c-transport .btns { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
    .c-transport .btn {
      background: none; border: 1px solid rgba(255,255,255,0.1);
      color: #7a7872; padding: 10px 14px; cursor: pointer; font-family: inherit;
      font-size: 16px; letter-spacing: 0.1em; transition: all 200ms; line-height: 1;
    }
    .c-transport .btn:hover { border-color: ${accent}; color: ${accent}; }
    .c-transport .btn.play {
      color: ${accent}; border-color: rgba(255,255,255,0.18); font-size: 20px;
      width: 48px; height: 44px; padding: 0;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .c-transport .info {
      display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;
    }
    .c-transport .title {
      letter-spacing: 0.05em; white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis; font-size: 13px; flex-shrink: 0; max-width: 280px;
    }
    .c-transport .progress-track {
      flex: 1; height: 6px; background: rgba(255,255,255,0.08);
      cursor: pointer; position: relative; min-width: 60px; border-radius: 3px;
    }
    .c-transport .progress-fill {
      height: 100%; background: ${accent}; pointer-events: none;
      transition: width 150ms linear; border-radius: 3px;
    }
    .c-transport .time {
      color: #7a7872; letter-spacing: 0.1em; white-space: nowrap; font-size: 12px; flex-shrink: 0;
    }
    @media (max-width: 767px) {
      .c-transport { gap: 10px; padding: 12px 14px; }
      .c-transport .btn { padding: 8px 10px; font-size: 14px; }
      .c-transport .btn.play { font-size: 18px; width: 44px; height: 40px; }
      .c-transport .title { max-width: 140px; font-size: 11px; }
      .c-transport .btn.skip { display: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="c-transport">
        <div className="btns">
          <button className="btn skip" onClick={onPrev}>{"◂◂"}</button>
          <button className="btn play" onClick={onPlayPause}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button className="btn skip" onClick={onNext}>{"▸▸"}</button>
        </div>
        <div className="info">
          <div className="title">{track.title}</div>
          <div className="progress-track" onClick={handleSeek}>
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </>
  );
}
