import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useLoaderStore } from '~/store/loader'
import type {
  CheckMyPromoCode,
  FetchLoginProfileResponse, ProfileAddPhoneEmailDTO, ProfileAddPhoneEmailResponse,
  Projects,
  Tariffs,
  User
} from '~/types/store/user'
import { loginProfile } from '~/apollo/queries/user'
import { useProjectsStore } from '~/store/projects'
import { loginProfileAddPhoneEmail } from '~/apollo/mutations/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()
  const userRoles = ref<Array<string>>()
  const userCheckMyPromoCode = ref<CheckMyPromoCode>()
  const userTariffs = ref<Tariffs>()
  const userProjects = ref<Projects>()

  const parseUserRoles = () => {
    const auth = useAuth()
    const { roles } = jwtDecode <{roles: string[]}>(auth.tokenStrategy.token?.get().toString() ?? '')
    userRoles.value = roles
  }

  const fetchLoginProfile = async () => {
    const { data } = await useAsyncQuery<FetchLoginProfileResponse>(loginProfile, {
      code: 'WELCOME',
      tariffsFilter: {
        titles: [
          'drm_project_monthly_protection',
          'branding_project_monthly'
        ]
      }
    })
    return data.value as FetchLoginProfileResponse
  }

  const fetchUserData = async (hideLoader?: boolean) => {
    await useAsyncData(async () => {
      const loaderStore = useLoaderStore()
      if (!hideLoader) {
        loaderStore.setLoader(true)
      }
      try {
        const data = await fetchLoginProfile()
        parseUserRoles()
        user.value = data.loginProfile
        userCheckMyPromoCode.value = data.checkMyPromoCode
        userTariffs.value = data.tariffs
        userProjects.value = data.userProjects
        const projectsStore = useProjectsStore()
        projectsStore.setProject(data.userProjects.nodes)
      } catch (e) {
        console.log(e)
      } finally {
        loaderStore.setLoader(false)
      }
    })
  }

  const profileAddPhoneEmail = async (dto: ProfileAddPhoneEmailDTO) => {
    const { mutate } = useMutation<ProfileAddPhoneEmailResponse>(loginProfileAddPhoneEmail)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    user.value = res.data.loginProfileAddPhoneEmail.record
    return res?.data
  }

  return {
    user,
    userRoles,
    userCheckMyPromoCode,
    userTariffs,
    userProjects,
    fetchLoginProfile,
    fetchUserData,
    profileAddPhoneEmail
  }
})
