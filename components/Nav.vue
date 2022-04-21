<template>
  <Disclosure as="nav" class="flex-shrink-0 bg-blue-600">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <NuxtLink to="/">
          <img class="w-10 -h-10"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg" />
        </NuxtLink>
        <div class="flex-1 flex justify-center lg:justify-end">
          <div class="w-full px-2 lg:px-6">
            <label for="search" class="sr-only">Type pokemon name</label>
            <div class="relative text-blue-200 focus-within:text-gray-400">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input v-model="searchValue" v-on:keyup.enter="onEnter(searchValue)" id="search" name="search"
                class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-blue-400 bg-opacity-25 text-blue-100 placeholder-blue-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                placeholder="Search pokemon" type="search" autocomplete="off" />
            </div>
          </div>
        </div>
        <UserGroupIcon @click="mainStore.modal = !mainStore.modal" class="h-6 w-6 text-white cursor-pointer">
        </UserGroupIcon>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure } from '@headlessui/vue'
import { SearchIcon, UserGroupIcon } from '@heroicons/vue/solid'
import { useMainStore } from '~~/stores/main'

const mainStore = useMainStore()

const searchValue = ref('')
const router = useRouter()
const onEnter = () => {
  if (searchValue.value) {
    router.push({ path: `/details-${searchValue.value}` })
  }
}
</script>