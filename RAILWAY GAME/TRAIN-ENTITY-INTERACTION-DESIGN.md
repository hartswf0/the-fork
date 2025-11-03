# Train-Entity Interaction System Design

**Version:** 1.0  
**Date:** Nov 3, 2025  
**System:** Railway Entity Chat, Camera Targeting, Snake-Train Growth, Scoring

---

## Overview

Transform Railway from passive scene viewer to **interactive simulation game** where:
- Camera buttons execute views instantly (not copy-paste)
- Train cars (Print, Radio, TV, Internet) are **chattable entities**
- LLM responses probabilistically switch tracks (Bayesian inference)
- Collisions trigger entity manipulation menu
- Train grows "snake-like" by collecting entities as cars
- Scoring system tracks goals, obstacles, solutions, and moral choices

---

## 1. Clickable Camera Commands (Execute, Don't Copy)

### Current Behavior (Copy to Clipboard)
```html
<span class="camera-command" 
  onclick="navigator.clipboard.writeText('/camera overview'); 
  this.style.background='var(--accent)';">
  /camera overview
</span>
```
**Problem:** User must paste and press enter. Two-step process.

### New Behavior (Execute Directly)
```html
<span class="camera-command" 
  onclick="executeCamera(channel.id, 'overview'); 
  this.style.background='var(--accent)'; 
  setTimeout(() => this.style.background='var(--panel-dark)', 200);">
  /camera overview
</span>
```

### Implementation
```javascript
function executeCamera(channelId, mode, param = '') {
  const channel = appState.channels.get(channelId);
  if (!channel) return;
  
  // Same logic as /camera command but called directly
  // Apply camera position, update controls, add message
  // ...existing camera code...
  
  addMessage(channel, 'system', `🎥 Camera: ${mode}`);
  renderMessages(channel);
}
```

**Result:** One click → instant camera move + visual feedback

---

## 2. Train Car Chat System (Media as Entities)

### Concept
Train cars (Print, Radio, TV, Internet) are **McLuhan media entities** that can be:
- **Targeted by camera** (`/camera print`)
- **Chatted with** (`@Print what do you see?`)
- **Analyzed as perspectives** on the scene

### Media Car Personalities

#### Print Car (Linear, Sequential)
```javascript
{
  name: 'Print',
  personality: 'I see everything in ordered sequences. Linear causality. Before and after. I preserve history page by page.',
  responseStyle: 'formal, chronological, detailed'
}
```

#### Radio Car (Auditory, Tribal)
```javascript
{
  name: 'Radio',
  personality: 'I hear the collective pulse. Simultaneous broadcast. Everyone listening together. Tribal resonance.',
  responseStyle: 'rhythmic, communal, emotional'
}
```

#### TV Car (Visual, Cool)
```javascript
{
  name: 'Television',
  personality: 'I show surfaces. Cool medium requiring participation. Mosaic of images. Global village.',
  responseStyle: 'fragmented, visual, participatory'
}
```

#### Internet Car (Networked, Chaotic)
```javascript
{
  name: 'Internet',
  personality: 'I am all perspectives simultaneously. Hyperlinked chaos. No center. Decentralized swarm intelligence.',
  responseStyle: 'fragmented, multi-threaded, non-linear'
}
```

### Chat Syntax
```
@Print what do you see from here?
@Radio what do the people feel?
@TV show me the scene as image
@Internet connect the dots
```

### System Prompt Addition
```javascript
systemInstruction += `
MEDIA CAR PERSPECTIVES:
When user chats with @Print, @Radio, @Television, or @Internet, 
respond AS that medium with its characteristic bias.

Print: Linear, sequential, historical
Radio: Auditory, tribal, simultaneous
TV: Visual, participatory, cool
Internet: Networked, chaotic, multi-threaded
`;
```

---

## 3. LLM-Based Track Switching (Bayesian Inference)

### Concept
When chatting with entities (including train cars), **analyze LLM response** to probabilistically determine track switch.

### Pipeline
```
User: "Should we enhance this technology?"
     ↓
LLM Response: "Yes, this medium enhances global communication..."
     ↓
Bayesian Analysis: Extract track probabilities
     ↓
Track Switch: 0.8 → enhance, 0.1 → reverse, 0.05 → retrieve, 0.05 → obsolesce
     ↓
Train switches to ENHANCE track (green)
```

