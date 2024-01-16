<template>
  <div class="w-full h-screen grid grid-cols-1">
    <div class="flex items-center justify-center">
      <nuxt-link class="no-underline" :to="localePath({ path: '/app' })">
        Dashboard
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  public: true,
  layout: 'website'
})

const localePath = useLocalePath()
</script>

<style scoped lang="scss" />
