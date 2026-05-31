<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        中英法律术语速查词典
      </h1>
      <p>收录25组英国公共活动治理核心术语，支持中英文关键词检索</p>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" v-model="search" placeholder="搜索英文术语、中文翻译或定义..." @input="doSearch" />
      </div>
      <div class="filter-tags">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        <span class="tag" :class="{ active: category === 'all' }" @click="setCategory('all')">全部</span>
        <span class="tag" :class="{ active: category === '治理机制' }" @click="setCategory('治理机制')">治理机制</span>
        <span class="tag" :class="{ active: category === '许可申请' }" @click="setCategory('许可申请')">许可申请</span>
        <span class="tag" :class="{ active: category === '安全管理' }" @click="setCategory('安全管理')">安全管理</span>
        <span class="tag" :class="{ active: category === '食品卫生' }" @click="setCategory('食品卫生')">食品卫生</span>
        <span class="tag" :class="{ active: category === '环境保护' }" @click="setCategory('环境保护')">环境保护</span>
        <span class="tag" :class="{ active: category === '交通管理' }" @click="setCategory('交通管理')">交通管理</span>
        <span class="tag" :class="{ active: category === '保险财务' }" @click="setCategory('保险财务')">保险财务</span>
        <span class="tag" :class="{ active: category === '执法' }" @click="setCategory('执法')">执法</span>
      </div>
    </div>

    <div v-if="loading" class="empty-state"><p>加载中...</p></div>
    <div v-else-if="filtered.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <p>未找到匹配术语，请尝试其他关键词</p>
    </div>
    <div v-else>
      <div v-for="item in filtered" :key="item._id" class="glossary-item">
        <div class="glossary-header">
          <h3>{{ item.en }}</h3>
          <span class="sep">|</span>
          <span class="cn">{{ item.cn }}</span>
          <span class="glossary-category">{{ item.category }}</span>
        </div>
        <p class="glossary-def">{{ item.definition }}</p>
        <p v-if="item.law" class="glossary-law">相关法律：{{ item.law }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../stores/data.js'

const store = useDataStore()
const search = ref('')
const category = ref('all')

onMounted(async () => {
  await store.checkApi()
  await store.fetchGlossary()
})

const filtered = computed(() => {
  let items = store.glossary
  if (category.value !== 'all') {
    items = items.filter(i => i.category === category.value)
  }
  if (search.value) {
    const s = search.value.toLowerCase()
    items = items.filter(i =>
      i.en.toLowerCase().includes(s) ||
      i.cn.includes(s) ||
      i.definition.includes(s)
    )
  }
  return items
})

function setCategory(cat) {
  category.value = cat
}

function doSearch() {
  // computed already handles filtering
}
</script>
