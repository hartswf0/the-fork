# 🧠 Context Engineering Triage: Memory Systems (NSDS Analysis)

## 📋 **CHARTER NEGATIVE SPACE**

### **NOT-List: What This System Is NOT**

#### **Non-Goals:**
- ❌ **NOT an infinite context window** - No system can remember everything forever
- ❌ **NOT preserving every chat turn** - Most conversation is transient, only insights matter
- ❌ **NOT storing raw message text** - Text is expensive, meaning is cheap
- ❌ **NOT treating all messages equally** - System messages ≠ user insights ≠ entity state
- ❌ **NOT sending full history to AI** - API costs and latency grow linearly with context
- ❌ **NOT keeping zombie data alive** - Old irrelevant context pollutes decisions
- ❌ **NOT using LRU cache** - Recent ≠ relevant

#### **Out-of-Scope Users:**
- ❌ Users expecting perfect recall of 100+ message conversations
- ❌ Users who never want context compression
- ❌ Users unwilling to explicitly mark important moments

#### **Anti-Metrics:**
- ❌ **NOT** "total messages stored" (bigger ≠ better)
- ❌ **NOT** "context window size" (more tokens ≠ smarter)
- ❌ **NOT** "zero information loss" (impossible and wasteful)

#### **Hard Constraints:**
- GPT-4: 8,192 token limit (system prompt + history + response buffer)
- Rate limit: 10K tokens/min (free tier), 500 requests/day
- User patience: < 3 second response time
- Cost: < $0.02 per interaction

---

## 🔍 **THOUSAND-TETRAD ANALYSIS**

### **System Architecture:**

#### **1. Ring Memory (Circular Buffer)**
```javascript
const ringMemory = {
  capacity: 48,           // Fixed-size buffer
  entries: [],            // Circular array
  pointer: 0,
  mainline: null,         // "Important" entry bookmark
  contextMode: 'all',     // Filter mode: all|anchor|mainline
  contextAnchor: null     // Currently focused entry
};
```

**What It Does:**
- Stores **compressed snapshots**, not raw messages
- Automatically evicts oldest entries when capacity reached
- Each entry = { id, timestamp, channelId, symbol, type, headline, summary }
- **24 most recent entries** shown in context window
- User can **lock "mainline"** - marks critical moment that survives eviction longer

**Key Insight:** 
> Not a message log. A **narrative timeline** where each entry represents a *decision point* or *scene state change*.

---

#### **2. Scene Snapshots (Ontological State)**
```javascript
channel.snapshots = [
  {
    id: 'snap_123',
    timestamp: Date.now(),
    grid: deepClone(channel.grid),          // 9×9 entity positions
    cells: deepClone(channel.cells),        // Cell metadata
    observer: deepClone(channel.observer),   // Perspective state
    scorecard: { ... },                      // Metrics
    messageIndex: 15                         // Position in chat
  }
];
```

**What It Does:**
- **Immutable checkpoints** of grid state
- Created at key moments (user decision, junction, major event)
- Enables **time travel** - fork from any snapshot
- **Not stored in API calls** - used for UI only

**Key Insight:**
> Scene graph is **snapshotted structurally**, not narrated textually. AI doesn't see old grid states, only current one.

---

#### **3. Message History Management**

**Current State (railway-full-integration):**
```javascript
// Only last 10 messages sent to API
...channel.messages.slice(-10).map(m => ({
  role: m.role,
  content: m.text
}))
```

**Thousand-Tetrad Approach:**
```javascript
// NO raw message history sent to API
// Instead: Compressed context from ring memory
const contextSummary = ringMemory.entries
  .slice(-8)  // Last 8 ring entries
  .map(e => `${e.symbol}: ${e.headline}`)
  .join('\n');

// AI system prompt includes:
`RECENT EVENTS:
${contextSummary}

CURRENT GRID STATE:
${gridState}

User: ${currentUserMessage}`
```

**Key Insight:**
> Thousand-tetrad **never sends raw chat history**. It sends **structured summaries** of narrative beats.

---

### **4. Context Compression Strategy**

**Three-Layer Memory:**

| Layer | Purpose | Size | Eviction |
|-------|---------|------|----------|
| **Working Memory** | Current scene state | 1 snapshot | Replaced on state change |
| **Ring Memory** | Narrative timeline | 48 entries | FIFO circular buffer |
| **Mainline** | Critical anchor | 1 entry | Manual lock, survives eviction |

