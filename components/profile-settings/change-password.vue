<template>
  <div class="grid grid-cols-1 xl:grid-cols-2">
    <div>
      <div class="text-lg md:text-xl font-medium">
        {{ $t('profile-settings.tab-2.heading') }}
      </div>

      <el-divider />

      <el-form
        ref="ruleFormRef"
        :model="form"
        status-icon
        :rules="rulesFirst"
        label-width="200px"
        :label-position="md ? 'left' : 'top'"
        require-asterisk-position="right"
        :size="md ? 'default' : 'small'"
        @submit.prevent="submitForm(ruleFormRef)"
      >
        <el-form-item :label="$t('profile-settings.tab-2.form.label-1')" class="!mb-8" prop="oldPassword" type="password">
          <el-input v-model="form.oldPassword" show-password type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-2.form.label-2')" class="!mb-8" prop="password" type="password">
          <el-input v-model="form.password" show-password type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-2.form.label-3')" class="!mb-8" prop="examinationPassword" type="password">
          <el-input v-model="form.examinationPassword" show-password type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :disabled="!form.oldPassword || !form.password || !form.examinationPassword" :loading="isLoading" native-type="submit">
            {{ $t('profile-settings.tab-2.save') }}
          </el-button>

          <el-button @click="resetForm(ruleFormRef)">
            {{ $t('profile-settings.tab-2.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useMediaQuery } from '@vueuse/core/index'
import { useUserStore } from '~/store/user'

const md = useMediaQuery('(min-width: 767px)')
const ruleFormRef = ref<FormInstance>()
const { t } = useI18n()
const userStore = useUserStore()
const isLoading = ref(false)

export interface PasswordForm {
  oldPassword: string,
  password: string,
  examinationPassword: string
}

const form = reactive<PasswordForm>({
  oldPassword: '',
  password: '',
  examinationPassword: ''
})

const rulesFirst = reactive<FormRules>({
  oldPassword: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    { min: 6, max: 255, message: t('profile-settings.tab-2.message-rules-1'), trigger: 'blur' }
  ],
  examinationPassword: [
    { required: true, message: t('errors.required-to-fill'), trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== form.password) {
          callback(new Error(t('profile-settings.tab-2.message-rules-3')))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isLoading.value = true
      try {
        const { oldPassword, password } = form
        await userStore.changeUserPassword({
          input: {
            oldPassword,
            password
          }
        })
        ElMessage({
          grouping: true,
          center: true,
          message: t('labels.saved'),
          type: 'success'
        })
      } catch {
        ElMessage({
          grouping: true,
          center: true,
          message: t('profile-settings.tab-2.notification-massage-error'),
          type: 'error'
        })
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>
