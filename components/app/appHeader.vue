<template>
  <header class="header flex items-center p-2 md:p-3 justify-between">
    <div class="flex items-center">
      <div v-if="!xl" class="flex items-center mr-4">
        <el-button class="mr-2.5" @click="() => drawerMobile = !drawerMobile">
          <template #default>
            <div class="relative">
              <Icon name="mdi:menu" class="text-2xl" />

              <div v-if="headerBonus && lg" class="absolute top-1 -translate-y-1/2 -right-1 h-[8px] min-w-[8px]  rounded-full bg-green-500" />
            </div>
          </template>
        </el-button>

        <app-mobile-menu v-model="drawerMobile" />

        <NuxtLink :to="{ path: '/app' }">
          <NuxtImg v-show="$colorMode.value === 'dark'" class="max-w-[150px] md:max-w-[198px]" src="/img/logo-black.svg" alt="logo" />

          <NuxtImg v-show="$colorMode.value === 'light'" class="max-w-[150px] md:max-w-[198px]" src="/img/logo-white.svg" alt="logo" />
        </NuxtLink>
      </div>

      <select-project v-if="xl" />

      <app-statistics v-if="lg" class="ml-4" />
    </div>

    <el-dropdown class="md:ml-4" trigger="click" placement="bottom-end">
      <div class="relative w-[35px] md:w-[40px] h-[35px] md:h-[40px] rounded-full bg-amber-500 flex justify-center items-center text-xl md:text-2xl cursor-pointer text-white">
        {{ tagName }}

        <div v-if="headerBonus && !lg" class="absolute top-0 -translate-y-1/2 right-0 h-[8px] min-w-[8px]  rounded-full bg-green-500" />
      </div>

      <template #dropdown>
        <client-only>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="flex items-center justify-center gap-2 w-full">
                <el-button circle size="large" @click="() => $colorMode.preference = $colorMode.value === 'light' ? 'dark' : 'light'">
                  <Icon :name="$colorMode.value === 'dark' ? 'fxemoji:whitesun' : 'fxemoji:crescentmoon'" class="text-2xl" />
                </el-button>

                <div class="relative">
                  <el-button circle size="large" @click="switchLocal">
                    <Icon name="mdi:earth" class="text-2xl" />
                  </el-button>

                  <div class="rounded-full bg-red-400 text-center text-xs absolute -top-1 -right-1 px-1">
                    {{ locale.toUpperCase() }}
                  </div>
                </div>
              </div>
            </el-dropdown-item>

            <app-bonus v-if="headerBonus && !lg" />

            <el-dropdown-item class="!px-4">
              <div class="flex items-center">
                <Icon name="ic:baseline-account-box" class="text-2xl" />

                <span class="ml-1 text-sm">
                  {{ userStore.user?.username }}
                </span>
              </div>
            </el-dropdown-item>

            <el-dropdown-item class="!px-4">
              <div class="flex items-center">
                <Icon name="material-symbols:alternate-email-rounded" class="text-2xl" />

                <span class="ml-1 text-sm">
                  {{ userStore.user?.email }}
                </span>
              </div>
            </el-dropdown-item>

            <el-dropdown-menu v-if="!lg" class="!px-4">
              <app-statistics class="grid grid-cols-1 gap-2 text-sm" />
            </el-dropdown-menu>

            <el-dropdown-item divided>
              <NuxtLink class="flex items-center no-underline" :to="{ path: '/app/profile-settings' }">
                <Icon name="mdi:gear" :class="$colorMode.value === 'dark' ? 'text-2xl text-white' : 'text-2xl text-black'" />

                <span :class="$colorMode.value === 'dark' ? 'ml-1 text-sm text-white' : 'ml-1 text-sm text-black'">{{ $t("menuLinks.profile-settings") }}</span>
              </NuxtLink>
            </el-dropdown-item>

            <el-dropdown-item v-for="item in dataLink" :key="item.path">
              <NuxtLink class="flex items-center no-underline" :to="`${getSourceUrl()}${item.path}`" target="_blank">
                <Icon :name="item.icon" :class="$colorMode.value === 'dark' ? 'text-2xl text-white' : 'text-2xl text-black'" />

                <span :class="$colorMode.value === 'dark' ? 'ml-1 text-sm text-white' : 'ml-1 text-sm text-black'">{{ item.title }}</span>
              </NuxtLink>
            </el-dropdown-item>

            <el-dropdown-item divided class="justify-center" @click="exit">
              <Icon name="majesticons:door-exit-line" :class="$colorMode.value === 'dark' ? 'text-2xl text-white' : 'text-2xl text-black'" />

              <span class="ml-1">{{ $t("menuLinks.exit") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </client-only>
      </template>
    </el-dropdown>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useUserStore } from '~/store/user'
import { getSourceUrl } from '~/utils'
import AppBonus from '~/components/app/appBonus.vue'
import SelectProject from '~/components/app/selectProject.vue'
import AppMobileMenu from '~/components/app/appMobileMenu.vue'

const lg = useMediaQuery('(min-width: 1024px)')
const xl = useMediaQuery('(min-width: 1280px)')

const userStore = useUserStore()
const { locale, setLocale, t } = useI18n()
const drawerMobile = ref<boolean>(false)
const headerBonus = ref<boolean>(userStore.userCheckMyPromoCode?.isAvailable ? userStore.userCheckMyPromoCode?.isAvailable : false)
const tagName = computed(() => userStore.user?.username[0])

const dataLink = ref([
  {
    path: '/finance/deposit.html',
    icon: 'majesticons:money-plus-line',
    title: t('menuLinks.top-up-balance')
  },
  {
    path: '/documentation.html',
    icon: 'mdi:drive-document',
    title: t('menuLinks.documentation')
  },
  {
    path: '/finance/referrals.html',
    icon: 'mdi:partnership-outline',
    title: t('menuLinks.partner-program')
  }
])

function switchLocal () {
  locale.value === 'en' ? setLocale('ru') : setLocale('en')
}

const exit = async () => {
  const auth = useAuth()
  const cookies = useCookies()
  cookies.remove('auth._token.local')
  sessionStorage.removeItem('auth._token.local')
  localStorage.removeItem('auth._token.local')
  localStorage.removeItem('currentProject')
  await auth.logout()
  return navigateTo('app/login')
}
</script>

<style scoped lang="scss">
.header {
  box-shadow: var(--el-box-shadow-light);
}
</style>
