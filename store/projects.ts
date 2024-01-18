import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ActivateBrandingDTO,
  ActivateBrandingResponse,
  ActivateDRMDTO,
  ActivateDRMResponse,
  CreateProjectDTO,
  CreateProjectResponse,
  Project, ProjectChangeTitleDTO, ProjectChangeTitleResponse,
  ProjectSettings, ProjectSettingsQuery
} from '~/types/store/projects'
import {
  userProjectActivateBranding,
  userProjectActivateDRM,
  userProjectChangeTitle,
  userProjectCreate
} from '~/apollo/mutations/projects'
import { userProjectSettings } from '~/apollo/queries/projects'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Array<Project>>([])
  const currentProject = ref<Project>()
  const projectSettings = ref<ProjectSettings>()

  const setProject = (items: Array<Project>) => {
    projects.value = items
    const projectLocalId: string | null = localStorage.getItem('currentProject')
    if (projectLocalId) {
      const cp = items.find(el => el.id === projectLocalId)
      if (cp) {
        currentProject.value = cp
      }
    } else {
      currentProject.value = projects.value[0]
    }
  }

  const changeCurrentProject = (projectId: string) => {
    const cp = projects.value?.find(el => el.id === projectId)
    if (cp) {
      currentProject.value = cp
      localStorage.setItem('currentProject', cp.id)
    }
  }

  const createProject = async (dto: CreateProjectDTO) => {
    const { mutate } = useMutation<CreateProjectResponse>(userProjectCreate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projects.value = [...projects.value, res.data.userProjectCreate.record]
    changeCurrentProject(res.data.userProjectCreate.record.id)
    return res.data
  }

  const getUserProjectSettings = async (projectId: number | string) => {
    const { data, error } = await useAsyncQuery<ProjectSettingsQuery>(userProjectSettings, {
      projectId
    })
    // @ts-ignore
    if (error.value?.cause?.graphQLErrors[0]?.extensions?.errorData?.errorCode === 403 || error.value?.cause?.networkError?.statusCode === 401) { return }
    projectSettings.value = data.value.userProjectSettings
    return data.value
  }

  const projectChangeTitle = async (dto: ProjectChangeTitleDTO) => {
    const { mutate } = useMutation<ProjectChangeTitleResponse>(userProjectChangeTitle)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    currentProject.value = Object.assign({}, currentProject.value, { title: res?.data?.userProjectChangeTitle.title })
    return res.data
  }

  const activateBranding = async (dto: ActivateBrandingDTO) => {
    const { mutate } = useMutation<ActivateBrandingResponse>(userProjectActivateBranding)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  const activateDRM = async (dto: ActivateDRMDTO) => {
    const { mutate } = useMutation<ActivateDRMResponse>(userProjectActivateDRM)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  return {
    projects,
    currentProject,
    projectSettings,
    setProject,
    changeCurrentProject,
    createProject,
    activateBranding,
    activateDRM,
    getUserProjectSettings,
    projectChangeTitle
  }
})
