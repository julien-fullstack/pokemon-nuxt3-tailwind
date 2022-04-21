import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => {
    return {
      isSuccessAlertOpen: false,
      isErrorAlertOpen: false
    }
  },
  actions: {
    resetAlerts() {
      this.isSuccessAlertOpen = false
      this.isErrorAlertOpen = false
    }
  },
  getters: {}
})
