// ============================================================
// LabLink – Administrator Dashboard, Campus Heatmap, Inventory & Users
// File: pages/admin.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Admin Overview Dashboard View
  // ------------------------------------------------------------
  window.renderAdminDashboard = function () {
    const equipment = window.LabLinkData?.equipment || [];
    const bookings = window.LabLinkData?.bookings || [];
    const users = window.LabLinkData?.users || [];
    const labs = window.LabLinkData?.labs || [];

    const totalEquipment = equipment.length;
    const availableEquipment = equipment.filter(e => e.status === 'Available').length;
    const maintenanceEquipment = equipment.filter(e => e.status === 'Maintenance' || e.condition === 'Under Maintenance').length;
    const activeBookings = bookings.filter(b => ['active', 'approved'].includes(b.status)).length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;

    // Calculate department utilization
    const departments = ['Electronics', 'Mechanical', 'Chemistry', 'Optics & Photonics', 'Computer Science', 'Biology'];
    const deptStats = departments.map(dept => {
      const deptItems = equipment.filter(e => e.department === dept);
      const totalUnits = deptItems.reduce((acc, e) => acc + (Number(e.totalQuantity) || 1), 0);
      const availUnits = deptItems.reduce((acc, e) => acc + (Number(e.availableQuantity) || 0), 0);
      const bookedUnits = Math.max(0, totalUnits - availUnits);
      const percent = totalUnits > 0 ? Math.round((bookedUnits / totalUnits) * 100) : 0;
      return { dept, totalUnits, availUnits, bookedUnits, percent };
    });

    // Top 5 Most Popular Equipment
    const popularEquipment = [...equipment]
      .sort((a, b) => (b.totalQuantity - b.availableQuantity) - (a.totalQuantity - a.availableQuantity))
      .slice(0, 5);

    return `
      <div class="dashboard-container">
        <!-- Admin Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <h1>Campus Laboratory Operations Management</h1>
            <p>University-wide infrastructure intelligence, scheduling metrics, and campus resource distribution</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="heatmap">
              🗺️ Campus Heatmap
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.showToast('System audit log exported to CSV', 'success')">
              📥 Export Audit
            </button>
          </div>
        </div>

        <!-- 8 KPI Metrics Cards in Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:28px;">
          <div class="stat-card">
            <div class="stat-icon" style="background:#EEF2FF;color:#4F46E5;">🔬</div>
            <div class="stat-value">${totalEquipment}</div>
            <div class="stat-label">Total Apparatuses</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#D1FAE5;color:#059669;">✅</div>
            <div class="stat-value">${availableEquipment}</div>
            <div class="stat-label">Fully Available</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#EFF6FF;color:#2563EB;">📅</div>
            <div class="stat-value">${activeBookings}</div>
            <div class="stat-label">Active Checkouts</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FEE2E2;color:#DC2626;">🚨</div>
            <div class="stat-value">${maintenanceEquipment}</div>
            <div class="stat-label">Under Maintenance</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FEF3C7;color:#D97706;">⏳</div>
            <div class="stat-value">${pendingBookings}</div>
            <div class="stat-label">Pending Authorizations</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#F0FDF4;color:#16A34A;">👥</div>
            <div class="stat-value">${users.length}</div>
            <div class="stat-label">Registered Accounts</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FAF5FF;color:#9333EA;">🏢</div>
            <div class="stat-value">${labs.length}</div>
            <div class="stat-label">Specialised Facilities</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FFF7ED;color:#C2410C;">📊</div>
            <div class="stat-value">${bookings.length}</div>
            <div class="stat-label">All-Time Bookings</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:24px;margin-bottom:28px;">
          <!-- Department Utilization -->
          <div class="card">
            <div class="card-header">
              <h2>Campus Department Resource Utilization</h2>
              <span style="font-size:12px;color:var(--text-muted);">Real-time inventory load</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${deptStats.map(d => {
                const color = d.percent >= 75 ? 'var(--danger)' : d.percent >= 45 ? 'var(--warning)' : 'var(--success)';
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;margin-bottom:6px;">
                      <strong style="color:var(--text);">${d.dept}</strong>
                      <span style="color:var(--text-secondary);font-size:12px;">
                        <strong>${d.percent}%</strong> (${d.bookedUnits}/${d.totalUnits} units in use)
                      </span>
                    </div>
                    <div class="progress-bar" style="height:8px;">
                      <div class="progress-fill" style="width:${d.percent}%;background:${color};"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Most Demanded Apparatus -->
          <div class="card">
            <div class="card-header">
              <h2>Most Popular Equipment</h2>
              <span style="font-size:12px;color:var(--text-muted);">Ranked by checkout volume</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${popularEquipment.map((eq, idx) => {
                const util = Math.round(((eq.totalQuantity - eq.availableQuantity) / eq.totalQuantity) * 100);
                return `
                  <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);">
                    <div style="width:24px;font-weight:800;color:var(--text-muted);font-size:14px;text-align:center;">
                      #${idx + 1}
                    </div>
                    <img src="${eq.imageUrl}" style="width:40px;height:40px;border-radius:var(--radius-sm);object-fit:cover;">
                    <div style="flex:1;min-width:0;">
                      <strong style="font-size:13px;color:var(--text);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        ${eq.name}
                      </strong>
                      <span style="font-size:11px;color:var(--text-muted);">${eq.department} • ${eq.labRoom}</span>
                    </div>
                    <div style="text-align:right;">
                      <span class="badge badge-${util >= 70 ? 'danger' : 'info'}" style="font-size:11px;">
                        ${util}% Utilized
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Campus Audit Trail -->
        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <h2>Campus Real-Time Audit Log</h2>
            <span style="font-size:12px;color:var(--text-muted);">Last 10 system transactions</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${bookings.slice(-10).reverse().map(b => {
              const eq = window.LabLinkData?.getEquipmentById(b.equipmentId);
              const userObj = users.find(u => u.id === b.userId);
              const icon = b.status === 'approved' ? '✅' : b.status === 'pending' ? '⏳' : b.status === 'cancelled' ? '❌' : '📋';

              return `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border);border-radius:var(--radius-md);background:#fff;gap:12px;">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:18px;">${icon}</span>
                    <div>
                      <strong style="font-size:13px;color:var(--text);">${userObj?.name || 'Student'}</strong>
                      <span style="color:var(--text-secondary);font-size:13px;"> reserved </span>
                      <strong style="font-size:13px;color:var(--primary);">${eq?.name || 'Apparatus'}</strong>
                      <span style="font-size:12px;color:var(--text-muted);"> (${b.bookingNumber})</span>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:12px;">
                    <span class="badge badge-${b.status === 'approved' || b.status === 'active' ? 'success' : b.status === 'pending' ? 'warning' : 'secondary'}">
                      ${b.status}
                    </span>
                    <span style="font-size:12px;color:var(--text-muted);">
                      ${window.formatRelativeTime ? window.formatRelativeTime(b.createdAt) : 'Recently'}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Quick Administration Hub -->
        <div class="card">
          <div class="card-header">
            <h2>Administrative Operations Hub</h2>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button class="btn btn-primary" data-action="navigate" data-id="heatmap">
              🗺️ Open Live Campus Heatmap
            </button>
            <button class="btn btn-secondary" data-action="navigate" data-id="equipment">
              🔬 Master Equipment Register
            </button>
            <button class="btn btn-secondary" data-action="navigate" data-id="users">
              👥 Manage Campus User Accounts
            </button>
            <button class="btn btn-ghost" onclick="window.showToast('Synchronized with University LDAP (Demo)', 'info')">
              🔄 Sync Directory
            </button>
          </div>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Campus Resource Heatmap View
  // ------------------------------------------------------------
  window.renderAdminHeatmap = function () {
    const labs = window.LabLinkData?.labs || [];
    const equipment = window.LabLinkData?.equipment || [];

    function calculateLabLoad(labId) {
      const items = equipment.filter(e => e.labId === labId);
      if (items.length === 0) return { percent: 0, total: 0, available: 0, busy: 0, maint: 0 };
      const total = items.reduce((acc, e) => acc + (Number(e.totalQuantity) || 1), 0);
      const available = items.reduce((acc, e) => acc + (Number(e.availableQuantity) || 0), 0);
      const maint = items.filter(e => e.status === 'Maintenance').reduce((acc, e) => acc + (Number(e.totalQuantity) || 1), 0);
      const busy = Math.max(0, total - available - maint);
      const percent = total > 0 ? Math.round(((total - available) / total) * 100) : 0;
      return { percent, total, available, busy, maint, count: items.length };
    }

    const buildings = [...new Set(labs.map(l => l.building))];

    return `
      <div>
        <div class="page-header" style="align-items:center;">
          <div>
            <h1>Campus Laboratory Resource Heatmap</h1>
            <p>Live spatial utilization monitoring, capacity bottlenecks, and physical facility drilldowns</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="badge badge-success" style="animation:pulse 2s infinite;padding:6px 14px;font-size:12px;">
              ● Real-Time Telemetry Active
            </span>
          </div>
        </div>

        <!-- Heatmap Legend -->
        <div class="card" style="margin-bottom:24px;padding:16px 20px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
            <span style="font-weight:700;font-size:13px;color:var(--text);">Utilization Color Coding:</span>
            <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;font-size:13px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:16px;height:16px;background:#D1FAE5;border:2px solid #10B981;border-radius:4px;"></div>
                <span>🟢 Low Load (&lt; 40%)</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:16px;height:16px;background:#FEF3C7;border:2px solid #F59E0B;border-radius:4px;"></div>
                <span>🟡 Moderate (40% - 75%)</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:16px;height:16px;background:#FEE2E2;border:2px solid #EF4444;border-radius:4px;"></div>
                <span>🔴 High Contention (&gt; 75%)</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:16px;height:16px;background:#E0E7FF;border:2px solid #6366F1;border-radius:4px;"></div>
                <span>🔵 Maintenance Active</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Campus Buildings Map Grid -->
        <div style="display:flex;flex-direction:column;gap:24px;margin-bottom:32px;">
          ${buildings.map(bldg => {
            const bldgLabs = labs.filter(l => l.building === bldg);
            return `
              <div class="card" style="padding:22px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
                  <span style="font-size:22px;">🏛️</span>
                  <div>
                    <h2 style="font-size:17px;font-weight:800;color:var(--text);margin:0;">${bldg}</h2>
                    <span style="font-size:12px;color:var(--text-muted);">${bldgLabs.length} Specialised Lab Rooms</span>
                  </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px;">
                  ${bldgLabs.map(lab => {
                    const stats = calculateLabLoad(lab.id);
                    const hasMaint = stats.maint > 0;
                    
                    let bg = '#F0FDF4';
                    let border = '#10B981';
                    let text = '#065F46';
                    let statusLabel = '🟢 High Availability';

                    if (hasMaint) {
                      bg = '#EEF2FF';
                      border = '#6366F1';
                      text = '#3730A3';
                      statusLabel = '🔵 Maintenance In-Progress';
                    } else if (stats.percent >= 75) {
                      bg = '#FEF2F2';
                      border = '#EF4444';
                      text = '#991B1B';
                      statusLabel = '🔴 High Contention';
                    } else if (stats.percent >= 40) {
                      bg = '#FFFBEB';
                      border = '#F59E0B';
                      text = '#92400E';
                      statusLabel = '🟡 Moderate Traffic';
                    }

                    return `
                      <div style="background:${bg};border:2px solid ${border};border-radius:var(--radius-lg);padding:18px;cursor:pointer;transition:transform 200ms ease, box-shadow 200ms ease;"
                           onmouseenter="this.style.transform='translateY(-2px)'"
                           onmouseleave="this.style.transform='translateY(0)'"
                           onclick="window.showLabDetail('${lab.id}')">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                          <div>
                            <strong style="font-size:15px;color:${text};display:block;">${lab.name}</strong>
                            <span style="font-size:12px;color:${text};opacity:0.8;">Room: <strong>${lab.room}</strong> (Floor ${lab.floor})</span>
                          </div>
                          <span style="font-size:11px;font-weight:700;color:${text};background:rgba(255,255,255,0.7);padding:2px 8px;border-radius:var(--radius-full);">
                            ${lab.operationalHours}
                          </span>
                        </div>

                        <div style="font-size:12px;color:${text};margin:12px 0 8px 0;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                          <div>Apparatus: <strong>${stats.count} models</strong></div>
                          <div>Total Units: <strong>${stats.total}</strong></div>
                          <div>Available: <strong>${stats.available}</strong></div>
                          <div>In-Use: <strong>${stats.busy}</strong></div>
                        </div>

                        <div style="margin-top:10px;">
                          <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:${text};margin-bottom:4px;">
                            <span>${statusLabel}</span>
                            <span>${stats.percent}% Booked</span>
                          </div>
                          <div style="background:rgba(255,255,255,0.8);height:6px;border-radius:var(--radius-full);overflow:hidden;">
                            <div style="width:${stats.percent}%;height:100%;background:${border};border-radius:var(--radius-full);"></div>
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Campus Apparatus Master Status Filter Table -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2>All Campus Apparatus Inventory Load</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Direct visibility into real-time equipment allocations</p>
            </div>
            <select id="heatmap-dept-filter" class="select" style="width:220px;" onchange="window.filterHeatmapTable()">
              <option value="">All Academic Departments</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Optics & Photonics">Optics & Photonics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div class="table-wrapper">
            <table id="heatmap-table">
              <thead>
                <tr>
                  <th>Apparatus</th>
                  <th>Department</th>
                  <th>Facility</th>
                  <th>Total</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                ${equipment.map(eq => `
                  <tr data-dept="${eq.department}">
                    <td>
                      <div style="display:flex;align-items:center;gap:12px;">
                        <img src="${eq.imageUrl}" style="width:38px;height:38px;border-radius:var(--radius-sm);object-fit:cover;">
                        <div>
                          <strong style="font-size:13px;color:var(--text);">${eq.name}</strong>
                          <span style="font-size:11px;color:var(--text-muted);display:block;">${eq.category}</span>
                        </div>
                      </div>
                    </td>
                    <td style="font-size:13px;color:var(--text-secondary);">${eq.department}</td>
                    <td style="font-size:13px;color:var(--text-secondary);">${eq.labRoom}</td>
                    <td style="font-weight:700;">${eq.totalQuantity}</td>
                    <td>
                      <span style="font-weight:800;color:${eq.availableQuantity > 0 ? 'var(--success)' : 'var(--danger)'};">
                        ${eq.availableQuantity}
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-${eq.status === 'Available' ? 'success' : eq.status === 'Maintenance' ? 'danger' : 'warning'}">
                        ${eq.status}
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-${eq.condition === 'Excellent' ? 'success' : eq.condition === 'Good' ? 'info' : 'warning'}">
                        ${eq.condition}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // Interactive Lab Details Drilldown Modal
  // ------------------------------------------------------------
  window.showLabDetail = function (labId) {
    const lab = window.LabLinkData?.getLabById(labId);
    if (!lab) return;

    const labEquipment = (window.LabLinkData?.equipment || []).filter(e => e.labId === labId);

    const modalHtml = `
      <div class="modal-header">
        <div>
          <h2 style="font-size:18px;margin:0;">${lab.name}</h2>
          <span style="font-size:12px;color:var(--text-muted);">${lab.building} • Room ${lab.room} (Floor ${lab.floor})</span>
        </div>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>

      <div class="modal-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;background:var(--surface-alt);padding:14px;border-radius:var(--radius-md);margin-bottom:20px;font-size:13px;">
          <div><span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;">Lab Supervisor</span><strong>${lab.supervisor}</strong></div>
          <div><span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;">Student Capacity</span><strong>${lab.capacity} seats</strong></div>
          <div><span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;">Working Hours</span><strong>${lab.operationalHours}</strong></div>
          <div><span style="color:var(--text-muted);display:block;font-size:11px;text-transform:uppercase;">Registered Tools</span><strong>${labEquipment.length} devices</strong></div>
        </div>

        <h4 style="font-size:14px;font-weight:700;margin-bottom:12px;">Apparatus Installed in this Facility:</h4>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${labEquipment.map(eq => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:var(--radius-md);background:#fff;gap:12px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <img src="${eq.imageUrl}" style="width:48px;height:48px;border-radius:var(--radius-sm);object-fit:cover;">
                <div>
                  <strong style="font-size:13px;color:var(--text);">${eq.name}</strong>
                  <div style="font-size:12px;color:var(--text-secondary);">${eq.category} • ${eq.availableQuantity} of ${eq.totalQuantity} Available</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="badge badge-${eq.status === 'Available' ? 'success' : eq.status === 'Maintenance' ? 'danger' : 'warning'}">
                  ${eq.status}
                </span>
                <button class="btn btn-secondary btn-xs" onclick="window.closeModal(); window.openEquipmentDetail('${eq.id}')">
                  View
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-action="close-modal">Close</button>
      </div>
    `;

    window.openModal?.(modalHtml);
  };

  // ------------------------------------------------------------
  // 3. Admin Master Equipment Management View
  // ------------------------------------------------------------
  window.renderAdminEquipmentPage = function () {
    const equipment = window.LabLinkData?.equipment || [];

    return `
      <div>
        <div class="page-header" style="align-items:center;">
          <div>
            <h1>Master Campus Equipment Directory</h1>
            <p>Campus-wide laboratory equipment registry, maintenance schedules, and calibration flags</p>
          </div>
          <button class="btn btn-primary" onclick="window.showToast('Add New Equipment Dialog (Demo)', 'info')">
            + Add Equipment
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Apparatus Details</th>
                <th>Department</th>
                <th>Lab Facility</th>
                <th>Total Qty</th>
                <th>Avail Qty</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${equipment.map(eq => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <img src="${eq.imageUrl}" style="width:42px;height:42px;border-radius:var(--radius-sm);object-fit:cover;">
                      <div>
                        <strong style="font-size:13px;color:var(--text);">${eq.name}</strong>
                        <span style="font-size:11px;color:var(--text-muted);display:block;">${eq.category}</span>
                      </div>
                    </div>
                  </td>
                  <td style="font-size:13px;color:var(--text-secondary);">${eq.department}</td>
                  <td style="font-size:13px;color:var(--text-secondary);">${eq.labRoom}</td>
                  <td style="font-weight:700;">${eq.totalQuantity}</td>
                  <td>
                    <span style="font-weight:800;color:${eq.availableQuantity > 0 ? 'var(--success)' : 'var(--danger)'};">
                      ${eq.availableQuantity}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-${eq.status === 'Available' ? 'success' : eq.status === 'Maintenance' ? 'danger' : 'warning'}">
                      ${eq.status}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-${eq.condition === 'Excellent' ? 'success' : eq.condition === 'Good' ? 'info' : 'warning'}">
                      ${eq.condition}
                    </span>
                  </td>
                  <td>
                    <div style="display:flex;gap:6px;">
                      <button class="btn btn-secondary btn-xs" onclick="window.showToast('Edit equipment details (Demo)', 'info')">
                        Edit
                      </button>
                      <button class="btn btn-ghost btn-xs" onclick="window.openEquipmentDetail('${eq.id}')">
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 4. Admin Users Management View
  // ------------------------------------------------------------
  window.renderAdminUsersPage = function () {
    const users = window.LabLinkData?.users || [];

    return `
      <div>
        <div class="page-header" style="align-items:center;">
          <div>
            <h1>Campus User Accounts & Permission Management</h1>
            <p>Role-based access credentials for students, research faculty, and facility directors</p>
          </div>
          <button class="btn btn-primary" onclick="window.showToast('Create User Account Dialog (Demo)', 'info')">
            + Provision Account
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Account Holder</th>
                <th>Institutional Email</th>
                <th>Assigned Role</th>
                <th>Department</th>
                <th>Active Reservations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => {
                const count = (window.LabLinkData?.bookings || []).filter(b => b.userId === u.id).length;
                return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:12px;">
                        <div class="user-avatar" style="width:36px;height:36px;font-size:12px;">${u.avatar}</div>
                        <div>
                          <strong style="font-size:13px;color:var(--text);">${u.name}</strong>
                          <span style="font-size:11px;color:var(--text-muted);display:block;">${u.title || u.year || 'University Member'}</span>
                        </div>
                      </div>
                    </td>
                    <td style="font-size:13px;color:var(--text-secondary);">${u.email}</td>
                    <td>
                      <span class="badge badge-${u.role === 'admin' ? 'danger' : u.role === 'faculty' ? 'info' : 'success'}">
                        ${u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style="font-size:13px;color:var(--text-secondary);">${u.department || '—'}</td>
                    <td style="font-weight:700;">${count} Bookings</td>
                    <td>
                      <div style="display:flex;gap:6px;">
                        <button class="btn btn-secondary btn-xs" onclick="window.showToast('Edit user permission flags (Demo)', 'info')">
                          Permissions
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // Filter Handler for Heatmap Table
  // ------------------------------------------------------------
  window.filterHeatmapTable = function () {
    const selectedDept = document.getElementById('heatmap-dept-filter')?.value;
    const rows = document.querySelectorAll('#heatmap-table tbody tr');

    rows.forEach(row => {
      if (!selectedDept || row.dataset.dept === selectedDept) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  };

  // ------------------------------------------------------------
  // Attach Admin Listeners
  // ------------------------------------------------------------
  window.attachAdminListeners = function () {
    if (window.lucide) lucide.createIcons();
  };

})();