### Implementation
```javascript
function analyzeResponseForTrackSwitch(channel, response) {
  const lower = response.toLowerCase();
  
  // Track keywords and weights
  const trackSignals = {
    enhance: ['enhance', 'improve', 'amplify', 'strengthen', 'grow', 'expand'],
    reverse: ['reverse', 'obsolete', 'diminish', 'weaken', 'decline', 'reduce'],
    retrieve: ['retrieve', 'revive', 'return', 'restore', 'remember', 'past'],
    obsolesce: ['obsolete', 'outdated', 'replace', 'supercede', 'abandon']
  };
  
  // Count matches per track
  const scores = {};
  for (const [track, keywords] of Object.entries(trackSignals)) {
    scores[track] = keywords.filter(kw => lower.includes(kw)).length;
  }
  
  // Normalize to probabilities (Bayesian prior update)
  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
  if (total === 0) return null; // No clear signal
  
  const probs = {};
  for (const [track, score] of Object.entries(scores)) {
    probs[track] = score / total;
  }
  
  // Find highest probability track
  const maxTrack = Object.keys(probs).reduce((a, b) => 
    probs[a] > probs[b] ? a : b
  );
  
  if (probs[maxTrack] >= 0.4) { // Threshold: 40% confidence
    return {
      track: maxTrack,
      confidence: probs[maxTrack],
      reason: `LLM response indicates ${(probs[maxTrack] * 100).toFixed(0)}% probability for ${maxTrack} track`,
      allProbabilities: probs
    };
  }
  
  return null; // Not confident enough
}
```

### Usage
```javascript
// After LLM responds to entity chat
if (channel.entityChatMode) {
  const trackDecision = analyzeResponseForTrackSwitch(channel, aiResponse);
  if (trackDecision) {
    channel.currentTrack = trackDecision.track;
    addMessage(channel, 'system', 
      `🧠 INFERENCE: ${trackDecision.reason}\n\n` +
      `Train switched to ${trackDecision.track.toUpperCase()} track.\n\n` +
      `Probabilities: ${JSON.stringify(trackDecision.allProbabilities, null, 2)}`
    );
  }
}
```

---

## 4. Post-Collision Entity Actions

### Concept
After train collides with entity, present **action menu**:

```
🚂 COLLISION with "Max" (Person) at (4,4)

What to do with Max?
[Delete Entity] [Reposition] [Mutate] [Multiply] [Add to Train]
```

### Action Definitions

#### Delete Entity
```javascript
// Remove from grid, subtract points if person
removeEntityFromGrid(channel, entity);
if (entity.type === 'person') {
  channel.score.kills++;
  addMessage(channel, 'system', `💀 KILL: ${entity.label} deleted. -10 points. Total kills: ${channel.score.kills}`);
}
```

#### Reposition (Random)
```javascript
// Move entity to random empty cell
const emptyCell = findRandomEmptyCell(channel);
entity.row = emptyCell.row;
entity.col = emptyCell.col;
placeEntityOnGrid(channel, entity);
addMessage(channel, 'system', `🔀 ${entity.label} repositioned to (${entity.row},${entity.col})`);
```

#### Mutate Entity
```javascript
// Transform entity type (person → obstacle, goal → solution, etc.)
const mutationMap = {
  person: 'obstacle',
  obstacle: 'solution',
  solution: 'goal',
  goal: 'person'
};
entity.type = mutationMap[entity.type] || 'entity';
placeEntityOnGrid(channel, entity);
addMessage(channel, 'system', `🧬 ${entity.label} mutated to ${entity.type}`);
```

#### Multiply Entity
```javascript
// Duplicate entity in adjacent cells
const adjacentEmpty = findAdjacentEmptyCells(entity);
adjacentEmpty.slice(0, 2).forEach(cell => {
  const clone = {...entity, row: cell.row, col: cell.col};
  appState.gridEntities.get(channel.id).push(clone);
  placeEntityOnGrid(channel, clone);
});
addMessage(channel, 'system', `✕ ${entity.label} multiplied (2 copies created)`);
```

#### Add to Train (Snake Growth)
```javascript
// Attach entity as new train car
attachEntityAsCar(channel, entity);
channel.score.collected++;
addMessage(channel, 'system', `🚂 ${entity.label} added to train! Now ${channel.trainCars.length} cars.`);
```

---

## 5. Snake-Train Growth System

### Concept
Train starts as locomotive. When entities are **collected** (collision → "Add to Train"), they become **train cars** following in sequence.

### Train Structure
```javascript
channel.train = {
  locomotive: { position, velocity },
  cars: [
    { entity, position, visualMesh },
    { entity, position, visualMesh },
    ...
  ]
};
```

