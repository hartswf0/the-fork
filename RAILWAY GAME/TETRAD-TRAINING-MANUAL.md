# 🎭 McLuhan Tetrad Training Manual: thousand-tetrad → railway

## 📋 **TETRAD ANALYSIS**

### **What to ENHANCE (Amplify)**
*What does the medium enhance or intensify?*

#### **From thousand-tetrad:**
- ✅ **Scene Mutability**: "Write what happens next • ADD entities/objects • REMOVE elements"
- ✅ **Perspective System**: Click any cell → see entity POV → generate tetrad from that view
- ✅ **Transformation Prompts**: "CRITICAL: BE TRANSFORMATIVE, NOT CONSERVATIVE. REMOVE 2-4, ADD 2-4"
- ✅ **Fork Channels**: Any message can spawn alternate timeline
- ✅ **Ring Memory**: Persistent context across sessions
- ✅ **Visual Feedback**: "REMOVED" status overlays, cellular automata during compose
- ✅ **Entity Depth**: BDI architecture (Beliefs, Desires, Intentions), cultural agents

#### **MUST ENHANCE in railway:**
1. **Removal Schema** - AI can DELETE entities via JSON
2. **Tetrad Button** - Global ✦ button opens perspective overlay
3. **Entity POV System** - Click entity → see its perspective → fork from it
4. **Transformation Bias** - Prompt engineering that REMOVES obsolete, ADDS emergent
5. **Track as Tetrad** - Each track represents a tetrad quadrant

---

### **What to REVERSE (Flip into opposite)**
*When pushed to the limits, what does the medium reverse into?*

#### **thousand-tetrad Reversals:**
- ❌ **Over-addition** → Need removal to avoid clutter
- ❌ **Static grid** → Dynamic entity lifecycle (birth/death)
- ❌ **Passive viewing** → Active perspective-taking
- ❌ **Single timeline** → Multiple forked trajectories

#### **MUST REVERSE in railway:**
1. **Addition-only AI** → REMOVAL-capable AI
2. **Observer mode** → Participant mode (chat with entities)
3. **Linear train** → Branching timelines at junctions
4. **Permanent entities** → Entities can be consumed, removed, transformed
5. **Decorative grid** → Functional scene graph that updates

---

### **What to RETRIEVE (Recover from the past)**
*What does the medium retrieve that had been obsolesced earlier?*

#### **thousand-tetrad Retrieves:**
- ✅ **Oral storytelling** - Chat-based narrative building
- ✅ **Theater staging** - Spatial composition on grid
- ✅ **Socratic dialogue** - Entity perspectives as characters
- ✅ **Memory palaces** - Spatial mnemonic (grid as memory)
- ✅ **Trolley problems** - Moral philosophy via train tracks

#### **MUST RETRIEVE in railway:**
1. **Trolley Problem Heritage** - Already in prompt, needs UI reinforcement
2. **Entity Voice** - Characters speak in first person when @mentioned
3. **Spatial Reasoning** - Position matters (tracks A vs B)
4. **Moral Weight** - Choices have consequences (track switching)
5. **Media Eras** - Train cars as historical perspectives (already implemented!)

---

### **What to OBSOLESCE (Make obsolete)**
*What does the medium push aside or make obsolete?*

#### **thousand-tetrad Obsolesces:**
- ⚠️ **Static narratives** - Everything is mutable
- ⚠️ **Single authorship** - AI co-creates
- ⚠️ **Linear plots** - Branching, forking, perspective-shifting
- ⚠️ **Spectator mode** - Reader becomes participant

#### **MUST OBSOLESCE in railway:**
1. **Addition-only mindset** - Scene graph must shrink AND grow
2. **Generic AI responses** - Need entity-specific voices
3. **Missing feedback** - Add visual cues for every state change
4. **Broken buttons** - Make ALL interactions work
5. **Static train** - Train should react to entities, pause, negotiate

