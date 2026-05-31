<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"/></svg>
        管理后台
      </h1>
    </div>

    <!-- Stats -->
    <div class="stats-grid" style="margin-bottom:24px;">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="stat-value">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="filter-tags" style="margin-bottom:20px;">
      <span class="tag" :class="{ active: tab === 'glossary' }" @click="tab = 'glossary'">术语管理</span>
      <span class="tag" :class="{ active: tab === 'cases' }" @click="tab = 'cases'">案例管理</span>
      <span class="tag" :class="{ active: tab === 'links' }" @click="tab = 'links'">链接管理</span>
      <span class="tag" :class="{ active: tab === 'feedback' }" @click="tab = 'feedback'">反馈管理</span>
      <span class="tag" :class="{ active: tab === 'users' }" @click="tab = 'users'">用户管理</span>
    </div>

    <div v-if="tab === 'feedback'" class="card">
      <h3 style="margin-bottom:12px;">用户反馈</h3>
      <table class="admin-table" v-if="feedbacks.length">
        <thead><tr><th>姓名</th><th>邮箱</th><th>主题</th><th>内容</th><th>时间</th></tr></thead>
        <tbody>
          <tr v-for="f in feedbacks" :key="f._id">
            <td>{{ f.name }}</td><td>{{ f.email }}</td><td>{{ f.subject || '-' }}</td>
            <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ f.message }}</td>
            <td>{{ new Date(f.createdAt).toLocaleDateString('zh-CN') }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else style="color:var(--color-text-muted);">暂无反馈</p>
    </div>

    <div v-if="tab === 'users'" class="card">
      <h3 style="margin-bottom:12px;">用户列表</h3>
      <table class="admin-table" v-if="users.length">
        <thead><tr><th>用户名</th><th>邮箱</th><th>角色</th><th>注册时间</th></tr></thead>
        <tbody>
          <tr v-for="u in users" :key="u._id">
            <td>{{ u.username }}</td><td>{{ u.email }}</td>
            <td><span class="case-tag" :style="{background: u.role === 'admin' ? 'var(--color-primary-light)' : 'var(--color-green-bg)', color: u.role === 'admin' ? 'var(--color-primary)' : 'var(--color-green)'}">{{ u.role }}</span></td>
            <td>{{ new Date(u.createdAt).toLocaleDateString('zh-CN') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tab === 'glossary'" class="card">
      <p style="color:var(--color-text-secondary);">术语管理功能通过API进行CRUD操作。请使用API工具或管理界面进行术语的添加、编辑和删除。</p>
      <p style="margin-top:8px;font-size:13px;color:var(--color-text-muted);">当前共 {{ stats[0]?.value || 0 }} 条术语</p>
    </div>

    <div v-if="tab === 'cases'" class="card">
      <p style="color:var(--color-text-secondary);">案例管理功能通过API进行CRUD操作。当前共 {{ stats[1]?.value || 0 }} 条案例。</p>
    </div>

    <div v-if="tab === 'links'" class="card">
      <p style="color:var(--color-text-secondary);">链接管理功能通过API进行CRUD操作。当前共 {{ stats[2]?.value || 0 }} 条链接。</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminAPI, feedbackAPI } from '../api/index.js'

const tab = ref('glossary')
const stats = ref([])
const feedbacks = ref([])
const users = ref([])

onMounted(async () => {
  try {
    const [sRes, fRes, uRes] = await Promise.all([
      adminAPI.stats(), feedbackAPI.getAll(), adminAPI.users()
    ])
    const s = sRes.data
    stats.value = [
      { label: '术语', value: s.glossary },
      { label: '案例', value: s.cases },
      { label: '链接', value: s.links },
      { label: '反馈', value: s.feedback },
      { label: '用户', value: s.users }
    ]
    feedbacks.value = fRes.data.data || []
    users.value = uRes.data.data || []
  } catch { /* noop */ }
})
</script>