**Compression Flow:**
```
Raw Message → Decision Point? → Create Ring Entry (headline + summary)
                ↓
         Scene Change? → Create Snapshot (grid clone)
                ↓
         Important? → Lock as Mainline (bookmark)
```

**Data Reduction:**
- 100 messages (5K tokens) → 8 ring entries (200 tokens) = **96% reduction**
- Full grid state (1K tokens) → Only current state sent = **No historical overhead**

---

## 🎯 **OPTION MAP: Context Strategies for Railway**

### **Option 1: Ring Memory (Thousand-Tetrad Style)**

**Benefits:**
- ✅ Constant memory footprint (48 entries max)
- ✅ Narrative compression (headline + summary)
- ✅ User can bookmark critical moments (mainline)
- ✅ Scales to 500+ message conversations
- ✅ No API token growth over time

**Risks:**
- ⚠️ Requires auto-generation of headlines/summaries
- ⚠️ User may not understand compression
- ⚠️ Important moments might be evicted before bookmarked

**Not-Chosen Consequences:**
- If we don't choose this: Continue hitting token limits after 20-30 messages, requiring new channels frequently

---

### **Option 2: Smart Sliding Window (Current + Enhancement)**

**Benefits:**
- ✅ Simple to implement (already have slice(-10))
- ✅ No compression overhead
- ✅ User sees all recent messages
- ✅ Predictable behavior

**Risks:**
- ⚠️ Still grows linearly with entity count
- ⚠️ No semantic prioritization (last 10 ≠ most important 10)
- ⚠️ Grid state context grows unbounded

**Not-Chosen Consequences:**
- If we don't choose this: Miss opportunity for semantic compression, still hit limits eventually

---

### **Option 3: Hybrid Semantic Compression**

**Benefits:**
- ✅ Keeps only semantically important messages
- ✅ Grid state summarized ("5 entities: 3 on tracks, 2 safe")
- ✅ User messages preserved, system/assistant compressed
- ✅ Maintains conversation continuity

**Risks:**
- ⚠️ Complex to implement (need semantic scoring)
- ⚠️ May compress too aggressively
- ⚠️ Hard to debug when context is lost

**Not-Chosen Consequences:**
- If we don't choose this: Leave sophisticated compression on table, may need it later anyway

---

## 🔄 **DECISION RECORD**

### **Selected Option: Hybrid Approach**
**Phase 1: Smart Sliding Window + Grid State Compression (Now)**
**Phase 2: Ring Memory (Future)**

### **Rationale:**
1. **Immediate fix** (sliding window) already applied, buys time
2. **Grid state compression** (next step) gives 50% token reduction
3. **Ring memory** (Phase 2) solves long-horizon problem elegantly

### **Dissent Summary:**

**Viewpoint A: "Just use Ring Memory now"**
- *Argument:* Why delay? Thousand-tetrad proves it works.
- *Response:* Ring memory requires auto-headline generation (AI call per ring entry = 2× API usage). Need to validate sliding window + compression first.

**Viewpoint B: "Keep it simple, sliding window is enough"**
- *Argument:* Users can just create new channels. Don't over-engineer.
- *Response:* User feedback shows frustration with context loss. Ring memory provides elegant UX (mainline bookmarking).

**Viewpoint C: "Compress everything aggressively"**
- *Argument:* GPT-4 can summarize. Just ask it to compress history.
- *Response:* Extra API call per compression = cost + latency. Ring memory is local compression.

### **Freeze Period:** 2 weeks (until Nov 16, 2025)

### **Reopen Triggers:**
1. Token limit failures continue despite grid compression
2. User explicitly requests conversation memory across 50+ messages
3. Cost/latency of ring entry generation becomes negligible (e.g., local LLM)

---

## 🗑️ **STOP-DOING LEDGER**

| Item Stopped | Capacity Freed | Owner | Date | Reason |
|--------------|----------------|-------|------|--------|
| **Sending all messages to API** | ~4K tokens per request → 500 tokens | System | Nov 2 | Slice to last 10 messages |
| **Storing system loading messages** | ~200 bytes × 50 = 10KB | System | Nov 2 | Filter out "🔮 Composing..." |
| **Repeating grid state in every message** | ~1K tokens × 10 messages = 10K | System | Next | Compress to summary |
| **Preserving transient system messages** | ~30% of message log | User | Next | Only keep user/assistant + junctions |

