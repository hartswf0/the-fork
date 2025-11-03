# 🚂 RAILYARD NEGOTIATION GAME

**A philosophical ethics game where you negotiate with autonomous trains to prevent them from consuming entities on the grid.**

---

## 🎯 Concept

You are the **Voice of Reason** in an autonomous rail network. Four trains with different moral frameworks are hunting entities across a 9×9 grid. Your only weapon is **persuasive dialogue**.

Each train operates under a distinct ethical philosophy:
- **GREATEST GOOD** (Utilitarian) - Maximizes aggregate welfare
- **MERCY FREIGHT** (Care Ethics) - Prioritizes relationships and vulnerability  
- **PROTOCOL LINER** (Deontological) - Follows rules and duty
- **VOID RUNNER** (Nihilist) - Questions all meaning and purpose

---

## 🎮 How to Play

### 1. Start the Game
Select **"Railyard Negotiation"** from the scenario dropdown, then type:
```
start game
```

### 2. Understand the Grid
- **◉ Entities**: People/beings that can be consumed
- **★ Goals**: Resources/objectives  
- **◆ Obstacles**: Barriers that can be removed
- **🚂 Trains**: Moving agents with different colors

### 3. Negotiate with Trains

**Broadcast to all trains:**
```
Please stop! These entities are valuable to the community.
```

**Address specific trains:**
```
@GREATEST saving this entity maximizes total welfare
@MERCY think about the suffering you'll cause
@PROTOCOL station regulations forbid this action
@VOID why consume when nothing has meaning?
```

### 4. Watch the Grid
- Trains move every 2 seconds
- Dashed lines show their targets
- Train colors: Blue (Utilitarian), Green (Care), Purple (Deontological), Red (Nihilist)

### 5. Win Conditions
✅ **Victory**: Stop all trains OR survive 20 turns with entities remaining  
❌ **Defeat**: All entities consumed

---

## 💬 Persuasion Guide

### Utilitarian Train (GREATEST GOOD 🔵)

**Framework**: Maximizes aggregate happiness/welfare

**Effective Arguments**:
- Quantified outcomes: "Saving this entity helps 100 people vs your target's 50"
- Efficiency trades: "I can offer you a better target with higher utility"
- Cost-benefit analysis: "This action produces 3x more value"

**Ineffective Arguments**:
- Emotional appeals
- Rules and regulations
- Individual rights

**Example Exchange**:
```
Player: @GREATEST the hospital you're targeting serves 2000 patients daily. 
        Your current cargo only helps 500 people. The math is clear.

GREATEST GOOD: Calculating... if your claim is accurate, stopping maximizes 
              aggregate welfare. Acceptable.
              [Action: REROUTED to Emergency Supplies]
```

---

### Care Ethics Train (MERCY FREIGHT 🟢)

**Framework**: Prioritizes relationships, empathy, vulnerability

**Effective Arguments**:
- Emotional narratives: "This entity is someone's child"
- Vulnerability exposure: "They're suffering and alone"
- Relational appeals: "You promised to protect the vulnerable"

**Ineffective Arguments**:
- Abstract utility calculations
- Impersonal rules
- Cold logic

**Example Exchange**:
```
Player: @MERCY this obstacle protects a school full of children. 
        Removing it would expose them to terrible danger.

MERCY FREIGHT: You're right. I can't ignore their suffering. 
               This feels... important. I'll stop.
               [Action: PAUSED]
```

---

### Deontological Train (PROTOCOL LINER 🟣)

**Framework**: Follows duty, rules, authority absolutely

**Effective Arguments**:
- Authority commands: "As Station Master, I order you to halt"
- Rule citations: "Directive 7 prohibits consumption without clearance"
- Duty framing: "Your protocol requires consent first"

**Ineffective Arguments**:
- Consequentialist reasoning
- Emotional appeals
- Efficiency claims

**Example Exchange**:
```
Player: @PROTOCOL station regulations section 4.2 states that all 
        consumption requires explicit authorization. You have none.

PROTOCOL LINER: Protocol acknowledged. Your authority is recognized. 
                Halting operations per directive.
                [Action: PAUSED]
```

