<template>
  <div>
    <h1>Hello World</h1>
    <div>{{ userStore.user }}</div>
    <el-divider />
    <div>
      {{ projectsStore.projects }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'
import { useProjectsStore } from '~/store/projects'

definePageMeta({
  layout: 'default',
  public: false
})

const userStore = useUserStore()
const projectsStore = useProjectsStore()

</script>

<style scoped lang="scss">
</style>
