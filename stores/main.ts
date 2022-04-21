import { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'

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

// export const useMainStore = defineStore('main', () => {
//   const offset = ref(0)
//   const team: Ref<Pokemon[]> = ref([])
//   const modal = ref(false)

//   const addToTeam = (pokemon: Pokemon) => {
//     const layoutStore = useLayoutStore()
//     layoutStore.resetAlerts()

//     const pokemonInState = team.findIndex(p => p.id === pokemon.id)
//     if (!isTeamFull) {
//       if (pokemonInState === -1) {
//         team.push({ ...pokemon, count: 1, order: team.length })
//       }
//       else {
//         team[pokemonInState].count++
//       }
//       layoutStore.isSuccessAlertOpen = true
//     }
//     else {
//       layoutStore.isErrorAlertOpen = true
//     }
//   } 
// })

export const useMainStore2 = defineStore('main', {
  state: () => {
    return {
      offset: 0,
      team: [],
      modal: false
    } as MainStore
  },
  actions: {
    addToTeam(pokemon: Pokemon) {
      const layoutStore = useLayoutStore()
      layoutStore.resetAlerts()

      const pokemonInState = this.team.findIndex(p => p.id === pokemon.id)
      if (!this.isTeamFull) {
        if (pokemonInState === -1) {
          this.team.push({ ...pokemon, count: 1, order: this.team.length })
        }
        else {
          this.team[pokemonInState].count++
        }
        layoutStore.isSuccessAlertOpen = true
      }
      else {
        layoutStore.isErrorAlertOpen = true
      }
    },
    removeFromTeam(pokemon: Pokemon) {
      const pokemonInState = this.team.findIndex(p => p.id === pokemon.id)
      if (pokemonInState !== -1) {
        this.team[pokemonInState].count--
        if (this.team[pokemonInState].count === 0) {
          this.team.splice(pokemonInState, 1)
        }
      }
    }
  },
  getters: {
    getSpriteUrl() {
      return (id: number) => id < 650 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` :
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    },
    getTotalCount(state) {
      return state.team.reduce((acc, cur) => acc + (cur.count || 1), 0)
    },
    isTeamFull() {
      return this.getTotalCount >= 6
    }
  }
})
