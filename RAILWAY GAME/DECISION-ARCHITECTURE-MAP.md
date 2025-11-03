# 🎯 DECISION ARCHITECTURE MAP
## System-by-System Decision Flow Analysis

---

## 🚂 TRAIN-BRAIN-19: FAKE CHAT DECISION TREE

### **Current Decision Architecture**

```
USER INPUT (message)
      ↓
  toLowerCase()
      ↓
      ╔══════════════════════════════════╗
      ║  KEYWORD MATCHING DECISION TREE  ║
      ╚══════════════════════════════════╝
      │
      ├─ includes('knowledge') ──→ responses.knowledge
      │
      ├─ includes('technology') ──→ responses.technology
      │
      ├─ includes('society') ──→ responses.society
      │
      ├─ includes('future') ──→ responses.future
      │
      ├─ includes('change') ──→ responses.change
      │
      ├─ includes('hello') ──→ personality intro
      │
      └─ ELSE ──→ genericResponse[random 0-2]
      
OUTPUT: Hardcoded string
```

### **Code Flow (Lines 2163-2188)**

```javascript
function getEraResponse(eraType, userMessage) {
  const eraData = mediaEras[eraType];
  const responses = eraData.responses;
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // 6 DECISION BRANCHES
  if (lowerCaseMessage.includes('knowledge')) {
    return responses.knowledge;
  }
  else if (lowerCaseMessage.includes('technology')) {
    return responses.technology;
  }
  else if (lowerCaseMessage.includes('society')) {
    return responses.society;
  }
  else if (lowerCaseMessage.includes('future')) {
    return responses.future;
  }
  else if (lowerCaseMessage.includes('change')) {
    return responses.change;
  }
  else if (lowerCaseMessage.includes('hello')) {
    return eraData.personality;
  }
  else {
    // FALLBACK: Random generic
    const genericResponses = [
      "That's an interesting thought...",
      "Such inquiries remind me...",
      "To truly understand..."
    ];
    return genericResponses[Math.floor(Math.random() * 3)];
  }
}
```

### **Decision Analysis**

**Type**: Simple keyword matching  
**Branches**: 6 specific + 1 fallback  
**Context**: None (no memory)  
**Learning**: Zero  
**Complexity**: O(n) where n = keyword checks  

**Limitations**:
- ❌ No conversation memory
- ❌ No context understanding
- ❌ No semantic analysis
- ❌ Fixed responses (4 per era × 6 categories = 24 total responses)
- ❌ No adaptation or learning
- ❌ No tetrad generation
- ❌ No entity awareness

**Coverage**:
- "Tell me about knowledge" → ✅ Matches
- "What is your technology?" → ✅ Matches
- "How does this change things?" → ✅ Matches
- "What is your relationship to society?" → ✅ Matches
- "Explain your impact on culture" → ❌ No match (uses "culture" not "society")
- "What happens next?" → ✅ Matches "future"
- "Why did you emerge?" → ❌ No match → Random fallback

---

## 🎭 THOUSAND-TETRAD: FORK DECISION TREE

### **Current Decision Architecture**

```
USER CLICKS MESSAGE MENU
      ↓
  buildMessageOptions()
      ↓
      ╔══════════════════════════════════╗
      ║    FORK MODE DECISION TREE       ║
      ╚══════════════════════════════════╝
      │
      ├─ FORK: CONTINUE ──→ Natural continuation
      │
      ├─ FORK: ENHANCE ──→ Check tetrad.enhance
      │     ├─ If exists → Fork with enhance context
      │     └─ If missing → Generate tetrad first
      │
      ├─ FORK: REVERSE ──→ Check tetrad.reverse
      │     ├─ If exists → Fork with reverse context
      │     └─ If missing → Generate tetrad first
      │
      ├─ FORK: RETRIEVE ──→ Check tetrad.retrieve
      │     ├─ If exists → Fork with retrieve context
      │     └─ If missing → Generate tetrad first
      │
      ├─ FORK: OBSOLESCE ──→ Check tetrad.obsolesce
      │     ├─ If exists → Fork with obsolesce context
      │     └─ If missing → Generate tetrad first
      │
      ├─ FORK: PERSPECTIVE ──→ Entity viewpoint fork
      │     └─ Requires entity selection
      │
      ├─ FORK: SNAPSHOT ──→ Freeze current state
      │     └─ Creates read-only branch
      │
      └─ NEW BLANK CHANNEL ──→ Empty start
            └─ No history copied
      
OUTPUT: New channel with context
```

