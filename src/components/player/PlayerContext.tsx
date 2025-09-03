"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

export type PlayerMeta = {
  id?: string;
  title?: string;
  subtitle?: string;
  url?: string;
};

export type PlayerController = {
  // controls tied to the current page player
  play: () => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
  seek: (time: number) => void;
  next?: () => void;
  prev?: () => void;
};

export type PlayerState = {
  meta: PlayerMeta | null;
  isPlaying: boolean;
  ready: boolean;
  current: number;
  duration: number;
};

type Ctx = {
  state: PlayerState;
  controller: PlayerController | null;
  // registration from page-level player
  register: (c: PlayerController, s: Partial<PlayerState>) => void;
  update: (s: Partial<PlayerState>) => void;
};

const PlayerContext = createContext<Ctx | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [controller, setController] = useState<PlayerController | null>(null);
  const [state, setState] = useState<PlayerState>({ meta: null, isPlaying: false, ready: false, current: 0, duration: 0 });

  const value = useMemo<Ctx>(() => ({
    state,
    controller,
    register: (c, s) => {
      setController(() => c);
      setState((prev) => ({ ...prev, ...s } as PlayerState));
    },
    update: (s) => setState((prev) => ({ ...prev, ...s } as PlayerState)),
  }), [state, controller]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
