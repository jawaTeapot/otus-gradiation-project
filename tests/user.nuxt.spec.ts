import { describe, beforeEach, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { User } from '~/types/store/user'
import { useUserStore } from '~/store/user'
describe('useStoreUser', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial store is empty', () => {
    const store = useUserStore()
    expect(store.user).toMatchObject(<User>{})
  })
})
