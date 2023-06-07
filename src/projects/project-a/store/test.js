import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => ({
    count: 0
  }),
  getters: {},
  actions: {
    addCount() {
      this.count++
    }
  }
})
