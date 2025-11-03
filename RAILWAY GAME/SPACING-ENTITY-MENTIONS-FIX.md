# ✅ SPACING FIX + @ ENTITY MENTIONS

## 🎯 ISSUES FIXED:

### 1. **Corner Buttons Overlapping Content** ❌ → ✅
**Problem:** Bottom corner buttons covering chat input, top buttons covering header

**Solution:** Added proper padding to channel columns

```css
.channel-column {
  height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  padding-top: 72px;    /* ← Space for top corner buttons */
  padding-bottom: 72px; /* ← Space for bottom buttons + global footer */
  box-sizing: border-box;
}
```

**Result:** Clear space around all corners, no overlap

---

### 2. **@ Entity Mentions for Perspective** ❌ → ✅
**Problem:** No way to address specific entities in Railyard mode

**Solution:** Added @ mention parsing

```javascript
// Check for @ mentions
const mentionMatch = userText.match(/@(\w+)/);
if (mentionMatch) {
  const entityName = mentionMatch[1];
  entityContext = `\n\nNOTE: User is addressing "${entityName}" specifically. Respond AS this entity in character.`;
}

// Append to system instruction
content: SCENARIOS[channel.scenario].systemInstruction + entityContext
```

**Result:** Can now chat directly with specific entities!

---

## 🎬 HOW IT WORKS NOW:

### **Corner Button Spacing:**

**Before:**
```
┌────────────────────┐
│ ◎         ?        │ ← Overlapping header
├────────────────────┤
│ [Content]          │
│                    │
├────────────────────┤
│ [Input] ⇆         │ ← Overlapping input!
└────────────────────┘
```

**After:**
```
┌────────────────────┐
│ ◎         ?        │ ← 72px padding-top
│                    │
├────────────────────┤
│ [Content]          │
│                    │
├────────────────────┤
│ [Input]            │
│ ⇆                  │ ← 72px padding-bottom
│ [Scene Select]     │
└────────────────────┘
```

---

## 💬 @ ENTITY MENTIONS:

### **How to Use:**

1. **Create entity:**
   ```
   User: "add a dragon guarding treasure"
   AI: Places dragon on grid
   ```

2. **Address entity directly:**
   ```
   User: "@Dragon give me the treasure"
   AI as Dragon: "Never! This is MY hoard!" [REFUSED]
   ```

3. **Negotiate:**
   ```
   User: "@Dragon I'll trade you a magic sword"
   AI as Dragon: "Hmm, interesting... show me this sword first." [COUNTER-OFFER]
   ```

---

### **Works Best With:**

**Railyard Negotiation Mode:**
- Entities have personalities
- They respond IN CHARACTER
- Can AGREE, REFUSE, or COUNTER-OFFER

**Entity Dialogue Mode:**
- 2-way conversations
- Entities track mood/trust
- Remember past interactions

---

## 📋 EXAMPLES:

### **Example 1: Railyard Negotiation**
```
1. Select "Railyard Negotiation" from dropdown
2. Type: "create a guard and a merchant"
3. AI places both entities

4. Type: "@Guard let me pass"
   AI as Guard: "Not without proper authorization!" [REFUSED]

5. Type: "@Merchant I need weapons"
   AI as Merchant: "I have swords. 100 gold each." [COUNTER-OFFER: 100g]

6. Type: "@Merchant that's too expensive, 70 gold"
   AI as Merchant: "80 gold, final offer." [COUNTER-OFFER: 80g]

7. Type: "@Merchant deal"
   AI as Merchant: "Pleasure doing business." [AGREED]
```

---

### **Example 2: Entity Perspective**
```
User: "add a dog and a cat"
AI: Places both on grid

User: "@Dog what do you think of the cat?"
AI as Dog: "Woof! That cat is suspicious... always watching me!" 

User: "@Cat what about the dog?"
AI as Cat: "That loud beast? Merely tolerated for now." *flicks tail*
```

---

### **Example 3: Multi-Entity Conversation**
```
User: "create Station Master, Guard, and Traveler"
AI: Places 3 entities

User: "@StationMaster I need a ticket"
StationMaster: "Platform 9, 50 gold please."

User: "@Guard can you help me?"
Guard: "That's not my job. Ask the Station Master."

User: "@Traveler have you seen this before?"
Traveler: "Every day! The Station Master is always strict about tickets."
```

---

## 🔧 TECHNICAL DETAILS:

### **Spacing Fix:**
- `padding-top: 72px` - Clears ◎ and ? buttons
- `padding-bottom: 72px` - Clears ⇆, ＋, and scene selector
- `box-sizing: border-box` - Padding included in height calc
- `calc(100dvh - env(safe-area-inset))` - Mobile safe areas

### **@ Mention System:**
- Regex: `/@(\w+)/` - Matches @EntityName
- Extracts entity name (letters/numbers only)
- Appends context to system instruction:
  ```
  "User is addressing 'EntityName' specifically. 
   Respond AS this entity in character."
  ```
- Works with ALL scenarios, best with Railyard/Entity Dialogue

---

## 📊 COMPARISON:

| Feature | Before | After |
|---------|--------|-------|
| **Corner Overlap** | ❌ Buttons cover content | ✅ 72px padding clearance |
| **Mobile Safe Area** | ❌ Not respected | ✅ Proper insets |
| **Entity Addressing** | ❌ No way to target | ✅ @EntityName support |
| **Character Response** | ❌ Generic AI | ✅ AS entity in character |
| **Multi-Entity Chat** | ❌ Not possible | ✅ Switch between @mentions |

---

## 🎯 WHAT'S NEW:

### **Visual:**
- ✅ Clean spacing top/bottom
- ✅ No button overlap
- ✅ Mobile-safe layout

### **Functional:**
- ✅ @ mentions for entity perspective
- ✅ AI responds AS the entity
- ✅ Works with all scenarios
- ✅ Character-driven dialogue

---

## 🧪 TRY IT NOW:

1. **Refresh page**
2. **Notice clean spacing** - no overlap!
3. **Select "Railyard Negotiation"**
4. **Type:** `create a dragon and a knight`
5. **Type:** `@Dragon why are you here?`
6. **Dragon responds in character!**
7. **Type:** `@Knight what's your quest?`
8. **Knight responds separately!**

**Spacing perfect, entity perspective working!** 🎯✨

---

END SPACING & MENTIONS FIX
