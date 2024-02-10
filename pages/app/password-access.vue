<template>
  <div class="p-5">
    <time-component />
    <nuxt-link class="text-2xl text-green-500" :to="`${getSourceUrl()}/password.html?app=${getIdProject()}`" target="_blank">
      {{ $t('menuLinks.password-access') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { getIdProject, getSourceUrl } from '~/utils'
import TimeComponent from '~/components/app/timeComponent.vue'
</script>
