import { create } from "zustand";


export const useTgUserId = create((set) => ({
    tgUserId: null,
    setTgUserId: (tgUserId: number) => set({ tgUserId })
}))