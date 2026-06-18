import { create } from "zustand";

export type Mode = "idle" | "exploring" | "focused" | "detail";

interface ProjectStore {
  mode: Mode;
  hoveredId: string | null;
  selectedId: string | null;
  setHovered: (id: string | null) => void;
  select: (id: string) => void;
  back: () => void;
  setExploring: () => void;
  setIdle: () => void;
}

let detailTimer: ReturnType<typeof setTimeout> | null = null;

export const useProjectStore = create<ProjectStore>((set, get) => ({
  mode: "idle",
  hoveredId: null,
  selectedId: null,

  setHovered: (id) => set({ hoveredId: id }),

  select: (id) => {
    if (detailTimer) clearTimeout(detailTimer);
    set({ mode: "focused", selectedId: id, hoveredId: null });
    detailTimer = setTimeout(() => {
      if (get().selectedId === id) set({ mode: "detail" });
    }, 950);
  },

  back: () => {
    if (detailTimer) clearTimeout(detailTimer);
    set({ mode: "exploring", selectedId: null, hoveredId: null });
  },

  setExploring: () => {
    const { mode } = get();
    if (mode === "idle") set({ mode: "exploring" });
  },

  setIdle: () => {
    const { mode } = get();
    if (mode === "exploring") set({ mode: "idle", hoveredId: null });
  },
}));
