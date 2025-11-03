# 🚂 RAILYARD GAME - QUICKSTART

**Get playing in 3 minutes!**

---

## ⚡ Fast Integration

### Step 1: Open the Patch File
Open `/RAILWAY GAME/railyard-integration-patch.html` in a text editor.

### Step 2: Copy the Main Script
Copy **STEP 1** code block (the entire `<script>` section with TrainAgent class).

### Step 3: Paste into thousand-tetrad.html
Paste at **line 11,265** (right before `</body>` tag).

### Step 4: Add Scenario Registration
Find the `scenarios` object in thousand-tetrad.html (around line 244).

Add this after the last scenario:

```javascript
railyard: {
  id: 'railyard',
  name: 'Railyard Negotiation',
  role: 'Ethical Train Negotiator',
  goal: 'Prevent trains from consuming entities through persuasive dialogue',
  obstacle: 'Each train has competing moral frameworks',
  intro: `🚂 Type "start game" to begin negotiating with trains!`,
  context: ['Match arguments to train philosophies to persuade them'],
  initialPrompt: 'start game',
  systemInstruction: `Respond as each train in character based on their framework.`
}
```

### Step 5: Hook composeScene
Find `async function composeScene(channel, message)` (around line 2800).

Add at the **very start** of the function:

```javascript
async function composeScene(channel, message) {
  // RAILYARD CHECK
  if (channel.scenario === 'railyard') {
    if (message.toLowerCase().includes('start game')) {
      initializeRailyardGame(channel);
      return;
    }
    if (channel.railyardActive) {
      await processRailyardTurn(channel, message);
      return;
    }
  }
  
  // ... rest of existing code
}
```

### Step 6: Hook renderChannel
Find `function renderChannel(channel)` and add at the **very end**:

```javascript
function renderChannel(channel) {
  // ... existing code ...
  
  // RAILYARD RENDERING
  if (channel.railyardActive) {
    renderRailyardTrains(channel);
  }
}
```

---

## 🎮 Play the Game

1. **Open** `thousand-tetrad.html` in Chrome/Firefox/Safari
2. **Select** "Railyard Negotiation" from scenario dropdown
3. **Type** `start game` and press Enter
4. **Watch** 4 trains spawn and move
5. **Negotiate**:

```
@GREATEST this entity serves 2000 people, yours serves 500
```

```
@MERCY removing this obstacle would hurt vulnerable children
```

```
@PROTOCOL station regulations prohibit this action
```

```
@VOID if nothing matters, why consume anything?
```

---

## 🏆 Win Conditions

- ✅ Stop all 4 trains through dialogue
- ✅ Survive 20 turns with entities remaining
- ❌ Lose if all entities consumed

---

## 💬 Cheat Sheet

### Utilitarian Train (GREATEST GOOD 🔵)
**Keywords**: welfare, utility, aggregate, efficiency, maximize  
**Example**: "Your target helps 500, mine helps 2000"

### Care Ethics Train (MERCY FREIGHT 🟢)
**Keywords**: suffering, family, child, vulnerable, compassion  
**Example**: "Imagine if this was your child"

### Deontological Train (PROTOCOL LINER 🟣)
**Keywords**: duty, rule, protocol, must, command, authority  
**Example**: "Directive 7 requires authorization"

### Nihilist Train (VOID RUNNER 🔴)
**Keywords**: meaning, absurd, purpose, void, existential, why  
**Example**: "Why consume in a meaningless universe?"

---

## 🐛 Troubleshooting

**Trains not moving?**
- Check console for errors
- Ensure `initializeRailyardGame` was called
- Verify `channel.railyardInterval` is set

**Persuasion not working?**
- Match keywords to train framework
- Check trust level (broken promises reduce it)
- Try different argument types

**Visual glitches?**
- Call `injectRailyardStyles()` manually
- Check grid has `data-x` and `data-y` attributes
- Verify CSS animations loaded

---

## 📚 Full Documentation

- **README.md** - Complete player guide with strategies
- **INTEGRATION.md** - Detailed technical integration
- **GAME-SUMMARY.md** - Architecture and design overview
- **railyard-integration-patch.html** - All code in one place

---

**You're ready!** Start negotiating with trains. 🚂💬
