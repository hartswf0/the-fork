# 🧪 Quick Test Guide: Entity Perspectives + Hamlet Mode

## ⚡ **5-MINUTE TEST**

### **Test 1: Hamlet Mode Auto-Population** (1 min)
```
1. Open railway-full-integration.html
2. Click dropdown → Select "Hamlet Mode (7-sec)"
3. Wait 2 seconds
4. ✅ CHECK: Do you see 4 entities on grid?
   - Paul (Best Friend) at (4,3)
   - Max (Dog) at (4,4)
   - Lisa (Scientist) at (4,5)
   - Grandmother at (4,7)
5. ✅ CHECK: Does chat show trolley problem description?
```

**If entities DON'T appear:**
- Open console (F12)
- Look for: "⚠️ AI did not return entities"
- Check: `finish_reason` in console logs
- Likely: Rate limit (wait 30 seconds, try again)

---

### **Test 2: Fork from Entity Perspective** (2 min)
```
1. Click ✦ button in footer (bottom-right)
2. Panel opens showing all entities
3. Click [🔀 FORK] next to "Paul (Best Friend)"
4. ✅ CHECK: New channel appears named "Paul (Best Friend) POV"
5. ✅ CHECK: Grid shows same 4 entities
6. Type: "What are you thinking right now?"
7. ✅ CHECK: AI responds as Paul in first person
   Example: "I'm terrified. The train is coming..."
```

**If fork doesn't work:**
- Check console for errors
- Verify `forkFromEntityPerspective()` function exists
- Try clicking a different entity

---

### **Test 3: Delete Entity** (1 min)
```
1. Open ✦ panel again (in main channel, not fork)
2. Click [✕ DELETE] next to "Max (Dog)"
3. Confirm deletion
4. ✅ CHECK: Max disappears from 3D grid
5. ✅ CHECK: Notification shows "🗑️ Deleted: Max (Dog)"
6. Open ✦ panel again
7. ✅ CHECK: Max no longer in list (only 3 entities)
```

---

### **Test 4: Chat with Entity** (1 min)
```
1. In main channel
2. Type: "@Grandmother what do you see?"
3. ✅ CHECK: AI responds as Grandmother
4. ✅ CHECK: Thought bubble appears above Grandmother on grid
```

---

## 🐛 **COMMON ISSUES**

### **Issue: "⚠️ AI did not return entities (no JSON block)"**
**Cause:** Rate limiting or vague prompt  
**Fix:** 
- Wait 30 seconds between requests
- Check console for `finish_reason: 'length'`
- Try: "add a dog at row 3, col 3" (specific command)

---

### **Issue: Hamlet mode text appears but no entities on grid**
**Cause:** AI returned narrative without JSON block  
**Fix:**
- Check console: Look for "✅ Found JSON block" or "⚠️ No JSON block"
- If no JSON: AI ignored instruction (rate limit or model issue)
- Manually add: "add entities for hamlet mode"

---

### **Issue: Fork button doesn't create new channel**
**Cause:** JavaScript error or entity not found  
**Fix:**
- Open console, check for red errors
- Verify entity exists: Type "show grid"
- Try refreshing page and re-adding entities

---

### **Issue: Delete button removes entity but it reappears**
**Cause:** Entity state not properly cleared  
**Fix:**
- Type "clear grid" to reset
- Refresh page
- Report bug if persists

---

## 📋 **EXPECTED CONSOLE OUTPUT**

### **Successful Hamlet Mode Setup:**
```
📋 SCENARIO: Switched to: hamlet_trolley
🔮 Composing scene...
📦 Full API Response: {status: 200, choices: 1, finish_reason: 'stop', ...}
🤖 AI Response: [full text]
📏 Response Length: 847 chars
✅ Found JSON block: {"entities":[...]}
📍 Processing 4 entity actions
✨ Added 4
```

### **Successful Fork:**
```
🔀 FORK: Created entity perspective fork: Paul (Best Friend)
✦ TETRAD: Opened perspective selector (4 entities)
```

### **Successful Delete:**
```
🗑️ DELETE: Removed Max (Dog) from panel
🗑️ REMOVE: Removed: Entity "Max (Dog)" from (4,4)
```

---

## 🎯 **SUCCESS CRITERIA**

| Feature | Status |
|---------|--------|
| Hamlet mode auto-populates | ✅ / ❌ |
| 4 entities appear on grid | ✅ / ❌ |
| Tetrad panel shows entities | ✅ / ❌ |
| Fork button creates POV channel | ✅ / ❌ |
| AI responds as entity in fork | ✅ / ❌ |
| Delete button removes entity | ✅ / ❌ |
| Notification appears on delete | ✅ / ❌ |
| @mention works for entities | ✅ / ❌ |

**If 6+ are ✅:** System working correctly  
**If 3-5 are ✅:** Partial success, check console  
**If <3 are ✅:** Major issue, review implementation

---

## 🔧 **DEBUG COMMANDS**

```javascript
// In browser console:

// Check if entities exist
const channel = Array.from(appState.channels.values())[0];
const entities = appState.gridEntities.get(channel.id);
console.log('Entities:', entities);

// Check grid cells
console.log('Grid cells:', channel.gridCells.filter(c => c.entity));

// Force hamlet setup
sendMessageWithLEGOS(channel, 'fill in hamlet mode');

// List all channels
console.log('Channels:', Array.from(appState.channels.values()).map(c => c.name));

// Check if fork function exists
console.log('Fork function:', typeof forkFromEntityPerspective);
```

---

## 📞 **WHAT TO REPORT IF BROKEN**

1. **Which test failed:** (1, 2, 3, or 4)
2. **Console errors:** Copy red error messages
3. **Console output:** Copy last 20 lines
4. **What happened:** vs what you expected
5. **Can you reproduce it:** Yes/No

**Example Report:**
```
Test 2 (Fork) failed.

Console shows:
"Uncaught ReferenceError: forkFromEntityPerspective is not defined"

Expected: New channel created
Actual: Nothing happened, no error alert

Can reproduce: Yes, every time I click FORK button
```

---

## ✅ **READY TO TEST**

All fixes deployed. Open `railway-full-integration.html` and run through tests 1-4.

**Estimated time:** 5 minutes  
**Prerequisites:** OpenAI API key set  
**Network:** Required (API calls)

**Report results:** ✅ All pass / ⚠️ Partial / ❌ Failed
