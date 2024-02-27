<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_390px] lg:items-start gap-5">
    <div class="grid grid-cols-1 relative">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-position="top"
        style="max-width: 100%"
      >
        <el-form-item>
          <template #label>
            <span class="text-lg md:text-xl font-medium">{{ $t('projectSettings.protection.form.label-2') }}</span>

            <el-divider />
          </template>

          <el-checkbox
            v-model="formDirectLink.useDirectLink"
            :label="$t('projectSettings.protection.form.label-1')"
            class="my-checkbox my-label"
            :class="checkboxOne ? '!h-[32px]' : '!h-auto'"
            border
            @change="protectionUpdate"
          >
            <template #default>
              <div class="flex items-center">
                <span>{{ $t('projectSettings.protection.form.label-1') }}</span>
                <el-link type="primary" href="https://boomstream.com/docs/security.html#direct-links" target="_blank" :underline="false" class="ml-3">
                  <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
                </el-link>
              </div>
            </template>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="hasDrm"
            class="my-checkbox my-label"
            border
            :disabled="hasDrm"
            @change="showDialogProtection"
          >
            <template #default>
              <div class="flex items-center">
                <span>{{ $t('projectSettings.protection.form.label-12') }}</span>
                <el-link type="primary" href="https://boomstream.com/docs/security.html#drm" target="_blank" :underline="false" class="ml-3">
                  <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
                </el-link>
              </div>
            </template>
          </el-checkbox>

          <app-protection v-model="dialogProtection" />
        </el-form-item>

        <div class="my-3 text-sm">
          {{ $t('projectSettings.protection.form.text-1') }} {{ userStore.userTariffs.nodes[0].prices[0].price }} {{ userStore.userTariffs.nodes[0].prices[0].currency }} {{ $t('projectSettings.protection.form.text-1-1') }}<br>{{ $t('projectSettings.protection.form.text-2') }}
        </div>

        <el-form-item>
          <template #label>
            <div class="flex items-center">
              <span class="text-lg md:text-xl font-medium">{{ $t('projectSettings.protection.form.label-3') }}
                <el-link type="primary" href="https://boomstream.com/docs/security.html#restreaming" target="_blank" :underline="false" class="ml-3">
                  <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
                </el-link>
              </span>
            </div>

            <el-divider />
          </template>

          <el-radio-group v-model="form.security" class="!flex flex-col !items-start md:flex-row md:flex-wrap">
            <el-radio label="None">
              {{ $t('projectSettings.protection.form.label-9') }}
            </el-radio>
            <el-radio label="Domain">
              {{ $t('projectSettings.protection.form.label-4') }}
            </el-radio>
            <el-radio label="Ip">
              {{ $t('projectSettings.protection.form.label-5') }}
            </el-radio>
            <el-radio label="Time">
              {{ $t('projectSettings.protection.form.label-6') }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="form.security === 'Domain'" prop="domains">
          <template #label>
            <span class="text-lg">{{ $t('projectSettings.protection.form.label-4') }}</span>

            <el-divider />

            <div class="mt-3 text-sm flex flex-col">
              <span>{{ $t('projectSettings.protection.form.text-4') }}</span>
              <span>{{ $t('projectSettings.protection.form.text-4-1') }}</span>
              <span>{{ $t('projectSettings.protection.form.text-4-2') }}</span>
              <span>{{ $t('projectSettings.protection.form.text-4-3') }}</span>
              <span>{{ $t('projectSettings.protection.form.text-4-4') }}</span>
            </div>
          </template>

          <el-input
            v-model="form.domains"
            :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea"
            resize="none"
          />

          <el-checkbox
            v-model="form.deniedEmptyReferrer"
            class="my-checkbox mt-3 my-label"
            :class="checkboxTwo ? '!h-[32px]' : '!h-auto'"
            border
            :label="$t('projectSettings.protection.form.label-10')"
          />
        </el-form-item>

        <el-form-item v-if="form.security === 'Ip'">
          <template #label>
            <span class="text-lg">{{ $t('projectSettings.protection.form.label-5') }}</span>
            <el-divider />
          </template>

          <span class="text-sm mt-2">
            {{ $t('projectSettings.protection.form.text-5') }}<br>
            {{ $t('projectSettings.protection.form.text-5-1') }}<br>
            {{ $t('projectSettings.protection.form.text-6') }}
            <el-link class="!pb-0.5" type="primary" href="https://boomstream.com/documentation/developers/video-protection.html" target="_blank">
              {{ $t('projectSettings.protection.form.text-6-1') }}
            </el-link>.
          </span>
        </el-form-item>

        <el-form-item v-if="form.security === 'Time'">
          <template #label>
            <span class="text-lg">{{ $t('projectSettings.protection.form.label-6') }}</span>
            <el-divider />
          </template>
          <div>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-3 items-center">
              <span>{{ $t('projectSettings.protection.form.label-11') }}</span>
              <el-input-number v-model="form.timeValid" :min="1" />
            </div>

            <div class="flex flex-col text-sm mt-3">
              <span>{{ $t('projectSettings.protection.form.text-5') }}</span>
              <span>{{ $t('projectSettings.protection.form.text-5-1') }}</span>
              <span class="flex items-center">
                {{ $t('projectSettings.protection.form.text-6') }}
                <el-link class="ml-1" type="primary" href="https://boomstream.com/documentation/developers/video-protection.html" target="_blank">
                  {{ $t('projectSettings.protection.form.text-6-1') }}
                </el-link>.
              </span>
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="userAgentAllow">
          <template #label>
            <span class="text-lg">{{ $t('projectSettings.protection.form.label-7') }}</span>
            <el-divider />
          </template>
          <span class="text-sm mb-2">{{ $t('projectSettings.protection.form.text-3') }}</span>
          <el-input
            v-model="form.userAgentAllow"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            resize="none"
          />
        </el-form-item>
        <el-form-item prop="userAgentDeny">
          <template #label>
            <span class="text-lg">{{ $t('projectSettings.protection.form.label-8') }}</span>
            <el-divider />
          </template>
          <span class="text-sm mb-2">{{ $t('projectSettings.protection.form.text-3') }}</span>
          <el-input
            v-model="form.userAgentDeny"
            :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea"
            resize="none"
          />
        </el-form-item>
      </el-form>

      <div v-if="loadingSave" class="absolute top-0 right-0 text-green-500 text-xs z-[999999] flex items-center gap-x-2">
        <Icon name="eos-icons:bubble-loading" />
        <span>{{ $t('labels.save') }}</span>
      </div>
    </div>

    <el-card shadow="hover" body-class="!p-3 md:!p-5 bg-sky-100 text-black" style="border-radius: 15px">
      <div class="flex flex-col items-start gap-y-3">
        <div class="flex items-center">
          <Icon name="bi:info-circle" class="text-2xl mr-2.5" />

          <div class="font-bold">
            {{ $t('projectSettings.protection.card.title') }}
          </div>
        </div>

        <div class="text-xs md:text-sm">
          {{ $t('projectSettings.protection.card.text') }}
          <el-link class="!pb-0.5" type="primary" href="https://boomstream.com/en/documentation/developers/video-protection.html" target="_blank">
            {{ $t('projectSettings.protection.card.link') }}
          </el-link>.
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useMediaQuery, watchDebounced } from '@vueuse/core'
import type { FormInstance, FormRules } from 'element-plus'
import { useProjectsStore } from '~/store/projects'
import { useUserStore } from '~/store/user'
import AppProtection from '~/components/app/appProtection.vue'

