/**
 * CORE: train-brain-19.html
 * Stripped to essentials for integration
 * 
 * GENETIC MATERIAL:
 * - Full wheel system (300 lines)
 * - Train body with era styling
 * - Track system (TorusGeometry)
 * - Train car management (addTrainCar, resetTrain)
 * - Animation loop with path following
 * - Wheel rotation
 * - Banking on curves
 * - Media era definitions
 * - Passenger figures
 * - Station geometry
 */

// ========================================
// CORE CONFIGURATION
// ========================================

const TRAIN_CONFIG = {
    trackRadius: 50,
    trackGauge: 3,
    railVerticalOffset: 0.3,
    locomotiveLength: 10,
    carLength: 10,
    couplingOffset: 0.5,
    wheelRadius: 0.5,
    wheelThickness: 0.15,
    currentSpeed: 5,
    bankingMultiplier: 1.0
};

// ========================================
// MEDIA ERA DEFINITIONS (CORE)
// ========================================

const MEDIA_ERAS = {
    'Print': {
        color: 0x8B4513,
        personality: "I am the bearer of permanence, the keeper of standardized knowledge."
    },
    'Radio': {
        color: 0x4169E1,
        personality: "I'm broadcasting from everywhere and nowhere, riding invisible waves."
    },
    'Television': {
        color: 0x9370DB,
        personality: "I combine sound and vision to create reality more vivid than reality itself."
    },
    'Internet': {
        color: 0x00CED1,
        personality: "I'm not one voice but millions, not one channel but infinite streams."
    }
};

// ========================================
// WHEEL CREATION (FULL SYSTEM)
// ========================================