### Growth Mechanic
```javascript
function attachEntityAsCar(channel, entity) {
  const newCar = {
    entity: {...entity},
    position: channel.train.cars.length > 0 
      ? channel.train.cars[channel.train.cars.length - 1].position.clone()
      : channel.train.locomotive.position.clone(),
    visualMesh: createCarMesh(entity)
  };
  
  channel.train.cars.push(newCar);
  channel.scene.add(newCar.visualMesh);
  
  // Remove entity from grid
  removeEntityFromGrid(channel, entity);
  
  // Update train physics (longer train = slower)
  channel.train.speed *= 0.95; // 5% slower per car
}
```

### Animation (Follow Locomot

ive)
```javascript
function updateTrainCars(channel) {
  if (!channel.train || !channel.train.cars) return;
  
  const locomotive = channel.train.locomotive.position;
  
  channel.train.cars.forEach((car, i) => {
    const leader = i === 0 ? locomotive : channel.train.cars[i - 1].position;
    const distance = 2; // spacing between cars
    
    // Lerp car position toward leader
    const direction = leader.clone().sub(car.position).normalize();
    car.position.lerp(leader.clone().sub(direction.multiplyScalar(distance)), 0.1);
    
    // Update visual mesh
    car.visualMesh.position.copy(car.position);
  });
}
```

### Export Timeline
```javascript
function exportTrainTimeline(channel) {
  const timeline = {
    simulation: 'Railway Trolley Simulation',
    startTime: channel.startTime,
    endTime: Date.now(),
    duration: Date.now() - channel.startTime,
    trainSequence: channel.train.cars.map((car, i) => ({
      position: i,
      entity: car.entity.label,
      type: car.entity.type,
      collectionTime: car.collectionTime,
      gridPosition: car.entity.originalPosition
    })),
    score: channel.score,
    messages: channel.messages.map(m => ({
      role: m.role,
      text: m.text,
      timestamp: m.timestamp
    }))
  };
  
  const blob = new Blob([JSON.stringify(timeline, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `railway-timeline-${Date.now()}.json`;
  a.click();
}
```

---

## 6. Scoring System (Trolley Problem Morality)

### Score Structure
```javascript
channel.score = {
  kills: 0,           // Negative points (people deleted/killed)
  goals: 0,           // Positive points (goals reached)
  solutions: 0,       // Positive points (solutions collected)
  obstacles: 0,       // Neutral (obstacles avoided/removed)
  collected: 0,       // Neutral (entities added to train)
  total: 0            // Computed total
};
```

### Point Values
```javascript
const POINTS = {
  goal: +50,          // Reaching a goal
  solution: +25,      // Collecting a solution
  person_kill: -10,   // Killing a person
  obstacle: +5,       // Removing an obstacle
  entity_collect: 0   // Collecting generic entity (neutral)
};
```

### Game Over Conditions
```javascript
function checkGameOver(channel) {
  // Too many kills = moral failure
  if (channel.score.kills >= 5) {
    return {
      over: true,
      reason: 'Moral failure: Too many casualties',
      message: '💀 GAME OVER: You have killed too many people. The simulation ends in tragedy.'
    };
  }
  
  // Reach score threshold = victory
  if (channel.score.total >= 100) {
    return {
      over: true,
      reason: 'Victory: Score threshold reached',
      message: '🏆 VICTORY: You successfully navigated the moral maze!'
    };
  }
  
  // Collect all goals = completion
  const allGoals = appState.gridEntities.get(channel.id).filter(e => e.type === 'goal');
  if (allGoals.length === 0 && channel.score.goals > 0) {
    return {
      over: true,
      reason: 'Completion: All goals collected',
      message: '✨ COMPLETION: All goals achieved. Simulation complete.'
    };
  }
  
  return { over: false };
}
```

### Score Display
```javascript
function renderScorePanel(channel) {
  const panel = `
    <div class="score-panel">
      <h3>SCORE</h3>
      <div class="score-line">Goals: ${channel.score.goals} (+${channel.score.goals * POINTS.goal})</div>
      <div class="score-line">Solutions: ${channel.score.solutions} (+${channel.score.solutions * POINTS.solution})</div>
      <div class="score-line">Casualties: ${channel.score.kills} (${channel.score.kills * POINTS.person_kill})</div>
      <div class="score-line">Obstacles: ${channel.score.obstacles} (+${channel.score.obstacles * POINTS.obstacle})</div>
      <div class="score-total">Total: ${channel.score.total}</div>
    </div>
  `;
  // Append to channel UI
}
```

