import { create } from "zustand"

interface TgUserIdState {
  tgUserId: number | null
  first_name: string | null
  photo_url: string | null
  setTgUserId: (tgUserId: number) => void
  setFirstName: (first_name: string) => void
  setPhotoUrl: (photo_url: string) => void
}

export const useTgUser = create<TgUserIdState>((set) => ({
  tgUserId: null,
  first_name: null,
  photo_url: null,
  setTgUserId: (tgUserId: number) => set({ tgUserId }),
  setFirstName: (first_name: string) => set({ first_name }),
  setPhotoUrl: (photo_url: string) => set({ photo_url }),
}))
