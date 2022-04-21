<template>
  <div>
    <div class="inline-flex items-center p-1 rounded-full text-white">
      <Popper :disabled="isDisabled" hover placement="right" disablePortal content="Add to team" zIndex=9999>
        <div @click="mainStore.addToTeam(pokemon)">
          <PlusCircleIconSolid class="h-8 w-8 fill-blue-600 hover:fill-blue-700" aria-hidden="true" />
        </div>
      </Popper>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@/assets/popper.css'
import { PlusCircleIcon as PlusCircleIconSolid } from '@heroicons/vue/solid'
import { Pokemon, useMainStore } from '~~/stores/main';
import Popper from "vue3-popper";
import { useBreakpointTailwindCSS } from 'vue-composable';

const mainStore = useMainStore()

const { current } = useBreakpointTailwindCSS()

const isDisabled = computed(() => {
  return ["md", "sm", undefined].includes(current.value)
})

defineProps<{
  pokemon: Pokemon
}>()
</script>