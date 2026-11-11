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

- 只放**静态原型**：不含生产代码、不接真实 API、不写入任何业务数据；v7 的实盘编辑仅写入浏览器 localStorage，token 门禁仅为交互演示。
- 不放真实密钥、个人账户、持仓明细等敏感信息；本仓库会公开托管。
- 原型中的数字均为演示数据，不构成投资建议。

## 投资助手截图

原型 v7：**7 页 × 桌面 1440px / 移动 390px，共 14 张全页截图**，另有扩展 popup、Token 门禁、全量编辑、份额操作、前后对照与历史重算提示等状态截图，位于 [`investment-assistant/screenshots/`](./investment-assistant/screenshots)：

| 页面 | 桌面 | 移动 |
|---|---|---|
| 首页（Token 门禁 + 持仓表 + 份额/净值 + 可放大趋势图入口） | [home-1440](./investment-assistant/screenshots/home-1440.png) | [home-390](./investment-assistant/screenshots/home-390.png) |
| 建议 | [advice-1440](./investment-assistant/screenshots/advice-1440.png) | [advice-390](./investment-assistant/screenshots/advice-390.png) |
| 要闻 | [news-1440](./investment-assistant/screenshots/news-1440.png) | [news-390](./investment-assistant/screenshots/news-390.png) |
| 组合 | [portfolio-1440](./investment-assistant/screenshots/portfolio-1440.png) | [portfolio-390](./investment-assistant/screenshots/portfolio-390.png) |
| 对比 | [compare-1440](./investment-assistant/screenshots/compare-1440.png) | [compare-390](./investment-assistant/screenshots/compare-390.png) |
| 历史 | [history-1440](./investment-assistant/screenshots/history-1440.png) | [history-390](./investment-assistant/screenshots/history-390.png) |
| 设置 | [settings-1440](./investment-assistant/screenshots/settings-1440.png) | [settings-390](./investment-assistant/screenshots/settings-390.png) |
| 扩展 popup | [popup](./investment-assistant/screenshots/popup.png) | — |

v7 状态截图：

| 状态 | 桌面 | 移动 |
|---|---|---|
| Token 门禁（无 token 只能停留输入页） | [v7-gate-1440](./investment-assistant/screenshots/v7-gate-1440.png) | [v7-gate-390](./investment-assistant/screenshots/v7-gate-390.png) |
| 编辑基金（全量实盘编辑） | [v7-edit-1440](./investment-assistant/screenshots/v7-edit-1440.png) | [v7-edit-390](./investment-assistant/screenshots/v7-edit-390.png) |
| 按份额操作（金额自动折算） | [v7-shares-1440](./investment-assistant/screenshots/v7-shares-1440.png) | [v7-shares-390](./investment-assistant/screenshots/v7-shares-390.png) |
| 操作前/后对照 + 历史重算提示 | [v7-diff-1440](./investment-assistant/screenshots/v7-diff-1440.png) | [v7-diff-390](./investment-assistant/screenshots/v7-diff-390.png) |
| 本地审计（时间/类型/基金/前→后/来源） | [v7-history-1440](./investment-assistant/screenshots/v7-history-1440.png) | [v7-history-390](./investment-assistant/screenshots/v7-history-390.png) |
| 调整后目标值（v6 保留） | [v6-adjust-1440](./investment-assistant/screenshots/v6-adjust-1440.png) | [v6-adjust-390](./investment-assistant/screenshots/v6-adjust-390.png) |
| 图表放大视图（v6 保留） | [v6-zoom-1440](./investment-assistant/screenshots/v6-zoom-1440.png) | [v6-zoom-390](./investment-assistant/screenshots/v6-zoom-390.png) |
| 目标权重写入态（v6 保留） | [v6-write-1440](./investment-assistant/screenshots/v6-write-1440.png) | [v6-write-390](./investment-assistant/screenshots/v6-write-390.png) |

七档宽度（360 / 390 / 414 / 768 / 1024 / 1280 / 1440）审计结果见 [`screenshots/audit.json`](./investment-assistant/screenshots/audit.json)，覆盖 v7 检查项（无 token 仅 token 页、错误 token 拦截、localStorage 写入与退出清除、全量新增/编辑/删除、申购/赎回/清仓/加减仓、现金与总额校正、份额与金额双向折算、生效时间与前后 diff、历史重算提示、份额/现金/总额/权重/小数位/代码重复校验、本地审计/撤销/恢复初始值/刷新持久化）以及 v6 能力（数值单行、调整后目标值、图表放大、`015790` 成立以来、七页导航）；v1 基线见 [`screenshots/audit-before.json`](./investment-assistant/screenshots/audit-before.json)。

> 演示 token：`demo-2026`。这是静态站交互演示，**不是真实安全边界**；真实 token 由服务端生成与校验。

## 投资助手原型说明

见 [`investment-assistant/原型说明.md`](./investment-assistant/原型说明.md)，覆盖 v7 Token 门禁、份额记账、全量实盘编辑、生效时间与前后对照、本地审计与历史重算，以及 v6 数值单行、调整后目标值、图表放大、持仓优先表格、名称展开、指数估值、刷新与持久化口径、建议/要闻页及已知简化点。
