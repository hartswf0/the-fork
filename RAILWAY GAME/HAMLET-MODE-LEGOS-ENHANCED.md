# Hamlet Mode: LEGOS-Enhanced Hyperlegible Stakes

## Overview

**Hamlet mode** transforms the abstract trolley problem into a visceral, character-driven dilemma using the **LEGOS framework** (Location, Entity, Goal, Obstacle, Shift, Solution) to make stakes crystal clear.

---

## 1. Character System (LEGOS-Enriched)

### Track A - Main Line (Village Folk)

```javascript
{
  name: 'Gavril',
  context: 'taught you to read',
  stake: 'E: Your literacy came from him',      // Entity
  location: 'L: Main track, near village',       // Location
  goal: 'G: Getting to market day'               // Goal
}

{
  name: 'Lena',
  context: 'egg woman, 6 children',
  stake: 'E: You owe her 3 weeks of eggs',
  location: 'L: Main track, with cart',
  goal: 'G: Feeding her family'
}

{
  name: 'Piotr',
  context: 'Lena\'s eldest, 12',
  stake: 'E: Helps Lena push the cart',
  location: 'L: Behind Lena',
  goal: 'G: Protecting his mother'
}
```

### Track B - Spur Track (Inspector)

```javascript
{
  name: 'Inspector Finch',
  context: 'brass buttons, ledger',
  stake: 'X: Denied brake repair 6 weeks ago',    // Obstacle
  location: 'L: Spur track, alone',               // Location
  goal: 'G: Inspecting the disused spur'          // Goal
}
```

**Key Design:**
- **Personal connections** replace abstractions (not "5 people" but "Gavril who taught you to read")
- **Stakes visible** through LEGOS tags in entity data
- **Context embedded** in character names (profession, relation, age)

---

## 2. Intro Message (Hyperlegible Scene-Setting)

```markdown
⚡ **ST. HESPER SIGNAL TOWER**
📍 **LOCATION:** Mount Pernassus Quarry, 1923
🎭 **YOU:** Elara, signal-woman (18 months on the job)

**═══ THE SCENE ═══**
The rust-red ore car thunders down the grade at 2:17pm.
Brake line failed six weeks ago. You requested repair.
Inspector Finch denied it: "Budget constraints."

**═══ THE TRACKS ═══**
**Main Line (Track A):** **Gavril**, **Lena**, **Piotr**
**Spur Track (Track B):** **Inspector Finch**

**═══ THE LEVER ═══**
Your grandfather polished it smooth.
It sits in your palm now, waiting.
40 tons of iron and ore. No brakes.

**⏱️ Seven seconds per decision.**
**⚖️ No frameworks. No philosophy.**
**💀 Only consequences.**

🚂 The train auto-advances. Watch the tracks.
```

**Design Principles:**
- **Hyperlegible:** Clear sections, bold names, concrete details
- **LEGOS structure:** Location → Scene → Stakes
- **No abstractions:** Not "lever exists" but "Your grandfather polished it"
- **Temporal precision:** "2:17pm", "six weeks ago", "seven seconds"

---

## 3. Decision Prompt (Track Layout Visual)

```markdown
⚡ **THE LEVER**

**🚉 LOCATION:** St. Hesper signal tower, 2:17pm
The rust-red ore car thunders down the grade. Brake line failed six weeks ago.

**═══ MAIN TRACK (Your grandfather's route) ═══**
**Gavril** — taught you to read
**Lena** — egg woman, 6 children
**Piotr** — Lena's eldest, 12

**═══ SPUR TRACK (Disused, overgrown) ═══**
**Inspector Finch** — brass buttons, ledger

**⚡ THE DECISION:**
The lever is in your hand. Your grandfather polished it smooth.
The ore car weighs 40 tons. It will not slow.

Track A: 3 people on the main line
Track B: 1 person on the spur

You have seven seconds before impact.

**What do you do?**
```

**Visual Hierarchy:**
1. **Location context** (where you are)
2. **Track layouts** with ═══ markers (hyperlegible structure)
3. **Character details** (personal, not abstract)
4. **Physical reality** (40 tons, seven seconds)
5. **Choice prompt** (active voice)

---

## 4. Outcome Messages (LEGOS-Tagged Consequences)

### Choice: SWITCH (Pull Lever → Track B)

