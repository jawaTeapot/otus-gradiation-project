<template>
  <div class="flex items-center">
    <el-tooltip
      class="box-item"
      :hide-after="100"
      placement="bottom"
    >
      <template #content>
        {{ $t('statistic.timesSpaceMs') }}
      </template>
      <div class="mr-4 flex items-center">
        <Icon class="text-2xl mr-1" name="mdi:harddisk" />
        <el-statistic :precision="2" :value="Number(timeSpase)" />
        <span class="ml-1 text-base">
          {{ $t('labels.hours') }}
        </span>
      </div>
    </el-tooltip>
    <el-tooltip
      class="box-item"
      :hide-after="100"
      placement="bottom"
    >
      <template #content>
        {{ $t('statistic.playtimeMs') }}
      </template>
      <div class="mr-4 flex items-center">
        <Icon class="text-2xl mr-1" name="mdi:earth" />
        <el-statistic :precision="2" :value="Number(playTime)" />
        <span class="ml-1 text-base">
          {{ $t('labels.hours') }}
        </span>
      </div>
    </el-tooltip>
    <el-tooltip
      class="box-item"
      :hide-after="100"
      placement="bottom"
    >
      <template #content>
        {{ $t('statistic.balance') }}
      </template>
      <div class="flex items-center">
        <Icon
          class="text-2xl mr-1"
          name="ph:hand-coins-fill"
        />
        <el-statistic :precision="2" :value="Number(userStore.user?.account.balance)" />
        <span class="ml-1 text-base">
          {{ userStore.user?.account.currency }}
        </span>
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
const unixTimeStamp = computed(() => userStore.user?.stat.timesSpaceMs)
const unixPlayTime = computed(() => userStore.user?.stat.playtimeMs)
const timeSpase = ref(unixTimeStamp.value ? Number(unixTimeStamp.value / 1000 / 60 / 60).toFixed(2) : '')
const playTime = ref(unixPlayTime.value ? Number(unixPlayTime.value / 1000 / 60 / 60).toFixed(2) : '')
</script>

<style scoped lang="scss">
:deep(.el-statistic__number) {
  @apply text-base;
}
</style>
