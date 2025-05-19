import { create } from 'zustand';

const useContactStore = create((set) => ({
    contacts: [],
    setContacts: (contacts) => set({ contacts: contacts })
}))

export default useContactStore;