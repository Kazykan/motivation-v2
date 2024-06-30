import { create } from "zustand";

interface TgUserIdState {
    tgUserId: number | null;
    setTgUserId: (tgUserId: number) => void;
}

export const useTgUserId = create<TgUserIdState>((set) => ({
    tgUserId: null,
    setTgUserId: (tgUserId: number) => set({ tgUserId })
}))