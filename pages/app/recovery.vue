<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] max-w-[1180px] mx-auto p-3">
    <el-card>
      <h1 class="text-2xl font-bold">
        {{ $t('recoveryPage.title-2') }}
      </h1>
      <p class="my-5">
        {{ $t('recoveryPage.text') }}
      </p>
      <el-form
        ref="formRef"
        :model="recoveryForm"
        :rules="formRules"
        size="large"
        label-position="top"
        status-icon
        @submit.prevent="submitForm"
      >
        <el-form-item :label="$t('labels.code')" prop="code">
          <el-input v-model="recoveryForm.code" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('labels.newPassword')" prop="password">
          <el-input v-model="recoveryForm.password" type="password" show-password autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('labels.examinationPassword')" prop="repeatPassword">
          <el-input v-model="recoveryForm.repeatPassword" type="password" show-password autocomplete="off" />
        </el-form-item>
        <auth-verification ref="auth" v-model="recoveryForm.codeCheck" />
        <el-form-item>
          <el-button class="w-full" type="success" :loading="isLoading" native-type="submit">
            {{ $t('recoveryPage.btn-2') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-card class="mb-5">
        <div class="text-lg font-bold">
          {{ $t('loginPage.not-registered-yet') }}
        </div>
        <el-link type="primary" :href="localePath({ path: '/app/registration' })">
          {{ $t('loginPage.go-to-the-registration-page') }}
        </el-link>
      </el-card>
      <el-card>
        <div class="text-lg font-bold">
          {{ $t('registrationPage.already-registered') }}
        </div>
        <el-link type="primary" :href="localePath({ path: '/app/login' })">
          {{ $t('registrationPage.go-to-the-login-page') }}
        </el-link>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'

definePageMeta({
  public: true,
  layout: 'auth'
})

const { t } = useI18n()
const localePath = useLocalePath()
const formRef = ref<FormInstance>()
const auth = ref()
const route = useRoute()
const router = useRouter()
const code = ref(route.query['recovery-code'] ? String(route.query['recovery-code']) : '')

const recoveryForm = ref({
  code: code.value,
  password: '',
  repeatPassword: '',
  codeCheck: ''
})

const isLoading = ref(false)
const formRules = reactive<FormRules>({
  code: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    { min: 6, max: 255, message: 'Пароль должен быть минимум 6 знаков, максимум 255', trigger: 'blur' }
  ],
  repeatPassword: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== recoveryForm.value.password) {
          callback(new Error('Не верный пароль'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  codeCheck: [
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
  isLoading.value = true
  try {
    await formRef.value.validate()
    const { code, password } = recoveryForm.value
    await $fetch(`${runtimeConfig.public.apiBase}/api/v1/password/recovery`, {
      method: 'POST',
      body: {
        code,
        password
      }
    })
    await router.replace({ query: undefined })
    return navigateTo(localePath({ path: '/app/login' }))
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

  <style scoped lang="scss">
  </style>
