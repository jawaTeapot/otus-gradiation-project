<template>
  <div>
    <client-only>
      <el-select v-model="projectModel" placement="bottom" filterable>
        <el-option :value="false" @click="open()">
          {{ $t('labels.select-new-project') }}
        </el-option>
        <el-divider class="!my-0" />
        <el-option
          v-for="item in userStore.userProjects?.nodes"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectsStore } from '~/store/projects'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const projectsStore = useProjectsStore()
const { t } = useI18n()
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
        ElMessage({
          showClose: true,
          grouping: true,
          center: true,
          type: 'error',
          message: t('new-project.error')
        })
      }
    })
}
</script>

<style scoped>

</style>
