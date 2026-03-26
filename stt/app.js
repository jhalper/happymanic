// ========== SCREEN TIME TRACKER — Pure Vanilla JS ==========

(function() {
  'use strict';

  // ===== ICONS (inline SVGs) =====
  const ICONS = {
    dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    tasks: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    screenTime: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    rewards: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
    violations: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    checkIns: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    agreement: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
    shield: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    verified: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>',
  };

  // ===== USERS =====
  const USERS = [
    { id: 'appa', name: 'Appa', role: 'parent', pin: '1234', emoji: '👨', color: '#4F5BD5' },
    { id: 'umma', name: 'Umma', role: 'parent', pin: '5678', emoji: '👩', color: '#D55B4F' },
    { id: 'aiden', name: 'Aiden', role: 'child', pin: '0000', emoji: '🧒', color: '#16A34A' },
  ];

  // ===== TASKS & CHORES DEFINITIONS =====
  const ACTIVITIES = [
    { key: 'aops', label: 'AOPS homework (showing work)', time: '30 min' },
    { key: 'alcumus', label: 'Alcumus (showing work)', time: '30 min' },
    { key: 'oboe', label: 'Oboe practice', time: 'at least 15 min' },
    { key: 'outside', label: 'Outside play', time: 'at least 30 min' },
    { key: 'taekwondo', label: 'Taekwondo practice', time: 'at least 15 min' },
    { key: 'other', label: 'Other non-screen activity', time: 'at least 15 min', hasNotes: true },
  ];

  const CHORES = [
    { key: 'hops', label: 'Hops: food and water' },
    { key: 'trash', label: 'Trash cans and recycle cans' },
    { key: 'room', label: 'Clean your room' },
    { key: 'floor', label: 'Pick up anything on the floor' },
    { key: 'drawers', label: 'Close any drawers that are open' },
    { key: 'own_things', label: 'Pick up your own things (cans, bowls, snacks)' },
  ];

  // ===== STATE =====
  let currentUser = null;
  let sidebarOpen = false;

  // ===== DATA LAYER =====
  const STORAGE_KEY = 'screenTimeTracker';

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { console.warn('Failed to load data', e); }
    return getDefaultData();
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.warn('Failed to save data', e); }
  }

  function getDefaultData() {
    return {
      taskCompletions: {},
      choreCompletions: {},
      screenTimeLogs: [],
      rewards: [],
      violations: [],
      checkIns: [],
    };
  }

  function getData() { return loadData(); }

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  function getDayOfWeek() {
    return new Date().getDay(); // 0=Sun, 6=Sat
  }

  function isSchoolDay() {
    const dow = getDayOfWeek();
    return dow >= 1 && dow <= 5;
  }

  function isGameDay() {
    const dow = getDayOfWeek();
    // School days: Wed(3) and Fri(5) only; non-school: Sat(6), Sun(0) always
    if (!isSchoolDay()) return true;
    return dow === 3 || dow === 5;
  }

  function getScreenTimeLimit() {
    // School days with game time: 60 min (Wed, Fri)
    // Non-school days: 180 min
    // Other school days: 0
    if (!isSchoolDay()) return 180;
    if (isGameDay()) return 60;
    return 0;
  }

  function getTaskCompletions(dateStr) {
    const data = getData();
    return (data.taskCompletions && data.taskCompletions[dateStr]) || {};
  }

  function getChoreCompletions(dateStr) {
    const data = getData();
    return (data.choreCompletions && data.choreCompletions[dateStr]) || {};
  }

  function setTaskCompletion(dateStr, taskKey, value) {
    const data = getData();
    if (!data.taskCompletions) data.taskCompletions = {};
    if (!data.taskCompletions[dateStr]) data.taskCompletions[dateStr] = {};
    data.taskCompletions[dateStr][taskKey] = value;
    saveData(data);
  }

  function setChoreCompletion(dateStr, choreKey, value) {
    const data = getData();
    if (!data.choreCompletions) data.choreCompletions = {};
    if (!data.choreCompletions[dateStr]) data.choreCompletions[dateStr] = {};
    data.choreCompletions[dateStr][choreKey] = value;
    saveData(data);
  }

  function getScreenTimeLogs(dateStr) {
    const data = getData();
    return (data.screenTimeLogs || []).filter(l => l.date === dateStr);
  }

  function addScreenTimeLog(log) {
    const data = getData();
    if (!data.screenTimeLogs) data.screenTimeLogs = [];
    log.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    data.screenTimeLogs.push(log);
    saveData(data);
  }

  function deleteScreenTimeLog(id) {
    const data = getData();
    data.screenTimeLogs = (data.screenTimeLogs || []).filter(l => l.id !== id);
    saveData(data);
  }

  function getRewards() {
    return getData().rewards || [];
  }

  function addReward(reward) {
    const data = getData();
    if (!data.rewards) data.rewards = [];
    reward.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    reward.date = today();
    reward.grantedBy = currentUser.id;
    data.rewards.push(reward);
    saveData(data);
  }

  function getViolations() {
    return getData().violations || [];
  }

  function addViolation(violation) {
    const data = getData();
    if (!data.violations) data.violations = [];
    violation.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    violation.date = today();
    violation.loggedBy = currentUser.id;
    data.violations.push(violation);
    saveData(data);
  }

  function getCheckIns() {
    return getData().checkIns || [];
  }

  function addCheckIn(checkIn) {
    const data = getData();
    if (!data.checkIns) data.checkIns = [];
    checkIn.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    checkIn.date = today();
    checkIn.userId = currentUser.id;
    data.checkIns.push(checkIn);
    saveData(data);
  }

  // ===== COMPUTED =====
  function getCompletedActivities(dateStr) {
    const tasks = getTaskCompletions(dateStr);
    return ACTIVITIES.filter(a => {
      const t = tasks['aiden_activity_' + a.key];
      return t && t.completed;
    }).length;
  }

  function getCompletedChores(dateStr) {
    const chores = getChoreCompletions(dateStr);
    return CHORES.filter(c => {
      const ch = chores['aiden_chore_' + c.key];
      return ch && ch.completed;
    }).length;
  }

  function isSchoolworkDone(dateStr) {
    const tasks = getTaskCompletions(dateStr);
    const sw = tasks['aiden_schoolwork'];
    return sw && sw.completed;
  }

  function getTotalScreenTime(dateStr) {
    return getScreenTimeLogs(dateStr).reduce((sum, l) => sum + (l.minutes || 0), 0);
  }

  function areRequirementsMet(dateStr) {
    return isSchoolworkDone(dateStr) && getCompletedActivities(dateStr) >= 2 && getCompletedChores(dateStr) >= 6;
  }

  function isElectronicsEarned(dateStr) {
    return areRequirementsMet(dateStr) && isGameDay();
  }

  // ===== THEME =====
  function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('screenTimeTheme');
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('screenTimeTheme', next);
    render();
  }

  function isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ===== ROUTING =====
  function getRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    return hash;
  }

  function navigate(route) {
    window.location.hash = route;
    sidebarOpen = false;
    render();
  }

  window.addEventListener('hashchange', () => render());

  // ===== RENDER ENGINE =====
  const app = document.getElementById('app');

  function render() {
    if (!currentUser) {
      renderLogin();
      return;
    }
    const route = getRoute();
    let pageContent = '';
    let pageTitle = '';
    let pageDesc = '';

    switch (route) {
      case 'dashboard':
        pageTitle = 'Dashboard';
        pageDesc = 'Today\'s overview at a glance';
        pageContent = renderDashboard();
        break;
      case 'tasks':
        pageTitle = 'Daily Tasks';
        pageDesc = 'Complete schoolwork, activities, and chores';
        pageContent = renderTasks();
        break;
      case 'screen-time':
        pageTitle = 'Screen Time';
        pageDesc = 'Track and manage screen time usage';
        pageContent = renderScreenTime();
        break;
      case 'rewards':
        pageTitle = 'Rewards';
        pageDesc = 'Earn and track rewards';
        pageContent = renderRewards();
        break;
      case 'violations':
        if (currentUser.role !== 'parent') { navigate('dashboard'); return; }
        pageTitle = 'Violations';
        pageDesc = 'Track rule violations and consequences';
        pageContent = renderViolations();
        break;
      case 'check-ins':
        pageTitle = 'Check-Ins';
        pageDesc = 'Weekly Sunday check-ins';
        pageContent = renderCheckIns();
        break;
      case 'agreement':
        pageTitle = 'Agreement';
        pageDesc = 'The family electronics agreement';
        pageContent = renderAgreement();
        break;
      default:
        navigate('dashboard');
        return;
    }

    app.innerHTML = renderAppLayout(route, pageTitle, pageDesc, pageContent);
    attachEvents();
  }

  function renderAppLayout(route, pageTitle, pageDesc, pageContent) {
    const navItems = [
      { route: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
      { route: 'tasks', label: 'Daily Tasks', icon: ICONS.tasks },
      { route: 'screen-time', label: 'Screen Time', icon: ICONS.screenTime },
      { route: 'rewards', label: 'Rewards', icon: ICONS.rewards },
    ];

    if (currentUser.role === 'parent') {
      navItems.push({ route: 'violations', label: 'Violations', icon: ICONS.violations });
    }

    navItems.push(
      { route: 'check-ins', label: 'Check-Ins', icon: ICONS.checkIns },
      { route: 'agreement', label: 'Agreement', icon: ICONS.agreement },
    );

    const navHTML = navItems.map(item =>
      `<button class="nav-item ${route === item.route ? 'active' : ''}" data-nav="${item.route}">
        ${item.icon}
        <span>${item.label}</span>
      </button>`
    ).join('');

    const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][getDayOfWeek()];

    return `
      <div class="app-layout">
        <div class="mobile-header">
          <button class="hamburger" data-action="toggle-sidebar">${ICONS.menu}</button>
          <span class="mobile-header-title">${pageTitle}</span>
          <button class="hamburger" data-action="toggle-theme">
            ${isDarkMode() ? ICONS.sun : ICONS.moon}
          </button>
        </div>
        <div class="sidebar-overlay ${sidebarOpen ? 'active' : ''}" data-action="close-sidebar"></div>
        <nav class="sidebar ${sidebarOpen ? 'open' : ''}" role="navigation">
          <div class="sidebar-header">
            <div class="sidebar-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="3" y="5" width="26" height="17" rx="3" stroke="currentColor" stroke-width="2"/>
                <rect x="11" y="24" width="10" height="2" rx="1" fill="currentColor"/>
                <circle cx="16" cy="13" r="3.5" stroke="currentColor" stroke-width="2"/>
                <path d="M12 13h-2M22 13h-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <div>
                <div class="sidebar-logo-text">Screen Time</div>
                <div class="sidebar-logo-sub">${dayName} — ${isSchoolDay() ? 'School Day' : 'No School'}</div>
              </div>
            </div>
          </div>
          <div class="sidebar-nav">
            <div class="nav-section-label">Navigation</div>
            ${navHTML}
          </div>
          <div class="sidebar-footer">
            <button class="theme-toggle" data-action="toggle-theme">
              ${isDarkMode() ? ICONS.sun : ICONS.moon}
              <span>${isDarkMode() ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <div class="sidebar-user" data-action="logout">
              <div class="sidebar-user-avatar" style="background:${currentUser.color}">${currentUser.emoji}</div>
              <div class="sidebar-user-info">
                <div class="sidebar-user-name">${currentUser.name}</div>
                <div class="sidebar-user-role">${currentUser.role === 'parent' ? 'Parent' : 'Child'}</div>
              </div>
              ${ICONS.logout}
            </div>
          </div>
        </nav>
        <main class="main-content">
          <div class="page-header">
            <h1>${pageTitle}</h1>
            <p>${pageDesc}</p>
          </div>
          <div class="page-body">
            ${pageContent}
          </div>
        </main>
      </div>
    `;
  }

  // ===== LOGIN =====
  let pinTarget = null;
  let pinValue = '';
  let pinError = false;

  function renderLogin() {
    const userCards = USERS.map(u => `
      <button class="login-card" data-login-user="${u.id}">
        <div class="login-card-avatar" style="background:${u.color}">${u.emoji}</div>
        <div class="login-card-info">
          <h3>${u.name}</h3>
          <p>${u.role === 'parent' ? 'Parent' : 'Child'}</p>
        </div>
      </button>
    `).join('');

    let pinModal = '';
    if (pinTarget) {
      const user = USERS.find(u => u.id === pinTarget);
      const dots = Array.from({length:4}, (_,i) =>
        `<div class="pin-dot ${i < pinValue.length ? 'filled' : ''} ${pinError ? 'error' : ''}"></div>`
      ).join('');

      const keys = [1,2,3,4,5,6,7,8,9,'','0','⌫'].map(k => {
        if (k === '') return '<div></div>';
        if (k === '⌫') return `<button class="pin-key action" data-pin-key="back">⌫</button>`;
        return `<button class="pin-key" data-pin-key="${k}">${k}</button>`;
      }).join('');

      pinModal = `
        <div class="pin-overlay" data-action="close-pin">
          <div class="pin-modal" data-stop-propagation>
            <div class="pin-avatar" style="background:${user.color}">${user.emoji}</div>
            <div class="pin-name">${user.name}</div>
            <div class="pin-instruction">Enter your 4-digit PIN</div>
            <div class="pin-dots">${dots}</div>
            <div class="pin-pad">${keys}</div>
            <div class="pin-error-msg">${pinError ? 'Incorrect PIN. Try again.' : ''}</div>
          </div>
        </div>
      `;
    }

    app.innerHTML = `
      <div class="login-screen">
        <div class="login-container">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" style="margin:0 auto var(--space-4);">
            <rect x="3" y="5" width="26" height="17" rx="3" stroke="var(--color-primary)" stroke-width="2"/>
            <rect x="11" y="24" width="10" height="2" rx="1" fill="var(--color-primary)"/>
            <circle cx="16" cy="13" r="3.5" stroke="var(--color-primary)" stroke-width="2"/>
          </svg>
          <h1 class="login-title">Screen Time Tracker</h1>
          <p class="login-subtitle">Choose your profile to get started</p>
          <div class="login-cards">${userCards}</div>
        </div>
        ${pinModal}
      </div>
    `;
    attachLoginEvents();
  }

  function attachLoginEvents() {
    document.querySelectorAll('[data-login-user]').forEach(el => {
      el.addEventListener('click', () => {
        pinTarget = el.dataset.loginUser;
        pinValue = '';
        pinError = false;
        renderLogin();
      });
    });

    document.querySelectorAll('[data-pin-key]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = el.dataset.pinKey;
        if (key === 'back') {
          pinValue = pinValue.slice(0, -1);
          pinError = false;
          renderLogin();
        } else {
          pinValue += key;
          pinError = false;
          if (pinValue.length === 4) {
            const user = USERS.find(u => u.id === pinTarget);
            if (user && user.pin === pinValue) {
              currentUser = user;
              pinTarget = null;
              pinValue = '';
              navigate('dashboard');
            } else {
              pinError = true;
              pinValue = '';
              renderLogin();
            }
          } else {
            renderLogin();
          }
        }
      });
    });

    const overlay = document.querySelector('[data-action="close-pin"]');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          pinTarget = null;
          pinValue = '';
          pinError = false;
          renderLogin();
        }
      });
    }

    const modal = document.querySelector('[data-stop-propagation]');
    if (modal) {
      modal.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  // ===== DASHBOARD =====
  function renderDashboard() {
    const d = today();
    const completedActivities = getCompletedActivities(d);
    const completedChores = getCompletedChores(d);
    const schoolwork = isSchoolworkDone(d);
    const totalScreen = getTotalScreenTime(d);
    const limit = getScreenTimeLimit();
    const earned = isElectronicsEarned(d);
    const reqMet = areRequirementsMet(d);
    const gameDay = isGameDay();
    const remaining = Math.max(0, limit - totalScreen);

    const pct = limit > 0 ? Math.min(100, (totalScreen / limit) * 100) : 0;
    const progressClass = pct >= 100 ? 'danger' : pct >= 75 ? 'warning' : 'success';

    return `
      <div class="grid-4 mb-6">
        <div class="stat-card">
          <div class="stat-label">Tasks Done</div>
          <div class="stat-value">${completedActivities}<span style="font-size:var(--text-sm);font-weight:400;color:var(--color-text-muted)"> / 2+</span></div>
          <div class="stat-sub">Activities completed today</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Chores Done</div>
          <div class="stat-value">${completedChores}<span style="font-size:var(--text-sm);font-weight:400;color:var(--color-text-muted)"> / 6</span></div>
          <div class="stat-sub">All chores for today</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Screen Time</div>
          <div class="stat-value">${totalScreen}<span style="font-size:var(--text-sm);font-weight:400;color:var(--color-text-muted)">m / ${limit}m</span></div>
          <div class="progress-bar mt-2"><div class="progress-fill ${progressClass}" style="width:${pct}%"></div></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Day Type</div>
          <div class="stat-value" style="font-size:var(--text-lg)">${isSchoolDay() ? '📚 School' : '🏠 No School'}</div>
          <div class="stat-sub">${gameDay ? 'Game day' : 'No game time today'}</div>
        </div>
      </div>

      <div class="grid-2 mb-6">
        <div class="card">
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4)">
            <span class="badge ${earned ? 'badge-success' : 'badge-danger'}" style="font-size:var(--text-sm);padding:var(--space-1) var(--space-3)">
              ${earned ? '✓ Electronics Earned' : '✗ Electronics Not Earned'}
            </span>
          </div>
          <div class="card-subtitle">Requirements Checklist</div>
          <div class="checklist">
            <div class="checklist-item">
              <span class="checklist-icon ${schoolwork ? 'pass' : 'fail'}">${schoolwork ? ICONS.check : ICONS.x}</span>
              <span>Schoolwork and homework done</span>
            </div>
            <div class="checklist-item">
              <span class="checklist-icon ${completedActivities >= 2 ? 'pass' : 'fail'}">${completedActivities >= 2 ? ICONS.check : ICONS.x}</span>
              <span>2+ activities completed (${completedActivities}/2)</span>
            </div>
            <div class="checklist-item">
              <span class="checklist-icon ${completedChores >= 6 ? 'pass' : 'fail'}">${completedChores >= 6 ? ICONS.check : ICONS.x}</span>
              <span>All chores done (${completedChores}/6)</span>
            </div>
            <div class="checklist-item">
              <span class="checklist-icon ${gameDay ? 'pass' : 'fail'}">${gameDay ? ICONS.check : ICONS.x}</span>
              <span>Game day (${gameDay ? 'Yes' : 'No'})</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">${ICONS.clock} Game Time</div>
          ${earned ? `
            <div style="text-align:center;padding:var(--space-4) 0">
              <div style="font-size:var(--text-xl);font-weight:700;color:var(--color-success)">${remaining} min</div>
              <div class="text-sm text-muted mt-2">remaining of ${limit} min</div>
              <div class="progress-bar mt-4"><div class="progress-fill ${progressClass}" style="width:${pct}%"></div></div>
            </div>
          ` : `
            <div style="text-align:center;padding:var(--space-6) 0;color:var(--color-text-muted)">
              <div style="font-size:36px;margin-bottom:var(--space-2)">🔒</div>
              <p class="text-sm" style="margin:0 auto">${!gameDay ? 'No game time on this day.' : 'Complete all tasks and chores to unlock game time.'}</p>
            </div>
          `}
        </div>
      </div>

      <div class="flex gap-4 flex-wrap">
        <button class="btn btn-primary" data-nav="tasks">${ICONS.tasks} Go to Tasks</button>
        <button class="btn btn-secondary" data-nav="screen-time">${ICONS.screenTime} Log Screen Time</button>
      </div>
    `;
  }

  // ===== DAILY TASKS =====
  function renderTasks() {
    const d = today();
    const tasks = getTaskCompletions(d);
    const chores = getChoreCompletions(d);
    const isParent = currentUser.role === 'parent';

    // Schoolwork
    const swKey = 'aiden_schoolwork';
    const sw = tasks[swKey] || {};
    const swChecked = sw.completed ? 'checked' : '';
    const swVerified = sw.verified;

    // Activities
    const activityItems = ACTIVITIES.map(a => {
      const aKey = 'aiden_activity_' + a.key;
      const at = tasks[aKey] || {};
      const checked = at.completed ? 'checked' : '';
      const verified = at.verified;
      const notesVal = at.notes || '';
      return `
        <div class="checkbox-group ${at.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox-input" data-task="${aKey}" ${checked}>
          <div class="checkbox-label">
            <div class="checkbox-label-text">${a.label}</div>
            <div class="checkbox-label-sub">${a.time}</div>
            ${a.hasNotes ? `<div class="notes-inline" style="padding-left:0;margin-top:var(--space-2)"><input type="text" placeholder="What activity?" data-notes="${aKey}" value="${escapeAttr(notesVal)}" class="form-input" style="padding:var(--space-1) var(--space-2);font-size:var(--text-xs)"></div>` : ''}
          </div>
          <div class="checkbox-actions">
            ${verified ? '<span class="verified-badge">' + ICONS.verified + ' Verified</span>' : ''}
            ${isParent && at.completed && !verified ? '<button class="btn btn-sm btn-success" data-verify-task="' + aKey + '">Verify</button>' : ''}
          </div>
        </div>
      `;
    }).join('');

    const completedActs = getCompletedActivities(d);

    // Chores
    const choreItems = CHORES.map(c => {
      const cKey = 'aiden_chore_' + c.key;
      const ch = chores[cKey] || {};
      const checked = ch.completed ? 'checked' : '';
      const verified = ch.verified;
      return `
        <div class="checkbox-group ${ch.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox-input" data-chore="${cKey}" ${checked}>
          <div class="checkbox-label">
            <div class="checkbox-label-text">${c.label}</div>
          </div>
          <div class="checkbox-actions">
            ${verified ? '<span class="verified-badge">' + ICONS.verified + ' Verified</span>' : ''}
            ${isParent && ch.completed && !verified ? '<button class="btn btn-sm btn-success" data-verify-chore="' + cKey + '">Verify</button>' : ''}
          </div>
        </div>
      `;
    }).join('');

    const completedCh = getCompletedChores(d);

    return `
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">📝 Schoolwork</h2>
          <span class="badge ${sw.completed ? 'badge-success' : 'badge-neutral'}">${sw.completed ? 'Done' : 'Required'}</span>
        </div>
        <div class="card card-sm">
          <div class="checkbox-group ${sw.completed ? 'completed' : ''}">
            <input type="checkbox" class="checkbox-input" data-task="${swKey}" ${swChecked}>
            <div class="checkbox-label">
              <div class="checkbox-label-text">Schoolwork and homework fully done and checked</div>
            </div>
            <div class="checkbox-actions">
              ${swVerified ? '<span class="verified-badge">' + ICONS.verified + ' Verified</span>' : ''}
              ${isParent && sw.completed && !swVerified ? '<button class="btn btn-sm btn-success" data-verify-task="' + swKey + '">Verify</button>' : ''}
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2 class="section-title">🎯 Activities</h2>
          <span class="badge ${completedActs >= 2 ? 'badge-success' : 'badge-warning'}">${completedActs} / 2+</span>
        </div>
        <div class="card card-sm">
          <p class="text-sm text-muted mb-4">Pick 2 or more activities to complete today.</p>
          ${activityItems}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2 class="section-title">🧹 Chores</h2>
          <span class="badge ${completedCh >= 6 ? 'badge-success' : 'badge-warning'}">${completedCh} / 6</span>
        </div>
        <div class="card card-sm">
          ${choreItems}
        </div>
      </div>
    `;
  }

  // ===== SCREEN TIME =====
  function renderScreenTime() {
    const d = today();
    const totalScreen = getTotalScreenTime(d);
    const limit = getScreenTimeLimit();
    const earned = isElectronicsEarned(d);
    const isParent = currentUser.role === 'parent';
    const logs = getScreenTimeLogs(d);
    const pct = limit > 0 ? Math.min(100, (totalScreen / limit) * 100) : 0;
    const progressClass = pct >= 100 ? 'danger' : pct >= 75 ? 'warning' : 'success';

    const logItems = logs.map(l => `
      <div class="log-item">
        <div class="log-item-info">
          <div class="log-item-title">${escapeHtml(l.device)} — ${l.minutes} min</div>
          <div class="log-item-meta">${l.startTime ? l.startTime : ''}${l.startTime && l.endTime ? ' – ' + l.endTime : ''}${l.loggedBy ? ' • Logged by ' + (USERS.find(u=>u.id===l.loggedBy)||{}).name : ''}</div>
        </div>
        <div class="log-item-actions">
          ${isParent ? '<button class="btn btn-sm btn-danger" data-delete-log="' + l.id + '">' + ICONS.trash + '</button>' : ''}
        </div>
      </div>
    `).join('');

    return `
      <div class="card mb-6">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">
          <div>
            <div class="stat-label">Today's Usage</div>
            <div style="font-size:var(--text-xl);font-weight:700">${totalScreen} min <span style="font-size:var(--text-sm);font-weight:400;color:var(--color-text-muted)">/ ${limit} min</span></div>
          </div>
          <span class="badge ${earned ? 'badge-success' : 'badge-danger'}">${earned ? 'Earned' : 'Not Earned'}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill ${progressClass}" style="width:${pct}%"></div></div>
        ${!earned ? '<p class="text-sm text-muted mt-4">Tasks and chores must be completed before game time.</p>' : ''}
      </div>

      <div class="grid-2 mb-6">
        <div class="card">
          <h3 class="card-title">Log Screen Time</h3>
          <form id="screen-time-form" class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Device</label>
              <select class="form-select" name="device" required>
                <option value="">Select device...</option>
                <option value="Console">Console</option>
                <option value="PC">PC</option>
                <option value="Tablet">Tablet</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Minutes</label>
              <input type="number" class="form-input" name="minutes" min="1" max="300" required placeholder="e.g. 30">
            </div>
            <div class="grid-2 gap-4">
              <div class="form-group">
                <label class="form-label">Start Time (optional)</label>
                <input type="time" class="form-input" name="startTime">
              </div>
              <div class="form-group">
                <label class="form-label">End Time (optional)</label>
                <input type="time" class="form-input" name="endTime">
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-full">${ICONS.plus} Log Session</button>
          </form>
        </div>

        <div class="card">
          <h3 class="card-title">Today's Sessions</h3>
          ${logs.length === 0 ? `
            <div class="empty-state">
              ${ICONS.screenTime}
              <p>No screen time logged today.</p>
            </div>
          ` : logItems}
        </div>
      </div>
    `;
  }

  // ===== REWARDS =====
  function renderRewards() {
    const isParent = currentUser.role === 'parent';
    const rewards = getRewards();
    const sortedRewards = rewards.slice().sort((a,b) => b.date.localeCompare(a.date));

    return `
      <div class="info-card">
        <h3>${ICONS.star} How to Earn Rewards</h3>
        <ul>
          <li>Complete all tasks and chores consistently</li>
          <li>Show good behavior and responsibility</li>
          <li>Parents can grant extra game time, later bedtime, or custom rewards</li>
          <li>Rewards are tracked here for transparency</li>
        </ul>
      </div>

      ${isParent ? `
      <div class="card mb-6">
        <h3 class="card-title">Grant a Reward</h3>
        <form id="reward-form" class="flex flex-col gap-4">
          <div class="form-group">
            <label class="form-label">Reward Type</label>
            <select class="form-select" name="type" required>
              <option value="">Select reward...</option>
              <option value="Extra Game Time">Extra Game Time</option>
              <option value="Later Bedtime">Later Bedtime</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Reason</label>
            <input type="text" class="form-input" name="reason" required placeholder="Why is this reward being given?">
          </div>
          <div class="form-group">
            <label class="form-label">Details</label>
            <textarea class="form-textarea" name="details" placeholder="Additional details (e.g., how much extra time)"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">${ICONS.star} Grant Reward</button>
        </form>
      </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title mb-4">Reward History</h2>
        ${sortedRewards.length === 0 ? `
          <div class="empty-state card">
            ${ICONS.star}
            <p>No rewards granted yet.</p>
          </div>
        ` : `
          <div class="history-list">
            ${sortedRewards.map(r => `
              <div class="history-item">
                <div class="history-item-header">
                  <span class="badge badge-primary">${escapeHtml(r.type)}</span>
                  <span class="history-item-date">${formatDate(r.date)} • by ${(USERS.find(u=>u.id===r.grantedBy)||{}).name || 'Unknown'}</span>
                </div>
                <div class="history-item-content">
                  <strong>${escapeHtml(r.reason)}</strong>
                  ${r.details ? '<br>' + escapeHtml(r.details) : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  // ===== VIOLATIONS =====
  function renderViolations() {
    const violations = getViolations();
    const sorted = violations.slice().sort((a,b) => b.date.localeCompare(a.date));

    return `
      <div class="info-card">
        <h3>${ICONS.shield} Violation Guidelines</h3>
        <ul>
          <li><strong>First time:</strong> 30-minute loss of game time</li>
          <li><strong>Second time:</strong> No electronics for the day</li>
          <li><strong>Serious violation:</strong> 1–3 days without electronics</li>
        </ul>
      </div>

      <div class="card mb-6">
        <h3 class="card-title">Log a Violation</h3>
        <form id="violation-form" class="flex flex-col gap-4">
          <div class="form-group">
            <label class="form-label">Violation Type</label>
            <select class="form-select" name="type" required>
              <option value="">Select type...</option>
              <option value="Screen time exceeded">Screen time exceeded</option>
              <option value="Used device without permission">Used device without permission</option>
              <option value="Inappropriate content">Inappropriate content</option>
              <option value="Disrespectful behavior">Disrespectful behavior</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Consequence</label>
            <select class="form-select" name="consequence" required>
              <option value="">Select consequence...</option>
              <option value="30min loss">30-minute loss of game time</option>
              <option value="No electronics today">No electronics for the day</option>
              <option value="1 day ban">1 day without electronics</option>
              <option value="2 day ban">2 days without electronics</option>
              <option value="3 day ban">3 days without electronics</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-textarea" name="description" placeholder="What happened?" required></textarea>
          </div>
          <button type="submit" class="btn btn-danger">${ICONS.violations} Log Violation</button>
        </form>
      </div>

      <div class="section">
        <h2 class="section-title mb-4">Violation History</h2>
        ${sorted.length === 0 ? `
          <div class="empty-state card">
            ${ICONS.violations}
            <p>No violations recorded. Great job!</p>
          </div>
        ` : `
          <div class="history-list">
            ${sorted.map(v => `
              <div class="history-item">
                <div class="history-item-header">
                  <span class="badge badge-danger">${escapeHtml(v.type)}</span>
                  <span class="history-item-date">${formatDate(v.date)} • by ${(USERS.find(u=>u.id===v.loggedBy)||{}).name || 'Unknown'}</span>
                </div>
                <div class="history-item-content">
                  <strong>Consequence:</strong> ${escapeHtml(v.consequence)}<br>
                  ${escapeHtml(v.description)}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  // ===== CHECK-INS =====
  function renderCheckIns() {
    const checkIns = getCheckIns();
    const sorted = checkIns.slice().sort((a,b) => b.date.localeCompare(a.date));

    return `
      <div class="info-card">
        <h3>${ICONS.checkIns} Sunday Check-Ins</h3>
        <p>Every Sunday, we sit down as a family to reflect on the week. Talk about what went well, what was hard, and what adjustments to make.</p>
      </div>

      <div class="card mb-6">
        <h3 class="card-title">New Check-In</h3>
        <form id="checkin-form" class="flex flex-col gap-4">
          <div class="form-group">
            <label class="form-label">What went well this week?</label>
            <textarea class="form-textarea" name="wentWell" placeholder="Things that went smoothly..." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">What was hard?</label>
            <textarea class="form-textarea" name="wasHard" placeholder="Challenges or struggles..." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Any adjustments needed?</label>
            <textarea class="form-textarea" name="adjustments" placeholder="Changes for next week..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">${ICONS.checkIns} Save Check-In</button>
        </form>
      </div>

      <div class="section">
        <h2 class="section-title mb-4">Past Check-Ins</h2>
        ${sorted.length === 0 ? `
          <div class="empty-state card">
            ${ICONS.checkIns}
            <p>No check-ins recorded yet.</p>
          </div>
        ` : `
          <div class="history-list">
            ${sorted.map(c => `
              <div class="history-item">
                <div class="history-item-header">
                  <span class="badge badge-primary">Check-In</span>
                  <span class="history-item-date">${formatDate(c.date)} • ${(USERS.find(u=>u.id===c.userId)||{}).name || 'Unknown'}</span>
                </div>
                <div class="history-item-content">
                  <strong>Went well:</strong> ${escapeHtml(c.wentWell)}<br>
                  <strong>Was hard:</strong> ${escapeHtml(c.wasHard)}
                  ${c.adjustments ? '<br><strong>Adjustments:</strong> ' + escapeHtml(c.adjustments) : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  // ===== AGREEMENT =====
  function renderAgreement() {
    const sections = [
      {
        icon: '🎯',
        title: '1. Purpose',
        content: 'This agreement helps our family build healthy habits around screen time. Electronics are a privilege — not a right — earned through completing daily responsibilities.'
      },
      {
        icon: '📚',
        title: '2. Daily Requirements',
        content: `<ul>
          <li>All schoolwork and homework must be fully completed and checked</li>
          <li>Complete at least 2 activities: AOPS homework, Alcumus, oboe practice, outside play, taekwondo practice, or other non-screen activity</li>
          <li>All 6 chores must be done: Hops food/water, trash/recycling, clean room, pick up floor items, close drawers, pick up personal items</li>
        </ul>`
      },
      {
        icon: '🎮',
        title: '3. Screen Time Limits',
        content: `<ul>
          <li><strong>School days (Mon-Fri):</strong> 1 hour ONLY on Wednesday and Friday</li>
          <li><strong>No-school days (Sat-Sun):</strong> Up to 3 hours</li>
          <li>No screen time if daily tasks and chores are incomplete</li>
          <li>Screen time is a reward for responsibility, not an expectation</li>
        </ul>`
      },
      {
        icon: '🏆',
        title: '4. Rewards',
        content: 'Good behavior and consistent completion of tasks can earn extra rewards: additional game time, later bedtime, or custom rewards decided by parents.'
      },
      {
        icon: '⚠️',
        title: '5. Violations & Consequences',
        content: `<ul>
          <li><strong>First offense:</strong> 30-minute loss of game time</li>
          <li><strong>Second offense:</strong> No electronics for the day</li>
          <li><strong>Serious violation:</strong> 1-3 days without electronics</li>
          <li>Violations include: exceeding time, unauthorized use, inappropriate content, disrespectful behavior</li>
        </ul>`
      },
      {
        icon: '💬',
        title: '6. Weekly Check-Ins',
        content: 'Every Sunday, we review the week together. We discuss what went well, what was challenging, and whether any adjustments to the agreement are needed.'
      },
      {
        icon: '🤝',
        title: '7. Mutual Respect',
        content: 'This agreement works on trust. Aiden agrees to follow the rules honestly, and parents agree to be fair and consistent in enforcement. Open communication is key.'
      },
      {
        icon: '📋',
        title: '8. Changes & Updates',
        content: 'This agreement can be updated during Sunday check-ins if both parents and Aiden agree. Changes should be discussed openly and fairly.'
      },
    ];

    return sections.map(s => `
      <div class="agreement-section">
        <h3>
          <span class="icon-circle">${s.icon}</span>
          ${s.title}
        </h3>
        <div>${s.content.startsWith('<ul') ? s.content : '<p>' + s.content + '</p>'}</div>
      </div>
    `).join('');
  }

  // ===== EVENT HANDLING =====
  function attachEvents() {
    // Navigation
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(el.dataset.nav);
      });
    });

    // Sidebar toggle
    document.querySelectorAll('[data-action="toggle-sidebar"]').forEach(el => {
      el.addEventListener('click', () => {
        sidebarOpen = !sidebarOpen;
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.toggle('open', sidebarOpen);
        if (overlay) overlay.classList.toggle('active', sidebarOpen);
      });
    });

    document.querySelectorAll('[data-action="close-sidebar"]').forEach(el => {
      el.addEventListener('click', () => {
        sidebarOpen = false;
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
      });
    });

    // Theme toggle
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(el => {
      el.addEventListener('click', toggleTheme);
    });

    // Logout
    document.querySelectorAll('[data-action="logout"]').forEach(el => {
      el.addEventListener('click', () => {
        currentUser = null;
        window.location.hash = '';
        render();
      });
    });

    // Task checkboxes
    document.querySelectorAll('[data-task]').forEach(el => {
      el.addEventListener('change', () => {
        const key = el.dataset.task;
        const d = today();
        const current = getTaskCompletions(d)[key] || {};
        setTaskCompletion(d, key, {
          completed: el.checked,
          verified: el.checked ? current.verified : false,
          notes: current.notes || '',
        });
        render();
      });
    });

    // Task notes
    document.querySelectorAll('[data-notes]').forEach(el => {
      el.addEventListener('input', () => {
        const key = el.dataset.notes;
        const d = today();
        const current = getTaskCompletions(d)[key] || {};
        setTaskCompletion(d, key, {
          ...current,
          notes: el.value,
        });
      });
    });

    // Verify task
    document.querySelectorAll('[data-verify-task]').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.verifyTask;
        const d = today();
        const current = getTaskCompletions(d)[key] || {};
        setTaskCompletion(d, key, { ...current, verified: true });
        render();
      });
    });

    // Chore checkboxes
    document.querySelectorAll('[data-chore]').forEach(el => {
      el.addEventListener('change', () => {
        const key = el.dataset.chore;
        const d = today();
        const current = getChoreCompletions(d)[key] || {};
        setChoreCompletion(d, key, {
          completed: el.checked,
          verified: el.checked ? current.verified : false,
        });
        render();
      });
    });

    // Verify chore
    document.querySelectorAll('[data-verify-chore]').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.verifyChore;
        const d = today();
        const current = getChoreCompletions(d)[key] || {};
        setChoreCompletion(d, key, { ...current, verified: true });
        render();
      });
    });

    // Screen time form
    const stForm = document.getElementById('screen-time-form');
    if (stForm) {
      stForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(stForm);
        const device = fd.get('device');
        const minutes = parseInt(fd.get('minutes'), 10);
        if (!device || !minutes || minutes < 1) return;
        addScreenTimeLog({
          date: today(),
          device,
          minutes,
          startTime: fd.get('startTime') || '',
          endTime: fd.get('endTime') || '',
          loggedBy: currentUser.id,
        });
        render();
      });
    }

    // Delete log
    document.querySelectorAll('[data-delete-log]').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Delete this session?')) {
          deleteScreenTimeLog(el.dataset.deleteLog);
          render();
        }
      });
    });

    // Reward form
    const rForm = document.getElementById('reward-form');
    if (rForm) {
      rForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(rForm);
        const type = fd.get('type');
        const reason = fd.get('reason');
        if (!type || !reason) return;
        addReward({
          type,
          reason,
          details: fd.get('details') || '',
        });
        render();
      });
    }

    // Violation form
    const vForm = document.getElementById('violation-form');
    if (vForm) {
      vForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(vForm);
        const type = fd.get('type');
        const consequence = fd.get('consequence');
        const description = fd.get('description');
        if (!type || !consequence || !description) return;
        addViolation({ type, consequence, description });
        render();
      });
    }

    // Check-in form
    const ciForm = document.getElementById('checkin-form');
    if (ciForm) {
      ciForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(ciForm);
        const wentWell = fd.get('wentWell');
        const wasHard = fd.get('wasHard');
        if (!wentWell || !wasHard) return;
        addCheckIn({
          wentWell,
          wasHard,
          adjustments: fd.get('adjustments') || '',
        });
        render();
      });
    }
  }

  // ===== HELPERS =====
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(parts[1],10)-1] + ' ' + parseInt(parts[2],10) + ', ' + parts[0];
  }

  // ===== INIT =====
  initTheme();
  render();

})();
