// ============================================================
// LabLink – Faculty Dashboard, Approvals, Equipment Manager, Rescue Mode
// File: pages/faculty.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Faculty Dashboard View
  // ------------------------------------------------------------
  window.renderFacultyDashboard = function () {
    const user = window.AppState?.currentUser || { name: 'Dr. Sarah Johnson', department: 'Electronics', labId: 'EL-101', id: 'u3' };
    const requests = window.LabLinkData?.bookingRequests || [];
    const allPending = requests.filter(r => r.status === 'pending');
    const myDeptEquipment = (window.LabLinkData?.equipment || []).filter(e => e.department === user.department);
    const maintenanceItems = myDeptEquipment.filter(e => e.status === 'Maintenance' || e.condition === 'Under Maintenance');
    const approvedBookingsCount = (window.LabLinkData?.bookings || []).filter(b => b.status === 'approved').length;

    return `
      <div class="dashboard-container">
        <!-- Faculty Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <h1>Faculty Operations Dashboard</h1>
            <p>${user.name} • ${user.title || 'Lab Director'} • ${user.department} Laboratory (${user.labId || 'EL-101'})</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="equipment">
              🔧 Equipment Manager
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.showToast('Generating Department Lab Report (Demo)', 'info')">
              📊 Export Report
            </button>
          </div>
        </div>

        <!-- 4 Stat Cards -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background:#FEF3C7;color:#D97706;">⏳</div>
            <div class="stat-value">${allPending.length}</div>
            <div class="stat-label">Pending Approval Requests</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#D1FAE5;color:#059669;">✅</div>
            <div class="stat-value">${approvedBookingsCount}</div>
            <div class="stat-label">Active Approved Bookings</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#EEF2FF;color:#4F46E5;">🔬</div>
            <div class="stat-value">${myDeptEquipment.length}</div>
            <div class="stat-label">Managed Lab Apparatuses</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:#FEE2E2;color:#DC2626;">🚨</div>
            <div class="stat-value">${maintenanceItems.length}</div>
            <div class="stat-label">Under Maintenance</div>
          </div>
        </div>

        <!-- Main Approval Queue (Top Priority) -->
        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <div>
              <h2>⏳ Pending Student Approval Requests (${allPending.length})</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Evaluate project scopes, student academic deadlines, and AI scheduling fairness ratings.</p>
            </div>
            ${allPending.length > 0 ? `
              <span class="badge badge-warning" style="font-size:12px;padding:4px 10px;">
                Action Required
              </span>
            ` : ''}
          </div>

          ${allPending.length === 0 ? `
            <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
              <div style="font-size:40px;margin-bottom:8px;">🎉</div>
              <h3 style="font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px;">All Caught Up!</h3>
              <p>No student requests are awaiting your authorization.</p>
            </div>
          ` : `
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${allPending.map(req => {
                const eq = window.LabLinkData?.getEquipmentById(req.equipmentId);
                const student = (window.LabLinkData?.users || []).find(u => u.id === req.studentId) || { name: req.studentName || 'Student', department: 'Engineering' };
                const deadlineDate = req.deadline ? new Date(req.deadline) : new Date(Date.now() + 86400000 * 10);
                const daysRemaining = Math.max(1, Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24)));
                const isUrgent = daysRemaining <= 7;
                const startStr = window.formatDate ? window.formatDate(req.startDate) : req.startDate;
                const endStr = window.formatDate ? window.formatDate(req.endDate) : req.endDate;

                return `
                  <div style="border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px;background:#fff;box-shadow:var(--shadow-xs);">
                    <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
                      <img src="${eq?.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'}"
                           alt="${eq?.name}"
                           style="width:84px;height:84px;border-radius:var(--radius-md);object-fit:cover;flex-shrink:0;">
                      
                      <div style="flex:1;min-width:280px;">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:12px;">
                          <div>
                            <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
                              <h3 style="font-size:17px;font-weight:700;color:var(--text);">${eq?.name || 'Equipment'}</h3>
                              ${req.fromAutopilot ? `<span class="badge badge-info" style="font-size:11px;">🤖 AI Autopilot</span>` : ''}
                            </div>
                            <div style="font-size:13px;color:var(--text-secondary);">
                              Requested by <strong>${student.name}</strong> (${student.department}) • Booking Window: <strong>${startStr} to ${endStr}</strong>
                            </div>
                          </div>
                          <span class="badge badge-${isUrgent ? 'danger' : 'info'}" style="font-size:12px;padding:3px 10px;">
                            ${isUrgent ? `🚨 Deadline: ${daysRemaining} Days Left` : `📅 Deadline: ${daysRemaining} Days`}
                          </span>
                        </div>

                        <div style="background:var(--surface-alt);padding:12px;border-radius:var(--radius-sm);font-size:13px;color:var(--text);margin-bottom:12px;">
                          <strong>Student Project Objective:</strong> ${req.purpose}
                        </div>

                        ${req.aiRecommendationReason ? `
                          <div style="display:flex;align-items:flex-start;gap:8px;background:#F0FDF4;border:1px solid #BBF7D0;padding:10px 14px;border-radius:var(--radius-sm);font-size:12px;color:#166534;margin-bottom:14px;">
                            <span style="font-size:16px;">💡</span>
                            <div>
                              <strong>AI Scheduling & Fairness Engine Insights:</strong>
                              ${req.aiRecommendationReason}
                            </div>
                          </div>
                        ` : ''}

                        <div style="display:flex;gap:10px;justify-content:flex-end;align-items:center;">
                          <button class="btn btn-ghost btn-sm" onclick="window.reschedulePrompt('${req.id}')">
                            ⏱️ Suggest Alternative Slot
                          </button>
                          <button class="btn btn-danger btn-sm" data-action="reject-booking" data-id="${req.id}">
                            ✕ Reject
                          </button>
                          <button class="btn btn-success btn-sm" data-action="approve-booking" data-id="${req.id}">
                            ✓ Approve Access
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;">
          <!-- Department Equipment Utilization -->
          <div class="card">
            <div class="card-header">
              <h2>${user.department} Lab Equipment Utilization</h2>
              <span style="font-size:12px;color:var(--text-muted);">Real-time checkout load</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:14px;">
              ${myDeptEquipment.slice(0, 6).map(eq => {
                const bookedCount = Math.max(0, eq.totalQuantity - eq.availableQuantity);
                const percent = Math.round((bookedCount / eq.totalQuantity) * 100);
                const color = percent >= 80 ? 'var(--danger)' : percent >= 50 ? 'var(--warning)' : 'var(--success)';

                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                      <span style="font-weight:600;color:var(--text);">${eq.name}</span>
                      <span style="color:var(--text-secondary);font-weight:600;">${percent}% (${bookedCount}/${eq.totalQuantity} booked)</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:${percent}%;background:${color};"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- AI Scheduling & Fairness Recommendations -->
          <div class="ai-card" style="box-shadow:var(--shadow-sm);padding:24px;">
            <div class="ai-badge" style="margin-bottom:12px;">⚖️ AI SCHEDULING FAIRNESS ENGINE</div>
            <h3 style="font-size:18px;margin-bottom:8px;color:#fff;">Transparent Allocation Insights</h3>
            <p style="font-size:13px;margin-bottom:16px;">
              The Fairness Engine avoids bias and optimizes queue availability based on academic deadlines, project milestone urgency, and historical utilization.
            </p>
            <div style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
              <div style="background:rgba(255,255,255,0.15);padding:10px 12px;border-radius:var(--radius-sm);border-left:3px solid #FCD34D;">
                📌 <strong>Recommendation 1:</strong> Move non-critical student circuit testing on Oscilloscope #2 to Friday morning (low contention).
              </div>
              <div style="background:rgba(255,255,255,0.15);padding:10px 12px;border-radius:var(--radius-sm);border-left:3px solid #FCD34D;">
                📌 <strong>Recommendation 2:</strong> High capstone deadline proximity for Alice Chen justifies top-tier priority queue on GPU nodes.
              </div>
              <div style="background:rgba(255,255,255,0.15);padding:10px 12px;border-radius:var(--radius-sm);border-left:3px solid #6EE7B7;">
                📌 <strong>Recommendation 3:</strong> 3D Printer Ultimaker S5 is 50% idle overnight — open 22:00-06:00 print batch queues.
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Maintenance Alerts Section -->
        <div class="card">
          <div class="card-header">
            <h2>🚨 Equipment Rescue Mode & Maintenance Monitor</h2>
            <button class="btn btn-secondary btn-sm" data-action="navigate" data-id="equipment">
              Manage All Equipment
            </button>
          </div>
          ${maintenanceItems.length === 0 ? `
            <div style="display:flex;align-items:center;gap:12px;padding:16px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:var(--radius-md);color:#166534;font-size:14px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <strong>All equipment in ${user.department} is operational.</strong>
                Zero active maintenance bottlenecks detected in your laboratory rooms.
              </div>
            </div>
          ` : `
            <div>
              ${maintenanceItems.map(m => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;border:1px solid #FCA5A5;background:#FEF2F2;border-radius:var(--radius-md);margin-bottom:10px;gap:16px;">
                  <div style="display:flex;align-items:center;gap:14px;">
                    <span style="font-size:24px;">🔧</span>
                    <div>
                      <strong style="color:#991B1B;font-size:15px;">${m.name} is currently offline</strong>
                      <div style="font-size:12px;color:#7F1D1D;margin-top:2px;">
                        Location: ${m.labName} (${m.labRoom}) • Trigger Rescue Mode to automatically redirect affected student reservations.
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-danger btn-sm" onclick="window.openRescueModePanel('${m.id}')">
                    Launch Rescue Mode
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Faculty Equipment Management Page View
  // ------------------------------------------------------------
  window.renderFacultyEquipmentPage = function () {
    const user = window.AppState?.currentUser || { department: 'Electronics' };
    const myEquipment = (window.LabLinkData?.equipment || []).filter(e => e.department === user.department);

    return `
      <div>
        <div class="page-header">
          <div>
            <h1>${user.department} Laboratory Equipment Inventory</h1>
            <p>Direct inventory administration, status overrides, and maintenance dispatching</p>
          </div>
          <button class="btn btn-primary" onclick="window.showToast('Add New Equipment Modal (Demo)', 'info')">
            + Register New Apparatus
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Equipment Name</th>
                <th>Lab Room</th>
                <th>Total Units</th>
                <th>Available</th>
                <th>Operational Status</th>
                <th>Physical Condition</th>
                <th>Faculty Actions</th>
              </tr>
            </thead>
            <tbody>
              ${myEquipment.map(eq => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <img src="${eq.imageUrl}" style="width:44px;height:44px;border-radius:var(--radius-sm);object-fit:cover;">
                      <div>
                        <strong style="font-size:14px;color:var(--text);">${eq.name}</strong>
                        <span style="font-size:11px;color:var(--text-muted);display:block;">${eq.category} • ${eq.typicalUsageDuration}h usage</span>
                      </div>
                    </div>
                  </td>
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
                      <button class="btn btn-secondary btn-xs" onclick="window.toggleEquipmentStatus('${eq.id}')">
                        Toggle Maint
                      </button>
                      <button class="btn btn-ghost btn-xs" onclick="window.openEquipmentDetail('${eq.id}')">
                        Specs
                      </button>
                      ${eq.status === 'Maintenance' ? `
                        <button class="btn btn-warning btn-xs" onclick="window.openRescueModePanel('${eq.id}')">
                          Rescue
                        </button>` : ''}
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
  // Faculty Actions: Approve, Reject, Reschedule
  // ------------------------------------------------------------
  window.approveBooking = function (requestId) {
    const req = (window.LabLinkData?.bookingRequests || []).find(r => r.id === requestId);
    if (!req) return;

    req.status = 'approved';

    // Update matching booking
    const booking = (window.LabLinkData?.bookings || []).find(b => b.id === req.bookingId || b.equipmentId === req.equipmentId);
    if (booking) {
      booking.status = 'approved';
    }

    // Push notification to student
    window.LabLinkData?.notifications.push({
      id: 'notif-' + Date.now(),
      userId: req.studentId,
      type: 'approval',
      title: 'Reservation Approved by Faculty!',
      message: `Your reservation request for ${req.equipmentName} has been approved. You may check out the apparatus at the scheduled time.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    window.showToast?.(`Approved booking request for ${req.equipmentName}!`, 'success');
    window.render?.();
  };

  window.rejectBooking = function (requestId, explicitReason) {
    const req = (window.LabLinkData?.bookingRequests || []).find(r => r.id === requestId);
    if (!req) return;

    const reason = explicitReason || prompt('Please enter the reason for rejecting this laboratory booking request:', 'Lab capacity conflict during requested time slot');
    if (reason === null) return; // user cancelled prompt

    req.status = 'rejected';
    req.rejectionReason = reason;

    // Restore equipment available inventory
    const eq = window.LabLinkData?.getEquipmentById(req.equipmentId);
    if (eq) {
      eq.availableQuantity = Math.min(eq.totalQuantity, eq.availableQuantity + 1);
    }

    const booking = (window.LabLinkData?.bookings || []).find(b => b.id === req.bookingId);
    if (booking) {
      booking.status = 'rejected';
      booking.rejectionReason = reason;
    }

    // Push notification to student
    window.LabLinkData?.notifications.push({
      id: 'notif-' + Date.now(),
      userId: req.studentId,
      type: 'rejection',
      title: 'Reservation Request Declined',
      message: `Your booking for ${req.equipmentName} was declined: "${reason}". Consider using AI Autopilot to find alternative slots.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    window.showToast?.('Request declined. Student has been notified.', 'warning');
    window.render?.();
  };

  window.reschedulePrompt = function (requestId) {
    const req = (window.LabLinkData?.bookingRequests || []).find(r => r.id === requestId);
    if (!req) return;

    const suggestedSlot = prompt('Suggest alternative date/slot (e.g., Nov 28 09:00 - 13:00):', 'Friday Nov 27 09:00 - 13:00');
    if (!suggestedSlot) return;

    window.LabLinkData?.notifications.push({
      id: 'notif-' + Date.now(),
      userId: req.studentId,
      type: 'reminder',
      title: 'Faculty Rescheduling Proposal',
      message: `Faculty proposed alternative time slot for ${req.equipmentName}: ${suggestedSlot}.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    window.showToast?.(`Sent alternative slot proposal to student: ${suggestedSlot}`, 'info');
  };

  window.toggleEquipmentStatus = function (equipmentId) {
    const eq = window.LabLinkData?.getEquipmentById(equipmentId);
    if (!eq) return;

    if (eq.status === 'Available' || eq.status === 'Limited') {
      eq.status = 'Maintenance';
      eq.condition = 'Under Maintenance';
      window.showToast?.(`${eq.name} marked as Under Maintenance. Rescue Mode available.`, 'warning');
    } else {
      eq.status = 'Available';
      eq.condition = 'Good';
      window.showToast?.(`${eq.name} restored to Operational Available status!`, 'success');
    }
    window.render?.();
  };

  // ------------------------------------------------------------
  // 3. Equipment Rescue Mode Engine & Interactive Modal
  // ------------------------------------------------------------
  window.openRescueModePanel = function (equipmentId) {
    const targetEq = window.LabLinkData?.getEquipmentById(equipmentId);
    if (!targetEq) return;

    // 1. Identify all active bookings affected by this maintenance outage
    const affectedBookings = (window.LabLinkData?.bookings || []).filter(b => {
      return b.equipmentId === equipmentId && ['pending', 'approved', 'active'].includes(b.status);
    });

    // 2. Discover compatible alternative apparatus across campus
    const allEq = window.LabLinkData?.equipment || [];
    const alternatives = allEq.filter(e => {
      if (e.id === equipmentId) return false;
      if (e.availableQuantity <= 0) return false;
      if (e.status === 'Maintenance') return false;

      // Same department, or same category/tags
      const sameDept = e.department === targetEq.department;
      const sameCategory = e.category === targetEq.category;
      const sharedTag = e.tags?.some(t => targetEq.tags?.includes(t));

      return sameCategory || sameDept || sharedTag;
    }).slice(0, 4);

    const modalContent = `
      <div class="modal-header" style="background:#FFF1F2;border-bottom:1px solid #FECDD3;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:24px;">🚨</span>
          <div>
            <h2 style="color:#9F1239;font-size:18px;margin:0;">Equipment Rescue Mode</h2>
            <p style="font-size:12px;color:#BE123C;margin:2px 0 0 0;">Outage Incident Mitigation & Cross-Department Re-routing</p>
          </div>
        </div>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>

      <div class="modal-body">
        <!-- Outage Summary Card -->
        <div style="background:#FFF5F5;border:1px solid #FED7D7;border-radius:var(--radius-md);padding:16px;margin-bottom:20px;">
          <div style="display:flex;gap:14px;align-items:center;">
            <img src="${targetEq.imageUrl}" style="width:60px;height:60px;border-radius:var(--radius-sm);object-fit:cover;">
            <div>
              <strong style="font-size:15px;color:#9B2C2C;">${targetEq.name}</strong>
              <div style="font-size:12px;color:#742A2A;margin-top:2px;">
                Location: ${targetEq.labName} (${targetEq.labRoom}) • Department of ${targetEq.department}
              </div>
              <span class="badge badge-danger" style="font-size:11px;margin-top:6px;">Status: OFFLINE / MAINTENANCE</span>
            </div>
          </div>
        </div>

        <!-- Affected Bookings Section -->
        <div style="margin-bottom:24px;">
          <h4 style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:10px;">
            Impacted Student Bookings (${affectedBookings.length}):
          </h4>
          ${affectedBookings.length === 0 ? `
            <div style="padding:12px 14px;background:var(--surface-alt);border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);">
              No existing student reservations are interrupted by this maintenance window.
            </div>
          ` : `
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${affectedBookings.map(b => {
                const student = (window.LabLinkData?.users || []).find(u => u.id === b.userId);
                const startFmt = window.formatDate ? window.formatDate(b.startDate) : b.startDate;
                return `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);background:#fff;font-size:13px;">
                    <div>
                      <strong>${student?.name || 'Student'}</strong> (Reservation: ${b.bookingNumber})
                      <div style="font-size:11px;color:var(--text-muted);">${startFmt} • Qty: ${b.quantity}</div>
                    </div>
                    <span class="badge badge-warning">At Risk</span>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- AI Suggested Substitutes -->
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h4 style="font-size:14px;font-weight:700;color:var(--text);margin:0;">
              AI-Identified Cross-Department Substitutes:
            </h4>
            <span style="font-size:11px;color:var(--success);font-weight:700;">● Inventory Verified</span>
          </div>

          ${alternatives.length === 0 ? `
            <p style="color:var(--text-muted);font-size:13px;">No direct substitute apparatus found in current inventory.</p>
          ` : `
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${alternatives.map(alt => `
                <div style="display:flex;align-items:center;gap:14px;padding:12px;border:1px solid #BBF7D0;background:#F0FDF4;border-radius:var(--radius-md);">
                  <img src="${alt.imageUrl}" style="width:50px;height:50px;border-radius:var(--radius-sm);object-fit:cover;">
                  <div style="flex:1;">
                    <strong style="font-size:14px;color:#166534;">${alt.name}</strong>
                    <div style="font-size:12px;color:#15803D;">
                      ${alt.department} • ${alt.labName} • <strong>${alt.availableQuantity} Available</strong>
                    </div>
                  </div>
                  <button class="btn btn-success btn-sm" onclick="window.autoRebookToSubstitute('${targetEq.id}', '${alt.id}')">
                    Auto-Rebook All
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-action="close-modal">
          Close
        </button>
      </div>
    `;

    window.openModal?.(modalContent);
  };

  window.autoRebookToSubstitute = function (originalEqId, newEqId) {
    const orig = window.LabLinkData?.getEquipmentById(originalEqId);
    const sub = window.LabLinkData?.getEquipmentById(newEqId);
    if (!orig || !sub) return;

    const affected = (window.LabLinkData?.bookings || []).filter(b => b.equipmentId === originalEqId && ['pending', 'approved', 'active'].includes(b.status));

    affected.forEach(b => {
      b.equipmentId = newEqId;
      b.status = 'approved';
      b.rescuedFrom = originalEqId;

      window.LabLinkData?.notifications.push({
        id: 'notif-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
        userId: b.userId,
        type: 'alternative_suggested',
        title: '🚨 Reservation Rescued: Equipment Substituted',
        message: `Your booking for ${orig.name} was automatically transferred to ${sub.name} (${sub.labName}, ${sub.labRoom}) due to unscheduled maintenance.`,
        read: false,
        createdAt: new Date().toISOString()
      });
    });

    sub.availableQuantity = Math.max(0, sub.availableQuantity - affected.length);

    window.closeModal?.();
    window.showToast?.(`Successfully rescued ${affected.length} booking(s) to ${sub.name}! Students notified.`, 'success');
    window.render?.();
  };

  // ------------------------------------------------------------
  // Attach Faculty Listeners
  // ------------------------------------------------------------
  window.attachFacultyListeners = function () {
    if (window.lucide) lucide.createIcons();
  };

})();
