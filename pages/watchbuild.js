// ============================================================
// LabLink – Interactive Watch & Build Studio
// File: pages/watchbuild.js (Part 8)
// ============================================================

(function () {
  'use strict';

  let currentVideoIndex = 0;
  let activeWiringStepId = 4; // Default to step 4 (Motor Driver Wiring)

  // ------------------------------------------------------------
  // 1. Watch & Build Studio Master View
  // ------------------------------------------------------------
  window.renderWatchBuildPage = function () {
    const activeId = window.AppState?.activeProjectId || 'line-follower-robot';
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(activeId)
      : (window.LabLinkProjects?.projects?.[0] || {});

    const videos = project.videos || [];
    const activeVideo = videos[currentVideoIndex] || videos[0] || {
      youtubeId: '4_lFq9hS_e8',
      title: 'Line Follower Robot Complete Circuit Wiring & Common Ground Explained',
      channel: 'Circuit Digest',
      category: 'Circuit & Wiring',
      stage: 'Breadboard & Power Routing',
      duration: '16:40',
      description: 'Step-by-step physical schematic assembly showing clean wire routing, jumper distribution, and preventing battery ground loops.'
    };

    const steps = project.assemblySteps || [];
    const completedCount = steps.filter(s => s.completed).length;
    const progressPct = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 35;

    return `
      <div>
        <!-- Studio Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <div style="font-size:12px;color:#0284C7;font-weight:700;text-transform:uppercase;margin-bottom:4px;">
              Dual-Panel Engineering Studio • Synchronized Learning & Assembly
            </div>
            <h1>Interactive Watch & Build Mode</h1>
            <p>Follow along with curated video tutorials on the right while inspecting interactive circuit schematics on the left.</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-secondary btn-sm" onclick="window.navigate('builder')">
              🛠️ Open Full Prototype Builder
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.navigate('autopilot')">
              ✨ AI Autopilot
            </button>
          </div>
        </div>

        <!-- DUAL-PANEL CONTAINER (Part 8: LEFT PANEL + RIGHT PANEL) -->
        <div class="watch-build-container">
          
          <!-- LEFT PANEL: Interactive Circuit Diagram & Wire Pinouts -->
          <div class="circuit-canvas-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <div>
                <h3 style="font-size:16px;font-weight:700;color:var(--text);margin:0;">
                  ⚡ Live Circuit Diagram
                </h3>
                <span style="font-size:12px;color:var(--text-muted);">
                  Step ${activeWiringStepId} Active Connection
                </span>
              </div>
              <button class="btn btn-ghost btn-xs" onclick="window.resetWireHighlights()">
                Reset Highlighting
              </button>
            </div>

            <div class="circuit-svg-wrap" style="min-height:380px;">
              ${window.renderCircuitSVG ? window.renderCircuitSVG(project.circuit) : '<p style="padding:20px;">Circuit loading...</p>'}
            </div>

            <!-- Active Wiring Guidance Banner -->
            <div id="active-step-guidance" style="margin-top:14px;padding:12px 16px;background:#F0F9FF;border:1px solid #BAE6FD;border-radius:12px;font-size:13px;">
              <strong style="color:#0369A1;display:block;margin-bottom:4px;" id="guidance-title">
                Wiring Task: L298N Power & Ground Connections
              </strong>
              <div style="color:#0C4A6E;font-size:12px;line-height:1.5;" id="guidance-desc">
                Connect the 7.4V battery positive (+) to the L298N 12V terminal, and tie the Arduino GND and L298N GND together to form a common electrical ground bus.
              </div>
            </div>
          </div>

          <!-- RIGHT PANEL: Tutorial Video Player & Stage Guidance -->
          <div class="video-player-box">
            <div class="player-embed-wrap">
              <iframe
                id="watch-build-iframe"
                src="https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0"
                title="${activeVideo.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>

            <div class="player-details">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                <div>
                  <span class="video-category-badge" id="player-cat-badge">${activeVideo.category}</span>
                  <h3 style="font-size:16px;font-weight:700;color:var(--text);margin:6px 0 2px 0;" id="player-video-title">
                    ${activeVideo.title}
                  </h3>
                  <div style="font-size:12px;color:var(--text-muted);" id="player-video-channel">
                    Channel: ${activeVideo.channel} • Stage: <strong>${activeVideo.stage}</strong>
                  </div>
                </div>
                <span class="badge badge-info" id="player-video-duration">${activeVideo.duration}</span>
              </div>

              <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;margin:0;" id="player-video-desc">
                ${activeVideo.description}
              </p>

              <!-- Video Navigation Controls -->
              <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border);margin-top:auto;">
                <button class="btn btn-secondary btn-sm" onclick="window.prevTutorialVideo()" ${currentVideoIndex === 0 ? 'disabled' : ''}>
                  ← Previous Tutorial
                </button>
                <span style="font-size:12px;color:var(--text-muted);font-weight:600;" id="tutorial-counter">
                  Tutorial ${currentVideoIndex + 1} of ${videos.length}
                </span>
                <button class="btn btn-secondary btn-sm" onclick="window.nextTutorialVideo()" ${currentVideoIndex >= videos.length - 1 ? 'disabled' : ''}>
                  Next Tutorial →
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- BOTTOM PANEL: Step-by-Step Construction Checklist & Progress (Part 8) -->
        <div class="card" style="margin-bottom:28px;">
          <div class="card-header">
            <div>
              <h2>Step-by-Step Construction & Wiring Checklist</h2>
              <p style="font-size:13px;color:var(--text-secondary);">
                Select any step below to illuminate the exact wiring path in the circuit diagram and synchronize the tutorial video.
              </p>
            </div>
            <div style="display:flex;align-items:center;gap:14px;">
              <span style="font-size:13px;font-weight:700;color:#2563EB;">Progress: ${progressPct}% Complete</span>
              <div class="progress-bar" style="width:140px;height:8px;">
                <div class="progress-fill" style="width:${progressPct}%;background:#2563EB;"></div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            ${steps.map(step => `
              <div class="wiring-step-row ${step.stepNumber === activeWiringStepId ? 'active' : ''}"
                   onclick="window.selectWiringStep(${step.stepNumber})">
                <div style="display:flex;align-items:center;gap:12px;">
                  <input type="checkbox"
                         style="width:18px;height:18px;cursor:pointer;accent-color:#2563EB;"
                         ${step.completed ? 'checked' : ''}
                         onclick="event.stopPropagation(); window.toggleWatchBuildStep(${step.stepNumber});">
                  <span class="wire-indicator-dot" style="background:${step.completed ? '#10B981' : step.stepNumber === activeWiringStepId ? '#2563EB' : '#94A3B8'};"></span>
                  <div>
                    <strong style="font-size:14px;color:var(--text);">Step ${step.stepNumber}: ${step.title}</strong>
                    <span style="font-size:12px;color:var(--text-muted);display:block;">Stage: ${step.stage} • ${step.wiringRef ? `Wire: ${step.wiringRef}` : 'Assembly Stage'}</span>
                  </div>
                </div>

                <div style="display:flex;align-items:center;gap:10px;">
                  ${step.completed ? '<span class="badge badge-success">Completed ✓</span>' : '<span class="badge badge-secondary">Pending</span>'}
                  <button class="btn btn-ghost btn-xs" style="color:#0284C7;">
                    Trace Wire →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Synchronized Video & Wire Interactions
  // ------------------------------------------------------------
  window.selectWiringStep = function (stepNumber) {
    activeWiringStepId = stepNumber;

    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(window.AppState?.activeProjectId || 'line-follower-robot')
      : (window.LabLinkProjects?.projects?.[0] || {});

    const step = (project.assemblySteps || []).find(s => s.stepNumber === stepNumber);
    if (!step) return;

    // Update active row highlighting in UI
    document.querySelectorAll('.wiring-step-row').forEach(row => row.classList.remove('active'));

    // Highlight corresponding circuit wire if applicable
    if (step.wiringRef) {
      const primaryWire = step.wiringRef.split(',')[0].trim();
      window.inspectWire?.(primaryWire);
    }

    // Update guidance box
    const gTitle = document.getElementById('guidance-title');
    const gDesc = document.getElementById('guidance-desc');
    if (gTitle && gDesc) {
      gTitle.textContent = `Wiring Step ${step.stepNumber}: ${step.title}`;
      gDesc.innerHTML = `${step.instructions} ${step.safetyNote ? `<strong style="display:block;color:#B45309;margin-top:4px;">⚠️ Safety: ${step.safetyNote}</strong>` : ''}`;
    }

    // Synchronize video tutorial if matching tutorialRef exists
    if (step.tutorialRef && project.videos) {
      const vidIdx = project.videos.findIndex(v => v.id === step.tutorialRef);
      if (vidIdx !== -1) {
        window.loadTutorialVideoByIndex(vidIdx);
      }
    }

    window.render();
  };

  window.loadTutorialVideoByIndex = function (idx) {
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(window.AppState?.activeProjectId || 'line-follower-robot')
      : (window.LabLinkProjects?.projects?.[0] || {});

    const videos = project.videos || [];
    if (idx < 0 || idx >= videos.length) return;

    currentVideoIndex = idx;
    const v = videos[idx];

    const iframe = document.getElementById('watch-build-iframe');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${v.youtubeId}?rel=0`;
    }

    const titleEl = document.getElementById('player-video-title');
    const chanEl = document.getElementById('player-video-channel');
    const descEl = document.getElementById('player-video-desc');
    const durEl = document.getElementById('player-video-duration');
    const catEl = document.getElementById('player-cat-badge');
    const countEl = document.getElementById('tutorial-counter');

    if (titleEl) titleEl.textContent = v.title;
    if (chanEl) chanEl.innerHTML = `Channel: ${v.channel} • Stage: <strong>${v.stage}</strong>`;
    if (descEl) descEl.textContent = v.description;
    if (durEl) durEl.textContent = v.duration;
    if (catEl) catEl.textContent = v.category;
    if (countEl) countEl.textContent = `Tutorial ${idx + 1} of ${videos.length}`;
  };

  window.prevTutorialVideo = function () {
    if (currentVideoIndex > 0) {
      window.loadTutorialVideoByIndex(currentVideoIndex - 1);
    }
  };

  window.nextTutorialVideo = function () {
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(window.AppState?.activeProjectId || 'line-follower-robot')
      : (window.LabLinkProjects?.projects?.[0] || {});

    if (currentVideoIndex < (project.videos?.length || 1) - 1) {
      window.loadTutorialVideoByIndex(currentVideoIndex + 1);
    }
  };

  window.toggleWatchBuildStep = function (stepNumber) {
    const activeId = window.AppState?.activeProjectId || 'line-follower-robot';
    const project = window.LabLinkData?.getProjectById(activeId);
    const step = project?.assemblySteps?.find(s => s.stepNumber === stepNumber);
    if (step) {
      step.completed = !step.completed;
      window.render();
      window.showToast?.(`Step ${stepNumber} marked as ${step.completed ? 'Completed ✓' : 'Pending'}.`, 'success');
    }
  };

})();
