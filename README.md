# 英国春节文化活动合规指南 — 全栈 Web 应用

> UK Chinese New Year Cultural Activity Compliance Guide — Full-Stack Web Application

基于北京外国语大学《英国春节活动法律风险规避手册》研究项目，面向在英华人社团及文化活动组织者，提供法律术语查询、合规流程指引、风险评估工具和实务案例参考的全栈 Web 平台。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | Vue 3 (Composition API) + Vite + Vue Router + Pinia + Axios |
| **后端** | Node.js + Express + MongoDB + Mongoose + JWT |
| **部署** | GitHub Pages (前端) + Railway/Render (后端) |

---

## 项目结构

```
pro/
├── frontend/                # Vue 3 前端应用
│   ├── public/
│   ├── src/
│   │   ├── api/             # Axios 封装 + API 模块
│   │   ├── assets/          # 全局样式
│   │   ├── composables/     # 组合式函数 (暗色模式等)
│   │   ├── data/            # 静态降级数据
│   │   ├── router/          # Vue Router 路由配置
│   │   ├── stores/          # Pinia 状态管理
│   │   ├── views/           # 10 个页面视图
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                 # Express + MongoDB 后端 API
│   ├── src/
│   │   ├── config/          # 数据库连接
│   │   ├── middleware/      # JWT认证、错误处理
│   │   ├── models/          # Mongoose 模型 (6个)
│   │   ├── routes/          # API 路由 (8组)
│   │   ├── seed/            # 数据库种子数据
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 功能特性

### 前端页面 (10 个)

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 仪表盘、统计、功能导航、合规速记 |
| `/glossary` | 术语速查 | 25 组中英法律术语，支持搜索+分类筛选 |
| `/checklist` | 检查清单 | 按活动规模/类型生成定制化合规清单，支持云端保存 |
| `/flowchart` | 决策流程 | 选规模+元素，自动生成合规许可路径 |
| `/templates` | 模板下载 | 风险评估表、邮件范本、现场检查清单下载 |
| `/cases` | 案例速览 | 正面/反面/边界三类案例深度分析 |
| `/links` | 官方资源 | 12 条英国政府官方链接，分类筛选 |
| `/login` | 登录注册 | JWT 认证 |
| `/dashboard` | 用户仪表盘 | 已保存清单管理、意见反馈表单 |
| `/admin` | 管理后台 | 数据统计、反馈管理、用户管理 |

### 后端 API (8 组路由)

- `POST /api/auth/register` — 用户注册
- `POST /api/auth/login` — 用户登录 (JWT)
- `GET /api/glossary` — 术语查询 (搜索+分类)
- `GET/POST/PUT/DELETE /api/cases` — 案例 CRUD
- `GET/POST/PUT/DELETE /api/links` — 链接 CRUD
- `GET /api/templates` — 模板列表及内容
- `POST /api/feedback` — 提交反馈
- `GET/POST/PUT/DELETE /api/checklists` — 用户清单 CRUD
- `GET /api/admin/stats` — 管理统计数据

### 扩展功能 (相比静态网站新增)

- ✅ JWT 用户认证系统（注册/登录）
- ✅ 检查清单云端保存与同步
- ✅ 用户意见反馈表单
- ✅ 管理后台面板
- ✅ 暗色模式支持
- ✅ API 不可用时自动降级到静态数据
- ✅ 响应式设计（移动端适配）

---

## 本地开发启动

### 前置要求

- **Node.js** >= 18.x
- **MongoDB** >= 6.x（本地安装或使用 [MongoDB Atlas](https://www.mongodb.com/atlas) 免费集群）

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd pro
```

### 2. 启动后端

```bash
cd backend

# 安装依赖
npm install

# 配置环境变量 (Windows PowerShell 或直接编辑 .env 文件)
cp .env.example .env
# 编辑 .env，设置你的 MONGODB_URI 和 JWT_SECRET

# 导入种子数据（术语、案例、链接 + 创建管理员账号）
npm run seed
# 管理员账号: admin@example.com / admin123

# 启动开发服务器 (端口 3000, 支持热重载)
npm run dev
```

### 3. 启动前端

```bash
# 新开一个终端
cd frontend

# 安装依赖
npm install

# 启动 Vite 开发服务器 (端口 5173)
npm run dev
```

### 4. 访问

- 前端：http://localhost:5173
- 后端 API：http://localhost:3000/api
- 健康检查：http://localhost:3000/api/health

---

## GitHub Pages 部署

### 前端部署

GitHub Pages 仅托管静态前端，后端需另外部署（见下一节）。

```bash
cd frontend

# 1. 修改 vite.config.js 中的 base 为你的 GitHub Pages 路径
#    例如: base: '/uk-cny-compliance-guide/'
#    如果是用户主页: base: '/'

# 2. 修改 .env 中的 API 地址为你的云端后端地址
#    VITE_API_BASE_URL=https://your-backend.onrender.com/api

# 3. 构建
npm run build

# 4. 部署到 GitHub Pages
npm run deploy
# 或手动: 将 dist/ 目录推送到 gh-pages 分支
```

