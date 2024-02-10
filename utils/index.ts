import { useUserStore } from '~/store/user'
import type { Project } from '~/types/store/projects'

export function getSourceUrl () {
  return process.env.NODE_ENV === 'production'
    ? 'https://boomstream.com'
    : 'https://hwd.boomstream.com'
}

export function getIdProject (): string | undefined {
  const userStore = useUserStore()
  const project: Array<Project> = userStore.userProjects
  for (const item of project) {
    if (item.id) {
      return item.id
    }
  }
  return undefined
}
