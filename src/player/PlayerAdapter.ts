/**
 * PlayerAdapter — playback interface abstraction.
 * Supports HTMLMediaElement (MediaPlayer) and timer-driven synthetic clock (ClockPlayer).
 * Enables seamless playback, seeking, speed changes, and high-performance playhead updates.
 */

export type PlaybackListener = (currentTime: number) => void;
export type StateListener = (isPlaying: boolean, rate: number) => void;

export interface PlayerAdapter {
  readonly currentTime: number;
  readonly duration: number;
  readonly isPlaying: boolean;
  readonly playbackRate: number;
  
  play(): void;
  pause(): void;
  togglePlay(): void;
  seek(timeInSeconds: number): void;
  setPlaybackRate(rate: number): void;
  
  onTimeUpdate(listener: PlaybackListener): () => void;
  onStateChange(listener: StateListener): () => void;
  destroy(): void;
}

/**
 * ClockPlayer: timer-driven synthetic playback clock for meetings without audio/video media.
 * Updates at 60fps via requestAnimationFrame for buttery smooth playhead and transcript sync.
 */
export class ClockPlayer implements PlayerAdapter {
  private _currentTime: number = 0;
  private _duration: number;
  private _isPlaying: boolean = false;
  private _rate: number = 1.0;
  private _rafId: number | null = null;
  private _lastTimestamp: number | null = null;
  private _timeListeners: Set<PlaybackListener> = new Set();
  private _stateListeners: Set<StateListener> = new Set();

  constructor(duration: number, initialTime: number = 0) {
    this._duration = Math.max(1, duration);
    this._currentTime = Math.min(Math.max(0, initialTime), this._duration);
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get duration(): number {
    return this._duration;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get playbackRate(): number {
    return this._rate;
  }

  play(): void {
    if (this._isPlaying) return;
    if (this._currentTime >= this._duration) {
      this._currentTime = 0;
    }
    this._isPlaying = true;
    this._lastTimestamp = performance.now();
    this._notifyState();
    this._tick();
  }

  pause(): void {
    if (!this._isPlaying) return;
    this._isPlaying = false;
    this._lastTimestamp = null;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._notifyState();
  }

  togglePlay(): void {
    if (this._isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(timeInSeconds: number): void {
    const clamped = Math.min(Math.max(0, timeInSeconds), this._duration);
    this._currentTime = clamped;
    this._notifyTime();
  }

  setPlaybackRate(rate: number): void {
    this._rate = Math.max(0.5, Math.min(3.0, rate));
    this._notifyState();
  }

  onTimeUpdate(listener: PlaybackListener): () => void {
    this._timeListeners.add(listener);
    listener(this._currentTime);
    return () => this._timeListeners.delete(listener);
  }

  onStateChange(listener: StateListener): () => void {
    this._stateListeners.add(listener);
    listener(this._isPlaying, this._rate);
    return () => this._stateListeners.delete(listener);
  }

  private _tick = () => {
    if (!this._isPlaying) return;
    const now = performance.now();
    if (this._lastTimestamp !== null) {
      const deltaSeconds = ((now - this._lastTimestamp) / 1000) * this._rate;
      this._currentTime += deltaSeconds;
      if (this._currentTime >= this._duration) {
        this._currentTime = this._duration;
        this.pause();
        this._notifyTime();
        return;
      }
      this._notifyTime();
    }
    this._lastTimestamp = now;
    this._rafId = requestAnimationFrame(this._tick);
  };

  private _notifyTime(): void {
    for (const listener of this._timeListeners) {
      listener(this._currentTime);
    }
  }

  private _notifyState(): void {
    for (const listener of this._stateListeners) {
      listener(this._isPlaying, this._rate);
    }
  }

  destroy(): void {
    this.pause();
    this._timeListeners.clear();
    this._stateListeners.clear();
  }
}

/**
 * MediaPlayer: wraps an HTMLMediaElement (video or audio element)
 */
export class MediaPlayer implements PlayerAdapter {
  private _media: HTMLMediaElement;
  private _timeListeners: Set<PlaybackListener> = new Set();
  private _stateListeners: Set<StateListener> = new Set();
  private _rafId: number | null = null;

  constructor(media: HTMLMediaElement) {
    this._media = media;
    this._media.addEventListener('play', this._onMediaState);
    this._media.addEventListener('pause', this._onMediaState);
    this._media.addEventListener('ratechange', this._onMediaState);
    this._media.addEventListener('timeupdate', this._onMediaTime);
    this._media.addEventListener('seeked', this._onMediaTime);
  }

  get currentTime(): number {
    return this._media.currentTime;
  }

  get duration(): number {
    return isNaN(this._media.duration) ? 0 : this._media.duration;
  }

  get isPlaying(): boolean {
    return !this._media.paused && !this._media.ended;
  }

  get playbackRate(): number {
    return this._media.playbackRate;
  }

  play(): void {
    this._media.play().catch(() => {
      // autoplay policies may block
    });
  }

  pause(): void {
    this._media.pause();
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(timeInSeconds: number): void {
    this._media.currentTime = timeInSeconds;
    this._notifyTime();
  }

  setPlaybackRate(rate: number): void {
    this._media.playbackRate = rate;
  }

  onTimeUpdate(listener: PlaybackListener): () => void {
    this._timeListeners.add(listener);
    listener(this.currentTime);
    return () => this._timeListeners.delete(listener);
  }

  onStateChange(listener: StateListener): () => void {
    this._stateListeners.add(listener);
    listener(this.isPlaying, this.playbackRate);
    return () => this._stateListeners.delete(listener);
  }

  private _onMediaState = () => {
    if (this.isPlaying && this._rafId === null) {
      this._startRafLoop();
    } else if (!this.isPlaying && this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    for (const listener of this._stateListeners) {
      listener(this.isPlaying, this.playbackRate);
    }
  };

  private _onMediaTime = () => {
    this._notifyTime();
  };

  private _startRafLoop = () => {
    const loop = () => {
      if (!this.isPlaying) {
        this._rafId = null;
        return;
      }
      this._notifyTime();
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  };

  private _notifyTime(): void {
    const t = this.currentTime;
    for (const listener of this._timeListeners) {
      listener(t);
    }
  }

  destroy(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
    }
    this._media.removeEventListener('play', this._onMediaState);
    this._media.removeEventListener('pause', this._onMediaState);
    this._media.removeEventListener('ratechange', this._onMediaState);
    this._media.removeEventListener('timeupdate', this._onMediaTime);
    this._media.removeEventListener('seeked', this._onMediaTime);
    this._timeListeners.clear();
    this._stateListeners.clear();
  }
}
