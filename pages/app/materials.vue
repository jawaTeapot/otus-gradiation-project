<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/media/materials.html?app=${getIdProject()}`" target="_blank">
      {{ $t('menuLinks.materials') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getIdProject, getSourceUrl } from '~/composables'
</script>
