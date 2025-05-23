// userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userData: {},
      setUserDocumentId: (documentId) => {
        set({ userData: { documentId } });
      }
    }),
    {
      name: 'user-storage' // ключ для localStorage
    }
  )
);

export default useUserStore;