<template>
  <section>
    <div class="page-header">
      <h1>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><path d="M6 9v6"/><path d="M9 12h6"/></svg>
        合规决策流程图
      </h1>
      <p>回答两个问题，快速确定活动所需的许可与文件</p>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <span class="step-circle">1</span>
        <span class="step-title">选择活动规模</span>
      </div>
      <div class="selection-grid">
        <button class="selection-btn" :class="{ selected: flowScale === 'small' }" @click="setScale('small')">
          <span class="selection-btn-label">小型</span>
          <span class="selection-btn-desc">少于50人</span>
          <span class="selection-btn-desc">社区聚会</span>
        </button>
        <button class="selection-btn" :class="{ selected: flowScale === 'medium' }" @click="setScale('medium')">
          <span class="selection-btn-label">中型</span>
          <span class="selection-btn-desc">50-500人</span>
          <span class="selection-btn-desc">庙会/演出</span>
        </button>
        <button class="selection-btn" :class="{ selected: flowScale === 'large' }" @click="setScale('large')">
          <span class="selection-btn-label">大型</span>
          <span class="selection-btn-desc">超过500人</span>
          <span class="selection-btn-desc">广场庆典</span>
        </button>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <span class="step-circle">2</span>
        <span class="step-title">选择活动包含的元素（可多选）</span>
      </div>
      <div class="selection-grid">
        <button class="selection-btn" :class="{ selected: flowElements.includes('food') }" @click="toggleEl('food')">
          <span class="selection-btn-label">食品摊位</span>
        </button>
        <button class="selection-btn" :class="{ selected: flowElements.includes('alcohol') }" @click="toggleEl('alcohol')">
          <span class="selection-btn-label">酒精销售</span>
        </button>
        <button class="selection-btn" :class="{ selected: flowElements.includes('fireworks') }" @click="toggleEl('fireworks')">
          <span class="selection-btn-label">烟花爆竹</span>
        </button>
        <button class="selection-btn" :class="{ selected: flowElements.includes('road') }" @click="toggleEl('road')">
          <span class="selection-btn-label">道路封闭/巡游</span>
        </button>
      </div>
    </div>

    <!-- Result -->
    <div v-if="flowScale">
      <div class="card-flat result-section">
        <div class="result-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          您的合规清单
        </div>
        <div class="result-body">
          <div v-for="(r, i) in results" :key="i" class="result-item" :class="r.urgent ? 'urgent' : 'normal'">
            <svg v-if="r.urgent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>{{ r.text }}<span v-if="r.urgent" class="badge badge-urgent">必须</span></span>
          </div>
        </div>
      </div>

      <div class="alert-box alert-amber" style="margin-top:16px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div>
          <strong>建议时间线</strong>
          <div class="timeline-bar" style="margin-top:8px;">
            <span class="timeline-item">12周前：启动</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="timeline-item">8周前：申请</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="timeline-item">4周前：审查</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="timeline-item">活动日：执行</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span class="timeline-item">结束后：归档</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const flowScale = ref(null)
const flowElements = ref([])

function setScale(s) { flowScale.value = s }
function toggleEl(el) {
  const idx = flowElements.value.indexOf(el)
  if (idx >= 0) flowElements.value.splice(idx, 1)
  else flowElements.value.push(el)
}

const results = computed(() => {
  if (!flowScale.value) return []
  const r = []
  const s = flowScale.value

  if (s === 'small') {
    r.push({ text: '适用TENs简化程序（如涉及酒精/深夜餐饮，不超过499人）', urgent: false })
    r.push({ text: '公众责任保险：建议保额200万至500万英镑', urgent: true })
    r.push({ text: '如不提供酒精/深夜餐饮，可能无需正式许可', urgent: false })
  } else if (s === 'medium') {
    r.push({ text: '需向Council提交正式活动许可申请（不适用TENs）', urgent: true })
    r.push({ text: '公众责任保险：建议保额500万至1,000万英镑', urgent: true })
    r.push({ text: '须提交完整活动安全方案与风险评估报告', urgent: true })
    r.push({ text: '建议聘请专业安全人员', urgent: false })
    r.push({ text: '场地布局图与交通管理方案', urgent: false })
  } else {
    r.push({ text: '必须进入SAG安全审查程序', urgent: true })
    r.push({ text: '公众责任保险：须1,000万英镑以上', urgent: true })
    r.push({ text: '提交完整文件包：安全方案、风险评估、场地布局、交通管理', urgent: true })
    r.push({ text: '必须聘请专业安全团队', urgent: true })
    r.push({ text: '多轮SAG协调会议（活动前4-8周启动）', urgent: true })
  }

  if (flowElements.value.includes('food')) {
    r.push({ text: '食品摊位注册（提前28天，免费）', urgent: true })
    r.push({ text: 'HACCP计划与过敏原标识', urgent: true })
  }
  if (flowElements.value.includes('alcohol')) {
    r.push({ text: s === 'small' ? 'TENs申请（提前10个工作日，21英镑）' : '申请完整场所许可/Premises Licence（大型活动不适用TENs）', urgent: true })
  }
  if (flowElements.value.includes('fireworks')) {
    r.push({ text: '烟花燃放许可与消防部门审查', urgent: true })
    r.push({ text: '安全距离规划与观众隔离措施', urgent: true })
  }
  if (flowElements.value.includes('road')) {
    r.push({ text: '道路封闭许可（提前6-8周）', urgent: true })
    r.push({ text: '交通管理方案与警方协调', urgent: true })
  }
  r.push({ text: '急救人员确认与现场记录制度建立', urgent: false })
  r.push({ text: '活动后文件保存至少2年', urgent: false })

  return r
})
</script>
