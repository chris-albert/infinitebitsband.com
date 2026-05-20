interface SCWidget {
  load(url: string, options?: { auto_play?: boolean; show_artwork?: boolean; callback?: () => void }): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(ms: number): void;
  setVolume(vol: number): void;
  next(): void;
  prev(): void;
  skip(index: number): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getCurrentSound(callback: (sound: Record<string, unknown>) => void): void;
  getSounds(callback: (sounds: Record<string, unknown>[]) => void): void;
  isPaused(callback: (paused: boolean) => void): void;
  bind(event: string, callback: (...args: unknown[]) => void): void;
  unbind(event: string): void;
}

interface SCWidgetConstructor {
  (iframe: HTMLIFrameElement): SCWidget;
  Events: {
    READY: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
    PLAY_PROGRESS: string;
    LOAD_PROGRESS: string;
    SEEK: string;
    ERROR: string;
    CLICK_DOWNLOAD: string;
    CLICK_BUY: string;
    OPEN_SHARE_PANEL: string;
  };
}

interface Window {
  SC?: {
    Widget: SCWidgetConstructor;
  };
}