interface RuleForm {
  userAgentAllow: string;
  userAgentDeny: string;
  timeValid: number;
  domains: string;
  deniedEmptyReferrer: boolean;
  security: string
}

const { t, locale } = useI18n()
const checkboxOne = useMediaQuery(locale.value === 'ru' ? '(min-width: 540px)' : '(min-width: 382px)')
const checkboxTwo = useMediaQuery(locale.value === 'ru' ? '(min-width: 399px)' : '(min-width: 324px)')
const userStore = useUserStore()
const projectsStore = useProjectsStore()
const ruleFormRef = ref<FormInstance>()
const dialogProtection = ref(false)
const loadingSave = ref(false)

const hasDrm = computed({
  get () {
    if (projectsStore.currentProject) {
      return projectsStore.currentProject.hasDrm
    }
  },
  set () {}
})

const formDirectLink = ref({
  useDirectLink: projectsStore.projectSettings.protection.useDirectLink
})

const form = ref<RuleForm>({
  userAgentAllow: projectsStore.projectSettings.protection.userAgentAllow.join('\n'),
  userAgentDeny: projectsStore.projectSettings.protection.userAgentDeny.join('\n'),
  timeValid: projectsStore.projectSettings.protection.timeValid || 1,
  domains: projectsStore.projectSettings.protection.domains.domainList.join('\n'),
  deniedEmptyReferrer: projectsStore.projectSettings.protection.deniedEmptyReferrer,
  security: projectsStore.projectSettings.protection.security
})

