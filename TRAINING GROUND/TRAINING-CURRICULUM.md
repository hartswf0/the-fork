# 🎓 Orbital Navigation Training Curriculum

## Course Overview

This curriculum teaches **decision-making in complex systems** using orbit-graph.html as a training environment. You'll learn to read system dynamics, negotiate with autonomous agents, and understand how choices ripple through interconnected networks.

**Duration:** Self-paced (8-12 hours recommended)  
**Prerequisites:** None (browser with WebGL support)  
**Outcome:** Fluency in systems thinking and probabilistic decision-making

---

## 📚 Module 1: Foundations (2 hours)

### 1.1 System Architecture
**Learning Objective:** Understand what orbit-graph is and isn't

**Key Concepts:**
- **Not a simulation** - It's a negotiation space
- **Not a game** - No win state, only learning states
- **Not a tool** - It's a training ground for decision muscles

**Activities:**
1. Open `orbit-graph.html`
2. Read welcome message
3. Observe 5 orbital bodies for 2 minutes without interaction
4. Note: What patterns emerge? Which body moves fastest?

**Resources:**
- Read: `AFFORDANCES.md` (Section: "What It's Really About")
- Read: `QUICK-START.md`

---

### 1.2 The Five Media Eras
**Learning Objective:** Understand each orbital body's meaning

| Era | Radius | Speed | Represents | Metaphor |
|-----|--------|-------|------------|----------|
| **Print** | 10m | Fastest | Individual literacy, permanence | Books, newspapers |
| **Radio** | 14m | Fast | Broadcast, synchronization | Live audio, mass reach |
| **Television** | 18m | Medium | Visual dominance, spectacle | Mass media peak |
| **Internet** | 22m | Slow | Network effects, decentralization | Web, connectivity |
| **AI** | 26m | Slowest | Algorithmic mediation, prediction | Machine intelligence |

**Activities:**
1. Click each orbital body
2. Read its introduction message
3. Ask: `@Print what did you change?`
4. Ask: `@AI what comes after you?`
5. Notice: Bodies respond differently based on McLuhan tetrad

**Assessment:**
- Can you explain why Print orbits fastest? (Hint: velocity of iteration)
- Can you predict which era will encounter grid entities most frequently?

---

### 1.3 The McLuhan Tetrad Rings
**Learning Objective:** Understand how interpretive frames reshape reality

**The Five Rings (Verbs):**

1. **○ MAIN** - Neutral observation (what exists)
2. **→ AMPLIFY** - Enhancement (what intensifies)
3. **← INVERT** - Opposition (what reverses)
4. **↑ RETRIEVE** - Memory (what returns from past)
5. **↓ FADE** - Obsolescence (what disappears)

**Key Insight:** The same scene looks different through different tetrad lenses.

**Activities:**
1. Start on MAIN ring (○)
2. Switch to AMPLIFY (→) - notice entity distribution changes
3. Switch to FADE (↓) - notice entities pushed to edges
4. Question: Does the scene change, or does your interpretation?

**Resources:**
- Read: McLuhan's tetrad theory (external)
- Study: How media eras apply each verb

---

## 📚 Module 2: Basic Interactions (2 hours)

### 2.1 Collision Encounters
**Learning Objective:** Understand what happens when orbital bodies meet entities

**Encounter Types:**
- **⛔ Obstacle** - Blocks progress, must navigate
- **👤 Entity** - Potential ally or neutral
- **✅ Solution** - Valuable resource
- **⭐ Goal** - Destination or objective
- **📍 Location** - Waypoint

**The Four Decisions (A/B/X/Y):**

1. **A - Continue** - Engage, move forward, risk
2. **B - Reverse** - Avoid, turn back, postpone
3. **X - Collect** - Ask to board (probabilistic)
4. **Y - Delete** - Eliminate permanently

**Activities:**
1. Wait for first collision (Print Era hits entity)
2. See the glowing indicators (🔴 dots beside recommended actions)
3. Try each decision type across 4 encounters:
   - Continue past an obstacle
   - Reverse from a goal
   - Collect an entity (watch probability)
   - Delete a solution (watch consequence)

