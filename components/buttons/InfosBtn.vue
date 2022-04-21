<template>
  <Popper :disabled="isDisabled" hover placement="left" disablePortal content="More infos" zIndex=9999>
    <span class="inline-flex items-center p-1 rounded-full text-white">
      <NuxtLink :to="`/details-${pokemon.name.toLowerCase()}`">
        <InformationCircleIconSolid class="h-8 w-8 fill-blue-600 hover:fill-blue-700" aria-hidden="true" />
      </NuxtLink>
    </span>
  </Popper>
</template>

<script setup lang="ts">
import '@/assets/popper.css'
import Popper from "vue3-popper";
import { InformationCircleIcon as InformationCircleIconSolid } from '@heroicons/vue/solid/index.js'
import { Pokemon } from '~~/stores/main'
import { useBreakpointTailwindCSS } from 'vue-composable';

const { current } = useBreakpointTailwindCSS()

const isDisabled = computed(() => {
  return ["md", "sm", undefined].includes(current.value)
})

defineProps<{
  pokemon: Pokemon
}>()
</script>
