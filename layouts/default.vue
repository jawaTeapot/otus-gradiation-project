<template>
  <app-loader v-if="loader.isLoading" />
  <div v-else class="h-screen grid grid-cols-1 xl:grid-cols-[auto_1fr]">
    <app-sidebar />
    <div class="flex flex-col justify-between">
      <div>
        <app-header />
        <main class="p-2 md:p-3 lg:p-5">
          <slot />
        </main>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/store/loader'
import { useUserStore } from '~/store/user'
const loader = useLoaderStore()
const userStore = useUserStore()

nextTick().then(async () => await useAsyncData('user', () => userStore.fetchUserData()))
</script>

<style scoped lang="scss" />
