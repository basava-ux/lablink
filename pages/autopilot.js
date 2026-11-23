// ============================================================
// LabLink – AI Experiment Autopilot & Video Intelligence Engine
// File: pages/autopilot.js (Parts 6 & 7)
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Autopilot Page View
  // ------------------------------------------------------------
  window.renderAutopilotPage = function () {
    return `
      <div>
        <!-- Futuristic AI Hero Card -->
        <div class="ai-card" style="margin-bottom:28px;">
          <div class="ai-badge">⚡ AI AUTOPILOT ENGINE • SYSTEM ONLINE</div>
          <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.6px;margin-bottom:8px;">
            AI Experiment Autopilot & Video Intelligence
          </h1>
          <p style="font-size:15px;line-height:1.6;margin-bottom:20px;">
            Describe your academic research project or capstone idea in natural language.
            Our engine decomposes your objective into verified hardware components, verifies campus lab inventory,
            constructs your circuit schematics, curates project-specific video tutorials, and generates your prototype plan.
          </p>
          <div style="font-size:12px;opacity:0.85;background:rgba(255,255,255,0.12);padding:6px 14px;border-radius:9999px;display:inline-block;">
            ⚙️ Transparent Architecture: Rule-based deterministic demo engine with verified component netlists. External AI API ready.
          </div>
        </div>

        <!-- Project Input Form -->
        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <div>
              <h2>Describe Your Academic Experiment or Prototype</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Type your project goals, sensor requirements, or technical constraints in plain English.</p>
            </div>
          </div>

          <div class="form-group">
            <textarea
              id="project-description"
              class="textarea"
              rows="5"
              placeholder="e.g., I want to build an autonomous line-following robot with Arduino, infrared sensors, and dual motor driver control for our university robotics competition..."
              style="font-size:14px;line-height:1.6;border-radius:14px;"
            >I'm building an autonomous line-following robot using Arduino that follows a black line using IR sensors. I need to test motor control, sensor calibration, and implement PID control algorithm.</textarea>
          </div>

          <!-- Quick Scenario Selector -->
          <div class="example-buttons">
            <span style="font-weight:700;color:var(--text);">Try an Example:</span>
            <button
              data-action="quick-example"
              data-id="I'm building an autonomous line-following robot using Arduino that follows a black line using IR sensors. I need to test motor control, sensor calibration, and implement PID control algorithm."
            >🤖 Autonomous Line Robot</button>
            <button
              data-action="quick-example"
              data-id="I need to analyze water samples from local rivers for heavy metal contamination using spectroscopic methods and pH measurements for my environmental chemistry project."
            >🧪 Water Quality Spectrometry</button>
            <button
              data-action="quick-example"
              data-id="I'm designing a custom PCB for an IoT temperature sensor network. I need to prototype, test circuits, measure signal integrity and program microcontrollers."
            >📡 Custom IoT Sensor PCB</button>
            <button
              data-action="quick-example"
              data-id="I'm studying the effect of different light wavelengths on plant growth rates. I'll use controlled light environments and measure chlorophyll content under microscopy."
            >🌱 Plant Growth Photobiology</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:16px;">
            <button class="btn btn-primary btn-lg" data-action="analyze-project" style="box-shadow: 0 4px 18px rgba(37, 99, 235, 0.4);">
              ✨ Run AI Project Analysis
            </button>
            <span style="font-size:12px;color:var(--text-muted);">
              ⏱️ Average analysis time: 2.0s • Over 40 lab items mapped
            </span>
          </div>
        </div>

        <!-- AI ANALYSIS RESULTS CONTAINER -->
        <div id="autopilot-results" style="display:none;">

          <!-- Action Banner: Launch Prototype Builder -->
          <div class="card" style="background:linear-gradient(135deg, #EFF6FF, #DBEAFE);border:2px solid #38BDF8;margin-bottom:24px;padding:24px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
              <div>
                <div style="display:inline-flex;align-items:center;gap:6px;background:#0284C7;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:9999px;margin-bottom:6px;text-transform:uppercase;">
                  ⚡ Next Step: Engineering Workspace
                </div>
                <h3 style="font-size:20px;font-weight:900;color:#0C4A6E;margin:0 0 4px 0;">Ready to Build Your Hardware Prototype?</h3>
                <p style="font-size:13px;color:#0369A1;margin:0;">
                  Launch the interactive engineering studio with live circuit diagram wiring, pinouts, starter code, and assembly guide.
                </p>
              </div>
              <div style="display:flex;gap:12px;">
                <button class="btn btn-primary btn-lg" id="btn-launch-builder" onclick="window.launchBuilderFromAutopilot()" style="box-shadow:0 6px 20px rgba(37,99,235,0.4);">
                  🛠️ BUILD MY PROTOTYPE
                </button>
                <button class="btn btn-secondary btn-lg" onclick="window.navigate('watch-build')">
                  📺 Watch & Build Studio
                </button>
              </div>
            </div>
          </div>

          <!-- Section 1: Project Overview & Budget Breakdown -->
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <h2>🧠 AI Project Overview & Estimated Budget</h2>
              <span class="badge badge-info" id="result-status-badge">Feasibility Verified</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;background:var(--surface-alt);padding:16px;border-radius:var(--radius-md);margin-bottom:16px;">
              <div>
                <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;display:block;">Domain / Category</span>
                <strong id="result-type" style="font-size:15px;color:var(--text);">-</strong>
              </div>
              <div>
                <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;display:block;">Engineering Complexity</span>
                <strong id="result-complexity" style="font-size:15px;color:#0284C7;">-</strong>
              </div>
              <div>
                <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;display:block;">Estimated Lab Duration</span>
                <strong id="result-duration" style="font-size:15px;color:var(--text);">-</strong>
              </div>
              <div>
                <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;display:block;">Estimated Student Cost</span>
                <strong id="result-budget" style="font-size:15px;color:#059669;">-</strong>
              </div>
            </div>
            <div style="font-size:13px;color:var(--text-secondary);">
              <strong>Participating Academic Departments:</strong> <span id="result-depts">Electronics</span>
            </div>
          </div>

          <!-- Section 2: Required Components & Real Inventory Check -->
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <h2>📦 Recommended Components & Campus Inventory Availability</h2>
              <button class="btn btn-primary btn-sm" onclick="window.requestAllEquipment()">
                📋 Reserve All In-Stock Equipment
              </button>
            </div>
            <div id="result-equipment" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;"></div>
          </div>

          <!-- Section 3: Recommended Video Tutorials (PART 7: CRITICAL FEATURE) -->
          <div class="card" style="margin-bottom:24px;border:2px solid #E0E7FF;">
            <div class="card-header">
              <div>
                <div style="display:inline-flex;align-items:center;gap:6px;background:#EEF2FF;color:#4F46E5;font-size:11px;font-weight:800;padding:2px 8px;border-radius:9999px;margin-bottom:4px;text-transform:uppercase;">
                  📺 VIDEO INTELLIGENCE ENGINE
                </div>
                <h2>Recommended Video Tutorials</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Verified educational video tutorials matched specifically to your components, circuit wiring, and programming stages.
                </p>
              </div>
            </div>

            <!-- Video Category Tabs Filter -->
            <div class="tabs" id="video-category-tabs" style="margin-bottom:16px;">
              <button class="tab active" onclick="window.filterAutopilotVideos('all', this)">All Tutorials</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Understand Components', this)">Understand Components</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Circuit & Wiring', this)">Circuit & Wiring</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Complete Assembly', this)">Complete Assembly</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Programming', this)">Programming</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Testing & Calibration', this)">Testing</button>
              <button class="tab" onclick="window.filterAutopilotVideos('Troubleshooting', this)">Troubleshooting</button>
            </div>

            <!-- Video Cards Grid -->
            <div id="result-videos" class="video-grid"></div>
          </div>

          <!-- Section 4: Laboratory Execution Timeline -->
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <h2>📅 Suggested Laboratory Execution Schedule</h2>
            </div>
            <div id="result-schedule"></div>
          </div>

          <!-- Section 5: Engineering Recommendations & Safety Tips -->
          <div class="card" style="margin-bottom:28px;">
            <div class="card-header">
              <h2>🛡️ Laboratory Safety & Design Considerations</h2>
            </div>
            <div id="result-tips" style="display:flex;flex-direction:column;gap:10px;"></div>
          </div>

          <!-- Action Buttons Bottom -->
          <div style="display:flex;gap:14px;justify-content:flex-end;margin-bottom:40px;">
            <button class="btn btn-secondary" onclick="document.getElementById('autopilot-results').style.display='none';window.scrollTo({top:0,behavior:'smooth'});">
              ✏️ Refine Description
            </button>
            <button class="btn btn-primary btn-lg" onclick="window.launchBuilderFromAutopilot()">
              🛠️ BUILD MY PROTOTYPE →
            </button>
          </div>

        </div>
      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. AI Autopilot Project Analyzer
  // ------------------------------------------------------------
  window.analyzeProject = function (description) {
    const desc = (description || '').toLowerCase();

    // Map description against rich project database in projectsData.js
    const isRobotics = /robot|servo|motor|autonomous|arduino|line.follow|sensor|pid/i.test(desc);
    const isChemistry = /water|chemical|pH|acid|base|titrat|spectro|analys|heavy.metal|contamina/i.test(desc);

    let blueprint = null;
    const allBlueprints = window.LabLinkData?.getAllProjects ? window.LabLinkData.getAllProjects() : [];

    if (isRobotics) {
      blueprint = allBlueprints.find(p => p.id === 'line-follower-robot') || allBlueprints[0];
    } else if (isChemistry) {
      blueprint = allBlueprints.find(p => p.id === 'iot-water-analyzer') || allBlueprints[1];
    } else {
      blueprint = allBlueprints[0];
    }

    const category = blueprint?.category || 'Robotics & Embedded Systems';
    const complexity = blueprint?.difficulty || 'Intermediate';
    const duration = blueprint?.estimatedDuration || '3 Weeks (18 Lab Hours)';
    const budget = blueprint?.budget?.studentConsumables || '$6.50 (Consumables)';
    const departments = blueprint?.departments || ['Electronics', 'Computer Science'];

    // Map components with live inventory from LabLinkData.equipment
    const components = (blueprint?.components || []).map(comp => {
      const eq = window.LabLinkData?.getEquipmentById(comp.equipmentId);
      return {
        ...comp,
        imageUrl: eq?.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
        availableQuantity: eq ? eq.availableQuantity : (comp.labStocked ? 4 : 0),
        totalQuantity: eq ? eq.totalQuantity : 6,
        department: eq?.department || 'Electronics',
        labName: eq?.labName || 'EL-101'
      };
    });

    const schedule = (blueprint?.assemblySteps || []).slice(0, 5).map((step, idx) => ({
      day: `Phase ${idx + 1}: ${step.stage}`,
      activity: step.title,
      instructions: step.instructions,
      equipment: blueprint.components[idx % blueprint.components.length]?.name || 'Lab Bench'
    }));

    const tips = [
      'Maintain unified common electrical ground (0V) across microcontroller logic and high-current motor drivers.',
      'Calibrate optical reflectance threshold potentiometers under the actual ambient lighting of the test track.',
      'Always disconnect high-current battery pack before connecting USB programming cable to the workstation.',
      'Solder flyback protection diodes or decoupling capacitors across motor terminals to eliminate inductive reset surges.'
    ];

    const videos = blueprint?.videos || [];

    return {
      blueprintId: blueprint?.id || 'line-follower-robot',
      category,
      complexity,
      duration,
      budget,
      departments,
      components,
      schedule,
      tips,
      videos
    };
  };

  // ------------------------------------------------------------
  // 3. Trigger & Display Results
  // ------------------------------------------------------------
  window.triggerAutopilotAnalysis = function (description) {
    const btn = document.querySelector('[data-action="analyze-project"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⚡ Analyzing Project Requirements...';
    }

    setTimeout(function () {
      const result = window.analyzeProject(description);
      window.AppState.autopilotResult = result;
      window.displayAutopilotResult(result);

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '✨ Run AI Project Analysis';
      }
    }, 1800);
  };

  window.displayAutopilotResult = function (result) {
    document.getElementById('result-type').textContent = result.category;
    document.getElementById('result-complexity').textContent = result.complexity;
    document.getElementById('result-duration').textContent = result.duration;
    document.getElementById('result-budget').textContent = result.budget;
    document.getElementById('result-depts').textContent = result.departments.join(' • ');

    // Render Components Grid
    const equipEl = document.getElementById('result-equipment');
    if (equipEl) {
      equipEl.innerHTML = result.components.map(c => `
        <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;background:#fff;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <img src="${c.imageUrl}" style="width:52px;height:52px;border-radius:var(--radius-sm);object-fit:cover;flex-shrink:0;">
            <div style="flex:1;">
              <strong style="font-size:14px;color:var(--text);display:block;">${c.name}</strong>
              <span style="font-size:11px;color:var(--text-muted);display:block;">${c.specs}</span>
            </div>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);background:var(--surface-alt);padding:6px 10px;border-radius:6px;">
            <strong>Role:</strong> ${c.purpose}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;font-size:12px;">
            <span class="badge badge-${c.availableQuantity > 0 ? 'success' : 'danger'}">
              ${c.availableQuantity > 0 ? `${c.availableQuantity} In Lab Stock` : 'Needs Procurement'}
            </span>
            <span style="font-weight:700;color:var(--text-secondary);">Qty: ${c.quantity}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Videos
    window.renderVideoList(result.videos);

    // Render Schedule
    const schedEl = document.getElementById('result-schedule');
    if (schedEl) {
      schedEl.innerHTML = `
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Timeline Phase</th>
                <th>Engineering Milestone</th>
                <th>Assigned Apparatus</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${result.schedule.map(s => `
                <tr>
                  <td><strong>${s.day}</strong></td>
                  <td>${s.activity}</td>
                  <td><span class="badge badge-info">${s.equipment}</span></td>
                  <td><span class="badge badge-success">Ready</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Render Tips
    const tipsEl = document.getElementById('result-tips');
    if (tipsEl) {
      tipsEl.innerHTML = result.tips.map(t => `
        <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:var(--radius-md);font-size:13px;color:#166534;">
          <span style="font-size:16px;">💡</span>
          <div>${t}</div>
        </div>
      `).join('');
    }

    const resultsMount = document.getElementById('autopilot-results');
    if (resultsMount) {
      resultsMount.style.display = 'block';
      resultsMount.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.lucide) lucide.createIcons();
  };

  // ------------------------------------------------------------
  // 4. Video Filtering & Rendering (Part 7)
  // ------------------------------------------------------------
  window.renderVideoList = function (videoList) {
    const container = document.getElementById('result-videos');
    if (!container) return;

    if (!videoList || videoList.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted);font-size:13px;">No video recommendations for this category.</p>`;
      return;
    }

    container.innerHTML = videoList.map(v => `
      <div class="video-card">
        <div class="video-thumbnail-wrap">
          <img src="${v.thumbnail}" alt="${v.title}">
          <div class="video-play-overlay" onclick="window.openVideoModal('${v.youtubeId}', '${v.title.replace(/'/g, "\\'")}', '${v.channel}')">
            <div class="play-circle">▶</div>
          </div>
          <div class="video-duration-pill">${v.duration}</div>
        </div>
        <div class="video-content">
          <span class="video-category-badge">${v.category}</span>
          <h4 class="video-title" title="${v.title}">${v.title}</h4>
          <div class="video-channel">Source: <strong>${v.channel}</strong> • Stage: ${v.stage}</div>
          <p style="font-size:12px;color:var(--text-secondary);line-height:1.4;margin-bottom:14px;">
            ${v.description}
          </p>
          <div class="video-actions">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.openVideoModal('${v.youtubeId}', '${v.title.replace(/'/g, "\\'")}', '${v.channel}')">
              Watch Tutorial
            </button>
            <a href="${v.watchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Open directly on YouTube">
              ↗
            </a>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  };

  window.filterAutopilotVideos = function (category, tabBtn) {
    // Update active tab UI
    if (tabBtn) {
      document.querySelectorAll('#video-category-tabs .tab').forEach(t => t.classList.remove('active'));
      tabBtn.classList.add('active');
    }

    const allVideos = window.AppState?.autopilotResult?.videos || [];
    if (category === 'all') {
      window.renderVideoList(allVideos);
    } else {
      const filtered = allVideos.filter(v => v.category === category);
      window.renderVideoList(filtered);
    }
  };

  // Video Player Modal
  window.openVideoModal = function (youtubeId, title, channel) {
    const embedHtml = `
      <div class="modal-header">
        <div>
          <h2 style="font-size:16px;margin:0;">${title}</h2>
          <span style="font-size:12px;color:var(--text-muted);">Creator: ${channel} • Embedded Educational Player</span>
        </div>
        <button class="modal-close" data-action="close-modal">×</button>
      </div>
      <div class="modal-body" style="padding:0;">
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;background:#000;">
          <iframe
            src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"
            title="${title}"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
      <div class="modal-footer" style="display:flex;justify-content:space-between;">
        <button class="btn btn-secondary btn-sm" onclick="window.closeModal(); window.navigate('watch-build');">
          Open in Watch & Build Studio 📺
        </button>
        <button class="btn btn-primary btn-sm" data-action="close-modal">
          Done Watching
        </button>
      </div>
    `;

    window.openModal(embedHtml, { size: 'large' });
  };

  // Launch Prototype Builder from Autopilot
  window.launchBuilderFromAutopilot = function () {
    const blueprintId = window.AppState?.autopilotResult?.blueprintId || 'line-follower-robot';
    window.AppState.activeProjectId = blueprintId;
    window.showToast?.('Launching Interactive Prototype Builder...', 'info');
    window.navigate('builder');
  };

  // Request all in-stock equipment
  window.requestAllEquipment = function () {
    const components = window.AppState?.autopilotResult?.components || [];
    const inStock = components.filter(c => c.availableQuantity > 0);

    if (inStock.length === 0) {
      window.showToast?.('No available in-stock items found in this recommendation.', 'warning');
      return;
    }

    inStock.forEach(c => {
      const booking = {
        id: 'bk-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        bookingNumber: 'BK-' + Math.floor(Math.random() * 90000 + 10000),
        equipmentId: c.equipmentId || 'eq-001',
        userId: window.AppState?.currentUser?.id || 'u1',
        quantity: c.quantity || 1,
        startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 9).toISOString(),
        purpose: `AI Autopilot batch reservation for: ${c.name}`,
        status: 'approved',
        createdAt: new Date().toISOString()
      };
      window.LabLinkData?.bookings.push(booking);
    });

    window.showToast?.(`Successfully reserved ${inStock.length} laboratory apparatuses!`, 'success');
    window.navigate('bookings');
  };

  window.attachAutopilotListeners = function () {
    if (window.lucide) lucide.createIcons();
  };

})();
