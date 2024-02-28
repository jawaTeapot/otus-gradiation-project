<template>
  <footer class="footer p-2 md:p-3">
    <div class="flex flex-col items-center md:flex-row md:justify-between">
      <el-link
        v-for="(link, $index) of footerLinksTwo"
        :key="$index"
        type="info"
        :href="`${getSourceUrl()}${link.href}`"
        target="_blank"
        class="!block text-sm md:!text-xs lg:!text-sm hover:after:!border-transparent"
      >
        {{ $t(link.title) }}
      </el-link>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getSourceUrl } from '~/utils'

const footerLinksTwo = ref([
  {
    title: 'footer.link-9',
    href: '/documentation/api.html'
  },
  {
    title: 'footer.link-10',
    href: '/documentation/cases.html'
  },
  {
    title: 'footer.link-11',
    href: '/documentation/official.html'
  }
])
</script>

<style scoped lang="scss">
.footer {
  box-shadow: var(--el-box-shadow-light);
}
</style>
