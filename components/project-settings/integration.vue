<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_390px] lg:items-start gap-5">
    <div class="grid grid-cols-1 relative">
      <el-form
        :model="form"
        label-position="top"
        style="max-width: 100%"
      >
        <el-form-item>
          <template #label>
            <div class="flex items-center text-lg md:text-xl font-medium">
              <span>{{ $t('projectSettings.integration.form.label-1') }}</span>
              <el-link type="primary" href="https://boomstream.com/docs/api.html" target="_blank" :underline="false" class="ml-3">
                <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
              </el-link>
            </div>

            <el-divider />
          </template>

          <div class="flex flex-col items-start gap-y-3 w-full">
            <span class="text-sm">
              {{ $t('projectSettings.integration.form.text-1') }}
            </span>

            <el-input v-model="userApiKey">
              <template #append>
                <el-button :size="md ? 'default' : 'small'" :loading="isLoadingApiKey" class="!flex !items-center justify-center" @click="generateApiKey('ApiKey')">
                  <Icon v-if="!isLoadingApiKey" name="material-symbols:sync-outline" class="mr-[6px]" />
                  <span>{{ $t('projectSettings.integration.form.btn-1') }}</span>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="flex items-center text-lg md:text-xl font-medium">
              <span>{{ $t('projectSettings.integration.form.label-10') }}</span>
              <el-link type="primary" href="https://boomstream.com/documentation/users/ftp-uploading.html" target="_blank" :underline="false" class="ml-3">
                <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
              </el-link>
            </div>

            <el-divider />
          </template>

          <div class="flex flex-col items-start gap-y-3 w-full">
            <span class="text-sm">
              {{ $t('projectSettings.integration.form.text-5') }}
            </span>

            <el-input v-model="userApiKeyFtp" :placeholder="$t('projectSettings.integration.form.placeholder')">
              <template #append>
                <el-button :size="md ? 'default' : 'small'" :loading="isLoadingKeyFtp" class="!flex !items-center justify-center" @click="generateApiKey('KeyFtp')">
                  <Icon v-if="!isLoadingKeyFtp" name="material-symbols:sync-outline" class="mr-[6px]" />

                  <span>{{ $t('projectSettings.integration.form.btn-1') }}</span>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.heading-1') }}
            </div>

            <el-divider />
          </template>

          <el-button :size="md ? 'default' : 'small'" type="primary" @click="dialogFormVisible = true">
            {{ $t('projectSettings.integration.form.label-3') }}
          </el-button>

          <client-only>
            <el-dialog
              v-model="dialogFormVisible"
              align-center
              :title="$t('projectSettings.integration.form.label-3')"
              width="500"
              class="!w-[300px] sm:!w-[600px]"
              style="border-radius: 15px"
              @close="() => formDialog.name = ''"
            >
              <el-form
                ref="ruleFormRef"
                :model="formDialog"
                :rules="rules"
                @submit.prevent="addNewApiKey(ruleFormRef)"
              >
                <div class="grid grid-cols-1 gap-y-3">
                  <el-form-item :label="$t('projectSettings.integration.table.label-4')" prop="name">
                    <el-input v-model="formDialog.name" :size="md ? 'default' : 'small'" />
                  </el-form-item>

                  <el-form-item :label="$t('projectSettings.integration.table.label-1')" prop="keyAllowType">
                    <el-select v-model="formDialog.keyAllowType" :size="md ? 'default' : 'small'">
                      <el-option
                        v-for="item in optionsApiKey"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>

                  <el-form-item>
                    <div class="flex items-center justify-end w-full">
                      <el-button :size="md ? 'default' : 'small'" type="primary" class="w-[114px]" :loading="loadingAdd" native-type="submit">
                        {{ $t('projectSettings.integration.form.btn-2') }}
                      </el-button>
                    </div>
                  </el-form-item>
                </div>
              </el-form>
            </el-dialog>
          </client-only>
        </el-form-item>

        <client-only>
          <el-table
            v-if="userApiKeyList.length > 0"
            ref="singleTableRef"
            v-loading="loadingAdd"
            :data="userApiKeyList"
            style="width: 100%"
            class="mb-5"
            scrollbar-always-on
          >
            <el-table-column prop="allowType" :label="$t('projectSettings.integration.table.label-1')" fixed min-width="130">
              <template #default="scope">
                <span v-if="scope.row.allowType === 'Read'"> {{ $t('projectSettings.integration.optionsApiKey.label-1') }}</span>
                <span v-if="scope.row.allowType === 'Write'">{{ $t('projectSettings.integration.optionsApiKey.label-2') }}</span>
                <span v-if="scope.row.allowType === 'Upload'">{{ $t('projectSettings.integration.optionsApiKey.label-3') }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="name" :label="$t('projectSettings.integration.table.label-4')" fixed min-width="130" />

            <el-table-column prop="apiKey" :label="$t('projectSettings.integration.table.label-2')" min-width="310">
              <template #default="scope">
                <span class="select-text">{{ scope.row.apiKey }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="added" :label="$t('projectSettings.integration.table.label-3')" min-width="160" />

            <el-table-column min-width="80" align="center">
              <template #default="scope">
                <el-button link type="danger" size="small" @click.prevent="deleteApyKey(scope.row.id)">
                  {{ $t('projectSettings.integration.table.btn') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </client-only>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.heading-5') }}
            </div>
            <el-divider />
          </template>
          <div class="flex flex-col items-start gap-y-3 w-full">
            <span class="flex items-center">
              <span>{{ $t('projectSettings.integration.form.label-2') }}</span>
              <el-link type="primary" href="https://boomstream.com/documentation/users/live-broadcasting.html" target="_blank" :underline="false" class="ml-3">
                <Icon name="material-symbols:contact-support-outline" class="outline-none text-lg" />
              </el-link>
            </span>
            <el-input v-model="userCode">
              <template #append>
                <el-button :loading="isLoadingCode" class="!flex !items-center justify-center" @click="generateApiKey('code')">
                  <Icon v-if="!isLoadingCode" name="material-symbols:sync-outline" class="mr-[6px]" />
                  <span>{{ $t('projectSettings.integration.form.btn-1') }}</span>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.heading-2') }}
            </div>
            <el-divider />
          </template>
          <el-checkbox
            v-model="form.downloadFromComputer"
            border
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            :label="$t('projectSettings.integration.form.label-4')"
            @change="integrationUpdate"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.downloadByLink"
            border
            :label="$t('projectSettings.integration.form.label-5')"
            class="my-checkbox my-label !h-auto md:!h-[32px]"
            @change="integrationUpdate"
          />
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.form.label-6') }}
            </div>
          </template>
          <el-input
            v-model="fileUpload"
            class="col-span-2"
            :autosize="{ minRows: 3, maxRows: 4 }"
            type="textarea"
            resize="none"
          />
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.form.label-9') }}
            </div>
          </template>
          <el-input
            v-model="tuz"
            class="col-span-2"
            :autosize="{ minRows: 3, maxRows: 4 }"
            type="textarea"
            resize="none"
          />
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.heading-3') }}
            </div>
            <el-divider />
          </template>
          <div class="flex flex-col items-start gap-y-3">
            <span class="text-sm">
              {{ $t('projectSettings.integration.form.text-2') }}
            </span>
            <el-checkbox
              v-model="form.autoBroadcasting"
              border
              class="my-checkbox"
              :label="$t('projectSettings.integration.form.label-7')"
              @change="integrationUpdate"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.form.label-6') }}
            </div>
          </template>
          <div class="flex flex-col items-start gap-y-3 w-full">
            <span class="text-sm">
              {{ $t('projectSettings.integration.form.text-3') }}
            </span>
            <el-input
              v-model="broadcastWidget"
              :autosize="{ minRows: 3, maxRows: 4 }"
              type="textarea"
              resize="none"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.integration.heading-4') }}
            </div>
            <el-divider />
          </template>
          <div class="flex flex-col items-start gap-y-3">
            <span class="text-sm">
              {{ $t('projectSettings.integration.form.text-4') }}
            </span>
            <el-checkbox
              v-model="form.timepadNotifaication"
              border
              class="my-checkbox my-label !h-auto md:!h-[32px]"
              :label="$t('projectSettings.integration.form.label-8')"
              @change="integrationUpdate"
            />
          </div>
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
            {{ $t('projectSettings.integration.card.title') }}
          </div>
        </div>

        <div class="text-xs md:text-sm">
          {{ $t('projectSettings.integration.card.text') }}
          <el-link class="!pb-[3px]" type="primary" href="https://boomstream.com/ru/documentation/api.html" target="_blank">
            {{ $t('projectSettings.integration.card.link') }}
          </el-link>.
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElTable, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useMediaQuery } from '@vueuse/core'
import { useProjectsStore } from '~/store/projects'

interface RuleForm {
  name: string;
  keyAllowType: string;
}

const md = useMediaQuery('(min-width: 767px)')
const { t } = useI18n()
const projectsStore = useProjectsStore()
const isLoadingApiKey = ref<boolean>(false)
const isLoadingCode = ref<boolean>(false)
const isLoadingKeyFtp = ref<boolean>(false)
const loadingSave = ref(false)
const loadingAdd = ref(false)
const fileUpload = computed(() => `<iframe src="https://${projectsStore.projectSettings?.integration.domain}/api/media/iframeupload?hash=${projectsStore.projectSettings?.integration.apiKey}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`)
const broadcastWidget = computed(() => `<iframe src="https://${projectsStore.projectSettings?.integration.domain}/api/live/encoder?hash=${projectsStore.projectSettings?.integration.apiKey}&code=[CODE]&encoder=1" width="100%" height="100%" frameborder="0" scrolling="no" allow="camera;microphone"></iframe>`)
const userApiKey = computed(() => projectsStore.projectSettings?.integration.apiKey)
const userApiKeyList = computed(() => projectsStore.projectSettings?.integration.apiKeyList ?? [])
const userApiKeyFtp = computed(() => projectsStore.projectSettings?.integration.apiKeyFtp)
const userCode = computed(() => projectsStore.projectSettings?.integration.code)
const tuz = ref('тут что то будет, пока ждемс бэк')
const singleTableRef = ref<InstanceType<typeof ElTable>>()
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const formDialog = ref<RuleForm>({
  name: '',
  keyAllowType: 'Read'
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: t('errors.required-to-fill'), trigger: 'blur' }],
  keyAllowType: [{ required: true, message: t('errors.required-to-fill'), trigger: 'blur' }]
})

const form = ref({
  downloadFromComputer: projectsStore.projectSettings?.integration.downloadFromComputer,
  downloadByLink: projectsStore.projectSettings?.integration.downloadByLink,
  autoBroadcasting: projectsStore.projectSettings?.integration.autoBroadcasting,
  timepadNotifaication: projectsStore.projectSettings?.integration.timepadNotifaication
})

const optionsApiKey = ref([
  {
    value: 'Read',
    label: t('projectSettings.integration.optionsApiKey.label-1')
  },
  {
    value: 'Write',
    label: t('projectSettings.integration.optionsApiKey.label-2')
  },
  {
    value: 'Upload',
    label: t('projectSettings.integration.optionsApiKey.label-3')
  }
])

const generateApiKey = async (id: string) => {
  try {
    if (id === 'ApiKey') {
      isLoadingApiKey.value = true
      await projectsStore.generateAPIKey({ projectId: projectsStore.currentProject?.id ?? '' })
    }
    if (id === 'code') {
      isLoadingCode.value = true
      // await projectsStore.generateCode({ projectId: projectsStore.currentProject?.id })
    }
    if (id === 'KeyFtp') {
      isLoadingKeyFtp.value = true
      // await projectsStore.generateAPIKeyFtp({ projectId: projectsStore.currentProject?.id })
    }
  } catch (e) {
    console.log(e)
    ElMessage({
      message: t('errors.something'),
      type: 'error'
    })
  } finally {
    isLoadingCode.value = false
    isLoadingApiKey.value = false
    isLoadingKeyFtp.value = false
  }
}

const addNewApiKey = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      loadingAdd.value = true
      // const { keyAllowType, name } = formDialog.value
      try {
        // await projectsStore.addApiKey({
        //   projectId: projectsStore.currentProject?.id,
        //   input: {
        //     name,
        //     keyAllowType
        //   }
        // })
        formEl.resetFields()
        dialogFormVisible.value = false
        ElMessage({
          grouping: true,
          center: true,
          message: t('projectSettings.integration.ElMessage.add'),
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
        loadingAdd.value = false
      }
    } else {
      ElMessage({
        grouping: true,
        center: true,
        message: t('errors.something'),
        type: 'error'
      })
    }
  })
}

const deleteApyKey = (id: number) => {
  console.log(id)
  loadingSave.value = true
  try {
    // await projectsStore.deleteApiKey({
    //   projectId: Number(projectsStore.currentProject?.id),
    //   input: {
    //     id
    //   }
    // })
    ElMessage({
      grouping: true,
      center: true,
      message: t('projectSettings.integration.ElMessage.deleted'),
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

const integrationUpdate = () => {
  loadingSave.value = true
  try {
    // const { downloadFromComputer, downloadByLink, autoBroadcasting, timepadNotifaication } = form.value
    // await projectsStore.updateIntegration({
    //   projectId: projectsStore.currentProject?.id,
    //   input: {
    //     downloadFromComputer,
    //     downloadByLink,
    //     autoBroadcasting,
    //     timepadNotifaication
    //   }
    // })
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
</script>

<style scoped lang="scss">
//:deep(.el-form-item__label) {
//  @apply pr-0;
//}
</style>
