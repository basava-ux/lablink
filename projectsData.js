// ============================================================
// LabLink – Engineering Blueprints, Circuit Netlists & Video Intelligence
// File: projectsData.js
// ============================================================

(function () {
  'use strict';

  const projects = [
    {
      id: 'line-follower-robot',
      title: 'Autonomous Line-Following Robot',
      category: 'Robotics & Embedded Systems',
      difficulty: 'Intermediate',
      estimatedDuration: '3 Weeks (18 Lab Hours)',
      objective: 'Construct an autonomous differential-drive robot utilizing infrared reflectance sensors and an L298N dual H-bridge motor driver to accurately track a high-contrast trajectory with proportional-derivative velocity control.',
      departments: ['Electronics', 'Mechanical', 'Computer Science'],
      labLocation: 'EL-101 (Advanced Electronics Lab)',
      rating: 4.9,
      reviewCount: 42,
      progressPercent: 35,
      currentStage: 'Stage 3: Motor Driver & Power Wiring',
      budget: {
        totalCost: '$38.50',
        labProvidedValue: '$32.00 (Free via LabLink)',
        studentConsumables: '$6.50 (Batteries, acrylic plate)',
        componentsCount: 7
      },
      components: [
        {
          id: 'c-01',
          name: 'Arduino Uno R3',
          equipmentId: 'eq-001',
          quantity: 1,
          specs: 'ATmega328P, 16MHz, 14 Digital I/O (6 PWM), 5V Logic',
          purpose: 'Executes sensor polling loop, calculates differential wheel velocities, and generates PWM drive signals.',
          pinout: 'Pins D2-D3 (Sensor inputs), D5,D6,D7,D8,D9,D10 (Motor driver PWM & directional controls)',
          labStocked: true,
          collected: true,
          marketPrice: '$12.00'
        },
        {
          id: 'c-02',
          name: 'L298N Dual H-Bridge Motor Driver',
          equipmentId: 'eq-007',
          quantity: 1,
          specs: 'Dual full-bridge driver, 5V-35V operating voltage, 2A peak current per channel',
          purpose: 'Isolates microcontroller logic from noisy inductive motor spikes and supplies high-current bi-directional motor drive.',
          pinout: 'ENA, IN1, IN2 (Motor A), IN3, IN4, ENB (Motor B), 12V VCC, GND, 5V Logic Output',
          labStocked: true,
          collected: true,
          marketPrice: '$5.50'
        },
        {
          id: 'c-03',
          name: 'TCRT5000 Dual IR Reflectance Sensor Array',
          equipmentId: 'eq-001',
          quantity: 2,
          specs: 'Phototransistor + IR LED, LM393 comparator, onboard sensitivity potentiometer',
          purpose: 'Detects surface reflectivity differential between black tape (<10% reflection) and white matte floor (>80% reflection).',
          pinout: 'VCC (5V), GND, D0 (Digital threshold out), A0 (Analog reflectance value)',
          labStocked: true,
          collected: false,
          marketPrice: '$4.00'
        },
        {
          id: 'c-04',
          name: 'Geared DC Motors with Rubber Wheels',
          equipmentId: 'eq-004',
          quantity: 2,
          specs: '1:48 gear reduction ratio, 3V-6V DC, 200 RPM at 6V, 0.8 kg-cm torque',
          purpose: 'Provides reliable differential wheel propulsion and traction on smooth track tiles.',
          pinout: 'Terminal A (+), Terminal B (-)',
          labStocked: true,
          collected: false,
          marketPrice: '$7.00'
        },
        {
          id: 'c-05',
          name: '830-Point Solderless Breadboard & Jumpers',
          equipmentId: 'eq-005',
          quantity: 1,
          specs: 'Standard 2.54mm pitch, dual power distribution rails, 65-pc jumper wire ribbon',
          purpose: 'Enables solder-free distribution of 5V supply, ground reference, and sensor routing.',
          pinout: 'Top/Bottom Rails (+5V & GND), Center Contact Columns A-J',
          labStocked: true,
          collected: true,
          marketPrice: '$4.50'
        },
        {
          id: 'c-06',
          name: '7.4V / 9V DC Power Supply / Battery Pack',
          equipmentId: 'eq-006',
          quantity: 1,
          specs: '2x 18650 Li-ion holder (7.4V nominal) or regulated 9V battery with standard barrel/snap lead',
          purpose: 'Supplies isolated motor current through L298N terminal blocks without browning out Arduino 5V regulator.',
          pinout: 'Positive (+) Lead, Negative (-) Ground Lead',
          labStocked: false,
          collected: false,
          marketPrice: '$5.50'
        }
      ],
      circuit: {
        diagramTitle: 'Line-Following Robot Master Circuit Schematic',
        powerSupply: '7.4V Li-ion Battery (Motor) + 5V Regulated (Logic)',
        groundRule: 'CRITICAL: Common ground connection between Arduino GND, L298N GND, and Battery Negative (-) is required.',
        nodes: [
          { id: 'n-mcu', name: 'Arduino Uno R3', x: 260, y: 150, width: 140, height: 180, color: '#4F46E5' },
          { id: 'n-driver', name: 'L298N Driver', x: 500, y: 150, width: 140, height: 180, color: '#0EA5E9' },
          { id: 'n-ir-left', name: 'Left IR Sensor', x: 60, y: 70, width: 120, height: 90, color: '#10B981' },
          { id: 'n-ir-right', name: 'Right IR Sensor', x: 60, y: 220, width: 120, height: 90, color: '#10B981' },
          { id: 'n-motor-left', name: 'Left Motor', x: 720, y: 90, width: 110, height: 80, color: '#F59E0B' },
          { id: 'n-motor-right', name: 'Right Motor', x: 720, y: 250, width: 110, height: 80, color: '#F59E0B' },
          { id: 'n-battery', name: '7.4V Battery', x: 380, y: 390, width: 130, height: 75, color: '#EF4444' }
        ],
        wires: [
          {
            id: 'w-01',
            from: 'Arduino Uno R3',
            fromPin: '5V',
            to: 'Left & Right IR Sensors',
            toPin: 'VCC',
            color: '#EF4444',
            type: 'power',
            purpose: 'Distributes regulated 5V logic power to onboard LM393 comparators.',
            safetyWarning: 'Do NOT connect 7.4V motor battery to sensor VCC.'
          },
          {
            id: 'w-02',
            from: 'Arduino Uno R3',
            fromPin: 'GND',
            to: 'Common Ground Bus',
            toPin: 'L298N GND & Battery (-)',
            color: '#1E293B',
            type: 'ground',
            purpose: 'Establishes unified 0V electrical reference potential across logic and motor driver.',
            safetyWarning: 'Missing common ground causes erratic floating motor trigger states.'
          },
          {
            id: 'w-03',
            from: 'Left IR Sensor',
            fromPin: 'D0 OUT',
            to: 'Arduino Uno R3',
            toPin: 'Digital Pin D2',
            color: '#10B981',
            type: 'signal',
            purpose: 'Digital HIGH/LOW state indicating black line reflection threshold on left track margin.',
            safetyWarning: 'Verify potentiometer calibration before mounting chassis.'
          },
          {
            id: 'w-04',
            from: 'Right IR Sensor',
            fromPin: 'D0 OUT',
            to: 'Arduino Uno R3',
            toPin: 'Digital Pin D3',
            color: '#10B981',
            type: 'signal',
            purpose: 'Digital HIGH/LOW state indicating black line reflection threshold on right track margin.',
            safetyWarning: 'Keep sensor leads twisted to minimize motor electromagnetic noise.'
          },
          {
            id: 'w-05',
            from: 'Arduino Uno R3',
            fromPin: 'D5 (PWM)',
            to: 'L298N Driver',
            toPin: 'ENA (Speed Left)',
            color: '#8B5CF6',
            type: 'control',
            purpose: 'Pulse-Width Modulation output (0-255) controlling left wheel rotational speed.',
            safetyWarning: 'Ensure onboard ENA jumper is removed from L298N board.'
          },
          {
            id: 'w-06',
            from: 'Arduino Uno R3',
            fromPin: 'D6, D7',
            to: 'L298N Driver',
            toPin: 'IN1, IN2 (Dir Left)',
            color: '#3B82F6',
            type: 'control',
            purpose: 'Directional logic pins controlling forward, reverse, and active braking for Left Motor.',
            safetyWarning: 'Never set both IN1 & IN2 to high simultaneously in non-braking modes.'
          },
          {
            id: 'w-07',
            from: 'Arduino Uno R3',
            fromPin: 'D8, D9',
            to: 'L298N Driver',
            toPin: 'IN3, IN4 (Dir Right)',
            color: '#3B82F6',
            type: 'control',
            purpose: 'Directional logic pins controlling forward, reverse, and active braking for Right Motor.',
            safetyWarning: 'Match polarity with left wheel to avoid counter-rotation.'
          },
          {
            id: 'w-08',
            from: 'Arduino Uno R3',
            fromPin: 'D10 (PWM)',
            to: 'L298N Driver',
            toPin: 'ENB (Speed Right)',
            color: '#8B5CF6',
            type: 'control',
            purpose: 'Pulse-Width Modulation output (0-255) controlling right wheel rotational speed.',
            safetyWarning: 'Ensure onboard ENB jumper is removed from L298N board.'
          },
          {
            id: 'w-09',
            from: 'L298N Driver',
            fromPin: 'OUT1, OUT2',
            to: 'Left DC Motor',
            toPin: 'Terminals (+/-)',
            color: '#F59E0B',
            type: 'motor',
            purpose: 'High-current H-bridge driver outputs delivering up to 1.5A to Left Motor coils.',
            safetyWarning: 'Ensure motor solder tabs are insulated with heat-shrink tubing.'
          },
          {
            id: 'w-10',
            from: 'L298N Driver',
            fromPin: 'OUT3, OUT4',
            to: 'Right DC Motor',
            toPin: 'Terminals (+/-)',
            color: '#F59E0B',
            type: 'motor',
            purpose: 'High-current H-bridge driver outputs delivering up to 1.5A to Right Motor coils.',
            safetyWarning: 'Ensure motor solder tabs are insulated with heat-shrink tubing.'
          },
          {
            id: 'w-11',
            from: '7.4V Battery Pack',
            fromPin: 'Positive (+)',
            to: 'L298N Driver',
            toPin: '12V Power Screw Terminal',
            color: '#DC2626',
            type: 'power',
            purpose: 'Supplies primary motor drive voltage directly to L298N power transistors.',
            safetyWarning: 'Install inline toggle switch or disconnect battery when uploading code.'
          }
        ]
      },
      assemblySteps: [
        {
          stepNumber: 1,
          title: 'Inventory & Component Checkout',
          stage: 'Preparation',
          instructions: 'Collect Arduino Uno R3, L298N module, breadboard, and jumper ribbon from EL-101 lab storage. Verify multimeter continuity on motor leads.',
          safetyNote: 'Inspect battery pack leads for any insulation fraying before connecting.',
          wiringRef: null,
          tutorialRef: 'vid-03',
          completed: true
        },
        {
          stepNumber: 2,
          title: 'Mechanical Chassis & Motor Assembly',
          stage: 'Mechanical Build',
          instructions: 'Mount the dual DC geared motors to the acrylic chassis base plate using M3 machine screws. Affix the free-spinning omnidirectional front caster wheel.',
          safetyNote: 'Do not overtighten screws against acrylic to prevent stress cracking.',
          wiringRef: null,
          tutorialRef: 'vid-06',
          completed: true
        },
        {
          stepNumber: 3,
          title: 'Mount L298N Driver & Arduino Controller',
          stage: 'Component Placement',
          instructions: 'Secure the L298N motor driver module on the rear tier and the Arduino Uno board on the center tier using nylon standoffs.',
          safetyNote: 'Ensure PCB solder joints do not touch conductive metal brackets.',
          wiringRef: null,
          tutorialRef: 'vid-02',
          completed: false
        },
        {
          stepNumber: 4,
          title: 'Motor Output Terminal Connections',
          stage: 'Power Wiring',
          instructions: 'Connect Left Motor wires to L298N OUT1 & OUT2 screw terminals. Connect Right Motor wires to OUT3 & OUT4 terminals. Tighten terminal screws firmly.',
          safetyNote: 'Keep motor wire pairs twisted to reduce high-frequency electrical noise.',
          wiringRef: 'w-09, w-10',
          tutorialRef: 'vid-05',
          completed: false
        },
        {
          stepNumber: 5,
          title: 'Common Ground & Battery Power Bus',
          stage: 'Power Wiring',
          instructions: 'Connect battery positive (+) to L298N 12V terminal. Connect battery negative (-) to L298N GND terminal. Run a jumper from L298N GND to Arduino GND pin.',
          safetyNote: 'MANDATORY COMMON GROUND: Leaving Arduino and L298N grounds separated will cause erratic motor behavior.',
          wiringRef: 'w-02, w-11',
          tutorialRef: 'vid-04',
          completed: false
        },
        {
          stepNumber: 6,
          title: 'Logic Control & PWM Signal Wiring',
          stage: 'Logic Wiring',
          instructions: 'Remove onboard ENA & ENB black jumpers on L298N. Connect Arduino Pin D5 to ENA, D6 to IN1, D7 to IN2, D8 to IN3, D9 to IN4, and D10 to ENB.',
          safetyNote: 'Verify pin numbers in code match the physical jumper pin headers.',
          wiringRef: 'w-05, w-06, w-07, w-08',
          tutorialRef: 'vid-04',
          completed: false
        },
        {
          stepNumber: 7,
          title: 'Front IR Sensor Array Positioning',
          stage: 'Sensor Mounting',
          instructions: 'Affix the two TCRT5000 IR sensor modules onto the underside of the front bumper. Spacing between sensor lenses should be approximately 15mm-20mm.',
          safetyNote: 'Maintain optical clearance of 5mm-10mm between sensor lenses and track surface.',
          wiringRef: null,
          tutorialRef: 'vid-01',
          completed: false
        },
        {
          stepNumber: 8,
          title: 'Sensor Power & Signal Routing',
          stage: 'Signal Wiring',
          instructions: 'Connect sensor VCC pins to Arduino 5V header. Connect sensor GND pins to breadboard ground rail. Connect Left Sensor D0 to Pin D2, and Right Sensor D0 to Pin D3.',
          safetyNote: 'Triple check sensor polarity. Reversing VCC/GND damages the LM393 comparator chip.',
          wiringRef: 'w-01, w-03, w-04',
          tutorialRef: 'vid-04',
          completed: false
        },
        {
          stepNumber: 9,
          title: 'Firmware Upload & Pin Calibration',
          stage: 'Firmware Deployment',
          instructions: 'Connect Arduino via USB to workstation. In Arduino IDE, select Board: "Arduino Uno", Port: COMx. Compile and upload the starter sketch.',
          safetyNote: 'Disconnect battery power toggle while USB cable is plugged in.',
          wiringRef: null,
          tutorialRef: 'vid-07',
          completed: false
        },
        {
          stepNumber: 10,
          title: 'Track Testing & Optical Sensitivity Tuning',
          stage: 'Testing & Optimization',
          instructions: 'Place the robot on white test mat with black electrical tape. Use precision screwdriver to tune potentiometer until onboard LED activates strictly over black line.',
          safetyNote: 'Keep hands clear of spinning wheels during bench calibration.',
          wiringRef: null,
          tutorialRef: 'vid-08',
          completed: false
        }
      ],
      programming: {
        language: 'C++ / Embedded Wiring (Arduino)',
        board: 'Arduino Uno R3 (ATmega328P)',
        baudRate: 9600,
        pinDefinitions: [
          { name: 'LEFT_SENSOR_PIN', pin: 2, mode: 'INPUT', desc: 'Left TCRT5000 digital threshold output' },
          { name: 'RIGHT_SENSOR_PIN', pin: 3, mode: 'INPUT', desc: 'Right TCRT5000 digital threshold output' },
          { name: 'ENA_PWM_LEFT', pin: 5, mode: 'OUTPUT (PWM)', desc: 'Left motor velocity modulation (0-255)' },
          { name: 'IN1_LEFT_FWD', pin: 6, mode: 'OUTPUT', desc: 'Left motor forward bridge gate' },
          { name: 'IN2_LEFT_REV', pin: 7, mode: 'OUTPUT', desc: 'Left motor reverse bridge gate' },
          { name: 'IN3_RIGHT_FWD', pin: 8, mode: 'OUTPUT', desc: 'Right motor forward bridge gate' },
          { name: 'IN4_RIGHT_REV', pin: 9, mode: 'OUTPUT', desc: 'Right motor reverse bridge gate' },
          { name: 'ENB_PWM_RIGHT', pin: 10, mode: 'OUTPUT (PWM)', desc: 'Right motor velocity modulation (0-255)' }
        ],
        code: `// ============================================================
// LabLink Autonomous Line-Following Robot Controller v2.4
// Hardware: Arduino Uno R3 + L298N Dual H-Bridge + 2x TCRT5000
// ============================================================

// Pin Declarations
const int PIN_IR_LEFT   = 2;  // Left Optical Sensor Output
const int PIN_IR_RIGHT  = 3;  // Right Optical Sensor Output

// L298N Motor Driver PWM Velocity Channels
const int PIN_ENA_PWM   = 5;  // Left Motor Speed (0 - 255)
const int PIN_ENB_PWM   = 10; // Right Motor Speed (0 - 255)

// L298N Directional Bridge Logic
const int PIN_IN1 = 6;        // Left Motor FWD
const int PIN_IN2 = 7;        // Left Motor REV
const int PIN_IN3 = 8;        // Right Motor FWD
const int PIN_IN4 = 9;        // Right Motor REV

// Speed Constants (tune between 140 - 230 based on surface grip)
const int SPEED_CRUISE = 175;
const int SPEED_TURN   = 195;
const int SPEED_CORRECTION_SLOW = 60;

void setup() {
  Serial.begin(9600);
  Serial.println(F("[LabLink] Initializing Line Follower Autopilot..."));

  // Configure Sensor Inputs
  pinMode(PIN_IR_LEFT, INPUT);
  pinMode(PIN_IR_RIGHT, INPUT);

  // Configure Motor Driver Outputs
  pinMode(PIN_ENA_PWM, OUTPUT);
  pinMode(PIN_ENB_PWM, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);
  pinMode(PIN_IN3, OUTPUT);
  pinMode(PIN_IN4, OUTPUT);

  // Safety: Ensure motors are parked on boot
  haltMotors();
  delay(1000); // 1-second orientation pause
  Serial.println(F("[LabLink] Motors Armed. Autopilot Active."));
}

void loop() {
  // Read digital threshold: LOW = Black Line detected, HIGH = White Surface
  int leftReading  = digitalRead(PIN_IR_LEFT);
  int rightReading = digitalRead(PIN_IR_RIGHT);

  // DECISION MATRIX
  if (leftReading == LOW && rightReading == LOW) {
    // Both sensors centered on track junction or thick line -> Drive Straight
    driveForward(SPEED_CRUISE, SPEED_CRUISE);
  }
  else if (leftReading == LOW && rightReading == HIGH) {
    // Left sensor triggered line -> Robot drifted right -> Pivot Left
    pivotLeft(SPEED_TURN);
  }
  else if (leftReading == HIGH && rightReading == LOW) {
    // Right sensor triggered line -> Robot drifted left -> Pivot Right
    pivotRight(SPEED_TURN);
  }
  else {
    // Off-track failsafe: Resume slow forward creep or stop
    driveForward(SPEED_CORRECTION_SLOW, SPEED_CORRECTION_SLOW);
  }

  delay(5); // 200Hz loop cycle rate
}

// Low-Level Motor Control Functions
void driveForward(int speedLeft, int speedRight) {
  analogWrite(PIN_ENA_PWM, speedLeft);
  analogWrite(PIN_ENB_PWM, speedRight);
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
}

void pivotLeft(int turnSpeed) {
  analogWrite(PIN_ENA_PWM, SPEED_CORRECTION_SLOW);
  analogWrite(PIN_ENB_PWM, turnSpeed);
  // Counter-rotate or feather left side
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, HIGH);
  digitalWrite(PIN_IN3, HIGH);
  digitalWrite(PIN_IN4, LOW);
}

void pivotRight(int turnSpeed) {
  analogWrite(PIN_ENA_PWM, turnSpeed);
  analogWrite(PIN_ENB_PWM, SPEED_CORRECTION_SLOW);
  digitalWrite(PIN_IN1, HIGH);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, HIGH);
}

void haltMotors() {
  analogWrite(PIN_ENA_PWM, 0);
  analogWrite(PIN_ENB_PWM, 0);
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, LOW);
  digitalWrite(PIN_IN3, LOW);
  digitalWrite(PIN_IN4, LOW);
}`,
        uploadGuide: [
          'Step 1: Open Arduino IDE (v2.0+ recommended) on your lab workstation.',
          'Step 2: Connect the Arduino Uno using the blue USB-B cable.',
          'Step 3: Select Tools > Board > Arduino AVR Boards > Arduino Uno.',
          'Step 4: Select Tools > Port > COMx (on Windows) or /dev/ttyUSBx (on Linux/Mac).',
          'Step 5: Click the circular checkmark (Verify) to compile the code without errors.',
          'Step 6: Click the arrow button (Upload). Observe TX/RX LEDs blinking rapidly.'
        ],
        commonErrors: [
          { error: 'avrdude: ser_open(): can\'t open device', cause: 'Selected wrong COM port or another program (Serial Monitor) is holding the serial port open.', fix: 'Close other serial windows, re-plug USB cable, and select the newly populated COM port under Tools > Port.' },
          { error: 'Motors buzzing but wheels stationary', cause: 'PWM value too low to overcome motor gearbox static friction, or battery voltage dropped under 6V.', fix: 'Increase SPEED_CRUISE to at least 180, and verify battery voltage with laboratory multimeter.' },
          { error: 'Robot spins in circles continuously', cause: 'Motor polarity reversed on OUT1/OUT2 or OUT3/OUT4 terminals.', fix: 'Swap the two wires connected to the spinning wheel\'s terminal block on the L298N.' }
        ]
      },
      videos: [
        {
          id: 'vid-01',
          youtubeId: 'w8V_S9N9r5g',
          title: 'How TCRT5000 IR Reflectance Sensors Work & LM393 Comparator Calibration',
          channel: 'DroneBot Workshop',
          category: 'Understand Components',
          duration: '14:22',
          stage: 'Sensor Theory & Tuning',
          thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
          description: 'Comprehensive breakdown of infrared phototransistor principles, reflective thresholding, and potentiometer sensitivity adjustment.',
          watchUrl: 'https://www.youtube.com/watch?v=w8V_S9N9r5g'
        },
        {
          id: 'vid-02',
          youtubeId: 'dyjo_ggEtVU',
          title: 'L298N Dual H-Bridge Motor Driver Complete Guide with Arduino',
          channel: 'HowToMechatronics',
          category: 'Understand Components',
          duration: '18:05',
          stage: 'Motor Driver Architecture',
          thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
          description: 'Learn how H-bridges invert DC motor polarity, how PWM controls RPM velocity, and why the 5V regulator jumper must be set correctly.',
          watchUrl: 'https://www.youtube.com/watch?v=dyjo_ggEtVU'
        },
        {
          id: 'vid-03',
          youtubeId: 'nL34z543fZY',
          title: 'Arduino Uno R3 Pinout & ATmega328P Architecture Walkthrough',
          channel: 'Paul McWhorter',
          category: 'Understand Components',
          duration: '22:14',
          stage: 'Microcontroller Basics',
          thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
          description: 'Explore the digital I/O register capabilities, hardware timers responsible for PWM, and ADC pins on the Arduino Uno.',
          watchUrl: 'https://www.youtube.com/watch?v=nL34z543fZY'
        },
        {
          id: 'vid-04',
          youtubeId: '4_lFq9hS_e8',
          title: 'Line Follower Robot Complete Circuit Wiring & Common Ground Explained',
          channel: 'Circuit Digest',
          category: 'Circuit & Wiring',
          duration: '16:40',
          stage: 'Breadboard & Power Routing',
          thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
          description: 'Step-by-step physical schematic assembly showing clean wire routing, jumper distribution, and preventing battery ground loops.',
          watchUrl: 'https://www.youtube.com/watch?v=4_lFq9hS_e8'
        },
        {
          id: 'vid-05',
          youtubeId: '7V1sFh0c8K0',
          title: 'Connecting L298N to Geared DC Motors with Decoupling Capacitors',
          channel: 'Mert Arduino',
          category: 'Circuit & Wiring',
          duration: '11:15',
          stage: 'Motor Lead Wiring',
          thumbnail: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&auto=format&fit=crop&q=80',
          description: 'How to solder flyback protection capacitors across motor leads to eliminate microcontroller brownouts caused by inductive kickback.',
          watchUrl: 'https://www.youtube.com/watch?v=7V1sFh0c8K0'
        },
        {
          id: 'vid-06',
          youtubeId: '1fN_g59z5wM',
          title: '2WD Smart Robot Chassis Assembly Step-by-Step with Caster Wheel',
          channel: 'Electronoobs',
          category: 'Complete Assembly',
          duration: '15:50',
          stage: 'Mechanical Construction',
          thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
          description: 'Practical assembly of the dual acrylic chassis plates, motor brackets, speed encoder discs, and center-of-gravity balancing.',
          watchUrl: 'https://www.youtube.com/watch?v=1fN_g59z5wM'
        },
        {
          id: 'vid-07',
          youtubeId: 'x3B_fP5m0-s',
          title: 'Line Following Robot Arduino Code with Proportional Control Logic',
          channel: 'Robotics Back-End',
          category: 'Programming',
          duration: '21:30',
          stage: 'Firmware Logic',
          thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
          description: 'Deep dive into writing non-blocking state loops, smoothing differential turning angles, and configuring timer PWM registers in C++.',
          watchUrl: 'https://www.youtube.com/watch?v=x3B_fP5m0-s'
        },
        {
          id: 'vid-08',
          youtubeId: '9oM8s7q6P5A',
          title: 'Tuning Line Follower for Speed and Sharp 90-Degree Turns',
          channel: 'Science Buddies',
          category: 'Testing & Calibration',
          duration: '09:45',
          stage: 'Track Optimization',
          thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
          description: 'Techniques to calibrate sensor height from ground, balance motor drag friction, and execute high-speed right-angle trajectory turns.',
          watchUrl: 'https://www.youtube.com/watch?v=9oM8s7q6P5A'
        },
        {
          id: 'vid-09',
          youtubeId: 'z4k2K9e1lM8',
          title: 'Fixing Common Line Follower Errors: Motors Spinning Wrong Way, Sensor Jitter',
          channel: 'Kevin McAleer',
          category: 'Troubleshooting',
          duration: '13:12',
          stage: 'Error Diagnostics',
          thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
          description: 'Systematic troubleshooting flow using a digital multimeter and oscilloscope to isolate code bugs from wiring disconnects.',
          watchUrl: 'https://www.youtube.com/watch?v=z4k2K9e1lM8'
        }
      ],
      troubleshooting: [
        {
          symptom: 'Motors emit high-pitch buzzing sound but wheels do not rotate',
          rootCause: 'PWM duty cycle below motor stall threshold (typically < 140/255 on 6V), or battery voltage has dropped below 6.0V under load.',
          diagnosticSteps: [
            'Measure battery terminal voltage with a multimeter while holding robot wheels.',
            'Check if onboard ENA/ENB jumpers on L298N are removed when using software PWM.',
            'Temporarily test with analogWrite(PIN_ENA_PWM, 255) to supply maximum torque.'
          ],
          solution: 'Increase cruise PWM value to at least 175 in firmware and replace/recharge 18650 Li-ion cells.',
          safetyAlert: 'Do not leave motors stalled at full PWM for more than 15 seconds to prevent overheating L298N output transistors.'
        },
        {
          symptom: 'Robot immediately veers away from black line upon detecting it',
          rootCause: 'Inverted sensor logic or swapped motor directional pins (left and right channels reversed).',
          diagnosticSteps: [
            'Open Serial Monitor at 9600 baud and inspect printouts while manually passing paper under left and right sensors.',
            'Confirm left sensor corresponds strictly to Left Motor directional control.'
          ],
          solution: 'Swap digital pin constants PIN_IR_LEFT and PIN_IR_RIGHT in firmware, or swap motor terminal leads on OUT1/OUT2 and OUT3/OUT4.',
          safetyAlert: 'Ensure battery power switch is OFF before moving screw terminal wires.'
        },
        {
          symptom: 'Arduino repeatedly restarts or reboots whenever motors engage',
          rootCause: 'Electrical brownout: Motors draw high inrush starting current, pulling 5V logic supply below ATmega328P reset threshold (4.3V).',
          diagnosticSteps: [
            'Verify that Arduino 5V pin is NOT powering the L298N 12V motor terminal block.',
            'Check that battery positive goes directly to L298N 12V terminal, not through Arduino USB or 5V rail.'
          ],
          solution: 'Maintain independent motor battery circuit and solder a 100uF 25V electrolytic capacitor across the L298N 12V and GND terminals.',
          safetyAlert: 'Observe capacitor polarity: negative stripe must face GND.'
        },
        {
          symptom: 'IR sensor onboard indicator LED remains constantly ON',
          rootCause: 'Onboard multi-turn potentiometer is turned too far towards high sensitivity, triggering on ambient room lighting.',
          diagnosticSteps: [
            'Shield sensor with your hand to see if LED turns off.',
            'Test on both glossy and matte black electrical tape.'
          ],
          solution: 'Use a precision flathead screwdriver to rotate the blue potentiometer counter-clockwise until LED activates only when black surface is within 8mm.',
          safetyAlert: 'Avoid pressing heavily on the fragile trimmer potentiometer.'
        }
      ]
    },
    {
      id: 'iot-water-analyzer',
      title: 'Automated Water Quality & Contaminant Analyzer',
      category: 'Analytical Chemistry & IoT',
      difficulty: 'Advanced',
      estimatedDuration: '4 Weeks (24 Lab Hours)',
      objective: 'Engineer an automated sampling rig combining benchtop pH electrodes, turbidity photometry, and UV-Vis absorption calibration to quantify heavy metal ion presence in simulated municipal runoff.',
      departments: ['Chemistry', 'Electronics', 'Computer Science'],
      labLocation: 'CH-301 (Analytical Chemistry Lab)',
      rating: 4.8,
      reviewCount: 29,
      progressPercent: 15,
      currentStage: 'Stage 1: Reagent Standard Calibration',
      budget: {
        totalCost: '$95.00',
        labProvidedValue: '$88.00 (Free via LabLink)',
        studentConsumables: '$7.00 (Standard buffers, cuvettes)',
        componentsCount: 6
      },
      components: [
        { id: 'cw-01', name: 'UV-Vis Spectrophotometer', equipmentId: 'eq-014', quantity: 1, specs: '190-1100 nm, 1.0 nm bandwidth, double beam', purpose: 'Measures absorption peaks to quantify trace heavy metal chelates.', pinout: 'RS-232 serial telemetry', labStocked: true, collected: false, marketPrice: '$1,200.00' },
        { id: 'cw-02', name: 'Benchtop pH & Conductivity Meter', equipmentId: 'eq-015', quantity: 1, specs: '-2 to 20 pH, 0.001 resolution, ATC', purpose: 'Records sample electrochemical potential and ionic conductivity.', pinout: 'BNC analog probe input', labStocked: true, collected: true, marketPrice: '$180.00' },
        { id: 'cw-03', name: 'Arduino Uno R3', equipmentId: 'eq-001', quantity: 1, specs: 'ATmega328P 5V microcontroller', purpose: 'Logs telemetry data, computes moving averages, and drives local OLED UI.', pinout: 'I2C (A4/A5) + Analog inputs A0/A1', labStocked: true, collected: true, marketPrice: '$12.00' },
        { id: 'cw-04', name: 'High-Speed Refrigerated Centrifuge', equipmentId: 'eq-016', quantity: 1, specs: '15,000 RPM, 21,300 x g', purpose: 'Clarifies suspended particulate matter before optical spectroscopy.', pinout: 'Standard 230V AC', labStocked: true, collected: false, marketPrice: '$850.00' },
        { id: 'cw-05', name: 'Class-A Borosilicate Titration Glassware', equipmentId: 'eq-018', quantity: 1, specs: 'ASTM E287 Class A volumetric', purpose: 'Standard volumetric dilution of analyte calibration curves.', pinout: 'Manual apparatus', labStocked: true, collected: true, marketPrice: '$45.00' }
      ],
      circuit: {
        diagramTitle: 'IoT Analytical Photometer Probe Interface',
        powerSupply: 'Regulated 5.0V USB / Lab Bench Supply',
        groundRule: 'Shielded analog ground path isolated from digital switching noise.',
        nodes: [
          { id: 'nw-mcu', name: 'Arduino Controller', x: 250, y: 150, width: 140, height: 180, color: '#4F46E5' },
          { id: 'nw-ph', name: 'pH Signal Board', x: 80, y: 80, width: 120, height: 100, color: '#10B981' },
          { id: 'nw-turb', name: 'Turbidity Sensor', x: 80, y: 220, width: 120, height: 100, color: '#0EA5E9' },
          { id: 'nw-oled', name: 'I2C OLED Screen', x: 480, y: 120, width: 130, height: 90, color: '#8B5CF6' }
        ],
        wires: [
          { id: 'ww-01', from: 'pH Signal Board', fromPin: 'Po (Analog)', to: 'Arduino Controller', toPin: 'Analog A0', color: '#10B981', type: 'signal', purpose: 'Transfers millivolt-scaled pH potential reading.', safetyWarning: 'Calibrate with pH 4.01 and 7.00 buffers before recording.' },
          { id: 'ww-02', from: 'Turbidity Sensor', fromPin: 'Analog Out', to: 'Arduino Controller', toPin: 'Analog A1', color: '#0EA5E9', type: 'signal', purpose: 'Voltage proportional to light scattering optical density.', safetyWarning: 'Keep photodiode shielded from ambient fluorescent room light.' }
        ]
      },
      assemblySteps: [
        { stepNumber: 1, title: 'Electrochemical Probe Buffer Calibration', stage: 'Chemistry Setup', instructions: 'Immerse pH glass bulb in pH 7.00 standard buffer at 25°C. Adjust zero-offset trimmer until voltage reads exactly 2.50V on pin A0.', safetyNote: 'Rinse electrode with deionized water between buffer transfers.', completed: true },
        { stepNumber: 2, title: 'Spectrophotometric Standard Curve Assembly', stage: 'Optical Calibration', instructions: 'Prepare 5 standard dilutions (1, 5, 10, 20, 50 ppm). Record 510nm absorbance on UV-Vis spectrophotometer in CH-301.', safetyNote: 'Handle quartz cuvettes exclusively by frosted vertical edges.', completed: false }
      ],
      programming: {
        language: 'C++ / Arduino',
        board: 'Arduino Uno R3',
        baudRate: 9600,
        pinDefinitions: [
          { name: 'PIN_PH_ANALOG', pin: 14, mode: 'INPUT', desc: 'Analog pin A0 from signal conditioning amplifier' },
          { name: 'PIN_TURBIDITY', pin: 15, mode: 'INPUT', desc: 'Analog pin A1 from optical receiver' }
        ],
        code: `// LabLink IoT Water Quality Monitor v1.2
const int PIN_PH = A0;
const int PIN_TURBIDITY = A1;

void setup() {
  Serial.begin(9600);
  Serial.println(F("[LabLink] Water Quality Monitor Online"));
}

void loop() {
  int rawPH = analogRead(PIN_PH);
  float voltagePH = rawPH * (5.0 / 1023.0);
  float calculatedPH = 7.0 + ((2.5 - voltagePH) / 0.18); // Calibrated slope
  
  int rawTurbidity = analogRead(PIN_TURBIDITY);
  float ntu = map(rawTurbidity, 0, 1023, 1000, 0);

  Serial.print(F("pH: ")); Serial.print(calculatedPH, 2);
  Serial.print(F(" | Turbidity NTU: ")); Serial.println(ntu, 1);
  delay(1000);
}`,
        uploadGuide: ['Select COM port in Arduino IDE and upload sketch.'],
        commonErrors: [{ error: 'pH reads constant 7.0', cause: 'Glass electrode BNC connector loose.', fix: 'Firmly twist-lock BNC bayonet onto input jack.' }]
      },
      videos: [
        {
          id: 'vid-w01',
          youtubeId: 'Zk3U9a68-yY',
          title: 'Understanding UV-Vis Spectroscopy & Beer-Lambert Law Calibration',
          channel: 'Professor Dave Explains',
          category: 'Understand Components',
          duration: '12:45',
          stage: 'Spectroscopy Theory',
          thumbnail: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&auto=format&fit=crop&q=80',
          description: 'Clear mathematical explanation of molar absorptivity, path length, and constructing reliable linear standard curves.',
          watchUrl: 'https://www.youtube.com/watch?v=Zk3U9a68-yY'
        },
        {
          id: 'vid-w02',
          youtubeId: 'a3h0c9mQ8V0',
          title: 'Interfacing Analog pH Sensor with Arduino & Calibration Math',
          channel: 'HowToMechatronics',
          category: 'Circuit & Wiring',
          duration: '15:20',
          stage: 'Sensor Wiring',
          thumbnail: 'https://images.unsplash.com/photo-1532187643603-9c5ac0a4c555?w=600&auto=format&fit=crop&q=80',
          description: 'Step-by-step wiring from BNC breakout board to Arduino analog inputs with temperature compensation formula.',
          watchUrl: 'https://www.youtube.com/watch?v=a3h0c9mQ8V0'
        }
      ],
      troubleshooting: [
        {
          symptom: 'pH readings drift erratically with 0.5 pH fluctuations',
          rootCause: 'Air bubbles trapped in reference electrolyte bulb or electrostatic charging on plastic beaker.',
          diagnosticSteps: ['Gently shake electrode like a clinical thermometer to dislodge internal air pockets.'],
          solution: 'Re-immerse probe in 3M KCl storage solution for 30 minutes before recalibrating.',
          safetyAlert: 'Never wipe electrode glass bulb with paper towel; blot gently with lint-free lens paper.'
        }
      ]
    }
  ];

  // Portfolio & Collaborative Teams Data
  const portfolioItems = [
    {
      id: 'port-01',
      studentId: 'u1',
      studentName: 'Alice Chen',
      projectId: 'line-follower-robot',
      title: 'High-Speed Autonomous Line-Following Robot with Dual PID',
      description: 'Engineered a differential robot chassis featuring real-time TCRT5000 optical reflectance feedback and active L298N PWM braking.',
      category: 'Robotics',
      status: 'In Progress (Stage 3)',
      heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      completionDate: 'Target: Dec 5, 2026',
      tags: ['Arduino', 'L298N', 'Robotics', 'PID', 'TCRT5000'],
      codeLines: 124,
      experimentTrials: 14,
      score: 'A+ (Supervisor Reviewed)'
    },
    {
      id: 'port-02',
      studentId: 'u2',
      studentName: 'Bob Kumar',
      projectId: 'iot-water-analyzer',
      title: 'Multi-Parameter Automated Water Quality Field Spectrometer',
      description: 'Constructed an integrated telemetry station logging dissolved mineral conductivity, optical turbidity, and calibrated electrochemical pH.',
      category: 'Analytical Chemistry',
      status: 'Completed',
      heroImage: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&auto=format&fit=crop&q=80',
      completionDate: 'Nov 18, 2026',
      tags: ['UV-Vis', 'pH', 'Arduino', 'Spectrophotometry'],
      codeLines: 88,
      experimentTrials: 28,
      score: 'Outstanding Capstone Finalist'
    }
  ];

  const teams = [
    {
      id: 'team-01',
      name: 'Autonomous Systems & Robotics Collective',
      leadStudent: 'Alice Chen',
      department: 'Computer Science & Electrical Engineering',
      activeProject: 'Autonomous Line-Following Robot',
      members: [
        { name: 'Alice Chen', role: 'Firmware & Algorithm Lead', avatar: 'AC' },
        { name: 'Bob Kumar', role: 'Power Electronics & Circuit Specialist', avatar: 'BK' },
        { name: 'Elena Rostova', role: 'Mechanical Chassis & 3D Prototyping', avatar: 'ER' }
      ],
      sharedEquipment: ['Arduino Uno R3', 'Oscilloscope', 'Servo Motor Kit'],
      upcomingMeeting: 'Thursday, 14:00 @ EL-101 Lab Bench 4',
      deliverableMilestone: 'Prototype Track Trial (Nov 28)'
    },
    {
      id: 'team-02',
      name: 'Bio-Photonics & Chemical Sensing Lab Group',
      leadStudent: 'Bob Kumar',
      department: 'Chemistry & Bioengineering',
      activeProject: 'Automated Water Quality & Contaminant Analyzer',
      members: [
        { name: 'Bob Kumar', role: 'Telemetry & Sensor Calibration', avatar: 'BK' },
        { name: 'Priya Nair', role: 'Chemical Standards & Reagents', avatar: 'PN' }
      ],
      sharedEquipment: ['UV-Vis Spectrophotometer', 'Benchtop pH Meter'],
      upcomingMeeting: 'Friday, 10:30 @ CH-301 Chemistry Lab',
      deliverableMilestone: 'Heavy Metal Chelate Standard Curve Submission'
    }
  ];

  // Helper APIs
  function getAllProjects() {
    return projects;
  }

  function getProjectById(id) {
    return projects.find(p => p.id === id) || projects[0];
  }

  function getPortfolioItems() {
    return portfolioItems;
  }

  function getTeams() {
    return teams;
  }

  // Export to global scope & merge with LabLinkData
  window.LabLinkProjects = {
    projects,
    portfolioItems,
    teams,
    getAllProjects,
    getProjectById,
    getPortfolioItems,
    getTeams
  };

  if (window.LabLinkData) {
    Object.assign(window.LabLinkData, window.LabLinkProjects);
  }

  console.log('[LabLinkProjects] Blueprints, circuits, video intelligence, and teams loaded successfully.');
})();
