# Fork Ontology - Railway Channel Forking Architecture

**Version:** 1.0  
**Date:** Nov 3, 2025  
**Status:** Fixed and Documented

---

## Overview

Channel **forking** creates new timeline branches from existing channels, allowing:
- Entity perspective shifts (POV forks)
- Tetrad exploration (what-if forks)
- Parallel narrative threads
- Lineage tracking (parent → child relationships)

This document defines the **canonical fork lifecycle** and explains the critical bug that was fixed.

---

## 1. The Critical Bug (Fixed)

### Problem
```javascript
// ❌ BROKEN - Called renderMessages before DOM exists
function forkFromEntityPerspective(channelId, entityLabel) {
  const newChannel = createChannel(forkName, scenario, instruction);
  addMessage(newChannel, 'system', 'Fork created');
  renderMessages(newChannel); // ← ERROR: channel.dom.messageList is null
  appState.currentChannelId = newChannel.id;
}
```

**Error:**
```
TypeError: Cannot read properties of null (reading 'messageList')
at renderMessages (railway-full-integration.html:2401)
```

### Root Cause
1. `createChannel()` creates channel **data structure** only (no DOM)
2. `addMessage()` adds message to `channel.messages` array
3. `renderMessages()` tries to access `channel.dom.messageList` → **null**
4. DOM doesn't exist until `renderChannel()` calls `createChannelDOM()`

### Solution
```javascript
// ✅ FIXED - Correct lifecycle order
function forkFromEntityPerspective(channelId, entityLabel) {
  const newChannel = createChannel(forkName, scenario, instruction);
  
  // 1. Clone grid state
  appState.gridEntities.set(newChannel.id, clonedEntities);
  
  // 2. Mark as fork
  newChannel.parentChannelId = channel.id;
  newChannel.forkPoint = { type, entity, position };
  
  // 3. Add initial message
  addMessage(newChannel, 'system', 'Fork created');
  
  // 4. Render channel (creates DOM + renders messages automatically)
  renderChannel(newChannel);
  
  // 5. Initialize 3D scene (creates gridCells array)
  init3DForChannel(newChannel);
  
  // 6. Place entities in 3D (now gridCells exists)
  parentEntities.forEach(e => placeEntityOnGrid(newChannel, e));
  
  // 7. Set as current
  appState.currentChannelId = newChannel.id;
}
```

---

## 2. Fork Lifecycle (Canonical Order)

### Phase 1: Channel Creation
```javascript
const newChannel = createChannel(name, scenario, systemInstruction);
```
**Creates:**
- Channel ID
- Messages array (empty)
- Scenario reference
- System instruction
- **No DOM** (just data structure)

### Phase 2: State Cloning
```javascript
// Clone entities from parent
const parentEntities = appState.gridEntities.get(parentChannelId) || [];
appState.gridEntities.set(newChannel.id, parentEntities.map(e => ({...e})));
```
**Clones:**
- Entity positions
- Entity types
- Entity labels
- Grid state

### Phase 3: Fork Metadata
```javascript
newChannel.parentChannelId = parentChannel.id;
newChannel.forkPoint = {
  type: 'entity_perspective',
  entity: entityLabel,
  position: { row, col },
  timestamp: Date.now()
};
```
**Tracks:**
- Parent channel (lineage)
- Fork reason (why branched)
- Fork location (where branched)
- Fork time (when branched)

### Phase 4: Initial Message
```javascript
addMessage(newChannel, 'system', `🔀 Forked from ${parentName}
✦ Perspective: ${entityLabel}
📍 Position: (${row},${col})

You are now experiencing the scene as ${entityLabel}.`);
```
**Adds to `channel.messages` array** (no rendering yet)

### Phase 5: DOM Creation & Rendering
```javascript
renderChannel(newChannel);
```
**Creates:**
- Channel column DOM
- Header with buttons
- 3D viewport canvas
- Chat section
- Message list container ← **This is when channel.dom exists**
- Input area
- **Calls `renderMessages()` internally**