**Critical Observation:**
- Which actions have glowing indicators?
- Why does the system recommend certain choices?
- What happens to the grid when you delete?

**Resources:**
- Read: `VISUAL-GUIDE.html` (glowing indicator matrix)
- Read: `CONTROLS-UPDATE.md` (scene reshaping section)

---

### 2.2 Probabilistic Responses
**Learning Objective:** Accept that entities have agency and resist

**Bayesian Factors:**
```
Base probability: 50%
+ Track mode (enhance/retrieve +20%, obsolesce -30%)
+ Entity type (Entity +20%, Obstacle -30%)
+ Context (nearby entities, train size)
= Final probability (10-90%)
```

**Activities:**
1. Ask entity to board (X) on MAIN ring
2. Note probability shown (e.g., 53%)
3. If refused, switch to ENHANCE ring (→)
4. Ask same entity type again
5. Compare probabilities

**Key Questions:**
- Why do entities refuse sometimes?
- Is refusal a bug or a feature?
- How does context change receptivity?

**Assessment:**
- Can you get a 90% acceptance rate? (Hint: right ring + right entity type)
- Can you predict refusal before it happens?

---

### 2.3 Scene Reshaping
**Learning Objective:** See how decisions propagate through space

**Visual Consequences:**

**Delete Action:**
```
1. Entity deleted → 🔴 RED FLASH
2. Cell fades over 1 second
3. Nearby entities SCATTER (move away)
4. Grid updates in real-time
5. Chat: "3 entities relocated"
```

**Collect Action:**
```
1. Probability calculated
2. If accepted → 🟢 GREEN PULSE
3. Cell clears after 500ms
4. Entity removed from grid
5. Chat: "Entity boards train"
```

**Activities:**
1. Delete an obstacle in center of grid
2. Count how many entities scatter
3. Note their new positions
4. Question: Did you control where they moved?

**Critical Insight:**
You triggered the cascade, but the system decided the details. This is **symbiogenesis** - co-creation of outcomes.

---

## 📚 Module 3: Advanced Dynamics (2 hours)

### 3.1 Drift Control
**Learning Objective:** Tune system chaos vs harmony

**Drift Scale:**
- **0** - Synchronized orbits (harmonic)
- **50** - Natural variance
- **100** - Maximum chaos

**Activities:**
1. Set drift to 0 (click − button repeatedly)
2. Observe: Bodies move in sync
3. Set drift to 100 (click + button)
4. Observe: Bodies at wildly different speeds
5. Find your preferred drift level

**Effect on Gameplay:**
- Low drift = Predictable encounters
- High drift = Chaotic, emergent patterns

**Assessment:**
- At what drift level do you see the most interesting patterns?
- Does high chaos create more decisions or different decisions?

---

### 3.2 Moon System
**Learning Objective:** Add nested complexity to the system

**Moon Mechanics:**
- Moons orbit orbital bodies
- Bodies orbit the star
- 3-level hierarchy: Moon → Body → Star

**Activities:**
1. Click 🌙 Add Moon (5 times)
2. Observe: Moons distributed across bodies
3. Note: Each has unique speed/distance
4. Watch: Multi-level orbital dynamics

**Emergent Properties:**
- Moons cross grid cells their host doesn't
- Moons create new encounter opportunities
- System becomes N-body problem (chaotic)

**Questions:**
- Do moons make the system more predictable or less?
- Can you predict which body will get the next moon?

---

### 3.3 Physics Mode
**Learning Objective:** See real N-body gravity in action

**Setup:**
1. Click ⚛️ Physics: OFF → ON
2. Bodies get mass (Print: 100 → AI: 300)
3. Gravitational fields activate

**Release Entities:**
1. Click 🎯 Release (5-10 times)
2. Entities spawn with random position/velocity
3. Watch: Gravity pulls them toward planets

**Three Outcomes:**
- 💥 **Crash** - Entity hits planet (turns red)
- ✨ **Stable Orbit** - Entity circles planet (notification)
- 🚀 **Escape** - Entity flies away

**Activities:**
1. Release 10 entities
2. Count: How many crash? How many orbit? How many escape?
3. Hypothesis: Which planet captures most? (Test: AI should win due to high mass)