---

## ⚠️ **KILL CRITERIA**

**Pivot If:**
1. **API costs exceed $5/day** → Switch to local summarization model
2. **Response time > 5 seconds** → Reduce context window further
3. **User complaints about "forgetting context"** > 3 per week → Implement ring memory immediately

**Pause If:**
1. **Token limit errors < 1 per 100 messages** → Current solution is sufficient
2. **User creates new channels proactively** → Natural behavior, don't over-solve

**Stop If:**
1. **OpenAI removes token limits** (unlikely but GPT-5 rumors) → Problem solved at platform level
2. **Users prefer stateless interactions** → Context memory is wrong solution

---

## 📊 **THOUSAND-TETRAD vs RAILWAY: COMPARISON**

| Feature | Thousand-Tetrad | Railway (Current) | Railway (Proposed) |
|---------|-----------------|-------------------|-------------------|
| **Message History** | Not sent to API | Last 10 messages | Last 10 + compressed |
| **Grid State** | Current only | Current + full list | Current + summary |
| **Memory System** | Ring buffer (48 entries) | None | Ring buffer (planned) |
| **Snapshots** | Grid clones for time-travel | None | Train position only |
| **Context Window** | ~500 tokens | ~4K tokens | ~800 tokens |
| **Long Conversations** | 500+ messages | Fails at 30 | Target: 100+ |
| **User Bookmarking** | Mainline lock | None | Planned |
| **Compression** | Auto headlines | None | Grid summaries |

---

## 🚂 **TRAIN PASSENGER CONTEXT INTEGRATION**

### **How Passengers Affect Context:**

**Current Problem:**
- 19 entities on grid = 19 lines in grid state
- Each AI call includes full entity list
- Passengers would add another dimension

**With Compression:**
```
BEFORE:
- Entity "Dog" at (3,4)
- Entity "Cat" at (2,2)
- Entity "Bird" at (5,5)
... (16 more lines)

AFTER:
- 19 entities (3 on tracks, 5 passengers on train, 11 on grid)
- Train carries: Dog (Print Car), Cat (Radio Car)
- Track hazards: 3 puppies at (3,3-3,5)
```

**Token Reduction:** 19 lines → 3 lines = **84% reduction**

### **Passenger Memory in Ring:**
```javascript
// Ring entry when entity boards
{
  symbol: '🚂',
  type: 'PASSENGER',
  headline: 'Dog boards Print Car',
  summary: 'Dog experiencing linear narrative perspective',
  entities: ['Dog'],
  trainCar: 'Print'
}
```

**Benefits:**
- Passenger state tracked in ring, not full message history
- AI knows "Dog has been on Print car for 10 minutes" without replaying every message
- Disembark creates new ring entry, maintains continuity

---

## 🎯 **IMPLEMENTATION PRIORITIES**

### **P0: Grid State Compression (This Week)**
```javascript
// Before AI call
const gridSummary = buildGridSummary(channel);
// "19 entities: 5 on tracks (3 puppies, 2 obstacles), 14 safe"

// Replace full entity list with summary in prompt
```

**Expected Impact:** 50% token reduction, prevents most failures

---

### **P1: Message Filtering (This Week)**
```javascript
// Filter out system noise
const relevantMessages = channel.messages.filter(m => 
  m.role !== 'system' || m.text.includes('Junction') || m.text.includes('Entity')
);
```

**Expected Impact:** 30% token reduction

---

### **P2: Ring Memory System (Phase 2)**
```javascript
// Create ring entry at key moments
function createRingEntry(channel, type, headline, summary) {
  const entry = {
    id: `ring_${ringCounter++}`,
    timestamp: Date.now(),
    channelId: channel.id,
    type: type,  // DECISION, JUNCTION, PASSENGER, STATE_CHANGE
    headline: headline,
    summary: summary,
    entities: getCurrentEntitySnapshot(channel)
  };
  ringMemory.entries.push(entry);
  if (ringMemory.entries.length > 48) {
    evictOldest();
  }
}
```

