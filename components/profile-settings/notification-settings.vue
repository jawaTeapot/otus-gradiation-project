<template>
  <div class="grid grid-cols-1 xl:grid-cols-2">
    <div class="relative">
      <div class="text-lg md:text-xl font-medium">
        {{ $t('profile-settings.tab-3.heading') }}
      </div>

      <el-divider />

      <el-form
        ref="ruleFormRef"
        status-icon
        :rules="rulesFirst"
        :model="form"
        label-position="top"
        :size="md ? 'default' : 'small'"
      >
        <el-form-item prop="email">
          <div class="w-full flex flex-col md:flex-row md:items-center gap-3">
            <span>{{ $t('profile-settings.tab-3.email') }}</span>
            <el-input v-model="form.email" class="md:max-w-[350px]" type="email" />
          </div>
        </el-form-item>

        <el-form-item>
          <div class="w-full flex flex-col md:flex-row md:items-center gap-3">
            <span>{{ $t('profile-settings.tab-3.checkbox-2') }}</span>
            <el-checkbox
              v-model="form.useBothEmails"
              :disabled="userStore.user?.emailSettings.email === userStore.user?.email"
              :label="userStore.user?.email"
              border
              class="my-checkbox my-label"
            />
          </div>
        </el-form-item>

        <div>
          <span class="text-xs md:text-base">{{ $t('profile-settings.tab-3.text') }} {{ userStore.user?.emailSettings.email }}</span>
          <span v-if="form.useBothEmails && userStore.user?.emailSettings.email !== userStore.user?.email" class="text-xs md:text-base">, {{ userStore.user?.email }}</span>
        </div>

        <el-divider />

        <el-form-item>
          <div class="w-full flex flex-col md:flex-row md:items-center gap-3">
            <span>{{ $t('profile-settings.tab-3.checkbox-1') }}</span>
            <el-input v-model="form.balanceLimit" :disabled="!form.balance" class="md:max-w-[300px]" type="number">
              <template #prepend>
                <el-checkbox v-model="form.balance" />
                <span class="md:text-sm ml-3">
                  {{ userStore.user?.account.currency }}
                </span>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.mediaSuccess"
            border
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            :label="$t('profile-settings.tab-3.checkbox-3')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.mediaError"
            border
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            :label="$t('profile-settings.tab-3.checkbox-4')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.mediaBuy"
            border
            class="my-checkbox my-label"
            :label="$t('profile-settings.tab-3.checkbox-5')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.liveCodecs"
            border
            class="my-checkbox my-label"
            :label="$t('profile-settings.tab-3.checkbox-6')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.cameraError"
            border
            class="my-checkbox my-label"
            :label="$t('profile-settings.tab-3.checkbox-7')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.liveAutokick"
            border
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            :label="$t('profile-settings.tab-3.checkbox-8')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.liveNotRecorded"
            border
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            :label="$t('profile-settings.tab-3.checkbox-9')"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.news"
            border
            class="my-checkbox my-label"
            :label="$t('profile-settings.tab-3.checkbox-10')"
          />
        </el-form-item>
      </el-form>

      <div v-if="loadingSave" class="absolute top-0 right-0 text-green-500 text-xs z-[999999] flex items-center gap-x-2">
        <Icon name="eos-icons:bubble-loading" />
        <span>{{ $t('labels.save') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useMediaQuery, watchDebounced } from '@vueuse/core'
import { useUserStore } from '~/store/user'

const md = useMediaQuery('(min-width: 767px)')
const userStore = useUserStore()
const { t } = useI18n()
const loadingSave = ref(false)
const ruleFormRef = ref<FormInstance>()
const rulesFirst = reactive<FormRules>({
  email: [
    { type: 'email', message: t('errors.invalid-email'), trigger: ['blur', 'change'] }
  ]
})

const form = reactive({
  email: '' || userStore.user?.emailSettings.email,
  useBothEmails: userStore.user?.emailSettings.useBothEmails,
  balance: userStore.user?.emailSettings.balance,
  balanceLimit: userStore.user?.emailSettings.balanceLimit,
  mediaSuccess: userStore.user?.emailSettings.mediaSuccess,
  mediaError: userStore.user?.emailSettings.mediaError,
  mediaBuy: userStore.user?.emailSettings.mediaBuy,
  liveCodecs: userStore.user?.emailSettings.liveCodecs,
  cameraError: userStore.user?.emailSettings.mediaError,
  liveAutokick: userStore.user?.emailSettings.liveAutokick,
  liveNotRecorded: userStore.user?.emailSettings.liveNotRecorded,
  news: userStore.user?.emailSettings.news
})

watchDebounced(form, (el) => {
  if (!ruleFormRef.value) { return }
  ruleFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      loadingSave.value = true
      try {
        await userStore.setNotification({
          input: {
            email: el.email!,
            useBothEmails: el.useBothEmails!,
            balance: el.balance!,
            balanceLimit: el.balanceLimit!,
            mediaSuccess: el.mediaSuccess!,
            mediaError: el.mediaError!,
            mediaBuy: el.mediaBuy!,
            liveCodecs: el.liveCodecs!,
            cameraError: el.cameraError!,
            liveAutokick: el.liveAutokick!,
            liveNotRecorded: el.liveNotRecorded!,
            news: el.news!
          }
        })
        ElMessage({
          grouping: true,
          center: true,
          message: t('labels.saved'),
          type: 'success'
        })
      } catch (e) {
        console.log(e)
        ElMessage({
          grouping: true,
          center: true,
          message: t('errors.something'),
          type: 'error'
        })
      } finally {
        loadingSave.value = false
      }
    }
  })
}, { debounce: 1300, maxWait: 5000 })
</script>
