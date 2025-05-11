import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Cart state (for client)
      cart: [],
      addToCart: (item) => set((state) => ({ 
        cart: [...state.cart, item] 
      })),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
      clearCart: () => set({ cart: [] }),
      
      // UI state
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ 
        darkMode: !state.darkMode 
      })),
      
      // Orders state (for admin)
      orders: [],
      setOrders: (orders) => set({ orders }),
    }),
    {
      name: 'diko-store',
      skipHydration: false,
    }
  )
)