---

## 🚨 **CRITICAL GAPS IN RAILWAY**

### **Gap 1: NO REMOVAL MECHANISM** 🔴 FATAL
**Evidence:** User says "cut down trees" → AI adds 4 entities instead

**thousand-tetrad Solution:**
```javascript
// Line 11624-11626
'- REMOVE elements that are no longer relevant (2-4 removals per beat)',
'- ADD new elements that emerge from the narrative (2-4 additions per beat)',
```

**System Prompt Includes:**
```json
{
  "entities": [
    {"action": "add", "type": "Entity", "row": 2, "col": 3, "label": "Beaver"},
    {"action": "remove", "id": "entity_123"}, 
    {"action": "remove", "label": "Tree Wall"}
  ]
}
```

**Fix Required:**
1. Add `action` field to JSON schema
2. Update `sendMessageWithLEGOS` to handle removals
3. Teach AI to balance additions/removals

---

### **Gap 2: NO TETRAD BUTTON** 🔴 FATAL
**Evidence:** User says "tetrad button beside scenes is not working"

**thousand-tetrad Has:**
```html
<button class="footer-tetrad-btn" id="globalTetradBtn" title="Set Entity Perspective">✦</button>
```

**Opens Perspective Overlay:**
```javascript
globalTetradBtn.addEventListener('click', () => {
  const activeChannel = appState.channels.find(ch => ch.id === appState.currentChannelId);
  if (activeChannel) {
    openPerspectiveSelector(activeChannel);
  }
});
```

**railway-full-integration Has:**
- ❌ No tetrad button
- ❌ No perspective overlay
- ❌ No entity POV system

**Fix Required:**
1. Add `<button id="globalTetradBtn">✦</button>` to footer
2. Create `<div id="perspectiveOverlay">` modal
3. Implement `openPerspectiveSelector()` function
4. List all entities → click to see POV → generate tetrad

---

### **Gap 3: THOUGHT BUBBLES DON'T APPEAR** 🟡 HIGH
**Evidence:** User says "can't seem to get a menu or thought bubble above grid items"

**Root Cause:**
```javascript
// Line 1459 - Tries to access cell.mesh.matrixWorld
vector.setFromMatrixPosition(cell.mesh.matrixWorld);
// But cell.mesh is the plane, not a positioned group
```

**Fix Required:**
1. Use marker position instead of cell.mesh
2. Simpler 2D projection from marker.position
3. Test with actual entity placement

---

### **Gap 4: AI DOESN'T UNDERSTAND SCENE STATE** 🟡 HIGH
**Problem:** AI has no context of CURRENT grid state

**thousand-tetrad Includes Grid State in Prompt:**
```javascript
// Passes channel.grid to AI so it knows what exists
const currentEntities = channel.railyard.entities.map(e => 
  `${e.label} (${e.type}) at (${e.x},${e.y})`
).join('\n');
```

**railway Doesn't:**
- AI doesn't know what's on grid
- Can't make informed removal decisions
- Keeps adding without subtracting

**Fix Required:**
1. Include grid state in system prompt
2. Format: "CURRENT GRID: [entity list]"
3. AI can then intelligently remove/transform

---

## 🎯 **IMPLEMENTATION PRIORITIES**

### **P0: CRITICAL (Must Fix Now)**

#### **1. Removal Schema**
```javascript
// Update system prompt
`
ENTITY ACTIONS:
- {"action": "add", "type": "Entity", "row": 2, "col": 3, "label": "New Entity"}
- {"action": "remove", "target": "Tree Wall"} // Remove by label
- {"action": "remove", "row": 4, "col": 1} // Remove by position
- {"action": "transform", "target": "Dog", "newLabel": "Wolf"} // Change entity

BALANCING RULE:
For every 2 additions, consider 1 removal. Keep grid dynamic, not cluttered.
`
```

