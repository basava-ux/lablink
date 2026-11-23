// ============================================================
// LabLink – Responsive Shell Layout, Role-Based Sidebar & Navbar
// File: layout.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Unified Layout Wrapper
  // ------------------------------------------------------------
  window.renderLayout = function (role, page, contentHtml) {
    return `
      <div class="app-layout">
        ${window.renderSidebar(role, page)}
        <div class="main-content">
          ${window.renderNavbar(role, page)}
          <main class="page-content">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Role-Based Sidebar Navigation (Parts 3 & 17)
  // ------------------------------------------------------------
  window.renderSidebar = function (role, page) {
    const user = window.AppState?.currentUser || { name: 'User', role: 'student', avatar: 'U' };
    const unreadCount = (window.LabLinkData?.notifications || []).filter(n => n.userId === user.id && !n.read).length;
    const pendingReqCount = (window.LabLinkData?.bookingRequests || []).filter(r => r.status === 'pending').length;

    // Define navigation structure per user role
    const navigationConfig = {
      student: [
        { id: 'dashboard', icon: 'home', label: 'Dashboard' },
        { id: 'discover', icon: 'search', label: 'Discover Equipment' },
        { id: 'autopilot', icon: 'sparkles', label: 'AI Autopilot', isNew: true },
        { id: 'builder', icon: 'wrench', label: 'Prototype Builder', isNew: true },
        { id: 'watch-build', icon: 'play-circle', label: 'Watch & Build' },
        { id: 'bookings', icon: 'calendar', label: 'My Bookings' },
        { id: 'portfolio', icon: 'folder-git-2', label: 'Project Portfolio' },
        { id: 'team', icon: 'users', label: 'Team Workspace' },
        { id: 'notifications', icon: 'bell', label: 'Notifications', count: unreadCount > 0 ? unreadCount : null },
        { id: 'compatibility', icon: 'link', label: 'Compatibility Check' },
        { id: 'troubleshoot', icon: 'help-circle', label: 'AI Troubleshooter' }
      ],
      faculty: [
        { id: 'dashboard', icon: 'layout-dashboard', label: 'Faculty Dashboard' },
        { id: 'requests', icon: 'clipboard-list', label: 'Approval Requests', count: pendingReqCount > 0 ? pendingReqCount : null },
        { id: 'equipment', icon: 'wrench', label: 'Equipment Manager' },
        { id: 'portfolio', icon: 'folder-git-2', label: 'Student Capstones' },
        { id: 'notifications', icon: 'bell', label: 'Notifications', count: unreadCount > 0 ? unreadCount : null }
      ],
      admin: [
        { id: 'dashboard', icon: 'bar-chart-2', label: 'System Overview' },
        { id: 'heatmap', icon: 'map', label: 'Campus Heatmap' },
        { id: 'equipment', icon: 'cpu', label: 'Equipment Registry' },
        { id: 'users', icon: 'users', label: 'User Accounts' },
        { id: 'portfolio', icon: 'folder-git-2', label: 'Innovation Portfolio' }
      ]
    };

    const navItems = navigationConfig[role] || navigationConfig.student;

    return `
      <aside class="sidebar" id="sidebar">
        <!-- Brand Logo Header -->
        <div class="sidebar-logo">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#2563EB"/>
            <path d="M15 8h10M17 8v10l-6 12a2 2 0 001.8 2.8h14.4A2 2 0 0029 30.8L23 18V8"
                  stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="17" cy="27" r="1.5" fill="#38BDF8"/>
            <circle cx="22" cy="30" r="1" fill="#7DD3FC"/>
            <circle cx="25" cy="26" r="1.2" fill="#BAE6FD"/>
          </svg>
          <span class="sidebar-logo-text" style="color:#0A192F;font-weight:900;">Lab<span style="color:#2563EB;">Link</span></span>
        </div>

        <!-- Authenticated User Profile Summary -->
        <div class="sidebar-user">
          <div class="user-avatar">${user.avatar || 'U'}</div>
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-role">${user.role} • ${user.department ? user.department.split(' ')[0] : 'Campus'}</div>
          </div>
          <span class="badge badge-${role === 'admin' ? 'danger' : role === 'faculty' ? 'info' : 'success'}" style="font-size:10px;text-transform:uppercase;">
            ${role}
          </span>
        </div>

        <!-- Role-Specific Navigation Menu -->
        <nav class="sidebar-nav">
          ${navItems.map(item => `
            <div class="sidebar-item ${page === item.id ? 'active' : ''}"
                 data-action="navigate"
                 data-id="${item.id}">
              <i data-lucide="${item.icon}" style="width:18px;height:18px;flex-shrink:0;"></i>
              <span style="flex:1;">${item.label}</span>
              ${item.isNew ? '<span class="sidebar-badge new" style="background:#0EA5E9;">AI</span>' : ''}
              ${item.count ? `<span class="sidebar-badge">${item.count}</span>` : ''}
            </div>
          `).join('')}
        </nav>

        <!-- Sidebar Footer & Quick Role Switcher -->
        <div class="sidebar-footer">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;font-weight:600;text-transform:uppercase;">
            Demo Quick Switch
          </div>
          <div style="display:flex;gap:6px;margin-bottom:12px;">
            <button class="btn btn-secondary btn-xs" data-action="quick-login" data-id="student1" title="Switch to Student (Alice)">
              👩‍🎓 Student
            </button>
            <button class="btn btn-secondary btn-xs" data-action="quick-login" data-id="faculty1" title="Switch to Faculty (Dr. Sarah)">
              👩‍🏫 Faculty
            </button>
            <button class="btn btn-secondary btn-xs" data-action="quick-login" data-id="admin" title="Switch to Administrator">
              ⚙️ Admin
            </button>
          </div>
          <div class="sidebar-item" data-action="logout" style="color:var(--danger);padding:8px 10px;">
            <i data-lucide="log-out" style="width:16px;height:16px;"></i>
            <span>Sign Out</span>
          </div>
        </div>
      </aside>
    `;
  };

  // ------------------------------------------------------------
  // 3. Top Navbar
  // ------------------------------------------------------------
  window.renderNavbar = function (role, page) {
    const user = window.AppState?.currentUser || { name: 'User', avatar: 'U' };
    const unreadCount = (window.LabLinkData?.notifications || []).filter(n => n.userId === user.id && !n.read).length;

    const pageTitles = {
      dashboard: role === 'admin' ? 'Operations Intelligence Hub' : role === 'faculty' ? 'Faculty Command Center' : 'Student Innovation Workspace',
      discover: 'Visual Equipment Discovery Marketplace',
      autopilot: 'AI Experiment Autopilot',
      builder: 'Interactive AI Prototype Builder',
      'watch-build': 'Interactive Watch & Build Studio',
      bookings: 'Laboratory Reservations & History',
      portfolio: 'Project Portfolio & Showcase',
      team: 'Team Collaborative Workspace',
      compatibility: 'Equipment Compatibility Checker',
      troubleshoot: 'AI Hardware Diagnostic Troubleshooter',
      notifications: 'System Notifications & Alerts',
      requests: 'Faculty Approval Queue',
      equipment: role === 'admin' ? 'Master Equipment Directory' : 'Lab Equipment Manager',
      heatmap: 'Campus Resource Heatmap',
      users: 'User Account Management'
    };

    return `
      <nav class="navbar">
        <div class="navbar-left">
          <button class="nav-icon-btn" id="sidebar-toggle" data-action="toggle-sidebar" style="display:none;" aria-label="Toggle Navigation">
            <i data-lucide="menu" style="width:18px;height:18px;"></i>
          </button>
          <div>
            <div style="font-size:11px;color:#0284C7;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">
              ${role} Portal • University Lab Ecosystem
            </div>
            <div class="navbar-title">${pageTitles[page] || 'LabLink Workspace'}</div>
          </div>
        </div>

        <div class="navbar-right">
          <!-- Global Search Input -->
          <div class="search-wrapper" style="width:240px;display:none;" id="global-search-container">
            <i data-lucide="search" style="width:16px;height:16px;"></i>
            <input type="text"
                   class="input"
                   placeholder="Search equipment, projects..."
                   style="padding:6px 10px 6px 36px;font-size:13px;border-radius:20px;"
                   onkeydown="if(event.key==='Enter'){window.navigate('discover');}">
          </div>

          <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="watch-build" style="border-color:#38BDF8;color:#0284C7;">
            <i data-lucide="play" style="width:14px;height:14px;"></i>
            <span>Watch & Build</span>
          </button>

          <button class="nav-icon-btn" data-action="navigate" data-id="notifications" title="View Notifications">
            <i data-lucide="bell" style="width:18px;height:18px;"></i>
            ${unreadCount > 0 ? `<span class="notif-dot">${unreadCount}</span>` : ''}
          </button>

          <div class="user-profile-pill" onclick="window.showToast('Logged in as ${user.name} (${user.email})', 'info')">
            <div class="user-avatar" style="width:26px;height:26px;font-size:11px;">${user.avatar || 'U'}</div>
            <span style="font-size:13px;font-weight:600;color:var(--text);">${user.name.split(' ')[0]}</span>
            <i data-lucide="chevron-down" style="width:14px;height:14px;color:var(--text-muted);"></i>
          </div>
        </div>
      </nav>
    `;
  };

  // ------------------------------------------------------------
  // 4. Attach Layout Listeners
  // ------------------------------------------------------------
  window.attachLayoutListeners = function () {
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
      if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'flex';
      }
    }

    const searchBox = document.getElementById('global-search-container');
    if (searchBox && window.innerWidth >= 1024) {
      searchBox.style.display = 'flex';
    }

    window.toggleSidebar = function () {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('mobile-open');
    };

    if (window.lucide) lucide.createIcons();
  };

})();
