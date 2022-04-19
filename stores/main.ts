import { defineStore } from 'pinia'

export type Pokemon = {
  id: number,
  name: string,
  count?: number,
  order?: number
}
type MainStore = {
  offset: number,
  team: Pokemon[],
  modal: boolean
}

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      offset: 0,
      team: [],
      modal: true
    } as MainStore
  },
  actions: {},
  getters: {
    getSpriteUrl() {
      return (id: number) => id < 650 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` :
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }
})
