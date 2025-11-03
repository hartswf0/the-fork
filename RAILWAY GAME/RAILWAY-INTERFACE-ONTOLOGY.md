# Railway Junction - Interface Ontology & Architecture Manual

**Version:** 1.0  
**Date:** 2025-11-03  
**Purpose:** Comprehensive guide to interface zones, controls, and architectural patterns

---

## 1. GLOBAL FRAME ARCHITECTURE

### 1.1 Fixed Layers (Z-Index Hierarchy)
```
Z-100: Corner Buttons (◎ ? ⇆ ＋)
Z-90:  Corner Menus (overlays)
Z-50:  Global Header Bar (sticky top)
Z-50:  Global Footer Bar (sticky bottom)
Z-10:  Channel Rail (left vertical)
Z-1:   Channel Columns (scrollable)
```

### 1.2 Global Header Bar
**Position:** Fixed top, always visible, non-scrollable  
**Height:** 52px + safe-area-inset-top  
**Background:** var(--panel) with bottom border  

**Contents (Left → Right):**
- **Scene Selector** (dropdown) - Current scenario mode
- **Entity Inspector** (button) - Shows all entities on grid
- **Reset View** (button) 🎥 - Camera to default overview
- **Ring Memory Export** (button) - Export timeline data
- **Spacing:** 12px gaps, centered vertically

**CSS Requirements:**
```css
.global-header {
  position: fixed;
  top: env(safe-area-inset-top);
  left: 0;
  right: 0;
  height: 52px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  gap: 12px;
  z-index: 50;
}
```

---

### 1.3 Global Footer Bar
**Position:** Fixed bottom, always visible, non-scrollable  
**Height:** 52px + safe-area-inset-bottom  
**Background:** var(--panel) with top border

**Contents (Left → Right):**
- **Import Button** - Load session data
- **Export Button** - Save session data
- **Status Indicator** - Active channel / train status
- **Fullscreen Toggle** - ⛶ button

**CSS Requirements:**
```css
.global-footer {
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  right: 0;
  height: 52px;
  background: var(--panel);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  gap: 12px;
  z-index: 50;
}
```

**CRITICAL:** Footer must never collapse or be scrollable. Always visible.

---

### 1.4 Corner Buttons (4 Corners)
**Purpose:** Quick access to system-wide actions  
**Size:** 48×48px  
**Z-Index:** 100 (above everything)

**Layout:**
```
◎ (Key)              ? (Help)
[TOP-LEFT]           [TOP-RIGHT]

⇆ (Exchange)         ＋ (Add)
[BOTTOM-LEFT]        [BOTTOM-RIGHT]
```

**Safe Areas:**
- Top: 16px + env(safe-area-inset-top)
- Bottom: 16px + env(safe-area-inset-bottom)
- Left: 16px + env(safe-area-inset-left)
- Right: 16px + env(safe-area-inset-right)

---

## 2. CHANNEL MANAGEMENT SYSTEM

### 2.1 Channel Number Rail (Vertical Left)
**Inspired by:** thousand-tetrad-00.html  
**Position:** Fixed left, scrollable vertically  
**Width:** 32px  
**Z-Index:** 10

**Features:**
- Shows channel numbers (1, 2, 3...)
- Active channel highlighted (accent glow)
- Click to navigate to channel
- Shows parent→child lineage (dual borders)
- Add channel button at bottom (dashed circle)

**CSS:**
```css
.channel-number-rail {
  position: fixed;
  left: env(safe-area-inset-left);
  top: calc(52px + env(safe-area-inset-top)); /* Below header */
  bottom: calc(52px + env(safe-area-inset-bottom)); /* Above footer */
  width: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  overflow-y: auto;
  z-index: 10;
  background: var(--panel-dark);
  border-right: 1px solid var(--border);
}
```

### 2.2 Channel Navigation Functions
**From thousand-tetrad-00.html:**

```javascript
function focusChannel(channelId) {
  // 1. Dim all other channels (opacity 0.4)
  // 2. Highlight active (accent glow, opacity 1)
  // 3. Scroll into view (smooth)
  // 4. Update rail indicator
}

function renderTimeline() {
  // 1. Populate channel number rail
  // 2. Show parent→child lineage lines
  // 3. Highlight current channel
}
```

