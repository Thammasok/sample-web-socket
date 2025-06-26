import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IUserStore {
  user: IAccountDocument | null
  setUser: (user: IAccountDocument) => void
  logout: () => void
}

export interface IAccountDocument {
  id: string
  displayName: string
  email: string
}

const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: IAccountDocument) => set({ user }),
      getUserId: () => get().user?.id,
      logout: () => {
        set({ user: null })
        window.location.href = '/login'
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useUserStore
