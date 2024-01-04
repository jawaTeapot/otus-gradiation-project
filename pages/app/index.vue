<template>
  <div>
    <h1>Hello World</h1>
    <div>{{ userStore.user }}</div>
    <el-divider />
    <div>
      {{ projectsStore.projects }}
    </div>

    <!-- Form -->
    <el-button text @click="dialogFormVisible = true">
      open a Form nested Dialog
    </el-button>
    <client-only>
      <el-dialog
        v-model="dialogFormVisible"
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
          <app-create-project @is-open="dialogFormVisible = false" />
        </template>
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'
import { useProjectsStore } from '~/store/projects'

definePageMeta({
  layout: 'default',
  public: false
})

// const props = defineProps<{
//   isOpen: boolean,
// }>()
//
// const emit = defineEmits(['update:modelValue'])
//
// const setMyDrawer = computed({
//   get () {
//     return props.modelValue
//   },
//   set (e: boolean) {
//     return emit('update:modelValue', e)
//   }
// })

const userStore = useUserStore()
const projectsStore = useProjectsStore()

const dialogFormVisible = ref(false)
</script>

<style scoped lang="scss">
</style>
