<template>
  <teleport to="body">
    <client-only>
      <el-dialog
        v-model="setProp"
        :show-close="false"
        :close-on-click-modal="false"
        class="my-dialog !w-[320px] sm:!w-[600px]"
        style="border-radius: 15px"
        align-center
      >
        <template #header>
          <h1 class="text-center">
            {{ $t('brand.heading') }}
          </h1>

          <el-divider class="!mt-2 !mb-0">
            <el-icon><Icon name="material-symbols:verified-user" /></el-icon>
          </el-divider>
        </template>
        <h2>
          {{ $t('brand.headline') }}
        </h2>
        <ol class="list-decimal pl-4 mt-2">
          <li>{{ $t('brand.text-1') }}</li>
          <li class="mt-3">
            {{ $t('brand.text-2') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-3') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-4') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-5') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-6') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-7') }}@{{ $t('brand.text-7-1') }}
          </li>
          <li class="mt-3">
            {{ $t('brand.text-8') }}
          </li>
        </ol>
        <el-divider class="!my-3" />
        <ul class="list-disc pl-4">
          <li>{{ $t('brand.text-9') }} {{ userStore.userTariffs?.nodes[1].prices[0].price }} {{ userStore.userTariffs?.nodes[1].prices[0].currency }} {{ $t('brand.text-span') }}</li>
          <li class="mt-3">
            {{ $t('brand.text-10') }}
          </li>
        </ul>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" :loading="isLoading" @click="activatedBrand()">
              {{ $t('brand.accept') }} {{ userStore.userTariffs?.nodes[1].prices[0].price }} {{ userStore.userTariffs?.nodes[1].prices[0].currency }}
            </el-button>
            <el-button type="info" class="mt-1 sm:mt-0" plain @click="$emit('update:modelValue', false)">
              {{ $t('brand.cancel') }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </client-only>
  </teleport>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '~/store/user'
import { useProjectsStore } from '~/store/projects'
const { t } = useI18n()
const projectsStore = useProjectsStore()
const userStore = useUserStore()
const isLoading = ref<boolean>(false)

const props = defineProps<{
  modelValue: boolean;
}>()

const emit = defineEmits(['update:modelValue'])

const setProp = computed({
  get () {
    return props.modelValue
  },
  set (e: boolean) {
    return emit('update:modelValue', e)
  }
})

const currentProject = computed({
  get () {
    if (!projectsStore.currentProject) {
      return ''
    } else {
      return projectsStore.currentProject.id
    }
  },
  set (nv) {
    projectsStore.changeCurrentProject(nv)
  }
})

const activatedBrand = async () => {
  isLoading.value = true
  try {
    await projectsStore.activateBranding({
      input: {
        id: currentProject.value
      }
    })
    await userStore.fetchUserData(true)
    emit('update:modelValue', false)
    ElMessage({
      grouping: true,
      center: true,
      message: t('brand.notification-massage'),
      type: 'success'
    })
  } catch (e) {
    ElMessage({
      grouping: true,
      center: true,
      message: t('errors.something'),
      type: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>
