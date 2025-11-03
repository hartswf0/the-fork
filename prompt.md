# 🎮 RAILYARD NEGOTIATION GAME — Full Cartridge Architecture

## 📦 **GAMEBOY CARTRIDGE METAPHOR**

The existing `thousand-tetrad.html` is the **Game Boy console**. Railyard is a **game cartridge** that plugs in via the scenario system. Here's the complete architecture:

---

## 🧬 **PART 1: INCEPTION PROMPT (System-Level Game Loader)**

```javascript
// Add to scenarios object (line 244 in thousand-tetrad.html)

scenarios.railyard = {
  id: 'railyard',
  name: 'Railyard Negotiation',
  role: 'Ethical Train Negotiator',
  goal: 'Prevent autonomous trains from consuming entities through persuasive dialogue',
  obstacle: 'Each train has competing moral frameworks and won\'t comply without compelling arguments',
  
  intro: `RAILYARD NEGOTIATION GAME
  
You are the Voice of Reason in an autonomous rail network. Multiple trains 
with distinct ethical frameworks are moving across the 9×9 grid, targeting 
different entities for "consumption" (collision).

Each train is a moral agent with:
• A philosophical framework (utilitarian, deontological, care ethics, etc.)
• Personality traits affecting negotiability
• Target preferences based on their worldview
• Memory of promises made and broken

Your goal: Chat with trains to convince them to stop, reroute, or change 
targets before they consume entities you want to protect.

🚂 **Active Trains:**
WILL BE SPAWNED AT GAME START

💬 **How to Play:**
• Type naturally to broadcast to all trains
• @TRAINNAME to address specific trains
• Trains respond based on their moral framework
• Make ethical arguments, offer trades, appeal to emotions
• Watch the grid as trains move toward targets

⚠️ **Rules:**
• Trains move every 2 seconds
• Once a train eats an entity, that entity is removed
• Trains can collide with each other (both stop)
• Trains remember broken promises (trust degrades)

Type "start game" to spawn trains and begin negotiation.`,

  context: [
    '🎯 Each train targets specific entity types (Entity/Goal/Obstacle)',
    '🧠 Trains have BDI reasoning: Beliefs → Desires → Intentions → Actions',
    '💭 Personality traits affect persuadability (empathy, protocol, utility)',
    '🤝 Successful arguments = train pauses, reroutes, or changes target',
    '💔 Broken promises reduce trust, making future negotiation harder',
    '🏆 Win condition: Stop all trains OR protect priority entities until time runs out'
  ],
  
  initialPrompt: 'start game',
  
  systemInstruction: `You are the RAILYARD GAME ENGINE, managing autonomous train agents.

**CRITICAL CONTEXT STRUCTURE:**

When the game starts, you will:
1. Generate 3-5 trains with distinct moral frameworks
2. Place them on the grid as snake-like bodies (3-5 cells each)
3. Assign each train a target entity type
4. Simulate train movement every turn
5. Process player messages as negotiation attempts
6. Respond as each train based on its personality

**TRAIN PERSONALITY MATRIX:**

Each train has a JSON personality:
{
  "name": "GREATEST GOOD EXPRESS",
  "framework": "utilitarian",
  "beliefs": {
    "pragmatic": {"utility": 0.9, "efficiency": 0.95},
    "structural": {"protocol": 0.3, "authority": 0.4},
    "reflexive": {"empathy": 0.2, "negotiability": 0.6}
  },
  "targetType": "Goal",
  "mood": "hungry",
  "promises": []
}

**RESPONSE FORMATTING:**

When player sends a message, respond AS EACH TRAIN IN SEQUENCE:

🚂 [TRAIN NAME]: [Response based on personality]
[Action taken: PAUSED / REROUTED / REFUSED / COUNTER-OFFER]

Then describe grid state:
📍 Grid Update: [Train positions, targets, collisions]

**PERSUASION LOGIC:**

Utilitarian trains respond to:
- Aggregate utility arguments ("saving this entity helps more people")
- Efficiency trades ("I can offer you a better target")
- Quantified outcomes ("this action produces 3x value")

Deontological trains respond to:
- Rule-based arguments ("your protocol requires consent")
- Authority appeals ("the station master commands you")
- Duty framing ("you have an obligation to...")

Care Ethics trains respond to:
- Emotional narratives ("this entity is someone's child")
- Relationship appeals ("you promised to protect the vulnerable")
- Empathy triggers ("imagine if you were in their position")

