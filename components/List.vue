<template>
  <div>
    <draggable v-model="mainStore.team" group="pokemon" @start="drag = true" @end="drag = false" item-key="id">
      <template #item="{ element }">
        <div class="grid grid-cols-1 gap-4 pb-4 last:pb-0">
          <div :key="element.id"
            class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
            <div class="flex-shrink-0">
              <img class="h-10 w-10" :src="mainStore.getSpriteUrl(element.id)" alt="" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900">
                  {{ element.name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ element.count }}
                </p>
              </div>
            </div>
            <div class="flex lg:flex-grow lg:justify-center">
              <div class="flex-shrink-0 z-50  lg:pr-1">
                <div @click="mainStore.removeFromTeam(element)"
                  class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <MinusSmIconSolid class="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div class="flex-shrink-0 z-50  lg:pl-1">
                <div @click="mainStore.addToTeam(element)"
                  class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PlusSmIconSolid class="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 z-50">
              <div class="rotate-45 ">
                <ArrowsExpandIcon class="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <p v-if="mainStore.getTotalCount === 0" class="text-center"> Add up to 6 Pokémons to your team</p>
  </div>
</template>

<script setup lang="ts">
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/vue/solid'
import { MinusSmIcon as MinusSmIconSolid } from '@heroicons/vue/solid'
import { ArrowsExpandIcon } from '@heroicons/vue/outline/index.js'
import { useMainStore } from '~~/stores/main';
import draggable from 'vuedraggable'

const drag = ref(false)
const mainStore = useMainStore()
</script>