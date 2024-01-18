<template>
  <client-only>
    <el-drawer
      v-model="drawer"
      size="270px"
      direction="ltr"
      :append-to-body="true"
      :show-close="false"
      class="my-drawer"
    >
      <template #header="{ close }">
        <div>
          <div class="flex items-center justify-between gap-3 px-3">
            <select-project />
            <el-button text class="!p-0" @click="close">
              <Icon name="material-symbols-light:close" class="text-2xl" />
            </el-button>
          </div>
          <el-divider class="!mb-0 !mt-[20px]" />
        </div>
      </template>
      <template #default>
        <app-sidebar class="!bg-transparent !shadow-none" />
      </template>
    </el-drawer>
  </client-only>
</template>

<script setup lang="ts">
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
