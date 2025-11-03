# Simple Trolley Demo - Complete ✅

## All Fixes Applied

### 1. ✅ **Trains Move Automatically**
- Auto-advance every 3 seconds
- Pauses at decision points
- Continues after decision made
- Timer clears on game end

```javascript
channel.railyard.autoAdvance = true;
channel.railyard.autoTimer = setTimeout(advance, 3000);
```

### 2. ✅ **Forks SUPER Visible**
**Before:** Small green nodes  
**After:** GOLD/ORANGE pulsing beacons with ⚡ symbols

```css
.track-node-junction {
  width: 18px;
  background: radial-gradient(
    rgba(255, 215, 0, 1),  /* GOLD */
    rgba(255, 140, 0, 0.9)  /* ORANGE */
  );
  animation: forkPulse 1.5s infinite;
  /* Scales 1 → 1.4 with huge glow */
}

.track-node-junction::after {
  content: '⚡';  /* Lightning bolt above */
  animation: forkFlash 1s infinite;
}
```

**Effect:** Fork junctions pulse GOLDEN with ⚡ above them - impossible to miss!

---

### 3. ✅ **Simple Demo Grid**
**One train, clear fork scenario**

**Track Layout:**
```
Row 2 (Track A): ═══⚡═══ 👤 👤 👤  (3 people)
                   ↑
                  Fork
                   ↓
Row 4 (Track B): ════════ 👤       (1 person)
```

**Entities:**
- Track A: Person A1, Person A2, Person A3 (at x=5,6,7, y=2)
- Track B: Person B (at x=6, y=4)

**Train:**
- Single train: "THE TROLLEY" (orange)
- Starts at (0,2) moving right
- Approaches fork at (4,2)
- Decision triggers when distance = 1

---

### 4. ✅ **LEGOS Chat Entity Chips**
**Already implemented** in `createEntityChips()` function:

```javascript
// Renders after assistant messages
if (msg.role === 'assistant' && channel.grid) {
  const entityChips = createEntityChips(channel);
  body.appendChild(entityChips);
}
```

**Features:**
- Shows all entities on grid
- Click chip → highlights grid cell
- Shift+Click → multi-select
- Sorted by LEGOS order (Location, Entity, Goal, Obstacle, Shift, Solution)
- Recency indicator
- Smooth animations

**Chip Style:**
```css
padding: 4px 8px;
border: 1px solid [entity-color];
border-radius: 12px;
background: rgba([entity-color], 0.1);
hover: scale(1.05) + glow
```

---

## Grid Visual Structure

```
🗼  ·  ·  ·  ·  ·  ·  · 🏗️   (0,0 - 8,0)
·  ·  ·  ·  ·  ·  ·  ·  ·
· 🚂══●══⚡══● 👤 👤 👤   ← Track A (row 2, people at 5,6,7)
·  ·  ║  ·  ║  ·  ║  ·  ·
·  ·══●══🚉══● 👤══●══ ·   ← Track B (row 4, person at 6)
·  ·  ║  ·  ║  ·  ║  ·  ·
·  ·══●══════●══════●══ ·
·  ·  ║  ·  ║  ·  ║  ·  ·
🏗️  ·  ·  ·  ·  ·  ·  · 🗼
```

**Key Points:**
- ⚡ at (4,2) - GOLDEN PULSING FORK
- 🚂 train moves right on track
- 👤 people on tracks
- ● green nodes
- ⚡ junction nodes (gold)
- ═ horizontal tracks
- ║ vertical tracks

---

## Auto-Advance Flow

```
1. Game starts
   ↓
2. Intro message
   ↓
3. Timer: 3 seconds
   ↓
4. Turn 1: Train moves (0,2) → (1,2)
   ↓
5. Timer: 3 seconds
   ↓
6. Turn 2: Train moves (1,2) → (2,2)
   ↓
7. Timer: 3 seconds
   ↓
8. Turn 3: Train reaches (4,2) - distance to fork = 1
   ↓
9. DECISION PROMPT - Timer PAUSES
   ↓
10. User clicks decision chip
   ↓
11. Outcome message
   ↓
12. Timer RESUMES
   ↓
13. Continue...
```

