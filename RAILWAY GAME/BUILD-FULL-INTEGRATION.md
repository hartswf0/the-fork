# 🔨 BUILD PLAN: Full Integration

## What You're Asking For (The REAL Thing)

**Stop making weak demos. Build the FULL system with ALL genetic material preserved.**

---

## Requirements (ALL of them)

### 1. FULL TRAIN (from train-brain-19.html)
- ✅ Multiple cars (locomotive + 4 passenger cars: Print, Radio, TV, Internet)
- ✅ Detailed wheels (spokes, hub, bolts, washers - ALL 300 lines)
- ✅ Coupling between cars
- ✅ Banking on curves
- ✅ Wheel rotation animation
- ✅ Track switching with physical rails
- ✅ 21 camera views available
- ✅ Media era styling per car

### 2. FULL THOUSAND-TETRAD INTERFACE
- ✅ Multi-column swipeable channels
- ✅ Collapsible/expandable columns (52px to 420px)
- ✅ Four corner buttons (◎, SCENARIOS, ABOUT, HELP)
- ✅ LEGOS 9×9 grid with entity types
- ✅ Message dots timeline
- ✅ Tetrad chips (inline with messages)
- ✅ Fork menu with 8 modes
- ✅ Scene assembly with OpenAI
- ✅ Entity perspective switching

### 3. INTEGRATION LAYER (The New Part)
- ✅ 3D train view embedded IN channel column
- ✅ Chat messages drive LEGOS grid updates
- ✅ LEGOS grid configuration triggers train decisions
- ✅ Tetrad chips map to physical tracks
- ✅ Junction detection pauses train
- ✅ Fork creates new channel + switches track
- ✅ Full feedback loop

---

## File Structure

```
railway-full-integration.html (single file, ~3000 lines)

Structure:
├─ CSS from thousand-tetrad (lines 1-2398)
│  └─ Keep ALL theming, layout, grid, tetrad styles
│
├─ HTML from thousand-tetrad (modified)
│  ├─ Corner buttons
│  ├─ Channel columns
│  ├─ LEGOS grid
│  ├─ Message list
│  ├─ Tetrad panel
│  └─ NEW: Three.js canvas embedded in channel
│
├─ JavaScript Layer 1: Train System (from train-brain)
│  ├─ createWheel() - FULL 300 lines
│  ├─ createTrainBodyMesh() - With era styling
│  ├─ addTrainCar() - Complete assembly
│  ├─ createPassengerFigure() - Visible passengers
│  └─ Track geometry with switching
│
├─ JavaScript Layer 2: Tetrad System (from thousand-tetrad)
│  ├─ createChannel() - Multi-column management
│  ├─ forkChannel() - 8 fork modes
│  ├─ callOpenAI() - Scene + Tetrad generation
│  ├─ renderGrid() - LEGOS 9×9
│  └─ renderMessages() - Chat interface
│
└─ JavaScript Layer 3: Integration Bridge (NEW)
   ├─ embedTrainInChannel() - 3D canvas in column
   ├─ syncGridToTrain() - Spatial → Physical
   ├─ syncTrainToGrid() - Physical → Spatial
   ├─ onJunctionReached() - Decision trigger
   └─ onFork() - Track switch + scene update
```

---

## Key Integration Points

### Point 1: Embed Train in Channel

```javascript
// In channel creation
function createChannel(parentId, forkMode) {
    const channel = {
        id: uuid(),
        dom: {
            column: createColumnElement(),
            gridEl: createGridElement(),
            messageList: createMessageList(),
            trainCanvas: createTrainCanvas(), // NEW
            trainScene: null, // NEW
            trainRenderer: null // NEW
        },
        // ... rest
    };
    
    // Initialize 3D scene for this channel
    initTrainForChannel(channel);
    
    return channel;
}

function initTrainForChannel(channel) {
    const canvas = channel.dom.trainCanvas;
    
    // Create Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    
    // Create full train (locomotive + 4 cars)
    const trainCars = [];
    addTrainCar(scene, trainCars, true); // Locomotive
    addTrainCar(scene, trainCars, false, 'Print');
    addTrainCar(scene, trainCars, false, 'Radio');
    addTrainCar(scene, trainCars, false, 'Television');
    addTrainCar(scene, trainCars, false, 'Internet');
    
    // Create 5 tracks
    Object.entries(TRACKS).forEach(([id, config]) => {
        createTrackGeometry(scene, config.radius);
    });
    
    channel.trainScene = scene;
    channel.trainRenderer = renderer;
    channel.trainCars = trainCars;
    channel.currentTrack = 'main';
}
```

### Point 2: Scene Assembly → Grid → Train

