<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import 'element-plus/theme-chalk/dark/css-vars.css'
// import axios from 'axios'
import { ElNotification } from 'element-plus'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { t } = useI18n()
const router = useRouter()
const routerParam = useRoute()
onMounted(async () => {
  const runtimeConfig = useRuntimeConfig()
  if (routerParam.query['activation-code']) {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/api/v1/register/activate?code=${routerParam.query['activation-code']}`, { method: 'POST' })
      await router.replace({ query: undefined })
      ElNotification({
        customClass: '!w-auto',
        title: t('labels.notification-success'),
        message: t('labels.notification-activated-success-massage'),
        type: 'success'
      })
    } catch {
      ElNotification({
        customClass: '!w-auto',
        title: t('labels.notification-error'),
        message: t('labels.notification-activated-error-massage'),
        type: 'error'
      })
    }
  } else if (routerParam.query['email-change-code']) {
    const param = String(routerParam.query['email-change-code'])
    try {
      await userStore.changeEmail({
        input: {
          code: param
        }
      })
      await router.replace({ query: undefined })
      await nextTick(() => { userStore.fetchUserData(true) })
      ElNotification({
        customClass: '!w-auto',
        title: t('labels.notification-success'),
        message: t('labels.notification-success-changed-email'),
        type: 'success'
      })
    } catch {
      ElNotification({
        customClass: '!w-auto',
        title: t('labels.notification-error'),
        message: t('errors.something'),
        type: 'error'
      })
    }
  }
})
</script>