#### **2. Process Removals**
```javascript
if (jsonData.entities) {
  jsonData.entities.forEach(entity => {
    if (entity.action === 'add') {
      placeEntityOnGrid(channel, entity);
    } else if (entity.action === 'remove') {
      removeEntityFromGrid(channel, entity);
    } else if (entity.action === 'transform') {
      transformEntityOnGrid(channel, entity);
    }
  });
}
```

#### **3. Add Tetrad Button**
```html
<div class="global-footer">
  <select id="globalScenarioSelect"></select>
  <button id="globalTetradBtn" title="Entity Perspectives">✦</button>
</div>
```

---

### **P1: HIGH (Fix Soon)**

#### **4. Grid State Context**
```javascript
// Before AI call, build current state
const currentEntities = appState.gridEntities.get(channel.id) || [];
const gridState = currentEntities.map(e => 
  `- ${e.type} "${e.label}" at (${e.row},${e.col})`
).join('\n');

const contextPrompt = `
CURRENT GRID STATE:
${gridState || '(empty grid)'}

User request: ${userText}

Consider what to ADD, REMOVE, or TRANSFORM based on current state.
`;
```

#### **5. Perspective Overlay**
```javascript
function openPerspectiveSelector(channel) {
  const entities = appState.gridEntities.get(channel.id) || [];
  const overlay = document.getElementById('perspectiveOverlay');
  const content = overlay.querySelector('.content');
  
  content.innerHTML = `
    <h2>Select Entity Perspective</h2>
    ${entities.map(e => `
      <button onclick="viewEntityPerspective('${e.label}')">
        ${e.type}: ${e.label} at (${e.row},${e.col})
      </button>
    `).join('')}
  `;
  
  overlay.classList.add('active');
}
```

---

### **P2: MEDIUM (Enhancement)**

#### **6. Fix Thought Bubbles**
```javascript
function showThoughtBubble(channel, entity, message) {
  // Use simpler 2D positioning from canvas bounds
  const canvas = channel.dom.trainCanvas;
  const rect = canvas.getBoundingClientRect();
  
  // Approximate position based on grid layout
  const cellSize = rect.width / 9;
  const x = rect.left + (entity.col + 0.5) * cellSize;
  const y = rect.top + (entity.row + 0.5) * cellSize;
  
  // Create bubble at that position
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y - 60}px`;
}
```

#### **7. Entity Lifecycle**
```javascript
// Track entity age
entity.createdAt = Date.now();
entity.lastInteraction = Date.now();

