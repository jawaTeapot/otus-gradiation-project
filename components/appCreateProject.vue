<template>
  <div class="grid gap-y-3 xl:grid-cols-3 xl:gap-x-5">
    <el-card v-for="card in dataProject" :key="card.id" shadow="hover" class="!rounded-[15px]">
      <template #header>
        <div class="text-lg font-semibold text-center flex items-center justify-center xl:min-h-[60px]">
          {{ $t(card.heading) }}
        </div>
      </template>
      <template #default>
        <div class="xl:min-h-[185px]">
          <div class="mb-4 font-normal text-sm md:text-base">
            {{ $t(card.headline) }}
          </div>
          <div v-for="item of card.text" :key="item" class="grid grid-cols-[20px_1fr] gap-3 items-start">
            <Icon name="mdi:check-bold" class="text-2xl" />
            <span class="font-normal text-sm md:text-base">
              {{ $t(item) }}
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <el-button type="primary" class="w-[150px]" @click="open(card.id)">
            {{ $t(card.btn) }}
          </el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectsStore } from '~/store/projects'

const { t } = useI18n()
const projectsStore = useProjectsStore()

const dataProject = ref([
  {
    id: 'Empty',
    heading: 'create-project.card-1.heading',
    headline: 'create-project.card-1.headline',
    text: ['create-project.card-1.text-1', 'create-project.card-1.text-2', 'create-project.card-1.text-3'],
    btn: 'create-project.btn'
  },
  {
    id: 'Demo',
    heading: 'create-project.card-2.heading',
    headline: 'create-project.card-2.headline',
    text: ['create-project.card-2.text-1', 'create-project.card-2.text-2'],
    btn: 'create-project.btn'
  },
  {
    id: 'Ppv',
    heading: 'create-project.card-3.heading',
    headline: 'create-project.card-3.headline',
    text: ['create-project.card-3.text-1', 'create-project.card-3.text-2', 'create-project.card-3.text-3'],
    btn: 'create-project.btn'
  }
])

const open = (attribute: string) => {
  ElMessageBox.prompt(t('new-project.headline'), t('new-project.heading'), {
    confirmButtonText: t('new-project.btn-1'),
    cancelButtonText: t('new-project.btn-2'),
    inputType: 'text',
    inputPattern: /^(?=.*[^\s])\S+$/,
    inputErrorMessage: t('new-project.headline')
  })
    .then(async ({ value }) => {
      try {
        await projectsStore.createProject({
          input: {
            attribute,
            title: value
          }
        })
        ElMessage({
          showClose: true,
          grouping: true,
          center: true,
          type: 'success',
          message: `${t('new-project.success')} ${value}`
        })
      } catch (e) {
        console.log(e)
        ElMessage({
          showClose: true,
          grouping: true,
          center: true,
          type: 'error',
          message: t('new-project.error')
        })
      }
      return { value }
    })
}
</script>

<style scoped lang="scss">
</style>
