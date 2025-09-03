"use client";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
// import { usePlayer } from "./player/PlayerContext";
import { getPublicUrlForPath } from "../lib/supabaseClient";

type Props = {
  src: string; // can be a public URL or a storage path like "folder/file.mp3"
  storagePath?: boolean; // if true, resolve via Supabase storage bucket
  autoPlayOnSrcChange?: boolean; // try to auto-play when source changes
  vizHeight?: number; // visualizer canvas height in px
  onPrev?: (opts?: { autoPlay?: boolean }) => void;
  onNext?: (opts?: { shuffle?: boolean; autoPlay?: boolean }) => void;
};

export type BeatPlayerHandle = {
  playSource: (url: string, asStoragePath?: boolean) => Promise<void>;
  setSource: (url: string, asStoragePath?: boolean) => void; // set but do not autoplay
  stop: () => void; // pause and reset to 0
};

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function resolveExternalUrl(url: string, storagePathFlag: boolean) {
  try {
    const u = new URL(url, typeof window !== "undefined" ? window.location.href : "http://localhost");
    const host = u.host.toLowerCase();
    if (host.includes("dropbox.com")) {
      u.host = "dl.dropboxusercontent.com";
      u.searchParams.delete("dl");
      u.searchParams.set("raw", "1");
      return u.toString();
    }
  } catch {}
  if (!storagePathFlag) return url;
  const maybe = getPublicUrlForPath(url);
  return maybe ?? url;
}

