<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    @tab-click="handleClick"
  >
    <el-tab-pane :label="$t('profile-settings.tabs.label-1')" name="first" class="p-1">
      <account-details />
    </el-tab-pane>
    <el-tab-pane :label="$t('profile-settings.tabs.label-2')" name="second" class="p-1">
      <change-password />
    </el-tab-pane>
    <el-tab-pane :label="$t('profile-settings.tabs.label-3')" name="third" class="p-1">
      <notification-settings />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import AccountDetails from '~/components/profile-settings/account-details.vue'
import ChangePassword from '~/components/profile-settings/change-password.vue'
import NotificationSettings from '~/components/profile-settings/notification-settings.vue'

const storage = localStorage.getItem('profileSettingTabName')
const activeTab = ref(storage || 'first')

const handleClick = (tab: TabsPaneContext) => {
  localStorage.setItem('profileSettingTabName', `${tab.props.name}`)
  activeTab.value = String(tab.props.name)
}
</script>
