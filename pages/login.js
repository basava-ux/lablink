// pages/login.js — LabLink Login Page

window.renderLoginPage = function () {
  return `
  <div class="login-page" style="
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  ">
    <!-- ═══════════════════════════════════════════════════
         LEFT SIDE — Logo, Form, Quick Login
    ═══════════════════════════════════════════════════ -->
    <div class="login-left" style="
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      padding: 48px 40px;
      min-width: 420px;
      max-width: 520px;
    ">
      <div style="width: 100%; max-width: 400px;">

        <!-- Logo -->
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <!-- SVG Flask Icon -->
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#4F46E5"/>
            <path d="M15 8h10M17 8v10l-6 12a2 2 0 001.8 2.8h14.4A2 2 0 0029 30.8L23 18V8"
              stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="17" cy="27" r="1.5" fill="#A5B4FC"/>
            <circle cx="22" cy="30" r="1" fill="#C7D2FE"/>
            <circle cx="25" cy="26" r="1.2" fill="#818CF8"/>
          </svg>
          <!-- Brand Name -->
          <span style="
            font-size: 28px;
            font-weight: 800;
            color: #4F46E5;
            letter-spacing: -0.5px;
          ">LabLink</span>
        </div>

        <!-- Tagline -->
        <p style="
          font-size: 13px;
          color: #6B7280;
          margin: 0 0 36px 0;
          letter-spacing: 0.3px;
        ">University Laboratory Management System</p>

        <!-- Heading -->
        <h1 style="
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        ">Welcome back</h1>
        <p style="
          font-size: 15px;
          color: #6B7280;
          margin: 0 0 28px 0;
          line-height: 1.5;
        ">Sign in to access the laboratory management platform</p>

        <!-- Login Form -->
        <form id="login-form" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 16px;">

          <!-- Email -->
          <div>
            <label for="login-email" style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 6px;
            ">Email address</label>
            <input
              type="email"
              id="login-email"
              placeholder="you@university.edu"
              autocomplete="email"
              style="
                width: 100%;
                padding: 10px 14px;
                border: 1.5px solid #D1D5DB;
                border-radius: 8px;
                font-size: 14px;
                color: #111827;
                outline: none;
                box-sizing: border-box;
                transition: border-color 0.2s;
                background: #F9FAFB;
              "
              onfocus="this.style.borderColor='#4F46E5'; this.style.background='#fff';"
              onblur="this.style.borderColor='#D1D5DB'; this.style.background='#F9FAFB';"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="login-password" style="
              display: block;
              font-size: 13px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 6px;
            ">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="••••••••"
              autocomplete="current-password"
              style="
                width: 100%;
                padding: 10px 14px;
                border: 1.5px solid #D1D5DB;
                border-radius: 8px;
                font-size: 14px;
                color: #111827;
                outline: none;
                box-sizing: border-box;
                transition: border-color 0.2s;
                background: #F9FAFB;
              "
              onfocus="this.style.borderColor='#4F46E5'; this.style.background='#fff';"
              onblur="this.style.borderColor='#D1D5DB'; this.style.background='#F9FAFB';"
            />
          </div>

          <!-- Error Message -->
          <div
            id="login-error"
            role="alert"
            style="
              display: none;
              background: #FEF2F2;
              border: 1px solid #FECACA;
              color: #DC2626;
              border-radius: 8px;
              padding: 10px 14px;
              font-size: 13px;
              font-weight: 500;
            "
          ></div>

          <!-- Sign In Button -->
          <button
            type="submit"
            id="login-submit-btn"
            style="
              width: 100%;
              padding: 11px 0;
              background: #4F46E5;
              color: #fff;
              border: none;
              border-radius: 8px;
              font-size: 15px;
              font-weight: 600;
              cursor: pointer;
              letter-spacing: 0.2px;
              transition: background 0.2s, transform 0.1s;
              margin-top: 4px;
            "
            onmouseover="this.style.background='#4338CA';"
            onmouseout="this.style.background='#4F46E5';"
            onmousedown="this.style.transform='scale(0.98)';"
            onmouseup="this.style.transform='scale(1)';"
          >Sign In</button>
        </form>

        <!-- Divider -->
        <div style="
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 16px;
        ">
          <div style="flex: 1; height: 1px; background: #E5E7EB;"></div>
          <span style="font-size: 12px; color: #9CA3AF; white-space: nowrap;">or sign in quickly as</span>
          <div style="flex: 1; height: 1px; background: #E5E7EB;"></div>
        </div>

        <!-- Quick Login Buttons — 2×2 Grid -->
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        ">
          <button
            data-action="quick-login"
            data-id="student1"
            style="
              padding: 10px 8px;
              border: 1.5px solid #E0E7FF;
              border-radius: 8px;
              background: #EEF2FF;
              color: #3730A3;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-align: center;
              transition: background 0.2s, border-color 0.2s;
              line-height: 1.4;
            "
            onmouseover="this.style.background='#E0E7FF'; this.style.borderColor='#818CF8';"
            onmouseout="this.style.background='#EEF2FF'; this.style.borderColor='#E0E7FF';"
          >👩‍🎓 Alice Chen<br><span style="font-size:11px; color:#6366F1;">(Student)</span></button>

          <button
            data-action="quick-login"
            data-id="student2"
            style="
              padding: 10px 8px;
              border: 1.5px solid #E0E7FF;
              border-radius: 8px;
              background: #EEF2FF;
              color: #3730A3;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-align: center;
              transition: background 0.2s, border-color 0.2s;
              line-height: 1.4;
            "
            onmouseover="this.style.background='#E0E7FF'; this.style.borderColor='#818CF8';"
            onmouseout="this.style.background='#EEF2FF'; this.style.borderColor='#E0E7FF';"
          >👨‍🎓 Bob Kumar<br><span style="font-size:11px; color:#6366F1;">(Student)</span></button>

          <button
            data-action="quick-login"
            data-id="faculty1"
            style="
              padding: 10px 8px;
              border: 1.5px solid #D1FAE5;
              border-radius: 8px;
              background: #ECFDF5;
              color: #065F46;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-align: center;
              transition: background 0.2s, border-color 0.2s;
              line-height: 1.4;
            "
            onmouseover="this.style.background='#D1FAE5'; this.style.borderColor='#6EE7B7';"
            onmouseout="this.style.background='#ECFDF5'; this.style.borderColor='#D1FAE5';"
          >👩‍🏫 Dr. Sarah<br><span style="font-size:11px; color:#059669;">(Faculty)</span></button>

          <button
            data-action="quick-login"
            data-id="admin"
            style="
              padding: 10px 8px;
              border: 1.5px solid #FEE2E2;
              border-radius: 8px;
              background: #FFF5F5;
              color: #7F1D1D;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-align: center;
              transition: background 0.2s, border-color 0.2s;
              line-height: 1.4;
            "
            onmouseover="this.style.background='#FEE2E2'; this.style.borderColor='#FCA5A5';"
            onmouseout="this.style.background='#FFF5F5'; this.style.borderColor='#FEE2E2';"
          >⚙️ Admin<br><span style="font-size:11px; color:#DC2626;">(Administrator)</span></button>
        </div>

        <!-- Footer -->
        <p style="
          margin-top: 36px;
          text-align: center;
          font-size: 11px;
          color: #9CA3AF;
          letter-spacing: 0.3px;
        ">University Laboratory Management System v2.0</p>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════
         RIGHT SIDE — Feature Highlights / Hero
    ═══════════════════════════════════════════════════ -->
    <div class="login-right" style="
      flex: 1.2;
      background: linear-gradient(135deg, #4F46E5 0%, #3730A3 40%, #1E1B6E 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px 48px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Decorative background circles -->
      <div style="
        position: absolute; top: -80px; right: -80px;
        width: 320px; height: 320px;
        border-radius: 50%;
        background: rgba(255,255,255,0.05);
        pointer-events: none;
      "></div>
      <div style="
        position: absolute; bottom: -100px; left: -60px;
        width: 280px; height: 280px;
        border-radius: 50%;
        background: rgba(255,255,255,0.04);
        pointer-events: none;
      "></div>

      <div style="width: 100%; max-width: 480px; position: relative; z-index: 1;">

        <!-- Main Headline -->
        <h2 style="
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          margin: 0 0 14px 0;
          letter-spacing: -0.5px;
        ">Intelligent Lab<br>Resource Management</h2>
        <p style="
          font-size: 15px;
          color: #A5B4FC;
          margin: 0 0 36px 0;
          line-height: 1.6;
        ">Everything your lab team needs — smarter, faster, in one place.</p>

        <!-- Feature Cards -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px;">

          <!-- Card 1: AI Experiment Autopilot -->
          <div style="
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 14px;
            padding: 18px 20px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            transition: background 0.2s;
          "
          onmouseover="this.style.background='rgba(255,255,255,0.15)';"
          onmouseout="this.style.background='rgba(255,255,255,0.1)';"
          >
            <div style="
              font-size: 26px;
              line-height: 1;
              flex-shrink: 0;
              margin-top: 2px;
            ">✨</div>
            <div>
              <div style="
                font-size: 15px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 4px;
              ">AI Experiment Autopilot</div>
              <div style="
                font-size: 13px;
                color: #C7D2FE;
                line-height: 1.5;
              ">Describe your project, AI plans everything — equipment, timeline, and resources.</div>
            </div>
          </div>

          <!-- Card 2: Smart Booking Engine -->
          <div style="
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 14px;
            padding: 18px 20px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            transition: background 0.2s;
          "
          onmouseover="this.style.background='rgba(255,255,255,0.15)';"
          onmouseout="this.style.background='rgba(255,255,255,0.1)';"
          >
            <div style="
              font-size: 26px;
              line-height: 1;
              flex-shrink: 0;
              margin-top: 2px;
            ">📅</div>
            <div>
              <div style="
                font-size: 15px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 4px;
              ">Smart Booking Engine</div>
              <div style="
                font-size: 13px;
                color: #C7D2FE;
                line-height: 1.5;
              ">Real-time availability, automatic conflict prevention, and instant confirmations.</div>
            </div>
          </div>

          <!-- Card 3: Campus Lab Heatmap -->
          <div style="
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 14px;
            padding: 18px 20px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            transition: background 0.2s;
          "
          onmouseover="this.style.background='rgba(255,255,255,0.15)';"
          onmouseout="this.style.background='rgba(255,255,255,0.1)';"
          >
            <div style="
              font-size: 26px;
              line-height: 1;
              flex-shrink: 0;
              margin-top: 2px;
            ">🗺️</div>
            <div>
              <div style="
                font-size: 15px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 4px;
              ">Campus Lab Heatmap</div>
              <div style="
                font-size: 13px;
                color: #C7D2FE;
                line-height: 1.5;
              ">Visual resource distribution across campus — spot availability at a glance.</div>
            </div>
          </div>

        </div>

        <!-- Stats Row -->
        <div style="
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 24px;
        ">
          <div style="text-align: center; padding: 0 8px;">
            <div style="font-size: 20px; font-weight: 800; color: #fff;">40+</div>
            <div style="font-size: 11px; color: #A5B4FC; margin-top: 3px; line-height: 1.4;">Equipment</div>
          </div>
          <div style="text-align: center; padding: 0 8px; border-left: 1px solid rgba(255,255,255,0.15);">
            <div style="font-size: 20px; font-weight: 800; color: #fff;">6</div>
            <div style="font-size: 11px; color: #A5B4FC; margin-top: 3px; line-height: 1.4;">Labs</div>
          </div>
          <div style="text-align: center; padding: 0 8px; border-left: 1px solid rgba(255,255,255,0.15);">
            <div style="font-size: 20px; font-weight: 800; color: #fff;">500+</div>
            <div style="font-size: 11px; color: #A5B4FC; margin-top: 3px; line-height: 1.4;">Students</div>
          </div>
          <div style="text-align: center; padding: 0 8px; border-left: 1px solid rgba(255,255,255,0.15);">
            <div style="font-size: 20px; font-weight: 800; color: #fff;">95%</div>
            <div style="font-size: 11px; color: #A5B4FC; margin-top: 3px; line-height: 1.4;">Uptime</div>
          </div>
        </div>

      </div>
    </div>
  </div>`;
};

