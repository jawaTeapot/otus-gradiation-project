<template>
  <div>
    <app-loader v-if="loader.isLoading" />
    <div v-else class="h-screen grid grid-cols-1 xl:grid-cols-[auto_1fr]">
      <app-sidebar v-if="xl" />
      <div class="flex flex-col justify-between">
        <div>
          <app-header />
          <main class="p-2 md:p-3 lg:p-5">
            <app-completed-registration />
            <app-alert />
            <slot />
          </main>
        </div>
        <app-footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/store/loader'
import { useUserStore } from '~/store/user'

const xl = useMediaQuery('(min-width: 1280px)')
const loader = useLoaderStore()
const auth = useNuxtApp().$auth
const userStore = useUserStore()

onBeforeMount(async () => {
  await nextTick().then(async () => await useAsyncData('user', () => userStore.fetchUserData(auth.tokenStrategy.token?.get().toString() || '')))
})
</script>
