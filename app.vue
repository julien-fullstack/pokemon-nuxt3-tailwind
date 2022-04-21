<template>
  <div class="relative min-h-full flex flex-col">
    <NuxtLayout>
      <TeamModale />
      <Nav />
      <div>
        <NuxtPage />
        <Alert v-if="layoutStore.isSuccessAlertOpen || layoutStore.isErrorAlertOpen" class="fixed bottom-4 right-4" />
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import Alert from './components/alerts/Alert.vue';
import { useLayoutStore } from '~~/stores/layout';

const layoutStore = useLayoutStore()
</script>