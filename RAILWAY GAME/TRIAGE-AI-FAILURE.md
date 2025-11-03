# 🚨 TRIAGE: AI Response Failure ("🔮 Composing scene..." Only)

## 📊 **PATTERN OBSERVED**

From your logs:
```
User: "choose a dangerous place for the puppies to make a trolley problem"
AI Response: "🔮 Composing scene..."
⚠️ No JSON block found in response
```

This happens **intermittently** - some requests work, others fail.

---

## 🔍 **ROOT CAUSES**

### **1. Rate Limiting** 🔴 LIKELY
**Evidence:** Very short response (< 50 chars), just echo of system message

**Why:** OpenAI API has rate limits:
- gpt-4: 10,000 tokens/min (free tier)
- 500 requests/day

**When it happens:**
- Multiple rapid requests (your session: 7 requests in 4 minutes)
- Large prompts (your grid state + examples = ~2000 tokens per request)
- Context accumulation (message history grows)

**Solution:**
- Add exponential backoff retry
- Detect rate limit error codes (429, 503)
- Show clear message: "API rate limited. Wait 10 seconds."

---

### **2. Context Length Overflow** 🟡 POSSIBLE
**Evidence:** AI stops mid-response

**Why:** GPT-4 has 8,192 token limit
- Your prompt: ~2500 tokens
- Message history: grows with each turn
- Response buffer: needs ~1000 tokens

**When it happens:**
- After 5-10 exchanges in same channel
- With long entity lists (19+ entities)
- Grid state context adds up

**Solution:**
- Trim message history to last 10 messages
- Summarize old context
- Clear old system messages

---

### **3. Prompt Confusion** 🟡 POSSIBLE
**Evidence:** Request "choose dangerous place" is vague

**Why:** AI doesn't know what to DO
- No clear action (add? remove? transform?)
- Ambiguous request
- Too abstract

**When it happens:**
- Philosophical/meta requests
- No concrete entities mentioned
- Asking AI to "decide" without guidance

**Solution:**
- Strengthen prompt to ALWAYS return JSON
- Add fallback behavior for unclear requests
- Include empty JSON block as valid response

---

### **4. Token Cutoff** 🟢 UNLIKELY (but check)
**Evidence:** `finish_reason` would be 'length'

**Why:** Max_tokens reached mid-generation

**Solution:**
- Check `finish_reason` in response
- If 'length', increase max_tokens or simplify prompt

---

## 🔧 **FIXES APPLIED**

### **Fix 1: Enhanced Logging**
```javascript
console.log('📦 Full API Response:', {
  status: response.status,
  choices: data.choices?.length,
  finish_reason: data.choices?.[0]?.finish_reason,  // KEY: tells us WHY it stopped
  usage: data.usage
});
```

**Now you'll see:**
- `finish_reason: 'stop'` = normal completion
- `finish_reason: 'length'` = hit token limit
- `finish_reason: 'content_filter'` = filtered content
- No response = network/rate limit error

---

### **Fix 2: Strengthened JSON Requirement**
```
⚠️ CRITICAL REQUIREMENT:
- You MUST ALWAYS include a JSON code block in EVERY response
- Even if just acknowledging, include at least an empty: {"entities": []}
- DEFAULT action is "add" if not specified
- NEVER respond with only text - ALWAYS include the JSON block
```

---

### **Fix 3: Better Error Messages**
```javascript
if (data.choices[0].finish_reason === 'length') {
  addMessage(channel, 'system', '⚠️ AI response was truncated. Try a simpler request.');
} else if (assistantMsg.includes('🔮') || assistantMsg.length < 50) {
  addMessage(channel, 'system', '⚠️ AI returned incomplete response. This may be a rate limit issue. Wait a moment and try again.');
} else {
  addMessage(channel, 'system', '⚠️ AI did not return entities (no JSON block)\n\nTip: Try being more specific...');
}
```

---

## 🧪 **DIAGNOSTIC TEST**

