# RAILWAY JUNCTION INTEGRATION BLUEPRINT
## "Forking Paths" as Railway Switches

---

## 🎯 CORE METAPHOR

**The Railway Yard as Decision Space**

```
            ╱─── ENHANCE TRACK (green)
           ╱
MAIN ─────●──── CONTINUE (white)
           ╲
            ╲─── REVERSE TRACK (red)
             ╲
              ╲─ RETRIEVE TRACK (blue)
               ╲
                ● OBSOLESCE TRACK (gray)
```

Every conversation decision = railroad switch  
Every branch = physical track in 3D space  
Every message = train moving along track  
Every passenger = entity with perspective  

---

## 🏗️ ARCHITECTURE DESIGN

### **3-Layer Interface**

```
┌─────────────────────────────────────────────┐
│ LAYER 1: 3D RAILWAY YARD (60% height)       │
│ ┌─────────────────────────────────────────┐ │
│ │  Camera: Track-level or overhead        │ │
│ │  Trains: Multiple on different tracks   │ │
│ │  Switches: Animated at junctions        │ │
│ │  Labels: Track names floating above     │ │
│ │  Passengers: Visible through windows    │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ LAYER 2: CHAT INTERFACE (30% height)        │
│ ┌─────────────────────────────────────────┐ │
│ │  Messages: Current active train         │ │
│ │  Input: Type or click track buttons     │ │
│ │  Switches: Tetrad options as buttons    │ │
│ │  Status: "Train approaching junction"   │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ LAYER 3: TRACK MAP (10% height, collapsible)│
│ ┌─────────────────────────────────────────┐ │
│ │  Minimap: Overhead view of all tracks   │ │
│ │  Trains: Dots showing positions         │ │
│ │  Click: Switch view to that train       │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🚂 TRACK SYSTEM DESIGN

### **Track Types**

```javascript
const TRACKS = {
  main: {
    id: 'main',
    name: 'MAIN LINE',
    color: '#aef3c1', // Green accent
    path: 'circular', // Original circular path
    tetradMode: null,
    description: 'Continue conversation naturally'
  },
  enhance: {
    id: 'enhance',
    name: 'ENHANCE SPUR',
    color: '#56ff9f', // Bright green
    path: 'curve_left', // Curves off main
    tetradMode: 'enhance',
    description: 'What does this amplify or intensify?'
  },
  reverse: {
    id: 'reverse',
    name: 'REVERSE JUNCTION',
    color: '#ff5c7c', // Danger red
    path: 'curve_right',
    tetradMode: 'reverse',
    description: 'What does this flip when pushed to extremes?'
  },
  retrieve: {
    id: 'retrieve',
    name: 'RETRIEVE OVERPASS',
    color: '#569fff', // Blue
    path: 'upper_loop',
    tetradMode: 'retrieve',
    description: 'What obsolete patterns does this bring back?'
  },
  obsolesce: {
    id: 'obsolesce',
    name: 'OBSOLESCE UNDERPASS',
    color: '#888888', // Gray
    path: 'lower_loop',
    tetradMode: 'obsolesce',
    description: 'What does this push into obsolescence?'
  }
};
```

### **Junction Design**

```javascript
class RailwayJunction {
  constructor(position, availableTracks) {
    this.position = position; // 3D world coords
    this.tracks = availableTracks; // ['main', 'enhance', 'reverse']
    this.state = 'main'; // Current switch position
    this.lever = null; // Animated lever mesh
    this.signals = {}; // Red/green lights per track
  }
  
  // Animate switch from current to target track
  animateSwitch(targetTrack, duration = 1000) {
    // Move rail sections
    // Flip lever
    // Change signal lights
    // Return promise when complete
  }
  
  // Highlight available tracks
  showOptions(tracks) {
    tracks.forEach(track => {
      this.signals[track].color = TRACKS[track].color;
      this.signals[track].intensity = 2.0; // Bright
    });
  }
}
```

### **Track Path Geometry**

```javascript
// Replace single circular track with branching system
function createTrackPaths() {
  const paths = {};
  
  // MAIN: Full circle (original)
  paths.main = new THREE.EllipseCurve(
    0, 0,
    simParams.trackRadius, simParams.trackRadius,
    0, 2 * Math.PI,
    false, 0
  );
  
  // ENHANCE: Curves left, then loops back
  const enhanceCurve = new THREE.CurvePath();
  enhanceCurve.add(new THREE.LineCurve3(
    new THREE.Vector3(0, 0, trackRadius),
    new THREE.Vector3(-trackRadius * 0.5, 0, trackRadius * 1.5)
  ));
  enhanceCurve.add(new THREE.EllipseCurve3(
    -trackRadius * 0.5, 0, trackRadius * 1.5,
    trackRadius * 0.8, trackRadius * 0.8,
    0, Math.PI * 2
  ));
  paths.enhance = enhanceCurve;
  
  // REVERSE: Curves right, sharp turn back
  // RETRIEVE: Upper level, spiral up
  // OBSOLESCE: Lower level, spiral down
  
  return paths;
}
```

---

## 💬 CHAT-TRACK INTEGRATION

### **Decision Flow**

```javascript
class ConversationTrain {
  constructor(trackId, channelId) {
    this.trackId = trackId; // Which track
    this.channelId = channelId; // Which conversation
    this.position = 0.0; // 0-1 along track path
    this.passengers = []; // Entity objects
    this.history = []; // Message history
    this.nextJunction = null; // Upcoming decision point
  }
  
