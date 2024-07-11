# AskAITools 开源社区版

## 概述

AskAITools (https://askaitools.ai) 是专为 AI 产品领域设计的顶级搜索引擎项目，，致力于打造 AI 产品领域中最卓越的搜索引擎。我们的目标是为用户提供最精准、最全面、最快速、最智能的搜索体验，使其成为用户寻找 AI 产品时的首选。

**AskAITools 桌面端截图：**

[![AskAITools 桌面端截图](https://github.com/askaitools/askaitools-community-edition/raw/master/app/public/images/MainScreenshot.png)](https://askaitools.ai)

**AskAITools 移动端截图：**

[![AskAITools 桌面端截图](https://github.com/askaitools/askaitools-community-edition/raw/master/app/public/images/MobileScreenshot.png)](https://askaitools.ai)

此项目包括商业版与社区版两个版本，社区版提供基础前端界面和搜索功能，代码完全开源。开发者可以在此基础上，轻松添加自己的数据，迅速构建专业的垂域搜索引擎或用于企业内部文档搜索。

本搜索引擎是一种混合型搜索引擎，具备关键词搜索（全文搜索）和语义搜索（向量搜索/嵌入搜索）功能，结合统计数据进行加权融合，实现了在相关性和热度两方面的平衡。

## 项目架构与技术栈

- 前端：Next.js
- 部署：Vercel
- 样式：Tailwind CSS
- 数据库：Supabase
- 关键词搜索：Postgresql / Supabase 全文搜索引擎
- 语义搜索：Pgvector / Supabase 向量数据库
- 语义向量生成：OpenAI text-embedding-3 模型

## 使用步骤

1. 收集并整理你的垂域数据，详细字段可参照[我的数据表结构](./supabase/migrations/20240506_init.sql)。
2. 根据你的数据需要调整 `item` 表结构，在 Supabase 中创建并导入数据表。
3. 将环境变量模板 `.env.local.example` 复制为 `.env.local` 并填入你的 Supabase 和 OpenAI 配置信息，必要时填写代理信息。
4. 根据需求，调整 `./app/pages/index.tsx`、`./app/pages/api/embedding_search.ts` 与 `./supabase/migrations/20240506_init.sql` 中的搜索参数和搜索策略。
5. 参考 `20240506_init.sql`，在 Supabase 中创建两个搜索函数。
6. 在 `app` 目录下执行 `yarn install` 安装依赖，之后运行 `yarn dev` 启动本地开发环境并进行代码调试。
7. 遵循 Vercel 官方文档将项目部署至 Vercel。
8. 部署成功后，庆祝成果🎉

## 使用限制

1. 基于本项目进行二次开发的项目，必须在用户界面首页或文档首页的显著位置，注明本开源项目的名称和开源地址。最简单的做法是，保留页脚中的 "Powered by AskAITools" 组件。
2. 基于本项目进行二次开发并部署上线的项目，除 [AskAITools 商业版](https://askaitools.ai)（https://askaitools.ai）外，请勿使用 AskAITools 品牌名作为产品 / 项目名称。
3. 如果基于本项目二次开发 AI 产品搜索站或 AI 产品导航站等和 AskAITools 商业版接近的项目，请重新设计、开发前端页面。否则相同格式、相似内容，后上线的网站很可能被谷歌判定为抄袭，从而无法获得搜索流量。
