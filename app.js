// ============================================================
// LabLink – Central Application State, Router, Toasts & Modals
// File: app.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Reactive Application State
  // ------------------------------------------------------------
  window.AppState = {
    currentUser: null,
    currentPage: 'dashboard',
    bookingTab: 'all',
    filters: { search: '', department: '', status: '', sort: 'name' },
    autopilotResult: null,
    selectedEquipment: []
  };

  // ------------------------------------------------------------
  // 2. Navigation & Render Engine
  // ------------------------------------------------------------
  window.navigate = function (page) {
    window.AppState.currentPage = page;
    window.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.render = function () {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    // Hide initial splash loader if present
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => { loader.style.display = 'none'; }, 300);
    }

    // If no authenticated user, mount login experience
    if (!window.AppState.currentUser) {
      appEl.innerHTML = window.renderLoginPage ? window.renderLoginPage() : '<h2>Please log in.</h2>';
      if (window.attachLoginListeners) window.attachLoginListeners();
      if (window.lucide) lucide.createIcons();
      return;
    }

    const role = window.AppState.currentUser.role;
    const page = window.AppState.currentPage;
    let pageContent = '';

    // Route dispatching by role
    if (role === 'student') {
      switch (page) {
        case 'dashboard':
          pageContent = window.renderStudentDashboard ? window.renderStudentDashboard() : '';
          break;
        case 'discover':
          pageContent = window.renderDiscoverPage ? window.renderDiscoverPage() : '';
          break;
        case 'autopilot':
          pageContent = window.renderAutopilotPage ? window.renderAutopilotPage() : '';
          break;
        case 'builder':
          pageContent = window.renderBuilderPage ? window.renderBuilderPage() : '';
          break;
        case 'watch-build':
          pageContent = window.renderWatchBuildPage ? window.renderWatchBuildPage() : '';
          break;
        case 'bookings':
          pageContent = window.renderBookingsPage ? window.renderBookingsPage() : '';
          break;
        case 'portfolio':
          pageContent = window.renderPortfolioPage ? window.renderPortfolioPage() : '';
          break;
        case 'team':
          pageContent = window.renderTeamPage ? window.renderTeamPage() : '';
          break;
        case 'compatibility':
          pageContent = window.renderCompatibilityPage ? window.renderCompatibilityPage() : '';
          break;
        case 'troubleshoot':
          pageContent = window.renderBuilderPage ? window.renderBuilderPage() : '';
          setTimeout(() => { window.switchBuilderTab && window.switchBuilderTab('troubleshoot'); }, 50);
          break;
        case 'notifications':
          pageContent = window.renderNotificationsPage ? window.renderNotificationsPage() : '';
          break;
        default:
          pageContent = window.renderStudentDashboard ? window.renderStudentDashboard() : '';
      }
    } else if (role === 'faculty') {
      switch (page) {
        case 'dashboard':
        case 'requests':
          pageContent = window.renderFacultyDashboard ? window.renderFacultyDashboard() : '';
          break;
        case 'equipment':
          pageContent = window.renderFacultyEquipmentPage ? window.renderFacultyEquipmentPage() : '';
          break;
        case 'portfolio':
          pageContent = window.renderPortfolioPage ? window.renderPortfolioPage() : '';
          break;
        case 'notifications':
          pageContent = window.renderNotificationsPage ? window.renderNotificationsPage() : '';
          break;
        default:
          pageContent = window.renderFacultyDashboard ? window.renderFacultyDashboard() : '';
      }
    } else if (role === 'admin') {
      switch (page) {
        case 'dashboard':
          pageContent = window.renderAdminDashboard ? window.renderAdminDashboard() : '';
          break;
        case 'heatmap':
          pageContent = window.renderAdminHeatmap ? window.renderAdminHeatmap() : '';
          break;
        case 'equipment':
          pageContent = window.renderAdminEquipmentPage ? window.renderAdminEquipmentPage() : '';
          break;
        case 'users':
          pageContent = window.renderAdminUsersPage ? window.renderAdminUsersPage() : '';
          break;
        case 'portfolio':
          pageContent = window.renderPortfolioPage ? window.renderPortfolioPage() : '';
          break;
        default:
          pageContent = window.renderAdminDashboard ? window.renderAdminDashboard() : '';
      }
    }

    // Wrap page content inside layout shell (sidebar + navbar)
    appEl.innerHTML = window.renderLayout
      ? window.renderLayout(role, page, pageContent)
      : pageContent;

    // Attach listeners
    if (window.attachLayoutListeners) window.attachLayoutListeners();

    if (role === 'student' && window.attachStudentListeners) window.attachStudentListeners();
    if (role === 'faculty' && window.attachFacultyListeners) window.attachFacultyListeners();
    if (role === 'admin' && window.attachAdminListeners) window.attachAdminListeners();

    if (page === 'discover' && window.attachDiscoverListeners) window.attachDiscoverListeners();
    if (page === 'autopilot' && window.attachAutopilotListeners) window.attachAutopilotListeners();

    if (window.lucide) lucide.createIcons();
  };

  // ------------------------------------------------------------
  // 3. Toast Notification System
  // ------------------------------------------------------------
  window.showToast = function (message, type = 'success', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span style="font-size:16px;font-weight:bold;">${iconMap[type] || '•'}</span>
      <div style="flex:1;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => { toast.remove(); }, 200);
    }, duration);
  };
  var showToast = window.showToast;
  var openModal = window.openModal;
  var closeModal = window.closeModal;

  // ------------------------------------------------------------
  // 4. Modal System
  // ------------------------------------------------------------
  window.openModal = function (htmlContent, options = {}) {
    const container = document.getElementById('modal-container');
    if (!container) return;

    const maxWidth = options.size === 'large' ? '840px' : options.size === 'medium' ? '680px' : '620px';

    container.innerHTML = `
      <div class="modal-overlay" onclick="window.closeModal()">
        <div class="modal" style="max-width:${maxWidth};" onclick="event.stopPropagation()">
          ${htmlContent}
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  };

  window.closeModal = function () {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
  };

  // ------------------------------------------------------------
  // 5. Formatting & Utility Helpers
  // ------------------------------------------------------------
  window.formatDate = function (dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  window.formatRelativeTime = function (dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - d) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return window.formatDate(dateStr);
  };

  window.generateId = function () {
    return 'id_' + Math.random().toString(36).slice(2, 9);
  };

  window.debounce = function (fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // ------------------------------------------------------------
  // 6. Authentication & Session
  // ------------------------------------------------------------
  window.logout = function () {
    localStorage.removeItem('lablink_user');
    window.AppState.currentUser = null;
    window.AppState.currentPage = 'dashboard';
    window.showToast('You have signed out.', 'info');
    window.render();
  };

  // ------------------------------------------------------------
  // 7. Global Event Delegation
  // ------------------------------------------------------------
  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const id = target.dataset.id;

    const actionMap = {
      'navigate': () => window.navigate(id),
      'logout': () => window.logout(),
      'quick-login': () => window.handleQuickLogin && window.handleQuickLogin(id),
      'view-equipment': () => window.openEquipmentDetail && window.openEquipmentDetail(id),
      'book-equipment': () => window.openBookingForm && window.openBookingForm(id),
      'cancel-booking': () => window.cancelBooking && window.cancelBooking(id),
      'approve-booking': () => window.approveBooking && window.approveBooking(id),
      'reject-booking': () => window.rejectBooking && window.rejectBooking(id),
      'mark-read': () => window.markNotificationRead && window.markNotificationRead(id),
      'mark-all-read': () => window.markAllNotificationsRead && window.markAllNotificationsRead(),
      'close-modal': () => window.closeModal(),
      'toggle-sidebar': () => window.toggleSidebar && window.toggleSidebar(),
      'analyze-project': () => {
        const desc = document.getElementById('project-description')?.value;
        if (desc && window.triggerAutopilotAnalysis) {
          window.triggerAutopilotAnalysis(desc);
        } else {
          window.showToast?.('Please describe your experiment or pick an example.', 'warning');
        }
      },
      'quick-example': () => {
        const ta = document.getElementById('project-description');
        if (ta && id) ta.value = id;
      },
      'run-compat-check': () => window.checkCompatibility && window.checkCompatibility(),
      'rescue-mode': () => window.openRescueModePanel && window.openRescueModePanel(id),
      'set-booking-tab': () => {
        window.AppState.bookingTab = id;
        window.render();
      }
    };

    if (actionMap[action]) {
      e.preventDefault();
      actionMap[action]();
    }
  });

  // ------------------------------------------------------------
  // 8. Bootstrap Application on DOM Ready
  // ------------------------------------------------------------
  function init() {
    // Attempt restoring saved demo user session
    try {
      const saved = localStorage.getItem('lablink_user');
      if (saved) {
        window.AppState.currentUser = JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed restoring user session:', err);
    }

    // Default to student demo user (Alice Chen) if not logged in, for immediate instant preview
    if (!window.AppState.currentUser) {
      const defaultUser = window.LabLinkData?.getUserByEmail('alice@university.edu');
      if (defaultUser) {
        window.AppState.currentUser = defaultUser;
      }
    }

    window.render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
