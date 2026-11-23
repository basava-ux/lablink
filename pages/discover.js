// ============================================================
// LabLink – Equipment Discovery Page
// File: pages/discover.js
// ============================================================

// ─── Helpers ────────────────────────────────────────────────

function getStarRating(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<span class="stars">' +
    '<span class="star-full">★</span>'.repeat(full) +
    (half ? '<span class="star-half">½</span>' : '') +
    '<span class="star-empty">☆</span>'.repeat(empty) +
    '</span>'
  );
}

const DEPT_COLORS = {
  'Electronics':      '#3B82F6',
  'Mechanical':       '#F59E0B',
  'Chemistry':        '#10B981',
  'Optics':           '#8B5CF6',
  'Computer Science': '#EC4899',
  'Biology':          '#14B8A6',
};

function getDeptColor(dept) {
  return DEPT_COLORS[dept] || '#6B7280';
}

const STATUS_CLASS = {
  'Available':   'success',
  'Limited':     'warning',
  'Maintenance': 'danger',
  'Unavailable': 'danger',
};

function getStatusClass(status) {
  return STATUS_CLASS[status] || 'secondary';
}

function getAvailColor(ratio) {
  if (ratio >= 0.6) return '#10B981';
  if (ratio >= 0.3) return '#F59E0B';
  return '#EF4444';
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function generateId() {
  return 'eq-booking-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

// ─── Single Card Renderer ────────────────────────────────────

function renderEquipmentCard(eq) {
  const statusClass  = getStatusClass(eq.status);
  const deptColor    = getDeptColor(eq.department);
  const ratio        = eq.totalQuantity > 0
    ? eq.availableQuantity / eq.totalQuantity
    : 0;
  const availColor   = getAvailColor(ratio);
  const availPct     = Math.round(ratio * 100);
  const isUnavail    = eq.availableQuantity === 0;

  // First 3 spec chips
  const specKeys   = eq.specs ? Object.keys(eq.specs).slice(0, 3) : [];
  const specChips  = specKeys.map(k =>
    `<span class="spec-chip"><strong>${k}:</strong> ${eq.specs[k]}</span>`
  ).join('');

  const approvalBadge = eq.requiresFacultyApproval
    ? `<span class="badge badge-warning approval-badge">Faculty Approval</span>`
    : '';

  const tagList = (eq.tags || []).slice(0, 3).map(t =>
    `<span class="tag-chip">#${t}</span>`
  ).join('');

  return `
<div class="equipment-card card-hover" data-equipment-id="${eq.id}">
  <div class="equipment-card-image">
    <img
      src="${eq.imageUrl || ''}"
      alt="${eq.name}"
      loading="lazy"
      onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'"
    >
    <span class="badge badge-${statusClass} image-badge">${eq.status}</span>
    ${approvalBadge}
    ${eq.featured ? '<span class="badge badge-info featured-badge">⭐ Featured</span>' : ''}
  </div>
  <div class="equipment-card-body">
    <div class="equipment-card-dept">
      <span class="dept-badge" style="background:${deptColor}20;color:${deptColor}">
        ${eq.department}
      </span>
      <div class="rating" title="${eq.rating} out of 5">
        ${getStarRating(eq.rating)}
        <span class="review-count">(${eq.reviewCount || 0})</span>
      </div>
    </div>

    <h3 class="equipment-name">${eq.name}</h3>

    <p class="equipment-location">
      <i data-lucide="map-pin" width="12" height="12"></i>
      ${eq.labName}, ${eq.labRoom}
    </p>

    <div class="availability-section">
      <div class="availability-text">
        <span class="avail-count">${eq.availableQuantity}/${eq.totalQuantity}</span>
        <span class="avail-label">Available</span>
        <span class="avail-pct" style="color:${availColor}">(${availPct}%)</span>
      </div>
      <div class="availability-bar" title="${availPct}% available">
        <div
          class="availability-fill"
          style="width:${availPct}%;background:${availColor};transition:width 0.4s ease"
        ></div>
      </div>
    </div>

    ${specChips ? `<div class="spec-chips">${specChips}</div>` : ''}

    ${tagList ? `<div class="tag-chips">${tagList}</div>` : ''}

    <div class="duration-badge">
      <i data-lucide="clock" width="12" height="12"></i>
      Typical: ${eq.typicalUsageDuration || '—'}h
    </div>

    <div class="card-actions">
      <button
        class="btn btn-secondary btn-sm"
        data-action="view-equipment"
        data-id="${eq.id}"
        aria-label="View details for ${eq.name}"
      >View Details</button>
      <button
        class="btn btn-primary btn-sm"
        data-action="book-equipment"
        data-id="${eq.id}"
        ${isUnavail ? 'disabled aria-disabled="true"' : ''}
        aria-label="Book ${eq.name}"
      >Book Now</button>
    </div>
  </div>
</div>`;
}

// ─── Empty State ─────────────────────────────────────────────

function renderEmptyState(search) {
  return `
<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:4rem 1rem">
  <div style="font-size:4rem;margin-bottom:1rem">🔬</div>
  <h3 style="margin-bottom:.5rem;color:var(--text-primary)">No equipment found</h3>
  <p style="color:var(--text-secondary)">
    ${search
      ? `No results for "<strong>${search}</strong>". Try different keywords or clear your filters.`
      : 'No equipment matches your current filters. Try adjusting or clearing them.'}
  </p>
  <button class="btn btn-secondary" style="margin-top:1rem" onclick="window.clearDiscoverFilters()">
    Clear All Filters
  </button>
</div>`;
}

// ─── Active Filter Chips ─────────────────────────────────────

function renderFilterChips(search, dept, status) {
  const chips = [];
  if (search)  chips.push({ label: `Search: "${search}"`, clear: 'search' });
  if (dept)    chips.push({ label: `Dept: ${dept}`,       clear: 'dept'   });
  if (status)  chips.push({ label: `Status: ${status}`,   clear: 'status' });

  if (!chips.length) return '';

  return `
<div class="filter-chips-row" id="active-filter-chips">
  ${chips.map(c => `
    <span class="filter-chip">
      ${c.label}
      <button class="chip-close" data-clear="${c.clear}" aria-label="Remove filter">×</button>
    </span>
  `).join('')}
  <button class="btn btn-ghost btn-xs" onclick="window.clearDiscoverFilters()">Clear All</button>
</div>`;
}

// ─── Mini Booking Calendar ───────────────────────────────────

function renderMiniCalendar(equipmentId) {
  const now       = new Date();
  const year      = now.getFullYear();
  const month     = now.getMonth();
  const monthName = now.toLocaleString('default', { month: 'long' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysIn   = new Date(year, month + 1, 0).getDate();
  const today    = now.getDate();

  // Gather booked dates for this equipment
  const bookings = (window.LabLinkData.bookings || []).filter(
    b => b.equipmentId === equipmentId && b.status !== 'cancelled'
  );

  function isBooked(day) {
    const d = new Date(year, month, day);
    return bookings.some(b => {
      const s = new Date(b.startDate);
      const e = new Date(b.endDate);
      return d >= s && d <= e;
    });
  }

  let cells = '';
  // leading blanks
  for (let i = 0; i < firstDay; i++) cells += '<div class="cal-cell cal-blank"></div>';
  // day cells
  for (let d = 1; d <= daysIn; d++) {
    const booked  = isBooked(d);
    const isPast  = d < today;
    const isToday = d === today;
    const cls     = [
      'cal-cell',
      booked  ? 'cal-booked'  : '',
      isPast  ? 'cal-past'    : '',
      isToday ? 'cal-today'   : '',
      !booked && !isPast ? 'cal-available' : '',
    ].filter(Boolean).join(' ');
    cells += `<div class="${cls}" title="${booked ? 'Booked' : isPast ? 'Past' : 'Available'}">${d}</div>`;
  }

  return `
<div class="mini-calendar">
  <div class="cal-header">
    <span class="cal-month-label">${monthName} ${year}</span>
  </div>
  <div class="cal-grid cal-weekdays">
    ${['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => `<div class="cal-weekday">${d}</div>`).join('')}
  </div>
  <div class="cal-grid cal-days">${cells}</div>
  <div class="cal-legend">
    <span class="legend-dot" style="background:#10B981"></span> Available
    <span class="legend-dot" style="background:#EF4444;margin-left:.75rem"></span> Booked
    <span class="legend-dot" style="background:#D1D5DB;margin-left:.75rem"></span> Past
  </div>
</div>`;
}

// ─── Equipment Detail Modal ──────────────────────────────────

window.openEquipmentDetail = function (equipmentId) {
  const eq = window.LabLinkData.getEquipmentById(equipmentId);
  if (!eq) { showToast('Equipment not found', 'error'); return; }

  const deptColor   = getDeptColor(eq.department);
  const statusClass = getStatusClass(eq.status);
  const ratio       = eq.totalQuantity > 0 ? eq.availableQuantity / eq.totalQuantity : 0;
  const availColor  = getAvailColor(ratio);
  const availPct    = Math.round(ratio * 100);

  // Specs table
  const specsRows = eq.specs
    ? Object.entries(eq.specs).map(([k, v]) =>
        `<tr><td class="spec-key">${k}</td><td class="spec-val">${v}</td></tr>`
      ).join('')
    : '<tr><td colspan="2" class="text-muted">No specifications listed.</td></tr>';

  // Accessories
  const accessoriesHtml = eq.accessories && eq.accessories.length
    ? eq.accessories.map(a =>
        `<li class="accessory-item"><i data-lucide="package" width="14" height="14"></i> ${a}</li>`
      ).join('')
    : '<li class="text-muted">None listed</li>';

  // Compatible equipment
  const compatible = (eq.compatibleWith || []).map(id => {
    const other = window.LabLinkData.getEquipmentById(id);
    return other
      ? `<span class="compat-chip" data-action="view-equipment" data-id="${other.id}">${other.name}</span>`
      : '';
  }).join('');

  // Safety notes
  const safetyHtml = eq.safetyNotes
    ? `<div class="safety-box"><i data-lucide="alert-triangle" width="16" height="16"></i> ${eq.safetyNotes}</div>`
    : '';

  // Tags
  const tagsHtml = (eq.tags || []).map(t => `<span class="tag-chip">#${t}</span>`).join('');

  const html = `
<div class="modal-equipment-detail">
  <div class="detail-hero">
    <img
      src="${eq.imageUrl || ''}"
      alt="${eq.name}"
      class="detail-hero-img"
      onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'"
    >
    <div class="detail-hero-overlay">
      <span class="badge badge-${statusClass}">${eq.status}</span>
      ${eq.requiresFacultyApproval ? '<span class="badge badge-warning">Faculty Approval Required</span>' : ''}
    </div>
  </div>

  <div class="detail-body">
    <div class="detail-top">
      <div>
        <span class="dept-badge" style="background:${deptColor}20;color:${deptColor}">${eq.department}</span>
        <h2 class="detail-title">${eq.name}</h2>
        <p class="detail-location">
          <i data-lucide="map-pin" width="14" height="14"></i>
          ${eq.labName} · ${eq.labRoom} · ${eq.building || ''}
        </p>
      </div>
      <div class="detail-meta">
        <div class="rating-large">
          ${getStarRating(eq.rating)}
          <span>${eq.rating.toFixed(1)} (${eq.reviewCount} reviews)</span>
        </div>
        <div class="availability-section" style="margin-top:.5rem">
          <div class="availability-text">
            <span class="avail-count">${eq.availableQuantity}/${eq.totalQuantity}</span> Available
            <span class="avail-pct" style="color:${availColor}">(${availPct}%)</span>
          </div>
          <div class="availability-bar">
            <div class="availability-fill" style="width:${availPct}%;background:${availColor}"></div>
          </div>
        </div>
      </div>
    </div>

    <p class="detail-description">${eq.description || ''}</p>

    ${safetyHtml}

    <div class="detail-grid">
      <!-- Specs -->
      <div class="detail-section">
        <h4 class="section-heading"><i data-lucide="settings" width="16" height="16"></i> Specifications</h4>
        <table class="specs-table">
          <tbody>${specsRows}</tbody>
        </table>
      </div>

      <!-- Accessories -->
      <div class="detail-section">
        <h4 class="section-heading"><i data-lucide="package" width="16" height="16"></i> Accessories Included</h4>
        <ul class="accessories-list">${accessoriesHtml}</ul>
      </div>
    </div>

    <!-- Compatible Equipment -->
    ${compatible ? `
    <div class="detail-section">
      <h4 class="section-heading"><i data-lucide="link" width="16" height="16"></i> Compatible Equipment</h4>
      <div class="compat-chips">${compatible}</div>
    </div>` : ''}

    <!-- Tags -->
    ${tagsHtml ? `
    <div class="detail-section">
      <h4 class="section-heading"><i data-lucide="tag" width="16" height="16"></i> Tags</h4>
      <div class="tag-chips">${tagsHtml}</div>
    </div>` : ''}

    <!-- Usage info -->
    <div class="detail-info-row">
      <div class="info-pill"><i data-lucide="clock" width="14" height="14"></i> Typical use: ${eq.typicalUsageDuration}h</div>
      <div class="info-pill"><i data-lucide="calendar" width="14" height="14"></i> Max booking: ${eq.maxBookingDays || 7} days</div>
      <div class="info-pill"><i data-lucide="users" width="14" height="14"></i> Managed by: ${eq.managedBy || eq.labName}</div>
    </div>

    <!-- Mini Calendar -->
    <div class="detail-section">
      <h4 class="section-heading"><i data-lucide="calendar" width="16" height="16"></i> Availability Calendar</h4>
      ${renderMiniCalendar(equipmentId)}
    </div>

    <!-- Actions -->
    <div class="detail-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      <button
        class="btn btn-primary"
        ${eq.availableQuantity === 0 ? 'disabled' : ''}
        onclick="closeModal(); window.openBookingForm('${eq.id}')"
      >
        <i data-lucide="calendar-plus" width="16" height="16"></i>
        ${eq.availableQuantity === 0 ? 'Unavailable' : 'Book This Equipment'}
      </button>
    </div>
  </div>
</div>`;

  openModal(html, { size: 'large', title: eq.name });
  if (window.lucide) lucide.createIcons();

  // Wire up compatible chips
  document.querySelectorAll('.compat-chip').forEach(chip => {
    chip.style.cursor = 'pointer';
    chip.addEventListener('click', () => {
      closeModal();
      window.openEquipmentDetail(chip.dataset.id);
    });
  });
};

// ─── Booking Form Modal ──────────────────────────────────────

window.openBookingForm = function (equipmentId) {
  const eq = window.LabLinkData.getEquipmentById(equipmentId);
  if (!eq) { showToast('Equipment not found', 'error'); return; }

  const deptColor   = getDeptColor(eq.department);
  const statusClass = getStatusClass(eq.status);

  // Sensible defaults: today + 1 day
  const now       = new Date();
  const tomorrow  = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  function fmt(d) {
    return d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  }

  // Quantity options
  const maxQty = Math.max(eq.availableQuantity, 1);
  const qtyOptions = Array.from({ length: maxQty }, (_, i) => i + 1)
    .map(n => `<option value="${n}">${n}</option>`)
    .join('');

  const approvalNote = eq.requiresFacultyApproval
    ? `<div class="info-banner info-banner-warning">
        <i data-lucide="alert-triangle" width="16" height="16"></i>
        This equipment requires <strong>faculty approval</strong>. Your booking will remain
        <em>pending</em> until a faculty member approves it.
       </div>`
    : '';

  const html = `
<div class="booking-form-wrapper">
  <div class="booking-form-header">
    <img
      src="${eq.imageUrl || ''}"
      alt="${eq.name}"
      class="booking-thumb"
      onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80'"
    >
    <div>
      <span class="dept-badge" style="background:${deptColor}20;color:${deptColor}">${eq.department}</span>
      <h3 class="booking-eq-name">${eq.name}</h3>
      <p class="booking-eq-loc">
        <i data-lucide="map-pin" width="12" height="12"></i>
        ${eq.labName}, ${eq.labRoom}
      </p>
      <span class="badge badge-${statusClass}">${eq.status}</span>
    </div>
  </div>

  ${approvalNote}

  <form class="booking-form" onsubmit="event.preventDefault(); window.submitBooking('${eq.id}')">
    <div class="form-row">
      <div class="form-group">
        <label for="booking-start" class="form-label">Start Date & Time <span class="required">*</span></label>
        <input
          type="datetime-local"
          id="booking-start"
          class="input"
          value="${fmt(now)}"
          min="${fmt(now)}"
          required
        >
      </div>
      <div class="form-group">
        <label for="booking-end" class="form-label">End Date & Time <span class="required">*</span></label>
        <input
          type="datetime-local"
          id="booking-end"
          class="input"
          value="${fmt(tomorrow)}"
          min="${fmt(now)}"
          required
        >
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="booking-qty" class="form-label">Quantity <span class="required">*</span></label>
        <select id="booking-qty" class="input">
          ${qtyOptions}
        </select>
        <span class="form-hint">${eq.availableQuantity} unit(s) currently available</span>
      </div>
      <div class="form-group">
        <label class="form-label">Estimated Duration</label>
        <div id="booking-duration-display" class="duration-display">—</div>
      </div>
    </div>

    <div class="form-group">
      <label for="booking-purpose" class="form-label">Purpose / Project Description <span class="required">*</span></label>
      <textarea
        id="booking-purpose"
        class="input textarea"
        rows="4"
        placeholder="Describe your research project, experiment, or intended use of this equipment..."
        required
        minlength="10"
      ></textarea>
    </div>

    <!-- Real-time availability indicator -->
    <div id="avail-check-banner" class="avail-check-banner" style="display:none"></div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button type="submit" class="btn btn-primary" id="booking-submit-btn">
        <i data-lucide="calendar-check" width="16" height="16"></i>
        ${eq.requiresFacultyApproval ? 'Request Booking' : 'Confirm Booking'}
      </button>
    </div>
  </form>
</div>`;

  openModal(html, { size: 'medium', title: 'Book Equipment' });
  if (window.lucide) lucide.createIcons();

  // ── Real-time duration display & availability check ──────
  const startEl    = document.getElementById('booking-start');
  const endEl      = document.getElementById('booking-end');
  const qtyEl      = document.getElementById('booking-qty');
  const durationEl = document.getElementById('booking-duration-display');
  const availBanner = document.getElementById('avail-check-banner');
  const submitBtn  = document.getElementById('booking-submit-btn');

  function updateDuration() {
    const s = startEl?.value;
    const e = endEl?.value;
    if (!s || !e) { durationEl.textContent = '—'; return; }
    const diff = (new Date(e) - new Date(s)) / 3600000;
    if (diff <= 0) {
      durationEl.textContent = '⚠ Invalid range';
      durationEl.style.color = '#EF4444';
      return;
    }
    durationEl.style.color = '';
    const hours = Math.round(diff * 10) / 10;
    durationEl.textContent = hours < 24
      ? `${hours}h`
      : `${Math.floor(hours / 24)}d ${(hours % 24).toFixed(0)}h`;
  }

  function checkAvailability() {
    const s   = startEl?.value;
    const e   = endEl?.value;
    const qty = parseInt(qtyEl?.value || '1');
    if (!s || !e || new Date(s) >= new Date(e)) {
      availBanner.style.display = 'none';
      return;
    }
    const avail = window.LabLinkData.calculateAvailability(equipmentId, s, e, qty);
    availBanner.style.display = 'flex';
    if (avail.available) {
      availBanner.className = 'avail-check-banner avail-ok';
      availBanner.innerHTML = '<i data-lucide="check-circle" width="16" height="16"></i> Equipment is available for selected dates!';
      submitBtn.disabled = false;
    } else {
      availBanner.className = 'avail-check-banner avail-conflict';
      availBanner.innerHTML = `<i data-lucide="x-circle" width="16" height="16"></i> ${avail.reason || 'Equipment not available for selected dates.'}`;
      submitBtn.disabled = true;
    }
    if (window.lucide) lucide.createIcons();
  }

  if (startEl) startEl.addEventListener('change', () => { updateDuration(); checkAvailability(); });
  if (endEl)   endEl.addEventListener('change',   () => { updateDuration(); checkAvailability(); });
  if (qtyEl)   qtyEl.addEventListener('change',   checkAvailability);

  updateDuration();
};

// ─── Submit Booking ──────────────────────────────────────────

window.submitBooking = function (equipmentId) {
  const startDate = document.getElementById('booking-start')?.value;
  const endDate   = document.getElementById('booking-end')?.value;
  const quantity  = parseInt(document.getElementById('booking-qty')?.value || '1');
  const purpose   = document.getElementById('booking-purpose')?.value?.trim();

  // Validate fields
  if (!startDate || !endDate || !purpose) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  if (purpose.length < 10) {
    showToast('Please provide a more detailed purpose (at least 10 characters)', 'error');
    return;
  }
  if (new Date(startDate) >= new Date(endDate)) {
    showToast('End date/time must be after start date/time', 'error');
    return;
  }

  // Availability check
  const avail = window.LabLinkData.calculateAvailability(equipmentId, startDate, endDate, quantity);
  if (!avail.available) {
    showToast(avail.reason || 'Equipment not available for selected dates', 'error');
    return;
  }

  const eq = window.LabLinkData.getEquipmentById(equipmentId);
  if (!eq) { showToast('Equipment not found', 'error'); return; }

  const needsApproval = eq.requiresFacultyApproval;
  const booking = {
    id:            generateId(),
    bookingNumber: 'BK-' + (Math.floor(Math.random() * 90000) + 10000),
    equipmentId,
    startDate,
    endDate,
    quantity,
    purpose,
    userId:        window.AppState?.currentUser?.id || 'unknown',
    status:        needsApproval ? 'pending' : 'approved',
    createdAt:     new Date().toISOString(),
    equipmentName: eq.name,
    labName:       eq.labName,
  };

  // Persist
  window.LabLinkData.bookings.push(booking);
  eq.availableQuantity = Math.max(0, eq.availableQuantity - quantity);

  // Update AppState if present
  if (window.AppState) {
    AppState.stats = AppState.stats || {};
    AppState.stats.totalBookings = (AppState.stats.totalBookings || 0) + 1;
  }

  closeModal();

  const msg = needsApproval
    ? `Booking ${booking.bookingNumber} submitted — awaiting faculty approval`
    : `Booking ${booking.bookingNumber} confirmed!`;
  showToast(msg, 'success');

  // Refresh discover grid if visible
  if (document.getElementById('equipment-grid')) {
    window.applyDiscoverFilters && window.applyDiscoverFilters();
  }
};

// ─── Clear Filters Helper ────────────────────────────────────

window.clearDiscoverFilters = function () {
  const searchEl = document.getElementById('eq-search');
  const deptEl   = document.getElementById('eq-department');
  const statusEl = document.getElementById('eq-status');
  const sortEl   = document.getElementById('eq-sort');
  if (searchEl)  searchEl.value  = '';
  if (deptEl)    deptEl.value    = '';
  if (statusEl)  statusEl.value  = '';
  if (sortEl)    sortEl.value    = 'name';
  window.applyDiscoverFilters && window.applyDiscoverFilters();
};

// ─── Attach Listeners & Filter Logic ────────────────────────

window.attachDiscoverListeners = function () {
  const searchEl = document.getElementById('eq-search');
  const deptEl   = document.getElementById('eq-department');
  const statusEl = document.getElementById('eq-status');
  const sortEl   = document.getElementById('eq-sort');

  window.applyDiscoverFilters = function () {
    const search = searchEl?.value.toLowerCase() || '';
    const dept   = deptEl?.value   || '';
    const status = statusEl?.value || '';
    const sort   = sortEl?.value   || 'name';

    let filtered = window.LabLinkData.equipment.filter(eq => {
      if (search) {
        const haystack = [
          eq.name,
          eq.department,
          eq.labName,
          ...(eq.tags || []),
          eq.description || '',
        ].join(' ').toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (dept   && eq.department !== dept)   return false;
      if (status && eq.status     !== status) return false;
      return true;
    });

    filtered.sort((a, b) => {
      switch (sort) {
        case 'availability': return b.availableQuantity - a.availableQuantity;
        case 'rating':       return b.rating - a.rating;
        case 'dept':         return a.department.localeCompare(b.department);
        default:             return a.name.localeCompare(b.name);
      }
    });

    const grid        = document.getElementById('equipment-grid');
    const countEl     = document.getElementById('results-count');
    const chipsMount  = document.getElementById('filter-chips-mount');

    if (grid) {
      grid.innerHTML = filtered.length
        ? filtered.map(renderEquipmentCard).join('')
        : renderEmptyState(search);
    }

    if (countEl) {
      countEl.textContent =
        `Showing ${filtered.length} of ${window.LabLinkData.equipment.length} equipment`;
    }

    if (chipsMount) {
      chipsMount.innerHTML = renderFilterChips(
        searchEl?.value || '',
        dept,
        status
      );
      // Wire chip close buttons
      chipsMount.querySelectorAll('.chip-close').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.clear;
          if (target === 'search' && searchEl) searchEl.value = '';
          if (target === 'dept'   && deptEl)   deptEl.value   = '';
          if (target === 'status' && statusEl) statusEl.value = '';
          window.applyDiscoverFilters();
        });
      });
    }

    if (window.lucide) lucide.createIcons();
  };

  if (searchEl) searchEl.addEventListener('input',  debounce(window.applyDiscoverFilters, 300));
  if (deptEl)   deptEl.addEventListener('change',   window.applyDiscoverFilters);
  if (statusEl) statusEl.addEventListener('change', window.applyDiscoverFilters);
  if (sortEl)   sortEl.addEventListener('change',   window.applyDiscoverFilters);
};

// ─── Page Delegation: card click handler ────────────────────

window.handleDiscoverCardClick = function (e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const id     = btn.dataset.id;
  if (!id) return;

  if (action === 'view-equipment') window.openEquipmentDetail(id);
  if (action === 'book-equipment') window.openBookingForm(id);
};

// ─── Main Page Renderer ──────────────────────────────────────

window.renderDiscoverPage = function () {
  const equipment = window.LabLinkData.equipment;
  const total     = equipment.length;

  const deptOptions = [
    'Electronics',
    'Mechanical',
    'Chemistry',
    'Optics',
    'Computer Science',
    'Biology',
  ].map(d => `<option value="${d}">${d}</option>`).join('');

  const statusOptions = [
    ['Available',   'Available'],
    ['Limited',     'Limited'],
    ['Maintenance', 'Maintenance'],
  ].map(([v, l]) => `<option value="${v}">${l}</option>`).join('');

  const pageHtml = `
<div class="discover-page page-enter">

  <!-- ── Page Header ── -->
  <div class="page-header">
    <div class="page-header-left">
      <h1 class="page-title">
        <i data-lucide="microscope" width="28" height="28"></i>
        Equipment Discovery
      </h1>
      <p class="page-subtitle">
        Browse, filter, and book lab equipment from across all departments
      </p>
    </div>
    <div class="page-header-right">
      <span class="count-badge" title="${total} total equipment items">
        <i data-lucide="layers" width="14" height="14"></i>
        ${total} items
      </span>
    </div>
  </div>

  <!-- ── Filters Bar ── -->
  <div class="filters-bar" role="search" aria-label="Equipment search and filters">
    <div class="search-wrapper">
      <i data-lucide="search" width="18" height="18" class="search-icon"></i>
      <input
        id="eq-search"
        class="input search-input"
        type="search"
        placeholder="Search equipment, departments, tags…"
        aria-label="Search equipment"
        autocomplete="off"
        spellcheck="false"
      >
    </div>

    <select id="eq-department" class="input select-input" aria-label="Filter by department">
      <option value="">All Departments</option>
      ${deptOptions}
    </select>

    <select id="eq-status" class="input select-input" aria-label="Filter by status">
      <option value="">All Status</option>
      ${statusOptions}
    </select>

    <select id="eq-sort" class="input select-input" aria-label="Sort equipment">
      <option value="name">Name A–Z</option>
      <option value="availability">Availability</option>
      <option value="rating">Rating</option>
      <option value="dept">Department</option>
    </select>
  </div>

  <!-- ── Active filter chips (populated by JS) ── -->
  <div id="filter-chips-mount"></div>

  <!-- ── Results count ── -->
  <div class="results-meta">
    <span id="results-count" class="results-count">
      Showing ${total} of ${total} equipment
    </span>
  </div>

  <!-- ── Equipment Grid ── -->
  <div
    id="equipment-grid"
    class="equipment-grid"
    role="list"
    aria-label="Equipment listing"
  >
    ${equipment.map(renderEquipmentCard).join('')}
  </div>

</div>`;

  // After inserting the page, attach event listeners
  requestAnimationFrame(() => {
    window.attachDiscoverListeners();

    // Global card-click delegation
    const grid = document.getElementById('equipment-grid');
    if (grid) {
      grid.removeEventListener('click', window.handleDiscoverCardClick);
      grid.addEventListener('click', window.handleDiscoverCardClick);
    }

    if (window.lucide) lucide.createIcons();
  });

  return pageHtml;
};
