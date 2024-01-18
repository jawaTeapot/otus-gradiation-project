<template>
  <el-input v-model="data" type="number">
    <template #prepend>
      <div class="text-xl font-bold">
        {{ randomNumber1 }} + {{ randomNumber2 }} =
      </div>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)

const randomNumber1 = ref<number>(0)
const randomNumber2 = ref<number>(0)

onMounted(() => {
  randomNumber1.value = Math.floor(Math.floor(Math.random() * 11))
  randomNumber2.value = Math.floor(Math.floor(Math.random() * 11))
})

defineExpose({
  randomNumber1,
  randomNumber2
})
</script>
