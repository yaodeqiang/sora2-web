# Sora2 Web Next.js Project

这是一个基于 Next.js 15 的 Sora2 视频生成器项目，支持多语言（英文/中文等）和用户认证。语言偏好基于 Cookie 保存与读取，无 URL 语言前缀。

## 功能特性

- 🌍 多语言支持（英文/中文等，基于 Cookie 的语言偏好）
- 🔐 用户认证（GitHub/Google OAuth）
- 🎥 视频生成界面
- 📱 响应式设计
- 🎨 现代化UI设计

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- next-intl (国际化)

## 环境设置

1. 克隆项目
```bash
git clone <repository-url>
cd sora2-web-nextjs
```

2. 安装依赖
```bash
npm install
```

3. 设置环境变量
创建 `.env.local` 文件并添加以下配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. 启动开发服务器
```bash
npm run dev
```

## Supabase 设置

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 在项目设置中找到 API URL 和 anon key
3. 在 Authentication > Providers 中启用 GitHub 和 Google OAuth
4. 设置重定向 URL 为 `http://localhost:3000/auth/callback`

## 项目结构

```
├── app/
│   ├── auth/              # 认证路由（无语言前缀）
│   ├── layout.tsx         # 根布局（从 Cookie/Headers 读取语言）
│   └── page.tsx           # 首页（无语言前缀）
├── components/            # React 组件
├── lib/                   # 工具库
├── messages/              # 国际化消息（各语言 JSON）
└── public/                # 静态资源
```

## 开发说明

- 项目使用 Next.js App Router
- 支持服务端和客户端组件
- 使用 Supabase 进行用户认证和数据存储
- 支持 Edge Runtime（中间件），在请求阶段写入/读取 Cookie 中的语言偏好

## 部署

项目已配置为支持 Vercel 部署，确保在 Vercel 中设置相应的环境变量。
### Creem 产品 ID 环境变量

在不同货币环境下，后端会优先选择 EUR 产品（若前端传递 currency=EUR），否则默认使用 USD 产品。请在部署环境中配置以下变量：

- `CREEM_API_KEY`: Creem API 密钥（必填）
- `CREEM_PRODUCT_STARTER_ID`, `CREEM_PRODUCT_BASIC_ID`, `CREEM_PRODUCT_PRO_ID`, `CREEM_PRODUCT_ENTERPRISE_ID`: USD 对应产品 ID（必填）
- `CREEM_PRODUCT_STARTER_ID_EUR`, `CREEM_PRODUCT_BASIC_ID_EUR`, `CREEM_PRODUCT_PRO_ID_EUR`, `CREEM_PRODUCT_ENTERPRISE_ID_EUR`: EUR 对应产品 ID（如果你在 Creem 创建了 EUR 产品，建议填写）
- `CREEM_DEFAULT_PRODUCT_ID`: 未匹配到产品时的回退 ID（可选）
- `CREEM_SUCCESS_URL`: 支付成功跳转地址（可选）
- `CREEM_DISABLE_SUCCESS_URL`: 设置为 `true` 将禁用成功跳转（可选）

> 注意：环境变量只在服务端使用，避免将产品 ID 暴露到前端打包代码中。
