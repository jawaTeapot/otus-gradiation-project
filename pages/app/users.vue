<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/account/users.html`" target="_blank">
      {{ $t('menuLinks.users') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getSourceUrl } from '~/utils'
import TimeComponent from '~/components/app/timeComponent.vue'
</script>