### **Code Flow (Lines 10329-10389)**

```javascript
function buildMessageOptions(channel, message) {
  const fragments = [];
  
  // Always available
  addOption('↔ FORK: CONTINUE', () => {
    forkChannel(channel, message, 'continue')
  });
  
  // Tetrad-based forks (conditional)
  ['enhance', 'reverse', 'retrieve', 'obsolesce'].forEach(key => {
    const entry = channel.tetrad?.[key];
    const label = `⋔ FORK: ${key.toUpperCase()}`;
    const enabled = Boolean(channel.lastScene);
    
    addOption(label, () => {
      if (!entry?.text) {
        // Generate tetrad first, then fork
        if (channel.lastScene && !channel.pendingTetrad) {
          regenerateTetrad(channel).then(() => {
            const newEntry = channel.tetrad?.[key];
            if (newEntry?.text) {
              forkChannel(channel, message, key);
            }
          });
        }
        return;
      }
      forkChannel(channel, message, key);
    }, enabled);
  });
  
  // Special forks
  addOption('◎ FORK: PERSPECTIVE', () => {
    forkChannel(channel, message, 'perspective')
  });
  
  addOption('⧉ FORK: SNAPSHOT', () => {
    forkChannel(channel, message, 'snapshot')
  });
  
  addOption('+ NEW BLANK CHANNEL', () => {
    forkChannel(channel, message, 'blank')
  });
  
  // Cross-channel routing
  const otherChannels = appState.channels.filter(ch => ch.id !== channel.id);
  if (otherChannels.length) {
    otherChannels.forEach(target => {
      addOption(`→ SEND TO ${target.name}`, () => {
        routeMessage(channel, target, message)
      });
    });
  }
  
  return fragments;
}
```

### **Fork Execution (Lines 13365-13500)**

```javascript
function forkChannel(channel, message, mode, options = {}) {
  const messageId = message?.id ?? null;
  const idx = channel.messages.findIndex(m => m.id === messageId);
  
  // 1. COPY HISTORY
  const history = idx >= 0 
    ? channel.messages.slice(0, idx + 1) 
    : channel.messages.slice();
  
  // 2. CREATE CHILD CHANNEL
  const newChannel = createChannel(channel.id, mode);
  newChannel.parentId = channel.id;
  newChannel.forkMode = mode;
  newChannel.messages = [...history];
  
  // 3. ADD MODE-SPECIFIC CONTEXT
  switch(mode) {
    case 'continue':
      // No additional prompt
      break;
      
    case 'enhance':
      if (channel.tetrad?.enhance) {
        newChannel.messages.push({
          role: 'system',
          content: `ENHANCE: ${channel.tetrad.enhance.text}`
        });
      }
      break;
      
    case 'reverse':
      if (channel.tetrad?.reverse) {
        newChannel.messages.push({
          role: 'system',
          content: `REVERSE: ${channel.tetrad.reverse.text}`
        });
      }
      break;
      
    case 'retrieve':
      if (channel.tetrad?.retrieve) {
        newChannel.messages.push({
          role: 'system',
          content: `RETRIEVE: ${channel.tetrad.retrieve.text}`
        });
      }
      break;
      
    case 'obsolesce':
      if (channel.tetrad?.obsolesce) {
        newChannel.messages.push({
          role: 'system',
          content: `OBSOLESCE: ${channel.tetrad.obsolesce.text}`
        });
      }
      break;
      
    case 'perspective':
      if (options.perspectiveEntity) {
        newChannel.tetradPerspective = options.perspectiveEntity;
        newChannel.messages.push({
          role: 'system',
          content: `View from perspective of: ${options.perspectiveEntity}`
        });
      }
      break;
      
    case 'snapshot':
      newChannel.isSnapshot = true;
      newChannel.snapshotId = options.snapshotId;
      break;
      
    case 'blank':
      newChannel.messages = [];
      break;
  }
  
  // 4. RENDER UI
  renderChannel(newChannel);
  scrollToChannel(newChannel.id);
  
  // 5. FOCUS NEW CHANNEL
  appState.currentChannelId = newChannel.id;
  
  // 6. UPDATE DOM
  highlightActiveChannel();
  
  return newChannel;
}
```

