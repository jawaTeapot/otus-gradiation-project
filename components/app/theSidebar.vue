<template>
  <el-drawer
    v-model="drawer"
    :with-header="false"
    size="270px"
    direction="ltr"
    class="demo-drawer"
    :append-to-body="true"
  >
    <select-project v-if="!md" />
    <app-sidebar class="!bg-transparent !shadow-none" />
  </el-drawer>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const md = useMediaQuery('(min-width: 767px)')
const props = defineProps<{
  modelValue: boolean,
}>()
const emit = defineEmits(['update:modelValue'])
const drawer = computed({
  get () {
    return props.modelValue
  },
  set (e: boolean) {
    return emit('update:modelValue', e)
  }
})
</script>