// ─────────────────────────────────────────────────────────
// Attach event listeners after renderLoginPage() mounts
// ─────────────────────────────────────────────────────────
window.attachLoginListeners = function () {
  // Wire form submit → handleLogin
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email    = (document.getElementById('login-email')?.value    || '').trim();
      const password = (document.getElementById('login-password')?.value || '').trim();
      window.handleLogin(email, password);
    });

    // Allow Enter key on the submit button too
    const btn = document.getElementById('login-submit-btn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const email    = (document.getElementById('login-email')?.value    || '').trim();
        const password = (document.getElementById('login-password')?.value || '').trim();
        window.handleLogin(email, password);
      });
    }
  }

  // Quick-login buttons are handled via global data-action delegation.
  // If delegation is not set up globally, wire them locally here as a fallback.
  document.querySelectorAll('[data-action="quick-login"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const roleKey = btn.getAttribute('data-id');
      window.handleQuickLogin(roleKey);
    });
  });
};

// ─────────────────────────────────────────────────────────
// Core login logic
// ─────────────────────────────────────────────────────────
window.handleLogin = function (email, password) {
  const errorEl = document.getElementById('login-error');

  // Hide any previous error
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.textContent   = '';
  }

  // Validate credentials against LabLink data store
  const user = window.LabLinkData && window.LabLinkData.getUserByEmail(email);

  if (!user || user.password !== password) {
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent   = 'Invalid email or password';
    }
    return;
  }

  // Persist session
  localStorage.setItem('lablink_user', JSON.stringify(user));

  // Update global app state
  AppState.currentUser = user;
  AppState.currentPage = 'dashboard';

  // Re-render application shell
  render();

  // Success toast
  showToast('Welcome back, ' + user.name + '!', 'success');
};

// ─────────────────────────────────────────────────────────
// Quick-login helper: maps button data-id → credentials
// ─────────────────────────────────────────────────────────
window.handleQuickLogin = function (roleKey) {
  const map = {
    'student1': { email: 'alice@university.edu', password: 'student123' },
    'student2': { email: 'bob@university.edu',   password: 'student123' },
    'faculty1': { email: 'sarah@university.edu', password: 'faculty123' },
    'admin':    { email: 'admin@university.edu', password: 'admin123'   }
  };

  const creds = map[roleKey];
  if (creds) {
    window.handleLogin(creds.email, creds.password);
  } else {
    console.warn('[LabLink] handleQuickLogin: unknown roleKey →', roleKey);
  }
};
