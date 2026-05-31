<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        个人仪表盘
      </h1>
      <p>欢迎回来，{{ auth.user?.username }}</p>
    </div>

    <div class="stats-grid" style="margin-bottom:24px;">
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <div class="stat-value">{{ savedChecklists.length }}</div>
        <div class="stat-label">已保存清单</div>
      </div>
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div class="stat-value">{{ auth.user?.role === 'admin' ? '管理员' : '用户' }}</div>
        <div class="stat-label">账号角色</div>
      </div>
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
      <button class="btn-sm btn-primary" style="padding:8px 16px;" @click="$router.push('/checklist')">创建新清单</button>
      <button v-if="auth.isAdmin" class="btn-sm btn-outline" style="padding:8px 16px;" @click="$router.push('/admin')">进入管理后台</button>
    </div>

    <h2 style="font-size:16px;font-weight:700;margin-bottom:12px;">已保存的检查清单</h2>
    <div v-if="savedChecklists.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <p>暂无保存的清单，去创建一个吧</p>
    </div>
    <div v-for="cl in savedChecklists" :key="cl._id" class="card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong>{{ cl.name }}</strong>
          <span style="font-size:12px;color:var(--color-text-muted);margin-left:8px;">
            {{ new Date(cl.updatedAt).toLocaleDateString('zh-CN') }}
          </span>
          <span style="font-size:12px;color:var(--color-text-secondary);margin-left:8px;">
            {{ cl.tasks?.filter(t => t.done).length || 0 }}/{{ cl.tasks?.length || 0 }} 已完成
          </span>
        </div>
        <button class="btn-sm btn-outline" @click="deleteChecklist(cl._id)">删除</button>
      </div>
    </div>

    <!-- Contact / Feedback Form -->
    <div class="card contact-form" style="margin-top:24px;">
      <h2 style="font-size:16px;font-weight:700;margin-bottom:16px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;display:inline;vertical-align:-3px;margin-right:6px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        意见反馈
      </h2>
      <form @submit.prevent="submitFeedback">
        <div class="form-group">
          <label>主题（可选）</label>
          <input type="text" v-model="fb.subject" placeholder="反馈主题" />
        </div>
        <div class="form-group">
          <label>留言内容</label>
          <textarea v-model="fb.message" required placeholder="请留下您的意见或建议..."></textarea>
        </div>
        <p v-if="fbMsg" class="form-success">{{ fbMsg }}</p>
        <button type="submit" class="btn-submit" :disabled="fbSending">{{ fbSending ? '提交中...' : '提交反馈' }}</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { checklistsAPI, feedbackAPI } from '../api/index.js'

const auth = useAuthStore()
const savedChecklists = ref([])
const fb = reactive({ subject: '', message: '' })
const fbSending = ref(false)
const fbMsg = ref('')

onMounted(async () => {
  try {
    const res = await checklistsAPI.getAll()
    savedChecklists.value = res.data.data || []
  } catch { savedChecklists.value = [] }
})

async function deleteChecklist(id) {
  try {
    await checklistsAPI.delete(id)
    savedChecklists.value = savedChecklists.value.filter(c => c._id !== id)
  } catch { /* ignore */ }
}

async function submitFeedback() {
  fbSending.value = true; fbMsg.value = ''
  try {
    await feedbackAPI.submit({
      name: auth.user?.username || 'Anonymous',
      email: auth.user?.email || '',
      subject: fb.subject,
      message: fb.message
    })
    fbMsg.value = '感谢您的反馈！我们会认真阅读每一条建议。'
    fb.subject = ''; fb.message = ''
  } catch {
    fbMsg.value = '提交失败，请稍后再试'
  }
  fbSending.value = false
}
</script>
