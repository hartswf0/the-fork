# Canonical UI Pattern - Railway Interface Architecture

**Version:** 1.0  
**Date:** Nov 3, 2025  
**Status:** Stable - Ready for cross-project reuse

---

## Overview

This document defines the **canonical UI layout pattern** for the Railway application family, designed to be modular and reusable across multiple projects (railway-full-integration, thousand-tetrad, projection-viewer, etc.).

The pattern separates concerns into **3 architectural layers:**

1. **Corner Controls** - Fixed position buttons for global actions
2. **Channel Content** - Scrollable vertical columns with full-height layout
3. **Global Footer** - Floating scene selector that never overlaps content

---

## 1. Corner Controls (z-index: 25)

### Purpose
Global actions accessible from anywhere, never covered by other UI elements.

### Positions
- **Top-Left (◎):** API Key management
- **Top-Right (?):** Help menu & Reset Camera
- **Bottom-Left (⇆):** Import/Export session
- **Bottom-Right (＋):** Add new channel

### CSS Pattern
```css
.corner-btn {
  position: fixed;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
  box-shadow: 0 8px 24px var(--shadow);
  transition: transform 0.2s var(--transition), box-shadow 0.2s var(--transition);
  cursor: pointer;
}

.corner-btn.top-left {
  top: calc(16px + env(safe-area-inset-top));
  left: calc(16px + env(safe-area-inset-left));
}

.corner-btn.top-right {
  top: calc(16px + env(safe-area-inset-top));
  right: calc(16px + env(safe-area-inset-right));
}

.corner-btn.bottom-left {
  bottom: calc(16px + env(safe-area-inset-bottom));
  left: calc(16px + env(safe-area-inset-left));
}

.corner-btn.bottom-right {
  bottom: calc(16px + env(safe-area-inset-bottom));
  right: calc(16px + env(safe-area-inset-right));
}
```

### HTML Pattern
```html
<!-- Corner Buttons -->
<button class="corner-btn top-left" id="cornerKey" title="API Key">◎</button>
<button class="corner-btn top-right" id="cornerHelp" title="Help">?</button>
<button class="corner-btn bottom-left" id="cornerExchange" title="Import / Export">⇆</button>
<button class="corner-btn bottom-right" id="cornerAdd" title="Add Channel">＋</button>

<!-- Corner Menus -->
<div class="corner-menu" id="keyMenu" style="top: calc(72px + env(safe-area-inset-top)); left: calc(16px + env(safe-area-inset-left));">
  <!-- Menu items -->
</div>
```

---

## 2. Channel Content (Full Height)

### Purpose
Main application content area - scrollable channels with 3D viewport, chat, and input.

### Layout Strategy
```
┌─────────────────────────────────────┐
│  Channel Header (42px padding-top)  │ ← Fixed header with controls
├─────────────────────────────────────┤
│                                     │
│  Train Viewport (450px, resizable) │ ← 3D scene canvas
│                                     │
├─────────────────────────────────────┤
│  Resize Bar (6px, draggable)       │
├─────────────────────────────────────┤
│                                     │
│  Chat Section (flex: 1)            │ ← Scrollable messages
│                                     │
├─────────────────────────────────────┤
│  Footer Separator (2px gradient)   │ ← Visual divider
├─────────────────────────────────────┤
│  Channel Footer (input area)       │ ← Text input + Send
└─────────────────────────────────────┘
      ↕
   60px padding-bottom (for global footer)
```

### CSS Pattern
```css
.channel-column {
  position: relative;
  flex: 0 0 var(--column-width);
  max-width: var(--column-width);
  height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  background: var(--panel-dark);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  overflow: hidden;
  padding-top: 42px;
  padding-bottom: 60px; /* Critical: Space for floating global footer */
  box-sizing: border-box;
  transition: flex 0.4s var(--transition), max-width 0.4s var(--transition);
}

/* Footer separation - subtle gradient line */
.footer-separator {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  flex-shrink: 0;
  margin: 0;
  opacity: 0.4;
}

/* Input area - simple and clean */
.channel-footer {
  padding: 12px 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
```

### ⚠️ Critical Rules
1. **Never remove `padding-bottom: 60px`** - This prevents global footer overlap
2. **Keep footer styling minimal** - No heavy shadows or thick borders that compete with global footer
3. **Footer separator is optional** - Can be removed if design needs to be simpler

