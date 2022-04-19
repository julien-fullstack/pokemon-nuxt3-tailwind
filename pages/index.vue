<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
      <div class="space-y-8 sm:space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Pokedex</h2>
          <p class="text-xl text-gray-500">Pokémon involves the catching and training of fictional creatures called
            "Pokémon" and using them to battle other Trainers.</p>
        </div>
        <ul role="list"
          class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
          <li v-for="pokemon in pokemons" :key="pokemon.name">
            <button class="space-y-4 relative text-center group">
              <img class="mx-auto h-20 w-20 lg:w-24 lg:h-24 group-hover:blur-md" :src="mainStore.getSpriteUrl(pokemon.id)"
                alt="" />
              <div class="hidden group-hover:inline"
                style="position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);">
                <NuxtLink :to="`/details-${pokemon.name}`">
                  details
                </NuxtLink>
                <h3 @click="addToTeam(pokemon)">
                  add
                </h3>
                <!-- <h3>
                  remove
                </h3> -->
              </div>
              <div class="space-y-2">
                <div class="text-xs font-medium lg:text-sm">
                  <h3>{{ pokemon.name }}</h3>
                </div>
              </div>
            </button>
          </li>
        </ul>
        <button type="button"
          v-if="offset < 1101"
          @click="seeMore()"
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
          &nbsp; See more
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/vue/outline'
import { useMainStore } from '~~/stores/main';
import { getPokemonBasic } from '../helper'
import { Pokemon } from '~~/stores/main'
import { Ref } from 'vue';

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

// TODO: @error change image src
// const replaceImg = (e, id) => {
//   e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
// }

const seeMore = async () => {
  const { data, error } = await useFetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
  if (!error.value) {
    console.log(pokemons.value)
    data.value.results.forEach(pokemon => {
      pokemons.value.push(getPokemonBasic(pokemon))
    })
    offset += 100
  }
}

const addToTeam = (pokemon: Pokemon) => {
  const pokemonInState = mainStore.team.findIndex(p => p.id === pokemon.id)
  console.log(pokemonInState)
  if (pokemonInState === -1) {
    mainStore.team.push({ ...pokemon, count: 1, order: mainStore.team.length })
  }
  else {
    mainStore.team[pokemonInState].count++
  }
  // if (pokemonInState >= 0) {
  //   mainStore.team[pokemonInState].count++
  // } else if (pokemonInState < 0) {
  //   mainStore.team[pokemonInState].count = 1
  // } else {
  //   mainStore.team.push(pokemon)
  // }
  // mainStore.team = [...mainStore.team, pokemon]
}

</script>