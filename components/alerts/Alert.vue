<template>
  <div :class="`rounded-md bg-${color()}-50 p-4`">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon :class="`h-5 w-5 text-${color()}-400`" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <div :class="`text-sm font-medium text-${color()}-800`">{{text()}}</div>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button @click="closeAlert" type="button"
            :class="`inline-flex bg-${color()}-50 rounded-md p-1.5 text-${color()}-500 hover:bg-${color()}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${color()}-50 focus:ring-${color()}-600`">
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XIcon } from '@heroicons/vue/solid'
import { useLayoutStore } from '~~/stores/layout';

const layoutStore = useLayoutStore()

setTimeout(() => {
  layoutStore.isSuccessAlertOpen = false
  layoutStore.isErrorAlertOpen = false
}, 2000)

const color = () => {
  if (layoutStore.isSuccessAlertOpen) {
    return 'green'
  } 
  if (layoutStore.isErrorAlertOpen) {
    return 'red'
  }
}

const text = () => {
  if (layoutStore.isSuccessAlertOpen) {
    return 'Successfully added to team'
  } 
  if (layoutStore.isErrorAlertOpen) {
    return 'Team is full, please remove a pokemon'
  }
}

const closeAlert = () => {
  if (layoutStore.isSuccessAlertOpen) {
    layoutStore.isSuccessAlertOpen = false
  } else if (layoutStore.isErrorAlertOpen) {
    layoutStore.isErrorAlertOpen = false
  }
}

</script>