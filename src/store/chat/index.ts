import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'


export type ConversationState = {
  items: []
  updateItems: (items: []) => void
 
  
}

export const useConverstationStore = create<ConversationState>()(
 
    (set) => ({
        items: [],
        updateItems: (items) => set({ items }),
    }),
    

)
