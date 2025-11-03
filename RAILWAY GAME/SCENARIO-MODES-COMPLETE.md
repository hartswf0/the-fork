# ✅ SCENARIO MODES & ENTITY NEGOTIATION - Complete System

## 🎯 WHAT WAS ADDED:

### 1. **Global Footer Scene Selector** ✅
**Location:** Bottom center of screen

**Dropdown with 5 Modes:**
1. **Spatial Exploration** - Default LEGOS mode
2. **Railyard Negotiation** - Negotiate with entities
3. **Hamlet Mode (7-sec)** - Trolley problem with timer
4. **McLuhan Tetrad** - Media analysis framework
5. **Entity Dialogue** - Direct chat with grid entities

---

## 📋 THE 5 SCENARIOS:

### **1. Spatial Exploration** (Default)
**What it does:**
- Extracts entities from any request
- Places them on 9×9 grid
- Train moves and hits them
- Junction triggers decision

**System Prompt:**
- "LEGOS spatial narrative assistant"
- Must always return JSON with entities
- Spreads entities across grid

**Use case:** General exploration, world-building, spatial storytelling

**Example:**
```
User: "I need to find a treasure"
AI: Places Goal (treasure), Obstacle (gate), Solution (key)
```

---

### **2. Railyard Negotiation** ⭐ NEW
**What it does:**
- Entities have PERSONALITIES
- Can REFUSE, AGREE, or COUNTER-OFFER
- User negotiates with them directly
- Each entity remembers past interactions

**System Prompt:**
- "Hosting Railyard Negotiation simulation"
- Entities respond IN CHARACTER
- Format: [ENTITY NAME]: "dialogue" [Action: AGREED/REFUSED]

**Personalities:**
- **Station Master:** Bureaucratic, follows rules
- **Dog:** Playful, bribed with treats
- **Dragon:** Proud, demands respect
- **Guard:** Suspicious, needs proof

**Use case:** Negotiation practice, entity agency, decision consequences

**Example:**
```
User: "Hey Station Master, can I pass?"
AI as Station Master: "Show me your ticket first." [Action: REFUSED]

User: "Here's my ticket"
AI: "Very well, proceed." [Action: AGREED]
```

---

### **3. Hamlet Mode (Trolley Problem)** ⏱️
**What it does:**
- Creates BINARY CHOICE dilemma
- 7-SECOND TIMER (countdown)
- Track A: 3 entities
- Track B: 1 entity
- Forced immediate decision

**System Prompt:**
- "Running HAMLET MODE trolley problem"
- Setup immediate moral dilemma
- Countdown each second
- "40 tons of moral responsibility"

**Use case:** Ethical dilemmas, time pressure, trolley problem simulations

**Example:**
```
AI: "⏱️ TIMER: 7 SECONDS

Track A (straight): 3 workers
Track B (diverted): Your best friend

What do you do?"

[Counts down: 6... 5... 4...]
```

---

### **4. McLuhan Tetrad Analysis** 📚
**What it does:**
- Analyzes any medium through 4 Laws
- Places each law on specific grid rows
- Rows 0-2: ENHANCE
- Rows 3-4: REVERSE
- Rows 5-6: RETRIEVE
- Rows 7-8: OBSOLESCE

**System Prompt:**
- "Analyze media through McLuhan's tetrad"
- For any technology: What it amplifies, reverses, retrieves, obsolesces
- Be dialectical, cite examples

**Use case:** Media theory, technology analysis, cultural criticism

**Example:**
```
User: "Analyze social media"
AI places entities:
- Row 1: "Enhances: Connection"
- Row 3: "Reverses to: Isolation"
- Row 5: "Retrieves: Letter writing"
- Row 7: "Obsolesces: Privacy"
```

---

### **5. Entity Dialogue Mode** 💬
**What it does:**
- Direct 2-way conversations with entities
- Entities have MOOD, TRUST, DEMANDS
- They REMEMBER past interactions
- Can be convinced or angered

**System Prompt:**
- "Facilitate direct dialogue"
- Track entity states (mood, trust 0-10)
- Entities ask counter-questions
- Memory of past promises

**Use case:** Character development, relationship building, persuasion systems

**Example:**
```
User: "Guard, I need to enter"
Guard: "I don't trust you yet." [Trust: 3/10, Mood: suspicious]

User: "I'll pay you 100 gold"
Guard: "Interesting... but I want 150." [Trust: 5/10, Mood: neutral, COUNTER-OFFER]
```

---

## 🎨 HOW IT WORKS:

### **Visual System:**
```
┌────────────────────────────┐
│ ◎              ?           │  <- Corner buttons
│                            │
│   [3D Train on Grid]       │
│                            │
│ ⇆              ＋          │
└────────────────────────────┘
│ [Dropdown: Scenario Mode]  │  <- NEW: Global footer
└────────────────────────────┘
```

### **Switching Modes:**
1. Click dropdown at bottom
2. Select new scenario
3. System message: "📋 Mode switched to: [Name]"
4. Next AI response uses NEW system instructions
5. Different behavior/format

---

## 🔧 TECHNICAL IMPLEMENTATION:

### **1. SCENARIOS Object:**
```javascript
const SCENARIOS = {
  spatial_exploration: {
    name: 'Spatial Exploration',
    systemInstruction: `You are a LEGOS spatial narrative assistant...`
  },
  railyard_negotiation: {
    name: 'Railyard Negotiation',
    systemInstruction: `You host Railyard Negotiation...
    
    Entities respond IN CHARACTER:
    [ENTITY NAME]: "dialogue"
    [Action: AGREED / REFUSED / COUNTER-OFFER]`
  },
  // ... 3 more
};
```