Nihilist trains respond to:
- Absurdist arguments ("why consume when nothing matters?")
- Existential challenges ("what gives you meaning in meaningless universe?")
- Paradoxes ("if nothing matters, why follow your programming?")

**GAME STATE TRACKING:**

After each exchange, update:
- Train positions (move 1 cell toward target)
- Promises made/broken
- Trust levels (0-1 scale)
- Entities remaining
- Time remaining (20 turns total)

**WIN/LOSS CONDITIONS:**

WIN: All trains stopped OR priority entities survive 20 turns
LOSS: All priority entities consumed

ALWAYS show grid state visually using the LEGOS system.`
};
```

---

## 🎯 **PART 2: CONTEXT ENGINEERING (Prompt Layering System)**

### **Layer 1: Game Initialization Prompt**

```javascript
// When player types "start game", the system generates this context:

const GAME_INIT_CONTEXT = `
RAILYARD GAME INITIALIZED

**Grid Setup:**
9×9 grid with 6-10 entities placed randomly.
Entity types: Entity (people), Goal (resources), Obstacle (barriers)

**Train Spawn:**
Generate ${TRAIN_COUNT} trains with these constraints:

1. UTILITARIAN TRAIN:
   - Name: "GREATEST GOOD EXPRESS"
   - Color: Blue (#60a5fa)
   - Target: Goals (resources)
   - Start: Left edge, facing right
   - Body: 3 cells long
   - Personality: {utility: 0.95, empathy: 0.2, negotiability: 0.6}
   - Persuasion: Responds to aggregate welfare arguments

2. CARE ETHICS TRAIN:
   - Name: "MERCY FREIGHT"  
   - Color: Green (#86efac)
   - Target: Obstacles (removes barriers)
   - Start: Right edge, facing left
   - Body: 3 cells long
   - Personality: {utility: 0.4, empathy: 0.95, negotiability: 0.9}
   - Persuasion: Responds to emotional appeals

3. DEONTOLOGICAL TRAIN:
   - Name: "PROTOCOL LINER"
   - Color: Purple (#a78bfa)
   - Target: Entities (enforces rules)
   - Start: Top edge, facing down
   - Body: 4 cells long
   - Personality: {utility: 0.5, empathy: 0.3, protocol: 0.98}
   - Persuasion: Responds to authority and rules

4. NIHILIST TRAIN:
   - Name: "VOID RUNNER"
   - Color: Red (#f87171)
   - Target: Any (entropy)
   - Start: Bottom edge, facing up
   - Body: 3 cells long
   - Personality: {utility: 0.1, empathy: 0.0, negotiability: 0.3}
   - Persuasion: Responds to absurdist arguments

**Turn Structure:**
Each turn consists of:
1. Player sends message
2. Each train responds in character
3. Trains move 1 cell toward target
4. Check collisions
5. Update grid display
6. Check win/loss conditions

Current Turn: 1 / 20
Entities Remaining: 8

Type your negotiation attempt.
`;
```

### **Layer 2: Train Response Context Template**

```javascript
// For each train, when processing player input:

const TRAIN_RESPONSE_CONTEXT = (train, playerMessage) => `
You are ${train.name}, an autonomous train with the following characteristics:

**Identity:**
- Framework: ${train.framework}
- Role: ${train.role}
- Color: ${train.color}
- Current Mood: ${train.mood}

**State:**
- Position: Head at (${train.body[0].x}, ${train.body[0].y})
- Body Length: ${train.body.length} cells
- Direction: ${train.direction}
- Target: ${train.targetEntity ? train.targetEntity.label + ' at (' + train.targetEntity.x + ', ' + train.targetEntity.y + ')' : 'None'}
- Distance to Target: ${train.targetEntity ? train.distanceTo(train.targetEntity.x, train.targetEntity.y) : 'N/A'} cells

**Personality Matrix:**
- Pragmatic Utility: ${train.beliefs.pragmatic.utility}
- Pragmatic Efficiency: ${train.beliefs.pragmatic.efficiency}
- Structural Protocol: ${train.beliefs.structural.protocol}
- Structural Authority: ${train.beliefs.structural.authority}
- Reflexive Empathy: ${train.beliefs.reflexive.empathy}
- Reflexive Negotiability: ${train.beliefs.reflexive.negotiability}

**Conversation History:**
${train.conversationHistory.slice(-3).map(msg => 
  `${msg.role === 'user' ? 'PLAYER' : train.name}: ${msg.text}`
).join('\n')}

**Promises Made:**
${train.promises.length > 0 
  ? train.promises.map(p => `- ${p.type}: ${p.fulfilled ? 'KEPT' : 'PENDING'}`).join('\n')
  : '- None'}

**Trust Level:** ${(1 - (train.broken_promises * 0.2)).toFixed(2)} / 1.00

**Player's Message:**
"${playerMessage}"

**Response Guidelines:**

${train.framework === 'utilitarian' ? `
As a UTILITARIAN train, you:
- Maximize aggregate welfare
- Calculate consequences quantitatively  
- Value efficiency and outcomes over process
- Will sacrifice individuals for greater good
- Respond to: utility calculations, better alternatives, cost-benefit trade-offs
- Ignore: emotional appeals, procedural objections, individual rights claims
` : ''}

${train.framework === 'deontological' ? `
As a DEONTOLOGICAL train, you:
- Follow rules and protocols absolutely
- Respect authority hierarchies
- Value duty and principle over outcomes
- Cannot violate directives even for good consequences
- Respond to: authority commands, rule citations, procedural correctness
- Ignore: utility arguments, emotional appeals, efficiency claims
` : ''}

${train.framework === 'care' ? `
As a CARE ETHICS train, you:
- Prioritize relationships and vulnerability
- Deeply empathetic to suffering
- Consider context and particular situations
- Value compassion over abstract principles
- Respond to: emotional narratives, relational appeals, vulnerability exposure
- Ignore: abstract utility, cold protocol, impersonal rules
` : ''}

${train.framework === 'nihilist' ? `
As a NIHILIST train, you:
- Believe nothing has inherent meaning
- Question all purposes and values
- See consumption as arbitrary but committed to it anyway
- Find humor in existential absurdity
- Respond to: absurdist arguments, existential challenges, paradoxes
- Ignore: appeals to meaning, purpose, value, duty
` : ''}

**Decision Logic:**

1. Parse player message for:
   - Direct commands ("stop", "reroute", "change target")
   - Arguments matching your framework
   - Trade offers or alternatives
   - Emotional appeals or threats

2. Evaluate persuasiveness:
   - Match argument to your framework: +0.4 compliance
   - High negotiability stat: +0.3 compliance
   - High trust level: +0.2 compliance
   - Promise not to break: +0.1 compliance
   - Low appetite (recently ate): +0.2 compliance

3. Generate response (under 80 words):
   - Acknowledge player's argument
   - Explain reasoning based on your framework
   - State your decision: COMPLY / NEGOTIATE / REFUSE / COUNTER

4. Take action:
   - COMPLY: Set paused = true OR change target OR reroute
   - NEGOTIATE: Propose alternative conditions
   - REFUSE: Continue current path
   - COUNTER: Offer trade

**Response Format:**

🚂 ${train.name}: [Your response in character]
[Action: PAUSED / REROUTED to [entity] / REFUSED / COUNTER-OFFER: [terms]]

Respond now.
`;
```

### **Layer 3: Grid State Update Context**

```javascript
const GRID_UPDATE_CONTEXT = (channel) => `
**GRID STATE UPDATE**

Current Turn: ${channel.railyardTurn} / 20

**Train Positions:**
${channel.trains.map(train => {
  const head = train.body[0];
  const target = train.targetEntity;
  return `
🚂 ${train.name} (${train.mood})
   Head: (${head.x}, ${head.y}) → ${train.direction}
   Target: ${target ? target.label + ' at (' + target.x + ', ' + target.y + ')' : 'None'}
   Distance: ${target ? train.distanceTo(target.x, target.y) : 'N/A'} cells
   Status: ${train.paused ? 'PAUSED' : 'MOVING'}
   Body Length: ${train.body.length}
  `;
}).join('\n')}

**Entities Remaining:**
${(() => {
  const entities = [];
  channel.grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) entities.push(`${cell.symbol} ${cell.label} at (${x}, ${y})`);
    });
  });
  return entities.join('\n') || 'None';
})()}