// Auto-remove stale entities?
if (Date.now() - entity.createdAt > 5 * 60 * 1000) {
  // 5 minutes old, consider removal
}
```

---

## 📊 **COMPARISON TABLE**

| Feature | thousand-tetrad | railway (current) | railway (needed) |
|---------|----------------|-------------------|------------------|
| **ADD entities** | ✅ JSON schema | ✅ JSON schema | ✅ Keep |
| **REMOVE entities** | ✅ JSON action:"remove" | ❌ Not supported | 🔴 CRITICAL |
| **Grid state context** | ✅ In prompt | ❌ AI is blind | 🔴 CRITICAL |
| **Tetrad button** | ✅ Global footer | ❌ Missing | 🔴 CRITICAL |
| **Perspective overlay** | ✅ Full system | ❌ Missing | 🔴 CRITICAL |
| **Thought bubbles** | ❌ Not used | 🟡 Broken | 🟡 Fix |
| **Entity POV** | ✅ Click→perspective | 🟡 Partial | 🟡 Expand |
| **Fork channels** | ✅ Full system | ❌ Missing | ⚪ Future |
| **Ring memory** | ✅ Timeline system | ❌ Missing | ⚪ Future |

---

## 🎓 **TRAINING PRINCIPLES**

### **ENHANCE**
> "Make the scene MUTABLE. Every element can be added, removed, transformed."

**Practice:**
- User: "remove the dog" → AI removes dog
- User: "the tree becomes a tower" → AI transforms entity
- Balance: 2 additions = 1 removal

### **REVERSE**
> "From static to dynamic. From observer to participant."

**Practice:**
- Flip passive grid into active scene
- Flip addition-only into balanced ecosystem
- Flip single view into multi-perspective

### **RETRIEVE**
> "Bring back trolley problems. Bring back entity voice."

**Practice:**
- User clicks entity → see its perspective
- Train reaches junction → moral choice
- @mention entity → it speaks in character

### **OBSOLESCE**
> "Make spectator mode obsolete. Make permanent placement obsolete."

**Practice:**
- Nothing is permanent on grid
- Every entity can be addressed
- Scene responds to narrative

---

## 🔧 **FIX SEQUENCE**

### **Phase 1: REMOVAL** (30 min)
1. Update AI prompt with removal schema
2. Add `removeEntityFromGrid()` function
3. Process `action:"remove"` in response handler
4. Test: "remove the dog" should work

### **Phase 2: TETRAD BUTTON** (45 min)
1. Add button to footer HTML
2. Create perspective overlay div
3. Implement `openPerspectiveSelector()`
4. List entities with click handlers

### **Phase 3: GRID CONTEXT** (20 min)
1. Build grid state string before AI call
2. Include in system prompt
3. AI now knows what exists
4. Better removal decisions

### **Phase 4: THOUGHT BUBBLES** (30 min)
1. Fix positioning calculation
2. Use canvas-relative coords
3. Test with entity interaction
4. Verify visibility

---

## 📝 **SYSTEM PROMPT UPGRADE**

### **Current (Addition-Only):**
```
You create entities. Always return JSON.
```

### **Needed (Transformative):**
```
You are a TRANSFORMATIVE scene composer. The grid is MUTABLE.

CURRENT GRID:
${gridStateHere}

YOUR POWERS:
1. ADD entities (2-4 per turn)
2. REMOVE entities (1-2 per turn) 
3. TRANSFORM entities (change type/label)

BALANCING RULE:
- If grid has >10 entities, REMOVE more than ADD
- If user says "remove X", action:"remove" that entity
- If user implies removal ("trees disappear"), REMOVE them

JSON SCHEMA:
{
  "entities": [
    {"action": "add", "type": "Entity", "row": 2, "col": 3, "label": "Beaver"},
    {"action": "remove", "target": "Tree Wall"},
    {"action": "transform", "target": "Dog", "newLabel": "Wolf", "newType": "Obstacle"}
  ]
}
```

---

## ✅ **SUCCESS CRITERIA**

Railway is "fully chat functional" when:

1. ✅ User says "remove X" → X disappears from grid
2. ✅ Tetrad ✦ button opens entity perspective menu
3. ✅ Click entity → see its POV → can chat as it
4. ✅ Thought bubbles appear above entities
5. ✅ AI knows current grid state
6. ✅ Scene graph stays dynamic (not cluttered)
7. ✅ Train cars respond when clicked
8. ✅ Junctions offer meaningful tetrad choices

---

## 🎯 **WHAT TO SHED**

From railway current state:
- ❌ **Addition-only AI** - Shed this limitation
- ❌ **Blind AI** (no grid context) - Shed this blindness
- ❌ **Broken thought bubbles** - Shed the buggy implementation
- ❌ **Missing tetrad button** - Shed the gap
- ❌ **Static scene mindset** - Shed permanence assumption

---

## 🌱 **WHAT TO CULTIVATE**

In railway future:
- ✅ **Removal capability** - Cultivate scene mutability
- ✅ **Entity perspectives** - Cultivate multiple POVs
- ✅ **Visual feedback** - Cultivate status indicators
- ✅ **Grid awareness** - Cultivate AI context
- ✅ **Trolley problems** - Cultivate moral weight

---

**The railway is a McLuhan machine. Make it work like one.** 🚂⋔