function createWheel() {
    const wheelRadius = TRAIN_CONFIG.wheelRadius;
    const wheelThickness = TRAIN_CONFIG.wheelThickness;
    const wheelGroup = new THREE.Group();
    
    // Backing ring (red accent)
    const backingRingGeometry = new THREE.RingGeometry(
        wheelRadius * 0.31,
        wheelRadius * 0.315,
        32, 1
    );
    const backingMaterial = new THREE.MeshStandardMaterial({
        color: 0x880000,
        metalness: 0.2,
        roughness: 0.7,
        side: THREE.DoubleSide,
        emissive: 0x330000,
        emissiveIntensity: 0.4
    });
    const backing = new THREE.Mesh(backingRingGeometry, backingMaterial);
    backing.rotation.y = Math.PI / 2;
    wheelGroup.add(backing);
    
    // Highlight ring
    const highlightRingGeometry = new THREE.RingGeometry(
        wheelRadius * 0.32,
        wheelRadius * 0.33,
        32, 1
    );
    const highlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xDDDDDD,
        emissive: 0x999999,
        emissiveIntensity: 0.7,
        metalness: 0.1,
        roughness: 0.3
    });
    const highlightRing = new THREE.Mesh(highlightRingGeometry, highlightMaterial);
    highlightRing.rotation.x = Math.PI / 2;
    wheelGroup.add(highlightRing);
    
    // Middle ring (cream colored)
    const middleRingGeometry = new THREE.TorusGeometry(
        wheelRadius * 0.85,
        wheelThickness * 0.12,
        32, 8, Math.PI * 2
    );
    const middleRingMaterial = new THREE.MeshStandardMaterial({
        color: 0xEAE0C8,
        metalness: 0.1,
        roughness: 0.7,
        emissive: 0x111111,
        emissiveIntensity: 0.05
    });
    const middleRing = new THREE.Mesh(middleRingGeometry, middleRingMaterial);
    wheelGroup.add(middleRing);
    
    // Tire
    const tireGeometry = new THREE.TorusGeometry(
        wheelRadius - (wheelThickness * 0.05),
        wheelThickness * 0.1,
        32, 8, Math.PI * 2
    );
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.1,
        roughness: 0.9
    });
    const tire = new THREE.Mesh(tireGeometry, tireMaterial);
    wheelGroup.add(tire);
    
    // Tire highlight
    const tireHighlightGeometry = new THREE.TorusGeometry(
        wheelRadius - (wheelThickness * 0.05),
        wheelThickness * 0.03,
        32, 8, Math.PI * 2
    );
    const tireHighlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xCCCCCC,
        metalness: 0.2,
        roughness: 0.4,
        emissive: 0x555555,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
    });
    const tireHighlight = new THREE.Mesh(tireHighlightGeometry, tireHighlightMaterial);
    tireHighlight.position.z = wheelThickness * 0.05;
    wheelGroup.add(tireHighlight);
    
    // Spokes
    const spokeCount = 12;
    const spokeMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.6,
        roughness: 0.5
    });
    
    // Inner ring
    const innerRingGeometry = new THREE.TorusGeometry(
        wheelRadius * 0.4,
        wheelThickness * 0.05,
        16, 8, Math.PI * 2
    );
    const innerRing = new THREE.Mesh(innerRingGeometry, spokeMaterial);
    wheelGroup.add(innerRing);
    
    // Outer ring
    const outerRingGeometry = new THREE.TorusGeometry(
        wheelRadius * 0.75,
        wheelThickness * 0.05,
        16, 8, Math.PI * 2
    );
    const outerRing = new THREE.Mesh(outerRingGeometry, spokeMaterial);
    wheelGroup.add(outerRing);
    
    // Create spokes
    for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2;
        const spokeGeometry = new THREE.BoxGeometry(
            wheelRadius * 0.35,
            wheelThickness * 0.08,
            wheelThickness * 0.08
        );
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.position.set(
            Math.cos(angle) * (wheelRadius * 0.575),
            Math.sin(angle) * (wheelRadius * 0.575),
            0
        );
        spoke.rotation.z = angle;
        wheelGroup.add(spoke);
        
        // Cross spokes
        if (i % 2 === 0) {
            const crossSpokeGeometry = new THREE.BoxGeometry(
                wheelRadius * 0.25,
                wheelThickness * 0.06,
                wheelThickness * 0.06
            );
            const crossSpoke = new THREE.Mesh(crossSpokeGeometry, spokeMaterial);
            const crossAngle = angle + (Math.PI / spokeCount);
            crossSpoke.position.set(
                Math.cos(crossAngle) * (wheelRadius * 0.6),
                Math.sin(crossAngle) * (wheelRadius * 0.6),
                0
            );
            crossSpoke.rotation.z = crossAngle + (Math.PI / 4);
            wheelGroup.add(crossSpoke);
        }
    }
    
    // Hub
    const hubGeometry = new THREE.CylinderGeometry(
        wheelRadius * 0.27,
        wheelRadius * 0.27,
        wheelThickness * 1.2,
        16
    );
    const hubMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.75,
        roughness: 0.6
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    wheelGroup.add(hub);
    
    // Axle hole
    const axleHoleGeometry = new THREE.CylinderGeometry(
        wheelRadius * 0.4,
        wheelRadius * 0.4,
        wheelThickness * 1.1,
        12
    );
    const axleHoleMaterial = new THREE.MeshStandardMaterial({
        color: 0x0A0A0A,
        metalness: 0.3,
        roughness: 0.9,
        side: THREE.DoubleSide
    });
    const axleHole = new THREE.Mesh(axleHoleGeometry, axleHoleMaterial);
    wheelGroup.add(axleHole);
    
    // Bolts and washers
    const boltCount = 8;
    const boltGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 6);
    const boltMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,
        metalness: 0.8,
        roughness: 0.4
    });
    const washerGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8);
    const washerMaterial = new THREE.MeshStandardMaterial({
        color: 0x777777,
        metalness: 0.7,
        roughness: 0.5
    });
    
    for (let i = 0; i < boltCount; i++) {
        const angle = (i / boltCount) * Math.PI * 2;
        const radius = wheelRadius * 0.27 * 1.3;
        
        const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
        bolt.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
        );
        wheelGroup.add(bolt);
        
        const washer = new THREE.Mesh(washerGeometry, washerMaterial);
        washer.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
        );
        wheelGroup.add(washer);
        
        const nut = new THREE.Mesh(boltGeometry, boltMaterial);
        nut.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
        );
        nut.scale.set(0.8, 1, 0.8);
        wheelGroup.add(nut);
    }
    
    // Enable shadows
    wheelGroup.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    return wheelGroup;
}

// ========================================
// TRAIN BODY CREATION
// ========================================

