<template>
  <div class="bg-white">
    <div aria-hidden="true" class="relative">
      <img src="https://wallpaperaccess.com/full/1794017.png" alt="" class="w-full h-40 object-center object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-white" />
    </div>
    <div class="max-w-7xl mx-auto pypx-4 text-center sm:px-6 lg:px-8 lg:pb-24">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl flex flex-col">
          <img src="https://pokedex.sleduardo.dev/img/logo.svg" alt=""
            class="lg:max-w-lg md:max-w-md sm:max-w-sm max-w-[200px] self-center mx-auto">
          <p class="text-xl text-gray-500">Pokémon involves the catching and training of fictional creatures called
            "Pokémon" and using them to battle other Trainers.</p>
        </div>
        <ul role="list"
          class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:pt-16 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
          <li v-for="pokemon in pokemons" :key="pokemon.name">
            <button class="space-y-4 relative text-center group">
              <img class="mx-auto h-20 w-20 lg:w-24 lg:h-24 lg:group-hover:blur-md"
                :src="mainStore.getSpriteUrl(pokemon.id)" alt="" />
              <div class="hidden lg:group-hover:flex"
                style="position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);">
                <InfosBtn :pokemon="pokemon" />
                <AddToTeamBtn :pokemon="pokemon" />
              </div>
              <div class="flex lg:hidden">
                <InfosBtn :pokemon="pokemon" />
                <AddToTeamBtn :pokemon="pokemon" />
              </div>
              <div class="space-y-2">
                <div class="text-xs font-medium lg:text-sm">
                  <h3>{{ pokemon.name }}</h3>
                </div>
              </div>
            </button>
          </li>
        </ul>
        <button type="button" v-if="offset < 1101" @click="seeMore()"
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
          &nbsp; See more
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/vue/outline/index.js'
import { useMainStore } from '~~/stores/main'
import { getPokemonBasic } from '../helper'
import { Pokemon } from '~~/stores/main'
import { Ref } from 'vue'
import InfosBtn from '~~/components/buttons/InfosBtn.vue'
import AddToTeamBtn from '~~/components/buttons/AddToTeamBtn.vue'

onMounted(() => {
  mainStore.team = JSON.parse(localStorage.getItem("team"))
})

const mainStore = useMainStore()

const pokemons: Ref<Pokemon[]> = ref([])
let offset = 0
const { data: firstPokemons, error } = await useFetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')

firstPokemons?.value?.results?.forEach(
  pokemon => pokemons.value.push(getPokemonBasic(pokemon))
)

if (!error.value) {
  offset = 100
}

const seeMore = async () => {
  const { data, error } = await useFetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
  if (!error.value) {
    data.value.results.forEach(pokemon => {
      pokemons.value.push(getPokemonBasic(pokemon))
    })
    offset += 100
  }
}
</script>