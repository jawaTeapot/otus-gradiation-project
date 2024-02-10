<template>
  <div class="w-full h-screen grid grid-cols-1">
    <div class="flex items-center justify-center">
      <Nuxt-link class="no-underline" :to="{ path: '/app' }">
        Dashboard
      </Nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  public: true,
  layout: 'website'
})

</script>

<style scoped lang="scss" />