### Phase 6: 3D Scene Initialization
```javascript
init3DForChannel(newChannel);
```
**Creates:**
- Three.js scene
- Camera
- OrbitControls
- Grid cells array (9×9) ← **gridCells now exists**
- Lighting
- Animation loop

### Phase 7: Entity Placement
```javascript
parentEntities.forEach(e => {
  placeEntityOnGrid(newChannel, e);
});
```
**Requires:**
- `channel.gridCells` (from init3D)
- `channel.scene` (from init3D)

**Places:**
- 3D markers on grid
- Entity meshes
- Labels

### Phase 8: Focus
```javascript
appState.currentChannelId = newChannel.id;
```
**Sets:**
- Current channel
- Scroll position
- Input focus

---

## 3. Fork Types

### Entity Perspective Fork (POV)
```javascript
forkFromEntityPerspective(channelId, entityLabel)
```
**Creates:**
- New channel named `${entityLabel} POV`
- System instruction: "You are ${entityLabel}..."
- Clones all entities from parent
- Locks AI to first-person perspective
- Use case: Experience scene as character

### Tetrad Fork (What-If)
```javascript
forkFromTetradChoice(channelId, tetradTrack)
```
**Creates:**
- New channel for tetrad track (enhance/reverse/retrieve/obsolesce)
- Different system instruction per track
- Same grid state as parent
- Use case: Explore McLuhan tetrad paths

### Manual Fork (User-Initiated)
```javascript
// Via corner button (＋)
cornerAdd.addEventListener('click', () => {
  const parentChannel = appState.channels.get(appState.currentChannelId);
  const newChannel = createChannel();
  newChannel.parentChannelId = parentChannel.id;
  renderChannel(newChannel);
  init3DForChannel(newChannel);
});
```
**Creates:**
- Blank channel
- Inherits scenario
- No grid state cloned
- Use case: Start fresh branch

---

## 4. Lineage Tracking

### Parent-Child Relationship
```javascript
newChannel.parentChannelId = parentChannel.id;
```

### Fork Point Metadata
```javascript
newChannel.forkPoint = {
  type: 'entity_perspective' | 'tetrad' | 'manual',
  entity?: string,              // For entity forks
  tetradTrack?: string,         // For tetrad forks
  position?: { row, col },      // Grid position at fork
  messageId?: string,           // Message that triggered fork
  timestamp: Date.now()
};
```

### Use Cases
- **Lineage visualization** - Show fork tree
- **Context preservation** - Know where fork came from
- **Merge detection** - Find common ancestor
- **Undo/replay** - Navigate fork history

---

## 5. Common Mistakes

### ❌ Don't Do This
```javascript
// BAD: Render messages before DOM exists
const newChannel = createChannel();
addMessage(newChannel, 'system', 'Hello');
renderMessages(newChannel); // ← ERROR

// BAD: Call showTetradControls before DOM exists (initApp mistake)
function initApp() {
  const channel = createChannel();
  addMessage(channel, 'system', 'Welcome');
  showTetradControls(channel); // ← ERROR: channel.dom is null
  return channel;
}

// BAD: Place entities before 3D scene exists
init3DForChannel(newChannel);
placeEntityOnGrid(newChannel, entity); // ← Wrong order
renderChannel(newChannel);

// BAD: Initialize 3D before rendering channel
init3DForChannel(newChannel); // ← Canvas doesn't exist yet
renderChannel(newChannel);
```

### ✅ Do This Instead
```javascript
// GOOD: Correct lifecycle order
const newChannel = createChannel();
addMessage(newChannel, 'system', 'Hello');
renderChannel(newChannel);        // Creates DOM + renders messages
init3DForChannel(newChannel);     // Creates 3D scene
placeEntityOnGrid(newChannel, e); // Places entities after 3D ready

// GOOD: Call UI functions AFTER DOM exists (initApp pattern)
function initApp() {
  const channel = createChannel();
  addMessage(channel, 'system', 'Welcome');
  // Don't call showTetradControls here - no DOM yet!
  return channel;
}
// In DOMContentLoaded:
renderChannel(initialChannel);      // Creates DOM
showTetradControls(initialChannel); // Now safe to call

// GOOD: Render channel first (creates canvas)
renderChannel(newChannel);     // Creates DOM + canvas
init3DForChannel(newChannel);  // Uses existing canvas
```

