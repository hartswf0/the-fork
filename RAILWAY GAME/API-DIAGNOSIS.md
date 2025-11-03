# 🔍 API DIAGNOSIS & HAMLET MODE

## ✅ WHAT'S WORKING:

### 1. **OpenAI API Connected** ✅
Your session shows:
```
User: "mKW KE A DOG JUMP"
AI: "I'm sorry, but I'm unable to understand..."

User: "ADD A DOG IN FRONT OF THE TRACK"
AI: "Understood. A dog has been added..."
```

**API is connected and responding!**

---

## ⚠️ WHAT'S NOT WORKING:

### 1. **LEGOS Entity Extraction** ❌

**Problem:** AI responds but doesn't add entities to grid

**Your session showed:**
```
AI: "A dog has been added in front of the track"
Grid: (no dog entity appeared)

Then:
🚦 JUNCTION: Reached Location "Track"
```

**Why:** AI isn't returning JSON format consistently

---

## 🔧 FIXES APPLIED:

### 1. **Improved System Prompt**

**Before:**
```
Respond naturally, then add a JSON block...
```

**After:**
```
CRITICAL: You MUST ALWAYS include a JSON block in EVERY response.

EXAMPLE 1:
User: "Add a dog in front of the track"
Response: A dog has appeared on the track!

```json
{
  "entities": [
    {"type": "Entity", "row": 3, "col": 4, "label": "Dog"},
    {"type": "Obstacle", "row": 3, "col": 5, "label": "Track blocked"}
  ]
}
```

Grid is 9×9 (rows 0-8, cols 0-8). 
ALWAYS include the JSON block.
```

**Changes:**
- ✅ More forceful language ("CRITICAL", "MUST ALWAYS")
- ✅ Concrete examples with exact format
- ✅ Shows multiple entity types
- ✅ Emphasizes grid coordinates

---

### 2. **Added Debug Logging**

**New console output:**
```javascript
console.log('🤖 AI Response:', assistantMsg);
// Shows full AI response

console.log('✅ Found JSON block:', jsonMatch[1]);
// Shows extracted JSON

console.log('📍 Placing', jsonData.entities.length, 'entities');
// Shows how many entities

console.warn('⚠️ No JSON block found in response');
// Warns if AI didn't include JSON
```

**Also shows in chat:**
```
✨ Added 2 entities to grid
```
or
```
⚠️ AI did not return entities (no JSON block)
```

---

## 🧪 HOW TO TEST:

### 1. **Refresh Page**

### 2. **Open Browser Console** (F12)

### 3. **Type Message:**
```
add a treasure chest and a locked gate
```

### 4. **Check Console:**
```
🤖 AI Response: (full response)
✅ Found JSON block: {...}
📍 Placing 2 entities
```

### 5. **Check Grid:**
- Gold cone (Goal: Treasure)
- Red cone (Obstacle: Gate)

---

## 🎭 HAMLET MODE (Trolley Problem)

### **Question:** "do we have hamlet mode available?"

**Answer:** ❌ **Not Yet**

**What is Hamlet Mode:**
From `thousand-tetrad.html`:
- Trolley problem scenario
- Lever that diverts train
- 7-second timer
- Must choose between 2 tracks
- "Names debts 40 tons"

**From index.html:**
```
The Lever
Hamlet mode trolley problem. Names debts 40 tons. Seven seconds.
```

**To Add Hamlet Mode:**
1. Create timer (7 seconds)
2. Forced binary choice (A or B track)
3. Weight visualization (40 tons metaphor)
4. No pause - must decide quickly
5. Entities on both tracks show consequences

**Current vs. Hamlet:**

| Feature | Current | Hamlet Mode |
|---------|---------|-------------|
| Choices | 4 tracks (LEGOS) | 2 tracks (binary) |
| Time | Unlimited | 7 seconds |
| Pause | Yes (train stops) | No (keeps moving) |
| Stakes | Spatial entities | Moral weight |
| Style | Exploration | Dilemma |

---

## 🎯 NEXT STEPS:

### **Immediate (for LEGOS):**
1. ✅ Improved prompt (done)
2. ✅ Debug logging (done)
3. ⏳ Test with new messages
4. ⏳ Verify entities appear on grid

### **Future (for Hamlet Mode):**
1. Add timer countdown
2. Create binary track split
3. Add weight/consequence system
4. Force immediate decision
5. Show outcome after choice

---

## 📊 API STATUS SUMMARY:

| Component | Status | Notes |
|-----------|--------|-------|
| OpenAI Connection | ✅ Working | Responds to messages |
| Text Responses | ✅ Working | AI generates natural text |
| JSON Extraction | ⚠️ Partial | Needs better prompt |
| Entity Placement | ⚠️ Partial | Depends on JSON |
| Grid Detection | ✅ Working | Train finds entities |
| Junction Triggering | ✅ Working | Pauses at entities |
| Inline Buttons | ✅ Working | Switches tracks |
| Hamlet Mode | ❌ Not Built | Requires new feature |

---

## 🔍 DIAGNOSTIC CHECKLIST:

When you send a new message, check:

**In Console:**
- [ ] `🤖 AI Response:` appears
- [ ] `✅ Found JSON block:` appears
- [ ] `📍 Placing X entities` appears
- [ ] No `⚠️ No JSON block` warning

**In Chat:**
- [ ] AI message appears
- [ ] `✨ Added X entities to grid` appears
- [ ] No `⚠️ AI did not return entities` warning

**On Grid:**
- [ ] Colored cones appear (gold/red/green)
- [ ] Train eventually reaches them
- [ ] Junction message triggers

**If any fail:**
1. Check console for full AI response
2. Verify JSON format matches examples
3. May need to refine prompt further

---

## 💡 TRY THESE PROMPTS:

**Should Work Now:**
```
1. "create a goal: rescue the princess"
   → Should place gold cone (Goal)

2. "add a dragon blocking the path"
   → Should place red cone (Obstacle)

3. "give me a sword to fight the dragon"
   → Should place green cone (Solution)

4. "I need to cross a bridge but it's broken"
   → Should place: Goal (far side), Obstacle (bridge), Solution (repair kit)
```

**Check Console After Each:**
- See if JSON block appears
- Verify entities placed
- Watch train move to them

---

END API DIAGNOSIS
