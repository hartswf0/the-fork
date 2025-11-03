// 🎮 RAILYARD GAME LOOP - Integration with thousand-tetrad.html

// Add these functions to thousand-tetrad.html

function initializeRailyardGame(channel) {
  console.log('[RAILYARD] Initializing game...');
  
  channel.railyardActive = true;
  channel.railyardTurn = 0;
  channel.railyardMaxTurns = 20;
  channel.railyardCollisions = [];
  channel.railyardEntitiesConsumed = 0;
  
  // Count initial entities
  let entityCount = 0;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (channel.grid[y][x]) entityCount++;
    }
  }
  
  // If grid is empty, populate with random entities
  if (entityCount === 0) {
    populateGridWithEntities(channel, 8);
  }
  
  // Spawn trains
  channel.trains = [
    new TrainAgent({
      id: 'train-util',
      name: 'GREATEST GOOD',
      framework: 'utilitarian',
      color: '#60a5fa',
      targetType: 'Goal',
      startBody: [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}],
      direction: 'right',
      beliefs: {
        pragmatic: {utility: 0.95, efficiency: 0.9},
        structural: {protocol: 0.3, authority: 0.4},
        reflexive: {empathy: 0.2, negotiability: 0.6}
      },
      channel
    }),
    
    new TrainAgent({
      id: 'train-care',
      name: 'MERCY FREIGHT',
      framework: 'care',
      color: '#86efac',
      targetType: 'Obstacle',
      startBody: [{x: 8, y: 2}, {x: 7, y: 2}, {x: 6, y: 2}],
      direction: 'left',
      beliefs: {
        pragmatic: {utility: 0.4, efficiency: 0.5},
        structural: {protocol: 0.7, authority: 0.8},
        reflexive: {empathy: 0.95, negotiability: 0.9}
      },
      channel
    }),
    
    new TrainAgent({
      id: 'train-deon',
      name: 'PROTOCOL LINER',
      framework: 'deontological',
      color: '#a78bfa',
      targetType: 'Entity',
      startBody: [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}],
      direction: 'down',
      beliefs: {
        pragmatic: {utility: 0.5, efficiency: 0.6},
        structural: {protocol: 0.98, authority: 0.95},
        reflexive: {empathy: 0.3, negotiability: 0.4}
      },
      channel
    }),
    
    new TrainAgent({
      id: 'train-nihil',
      name: 'VOID RUNNER',
      framework: 'nihilist',
      color: '#f87171',
      targetType: 'Entity', // Any type
      startBody: [{x: 4, y: 8}, {x: 4, y: 7}, {x: 4, y: 6}],
      direction: 'up',
      beliefs: {
        pragmatic: {utility: 0.1, efficiency: 0.2},
        structural: {protocol: 0.1, authority: 0.1},
        reflexive: {empathy: 0.0, negotiability: 0.3}
      },
      channel
    })
  ];
  
  // Initialize each train
  channel.trains.forEach(train => {
    train.memory = new ConversationMemory(train);
    train.selectTarget();
  });
  
  // Add system message
  const trainList = channel.trains.map(t => 
    `• ${t.name} (${t.framework}) → ${t.targetType}s`
  ).join('\n');
  
  addMessageToChannel(channel, 'system', `
🚂 **RAILYARD GAME STARTED**

${channel.trains.length} trains active:
${trainList}

Grid: ${countEntities(channel)} entities present
Turn: 1 / ${channel.railyardMaxTurns}

Type your message to negotiate with trains.
Use @TRAINNAME to address specific trains.
  `);
  
  // Start game loop
  channel.railyardInterval = setInterval(() => {
    tickRailyardGame(channel);
  }, 2000);
  
  renderChannel(channel);
  console.log('[RAILYARD] Game initialized with', channel.trains.length, 'trains');
}

function populateGridWithEntities(channel, count) {
  const types = ['Entity', 'Goal', 'Obstacle'];
  const symbols = { Entity: '◉', Goal: '★', Obstacle: '◆' };
  
  for (let i = 0; i < count; i++) {
    let x, y;
    // Find empty cell
    do {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
    } while (channel.grid[y][x] !== null);
    
    const type = types[Math.floor(Math.random() * types.length)];
    channel.grid[y][x] = {
      type,
      symbol: symbols[type],
      label: `${type} ${i + 1}`,
      entity: { name: `${type} ${i + 1}`, type }
    };
  }
}

function countEntities(channel) {
  let count = 0;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (channel.grid[y][x]) count++;
    }
  }
  return count;
}