---

## 3. Global Footer (z-index: 100)

### Purpose
Scene selector and entity inspector - floats above all content without affecting layout flow.

### Key Characteristics
- **Position:** Fixed, centered horizontally, 8px from bottom
- **Behavior:** Floats above channel content, never part of channel layout
- **Style:** Compact pill shape with subtle shadow
- **z-index:** 100 (above all channel content)

### CSS Pattern
```css
.global-footer {
  position: fixed;
  bottom: calc(8px + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--panel-dark);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.footer-tetrad-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background: var(--panel);
  color: var(--accent);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.global-scenario-select {
  background: var(--panel);
  border: 2px solid var(--border);
  color: var(--text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 12px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s var(--transition);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  flex: 1;
  min-width: 0;
  max-width: min(240px, calc(100vw - 140px));
}
```

### HTML Pattern
```html
<!-- Global Footer - Scene Selector + Tetrad Button -->
<div class="global-footer">
  <select class="global-scenario-select" id="globalScenarioSelect">
    <option value="spatial_exploration">Spatial Exploration</option>
    <option value="railyard_negotiation">Railyard Negotiation</option>
    <option value="hamlet_trolley">Hamlet Mode (7-sec)</option>
    <option value="empty">Empty Scene</option>
  </select>
  <button class="footer-tetrad-btn" id="globalTetradBtn" title="Entity Perspectives">✦</button>
</div>
```

### ⚠️ Critical Rules
1. **Always use `position: fixed`** - Never relative or absolute
2. **Never add to channel layout** - Must float independently
3. **Channels need bottom padding** - 60px minimum to prevent overlap
4. **Keep z-index at 100** - Above channels (z-index: 10) but below expand tabs (z-index: 150)

---

## 4. Expand Tab Pattern

### Purpose
Allow collapsed channels to be expanded with visible tab on right edge.

### CSS Pattern
```css
.channel-expand-tab {
  position: absolute;
  left: 52px; /* Just outside collapsed column (52px width) */
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 100px;
  background: var(--panel);
  border: 2px solid var(--border);
  border-left: none;
  border-radius: 0 8px 8px 0;
  display: none; /* Hidden by default */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  z-index: 50;
  box-shadow: 2px 0 8px var(--shadow);
  transition: all 0.2s var(--transition);
}

.channel-column.collapsed .channel-expand-tab {
  display: flex; /* Show only when collapsed */
}

.channel-expand-tab:hover {
  background: var(--accent);
}
```

### JavaScript Pattern
```javascript
expandTab.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent event bubbling
  column.classList.remove('collapsed');
  channel.collapsed = false;
  collapseBtn.textContent = '‹';
});
```

---

## 4b. Channel Header Pattern (In-Channel)

### Purpose
Provide quick access to channel controls (viewport toggle, reset, camera, fullscreen, collapse) within each channel's header.

### Layout Strategy
- **Position:** Static within channel (part of column flow)
- **Visibility:** Hidden when collapsed (opacity: 0)
- **Buttons:** ▲ (toggle viewport) ↺ (reset) ◉ (camera reset) ⛶ (fullscreen) ‹ (collapse)

### CSS Pattern
```css
/* CHANNEL HEADER */
.channel-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: stretch;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  background: var(--panel);
  flex-shrink: 0;
}

.channel-column.collapsed .channel-head {
  opacity: 0;
  pointer-events: none;
}

.channel-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--panel-dark);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 12px; /* Smaller font for tighter buttons */
  cursor: pointer;
  transition: all 0.25s var(--transition);
}
```

### Button Array
Buttons in order: **▲ ↺ ◉ ⛶ ‹**

1. **▲** - Toggle 3D viewport visibility
2. **↺** - Reset channel (clear messages and entities)
3. **◉** - Reset camera to overview position (not emoji - keeps button thin)
4. **⛶** - Toggle fullscreen mode
5. **‹** - Collapse channel to thin strip

### ⚠️ Critical: No Emoji in Buttons
Use simple unicode characters (◉ ◎ ⋔) instead of emojis (🎥 📷 🎬) to keep buttons thin and consistent.

---

## 5. Z-Index Hierarchy

Defined order from bottom to top:

