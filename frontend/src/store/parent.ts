import { create } from "zustand"

interface ParentState {
  parentId: number | null
  setParentId: (parentId: number) => void
}

export const useParent = create<ParentState>((set) => ({
  parentId: null,
  setParentId: (parentId: number) => set({ parentId: parentId }),
}))
