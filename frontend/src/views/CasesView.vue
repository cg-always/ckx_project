<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        案例速览
      </h1>
      <p>正面经验、反面教训与边界实践的三组微型案例研究</p>
    </div>

    <div v-for="c in cases" :key="c._id" class="card-flat case-item" style="margin-bottom:16px;">
      <button class="case-header" @click="toggle(c._id)">
        <div :style="{padding:'8px',borderRadius:'8px',background: c.badgeBg, color: c.badgeColor, flexShrink: 0}">
          <svg v-if="c.type === 'positive'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          <svg v-else-if="c.type === 'negative'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <div style="flex:1;min-width:0;">
          <span class="case-badge" :style="{background: c.badgeBg, color: c.badgeColor}">{{ c.badge }}</span>
          <div class="case-title">{{ c.title }}</div>
          <div class="case-en">{{ c.titleEn }}</div>
          <div class="case-summary">{{ c.summary }}</div>
        </div>
        <svg class="chevron" :class="{ rotated: openId === c._id }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div v-if="openId === c._id" class="case-body">
        <div class="case-section"><h4>背景</h4><p>{{ c.background }}</p></div>
        <div class="case-section"><h4>经过</h4><p>{{ c.details }}</p></div>
        <div class="case-section"><h4>结果</h4><p>{{ c.outcome }}</p></div>
        <div class="case-section">
          <h4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>关键教训</h4>
          <div v-for="(l, i) in c.lessons" :key="i" class="case-lesson">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>{{ l }}</span>
          </div>
        </div>
        <div class="case-section">
          <h4>相关合规要点</h4>
          <div class="case-tags">
            <span v-for="rc in c.relatedCompliance" :key="rc" class="case-tag">{{ rc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '../stores/data.js'

const store = useDataStore()
const openId = ref(null)
const cases = ref([])

onMounted(async () => {
  await store.fetchCases()
  cases.value = store.cases
})

function toggle(id) { openId.value = openId.value === id ? null : id }
</script>
