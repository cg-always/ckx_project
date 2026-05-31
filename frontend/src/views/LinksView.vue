<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        官方资源导航
      </h1>
      <p>英国政府机构官方链接与合规操作指引</p>
    </div>

    <div class="filter-tags">
      <span class="tag" :class="{ active: linkCat === 'all' }" @click="setCat('all')">全部</span>
      <span class="tag" :class="{ active: linkCat === '许可申请' }" @click="setCat('许可申请')">许可申请</span>
      <span class="tag" :class="{ active: linkCat === '安全指导' }" @click="setCat('安全指导')">安全指导</span>
      <span class="tag" :class="{ active: linkCat === '食品卫生' }" @click="setCat('食品卫生')">食品卫生</span>
      <span class="tag" :class="{ active: linkCat === '保险财务' }" @click="setCat('保险财务')">保险财务</span>
      <span class="tag" :class="{ active: linkCat === '特殊活动' }" @click="setCat('特殊活动')">特殊活动</span>
      <span class="tag" :class="{ active: linkCat === '法律法规' }" @click="setCat('法律法规')">法律法规</span>
    </div>

    <a v-for="link in filteredLinks" :key="link._id" :href="link.url" target="_blank" rel="noopener noreferrer" class="link-card">
      <div class="link-icon" :style="{background: link.iconBg, color: link.iconColor}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
      </div>
      <div class="link-body">
        <div class="link-title-row">
          <span class="link-title">{{ link.title }}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        </div>
        <div class="link-url">{{ link.url }}</div>
        <div class="link-desc">{{ link.description }}</div>
        <span class="link-category">{{ link.category }}</span>
      </div>
    </a>

    <div class="alert-box alert-amber">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      <p>英国地方政策更新较快，以上链接截至2026年5月有效。建议在提交申请前再次确认各网站内容是否为最新版本。如有疑问，请直接联系您的Local Council Events Team。</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../stores/data.js'

const store = useDataStore()
const linkCat = ref('all')

onMounted(async () => {
  await store.fetchLinks()
})

const filteredLinks = computed(() => {
  if (linkCat.value === 'all') return store.links
  return store.links.filter(l => l.category === linkCat.value)
})

function setCat(cat) { linkCat.value = cat; store.fetchLinks(cat) }
</script>
