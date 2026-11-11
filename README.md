# proto-preview

原型预览仓库：**每个项目一个目录**，通过 GitHub Pages 直接预览，不需要本地构建或启动服务。

## 访问

- 首页（项目索引）：https://feirpri.github.io/proto-preview/
- 投资助手：https://feirpri.github.io/proto-preview/investment-assistant/

## 目录约定

```
proto-preview/
├── index.html                 # 项目索引（新增项目时加一张卡片）
├── investment-assistant/      # 投资助手 · PWA 五页 + 扩展 popup
│   ├── index.html             # 入口页（今日）
│   ├── assets/
│   └── ...
└── <project-slug>/            # 其他项目按同样方式并列
```

新增一个项目：

1. 在根目录创建 `<project-slug>/`，放入可静态打开的 `index.html` 及相关资源；
2. 在根 `index.html` 的卡片列表加一项，链接到 `./<project-slug>/`；
3. 提交并推送到 `main`，Pages 会自动重新部署。

## 约束

- 只放**只读静态原型**：不含生产代码、不接真实 API、不写入任何业务数据。
- 不放真实密钥、个人账户、持仓明细等敏感信息；本仓库会公开托管。
- 原型中的数字均为演示数据，不构成投资建议。

## 投资助手原型说明

见 [`investment-assistant/原型说明.md`](./investment-assistant/原型说明.md)，覆盖页面结构、与计划 §2.1 的对应关系及已知简化点。
