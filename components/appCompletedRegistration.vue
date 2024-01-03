<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="$t('complete-registration.heading')"
    :show-close="false"
    class="!w-[500px] px-7 py-3 !rounded-3xl"
    :center="true"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      class="mt-3"
      label-width="80px"
      :rules="rules"
      status-icon
    >
      <el-form-item v-if="!userEmail" :label="$t('complete-registration.email.label')" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="!userPhone" :label="$t('complete-registration.phone.label')" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ $t('complete-registration.btn-success') }}
        </el-button>
        <el-button @click="dialogFormVisible = false">{{ $t('complete-registration.btn-close') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { t } = useI18n()
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const userEmail = computed(() => userStore.user?.email)
const userPhone = computed(() => userStore.user?.settings.phone)
const form = reactive({
  email: userStore.user?.email,
  phone: userStore.user?.settings.phone
})

const rules = reactive<FormRules>({
  email: [
    { required: true, type: 'email', message: t('complete-registration.email.validation'), trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, type: 'string', message: t('complete-registration.phone.validation-1'), trigger: 'blur' },
    { pattern: /^\+[0-9]{1,}$/, message: t('complete-registration.phone.validation-2'), trigger: ['blur', 'change'] }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      const { email, phone } = form
      await userStore.updateUserProfile({
        email,
        phone
      })
      ElMessage({
        grouping: true,
        center: true,
        message: t('complete-registration.message'),
        type: 'success'
      })
      dialogFormVisible.value = !dialogFormVisible.value
    }
  })
}

(function isShow () {
  if (userPhone.value == null || userEmail.value == null) {
    dialogFormVisible.value = true
  }
  return dialogFormVisible.value
})()
</script>
