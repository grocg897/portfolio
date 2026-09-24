/* ============================================================
   项目数据（便于扩展：新增项目只需在数组里追加对象）
   字段说明：
     name      项目名称
     intro     项目简介
     tech      技术栈数组
     date      完成时间 YYYY-MM（用于排序与展示）
     category  类别标签（显示在项目名称上方的小型标签）
     imgSrc    项目配图路径（本地 images/ 目录下的 SVG 插画，新增项目时
               建议自制一张同风格插画放入 images/ 并在此引用）
   ============================================================ */
window.PORTFOLIO = {
  projects: [
    {
      name: "轻记账",
      intro: "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。项目支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
      tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
      date: "2025-04",
      category: "移动应用",
      imgSrc: "images/keqingji.svg"
    },
    {
      name: "拾光集市",
      intro: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
      tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
      date: "2025-09",
      category: "Web 应用",
      imgSrc: "images/shiguang.svg"
    },
    {
      name: "城市脉搏",
      intro: "城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
      tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
      date: "2026-03",
      category: "数据可视化",
      imgSrc: "images/citypulse.svg"
    },
    {
      name: "课语通",
      intro: "基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
      tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
      date: "2026-07",
      category: "AI 应用",
      imgSrc: "images/keyutong.svg"
    }
  ]
};
