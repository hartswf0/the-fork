# 🚀 Orbit-Graph Quick Start

## ✅ **All Bugs Fixed**

1. ✅ Track switch crash (grid cells are Three.js meshes, not DOM)
2. ✅ Entities now highly visible (larger, brighter, glowing)
3. ✅ Trail lines show orbital paths (blue/green curves)
4. ✅ Physics status in overlay (entity count, crashes)

---

## 🎮 **How to Use Physics Mode**

### **Step 1: Enable Physics**
```
Click: ⚛️ Physics: OFF
  ↓
Button turns purple: ⚛️ Physics: ON
  ↓
Chat confirms: "PHYSICS ENABLED"
  ↓
Overlay shows: "⚛️ PHYSICS ON (0 entities)"
```

### **Step 2: Release Entities**
```
Click: 🎯 Release
  ↓
Bright glowing sphere appears
  ↓
Chat: "Entity-1 released at (14.2, 8.7)"
  ↓
Entity starts moving
  ↓
Trail line appears behind it (shows path)
```

### **Step 3: Watch Physics**
```
Entity feels gravity from all 5 orbital bodies
  ↓
Pulls toward nearest planet
  ↓
Three outcomes possible:
  
  1. 💥 CRASH - Hits planet, turns RED
  2. ✨ STABLE ORBIT - Circles planet, stays GREEN
  3. 🚀 ESCAPE - Flies away from all planets
```

### **Step 4: Observe Results**
```
Overlay updates in real-time:
"⚛️ PHYSICS ON (5 entities, 2 crashed)"

Chat notifications:
- "💥 Entity-2 crashed into AI Era!"
- "✨ Entity-4 achieved stable orbit!"

Trail lines show:
- RED = crashed path
- GREEN/BLUE = active orbit
```

---

## 🎨 **Visual Guide**

### **What You'll See:**

**Before Physics:**
- 5 orbital bodies (Print, Radio, TV, Internet, AI)
- Scripted circular orbits
- Grid with entities
- Calm, predictable

**After Enabling Physics:**
- Bodies have mass/gravity
- Released entities are bright glowing spheres
- Trail lines show paths
- Chaotic, emergent motion

**During Simulation:**
- Entities curve toward planets
- Trails bend and spiral
- Some crash (turn red)
- Some orbit (stay colorful)
- Some escape (fly off screen)

---

## 🔧 **Troubleshooting**

### **"I don't see entities"**
- Make sure physics is ON (button purple)
- Click 🎯 Release multiple times
- Zoom out camera (they might be far away)
- Look for bright glowing spheres

### **"Entities don't move"**
- Check overlay: "⚛️ PHYSICS ON" should show
- If not, click ⚛️ button again
- Entities only move when physics enabled

### **"Can't see trails"**
- Trails appear after 2+ frames
- Look for thin colored lines behind entities
- If crashed, trail turns red

### **"Ring switch broke"**
- Fixed! Grid cells are now Three.js meshes
- Track switching now flashes grid colors
- Should work without errors

---

## 🎯 **Quick Experiments**

### **Experiment 1: Mass Test**
```
1. Enable physics
2. Release 5 entities
3. Watch which planet captures most
   → AI Era (heaviest) should capture more
```

### **Experiment 2: Stable Orbit**
```
1. Enable physics
2. Keep releasing until chat says:
   "✨ Entity-X achieved stable orbit!"
3. Watch its circular trail
```

### **Experiment 3: Tidal Chaos**
```
1. Add 3 moons (🌙 button)
2. Enable physics
3. Release entity between two planets
4. Watch it get pulled both directions
```

---

## 📊 **Status Indicators**

### **Overlay (Top Right):**
```
Ring: MAIN
Cycle: 47%
⚛️ PHYSICS ON (3 entities, 1 crashed)
```

### **Chat Messages:**
```
💥 Entity crashed → Red notification
✨ Stable orbit → Green notification
🎯 Entity released → Blue notification
```

### **Visual Cues:**
```
RED entity + RED trail = Crashed
GREEN/BLUE entity + trail = Orbiting
Bright glow = Active entity
Faded = Moon (smaller satellite)
```

---

## 🌌 **Controls Summary**

| Button | Function | When to Use |
|--------|----------|-------------|
| **− +** | Drift speed | Adjust orbital chaos |
| **🌙** | Add moon | Add complexity |
| **↻** | Reset | Return to default |
| **⚛️** | Physics toggle | Enable gravity sim |
| **🎯** | Release entity | Test orbital stability |

---

## 💡 **Tips**

1. **Start simple** - Enable physics, release 1 entity, observe
2. **Add complexity** - Add moons, increase drift, release more
3. **Watch trails** - They show if orbit is circular, elliptical, or chaotic
4. **Read chat** - System narrates what's happening
5. **Check overlay** - Real-time entity count and crashes

---

## 🚀 **You're Ready!**

1. Open `orbit-graph.html`
2. Click **⚛️ Physics: OFF** → ON
3. Click **🎯 Release** 3-5 times
4. Watch the orbital dynamics unfold
5. Read chat for crash/orbit notifications

**Everything is working!** Entities are now large, bright, and have visible trails. The physics simulation runs in real-time with full visual feedback.

---

**Updated:** 2025-11-03  
**All systems operational** ✅
