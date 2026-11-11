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
│   ├── index.html                # 首页（大盘指数 PE/分位 + 基金持仓 + 调整后目标值 + 可放大趋势图）
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

原型 v7：**7 页 × 桌面 1440px / 移动 390px，共 14 张全页截图**，另有扩展 popup、6 张 v6 状态截图与 10 张 v7 状态截图（token 门禁 / 全量编辑 / 份额操作 / 前后对照 / 历史重算），位于 [`investment-assistant/screenshots/`](./investment-assistant/screenshots)：

| 页面 | 桌面 | 移动 |
|---|---|---|
| 首页（Token 门禁 + 数值单行 + 持仓表 + 实盘数据编辑 + 可放大趋势图） | [home-1440](./investment-assistant/screenshots/home-1440.png) | [home-390](./investment-assistant/screenshots/home-390.png) |
| 建议 | [advice-1440](./investment-assistant/screenshots/advice-1440.png) | [advice-390](./investment-assistant/screenshots/advice-390.png) |
| 要闻 | [news-1440](./investment-assistant/screenshots/news-1440.png) | [news-390](./investment-assistant/screenshots/news-390.png) |
| 组合 | [portfolio-1440](./investment-assistant/screenshots/portfolio-1440.png) | [portfolio-390](./investment-assistant/screenshots/portfolio-390.png) |
| 对比 | [compare-1440](./investment-assistant/screenshots/compare-1440.png) | [compare-390](./investment-assistant/screenshots/compare-390.png) |
| 历史 | [history-1440](./investment-assistant/screenshots/history-1440.png) | [history-390](./investment-assistant/screenshots/history-390.png) |
| 设置 | [settings-1440](./investment-assistant/screenshots/settings-1440.png) | [settings-390](./investment-assistant/screenshots/settings-390.png) |
| 扩展 popup | [popup](./investment-assistant/screenshots/popup.png) | — |

v6 状态截图（保留）：

| 状态 | 桌面 | 移动 |
|---|---|---|
| 调整后目标值（展开区） | [v6-adjust-1440](./investment-assistant/screenshots/v6-adjust-1440.png) | [v6-adjust-390](./investment-assistant/screenshots/v6-adjust-390.png) |
| 图表放大视图 | [v6-zoom-1440](./investment-assistant/screenshots/v6-zoom-1440.png) | [v6-zoom-390](./investment-assistant/screenshots/v6-zoom-390.png) |
| 网页端模拟写入态（含本地审计） | [v6-write-1440](./investment-assistant/screenshots/v6-write-1440.png) | [v6-write-390](./investment-assistant/screenshots/v6-write-390.png) |

v7 状态截图：

| 状态 | 桌面 | 移动 |
|---|---|---|
| Token 门禁（无有效 token，仅显示输入页） | [v7-gate-1440](./investment-assistant/screenshots/v7-gate-1440.png) | [v7-gate-390](./investment-assistant/screenshots/v7-gate-390.png) |
| 实盘数据全量编辑（新增/编辑/删除/份额/现金/总额） | [v7-edit-1440](./investment-assistant/screenshots/v7-edit-1440.png) | [v7-edit-390](./investment-assistant/screenshots/v7-edit-390.png) |
| 份额操作（份额优先、金额自动折算） | [v7-share-1440](./investment-assistant/screenshots/v7-share-1440.png) | [v7-share-390](./investment-assistant/screenshots/v7-share-390.png) |
| 操作前 / 操作后对照 | [v7-diff-1440](./investment-assistant/screenshots/v7-diff-1440.png) | [v7-diff-390](./investment-assistant/screenshots/v7-diff-390.png) |
| 历史时间重算后续提示 | [v7-recompute-1440](./investment-assistant/screenshots/v7-recompute-1440.png) | [v7-recompute-390](./investment-assistant/screenshots/v7-recompute-390.png) |

七档宽度（360 / 390 / 414 / 768 / 1024 / 1280 / 1440）审计结果见 [`screenshots/audit.json`](./investment-assistant/screenshots/audit.json)，含 v7 检查项（无 token 时仅显示门禁页且信息页不渲染、错误 token 拒绝、有效 token 写入 localStorage、份额/金额双向折算、确认弹层前后对照、历史时间重算后续提示、基金代码重复与超卖校验、新增/编辑/删除、现金与总额校正、撤销与恢复初始值、七档宽度无横向溢出、触控 ≥44px）以及 v6 回归项（数值单行、图表放大、`015790` 成立以来等）；v1 基线见 [`screenshots/audit-before.json`](./investment-assistant/screenshots/audit-before.json)。

## 投资助手原型说明

见 [`investment-assistant/原型说明.md`](./investment-assistant/原型说明.md)，覆盖 v7 信息架构、Token 门禁、全量实盘编辑、份额操作、生效时间与前后对照、历史重算、本地审计、数值单行、调整后目标值、图表放大、持仓优先表格、名称展开、指数估值、刷新与持久化口径、建议/要闻页及已知简化点。
