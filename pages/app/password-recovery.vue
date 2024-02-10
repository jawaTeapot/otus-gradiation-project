<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] max-w-[1180px] mx-auto p-3">
    <el-card>
      <h1 class="text-2xl font-bold mb-5 w-[500px]">
        {{ $t('recoveryPage.title-1') }}
      </h1>
      <el-form
        ref="formRef"
        :model="passwordRecovery"
        :rules="formRules"
        size="large"
        label-position="top"
        status-icon
        @submit.prevent="submitForm"
      >
        <el-form-item :label="$t('labels.email')" prop="email">
          <el-input v-model="passwordRecovery.email" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('labels.verification-code')" prop="code">
          <auth-verification ref="auth" v-model="passwordRecovery.code" />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="success" native-type="submit">
            {{ $t('recoveryPage.btn-1') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-card class="mb-5">
        <div class="text-lg font-bold">
          {{ $t('loginPage.not-registered-yet') }}
        </div>
        <el-link type="primary" href="/app/registration">
          {{ $t('loginPage.go-to-the-registration-page') }}
        </el-link>
      </el-card>
      <el-card>
        <div class="text-lg font-bold">
          {{ $t('registrationPage.already-registered') }}
        </div>
        <el-link type="primary" href="/app/login">
          {{ $t('registrationPage.go-to-the-login-page') }}
        </el-link>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

definePageMeta({
  public: true,
  layout: 'auth'
})

const { t } = useI18n()
const formRef = ref<FormInstance>()
const auth = ref()
const passwordRecovery = reactive({
  email: '',
  password: '',
  code: ''
})

const formRules = reactive<FormRules>({
  email: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    {
      type: 'email',
      message: t('errors.invalid-email'),
      trigger: ['blur', 'change']
    }
  ],
  code: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if ((auth.value?.randomNumber1 + auth.value?.randomNumber2) !== +value) {
          callback(new Error(t('errors.invalid-number')))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = async () => {
  if (!formRef.value) { return }
  const runtimeConfig = useRuntimeConfig()
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const { email } = passwordRecovery
        await $fetch(`${runtimeConfig.public.apiBase}/api/v1/password/forgot?email=${email}`, { method: 'POST' })
        ElNotification({
          title: t('labels.notification-success'),
          message: t('labels.notification-massage'),
          type: 'success'
        })
      } catch (e) {
        ElMessage({
          grouping: true,
          center: true,
          message: t('errors.something'),
          type: 'error'
        })
      }
      return navigateTo('/app/recovery')
    }
  })
}
</script>

<style scoped lang="scss">
</style>
