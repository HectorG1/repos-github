import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoriteReposState = {
  favoriteReposIds: { id: number, user: string }[],
  gitHubUser: string,
  setGitHubUser: (user: string) => void,
  addFavoriteRepo: (id: number) => void,
  removeFavoriteRepo: (id: number, user: string) => void,
}

export const useFavoroiteReposStore = create(persist<FavoriteReposState>(
  (set) => ({
    favoriteReposIds: [],
    gitHubUser: '',
    setGitHubUser: (user: string) => set(() => ({ gitHubUser: user })),
    addFavoriteRepo: (id: number) =>
      set((state) => {
        const alreadyExists = state.favoriteReposIds.some(
          (repo) => repo.id === id && repo.user === state.gitHubUser
        );

        if (alreadyExists) return state;

        return {
          favoriteReposIds: [
            ...state.favoriteReposIds,
            { id, user: state.gitHubUser },
          ],
        };
      }),
    removeFavoriteRepo: (id: number, user: string) =>
      set((state) => ({
        favoriteReposIds: state.favoriteReposIds.filter(
          (repo) => !(repo.id === id && repo.user === user)
        )
      }))
  }), {
  name: 'favorite-repos',
}
))