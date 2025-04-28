import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCategorySlug = create(
  persist(
    (set) => ({
      currentSlug: 'Каталог',
      pageCount: 1,
      
      setCurrentSlug : (slug) => set({
        currentSlug: slug,
        pageCount: 1
      }),
      
      incrementPage: () => set((state) => ({
        pageCount: state.pageCount + 1
      }))
    }),
    {
      name: 'category-storage',
      getStorage: () => localStorage, 
      version: 1,
      migrate: (state, version) => {
        if (version !== 1) {
          return { ...state, pageCount: 1 }
        }
        return state
      }
    }
  )
)

export default useCategorySlug;