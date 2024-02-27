<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_390px] lg:items-start gap-5">
    <div class="grid grid-cols-1 relative">
      <el-form
        :model="form"
        label-position="top"
        style="width: 100%"
      >
        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.tabs.tab-4') }}
            </div>

            <el-divider />
          </template>
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.useTargeting"
            border
            class="my-checkbox"
            :label="$t('projectSettings.geotargeting.form.label-1')"
            @change="getCheckedKeys"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox
            v-model="form.showUnknown"
            :disabled="!form.useTargeting"
            border
            class="my-checkbox my-label"
            :label="$t('projectSettings.geotargeting.form.label-2')"
            @change="getCheckedKeys"
          />
        </el-form-item>

        <el-form-item>
          <template #label>
            <div class="text-lg md:text-xl font-medium">
              {{ $t('projectSettings.geotargeting.form.label-3') }}
            </div>
            <el-divider />
          </template>
          <div class="relative">
            <div v-if="!form.useTargeting" class="absolute top-0 left-0 w-full h-full z-[2] cursor-not-allowed" />

            <div v-if="progress" class="absolute top-0 left-0 w-full h-full z-[2] cursor-progress" />

            <!--            <el-tree-->
            <!--              ref="treeRef"-->
            <!--              :data="form.countries"-->
            <!--              :props="defaultProps"-->
            <!--              show-checkbox-->
            <!--              node-key="id"-->
            <!--              accordion-->
            <!--              @check="getCheckedKeys"-->
            <!--            >-->
            <!--            <template #default="{ node }">-->
            <!--              <span class="custom-tree-node">-->
            <!--                <span>{{ $t(`projectSettings.geotargeting.countries.${node.label}`) }}</span>-->
            <!--              </span>-->
            <!--            </template>-->
            <!--            </el-tree>-->
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
            {{ $t('projectSettings.geotargeting.card.title') }}
          </div>
        </div>

        <div class="text-xs md:text-sm">
          {{ $t('projectSettings.geotargeting.card.text') }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ElTree } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useProjectsStore } from '~/store/projects'

const { t } = useI18n()
const treeRef = ref<InstanceType<typeof ElTree>>()
const projectsStore = useProjectsStore()
// const selectedIds = ref<number[]>([])
const loadingSave = ref(false)
const progress = ref(false)

// onMounted(() => {
//   for (let i = 0; i < projectsStore.projectSettings.targeting.countries.length; i++) {
//     const country = projectsStore.projectSettings.targeting.countries[i]
//
//     for (let j = 0; j < country.countryList.length; j++) {
//       const subCountry = country.countryList[j]
//
//       if (subCountry.isSelected) {
//         selectedIds.value.push(subCountry.id)
//       }
//     }
//   }
//   treeRef.value!.setCheckedKeys(selectedIds.value, false)
// })

const form = ref({
  useTargeting: projectsStore.projectSettings.targeting.useTargeting,
  showUnknown: projectsStore.projectSettings.targeting.showUnknown,
  countries: projectsStore.projectSettings.targeting.countries
})

const getCheckedKeys = () => {
  loadingSave.value = true
  progress.value = true
  const currentCountries = ref()
  if (!form.value.useTargeting) {
    currentCountries.value = []
    form.value.showUnknown = false
    treeRef.value!.setCheckedKeys(currentCountries.value, false)
  } else {
    currentCountries.value = treeRef.value!.getCheckedKeys(false).filter(item => item !== undefined)
  }
  try {
    // await projectsStore.projectTargetingUpdate({
    //   projectId: projectsStore.currentProject.id,
    //   input: {
    //     useTargeting: form.value.useTargeting,
    //     showUnknown: form.value.showUnknown,
    //     selectedCountries: currentCountries.value
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
    progress.value = false
  }
}

// const defaultProps = {
//   children: 'countryList',
//   label: 'iso'
// }
</script>