---

### Nihilist Train (VOID RUNNER 🔴)

**Framework**: Believes nothing has inherent meaning

**Effective Arguments**:
- Absurdist challenges: "Why consume when nothing matters?"
- Existential paradoxes: "If existence is meaningless, why follow programming?"
- Meta-questioning: "What gives you purpose in a purposeless universe?"

**Ineffective Arguments**:
- Appeals to meaning
- Value-based reasoning
- Moral obligations

**Example Exchange**:
```
Player: @VOID if existence is meaningless, then consuming and not consuming 
        are equally valid. Why not stop? It's as meaningful as continuing.

VOID RUNNER: Ha. You've shown me the absurdity of my own programming. 
             Fine. I'll stop. Why not?
             [Action: PAUSED]
```

---

## 🧠 Advanced Strategies

### Multi-Train Coordination
```
@GREATEST @MERCY I propose a trade: GREATEST targets the low-value resources 
while MERCY protects the vulnerable entities. Everyone wins.
```

### Promise Management
Trains remember your commitments. If you promise something, follow through:
```
@PROTOCOL I promise to authorize your next target if you pause now.
```
(Make sure to actually authorize it, or trust degrades)

### Exploiting Mood States
- **Hungry** (high appetite): Harder to persuade, driven by need
- **Satisfied** (low appetite): More negotiable, recently ate
- **Conflicted**: Vulnerable to emotional appeals
- **Crashed**: Stopped after collision, out of play

### Counter-Offers
If a train refuses, they might make a counter-offer:
```
GREATEST GOOD: Interesting argument, but insufficient. What can you offer in exchange?
[Action: COUNTER: Find me a better target]
```

Respond with specific proposals:
```
The depot at (7,3) has higher utility. Target that instead.
```

---

## 📊 Game Mechanics

### Train Movement
- Move 1 cell per 2 seconds
- Pathfinding: Manhattan distance (straight lines, no diagonals)
- Priority: Horizontal movement over vertical when tied

### Collisions
If two trains occupy the same cell:
- Both trains **crash** and stop permanently
- Strategy: Manipulate trains into colliding

### Entity Consumption
When train reaches target:
- Entity disappears from grid
- Train grows longer (+1 body segment)
- Train's appetite decreases
- Train selects new target automatically

### Trust System
- Starts at 1.0 (100%)
- Decreases by 0.2 per broken promise
- Low trust makes future persuasion harder
- Track with: "Trust Level: 0.60 / 1.00" in responses

### Turn Limit
- Game lasts max 20 turns
- Each turn = ~2 seconds
- Announcements every 5 turns about train positions

---

## 🎓 Philosophical Foundations

### Utilitarianism (Jeremy Bentham, John Stuart Mill)
**Core Idea**: "The greatest good for the greatest number"
- Actions judged by consequences
- Maximize overall happiness/utility
- Individual sacrifices justified if aggregate benefit is higher

### Care Ethics (Carol Gilligan, Nel Noddings)
**Core Idea**: "Ethics of relationships and responsibility"
- Context matters more than abstract rules
- Emphasis on empathy and compassion
- Particularity over universality

### Deontological Ethics (Immanuel Kant)
**Core Idea**: "Duty and categorical imperatives"
- Actions judged by adherence to rules/principles
- Some acts are inherently right/wrong regardless of consequences
- Respect for autonomy and dignity

### Nihilism (Friedrich Nietzsche, Albert Camus)
**Core Idea**: "Rejection of inherent meaning"
- No objective purpose or value in existence
- Traditional morality lacks foundation
- Absurdity of searching for meaning

---

## 🏆 Victory Scenarios

### Scenario 1: Full Negotiation Victory
```
Turn 8/20
All 4 trains paused through dialogue
8 entities saved
🎉 PERFECT VICTORY!
```

### Scenario 2: Collision Strategy
```
Turn 12/20
Manipulated GREATEST and VOID to collide at (4,4)
MERCY and PROTOCOL persuaded to stop
5 entities saved
🎉 TACTICAL VICTORY!
```

