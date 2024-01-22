<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/account/activity.html`" target="_blank">
      {{ $t('menuLinks.activity') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getSourceUrl } from '~/composables'
import TimeComponent from '~/components/app/timeComponent.vue'
</script>
