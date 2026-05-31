import { Router } from 'express'

const router = Router()

const templates = {
  risk: `春节活动风险评估表 (Risk Assessment Template)
=====================================
活动名称：________________  日期：________________  地点：________________
预计人数：________________  评估人：________________

危害1：人群拥挤/踩踏（舞龙巡游、高密度聚集）
- 影响人群：□参与者 □工作人员 □儿童/老人
- 控制措施：_________________________________
- 负责人：__________ 完成时间：__________

危害2：烟花爆竹（火灾、烧伤、噪音）
- 影响人群：□参与者 □周边居民
- 控制措施：_________________________________
- 负责人：__________ 完成时间：__________

危害3：食品安全（未注册、交叉污染、过敏原）
- 影响人群：□参与者 □过敏体质者
- 控制措施：_________________________________
- 负责人：__________ 完成时间：__________

危害4：临时设施安全（舞台/帐篷倒塌、电气故障）
- 影响人群：□参与者 □演职人员
- 控制措施：_________________________________
- 负责人：__________ 完成时间：__________

危害5：噪音滋扰（锣鼓、扩音设备）
- 影响人群：□周边居民 □商户
- 控制措施：_________________________________
- 负责人：__________ 完成时间：__________

评估人签字：________________ 日期：________________`,

  email: `与地方Council沟通邮件范本（中英文对照）
=====================================

【首次联系信 / Initial Contact】

Dear Events Team,

I am writing on behalf of [Organization Name] to express our interest
in organizing a Chinese New Year celebration in [Location] on [Date].
We are a community organization serving the local Chinese community.
Our proposed event would include [dragon dance, food stalls, stage
performances], with an estimated attendance of [number] people.

Could we arrange an initial meeting?

Yours sincerely,
[Name] [Organization] [Contact]

---
致Events Team：

我谨代表[组织名称]，致函表达我方希望在[地点]于[日期]举办
春节庆祝活动的意向。我们是服务当地华人社区的[社区组织/志愿者团体]，
拟议活动将包括[舞龙巡游、食品摊位、舞台表演]，预计参与人数约[数字]人。

是否可以安排一次初步会议？

此致敬礼
[姓名] [组织名称] [联系方式]

=====================================

【正式申请函 / Formal Application】

Dear [Council Events Team],

Please find enclosed the complete documentation package for our
Chinese New Year event application:

1. Event Safety Plan
2. Risk Assessment Report
3. Site Layout Plan
4. Traffic Management Plan
5. Public Liability Insurance Certificate
6. TENs application (if applicable)
7. Food business registration (if applicable)

We are happy to discuss any aspects and make necessary adjustments.

Yours sincerely,
[Name] [Organization] [Date]`,

  checklist: `现场检查清单 (Event Day Checklist)
=====================================
活动名称：________________ 日期：________________
现场负责人：________________ 联系电话：________________

【活动前2小时】
□ 所有关键人员到场并确认通讯方式
□ 消防设施检查（灭火器位置、数量、有效期）
□ 疏散通道检查（所有出口畅通、标识清晰）
□ 临时设施检查（舞台/帐篷/摊位稳固）
□ 电力系统检查（接地良好、线路无裸露）
□ 急救站检查（急救箱、AED设备）

【活动前1小时】
□ 食品摊位注册证明已张贴
□ 食品操作区域确认（生熟分离、清洁设施）
□ 噪音控制设备就位
□ 与现场警方/安保确认通讯频道
□ 失踪儿童集合点标识确认

【活动期间（每30分钟巡视）】
□ 人群密度监测
□ 紧急通道保持畅通
□ 现场情况记录（异常、投诉、事故）
□ 食品卫生持续监督
□ 噪音水平监测

【活动结束后】
□ 有序疏散人群
□ 清理现场、垃圾清运
□ 场地安全检查（无遗留物品）
□ 24小时内向Council提交总结报告

现场负责人签字：________________`
}

// GET /api/templates — public
router.get('/', (req, res) => {
  const list = [
    { id: 'risk', title: '春节活动风险评估表', titleEn: 'Risk Assessment Template', desc: '基于HSE五步法的标准化风险评估表，含春节特有场景' },
    { id: 'email', title: 'Council沟通邮件范本', titleEn: 'Council Communication Templates', desc: '首次联系信和正式申请函的中英文对照范本' },
    { id: 'checklist', title: '现场检查清单', titleEn: 'Event Day Checklist', desc: '一页纸可打印格式，活动当天逐项勾选' }
  ]
  res.json({ data: list })
})

// GET /api/templates/:id — public
router.get('/:id', (req, res) => {
  const content = templates[req.params.id]
  if (!content) return res.status(404).json({ error: '模板未找到' })
  res.json({ id: req.params.id, content })
})

export default router
