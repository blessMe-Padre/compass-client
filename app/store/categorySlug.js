import { create } from 'zustand'

const useCategorySlug = create((set) => ({
    currentSlug: 'Каталог',
    setCurrentSlug: (value) => set(() => ({ currentSlug: value}))
}))

export default useCategorySlug;