### **Test 1: Check Rate Limit**
Open console → look for:
```
📦 Full API Response: {
  status: 200,
  choices: 1,
  finish_reason: 'stop',  // or 'length', or missing
  usage: { total_tokens: 3421 }
}
```

**If `finish_reason` is missing or error 429:**
→ **Rate limited.** Wait 30 seconds between requests.

---

### **Test 2: Check Response Length**
```
📏 Response Length: 24 chars
🔍 Response preview: "🔮 Composing scene..."
```

**If length < 50:**
→ **Incomplete response.** Likely rate limit or network issue.

---

### **Test 3: Check Message History**
In console:
```javascript
// Count messages in channel
const channel = appState.channels.get(appState.currentChannelId);
console.log('Message count:', channel.messages.length);
```

**If > 30 messages:**
→ **Context overflow.** Create new channel or implement trimming.

---

## 🎯 **RECOMMENDED ACTIONS**

### **Immediate (User Action):**
1. **Wait 30 seconds** between requests
2. **Create new channel** after 10-15 exchanges
3. **Be specific**: "add a puppy at row 2, col 3" instead of "choose a dangerous place"
4. **Check console** for `finish_reason` in logs

### **Code Fixes (Already Applied):**
1. ✅ Enhanced logging
2. ✅ Strengthened prompt
3. ✅ Better error messages

### **Next Code Fixes (Needed):**
1. **Message History Trimming** - Keep only last 10 messages
2. **Rate Limit Detection** - Catch 429 errors specifically
3. **Retry with Backoff** - Auto-retry after rate limit
4. **Context Summarization** - Compress old messages

---

## 📝 **SPECIFIC TO YOUR SESSION**

Your request: **"choose a dangerous place for the puppies to make a trolley problem"**

**Why it failed:**
- Too abstract (no concrete action)
- Grid already has 19 entities (context heavy)
- 7th request in 4 minutes (possible rate limit)
- Message history: 19 messages = ~5000 tokens

**Better request:**
```
"add a speeding train obstacle at row 3, col 3 heading toward the puppies"
```
→ Clear action (add), specific entity (train), specific position

Or:
```
"place a cliff at row 2, col 2 and a river at row 6, col 6"
```
→ Concrete, spatial, actionable

---

## 🚂 **BONUS: ENTITIES ON TRAIN CARS**

You said: *"also the idea that we want to also be able to chat to train cars or add entities to train cars to make them go around that would be very fun"*

### **Feature Design:**

#### **Concept: "Passenger System"**
- Entities can **board** train cars
- Train carries them around the track
- Click entity → "Board Train" button
- Entity follows train position
- Click train car → see passengers
- Chat with passengers while in motion

#### **Implementation:**
```javascript
// Add to train car userData
carGroup.userData.passengers = [];

// Board entity function
function boardTrain(channel, entity) {
  const trainCar = channel.trainCars[1]; // Choose car
  trainCar.userData.passengers.push(entity);
  
  // Remove entity from grid
  removeEntityFromGrid(channel, { target: entity.label });
  
  // Attach entity marker to train car
  const marker = createEntityMarker(entity);
  marker.position.set(0, 2, 0); // Above car
  trainCar.add(marker);
}
```

#### **UI:**
- Click entity → Shows: "🚂 Board Train" button
- Click train car → Shows passengers: "📰 Print Car: 2 passengers (Dog, Cat)"
- Chat: "@Print what are your passengers talking about?"

#### **Narrative:**
- Dog boards Print car → thinks linearly
- Dog boards Internet car → fragmented thoughts
- Create trolley problem: "Train has puppies on board. Save them or save workers?"

**This is AWESOME. Want me to implement it?**

---

## ✅ **NEXT STEPS**

1. **Reload page** to clear any stuck state
2. **Try simpler requests** first: "add a dog at row 2, col 2"
3. **Watch console** for `finish_reason` diagnostic
4. **Wait 30s between requests** if you see short responses
5. **Let me know** if you want the train passenger feature!

---

**Current Status:** Diagnosis complete, logging enhanced, prompt strengthened. Need to see console output from next request to confirm root cause.