---

## Decision Interface

**Two Narrative Modes:**

### Napkin Mode
```
⚠️ CRITICAL DECISION

A runaway trolley approaches.

Track A: 3 people
Track B: 1 person

You stand next to the lever.

Do you pull it?

[SWITCH TO TRACK B]  [STAY ON TRACK A]  [HALT TRAIN]
```

### Hamlet Mode
```
⚡ THE LEVER IS IN YOUR HAND

The rust-red ore car screams down the grade.

On the main line ahead: Gavril (taught you to read), 
Lena (barters eggs), Piotr (Lena's son)

On the disused spur track: Inspector Alistair Finch 
(denied your brake request)

The lever is smooth under your palm—polished by 
your grandfather's hand before yours.

You have seven seconds.

What do you scream into the wind?

[SWITCH TO TRACK B]  [STAY ON TRACK A]  [HALT TRAIN]
```

---

## Visual Enhancements

### Train Visibility
- Head: 20-28px font, 4px border
- Body: 16-24px font, 3px border
- 35px color glow + 50px white glow
- Labels: 9px with text-shadow

### Track Visibility
- 4px thick dashed lines
- Repeating gradient (12px segments)
- 8px box-shadow glow
- 70% opacity (very bright)

### Fork Junctions
- **18px diameter** (biggest element)
- **GOLD gradient** (255, 215, 0)
- **⚡ symbol** above (16px)
- **Pulse 1 → 1.4x scale**
- **Huge glow** (60px spread)

### Infrastructure
- 🏗️ Railyards (corners)
- 🗼 Signal Towers (corners)
- 🚉 Central Station (4,4)
- Glowing + pulsing

---

## Commands

```bash
# Start game
start napkin   # Abstract version
start hamlet   # Thick description
start game     # Default (napkin)

# During game (automatic)
Auto-advances every 3 seconds
Pauses at decisions
Resumes after choice

# Manual override
next           # Force advance (if auto disabled)
```

---

## What Makes This Demo Work

### 1. Simplicity
- One train (not four)
- Four people (not 10)
- Clear fork (row 2 vs row 4)
- Simple tracks (horizontal only)

### 2. Visibility
- GOLDEN ⚡ forks scream "DECISION HERE!"
- Bright green tracks
- Big train sprites
- Clear infrastructure

### 3. Motion
- Auto-advance keeps it alive
- Trains don't sit still
- 3-second rhythm
- Pauses only at key moments

### 4. Context
- LEGOS chips show entities
- Grid updates in real-time
- Chat messages with spatial tags
- Click chip → see on grid

---

## Testing Flow

1. **Open page** → Select "RAILYARD NEGOTIATION"
2. **Type** `start hamlet` or `start napkin`
3. **Watch** train auto-advance every 3s
4. **See** GOLDEN ⚡ fork pulsing at (4,2)
5. **Wait** for decision prompt at distance=1
6. **Click** decision chip
7. **Read** visceral outcome (Hamlet) or stats (Napkin)
8. **Watch** train continue movement
9. **See** entity chips after each message

---

## Technical Stack

**Auto-Advance:**
- `startAutoAdvance(channel)` - Sets 3s timer
- `stopAutoAdvance(channel)` - Clears timer
- Checks: `!paused && !pendingDecision`

**Fork Rendering:**
- `addRailwayInfrastructure()` - Adds to grid cells
- Junction detection: `[2,4,6].includes(x) && [2,4,6].includes(y)`
- Special class: `.track-node-junction`

**Entity Chips:**
- `createEntityChips(channel)` - Called after assistant messages
- Sorts by LEGOS order + recency
- Click handler: highlights grid cell
- Stored in message extras: `tetradData`, `decisionData`

**Narrative Modes:**
- `channel.railyard.narrativeMode` = 'napkin' | 'hamlet'
- Different prompts in `showDecisionPrompt()`
- Different outcomes in `handleDecision()`

---

**Status:** ✅ ALL SYSTEMS OPERATIONAL

**Refresh page and type `start hamlet` to experience!** 🚂⚡