```
0   - Base content (body, backgrounds)
10  - Channel elements
25  - Corner buttons
50  - Expand tabs
100 - Global footer (scene selector)
200 - [RESERVED for future use]
10000 - Modals and overlays
```

### Rule: **Never use arbitrary z-index values**
All z-index values must come from this canonical list to prevent conflicts.

### Expand Tab Positioning
The expand tab uses `left: 52px` (positioned just outside the collapsed column width) with `z-index: 50` to ensure it's visible and clickable when channels are collapsed.

---

## 6. Common Mistakes to Avoid

### ❌ Don't Do This:
```css
/* BAD: Footer as part of channel layout */
.channel-column {
  padding-bottom: 0; /* ← Missing space for global footer */
}

/* BAD: Heavy styling on channel footer */
.channel-footer {
  box-shadow: 0 -4px 12px var(--shadow); /* ← Competes with global footer */
  border-top: 2px solid var(--accent); /* ← Too heavy */
}

/* BAD: Inline expand tab display control */
expandTab.style.display = channel.collapsed ? 'flex' : 'none'; /* ← Use CSS class instead */
```

### ✅ Do This Instead:
```css
/* GOOD: Proper spacing and minimal styling */
.channel-column {
  padding-bottom: 60px; /* ← Critical for global footer clearance */
}

.channel-footer {
  padding: 12px 0;
  border-top: 1px solid var(--border); /* ← Minimal, clean */
}

/* GOOD: CSS-driven visibility */
.channel-column.collapsed .channel-expand-tab {
  display: flex;
}
```

---

## 7. Reuse Checklist

When implementing this pattern in a new project:

- [ ] Copy corner button HTML structure
- [ ] Copy corner button CSS with safe-area-inset
- [ ] Set corner button z-index to 25
- [ ] Copy global footer HTML structure
- [ ] Set global footer position: fixed, z-index: 100
- [ ] Add 60px padding-bottom to channel columns
- [ ] Keep channel footer styling minimal
- [ ] Add optional footer separator (2px gradient)
- [ ] Implement expand tab with right: -32px
- [ ] Use CSS class-based visibility for expand tab
- [ ] Test on mobile with safe-area-inset
- [ ] Verify no overlap between global footer and channel content

---

## 8. Manual Commands Pattern

### Track Switching Without API
```javascript
// Pattern: Accept both /command and plain command formats
if (lowerText === '/enhance' || lowerText === 'enhance') {
  channel.currentTrack = 'enhance';
  addMessage(channel, 'system', '↗️ ENHANCE\n\nManually switched to ENHANCE track (green).');
  renderMessages(channel);
  return;
}
```

### Standard Commands:
- `/enhance` or `enhance` - Switch to enhance track
- `/reverse` or `reverse` - Switch to reverse track  
- `/retrieve` or `retrieve` - Switch to retrieve track
- `/obsolesce` or `obsolesce` - Switch to obsolesce track
- `/camera [mode]` - Switch camera views
- `clear grid` - Remove all entities
- `remove [entity]` - Remove specific entity

---

## 9. Module Extraction Guide

To extract this UI pattern as a reusable module:

### Files to Create:
1. **railway-ui-core.css** - All canonical CSS patterns
2. **railway-ui-core.js** - DOM creation helpers
3. **railway-ui-config.js** - Color themes and variables

### Export Pattern:
```javascript
// railway-ui-core.js
export const RailwayUI = {
  createCornerButtons: () => { /* ... */ },
  createGlobalFooter: () => { /* ... */ },
  createChannelColumn: () => { /* ... */ },
  applyCanonicalStyles: () => { /* ... */ }
};
```

---

## 10. Version History

**v1.0** (Nov 3, 2025)
- Initial canonical pattern definition
- Established z-index hierarchy
- Documented corner controls, channel layout, global footer
- Added expand tab pattern
- Added manual command patterns

---

## Summary

This pattern ensures:
- ✅ **No overlap** between global footer and channel content
- ✅ **Consistent spacing** across all UI elements
- ✅ **Clear visual hierarchy** with z-index layers
- ✅ **Reusable modules** for rapid cross-project deployment
- ✅ **Mobile-ready** with safe-area-inset support
- ✅ **Accessible** with keyboard navigation and ARIA labels

**Status:** Production-ready, stable for deployment across Railway project family.