  // Move train along track
  advance(delta) {
    this.position += delta;
    
    // Check for junction
    if (this.position >= this.nextJunction?.position) {
      this.pause();
      this.showJunctionUI();
    }
  }
  
  // Show decision options at junction
  showJunctionUI() {
    const junction = this.nextJunction;
    const options = junction.tracks.map(trackId => ({
      track: TRACKS[trackId],
      button: createTrackButton(TRACKS[trackId])
    }));
    
    // Display in chat area
    showDecisionPrompt(options);
  }
  
  // Player chooses track
  async chooseTrack(trackId) {
    // Animate switch
    await this.currentJunction.animateSwitch(trackId);
    
    // Fork conversation if needed
    if (trackId !== 'main') {
      await forkConversation(this.channelId, trackId);
    }
    
    // Move to new track
    this.trackId = trackId;
    this.resume();
  }
}
```

### **Junction Triggers**

```javascript
// Place junctions at specific conversation milestones
const JUNCTION_TRIGGERS = [
  {
    position: 0.25, // 1/4 around track
    condition: (train) => train.history.length >= 3,
    tracks: ['main', 'enhance', 'reverse']
  },
  {
    position: 0.50, // Halfway
    condition: (train) => train.history.length >= 6,
    tracks: ['main', 'retrieve', 'obsolesce']
  },
  {
    position: 0.75, // 3/4 around
    condition: (train) => train.history.length >= 9,
    tracks: ['main', 'enhance', 'reverse', 'retrieve']
  }
];
```

---

## 🤖 OPENAI API INTEGRATION

### **Streaming Chat**

```javascript
class OpenAIRailway {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }
  
  async sendMessage(train, userMessage) {
    // Build context with track info
    const messages = [
      {
        role: 'system',
        content: this.buildSystemPrompt(train)
      },
      ...train.history,
      {
        role: 'user',
        content: userMessage
      }
    ];
    
    // Stream response
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        stream: true,
        temperature: 0.7
      })
    });
    
    // Parse stream and update UI
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(l => l.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          const json = JSON.parse(data);
          const delta = json.choices[0]?.delta?.content;
          
          if (delta) {
            accumulatedText += delta;
            updateChatUI(accumulatedText);
            advanceTrainSlightly(train); // Visual feedback
          }
        }
      }
    }
    
    // Add to history
    train.history.push({
      role: 'assistant',
      content: accumulatedText
    });
    
    // Generate tetrad for next junction
    await this.generateTetrad(train, accumulatedText);
  }
  
  buildSystemPrompt(train) {
    const trackInfo = TRACKS[train.trackId];
    return `You are a guide on the ${trackInfo.name} railway track.
    
Track context: ${trackInfo.description}
Current mode: ${trackInfo.tetradMode || 'exploration'}

Passengers on board: ${train.passengers.map(p => p.name).join(', ')}

Your responses should reflect the perspective of this track. When appropriate, suggest moments where the conversation could branch to other tracks (junctions).`;
  }
  
  async generateTetrad(train, lastMessage) {
    // Call OpenAI to generate McLuhan tetrad
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Generate a McLuhan tetrad for this concept. Return JSON:
{
  "enhance": "What does it amplify?",
  "reverse": "What does it flip into?",
  "retrieve": "What does it bring back?",
  "obsolesce": "What does it replace?"
}`
          },
          {
            role: 'user',
            content: lastMessage
          }
        ],
        response_format: { type: "json_object" }
      })
    });
    
    const data = await response.json();
    train.tetrad = JSON.parse(data.choices[0].message.content);
    
    // Setup next junction with tetrad options
    setupNextJunction(train);
  }
}
```

---

## 👥 PASSENGER-ENTITY SYSTEM

### **Passenger Types**

```javascript
const PASSENGER_TYPES = {
  narrator: {
    symbol: '🎭',
    color: '#aef3c1',
    role: 'Observes and describes'
  },
  advocate: {
    symbol: '⚡',
    color: '#56ff9f',
    role: 'Pushes for action'
  },
  skeptic: {
    symbol: '🔍',
    color: '#569fff',
    role: 'Questions assumptions'
  },
  historian: {
    symbol: '📜',
    color: '#fbbf24',
    role: 'Provides context'
  },
  rebel: {
    symbol: '🔥',
    color: '#ff5c7c',
    role: 'Challenges status quo'
  }
};

class Passenger {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.config = PASSENGER_TYPES[type];
    this.seat = null; // {car: 1, position: 2}
    this.speaking = false;
    this.mesh = null; // Three.js mesh
  }
  
  // Create 3D representation
  create3DModel() {
    const group = new THREE.Group();
    
    // Simple humanoid figure
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.8),
      new THREE.MeshLambertMaterial({color: 0x333333})
    );
    
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.12),
      new THREE.MeshLambertMaterial({color: 0xE8C8A8})
    );
    head.position.y = 0.5;
    
    // Badge with symbol
    const badge = createTextSprite(this.config.symbol);
    badge.position.set(0, 0.3, 0.25);
    
    group.add(body);
    group.add(head);
    group.add(badge);
    
    this.mesh = group;
    return group;
  }
  
  // Animate when speaking
  speak(message) {
    this.speaking = true;
    
    // Glow effect
    this.mesh.traverse(child => {
      if (child.material) {
        child.material.emissive = new THREE.Color(this.config.color);
        child.material.emissiveIntensity = 0.5;
      }
    });
    
    // Speech bubble
    const bubble = createSpeechBubble(message);
    bubble.position.set(0, 0.8, 0);
    this.mesh.add(bubble);
    
    // Auto-remove after duration
    setTimeout(() => {
      this.stopSpeaking();
      this.mesh.remove(bubble);
    }, message.length * 50 + 2000);
  }
  
  stopSpeaking() {
    this.speaking = false;
    this.mesh.traverse(child => {
      if (child.material) {
        child.material.emissive = new THREE.Color(0x000000);
      }
    });
  }
}
```

### **Passenger Boarding**

```javascript
// When train switches tracks, new passenger boards
function boardPassenger(train, trackId) {
  const track = TRACKS[trackId];
  
  // Determine passenger type based on tetrad mode
  const typeMap = {
    'enhance': 'advocate',
    'reverse': 'rebel',
    'retrieve': 'historian',
    'obsolesce': 'skeptic'
  };
  
  const passengerType = typeMap[track.tetradMode] || 'narrator';
  const passenger = new Passenger(
    passengerType,
    `${track.name} Guide`
  );
  
  // Find empty seat
  const seat = findEmptySeat(train);
  passenger.seat = seat;
  
  // Add to train
  train.passengers.push(passenger);
  
  // Create 3D model and position
  const mesh = passenger.create3DModel();
  positionInSeat(mesh, seat, train);
  train.mesh.add(mesh);
  
  // Animate boarding
  animateBoarding(passenger, train);
  
  // Introduce in chat
  addChatMessage({
    role: 'system',
    content: `${passenger.config.symbol} ${passenger.name} has boarded the train.`,
    style: 'passenger-joined'
  });
}
```

---

## 🎨 UI COMPONENT DESIGN

### **Track Switch Buttons**

```css
.track-switch-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--panel);
  border: 2px solid var(--track-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s var(--transition);
}

.track-switch-btn:hover {
  background: var(--track-color);
  color: var(--bg);
  transform: translateX(8px);
  box-shadow: 0 0 20px var(--track-color);
}

.track-switch-btn::before {
  content: '🚂';
  font-size: 24px;
  animation: trainChug 1s infinite;
}

@keyframes trainChug {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}
```

### **Junction Prompt UI**

```html
<div class="junction-prompt">
  <div class="junction-header">
    <span class="junction-icon">⚠️</span>
    <h3>JUNCTION AHEAD</h3>
    <span class="junction-icon">⚠️</span>
  </div>
  
  <div class="junction-message">
    Your train is approaching a switch point. Choose your track:
  </div>
  
  <div class="track-options">
    <button class="track-switch-btn" data-track="main">
      <span class="track-icon">→</span>
      <div class="track-info">
        <div class="track-name">MAIN LINE</div>
        <div class="track-desc">Continue conversation</div>
      </div>
    </button>
    
    <button class="track-switch-btn" data-track="enhance">
      <span class="track-icon">↗</span>
      <div class="track-info">
        <div class="track-name">ENHANCE SPUR</div>
        <div class="track-desc">What does this amplify?</div>
      </div>
    </button>
    
    <!-- More tracks... -->
  </div>
</div>
```

---

## 📊 STATE MANAGEMENT

### **Global State**

```javascript
const railwayState = {
  // Trains
  trains: new Map(), // trainId -> ConversationTrain
  activeTrainId: null,
  
  // Tracks
  tracks: new Map(), // trackId -> Track3DPath
  junctions: [], // Junction objects
  
  // OpenAI
  api: null, // OpenAIRailway instance
  apiKey: localStorage.getItem('openai_api_key'),
  
  // UI
  view: 'main', // 'main', 'overhead', 'split'
  chatExpanded: true,
  mapVisible: true,
  
  // Settings
  autoAdvance: true, // Auto-move train during streaming
  soundEnabled: true,
  switchAnimationDuration: 1000
};
```

---

## 🎬 ANIMATION SEQUENCES

### **Switch Animation**

```javascript
async function animateTrackSwitch(junction, targetTrack, train) {
  // 1. Signal change (0.3s)
  await animateSignals(junction, targetTrack);
  
  // 2. Lever flip (0.5s)
  await animateLever(junction, targetTrack);
  
  // 3. Rail sections move (0.8s)
  await animateRailSections(junction, targetTrack);
  
  // 4. Train slows and turns (1.0s)
  await animateTrainTurn(train, targetTrack);
  
  // 5. Camera follows (1.2s)
  await animateCameraFollow(train);
  
  // 6. Passenger boards (1.5s)
  await animatePassengerBoarding(train, targetTrack);
  
  // Total: ~3 seconds for full sequence
}
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### **Performance Targets**

- 60 FPS for 3D scene
- < 100ms input latency
- < 500ms OpenAI first token
- < 50ms track switch response
- < 2s full switch animation

### **Browser Support**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

### **Dependencies**

- Three.js r132+ (existing)
- Tone.js (existing, for sounds)
- Native Fetch API (streaming)
- Web Storage API (settings)

---

## 📱 MOBILE CONSIDERATIONS

### **Touch Gestures**

- **Swipe horizontal**: Rotate camera around track
- **Swipe vertical**: Zoom in/out
- **Pinch**: Zoom
- **Double-tap**: Focus on train
- **Long-press track**: Show track info
- **Tap junction**: Show switch options

### **Responsive Layout**

```
Mobile (< 768px):
┌─────────────┐
│ 3D View     │ 50%
├─────────────┤
│ Chat        │ 45%
├─────────────┤
│ Map (hide)  │ 5% (collapsed)
└─────────────┘

Desktop (> 768px):
┌─────────────┬──┐
│ 3D View     │M │
│             │a │ 60% / 10%
│             │p │
├─────────────┴──┤
│ Chat           │ 30%
└────────────────┘
```

---

## 🎯 IMPLEMENTATION PHASES

### **Phase 1: Track Foundation** (Est. 6-8 hours)

1. Create multi-track path system
2. Add junction geometry
3. Implement basic switching
4. Test with dummy trains

### **Phase 2: OpenAI Integration** (Est. 4-6 hours)

1. API key management UI
2. Streaming chat implementation
3. Tetrad generation
4. Error handling

### **Phase 3: Passenger System** (Est. 4-6 hours)

1. Passenger 3D models
2. Boarding animations
3. Speaking indicators
4. Seat management

### **Phase 4: Decision UI** (Est. 4-6 hours)

1. Junction prompt interface
2. Track switch buttons
3. Animation sequencing
4. State management

### **Phase 5: Polish** (Est. 4-6 hours)

1. Sound effects
2. Camera transitions
3. Track labels
4. Mobile optimization

**Total: 22-32 hours**

---

## ✅ SUCCESS CRITERIA

**Functional**:
- ✅ User can see multiple tracks
- ✅ Train pauses at junctions
- ✅ Switch options clearly displayed
- ✅ Clicking track animates switch
- ✅ New track = new conversation branch
- ✅ OpenAI responds contextually
- ✅ Passengers board on branch tracks

**Visual**:
- ✅ Track switches are animated
- ✅ Multiple trains visible
- ✅ Track labels clear
- ✅ Passengers visible in windows
- ✅ Speech bubbles show who's talking

**Experiential**:
- ✅ "Forking paths" metaphor clear
- ✅ Decision feels significant
- ✅ Switching feels satisfying
- ✅ Can track multiple conversations
- ✅ Works smoothly on mobile

---

End of Blueprint