### **Decision Analysis**

**Type**: Mode-based branching with context injection  
**Branches**: 8 primary modes + N cross-channel routes  
**Context**: Full conversation history + mode-specific prompt  
**Learning**: Via tetrad generation (OpenAI)  
**Complexity**: O(1) mode selection + O(n) history copy  

**Strengths**:
- ✅ Preserves conversation history
- ✅ Context-aware branching
- ✅ Tetrad-driven decisions
- ✅ Entity perspective support
- ✅ Cross-channel messaging
- ✅ Snapshot freeze capability

**Limitations**:
- ❌ No visual representation of branches
- ❌ Hidden in menu (not discoverable)
- ❌ Abstract (no spatial metaphor)
- ❌ Difficult to track fork tree
- ❌ No "return to junction" capability

---

## 🔬 TETRAD GENERATION DECISION TREE

### **Decision Architecture**

```
TRIGGER CONDITIONS
      ↓
      ├─ After scene assembly
      ├─ Manual regeneration
      └─ Before tetrad-based fork
      ↓
callOpenAI('TetradGenerator', payload)
      ↓
      ╔══════════════════════════════════╗
      ║   OPENAI TETRAD ANALYSIS         ║
      ╚══════════════════════════════════╝
      │
      ├─ System Prompt: McLuhan's 4 Laws
      ├─ User Prompt: Last scene + history
      ├─ Model: gpt-4
      ├─ Temperature: 0.8
      └─ Response Format: JSON object
      ↓
      {
        "enhance": {
          "text": "What does it amplify?",
          "score": 0.85
        },
        "reverse": {
          "text": "What does it flip?",
          "score": 0.72
        },
        "retrieve": {
          "text": "What does it revive?",
          "score": 0.68
        },
        "obsolesce": {
          "text": "What does it replace?",
          "score": 0.91
        }
      }
      ↓
channel.tetrad = parsed response
      ↓
renderTetradPanel(channel)
```

### **Code Flow (Lines 11605-11750)**

```javascript
async function callOpenAI(kind, payload) {
  if (!appState.apiKey) {
    throw new Error('Missing API key');
  }
  
  // Select prompt template
  const prompts = {
    'TetradGenerator': {
      system: `You are a McLuhan tetrad analyzer.
      
Generate a tetrad using these four laws:
1. ENHANCE - What does it amplify or intensify?
2. REVERSE - What does it flip into when pushed to extremes?
3. RETRIEVE - What obsolete thing does it bring back?
4. OBSOLESCE - What does it push into obsolescence?

Return JSON:
{
  "enhance": {"text": "...", "score": 0.0-1.0},
  "reverse": {"text": "...", "score": 0.0-1.0},
  "retrieve": {"text": "...", "score": 0.0-1.0},
  "obsolesce": {"text": "...", "score": 0.0-1.0}
}`,
      user: `Scenario: {scenario}
Scene: {scene}
History: {history}