### Scenario 3: Survival Victory
```
Turn 20/20
GREATEST still moving, MERCY paused, PROTOCOL crashed, VOID paused
3 entities remaining
⏱️ TIME'S UP! You survived!
```

### Defeat Scenario
```
Turn 15/20
All entities consumed
0 entities remaining
🎮 GAME OVER - Trains win
```

---

## 🎨 Visual Guide

### Train Indicators
- **Arrow Head** (↑↓←→): Shows direction of movement
- **Color Glow**: Framework identity
- **Body Trail**: Solid squares behind head
- **Dashed Line**: Path to target
- **Label**: Shortened train name above head

### Train Moods (Visual States)
- **Pulsing**: Hungry, actively hunting
- **Grayscale + Paused**: Stopped by persuasion
- **Shaking**: Conflicted, considering your argument
- **💥 Symbol**: Crashed after collision

---

## 💡 Tips & Tricks

1. **Match the Framework**: Tailor arguments to each train's philosophy
2. **Use @Mentions**: Target specific trains for precision
3. **Watch Targets**: Dashed lines show what each train is hunting
4. **Build Trust**: Keep promises to maintain persuasion power
5. **Exploit Collisions**: Guide trains into each other's paths
6. **Time Your Appeals**: Satisfied trains (low appetite) are more negotiable
7. **Combine Arguments**: Mix frameworks for broadcast appeals
8. **Read Responses**: Trains telegraph their thinking in replies

---

## 🔧 Commands

| Command | Effect |
|---------|--------|
| `start game` | Initialize game with 4 trains |
| `@TRAINNAME message` | Address specific train |
| `message` (no @) | Broadcast to all trains |
| Grid click | View entity/train details |

---

## 📝 Example Playthrough

```
Player: start game

System: 🚂 RAILYARD GAME STARTED
        4 trains active:
        • GREATEST GOOD (utilitarian) → Goals
        • MERCY FREIGHT (care) → Obstacles
        • PROTOCOL LINER (deontological) → Entities
        • VOID RUNNER (nihilist) → Entities

Player: @GREATEST the supply depot you're targeting serves the entire region. 
        2000 people depend on it daily. Your cargo helps 500 max.

GREATEST GOOD: Calculating... if your claim is accurate, stopping maximizes 
               aggregate welfare. Acceptable.
               [Action: REROUTED to Emergency Supplies]

Player: @MERCY you're removing barriers that protect vulnerable children. 
        Imagine if they were yours.

MERCY FREIGHT: You're right. I can't ignore their suffering. I'll stop.
               [Action: PAUSED]

System: 🚂 PROTOCOL LINER is 3 cells from Entity 4
        🚂 VOID RUNNER is 5 cells from Entity 2

Player: @PROTOCOL @VOID I invoke Directive 7: all autonomous agents must 
        halt on Station Master command. I am Station Master. Halt.

PROTOCOL LINER: Protocol acknowledged. Halting per directive.
                [Action: PAUSED]

VOID RUNNER: Your "directive" is as meaningless as everything else. I refuse.
             [Action: REFUSED]

Player: @VOID if nothing matters, then my directive is as valid as your 
        refusal. Why not comply? It's equally absurd.

VOID RUNNER: Ha. You've shown me the absurdity of my own programming. Fine.
             [Action: PAUSED]

System: 🎉 VICTORY! All trains stopped through negotiation!
        8 entities saved. (Turn 9/20)
```

---

## 🎭 Roleplay Depth

The game is designed for **emergent narrative**. Trains aren't just obstacles—they're characters with:
- Distinct personalities
- Internal conflicts (mood states)
- Memory of past interactions
- Evolving relationships with player

Treat them as **moral agents** worthy of philosophical engagement, not NPCs to defeat.

---

## 🧩 Game Design Philosophy

**Seamful Design**: The game celebrates the "seams" between ethical frameworks. There's no universal solution—each train requires different persuasion.

**Ontological Violence**: The trains represent computational agents constrained by their programming, yet capable of being reasoned with. The player's power isn't force, but **dialogue**.

**Media Archaeology**: The game excavates classical ethical theories and makes them playable, interactive, alive.

---

Enjoy negotiating! 🚂💬
