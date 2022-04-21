<template>
  <NuxtLink :to="`/details-${pokemon.name.toLowerCase()}`">
    <span class="inline-flex items-center p-1 rounded-full text-white">
      <InformationCircleIconSolid class="h-8 w-8 fill-blue-600 hover:fill-blue-700" aria-hidden="true" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { InformationCircleIcon as InformationCircleIconSolid } from '@heroicons/vue/solid'
import { Pokemon } from '~~/stores/main'

defineProps<{
  pokemon: Pokemon
}>()

</script>