import { create } from "zustand"

interface TgUserIdState {
  tgUserId: number | null
  ChildBotUserId: number | null
  tgParentId: number | null
  first_name: string | null
  photo_url: string | null
  setTgUserId: (tgUserId: number) => void
  setChildBotUserId: (tgChildId: number) => void
  setParentId: (tgParentId: number) => void
  setFirstName: (first_name: string) => void
  setPhotoUrl: (photo_url: string) => void
}

export const useTgUser = create<TgUserIdState>((set) => ({
  tgUserId: null,
  ChildBotUserId: null,
  tgParentId: null,
  first_name: null,
  photo_url: null,
  setTgUserId: (tgUserId: number) => set({ tgUserId: tgUserId }),
  setChildBotUserId: (tgChildBotUserId: number) => set({ ChildBotUserId: tgChildBotUserId }),
  setParentId: (tgParentId: number) => set({ tgParentId: tgParentId }),
  setFirstName: (first_name: string) => set({ first_name }),
  setPhotoUrl: (photo_url: string) => set({ photo_url }),
}))
