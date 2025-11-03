# 🚂 Train Passenger System: Entities Ride the Train

## 🎯 **CONCEPT**

Entities can **board train cars** and ride around the circular track, experiencing the world from each media era's perspective.

---

## 🎭 **NARRATIVE POSSIBILITIES**

### **McLuhan Perspective Shifts:**
- **Dog boards Print Car** → Thinks in linear narrative: "First I was lost, then I found the track, now I'm riding..."
- **Dog boards Radio Car** → Hears everything: "I hear my pack calling! The whistle! The wheels!"
- **Dog boards TV Car** → Sees in images: "Everything moves past like frames in a film..."
- **Dog boards Internet Car** → Fragmented experience: "Track. Wind. Mom. Speed. Where? Fast. Safe?"

### **Trolley Problem Enhancement:**
- Train has puppies ON BOARD
- Track A: Save 5 workers OR save the puppies by derailing
- User must choose: "Switch track to save workers but crash train?"
- Moral weight: passengers make the choice harder

### **Dynamic Storytelling:**
- Entities travel together, have conversations
- "What do the passengers talk about in the Print car?"
- "How does the dog feel in the Internet car?"
- Entities disembark at stations (certain grid positions)

---

## 🏗️ **ARCHITECTURE**

### **Data Structure:**
```javascript
// Train car userData
carGroup.userData = {
  isTrain: true,
  carIndex: 1,
  carEra: 'Print',
  passengers: [
    {
      label: 'Dog',
      type: 'Entity',
      boardedAt: timestamp,
      originalPosition: { row: 3, col: 4 }
    }
  ]
};
```

### **Functions Needed:**
1. `boardTrain(channel, entity, carIndex)` - Add entity to car
2. `disembarkTrain(channel, entity, carIndex)` - Remove entity, place on grid
3. `listPassengers(channel, carIndex)` - Show who's on car
4. `chatWithPassengers(channel, carIndex)` - AI chat as passengers

---

## 🎨 **VISUAL DESIGN**

### **On Grid:**
- Entity marker fades out when boarding
- Particle trail from entity to train
- Sound: "Ding!" when boarding

### **On Train:**
- Small entity icon above car (like a flag)
- Entities stack if multiple passengers
- Different colors per entity type

### **In Chat:**
- "🚂 Dog boarded the Print Car"
- "📰 Print Car passengers: Dog, Cat, Bird"
- "@Print what are your passengers thinking?"

---

## 💻 **IMPLEMENTATION**

### **Step 1: Add Passengers Array to Train Cars**
```javascript
// In init3DForChannel, when creating train cars
carGroup.userData.passengers = [];
```

### **Step 2: Board Function**
```javascript
function boardTrain(channel, entityLabel, carIndex = 1) {
  const entities = appState.gridEntities.get(channel.id) || [];
  const entity = entities.find(e => e.label === entityLabel);
  
  if (!entity) {
    addMessage(channel, 'system', `❌ Entity "${entityLabel}" not found`);
    return;
  }
  
  const trainCar = channel.trainCars[carIndex];
  if (!trainCar) {
    addMessage(channel, 'system', `❌ Train car ${carIndex} not found`);
    return;
  }
  
  // Add to passengers
  trainCar.userData.passengers.push({
    label: entity.label,
    type: entity.type,
    boardedAt: Date.now(),
    originalPosition: { row: entity.row, col: entity.col }
  });
  
  // Remove from grid
  removeEntityFromGrid(channel, { target: entity.label });
  
  // Add visual marker above car
  const marker = createEntityMarker(entity);
  marker.position.set(0, 2, 0); // 2 units above car
  marker.scale.set(0.5, 0.5, 0.5); // Smaller
  trainCar.add(marker);
  
  const carName = trainCar.userData.carEra || 'Locomotive';
  addMessage(channel, 'system', `🚂 ${entity.label} boarded the ${carName} Car`);
  renderMessages(channel);
  
  TestSuite.log('🚂', 'BOARD', `${entity.label} → ${carName} Car`);
}
```

### **Step 3: Disembark Function**
```javascript
function disembarkTrain(channel, entityLabel, carIndex) {
  const trainCar = channel.trainCars[carIndex];
  const passengerIndex = trainCar.userData.passengers.findIndex(p => p.label === entityLabel);
  
  if (passengerIndex === -1) {
    addMessage(channel, 'system', `❌ ${entityLabel} is not on this car`);
    return;
  }
  
  const passenger = trainCar.userData.passengers[passengerIndex];
  trainCar.userData.passengers.splice(passengerIndex, 1);
  
  // Remove marker from train
  const marker = trainCar.children.find(child => child.userData?.entity?.label === entityLabel);
  if (marker) trainCar.remove(marker);
  
  // Place back on grid at current train position
  const currentCell = Math.floor(channel.trainProgress * 81); // 0-80
  const row = Math.floor(currentCell / 9);
  const col = currentCell % 9;
  
  placeEntityOnGrid(channel, {
    type: passenger.type,
    label: passenger.label,
    row: row,
    col: col
  });
  
  const carName = trainCar.userData.carEra || 'Locomotive';
  addMessage(channel, 'system', `🚂 ${passenger.label} disembarked from ${carName} Car at (${row},${col})`);
  renderMessages(channel);
}
```

