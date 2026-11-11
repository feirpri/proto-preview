# proto-preview

原型预览仓库：**每个项目一个目录**，通过 GitHub Pages 直接预览，不需要本地构建或启动服务。

## 访问

- 首页（项目索引）：https://feirpri.github.io/proto-preview/
- 投资助手：https://feirpri.github.io/proto-preview/investment-assistant/

## 目录约定

```
proto-preview/
├── index.html                    # 项目索引（新增项目时加一张卡片）
├── investment-assistant/         # 投资助手 · 7 页 PWA + 扩展 popup
│   ├── index.html                # 首页（大盘指数 + 基金估值）
│   ├── advice.html               # 建议（每日操作建议）
│   ├── news.html                 # 要闻（经济与民生要闻，演示数据）
│   ├── portfolio.html            # 组合
│   ├── compare.html              # 对比
│   ├── history.html              # 历史
│   ├── settings.html             # 设置
│   ├── popup.html                # Chrome 扩展 popup 示意
│   ├── assets/
│   └── ...
└── <project-slug>/               # 其他项目按同样方式并列
```

新增一个项目：

1. 在根目录创建 `<project-slug>/`，放入可静态打开的 `index.html` 及相关资源；
2. 在根 `index.html` 的卡片列表加一项，链接到 `./<project-slug>/`；
3. 提交并推送到 `main`，Pages 会自动重新部署。

## 约束

- 只放**只读静态原型**：不含生产代码、不接真实 API、不写入任何业务数据。
- 不放真实密钥、个人账户、持仓明细等敏感信息；本仓库会公开托管。
- 原型中的数字均为演示数据，不构成投资建议。

## 投资助手截图

原型 v4：**7 页 × 桌面 1440px / 移动 390px，共 14 张全页截图**，另有扩展 popup，位于 [`investment-assistant/screenshots/`](./investment-assistant/screenshots)：

| 页面 | 桌面 | 移动 |
|---|---|---|
| 首页（表格化：大盘 + 基金估值 + 行内建议） | [home-1440](./investment-assistant/screenshots/home-1440.png) | [home-390](./investment-assistant/screenshots/home-390.png) |
| 建议 | [advice-1440](./investment-assistant/screenshots/advice-1440.png) | [advice-390](./investment-assistant/screenshots/advice-390.png) |
| 要闻 | [news-1440](./investment-assistant/screenshots/news-1440.png) | [news-390](./investment-assistant/screenshots/news-390.png) |
| 组合 | [portfolio-1440](./investment-assistant/screenshots/portfolio-1440.png) | [portfolio-390](./investment-assistant/screenshots/portfolio-390.png) |
| 对比 | [compare-1440](./investment-assistant/screenshots/compare-1440.png) | [compare-390](./investment-assistant/screenshots/compare-390.png) |
| 历史 | [history-1440](./investment-assistant/screenshots/history-1440.png) | [history-390](./investment-assistant/screenshots/history-390.png) |
| 设置 | [settings-1440](./investment-assistant/screenshots/settings-1440.png) | [settings-390](./investment-assistant/screenshots/settings-390.png) |
| 扩展 popup | [popup](./investment-assistant/screenshots/popup.png) | — |

七档宽度（360 / 390 / 414 / 768 / 1024 / 1280 / 1440）审计结果见 [`screenshots/audit.json`](./investment-assistant/screenshots/audit.json)，含 v4 检查项（首页表格化、建议行内展开、单一刷新时间、stale 延迟、刷新保持展开与滚动、7 页导航与「更多」抽屉）；v1 基线见 [`screenshots/audit-before.json`](./investment-assistant/screenshots/audit-before.json)。

## 投资助手原型说明

见 [`investment-assistant/原型说明.md`](./investment-assistant/原型说明.md)，覆盖 v4 信息架构、首页表格与行内建议、刷新口径、建议/要闻页、与计划 §2.1 的对应关系及已知简化点。
