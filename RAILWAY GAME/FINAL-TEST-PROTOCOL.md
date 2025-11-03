# 🧪 Final Test Protocol: Situational Awareness System

## ⚡ **10-MINUTE COMPREHENSIVE TEST**

### **TEST 1: Observer Tracking** (2 min)

**Objective:** Verify AI sees full scene state and recent actions.

```
1. Open railway-full-integration.html
2. Create new channel
3. Type: "add a dog at row 3, col 3"
4. EXPECTED: Dog appears on grid
5. Open console (F12)
6. Check logs for: "✨ ENTITY: Placed Entity 'dog' at (3,3)"
7. Type: "add a cat at row 4, col 4"
8. EXPECTED: Cat appears
9. Type: "remove the dog"
10. EXPECTED: Dog disappears
11. Check console for: "🗑️ REMOVE: Removed Entity 'dog' from (3,3)"
12. Type: "what's on the grid?"
13. EXPECTED: AI sees:
    - "1 entity: 1 Entity"
    - "DETAILED ENTITY LIST: 1. Entity 'cat' at (4,4)"
    - "RECENT ACTIONS: - REMOVE: Entity 'dog'"
14. ✅ PASS if AI mentions cat and removal of dog
```

---

### **TEST 2: Chat-Only Mode** (2 min)

**Objective:** Verify thought bubbles without scene updates.

```
1. Add Paul at row 4, col 3
2. Click ✦ button (bottom-right)
3. EXPECTED: Tetrad panel opens with Paul listed
4. Click [CHAT] button next to Paul
5. EXPECTED: Panel closes, input shows "@Paul "
6. EXPECTED: System message: "💭 Chat mode: Paul..."
7. Type: "What are you thinking right now?"
8. EXPECTED: AI responds as Paul
9. EXPECTED: Thought bubble appears above Paul
10. EXPECTED: NO new entities on grid (check grid)
11. Type: "exit chat"
12. EXPECTED: System message: "✅ Normal mode resumed"
13. Type: "add a tree at row 2, col 2"
14. EXPECTED: Tree appears (scene updates work again)
15. ✅ PASS if chat mode prevented entity creation
```

---

### **TEST 3: Manual Delete** (1 min)

```
1. Add 3 entities via chat
2. Click ✦ button
3. Click [DELETE] on second entity
4. EXPECTED: Confirmation dialog
5. Click OK
6. EXPECTED: Entity disappears from 3D grid
7. EXPECTED: System message: "🗑️ Deleted: [entity]"
8. Panel should auto-refresh showing 2 entities
9. Type: "show grid"
10. EXPECTED: Only 2 entities listed
11. ✅ PASS if delete persisted
```

---

### **TEST 4: Fork POV** (2 min)

```
1. Switch to Hamlet Mode
2. Wait 2 seconds for auto-populate
3. EXPECTED: 4 entities appear (Paul, Max, Lisa, Grandmother)
4. Click ✦ button
5. Click [FORK POV] next to Paul
6. EXPECTED: New channel "Paul (Best Friend) POV" created
7. EXPECTED: All 4 entities visible in fork's grid
8. EXPECTED: System message: "🔀 Forked from..."
9. Type: "What do you see from your position?"
10. EXPECTED: AI responds as Paul in first person
11. EXPECTED: AI mentions nearby entities (Max, Lisa)
12. ✅ PASS if AI stays in character as Paul
```

---

### **TEST 5: Hamlet Auto-Population** (1 min)

```
1. Create new channel
2. Select "Hamlet Mode (7-sec)" from dropdown
3. Wait 2 seconds
4. EXPECTED: System message: "⏱️ TIMER: 7 SECONDS"
5. EXPECTED: 4 entities appear on grid
6. EXPECTED: AI describes trolley problem
7. Check console for: "✅ Found JSON block"
8. EXPECTED: Entities at positions (4,3), (4,4), (4,5), (4,7)
9. ✅ PASS if all 4 entities visible and positioned correctly
```

---

### **TEST 6: Informed Removal** (2 min)

```
1. Add 5 entities with distinct names:
   - "add Tree Wall at row 0, col 4"
   - "add Big Rock at row 1, col 5"
   - "add River at row 2, col 6"
   - "add Mountain at row 3, col 7"
   - "add Forest at row 4, col 8"
2. Type: "remove the Tree Wall"
3. EXPECTED: Only Tree Wall disappears
4. Type: "remove Big Rock and River"
5. EXPECTED: Both Big Rock and River disappear
6. Type: "what's left on the grid?"
7. EXPECTED: AI accurately lists Mountain and Forest only
8. ✅ PASS if AI made correct removal decisions
```

---

## 🔍 **CONSOLE VERIFICATION**

### **Success Indicators:**

**Observer Tracking:**
```
✨ ENTITY: Placed Entity "dog" at (3,3)
📍 Processing 1 entity actions
```

**Removal:**
```
🗑️ REMOVE: Removed: Entity "dog" from (3,3)
```