Generate tetrad.`
    },
    // ... other prompts
  };
  
  const selectedPrompt = prompts[kind];
  
  // Build messages
  const messages = [
    {
      role: 'system',
      content: selectedPrompt.system
    },
    {
      role: 'user',
      content: fillTemplate(selectedPrompt.user, payload)
    }
  ];
  
  // Call API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${appState.apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.8,
      response_format: { type: 'json_object' }
    })
  });
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return JSON.parse(content);
}
```

### **Decision Analysis**

**Type**: AI-generated analytical framework  
**Input**: Scene + conversation history  
**Output**: 4 dimensional analysis  
**Model**: GPT-4 with JSON mode  
**Reliability**: High (structured output)  

**Process**:
1. Gather context (scene, history, scenario)
2. Send to OpenAI with McLuhan framework
3. Parse JSON response
4. Score each dimension (0.0-1.0)
5. Store in channel.tetrad
6. Enable tetrad-based forks

---

## 🎯 HYBRID DECISION ARCHITECTURE

### **Proposed Unified System**

```
USER SENDS MESSAGE
      ↓
      ╔══════════════════════════════════╗
      ║   OPENAI STREAMING RESPONSE      ║
      ╚══════════════════════════════════╝
      │
      ├─ Context: Train position + channel history
      ├─ Stream: Real-time token by token
      ├─ Visual: Train advances with each token
      └─ Entity: Passenger "speaks" response
      ↓
RESPONSE COMPLETE
      ↓
      ╔══════════════════════════════════╗
      ║   AUTO TETRAD GENERATION         ║
      ╚══════════════════════════════════╝
      │
      ├─ Analyze last message
      ├─ Generate 4 dimensions
      └─ Store for next junction
      ↓
TRAIN CONTINUES MOVING
      ↓
      ╔══════════════════════════════════╗
      ║   JUNCTION DETECTION             ║
      ╚══════════════════════════════════╝
      │
      ├─ Check: trainPosition >= nextJunction.position
      ├─ Check: messageCount >= threshold (e.g., 3)
      └─ Check: tetrad available
      ↓
JUNCTION TRIGGERED
      ↓
      ╔══════════════════════════════════╗
      ║   PAUSE & SHOW OPTIONS           ║
      ╚══════════════════════════════════╝
      │
      ├─ PHYSICAL: Train slows to stop
      ├─ VISUAL: Junction lights up
      ├─ UI: Track buttons appear
      └─ WAIT: User decision
      ↓
      ╔══════════════════════════════════╗
      ║   USER DECISION INPUT            ║
      ╚══════════════════════════════════╝
      │
      ├─ Click track button
      │   OR
      └─ Type command in chat
      ↓
      ╔══════════════════════════════════╗
      ║   TRACK SWITCH ANIMATION         ║
      ╚══════════════════════════════════╝
      │
      ├─ 1. Signal lights change (0.3s)
      ├─ 2. Lever flips (0.5s)
      ├─ 3. Rails move (0.8s)
      ├─ 4. Train turns (1.0s)
      └─ 5. Camera follows (1.2s)
      ↓
      ╔══════════════════════════════════╗
      ║   CONVERSATION FORK              ║
      ╚══════════════════════════════════╝
      │
      ├─ Copy history to fork point
      ├─ Add tetrad context for chosen track
      ├─ Create new channel
      └─ Link to new track path
      ↓
      ╔══════════════════════════════════╗
      ║   SPAWN NEW TRAIN                ║
      ╚══════════════════════════════════╝
      │
      ├─ Create train on chosen track
      ├─ Board new passenger (perspective)
      ├─ Set track color/theme
      └─ Resume movement
      ↓
BOTH TRAINS CONTINUE
      │
      ├─ Original train on main track
      └─ New train on branch track
      ↓
USER CAN SWITCH CAMERA VIEWS
```

### **Decision Flow Code**

