<template>
  <div class="grid grid-cols-1 xl:grid-cols-[1fr_390px] xl:items-start  gap-5">
    <div class="grid grid-cols-1">
      <div class="text-lg md:text-xl font-medium">
        {{ $t('projectSettings.basic.title') }}
      </div>

      <el-divider />

      <client-only>
        <el-table :data="tableData" style="width: 100%" border scrollbar-always-on>
          <el-table-column prop="name" :label="$t('projectSettings.basic.table.header-1')" min-width="100" align="center" fixed />

          <el-table-column prop="size" :label="$t('projectSettings.basic.table.header-2')" min-width="130" align="center" />

          <el-table-column prop="options" :label="$t('projectSettings.basic.table.header-3')" min-width="370" />

          <el-table-column prop="number" :label="$t('projectSettings.basic.table.header-4')" min-width="145" align="center" />

          <el-table-column prop="copy" :label="$t('projectSettings.basic.table.header-5')" min-width="160" align="center" />
        </el-table>
      </client-only>
    </div>

    <el-card shadow="hover" body-class="!p-3 md:!p-5" style="border-radius: 15px">
      <div class="flex flex-col items-start gap-y-3">
        <div class="flex items-center">
          <Icon name="material-symbols:delete-forever-rounded" class="text-2xl mr-2.5" />

          <div class="font-bold">
            {{ $t('projectSettings.basic.card.heading') }}
          </div>
        </div>

        <div class="text-xs md:text-sm">
          {{ $t('projectSettings.basic.card.text') }}
        </div>

        <div class="w-full flex flex-col md:flex-row md:items-center xl:flex-col xl:items-start gap-3">
          <el-checkbox
            v-model="checked"
            :size="md ? 'default' : 'small'"
            border
            class="my-checkbox"
            :label="$t('projectSettings.basic.card.label')"
          />

          <el-button
            :size="md ? 'default' : 'small'"
            type="danger"
            :loading="isLoading"
            plain
            :disabled="!checked"
            @click="deleted()"
          >
            {{ $t('projectSettings.basic.card.btn') }}
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElTable } from 'element-plus'
import { useMediaQuery } from '@vueuse/core'
import { useProjectsStore } from '~/store/projects'

const md = useMediaQuery('(min-width: 767px)')
const { t } = useI18n()
const projectsStore = useProjectsStore()
const checked = ref(false)
const isLoading = ref(false)

const projectModel = computed({
  get () {
    if (!projectsStore.currentProject) {
      return ''
    } else {
      return projectsStore.currentProject.id
    }
  },
  set (nv) {
    projectsStore.changeCurrentProject(nv)
  }
})

const tableData = computed(() => [
  {
    name: '240p',
    size: '426 × 240',
    options: t('projectSettings.basic.table.text-1'),
    number: t('projectSettings.basic.table.text-2'),
    copy: t('projectSettings.basic.table.text-3')
  },
  {
    name: '360p',
    size: '640 × 360',
    options: t('projectSettings.basic.table.text-1'),
    number: t('projectSettings.basic.table.text-2'),
    copy: t('projectSettings.basic.table.text-3')
  },
  {
    name: '480p',
    size: '854 × 480',
    options: t('projectSettings.basic.table.text-1'),
    number: t('projectSettings.basic.table.text-2'),
    copy: t('projectSettings.basic.table.text-3')
  },
  {
    name: '720p',
    size: '1280 × 720',
    options: t('projectSettings.basic.table.text-1'),
    number: t('projectSettings.basic.table.text-2'),
    copy: t('projectSettings.basic.table.text-3')
  },
  {
    name: '1080p',
    size: '1920 × 1080',
    options: t('projectSettings.basic.table.text-1'),
    number: t('projectSettings.basic.table.text-2'),
    copy: t('projectSettings.basic.table.text-3')
  }
])

const deleted = async () => {
  isLoading.value = true
  try {
    await projectsStore.deleteProject({
      input: {
        id: projectModel.value
      }
    })
    ElMessage({
      grouping: true,
      center: true,
      message: t('projectSettings.basic.card.notification'),
      type: 'success'
    })
    checked.value = false
  } catch (e) {
    console.log(e)
    ElMessage({
      grouping: true,
      center: true,
      message: t('errors.something'),
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>