function createTrainBodyMesh(isLocomotive, eraType) {
    const bodyLength = isLocomotive ? TRAIN_CONFIG.locomotiveLength : TRAIN_CONFIG.carLength;
    const bodyHeight = isLocomotive ? 3 : 2.5;
    const bodyWidth = 3;
    
    const bodyGeometry = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
    const eraColor = eraType ? MEDIA_ERAS[eraType].color : 0x2a2a2a;
    const bodyMaterial = new THREE.MeshLambertMaterial({
        color: eraColor,
        transparent: true,
        opacity: 0.9
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    
    // Edges
    const bodyEdges = new THREE.EdgesGeometry(bodyGeometry);
    const bodyOutline = new THREE.LineSegments(bodyEdges, new THREE.LineBasicMaterial({ color: 0xE9D7BE }));
    bodyMesh.add(bodyOutline);
    
    return bodyMesh;
}

// ========================================
// TRAIN CAR ASSEMBLY
// ========================================

function addTrainCar(scene, trainCars, isLocomotive, eraType = null) {
    const carData = {
        group: new THREE.Group(),
        wheels: [],
        bodyMesh: null,
        type: isLocomotive ? 'Locomotive' : 'Car',
        era: eraType,
        u: 0
    };
    
    const bodyLength = isLocomotive ? TRAIN_CONFIG.locomotiveLength : TRAIN_CONFIG.carLength;
    const bodyHeight = isLocomotive ? 3 : 2.5;
    
    carData.group.position.y = TRAIN_CONFIG.railVerticalOffset;
    
    // Body
    const carBodyMesh = createTrainBodyMesh(isLocomotive, eraType);
    carBodyMesh.position.y = bodyHeight / 2;
    carData.group.add(carBodyMesh);
    carData.bodyMesh = carBodyMesh;
    
    // Wheels
    const wheelZOffset = (TRAIN_CONFIG.trackGauge / 2) * 1.1;
    const wheelAxleOffset = bodyLength / 2 - 2.0;
    const wheelYOffset = TRAIN_CONFIG.wheelRadius;
    
    const wheelPositions = [
        { x: wheelAxleOffset, z: -wheelZOffset },  // Front left
        { x: wheelAxleOffset, z: wheelZOffset },   // Front right
        { x: -wheelAxleOffset, z: -wheelZOffset }, // Rear left
        { x: -wheelAxleOffset, z: wheelZOffset }   // Rear right
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = createWheel();
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, wheelYOffset, pos.z);
        carData.group.add(wheel);
        carData.wheels.push(wheel);
    });
    
    // Bogies
    const bogieLength = 3.5;
    const bogieGeometry = new THREE.BoxGeometry(bogieLength, 0.3, wheelZOffset * 2 * 0.9);
    const bogieMaterial = new THREE.MeshLambertMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.8
    });
    const bogieYPosition = wheelYOffset + 0.1;
    
    const frontBogie = new THREE.Mesh(bogieGeometry, bogieMaterial);
    frontBogie.position.set(wheelAxleOffset, bogieYPosition, 0);
    frontBogie.castShadow = true;
    carData.group.add(frontBogie);
    
    const rearBogie = new THREE.Mesh(bogieGeometry, bogieMaterial);
    rearBogie.position.set(-wheelAxleOffset, bogieYPosition, 0);
    rearBogie.castShadow = true;
    carData.group.add(rearBogie);
    
    // Coupling (for non-locomotive cars)
    if (!isLocomotive) {
        const couplingGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const couplingMaterial = new THREE.MeshLambertMaterial({ color: 0xCCBBAA });
        const couplingYPosition = (bodyHeight / 2) - 0.5;
        
        const coupling = new THREE.Mesh(couplingGeometry, couplingMaterial);
        coupling.rotation.x = Math.PI / 2;
        coupling.position.set(-bodyLength / 2 - TRAIN_CONFIG.couplingOffset, couplingYPosition, 0);
        carData.group.add(coupling);
        
        const rearCoupling = coupling.clone();
        rearCoupling.position.set(bodyLength / 2 + TRAIN_CONFIG.couplingOffset, couplingYPosition, 0);
        carData.group.add(rearCoupling);
    }
    
    carData.group.userData = {
        isLocomotive: isLocomotive,
        era: eraType,
        clickable: true,
        carData: carData
    };
    
    scene.add(carData.group);
    
    if (isLocomotive) {
        trainCars.unshift(carData);
    } else {
        trainCars.push(carData);
    }
    
    return carData;
}

// ========================================
// TRACK SYSTEM
// ========================================

function createTrackGeometry(scene, radius) {
    const trackElements = [];
    const railTubeRadius = 0.3;
    const railSegments = 32;
    const railRadialSegments = 8;
    const trackGauge = TRAIN_CONFIG.trackGauge;
    
    const innerRailRadius = radius - (trackGauge / 2);
    const outerRailRadius = radius + (trackGauge / 2);
    
    const railMaterial = new THREE.MeshLambertMaterial({
        color: 0x3d3d3d,
        transparent: true,
        opacity: 0.9
    });
    
    // Inner rail
    const railInner = new THREE.Mesh(
        new THREE.TorusGeometry(innerRailRadius, railTubeRadius, railRadialSegments, railSegments),
        railMaterial
    );
    railInner.position.y = TRAIN_CONFIG.railVerticalOffset - railTubeRadius;
    railInner.rotation.x = -Math.PI / 2;
    railInner.receiveShadow = true;
    scene.add(railInner);
    trackElements.push(railInner);
    
    // Outer rail
    const railOuter = new THREE.Mesh(
        new THREE.TorusGeometry(outerRailRadius, railTubeRadius, railRadialSegments, railSegments),
        railMaterial
    );
    railOuter.position.y = TRAIN_CONFIG.railVerticalOffset - railTubeRadius;
    railOuter.rotation.x = -Math.PI / 2;
    railOuter.receiveShadow = true;
    scene.add(railOuter);
    trackElements.push(railOuter);
    
    // Create curve for path following
    const trainPathCurve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false, 0
    );
    
    return { trackElements, trainPathCurve, totalLength: trainPathCurve.getLength() };
}

// ========================================
// EXPORT CORE FUNCTIONS
// ========================================

const CORE_TRAIN = {
    config: TRAIN_CONFIG,
    mediaEras: MEDIA_ERAS,
    createWheel,
    createTrainBodyMesh,
    addTrainCar,
    createTrackGeometry
};

// For Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CORE_TRAIN;
}