```javascript
class DecisionSystem {
  constructor() {
    this.junctions = []; // Physical junction locations
    this.trains = new Map(); // trainId → ConversationTrain
    this.activeDecision = null;
  }
  
  // Check for junction triggers every frame
  update(deltaTime) {
    for (const [id, train] of this.trains) {
      // Check if approaching junction
      const nextJunction = this.findNextJunction(train);
      
      if (nextJunction && this.shouldTrigger(train, nextJunction)) {
        this.triggerJunction(train, nextJunction);
      }
    }
  }
  
  shouldTrigger(train, junction) {
    // Conditions for triggering decision point
    return (
      train.position >= junction.position - 0.05 && // Close enough
      train.messageCount >= junction.minMessages && // Enough context
      train.channel.tetrad && // Tetrad available
      !train.isPaused // Not already paused
    );
  }
  
  async triggerJunction(train, junction) {
    // 1. PAUSE TRAIN
    train.pause();
    
    // 2. HIGHLIGHT JUNCTION
    junction.activate();
    
    // 3. SHOW OPTIONS UI
    const options = this.buildTrackOptions(train, junction);
    const ui = new JunctionUI(options);
    ui.show();
    
    // 4. WAIT FOR CHOICE
    const choice = await Promise.race([
      ui.waitForClick(),
      this.waitForChatCommand(train)
    ]);
    
    // 5. ANIMATE SWITCH
    await junction.animateSwitch(choice.trackId);
    
    // 6. FORK CONVERSATION
    const newChannel = this.forkConversation(
      train.channel,
      choice.trackId
    );
    
    // 7. SPAWN NEW TRAIN
    if (choice.trackId !== 'main') {
      const newTrain = this.spawnTrain(choice.trackId, newChannel);
      this.trains.set(newTrain.id, newTrain);
      
      // 8. BOARD PASSENGER
      this.boardPassenger(newTrain, choice.trackId);
    } else {
      // Continue on main track
      train.setTrack('main');
    }
    
    // 9. RESUME
    train.resume();
    ui.hide();
    junction.deactivate();
  }
  
  buildTrackOptions(train, junction) {
    const tetrad = train.channel.tetrad;
    const options = [
      {
        trackId: 'main',
        label: 'MAIN LINE',
        description: 'Continue conversation naturally',
        color: '#aef3c1',
        icon: '→',
        available: true
      }
    ];
    
    // Add tetrad-based options
    if (tetrad.enhance) {
      options.push({
        trackId: 'enhance',
        label: 'ENHANCE SPUR',
        description: tetrad.enhance.text,
        color: '#56ff9f',
        icon: '↗',
        available: true,
        score: tetrad.enhance.score
      });
    }
    
    if (tetrad.reverse) {
      options.push({
        trackId: 'reverse',
        label: 'REVERSE JUNCTION',
        description: tetrad.reverse.text,
        color: '#ff5c7c',
        icon: '↙',
        available: true,
        score: tetrad.reverse.score
      });
    }
    
    if (tetrad.retrieve) {
      options.push({
        trackId: 'retrieve',
        label: 'RETRIEVE OVERPASS',
        description: tetrad.retrieve.text,
        color: '#569fff',
        icon: '↑',
        available: true,
        score: tetrad.retrieve.score
      });
    }
    
    if (tetrad.obsolesce) {
      options.push({
        trackId: 'obsolesce',
        label: 'OBSOLESCE UNDERPASS',
        description: tetrad.obsolesce.text,
        color: '#888888',
        icon: '↓',
        available: true,
        score: tetrad.obsolesce.score
      });
    }
    
    // Sort by score (highest first)
    return options.sort((a, b) => (b.score || 0) - (a.score || 0));
  }
  
  forkConversation(channel, trackId) {
    // Use existing thousand-tetrad fork logic
    const mode = trackId === 'main' ? 'continue' : trackId;
    return forkChannel(channel, null, mode);
  }
  
  spawnTrain(trackId, channel) {
    const train = new ConversationTrain(trackId, channel);
    train.position = 0.0; // Start of track
    train.speed = 5.0;
    
    // Create 3D mesh
    train.mesh = createTrainMesh(trackId);
    scene.add(train.mesh);
    
    return train;
  }
  
  boardPassenger(train, trackId) {
    const passengerTypes = {
      'enhance': 'advocate',
      'reverse': 'rebel',
      'retrieve': 'historian',
      'obsolesce': 'skeptic'
    };
    
    const type = passengerTypes[trackId] || 'narrator';
    const passenger = new Passenger(type, `${trackId} Guide`);
    
    train.passengers.push(passenger);
    
    // Create 3D model
    const mesh = passenger.create3DModel();
    train.mesh.add(mesh);
    
    // Announce in chat
    addSystemMessage(train.channel, 
      `${passenger.config.symbol} ${passenger.name} has boarded.`
    );
  }
}
```