// const regexAgent = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/gm
const regexAgent = /^([\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}|)$/
// const regexDomain = /^[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/gm
const regexDomain = /^([\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})|)$/

const rules = reactive<FormRules<RuleForm>>({
  userAgentAllow: [
    {
      validator: (rule: any, value: any, callback: any) => {
        for (const el of form.value.userAgentAllow.split('\n')) {
          if (!regexAgent.test(el)) {
            callback(new Error(t('projectSettings.protection.form.validator')))
            // TODO нужно будет доработать валидацию
            // Фильтрация только действительных email
            // const validEmails = form.value.userAgentAllow.split('\n').filter(email => regexAgent.test(email))
            // Удаление повторяющихся email
            // const uniqueEmails = [...new Set(validEmails)]
            // Обновление значения массива
            // form.value.userAgentAllow = uniqueEmails.join('\n')
            break
          }
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  userAgentDeny: [
    {
      validator: (rule: any, value: any, callback: any) => {
        for (const el of form.value.userAgentDeny.split('\n')) {
          if (!regexAgent.test(el)) {
            callback(new Error(t('projectSettings.protection.form.validator')))
            // TODO нужно будет доработать валидацию
            break
          }
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  domains: [
    {
      validator: (rule: any, value: any, callback: any) => {
        for (const el of form.value.domains.split('\n')) {
          if (!regexDomain.test(el)) {
            callback(new Error(t('projectSettings.protection.form.validator')))
            // TODO нужно будет доработать валидацию
            break
          }
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

function showDialogProtection () {
  dialogProtection.value = !dialogProtection.value
}

const protectionUpdate = async () => {
  loadingSave.value = true
  try {
    await projectsStore.updateProtection({
      projectId: projectsStore.currentProject.id,
      input: {
        useDirectLink: projectsStore.projectSettings.protection.useDirectLink
      }
    })
    ElMessage({
      grouping: true,
      center: true,
      message: t('labels.saved'),
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
    loadingSave.value = false
  }
}

watchDebounced(form.value, async (el) => {
  if (!ruleFormRef.value) { return }
  await ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      loadingSave.value = true
      try {
        if (el.security === 'None') {
          await projectsStore.restreamingProtectionDisable({
            projectId: projectsStore.currentProject.id,
            input: {
              userAgentAllow: el.userAgentAllow.split('\n'),
              userAgentDeny: el.userAgentDeny.split('\n')
            }
          })
        }
        if (el.security === 'Domain') {
          await projectsStore.restreamingProtectionByDomain({
            projectId: projectsStore.currentProject.id,
            input: {
              userAgentAllow: el.userAgentAllow.split('\n'),
              userAgentDeny: el.userAgentDeny.split('\n'),
              deniedEmptyReferrer: el.deniedEmptyReferrer,
              domains: el.domains.split('\n')
            }
          })
        }
        if (el.security === 'Ip') {
          await projectsStore.restreamingProtectionByIp({
            projectId: projectsStore.currentProject.id,
            input: {
              userAgentAllow: el.userAgentAllow.split('\n'),
              userAgentDeny: el.userAgentDeny.split('\n')
            }
          })
        }
        if (el.security === 'Time') {
          await projectsStore.restreamingProtectionByTime({
            projectId: projectsStore.currentProject.id,
            input: {
              userAgentAllow: el.userAgentAllow.split('\n'),
              userAgentDeny: el.userAgentDeny.split('\n'),
              timeValid: el.timeValid
            }
          })
        }
        ElMessage({
          grouping: true,
          center: true,
          message: t('labels.saved'),
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
        loadingSave.value = false
      }
    }
  })
}, { debounce: 1300, maxWait: 5000 })
</script>
