<template>
  <client-only>
    <el-drawer
      ref="drawerRef"
      v-model="setMyDrawer"
      :size="md ? '700px' : '100%'"
      :with-header="false"
    >
      <template #default>
        <slot />
      </template>
    </el-drawer>
  </client-only>
</template>

<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import { useMediaQuery } from '@vueuse/core'

const md = useMediaQuery('(min-width: 767px)')

const props = defineProps<{
  modelValue: boolean,
}>()

const emit = defineEmits(['update:modelValue'])

const setMyDrawer = computed({
  get () {
    return props.modelValue
  },
  set (e: boolean) {
    return emit('update:modelValue', e)
  }
})
</script>
