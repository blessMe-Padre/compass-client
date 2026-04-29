// userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userData: {},
      setUserData: (userData) => {
        set({ userData });
      },
      setUserDocumentId: (documentId) => {
        set((state) => ({ userData: { ...state.userData, documentId } }));
      }
    }),
    {
      name: 'user-storage' // ключ для localStorage
    }
  )
);

export default useUserStore;