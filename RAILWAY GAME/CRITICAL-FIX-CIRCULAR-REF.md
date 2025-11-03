# Critical Fix: Circular Reference Error ✅

## The Problem

**Error:** `Uncaught TypeError: Converting circular structure to JSON`

**Root Cause:** `decisionData.channel` → `channel.messages` → `decisionData.channel` = **infinite loop**

When trying to save state with `JSON.stringify()`, the circular reference crashed the entire system.

---

## The Fix (3 Changes)

### 1. **Store IDs Instead of Objects** in `pendingDecision`

**Before (BROKEN):**
```javascript
channel.railyard.pendingDecision = {
  train,  // ← Full train object contains channel reference!
  target,
  alternatives: alternatives.slice(0, 2),
  // ...
};
```

**After (FIXED):**
```javascript
channel.railyard.pendingDecision = {
  trainId: train.id,             // ← Just the ID
  trainName: train.name,
  targetId: target.id,
  targetLabel: target.label,
  alternativeIds: alternatives.map(e => e.id),
  trackA: trackAEntities.length,
  trackB: trackBEntities.length,
  trackANames: [...],
  trackBNames: [...]
};
```

**Location:** Line 2955-2966

---

### 2. **Lookup Objects by ID** in `handleDecision()`

**Before (BROKEN):**
```javascript
const { train, target, alternatives } = channel.railyard.pendingDecision;
// train was full object with circular refs
```

**After (FIXED):**
```javascript
const { trainId, trainName, trackANames, trackBNames, alternativeIds } = channel.railyard.pendingDecision;

// Find train by ID
const train = channel.railyard.trains.find(t => t.id === trainId);
if (!train) return;

// Find alternatives by ID
const alternatives = alternativeIds.map(id => 
  channel.railyard.entities.find(e => e.id === id)
).filter(Boolean);
```

**Location:** Line 3009-3020

---

### 3. **Strip Circular Data** in `renderDecisionUI()`

**Before (BROKEN):**
```javascript
addMessageToChannel(channel, 'system', scenarioText, {
  isDecision: true,
  decisionData: decision  // ← Contains train object with channel!
});
```

**After (FIXED):**
```javascript
addMessageToChannel(channel, 'system', scenarioText, {
  isDecision: true,
  decisionData: {
    trackA: decision.trackA,  // ← Only simple values
    trackB: decision.trackB
  }
});
```

**Location:** Line 3157-3164

---

## Additional Fixes

### 4. **Remove Duplicate Turn Buttons**

**Before:** Multiple "NEXT TURN" buttons flooding chat

**After:** Turn buttons disabled when auto-advance is active

```javascript
if (!channel.railyard.autoAdvance && !channel.railyard.paused && !channel.railyard.turnButtonShown) {
  addRailyardTurnButton(channel);
  channel.railyard.turnButtonShown = true;
}
```

**Location:** Line 8690

---

### 5. **Trains Now Visible on Grid**

**Problem:** Trains existed in data but weren't rendering

**Fix:** Added train rendering in `renderChannelGrid()`

```javascript
// Check if train head is at this position
const head = train.body[0];
if (head.x === x && head.y === y) {
  const trainMarker = document.createElement('div');
  trainMarker.style.cssText = `
    position: absolute;
    font-size: clamp(20px, 5vw, 28px);
    z-index: 20;
    filter: drop-shadow(0 0 10px ${train.color});
  `;
  trainMarker.textContent = '🚂';
  div.appendChild(trainMarker);
}
```

**Location:** Line 8952-8993

---

## Data Flow (FIXED)

```
1. Train reaches fork
   ↓
2. showDecisionPrompt()
   - Stores pendingDecision with IDs ONLY
   - No circular references
   ↓
3. renderDecisionUI()
   - Passes minimal decisionData to message
   - Only includes trackA, trackB counts
   ↓
4. Message stored in channel.messages[]
   - Can be serialized to JSON
   - No circular refs
   ↓
5. persistState()
   - JSON.stringify(channels) ✅ WORKS!
   ↓
6. User clicks decision
   ↓
7. handleDecision()
   - Looks up train by trainId
   - Looks up entities by alternativeIds
   - Full objects available for logic
   ↓
8. Game continues
```

---

## Why This Matters

### Before Fix:
- ❌ Page crashed on every interaction
- ❌ Can't save state
- ❌ Can't switch channels
- ❌ Can't make decisions
- ❌ Console flooded with errors
- ❌ No user control

### After Fix:
- ✅ State saves successfully
- ✅ Smooth channel switching
- ✅ Decisions work perfectly
- ✅ No console errors
- ✅ Auto-advance works
- ✅ Trains visible and moving
- ✅ Full user control

---

## Testing Checklist

- [x] No circular reference errors
- [x] JSON.stringify(channels) works
- [x] State persists to localStorage
- [x] Decision buttons render
- [x] Clicking decisions works
- [x] Train movement visible
- [x] Auto-advance timer works
- [x] Fork junctions visible (GOLD ⚡)
- [x] LEGOS entity chips appear
- [x] No duplicate turn buttons

---

## Technical Details

### Serialization Rules

**CAN serialize:**
- Primitive types (string, number, boolean)
- Arrays of primitives
- Plain objects with primitive values
- Nested structures (if no circular refs)

**CANNOT serialize:**
- DOM elements
- Functions
- Class instances (with methods)
- Circular references
- Object references that loop back

### Solution Pattern

**Store references as IDs:**
```javascript
// BAD
data = { user: userObject }  // userObject might have circular refs

// GOOD
data = { userId: userObject.id }  // Just the ID
// Later: const user = users.find(u => u.id === userId)
```

**Use this pattern for:**
- Trains → trainId
- Entities → entityId
- Channels → channelId
- Any complex object that gets stored

---

## Files Modified

**thousand-tetrad-00.html**
- Line 2955-2966: Fixed pendingDecision storage
- Line 3009-3020: Fixed handleDecision lookup
- Line 3157-3164: Fixed renderDecisionUI data
- Line 8690: Added autoAdvance check for turn button
- Line 8952-8993: Added train rendering on grid

---

**Status:** ✅ CRITICAL BUGS FIXED

**Result:** Game is now playable, trains visible, no errors!

**Test:** Refresh page, type `start napkin`, watch trains move automatically!
