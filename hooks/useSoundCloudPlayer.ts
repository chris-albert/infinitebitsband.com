import { useState, useRef, useEffect, useCallback } from 'react';
import type { Track } from '../lib/content';

export type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;     // 0-1
  currentTime: number;  // ms
  duration: number;     // ms
};

export type PlayerControls = {
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  seekTo: (fraction: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
};

const SC_WIDGET_URL = 'https://w.soundcloud.com/player/api.js';
const SC_PLAYER_BASE = 'https://w.soundcloud.com/player/?url=';

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export { formatTime };

export default function useSoundCloudPlayer(tracks: readonly Track[]): [PlayerState, PlayerControls] {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
  });

  const widgetRef = useRef<SCWidget | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const scriptLoadedRef = useRef(false);
  const pendingTrackRef = useRef<Track | null>(null);
  const currentTrackRef = useRef<Track | null>(null);
  const loadingRef = useRef(false);

  // Keep ref in sync with state for use in callbacks
  useEffect(() => { currentTrackRef.current = state.currentTrack; }, [state.currentTrack]);

  // Load the SC widget API script + create hidden iframe
  useEffect(() => {
    // Inject script
    if (!document.querySelector(`script[src="${SC_WIDGET_URL}"]`)) {
      const script = document.createElement('script');
      script.src = SC_WIDGET_URL;
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        initWidget();
      };
      document.head.appendChild(script);
    } else if (window.SC?.Widget) {
      scriptLoadedRef.current = true;
    }

    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'sc-widget';
    iframe.allow = 'autoplay';
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;overflow:hidden;';
    // Start with the first playable track so the widget initializes
    const firstPlayable = tracks.find(t => t.soundcloudUrl);
    iframe.src = SC_PLAYER_BASE + (firstPlayable?.soundcloudUrl || 'https://soundcloud.com/infinite-bits/phase-1-overture-1');
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    // Try to init widget if script already loaded
    const checkReady = setInterval(() => {
      if (window.SC?.Widget && iframeRef.current) {
        clearInterval(checkReady);
        scriptLoadedRef.current = true;
        initWidget();
      }
    }, 100);

    return () => {
      clearInterval(checkReady);
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
        iframeRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initWidget() {
    if (!window.SC?.Widget || !iframeRef.current || widgetRef.current) return;
    const w = window.SC.Widget(iframeRef.current);
    widgetRef.current = w;
    const Events = window.SC.Widget.Events;

    w.bind(Events.PLAY, () => {
      setState(s => ({ ...s, isPlaying: true }));
    });

    w.bind(Events.PAUSE, () => {
      setState(s => ({ ...s, isPlaying: false }));
    });

    w.bind(Events.FINISH, () => {
      setState(s => ({ ...s, isPlaying: false, progress: 1 }));
      // Auto-advance
      autoNext();
    });

    w.bind(Events.PLAY_PROGRESS, (data: unknown) => {
      const d = data as { currentPosition: number; relativePosition: number };
      setState(s => ({
        ...s,
        currentTime: d.currentPosition,
        progress: d.relativePosition,
      }));
    });

    // Play pending track if user clicked before widget was ready
    if (pendingTrackRef.current) {
      const t = pendingTrackRef.current;
      pendingTrackRef.current = null;
      loadAndPlay(t);
    }
  }

  function loadAndPlay(track: Track) {
    if (!track.soundcloudUrl) return;
    const w = widgetRef.current;
    if (!w) {
      pendingTrackRef.current = track;
      return;
    }
    if (loadingRef.current) return;
    loadingRef.current = true;

    setState(s => ({
      ...s,
      currentTrack: track,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
    }));

    w.load(track.soundcloudUrl, {
      auto_play: true,
      show_artwork: false,
      callback: () => {
        loadingRef.current = false;
        w.getDuration((dur: number) => {
          setState(s => ({ ...s, duration: dur }));
        });
      },
    });
  }

  function getPlayableTracks(): Track[] {
    return tracks.filter(t => t.soundcloudUrl) as Track[];
  }

  function autoNext() {
    const playable = getPlayableTracks();
    if (playable.length === 0) return;
    const cur = currentTrackRef.current;
    const idx = cur ? playable.findIndex(t => t.n === cur.n) : -1;
    const next = playable[(idx + 1) % playable.length];
    if (next) loadAndPlay(next);
  }

  const playTrack = useCallback((track: Track) => {
    if (!track.soundcloudUrl) return;
    const cur = currentTrackRef.current;
    if (cur && cur.n === track.n) {
      // Toggle play/pause on same track
      widgetRef.current?.toggle();
      return;
    }
    loadAndPlay(track);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlayPause = useCallback(() => {
    widgetRef.current?.toggle();
  }, []);

  const seekTo = useCallback((fraction: number) => {
    const w = widgetRef.current;
    if (!w) return;
    w.getDuration((dur: number) => {
      w.seekTo(fraction * dur);
    });
  }, []);

  const nextTrack = useCallback(() => {
    const playable = getPlayableTracks();
    if (playable.length === 0) return;
    const cur = currentTrackRef.current;
    const idx = cur ? playable.findIndex(t => t.n === cur.n) : -1;
    const next = playable[(idx + 1) % playable.length];
    if (next) loadAndPlay(next);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  const prevTrack = useCallback(() => {
    const playable = getPlayableTracks();
    if (playable.length === 0) return;
    const cur = currentTrackRef.current;
    const idx = cur ? playable.findIndex(t => t.n === cur.n) : -1;
    const prev = playable[(idx - 1 + playable.length) % playable.length];
    if (prev) loadAndPlay(prev);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  const controls: PlayerControls = {
    playTrack,
    togglePlayPause,
    seekTo,
    nextTrack,
    prevTrack,
  };

  return [state, controls];
}
