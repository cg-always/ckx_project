<template>
  <div class="site-wrapper">
    <nav class="navbar">
      <div class="navbar-inner">
        <router-link to="/" class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>英国春节文化活动合规指南</span>
        </router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 3 6 6-6 6"/><path d="m22 3-6 6 6 6"/></svg>
            首页
          </router-link>
          <router-link to="/glossary" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            术语速查
          </router-link>
          <router-link to="/checklist" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            检查清单
          </router-link>
          <router-link to="/flowchart" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><path d="M6 9v6"/><path d="M9 12h6"/></svg>
            决策流程
          </router-link>
          <router-link to="/templates" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10 12 15 17 10"/><path d="M12 15V3"/></svg>
            模板下载
          </router-link>
          <router-link to="/cases" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            案例速览
          </router-link>
          <router-link to="/links" class="nav-link" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            官方资源
          </router-link>
        </div>

        <div class="nav-actions">
          <button class="dark-mode-btn" @click="toggleDark" :title="isDark ? '切换亮色模式' : '切换暗色模式'">
            <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </button>
          <template v-if="auth.isLoggedIn">
            <router-link to="/dashboard" class="nav-link" active-class="active" style="padding:6px 10px;font-size:12px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ auth.user?.username }}
            </router-link>
            <button class="btn-sm btn-outline" @click="auth.logout(); $router.push('/')">退出</button>
          </template>
          <router-link v-else to="/login" class="nav-link" style="padding:6px 10px;font-size:12px;">
            登录
          </router-link>
          <button class="mobile-menu-btn" @click="mobileOpen = !mobileOpen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
        </div>
      </div>

      <transition name="slide">
        <div v-if="mobileOpen" class="mobile-nav show">
          <router-link to="/" class="nav-link" @click="mobileOpen = false">首页</router-link>
          <router-link to="/glossary" class="nav-link" @click="mobileOpen = false">术语速查</router-link>
          <router-link to="/checklist" class="nav-link" @click="mobileOpen = false">检查清单</router-link>
          <router-link to="/flowchart" class="nav-link" @click="mobileOpen = false">决策流程</router-link>
          <router-link to="/templates" class="nav-link" @click="mobileOpen = false">模板下载</router-link>
          <router-link to="/cases" class="nav-link" @click="mobileOpen = false">案例速览</router-link>
          <router-link to="/links" class="nav-link" @click="mobileOpen = false">官方资源</router-link>
        </div>
      </transition>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <p>北京外国语大学本科生创新创业训练计划项目成果转化展示</p>
      <p class="muted">《英国春节活动法律风险规避手册》配套数字资源 | 内容仅供参考，具体合规要求请咨询当地Council或专业法务顾问</p>
    </footer>

    <!-- Back to Top -->
    <button class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop" title="回到顶部">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from './composables/useDarkMode.js'
import { useAuthStore } from './stores/auth.js'

const { isDark, toggle: toggleDark } = useDarkMode()
const auth = useAuthStore()
const mobileOpen = ref(false)
const showBackToTop = ref(false)

function onScroll() {
  showBackToTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