export default forwardRef<BeatPlayerHandle, Props>(function BeatPlayer({ src, storagePath = false, autoPlayOnSrcChange = true, vizHeight = 220, onPrev: onPrevProp, onNext: onNextProp }: Props, ref) {
  const audioEl = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const compRef = useRef<DynamicsCompressorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [vizDisabled, setVizDisabled] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [ready, setReady] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [normalize, setNormalize] = useState(false);
  const reduceMotionRef = useRef<boolean>(false);
  const normComputedForSrc = useRef<string | null>(null);
  // Refs to avoid re-subscribing heavy effect when these props/state change
  const onNextRef = useRef<typeof onNextProp>(onNextProp);
  const shuffleRef = useRef<boolean>(shuffle);
  const repeatOneRef = useRef<boolean>(repeatOne);
  const vizHeightRef = useRef<number>(vizHeight);
  useEffect(() => { onNextRef.current = onNextProp; }, [onNextProp]);
  useEffect(() => { shuffleRef.current = shuffle; }, [shuffle]);
  useEffect(() => { repeatOneRef.current = repeatOne; }, [repeatOne]);
  useEffect(() => { vizHeightRef.current = vizHeight; try { window.dispatchEvent(new Event('resize')); } catch {} }, [vizHeight]);
  // Footer player removed; keep local state only.

  const initialSrc = useMemo(() => resolveExternalUrl(src, storagePath), [src, storagePath]);
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);

  // Keep currentSrc in sync with props (unless playSource overrides it explicitly)
  useEffect(() => {
    setCurrentSrc(resolveExternalUrl(src, storagePath));
  }, [src, storagePath]);

  // Expose imperative API to start playback from a user gesture
  useImperativeHandle(ref, () => ({
    playSource: async (url: string, asStoragePath?: boolean) => {
      const next = resolveExternalUrl(url, !!asStoragePath);
      const audio = audioEl.current;
      if (!audio) return;
      // Set src directly to ensure it's ready within this gesture
      audio.src = next;
      try { audio.load(); } catch {}
      // Also update state so UI reflects the new source
      setCurrentSrc(next);
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
        await audio.play();
        setErrMsg(null);
      } catch (e: any) {
        setErrMsg(e?.message || "Nelze přehrát (autoplay/CORS?).");
      }
    },
    setSource: (url: string, asStoragePath?: boolean) => {
      const next = resolveExternalUrl(url, !!asStoragePath);
      const audio = audioEl.current;
      if (!audio) return;
      try {
        audio.pause();
      } catch {}
      audio.src = next;
      try { audio.load(); } catch {}
      audio.currentTime = 0;
    setIsPlaying(false);
      setCurrent(0);
  setBuffering(true);
  setReady(false);
      setErrMsg(null);
      setCurrentSrc(next);
    },
    stop: () => {
      const audio = audioEl.current;
      if (!audio) return;
      try { audio.pause(); } catch {}
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }), []);

  // Decide crossOrigin based on host whenever src changes
  useEffect(() => {
    const audio = audioEl.current;
    if (!audio) return;
    try {
      const u = new URL(currentSrc, window.location.href);
      const host = u.host;
      const isSupabase = /supabase\.(co|in)$/i.test(host) || /supabaseapp\.com$/i.test(host);
      audio.crossOrigin = isSupabase ? "anonymous" : "";
    } catch {}
  }, [currentSrc]);

  // Build visualization and attach media events (once)
  useEffect(() => {
    const audio = audioEl.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

  const onPlay = () => { setBuffering(false); };
  const onPause = () => { setIsPlaying(false); setBuffering(false); };
    const onTime = () => {
      setCurrent(audio.currentTime);
      // keep UI in sync in case we missed an event
      setIsPlaying(!audio.paused && !audio.ended);
      if (!audio.paused && !audio.ended) setBuffering(false);
    };
  const onMeta = () => {
      setDuration(audio.duration);
      if (Number.isFinite(audio.duration)) setReady(true);
    };
  const onWaiting = () => { setBuffering(true); /* keep isPlaying as-is to avoid flicker */ };
    const onStalled = () => { setBuffering(true); };
    const onSuspend = () => { /* not necessarily active buffering; avoid forcing true */ setBuffering(false); };
  const onCanPlay = () => { setBuffering(false); setReady(true); };
    const onCanPlayThrough = () => { setBuffering(false); setReady(true); };
    const onLoadedData = () => { setReady(true); setBuffering(false); };
  const onPlaying = () => { setBuffering(false); setIsPlaying(true); };
  const onEndedNav = () => {
    setIsPlaying(false);
    setBuffering(false);
  if (repeatOneRef.current) {
      try { audio.currentTime = 0; audio.play(); } catch {}
  } else if (typeof window !== 'undefined') {
      // call navigation callback outside of event tick
      setTimeout(() => {
    const cb = onNextRef.current;
    const sh = shuffleRef.current;
    if (typeof cb === 'function') cb({ shuffle: sh, autoPlay: true });
      }, 0);
    }
  };
  const onErr = () => { setErrMsg("Nepodařilo se načíst audio (zkontroluj URL/CORS)."); setReady(false); setBuffering(false); };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
  audio.addEventListener("error", onErr);
  audio.addEventListener("waiting", onWaiting);
  audio.addEventListener("stalled", onStalled);
  audio.addEventListener("suspend", onSuspend);
  audio.addEventListener("canplay", onCanPlay);
  audio.addEventListener("canplaythrough", onCanPlayThrough);
  audio.addEventListener("loadeddata", onLoadedData);
  audio.addEventListener("playing", onPlaying);
  audio.addEventListener("ended", onEndedNav);

    // Setup Web Audio graph
  let analyser: AnalyserNode | null = null;
  let bufferLength = 0;
  let dataArray: Uint8Array | null = null;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      let source: MediaElementAudioSourceNode;
      const existing = (audio as any).__mediaSourceNode as MediaElementAudioSourceNode | undefined;
      if (existing) {
        source = existing;
      } else {
        source = audioCtx.createMediaElementSource(audio);
        (audio as any).__mediaSourceNode = source;
      }
      // nodes
      const gain = gainRef.current ?? audioCtx.createGain();
      gainRef.current = gain;
      const comp = compRef.current ?? audioCtx.createDynamicsCompressor();
      compRef.current = comp;
      comp.threshold.value = -18; // gentle leveling
      comp.knee.value = 9;
      comp.ratio.value = 2.5;
      comp.attack.value = 0.003;
      comp.release.value = 0.25;

  analyser = analyserRef.current ?? audioCtx.createAnalyser();
  // Higher resolution FFT for smoother spectrum similar to Pro-Q
  analyser.fftSize = 2048;
  analyser.minDecibels = -100;
  analyser.maxDecibels = -20;
  analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;
      // connect: source -> gain -> comp -> analyser -> destination
      try { source.connect(gain); } catch {}
      try { gain.connect(comp); } catch {}
      try { comp.connect(analyser); } catch {}
      try { analyser.connect(audioCtx.destination); } catch {}
      bufferLength = analyser.frequencyBinCount;
  // Allocate with ArrayBuffer to align with WebAudio typings
  // Use ArrayBuffer so the generic parameter is ArrayBuffer (TS typings for WebAudio expect this)
  dataArray = new Uint8Array(new ArrayBuffer(bufferLength));
      setVizDisabled(false);
    } catch {
      analyser = null;
      bufferLength = 0;
      dataArray = null;
      setVizDisabled(true);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduced motion preference
    try {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduceMotionRef.current = !!mql.matches;
      const onChange = (e: MediaQueryListEvent) => { reduceMotionRef.current = !!e.matches; };
      mql.addEventListener?.('change', onChange);
      // cleanup listener later
      (canvas as any).__rmCleanup = () => mql.removeEventListener?.('change', onChange);
    } catch {}

    // Responsive canvas sizing for sharpness
    const fitCanvas = () => {
      const dpr = (window.devicePixelRatio || 1);
      const cssW = canvas.clientWidth || 640;
      const cssH = vizHeightRef.current;
      canvas.width = Math.max(640, Math.floor(cssW * dpr));
      canvas.height = Math.max(120, Math.floor(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fitCanvas();
    const onResize = () => fitCanvas();
    window.addEventListener('resize', onResize);

  let raf = 0;
  let glitchT = 0;
  let prevY: Float32Array | null = null;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const audio = audioEl.current;
      const active = !!audio && !audio.paused && !audio.ended;
      if (active && analyser && dataArray) {
        (analyser as any).getByteFrequencyData(dataArray);
      }
      // subtle trailing for motion blur
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pro-Q-like layout: log-frequency grid + thin analyzer line
      const nyquist = ((audioCtxRef.current?.sampleRate || 44100) / 2);
      const minF = 20;
      const maxF = 20000; // target display up to 20 kHz
      const splitF = 300; // Requirement: 0-300 Hz takes 30% of width
      const dprNow = (window.devicePixelRatio || 1);
      const cssW = (canvas.width / dprNow);
      const cssH = (canvas.height / dprNow);
      const splitX = cssW * 0.30;

      // helper: map frequency -> X (CSS px) using piecewise log so 0-300 Hz = 30% width
      const fToX = (f: number) => {
        const ff = Math.max(minF, Math.min(maxF, f));
        if (ff <= splitF) {
          const t = Math.log(ff / minF) / Math.log(splitF / minF);
          return t * splitX;
        }
        const t2 = Math.log(ff / splitF) / Math.log(maxF / splitF);
        return splitX + t2 * (cssW - splitX);
      };

      // inverse: map X -> frequency (CSS px to Hz) with the same piecewise log mapping
      const xToF = (x: number) => {
        const xx = Math.max(0, Math.min(cssW, x));
        if (xx <= splitX) {
          const t = splitX > 0 ? (xx / splitX) : 0;
          return minF * Math.pow(splitF / minF, t);
        }
        const t2 = (cssW - splitX) > 0 ? ((xx - splitX) / (cssW - splitX)) : 0;
        return splitF * Math.pow(maxF / splitF, t2);
      };

      // Gridlines: vertical (freq decades + key marks) and horizontal (dB)
  const gridColor = 'rgba(255,255,255,0.06)';
  const gridColorBold = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;
      ctx.fillStyle = 'rgba(207,238,242,0.6)';
      ctx.font = '10px sans-serif';

      const freqMarks = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
      ctx.beginPath();
      for (const f of freqMarks) {
        const x = Math.floor(fToX(f)) + 0.5; // crisp lines
        ctx.strokeStyle = (f === 1000 || f === 10000 || f === 100) ? gridColorBold : gridColor;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cssH);
        ctx.stroke();
        // label
        const label = f >= 1000 ? `${Math.round(f/1000)}k` : `${f}`;
        ctx.fillText(label, Math.max(2, Math.min(cssW - 20, x + 3)), cssH - 4);
      }

      // Horizontal grid (approx dB): using analyser min/max
      const dMin = analyser ? (analyser as any).minDecibels ?? -100 : -100;
      const dMax = analyser ? (analyser as any).maxDecibels ?? -20 : -20;
      const dbLines = [-90, -80, -70, -60, -50, -40, -30, -20];
      for (const db of dbLines) {
        const norm = (db - dMin) / (dMax - dMin);
        const y = cssH - norm * (cssH * 0.9);
        ctx.strokeStyle = (db === -60 || db === -40 || db === -20) ? gridColorBold : gridColor;
        ctx.beginPath();
        ctx.moveTo(0, Math.floor(y) + 0.5);
        ctx.lineTo(cssW, Math.floor(y) + 0.5);
        ctx.stroke();
      }

  // Analyzer: thin glowing line (log mapped). If not active, draw a flat baseline.
      const points = Math.max(320, Math.floor(cssW));
      const windowBins = 3; // neighbor smoothing
      const tiltPerOct = 3.0; // dB per octave to tame lows / lift highs
      ctx.shadowColor = 'rgba(0, 179, 198, 0.5)';
      ctx.shadowBlur = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const grad = ctx.createLinearGradient(0, 0, cssW, 0);
      grad.addColorStop(0.0, 'rgba(0, 215, 255, 0.95)');
      grad.addColorStop(1.0, 'rgba(192, 0, 255, 0.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const nextY: number[] = new Array(points);
      for (let i = 0; i < points; i++) {
        const xCss = (i / (points - 1)) * cssW;
        const freq = xToF(xCss);
        let yCss: number;
        if (!active) {
          // flat baseline ~ bottom 10% area
          yCss = cssH - (cssH * 0.05);
        } else {
          const center = Math.min(bufferLength - 1, Math.max(0, Math.round((freq / nyquist) * bufferLength)));
          let accum = 0, count = 0;
          if (dataArray) {
            for (let k = -windowBins; k <= windowBins; k++) {
              const idx = Math.min(bufferLength - 1, Math.max(0, center + k));
              accum += dataArray[idx];
              count++;
            }
          }
          const v = count > 0 ? accum / count : 0;
          // Map to approx dB using analyser range, apply tilt around 1 kHz to reduce boominess
          const dMin = analyser ? (analyser as any).minDecibels ?? -100 : -100;
          const dMax = analyser ? (analyser as any).maxDecibels ?? -20 : -20;
          const db = dMin + (v / 255) * (dMax - dMin);
          const oct = Math.log2(Math.max(1e-9, freq / 1000));
          const dbTilt = db + tiltPerOct * oct;
          const norm = Math.max(0, Math.min(1, (dbTilt - dMin) / (dMax - dMin)));
          yCss = cssH - norm * (cssH * 0.9);
        }
        // temporal smoothing
        if (prevY && prevY.length === points) {
          const alpha = 0.35; // lower = smoother
          yCss = prevY[i] * (1 - alpha) + yCss * alpha;
        }
        nextY[i] = yCss;
        if (i === 0) ctx.moveTo(xCss, yCss);
        else ctx.lineTo(xCss, yCss);
      }
      ctx.stroke();
      prevY = new Float32Array(nextY);

      // scanlines
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#fff';
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.fillRect(0, y, canvas.width, 1);
      }
      ctx.globalAlpha = 1;

  // occasional glitch stripes (skip when reduced motion)
  glitchT++;
  if (!reduceMotionRef.current && glitchT % 40 === 0) {
        const stripes = 1 + Math.floor(Math.random() * 3);
        for (let s = 0; s < stripes; s++) {
          const gh = Math.max(4, Math.floor(Math.random() * (canvas.height * 0.15)));
          const gy = Math.floor(Math.random() * (canvas.height - gh));
          const dx = (Math.random() - 0.5) * Math.min(60, canvas.width * 0.06);
          try {
            const slice = ctx.getImageData(0, gy, canvas.width, gh);
            ctx.clearRect(0, gy, canvas.width, gh);
            ctx.putImageData(slice, Math.floor(dx), gy);
          } catch {}
        }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("error", onErr);
  audio.removeEventListener("waiting", onWaiting);
  audio.removeEventListener("stalled", onStalled);
  audio.removeEventListener("suspend", onSuspend);
  audio.removeEventListener("canplay", onCanPlay);
  audio.removeEventListener("canplaythrough", onCanPlayThrough);
  audio.removeEventListener("loadeddata", onLoadedData);
  audio.removeEventListener("playing", onPlaying);
  audio.removeEventListener("ended", onEndedNav);
  // Don't disconnect audio graph to avoid InvalidStateError in StrictMode
  try { (canvas as any).__rmCleanup?.(); } catch {}
    };
  }, []);

  // Keep element volume/mute in sync
  useEffect(() => {
    const audio = audioEl.current;
    if (!audio) return;
    audio.volume = volume;
    // No separate mute button; treat volume=0 as muted
    audio.muted = volume <= 0.0001;
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioEl.current;
    if (!audio) return;
  if (!ready) return; // block play until prebuffered
    if (audio.paused) {
      try {
        if (audioCtxRef.current?.state === "suspended") await audioCtxRef.current.resume();
  await audio.play();
  setErrMsg(null);
      } catch (e: any) {
        setErrMsg(e?.message || "Nelze přehrát (autoplay nebo CORS?). Klikni znovu na Play.");
      }
    } else {
  audio.pause();
    }
  };

  // Normalization routine: sample RMS shortly after play and adjust gain
  useEffect(() => {
    if (!normalize) return;
    const audio = audioEl.current;
    const analyser = analyserRef.current;
    const gain = gainRef.current;
    if (!audio || !analyser || !gain) return;
    if (normComputedForSrc.current === currentSrc) return;
    let samples = 0;
    let sum = 0;
    const buf = new Uint8Array(analyser.frequencyBinCount);
    const t = setInterval(() => {
      try {
        analyser.getByteTimeDomainData(buf);
        // compute RMS around 128 center
        let accum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          accum += v * v;
        }
        const rms = Math.sqrt(accum / buf.length);
        sum += rms;
        samples++;
      } catch {}
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(t);
      const avg = samples > 0 ? sum / samples : 0.15;
      const target = 0.2; // ~-14 LUFS vibe
      const factor = Math.min(2, Math.max(0.5, target / Math.max(0.001, avg)));
      try { gain.gain.setTargetAtTime(factor, (audioCtxRef.current as any)?.currentTime || 0, 0.05); } catch { gain.gain.value = factor; }
      normComputedForSrc.current = currentSrc;
    }, 900);
    return () => { clearInterval(t); clearTimeout(timeout); };
  }, [normalize, currentSrc]);

  const stop = () => {
    const audio = audioEl.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  setIsPlaying(false);
  setReady(false);
  };

  // removed test tone

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioEl.current;
    if (!audio) return;
    const v = Number(e.target.value);
    audio.currentTime = v;
    // current state will update via timeupdate but we set it optimistically
  setCurrent(v);
  };

  // Derive label from the actual element state to avoid UI desync
  const playbackLabel = useMemo(() => {
    const a = audioEl.current;
    if (a) return a.paused ? "Play" : "Pause";
    return isPlaying ? "Pause" : "Play";
  }, [isPlaying]);

  // Try to auto-play when the source changes (best-effort)
  useEffect(() => {
    const audio = audioEl.current;
    if (!audio) return;
    try { audio.pause(); } catch {}
    try { audio.load(); } catch {}
    audio.currentTime = 0;
  setIsPlaying(false);
    setCurrent(0);
  setBuffering(true);
  setReady(false);
    if (!autoPlayOnSrcChange) return;
    (async () => {
      try {
        if (audioCtxRef.current?.state === "suspended") await audioCtxRef.current.resume();
  await audio.play();
  setErrMsg(null);
      } catch {
        // ignore – user can press Play or click a track (imperative API)
      }
    })();
  }, [currentSrc, autoPlayOnSrcChange]);
  // Footer integration removed

  // Fallback autoplay removed when autoPlayOnSrcChange is false (privacy/user intent)

  // removed debug telemetry

  return (
    <div className="space-y-3">
  <audio ref={audioEl} src={currentSrc} preload="auto" playsInline />
  <div className="hud-screen scanlines rounded">
    <canvas ref={canvasRef} width={640} height={vizHeight} className="w-full" />
    {/* slim buffering bar */}
    {buffering && (
      <div className="absolute left-0 right-0 bottom-0 h-[3px] overflow-hidden rm-no-anim">
        <div className="h-full w-full bg-gradient-to-r from-[#7A00FF66] via-[#00B3C666] to-[#7A00FF66] animate-[pulse_1.2s_ease_infinite]" />
      </div>
    )}
  {/* no textual buffering chip to keep UI minimal */}
  </div>
  {/* New compact control bar */}
  <div className="player-bar">
    <div className="controls-row">
  <div className="btns">
      <button
        className="btn-ghost-round"
        onClick={() => onPrevProp && onPrevProp()}
        aria-label="Previous"
        title="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
  <button
        className="btn-primary-round disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={togglePlay}
        disabled={!ready}
        aria-disabled={!ready}
        aria-pressed={playbackLabel === 'Pause'}
        title={playbackLabel}
      >
        {playbackLabel === 'Pause' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5l12 7-12 7V5z" />
          </svg>
        )}
      </button>
      <button
        className="btn-ghost-round"
        onClick={() => onNextProp && onNextProp({ shuffle })}
        aria-label="Next"
        title="Next"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
          <button
            className={["icon-toggle", "icon-toggle-sm", shuffle ? "icon-active" : ""].join(" ")}
            onClick={() => setShuffle(s => !s)}
            aria-pressed={shuffle}
            title="Shuffle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h4l4 6 4 0"/>
              <path d="M4 20h4l4-6 4 0"/>
              <path d="M20 10l-3-3m3 3l-3 3"/>
              <path d="M20 14l-3-3m3 3l-3 3"/>
            </svg>
          </button>
          <button
            className={["icon-toggle", "icon-toggle-sm", repeatOne ? "icon-active" : ""].join(" ")}
            onClick={() => setRepeatOne(r => !r)}
            aria-pressed={repeatOne}
            title="Repeat one"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              <text x="11" y="15" fontSize="8" fill="currentColor">1</text>
            </svg>
          </button>
  </div>

  <div className="sep" />

      <div className="time-label tabular-nums" aria-live="polite">{fmt(current)} / {fmt(duration)}</div>
      <input
        type="range"
        min={0}
        max={Math.max(1, duration || 1)}
        step={0.01}
        value={Math.min(current, duration || 0)}
        onChange={onSeek}
        className="range-thin seek"
        aria-label="Seek"
      />

      {/* Single volume slider, no mute button */}
      <div className="vol" title="Volume">
        <svg className="vol-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 5l-5 4H3v6h3l5 4V5z"/>
          <path d="M19 8a5 5 0 0 1 0 8"/>
          <path d="M15 10a3 3 0 0 1 0 4"/>
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="range-thin w-20 sm:w-24"
        />
      </div>

  {/* stop button removed */}
    </div>
  </div>
  {/* buffering chip moved into visualizer overlay */}
      {errMsg && <div className="text-xs text-red-400">{errMsg}</div>}
      {vizDisabled && <div className="text-[10px] text-gray-500">Vizualizace vypnuta (CORS na externím hostiteli).</div>}
    </div>
  );
});