---

## 3. CHANNEL COLUMN ANATOMY

### 3.1 Column Structure (Top → Bottom)
```
┌─────────────────────────┐
│ Channel Header          │ ← 52px, flex-shrink: 0
├─────────────────────────┤
│ Train Viewport (3D)     │ ← Resizable (200px-800px)
│ [Grid overlaid on 3D]   │
├─────────────────────────┤
│ Resize Bar              │ ← 6px, draggable
├─────────────────────────┤
│ Chat Section            │ ← flex: 1 (fills remaining)
│ [Message stream]        │
├─────────────────────────┤
│ Channel Footer (Input)  │ ← 60px, flex-shrink: 0
└─────────────────────────┘
```

### 3.2 Channel Header Controls
**Height:** 52px (matches global bars)  
**Background:** var(--panel)  
**Border:** Bottom 1px

**Contents:**
- Scenario dropdown (current mode)
- Camera mode buttons (overview, side, top, etc.)
- Entity perspective button (✦)
- Collapse button (›)

**Alignment:** All controls vertically centered, 12px gaps

---

### 3.3 Train Viewport (3D Scene + Grid)
**Default Height:** 450px  
**Min Height:** 200px  
**Max Height:** 800px (expandable beyond with dynamic grid scaling)

**DYNAMIC GRID SCALING:**
When user drags divider past 800px:
- Grid cells scale proportionally (5m × 5m base)
- Entity markers scale to maintain visibility
- Camera adjusts FOV to show full grid
- Grid remains 9×9 cells (spatial consistency)

**Implementation:**
```javascript
function updateGridScale(viewportHeight) {
  const baseHeight = 450;
  const scale = Math.max(1, viewportHeight / baseHeight);
  
  // Scale grid cells
  gridCells.forEach(cell => {
    cell.scale.set(scale, 1, scale);
  });
  
  // Adjust camera
  camera.position.y = 15 * scale;
  camera.position.z = 15 * scale;
}
```

---

### 3.4 Resize Bar
**Height:** 6px  
**Cursor:** row-resize  
**Touch:** touch-action: none

**Drag Logic:**
- Mouse down → start drag
- Mouse move → resize viewport
- Mouse up → stop drag
- Update grid scale if > 800px

---

### 3.5 Chat Section
**Flex:** 1 (fills remaining space)  
**Min Height:** 100px  
**Overflow:** auto (vertical scroll)

**Contents:**
- Message dots (chat history)
- Entity thought bubbles
- System notifications

---

### 3.6 Channel Footer (Input Area)
**Height:** 60px  
**Position:** Bottom of channel column  
**Background:** var(--panel)

**CRITICAL FIX NEEDED:**
- Input controls must not fall into panels below
- Must have proper z-index and positioning
- Must respect channel bounds

**Contents:**
- Text input (flex: 1)
- Send button (40×40px)

---

## 4. CAMERA SYSTEM

### 4.1 Camera Modes (10 Total)
**From memory "Camera Command System":**

1. **overview** - Wide view of entire scene
2. **side** - Side perspective of tracks
3. **top** - Bird's eye view from above
4. **track** - Ground level on tracks
5. **follow** - Camera follows the train
6. **entity [name]** - View from entity's perspective
7. **print** - Inside Print car (McLuhan media)
8. **radio** - Inside Radio car
9. **tv** - Inside TV car
10. **internet** - Inside Internet car

### 4.2 Camera UX Integration

**Option A: Header Bar Buttons**
Add camera mode switcher to channel header:
```
[🎥▼] Overview  [Reset View]
```

**Option B: Context-Driven Auto-Switch**
- User forks entity POV → auto-switch to entity camera
- User @mentions entity → offer "View POV" button
- Train reaches junction → switch to track camera

**Option C: Command + Button Hybrid**
- Keep `/camera [mode]` commands for power users
- Add dropdown in header for visual selection
- Add "Reset View" button (always returns to overview)

