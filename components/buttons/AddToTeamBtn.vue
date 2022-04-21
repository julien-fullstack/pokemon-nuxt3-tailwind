<template>
  <div @click="mainStore.addToTeam(pokemon)" class="hover:underline">
    <div class="inline-flex items-center p-1 rounded-full text-white">
      <PlusCircleIconSolid class="h-8 w-8 fill-blue-600 hover:fill-blue-700" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon as PlusCircleIconSolid } from '@heroicons/vue/solid'
import { Pokemon, useMainStore } from '~~/stores/main';

const mainStore = useMainStore()

defineProps<{
  pokemon: Pokemon
}>()

</script>