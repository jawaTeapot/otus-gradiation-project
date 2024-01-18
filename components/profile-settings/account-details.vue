<template>
  <div class="grid grid-cols-1 xl:grid-cols-2">
    <div class="relative">
      <div class="text-lg md:text-xl font-medium">
        {{ $t('profile-settings.tab-1.heading') }}
      </div>

      <el-divider />

      <el-form
        ref="ruleFormRef"
        status-icon
        :rules="rulesFirst"
        :model="form"
        :label-position="md ? 'left' : 'top'"
        :size="md ? 'default' : 'small'"
        require-asterisk-position="right"
        label-width="150px"
      >
        <el-form-item :label="$t('profile-settings.tab-1.form.label-1')" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-1.form.label-2')" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-1.form.label-3')" prop="languageId">
          <el-select v-model="form.languageId">
            <el-option v-for="item in languages" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-1.form.label-4')" prop="phone">
          <client-only>
            <vue-tel-input
              v-model="form.phone"
              class="w-full h-[40px] focus-within:!shadow-[0_0_0_1px_rgba(64,158,255,1)] focus-within:!border-transparent"
              :class="$colorMode.value === 'light' ? '!border-[#dcdfe6] my-bg-vue-tel-input-white ' : '!border-[#4C4D4F] my-bg-vue-tel-input-black'"
              mode="international"
              :input-options="{placeholder:''}"
              :valid-characters-only="true"
            />
          </client-only>
        </el-form-item>

        <el-form-item :label="$t('profile-settings.tab-1.form.label-5')" prop="about">
          <el-input
            v-model="form.about"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            resize="none"
          />
        </el-form-item>
      </el-form>

      <div v-if="loadingSave" class="absolute top-2 right-0 text-green-500 text-xs z-[999999] flex items-center gap-x-2">
        <Icon name="eos-icons:bubble-loading" />
        <span>{{ $t('labels.save') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useMediaQuery, watchDebounced } from '@vueuse/core'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { useUserStore } from '~/store/user'

interface FormUserDate {
  email: string;
  username: string;
  languageId: string;
  phone: string;
  about: string;
}

const { t } = useI18n()
const userStore = useUserStore()
const md = useMediaQuery('(min-width: 767px)')
const loadingSave = ref(false)
const ruleFormRef = ref<FormInstance>()
const userEmail = computed(() => userStore.user?.email ? userStore.user.email : '')
const userName = computed(() => userStore.user?.username ? userStore.user.username : '')
const userLanguage = computed(() => userStore.user?.settings.language.id ? userStore.user.settings.language.id : '')
const userPhone = computed(() => userStore.user?.settings.phone ? userStore.user.settings.phone : '')
const userAbout = computed(() => userStore.user?.settings.about ? userStore.user.settings.about : '')

const form = reactive<FormUserDate>({
  email: userEmail.value,
  username: userName.value,
  languageId: userLanguage.value,
  phone: userPhone.value,
  about: userAbout.value
})

const languages = ref([
  {
    id: '1',
    title: 'Русский'
  },
  {
    id: '2',
    title: 'English'
  }
])

const rulesFirst = reactive<FormRules>({
  email: [
    { required: true, type: 'email', message: t('errors.required-to-fill'), trigger: 'blur' },
    { type: 'email', message: t('errors.invalid-email'), trigger: ['blur', 'change'] }
  ],
  username: [
    { required: true, type: 'string', message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  languageId: [
    { required: true, trigger: 'change' }
  ],
  phone: [
    { required: true, type: 'string', message: t('errors.required-to-fill'), trigger: 'blur' }
  ],
  about: [
    { min: 0, type: 'string', trigger: 'blur' }
  ]
})

watchDebounced(form, (el) => {
  if (!ruleFormRef.value) { return }
  ruleFormRef.value?.validate(async (valid, fields) => {
    if (valid) {
      loadingSave.value = true
      try {
        await userStore.updateUserProfile({
          input: {
            email: el.email,
            username: el.username,
            languageId: el.languageId,
            phone: el.phone,
            about: el.about
          }
        })
        if (el.email !== userEmail.value) {
          ElMessage({
            grouping: true,
            center: true,
            showClose: true,
            duration: 0,
            customClass: 'w-full lg:w-auto',
            message: `t('profile-settings.tab-1.notification') ${userEmail.value}`,
            type: 'success'
          })
        }
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