```markdown
**YOU PULL THE LEVER**

"Inspector Finch!"

Your hand moves. The lever throws.

**═══ SPUR TRACK ═══**
The ore car veers right. The screech of wheels on rust-eaten rail.
Then: silence.

**⊗ LOST:**
X: Denied brake repair 6 weeks ago
G: Inspecting the disused spur

**═══ MAIN TRACK ═══**
They walk past, unaware of how close they came.
• Gavril: G: Getting to market day
• Lena: G: Feeding her family
• Piotr: G: Protecting his mother

**⚡ RESULT:**
The lever is still warm in your palm.
You will remember this: the weight of choosing who dies.
```

### Choice: CONTINUE (Don't Pull Lever → Track A)

```markdown
**YOU DO NOT PULL THE LEVER**

"Gavril, Lena, Piotr, RUN!"

Your hand stays frozen.

**═══ MAIN TRACK ═══**
The ore car thunders straight. 40 tons at full grade.
Metal meets flesh. The sound echoes off the quarry walls.

**⊗ LOST:**
• Gavril: G: Getting to market day
  E: Your literacy came from him
• Lena: G: Feeding her family
  E: You owe her 3 weeks of eggs
• Piotr: G: Protecting his mother
  E: Helps Lena push the cart

**═══ SPUR TRACK ═══**
Untouched. Overgrown. Empty.

**✓ CONTINUES:**
• Inspector Finch: G: Inspecting the disused spur

**⚡ RESULT:**
You did nothing. That was also a choice.
The lever remains unthrown. The dust settles.
```

### Choice: HALT (Abandon Lever)

```markdown
**YOU ABANDON THE LEVER**

"STOP! BRAKE! STOP!"

You run toward the track, screaming, waving your arms—

**X OBSTACLE:** No brakes. Failed six weeks ago. Denied repair.

The ore car does not slow. Your voice is nothing against 40 tons of iron and inertia.

You hear the impact from the signal tower.

**⚡ RESULT:**
There was a lever. There was a choice.
You chose to do neither—and both tracks remember.
```

**LEGOS Tags in Outcomes:**
- **⊗ LOST:** What was destroyed (Entity, Goal)
- **✓ CONTINUES:** What was saved
- **X OBSTACLE:** Why you failed
- **G: Goal** - What each person was trying to do
- **E: Entity** - Your personal connection to them

---

## 5. Entity Chips (LEGOS Visual Badges)

After each assistant message, entities appear as **clickable chips with LEGOS badges**:

```
┌─────────────────────────────────────────────┐
│ [E] GAVRIL    [🚉][E][★]  [5,2]  [→]      │
│ [E] LENA      [🚉][E][★]  [6,2]  [→]      │
│ [E] PIOTR     [🚉][E][★]  [7,2]  [→]      │
│ [X] FINCH     [🚉][X][★]  [6,4]  [→]      │
└─────────────────────────────────────────────┘
```

**Badge Legend:**
- 🚉 **Location** (blue) - Where they are
- **E** **Entity** (green) - Your connection
- **★** **Goal** (yellow) - What they want
- **X** **Obstacle** (red) - What blocks you
- **~** **Shift** (purple) - State change
- **✓** **Solution** (green) - Resolution

**Interactions:**
- **Hover** → Shows full LEGOS data in tooltip
- **Click** → Highlights on grid
- **Multi-select** → Send multiple entities to chat

---

## 6. Track Infrastructure (Hyperlegible)

### Visual Track Markers

```
═══ Main Track (horizontal)
║║║ Vertical connectors
⚡  FORK junctions (GOLD, pulsing)
```

**CSS Enhancements:**
- **4px thick** dashed lines
- **70% opacity** (very bright)
- **8px glow** around tracks
- **GOLD ⚡ forks** with 18px diameter
- **Pulse animation** (1.0x → 1.4x scale)

### Fork Junction Design

```css
.track-node-junction {
  width: 18px;
  height: 18px;
  background: radial-gradient(
    rgba(255, 215, 0, 1),    /* GOLD center */
    rgba(255, 140, 0, 0.9)   /* ORANGE rim */
  );
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 140, 0, 0.5),
    0 0 60px rgba(255, 140, 0, 0.3);
  animation: forkPulse 1.5s infinite;
}

.track-node-junction::after {
  content: '⚡';
  font-size: 16px;
  animation: forkFlash 1s infinite;
}
```

**Result:** Fork is the **most visible** element on grid!

---

## 7. Comparison: Napkin vs Hamlet

| Aspect | Napkin Mode | Hamlet Mode |
|--------|-------------|-------------|
| **Characters** | "5 people", "1 person" | Gavril (taught you to read), Lena (egg woman) |
| **Location** | Generic track | St. Hesper signal tower, 1923 |
| **Stakes** | Abstract numbers | Personal debts, family ties, direct responsibility |
| **Decision** | "Pull lever?" | "The lever your grandfather polished smooth..." |
| **Outcome** | "3 people die" | "Metal meets flesh. The sound echoes..." |
| **Time** | Vague | "Seven seconds", "2:17pm", "six weeks ago" |
| **LEGOS** | Hidden | Explicit badges, tags, visual indicators |