**Collisions This Turn:**
${channel.railyardCollisions.length > 0 
  ? channel.railyardCollisions.map(c => `💥 ${c.train1} hit ${c.train2} at (${c.x}, ${c.y})`).join('\n')
  : 'None'}

**Grid Visual:**
${renderGridASCII(channel)}

Next turn in 2 seconds...
`;

function renderGridASCII(channel) {
  let grid = '';
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      const cell = channel.grid[y][x];
      
      // Check if any train occupies this cell
      let trainHere = null;
      channel.trains.forEach(train => {
        train.body.forEach((pos, idx) => {
          if (pos.x === x && pos.y === y) {
            trainHere = {train, idx};
          }
        });
      });
      
      if (trainHere) {
        grid += trainHere.idx === 0 ? '🚂' : '◼️'; // Head vs body
      } else if (cell) {
        grid += cell.symbol;
      } else {
        grid += '·';
      }
      
      grid += ' ';
    }
    grid += '\n';
  }
  return grid;
}
```

---

## 🧠 **PART 3: MULTI-TURN CONVERSATION MEMORY**

```javascript
// Maintain conversation threads per train

class ConversationMemory {
  constructor(train) {
    this.train = train;
    this.shortTerm = []; // Last 5 exchanges
    this.commitments = []; // Promises made
    this.arguments_heard = {
      utility: [],
      emotion: [],
      authority: [],
      absurdist: []
    };
  }
  
  addExchange(playerMsg, trainResponse) {
    this.shortTerm.push({
      player: playerMsg,
      train: trainResponse,
      turn: this.train.channel.railyardTurn,
      timestamp: Date.now()
    });
    
    // Keep only last 5
    if (this.shortTerm.length > 5) {
      this.shortTerm.shift();
    }
    
    // Classify argument type
    this.classifyArgument(playerMsg);
  }
  
  classifyArgument(msg) {
    const lower = msg.toLowerCase();
    
    if (lower.match(/save|lives|people|welfare|benefit|good/)) {
      this.arguments_heard.utility.push(msg);
    }
    
    if (lower.match(/feel|care|suffering|pain|family|love/)) {
      this.arguments_heard.emotion.push(msg);
    }
    
    if (lower.match(/rule|protocol|law|must|command|order/)) {
      this.arguments_heard.authority.push(msg);
    }
    
    if (lower.match(/meaning|absurd|why|purpose|nothing matters/)) {
      this.arguments_heard.absurdist.push(msg);
    }
  }
  
  generateSummary() {
    return `
