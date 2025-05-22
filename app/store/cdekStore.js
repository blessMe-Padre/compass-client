import { create } from 'zustand';

const useCdekTokenStore = create((set) => ({
    token: null,
    setToken: ({ access_token }) => {
        set({
            token: access_token,
        })
    },
    clearToken: () => set({ token: null }),
}))

export default useCdekTokenStore;