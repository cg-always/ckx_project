<template>
  <section>
    <!-- Config Panel -->
    <div v-if="!checklistGenerated">
      <div class="page-header">
        <h1>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          智能检查清单
        </h1>
        <p>根据活动规模与内容自动生成定制化合规任务清单</p>
      </div>
      <div class="card" style="max-width:600px;margin:0 auto;">
        <div class="selection-group">
          <label>1. 活动规模</label>
          <div class="selection-grid">
            <button class="selection-btn" :class="{ selected: config.scale === 'small' }" @click="config.scale = 'small'">
              <span class="selection-btn-label">小型</span>
              <span class="selection-btn-desc">少于50人</span>
            </button>
            <button class="selection-btn" :class="{ selected: config.scale === 'medium' }" @click="config.scale = 'medium'">
              <span class="selection-btn-label">中型</span>
              <span class="selection-btn-desc">50-500人</span>
            </button>
            <button class="selection-btn" :class="{ selected: config.scale === 'large' }" @click="config.scale = 'large'">
              <span class="selection-btn-label">大型</span>
              <span class="selection-btn-desc">超过500人</span>
            </button>
          </div>
        </div>
        <div class="selection-group">
          <label>2. 活动包含的元素（可多选）</label>
          <div class="selection-grid selection-grid-2">
            <button class="selection-btn" :class="{ selected: config.types.includes('food') }" @click="toggleType('food')">
              <span class="selection-btn-label">食品摊位</span>
            </button>
            <button class="selection-btn" :class="{ selected: config.types.includes('alcohol') }" @click="toggleType('alcohol')">
              <span class="selection-btn-label">酒精销售</span>
            </button>
            <button class="selection-btn" :class="{ selected: config.types.includes('fireworks') }" @click="toggleType('fireworks')">
              <span class="selection-btn-label">烟花爆竹</span>
            </button>
            <button class="selection-btn" :class="{ selected: config.types.includes('road') }" @click="toggleType('road')">
              <span class="selection-btn-label">道路封闭/巡游</span>
            </button>
          </div>
        </div>
        <button class="btn-submit" @click="generate">生成检查清单</button>
      </div>
    </div>

    <!-- Checklist View -->
    <div v-else>
      <div class="toolbar">
        <h1>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          活动检查清单
        </h1>
        <div class="toolbar-btns">
          <button class="btn-sm btn-outline" @click="resetAll">重置</button>
          <button class="btn-sm btn-outline" @click="checklistGenerated = false">重新配置</button>
          <button v-if="auth.isLoggedIn" class="btn-sm btn-primary" @click="saveChecklist">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
            保存到云端
          </button>
        </div>
      </div>

      <!-- Progress -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:14px;font-weight:600;color:var(--color-text-secondary);">完成进度</span>
          <span style="font-size:14px;font-weight:700;color:var(--color-primary);">{{ progressPct }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <p style="font-size:12px;color:var(--color-text-muted);margin-top:6px;">{{ doneCount }} / {{ tasks.length }} 项已完成</p>
      </div>

      <!-- Phases -->
      <div v-for="phase in phases" :key="phase.key" class="card-flat phase-section">
        <div class="phase-header">
          <div><span class="phase-title">{{ phase.label }}</span><span class="phase-desc">{{ phase.desc }}</span></div>
          <span class="phase-count">{{ phaseDone(phase.key) }}/{{ phaseTotal(phase.key) }}</span>
        </div>
        <label v-for="task in phaseTasks(phase.key)" :key="task.id" class="task-item" @click="task.done = !task.done">
          <input type="checkbox" class="hidden-checkbox" :checked="task.done" @click.stop="task.done = !task.done" tabindex="-1" />
          <span class="custom-checkbox" :class="{ checked: task.done, done: task.done }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
          <span class="task-text" :class="{ 'task-done': task.done }">{{ task.text }}</span>
        </label>
      </div>

      <p v-if="saveMsg" class="form-success" style="margin-top:12px;">{{ saveMsg }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { checklistsAPI } from '../api/index.js'

const auth = useAuthStore()
const checklistGenerated = ref(false)
const saveMsg = ref('')
const config = reactive({ scale: 'medium', types: [] })
const tasks = ref([])

const phases = [
  { key: 'pre12', label: '12周前', desc: '启动筹备' },
  { key: 'pre8', label: '8-12周', desc: '申请许可' },
  { key: 'pre4', label: '4-8周', desc: '审查整改' },
  { key: 'pre1', label: '1-4周', desc: '最终准备' },
  { key: 'day', label: '活动当天', desc: '现场执行' },
  { key: 'post', label: '活动后', desc: '归档总结' }
]

const doneCount = computed(() => tasks.value.filter(t => t.done).length)
const progressPct = computed(() => tasks.value.length > 0 ? Math.round(doneCount.value / tasks.value.length * 100) : 0)

function phaseTasks(key) { return tasks.value.filter(t => t.phase === key) }
function phaseDone(key) { return tasks.value.filter(t => t.phase === key && t.done).length }
function phaseTotal(key) { return tasks.value.filter(t => t.phase === key).length }

function toggleType(type) {
  const idx = config.types.indexOf(type)
  if (idx >= 0) config.types.splice(idx, 1)
  else config.types.push(type)
}

function generate() {
  const { scale, types } = config
  const isSmall = scale === 'small'
  const isLarge = scale === 'large'
  const result = []

  result.push({ id: 't1', text: '确定活动属地的Local Council（gov.uk/find-local-council）', done: false, phase: 'pre12' })
  result.push({ id: 't2', text: '查阅Council网站的活动管理指南和许可要求', done: false, phase: 'pre12' })
  result.push({ id: 't3', text: isLarge ? '联系Council Events Team表达举办意向，请求前期沟通会议' : '（推荐）联系Council Events Team进行前期沟通', done: false, phase: 'pre12' })
  if (types.includes('road')) result.push({ id: 't4', text: '提交道路封闭许可申请（须提前6-8周）', done: false, phase: 'pre8' })
  if (types.includes('food')) result.push({ id: 't5', text: '完成食品摊位注册（须提前28天，免费）', done: false, phase: 'pre8' })
  if (types.includes('alcohol')) {
    result.push({ id: 't6', text: isSmall ? '提交TENs临时活动通知（须提前10个工作日，21英镑）' : '申请完整场所许可/Premises Licence（大型活动不适用TENs）', done: false, phase: 'pre8' })
  }
  result.push({ id: 't7', text: '编制活动安全方案（Event Safety Plan）', done: false, phase: 'pre8' })
  result.push({ id: 't8', text: '完成风险评估报告（Risk Assessment）', done: false, phase: 'pre8' })
  if (!isSmall) result.push({ id: 't9', text: '绘制场地布局图（Site Layout Plan）', done: false, phase: 'pre8' })
  if (types.includes('road')) result.push({ id: 't10', text: '编制交通管理方案（Traffic Management Plan）', done: false, phase: 'pre8' })
  if (isLarge) {
    result.push({ id: 't11', text: '参加SAG首次协调会议', done: false, phase: 'pre4' })
    result.push({ id: 't12', text: '根据SAG审查意见整改并重新提交文件', done: false, phase: 'pre4' })
  }
  result.push({ id: 't13', text: '购买公众责任保险（Public Liability Insurance）', done: false, phase: 'pre4' })
  if (types.includes('fireworks')) result.push({ id: 't14', text: '提交烟花燃放许可申请，协调消防部门审查', done: false, phase: 'pre4' })
  if (types.includes('food')) result.push({ id: 't15', text: '制定HACCP计划和过敏原标识方案', done: false, phase: 'pre4' })
  result.push({ id: 't16', text: '确认急救人员数量和资质', done: false, phase: 'pre4' })
  result.push({ id: 't17', text: '与所有关键供应商确认安排（场地、设备、安保）', done: false, phase: 'pre1' })
  result.push({ id: 't18', text: '志愿者培训（安全职责、应急流程、现场记录）', done: false, phase: 'pre1' })
  result.push({ id: 't19', text: '准备现场检查清单（Event Day Checklist）', done: false, phase: 'pre1' })
  result.push({ id: 't20', text: '确认与Council和警方的最终沟通渠道', done: false, phase: 'pre1' })
  result.push({ id: 't21', text: '活动前2小时：检查消防设施、疏散通道、临时设施', done: false, phase: 'day' })
  result.push({ id: 't22', text: '活动前1小时：确认食品摊位注册证明、噪音控制设备就位', done: false, phase: 'day' })
  if (types.includes('food')) result.push({ id: 't23', text: '活动期间：每30分钟检查食品卫生状况', done: false, phase: 'day' })
  result.push({ id: 't24', text: '活动期间：持续监测人群密度，确保紧急通道畅通', done: false, phase: 'day' })
  result.push({ id: 't25', text: '活动期间：记录所有异常事件、投诉和事故', done: false, phase: 'day' })
  result.push({ id: 't26', text: '清理现场，恢复场地，避免环境滋扰投诉', done: false, phase: 'post' })
  result.push({ id: 't27', text: '24小时内向Council提交活动总结报告', done: false, phase: 'post' })
  result.push({ id: 't28', text: '如有RIDDOR规定的事故，按规定时限报告HSE', done: false, phase: 'post' })
  result.push({ id: 't29', text: '保存所有文件（TENs、风险评估、保险证书、SAG纪要等）至少2年', done: false, phase: 'post' })

  tasks.value = result
  checklistGenerated.value = true
}

function resetAll() {
  tasks.value.forEach(t => t.done = false)
}

async function saveChecklist() {
  try {
    saveMsg.value = '保存中...'
    await checklistsAPI.create({
      name: '活动检查清单',
      scale: config.scale,
      types: config.types,
      tasks: tasks.value
    })
    saveMsg.value = '✅ 已保存到云端！'
    setTimeout(() => saveMsg.value = '', 3000)
  } catch {
    saveMsg.value = '保存失败，请检查网络连接'
  }
}
</script>
