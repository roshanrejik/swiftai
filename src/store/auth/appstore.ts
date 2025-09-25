import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type appStoreStateType = {
  firstTimeUser: boolean
  updateFirstTimeUser: (firstTimeUser: boolean) => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useAppStore = create<appStoreStateType>()(
  persist(
    (set) => ({
      firstTimeUser: true,
      updateFirstTimeUser: (firstTimeUser) => set({ firstTimeUser }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
