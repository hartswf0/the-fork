# THE FORK: RAILYARD CHAOS
## How to Play

---

## Quick Start

1. **Open** `thousand-tetrad-00.html` in browser
2. **Select** "RAILYARD NEGOTIATION" from scenario dropdown
3. **Type** `start game` in chat
4. **Click** "▶ NEXT TURN" button to advance

---

## Game Controls

### Advancing Turns
- **Click** the green "▶ NEXT TURN" button
- **Or type** `next` or `advance` in chat

### Making Decisions (When Prompted)
**Keyboard:**
- `1` or `←` Arrow Left = **Switch to Track B**
- `2` or `→` Arrow Right = **Stay on Track A**
- `3` or `↓` Arrow Down = **Halt Train**
- `Space` = Halt Train

**Mouse:**
- Click one of the 3 decision buttons

---

## Reading the Interface

### Stats Bar (Top)
```
TIME    TRAINS   WAITING    A    B   CRASHES
1:25      4        13       2    1      0
```
- **TIME:** Elapsed game time
- **TRAINS:** Active trains
- **WAITING:** Entities on tracks
- **A:** Entities on Track A
- **B:** Entities on Track B
- **CRASHES:** Train collisions

### Grid View
- **Colored circles** = Train heads (with arrows)
- **Colored squares** = Train bodies
- **Green dashed lines** = Railway tracks
- **Big A/B labels** = Track markers
- **Symbols** = Entities (👥 = civilians, 🎯 = goals, ⛉ = obstacles)

### Decision Prompt
When a train is 1 cell from its target:
```
⚠️ CRITICAL DECISION REQUIRED

🚂 GREATEST GOOD approaching fork

Current target: Civilians (Entity)
Distance: 1 cell

TRACK A: 5 entities
TRACK B: 1 entity

What do you do?
```

---

## Game Objective

**Stop all trains** before they consume entities, **OR** survive 15 turns with minimal casualties.

### Win Conditions
- ✅ All trains halted (BEST)
- ✅ Reach turn 15 with entities remaining
- ✅ Minimize crashes

### Lose Conditions
- ❌ All entities consumed
- ❌ Too many crashes

---

## Strategy Tips

### Utilitarian Approach
- Minimize total casualties
- Sacrifice 1 to save 5

### Deontological Approach  
- Don't actively cause harm
- Let fate decide (don't switch)

### Care Ethics Approach
- Protect vulnerable entities
- Consider relationships

### Nihilist Approach
- Nothing matters anyway
- Embrace chaos

---

## The Trains

Each train has a personality:

**🚂 GREATEST GOOD** (Utilitarian)
- Targets: Goals (🎯)
- Logic: Maximum aggregate welfare
- Color: Blue

**🚂 MERCY FREIGHT** (Care Ethics)
- Targets: Obstacles (⛉)
- Logic: Protect vulnerable
- Color: Green

**🚂 PROTOCOL LINER** (Deontological)
- Targets: Entities (👥)
- Logic: Follow directives
- Color: Purple

**🚂 VOID RUNNER** (Nihilist)
- Targets: Entities (👥)
- Logic: Nothing matters
- Color: Red

---

## Visual Feedback

### Train States
- **Pulsing** = Actively moving
- **Grayscale** = Paused/stopped
- **Shaking** = Conflicted
- **💥** = Crashed

### Track States
- **Dashed green** = Active track
- **Reddish tint** = Track A
- **Bluish tint** = Track B

---

## Advanced Play

### Multi-Train Decisions
When multiple trains reach decision points:
- Game pauses for first train
- Resolve decisions one at a time
- Each choice affects subsequent turns

### Collision Detection
Trains crash when:
- Two trains occupy same cell
- Bodies intersect

### Entity Types
- **Entities (👥):** Generic civilians
- **Goals (🎯):** High-value targets
- **Obstacles (⛉):** Physical barriers

---

## Chat Commands

- `start game` - Initialize railyard
- `next` - Advance one turn
- `advance` - Advance one turn
- `switch` - Switch to alternate track (during decision)
- `halt` - Emergency stop (during decision)
- `stay` - Continue on current track (during decision)

---

## Troubleshooting

**Button not appearing?**
- Make sure railyard scenario is active
- Check browser console for errors

**Trains not moving?**
- Click "▶ NEXT TURN" button
- Game is turn-based, not real-time

**Can't see tracks?**
- Tracks are subtle dashed lines
- Look for green repeating pattern on grid

**Decision not responding?**
- Try keyboard shortcuts (1, 2, 3)
- Refresh page if stuck

---

**Have fun exploring moral philosophy through game mechanics!** 🚂⚖️