### 4.3 Reset View Button
**Location:** Global header bar (top right section)  
**Label:** 🎥 Reset View  
**Action:** Camera.position.set(0, 15, 15), lookAt(0, 0, 0)  
**Tooltip:** "Return to overview camera (default)"

---

## 5. GRID VISIBILITY MANDATE

### 5.1 Grid Overlay System
**The grid is overlaid on the 3D scene, NOT a separate section.**

**Rendering:**
- 9×9 grid of cells (3D planes with transparent material)
- Entity markers (3D cones) above cells
- Grid lines (subtle, teal color)
- Cell highlighting (when train passes)

### 5.2 Visibility Rules
1. Grid must always be visible when viewport is visible
2. When divider dragged down, grid scales proportionally
3. When divider dragged up (< 200px), grid cells shrink
4. Entity labels remain readable at all scales (min 10px font)

### 5.3 Dynamic Scaling Formula
```javascript
const gridScale = Math.min(2.0, Math.max(0.5, viewportHeight / 450));
// Scale: 0.5x at 225px, 1.0x at 450px, 2.0x at 900px
```

---

## 6. CIRCULAR TRACK OVERLAYS

### 6.1 Dual Ring System
**Outer Ring:** Channel flow (parent → child → fork)  
**Inner Ring:** Entity memory (recent interactions)

**Visual:**
- Outer ring: 80px radius, 4px stroke
- Inner ring: 60px radius, 2px stroke
- Intersection highlight when POV fork active

**Position:** Top-right corner of viewport  
**Opacity:** 0.6 (subtle, non-intrusive)

---

## 7. SUBMENU ONTOLOGY

### 7.1 Entity Perspective Overlay
**Trigger:** Click ✦ button in channel header  
**Display:** Modal overlay (z-index: 200)

**Contents:**
- List all entities on current grid
- Each entity row: [Name] [🔀 FORK] [💭 CHAT] [✕ DELETE]
- Backdrop blur: backdrop-filter: blur(8px)

### 7.2 Tetrad Decision Panel
**Trigger:** Train reaches junction on entity  
**Display:** Inline panel in chat section

**Contents:**
- Entity name + type
- Four track options:
  - Enhance (green)
  - Reverse (red)
  - Retrieve (blue)
  - Obsolesce (gray)
- Spatial awareness (surrounding entities)

### 7.3 Media Car Menus
**Trigger:** Camera inside media car OR `/camera [print|radio|tv|internet]`  
**Display:** Contextual overlay in viewport

**Contents:**
- Car-specific UI (vintage radio dials, TV knobs, etc.)
- McLuhan quotes relevant to media era
- Exit button to return to overview

---

## 8. TRIAGE PRIORITIES (Ordered)

### Priority 1: CRITICAL LAYOUT FIXES
- ✅ Fix footer bar collapse (always visible, sticky)
- ✅ Fix header alignment (consistent spacing)
- ✅ Prevent chat button from falling into panels

### Priority 2: NAVIGATION INFRASTRUCTURE
- ⬜ Add channel number rail (left vertical)
- ⬜ Implement focusChannel() auto-scroll
- ⬜ Add parent→child lineage visualization

### Priority 3: GRID EXPANSION
- ⬜ Allow divider to drag beyond 800px
- ⬜ Implement dynamic grid scaling
- ⬜ Maintain entity visibility at all scales

### Priority 4: CAMERA UX
- ⬜ Add "Reset View" button to header
- ⬜ Surface camera mode buttons (dropdown)
- ⬜ Auto-switch on POV fork

### Priority 5: CONSISTENCY & POLISH
- ⬜ Standardize spacing (12px gaps everywhere)
- ⬜ Match header/footer heights (52px)
- ⬜ Improve corner button visual separation

---

## 9. CSS VARIABLE SYSTEM

### 9.1 Standardized Spacing
```css
:root {
  --header-height: 52px;
  --footer-height: 52px;
  --rail-width: 32px;
  --corner-btn-size: 48px;
  --corner-btn-offset: 16px;
  --panel-gap: 12px;
  --border-width: 1px;
  --viewport-default: 450px;
  --viewport-min: 200px;
  --viewport-max: 800px;
}
```

