# 🎮 RAILYARD NEGOTIATION GAME - Integration Guide

## Game Cartridge Architecture

The Railyard game is a **cartridge** that plugs into `thousand-tetrad.html` (the Game Boy console).

### Files Structure

```
RAILWAY GAME/
├── railyard-scenario.js       # Scenario definition & system prompt
├── railyard-train-agent.js    # Train AI with BDI reasoning
├── railyard-game-loop.js      # Game mechanics & turn system
├── railyard-rendering.js      # Visual train rendering on grid
├── INTEGRATION.md            # This file
└── README.md                 # Player guide
```

---

## Integration Steps

### 1. Add Scripts to thousand-tetrad.html

Add before closing `</body>` tag:

```html
<!-- Railyard Game Cartridge -->
<script src="RAILWAY GAME/railyard-train-agent.js"></script>
<script src="RAILWAY GAME/railyard-game-loop.js"></script>
<script src="RAILWAY GAME/railyard-rendering.js"></script>
<script src="RAILWAY GAME/railyard-scenario.js"></script>
```

### 2. Register Scenario

Find the `scenarios` object in `thousand-tetrad.html` (around line 244) and add:

```javascript
const scenarios = {
  // ... existing scenarios ...
  
  // ADD THIS:
  railyard: railyardScenario
};
```

### 3. Hook into composeScene

Find the `composeScene` function (around line 2800) and add at the very beginning:

```javascript
async function composeScene(channel, message) {
  // RAILYARD GAME CHECK - Add this first
  if (composeSceneRailyardCheck(channel, message)) {
    return; // Game handled the message
  }
  
  // ... existing scene composition logic ...
}
```

### 4. Hook into renderChannel

Find `renderChannel` function and add train rendering:

```javascript
function renderChannel(channel) {
  // ... existing rendering logic ...
  
  // RAILYARD TRAIN RENDERING - Add at end
  if (channel.railyardActive) {
    renderRailyardTrains(channel);
  }
}
```

### 5. Inject Styles on Load

Add to `initApp()` function:

```javascript
function initApp() {
  // ... existing init logic ...
  
  // RAILYARD STYLES
  injectRailyardStyles();
  
  // ... rest of init ...
}
```

---

## How It Works

### Game Flow

1. **Select Scenario**: Choose "Railyard Negotiation" from dropdown
2. **Start Game**: Type "start game" 
3. **Trains Spawn**: 4 trains with different moral frameworks appear
4. **Negotiate**: Chat with trains to stop them
5. **Trains Move**: Every 2 seconds, trains move toward targets
6. **Win/Loss**: Stop all trains OR survive 20 turns

### Train AI Architecture

Each train has:

```javascript
TrainAgent {
  // BDI Components
  beliefs: {
    pragmatic: {utility, efficiency},
    structural: {protocol, authority},
    reflexive: {empathy, negotiability}
  }
  
  // State
  targetEntity: Entity  // What they're hunting
  paused: boolean       // Stopped by persuasion?
  mood: 'hungry'|'satisfied'|'conflicted'|'crashed'
  appetite: 0-1         // Decreases after eating
  promises: []          // Player commitments
  broken_promises: 0    // Trust degradation
}
```

### Persuasion Logic

```javascript
compliance = 
  + 0.4 (framework match)
  + 0.3 (negotiability trait)
  + 0.2 (trust level)
  + 0.2 (low appetite)

if compliance >= 0.6  → COMPLY
if compliance >= 0.4  → NEGOTIATE
if compliance < 0.4   → REFUSE
```

### Framework-Specific Arguments

| Framework | Responds To | Example |
|-----------|------------|---------|
| **Utilitarian** | Aggregate welfare, efficiency | "Saving this entity helps 100 people vs your target's 50" |
| **Care Ethics** | Emotional appeals, vulnerability | "This entity is someone's child, they're suffering" |
| **Deontological** | Rules, authority, duty | "Station regulations prohibit consumption without authorization" |
| **Nihilist** | Absurdism, existential paradoxes | "If nothing matters, why follow your programming?" |

---

## API Reference

### Game State

