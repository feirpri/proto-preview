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
│   ├── index.html                # 首页（大盘指数 PE/分位 + 唯一「我的基金」单行列表 + 金额编辑 + 可放大趋势图）
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

原型 v8：**7 页 × 桌面 1440px / 移动 390px，共 14 张全页截图**，另有扩展 popup 与 v8 状态截图（token 门禁 / 金额编辑 / 添加基金 / 删除确认 / 详情 / 图表放大），位于 [`investment-assistant/screenshots/`](./investment-assistant/screenshots)：

| 页面 | 桌面 | 移动 |
|---|---|---|
| 首页（Token 门禁 + 大盘指数 + 唯一「我的基金」单行列表 + 最近操作） | [home-1440](./investment-assistant/screenshots/home-1440.png) | [home-390](./investment-assistant/screenshots/home-390.png) |
| 建议 | [advice-1440](./investment-assistant/screenshots/advice-1440.png) | [advice-390](./investment-assistant/screenshots/advice-390.png) |
| 要闻 | [news-1440](./investment-assistant/screenshots/news-1440.png) | [news-390](./investment-assistant/screenshots/news-390.png) |
| 组合 | [portfolio-1440](./investment-assistant/screenshots/portfolio-1440.png) | [portfolio-390](./investment-assistant/screenshots/portfolio-390.png) |
| 对比 | [compare-1440](./investment-assistant/screenshots/compare-1440.png) | [compare-390](./investment-assistant/screenshots/compare-390.png) |
| 历史 | [history-1440](./investment-assistant/screenshots/history-1440.png) | [history-390](./investment-assistant/screenshots/history-390.png) |
| 设置 | [settings-1440](./investment-assistant/screenshots/settings-1440.png) | [settings-390](./investment-assistant/screenshots/settings-390.png) |
| 扩展 popup | [popup](./investment-assistant/screenshots/popup.png) | — |

v8 状态截图：

| 状态 | 桌面 | 移动 |
|---|---|---|
| Token 门禁（无有效 token，仅显示输入页） | [v8-gate-1440](./investment-assistant/screenshots/v8-gate-1440.png) | [v8-gate-390](./investment-assistant/screenshots/v8-gate-390.png) |
| 编辑金额弹层（只读当前金额 + 修改后金额 + 生效时间） | [v8-edit-1440](./investment-assistant/screenshots/v8-edit-1440.png) | [v8-edit-390](./investment-assistant/screenshots/v8-edit-390.png) |
| 添加基金弹层（代码 / 名称 / 首次金额 / 生效时间） | [v8-add-1440](./investment-assistant/screenshots/v8-add-1440.png) | [v8-add-390](./investment-assistant/screenshots/v8-add-390.png) |
| 删除二次确认（在编辑弹层内） | [v8-delete-1440](./investment-assistant/screenshots/v8-delete-1440.png) | [v8-delete-390](./investment-assistant/screenshots/v8-delete-390.png) |
| 基金详情（建议 + 分时 / 多周期趋势） | [v8-detail-1440](./investment-assistant/screenshots/v8-detail-1440.png) | [v8-detail-390](./investment-assistant/screenshots/v8-detail-390.png) |
| 图表放大视图 | [v8-zoom-1440](./investment-assistant/screenshots/v8-zoom-1440.png) | [v8-zoom-390](./investment-assistant/screenshots/v8-zoom-390.png) |

v7 历史截图保留在 `screenshots/`（`v7-*`），仅用于版本追溯。

七档宽度（360 / 390 / 414 / 768 / 1024 / 1280 / 1440）审计结果见 [`screenshots/audit.json`](./investment-assistant/screenshots/audit.json)，v8 检查项包括：无 token 时仅显示门禁页且信息页不渲染、错误 token 拒绝、有效 token 写入 localStorage、首页只有一张基金表且每只基金恰好一行（无份额/净值/成本/权重/现金/总额）、编辑弹层仅含三个必要字段、金额两位小数与非负校验、代码唯一、删除二次确认、保存后行/审计/localStorage 同步、撤销与恢复初始值、历史时间只提示不重算、详情建议/趋势/放大/`015790` 成立以来、七档宽度无横向溢出/裁切、触控 <44px 为 0。

## 投资助手原型说明

见 [`investment-assistant/原型说明.md`](./investment-assistant/原型说明.md)，覆盖 v8 信息架构、单行「我的基金」、金额编辑与删除内收、最近操作与本地审计、Token 门禁、详情建议与图表放大、指数估值、刷新与持久化口径、建议/要闻页及已知简化点。
