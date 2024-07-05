import { create } from "zustand"

interface ChildState {
  ChildId: number | null
  setChildId: (tgUserId: number | null) => void
}

export const useChild = create<ChildState>((set) => ({
  ChildId: null,
  setChildId: (ChildId: number | null) => set({ ChildId: ChildId }),
}))