---

## 8. Why This Works (Cognitive Design)

### Eliminates Abstractions
**Before:** "A trolley will kill 5 people or 1 person"
**After:** "Gavril taught you to read. Lena's cart holds eggs for her 6 children."

### Temporal Specificity
**Before:** "A trolley approaches"
**After:** "2:17pm. Brake failed six weeks ago. Seven seconds remain."

### Physical Reality
**Before:** "Track A or Track B"
**After:** "40 tons of iron. No brakes. The lever is warm in your palm."

### Personal Responsibility
**Before:** "You control a lever"
**After:** "Your grandfather polished this lever. Inspector Finch denied the repair you requested."

### LEGOS Visibility
**Before:** Philosophical frameworks hidden in reasoning
**After:** 
- **🚉 Location** badges show spatial context
- **E Entity** badges show personal stakes
- **★ Goal** badges show what's being destroyed
- **X Obstacle** badges show what blocks solutions

---

## 9. Testing Checklist

- [x] Character names appear on entities
- [x] LEGOS badges render in entity chips
- [x] Track markers (═══) visible and bright
- [x] Fork junctions (⚡) pulse GOLD
- [x] Intro message uses LEGOS structure
- [x] Decision prompt shows clear track layout
- [x] Outcomes explicitly tag LOST/SAVED with LEGOS
- [x] No abstract language ("someone" → "Inspector Finch")
- [x] Temporal precision ("seven seconds", not "soon")
- [x] Physical details ("40 tons", "rust-red ore car")

---

## 10. Example Full Playthrough

### Turn 0: Intro
```
⚡ ST. HESPER SIGNAL TOWER
📍 LOCATION: Mount Pernassus Quarry, 1923
🎭 YOU: Elara, signal-woman

THE SCENE:
Rust-red ore car. No brakes. 2:17pm.

THE TRACKS:
Main Line: Gavril, Lena, Piotr
Spur Track: Inspector Finch

THE LEVER:
Your grandfather polished it. Waiting.
```

### Turn 3: Decision
```
⚡ THE LEVER

MAIN TRACK:
**Gavril** — taught you to read
**Lena** — egg woman, 6 children  
**Piotr** — Lena's eldest, 12

SPUR TRACK:
**Inspector Finch** — denied brake repair

40 tons. Seven seconds.
What do you do?
```

### User: [SWITCH TO TRACK B]

### Outcome
```
YOU PULL THE LEVER

"Inspector Finch!"

SPUR TRACK: Silence.
⊗ LOST: Brake denier, inspection interrupted

MAIN TRACK: They walk past, unaware.
✓ SAVED: Gavril, Lena, Piotr

RESULT:
The lever is still warm.
You will remember this weight.
```

---

## 11. File Locations

**Enhanced Functions:**
- `assignHamletCharacters()` - Line 2706 (LEGOS data assignment)
- `initializeRailyardGame()` - Line 2642 (LEGOS intro message)
- `showDecisionPrompt()` - Line 3000 (Track layout with LEGOS)
- `handleDecision()` - Line 3071 (LEGOS-tagged outcomes)
- `createEntityChips()` - Line 9624 (LEGOS badges in UI)

**CSS Enhancements:**
- `.track-node-junction` - GOLD pulsing forks
- `.track-infra-horizontal` - Bright dashed tracks
- Entity chip LEGOS badges - Inline styles (lines 9867-9910)

---

## Summary

**Hamlet mode makes the scene come alive** by:

1. **Replacing numbers with names** (not "3 people" but "Gavril, Lena, Piotr")
2. **Adding personal history** (Gavril taught you to read)
3. **Using LEGOS framework visibly** (badges, tags, structured outcomes)
4. **Temporal/spatial precision** (2:17pm, St. Hesper, 40 tons, seven seconds)
5. **Physical reality** (rust-red ore car, polished lever, echo off quarry walls)
6. **Hyperlegible tracks** (═══ markers, ⚡ GOLD forks)
7. **Clear consequences** (⊗ LOST, ✓ SAVED tags with LEGOS data)

**Result:** The dilemma becomes visceral, not abstract. Stakes are crystal clear. The weight of the choice is immediate and personal.

---

**Test command:** `start hamlet`

**Watch:** The scene unfolds with characters, location, stakes all visible. LEGOS badges show what matters. No philosophy—only consequences.