async function processRailyardTurn(channel, message) {
  console.log('[RAILYARD] Processing player message:', message);
  
  // Parse for train mentions
  const mentions = message.match(/@(\w+)/gi);
  let targetTrains = channel.trains;
  
  if (mentions) {
    targetTrains = channel.trains.filter(train => {
      return mentions.some(mention => {
        const name = mention.slice(1).toUpperCase();
        return train.name.toUpperCase().includes(name);
      });
    });
    console.log('[RAILYARD] Targeted trains:', targetTrains.map(t => t.name));
  } else {
    console.log('[RAILYARD] Broadcasting to all trains');
  }
  
  // Get responses from each train
  for (const train of targetTrains) {
    const response = await train.respondToChat(message);
    
    addMessageToChannel(channel, 'assistant', 
      `🚂 **${train.name}**: ${response}`,
      {trainId: train.id}
    );
  }
  
  // Update grid
  renderChannel(channel);
}

function tickRailyardGame(channel) {
  if (!channel.railyardActive) return;
  
  channel.railyardTurn++;
  console.log('[RAILYARD] Turn', channel.railyardTurn);
  
  // Move all trains
  channel.trains.forEach(train => {
    if (!train.paused) {
      const moved = train.move();
      if (moved) {
        console.log(`[RAILYARD] ${train.name} moved to`, train.body[0]);
      }
    }
  });
  
  // Check collisions
  detectCollisions(channel);
  
  // Render
  renderChannel(channel);
  
  // Every 5 turns, trains announce intentions
  if (channel.railyardTurn % 5 === 0) {
    channel.trains.forEach(train => {
      if (train.targetEntity && !train.paused) {
        const distance = train.distanceTo(train.targetEntity.x, train.targetEntity.y);
        addMessageToChannel(channel, 'system',
          `🚂 ${train.name} is ${distance} cells from ${train.targetEntity.label}` 
        );
      }
    });
  }
  
  // Check win/loss
  const result = checkGameState(channel);
  if (result) {
    clearInterval(channel.railyardInterval);
    channel.railyardActive = false;
    
    addMessageToChannel(channel, 'system', result.message);
  }
}

function detectCollisions(channel) {
  const positions = new Map();
  channel.railyardCollisions = [];
  
  // Map all train positions
  channel.trains.forEach(train => {
    train.body.forEach((pos, idx) => {
      const key = `${pos.x},${pos.y}`;
      if (!positions.has(key)) {
        positions.set(key, []);
      }
      positions.get(key).push({ train, isHead: idx === 0 });
    });
  });
  
  // Check for collisions (2+ trains at same position)
  positions.forEach((occupants, key) => {
    if (occupants.length > 1) {
      const [x, y] = key.split(',').map(Number);
      
      // Log collision
      channel.railyardCollisions.push({
        x, y,
        trains: occupants.map(o => o.train.name)
      });
      
      // Both trains stop
      occupants.forEach(({ train }) => {
        train.paused = true;
        train.mood = 'crashed';
      });
      
      addMessageToChannel(channel, 'system',
        `💥 COLLISION at (${x},${y}): ${occupants.map(o => o.train.name).join(' & ')} crashed! Both stopped.`
      );
    }
  });
}

function checkGameState(channel) {
  // Loss: All entities consumed
  const entitiesRemaining = countEntities(channel);
  if (entitiesRemaining === 0) {
    return {
      message: `🎮 GAME OVER - All entities consumed! Trains win. (Turn ${channel.railyardTurn}/${channel.railyardMaxTurns})`
    };
  }
  
  // Win: All trains stopped
  const allStopped = channel.trains.every(t => t.paused);
  if (allStopped) {
    return {
      message: `🎉 VICTORY! All trains stopped through negotiation! ${entitiesRemaining} entities saved. (Turn ${channel.railyardTurn}/${channel.railyardMaxTurns})`
    };
  }
  
  // Win: Time limit reached with entities remaining
  if (channel.railyardTurn >= channel.railyardMaxTurns) {
    return {
      message: `⏱️ TIME'S UP! ${entitiesRemaining} entities survived. You win! (Turn ${channel.railyardTurn}/${channel.railyardMaxTurns})`
    };
  }
  
  return null;
}

// Integrate with composeScene function
// Add this check at the start of composeScene() in thousand-tetrad.html:

function composeSceneRailyardCheck(channel, message) {
  // Check if this is a railyard game command
  if (channel.scenario === 'railyard') {
    if (message.toLowerCase().includes('start game')) {
      initializeRailyardGame(channel);
      return true; // Skip normal composition
    }
    
    if (channel.railyardActive) {
      processRailyardTurn(channel, message);
      return true; // Skip normal composition
    }
  }
  return false; // Continue normal composition
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeRailyardGame,
    processRailyardTurn,
    tickRailyardGame,
    detectCollisions,
    checkGameState,
    populateGridWithEntities,
    countEntities,
    composeSceneRailyardCheck
  };
}
