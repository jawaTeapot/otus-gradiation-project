<template>
  <aside class="sidebar">
    <client-only>
      <el-menu :collapse="menu" class="h-full !border-r-0 py-2.5" router :popper-effect="$colorMode.value === 'light' ? 'dark' : 'light'">
        <el-menu-item v-if="xl">
          <el-icon @click="() => menu = !menu">
            <el-badge is-dot class="menu-dot" type="success" :hidden="!headerBonus || !lg || !menu">
              <Icon :name="menu ? 'mdi:menu' : 'ic:baseline-arrow-circle-left'" class="text-2xl" />
            </el-badge>
          </el-icon>
          <template #title>
            <NuxtLink :to="{ path: '/app' }" class="flex items-center justify-center">
              <NuxtImg v-show="$colorMode.value === 'light'" class="w-[183px]" src="/img/logo-white.svg" alt="" />
              <NuxtImg v-show="$colorMode.value === 'dark'" class="w-[183px]" src="/img/logo-black.svg" alt="" />
            </NuxtLink>
          </template>
        </el-menu-item>
        <el-menu-item v-for="item in menuItems" :key="item.id" :index="`/app/${item.href}`">
          <el-icon>
            <Icon :name="item.icon" class="text-2xl" />
          </el-icon>
          <!--          <el-badge-->
          <!--            v-if="item.badge > '0' && menu"-->
          <!--            is-dot-->
          <!--            class="badge-dot"-->
          <!--            type="primary"-->
          <!--          />-->
          <template #title>
            <div class="relative">
              {{ $t(item.title) }}
              <div v-if="+item.badge > 0 && !menu" class="absolute h-[16px] min-w-[8px] top-[50%] -translate-y-1/2 -right-8 rounded-full bg-blue-500 px-1 text-xs flex items-center justify-center text-white">
                {{ item.badge }}
              </div>
            </div>
          </template>
        </el-menu-item>
        <el-sub-menu v-for="item in subMenu" :key="item.id" :index="item.idx">
          <template #title>
            <el-icon>
              <Icon :name="item.icon" class="text-2xl" />
            </el-icon>
            <span>  {{ $t(item.title) }}</span>
          </template>
          <el-menu-item v-for="e of item.children" :key="e.idx" :index="`/app/${e.href}`">
            <span> {{ $t(e.title) }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-divider class="!mt-0 !mb-3" />
        <app-bonus v-if="!menu && lg" />
        <el-menu-item>
          <el-icon>
            <Icon :name="!hasDrm ? 'material-symbols:add-moderator' : 'material-symbols:verified-user'" class="text-2xl" />
          </el-icon>
          <template #title>
            <el-button :type="!hasDrm ? 'success' : 'default'" class="w-[184px] !flex justify-center items-center mx-auto" size="large" :disabled="hasDrm" @click="() => dialogProtection = !dialogProtection">
              <span v-if="!hasDrm">{{ $t('labels.enable-download-protection-1') }}<br>{{ $t('labels.enable-download-protection-2') }}</span>
              <span v-else>{{ $t('labels.true-enable-download-protection-1') }}<br>{{ $t('labels.true-enable-download-protection-2') }}</span>
            </el-button>
          </template>
          <app-protection v-model="dialogProtection" />
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Icon :name="!hasBranding ? 'material-symbols:bookmark-add-rounded' : 'material-symbols:bookmark-added'" class="text-2xl" />
          </el-icon>
          <template #title>
            <el-button :type="!hasBranding ? 'success' : 'default'" class="w-[184px] !flex justify-center items-center !mx-auto" size="large" :disabled="hasBranding" @click="() => dialogBrand = !dialogBrand">
              <span v-if="!hasBranding">{{ $t('labels.enable-branding-1') }}<br>{{ $t('labels.enable-branding-2') }}</span>
              <span v-else>{{ $t('labels.true-enable-branding-1') }}<br>{{ $t('labels.true-enable-branding-2') }}</span>
            </el-button>
            <app-brend v-model="dialogBrand" />
          </template>
        </el-menu-item>
      </el-menu>
    </client-only>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useUserStore } from '~/store/user'
import { useProjectsStore } from '~/store/projects'