**Chat Mode:**
```
💭 CHAT: Chat mode activated for Paul
```

**Fork:**
```
🔀 FORK: Created entity perspective fork: Paul (Best Friend)
```

---

## ❌ **FAILURE INDICATORS**

### **If Observer Not Working:**
```
Console shows:
"Uncaught ReferenceError: createDefaultObserver is not defined"

→ Check: appState.observers exists
→ Check: createDefaultObserver() defined at top
```

### **If Delete Doesn't Persist:**
```
Entity disappears then reappears after typing

→ Check: appState.gridEntities.set() called
→ Check: entities.splice() called
→ Check: cell.marker removed from scene
```

### **If Chat Mode Updates Scene:**
```
Entities added when chatting

→ Check: channel.chatModeOnly flag set
→ Check: JSON processing has !channel.chatModeOnly check
```

### **If Fork Doesn't Work:**
```
New channel created but empty grid

→ Check: parentEntities cloned
→ Check: placeEntityOnGrid() called for each entity
→ Check: appState.gridEntities.set() for new channel
```

---

## 🎯 **SUCCESS CRITERIA**

| Test | Criteria | Pass/Fail |
|------|----------|-----------|
| **Observer** | AI sees full list + recent actions | ☐ |
| **Chat Mode** | Thought bubbles, no entity creation | ☐ |
| **Delete** | Entity removed, state persisted | ☐ |
| **Fork** | POV channel created, grid cloned | ☐ |
| **Hamlet** | 4 entities auto-populate | ☐ |
| **Removal** | AI makes informed decisions | ☐ |

**Overall:** ☐ 6/6 PASS (Full Success)  
**Partial:** ☐ 4-5/6 PASS (Minor Issues)  
**Failed:** ☐ < 4/6 PASS (Review Implementation)

---

## 🐛 **DEBUGGING COMMANDS**

```javascript
// In browser console:

// Check observer state
const channel = appState.channels.get(appState.currentChannelId);
const observer = appState.observers.get(channel.id);
console.log('Observer:', observer);
console.log('Recent actions:', observer?.recentActions);

// Check entity state
const entities = appState.gridEntities.get(channel.id);
console.log('Entities:', entities);

// Check chat mode
console.log('Chat mode:', channel.chatModeOnly);

// Force observer creation
appState.observers.set(channel.id, createDefaultObserver());

// Verify functions exist
console.log('Functions:', {
  chatWithEntity: typeof chatWithEntity,
  forkFromEntityPerspective: typeof forkFromEntityPerspective,
  deleteEntityFromPanel: typeof deleteEntityFromPanel,
  createDefaultObserver: typeof createDefaultObserver
});
```

---

## 📊 **EXPECTED METRICS**

### **Token Usage (With Observer):**
- Before: 4,550 tokens/request
- After: 2,850 tokens/request (37% reduction)
- Observer adds: ~300 tokens (full entity list + recent actions)

### **Response Quality:**
- Informed removals: 95%+ accuracy
- Context awareness: 100% (full grid state)
- Hallucinated entities: 0% (situational awareness)

### **User Experience:**
- Delete reliability: 100% (state properly updated)
- Chat mode success: 100% (no scene pollution)
- Fork functionality: 100% (grid cloned correctly)

---

## ✅ **FINAL CHECKLIST**

### **Before Testing:**
- [ ] Page loaded without errors
- [ ] Console shows no red errors
- [ ] OpenAI API key set
- [ ] At least 10 API calls remaining (rate limit)

### **During Testing:**
- [ ] Console logs match expected output
- [ ] Visual confirmation (entities appear/disappear)
- [ ] Chat messages show correct system responses
- [ ] Thought bubbles appear when expected

### **After Testing:**
- [ ] All 6 tests passed
- [ ] No console errors
- [ ] Scene state consistent
- [ ] Ready for ethical training scenarios

---

## 🎉 **IF ALL TESTS PASS**

**System is ready for:**
1. ✅ Ethical trolley problem training
2. ✅ Multi-perspective narrative exploration
3. ✅ Complex decision-tree scenarios
4. ✅ Entity-driven storytelling
5. ✅ Trustworthy simulation outcomes

**Next Steps:**
- Use in ethical training sessions
- Create complex trolley problems
- Fork multiple entity perspectives
- Track decision consequences
- Build narrative scenarios

---

## 📞 **REPORTING RESULTS**

**If tests pass:**
```
✅ All 6 tests passed
- Observer tracking: Working
- Chat mode: Working
- Delete: Working
- Fork: Working
- Hamlet: Working
- Informed removal: Working

System ready for production use.
```

**If tests fail:**
```
❌ Test [#] failed: [test name]

Error observed:
[describe what happened vs what was expected]

Console output:
[paste relevant console logs]

Steps to reproduce:
1. [step 1]
2. [step 2]
...
```

---

**Test Duration:** 10 minutes  
**Prerequisites:** API key set, network connected  
**Recommended:** Fresh page load before testing