---

## 📊 DECISION COMPLEXITY COMPARISON

### **Train-Brain (Fake Chat)**

```
Complexity: O(n) where n = number of keywords
Depth: 1 level (simple if/else)
Context: 0 (no memory)
Intelligence: 0 (hardcoded)
Branches: 7 (6 keywords + 1 fallback)
Flexibility: 0 (cannot adapt)
```

### **Thousand-Tetrad (Fork System)**

```
Complexity: O(1) mode selection + O(m) history copy
Depth: 2 levels (mode → context injection)
Context: Full (entire conversation history)
Intelligence: High (GPT-4 tetrad generation)
Branches: 8 primary + N cross-channel
Flexibility: High (AI-driven branching)
```

### **Hybrid (Proposed)**

```
Complexity: O(1) junction trigger + O(k) animation + O(m) fork
Depth: 3 levels (trigger → UI → fork → spawn)
Context: Full + spatial (position + history)
Intelligence: High (GPT-4 streaming + tetrad)
Branches: 5 tracks × multiple junctions = scalable
Flexibility: Maximum (AI + user choice + visual)
```

---

## 🎯 UNIFIED DECISION MATRIX

| Aspect | Train-Brain | Thousand-Tetrad | Hybrid |
|--------|-------------|-----------------|--------|
| **Input** | Keywords | Menu click | Junction arrival |
| **Processing** | If/else | Mode selection | Multi-factor trigger |
| **Intelligence** | None | GPT-4 | GPT-4 streaming |
| **Output** | Fixed string | New channel | Track switch + fork |
| **Visual** | Text only | Abstract column | 3D track animation |
| **Context** | None | Full history | History + spatial |
| **Flexibility** | Fixed | High | Maximum |
| **Discoverability** | Low | Very low | High (visual) |
| **Metaphor** | None | Abstract | Physical railway |

---

## 🔧 IMPLEMENTATION PRIORITY

### **Phase 1: Replace Fake Chat**

1. Remove keyword matching (train-brain lines 2163-2188)
2. Add OpenAI streaming call
3. Connect to thousand-tetrad API system
4. Test with existing train visuals

### **Phase 2: Add Track System**

1. Create multiple track paths
2. Add junction geometry
3. Implement switch animation
4. Link tracks to fork modes

### **Phase 3: Unified Decision Points**

1. Detect junction approaches
2. Show track options UI
3. Animate switch on choice
4. Fork conversation + spawn train
5. Board passenger

---

## 🎬 VISUAL DECISION FLOW

```
                    JUNCTION AHEAD
                         ⚠️
                         │
           ┌─────────────┼─────────────┐
           │             │             │
      TRACK MENU     CHAT INPUT    AUTO (AI)
           │             │             │
           ├─ Click     ├─ Type       └─ Suggest
           │  button    │  command        best track
           │             │
           └─────────┬───┴─────────────┘
                     │
                DECISION MADE
                     │
           ┌─────────┼─────────┐
           │         │         │
      ANIMATE    FORK     SPAWN
       SWITCH     CONVO    TRAIN
           │         │         │
           └─────────┼─────────┘
                     │
              BOTH CONTINUE
```

---

**DECISION ARCHITECTURE MAPPING COMPLETE**

Ready for implementation.