const dialogBrand = ref(false)
const dialogProtection = ref(false)
const userStore = useUserStore()
const projectsStore = useProjectsStore()
const headerBonus = ref<boolean>(userStore.userCheckMyPromoCode?.isAvailable ? userStore.userCheckMyPromoCode?.isAvailable : false)
const lg = useMediaQuery('(min-width: 1024px)')
const xl = useMediaQuery('(min-width: 1280px)')
const menu = ref(false)
const hasDrm = computed(() => { if (projectsStore.currentProject) { return projectsStore.currentProject.hasDrm } })
const hasBranding = computed(() => { if (projectsStore.currentProject) { return projectsStore.currentProject.hasBranding } })

const menuItems = computed(() => {
  if (!projectsStore.currentProject) {
    return []
  } else {
    return [
      {
        id: 1,
        icon: 'mdi:gear',
        badge: '',
        title: 'menuLinks.project-settings',
        href: 'project-settings'
      },
      {
        id: 2,
        icon: 'material-symbols:video-camera-back',
        badge: `${projectsStore.currentProject.stat.vodCount}`,
        title: 'menuLinks.video-files',
        href: 'video'
      },
      {
        id: 3,
        icon: 'mdi:account-online',
        badge: `${projectsStore.currentProject.stat.liveCount}`,
        title: 'menuLinks.online-broadcasts',
        href: 'online-broadcasts'
      },
      {
        id: 4,
        icon: 'ph:monitor-play-fill',
        badge: `${projectsStore.currentProject.stat.conferenceCount}`,
        title: 'menuLinks.conferences',
        href: 'conferences'
      },
      {
        id: 5,
        icon: 'material-symbols:playlist-play',
        badge: `${projectsStore.currentProject.stat.playlistCount}`,
        title: 'menuLinks.playlists',
        href: 'playlists'
      },
      {
        id: 6,
        icon: 'ph:files-fill',
        badge: `${projectsStore.currentProject.stat.materialsCount}`,
        title: 'menuLinks.materials',
        href: 'materials'
      },
      {
        id: 7,
        icon: 'material-symbols:lock',
        badge: `${projectsStore.currentProject.stat.passwordCount}`,
        title: 'menuLinks.password-access',
        href: 'password-access'
      },
      {
        id: 8,
        icon: 'material-symbols:attach-money',
        badge: `${projectsStore.currentProject.stat.subscriptionCount}`,
        title: 'menuLinks.paid-access',
        href: 'paywall'
      },
      {
        id: 9,
        icon: 'mdi:database-edit',
        badge: `${projectsStore.currentProject.stat.collectionCount}`,
        title: 'menuLinks.data-collection',
        href: 'data-collection'
      },

      {
        id: 10,
        icon: 'ri:money-dollar-circle-fill',
        badge: '',
        title: 'menuLinks.finance',
        href: 'finance'
      },
      {
        id: 11,
        icon: 'material-symbols:support-agent',
        badge: '',
        title: 'menuLinks.support',
        href: 'support'
      }
    ]
  }
})

const subMenu = ref([
  {
    id: 12,
    idx: '1',
    icon: 'material-symbols:query-stats',
    title: 'menuLinks.statistics',
    children: [
      {
        idx: '1-1',
        title: 'menuLinks.resource-usage',
        href: 'resource-usage'
      },
      {
        idx: '1-2',
        title: 'menuLinks.sales',
        href: 'sales'
      }
    ]
  },
  {
    id: 13,
    idx: '2',
    icon: 'material-symbols:account-box',
    title: 'menuLinks.account-management',
    children: [
      {
        idx: '2-1',
        title: 'menuLinks.users',
        href: 'users'
      },
      {
        idx: '2-2',
        title: 'menuLinks.activity',
        href: 'activity'
      }
    ]
  }
])

</script>
<style lang="scss" scoped>
.sidebar {
  @apply max-w-[270px] overflow-y-scroll z-[1];
  box-shadow: var(--el-box-shadow-light);
  //:deep(.el-menu-item) {
  //  @apply h-[50px];
  //  span {
  //    @apply h-[50px];
  //  }
  //}
  //:deep(.el-menu-item *) {
  //  vertical-align: middle;
  //}
}

//.my-btn {
//  span {
//    @apply h-auto #{!important};
//  }
//}
//
//:deep(.el-badge__content) {
//  top: -19px;
//}
//
//.menu-dot {
//  :deep(.el-badge__content.is-fixed.is-dot) {
//    @apply right-0 top-0;
//  }
//}
//
//.badge-dot {
//  :deep(.el-badge__content) {
//    top: -35px;
//  }
//}
</style>
