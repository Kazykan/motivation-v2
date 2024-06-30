import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IUserDetails, ISearchResonse, IGithubStore } from "stores/types"
import { stringify } from "querystring"
import methods from "@/telegram/APIService"

export const githubStore = create(
  persist<IGithubStore>(
    (set, get) => ({
      isLoading: false,
      cached_users_details: [], // to cache users details
      query: { page: 1, per_page: 20 },
      search: async (query) => {
        try {
          set(() => ({ isLoading: true }))
          window.history.pushState("", "", `?${stringify(query)}`)
          const data = await methods.get<ISearchResonse>({
            url: "/search/users",
            query,
          })
          set(() => ({ data, query, isLoading: false }))
        } catch (err: any) {
          const error =
            err?.message || err?.data?.message || "Unexpected network error."
          set(() => ({ isLoading: false, error }))
        }
      },
      getUser: async (username) => {
        try {
          set(() => ({ isLoading: true }))
          // check if user is already cached
          const userDetails = get().cached_users_details.find(
            (u) => u.login === username
          )
          if (userDetails) {
            set(() => ({ userDetails, isLoading: false }))
          } else {
            const userInfo = await methods.get<IUserDetails>({
              url: `/users/${username}`,
            })

            set((state) => ({
              cached_users_details: [...state.cached_users_details, userInfo],
              userDetails: userInfo,
              isLoading: false,
            }))
          }
        } catch (err: any) {
          const error =
            err?.message || err?.data?.message || "Unexpected network error."
          set(() => ({ isLoading: false, error }))
        }
      },
    }),
    {
      name: "search-storage",
      getStorage: () => sessionStorage,
    }
  )
)