```javascript
async function assembleSceneForChannel(channel, userMessage) {
    // 1. Call OpenAI
    const scene = await callOpenAI('SceneAssembler', {
        currentState: channel.lastScene,
        message: userMessage,
        history: channel.messages.slice(-6)
    });
    
    // 2. Update grid
    channel.lastScene = scene;
    renderChannelGrid(channel);
    
    // 3. Analyze spatial configuration
    const analysis = analyzeGridConfiguration(scene.gridMapping);
    
    // 4. Check if decision needed
    if (analysis.hasConflict || analysis.hasGoal) {
        // Generate tetrad
        const tetrad = await callOpenAI('TetradGenerator', {
            scene: scene,
            history: channel.messages.slice(-2)
        });
        
        channel.tetrad = tetrad;
        renderTetradPanel(channel);
        
        // 5. Trigger junction
        triggerJunction(channel);
    }
}

function analyzeGridConfiguration(gridMapping) {
    const hasGoal = gridMapping.some(cell => cell.type === 'Goal');
    const hasObstacle = gridMapping.some(cell => cell.type === 'Obstacle');
    const hasSolution = gridMapping.some(cell => cell.type === 'Solution');
    
    return {
        hasGoal,
        hasObstacle,
        hasSolution,
        hasConflict: hasGoal && hasObstacle
    };
}
```

### Point 3: Junction Trigger → Decision

```javascript
function triggerJunction(channel) {
    // 1. Pause train
    channel.trainPaused = true;
    
    // 2. Highlight grid
    channel.dom.gridEl.classList.add('decision-mode');
    
    // 3. Show tetrad chips
    const tetradChips = channel.dom.tetradPanel.querySelectorAll('.tetrad-chip');
    tetradChips.forEach(chip => chip.classList.add('clickable'));
    
    // 4. Add system message
    addMessageToChannel(channel, 'system', 
        'Junction reached. Four paths diverge. Choose your track:');
    
    // 5. Wait for user click
    // (handled by existing tetrad chip click handlers)
}
```

### Point 4: Fork → Track Switch

```javascript
function forkChannel(channel, message, mode, options = {}) {
    // 1. Original fork logic
    const newChannel = createChannel(channel.id, mode);
    // ... copy history, add context
    
    // 2. NEW: Switch track
    switchTrainToTrack(newChannel, mode);
    
    // 3. Resume train
    newChannel.trainPaused = false;
    
    // 4. Add system message
    addMessageToChannel(newChannel, 'system',
        `Now on ${TRACKS[mode].name}. The narrative frame has shifted.`);
    
    return newChannel;
}

function switchTrainToTrack(channel, trackId) {
    const track = TRACKS[trackId];
    
    // Animate transition
    const startRadius = channel.currentTrackRadius;
    const endRadius = track.radius;
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Interpolate radius
        const currentRadius = startRadius + (endRadius - startRadius) * progress;
        
        // Update train position
        updateTrainOnRadius(channel, currentRadius);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            channel.currentTrack = trackId;
            channel.currentTrackRadius = endRadius;
        }
    }
    
    animate();
}
```

---

## Layout

```css
/* thousand-tetrad column with embedded train */
.channel-column {
    width: 420px;
    display: flex;
    flex-direction: column;
}

.train-viewport {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border: 1px solid var(--border);
    border-radius: 4px;
    margin-bottom: 12px;
}

.train-viewport canvas {
    width: 100%;
    height: 100%;
}

/* Grid is below train */
.grid-wrapper {
    /* existing grid styles */
}

/* Messages below grid */
.message-list {
    /* existing message styles */
}
```

---

## Testing Checklist

After build, verify:

- [ ] Can create channel
- [ ] Train appears in channel viewport
- [ ] Train has 5 cars (locomotive + 4 passengers)
- [ ] Wheels have full detail (spokes visible)
- [ ] All 5 tracks visible as concentric circles
- [ ] Can type message
- [ ] OpenAI generates scene
- [ ] LEGOS grid updates with entities
- [ ] Tetrad appears after scene
- [ ] Can click tetrad chip
- [ ] Fork creates new channel
- [ ] Train switches to new track (animated)
- [ ] Can collapse/expand columns
- [ ] Corner buttons work
- [ ] Can swipe between channels

---

## Build Order

1. **Start with thousand-tetrad HTML/CSS** (lines 1-2398)
2. **Add train canvas element** to channel template
3. **Copy createWheel()** from train-brain (lines 859-1152)
4. **Copy createTrainBodyMesh()** from train-brain (lines 1154-1295)
5. **Copy addTrainCar()** from train-brain (lines 1281-1392)
6. **Add track creation** function
7. **Integrate into channel creation**
8. **Add bridge functions** (syncGridToTrain, etc.)
9. **Test each piece**
10. **Polish integration**

---

## Next: BUILD IT

Create `railway-full-integration.html` with ALL this.

No more demos. This is the REAL thing.
