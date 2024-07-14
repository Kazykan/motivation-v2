import { create } from "zustand"

interface ISwitchEdit {
  isEdit: boolean
  setIsEdit: () => void
}

export const useSwitchEdit = create<ISwitchEdit>((set) => ({
  isEdit: false,

  setIsEdit: () => set((state) => ({ isEdit: !state.isEdit })),
}))
