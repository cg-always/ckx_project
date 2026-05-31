<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10 12 15 17 10"/><path d="M12 15V3"/></svg>
        标准化工具模板
      </h1>
      <p>可直接下载使用的合规工具模板</p>
    </div>

    <div class="alert-box alert-amber">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      <p>以下模板仅供参考，请根据具体活动和当地Council要求进行调整。建议在提交前咨询专业法务顾问或当地Events Team。</p>
    </div>

    <div v-for="t in templates" :key="t.id" class="card-flat" style="margin-bottom:16px;">
      <div class="template-item">
        <div class="template-icon" :style="{ background: getIcon(t.id).bg, color: getIcon(t.id).color }" v-html="getIcon(t.id).icon"></div>
        <div class="template-body">
          <h3>{{ t.title }}</h3>
          <div class="en">{{ t.titleEn }}</div>
          <p>{{ t.desc }}</p>
        </div>
        <div class="template-actions">
          <button class="btn-sm btn-outline" @click="togglePreview(t.id)">{{ expanded === t.id ? '收起' : '预览' }}</button>
          <button class="btn-sm btn-primary" @click="download(t.id)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10 12 15 17 10"/><path d="M12 15V3"/></svg>
            下载
          </button>
        </div>
      </div>
      <div v-if="expanded === t.id" class="template-preview">
        <pre>{{ templateContents[t.id] }}</pre>
      </div>
    </div>

    <div class="card">
      <h3 style="font-size:15px;font-weight:600;margin-bottom:12px;">模板使用指南</h3>
      <div style="font-size:14px;color:var(--color-text-secondary);line-height:1.7;">
        <p>1. 风险评估表：根据活动实际情况逐项填写，并在筹备过程中动态更新。</p>
        <p>2. 邮件范本：替换方括号[]中的内容为实际信息，保持专业语气。</p>
        <p>3. 现场检查清单：打印后由现场负责人随身携带，逐项勾选并签字确认。</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '../stores/data.js'
import { templateContents } from '../data/static.js'

const store = useDataStore()
const expanded = ref(null)
const templates = ref([])

onMounted(async () => {
  await store.fetchTemplates()
  templates.value = store.templates
})

function getIcon(id) {
  const map = {
    risk: { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, bg: 'var(--color-blue-bg)', color: 'var(--color-blue)' },
    email: { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`, bg: 'var(--color-green-bg)', color: 'var(--color-green)' },
    checklist: { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`, bg: 'var(--color-purple-bg)', color: 'var(--color-purple)' }
  }
  return map[id] || { icon: '', bg: '#f5f5f4', color: '#78716c' }
}

function togglePreview(id) { expanded.value = expanded.value === id ? null : id }

function download(id) {
  const names = { risk: 'Risk_Assessment_Template.txt', email: 'Council_Communication_Templates.txt', checklist: 'Event_Day_Checklist.txt' }
  const blob = new Blob([templateContents[id]], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = names[id]; document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
}
</script>