**Triggers:**
- User switches track (DECISION)
- Train reaches junction (JUNCTION)
- Entity boards/disembarks (PASSENGER)
- 5+ entities added/removed (STATE_CHANGE)

---

## 📈 **SUCCESS METRICS**

| Metric | Current | Target (P0) | Target (P1) | Target (P2) |
|--------|---------|-------------|-------------|-------------|
| **Token/Request** | 4,000 | 2,000 | 1,500 | 800 |
| **Messages Before Failure** | 20 | 40 | 60 | 200+ |
| **API Cost/100 Messages** | $0.40 | $0.20 | $0.15 | $0.08 |
| **Response Time** | 2s | 2s | 1.5s | 1s |
| **Context Loss Complaints** | High | Med | Low | None |

---

## 🏗️ **GRID STATE COMPRESSION: IMPLEMENTATION**

### **Function: buildGridSummary**
```javascript
function buildGridSummary(channel) {
  const entities = appState.gridEntities.get(channel.id) || [];
  
  if (entities.length === 0) return '(empty grid)';
  
  // Group by type
  const byType = {};
  entities.forEach(e => {
    byType[e.type] = (byType[e.type] || 0) + 1;
  });
  
  // Count track positions
  const trackRows = [3, 4, 5]; // Rows where tracks exist
  const onTrack = entities.filter(e => trackRows.includes(e.row)).length;
  
  // Build summary
  const typeSummary = Object.entries(byType)
    .map(([type, count]) => `${count} ${type}`)
    .join(', ');
  
  const locationNote = onTrack > 0 
    ? ` (${onTrack} on tracks)` 
    : '';
  
  return `${entities.length} entities: ${typeSummary}${locationNote}`;
}
```

**Example Output:**
```
19 entities: 5 Entity, 3 Obstacle, 8 Goal, 3 Solution (8 on tracks)
```

**Before:** 19 lines × ~50 tokens = 950 tokens  
**After:** 1 line × 50 tokens = 50 tokens  
**Reduction:** 95% 🎉

---

## 🎓 **LESSONS FROM THOUSAND-TETRAD**

### **1. Separate Concerns:**
- **UI Memory** (snapshots) ≠ **AI Context** (compressed events)
- User sees all history in UI
- AI sees only compressed narrative

### **2. User-Driven Prioritization:**
- Mainline lock = user marks "this is important"
- System doesn't guess importance, user declares it
- Survives automatic eviction

### **3. Event-Driven Compression:**
- Don't compress every message
- Compress at **decision points**
- Ring entries = narrative beats, not chat logs

### **4. Graceful Degradation:**
- Oldest entries evicted first
- No hard failure, just oldest context fades
- Mainline protects critical moments

---

## ✅ **NEXT ACTIONS**

### **This Week:**
1. ✅ Implement `buildGridSummary()` function
2. ✅ Replace full entity list with summary in AI prompt
3. ✅ Filter system noise from message history
4. ✅ Test with 50-message conversation

### **Next Week:**
5. ⏳ Design ring entry schema for railway
6. ⏳ Implement ring entry creation at junctions
7. ⏳ Add UI for ring memory bar (like thousand-tetrad)
8. ⏳ Implement mainline lock feature

### **Phase 2 (Future):**
9. ⏳ Auto-generate ring entry headlines
10. ⏳ Implement context mode switching (all/anchor/mainline)
11. ⏳ Add passenger boarding as ring entry trigger
12. ⏳ Full ring memory system with time-travel

---

## 🎉 **SUMMARY**

**Core Insight:**
> Thousand-tetrad doesn't send chat history to AI. It sends a **compressed narrative timeline** built from structural snapshots and user-marked moments.

**Railway Should:**
1. **Stop** sending full grid state (19 lines → 1 line) ← **P0**
2. **Stop** preserving system noise messages ← **P0**
3. **Start** compressing grid into summaries ← **P0**
4. **Start** tracking narrative beats in ring memory ← **P1**
5. **Start** letting users bookmark important moments ← **P1**

**Expected Result:**
- 50% immediate token reduction (P0)
- 80% long-term token reduction (P1)
- 200+ message conversations without failures (P2)
- Better UX than "just create new channels"

---

**Compression is not data loss. It's narrative extraction.** 🎭
