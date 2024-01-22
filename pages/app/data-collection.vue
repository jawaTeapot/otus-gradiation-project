<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/collection.html?app=${getIdProject()}`" target="_blank">
      {{ $t('menuLinks.data-collection') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getIdProject, getSourceUrl } from '~/composables'
import TimeComponent from '~/components/app/timeComponent.vue'
</script>
