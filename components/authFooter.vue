<template>
  <footer>
    <div class="flex items-center justify-between p-2 md:p-3">
      <div class="flex items-center">
        <span class="mr-3">&copy; 2013–{{ new Date().getFullYear() }}</span>
        <el-link type="info" href="https://hwd.boomstream.com/ru/contact.html">
          {{ $t('footer.logo') }}
        </el-link>
      </div>
      <NuxtLink type="primary" :to="localePath({ path: '/app/login' })">
        <NuxtImg v-show="$colorMode.value === 'dark'" class="max-w-[150px]" src="/img/logo-black.svg" alt="logo" />
        <NuxtImg v-show="$colorMode.value === 'light'" class="max-w-[150px]" src="/img/logo-white.svg" alt="logo" />
      </NuxtLink>
    </div>
  </footer>
</template>
