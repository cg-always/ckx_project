<template>
  <section>
    <!-- Hero -->
    <div class="hero">
      <span class="hero-decoration">🏮</span>
      <h1>英国春节文化活动合规指南</h1>
      <p>本指南由北京外国语大学《英国春节活动法律风险规避手册》研究团队编制，面向在英华人社团及文化活动组织者，提供法律术语查询、合规流程指引、风险评估工具和实务案例参考。</p>
      <div class="hero-buttons">
        <button class="hero-btn hero-btn-primary" @click="$router.push('/checklist')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          开始合规检查
        </button>
        <button class="hero-btn hero-btn-secondary" @click="$router.push('/glossary')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          查术语
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        <div class="stat-value">50+</div>
        <div class="stat-label">组中英法律术语</div>
      </div>
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div class="stat-value">10+</div>
        <div class="stat-label">部英国核心法规</div>
      </div>
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        <div class="stat-value">10</div>
        <div class="stat-label">大风险领域</div>
      </div>
      <div class="stat-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <div class="stat-value">4</div>
        <div class="stat-label">套合规工具</div>
      </div>
    </div>

    <div class="spacer"></div>

    <!-- Feature Navigation -->
    <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;">功能导航</h2>
    <div class="feature-grid">
      <div class="feature-card" style="border-color:#bfdbfe;" @click="$router.push('/glossary')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#1d4ed8">中英术语速查</h3>
        <p>法律术语中英对照，支持关键词检索</p>
      </div>
      <div class="feature-card" style="border-color:#bbf7d0;" @click="$router.push('/checklist')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#15803d">智能检查清单</h3>
        <p>按活动规模与类型生成定制化合规清单</p>
      </div>
      <div class="feature-card" style="border-color:#ddd6fe;" @click="$router.push('/flowchart')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><path d="M6 9v6"/><path d="M9 12h6"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#7c3aed">决策流程图</h3>
        <p>按规模和内容快速确定合规路径</p>
      </div>
      <div class="feature-card" style="border-color:#fde68a;" @click="$router.push('/templates')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10 12 15 17 10"/><path d="M12 15V3"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#b45309">模板下载</h3>
        <p>风险评估表、邮件范本、检查清单</p>
      </div>
      <div class="feature-card" style="border-color:#fecdd3;" @click="$router.push('/cases')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#be123c">案例速览</h3>
        <p>正面经验、反面教训与边界实践</p>
      </div>
      <div class="feature-card" style="border-color:#a5f3fc;" @click="$router.push('/links')">
        <div class="feature-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0e7490" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
        <h3 style="color:#0e7490">官方资源</h3>
        <p>英国政府官方链接与合规指引</p>
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="card quick-tips" style="margin-top:16px;">
      <h2>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        合规要点速记
      </h2>
      <div class="tips-grid">
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>活动前<strong>12周</strong>联系Local Council启动沟通</span></div>
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>食品摊位须提前<strong>28天</strong>注册（免费）</span></div>
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>TENs须提前<strong>10个工作日</strong>提交（£21）</span></div>
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>购买<strong>公众责任保险</strong>是许可核心前提</span></div>
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>SAG审查适用于<strong>2000人以上</strong>活动</span></div>
        <div class="tip-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg><span>合规文件须保存至少<strong>2年</strong></span></div>
      </div>
    </div>
  </section>
</template>