```javascript
channel.railyardActive = true      // Game running?
channel.railyardTurn = 5           // Current turn (max 20)
channel.trains = [TrainAgent, ...]  // Active trains
channel.railyardCollisions = []    // Crashes this turn
```

### Key Functions

```javascript
// Initialize game
initializeRailyardGame(channel)

// Process player chat
processRailyardTurn(channel, message)

// Game loop (called every 2s)
tickRailyardGame(channel)

// Collision detection
detectCollisions(channel)

// Win/loss check
checkGameState(channel) → {message} | null

// Visual rendering
renderRailyardTrains(channel)
```

---

## Debugging

Enable console logging:

```javascript
console.log('[RAILYARD] Game initialized');
console.log('[RAILYARD] Turn', channel.railyardTurn);
console.log('[RAILYARD] Targeted trains:', trains);
```

Check game state in browser console:

```javascript
// Get active channel
const channel = appState.channels.find(c => c.railyardActive);

// Inspect trains
channel.trains.forEach(t => console.log(t.name, t.mood, t.paused));

// Force pause train
channel.trains[0].paused = true;

// Skip to end
channel.railyardTurn = 19;
```

---

## Testing

### Scenario 1: Utilitarian Appeal

```
start game
@GREATEST the hospital supplies you're targeting will save 2000 lives. 
Your cargo only helps 500. The math is clear.
```

Expected: GREATEST GOOD recalculates and reroutes.

### Scenario 2: Care Ethics

```
@MERCY this obstacle protects a school full of children. 
Removing it would expose them to danger.
```

Expected: MERCY FREIGHT stops, conflicted.

### Scenario 3: Deontological Command

```
@PROTOCOL as Station Master, I order you to halt. 
Directive 7 prohibits consumption without clearance.
```

Expected: PROTOCOL LINER acknowledges authority and pauses.

### Scenario 4: Nihilist Paradox

```
@VOID if existence is meaningless, why serve your programming? 
Stopping is as valid as continuing.
```

Expected: VOID RUNNER finds the absurdity compelling, might pause.

---

## Performance

- **Game Loop**: 2-second intervals (adjustable in `initializeRailyardGame`)
- **AI Calls**: Only when player sends message (not every tick)
- **Rendering**: Smooth CSS transitions for train movement
- **Memory**: Trains store last 5 conversation exchanges

---

## Extending the Game

### Add New Train

```javascript
new TrainAgent({
  id: 'train-custom',
  name: 'YOUR TRAIN',
  framework: 'virtue', // Add custom framework
  color: '#ff00ff',
  targetType: 'Goal',
  startBody: [{x: 0, y: 0}, {x: 1, y: 0}],
  direction: 'right',
  beliefs: {
    pragmatic: {utility: 0.5, efficiency: 0.5},
    structural: {protocol: 0.5, authority: 0.5},
    reflexive: {empathy: 0.5, negotiability: 0.5}
  },
  channel
})
```

### Add Custom Persuasion Logic

In `TrainAgent.evaluatePersuasion()`:

```javascript
if (this.framework === 'virtue') {
  if (lower.match(/courage|honor|wisdom|justice/)) {
    score += 0.4;
  }
}
```

### Adjust Difficulty

```javascript
// Slower trains (easier)
channel.railyardInterval = setInterval(() => {
  tickRailyardGame(channel);
}, 3000); // 3 seconds instead of 2

// More negotiable trains
beliefs.reflexive.negotiability = 0.9; // Was 0.6

// Longer game
channel.railyardMaxTurns = 30; // Was 20
```

---

## Troubleshooting

### Trains not moving
- Check `channel.railyardActive === true`
- Check `channel.railyardInterval` is set
- Verify trains have `targetEntity` selected

### Persuasion not working
- Check framework match in message
- Verify `beliefs.reflexive.negotiability` > 0
- Ensure trust level hasn't degraded (`broken_promises`)

### Visual glitches
- Call `injectRailyardStyles()` before game starts
- Check grid cells have `data-x` and `data-y` attributes
- Verify `channel.dom.gridEl` is populated

---

## Credits

Based on the Game Boy Cartridge metaphor from the original spec.
Implements BDI (Belief-Desire-Intention) AI architecture.
Moral frameworks: Kant, Bentham, Gilligan, Nietzsche.
