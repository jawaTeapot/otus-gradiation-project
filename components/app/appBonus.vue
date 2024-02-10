<template>
  <div v-if="bonus" class="p-4 bg-lime-800 mb-2 flex flex-col items-center mx-auto w-[220px]">
    <div class="text-sm text-center">
      {{ $t('bonus.text-1') }} <b>{{ userStore.userCheckMyPromoCode?.promo.bonus }} {{ userStore.user?.account.currency }}</b> {{ $t('bonus.text-2') }} <b>{{ $t('bonus.text-3') }}</b> {{ $t('bonus.text-4') }}
    </div>
    <nuxt-link class="mt-4 text-sm font-medium bg-[var(--el-color-success)] hover:bg-[var(--el-color-success-light-3)] p-2 rounded cursor-pointer" :to="`${getSourceUrl()}/finance/deposit.html`" target="_blank">
      {{ $t('bonus.link') }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSourceUrl } from '~/utils'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const bonus = ref<boolean>(userStore.userCheckMyPromoCode?.isAvailable ? userStore.userCheckMyPromoCode.isAvailable : false)

const registrationDate: Date = new Date(userStore.user?.createdAt ? userStore.user.createdAt : '') // Конвертируем строку регистрации в объект даты
const expirationDate: Date = new Date(registrationDate) // Добавляем 24 часа
expirationDate.setHours(expirationDate.getHours() + 24)
function checkExpiration (): void { // Функция, которая проверяет, прошло ли 24 часа с момента регистрации
  const currentDate: Date = new Date()
  if (currentDate > expirationDate) {
    bonus.value = false // Скрываем баннер
    clearInterval(checkInterval) // Остановить проверку интервала таймера
  }
}
// Интервал таймера, который проверяет, прошло ли 24 часа с момента регистрации
const checkInterval: NodeJS.Timeout = setInterval(checkExpiration, 10000) // Проверяем раз в минуту
</script>

<style scoped lang="scss">
</style>
