import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {   
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(authUser, authToken) {
    user.value = authUser
    token.value = authToken

    localStorage.setItem('token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null

    localStorage.removeItem('token')
  }

  function setUser(authUser) {
    user.value = authUser
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
    setUser
  }
});