### **Step 4: List Passengers**
```javascript
function listPassengers(channel, carIndex) {
  const trainCar = channel.trainCars[carIndex];
  const passengers = trainCar.userData.passengers || [];
  const carName = trainCar.userData.carEra || 'Locomotive';
  
  if (passengers.length === 0) {
    return `${carName} Car: No passengers`;
  }
  
  const list = passengers.map(p => `${p.type}: ${p.label}`).join(', ');
  return `${carName} Car passengers: ${list}`;
}
```

### **Step 5: Update Train Click Handler**
```javascript
// When train car is clicked, show passengers
else if (clickedObject.parent && clickedObject.parent.userData.isTrain) {
  const carIndex = clickedObject.parent.userData.carIndex || 0;
  const carEra = clickedObject.parent.userData.carEra;
  const passengers = clickedObject.parent.userData.passengers || [];
  
  let carInfo = '';
  if (carIndex === 0) {
    carInfo = `🚂 Locomotive (Leader)\n\nPassengers: ${passengers.length}`;
  } else {
    const eraNames = { Print: '📰 Print Car', Radio: '📻 Radio Car', Television: '📺 TV Car', Internet: '🌐 Internet Car' };
    carInfo = `${eraNames[carEra]}\n\n`;
    
    if (passengers.length > 0) {
      carInfo += `Passengers (${passengers.length}):\n`;
      carInfo += passengers.map(p => `- ${p.label} (${p.type})`).join('\n');
      carInfo += `\n\nType "@${carEra} what are your passengers doing?" to chat`;
    } else {
      carInfo += `No passengers\n\nClick an entity and type "board train" to add passengers`;
    }
  }
  
  addMessage(channel, 'system', `${carInfo}\n\nProgress: ${Math.round(channel.trainProgress * 100)}%`);
  renderMessages(channel);
}
```

### **Step 6: Chat Commands**
```javascript
// In sendMessageWithLEGOS, check for commands
if (userText.toLowerCase().includes('board train')) {
  const match = userText.match(/board (\w+) train/i);
  if (match) {
    boardTrain(channel, match[1], 1); // Board Print car by default
    return;
  }
}

if (userText.toLowerCase().includes('disembark')) {
  const match = userText.match(/disembark (\w+)/i);
  if (match) {
    disembarkTrain(channel, match[1], 1);
    return;
  }
}

if (userText.toLowerCase().includes('show passengers')) {
  const msg = channel.trainCars.map((car, idx) => listPassengers(channel, idx)).join('\n');
  addMessage(channel, 'system', msg);
  renderMessages(channel);
  return;
}
```

### **Step 7: AI Prompt Addition**
```javascript
// Add to system prompt
let passengerContext = '';
const passengers = channel.trainCars.flatMap((car, idx) => 
  (car.userData.passengers || []).map(p => ({...p, car: idx, era: car.userData.carEra}))
);

if (passengers.length > 0) {
  passengerContext = `\n\n🚂 PASSENGERS ON TRAIN:\n`;
  passengerContext += passengers.map(p => 
    `- ${p.label} (${p.type}) riding ${p.era} Car`
  ).join('\n');
  passengerContext += `\n\nWhen user asks about passengers, describe their experience from the media era's perspective.`;
}
```

---

## 🎮 **USER WORKFLOWS**

### **Workflow 1: Basic Boarding**
```
1. User: "add a dog at row 3, col 4"
   → AI adds dog

2. User clicks dog entity
   → Shows: "Entity: Dog at (3,4)"

3. User: "board dog train"
   → Dog removed from grid
   → Dog appears on Print Car
   → Message: "🚂 Dog boarded the Print Car"

4. User: "@Print what is the dog thinking?"
   → AI: "The dog thinks in linear narrative: First, I was lost on the grid..."
```

### **Workflow 2: Trolley Problem**
```
1. User: "add 3 puppies and put them on the train"
   → AI adds puppies, they board automatically

2. User: "add 5 workers on track A"
   → AI places workers

3. User: "create a trolley problem"
   → AI: "The train carries 3 puppies. Track A has 5 workers. 
         If you switch tracks, the train will derail and the puppies will die.
         If you don't switch, the workers will die.
         What do you choose?"

4. User must choose track
   → Consequences play out
```

### **Workflow 3: Media Era Experience**
```
1. Dog boards Radio Car
2. User: "@Radio what does the dog hear?"
3. AI: "The dog's ears perk up. It hears EVERYTHING - the rhythmic chug of wheels,
       the distant bark of its pack, the whistle's wail, the wind rushing past.
       Radio makes all sounds immediate, tribal, communal. The dog is part of 
       the mechanical symphony."
```

---

## ✅ **IMPLEMENTATION CHECKLIST**

- [ ] Add `passengers` array to train car userData
- [ ] Create `boardTrain()` function
- [ ] Create `disembarkTrain()` function  
- [ ] Create `listPassengers()` function
- [ ] Update train click handler to show passengers
- [ ] Add visual markers above cars for passengers
- [ ] Add chat commands: "board X train", "disembark X", "show passengers"
- [ ] Add passenger context to AI prompt
- [ ] Test boarding/disembarking
- [ ] Test AI responses with passengers
- [ ] Test multiple passengers per car
- [ ] Test trolley problem with passengers

---

## 🎉 **BENEFITS**

1. **Narrative Depth** - Entities become characters with journeys
2. **McLuhan Theory** - Media eras affect perception (brilliant!)
3. **Trolley Problems** - Passengers add moral weight
4. **Dynamic World** - Train becomes more than decoration
5. **Spatial Memory** - Entities remember where they came from
6. **Player Agency** - User controls entity movement

---

**This feature is 🔥. Want me to implement it now?**
