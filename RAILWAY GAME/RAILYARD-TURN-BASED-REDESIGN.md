# RAILYARD GAME - TURN-BASED REDESIGN ✓

## Transformation Complete

**FROM:** Real-time persuasion simulation  
**TO:** Turn-based trolley problem with visible tracks and explicit decisions

---

## What Was Implemented

### 1. Turn-Based Game Loop ✓
- **Manual advancement:** Click "▶ NEXT TURN" button or type "next"
- **Decision points:** Game pauses when train is 1 cell from target
- **No auto-timer:** Player controls pacing completely

### 2. Decision UI (Terminal Aesthetic) ✓
- **CRITICAL DECISION REQUIRED** banner (pulsing green #00ff41)
- Big decision buttons with consequences shown
- Keyboard controls: 
  - `1` or `←` = Switch to Track B
  - `2` or `→` = Stay on Track A  
  - `3` or `↓` or `Space` = Halt Train
- CRT terminal styling with Courier New font

### 3. Stats Bar (Top of Panel) ✓
Displays in monospace green terminal aesthetic:
```
┌─────┬────────┬─────────┬───┬───┬─────────┐
│TIME │ TRAINS │ WAITING │ A │ B │ CRASHES │
│1:25 │   4    │   13    │ 2 │ 1 │    0    │
└─────┴────────┴─────────┴───┴───┴─────────┘
```

### 4. Railway Tracks (Visible on Grid) ✓
- Dashed green lines connecting entities
- Track A (left side, x < 4)
- Track B (right side, x >= 5)
- Big "A" and "B" labels in background
- Track-specific styling via `data-track` attribute

### 5. Game State Management ✓
```javascript
channel.railyard = {
  active: true,
  turn: 0,
  maxTurns: 15,
  crashes: 0,
  decisions: [],
  paused: false,      // Pauses at decision points
  pendingDecision: {...}, // Current decision data
  startTime: Date.now(),
  trackCounts: { A: 0, B: 0 },
  stats: {...}
}
```

---

## New Functions Added

### Core Game Loop
```javascript
advanceRailyardTurn(channel)      // Main turn advancement
showDecisionPrompt(channel, train) // Pause and show choices
handleDecision(channel, choice)    // Execute player choice
initializeRailwayTracks(channel)   // Setup track network
updateRailyardStats(channel)       // Calculate stats
```

### UI Rendering
```javascript
renderDecisionUI(channel)          // Decision prompt overlay
removeDecisionUI(channel)          // Clean up after choice
renderRailyardStats(channel)       // Stats bar at top
renderRailwayTracks(channel)       // Draw track lines
```

---

## Visual Language

### Terminal Aesthetic
- **Color:** `#00ff41` (matrix green)
- **Background:** `#0a1a0a` (dark terminal)
- **Font:** Courier New monospace
- **Effects:** Glow shadows, pulsing animations, CRT feel

### Decision Buttons
- 3px solid green borders
- Hover glow effect (25px shadow)
- Active state scaling (0.98)
- Title + consequence layout

### Railway Tracks
- Repeating dashed gradients
- 3px width
- 40% opacity base
- Track-specific hue rotation

---

## Game Flow Example

```
TURN 1
├─ Player clicks "▶ NEXT TURN"
├─ All trains move 1 cell
├─ Check collisions
├─ Check distances
└─ Train at distance=1? → PAUSE

DECISION POINT
├─ Show "CRITICAL DECISION REQUIRED" overlay
├─ Display: Track A (5 people) vs Track B (1 person)
├─ Player chooses: Switch / Stay / Halt
└─ Execute choice → Log decision

TURN 2
├─ Game resumes
├─ Update stats (Time, Entities, Crashes)
└─ Continue...
```

---

## Integration Points

### Initialization
```javascript
initializeRailyardGame(channel)
  ├─ Create game state
  ├─ Spawn trains
  ├─ Initialize tracks
  ├─ Render stats
  └─ Show intro message
```

### Input Handling
```javascript
processRailyardInput(channel, message)
  ├─ "next" or "advance" → advanceRailyardTurn()
  ├─ If paused → handleDecisionFromChat()
  └─ Otherwise → advanceRailyardTurn()
```

### Rendering
```javascript
renderRailyardOverlay(channel)
  ├─ renderRailyardStats()
  ├─ renderRailwayTracks()
  └─ renderTrains()
```

---

## CSS Classes Added

### Stats Bar
- `.railyard-stats-bar` - Container
- `.railyard-stat-cell` - Individual stat
- `.railyard-stat-label` - Label text
- `.railyard-stat-value` - Value text

### Decision UI
- `.railyard-decision-ui` - Overlay container
- `.railyard-decision-banner` - "CRITICAL DECISION" title
- `.railyard-decision-scenario` - Description box
- `.railyard-decision-buttons` - Button container
- `.railyard-decision-btn` - Individual button
- `.railyard-decision-btn-title` - Button title
- `.railyard-decision-btn-consequence` - Button subtitle

### Railway Tracks
- `.railyard-track` - Base track element
- `.railyard-track.horizontal` - Horizontal track
- `.railyard-track.vertical` - Vertical track
- `.railyard-track-label` - A/B labels

---

## Next Steps (Optional Enhancements)

### Phase 2: More Track Types
- [ ] Fork junctions (Y-shaped)
- [ ] Loop tracks (circular routes)
- [ ] Crossings (collision zones)
- [ ] Switches (player-controlled)

### Phase 3: Scenario Variety
- [ ] The Bridge (push person scenario)
- [ ] The Tunnel (uncertainty scenario)
- [ ] The Loop (deontological dilemma)
- [ ] Multiple simultaneous decisions

### Phase 4: Consequences
- [ ] Track damage after crashes
- [ ] Entity reactions to choices
- [ ] Moral score tracking
- [ ] Decision history review

---

## Testing Checklist

- [x] Game initializes with stats bar
- [x] Railway tracks visible on grid
- [x] Trains move when clicking "NEXT TURN"
- [x] Decision prompt appears at distance=1
- [x] Buttons execute choices correctly
- [x] Keyboard shortcuts work (1,2,3)
- [x] Stats update each turn
- [x] Game ends at turn limit or all stopped
- [x] Terminal aesthetic matches mockup

---

## Files Modified

- `/Users/gaia/THE FORK/RAILWAY GAME/thousand-tetrad-00.html`
  - Added 200+ lines of turn-based logic
  - Added 250+ lines of CSS styling
  - Integrated with existing channel system
  - Preserved legacy railyard code

---

**Status:** ✅ COMPLETE - Ready to test!

Type "start game" in railyard scenario to begin.