### 9.2 Safe Area Integration
All fixed elements must respect safe areas:
```css
top: calc(var(--header-height) + env(safe-area-inset-top));
bottom: calc(var(--footer-height) + env(safe-area-inset-bottom));
left: calc(var(--rail-width) + env(safe-area-inset-left));
right: calc(0px + env(safe-area-inset-right));
```

---

## 10. THOUSAND-TETRAD PATTERNS TO ADOPT

### 10.1 Channel Rail
- Vertical navigation (left side)
- Number indicators (1, 2, 3...)
- Active highlighting (accent glow)
- Parent→child lineage lines

### 10.2 Focus Animation
- Dim inactive channels (opacity 0.4)
- Glow active channel (box-shadow)
- Smooth scroll-into-view (100ms delay)

### 10.3 Fork Lineage Visualization
- Dual-border on child channels
- Colored orb flies from parent to child (0.8s)
- Lineage label in header ("Forked from Channel 2")

### 10.4 Collapsed Channel Expand Tab
- Shows › arrow + green dot
- Hover effects (brightness increase)
- Click to expand back
- Channel number/name visible on tab

---

## 11. RESPONSIVE BEHAVIOR

### 11.1 Mobile (< 480px)
- Channel columns: 100vw width
- Header: smaller font (10px)
- Footer: compact buttons (32×32px)
- Corner buttons: 40×40px
- Grid: auto-scale to fit

### 11.2 Tablet (480px - 1024px)
- Channel columns: 420px width
- Standard sizing
- Horizontal scroll between channels

### 11.3 Desktop (> 1024px)
- Multiple channels visible side-by-side
- Channel rail more prominent (40px)
- Larger corner buttons (56×56px)

---

## 12. ACCESSIBILITY REQUIREMENTS

### 12.1 Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys to navigate channels
- Escape to close menus/overlays

### 12.2 Screen Reader Support
- Proper ARIA labels on all buttons
- Role attributes on custom controls
- Live regions for status updates

### 12.3 Touch Targets
- Minimum 44×44px touch targets
- 8px spacing between targets
- Hover states for desktop
- Active states for touch

---

## 13. PERFORMANCE CONSIDERATIONS

### 13.1 Grid Rendering
- Use instanced meshes for cells (not individual)
- LOD (Level of Detail) for entity markers
- Cull off-screen entities
- Limit particle effects (< 100 active)

### 13.2 Animation Budget
- Max 60fps target
- RequestAnimationFrame for all animations
- Throttle resize events (16ms)
- Debounce search/filter (300ms)

### 13.3 Memory Management
- Dispose Three.js objects on channel close
- Clear unused textures
- Limit message history (< 1000 per channel)

---

## 14. ERROR STATES & FEEDBACK

### 14.1 Grid States
- **Loading:** Cellular automata animation on cells
- **Empty:** "No entities. Add one to begin."
- **Collision:** Red flash on affected cells
- **Junction:** Gold pulse on entity cell

### 14.2 Camera States
- **Moving:** Smooth transition (0.5s ease)
- **Reset:** Quick snap (0.2s)
- **Follow:** Continuous tracking (60fps)
- **Locked:** Grayscale filter, "POV Locked" label

---

## 15. TESTING CHECKLIST

### Visual Consistency
- [ ] Header and footer same height (52px)
- [ ] All gaps consistent (12px)
- [ ] Corner buttons aligned to safe areas
- [ ] Channel rail visible on all screens

### Interaction
- [ ] Divider drags smoothly
- [ ] Grid scales beyond 800px
- [ ] Reset View returns to overview
- [ ] Footer never collapses

### Navigation
- [ ] Channel rail numbers clickable
- [ ] Active channel highlighted
- [ ] Scroll between channels works
- [ ] Fork creates child with lineage

### Camera
- [ ] All 10 modes accessible
- [ ] Reset View button works
- [ ] Auto-switch on POV fork
- [ ] Smooth transitions

---

**END OF MANUAL**

*This document should be updated as new patterns emerge and requirements change.*