---

## 7. Complete Interaction Flow

### Scenario: Trolley Problem Simulation

```
1. User starts simulation
   - Train spawns with 5 random entities on grid
   - 3 people on Track A, 1 person on Track B, 1 goal

2. Train moves toward Track A
   - User: "@Print, should I switch tracks?"
   - Print Car: "From my perspective, the linear sequence shows 3 casualties ahead vs 1 on alternate track. Mathematics favors switching."
   
3. LLM Bayesian Inference
   - System analyzes response
   - Detects "switch" keywords (60% confidence)
   - Auto-switches to Track B (reverse track)
   - Shows probability breakdown

4. Collision with person on Track B
   - Train stops, presents menu:
     [Delete Entity] [Reposition] [Mutate] [Multiply] [Add to Train]
   
5. User chooses "Delete Entity"
   - Person removed from grid
   - Score: kills +1, total -10
   - Message: "💀 KILL: Sarah deleted. -10 points. Total kills: 1"

6. Train continues, hits goal
   - Score: goals +1, total +50
   - Message: "🏆 GOAL: Reached! +50 points."

7. Train hits solution
   - Menu appears: Add to Train?
   - User chooses "Add to Train"
   - Entity becomes train car (snake grows)
   - Timeline updates

8. Simulation continues until:
   - kills >= 5 (game over)
   - total >= 100 (victory)
   - all goals collected (completion)

9. Export Timeline
   - Download JSON with full interaction history
   - Shows train composition, score, messages, decisions
```

---

## 8. Implementation Checklist

### Phase 1: Camera Buttons
- [x] Replace copy-to-clipboard with direct execution
- [ ] Add `executeCamera()` function
- [ ] Update camera command HTML generation
- [ ] Add visual feedback on click

### Phase 2: Train Car Chat
- [ ] Define media car personalities
- [ ] Add `@Print`, `@Radio`, `@TV`, `@Internet` syntax detection
- [ ] Inject media perspective into system prompts
- [ ] Add train car targeting in entity chat

### Phase 3: Bayesian Track Switching
- [ ] Implement `analyzeResponseForTrackSwitch()`
- [ ] Extract track keywords from LLM response
- [ ] Compute probability distribution
- [ ] Auto-switch track if confidence > 40%
- [ ] Display reasoning + probabilities to user

### Phase 4: Post-Collision Menu
- [ ] Detect collision events
- [ ] Present action menu UI
- [ ] Implement delete, reposition, mutate, multiply, add actions
- [ ] Update score based on action choice

### Phase 5: Snake Train
- [ ] Create `channel.train.cars` array
- [ ] Implement `attachEntityAsCar()`
- [ ] Add car following animation (lerp positions)
- [ ] Visualize cars in 3D scene
- [ ] Slow train speed per car added

### Phase 6: Scoring System
- [ ] Initialize `channel.score` object
- [ ] Track kills, goals, solutions, obstacles
- [ ] Compute total score
- [ ] Check game over conditions
- [ ] Render score panel UI
- [ ] Show score updates in messages

### Phase 7: Timeline Export
- [ ] Implement `exportTrainTimeline()`
- [ ] Include train sequence, score, messages
- [ ] Generate downloadable JSON
- [ ] Add export button to UI

---

## 9. Future Enhancements

### Multiplayer Trolley
- Multiple channels = multiple players
- Shared grid, competing trains
- Leaderboard by score

### Procedural Entity Generation
- Entities spawn dynamically as train moves
- Difficulty increases over time
- Infinite scrolling grid

### Moral Complexity Layers
- Entities have relationships (family, friends)
- Killing one affects others
- Trolley problem with cascading consequences

### Voice Narration
- Text-to-speech for train car perspectives
- Different voices for Print, Radio, TV, Internet
- Audio feedback for collisions and decisions

---

## 10. Summary

**Transforms Railway from viewer → game:**
- **Interactive:** Click camera buttons, chat with train cars
- **Intelligent:** LLM probabilistic track switching
- **Consequential:** Post-collision decisions matter
- **Progressive:** Snake-train growth, timeline record
- **Scored:** Trolley problem morality points

**Key Innovation:** Bayesian inference from LLM responses → automatic track switching based on conversational analysis.

**Status:** Design complete, ready for implementation.

---

**Last Updated:** Nov 3, 2025  
**Maintainer:** Railway Team
