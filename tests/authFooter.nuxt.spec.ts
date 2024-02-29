import { describe, beforeEach, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import component from '~/components/auth/authFooter.vue'

describe('authFooter component', () => {
  function buildWrapper (path = '/app') {
    const wrapper = mount(component, {
      global: {
        stubs: {
          NuxtLink: true // Стабируем NuxtLink
        },
        mocks: {
          $route: {
            path
          },
          $t: (msg: string) => msg
        }
      }
    })
    return wrapper
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mounts without errors', () => {
    const wrapper = buildWrapper('/')
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
