# 小和 — 个人作品集

一个使用原生 HTML / CSS / JavaScript 构建的个人作品集网站，展示项目作品、技能与联系方式，支持浅色 / 深色主题切换。

## 功能特性

- **响应式布局**：桌面端左侧固定介绍栏 + 右侧内容；移动端顶部横向导航
- **项目展示**：从 `js/data.js` 读取数据，按时间倒序渲染，图文交替布局
- **滚动联动**：导航高亮当前区块，滚动入场动画，返回顶部按钮
- **主题切换**：右上角按钮切换浅色 / 深色主题，选择通过 `localStorage` 持久化
- **无障碍与动效**：支持 `prefers-reduced-motion`，键盘可聚焦

## 技术栈

- **HTML5** / **CSS3**（CSS 变量驱动主题，原生响应式）
- **原生 JavaScript**（无框架、无第三方 UI 库）
- Google Fonts：Inter、Space Grotesk
- IntersectionObserver：滚动联动与入场动画

## 目录结构

```
lab04/
├── index.html          # 页面结构
├── css/
│   └── style.css       # 样式与主题变量（含深色主题）
├── js/
│   ├── data.js         # 项目数据（追加对象即可新增项目）
│   └── main.js         # 渲染、导航、返回顶部、主题切换逻辑
└── images/             # 项目配图（SVG 插画）
```

## 运行方式

本项目为纯静态页面，任选其一：

1. 直接用浏览器打开 `index.html`
2. 或启动本地服务器（推荐，避免部分浏览器对本地文件的限制）：

```bash
# Python 3
python -m http.server 8000

# Node.js（需安装 serve）
npx serve .
```

然后访问 `http://localhost:8000`。

## 新增项目

在 [js/data.js](js/data.js) 的 `projects` 数组中追加对象，字段如下：

| 字段 | 说明 |
|------|------|
| `name` | 项目名称 |
| `intro` | 项目简介 |
| `tech` | 技术栈数组 |
| `date` | 完成时间 `YYYY-MM`（用于排序） |
| `category` | 类别标签 |
| `imgSrc` | 配图路径（放入 `images/` 目录） |
