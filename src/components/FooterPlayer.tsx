"use client";
import { usePlayer } from "./player/PlayerContext";

export default function FooterPlayer() {
  const { state, controller } = usePlayer();
  const { meta, isPlaying, current, duration, ready } = state;

  const pct = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;

  return (
    <div className="footer-player">
      <div className="now">
        <div className="t1">{meta?.title || "No track"}</div>
        <div className="t2">{meta?.subtitle || ""}</div>
      </div>
      <div className="controls">
        <button className="fp-btn" onClick={() => controller?.prev?.()} disabled={!controller?.prev} title="Previous" aria-label="Previous">⟨⟨</button>
        <button className="fp-btn fp-primary" onClick={() => controller?.toggle()} disabled={!ready} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? "❚❚" : "►"}</button>
        <button className="fp-btn" onClick={() => controller?.next?.()} disabled={!controller?.next} title="Next" aria-label="Next">⟩⟩</button>
      </div>
      <div className="timeline">
        <div className="bar"><div className="fill" style={{ width: pct + "%" }} /></div>
        <div className="nums">{fmt(current)} / {fmt(duration)}</div>
      </div>
    </div>
  );
}

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
