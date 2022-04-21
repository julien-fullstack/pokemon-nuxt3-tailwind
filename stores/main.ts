import { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'

export type Pokemon = {
  id: number,
  name: string,
  count?: number,
  base_experience?: string,
  height?: string,
  order?: string,
  weight?: string,
}

export const useMainStore = defineStore('main', () => {
  // STATE
  const offset: Ref<Number> = ref(0)
  const team: Ref<Pokemon[]> = ref([])
  const modal: Ref<Boolean> = ref(false)

  // ACTIONS
  const addToTeam = (pokemon: Pokemon) => {
    const layoutStore = useLayoutStore()
    layoutStore.resetAlerts()

    const pokemonInState = team.value.findIndex(p => p.id === pokemon.id)
    if (!isTeamFull.value) {
      if (pokemonInState === -1) {
        team.value.push({ ...pokemon, count: 1 })
      }
      else {
        team.value[pokemonInState].count = team.value[pokemonInState].count + 1
      }
      layoutStore.isSuccessAlertOpen = true
    }
    else {
      layoutStore.isErrorAlertOpen = true
    }
  }

  const removeFromTeam = (pokemon: Pokemon) => {
    const pokemonInState = team.value.findIndex(p => p.id === pokemon.id)
    if (pokemonInState !== -1) {
      team.value[pokemonInState].count--
      if (team.value[pokemonInState].count === 0) {
        team.value.splice(pokemonInState, 1)
      }
    }
  }

  const getSpriteUrl = (id: number) => {
    return id < 650 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` :
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  // GETTERS
  const getTotalCount = computed(() => {
    return team.value.reduce((acc, cur) => acc + (cur.count || 1), 0)
  })

  const isTeamFull = computed(() => {
    return getTotalCount.value >= 6
  })

  return {
    offset,
    team,
    modal,
    addToTeam,
    removeFromTeam,
    getSpriteUrl,
    getTotalCount,
    isTeamFull
  }
})
