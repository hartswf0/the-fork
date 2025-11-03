# NEGATIVE SPACE PROGRAMMING LOG
## Railway Full Integration - Module Assembly

---

## NOT-LIST (Foundation)

### What This System Is NOT:
- ❌ NOT two separate applications
- ❌ NOT a simplified "demo" version
- ❌ NOT newly written code (must be parasitic)
- ❌ NOT optional features (must include ALL)
- ❌ NOT using build tools (single HTML file)
- ❌ NOT backwards compatible with parents

### Non-Goals:
- Will NOT support both parents independently
- Will NOT preserve separate animation loops
- Will NOT maintain separate state systems
- Will NOT use external dependencies beyond Three.js/Tone.js

### Out-of-Scope:
- Server-side rendering
- Multi-user collaboration
- Mobile-first design (desktop assumed)
- Legacy browser support (ES6+ required)

---

## STOP-DOING LEDGER

### From thousand-tetrad (REMOVED):
| Item | Why Removed | Capacity Freed | Owner |
|------|-------------|----------------|-------|
| Standalone channel system | Integrating with 3D | State management simplified | Integration Layer |
| DOM-only updates | Using RAF loop instead | Event listeners reduced | Animation System |
| Independent grid positioning | Linked to track angles | Coordinate system unified | Bridge Module |

### From train-brain (REMOVED):
| Item | Why Removed | Capacity Freed | Owner |
|------|-------------|----------------|-------|
| Global train state | Moving to channel objects | Namespace pollution reduced | Channel System |
| Single scene instance | One scene per channel | Multi-channel support | Channel System |
| Hardcoded dialogue | Using tetrad/OpenAI | Static responses eliminated | Chat System |

---

## MODULE CONFLICT MAP

### CONFLICT 1: Animation Loops
**train-brain**: `requestAnimationFrame` loop  
**thousand-tetrad**: DOM event-driven updates  

**RESOLUTION**:
- ✅ USE: train-brain's RAF loop (one global)
- ✅ ADD: Hook for channel updates in loop
- ❌ REMOVE: All DOM-triggered animations
- **OWNER**: Animation System
- **FREEZE**: Until performance issue

### CONFLICT 2: State Management
**train-brain**: Global vars (`trainCars[]`, `trainCurrentU`)  
**thousand-tetrad**: Channel objects (`channel.messages`, `channel.tetrad`)  

**RESOLUTION**:
- ✅ USE: Channel objects as primary state
- ✅ ADD: `channel.trainCars`, `channel.trainScene`
- ❌ REMOVE: All global train state
- **OWNER**: State Module
- **FREEZE**: Until multi-channel trains working

### CONFLICT 3: Coordinate Systems
**train-brain**: 3D world space (x, y, z in meters)  
**thousand-tetrad**: Grid cells (0-8, 0-8 discrete)  

**RESOLUTION**:
- ✅ USE: Both (mapped)
- ✅ ADD: `gridToTrackAngle()` converter
- ❌ REMOVE: None (both needed)
- **OWNER**: Bridge Module
- **FORMULA**: `angle = (gridX * π/4) + (gridY * π/36)`

### CONFLICT 4: Rendering
**train-brain**: Three.js `renderer.render(scene, camera)`  
**thousand-tetrad**: DOM manipulation  

**RESOLUTION**:
- ✅ USE: Both (layered)
- ✅ ADD: Canvas element IN channel DOM
- ❌ REMOVE: None
- **OWNER**: Rendering System
- **FREEZE**: Until both render correctly

---

## OPTION MAP (3 Options Considered)

### OPTION A: Separate Windows
**Benefits**: Easy, no conflicts  
**Risks**: Not integrated, loses coherence  
**NOT CHOSEN CONSEQUENCE**: Would defeat purpose  
❌ **REJECTED**

### OPTION B: 3D Overlay on Grid
**Benefits**: Clean layering  
**Risks**: Grid hidden behind train  
**NOT CHOSEN CONSEQUENCE**: Can't see both simultaneously  
❌ **REJECTED**

### OPTION C: Embed Train IN Channel (CHOSEN)
**Benefits**: Train and grid both visible, true integration  
**Risks**: Complex layout, performance  
**✅ SELECTED**

**DISSENT**: "Too complex to maintain"  
**RESPONSE**: Complexity is inherent to full integration. Staged build mitigates risk.  
**FREEZE WINDOW**: Until Stage 6 complete  
**REOPEN TRIGGERS**: Performance < 30fps OR memory > 500MB

---

## KILL CRITERIA

### PIVOT if:
- Cannot achieve 30fps with 5 trains
- Memory usage exceeds 500MB
- Build time exceeds 8 hours

### PAUSE if:
- Module conflicts unresolvable
- Parent code incompatible
- Test coverage < 60%

### STOP if:
- Integration impossible without rewrite
- Performance permanently degraded
- User experience worse than either parent

---

## ASSEMBLY PLAN (With Subtractions)

### STAGE 1: Foundation ✅
**ADD**: Base HTML, dependencies, viewport CSS  
**SUBTRACT**: None (starting point)  
**CAPACITY FREED**: N/A

### STAGE 2: CSS Assembly (IN PROGRESS)
**ADD**: All thousand-tetrad CSS (lines 100-2398)  
**SUBTRACT**: Redundant theme definitions  
**CAPACITY FREED**: ~200 lines duplicate CSS  
**OWNER**: CSS Module

### STAGE 3: HTML Structure
**ADD**: Channel column template, corner menu  
**SUBTRACT**: Standalone app shell from tetrad  
**CAPACITY FREED**: ~50 lines wrapper code  
**OWNER**: DOM Module

### STAGE 4: Train System Injection
**ADD**: `createWheel()` (300 lines), `addTrainCar()` (150 lines)  
**SUBTRACT**: Global state variables from train-brain  
**CAPACITY FREED**: ~30 lines globals → channel properties  
**OWNER**: Train Module

### STAGE 5: Channel System
**ADD**: `createChannel()`, `forkChannel()`, `renderGrid()`  
**SUBTRACT**: Independent scene management  
**CAPACITY FREED**: ~80 lines scene setup → unified init  
**OWNER**: Channel Module

### STAGE 6: Integration Bridge (NEW)
**ADD**: `syncGridToTrain()`, `onJunctionReached()`  
**SUBTRACT**: None (net new code)  
**CAPACITY FREED**: Replaces manual coordination  
**OWNER**: Bridge Module

---

## CURRENT STATUS

**STAGE**: 2 (CSS Assembly)  
**BLOCKERS**: None  
**NEXT**: Continue CSS copy, then move to Stage 3  

**FILES**:
- ✅ `STAGE-1-foundation.html` (base structure)
- 🔄 `NEG-SPACE-LOG.md` (this file)
- ⏳ Stage 2+ (in progress)

---

## DECISION RECORD

**DECISION**: Build as single HTML file with parasitic copying  
**DATE**: 2025-11-02  
**DISSENT CAPTURED**:
- "Too large, should be modular" → Response: Deployment simplicity > code organization
- "Should use build tools" → Response: Zero-dependency goal is priority
- "Performance concerns" → Response: Will measure and pivot if needed

**FREEZE WINDOW**: Until Stage 6 complete (estimated 4 hours)  
**REOPEN TRIGGERS**:
1. Performance < 30fps
2. Memory > 500MB
3. File size > 10MB
4. Build time > 8 hours

**APPROVED**: Proceed with staged assembly

---

END LOG
