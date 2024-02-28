<template>
  <div>
    <el-skeleton style="width: 100%" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="h1" style="width: 250px" />

        <div class="mt-5 flex items-center gap-3 md:gap-5">
          <el-skeleton-item variant="text" style="height: 30px; max-width: 130px;" />
          <el-skeleton-item variant="text" style="height: 30px; max-width: 130px;" />
          <el-skeleton-item variant="text" style="height: 30px; max-width: 130px;" />
          <el-skeleton-item v-if="md" variant="text" style="height: 30px; max-width: 130px;" />
          <el-skeleton-item v-if="md" variant="text" style="height: 30px; max-width: 130px;" />
          <el-skeleton-item v-if="md" variant="text" style="height: 30px; max-width: 130px;" />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-[1fr_390px] mt-5 gap-5">
          <div>
            <el-skeleton-item variant="h1" style="width: 250px;" />

            <el-divider />

            <div class="grid grid-cols-1 gap-3">
              <el-skeleton-item variant="text" style="height: 30px" />
              <el-skeleton-item variant="text" style="height: 30px" />
              <el-skeleton-item variant="text" style="height: 30px" />
              <el-skeleton-item variant="text" style="height: 30px" />
              <el-skeleton-item variant="text" style="height: 30px" />
              <el-skeleton-item variant="text" style="height: 30px" />
            </div>
          </div>

          <div>
            <el-skeleton-item variant="text" style="height: 205px; border-radius: 15px" />
          </div>
        </div>
      </template>

      <template #default>
        <div class="flex items-center pt-3 md:pt-0">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item>
              {{ $t('projectSettings.heading') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              {{ projectName }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-popover
            placement="bottom"
            :width="190"
            trigger="hover"
            :content="$t('projectSettings.popover')"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                circle
                class="ml-3"
                @click="changeProjectName"
              >
                <Icon class="md:text-sm" name="material-symbols:edit-sharp" />
              </el-button>
            </template>
          </el-popover>
        </div>

        <el-tabs
          v-model="activeName"
          v-loading="loading"
          :element-loading-text="$t('labels.loading')"
          :element-loading-background="$colorMode.value === 'dark' ? 'rgba(18, 18, 18, 1)' : 'rgba(255, 255, 255, 1)'"
          type="card"
          class="mt-5"
          @tab-click="handleClick"
        >
          <el-tab-pane :label="$t('projectSettings.tabs.tab-1')" name="basic">
            <basic />
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-2')" name="integration">
            <integration />
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-3')" name="protection">
            <protection />
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-4')" name="geotargeting">
            <geotargeting />
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-5')" name="settings">
            p
            <!--        <player-settings :tab="activeTab" />-->
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-6')" name="pages">
            p
            <!--        <page-settings />-->
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-7')" name="branding">
            b
            <!--        <branding-settings />-->
          </el-tab-pane>
          <el-tab-pane :label="$t('projectSettings.tabs.tab-8')" name="webhooks">
            w
            <!--        <webhooks />-->
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useProjectsStore } from '~/store/projects'
import Basic from '~/components/project-settings/basic.vue'
import Integration from '~/components/project-settings/integration.vue'
import Protection from '~/components/project-settings/protection.vue'
import Geotargeting from '~/components/project-settings/geotargeting.vue'

const md = useMediaQuery('(min-width: 767px)')
const { t } = useI18n()
const loading = ref<boolean>(true)
const projectsStore = useProjectsStore()
const storage = localStorage.getItem('projectsSettingTabName')
const activeName = ref(storage || 'basic')
const activeTab = ref<string>('')
const projectId = computed(() => projectsStore.currentProject ? projectsStore.currentProject.id : '')
const projectName = computed(() => projectsStore.currentProject ? projectsStore.currentProject.title : '')

onBeforeMount(() => {
  watch(() => projectsStore.currentProject?.id, async (newId) => {
    loading.value = true
    try {
      await projectsStore.getUserProjectSettings(String(newId))
    } catch (e) {
      ElMessage({
        grouping: true,
        center: true,
        message: t('errors.something'),
        type: 'error'
      })
    } finally {
      loading.value = false
    }
  }, { immediate: true })
})

const changeProjectName = () => {
  ElMessageBox.prompt(t('projectSettings.modal.title'), '', {
    confirmButtonText: t('projectSettings.modal.btn-1'),
    cancelButtonText: t('projectSettings.modal.btn-2'),
    inputPattern: /^(?=.*[^\s])\S+$/,
    inputErrorMessage: t('projectSettings.modal.warning'),
    inputValue: `${projectName.value}`
  })
    .then(async ({ value }) => {
      try {
        await projectsStore.projectChangeTitle({
          input: {
            id: projectId.value,
            title: value
          }
        })
        ElMessage({
          grouping: true,
          center: true,
          type: 'success',
          message: t('projectSettings.modal.name') + ' ' + `${value}`
        })
        return { value }
      } catch (e) {
        console.log(e)
        ElMessage({
          grouping: true,
          center: true,
          type: 'info',
          message: t('projectSettings.modal.info')
        })
      }
    })
}

const handleClick = (tab: TabsPaneContext) => {
  localStorage.setItem('projectsSettingTabName', `${tab.props.name}`)
  activeTab.value = String(tab.props.name)
}
</script>