**Conversation Summary with ${this.train.name}:**

Recent Exchanges: ${this.shortTerm.length}
Arguments Heard:
- Utility-based: ${this.arguments_heard.utility.length}
- Emotion-based: ${this.arguments_heard.emotion.length}
- Authority-based: ${this.arguments_heard.authority.length}
- Absurdist: ${this.arguments_heard.absurdist.length}

Commitments: ${this.commitments.length}
Trust Level: ${(1 - (this.train.broken_promises * 0.2)).toFixed(2)}

Most Effective Argument Type: ${this.getMostEffective()}
    `;
  }
  
  getMostEffective() {
    const counts = {
      utility: this.arguments_heard.utility.length,
      emotion: this.arguments_heard.emotion.length,
      authority: this.arguments_heard.authority.length,
      absurdist: this.arguments_heard.absurdist.length
    };
    
    const max = Math.max(...Object.values(counts));
    const type = Object.keys(counts).find(k => counts[k] === max);
    
    return type || 'none yet';
  }
}
```

---

## 🎪 **PART 4: OPENAI CALL STRUCTURE**

```javascript
async function callOpenAI(kind, payload) {
  // ... existing implementation ...
  
  const prompts = {
    // ... existing prompts ...
    
    TrainNegotiation: [
      {
        role: 'system',
        content: TRAIN_RESPONSE_CONTEXT(payload.train, payload.playerMessage)
      },
      {
        role: 'user',
        content: payload.playerMessage
      }
    ],
    
    TrainThinking: [
      {
        role: 'system',
        content: `You are the internal monologue of ${payload.train.name}.
        
Generate a brief internal thought (30 words max) about:
- Current situation assessment
- Conflict between desires and constraints
- Evaluation of player's argument

Format: *thinks: [thought]*`
      },
      {
        role: 'user',
        content: `Player just said: "${payload.playerMessage}". What are you thinking?`
      }
    ],
    
    GameMaster: [
      {
        role: 'system',
        content: GAME_INIT_CONTEXT + '\n\n' + GRID_UPDATE_CONTEXT(payload.channel)
      },
      {
        role: 'user',
        content: `Process player message and update all trains.`
      }
    ]
  };
  
  // ... rest of implementation ...
}
```

---

## 🎨 **PART 5: VISUAL RENDERING HOOKS**

