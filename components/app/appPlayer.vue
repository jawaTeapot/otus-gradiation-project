<template>
  <client-only>
    <iframe
      width="100%"
      height="100%"
      :src="`https://play.boomstream.com/VCcNtuiw?&skin=${playerProps.playerId}`"
      frameborder="0"
      scrolling="no"
    />
  </client-only>
</template>

<script setup lang="ts">
const playerProps = defineProps<{
  playerId?: number;
  playerSkin?: string;
}>()
</script>
