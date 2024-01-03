<template>
  <teleport to="body">
    <client-only>
      <el-dialog
        v-model="setProp"
        :show-close="false"
        :close-on-click-modal="false"
        :title="$t('protection.heading')"
        class="!w-[320px] sm:!w-[600px]"
        style="border-radius: 15px"
        align-center
      >
        <template #header>
          <h1 class="text-center">
            {{ $t('protection.heading') }}
          </h1>

          <el-divider class="!mt-2 !mb-0">
            <el-icon><Icon name="material-symbols:verified-user" /></el-icon>
          </el-divider>
        </template>
        <ol class="list-decimal pl-4 mt-2">
          <li>{{ $t('protection.text-1') }}</li>
          <li class="mt-3">
            {{ $t('protection.text-2') }}
          </li>
        </ol>
        <el-divider class="!my-3" />
        <ul class="list-disc pl-4">
          <li> {{ $t('protection.text-3') }} {{ userStore.userTariffs?.nodes[0].prices[0].price }} {{ userStore.userTariffs?.nodes[0].prices[0].currency }} {{ $t('protection.text-span') }} .</li>
          <li class="mt-3">
            {{ $t('protection.text-4') }}
          </li>
        </ul>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" :loading="isLoading" @click="activatedDRM()">
              {{ $t('protection.accept') }} {{ userStore.userTariffs?.nodes[0].prices[0].price }} {{ userStore.userTariffs?.nodes[0].prices[0].currency }}
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
import { useProjectsStore } from '~/store/projects'
import { useUserStore } from '~/store/user'
const { t } = useI18n()
const userStore = useUserStore()
const projectsStore = useProjectsStore()
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

const activatedDRM = async () => {
  isLoading.value = true
  try {
    await projectsStore.activateDRM({
      input: {
        id: currentProject.value
      }
    })
    await userStore.fetchUserData(true)
    emit('update:modelValue', false)
    ElMessage({
      grouping: true,
      center: true,
      message: t('protection.notification-massage'),
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
