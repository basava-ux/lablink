// ============================================================
// LabLink – Comprehensive Seed Data & Store Layer
// File: data.js
// ============================================================

(function () {
  'use strict';

  // ------------------------------------------------------------
  // Campus Labs
  // ------------------------------------------------------------
  const labs = [
    {
      id: 'EL-101',
      name: 'Advanced Electronics & Embedded Systems Lab',
      shortName: 'Electronics Lab',
      department: 'Electronics',
      building: 'Engineering Block A',
      floor: 1,
      room: 'A-108',
      capacity: 35,
      supervisor: 'Dr. Sarah Johnson',
      contactEmail: 'sarah@university.edu',
      operationalHours: '08:00 - 20:00'
    },
    {
      id: 'ME-201',
      name: 'Precision Mechanical & Prototyping Workshop',
      shortName: 'Mechanical Workshop',
      department: 'Mechanical',
      building: 'Engineering Block B',
      floor: 2,
      room: 'B-214',
      capacity: 25,
      supervisor: 'Dr. Michael Park',
      contactEmail: 'michael@university.edu',
      operationalHours: '08:30 - 18:30'
    },
    {
      id: 'CH-301',
      name: 'Analytical & Physical Chemistry Laboratory',
      shortName: 'Chemistry Lab',
      department: 'Chemistry',
      building: 'Science Complex',
      floor: 3,
      room: 'SC-302',
      capacity: 30,
      supervisor: 'Dr. Elena Rostova',
      contactEmail: 'elena@university.edu',
      operationalHours: '09:00 - 19:00'
    },
    {
      id: 'OP-401',
      name: 'Photonics, Laser & Quantum Optics Facility',
      shortName: 'Optics Lab',
      department: 'Optics & Photonics',
      building: 'Science Complex',
      floor: 4,
      room: 'SC-415',
      capacity: 20,
      supervisor: 'Prof. David Thorne',
      contactEmail: 'david.t@university.edu',
      operationalHours: '09:00 - 18:00'
    },
    {
      id: 'CS-501',
      name: 'High Performance Computing & AI Research Lab',
      shortName: 'HPC & AI Lab',
      department: 'Computer Science',
      building: 'Turing Hall',
      floor: 5,
      room: 'TH-501',
      capacity: 40,
      supervisor: 'Dr. Alan Vance',
      contactEmail: 'alan.vance@university.edu',
      operationalHours: '24/7 Access'
    },
    {
      id: 'BIO-601',
      name: 'Cellular Biology & Genomics Facility',
      shortName: 'Biology Lab',
      department: 'Biology',
      building: 'Life Sciences Center',
      floor: 1,
      room: 'LS-112',
      capacity: 28,
      supervisor: 'Dr. Priya Nair',
      contactEmail: 'priya.nair@university.edu',
      operationalHours: '08:00 - 19:00'
    }
  ];

  // ------------------------------------------------------------
  // User Accounts
  // ------------------------------------------------------------
  const users = [
    {
      id: 'u1',
      name: 'Alice Chen',
      email: 'alice@university.edu',
      password: 'student123',
      role: 'student',
      department: 'Computer Science',
      year: 'Senior (Year 4)',
      avatar: 'AC',
      studentId: 'ST-2023-8841',
      activeProject: 'Autonomous Navigation Robot'
    },
    {
      id: 'u2',
      name: 'Bob Kumar',
      email: 'bob@university.edu',
      password: 'student123',
      role: 'student',
      department: 'Electronics',
      year: 'Junior (Year 3)',
      avatar: 'BK',
      studentId: 'ST-2024-5519',
      activeProject: 'High-Frequency Filter Design'
    },
    {
      id: 'u3',
      name: 'Dr. Sarah Johnson',
      email: 'sarah@university.edu',
      password: 'faculty123',
      role: 'faculty',
      department: 'Electronics',
      labId: 'EL-101',
      avatar: 'SJ',
      title: 'Associate Professor & Lab Director'
    },
    {
      id: 'u4',
      name: 'Dr. Michael Park',
      email: 'michael@university.edu',
      password: 'faculty123',
      role: 'faculty',
      department: 'Mechanical',
      labId: 'ME-201',
      avatar: 'MP',
      title: 'Professor & Workshop Chair'
    },
    {
      id: 'u5',
      name: 'Admin User',
      email: 'admin@university.edu',
      password: 'admin123',
      role: 'admin',
      department: 'Campus Central Administration',
      avatar: 'AU',
      title: 'Campus Laboratory Operations Lead'
    }
  ];

  // ------------------------------------------------------------
  // Comprehensive Equipment Catalog (42 Items Across 6 Departments)
  // ------------------------------------------------------------
  const equipment = [
    // --- ELECTRONICS LAB (EL-101) ---
    {
      id: 'eq-001',
      name: 'Arduino Uno R3',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Microcontrollers',
      subcategory: 'Development Boards',
      imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 12,
      availableQuantity: 8,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Microcontroller': 'ATmega328P',
        'Operating Voltage': '5V',
        'Input Voltage (limits)': '6-20V',
        'Digital I/O Pins': '14 (6 PWM outputs)',
        'Analog Input Pins': '6',
        'Flash Memory': '32 KB',
        'Clock Speed': '16 MHz'
      },
      accessories: ['USB-A to Type-B Cable', 'Jumper Wire Ribbon', '9V Battery Snap'],
      compatibleWith: ['eq-004', 'eq-005', 'eq-006', 'eq-007'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['arduino', 'microcontroller', 'embedded', 'robot', 'iot', 'sensors'],
      description: 'The standard microcontroller board based on the ATmega328P. Perfect for prototyping autonomous vehicles, sensor telemetry, and embedded logic.',
      rating: 4.8,
      reviewCount: 34
    },
    {
      id: 'eq-002',
      name: 'Oscilloscope',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Measurement',
      subcategory: 'Signal Analysis',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 8,
      availableQuantity: 5,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Bandwidth': '100 MHz',
        'Channels': '4 Analog Channels',
        'Sample Rate': '1 GSa/s',
        'Memory Depth': '24 Mpts',
        'Waveform Capture': '30,000 wfms/s',
        'Display': '7-inch WVGA TFT Color'
      },
      accessories: ['10:1 Passive Probes (x4)', 'BNC to Alligator Cable', 'Ground Lead Clips', 'Power Cable'],
      compatibleWith: ['eq-001', 'eq-003', 'eq-006', 'eq-007'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['oscilloscope', 'signals', 'frequency', 'waveform', 'circuit', 'debugging'],
      description: 'High-precision 4-channel digital storage oscilloscope with deep memory and auto-measurement for complex circuit debugging and protocol decoding.',
      rating: 4.9,
      reviewCount: 28
    },
    {
      id: 'eq-003',
      name: 'Function Generator',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Measurement',
      subcategory: 'Signal Generation',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 3,
      condition: 'Good',
      status: 'Limited',
      specifications: {
        'Max Frequency': '25 MHz',
        'Output Channels': '2 Dual-Channel',
        'Waveforms': 'Sine, Square, Ramp, Pulse, Noise, Arbitrary',
        'Vertical Resolution': '14 bits',
        'Sample Rate': '125 MSa/s'
      },
      accessories: ['BNC to BNC Cable', 'BNC to Minigrabber Test Leads', 'Power Adapter'],
      compatibleWith: ['eq-002', 'eq-006'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: false,
      tags: ['generator', 'signal', 'sine wave', 'pwm', 'frequency', 'testing'],
      description: 'Dual-channel arbitrary waveform generator capable of producing stable, low-distortion signals for filtering experiments and sensor simulation.',
      rating: 4.6,
      reviewCount: 19
    },
    {
      id: 'eq-004',
      name: 'Servo Motor Kit',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Actuators',
      subcategory: 'Robotics Hardware',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 15,
      availableQuantity: 11,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Torque': '10 kg-cm at 6V',
        'Operating Speed': '0.16 sec/60 deg',
        'Rotation Angle': '180 or 360 continuous',
        'Gear Type': 'Full Metal Gear',
        'Voltage': '4.8V - 7.2V'
      },
      accessories: ['Horn Arm Assortment', 'Mounting Screws', 'Servo Extension Wire (30cm)'],
      compatibleWith: ['eq-001', 'eq-005', 'eq-007'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['servo', 'motor', 'robot', 'steering', 'actuator', 'pwm'],
      description: 'High-torque metal gear servo motor kit designed for steering linkages, robotic arms, and pan-tilt gimbal mechanisms.',
      rating: 4.7,
      reviewCount: 22
    },
    {
      id: 'eq-005',
      name: 'Breadboard',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Prototyping',
      subcategory: 'Solderless Board',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 25,
      availableQuantity: 19,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Tie Points': '830 Tie Points',
        'Power Rails': '4 Distribution Buses',
        'Pitch': 'Standard 2.54mm (0.1 in)',
        'Backing': 'Self-adhesive tape with aluminium plate'
      },
      accessories: ['65-Piece Flexible Jumper Wire Pack', 'Component Extraction Tweezers'],
      compatibleWith: ['eq-001', 'eq-004', 'eq-006', 'eq-007'],
      typicalUsageDuration: 6,
      requiresFacultyApproval: false,
      tags: ['breadboard', 'prototype', 'jumper', 'circuit', 'wiring'],
      description: 'Standard 830-tie-point solderless breadboard with dual power rails for fast modular electronics testing.',
      rating: 4.5,
      reviewCount: 45
    },
    {
      id: 'eq-006',
      name: 'Multimeter',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Measurement',
      subcategory: 'Electrical Diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 14,
      availableQuantity: 10,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Counts': '6000 Counts True RMS',
        'DC Voltage Range': '600mV to 1000V (0.09% accuracy)',
        'AC Voltage Range': '600mV to 1000V',
        'Current Range': '60mA to 10A AC/DC',
        'Safety Rating': 'CAT IV 600V / CAT III 1000V'
      },
      accessories: ['Silicone Test Leads', 'Alligator Clips', 'Type-K Thermocouple'],
      compatibleWith: ['eq-001', 'eq-002', 'eq-003', 'eq-005'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: false,
      tags: ['multimeter', 'voltage', 'current', 'resistance', 'continuity', 'testing'],
      description: 'Industrial-grade True-RMS digital multimeter with auto-ranging and backlit screen for precise electrical diagnostics.',
      rating: 4.9,
      reviewCount: 40
    },
    {
      id: 'eq-007',
      name: 'Motor Driver Shield L298N',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Actuators',
      subcategory: 'Power Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 10,
      availableQuantity: 7,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Driver Chip': 'Double H-Bridge L298N',
        'Drive Voltage': '5V - 35V DC',
        'Peak Current': '2A per bridge',
        'Logic Voltage': '5V',
        'Control Mode': 'Dual PWM direction control'
      },
      accessories: ['Terminal Blocks', 'Heatsink Pre-mounted'],
      compatibleWith: ['eq-001', 'eq-004', 'eq-005'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['motor driver', 'dc motor', 'h bridge', 'robotics', 'l298n'],
      description: 'High-current dual H-bridge motor driver module capable of driving two independent DC motors or one 4-wire two-phase stepper.',
      rating: 4.6,
      reviewCount: 16
    },
    {
      id: 'eq-008',
      name: 'Soldering & Rework Station',
      department: 'Electronics',
      labId: 'EL-101',
      labName: 'Advanced Electronics Lab',
      labBuilding: 'Engineering Block A',
      labRoom: 'A-108',
      category: 'Assembly',
      subcategory: 'Thermal Tools',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 4,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Power Output': '75W Soldering + 650W Hot Air',
        'Temp Range': '100°C - 480°C',
        'PID Control': 'Microcomputer temp stabilization',
        'ESD Safe': 'Yes'
      },
      accessories: ['Chisel & Conical Tips (x5)', 'Desoldering Pump', 'Brass Tip Cleaner', 'Lead-Free Solder Spool'],
      compatibleWith: ['eq-001', 'eq-005', 'eq-007'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: true,
      tags: ['soldering', 'rework', 'hot air', 'pcb', 'smd', 'flux'],
      description: '2-in-1 digital ESD-safe soldering and hot-air SMD rework station with dual LED temperature displays and sleep mode.',
      rating: 4.7,
      reviewCount: 25
    },

    // --- MECHANICAL WORKSHOP (ME-201) ---
    {
      id: 'eq-009',
      name: '3D Printer Ultimaker S5',
      department: 'Mechanical',
      labId: 'ME-201',
      labName: 'Mechanical Workshop',
      labBuilding: 'Engineering Block B',
      labRoom: 'B-214',
      category: 'Fabrication',
      subcategory: 'Additive Manufacturing',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c228b29f8b?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 4,
      availableQuantity: 2,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Build Volume': '330 x 240 x 300 mm',
        'Layer Resolution': '20 to 600 microns',
        'Dual Extrusion': 'Yes (Water-soluble PVA support)',
        'Nozzle Temp': 'Up to 280°C',
        'Supported Materials': 'PLA, ABS, PETG, Nylon, TPU'
      },
      accessories: ['Dual Print Cores (AA & BB)', 'Glass & Aluminium Build Plates', 'Filament Spool Holder'],
      compatibleWith: ['eq-001', 'eq-004'],
      typicalUsageDuration: 6,
      requiresFacultyApproval: true,
      tags: ['3d print', 'ultimaker', 'prototype', 'cad', 'additive', 'chassis'],
      description: 'Industrial dual-extrusion 3D printer for engineering-grade functional prototypes with dissolvable support capability.',
      rating: 4.9,
      reviewCount: 38
    },
    {
      id: 'eq-010',
      name: 'CNC Milling Machine (Desktop 4-Axis)',
      department: 'Mechanical',
      labId: 'ME-201',
      labName: 'Mechanical Workshop',
      labBuilding: 'Engineering Block B',
      labRoom: 'B-214',
      category: 'Machining',
      subcategory: 'Subtractive Manufacturing',
      imageUrl: 'https://images.unsplash.com/photo-1565689502-45a3a5e97606?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 3,
      availableQuantity: 1,
      condition: 'Good',
      status: 'Limited',
      specifications: {
        'Travel (X/Y/Z)': '300 x 180 x 120 mm',
        '4th Axis': 'Rotary chuck A-axis',
        'Spindle Power': '500W brushless',
        'Spindle Speed': '12,000 RPM',
        'Materials': 'Aluminium, Brass, Delrin, Hardwood, PCB blanks'
      },
      accessories: ['ER11 Collet Set', 'Carbide End Mills Pack (1/8", 1/16")', 'Dust Boot', 'Hold-down Clamps'],
      compatibleWith: ['eq-009'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: true,
      tags: ['cnc', 'milling', 'aluminum', 'machining', 'pcb mill', 'cam'],
      description: 'High-rigidity desktop CNC mill with 4th-axis rotary attachment for precision machining of custom gears, brackets, and double-sided PCBs.',
      rating: 4.8,
      reviewCount: 17
    },
    {
      id: 'eq-011',
      name: 'Precision Laser Cutter (CO2 80W)',
      department: 'Mechanical',
      labId: 'ME-201',
      labName: 'Mechanical Workshop',
      labBuilding: 'Engineering Block B',
      labRoom: 'B-214',
      category: 'Fabrication',
      subcategory: 'Laser Processing',
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 2,
      availableQuantity: 0,
      condition: 'Under Maintenance',
      status: 'Maintenance',
      specifications: {
        'Laser Tube': '80W Sealed CO2 Glass Tube',
        'Working Area': '900 x 600 mm',
        'Max Cutting Depth': '12mm Acrylic / 9mm Plywood',
        'Positioning Accuracy': '0.01 mm',
        'Cooling': 'Industrial CW-5000 Water Chiller'
      },
      accessories: ['Honeycomb Bed', 'Rotary Attachment for Cylinders', 'High-Flow Exhaust Blower'],
      compatibleWith: ['eq-009', 'eq-010'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: true,
      tags: ['laser', 'acrylic', 'cutting', 'engraving', 'housing', 'chassis'],
      description: 'High-speed CO2 laser system for precision 2D profiling of acrylic, MDF, rubber, and leather housings.',
      rating: 4.8,
      reviewCount: 29
    },
    {
      id: 'eq-012',
      name: 'Universal Tensile Testing Machine',
      department: 'Mechanical',
      labId: 'ME-201',
      labName: 'Mechanical Workshop',
      labBuilding: 'Engineering Block B',
      labRoom: 'B-214',
      category: 'Materials Testing',
      subcategory: 'Stress-Strain Characterization',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 2,
      availableQuantity: 2,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Load Cell Capacity': '50 kN (5 Tonnes)',
        'Crosshead Speed': '0.001 to 1000 mm/min',
        'Test Types': 'Tension, Compression, 3-Point Bending, Shear',
        'Extensometer': 'Optical Non-Contact Strain Tracking'
      },
      accessories: ['Wedge Action Grips', 'Compression Platens', 'ASTM D638 Specimen Cutter'],
      compatibleWith: ['eq-009'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['tensile', 'stress', 'strain', 'mechanics', 'materials', 'yield strength'],
      description: 'Electromechanical universal testing machine used to characterize tensile strength, Young modulus, and fracture toughness of 3D prints and alloys.',
      rating: 4.7,
      reviewCount: 14
    },
    {
      id: 'eq-013',
      name: 'Digital Vernier Caliper & Micrometer Set',
      department: 'Mechanical',
      labId: 'ME-201',
      labName: 'Mechanical Workshop',
      labBuilding: 'Engineering Block B',
      labRoom: 'B-214',
      category: 'Metrology',
      subcategory: 'Dimensional Inspection',
      imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 15,
      availableQuantity: 12,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Range': '0 - 150 mm (0 - 6 in)',
        'Resolution': '0.01 mm / 0.0005 in',
        'Accuracy': '±0.02 mm',
        'Material': 'Hardened Stainless Steel',
        'Data Output': 'SPC USB connectivity'
      },
      accessories: ['Calibration Gage Block (25mm)', 'Fitted Protective Case'],
      compatibleWith: ['eq-009', 'eq-010', 'eq-012'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: false,
      tags: ['caliper', 'measurement', 'tolerance', 'metrology', 'inspection'],
      description: 'High-precision Mitutoyo IP67 digital caliper and outside micrometer kit for dimensional tolerance verification.',
      rating: 4.8,
      reviewCount: 31
    },

    // --- CHEMISTRY LAB (CH-301) ---
    {
      id: 'eq-014',
      name: 'UV-Vis Spectrophotometer',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Spectroscopy',
      subcategory: 'Optical Absorption',
      imageUrl: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 4,
      availableQuantity: 3,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Wavelength Range': '190 nm to 1100 nm',
        'Spectral Bandwidth': '1.0 nm',
        'Wavelength Accuracy': '±0.1 nm',
        'Light Sources': 'Deuterium and Tungsten-Halogen Lamps',
        'Detector': 'Dual Silicon Photodiode'
      },
      accessories: ['Quartz Cuvette Pair (10mm)', 'Glass Cuvette Set (x4)', 'Sample Sipper Cell'],
      compatibleWith: ['eq-015', 'eq-016', 'eq-018'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['spectrophotometer', 'uv-vis', 'absorbance', 'concentration', 'chemical', 'water analysis'],
      description: 'Double-beam UV-Vis spectrophotometer for quantitative chemical analysis, metal ion detection, and kinetic rate measurements.',
      rating: 4.9,
      reviewCount: 27
    },
    {
      id: 'eq-015',
      name: 'Benchtop pH & Conductivity Meter',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Electrochemistry',
      subcategory: 'Ion Selective Measurement',
      imageUrl: 'https://images.unsplash.com/photo-1532187643603-9c5ac0a4c555?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 8,
      availableQuantity: 6,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'pH Range': '-2.000 to 20.000 pH',
        'Resolution': '0.001 pH',
        'Conductivity Range': '0.001 µS/cm to 2000 mS/cm',
        'Temperature Range': '-5.0°C to 105.0°C (ATC)',
        'Calibration Points': 'Up to 5 points with auto-buffer recognition'
      },
      accessories: ['Glass-body Combination pH Electrode', '4-Electrode Conductivity Cell', 'Buffer Solution Sachets (4.01, 7.00, 10.01)'],
      compatibleWith: ['eq-014', 'eq-017', 'eq-018'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: false,
      tags: ['ph meter', 'conductivity', 'water quality', 'acid', 'titration', 'chemistry'],
      description: 'Laboratory multi-parameter meter providing high-precision measurement of pH, mV, conductivity, total dissolved solids (TDS), and temperature.',
      rating: 4.7,
      reviewCount: 33
    },
    {
      id: 'eq-016',
      name: 'High-Speed Refrigerated Centrifuge',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Separation',
      subcategory: 'Centrifugal Extraction',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 3,
      availableQuantity: 2,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Max Speed': '15,000 RPM',
        'Max RCF': '21,300 x g',
        'Temperature Range': '-10°C to +40°C',
        'Rotor Capacity': '24 x 1.5/2.0 mL + 6 x 50 mL Falcon Rotor',
        'Acceleration/Deceleration': '10 Profiles'
      },
      accessories: ['Fixed Angle 24-place Microtube Rotor', 'Swing-out Falcon Tube Rotor', 'Aerosol-tight Bio-containment Lids'],
      compatibleWith: ['eq-014', 'eq-018', 'eq-028'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: true,
      tags: ['centrifuge', 'separation', 'precipitation', 'refrigerated', 'biochemistry'],
      description: 'Quiet, refrigerated centrifuge essential for sample clarification, precipitate separation, and nanoparticle extraction.',
      rating: 4.8,
      reviewCount: 20
    },
    {
      id: 'eq-017',
      name: 'Digital Analytical Balance (0.1 mg)',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Measurement',
      subcategory: 'Mass Gravimetry',
      imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 4,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Max Capacity': '220 g',
        'Readability': '0.1 mg (0.0001 g)',
        'Repeatability': '0.1 mg',
        'Draft Shield': 'Glass Draft Enclosure with Antistatic Coating',
        'Internal Calibration': 'Automatic Internal Calibration (isoCAL)'
      },
      accessories: ['Anti-vibration Weighing Table', 'Micro Spatula Set', 'E2 Class Calibration Weight (200g)'],
      compatibleWith: ['eq-014', 'eq-015', 'eq-018'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: false,
      tags: ['balance', 'scale', 'analytical', 'mass', 'gravimetric', 'weighing'],
      description: 'Ultra-sensitive 4-decimal analytical balance with glass draft shield for preparing analytical standard solutions.',
      rating: 4.9,
      reviewCount: 36
    },
    {
      id: 'eq-018',
      name: 'Standard Borosilicate Glassware & Titration Station',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Apparatus',
      subcategory: 'Volumetric Glassware',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 20,
      availableQuantity: 15,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Glass Type': 'Borosilicate 3.3',
        'Includes': '50mL Class-A Burette with PTFE stopcock',
        'Flasks': 'Volumetric Flasks (50mL, 100mL, 250mL)',
        'Beakers': 'Griffin Low Form (50, 100, 250, 500 mL)',
        'Thermal Resistance': 'Up to 500°C'
      },
      accessories: ['Burette Stand and Double Clamp', 'Magnetic Stirrer Bar Pack', 'White Porcelain Titration Tile'],
      compatibleWith: ['eq-014', 'eq-015', 'eq-017'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['glassware', 'titration', 'burette', 'beaker', 'flask', 'volumetric'],
      description: 'Complete analytical titration glassware station conforming to ASTM E287 Class A volumetric tolerances.',
      rating: 4.6,
      reviewCount: 42
    },
    {
      id: 'eq-019',
      name: 'Rotary Evaporator (Rotovap System)',
      department: 'Chemistry',
      labId: 'CH-301',
      labName: 'Analytical Chemistry Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-302',
      category: 'Separation',
      subcategory: 'Distillation & Evaporation',
      imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 2,
      availableQuantity: 1,
      condition: 'Good',
      status: 'Limited',
      specifications: {
        'Heating Bath': '20°C to 180°C (Water & Oil)',
        'Rotation Speed': '10 to 280 RPM',
        'Condenser': 'Vertical Coated Double Helix Glass Condenser',
        'Vacuum Controller': 'Integrated digital diaphragm regulator',
        'Flask Sizes': '500 mL, 1000 mL Evaporating Flasks'
      },
      accessories: ['PTFE Vacuum Seal', 'Dry-Ice Trap Attachment', 'Diaphragm Chemical Vacuum Pump'],
      compatibleWith: ['eq-017', 'eq-018'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: true,
      tags: ['rotovap', 'evaporator', 'solvent', 'distillation', 'extraction'],
      description: 'Controlled vacuum distillation system for gentle and rapid solvent removal from synthesis reaction mixtures.',
      rating: 4.8,
      reviewCount: 15
    },

    // --- OPTICS & PHOTONICS LAB (OP-401) ---
    {
      id: 'eq-020',
      name: 'Helium-Neon Laser (632.8 nm)',
      department: 'Optics & Photonics',
      labId: 'OP-401',
      labName: 'Photonics & Optics Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-415',
      category: 'Laser Sources',
      subcategory: 'Gas Lasers',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 5,
      availableQuantity: 3,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Wavelength': '632.8 nm (Red)',
        'Power Output': '5.0 mW TEM00 Mode',
        'Beam Diameter': '0.81 mm',
        'Beam Divergence': '1.0 mrad',
        'Polarization': 'Linear > 500:1'
      },
      accessories: ['High-Stability Laser Mount', 'Neutral Density Filter Wheel', 'Collimating Lens Pair'],
      compatibleWith: ['eq-021', 'eq-022', 'eq-023'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['laser', 'he-ne', 'optics', 'interferometry', 'diffraction', 'coherent light'],
      description: 'Stabilized red He-Ne gas laser with excellent spatial coherence for interferometry, holography, and diffraction experiments.',
      rating: 4.9,
      reviewCount: 21
    },
    {
      id: 'eq-021',
      name: 'Vibration-Isolated Optical Breadboard',
      department: 'Optics & Photonics',
      labId: 'OP-401',
      labName: 'Photonics & Optics Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-415',
      category: 'Optomechanical',
      subcategory: 'Optical Tables',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 4,
      availableQuantity: 2,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Dimensions': '900 x 600 x 58 mm',
        'Core Design': 'Honeycomb Steel Core with Tuned Damping',
        'Grid Pattern': 'M6 Tapped Holes on 25mm Centers',
        'Surface Flatness': '±0.1 mm over 1 m²'
      },
      accessories: ['Pneumatic Isolation Mounts (x4)', 'Post & Post Holder Assortment (x12)', 'Mirror Mounts'],
      compatibleWith: ['eq-020', 'eq-022', 'eq-023', 'eq-024'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['optical table', 'breadboard', 'vibration', 'optomechanics', 'alignment'],
      description: 'Damped steel honeycomb optical breadboard delivering rigid, drift-free mounting for sensitive laser beam paths.',
      rating: 4.8,
      reviewCount: 18
    },
    {
      id: 'eq-022',
      name: 'Michelson & Mach-Zehnder Interferometer Kit',
      department: 'Optics & Photonics',
      labId: 'OP-401',
      labName: 'Photonics & Optics Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-415',
      category: 'Interferometry',
      subcategory: 'Interference Measurement',
      imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 3,
      availableQuantity: 2,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Beamsplitter': '50:50 Non-Polarizing Cube (633 nm)',
        'Mirrors': 'Broadband Dielectric Mirrors (>99% R)',
        'Translation Stage': 'Differential Micrometer with 0.5 µm sensitivity',
        'Gas Cell': 'With vacuum hand pump for index of refraction of air'
      },
      accessories: ['Expansion Lens', 'Viewing Screen with Millimeter Grid', 'Vacuum Pressure Gauge'],
      compatibleWith: ['eq-020', 'eq-021', 'eq-024'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['interferometer', 'michelson', 'wavelength', 'refractive index', 'interference'],
      description: 'Precision interferometer system capable of reconfiguring between Michelson, Mach-Zehnder, and Fabry-Pérot arrangements.',
      rating: 4.9,
      reviewCount: 15
    },
    {
      id: 'eq-023',
      name: 'Scientific Beam Profiler & CMOS Camera',
      department: 'Optics & Photonics',
      labId: 'OP-401',
      labName: 'Photonics & Optics Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-415',
      category: 'Diagnostics',
      subcategory: 'Beam Analysis',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 3,
      availableQuantity: 1,
      condition: 'Good',
      status: 'Limited',
      specifications: {
        'Sensor Type': '1-inch High Dynamic Range Monochrome CMOS',
        'Resolution': '2048 x 1536 (3.15 MP)',
        'Pixel Size': '3.45 x 3.45 µm',
        'Spectral Range': '350 nm - 1100 nm',
        'Exposure Time': '20 µs - 2 s'
      },
      accessories: ['C-Mount Variable Attenuator', 'USB 3.0 Locking Cable', 'BeamGage Software Suite'],
      compatibleWith: ['eq-020', 'eq-021', 'eq-022'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: true,
      tags: ['beam profiler', 'camera', 'cmos', 'laser profile', 'm2 measurement'],
      description: 'Calibrated USB 3.0 beam profiling camera system for measuring spatial intensity distribution, spot size, and M² laser beam quality.',
      rating: 4.7,
      reviewCount: 12
    },
    {
      id: 'eq-024',
      name: 'High-Power LED Light Source (Multi-Wavelength)',
      department: 'Optics & Photonics',
      labId: 'OP-401',
      labName: 'Photonics & Optics Lab',
      labBuilding: 'Science Complex',
      labRoom: 'SC-415',
      category: 'Light Sources',
      subcategory: 'Solid State Illumination',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 4,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Available Channels': '405nm (Violet), 470nm (Blue), 530nm (Green), 660nm (Deep Red), 730nm (Far Red)',
        'Power Output': 'Up to 1.5W optical power per channel',
        'Modulation': 'TTL / Analog up to 100 kHz',
        'Collimation': 'Adjustable aspheric condenser optics'
      },
      accessories: ['Fiber Optic Light Guide', 'Constant Current Controller Box', 'Heat Sink Fan Assembly'],
      compatibleWith: ['eq-021', 'eq-026', 'eq-027'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: false,
      tags: ['led', 'light source', 'wavelength', 'photobiology', 'illumination', 'plant growth'],
      description: 'Narrowband multi-wavelength high-power LED engine designed for photochemical stimulation, plant physiology, and fluorescence microscopy excitation.',
      rating: 4.8,
      reviewCount: 19
    },

    // --- COMPUTER SCIENCE & AI LAB (CS-501) ---
    {
      id: 'eq-025',
      name: 'NVIDIA RTX A6000 AI GPU Workstation',
      department: 'Computer Science',
      labId: 'CS-501',
      labName: 'HPC & AI Research Lab',
      labBuilding: 'Turing Hall',
      labRoom: 'TH-501',
      category: 'Computing',
      subcategory: 'Accelerated Hardware',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 8,
      availableQuantity: 3,
      condition: 'Excellent',
      status: 'Limited',
      specifications: {
        'GPU': 'NVIDIA RTX A6000 48GB GDDR6 with ECC',
        'CPU': 'AMD EPYC 7543 32-Core 64-Thread 2.8GHz',
        'System RAM': '256 GB DDR4-3200 ECC Registered',
        'Storage': '4TB NVMe Gen4 SSD (7000 MB/s)',
        'Networking': '10GbE Dual SFP+ Interface',
        'OS / Drivers': 'Ubuntu 22.04 LTS + CUDA 12.2 + PyTorch 2.3'
      },
      accessories: ['JupyterHub Remote Instance', 'Slurm Batch Job Queue Token', 'SSH Key Authentication'],
      compatibleWith: ['eq-026'],
      typicalUsageDuration: 8,
      requiresFacultyApproval: true,
      tags: ['gpu', 'ai', 'deep learning', 'pytorch', 'machine learning', 'cuda', 'hpc'],
      description: 'High-density computational node optimized for fine-tuning large language models, computer vision training, and high-fidelity physics simulations.',
      rating: 4.95,
      reviewCount: 52
    },
    {
      id: 'eq-026',
      name: 'NVIDIA Jetson AGX Orin Edge AI Developer Kit',
      department: 'Computer Science',
      labId: 'CS-501',
      labName: 'HPC & AI Research Lab',
      labBuilding: 'Turing Hall',
      labRoom: 'TH-501',
      category: 'Embedded Computing',
      subcategory: 'Edge AI Platforms',
      imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 4,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'AI Performance': 'Up to 275 TOPS',
        'GPU': '2048-core NVIDIA Ampere with 64 Tensor Cores',
        'CPU': '12-core Arm Cortex-A78AE v8.2 64-bit',
        'Memory': '64GB 256-bit LPDDR5 (204.8 GB/s)',
        'Storage': '64GB eMMC 5.1 + 1TB M.2 NVMe SSD installed',
        'Power Profile': 'Configurable 15W - 60W'
      },
      accessories: ['Power Adapter (19V)', 'Intel RealSense D435i Depth Camera Interface', 'USB-C Programming Cable'],
      compatibleWith: ['eq-001', 'eq-004', 'eq-025'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: true,
      tags: ['jetson', 'orin', 'edge ai', 'robotics', 'autonomous', 'computer vision'],
      description: 'Flagship edge AI module for deploying real-time vision, SLAM, and autonomous robot perception algorithms directly on moving robots.',
      rating: 4.9,
      reviewCount: 23
    },
    {
      id: 'eq-027',
      name: 'Raspberry Pi 5 (8GB) Embedded Lab Kit',
      department: 'Computer Science',
      labId: 'CS-501',
      labName: 'HPC & AI Research Lab',
      labBuilding: 'Turing Hall',
      labRoom: 'TH-501',
      category: 'Embedded Computing',
      subcategory: 'Single Board Computers',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 16,
      availableQuantity: 12,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Processor': 'Broadcom BCM2712 Quad-Core Arm Cortex-A76 @ 2.4GHz',
        'RAM': '8GB LPDDR4X-4267',
        'Storage': '64GB SanDisk Extreme MicroSD (Class A2)',
        'Wireless': 'Dual-band 802.11ac Wi-Fi + Bluetooth 5.0 BLE',
        'Video Output': 'Dual 4Kp60 micro-HDMI',
        'PCIe': 'PCIe 2.0 x1 interface for NVMe SSD hat'
      },
      accessories: ['Official 27W USB-C Power Supply', 'Active Cooler Fan/Heatsink', 'Micro-HDMI to HDMI Cable'],
      compatibleWith: ['eq-001', 'eq-004', 'eq-005', 'eq-007'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['raspberry pi', 'pi 5', 'embedded', 'linux', 'iot', 'robotics', 'server'],
      description: 'High-speed single board computer configured with Raspberry Pi OS, Python, ROS2 Humble, and OpenCV for IoT and robotics control.',
      rating: 4.8,
      reviewCount: 47
    },

    // --- BIOLOGY & GENOMICS LAB (BIO-601) ---
    {
      id: 'eq-028',
      name: 'Thermal Cycler (PCR Machine)',
      department: 'Biology',
      labId: 'BIO-601',
      labName: 'Cellular Biology Lab',
      labBuilding: 'Life Sciences Center',
      labRoom: 'LS-112',
      category: 'Molecular Biology',
      subcategory: 'DNA Amplification',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5b25b79f3dba?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 4,
      availableQuantity: 3,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Block Format': '96-Well 0.2 mL Peltier Block',
        'Max Ramp Rate': '4.5 °C/sec heating, 3.5 °C/sec cooling',
        'Temperature Range': '4.0 °C to 99.9 °C',
        'Thermal Gradient': 'Programmable gradient up to 24 °C span',
        'Heated Lid': 'Adjustable 105 °C lid to prevent evaporation'
      },
      accessories: ['96-Well Cold Cooling Rack', 'Microtube Strip Capper Tool', 'PCR Plate Sealing Mat'],
      compatibleWith: ['eq-016', 'eq-029', 'eq-031'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: true,
      tags: ['pcr', 'thermal cycler', 'dna', 'genetics', 'amplification', 'biology'],
      description: 'High-precision 96-well gradient PCR machine for targeted DNA amplification, genotyping, and gene cloning applications.',
      rating: 4.9,
      reviewCount: 30
    },
    {
      id: 'eq-029',
      name: 'Agarose Gel Electrophoresis & UV Transilluminator',
      department: 'Biology',
      labId: 'BIO-601',
      labName: 'Cellular Biology Lab',
      labBuilding: 'Life Sciences Center',
      labRoom: 'LS-112',
      category: 'Molecular Biology',
      subcategory: 'Nucleic Acid Sizing',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 6,
      availableQuantity: 4,
      condition: 'Good',
      status: 'Available',
      specifications: {
        'Gel Tray Sizes': '7 x 10 cm and 15 x 10 cm UV-transparent trays',
        'Power Supply Output': '10 to 300 V, 4 to 400 mA constant voltage/current',
        'Transilluminator Wavelength': '302 nm UV + Blue LED transillumination (SafeDNA)',
        'Comb Types': '8, 15, and 20-well combs (1.0 mm thickness)'
      },
      accessories: ['Gel Casting Gates Pair', 'Power Leads', 'UV Safety Face Shield', 'Amber Viewing Hood'],
      compatibleWith: ['eq-028', 'eq-031'],
      typicalUsageDuration: 2,
      requiresFacultyApproval: false,
      tags: ['gel electrophoresis', 'dna ladder', 'transilluminator', 'agarose', 'molecular biology'],
      description: 'Submarine horizontal electrophoresis tank paired with dual UV/Blue LED imaging darkroom for visualizing DNA/RNA fragment separation.',
      rating: 4.7,
      reviewCount: 26
    },
    {
      id: 'eq-030',
      name: 'Biological Compound Microscope (1000x Oil Immersion)',
      department: 'Biology',
      labId: 'BIO-601',
      labName: 'Cellular Biology Lab',
      labBuilding: 'Life Sciences Center',
      labRoom: 'LS-112',
      category: 'Microscopy',
      subcategory: 'Brightfield Optical Inspection',
      imageUrl: 'https://images.unsplash.com/photo-1576086213369-31e9e968ae64?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 10,
      availableQuantity: 7,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Objectives': 'Plan Achromatic 4x, 10x, 40x (Spring), 100x (Spring/Oil)',
        'Eyepieces': 'Widefield WF10x/20mm with diopter adjustment',
        'Magnification': '40x to 1000x',
        'Condenser': 'Abbe N.A. 1.25 with iris diaphragm & filter holder',
        'Camera Mount': 'Trinocular port with 0.5x C-mount reduction lens'
      },
      accessories: ['Immersion Oil Type A (15 mL)', 'Eyepiece Micrometer Disc', 'Dust Cover', 'Green & Blue Filters'],
      compatibleWith: ['eq-024', 'eq-032'],
      typicalUsageDuration: 3,
      requiresFacultyApproval: false,
      tags: ['microscope', 'cells', 'biology', 'brightfield', 'histology', 'slides', 'chlorophyll'],
      description: 'Trinocular research-grade biological microscope delivering crisp optical contrast for cytological, histological, and plant cellular investigations.',
      rating: 4.9,
      reviewCount: 39
    },
    {
      id: 'eq-031',
      name: 'Research Micropipette Set (4-Pipette Carousel)',
      department: 'Biology',
      labId: 'BIO-601',
      labName: 'Cellular Biology Lab',
      labBuilding: 'Life Sciences Center',
      labRoom: 'LS-112',
      category: 'Liquid Handling',
      subcategory: 'Precision Pipetting',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 12,
      availableQuantity: 9,
      condition: 'Excellent',
      status: 'Available',
      specifications: {
        'Included Volumes': 'P2 (0.2-2µL), P20 (2-20µL), P200 (20-200µL), P1000 (100-1000µL)',
        'Autoclavable': 'Fully autoclavable at 121 °C (20 min)',
        'Ejection': 'Smooth tip ejector with minimal hand force',
        'Calibration': 'ISO 8655 certified certificate included'
      },
      accessories: ['Rotary Carousel Stand', 'Sterile Filtered Pipette Tip Boxes (10µL, 200µL, 1000µL)', 'Calibration Tool'],
      compatibleWith: ['eq-028', 'eq-029', 'eq-014', 'eq-016'],
      typicalUsageDuration: 4,
      requiresFacultyApproval: false,
      tags: ['pipette', 'micropipette', 'liquid handling', 'biology', 'reagents', 'volumes'],
      description: 'Ergonomic four-pipette set covering volumes from 0.2 µL to 1000 µL with low-force plunger springs for repetitive sampling.',
      rating: 4.9,
      reviewCount: 44
    },
    {
      id: 'eq-032',
      name: 'Controlled Plant & Microbial Growth Chamber',
      department: 'Biology',
      labId: 'BIO-601',
      labName: 'Cellular Biology Lab',
      labBuilding: 'Life Sciences Center',
      labRoom: 'LS-112',
      category: 'Incubation',
      subcategory: 'Environmental Simulation',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      totalQuantity: 2,
      availableQuantity: 1,
      condition: 'Good',
      status: 'Limited',
      specifications: {
        'Volume': '300 Liters Capacity',
        'Temperature Range': '4 °C to 60 °C (±0.5 °C uniformity)',
        'Humidity Control': '40% to 90% RH with ultrasonic misting',
        'Photoperiod Lighting': 'Full spectrum programmable LED light banks (0 - 15,000 Lux)',
        'CO2 Control': 'Optional ambient to 2000 ppm injection'
      },
      accessories: ['Adjustable Stainless Wire Shelves (x4)', 'Plant Pot Trays', 'Data Logging USB Interface'],
      compatibleWith: ['eq-024', 'eq-030'],
      typicalUsageDuration: 12,
      requiresFacultyApproval: true,
      tags: ['growth chamber', 'incubator', 'plants', 'photoperiod', 'botany', 'environmental'],
      description: 'Programmable diurnal environmental chamber simulating customizable day/night photoperiods, humidity, and temperature cycles for botanical research.',
      rating: 4.8,
      reviewCount: 16
    }
  ];

  // ------------------------------------------------------------
  // Realistic Seed Bookings (Nov 2026 Context)
  // ------------------------------------------------------------
  const bookings = [
    {
      id: 'bk-101',
      bookingNumber: 'BK-78901',
      equipmentId: 'eq-001',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-20T09:00:00.000Z',
      endDate: '2026-11-22T17:00:00.000Z',
      purpose: 'Initial prototyping of sensor array interface for autonomous rover.',
      status: 'completed',
      createdAt: '2026-11-15T10:14:00.000Z'
    },
    {
      id: 'bk-102',
      bookingNumber: 'BK-78902',
      equipmentId: 'eq-002',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-23T10:00:00.000Z',
      endDate: '2026-11-25T16:00:00.000Z',
      purpose: 'Debugging motor PWM noise and SPI communication lines.',
      status: 'active',
      createdAt: '2026-11-18T14:30:00.000Z'
    },
    {
      id: 'bk-103',
      bookingNumber: 'BK-78903',
      equipmentId: 'eq-004',
      userId: 'u1',
      quantity: 2,
      startDate: '2026-11-24T09:00:00.000Z',
      endDate: '2026-11-28T18:00:00.000Z',
      purpose: 'Steering differential testing on dual continuous rotation servo platform.',
      status: 'approved',
      createdAt: '2026-11-20T11:00:00.000Z'
    },
    {
      id: 'bk-104',
      bookingNumber: 'BK-78904',
      equipmentId: 'eq-025',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-26T08:00:00.000Z',
      endDate: '2026-11-30T20:00:00.000Z',
      purpose: 'Training YOLOv8 line-tracking and obstacle detection weights on custom track dataset.',
      status: 'pending',
      createdAt: '2026-11-22T16:45:00.000Z',
      fromAutopilot: true
    },
    {
      id: 'bk-105',
      bookingNumber: 'BK-78905',
      equipmentId: 'eq-009',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-21T10:00:00.000Z',
      endDate: '2026-11-23T18:00:00.000Z',
      purpose: 'Printing mechanical chassis brackets and sensor mounts in PETG.',
      status: 'active',
      createdAt: '2026-11-19T09:15:00.000Z'
    },
    {
      id: 'bk-106',
      bookingNumber: 'BK-78906',
      equipmentId: 'eq-003',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-24T13:00:00.000Z',
      endDate: '2026-11-26T17:00:00.000Z',
      purpose: 'Frequency response evaluation of active Butterworth filter circuit.',
      status: 'approved',
      createdAt: '2026-11-20T15:20:00.000Z'
    },
    {
      id: 'bk-107',
      bookingNumber: 'BK-78907',
      equipmentId: 'eq-014',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-16T09:00:00.000Z',
      endDate: '2026-11-18T16:00:00.000Z',
      purpose: 'Baseline optical absorbance measurements.',
      status: 'completed',
      createdAt: '2026-11-12T11:00:00.000Z'
    },
    {
      id: 'bk-108',
      bookingNumber: 'BK-78908',
      equipmentId: 'eq-011',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-23T10:00:00.000Z',
      endDate: '2026-11-25T14:00:00.000Z',
      purpose: 'Cutting 5mm acrylic base plates for robotics platform.',
      status: 'approved',
      createdAt: '2026-11-19T13:00:00.000Z',
      rescueNeeded: true
    },
    {
      id: 'bk-109',
      bookingNumber: 'BK-78909',
      equipmentId: 'eq-028',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-27T09:00:00.000Z',
      endDate: '2026-11-29T17:00:00.000Z',
      purpose: 'Plant gene expression study amplification cycle.',
      status: 'pending',
      createdAt: '2026-11-21T18:00:00.000Z'
    },
    {
      id: 'bk-110',
      bookingNumber: 'BK-78910',
      equipmentId: 'eq-020',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-14T10:00:00.000Z',
      endDate: '2026-11-15T15:00:00.000Z',
      purpose: 'Testing spatial coherence across beam splitter.',
      status: 'completed',
      createdAt: '2026-11-10T09:00:00.000Z'
    },
    {
      id: 'bk-111',
      bookingNumber: 'BK-78911',
      equipmentId: 'eq-008',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-25T14:00:00.000Z',
      endDate: '2026-11-25T18:00:00.000Z',
      purpose: 'Hand soldering QFP-48 microcontrollers on breakout boards.',
      status: 'pending',
      createdAt: '2026-11-22T10:30:00.000Z'
    },
    {
      id: 'bk-112',
      bookingNumber: 'BK-78912',
      equipmentId: 'eq-001',
      userId: 'u2',
      quantity: 1,
      startDate: '2026-11-10T08:00:00.000Z',
      endDate: '2026-11-12T17:00:00.000Z',
      purpose: 'Introductory GPIO experimentation.',
      status: 'completed',
      createdAt: '2026-11-05T12:00:00.000Z'
    },
    {
      id: 'bk-113',
      bookingNumber: 'BK-78913',
      equipmentId: 'eq-010',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-28T09:00:00.000Z',
      endDate: '2026-11-30T17:00:00.000Z',
      purpose: 'Precision milling of custom aluminium wheel hubs.',
      status: 'pending',
      createdAt: '2026-11-22T14:20:00.000Z'
    },
    {
      id: 'bk-114',
      bookingNumber: 'BK-78914',
      equipmentId: 'eq-006',
      userId: 'u1',
      quantity: 1,
      startDate: '2026-11-18T10:00:00.000Z',
      endDate: '2026-11-19T14:00:00.000Z',
      purpose: 'Verifying voltage regulator dropout thresholds.',
      status: 'completed',
      createdAt: '2026-11-14T09:00:00.000Z'
    },
    {
      id: 'bk-115',
      bookingNumber: 'BK-78915',
      equipmentId: 'eq-005',
      userId: 'u2',
      quantity: 2,
      startDate: '2026-11-23T09:00:00.000Z',
      endDate: '2026-11-26T18:00:00.000Z',
      purpose: 'Analog instrumentation amplifier circuit prototype.',
      status: 'active',
      createdAt: '2026-11-21T08:30:00.000Z'
    }
  ];

  // ------------------------------------------------------------
  // Faculty Approval Requests Queue (with Deadlines & AI Flags)
  // ------------------------------------------------------------
  const bookingRequests = [
    {
      id: 'req-001',
      bookingId: 'bk-104',
      studentId: 'u1',
      studentName: 'Alice Chen',
      equipmentId: 'eq-025',
      equipmentName: 'NVIDIA RTX A6000 AI GPU Workstation',
      facultyId: 'u3',
      facultyName: 'Dr. Sarah Johnson',
      startDate: '2026-11-26T08:00:00.000Z',
      endDate: '2026-11-30T20:00:00.000Z',
      purpose: 'Training computer vision models for autonomous line tracking robot. Will run PyTorch with mixed-precision FP16.',
      deadline: '2026-12-05T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: true,
      aiRecommendationReason: 'Matched to autonomous robotics capstone. Optimal node allocated with minimal peak-hour queue conflict.'
    },
    {
      id: 'req-002',
      bookingId: 'bk-109',
      studentId: 'u1',
      studentName: 'Alice Chen',
      equipmentId: 'eq-028',
      equipmentName: 'Thermal Cycler (PCR Machine)',
      facultyId: 'u3',
      facultyName: 'Dr. Sarah Johnson',
      startDate: '2026-11-27T09:00:00.000Z',
      endDate: '2026-11-29T17:00:00.000Z',
      purpose: 'Comparative analysis of marker gene amplification under varying light exposure treatments.',
      deadline: '2026-12-10T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: true,
      aiRecommendationReason: 'Cross-department interdisciplinary approval required between Bio and CS faculty mentors.'
    },
    {
      id: 'req-003',
      bookingId: 'bk-111',
      studentId: 'u2',
      studentName: 'Bob Kumar',
      equipmentId: 'eq-008',
      equipmentName: 'Soldering & Rework Station',
      facultyId: 'u3',
      facultyName: 'Dr. Sarah Johnson',
      startDate: '2026-11-25T14:00:00.000Z',
      endDate: '2026-11-25T18:00:00.000Z',
      purpose: 'Assembly of fine-pitch SMD ICs for power amplifier final year project.',
      deadline: '2026-11-30T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: false,
      aiRecommendationReason: 'Safety certification verified on file. Low safety hazard during supervised afternoon hours.'
    },
    {
      id: 'req-004',
      bookingId: 'bk-113',
      studentId: 'u1',
      studentName: 'Alice Chen',
      equipmentId: 'eq-010',
      equipmentName: 'CNC Milling Machine (Desktop 4-Axis)',
      facultyId: 'u4',
      facultyName: 'Dr. Michael Park',
      startDate: '2026-11-28T09:00:00.000Z',
      endDate: '2026-11-30T17:00:00.000Z',
      purpose: 'Machining high-tolerance motor coupling adapters and titanium shaft mounts.',
      deadline: '2026-12-02T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: true,
      aiRecommendationReason: 'High urgency: Student capstone defense scheduled in 9 days. Immediate approval suggested.'
    },
    {
      id: 'req-005',
      bookingId: 'bk-116',
      studentId: 'u2',
      studentName: 'Bob Kumar',
      equipmentId: 'eq-019',
      equipmentName: 'Rotary Evaporator (Rotovap System)',
      facultyId: 'u3',
      facultyName: 'Dr. Sarah Johnson',
      startDate: '2026-12-01T10:00:00.000Z',
      endDate: '2026-12-02T16:00:00.000Z',
      purpose: 'Solvent extraction from conductive polymer test strips.',
      deadline: '2026-12-15T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: false,
      aiRecommendationReason: 'Requires chemical safety clearance confirmation before granting access.'
    },
    {
      id: 'req-006',
      bookingId: 'bk-117',
      studentId: 'u1',
      studentName: 'Alice Chen',
      equipmentId: 'eq-020',
      equipmentName: 'Helium-Neon Laser (632.8 nm)',
      facultyId: 'u3',
      facultyName: 'Dr. Sarah Johnson',
      startDate: '2026-12-03T11:00:00.000Z',
      endDate: '2026-12-04T16:00:00.000Z',
      purpose: 'Laser Doppler velocimetry calibration on rotating robotic arm.',
      deadline: '2026-12-08T00:00:00.000Z',
      status: 'pending',
      fromAutopilot: true,
      aiRecommendationReason: 'Class 3R Laser safety goggles must be issued with the equipment checkout key.'
    }
  ];

  // ------------------------------------------------------------
  // Comprehensive Notifications
  // ------------------------------------------------------------
  const notifications = [
    {
      id: 'notif-001',
      userId: 'u1',
      type: 'booking_confirmation',
      title: 'Booking Confirmed: Arduino Uno R3',
      message: 'Your reservation BK-78901 has been confirmed for Nov 20-22.',
      read: true,
      createdAt: '2026-11-15T10:15:00.000Z'
    },
    {
      id: 'notif-002',
      userId: 'u1',
      type: 'approval',
      title: 'Request Approved: Oscilloscope',
      message: 'Dr. Sarah Johnson approved your booking BK-78902 for Advanced Electronics Lab.',
      read: true,
      createdAt: '2026-11-19T09:00:00.000Z'
    },
    {
      id: 'notif-003',
      userId: 'u1',
      type: 'approval',
      title: 'Request Approved: Servo Motor Kit',
      message: 'Your booking BK-78903 for 2 Servo Motor units is ready for pickup on Nov 24.',
      read: false,
      createdAt: '2026-11-20T12:00:00.000Z'
    },
    {
      id: 'notif-004',
      userId: 'u1',
      type: 'reminder',
      title: 'Upcoming Reservation Tomorrow',
      message: 'Reminder: Your session on Servo Motor Kit starts tomorrow at 09:00 in A-108.',
      read: false,
      createdAt: '2026-11-23T08:00:00.000Z'
    },
    {
      id: 'notif-005',
      userId: 'u2',
      type: 'maintenance_alert',
      title: 'Equipment Alert: Laser Cutter Maintenance',
      message: 'CO2 Laser Cutter (ME-201) has entered scheduled maintenance. Equipment Rescue Mode has identified 3 alternative slots.',
      read: false,
      createdAt: '2026-11-22T14:00:00.000Z'
    },
    {
      id: 'notif-006',
      userId: 'u2',
      type: 'alternative_suggested',
      title: 'Rescue Mode: Alternative Available',
      message: 'Desktop CNC Mill is recommended as an alternative for your 2D acrylic machining needs.',
      read: false,
      createdAt: '2026-11-22T14:05:00.000Z'
    },
    {
      id: 'notif-007',
      userId: 'u3',
      type: 'reminder',
      title: 'New Student Approval Request',
      message: 'Alice Chen submitted a new request for NVIDIA RTX A6000 AI Workstation.',
      read: false,
      createdAt: '2026-11-22T16:46:00.000Z'
    },
    {
      id: 'notif-008',
      userId: 'u3',
      type: 'maintenance_alert',
      title: 'Lab Utilization Warning',
      message: 'Electronics Lab A-108 has reached 84% capacity utilization for Thursday afternoon.',
      read: true,
      createdAt: '2026-11-21T17:00:00.000Z'
    },
    {
      id: 'notif-009',
      userId: 'u4',
      type: 'reminder',
      title: 'Urgent Request Pending',
      message: 'Alice Chen has an urgent capstone deadline for CNC Milling Machine. Defense is in 9 days.',
      read: false,
      createdAt: '2026-11-22T14:25:00.000Z'
    },
    {
      id: 'notif-010',
      userId: 'u5',
      type: 'maintenance_alert',
      title: 'Campus System Notice',
      message: 'Weekly campus-wide lab equipment synchronization completed. 42 devices online, 1 in maintenance.',
      read: true,
      createdAt: '2026-11-23T06:00:00.000Z'
    }
  ];

  // ------------------------------------------------------------
  // Maintenance Schedules
  // ------------------------------------------------------------
  const maintenanceSchedules = [
    {
      id: 'maint-01',
      equipmentId: 'eq-011',
      equipmentName: 'Precision Laser Cutter (CO2 80W)',
      startDate: '2026-11-22T08:00:00.000Z',
      endDate: '2026-11-29T18:00:00.000Z',
      reason: 'Replacing 80W laser optical tube and recalibrating mirror alignment.',
      technician: 'LaserTech Precision Systems',
      status: 'in_progress',
      affectedBookingsCount: 3
    },
    {
      id: 'maint-02',
      equipmentId: 'eq-010',
      equipmentName: 'CNC Milling Machine (Desktop 4-Axis)',
      startDate: '2026-12-05T08:00:00.000Z',
      endDate: '2026-12-06T18:00:00.000Z',
      reason: 'Spindle bearing lubrication and collet runout inspection.',
      technician: 'Campus Machine Shop',
      status: 'scheduled',
      affectedBookingsCount: 0
    }
  ];

  // ------------------------------------------------------------
  // Core Business & Availability Calculation Engine
  // ------------------------------------------------------------
  function getEquipmentById(id) {
    return equipment.find(e => e.id === id) || null;
  }

  function getUserByEmail(email) {
    return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || null;
  }

  function getUserById(id) {
    return users.find(u => u.id === id) || null;
  }

  function getLabById(id) {
    return labs.find(l => l.id === id) || null;
  }

  /**
   * Real-time availability calculation checking actual inventory vs. concurrent bookings
   */
  function calculateAvailability(equipmentId, startDateStr, endDateStr, requestedQty) {
    const eq = getEquipmentById(equipmentId);
    if (!eq) {
      return { available: false, availableQuantity: 0, conflictingBookings: [], message: 'Equipment not found' };
    }

    if (eq.status === 'Maintenance' || eq.condition === 'Under Maintenance') {
      return {
        available: false,
        availableQuantity: 0,
        conflictingBookings: [],
        message: 'Equipment is currently under maintenance. Try Equipment Rescue Mode.'
      };
    }

    const startReq = new Date(startDateStr).getTime();
    const endReq = new Date(endDateStr).getTime();

    if (isNaN(startReq) || isNaN(endReq) || startReq >= endReq) {
      return { available: false, availableQuantity: 0, conflictingBookings: [], message: 'Invalid date range' };
    }

    // Find all active/approved/pending bookings that overlap with requested window
    const overlappingBookings = bookings.filter(b => {
      if (b.equipmentId !== equipmentId) return false;
      if (b.status === 'cancelled' || b.status === 'rejected' || b.status === 'completed') return false;

      const bStart = new Date(b.startDate).getTime();
      const bEnd = new Date(b.endDate).getTime();

      // Standard interval overlap: max(startReq, bStart) < min(endReq, bEnd)
      return (startReq < bEnd && endReq > bStart);
    });

    // Sum booked quantities during this window
    const totalBookedInWindow = overlappingBookings.reduce((sum, b) => sum + (Number(b.quantity) || 1), 0);
    const availableQty = Math.max(0, eq.totalQuantity - totalBookedInWindow);
    const needed = Number(requestedQty) || 1;

    const isAvailable = availableQty >= needed;

    return {
      available: isAvailable,
      availableQuantity: availableQty,
      totalQuantity: eq.totalQuantity,
      conflictingBookings: overlappingBookings,
      message: isAvailable
        ? `${availableQty} of ${eq.totalQuantity} units available for requested dates`
        : `Only ${availableQty} units available; requested ${needed}. Conflict with ${overlappingBookings.length} booking(s).`
    };
  }

  // Ensure both specs and specifications aliases exist on all equipment
  equipment.forEach(e => {
    if (!e.specs) e.specs = e.specifications || {};
    if (!e.specifications) e.specifications = e.specs || {};
  });

  // ------------------------------------------------------------
  // Global Export
  // ------------------------------------------------------------
  window.LabLinkData = {
    equipment,
    labs,
    users,
    bookings,
    bookingRequests,
    notifications,
    maintenanceSchedules,
    getEquipmentById,
    getUserByEmail,
    getUserById,
    getLabById,
    calculateAvailability
  };

  console.log('[LabLinkData] Data layer loaded with ' + equipment.length + ' equipment items, ' + labs.length + ' labs, and ' + bookings.length + ' bookings.');
})();
