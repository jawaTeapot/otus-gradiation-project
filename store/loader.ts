import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(true)
  const setLoader = (val: boolean) => {
    isLoading.value = val
  }
  return {
    isLoading, setLoader
  }
})
