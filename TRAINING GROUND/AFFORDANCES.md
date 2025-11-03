# 🎮 Main Affordances: Orbital vs Railway Systems

## 📊 Comparison Table

| Feature | **orbit-graph.html** | **railway-full-integration.html** |
|---------|---------------------|----------------------------------|
| **Core Metaphor** | Orbital navigation (NASA space) | Railway junction (transportation) |
| **Primary Objects** | 5 orbital bodies (media eras) | 1 train with multiple cars |
| **Movement** | Independent orbits at different radii | Linear track progression |
| **Rings/Tracks** | 5 tetrad rings (amplification, inversion, etc.) | 5 tetrad tracks (enhance, reverse, etc.) |
| **Grid Tracking** | ✅ All 5 bodies tracked | ✅ Single train tracked |
| **Perspective Modes** | 6 modes (overview + 5 POVs) | 2 modes (overview + follow) |
| **Decision Indicators** | 🔴 Glowing NASA orange dots | No visual indicators |
| **Scene Reshaping** | ✅ Visible (fade, scatter, pulse) | ❌ Not implemented |
| **Chat Controls** | ✅ Embedded inline | ❌ Separate UI |
| **Export** | ✅ PNG snapshot | ❌ Not available |

---

## 🌌 **orbit-graph.html** - Orbital Navigation System

### Primary Affordances

#### 1. **Ring Selection** (Tetrad Verbs)
```
↑ ← ○ → ↓
```
- **○ MAIN RING** - Neutral observation
- **→ AMPLIFICATION** - Enhance patterns
- **← INVERSION** - Create opposition
- **↑ MEMORY** - Retrieve past states
- **↓ FADE** - Push to obsolescence

**Effect:** Switches orbital dynamics, changes entity behavior probabilities

#### 2. **Encounter Actions** (A/B/X/Y)
```
🟢 A - Continue (engage)
🟡 B - Reverse (avoid)
⚪ X - Collect (probabilistic)
🔴 Y - Delete (permanent)
```

**Visual Feedback:**
- **🔴 Glowing dots** beside recommended actions
- **Red flash** → fade on deletion
- **Green pulse** on successful collection
- **Entity scatter** when nearby witness deletion

#### 3. **Perspective Lock**
```
Dropdown selector:
- Overview (God Mode)
- Print Era POV
- Radio Era POV
- Television Era POV
- Internet Era POV
- AI Era POV
```

**Effect:** Camera follows selected orbital body, experiencing system from their perspective

#### 4. **Orbital Drift Slider**
```
━━━━━━━●━━━━━━━━━ 18
```
- **Range:** 0-100
- **0:** Synchronized orbits (harmonic)
- **100:** Maximum chaos (erratic speeds)

**Effect:** Real-time adjustment of orbital speed variance

#### 5. **Pattern Randomization**
```
[New Pattern] button
```

**Effect:** Randomizes starting positions of all 5 orbital bodies

#### 6. **Snapshot Export**
```
[📸 Export] button
```

**Effect:** Downloads current orbital configuration as PNG

#### 7. **Chat Integration**
- All controls **embedded in chat** as interactive messages
- System **responds in chat** to control changes
- Example:
  ```
  USER: [Drags drift to 80]
  SYSTEM: 🌌 Orbital drift increased to 80 - chaos intensifying
  ```

---

## 🚂 **railway-full-integration.html** - Railway Junction

### Primary Affordances

#### 1. **Track Selection** (Tetrad Verbs)
```
↑ ← ○ → ↓
```
- **○ MAIN LINE** - Standard progression
- **→ ENHANCE** - Amplification track
- **← REVERSE** - Opposition track
- **↑ RETRIEVE** - Memory track
- **↓ OBSOLESCE** - Fade track

**Effect:** Switches train route, changes radius

#### 2. **Collision Actions** (A/B/X/Y)
```
A - Continue (risky pass)
B - Reverse (avoid)
X - Ask to board (Bayesian)
Y - Kill (permanent)
```

