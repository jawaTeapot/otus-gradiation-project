<template>
  <div>
    <h1>Hello World</h1>
    <el-divider />
    <client-only>
      <el-dialog
        v-model="creatNewProject"
        fullscreen
        align-center
        append-to-body
        :show-close="false"
        :close-on-press-escape="false"
      >
        <template #header>
          <div class="text-xl font-bold md:text-2xl text-center">
            {{ $t('create-project.heading') }}
          </div>
        </template>
        <template #default>
          <app-create-project />
        </template>
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'
import AppCreateProject from '~/components/app/appCreateProject.vue'

definePageMeta({
  layout: 'default',
  public: false
})

const userStore = useUserStore()
const creatNewProject = computed(() => !userStore.userProjects.length)
</script>
