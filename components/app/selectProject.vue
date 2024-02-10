<template>
  <div>
    <client-only>
      <el-select :model-value="projectModel" placement="bottom" filterable class="min-w-[180px]" @change="selectCurrentProject">
        <el-option :value="false" @click="open()">
          {{ $t('labels.select-new-project') }}
        </el-option>
        <el-divider class="!my-0" />
        <el-option
          v-for="item in projects"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectsStore } from '~/store/projects'

const projectsStore = useProjectsStore()
const { t } = useI18n()

const projects = computed(() => projectsStore.projects)

const projectModel = computed(() => {
  if (projectsStore.currentProject) {
    return projectsStore.currentProject.id
  } else {
    return ''
  }
})

function selectCurrentProject (el: string) {
  projectsStore.changeCurrentProject(el)
}

const open = () => {
  ElMessageBox.prompt(t('new-project.headline'), t('new-project.heading'), {
    confirmButtonText: t('new-project.btn-1'),
    cancelButtonText: t('new-project.btn-2'),
    inputType: 'text',
    inputPattern: /^(?!$).+/,
    inputErrorMessage: t('new-project.headline')
  })
    .then(async ({ value }) => {
      try {
        await projectsStore.createProject({
          input: {
            attribute: 'Empty',
            title: value
          }
        })
        ElMessage({
          customClass: 'min-w-[280px]',
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
