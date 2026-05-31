import 'dotenv/config'
import mongoose from 'mongoose'
import Glossary from '../models/Glossary.js'
import Case from '../models/Case.js'
import Link from '../models/Link.js'
import User from '../models/User.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uk-cny-compliance'

const glossaryData = [
  { en: "Safety Advisory Group (SAG)", cn: "安全咨询小组", definition: "由地方政府牵头、多部门共同参与的大型活动安全协调平台，负责联合审查高风险活动的安全方案。", law: "HSE Guidance", category: "治理机制" },
  { en: "Temporary Event Notice (TENs)", cn: "临时活动通知", definition: "适用于同时在场人数不超过499人、涉及酒精销售、受规管娱乐或深夜餐饮的小型活动简化许可程序。", law: "Licensing Act 2003", category: "许可申请" },
  { en: "Statutory Nuisance", cn: "法定滋扰", definition: "足以危害健康或对社区生活造成不合理干扰的噪音、烟雾、垃圾堆积等，地方当局有义务巡查和处理。", law: "Environmental Protection Act 1990", category: "环境保护" },
  { en: "Public Liability Insurance", cn: "公众责任保险", definition: "承保因活动组织者的疏忽导致第三方人身伤害或财产损失的赔偿责任，是获得活动许可的核心前提。", category: "保险财务" },
  { en: "Employers' Liability Insurance", cn: "雇主责任保险", definition: "法律要求雇主为雇员投保的保险，覆盖因工作导致的人身伤害，最低保额500万英镑。", law: "Employers' Liability (Compulsory Insurance) Act 1969", category: "保险财务" },
  { en: "Risk Assessment", cn: "风险评估", definition: "识别危害、评估风险等级、制定控制措施的系统过程，是英国公共活动合规的核心环节。", law: "Management of Health and Safety at Work Regulations 1999", category: "安全管理" },
  { en: "Event Safety Plan", cn: "活动安全方案", definition: "详细描述活动运行方式、安全责任结构和风险控制措施的核心文件，提交给Council审查。", category: "安全管理" },
  { en: "Site Layout Plan", cn: "场地布局图", definition: "展示活动现场空间结构、设施位置和人员流动安排的图纸，需标明疏散通道和急救点。", category: "安全管理" },
  { en: "Traffic Management Plan", cn: "交通管理方案", definition: "针对活动对周边交通影响的评估和应对措施文件，涉及道路封闭时必须提交。", law: "Road Traffic Regulation Act 1984", category: "交通管理" },
  { en: "Road Closure", cn: "道路封闭", definition: "临时关闭公共道路供活动使用的许可事项，需提前6-8周申请。", category: "交通管理" },
  { en: "Food Business Registration", cn: "食品经营注册", definition: "任何持续性或临时性食品经营均须在活动开始前28天向环境健康部门完成注册，免费。", law: "Food Safety Act 1990", category: "食品卫生" },
  { en: "HACCP", cn: "危害分析关键控制点", definition: "Hazard Analysis and Critical Control Points，食品安全管理系统的国际标准。", category: "食品卫生" },
  { en: "Allergen Information", cn: "过敏原信息", definition: "食品经营者须向消费者提供14种法定过敏原（含坚果、蛋类、麸质等）的信息。", law: "Food Information Regulations 2014", category: "食品卫生" },
  { en: "Noise Management Plan", cn: "噪音管理方案", definition: "针对活动可能产生的噪音影响制定的控制措施文件，大型活动或含音乐表演的活动通常需要。", law: "Environmental Protection Act 1990", category: "环境保护" },
  { en: "Premises Licence", cn: "场所许可", definition: "授权特定场所从事酒精销售、受规管娱乐等许可活动的长期许可。", law: "Licensing Act 2003", category: "许可申请" },
  { en: "RIDDOR", cn: "事故报告条例", definition: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations，要求报告工作相关的伤亡和危险事件。", law: "RIDDOR 2013", category: "安全管理" },
  { en: "Prohibition Notice", cn: "禁止令", definition: "监管部门发现严重安全隐患时发出的立即停止相关活动的命令。", category: "执法" },
  { en: "Council", cn: "地方议会", definition: "英国地方政府的核心行政机构，负责辖区内的公共活动审批与管理。", category: "治理机制" },
  { en: "Environmental Health", cn: "环境卫生部门", definition: "地方Council下设部门，负责食品卫生、噪音控制等环境监管事务。", category: "治理机制" },
  { en: "Dynamic Risk Assessment", cn: "动态风险评估", definition: "活动进行期间根据现场实际情况实时进行的风险评估，适用于环境快速变化的场景。", category: "安全管理" },
  { en: "Consent", cn: "许可", definition: "地方Council就活动在特定地点、特定时间举行的正式授权。", category: "许可申请" },
  { en: "Alcohol Licensing", cn: "酒精许可", definition: "依据Licensing Act 2003，在公共场所销售或供应酒精须事先获得许可。", law: "Licensing Act 2003", category: "许可申请" },
  { en: "VAT", cn: "增值税", definition: "Value Added Tax，英国对商品和服务征收的消费税，标准税率为20%。", category: "保险财务" },
  { en: "Volunteer", cn: "志愿者", definition: "无偿参与活动组织和运营的人员。志愿者的法律地位和保险覆盖需特别关注。", category: "治理机制" },
  { en: "First Aider", cn: "急救人员", definition: "持有有效急救证书的现场人员。大型活动通常要求配备指定数量的持证急救人员。", category: "安全管理" }
]

const casesData = [
  {
    title: "大型华人社团的SAG协调经验", titleEn: "Large Chinese Community Organisation's SAG Coordination",
    type: "positive", badge: "正面案例", badgeBg: "#dcfce7", badgeColor: "#15803d",
    summary: "某大型华人社团通过充分的前期沟通和专业的文件准备，成功获得3,000人规模春节庆典的许可。",
    background: "某大型华人社团在英格兰南部城市策划春节庆典，预计3,000人，含舞龙巡游、舞台表演、食品摊位及灯光秀。",
    details: "活动前6个月主动联系Council Events Team，提交初步方案并说明特殊文化元素。Council启动SAG审查后，针对巡游路线（避开学校）、HACCP计划、8名急救人员等整改意见，两周内完成调整并重新提交。经三轮SAG会议，方案获得各部门认可。",
    outcome: "活动顺利进行，零安全事故，获媒体正面报道，巩固了春节庆典的公共文化地位。次年Council给予更宽松的许可条件。",
    lessons: ["前期沟通充分性是获得许可的关键", "文件准备的专业性直接影响审查效率", "对SAG审查意见的积极响应能建立信任关系", "合规不仅规避风险，还能转化为组织声誉资本"],
    relatedCompliance: ["SAG审查配合", "前期沟通", "文件专业性", "整改响应速度"]
  },
  {
    title: "中型庙会因程序缺失被叫停", titleEn: "Medium-Sized Temple Fair Shut Down Due to Procedural Failures",
    type: "negative", badge: "反面案例", badgeBg: "#fee2e2", badgeColor: "#b91c1c",
    summary: "某华人社团因未注册食品摊位、未申请TENs、未提交噪音方案，活动前3天被强制叫停。",
    background: "某英格兰中部城市华人社团策划春节庙会，预计500人，设有食品摊位、文化展示和小型演出。社团主要由志愿者组成，缺乏法务背景。",
    details: "筹备中出现多项失误：未提前28天完成食品摊位注册；提供酒精饮料但未申请TENs；计划使用扩音设备至22:00但未提交噪音管理方案。活动前3天环境健康部门发现食品未注册，发出禁止令。Licensing Department发现无TENs，认定非法经营。警方介入调查。",
    outcome: "活动被迫取消。地方媒体以\"华人社团违规办活动被叫停\"报道，对社群形象造成负面影响。社团损失已投入的场地押金和宣传费用。",
    lessons: ["程序性合规具有'一票否决'效力", "文化意义不能替代法律合规", "志愿者组织尤其需要专业法务指导", "负面报道损害的不只是一个活动，更是整个社群形象"],
    relatedCompliance: ["食品摊位注册", "TENs申请", "噪音管理方案", "程序性合规优先"]
  },
  {
    title: "舞龙巡游噪音投诉的危机处理", titleEn: "Dragon Parade Noise Complaint Crisis Management",
    type: "boundary", badge: "边界案例", badgeBg: "#fef3c7", badgeColor: "#b45309",
    summary: "某城市春节舞龙巡游遭遇居民噪音投诉，现场团队通过快速反应和及时调整成功化解危机。",
    background: "某英格兰北方城市举办春节舞龙巡游，巡游路线穿越市中心主要街道。活动中沿途居民投诉锣鼓声过大。",
    details: "现场负责人立即启动四步处理：1)详细记录投诉内容（时间、地点、诉求）；2)调整巡游路线，避开投诉集中区域，与警方协商临时改道；3)锣鼓表演改为间歇式，降低音量；4)活动结束当天向Council提交书面说明。",
    outcome: "投诉未升级为法定滋扰调查，Council对危机处理能力给予正面评价。次年活动获得更宽松的许可条件，Council主动协助与居民沟通。",
    lessons: ["现场记录（Incident Logging）是危机处理的第一步", "及时调整比坚持原计划更重要", "与Council的主动沟通能将危机转化为信任", "建立完善的现场记录制度和培训工作人员至关重要"],
    relatedCompliance: ["现场记录制度", "危机沟通", "噪音控制", "社区关系维护"]
  }
]

const linksData = [
  { title: "Find Your Local Council", url: "https://www.gov.uk/find-local-council", description: "输入邮编即可查询活动所在地的地方政府，获取当地活动管理指南", category: "许可申请", iconBg: "var(--color-blue-bg)", iconColor: "var(--color-blue)" },
  { title: "Temporary Event Notice (TENs)", url: "https://www.gov.uk/temporary-events-notice", description: "TENs临时活动通知在线申请页面，适用于小型活动（不超过499人）", category: "许可申请", iconBg: "var(--color-blue-bg)", iconColor: "var(--color-blue)" },
  { title: "Food Business Registration", url: "https://www.gov.uk/food-business-registration", description: "食品经营注册页面，免费，须提前28天完成", category: "许可申请", iconBg: "var(--color-blue-bg)", iconColor: "var(--color-blue)" },
  { title: "HSE Event Safety Guidance", url: "https://www.hse.gov.uk/event-safety", description: "HSE公共活动安全综合指导，包含风险评估模板和安全方案范例", category: "安全指导", iconBg: "var(--color-green-bg)", iconColor: "var(--color-green)" },
  { title: "SAG Safety Advisory Groups", url: "https://www.hse.gov.uk/event-safety/safety-advisory-groups.htm", description: "SAG安全咨询小组指导文件，解释SAG审查流程和各方职责", category: "安全指导", iconBg: "var(--color-green-bg)", iconColor: "var(--color-green)" },
  { title: "5-Step Risk Assessment", url: "https://www.hse.gov.uk/simple-health-safety/risk/index.htm", description: "HSE五步风险评估法指南，带交互式评估工具", category: "安全指导", iconBg: "var(--color-green-bg)", iconColor: "var(--color-green)" },
  { title: "Food Standards Agency", url: "https://www.food.gov.uk", description: "英国食品标准局官网，提供食品安全法规和指导文件", category: "食品卫生", iconBg: "#fff7ed", iconColor: "#c2410c" },
  { title: "Food Allergen Rules", url: "https://www.gov.uk/food-preparation-allergy-rules", description: "食品过敏原法规指导，14种法定过敏原清单和标识要求", category: "食品卫生", iconBg: "#fff7ed", iconColor: "#c2410c" },
  { title: "HMRC", url: "https://www.gov.uk/government/organisations/hm-revenue-customs", description: "英国税务海关总署，VAT和税务相关问题查询", category: "保险财务", iconBg: "var(--color-purple-bg)", iconColor: "var(--color-purple)" },
  { title: "Firework Regulations", url: "https://www.gov.uk/fireworks-the-law", description: "烟花爆竹法规，包括燃放时间限制和销售规定", category: "特殊活动", iconBg: "var(--color-amber-bg)", iconColor: "var(--color-amber)" },
  { title: "Public Order Act Guidance", url: "https://www.gov.uk/government/publications/guidance-on-hosting-public-events", description: "英国内政部公共活动举办指导，涉及公共秩序管理", category: "法律法规", iconBg: "#f5f5f4", iconColor: "#44403c" },
  { title: "Equality Act 2010", url: "https://www.legislation.gov.uk/ukpga/2010/15", description: "2010年平等法案全文，公共活动反歧视法律依据", category: "法律法规", iconBg: "#f5f5f4", iconColor: "#44403c" }
]

async function seed() {
  try {
    console.log('[Seed] Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)

    // Clear existing data
    await Promise.all([
      Glossary.deleteMany({}),
      Case.deleteMany({}),
      Link.deleteMany({})
    ])
    console.log('[Seed] Cleared existing data')

    // Insert seed data
    await Glossary.insertMany(glossaryData)
    console.log(`[Seed] Inserted ${glossaryData.length} glossary terms`)

    await Case.insertMany(casesData)
    console.log(`[Seed] Inserted ${casesData.length} cases`)

    await Link.insertMany(linksData)
    console.log(`[Seed] Inserted ${linksData.length} links`)

    // Create admin user (password: admin123)
    const exists = await User.findOne({ email: 'admin@example.com' })
    if (!exists) {
      await User.create({ username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' })
      console.log('[Seed] Created admin user (admin@example.com / admin123)')
    }

    console.log('[Seed] ✅ Done!')
  } catch (err) {
    console.error('[Seed] Error:', err.message)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
