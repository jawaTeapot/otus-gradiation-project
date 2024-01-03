<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] max-w-[1180px] mx-auto p-3">
    <el-card>
      <h1 class="text-2xl font-bold mb-5 w-[500px]">
        {{ $t('loginPage.title') }}
      </h1>
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        :rules="rules"
        size="large"
        label-position="top"
        status-icon
        @submit.prevent="submitForm(ruleFormRef)"
      >
        <el-form-item :label="$t('labels.email')" prop="email">
          <el-input v-model="loginForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('labels.password')" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('labels.verification-code')" prop="code">
          <auth-verification ref="auth" v-model="loginForm.code" />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="success" :loading="isLoading" native-type="submit">
            {{ $t('labels.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="flex flex-col gap-y-5">
      <el-card>
        <div class="text-lg font-bold">
          {{ $t('loginPage.not-registered-yet') }}
        </div>
        <el-link type="primary" :href="localePath({ path: '/app/registration' })">
          {{ $t('loginPage.go-to-the-registration-page') }}
        </el-link>
      </el-card>
      <el-card>
        <div class="text-lg font-bold">
          {{ $t('loginPage.forgot-password') }}
        </div>
        <el-link type="primary" :href="localePath({ path: '/app/password-recovery' })">
          {{ $t('loginPage.go-to-the-password-recovery-page') }}
        </el-link>
      </el-card>
      <!--      <el-card class="flex items-center justify-center">-->
      <!--        <el-link-->
      <!--          :underline="false"-->
      <!--          href="https://api-boom.boomstream.com/platform/oauth2/authorize/google?redirect_uri=https://home.boomstream.com/app/login"-->
      <!--        >-->
      <!--          <Icon name="flat-color-icons:google" class="text-3xl mr-3" />-->
      <!--          <span>{{ $t('labels.google') }}</span>-->
      <!--        </el-link>-->
      <!--      </el-card>-->
      <el-card class="flex items-center justify-center">
        <el-link
          :underline="false"
          href="https://api-boom.boomstream.com/platform/oauth2/authorize/vk?redirect_uri=https://home.boomstream.com/app/login"
        >
          <img class="h-[28px] mr-3" src="/img/VK_Logo.svg" alt="vk">
          <span>{{ $t('labels.vkontakte') }}</span>
        </el-link>
      </el-card>
      <el-card class="flex items-center justify-center">
        <el-link
          :underline="false"
          href="https://api-boom.boomstream.com/platform/oauth2/authorize/yandex?redirect_uri=https://home.boomstream.com/app/login"
        >
          <img class="h-[28px] mr-3" src="/img/yandex-logo-en.webp" alt="yandex">
          <span>{{ $t('labels.yandex') }}</span>
        </el-link>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import AuthVerification from '~/components/authVerification.vue'

definePageMeta({
  public: true,
  layout: 'auth'
})

interface RuleForm {
  email: string;
  password: string;
  code: string
}

const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()
const auth = ref()
const isLoading = ref(false)

const loginForm = ref<RuleForm>({
  email: '',
  password: '',
  code: ''
})

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    { type: 'email', message: t('errors.invalid-email'), trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' }
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        const auth = useAuth()
        const { email, password } = loginForm.value
        await auth.loginWith('local', { body: { email, password } })
        const localePath = useLocalePath()
        return navigateTo(localePath({ path: '/app' }))
      } catch (e: any) {
        console.log('error', e)
        if (e.status === 401) {
          ElMessage({
            grouping: true,
            center: true,
            message: t('errors.401-error'),
            type: 'error'
          })
        } else {
          ElMessage({
            grouping: true,
            center: true,
            message: t('errors.something'),
            type: 'error'
          })
        }
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss" />
