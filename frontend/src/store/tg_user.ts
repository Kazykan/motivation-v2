import { create } from "zustand"

interface TgUserIdState {
  tgChildId: number | null
  tgParentId: number | null
  first_name: string | null
  photo_url: string | null
  setTgChildId: (tgUserId: number) => void
  setParentId: (tgUserId: number) => void
  setFirstName: (first_name: string) => void
  setPhotoUrl: (photo_url: string) => void
}

export const useTgUser = create<TgUserIdState>((set) => ({
  tgChildId: null,
  tgParentId: null,
  first_name: null,
  photo_url: null,
  setTgChildId: (tgUserId: number) => set({ tgChildId: tgUserId }),
  setParentId: (tgParentId: number) => set({ tgParentId: tgParentId}),
  setFirstName: (first_name: string) => set({ first_name }),
  setPhotoUrl: (photo_url: string) => set({ photo_url }),
}))