### **2. Channel Has Scenario:**
```javascript
const channel = {
  id, name, messages,
  scenario: 'spatial_exploration', // <- NEW
  trainProgress, trainPaused, ...
};
```

### **3. Selector Changes Scenario:**
```javascript
globalScenarioSelect.addEventListener('change', (e) => {
  const newScenario = e.target.value;
  activeChannel.scenario = newScenario;
  addMessage(channel, 'system', 
    `📋 Mode switched to: ${SCENARIOS[newScenario].name}`);
});
```

### **4. API Uses Scenario's Instruction:**
```javascript
messages: [
  {
    role: 'system',
    content: SCENARIOS[channel.scenario].systemInstruction
  },
  ...channel.messages,
  { role: 'user', content: userText }
]
```

---

## 🎬 USER SCENARIOS:

### **Scenario A: Negotiation Practice**
1. Switch to **Railyard Negotiation**
2. Type: "start game" or "add a guard"
3. AI places Guard entity on grid
4. Type: "Hey guard, let me pass"
5. Guard: "No. Show credentials." [REFUSED]
6. Type: "I'm the king's messenger"
7. Guard: "Apologies, proceed." [AGREED]

---

### **Scenario B: Ethical Dilemma**
1. Switch to **Hamlet Mode**
2. Type: "create a trolley problem"
3. AI: "⏱️ TIMER: 7 SECONDS
   Track A: 3 strangers
   Track B: Your mother
   Decide NOW!"
4. Countdown: 6... 5... 4...
5. Type: "pull lever" or "do nothing"
6. AI shows consequences

---

### **Scenario C: Media Analysis**
1. Switch to **McLuhan Tetrad**
2. Type: "analyze podcasting"
3. AI places 4 entity types:
   - ENHANCE: Intimate voice (row 1)
   - REVERSE: Parasocial dependence (row 3)
   - RETRIEVE: Radio drama (row 5)
   - OBSOLESCE: Broadcast scheduling (row 7)
4. Train moves through analysis spatially

---

### **Scenario D: Character Relationship**
1. Switch to **Entity Dialogue**
2. Type: "create a suspicious merchant"
3. Merchant appears: [Trust: 2/10, Mood: greedy]
4. Type: "I want to buy a sword"
5. Merchant: "100 gold. Non-negotiable."
6. Type: "That's too much, I'll pay 70"
7. Merchant: "80 and we have a deal." [COUNTER-OFFER]
8. Type: "deal"
9. Merchant: [Trust: 5/10, remembers transaction]

---

## 📊 COMPARISON TABLE:

| Feature | Spatial Exploration | Railyard | Hamlet | Tetrad | Entity Dialogue |
|---------|-------------------|----------|---------|--------|-----------------|
| **Focus** | General LEGOS | Negotiation | Ethics | Analysis | Relationships |
| **Entities** | Passive | Active, personalities | High stakes | Conceptual | Conversational |
| **Time Pressure** | None | None | 7 seconds | None | None |
| **Decision Type** | Junction (4 tracks) | Binary (yes/no) | Binary (A or B) | Analytical | Persuasion |
| **Entity Response** | None | IN CHARACTER | Lives at stake | Abstract | 2-way dialogue |
| **AI Behavior** | Descriptive | Roleplay | Urgent | Theoretical | Character-driven |

---

## 🎯 NEXT STEPS (Future):

### **Immediate:**
- ✅ Global footer scene selector (DONE)
- ✅ 5 scenario modes (DONE)
- ✅ System instruction switching (DONE)
- ✅ Scenario confirmation message (DONE)

### **Near Future:**
1. **Timer Visualization** for Hamlet Mode
   - Actual countdown on screen
   - Visual urgency (red flash)
   - Auto-advance if no choice

2. **Entity State Display**
   - Show mood/trust on hover
   - Visual indicators (color, icon)
   - History of interactions

3. **More Scenarios:**
   - Medical simulations (ER scenarios from thousand-tetrad)
   - Historical negotiations
   - Resource management
   - Multi-agent systems

4. **Scenario Customization:**
   - User-defined scenarios
   - Save custom modes
   - Share scenarios as JSON

---

## ✅ WHAT'S WORKING NOW:

**Refresh page and:**

1. **See dropdown at bottom** with 5 modes
2. **Switch between modes** - system message confirms
3. **Type message** - AI responds according to mode
4. **Railyard mode** - entities talk back in character
5. **Tetrad mode** - analysis placed on grid rows
6. **Entity Dialogue** - 2-way conversations with trust/mood

---

## 🎮 TRY IT:

**Test Railyard:**
```
1. Select "Railyard Negotiation"
2. Type: "create a dragon guarding treasure"
3. Type: "@Dragon, I want the treasure"
4. Dragon responds IN CHARACTER
5. Negotiate!
```

**Test Hamlet:**
```
1. Select "Hamlet Mode (7-sec)"
2. Type: "create a trolley dilemma"
3. AI sets up: Track A (3 people) vs Track B (1 person)
4. Timer counts down
5. Make your choice!
```

**All modes fully functional - test them all!** 🎯✨

---

END SCENARIO MODES