**Visual Feedback:**
- ❌ **No glowing indicators** (plain buttons)
- ❌ **No scene transformation** (entities just disappear)

#### 3. **Camera Follow**
```
Toggle: ON/OFF
```

**Effect:** Camera follows train from behind

#### 4. **Pause/Play**
```
⏯ button
```

**Effect:** Stops/starts train movement

#### 5. **Chat Commands**
- `@EntityName` - Mention specific entity
- `"spawn X entities"` - AI generates JSON
- `"switch to enhance track"` - AI triggers action

---

## 🎨 **Novel Design: Glowing Indicators**

### Visual Language

**In orbit-graph.html:**

```
⛔ **Reach the Station**
  🔴 [A] 🔴 [B]  [X]  [Y]  [📷]
  ↑recommended
```

The **glowing orange dots** (🔴) appear beside buttons that are:
- **Contextually appropriate** for entity type
- **Higher probability** of success
- **Recommended** by system logic

### Recommendation Matrix

| Entity Type | Recommended Actions |
|-------------|-------------------|
| **⛔ Obstacle** | B (reverse), Y (delete) |
| **👤 Entity** | X (collect), A (continue) |
| **✅ Solution** | X (collect) |
| **⭐ Goal** | A (continue), X (collect) |
| **📍 Location** | A (continue) |

---

## 🌊 **Scene Reshaping Visualization**

### Delete Action Flow

```
1. Entity deleted
   └─> 🔴 RED FLASH (0.8 opacity)
   
2. Fade animation (1 second)
   └─> Opacity: 0.8 → 0
   └─> Scale: 1.0 → 0.5
   
3. Nearby entities SCATTER
   └─> Move away from kill site
   └─> Grid cells update in real-time
   └─> 🟡 YELLOW highlight on new positions
   
4. System narrates consequence
   └─> "🌊 SCENE RESHAPED: 3 entities relocated"
```

### Collect Action Flow

```
1. Bayesian probability calculated
   └─> Base: 50%
   └─> Track mode: ±20%
   └─> Entity type: ±30%
   └─> Context: ±10%
   
2. If ACCEPTED:
   └─> 🟢 GREEN PULSE (0.7 opacity)
   └─> Wait 500ms
   └─> Cell clears (0.15 opacity)
   └─> Entity removed from grid
   └─> System: "✅ Entity BOARDS"
   
3. If REFUSED:
   └─> Entity stays on grid
   └─> System: "❌ Entity REFUSES"
   └─> Probability shown in chat
```

---

## 🎯 **Key Differences**

### **orbital-graph.html** emphasizes:
1. ✅ **Parallel tracking** - All 5 bodies monitored
2. ✅ **Visual guidance** - Glowing indicators show recommendations
3. ✅ **Embodied perspective** - Lock camera to orbital POV
4. ✅ **Conversational UI** - Controls embedded in chat
5. ✅ **Scene transformation** - Decisions visibly reshape world
6. ✅ **Exportability** - Snapshot current state

### **railway-full-integration.html** emphasizes:
1. ✅ **Linear progression** - Single train, predictable path
2. ✅ **Tetrad switching** - Change tracks to reshape reality
3. ✅ **Probabilistic decisions** - Bayesian entity responses
4. ✅ **Spatial grid** - 9x9 cell navigation
5. ❌ **No visual indicators** - User must infer options
6. ❌ **Static scenes** - Entities don't visibly react

---

## 🚀 **Recommended Next Steps**

### For **orbit-graph.html:**
- ✅ Add orbital body **trails** (path history)
- ✅ Implement **gravitational pull** between bodies
- ✅ Create **orbital resonance** patterns (when bodies align)
- ✅ Add **soundtrack** that changes per ring

### For **railway-full-integration.html:**
- 🔧 Port glowing indicators from orbit-graph
- 🔧 Add scene reshaping animations
- 🔧 Implement camera perspectives (track POV, entity POV)
- 🔧 Embed controls in chat like orbit-graph

---

**Generated:** 2025-11-03  
**Systems:** orbit-graph.html (5053 lines), railway-full-integration.html (est. 4800+ lines)
