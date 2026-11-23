// ============================================================
// LabLink – Project Portfolio & Collaborative Team Workspace
// File: pages/portfolio.js (Parts 12 & 13)
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Student Project Portfolio View (Part 12)
  // ------------------------------------------------------------
  window.renderPortfolioPage = function () {
    const portfolioItems = window.LabLinkData?.getPortfolioItems
      ? window.LabLinkData.getPortfolioItems()
      : [];

    return `
      <div>
        <!-- Portfolio Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <div style="font-size:12px;color:#0284C7;font-weight:700;text-transform:uppercase;margin-bottom:4px;">
              Academic Showcase • Capstone Prototypes & Verification Logs
            </div>
            <h1>Student Innovation Portfolio</h1>
            <p>Showcase completed prototypes, experimental trials, verified circuit designs, and supervisor reviews.</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-primary btn-sm" onclick="window.openNewPortfolioModal()">
              + Add Prototype Showcase
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.showToast('Compiling Multi-Project Capstone Dossier (PDF)', 'info')">
              📄 Export Capstone Dossier
            </button>
          </div>
        </div>

        <!-- Portfolio Cards Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(340px, 1fr));gap:24px;margin-bottom:32px;">
          ${portfolioItems.map(item => `
            <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
              <div style="height:180px;width:100%;background:#0F172A;position:relative;overflow:hidden;">
                <img src="${item.heroImage}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;">
                <span class="badge badge-info" style="position:absolute;top:12px;left:12px;backdrop-filter:blur(6px);background:rgba(2,132,199,0.85);color:#fff;">
                  ${item.category}
                </span>
                <span class="badge badge-${item.status.includes('Completed') ? 'success' : 'warning'}" style="position:absolute;top:12px;right:12px;">
                  ${item.status}
                </span>
              </div>

              <div style="padding:22px;display:flex;flex-direction:column;flex:1;">
                <h3 style="font-size:17px;font-weight:800;color:var(--text);line-height:1.35;margin-bottom:8px;">
                  ${item.title}
                </h3>
                <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;margin-bottom:16px;">
                  ${item.description}
                </p>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:var(--surface-alt);padding:10px 14px;border-radius:10px;font-size:12px;margin-bottom:16px;">
                  <div>Trials: <strong>${item.experimentTrials} Recorded</strong></div>
                  <div>Firmware: <strong>${item.codeLines} Lines C++</strong></div>
                  <div style="grid-column:span 2;color:#166534;font-weight:700;">
                    Evaluation: ${item.score}
                  </div>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">
                  ${item.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('')}
                </div>

                <div style="display:flex;gap:8px;margin-top:auto;">
                  <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.launchProjectBuilder('${item.projectId}')">
                    Inspect Blueprint
                  </button>
                  <button class="btn btn-secondary btn-sm" onclick="window.uploadPrototypePhotoModal('${item.id}')" title="Upload Prototype Photograph">
                    📷 Photo
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Collaborative Team Workspace View (Part 13)
  // ------------------------------------------------------------
  window.renderTeamPage = function () {
    const teams = window.LabLinkData?.getTeams ? window.LabLinkData.getTeams() : [];

    return `
      <div>
        <!-- Team Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <div style="font-size:12px;color:#0284C7;font-weight:700;text-transform:uppercase;margin-bottom:4px;">
              Multi-Disciplinary Research • Shared Lab Resources & Task Tracking
            </div>
            <h1>Collaborative Team Workspace</h1>
            <p>Collaborate with fellow students across engineering, physics, and life sciences departments.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.openNewTeamModal()">
            + Form New Research Team
          </button>
        </div>

        <div style="display:flex;flex-direction:column;gap:24px;margin-bottom:32px;">
          ${teams.map(team => `
            <div class="card" style="padding:24px;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
                <div>
                  <span class="badge badge-info" style="font-size:11px;margin-bottom:6px;">${team.department}</span>
                  <h2 style="font-size:20px;font-weight:800;color:var(--text);margin:0 0 4px 0;">${team.name}</h2>
                  <div style="font-size:13px;color:var(--text-secondary);">
                    Lead: <strong>${team.leadStudent}</strong> • Target Project: <strong>${team.activeProject}</strong>
                  </div>
                </div>

                <div style="text-align:right;">
                  <span class="badge badge-warning" style="font-size:12px;">📅 Next Milestone: ${team.deliverableMilestone}</span>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${team.upcomingMeeting}</div>
                </div>
              </div>

              <!-- Team Member Avatars & Roles -->
              <div style="margin-bottom:18px;">
                <h4 style="font-size:13px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Active Team Members:</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
                  ${team.members.map(m => `
                    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--surface-alt);border-radius:10px;">
                      <div class="user-avatar" style="width:34px;height:34px;font-size:12px;">${m.avatar}</div>
                      <div>
                        <strong style="font-size:13px;color:var(--text);display:block;">${m.name}</strong>
                        <span style="font-size:11px;color:var(--text-muted);">${m.role}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Shared Equipment & Actions -->
              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:16px;flex-wrap:wrap;gap:12px;">
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-secondary);">
                  <strong>Shared Apparatus:</strong>
                  ${team.sharedEquipment.map(eq => `<span class="badge badge-secondary">${eq}</span>`).join('')}
                </div>

                <div style="display:flex;gap:10px;">
                  <button class="btn btn-secondary btn-sm" onclick="window.showToast('Team discussion thread opened (Demo)', 'info')">
                    💬 Discussion Board
                  </button>
                  <button class="btn btn-primary btn-sm" onclick="window.navigate('builder')">
                    Collaborate on Prototype
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Modals for Portfolio & Teams
  window.openNewPortfolioModal = function () {
    const html = `
      <div class="modal-header">
        <h2>Add Prototype to Showcase</h2>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Project Title</label>
          <input class="input" id="new-port-title" placeholder="e.g., Quadcopter PID Telemetry Controller">
        </div>
        <div class="form-group">
          <label class="form-label">Engineering Description</label>
          <textarea class="textarea" id="new-port-desc" placeholder="Describe the sensors, control loop, and verified lab results..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Prototype Photograph URL</label>
          <input class="input" id="new-port-img" placeholder="https://images.unsplash.com/photo-...">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-action="close-modal">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="window.saveNewPortfolioItem()">Publish to Portfolio</button>
      </div>
    `;
    window.openModal(html);
  };

  window.saveNewPortfolioItem = function () {
    const title = document.getElementById('new-port-title')?.value;
    const desc = document.getElementById('new-port-desc')?.value;
    const img = document.getElementById('new-port-img')?.value || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80';

    if (!title) {
      window.showToast?.('Please enter a project title.', 'warning');
      return;
    }

    const newItem = {
      id: 'port-' + Date.now(),
      studentId: window.AppState?.currentUser?.id || 'u1',
      studentName: window.AppState?.currentUser?.name || 'Alice Chen',
      projectId: 'line-follower-robot',
      title: title,
      description: desc || 'Student laboratory prototype design with verified wiring and firmware.',
      category: 'Robotics & Hardware',
      status: 'Verified Prototype',
      heroImage: img,
      completionDate: new Date().toLocaleDateString(),
      tags: ['Arduino', 'Engineering', 'LabLink'],
      codeLines: 150,
      experimentTrials: 10,
      score: 'A (Published)'
    };

    window.LabLinkData?.portfolioItems?.unshift(newItem);
    window.closeModal();
    window.showToast?.('Prototype published to your portfolio showcase!', 'success');
    window.render();
  };

  window.uploadPrototypePhotoModal = function (itemId) {
    const html = `
      <div class="modal-header">
        <h2>Upload Prototype Photograph</h2>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>
      <div class="modal-body" style="text-align:center;padding:32px 20px;">
        <div style="font-size:48px;margin-bottom:12px;">📷</div>
        <h4 style="font-size:16px;margin-bottom:6px;">Select Bench Photo of Your Physical Build</h4>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;">
          Attach high-resolution photos of your breadboard wiring, motor chassis, or lab bench setup.
        </p>
        <input type="file" id="prototype-file-input" accept="image/*" class="input" style="padding:8px;max-width:320px;margin:0 auto 16px auto;">
        <div style="font-size:11px;color:var(--text-muted);">Simulated local laboratory photo upload preview.</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-action="close-modal">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="window.closeModal(); window.showToast('Photograph saved to project portfolio!', 'success');">
          Save Photograph
        </button>
      </div>
    `;
    window.openModal(html);
  };

  window.openNewTeamModal = function () {
    const html = `
      <div class="modal-header">
        <h2>Form New Research Team</h2>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Team / Lab Group Name</label>
          <input class="input" id="new-team-name" placeholder="e.g., Quantum Sensing & Photonics Group">
        </div>
        <div class="form-group">
          <label class="form-label">Target Academic Capstone / Project</label>
          <input class="input" id="new-team-proj" placeholder="e.g., Autonomous Line-Following Robot">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-action="close-modal">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="window.closeModal(); window.showToast('Team workspace provisioned!', 'success');">
          Create Team Workspace
        </button>
      </div>
    `;
    window.openModal(html);
  };

})();
