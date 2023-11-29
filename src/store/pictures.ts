import { defineStore } from 'pinia'

export const useCounterStore = defineStore('pictures', {
  state: () => {
    return { pictures: [] }
  },
  actions: {
    getPictures() {
      this.pictures = [];
    }
  },
})
