<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_390px] lg:items-start gap-5">
    <div class="grid grid-cols-1 relative">
      <div class="text-lg md:text-xl font-medium">
        {{ $t('projectSettings.player.title') }}
      </div>

      <el-divider />

      <el-tabs v-model="activeTabNamePS" :tab-position="lg ? 'left' : 'top'" @tab-click="skinUpdate">
        <el-tab-pane v-for="items in skinsPlayers" :key="items.id" :label="items.label" :name="items.name">
          <div class="w-full h-full flex items-center justify-center">
            <div class="w-[300px] h-[169px] md:w-[700px] md:h-[394px] lg:w-[500px] lg:h-[281px] xl:w-[530px] xl:h-[298px] 2xl:min-w-[800px] 2xl:min-h-[450px] flex items-center justify-center">
              <app-player v-if="props.tab === 'settings' || storage === 'settings'" :player-id="items.id" :player-skin="items.name" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div v-if="loadingSave" class="absolute top-0 right-0 text-green-500 text-xs z-[999999] flex items-center gap-x-2">
        <Icon name="eos-icons:bubble-loading" />
        <span>{{ $t('labels.save') }}</span>
      </div>
    </div>

    <el-card shadow="hover" body-class="!p-3 md:!p-5 bg-sky-100 text-black" style="border-radius: 15px">
      <div class="flex flex-col items-start gap-y-3">
        <div class="flex items-center">
          <Icon name="bi:info-circle" class="text-2xl mr-2.5" />

          <div class="font-bold">
            {{ $t('projectSettings.player.card.title') }}
          </div>
        </div>

        <div class="text-xs md:text-sm">
          {{ $t('projectSettings.player.card.text') }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useMediaQuery } from '@vueuse/core'
import { useProjectsStore } from '~/store/projects'
import AppPlayer from '~/components/app/appPlayer.vue'

const props = defineProps<{
  tab?: string;
}>()

const { t } = useI18n()
const lg = useMediaQuery('(min-width: 1024px)')
const projectsStore = useProjectsStore()
const loadingSave = ref(false)
const storage = localStorage.getItem('projectsSettingTabName')
const activeTabNamePS = computed({
  get () {
    return projectsStore.projectSettings.skin.skinType
  },
  set (nv) {
    projectsStore.projectSettings.skin.skinType = nv
  }
})

export type SkinsPlayers = {
  label: string;
  name: string;
  id: number;
}

const skinsPlayers = ref<SkinsPlayers[]>([
  { label: 'BoomStream', name: 'Main', id: 4 },
  { label: 'Light Blue', name: 'LightBlue', id: 1 },
  { label: 'Dark Blue', name: 'DarkBlue', id: 3 },
  { label: 'Purple', name: 'Purple', id: 5 },
  { label: 'Dark Purple', name: 'DarkPurple', id: 6 },
  { label: 'Orange', name: 'Orange', id: 7 },
  { label: 'Red', name: 'Red', id: 8 },
  { label: 'Green', name: 'Green', id: 9 }
])

const skinUpdate = async (tab: TabsPaneContext) => {
  const skinId = skinsPlayers.value.find(el => el.name === tab.paneName)
  if (skinId) {
    loadingSave.value = true
    try {
      await projectsStore.updateSkin({
        projectId: projectsStore.currentProject.id,
        input: {
          skinId: skinId.id
        }
      })
      ElMessage({
        grouping: true,
        center: true,
        message: t('labels.saved'),
        type: 'success'
      })
    } catch (e) {
      ElMessage({
        grouping: true,
        center: true,
        message: t('errors.something'),
        type: 'error'
      })
    } finally {
      loadingSave.value = false
    }
  }
}
</script>
