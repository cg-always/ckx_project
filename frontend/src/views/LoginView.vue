<template>
  <div class="auth-page">
    <div class="card auth-card">
      <h1>{{ isRegister ? '注册账号' : '登录' }}</h1>

      <div v-if="auth.error" class="form-error">{{ auth.error }}</div>

      <form @submit.prevent="handleSubmit">
        <div v-if="isRegister" class="form-group">
          <label>用户名</label>
          <input type="text" v-model="form.username" required placeholder="您的用户名" />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" v-model="form.email" required placeholder="your@email.com" />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input type="password" v-model="form.password" required placeholder="至少6位密码" minlength="6" />
        </div>
        <button type="submit" class="btn-submit" :disabled="auth.loading">
          {{ auth.loading ? '处理中...' : (isRegister ? '注册' : '登录') }}
        </button>
      </form>

      <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--color-text-secondary);">
        {{ isRegister ? '已有账号？' : '没有账号？' }}
        <a href="#" @click.prevent="isRegister = !isRegister; auth.error = null" style="color:var(--color-primary);font-weight:600;">
          {{ isRegister ? '去登录' : '去注册' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const auth = useAuthStore()
const isRegister = ref(false)
const form = reactive({ username: '', email: '', password: '' })

async function handleSubmit() {
  let ok
  if (isRegister.value) {
    ok = await auth.register(form.username, form.email, form.password)
  } else {
    ok = await auth.login(form.email, form.password)
  }
  if (ok) router.push('/dashboard')
}
</script>
