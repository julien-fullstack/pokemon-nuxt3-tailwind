<template>
  <div class="bg-white">
    <div aria-hidden="true" class="relative">
      <img src="https://wallpaperaccess.com/full/1794017.png" alt="" class="w-full h-60 object-center object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-white" />
    </div>

    <div v-if="!errorFetchingApi" class="relative -mt-12 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
      <img class="absolute -top-40 left-0 right-0 ml-auto mr-auto w-48 h-48"
        :src="mainStore.getSpriteUrl(pokemonInfos.id.value) || ''" alt="" />

      <div class="max-w-2xl mx-auto pt-20 text-center lg:max-w-4xl">
        <AddToTeamBtn :pokemon="pokemon" />
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
        <p class="mt-4 text-gray-500">Each Pokémon belongs to a specific species but may take on a variant which makes
          it differ from other Pokémon of the same species,
          such as base stats, available abilities and typings.</p>
      </div>

      <dl
        class="mt-16 max-w-2xl mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
        <div v-for="feature in pokemonInfos" :key="feature.value" class="border-t border-gray-200 pt-4">
          <dt class="font-medium text-gray-900">{{ feature.value }}</dt>
          <dd class="mt-2 text-sm text-gray-500">{{ feature.description }}</dd>
        </div>
      </dl>
    </div>

    <div v-else class="relative -mt-12 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
      <img class="absolute -top-40 left-0 right-0 ml-auto mr-auto w-48 aspect-auto" src="~/assets/images/unown-question.png"
        alt="" />
      <div class="max-w-2xl mx-auto pt-20 text-center lg:max-w-4xl">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pokemon doesn't exist</h2>
        <NuxtLink to="/">
          <p class="mt-4 text-gray-500">Go to Pokedex</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '~~/stores/main';
import AddToTeamBtn from '~~/components/buttons/AddToTeamBtn.vue';
import { Pokemon } from  '~~/stores/main';

onMounted(() => {
  mainStore.team = JSON.parse(localStorage.getItem("team"))
})

const route = useRoute()
const name = route.params.name
const mainStore = useMainStore()

const { data: rawData, error } = await useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

// TODO: type api return
const pokemonInfos = {
  id: { value: rawData.value?.id || '', description: '	The identifier for this resource.' },
  name: { value: rawData.value?.name || '', description: 'The name for this resource.' },
  base_experience: { value: rawData.value?.base_experience || '', description: 'The base experience gained for defeating this Pokémon.' },
  height: { value: rawData.value?.height || '', description: 'The height of this Pokémon in decimetres.' },
  order: { value: rawData.value?.order || '', description: 'Order for sorting. Almost national order, except families are grouped together.' },
  weight: { value: rawData.value?.weight || '', description: 'The weight of this Pokémon in hectograms.' },
}

const pokemon: Pokemon = {
  id: Number(pokemonInfos.id.value),
  name: pokemonInfos.name.value,
}

const errorFetchingApi = computed(() => !!error.value)

</script>