---

## 6. Function Call Order Reference

### Creating Initial Channel (App Start)
```javascript
1. createChannel()           // Data structure
2. renderChannel()           // DOM + messages
3. init3DForChannel()        // 3D scene
4. attachEventHandlers()     // Input/button events
```

### Forking from Entity Perspective
```javascript
1. createChannel()           // New data structure
2. Clone grid state          // Copy entities
3. Set parentChannelId       // Lineage
4. Set forkPoint             // Metadata
5. addMessage()              // Initial message (to array)
6. renderChannel()           // DOM + render messages
7. init3DForChannel()        // 3D scene
8. placeEntityOnGrid() ×N    // Place all entities
9. Set currentChannelId      // Focus
```

### Adding Entity to Existing Channel
```javascript
1. parseEntityFromText()     // Extract entity data
2. placeEntityOnGrid()       // Add to 3D scene
3. appState.gridEntities      // Update state
4. addMessage()              // Confirmation message
5. renderMessages()          // Update chat
```

---

## 7. renderChannel() vs renderMessages()

### renderChannel() - Full Render
**Purpose:** Create/update entire channel UI  
**When:** Channel creation, fork, scenario change  
**Does:**
- Calls `createChannelDOM()` if needed
- Renders messages via `renderMessages()`
- Attaches event handlers
- Initializes canvas
- **Safe to call anytime**

### renderMessages() - Messages Only
**Purpose:** Update message list  
**When:** New message added, message edited  
**Requires:**
- `channel.dom.messageList` must exist
- `channel.dom.messageDotRail` must exist
- **Only call after renderChannel()**

---

## 8. Testing Fork Lifecycle

### Manual Test Sequence
1. Load railway-full-integration.html
2. Add entity to grid: "Max is a person at (4,4)"
3. Click ✦ tetrad button
4. Click FORK POV on Max's card
5. **Expected:**
   - New channel created: "Max POV"
   - Grid cloned with all entities
   - 3D scene initialized
   - Messages rendered
   - No errors in console
6. **Before fix:** TypeError on renderMessages
7. **After fix:** Works correctly

### Automated Test
```javascript
function testFork() {
  const parent = appState.channels.get(appState.currentChannelId);
  const entities = appState.gridEntities.get(parent.id);
  
  if (entities.length === 0) {
    console.error('No entities to fork from');
    return;
  }
  
  const entity = entities[0];
  console.log('Forking from:', entity.label);
  
  try {
    forkFromEntityPerspective(parent.id, entity.label);
    console.log('✅ Fork successful');
  } catch (err) {
    console.error('❌ Fork failed:', err);
  }
}
```

---

## 9. Future Enhancements

### Potential Improvements
1. **Visual lineage tree** - Show fork connections
2. **Fork merging** - Combine branches
3. **Snapshot forks** - Fork from specific message
4. **Diff view** - Compare parent vs fork
5. **Fork templates** - Pre-configured fork types
6. **Collaborative forks** - Share forks between users

### Considerations
- **Memory management** - Too many forks = memory issues
- **GC cleanup** - Delete unused fork data
- **Persistence** - Save fork lineage to localStorage
- **Animation** - Colored ball transition (like thousand-tetrad)

---

## 10. Summary

**Critical Fix:** Always call `renderChannel()` before accessing `channel.dom`

**Lifecycle Order:**
```
createChannel → renderChannel → init3D → placeEntities → focus
```

**Key Insight:** DOM creation and 3D initialization are **separate phases** that must happen in correct order.

**Status:** Bug fixed, pattern documented, ready for production.

---

## Appendix: Related Files

- `railway-full-integration.html` - Main implementation
- `thousand-tetrad-00.html` - Reference implementation
- `CANONICAL-UI-PATTERN.md` - UI architecture
- `V2-IMPLEMENTATION-PLAN.md` - Feature roadmap

**Last Updated:** Nov 3, 2025  
**Maintainer:** Railway Team