**Assessment:**
- Can you release an entity that achieves stable orbit?
- Can you predict which planet will capture a given entity?

**Resources:**
- Read: `PHYSICS-MODE-GUIDE.md`
- Try: All 5 exercises in the guide

---

## 📚 Module 4: Design Patterns (2 hours)

### 4.1 Reading System States
**Learning Objective:** Diagnose what's happening in complex scenes

**Indicators to Read:**

1. **Overlay** (top-right)
   - Ring: Current tetrad verb
   - Cycle: % through orbit
   - Status: Paused/Orbiting/Physics

2. **Grid Colors**
   - Dark teal (0x0f766e) = Empty
   - Orange (0xffaa00) = Has entity
   - Entity color = Type-specific

3. **Chat History**
   - System narrates all state changes
   - Shows probabilities, consequences
   - Records crashes and orbits

**Activities:**
1. Create chaotic scene (add 5 moons, drift 80, physics on)
2. Without changing anything, read the state:
   - How many entities on grid?
   - How many moons active?
   - Which ring are you on?
   - Is physics enabled?
3. Write down your assessment
4. Check: Count entities in chat log vs your count

---

### 4.2 Designing Scenarios
**Learning Objective:** Build specific training situations

**Scenario Types:**

1. **Resource Scarcity**
   - Place 2 ✅ Solutions on grid
   - Delete most other entities
   - Challenge: Collect both solutions

2. **Contested Zone**
   - Add 5 moons to AI Era
   - Enable physics
   - Release entity between Print and AI
   - Watch: Tidal chaos

3. **Stable Equilibrium**
   - Set drift to 0
   - Enable physics
   - Find entity that orbits without crashing

4. **Cascade Effect**
   - Center grid: 1 obstacle, 8 surrounding entities
   - Delete obstacle
   - Watch: All 8 scatter

**Activities:**
Design your own scenario:
1. Choose a systems concept (e.g., "network effects")
2. Map it to orbit-graph (e.g., "add many moons to Internet Era")
3. Build the scene
4. Test: Does it illustrate the concept?

---

### 4.3 Mapping Real Problems
**Learning Objective:** Use orbit-graph to model actual decision spaces

**Translation Table:**

| Your Domain | Orbital Body | Entity | Gravity | Orbit |
|-------------|--------------|--------|---------|-------|
| **Business** | Market segment | Product | Market size | Engagement |
| **Politics** | Ideology | Voter | Influence | Alignment |
| **Social** | Platform | Creator | User base | Virality |
| **Org** | Department | Project | Budget | Success |

**Activities:**
1. Pick a real decision you face
2. Identify the "orbital bodies" (major forces)
3. Assign mass (influence/power) to each
4. Place your entity (yourself/project)
5. Enable physics and observe

**Example:**
```
Decision: Should I join Big Tech or a startup?

Bodies:
- Big Tech (AI Era, mass 300) = Google/Meta
- Startup (Print Era, mass 100) = Your startup

Your entity:
- Position: Between them
- Velocity: Toward startup (initial interest)

Physics simulation shows:
- High chance of capture by Big Tech (stronger gravity)
- Would need higher velocity to stay with startup
```

**Assessment:**
- Can you model a real decision using orbit-graph?
- Does the simulation reveal something you hadn't considered?

---

## 📚 Module 5: Mastery (2 hours)

### 5.1 Chat-Driven Editing
**Learning Objective:** Control the system through conversation

**Command Examples:**

```
"Make AI Era heavier"
→ Increases AI's mass

"Move Internet to inner orbit"
→ Changes Internet's radius

"Release 10 entities"
→ Spawns 10 with physics

"Add moon to Print"
→ Creates moon orbiting Print

"Turn off gravity for TV"
→ Sets TV's mass to 0
```

**Activities:**
1. Ask AI to modify the scene
2. Observe changes in real-time
3. Ask AI to explain what changed

**Advanced:**
- Can you use chat to create a binary star system?
- Can you use chat to simulate a merger (move two bodies together)?

---

### 5.2 Interpreting Emergent Patterns
**Learning Objective:** Read what the system is teaching you