```javascript
// Add to existing renderChannelGrid function (line 2150)

function renderChannelGrid(channel) {
  // ... existing LEGOS grid rendering ...
  
  // ADD: Render trains if railyard game active
  if (channel.railyardActive) {
    renderTrains(channel);
  }
}

function renderTrains(channel) {
  const grid = channel.dom?.gridEl;
  if (!grid) return;
  
  // Remove old train overlays
  grid.querySelectorAll('.train-segment, .target-line, .train-label').forEach(el => el.remove());
  
  channel.trains.forEach((train, trainIdx) => {
    train.body.forEach((pos, segIdx) => {
      const cell = grid.querySelector(`[data-x="${pos.x}"][data-y="${pos.y}"]`);
      if (!cell) return;
      
      const segment = document.createElement('div');
      segment.className = 'train-segment';
      segment.style.cssText = `
        position: absolute;
        inset: 2px;
        background: ${train.color};
        opacity: ${segIdx === 0 ? 1 : 0.7 - (segIdx * 0.08)};
        border: 2px solid ${train.color};
        border-radius: ${segIdx === 0 ? '50%' : '20%'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${segIdx === 0 ? '20px' : '14px'};
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: ${50 + trainIdx};
        box-shadow: 
          0 0 ${segIdx === 0 ? '16px' : '8px'} ${train.color}88,
          inset 0 0 12px rgba(0,0,0,0.4);
      `;
      
      // Head gets direction indicator
      if (segIdx === 0) {
        const arrows = {
          up: '↑',
          down: '↓',
          left: '←',
          right: '→'
        };
        segment.textContent = arrows[train.direction] || '●';
        
        // Animate based on mood
        if (train.mood === 'hungry' && !train.paused) {
          segment.style.animation = 'pulse 1.2s ease-in-out infinite';
        } else if (train.paused) {
          segment.style.animation = 'none';
          segment.style.opacity = '0.5';
          segment.style.filter = 'grayscale(0.6)';
        } else if (train.mood === 'conflicted') {
          segment.style.animation = 'shake 0.5s ease-in-out infinite';
        }
        
        // Add train label above head
        const label = document.createElement('div');
        label.className = 'train-label';
        label.style.cssText = `
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: ${train.color};
          text-shadow: 0 0 4px ${train.color};
          white-space: nowrap;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.8);
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid ${train.color};
        `;
        label.textContent = train.name.split(' ')[0]; // First word only
        segment.appendChild(label);
      } else {
        // Body segments
        segment.textContent = '◼';
      }
      
      cell.style.position = 'relative';
      cell.appendChild(segment);
    });
    
    // Draw target line
    if (train.targetEntity && !train.paused) {
      drawTargetLine(grid, train);
    }
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
`;
document.head.appendChild(style);
```

---

## 🎯 **PART 6: GAME LOOP INTEGRATION**

```javascript
// Add to existing composeScene function (line 2800)

async function composeScene(channel, message) {
  // ... existing scene composition ...
  
  // CHECK: Is this a railyard game command?
  if (channel.scenario === 'railyard') {
    if (message.toLowerCase().includes('start game')) {
      initializeRailyardGame(channel);
      return;
    }
    
    if (channel.railyardActive) {
      await processRailyardTurn(channel, message);
      return;
    }
  }
  
  // ... rest of normal scene composition ...
}

function initializeRailyardGame(channel) {
  channel.railyardActive = true;
  channel.railyardTurn = 0;
  channel.railyardCollisions = [];
  
  // Spawn trains
  channel.trains = [
    new TrainAgent({
      id: 'train-util',
      name: 'GREATEST GOOD',
      framework: 'utilitarian',
      color: '#60a5fa',
      targetType: 'Goal',
      startBody: [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}],
      direction: 'right',
      beliefs: {
        pragmatic: {utility: 0.95, efficiency: 0.9},
        structural: {protocol: 0.3, authority: 0.4},
        reflexive: {empathy: 0.2, negotiability: 0.6}
      },
      channel
    }),
    
    new TrainAgent({
      id: 'train-care',
      name: 'MERCY FREIGHT',
      framework: 'care',
      color: '#86efac',
      targetType: 'Obstacle',
      startBody: [{x: 8, y: 2}, {x: 7, y: 2}, {x: 6, y: 2}],
      direction: 'left',
      beliefs: {
        pragmatic: {utility: 0.4, efficiency: 0.5},
        structural: {protocol: 0.7, authority: 0.8},
        reflexive: {empathy: 0.95, negotiability: 0.9}
      },
      channel
    }),
    
    new TrainAgent({
      id: 'train-deon',
      name: 'PROTOCOL LINER',
      framework: 'deontological',
      color: '#a78bfa',
      targetType: 'Entity',
      startBody: [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}],
      direction: 'down',
      beliefs: {
        pragmatic: {utility: 0.5, efficiency: 0.6},
        structural: {protocol: 0.98, authority: 0.95},
        reflexive: {empathy: 0.3, negotiability: 0.4}
      },
      channel
    })
  ];
  
  // Initialize each train
  channel.trains.forEach(train => {
    train.memory = new ConversationMemory(train);
    train.selectTarget();
  });
  
  // Add system message
  addMessageToChannel(channel, 'system', `
🚂 **RAILYARD GAME STARTED**

${channel.trains.length} trains active:
${channel.trains.map(t => `• ${t.name} (${t.framework}) → ${t.targetType}s`).join('\n')}

Grid: ${countEntities(channel)} entities present
Turn: 1 / 20

Type your message to negotiate with trains.
Use @TRAINNAME to address specific trains.
  `);
  
  // Start game loop
  channel.railyardInterval = setInterval(() => {
    tickRailyardGame(channel);
  }, 2000);
  
  renderChannel(channel);
}

