// ============================================================
// LabLink – AI Prototype Builder, Circuit Diagrams & Assembly
// File: pages/builder.js (Parts 9, 10, 11)
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // 1. Prototype Builder Master View
  // ------------------------------------------------------------
  window.renderBuilderPage = function () {
    const activeId = window.AppState?.activeProjectId || 'line-follower-robot';
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(activeId)
      : (window.LabLinkProjects?.projects?.[0] || {});

    // Calculate completed steps
    const steps = project.assemblySteps || [];
    const completedCount = steps.filter(s => s.completed).length;
    const progressPct = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 30;

    return `
      <div>
        <!-- Builder Breadcrumbs & Header -->
        <div class="page-header" style="align-items:center;">
          <div>
            <div style="font-size:12px;color:#0284C7;font-weight:700;text-transform:uppercase;margin-bottom:4px;">
              Engineering Workspace • ${project.category}
            </div>
            <h1>${project.title}</h1>
            <p>${project.objective}</p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <button class="btn btn-secondary btn-sm" onclick="window.navigate('watch-build')">
              📺 Open Watch & Build Mode
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.exportProjectReport('${project.id}')">
              📄 Export Engineering Brief
            </button>
          </div>
        </div>

        <!-- Project Overview & Metrics Strip (Part 9) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:14px;margin-bottom:24px;">
          <div class="card" style="padding:16px;">
            <span style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Difficulty Level</span>
            <div style="font-size:18px;font-weight:800;color:#0284C7;margin-top:2px;">${project.difficulty}</div>
          </div>
          <div class="card" style="padding:16px;">
            <span style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Estimated Time</span>
            <div style="font-size:18px;font-weight:800;color:var(--text);margin-top:2px;">${project.estimatedDuration}</div>
          </div>
          <div class="card" style="padding:16px;">
            <span style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Lab Location</span>
            <div style="font-size:18px;font-weight:800;color:var(--text);margin-top:2px;">${project.labLocation}</div>
          </div>
          <div class="card" style="padding:16px;">
            <span style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Student Cost</span>
            <div style="font-size:18px;font-weight:800;color:#059669;margin-top:2px;">${project.budget?.studentConsumables || '$6.50'}</div>
          </div>
          <div class="card" style="padding:16px;">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">
              <span>Overall Build</span>
              <span style="color:#2563EB;">${progressPct}%</span>
            </div>
            <div class="progress-bar" style="margin-top:8px;height:8px;">
              <div class="progress-fill" style="width:${progressPct}%;background:#2563EB;"></div>
            </div>
          </div>
        </div>

        <!-- Builder Tab Bar -->
        <div class="tabs" id="builder-tabs" style="margin-bottom:24px;">
          <button class="tab active" onclick="window.switchBuilderTab('circuit', this)">
            🔌 Interactive Circuit Diagram
          </button>
          <button class="tab" onclick="window.switchBuilderTab('checklist', this)">
            📦 Component Inventory & Checklist
          </button>
          <button class="tab" onclick="window.switchBuilderTab('assembly', this)">
            🛠️ 10-Stage Assembly Guide
          </button>
          <button class="tab" onclick="window.switchBuilderTab('code', this)">
            💻 Firmware & Programming
          </button>
          <button class="tab" onclick="window.switchBuilderTab('troubleshoot', this)">
            🩺 AI Troubleshooter
          </button>
          <button class="tab" onclick="window.switchBuilderTab('cost', this)">
            💰 Cost Breakdown
          </button>
        </div>

        <!-- TAB 1: INTERACTIVE CIRCUIT DIAGRAM GENERATOR -->
        <div id="tab-pane-circuit" class="builder-tab-pane">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>Interactive Circuit Schematic & Wiring Path Visualizer</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Click any connection wire or node below to highlight pinouts, trace electrical paths, and inspect safety rules.
                </p>
              </div>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-secondary btn-xs" onclick="window.resetWireHighlights()">
                  Reset Highlights
                </button>
              </div>
            </div>

            <!-- SVG Circuit Schematic Canvas -->
            <div class="circuit-svg-wrap" id="circuit-canvas-mount">
              ${window.renderCircuitSVG(project.circuit)}
            </div>

            <!-- Wire Legend & Selected Wire Inspector -->
            <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:20px;margin-top:20px;">
              <div style="background:var(--surface-alt);padding:16px;border-radius:14px;">
                <h4 style="font-size:13px;font-weight:700;margin-bottom:10px;">Color Legend by Signal Type:</h4>
                <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#EF4444;border-radius:2px;"></div>
                    <span><strong>Red:</strong> Regulated Logic Power (+5V)</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#DC2626;border-radius:2px;"></div>
                    <span><strong>Dark Red:</strong> Motor Supply (+7.4V / +12V)</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#1E293B;border-radius:2px;"></div>
                    <span><strong>Black:</strong> Common Ground Bus (0V GND)</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#10B981;border-radius:2px;"></div>
                    <span><strong>Green:</strong> Digital Sensor Inputs</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#8B5CF6;border-radius:2px;"></div>
                    <span><strong>Purple:</strong> Motor PWM Speed Signals</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:16px;height:4px;background:#3B82F6;border-radius:2px;"></div>
                    <span><strong>Blue:</strong> H-Bridge Directional Logic</span>
                  </div>
                </div>
              </div>

              <!-- Live Wire Inspector Card -->
              <div id="wire-inspector-box" style="background:#F0FDF4;border:1px solid #BBF7D0;padding:16px;border-radius:14px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                  <span style="font-size:18px;">🔍</span>
                  <strong style="color:#166534;font-size:14px;">Interactive Inspector: Ready</strong>
                </div>
                <p id="wire-inspector-text" style="font-size:13px;color:#15803D;margin:0;line-height:1.5;">
                  Hover or click on any wire in the diagram above to inspect connection pins, electrical purpose, and laboratory safety rules.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: COMPONENT CHECKLIST (Part 9) -->
        <div id="tab-pane-checklist" class="builder-tab-pane" style="display:none;">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>Component Verification & Collection Checklist</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Verify all apparatus from EL-101 before beginning chassis mechanical assembly.
                </p>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              ${(project.components || []).map(comp => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border:1px solid var(--border);border-radius:var(--radius-md);background:#fff;gap:16px;flex-wrap:wrap;">
                  <div style="display:flex;align-items:center;gap:14px;">
                    <input type="checkbox"
                           style="width:18px;height:18px;cursor:pointer;accent-color:#2563EB;"
                           ${comp.collected ? 'checked' : ''}
                           onchange="window.toggleComponentCollected('${project.id}', '${comp.id}')">
                    <div>
                      <strong style="font-size:14px;color:var(--text);">${comp.name}</strong>
                      <span style="font-size:12px;color:var(--text-secondary);display:block;">${comp.specs}</span>
                    </div>
                  </div>

                  <div style="font-size:12px;color:var(--text-secondary);max-width:320px;">
                    <strong>Pinout / Interface:</strong> ${comp.pinout}
                  </div>

                  <div style="display:flex;align-items:center;gap:12px;">
                    <span class="badge badge-${comp.labStocked ? 'success' : 'warning'}">
                      ${comp.labStocked ? 'Lab Stocked' : 'Consumable'}
                    </span>
                    <button class="btn btn-secondary btn-xs" data-action="view-equipment" data-id="${comp.equipmentId}">
                      Equipment Details
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 3: STEP-BY-STEP 10-STAGE ASSEMBLY GUIDE (Part 9) -->
        <div id="tab-pane-assembly" class="builder-tab-pane" style="display:none;">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>Step-by-Step Prototype Assembly Guide (10 Milestones)</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Follow physical construction stages in strict sequence to avoid mechanical rework or electrical shorts.
                </p>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:16px;">
              ${(project.assemblySteps || []).map(step => `
                <div style="border:1px solid ${step.completed ? '#BBF7D0' : 'var(--border)'};border-radius:14px;padding:18px;background:${step.completed ? '#F0FDF4' : '#fff'};">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                    <div style="display:flex;align-items:center;gap:12px;">
                      <span style="width:28px;height:28px;border-radius:50%;background:${step.completed ? '#10B981' : '#2563EB'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">
                        ${step.completed ? '✓' : step.stepNumber}
                      </span>
                      <div>
                        <h3 style="font-size:15px;font-weight:700;color:var(--text);margin:0;">
                          Step ${step.stepNumber}: ${step.title}
                        </h3>
                        <span style="font-size:11px;color:var(--text-muted);text-transform:uppercase;font-weight:700;">
                          Stage: ${step.stage}
                        </span>
                      </div>
                    </div>

                    <button class="btn btn-${step.completed ? 'secondary' : 'primary'} btn-xs" onclick="window.toggleStepComplete('${project.id}', ${step.stepNumber})">
                      ${step.completed ? 'Mark Incomplete' : 'Complete Step ✓'}
                    </button>
                  </div>

                  <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;margin-bottom:10px;">
                    ${step.instructions}
                  </p>

                  ${step.safetyNote ? `
                    <div style="padding:8px 12px;background:#FFFBEB;border-left:3px solid #F59E0B;border-radius:4px;font-size:12px;color:#92400E;margin-bottom:8px;">
                      ⚠️ <strong>Safety Warning:</strong> ${step.safetyNote}
                    </div>
                  ` : ''}

                  <div style="display:flex;gap:10px;margin-top:8px;">
                    ${step.wiringRef ? `
                      <button class="btn btn-ghost btn-xs" style="color:#0284C7;" onclick="window.switchBuilderTab('circuit'); window.highlightSpecificWire('${step.wiringRef.split(',')[0].trim()}');">
                        🔌 View Wire Path (${step.wiringRef})
                      </button>
                    ` : ''}
                    <button class="btn btn-ghost btn-xs" style="color:#4F46E5;" onclick="window.navigate('watch-build')">
                      📺 Watch Matching Tutorial Video
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 4: PROGRAMMING WORKSPACE (Part 9) -->
        <div id="tab-pane-code" class="builder-tab-pane" style="display:none;">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>Embedded C++ Firmware Workspace</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Verified Arduino code with timer-configured PWM motor velocity control and digital sensor parsing.
                </p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="window.copyStarterCode()">
                📋 Copy Code to Clipboard
              </button>
            </div>

            <!-- Code Editor Visual Container -->
            <div class="code-editor-box" style="margin-bottom:20px;">
              <div class="code-header-bar">
                <span style="font-weight:700;font-size:12px;color:#94A3B8;">line_follower_autopilot.ino (Arduino AVR Uno)</span>
                <span style="font-size:11px;color:#38BDF8;">Baud: 9600 • C++11</span>
              </div>
              <pre class="code-pre" id="arduino-code-block"><code>${window.escapeHTML(project.programming?.code || '// No code found')}</code></pre>
            </div>

            <!-- Pin Configurations & Upload Guide -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div>
                <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;">Firmware Pin Allocation Map:</h4>
                <div class="table-wrapper">
                  <table>
                    <thead>
                      <tr><th>Identifier</th><th>Pin</th><th>Mode</th></tr>
                    </thead>
                    <tbody>
                      ${(project.programming?.pinDefinitions || []).map(p => `
                        <tr>
                          <td><strong>${p.name}</strong></td>
                          <td><span class="badge badge-info">Pin ${p.pin}</span></td>
                          <td><span class="badge badge-secondary">${p.mode}</span></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;">Firmware Upload Checklist:</h4>
                <div style="background:var(--surface-alt);padding:14px;border-radius:12px;font-size:12px;line-height:1.6;">
                  ${(project.programming?.uploadGuide || []).map(g => `<div>• ${g}</div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 5: AI TROUBLESHOOTER (Part 10) -->
        <div id="tab-pane-troubleshoot" class="builder-tab-pane" style="display:none;">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>AI-Assisted Hardware Diagnostics & Fault Isolation</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Diagnose motor stalls, brownout loops, sensor optical reflection jitter, and wiring inversions.
                </p>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:16px;">
              ${(project.troubleshooting || []).map(item => `
                <div style="border:1px solid var(--border);border-radius:14px;padding:18px;background:#fff;">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                    <span style="font-size:20px;">🩺</span>
                    <strong style="font-size:15px;color:#991B1B;">Symptom: ${item.symptom}</strong>
                  </div>

                  <div style="background:var(--surface-alt);padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:10px;">
                    <strong>Root Cause:</strong> ${item.rootCause}
                  </div>

                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px;">
                    <strong>Diagnostic Inspection Steps:</strong>
                    ${(item.diagnosticSteps || []).map(s => `<div style="margin-left:10px;">• ${s}</div>`).join('')}
                  </div>

                  <div style="padding:10px 14px;background:#F0FDF4;border-left:4px solid #10B981;border-radius:4px;font-size:13px;color:#166534;margin-bottom:8px;">
                    <strong>Remedy Solution:</strong> ${item.solution}
                  </div>

                  ${item.safetyAlert ? `
                    <div style="font-size:11px;color:#B45309;padding:6px 10px;background:#FFFBEB;border-radius:4px;">
                      ⚠️ <strong>Safety Warning:</strong> ${item.safetyAlert}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- TAB 6: COST ESTIMATOR (Part 11) -->
        <div id="tab-pane-cost" class="builder-tab-pane" style="display:none;">
          <div class="card" style="margin-bottom:24px;">
            <div class="card-header">
              <div>
                <h2>Project Budget & Laboratory Resource Value Breakdown</h2>
                <p style="font-size:13px;color:var(--text-secondary);">
                  Comparison between university laboratory supplied equipment vs out-of-pocket consumables.
                </p>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:20px;">
              <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:16px;border-radius:12px;">
                <span style="font-size:11px;color:#166534;font-weight:700;text-transform:uppercase;">Lab Provided Value (Free)</span>
                <div style="font-size:24px;font-weight:900;color:#15803D;">${project.budget?.labProvidedValue || '$32.00'}</div>
              </div>
              <div style="background:#FFFBEB;border:1px solid #FDE68A;padding:16px;border-radius:12px;">
                <span style="font-size:11px;color:#92400E;font-weight:700;text-transform:uppercase;">Consumable Purchases</span>
                <div style="font-size:24px;font-weight:900;color:#B45309;">${project.budget?.studentConsumables || '$6.50'}</div>
              </div>
            </div>

            <div class="table-wrapper">
              <table>
                <thead>
                  <tr><th>Apparatus / Part</th><th>Quantity</th><th>Source</th><th>Estimated Market Value</th></tr>
                </thead>
                <tbody>
                  ${(project.components || []).map(c => `
                    <tr>
                      <td><strong>${c.name}</strong></td>
                      <td>${c.quantity}</td>
                      <td>
                        <span class="badge badge-${c.labStocked ? 'success' : 'warning'}">
                          ${c.labStocked ? 'University Lab Stock' : 'Consumable / Battery'}
                        </span>
                      </td>
                      <td style="font-weight:700;">${c.marketPrice || '$5.00'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    `;
  };

  // ------------------------------------------------------------
  // 2. Interactive SVG Circuit Renderer
  // ------------------------------------------------------------
  window.renderCircuitSVG = function (circuit) {
    if (!circuit || !circuit.nodes) {
      return `<p style="padding:20px;color:var(--text-muted);">Circuit diagram loading...</p>`;
    }

    const wires = circuit.wires || [];
    const nodes = circuit.nodes || [];

    // Pre-calculated schematic coordinate anchors
    const pinCoords = {
      '5V': { x: 330, y: 150 },
      'GND': { x: 330, y: 330 },
      'D0 OUT': { x: 180, y: 110 },
      'Digital Pin D2': { x: 260, y: 180 },
      'Digital Pin D3': { x: 260, y: 200 },
      'D5 (PWM)': { x: 400, y: 180 },
      'ENA (Speed Left)': { x: 500, y: 180 },
      'D6, D7': { x: 400, y: 210 },
      'IN1, IN2 (Dir Left)': { x: 500, y: 210 },
      'D8, D9': { x: 400, y: 240 },
      'IN3, IN4 (Dir Right)': { x: 500, y: 240 },
      'D10 (PWM)': { x: 400, y: 270 },
      'ENB (Speed Right)': { x: 500, y: 270 },
      'OUT1, OUT2': { x: 640, y: 190 },
      'OUT3, OUT4': { x: 640, y: 290 },
      'Positive (+)': { x: 440, y: 390 }
    };

    return `
      <svg viewBox="0 0 880 500" style="width:100%;height:100%;display:block;" id="interactive-circuit-svg">
        <defs>
          <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Background Grid Grid Lines -->
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" stroke-width="0.8"/>
        </pattern>
        <rect width="880" height="500" fill="url(#grid)" />

        <!-- Nodes / Hardware Modules -->
        ${nodes.map(n => `
          <g class="circuit-module" data-node-id="${n.id}">
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" rx="12"
                  fill="#FFFFFF" stroke="${n.color}" stroke-width="2.5"
                  style="filter:drop-shadow(0 4px 10px rgba(0,0,0,0.06));" />
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="28" rx="12"
                  fill="${n.color}" />
            <text x="${n.x + n.width / 2}" y="${n.y + 19}"
                  fill="#FFFFFF" font-size="12" font-weight="700" text-anchor="middle" font-family="'Inter', sans-serif">
              ${n.name}
            </text>
          </g>
        `).join('')}

        <!-- Interactive Wires / Paths -->
        ${wires.map((w, idx) => {
          const from = pinCoords[w.fromPin] || { x: 300, y: 180 + idx * 20 };
          const to = pinCoords[w.toPin] || { x: 500, y: 180 + idx * 20 };
          const midX = (from.x + to.x) / 2;

          return `
            <g class="wire-group" id="wire-group-${w.id}">
              <path class="circuit-wire"
                    id="${w.id}"
                    d="M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}"
                    stroke="${w.color}"
                    fill="none"
                    onclick="window.inspectWire('${w.id}')"
                    onmouseenter="window.hoverWire('${w.id}')"
                    onmouseleave="window.unhoverWire('${w.id}')" />

              <circle class="circuit-pin-dot" cx="${from.x}" cy="${from.y}" stroke="${w.color}" />
              <circle class="circuit-pin-dot" cx="${to.x}" cy="${to.y}" stroke="${w.color}" />
            </g>
          `;
        }).join('')}
      </svg>
    `;
  };

  // ------------------------------------------------------------
  // 3. Tab & Wire Interactions
  // ------------------------------------------------------------
  window.switchBuilderTab = function (tabKey, btnEl) {
    if (btnEl) {
      document.querySelectorAll('#builder-tabs .tab').forEach(t => t.classList.remove('active'));
      btnEl.classList.add('active');
    }

    document.querySelectorAll('.builder-tab-pane').forEach(p => p.style.display = 'none');
    const target = document.getElementById(`tab-pane-${tabKey}`);
    if (target) {
      target.style.display = 'block';
    }

    if (window.lucide) lucide.createIcons();
  };

  window.inspectWire = function (wireId) {
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(window.AppState?.activeProjectId || 'line-follower-robot')
      : (window.LabLinkProjects?.projects?.[0] || {});

    const wire = (project.circuit?.wires || []).find(w => w.id === wireId);
    if (!wire) return;

    // Highlight wire SVG
    document.querySelectorAll('.circuit-wire').forEach(w => w.classList.remove('highlighted'));
    const targetWire = document.getElementById(wireId);
    if (targetWire) targetWire.classList.add('highlighted');

    const box = document.getElementById('wire-inspector-box');
    const text = document.getElementById('wire-inspector-text');
    if (box && text) {
      box.style.background = '#EFF6FF';
      box.style.borderColor = '#38BDF8';
      text.innerHTML = `
        <strong style="color:#0369A1;font-size:14px;display:block;margin-bottom:4px;">Wire [${wire.id}]: ${wire.from} (${wire.fromPin}) ➔ ${wire.to} (${wire.toPin})</strong>
        <span style="display:block;color:#0C4A6E;margin-bottom:4px;"><strong>Electrical Purpose:</strong> ${wire.purpose}</span>
        <span style="display:block;color:#B45309;background:#FEF3C7;padding:4px 8px;border-radius:4px;font-size:11px;">⚠️ <strong>Safety Check:</strong> ${wire.safetyWarning}</span>
      `;
    }
  };

  window.hoverWire = function (wireId) {
    const w = document.getElementById(wireId);
    if (w) w.style.strokeWidth = '6';
  };

  window.unhoverWire = function (wireId) {
    const w = document.getElementById(wireId);
    if (w && !w.classList.contains('highlighted')) {
      w.style.strokeWidth = '3.5';
    }
  };

  window.resetWireHighlights = function () {
    document.querySelectorAll('.circuit-wire').forEach(w => {
      w.classList.remove('highlighted');
      w.style.strokeWidth = '3.5';
    });
    const text = document.getElementById('wire-inspector-text');
    if (text) text.textContent = 'Hover or click on any wire in the diagram above to inspect connection pins, electrical purpose, and laboratory safety rules.';
  };

  window.highlightSpecificWire = function (wireId) {
    window.inspectWire(wireId);
  };

  window.toggleComponentCollected = function (projectId, compId) {
    const project = window.LabLinkData?.getProjectById(projectId);
    const comp = project?.components?.find(c => c.id === compId);
    if (comp) {
      comp.collected = !comp.collected;
      window.showToast?.(`${comp.name} marked as ${comp.collected ? 'Collected' : 'Pending'}.`, 'info');
    }
  };

  window.toggleStepComplete = function (projectId, stepNumber) {
    const project = window.LabLinkData?.getProjectById(projectId);
    const step = project?.assemblySteps?.find(s => s.stepNumber === stepNumber);
    if (step) {
      step.completed = !step.completed;
      window.render();
      window.showToast?.(`Step ${stepNumber} marked as ${step.completed ? 'Complete' : 'Incomplete'}!`, 'success');
    }
  };

  window.copyStarterCode = function () {
    const project = window.LabLinkData?.getProjectById
      ? window.LabLinkData.getProjectById(window.AppState?.activeProjectId || 'line-follower-robot')
      : (window.LabLinkProjects?.projects?.[0] || {});

    const code = project?.programming?.code || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        window.showToast?.('Arduino code copied to clipboard!', 'success');
      });
    } else {
      window.showToast?.('Code ready for manual copy.', 'info');
    }
  };

  window.exportProjectReport = function (projectId) {
    const project = window.LabLinkData?.getProjectById(projectId);
    const reportText = `LabLink University Engineering Prototype Report\nProject: ${project?.title}\nCategory: ${project?.category}\nEstimated Time: ${project?.estimatedDuration}\nComponents: ${project?.components?.map(c => c.name).join(', ')}`;
    window.showToast?.(`Generated Engineering Brief for ${project?.title}`, 'success');
  };

  window.escapeHTML = function (str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

})();