**Pattern Recognition:**

1. **Orbit Resonance**
   - Bodies align periodically
   - Creates encounter waves
   - Lesson: Timing matters in complex systems

2. **Chaotic Attractors**
   - Some entities never settle into stable orbits
   - They visit multiple planets
   - Lesson: Some problems have no stable solution

3. **Capture Zones**
   - High-mass bodies dominate certain grid regions
   - Low-mass bodies can't compete there
   - Lesson: Power concentrates spatially

**Activities:**
1. Run physics mode for 5 minutes
2. Don't interact, just watch
3. Write down 3 patterns you notice
4. Question: What does each pattern reveal about complex systems?

---

### 5.3 Teaching Others
**Learning Objective:** Articulate what you've learned

**Exercise: The 5-Minute Demo**

Prepare a demonstration for someone who's never seen orbit-graph:

1. **Hook** (30 sec) - "This is a decision training ground"
2. **Core Mechanic** (1 min) - Show collision + 4 decisions
3. **Consequence** (1 min) - Delete entity, show scatter
4. **Complexity** (1 min) - Add moon, enable physics
5. **Reflection** (1.5 min) - "What did you notice?"

**Assessment:**
- Can you explain orbit-graph without mentioning McLuhan or Three.js?
- Can you make the core insight (symbiogenesis) tangible?

---

## 🎯 Final Project

### Build Your Own Training Scenario

**Requirements:**
1. Choose a systems concept (your choice)
2. Design a scene in orbit-graph that illustrates it
3. Write instructions for someone to experience it
4. Test with a colleague/friend
5. Document what they learned

**Example Concepts:**
- Feedback loops
- Network effects
- Path dependence
- Tipping points
- Creative destruction
- Emergence
- Resilience
- Adaptation

**Deliverable:**
A 1-page guide with:
- Concept definition
- Scene setup instructions
- What to observe
- Key insights

---

## 📊 Assessment Rubric

### Beginner (Modules 1-2)
- ✅ Can navigate interface
- ✅ Understands 4 decision types
- ✅ Recognizes glowing indicators
- ✅ Knows entities have agency

### Intermediate (Modules 3-4)
- ✅ Uses drift control effectively
- ✅ Can add and manage moons
- ✅ Understands physics mode
- ✅ Designs basic scenarios

### Advanced (Module 5)
- ✅ Maps real problems to orbit-graph
- ✅ Uses chat to edit scenes
- ✅ Recognizes emergent patterns
- ✅ Teaches others

### Mastery
- ✅ Creates original training scenarios
- ✅ Articulates symbiogenesis concept
- ✅ Uses orbit-graph as decision tool
- ✅ Contributes new interpretations

---

## 📚 Recommended Reading Order

1. `QUICK-START.md` - Get oriented
2. `AFFORDANCES.md` - Understand philosophy
3. `TRAINING-CURRICULUM.md` (this file) - Follow curriculum
4. `training-exercises.html` - Do interactive exercises
5. `PHYSICS-MODE-GUIDE.md` - Master physics
6. `VISUAL-GUIDE.html` - Study glowing indicators
7. `CONTROLS-UPDATE.md` - Learn all controls

---

## 🔄 Continuous Practice

**Daily Practice (10 min):**
1. Open orbit-graph
2. Enable physics
3. Release 5 entities
4. Observe one outcome closely
5. Reflect: What does this pattern teach?

**Weekly Challenge:**
Design one new scenario that illustrates a concept from your work/life.

**Monthly Review:**
Revisit a scenario from 30 days ago. Has your interpretation changed?

---

## 🎓 Certification

After completing all modules and the final project:

1. You understand **decision architectures** shape what choices are possible
2. You can **read complex system states** from visual/textual indicators
3. You **expect and work with resistance** from autonomous agents
4. You see **consequences propagate** through interconnected networks
5. You use **symbiogenesis** rather than control as your operating model

**You are now fluent in orbital navigation decision-making.**

---

**Course Version:** 1.0  
**Last Updated:** 2025-11-03  
**Instructor:** Orbit-Graph Training System  
**Support:** See `index.html` for all resources