### 手动部署步骤 (GitHub Actions 方式)

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Frontend to GitHub Pages
on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: frontend/dist
```

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加 secret：
- `VITE_API_BASE_URL`: 你的后端 API 地址

---

## 后端云部署

### Railway 部署

1. 访问 [railway.app](https://railway.app) 并登录
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 选择你的仓库
4. 设置 Root Directory 为 `backend`
5. 添加环境变量：
   - `MONGODB_URI` = 你的 MongoDB Atlas 连接字符串
   - `JWT_SECRET` = 一个随机密钥
   - `CORS_ORIGIN` = 你的 GitHub Pages 域名
   - `NODE_ENV` = production
6. 部署完成后，Railway 会提供一个 URL（如 `https://xxx.up.railway.app`）
7. 在 MongoDB Atlas 中运行 `npm run seed` 或手动导入数据
8. 将 Railway URL 设为前端的 `VITE_API_BASE_URL`

### Render 部署

1. 访问 [render.com](https://render.com) 并登录
2. 点击 **New** → **Web Service**
3. 连接你的 GitHub 仓库
4. 设置：
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. 添加环境变量（同 Railway）
6. 部署完成后获得 Render URL

### MongoDB Atlas (免费数据库)

1. 访问 [mongodb.com/atlas](https://www.mongodb.com/atlas) 注册
2. 创建免费 M0 集群
3. 在 Database Access 中创建数据库用户
4. 在 Network Access 中添加 `0.0.0.0/0`（允许所有 IP）
5. 点击 Connect → Drivers → 复制连接字符串
6. 替换 `<password>` 为你的数据库用户密码
7. 将完整连接字符串设为 `MONGODB_URI` 环境变量

---

## 环境变量参考

### 后端 (backend/.env)

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务器端口 | `3000` |
| `MONGODB_URI` | MongoDB 连接字符串 | `mongodb://localhost:27017/uk-cny-compliance` |
| `JWT_SECRET` | JWT 签名密钥 | (需要设置) |
| `CORS_ORIGIN` | 允许的前端域名 | `http://localhost:5173` |
| `NODE_ENV` | 运行环境 | `development` |

### 前端 (frontend/.env)

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_API_BASE_URL` | 后端 API 地址 | `http://localhost:3000/api` |

> 注意：Vite 环境变量必须以 `VITE_` 开头，且在构建时注入。修改后需重新构建。

---

## API 文档

### 公共接口 (无需认证)

```bash
# 健康检查
GET /api/health

# 术语查询 (支持 ?search=关键词&category=分类)
GET /api/glossary
GET /api/glossary/:id

# 案例列表
GET /api/cases
GET /api/cases/:id

# 资源链接 (支持 ?category=分类)
GET /api/links

# 模板
GET /api/templates
GET /api/templates/:id

# 提交反馈
POST /api/feedback
Body: { "name": "...", "email": "...", "subject": "...", "message": "..." }
```

### 认证接口

```bash
# 注册
POST /api/auth/register
Body: { "username": "...", "email": "...", "password": "..." }

# 登录 (返回 JWT token)
POST /api/auth/login
Body: { "email": "...", "password": "..." }

# 获取当前用户 (需 Bearer Token)
GET /api/auth/me
```

### 需要认证的接口

```bash
# 用户检查清单
GET /api/checklists
POST /api/checklists
PUT /api/checklists/:id
DELETE /api/checklists/:id

# 请求头: Authorization: Bearer <token>
```

### 管理员接口 (需 admin 角色)

```bash
# 统计数据
GET /api/admin/stats
GET /api/admin/users
GET /api/feedback

# CRUD 操作
POST/PUT/DELETE /api/glossary/:id
POST/PUT/DELETE /api/cases/:id
POST/PUT/DELETE /api/links/:id
```

---

## 默认管理员账号

运行 `npm run seed` 后自动创建：

- **邮箱**: `admin@example.com`
- **密码**: `admin123`

> ⚠️ 生产环境请务必修改默认密码！

---

## 数据降级策略

前端内置了与后端数据一致的静态数据集。当后端 API 不可用时（网络断开、后端未部署等），前端自动使用静态数据渲染，确保核心功能始终可用：

- 术语速查 / 案例速览 / 官方资源 / 模板下载 → 始终可用
- 检查清单 → 本地生成可用，云端保存需后端
- 登录注册 / 仪表盘 / 管理后台 → 需后端

---

## 开发说明

### 添加新术语/案例/链接

**通过 API（推荐）：**

```bash
# 需要管理员 token
curl -X POST http://localhost:3000/api/glossary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{"en":"Example Term","cn":"示例术语","definition":"这是一个示例定义。","category":"安全管理"}'
```

**通过种子脚本：** 编辑 `backend/src/seed/seed.js` 中的数据数组，重新运行 `npm run seed`。

### 前端开发代理

Vite 开发服务器已配置 `/api` 代理到 `http://localhost:3000`，本地开发时无需跨域处理。

---

## 许可证

本项目为北京外国语大学本科生创新创业训练计划项目成果。内容仅供参考，具体合规要求请咨询当地 Council 或专业法务顾问。

---

## 贡献

本项目由北京外国语大学《英国春节活动法律风险规避手册》研究团队开发。

🤖 Generated with [Claude Code](https://claude.com/claude-code)
