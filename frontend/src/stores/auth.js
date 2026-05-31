import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '../api/index.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function register(username, email, password) {
    loading.value = true; error.value = null
    try {
      const res = await authAPI.register({ username, email, password })
      user.value = res.data.user
      token.value = res.data.token
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = err.response?.data?.error || '注册失败'
      return false
    } finally { loading.value = false }
  }

  async function login(email, password) {
    loading.value = true; error.value = null
    try {
      const res = await authAPI.login({ email, password })
      user.value = res.data.user
      token.value = res.data.token
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = err.response?.data?.error || '登录失败'
      return false
    } finally { loading.value = false }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { user, token, loading, error, isLoggedIn, isAdmin, register, login, logout }
})
