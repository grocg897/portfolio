/* ============================================================
   个人作品集 交互脚本
   - 从 data.js 渲染项目列表（按时间倒序）
   - 导航高亮（滚动联动）
   - 滚动入场动画
   - 返回顶部按钮
   ============================================================ */
(function () {
  "use strict";

  const IMG_BASE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";
  // 本地图片版本号：更新图片后递增，用于刷新浏览器缓存
  const IMG_VERSION = "2";

  /** 为图片地址追加版本参数（避免浏览器缓存旧图） */
  function withVersion(src) {
    if (!IMG_VERSION) return src;
    return src + (src.indexOf("?") > -1 ? "&v=" : "?v=") + IMG_VERSION;
  }

  /** 根据 prompt 与尺寸生成图片地址 */
  function imgUrl(prompt, size) {
    return (
      IMG_BASE +
      "?prompt=" + encodeURIComponent(prompt) +
      "&image_size=" + encodeURIComponent(size || "landscape_16_9")
    );
  }

  /** 2025-06 -> 2025.06 */
  function fmtDate(s) {
    return String(s).replace("-", ".");
  }

  /** 渲染项目列表 */
  function renderProjects() {
    const list = document.getElementById("project-list");
    if (!list) return;

    const projects = (window.PORTFOLIO && window.PORTFOLIO.projects) || [];
    // 按时间倒序
    projects.sort(function (a, b) {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });

    const countEl = document.getElementById("proj-count");
    if (countEl) countEl.textContent = projects.length;

    list.innerHTML = projects
      .map(function (p, i) {
        const idx = String(i + 1).padStart(2, "0");
        const reverse = i % 2 === 1 ? " reverse" : "";
        const tech = (p.tech || [])
          .map(function (t) { return "<li>" + t + "</li>"; })
          .join("");
        return (
          '<article class="project reveal' + reverse + '" data-index="' + i + '">' +
            '<div class="project-media">' +
              '<span class="project-num">' + idx + "</span>" +
              '<img src="' + withVersion(p.imgSrc || imgUrl(p.img, p.size)) + '" alt="' + p.name + ' 预览图" />' +
            "</div>" +
            '<div class="project-body">' +
              '<div class="project-meta">' +
                (p.category ? '<span class="cat">' + p.category + "</span>" + '<span class="dot"></span>' : "") +
                "<span>" + fmtDate(p.date) + "</span>" +
              "</div>" +
              '<h3 class="project-title">' + p.name + "</h3>" +
              '<p class="project-intro">' + p.intro + "</p>" +
              '<ul class="tech">' + tech + "</ul>" +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    observeReveal();
  }

  /** 滚动入场：仅对带 reveal 的元素生效 */
  function observeReveal() {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /** 导航高亮：根据滚动位置标记当前 section */
  function setupNav() {
    const links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    const sections = Array.prototype.slice.call(document.querySelectorAll(".main section[id]"));
    if (!links.length || !sections.length) return;

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            const id = e.target.id;
            links.forEach(function (l) {
              l.classList.toggle("active", l.getAttribute("data-target") === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }

  /** 返回顶部按钮 */
  function setupBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        if (window.scrollY > 600) btn.classList.remove("hidden");
        else btn.classList.add("hidden");
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    onScroll();
  }

  /** 主题切换：读取/写入 localStorage，切换 data-theme */
  function setupTheme() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function current() {
      return document.documentElement.getAttribute("data-theme") || "light";
    }
    function sync() {
      btn.setAttribute("aria-pressed", current() === "dark" ? "true" : "false");
    }
    sync();

    btn.addEventListener("click", function () {
      const next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      sync();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
    setupNav();
    setupBackToTop();
    setupTheme();
  });
})();
