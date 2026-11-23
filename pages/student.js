// ============================================================
// LabLink – Student Dashboard, Bookings, Compatibility, Notifications
// File: pages/student.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // Helper: Mini Booking Card for Dashboard
  // ------------------------------------------------------------
  function renderMiniBooking(booking) {
    const eq = window.LabLinkData?.getEquipmentById(booking.equipmentId);
    const start = window.formatDate ? window.formatDate(booking.startDate) : new Date(booking.startDate).toLocaleDateString();
    const isMaintenance = eq?.status === 'Maintenance';

    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid var(--border);border-radius:var(--radius-md);margin-bottom:10px;background:#fff;gap:14px;">
        <img src="${eq?.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'}"
             alt="${eq?.name || 'Equipment'}"
             style="width:52px;height:52px;border-radius:var(--radius-sm);object-fit:cover;flex-shrink:0;">
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:14px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${eq?.name || 'Unknown Equipment'}
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
            ${booking.bookingNumber} • ${start}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="badge badge-${booking.status === 'approved' || booking.status === 'active' ? 'success' : booking.status === 'pending' ? 'warning' : 'secondary'}">
            ${booking.status}
          </span>
          ${isMaintenance ? `
            <button class="btn btn-warning btn-xs" data-action="rescue-mode" data-id="${eq.id}">
              Rescue Mode
            </button>` : ''}
          <button class="btn btn-ghost btn-xs" style="color:var(--danger);" data-action="cancel-booking" data-id="${booking.id}">
            Cancel
          </button>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------
  // 1. Student Dashboard View (Part 3 & Part 4)
  // ------------------------------------------------------------
  window.renderStudentDashboard = function () {
    const user = window.AppState?.currentUser || { name: 'Alice Chen', department: 'Computer Science', id: 'u1' };
    const allBookings = window.LabLinkData?.bookings || [];
    const myBookings = allBookings.filter(b => b.userId === user.id);
    const activeBookings = myBookings.filter(b => b.status === 'active' || b.status === 'approved');
    const pendingBookings = myBookings.filter(b => b.status === 'pending');
    const completedCount = myBookings.filter(b => b.status === 'completed').length;
    const totalHoursReserved = myBookings.length * 4;

    const projects = window.LabLinkData?.getAllProjects ? window.LabLinkData.getAllProjects() : [];
    const activeProject = projects[0] || {
      title: 'Autonomous Line-Following Robot',
      progressPercent: 35,
      currentStage: 'Stage 3: Motor Driver & Power Wiring',
      id: 'line-follower-robot'
    };

    const recommendedEquipment = (window.LabLinkData?.equipment || [])
      .filter(e => e.department === user.department || e.availableQuantity > 0)
      .slice(0, 4);

    return `
      <div class="dashboard-container">
        <!-- Futuristic Hero Section (Part 3 Reference) -->
        <div class="futuristic-hero">
          <div class="hero-content">
            <div class="hero-pill">
              ✨ Next-Gen University Innovation Hub
            </div>
            <h1 class="hero-title">
              Your Ideas Deserve a Laboratory.
            </h1>
            <p class="hero-subtitle">
              Discover resources, build prototypes and turn your imagination into innovation. Seamlessly book precision instruments, generate wiring diagrams, and follow interactive assembly guides.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" data-action="navigate" data-id="autopilot" style="box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);">
                ✨ Launch AI Autopilot
              </button>
              <button class="btn btn-secondary btn-lg" data-action="navigate" data-id="discover">
                🔬 Explore Equipment
              </button>
              <button class="btn btn-ghost" data-action="navigate" data-id="watch-build" style="color:#0284C7;font-weight:700;">
                📺 Watch & Build Studio →
              </button>
            </div>
          </div>

          <!-- 3D Floating Microchip & Holographic Sphere Illustration -->
          <div class="hero-3d-visual">
            <div class="floating-chip">
              <div class="chip-pin pin-top-1"></div>
              <div class="chip-pin pin-top-2"></div>
              <div class="chip-pin pin-top-3"></div>
              <div class="chip-pin pin-top-4"></div>
              <div class="chip-pin pin-bot-1"></div>
              <div class="chip-pin pin-bot-2"></div>
              <div class="chip-pin pin-bot-3"></div>
              <div class="chip-pin pin-bot-4"></div>
              <div class="chip-core">
                <i data-lucide="cpu" style="width:34px;height:34px;"></i>
              </div>
            </div>
            <div class="floating-orb"></div>
          </div>
        </div>

        <!-- Dashboard Statistics (Part 3: 4 Key Metrics) -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background:#EFF6FF;color:#2563EB;">📅</div>
            <div class="stat-value">${activeBookings.length}</div>
            <div class="stat-label">Active Reservations</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FEF3C7;color:#D97706;">⏳</div>
            <div class="stat-value">${pendingBookings.length}</div>
            <div class="stat-label">Pending Approvals</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#ECFDF5;color:#059669;">🔬</div>
            <div class="stat-value">${completedCount + 3}</div>
            <div class="stat-label">Equipment Usage</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#F5F3FF;color:#7C3AED;">⏱️</div>
            <div class="stat-value">${activeBookings.length + pendingBookings.length}</div>
            <div class="stat-label">Upcoming Bookings</div>
          </div>
        </div>

        <!-- Active Projects & Prototype Construction Progress -->
        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <div>
              <h2>🚀 Active Prototypes & Engineering Progress</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Direct synchronization with the AI Prototype Builder</p>
            </div>
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="builder">
              Open Prototype Builder →
            </button>
          </div>

          <div class="project-progress-card">
            <div style="display:flex;align-items:center;gap:16px;">
              <div style="width:52px;height:52px;border-radius:14px;background:#EEF2FF;color:#2563EB;display:flex;align-items:center;justify-content:center;font-size:24px;border:1px solid #C7D2FE;">
                🤖
              </div>
              <div>
                <h3 style="font-size:16px;font-weight:700;color:var(--text);">${activeProject.title}</h3>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
                  Current Milestone: <strong style="color:#0284C7;">${activeProject.currentStage}</strong> • Target: EL-101
                </div>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:20px;">
              <div style="min-width:140px;">
                <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;">
                  <span style="color:var(--text-secondary);">Stage Progress</span>
                  <span style="color:#2563EB;">${activeProject.progressPercent}%</span>
                </div>
                <div class="progress-bar" style="height:6px;">
                  <div class="progress-fill" style="width:${activeProject.progressPercent}%;background:#2563EB;"></div>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="window.launchProjectBuilder('${activeProject.id}')">
                Continue Build
              </button>
            </div>
          </div>
        </div>

        <!-- AI Autopilot Feature Showcase Card -->
        <div class="ai-card" style="margin-bottom:28px;">
          <div class="ai-badge">🚀 SIGNATURE FEATURE • DEMO READY</div>
          <h2 style="font-size:24px;margin-bottom:10px;">AI Experiment Autopilot</h2>
          <p style="margin-bottom:20px;">
            Describe your academic experiment in plain English. Our engine maps your project objectives,
            recommends certified equipment combinations, checks real-time inventory, and schedules lab access.
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button class="btn btn-secondary" data-action="navigate" data-id="autopilot" style="font-weight:700;">
              ✨ Describe Your Project
            </button>
            <button class="btn btn-ghost" data-action="navigate" data-id="compatibility" style="color:#fff;border-color:rgba(255,255,255,0.3);">
              🔗 Run Compatibility Check
            </button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:24px;margin-bottom:28px;">
          <!-- Active Bookings List -->
          <div class="card">
            <div class="card-header">
              <h2>Current & Upcoming Bookings</h2>
              <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="bookings">
                View All (${myBookings.length})
              </button>
            </div>
            ${activeBookings.length > 0
              ? activeBookings.slice(0, 4).map(renderMiniBooking).join('')
              : `<div style="text-align:center;padding:32px 16px;color:var(--text-muted);">
                   <div style="font-size:36px;margin-bottom:8px;">🔬</div>
                   <p>No active reservations right now.</p>
                   <button class="btn btn-primary btn-sm" style="margin-top:12px;" data-action="navigate" data-id="discover">
                     Explore Equipment
                   </button>
                 </div>`
            }
          </div>

          <!-- Recent Audit Timeline -->
          <div class="card">
            <div class="card-header">
              <h2>Recent Activity</h2>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${myBookings.slice(0, 4).map(b => {
                const eq = window.LabLinkData?.getEquipmentById(b.equipmentId);
                const icon = b.status === 'approved' ? '✅' : b.status === 'pending' ? '⏳' : b.status === 'completed' ? '🏁' : '📋';
                return `
                  <div style="display:flex;align-items:flex-start;gap:12px;font-size:13px;">
                    <span style="font-size:18px;">${icon}</span>
                    <div style="flex:1;">
                      <div style="font-weight:600;color:var(--text);">
                        ${b.bookingNumber} • ${eq?.name || 'Equipment'}
                      </div>
                      <div style="color:var(--text-secondary);font-size:12px;margin-top:2px;">
                        Status: <strong style="text-transform:capitalize;">${b.status}</strong> •
                        ${window.formatRelativeTime ? window.formatRelativeTime(b.createdAt) : 'Recently'}
                      </div>
                    </div>
                  </div>
                `;
              }).join('') || '<p style="color:var(--text-muted);font-size:13px;">No recent lab logs.</p>'}
            </div>
          </div>
        </div>

        <!-- Recommended Equipment Row -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Recommended Equipment for Your Program</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Curated based on your major in ${user.department}</p>
            </div>
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="discover">
              Open Full Marketplace
            </button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;">
            ${recommendedEquipment.map(eq => `
              <div style="border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;background:#fff;display:flex;flex-direction:column;">
                <img src="${eq.imageUrl}" alt="${eq.name}" style="height:120px;width:100%;object-fit:cover;">
                <div style="padding:14px;display:flex;flex-direction:column;flex:1;">
                  <div style="font-size:11px;font-weight:700;color:var(--primary);text-transform:uppercase;margin-bottom:4px;">
                    ${eq.department}
                  </div>
                  <div style="font-weight:700;font-size:14px;margin-bottom:8px;line-height:1.3;">
                    ${eq.name}
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:10px;">
                    <span class="badge badge-${eq.availableQuantity > 0 ? 'success' : 'danger'}" style="font-size:11px;">
                      ${eq.availableQuantity} of ${eq.totalQuantity} Avail
                    </span>
                    <button class="btn btn-primary btn-sm" data-action="book-equipment" data-id="${eq.id}" ${eq.availableQuantity === 0 ? 'disabled' : ''}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Student Bookings Page View
  // ------------------------------------------------------------
  window.renderBookingsPage = function () {
    const user = window.AppState?.currentUser || { id: 'u1' };
    const bookings = (window.LabLinkData?.bookings || []).filter(b => b.userId === user.id);
    const activeTab = window.AppState?.bookingTab || 'all';

    const filtered = activeTab === 'all'
      ? bookings
      : bookings.filter(b => b.status === activeTab);

    const tabsList = ['all', 'active', 'approved', 'pending', 'completed', 'cancelled'];

    return `
      <div>
        <div class="page-header">
          <div>
            <h1>My Laboratory Bookings</h1>
            <p>Manage, reschedule, and monitor the live approval status of your lab reservations</p>
          </div>
          <button class="btn btn-primary" data-action="navigate" data-id="discover">
            + New Booking
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="tabs" style="margin-bottom:24px;">
          ${tabsList.map(tab => {
            const count = tab === 'all'
              ? bookings.length
              : bookings.filter(b => b.status === tab).length;
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            return `
              <button class="tab ${activeTab === tab ? 'active' : ''}"
                      data-action="set-booking-tab"
                      data-id="${tab}">
                ${label} (${count})
              </button>
            `;
          }).join('')}
        </div>

        <!-- Bookings List -->
        <div class="bookings-list" style="display:flex;flex-direction:column;gap:16px;">
          ${filtered.length === 0 ? `
            <div class="card" style="text-align:center;padding:48px 24px;">
              <div style="font-size:48px;margin-bottom:12px;">📭</div>
              <h3 style="font-size:18px;font-weight:700;margin-bottom:6px;">No ${activeTab} reservations found</h3>
              <p style="color:var(--text-secondary);margin-bottom:16px;">Explore our equipment marketplace to book lab apparatus.</p>
              <button class="btn btn-primary" data-action="navigate" data-id="discover">
                Browse Equipment Catalog
              </button>
            </div>
          ` : filtered.map(b => {
            const eq = window.LabLinkData?.getEquipmentById(b.equipmentId);
            const canCancel = ['pending', 'approved', 'active'].includes(b.status);
            const isMaintenance = eq?.status === 'Maintenance';
            const startFmt = window.formatDate ? window.formatDate(b.startDate) : b.startDate;
            const endFmt = window.formatDate ? window.formatDate(b.endDate) : b.endDate;

            return `
              <div class="card" style="padding:20px;border-left:4px solid ${b.status === 'approved' || b.status === 'active' ? 'var(--success)' : b.status === 'pending' ? 'var(--warning)' : 'var(--border)'};">
                <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;">
                  <img src="${eq?.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'}"
                       alt="${eq?.name}"
                       style="width:96px;height:96px;border-radius:var(--radius-md);object-fit:cover;flex-shrink:0;">
                  
                  <div style="flex:1;min-width:260px;">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;gap:12px;">
                      <div>
                        <h3 style="font-size:18px;font-weight:700;color:var(--text);margin-bottom:2px;">
                          ${eq?.name || 'Equipment'}
                        </h3>
                        <div style="font-size:13px;color:var(--text-secondary);">
                          ${eq?.department || 'Department'} • ${eq?.labName || 'Lab'} (${eq?.labRoom || ''})
                        </div>
                      </div>
                      <span class="badge badge-${b.status === 'approved' || b.status === 'active' ? 'success' : b.status === 'pending' ? 'warning' : 'secondary'}" style="font-size:13px;padding:4px 12px;">
                        ${b.status.toUpperCase()}
                      </span>
                    </div>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;background:var(--surface-alt);padding:12px;border-radius:var(--radius-md);margin:12px 0;">
                      <div>
                        <span style="font-size:11px;color:var(--text-muted);display:block;text-transform:uppercase;font-weight:600;">Booking ID</span>
                        <strong style="font-size:13px;">${b.bookingNumber}</strong>
                      </div>
                      <div>
                        <span style="font-size:11px;color:var(--text-muted);display:block;text-transform:uppercase;font-weight:600;">Reservation Start</span>
                        <strong style="font-size:13px;">${startFmt}</strong>
                      </div>
                      <div>
                        <span style="font-size:11px;color:var(--text-muted);display:block;text-transform:uppercase;font-weight:600;">Reservation End</span>
                        <strong style="font-size:13px;">${endFmt}</strong>
                      </div>
                      <div>
                        <span style="font-size:11px;color:var(--text-muted);display:block;text-transform:uppercase;font-weight:600;">Allocated Qty</span>
                        <strong style="font-size:13px;">${b.quantity} Unit(s)</strong>
                      </div>
                    </div>

                    ${b.purpose ? `
                      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;">
                        <strong>Research Purpose:</strong> ${b.purpose}
                      </div>
                    ` : ''}

                    ${isMaintenance ? `
                      <div class="rescue-alert" style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                        <div>
                          <strong>🚨 Equipment Rescue Mode Triggered:</strong>
                          This equipment is currently undergoing maintenance. Tap below to find cross-department substitutes.
                        </div>
                        <button class="btn btn-warning btn-sm" data-action="rescue-mode" data-id="${eq.id}">
                          Find Substitutes
                        </button>
                      </div>
                    ` : ''}

                    ${eq?.requiresFacultyApproval && b.status === 'pending' ? `
                      <div style="margin-top:10px;padding:8px 12px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:var(--radius-sm);font-size:13px;color:#92400E;">
                        ⏳ Awaiting Faculty review from ${eq.labName} supervisor.
                      </div>
                    ` : ''}

                    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:14px;">
                      <button class="btn btn-secondary btn-sm" data-action="view-equipment" data-id="${eq?.id}">
                        Device Details
                      </button>
                      ${canCancel ? `
                        <button class="btn btn-danger btn-sm" data-action="cancel-booking" data-id="${b.id}">
                          Cancel Reservation
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 3. Notifications Page View
  // ------------------------------------------------------------
  window.renderNotificationsPage = function () {
    const user = window.AppState?.currentUser || { id: 'u1' };
    const notifs = (window.LabLinkData?.notifications || []).filter(n => n.userId === user.id);
    const unreadCount = notifs.filter(n => !n.read).length;

    return `
      <div>
        <div class="page-header">
          <div>
            <h1>Notifications & Alerts</h1>
            <p>Real-time booking confirmations, faculty approvals, and schedule notifications</p>
          </div>
          ${unreadCount > 0 ? `
            <button class="btn btn-secondary btn-sm" data-action="mark-all-read">
              ✓ Mark All Read (${unreadCount})
            </button>
          ` : ''}
        </div>

        <div class="card" style="padding:0;overflow:hidden;">
          ${notifs.length === 0 ? `
            <div style="text-align:center;padding:48px 24px;color:var(--text-muted);">
              <div style="font-size:36px;margin-bottom:8px;">🔔</div>
              <p>No notifications yet.</p>
            </div>
          ` : notifs.map(n => {
            const icon = n.type === 'approval' ? '✅'
              : n.type === 'rejection' ? '❌'
              : n.type === 'maintenance_alert' ? '🔧'
              : n.type === 'alternative_suggested' ? '🔄'
              : n.type === 'reminder' ? '⏰'
              : '📋';

            return `
              <div style="display:flex;align-items:flex-start;gap:16px;padding:18px 24px;border-bottom:1px solid var(--border);background:${n.read ? '#fff' : 'var(--primary-light)'};cursor:pointer;transition:background 150ms ease;"
                   data-action="mark-read"
                   data-id="${n.id}">
                <div style="font-size:22px;flex-shrink:0;margin-top:2px;">${icon}</div>
                <div style="flex:1;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <strong style="font-size:14px;color:var(--text);">${n.title}</strong>
                    <span style="font-size:12px;color:var(--text-muted);">
                      ${window.formatRelativeTime ? window.formatRelativeTime(n.createdAt) : 'Recently'}
                    </span>
                  </div>
                  <div style="font-size:13px;color:var(--text-secondary);line-height:1.4;">
                    ${n.message}
                  </div>
                </div>
                ${!n.read ? '<div style="width:8px;height:8px;border-radius:50%;background:var(--primary);margin-top:8px;flex-shrink:0;"></div>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 4. Equipment Compatibility Checker View
  // ------------------------------------------------------------
  window.renderCompatibilityPage = function () {
    return `
      <div>
        <div class="ai-card" style="margin-bottom:28px;">
          <div class="ai-badge">🔗 HARDWARE COMPATIBILITY ENGINE</div>
          <h1>Multi-Device Compatibility Checker</h1>
          <p>
            Avoid experiment failure in the lab. Select up to 5 laboratory components and let our engine
            verify technical electrical compatibility, physical connection limits, and identify missing accessories.
          </p>
        </div>

        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <h2>Step 1: Select Equipment to Test</h2>
            <span style="font-size:12px;color:var(--text-muted);">Maximum 5 devices</span>
          </div>

          <div class="search-wrapper" style="margin-bottom:16px;">
            <i data-lucide="search" style="width:18px;height:18px;"></i>
            <input id="compat-search"
                   class="input"
                   placeholder="Type to search and add equipment (e.g. Arduino, Oscilloscope, Laser)..."
                   autocomplete="off">
          </div>

          <div id="compat-search-results" style="display:none;border:1px solid var(--border);border-radius:var(--radius-md);max-height:220px;overflow-y:auto;background:#fff;box-shadow:var(--shadow-md);margin-bottom:16px;"></div>

          <div style="margin-top:14px;">
            <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
              Selected Equipment Stack:
            </div>
            <div id="selected-equipment-container">
              <!-- Dynamically populated chips -->
            </div>
          </div>

          <div style="margin-top:24px;">
            <button class="btn btn-primary btn-lg" data-action="run-compat-check">
              🔍 Run Compatibility Analysis
            </button>
          </div>
        </div>

        <!-- Analysis Results Output Mount -->
        <div id="compatibility-results" style="display:none;" class="card">
          <div class="card-header">
            <h2>Compatibility Diagnostic Report</h2>
          </div>
          <div id="compat-output"></div>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // Compatibility Analysis Logic
  // ------------------------------------------------------------
  window.checkCompatibility = function () {
    const selectedIds = window.AppState?.selectedEquipment || [];
    if (selectedIds.length < 2) {
      window.showToast?.('Please add at least 2 pieces of equipment to check compatibility.', 'warning');
      return;
    }

    const items = selectedIds
      .map(id => window.LabLinkData?.getEquipmentById(id))
      .filter(Boolean);

    let issues = [];
    let warnings = [];
    let missingAccessories = [];
    let isFullyCompatible = true;

    // Check multi-department location warning
    const departments = [...new Set(items.map(e => e.department))];
    if (departments.length > 1) {
      warnings.push(`Equipment is distributed across ${departments.length} departments (${departments.join(', ')}). Plan inter-building checkout time.`);
    }

    // Inspect accessory dependencies
    items.forEach(eq => {
      if (eq.accessories && Array.isArray(eq.accessories)) {
        eq.accessories.forEach(acc => {
          missingAccessories.push({ equipment: eq.name, accessory: acc });
        });
      }
    });

    // Check mutual compatibility
    items.forEach((itemA, i) => {
      items.forEach((itemB, j) => {
        if (i !== j) {
          // If neither lists the other, and departments conflict heavily without adapters
          if (itemA.category === 'Laser Sources' && itemB.category === 'Molecular Biology') {
            issues.push(`Optical hazard mismatch: ${itemA.name} requires laser safety enclosure in OP-401, incompatible with biosafety hood in BIO-601.`);
            isFullyCompatible = false;
          }
        }
      });
    });

    const statusBadgeClass = isFullyCompatible && issues.length === 0 ? 'compat-success' : 'rescue-alert';
    const statusTitle = isFullyCompatible && issues.length === 0
      ? '✅ All Selected Devices are Compatible'
      : '⚠️ Technical Compatibility Warnings Detected';

    const outputHtml = `
      <div class="${statusBadgeClass}" style="margin-bottom:20px;font-size:14px;font-weight:600;">
        ${statusTitle}
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;">Selected Hardware Stack (${items.length}):</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;">
          ${items.map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-md);background:#fff;">
              <img src="${item.imageUrl}" style="width:40px;height:40px;border-radius:var(--radius-sm);object-fit:cover;">
              <div>
                <strong style="font-size:13px;display:block;">${item.name}</strong>
                <span style="font-size:11px;color:var(--text-muted);">${item.department}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${issues.length > 0 ? `
        <div style="margin-bottom:20px;">
          <h4 style="font-size:14px;font-weight:700;color:var(--danger);margin-bottom:8px;">Critical Conflicts:</h4>
          ${issues.map(iss => `<div style="padding:10px 14px;background:#FEE2E2;border-left:4px solid var(--danger);border-radius:var(--radius-sm);font-size:13px;margin-bottom:6px;color:#991B1B;">⚠️ ${iss}</div>`).join('')}
        </div>
      ` : ''}

      ${warnings.length > 0 ? `
        <div style="margin-bottom:20px;">
          <h4 style="font-size:14px;font-weight:700;color:var(--warning);margin-bottom:8px;">Logistical Recommendations:</h4>
          ${warnings.map(w => `<div style="padding:10px 14px;background:#FEF3C7;border-left:4px solid var(--warning);border-radius:var(--radius-sm);font-size:13px;margin-bottom:6px;color:#92400E;">ℹ️ ${w}</div>`).join('')}
        </div>
      ` : ''}

      <div style="margin-bottom:24px;">
        <h4 style="font-size:14px;font-weight:700;margin-bottom:8px;">Required Cables & Accessories to Request at Lab Counter:</h4>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${missingAccessories.slice(0, 8).map(m => `
            <span style="background:var(--surface-alt);border:1px solid var(--border);padding:4px 10px;border-radius:var(--radius-full);font-size:12px;">
              🔌 ${m.accessory} (for ${m.equipment})
            </span>
          `).join('')}
        </div>
      </div>

      <div style="display:flex;gap:12px;">
        <button class="btn btn-primary" onclick="window.bookCompatibleSet()">
          📋 Request Full Compatible Set
        </button>
        <button class="btn btn-secondary" onclick="document.getElementById('compatibility-results').style.display='none'">
          Reset Analysis
        </button>
      </div>
    `;

    const outEl = document.getElementById('compat-output');
    if (outEl) outEl.innerHTML = outputHtml;

    const resEl = document.getElementById('compatibility-results');
    if (resEl) {
      resEl.style.display = 'block';
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.bookCompatibleSet = function () {
    const selectedIds = window.AppState?.selectedEquipment || [];
    let count = 0;

    selectedIds.forEach(id => {
      const eq = window.LabLinkData?.getEquipmentById(id);
      if (eq && eq.availableQuantity > 0) {
        const booking = {
          id: 'bk-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          bookingNumber: 'BK-' + Math.floor(Math.random() * 90000 + 10000),
          equipmentId: eq.id,
          userId: window.AppState?.currentUser?.id || 'u1',
          quantity: 1,
          startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
          purpose: 'Compatible set bundle request',
          status: eq.requiresFacultyApproval ? 'pending' : 'approved',
          createdAt: new Date().toISOString()
        };
        window.LabLinkData?.bookings.push(booking);
        eq.availableQuantity = Math.max(0, eq.availableQuantity - 1);
        count++;
      }
    });

    window.showToast?.(`Successfully created ${count} reservation(s) for your compatible set!`, 'success');
    window.navigate?.('bookings');
  };

  // ------------------------------------------------------------
  // Compatibility Multi-Select Helpers
  // ------------------------------------------------------------
  window.addToCompatibilityCheck = function (equipmentId) {
    if (!window.AppState.selectedEquipment) window.AppState.selectedEquipment = [];

    if (window.AppState.selectedEquipment.includes(equipmentId)) {
      window.showToast?.('Device is already in your compatibility stack', 'info');
      return;
    }

    if (window.AppState.selectedEquipment.length >= 5) {
      window.showToast?.('Maximum 5 components can be tested simultaneously', 'warning');
      return;
    }

    window.AppState.selectedEquipment.push(equipmentId);

    const searchInput = document.getElementById('compat-search');
    if (searchInput) searchInput.value = '';

    const resultsEl = document.getElementById('compat-search-results');
    if (resultsEl) resultsEl.style.display = 'none';

    window.updateSelectedEquipmentChips();
  };

  window.removeFromCompatibility = function (equipmentId) {
    window.AppState.selectedEquipment = (window.AppState.selectedEquipment || []).filter(id => id !== equipmentId);
    window.updateSelectedEquipmentChips();
  };

  window.updateSelectedEquipmentChips = function () {
    const container = document.getElementById('selected-equipment-container');
    if (!container) return;

    const selectedIds = window.AppState.selectedEquipment || [];
    if (selectedIds.length === 0) {
      container.innerHTML = `<span style="color:var(--text-muted);font-size:13px;">No items selected yet. Search above to add items.</span>`;
      return;
    }

    const items = selectedIds.map(id => window.LabLinkData?.getEquipmentById(id)).filter(Boolean);

    container.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${items.map(eq => `
          <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:var(--primary-light);border:1px solid var(--primary-border);border-radius:var(--radius-full);font-size:13px;font-weight:600;color:var(--primary);">
            <span>${eq.name}</span>
            <span onclick="window.removeFromCompatibility('${eq.id}')"
                  style="cursor:pointer;color:var(--danger);font-size:16px;line-height:1;font-weight:800;">
              ×
            </span>
          </div>
        `).join('')}
      </div>
    `;
  };

  // ------------------------------------------------------------
  // Global Student Actions
  // ------------------------------------------------------------
  window.cancelBooking = function (bookingId) {
    const b = window.LabLinkData?.bookings.find(item => item.id === bookingId);
    if (!b) return;

    if (!confirm(`Are you sure you want to cancel reservation ${b.bookingNumber}?`)) return;

    b.status = 'cancelled';
    const eq = window.LabLinkData?.getEquipmentById(b.equipmentId);
    if (eq) {
      eq.availableQuantity = Math.min(eq.totalQuantity, eq.availableQuantity + (b.quantity || 1));
    }

    window.showToast?.(`Reservation ${b.bookingNumber} has been cancelled. Inventory restored.`, 'info');
    window.render?.();
  };

  window.markNotificationRead = function (notifId) {
    const n = window.LabLinkData?.notifications.find(item => item.id === notifId);
    if (n) {
      n.read = true;
      window.render?.();
    }
  };

  window.markAllNotificationsRead = function () {
    const user = window.AppState?.currentUser;
    if (!user) return;

    (window.LabLinkData?.notifications || [])
      .filter(n => n.userId === user.id)
      .forEach(n => { n.read = true; });

    window.showToast?.('All notifications marked as read', 'success');
    window.render?.();
  };

  // ------------------------------------------------------------
  // Attach Event Listeners for Student Views
  // ------------------------------------------------------------
  window.attachStudentListeners = function () {
    // 1. Initialise compatibility chips display if container exists
    window.updateSelectedEquipmentChips();

    // 2. Compatibility live search input
    const compatInput = document.getElementById('compat-search');
    const resultsEl = document.getElementById('compat-search-results');

    if (compatInput && resultsEl) {
      compatInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        if (query.length < 2) {
          resultsEl.style.display = 'none';
          return;
        }

        const matches = (window.LabLinkData?.equipment || [])
          .filter(e => e.name.toLowerCase().includes(query) || e.department.toLowerCase().includes(query))
          .slice(0, 6);

        if (matches.length === 0) {
          resultsEl.innerHTML = `<div style="padding:12px;color:var(--text-muted);font-size:13px;">No equipment matched "${query}"</div>`;
        } else {
          resultsEl.innerHTML = matches.map(m => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid var(--border);cursor:pointer;"
                 onclick="window.addToCompatibilityCheck('${m.id}')">
              <img src="${m.imageUrl}" style="width:36px;height:36px;border-radius:var(--radius-sm);object-fit:cover;">
              <div style="flex:1;">
                <strong style="font-size:13px;color:var(--text);">${m.name}</strong>
                <span style="font-size:11px;color:var(--text-muted);display:block;">${m.department} • ${m.availableQuantity} available</span>
              </div>
              <span class="btn btn-secondary btn-xs">+ Add</span>
            </div>
          `).join('');
        }
        resultsEl.style.display = 'block';
      });
    }

    if (window.lucide) lucide.createIcons();
  };

  window.launchProjectBuilder = function (projectId) {
    if (!window.AppState) window.AppState = {};
    window.AppState.activeProjectId = projectId || 'line-follower-robot';
    window.navigate('builder');
  };

})();