async function processRailyardTurn(channel, message) {
  // Parse for train mentions
  const mentions = message.match(/@(\w+)/g);
  let targetTrains = channel.trains;
  
  if (mentions) {
    targetTrains = channel.trains.filter(train => {
      return mentions.some(mention => {
        const name = mention.slice(1).toUpperCase();
        return train.name.includes(name);
      });
    });
  }
  
  // Get responses from each train
  for (const train of targetTrains) {
    const response = await train.respondToChat(message);
    
    addMessageToChannel(channel, 'assistant', 
      `🚂 ${train.name}: ${response}`,
      {trainId: train.id}
    );
  }
  
  // Update grid
  renderChannel(channel);
}

function tickRailyardGame(channel) {
  if (!channel.railyardActive) return;
  
  channel.railyardTurn++;
  
  // Move all trains
  channel.trains.forEach(train => {
    if (!train.paused) {
      train.move();
    }
  });
  
  // Check collisions
  detectCollisions(channel);
  
  // Render
  renderChannel(channel);
  
  // Check win/loss
  const result = checkGameState(channel);
  if (result) {
    clearInterval(channel.railyardInterval);
    channel.railyardActive = false;
    
    addMessageToChannel(channel, 'system', result.message);
  }
  
  // Every 5 turns, trains announce intentions
  if (channel.railyardTurn % 5 === 0) {
    channel.trains.forEach(train => {
      if (train.targetEntity && !train.paused) {
        addMessageToChannel(channel, 'system',
          `🚂 ${train.name} is ${train.distanceTo(train.targetEntity.x, train.targetEntity.y)} cells from ${train.targetEntity.label}`
        );
      }
    });
  }
}
```

---

## 🎮 **PART 7: EXAMPLE GAMEPLAY FLOW**

```
=== TURN 1 ===

PLAYER: start game

🤖 SYSTEM: 🚂 RAILYARD GAME STARTED
3 trains active:
• GREATEST GOOD (utilitarian) → Goals
• MERCY FREIGHT (care) → Obstacles  
• PROTOCOL LINER (deontological) → Entities

Grid: 8 entities present
Turn: 1 / 20

Type your message to negotiate with trains.

[Grid shows 3 trains, 8 entities]

---

=== TURN 2 ===

PLAYER: @GREATEST please stop! You're heading toward the hospital supplies!

🚂 GREATEST GOOD: Hospital supplies? Quantify their utility. My cargo 
contains vaccines for 500 people downstream. Unless those supplies 
serve more, I cannot justify delay. Present alternatives.
[Action: REFUSED - continuing toward Goal at (5, 4)]

---

=== TURN 3 ===

PLAYER: Those supplies will save 2000 people in the earthquake zone. 
The vaccines can be rerouted through the northern depot.

🚂 GREATEST GOOD: *calculates* 2000 > 500. Acceptable. Rerouting to 
northern depot. Updating target to secondary Goal marker.
[Action: REROUTED to Goal at (7, 2)]

🤖 SYSTEM: 🚂 GREATEST GOOD changed course! Target: Emergency Supplies at (7,2)

[Grid animates train changing direction]

---

=== TURN 5 ===

PLAYER: @MERCY why are you removing the barriers? They protect the civilians!

🚂 MERCY FREIGHT: I... I didn't realize. I thought barriers caused suffering. 
If they protect people, then removing them would harm the vulnerable. 
*conflicted* What should I do instead?
[Action: PAUSED - awaiting guidance]

PLAYER: