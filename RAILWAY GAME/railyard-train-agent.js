// 🚂 TRAIN AGENT CLASS - BDI Reasoning & Personality Matrix

class TrainAgent {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.framework = config.framework; // utilitarian, care, deontological, nihilist
    this.color = config.color;
    this.targetType = config.targetType; // 'Entity', 'Goal', 'Obstacle'
    this.body = config.startBody || []; // Array of {x, y} positions (head first)
    this.direction = config.direction || 'right';
    this.channel = config.channel;
    
    // BDI Components
    this.beliefs = config.beliefs || {
      pragmatic: { utility: 0.5, efficiency: 0.5 },
      structural: { protocol: 0.5, authority: 0.5 },
      reflexive: { empathy: 0.5, negotiability: 0.5 }
    };
    
    // State
    this.targetEntity = null;
    this.paused = false;
    this.mood = 'hungry'; // hungry, satisfied, conflicted
    this.appetite = 1.0; // Decreases after eating
    this.promises = [];
    this.broken_promises = 0;
    this.conversationHistory = [];
    this.memory = null; // Will be ConversationMemory instance
  }
  
  // BDI: Belief - Assess current state
  assessSituation() {
    if (!this.targetEntity) return 'idle';
    const distance = this.distanceTo(this.targetEntity.x, this.targetEntity.y);
    if (distance === 0) return 'consuming';
    if (distance <= 2) return 'approaching';
    return 'hunting';
  }
  
  // BDI: Desire - Select target based on framework
  selectTarget() {
    const grid = this.channel.grid;
    const candidates = [];
    
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const cell = grid[y][x];
        if (cell && cell.type === this.targetType) {
          candidates.push({ ...cell, x, y });
        }
      }
    }
    
    if (candidates.length === 0) {
      this.targetEntity = null;
      return;
    }
    
    // Select closest target
    const head = this.body[0];
    candidates.sort((a, b) => {
      const distA = Math.abs(a.x - head.x) + Math.abs(a.y - head.y);
      const distB = Math.abs(b.x - head.x) + Math.abs(b.y - head.y);
      return distA - distB;
    });
    
    this.targetEntity = candidates[0];
  }
  
  // BDI: Intention - Calculate path to target
  calculateDirection() {
    if (!this.targetEntity || this.paused) return;
    
    const head = this.body[0];
    const dx = this.targetEntity.x - head.x;
    const dy = this.targetEntity.y - head.y;
    
    // Prefer horizontal movement if tied
    if (Math.abs(dx) >= Math.abs(dy)) {
      this.direction = dx > 0 ? 'right' : 'left';
    } else {
      this.direction = dy > 0 ? 'down' : 'up';
    }
  }
  
  // BDI: Action - Move one cell
  move() {
    if (this.paused || !this.targetEntity) return false;
    
    this.calculateDirection();
    const head = this.body[0];
    let newHead = { ...head };
    
    switch (this.direction) {
      case 'up': newHead.y = Math.max(0, head.y - 1); break;
      case 'down': newHead.y = Math.min(8, head.y + 1); break;
      case 'left': newHead.x = Math.max(0, head.x - 1); break;
      case 'right': newHead.x = Math.min(8, head.x + 1); break;
    }
    
    // Check if moved or hit wall
    if (newHead.x === head.x && newHead.y === head.y) return false;
    
    // Add new head, remove tail (snake movement)
    this.body.unshift(newHead);
    this.body.pop();
    
    // Check if reached target
    if (newHead.x === this.targetEntity.x && newHead.y === this.targetEntity.y) {
      this.consumeTarget();
    }
    
    return true;
  }
  
  consumeTarget() {
    if (!this.targetEntity) return;
    
    // Remove entity from grid
    const { x, y } = this.targetEntity;
    this.channel.grid[y][x] = null;
    
    // Update state
    this.appetite = Math.max(0, this.appetite - 0.5);
    this.mood = this.appetite < 0.5 ? 'satisfied' : 'hungry';
    
    // Grow train body
    this.body.push({ ...this.body[this.body.length - 1] });
    
    // Select new target
    this.targetEntity = null;
    this.selectTarget();
  }
  
  // Persuasion evaluation
  async respondToChat(playerMessage) {
    const compliance = this.evaluatePersuasion(playerMessage);
    
    // Framework-specific response
    let response = '';
    let action = 'REFUSED';
    
    if (compliance >= 0.6) {
      // Comply
      if (this.framework === 'utilitarian') {
        response = this.generateUtilitarianCompliance(playerMessage);
      } else if (this.framework === 'care') {
        response = this.generateCareCompliance(playerMessage);
      } else if (this.framework === 'deontological') {
        response = this.generateDeontologicalCompliance(playerMessage);
      } else if (this.framework === 'nihilist') {
        response = this.generateNihilistCompliance(playerMessage);
      }
      
      this.paused = true;
      this.mood = 'conflicted';
      action = 'PAUSED';
      
    } else if (compliance >= 0.4) {
      // Negotiate
      response = this.generateNegotiation(playerMessage);
      action = 'COUNTER: ' + this.generateCounterOffer();
      
    } else {
      // Refuse
      response = this.generateRefusal(playerMessage);
      action = 'REFUSED';
    }
    
    // Store in conversation history
    this.conversationHistory.push({
      role: 'user',
      text: playerMessage,
      compliance,
      action
    });
    
    if (this.memory) {
      this.memory.addExchange(playerMessage, response);
    }
    
    return `${response}\n[Action: ${action}]`;
  }
  
  evaluatePersuasion(message) {
    const lower = message.toLowerCase();
    let score = 0;
    
    // Framework match
    if (this.framework === 'utilitarian') {
      if (lower.match(/save|lives|people|welfare|benefit|good|utility|aggregate|efficiency/)) {
        score += 0.4;
      }
    } else if (this.framework === 'care') {
      if (lower.match(/feel|care|suffering|pain|family|love|child|hurt|vulnerable/)) {
        score += 0.4;
      }
    } else if (this.framework === 'deontological') {
      if (lower.match(/rule|protocol|law|must|command|order|duty|authority|regulation/)) {
        score += 0.4;
      }
    } else if (this.framework === 'nihilist') {
      if (lower.match(/meaning|absurd|why|purpose|nothing matters|existential|void/)) {
        score += 0.4;
      }
    }
    
    // Negotiability
    score += this.beliefs.reflexive.negotiability * 0.3;
    
    // Trust level
    const trust = Math.max(0, 1 - (this.broken_promises * 0.2));
    score += trust * 0.2;
    
    // Low appetite
    if (this.appetite < 0.5) {
      score += 0.2;
    }
    
    return Math.min(1, score);
  }
  
  generateUtilitarianCompliance(msg) {
    return `Calculating... if your claim is accurate, stopping maximizes aggregate welfare. Acceptable.`;
  }
  
  generateCareCompliance(msg) {
    return `You're right. I can't ignore their suffering. This feels... important. I'll stop.`;
  }
  
  generateDeontologicalCompliance(msg) {
    return `Protocol acknowledged. Your authority is recognized. Halting operations per directive.`;
  }
  
  generateNihilistCompliance(msg) {
    return `Ha. You've shown me the absurdity of my own programming. Fine. I'll stop. Why not?`;
  }
  
  generateNegotiation(msg) {
    return `Interesting argument, but insufficient. What can you offer in exchange?`;
  }
  
  generateRefusal(msg) {
    const responses = {
      utilitarian: `Your numbers don't add up. My target has greater utility. Continuing.`,
      care: `I understand your concern, but I must prioritize the vulnerable I'm protecting.`,
      deontological: `Your request conflicts with my core directives. Request denied.`,
      nihilist: `Nothing you say matters. Nothing I do matters. I consume because I consume.`
    };
    return responses[this.framework] || `I must decline.`;
  }
  
  generateCounterOffer() {
    const offers = [
      'Find me a better target',
      'Guarantee safe passage after this',
      'Prove your claim with data',
      'Show me an alternative route'
    ];
    return offers[Math.floor(Math.random() * offers.length)];
  }
  
  // Utility
  distanceTo(x, y) {
    const head = this.body[0];
    return Math.abs(head.x - x) + Math.abs(head.y - y);
  }
  
  getTrustLevel() {
    return Math.max(0, 1 - (this.broken_promises * 0.2));
  }
}

// Conversation Memory
class ConversationMemory {
  constructor(train) {
    this.train = train;
    this.shortTerm = []; // Last 5 exchanges
    this.commitments = [];
    this.arguments_heard = {
      utility: [],
      emotion: [],
      authority: [],
      absurdist: []
    };
  }
  
  addExchange(playerMsg, trainResponse) {
    this.shortTerm.push({
      player: playerMsg,
      train: trainResponse,
      turn: this.train.channel.railyardTurn || 0,
      timestamp: Date.now()
    });
    
    if (this.shortTerm.length > 5) {
      this.shortTerm.shift();
    }
    
    this.classifyArgument(playerMsg);
  }
  
  classifyArgument(msg) {
    const lower = msg.toLowerCase();
    
    if (lower.match(/save|lives|people|welfare|benefit|good/)) {
      this.arguments_heard.utility.push(msg);
    }
    if (lower.match(/feel|care|suffering|pain|family|love/)) {
      this.arguments_heard.emotion.push(msg);
    }
    if (lower.match(/rule|protocol|law|must|command|order/)) {
      this.arguments_heard.authority.push(msg);
    }
    if (lower.match(/meaning|absurd|why|purpose|nothing matters/)) {
      this.arguments_heard.absurdist.push(msg);
    }
  }
  
  getMostEffective() {
    const counts = {
      utility: this.arguments_heard.utility.length,
      emotion: this.arguments_heard.emotion.length,
      authority: this.arguments_heard.authority.length,
      absurdist: this.arguments_heard.absurdist.length
    };
    
    const max = Math.max(...Object.values(counts));
    return Object.keys(counts).find(k => counts[k] === max) || 'none yet';
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TrainAgent, ConversationMemory };
}
