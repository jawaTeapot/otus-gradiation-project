<template>
  <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] max-w-[1180px] mx-auto p-3">
    <el-card>
      <h1 class="text-2xl font-bold mb-5">
        {{ $t('registrationPage.title') }}
      </h1>
      <el-form
        ref="formRef"
        :model="registerForm"
        :rules="formRules"
        size="large"
        label-position="top"
        status-icon
        @submit.prevent="submitForm(formRef)"
      >
        <el-form-item :label="$t('labels.name')" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('labels.email')" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('labels.phone-number')" prop="phone">
          <client-only>
            <vue-tel-input
              v-model="registerForm.phone"
              class="w-full h-[40px] focus-within:!shadow-[0_0_0_1px_rgba(64,158,255,1)] focus-within:!border-transparent"
              :class="$colorMode.value === 'light' ? '!border-[#dcdfe6] my-bg-vue-tel-input-white ' : '!border-[#4C4D4F] my-bg-vue-tel-input-black'"
              mode="international"
              :input-options="{placeholder:''}"
              :valid-characters-only="true"
            />
          </client-only>
        </el-form-item>

        <el-form-item :label="$t('labels.password')" prop="password" type="password" :inline-message="true">
          <el-input v-model="registerForm.password" type="password" show-password autocomplete="off" />
        </el-form-item>

        <auth-verification ref="auth" v-model="registerForm.code" />

        <el-form-item prop="agreement" :inline-message="true">
          <el-checkbox v-model="registerForm.agreement" size="large" name="agreement">
            <span class="flex flex-wrap text-xs ">
              {{ $t('labels.agreement.i-accept') }}
              <el-link class="mx-1 !text-xs" type="primary" :href="localePath({ path: '/app/terms' })" target="_blank">
                {{ $t('labels.agreement.user-agreement') }}
              </el-link>
              {{ $t('labels.agreement.and') }}
              <el-link class="sm:ml-1 !text-xs" type="primary" :href="localePath({ path: '/app/privacy' })" target="_blank">
                {{ $t('labels.agreement.privacy-policy') }}
              </el-link>
            </span>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button :loading="isLoading" :disabled="!registerForm.agreement" class="w-full" type="success" native-type="submit">
            {{ $t('registrationPage.register') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <el-card class="mb-5">
        <div class="text-lg font-bold mb-3">
          {{ $t('registrationPage.bonusTitle') }}
        </div>
        <p class="mb-2 sm:w-[500px] lg:w-auto">
          {{ $t('registrationPage.bonusText1') }}
        </p>
        <p class="mb-2 sm:w-[500px] lg:w-auto">
          {{ $t('registrationPage.bonusText2') }}
        </p>
      </el-card>
      <el-card class="mb-5">
        <div class="text-lg font-bold">
          {{ $t('registrationPage.already-registered') }}
        </div>
        <el-link type="primary" :href="localePath({ path: '/app/login' })">
          {{ $t('registrationPage.go-to-the-login-page') }}
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

definePageMeta({
  public: true,
  layout: 'auth'
})

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const formRef = ref<FormInstance>()
const auth = ref()
const preferredLanguages: string[] = []
const isLoading = ref(false)

const registerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  agreement: false,
  code: ''
})

const formRules = reactive<FormRules>({
  username: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  email: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    { type: 'email', message: t('errors.invalid-email'), trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    { min: 6, max: 255, message: 'Пароль должен быть минимум 6 знаков, максимум 255', trigger: 'blur' }
  ],
  agreement: [
    {
      validator: (rule: any, value: boolean, callback: any) => {
        if (!value) {
          callback(new Error(t('errors.agreement-error')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  code: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if ((auth.value?.randomNumber1 + auth.value?.randomNumber2) !== +value) {
          callback(new Error(t('errors.invalid-number')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

locales.value.forEach((el: any) => {
  if (typeof el === 'string') { return }
  preferredLanguages.push(el.code)
  if (el.iso) {
    preferredLanguages.push(el.iso)
  }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  const runtimeConfig = useRuntimeConfig()
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        const auth = useAuth()
        const { email, username, phone, password } = registerForm
        const tz = new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)
        const cookies = useCookies()
        const referrer = cookies.get('referrer')
        await $fetch(`${runtimeConfig.public.apiBase}/api/v1/register`, {
          method: 'POST',
          body: {
            email,
            password,
            username,
            phone,
            referrer: document.referrer,
            referrerIframe: referrer || '',
            utm: null,
            preferredLanguages,
            languageCode: locale.value,
            affiliateId: '',
            userAgent: navigator.userAgent,
            idCreator: '',
            fromSocial: null,
            socialId: '',
            tz: tz ? tz[1] : null
          }
        })
        ElNotification({
          customClass: '!w-auto',
          title: t('labels.notification-success'),
          message: t('registrationPage.notification-success'),
          type: 'success'
        })
        await auth.loginWith('local', { body: { email, password } })
        return navigateTo(localePath({ path: '/app' }))
      } catch (e) {
        ElNotification({
          customClass: '!w-auto',
          title: t('registrationPage.notification-title'),
          message: t('registrationPage.notification-message'),
          type: 'error'
        })
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>
