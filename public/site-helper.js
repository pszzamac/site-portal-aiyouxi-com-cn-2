/**
 * site-helper.js — 页面提示卡片、关键词徽章和访问说明
 * 用于 https://site-portal-aiyouxi.com.cn 的辅助功能
 */

(function() {
  'use strict';

  // ----- 配置数据 -----
  const CONFIG = {
    portalUrl: 'https://site-portal-aiyouxi.com.cn',
    keywords: ['爱游戏', '游戏门户', '热门活动', '攻略中心'],
    badgeColors: ['#4a90d9', '#7b68ee', '#e67e22', '#27ae60']
  };

  // ----- 创建提示卡片 -----
  function createTipCard(title, message) {
    const card = document.createElement('div');
    card.className = 'site-helper-tip-card';
    card.style.cssText = [
      'position: fixed',
      'bottom: 20px',
      'right: 20px',
      'max-width: 320px',
      'background: #fff',
      'border: 1px solid #ddd',
      'border-radius: 8px',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.15)',
      'padding: 16px',
      'z-index: 9999',
      'font-family: Arial, sans-serif',
      'font-size: 14px',
      'line-height: 1.5',
      'color: #333'
    ].join('; ');

    const heading = document.createElement('h4');
    heading.textContent = title;
    heading.style.cssText = 'margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;';

    const content = document.createElement('p');
    content.textContent = message;
    content.style.cssText = 'margin: 0 0 12px 0;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '知道了';
    closeBtn.style.cssText = [
      'background: #3498db',
      'color: #fff',
      'border: none',
      'border-radius: 4px',
      'padding: 6px 16px',
      'cursor: pointer',
      'font-size: 13px'
    ].join('; ');
    closeBtn.addEventListener('click', function() {
      card.style.display = 'none';
    });

    card.appendChild(heading);
    card.appendChild(content);
    card.appendChild(closeBtn);

    return card;
  }

  // ----- 创建关键词徽章 -----
  function createKeywordBadge(keyword, color) {
    const badge = document.createElement('span');
    badge.className = 'site-helper-badge';
    badge.textContent = keyword;
    badge.style.cssText = [
      'display: inline-block',
      'background: ' + color,
      'color: #fff',
      'border-radius: 12px',
      'padding: 4px 12px',
      'margin: 4px',
      'font-size: 12px',
      'font-weight: bold',
      'letter-spacing: 0.5px'
    ].join('; ');
    return badge;
  }

  // ----- 创建访问说明 -----
  function createAccessNotice() {
    const notice = document.createElement('div');
    notice.className = 'site-helper-notice';
    notice.style.cssText = [
      'margin-top: 16px',
      'padding: 12px',
      'background: #f9f9f9',
      'border-left: 3px solid #3498db',
      'border-radius: 4px',
      'font-size: 13px',
      'color: #555'
    ].join('; ');

    const link = document.createElement('a');
    link.href = CONFIG.portalUrl;
    link.target = '_blank';
    link.textContent = CONFIG.portalUrl;
    link.style.cssText = 'color: #2980b9; text-decoration: underline;';

    const text = document.createTextNode('欢迎访问我们的一站式游戏平台。更多资讯请查看 ');
    notice.appendChild(text);
    notice.appendChild(link);
    notice.appendChild(document.createTextNode(' 。'));

    return notice;
  }

  // ----- 将徽章插入指定容器 -----
  function injectBadges(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    CONFIG.keywords.forEach(function(keyword, index) {
      const colorIndex = index % CONFIG.badgeColors.length;
      const badge = createKeywordBadge(keyword, CONFIG.badgeColors[colorIndex]);
      container.appendChild(badge);
    });

    // 同时添加访问说明
    const notice = createAccessNotice();
    container.appendChild(notice);
  }

  // ----- 初始化页面辅助功能 -----
  function init() {
    // 添加提示卡片（延迟显示，避免干扰用户）
    setTimeout(function() {
      const card = createTipCard('💡 提示', '点击 “知道了” 可关闭此卡片。页面底部有关键词徽章和访问说明。');
      document.body.appendChild(card);
    }, 3000);

    // 查找或创建徽章容器
    let badgeContainer = document.getElementById('site-keywords');
    if (!badgeContainer) {
      badgeContainer = document.createElement('div');
      badgeContainer.id = 'site-keywords';
      badgeContainer.style.cssText = [
        'margin: 20px auto',
        'max-width: 800px',
        'padding: 10px',
        'text-align: center'
      ].join('; ');

      // 尝试插入页面主体
      const main = document.querySelector('main') || document.querySelector('.content') || document.body;
      main.appendChild(badgeContainer);
    }

    // 注入徽章和说明
    injectBadges('site-keywords');
  }

  // ----- 在 DOM 加载完成后执行 -----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();