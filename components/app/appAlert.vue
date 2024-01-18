<template>
  <div class="grid grid-cols-1 gap-x-2 2xl:grid-cols-2">
    <el-alert
      v-if="!verified"
      class="!mb-2"
      title="Подтвердите ваш электронный адрес!"
      type="warning"
      effect="dark"
      show-icon
    >
      <div class="flex items-center flex-col justify-center sm:flex-row">
        Ссылка для подтверждения отправлена на электронный адрес {{ userEmail }}
        <el-button class="mt-2.5 sm:ml-2.5 sm:mt-0" type="success" size="small" @click="activatedEmail">
          Отправить повторно
        </el-button>
      </div>
    </el-alert>
    <el-alert
      v-if="balance && balanceLimit > userBalance"
      class="!mb-2"
      title="Пополните баланс!"
      type="warning"
      effect="dark"
      show-icon
    >
      <div class="flex items-center flex-col justify-center sm:flex-row">
        Сумма на вашем счету менее {{ balanceLimit }} {{ currency }}. Пожалуйста, не забудьте своевременно пополнить баланс.
        <el-button class="mt-2.5 sm:ml-2.5 sm:mt-0" type="success" size="small">
          Пополнить баланс
        </el-button>
      </div>
    </el-alert>
    <el-alert
      v-if="userBalance === 0"
      class="!mb-2"
      title="Пополните баланс!"
      type="error"
      effect="dark"
      show-icon
    >
      <div class="flex items-center flex-col justify-center sm:flex-row">
        Средства на вашем счету закончились, поэтому создание новых видео невозможно. Существующие файлы будут удалены {date} в {time}
        <el-button class="mt-2.5 sm:ml-2.5 sm:mt-0" type="success" size="small">
          Пополнить баланс
        </el-button>
      </div>
    </el-alert>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useUserStore } from '~/store/user'
const { t } = useI18n()
const userStore = useUserStore()
const verified = computed(() => userStore.user?.isEmailVerified)
const balance = computed(() => userStore.user?.emailSettings.balance)
const balanceLimit = computed(() => Number(userStore.user?.emailSettings.balanceLimit))
const userBalance = computed(() => Number(userStore.user?.account.balance))
const currency = computed(() => Number(userStore.user?.account.currency))
const userEmail = computed(() => userStore.user?.email)
// const showAlert = ref(true)

// function showAlert () {
//   watch(() => showAlert.value, () => {
//     if (!showAlert.value) {
//       setTimeout(() => {
//         showAlert.value = true
//       }, 100) // 8 часов в миллисекундах
//     }
//   },
//   { immediate: true }
//   )
// }
const activatedEmail = async () => {
  try {
    await userStore.resendActivationMail()
    ElNotification({
      title: t('labels.notification-success'),
      message: t('labels.notification-massage'),
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
}

</script>
