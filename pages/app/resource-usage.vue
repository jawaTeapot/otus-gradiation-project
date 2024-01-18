<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/collection.html`" target="_blank">
      {{ $t('menuLinks.resource-usage') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getSourceUrl } from '~/composables'
</script>
