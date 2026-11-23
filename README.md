# LabLink — Futuristic AI Laboratory Ecosystem & Prototype Builder

> **Making College Laboratories More Accessible & Transforming Student Ideas into Verified Prototypes**

LabLink is an award-winning university laboratory resource ecosystem and AI-powered hardware prototype building platform. Built with a futuristic 3D light-theme visual interface, LabLink connects equipment discovery, real-time booking, faculty supervision, and equipment rescue with intelligent experiment planning, interactive circuit diagrams, curated video intelligence, and step-by-step assembly guidance.

---

## 🚀 Quick Launch

LabLink is completely self-contained with **zero installation steps, zero build configurations, and zero framework dependencies**:
1. Open [`index.html`](file:///C:/Users/basava/.gemini/antigravity/scratch/lablink/index.html) in any modern web browser.
2. The platform instantly boots with live seeded campus inventory, active student reservations, project blueprints, circuit schematics, and role profiles.

---

## 👥 Demo User Accounts & Roles

Switch roles instantly using the **Quick Login** buttons on the sign-in screen or the bottom sidebar in the app:

| Role | Name | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Alice Chen | `alice@university.edu` | `student123` | AI Autopilot, Prototype Builder, Watch & Build Studio, Circuit Diagrams, Portfolio |
| **Student** | Bob Kumar | `bob@university.edu` | `student123` | Active reservations, team workspace, compatibility testing |
| **Faculty** | Dr. Sarah Johnson | `sarah@university.edu` | `faculty123` | Authorize/decline bookings, review AI recommendations, trigger Equipment Rescue Mode |
| **Faculty** | Dr. Michael Park | `michael@university.edu` | `faculty123` | Mechanical workshop oversight, urgent student capstone approvals |
| **Admin** | Campus Admin | `admin@university.edu` | `admin123` | Campus Resource Heatmap, department utilization metrics, user provisioning |

---

## 🌟 Master Features Tour

### 1. Futuristic 3D Light-Theme UI/UX
- **Visual Identity:** Clean white surfaces, soft blue gradients, electric blue accents, cyan highlights, deep navy typography, and translucent glass cards.
- **3D Microchip Hero Section:** Animated 3D floating microchip graphic with orbital particles and inspirational motto (*"Your Ideas Deserve a Laboratory"*).
- **Usability Balance:** 70% clean usability, 20% futuristic identity, 10% lightweight CSS 3D animations with reduced-motion support.

### 2. AI Experiment Autopilot with Video Intelligence (Signature Feature)
- **Natural Language Parsing:** Students describe experiments (e.g. *Autonomous Line-Following Robot*, *Water Quality Spectrometry*, *IoT Sensor PCB*, *Plant Photobiology*).
- **Engineering Decomposition:** Generates project complexity, budget estimates, required components, compatibility checks, and execution schedules.
- **Video Intelligence:** Dedicated section recommending verified YouTube educational tutorials across 6 categories:
  - *Understand Components* (Sensor theory, motor driver architecture, MCU pinouts)
  - *Circuit & Wiring* (Complete physical schematic assembly)
  - *Complete Assembly* (Chassis construction and wheel mounting)
  - *Programming* (Embedded C++ firmware and state machines)
  - *Testing & Calibration* (Optical reflectance threshold tuning)
  - *Troubleshooting* (Diagnosing motor stalls, jitter, and noise)
- **Direct Prototype Handoff:** Prominent **"BUILD MY PROTOTYPE"** button launching the engineering workspace.

### 3. Interactive AI Prototype Builder
- **Project Metrics:** Difficulty rating, estimated build hours, lab room allocation, and real-time progress percentage.
- **Component Verification Checklist:** Real-time inventory check with collection checkboxes.
- **Interactive SVG Circuit Diagram Generator:**
  - Microcontroller, motor driver, IR reflectance sensors, geared DC motors, battery.
  - Interactive click-to-highlight wire tracing: clicking any wire illuminates the connection path and displays electrical purpose and laboratory safety warnings.
- **10-Stage Step-by-Step Assembly Guide:** Sequential physical construction milestones with completion toggles and dynamic progress recalculation.
- **Embedded C++ Firmware Workspace:** Complete formatted Arduino code with pin allocation map, upload guide, common compiler error diagnoses, and one-click copy.
- **AI Hardware Diagnostic Troubleshooter:** Step-by-step diagnostic workflows for motor buzzing, line veering, brownout restarts, and sensor saturation.
- **Cost Estimator:** Transparent breakdown between university lab covered value ($32.00 free) vs consumable items ($6.50).

### 4. Interactive Watch & Build Studio
- **Synchronized Split-Screen:** Left panel displays the interactive circuit diagram and pinout instructions; right panel displays the verified tutorial video player.
- **Step-to-Video Synchronization:** Clicking any construction step highlights the exact wire path in the schematic and synchronizes the matching tutorial video.
- **Bottom Assembly Checklist:** Live progress tracker ensuring students never miss crucial power or ground steps.

### 5. Equipment Discovery Marketplace & Smart Booking
- **High-Fidelity Cards:** Representative equipment imagery, department badges, lab room, total vs available quantity, availability progress bar, condition badge, star rating, and technical spec chips.
- **Search & Filters:** Search by keywords, filter by department or status (Available, Limited, Maintenance), and sort by Name, Availability, Rating, or Department.
- **Double-Booking Prevention:** True mathematical interval overlap checking ensuring physical inventory counts are never exceeded.
- **Equipment Rescue Mode:** When an apparatus goes offline for maintenance, Rescue Mode auto-detects affected student reservations, identifies cross-department alternatives, and provides 1-click auto-rebooking.

### 6. Student Project Portfolio & Team Workspace
- **Innovation Showcase:** Showcase completed prototypes, trial logs, verified code lines, and supervisor scores.
- **Photo Upload:** Attach high-resolution bench photos to project records.
- **Collaborative Teams:** Create multi-disciplinary teams, track shared equipment, schedule lab meetings, and manage project milestones.

### 7. Faculty Operations Dashboard
- **Prioritized Authorizations:** Student project objectives, capstone deadline countdowns (e.g., *🚨 7 Days Left*), and AI recommendation badges.
- **Actions:** Approve, Decline (with customized feedback), or propose alternative rescheduling slots.
- **Lab Utilization & AI Fairness:** Bar charts showing room load and AI scheduling fairness insights.

### 8. Campus Resource Heatmap & Admin Command Center
- **8 KPI Executive Metrics:** Total apparatuses, fully available, active checkouts, maintenance items, pending requests, users, facilities, and all-time bookings.
- **Interactive Campus Heatmap:** Color-coded campus buildings (Engineering Block A/B, Science Complex, Turing Hall, Life Sciences Center) highlighting live room capacity:
  - 🟢 Low Load (< 40%)
  - 🟡 Moderate Traffic (40% - 75%)
  - 🔴 High Contention (> 75%)
  - 🔵 Maintenance In-Progress
- **Facility Drilldowns:** Room supervisors, student capacities, operating hours, and full equipment rosters.

---

## 🏗️ Architecture & Project Directory

```
lablink/
├── index.html          # Application entry point, splash loader & script pipeline
├── styles.css          # Futuristic 3D light-theme tokens, glass cards, circuit styles & animations
├── data.js             # Seed database (42 apparatuses, 6 labs, 5 users, bookings, schedules)
├── projectsData.js     # Engineering blueprints, circuit netlists, assembly steps, videos, teams
├── layout.js           # Responsive shell, futuristic sidebar, top navbar & search
├── app.js              # State manager, router, toast notifications, modal manager, event delegates
├── README.md           # Master documentation & user guide
└── pages/
    ├── login.js        # Split-screen authentication & one-click demo login
    ├── discover.js     # Equipment discovery marketplace with search, filters & booking modal
    ├── autopilot.js    # AI Experiment Autopilot with Video Intelligence & prototype launcher
    ├── builder.js      # Interactive Prototype Builder with SVG circuit schematic & assembly guide
    ├── watchbuild.js   # Dual-panel Watch & Build Studio with synchronized video learning
    ├── portfolio.js    # Student project portfolio & collaborative team workspace
    ├── student.js      # Student dashboard with 3D hero, active project tracker & metrics
    ├── faculty.js      # Faculty approvals queue, scheduling fairness & Equipment Rescue Mode
    └── admin.js        # Administrator intelligence overview, campus heatmap & user accounts
```

---

## 🏆 Hackathon Context

LabLink answers the fundamental university challenge: **"Don't just find laboratory equipment. Let AI understand your project, prepare your experiment, and guide you from component discovery to verified working prototype."**
