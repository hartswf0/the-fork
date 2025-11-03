// 🎨 RAILYARD VISUAL RENDERING - Train visualization on LEGOS grid

// Add these rendering functions to thousand-tetrad.html

function renderRailyardTrains(channel) {
  if (!channel.railyardActive || !channel.trains) return;
  
  const grid = channel.dom?.gridEl;
  if (!grid) return;
  
  console.log('[RAILYARD RENDER] Rendering', channel.trains.length, 'trains');
  
  // Remove old train overlays
  grid.querySelectorAll('.train-segment, .target-line, .train-label').forEach(el => el.remove());
  
  channel.trains.forEach((train, trainIdx) => {
    train.body.forEach((pos, segIdx) => {
      const cell = grid.querySelector(`[data-x="${pos.x}"][data-y="${pos.y}"]`);
      if (!cell) return;
      
      const segment = document.createElement('div');
      segment.className = 'train-segment';
      segment.classList.add(segIdx === 0 ? 'head' : 'body');
      
      segment.style.cssText = `
        position: absolute;
        inset: 2px;
        background: ${train.color};
        opacity: ${segIdx === 0 ? 1 : 0.7 - (segIdx * 0.08)};
        border: 2px solid ${train.color};
        border-radius: ${segIdx === 0 ? '50%' : '20%'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${segIdx === 0 ? '20px' : '14px'};
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: ${50 + trainIdx};
        box-shadow: 
          0 0 ${segIdx === 0 ? '16px' : '8px'} ${train.color}88,
          inset 0 0 12px rgba(0,0,0,0.4);
      `;
      
      // Head gets direction indicator
      if (segIdx === 0) {
        const arrows = {
          up: '↑',
          down: '↓',
          left: '←',
          right: '→'
        };
        segment.textContent = arrows[train.direction] || '●';
        
        // Animate based on mood
        if (train.mood === 'hungry' && !train.paused) {
          segment.style.animation = 'pulse 1.2s ease-in-out infinite';
        } else if (train.paused) {
          segment.style.animation = 'none';
          segment.style.opacity = '0.5';
          segment.style.filter = 'grayscale(0.6)';
        } else if (train.mood === 'conflicted') {
          segment.style.animation = 'shake 0.5s ease-in-out infinite';
        } else if (train.mood === 'crashed') {
          segment.style.animation = 'none';
          segment.style.opacity = '0.3';
          segment.style.filter = 'grayscale(1)';
          segment.textContent = '💥';
        }
        
        // Add train label above head
        const label = document.createElement('div');
        label.className = 'train-label';
        label.style.cssText = `
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: ${train.color};
          text-shadow: 0 0 4px ${train.color};
          white-space: nowrap;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.8);
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid ${train.color};
          z-index: 100;
        `;
        
        // Show shortened name
        const words = train.name.split(' ');
        label.textContent = words[0]; // First word only
        segment.appendChild(label);
        
        // Add status indicator
        if (train.paused) {
          const status = document.createElement('div');
          status.style.cssText = `
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            color: #f87171;
            background: rgba(0, 0, 0, 0.9);
            padding: 2px 4px;
            border-radius: 2px;
            white-space: nowrap;
          `;
          status.textContent = train.mood === 'crashed' ? 'CRASHED' : 'PAUSED';
          segment.appendChild(status);
        }
      } else {
        // Body segments
        segment.textContent = '◼';
      }
      
      cell.style.position = 'relative';
      cell.appendChild(segment);
    });
    
    // Draw target line
    if (train.targetEntity && !train.paused) {
      drawTargetLine(grid, train);
    }
  });
}

function drawTargetLine(grid, train) {
  const head = train.body[0];
  const target = train.targetEntity;
  if (!target) return;
  
  const headCell = grid.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`);
  const targetCell = grid.querySelector(`[data-x="${target.x}"][data-y="${target.y}"]`);
  
  if (!headCell || !targetCell) return;
  
  const headRect = headCell.getBoundingClientRect();
  const targetRect = targetCell.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  
  const x1 = headRect.left + headRect.width / 2 - gridRect.left;
  const y1 = headRect.top + headRect.height / 2 - gridRect.top;
  const x2 = targetRect.left + targetRect.width / 2 - gridRect.left;
  const y2 = targetRect.top + targetRect.height / 2 - gridRect.top;
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  
  const line = document.createElement('div');
  line.className = 'target-line';
  line.style.cssText = `
    position: absolute;
    left: ${x1}px;
    top: ${y1}px;
    width: ${length}px;
    height: 2px;
    background: ${train.color};
    opacity: 0.3;
    transform-origin: 0 0;
    transform: rotate(${angle}deg);
    pointer-events: none;
    z-index: 45;
    border-top: 2px dashed ${train.color};
    animation: dash 1s linear infinite;
  `;
  
  grid.appendChild(line);
}

// Add CSS animations if not already present
function injectRailyardStyles() {
  if (document.getElementById('railyard-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'railyard-styles';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
    }
    
    @keyframes dash {
      to { stroke-dashoffset: -20; }
    }
    
    .train-segment {
      cursor: help;
    }
    
    .train-segment.head:hover {
      transform: scale(1.2) !important;
      z-index: 100 !important;
      box-shadow: 0 0 24px currentColor !important;
    }
    
    .train-segment.head:hover .train-label {
      font-size: 9px;
      padding: 4px 8px;
    }
  `;
  
  document.head.appendChild(style);
}

// Modify renderChannel to include train rendering
// Add this to the existing renderChannel function in thousand-tetrad.html:

function renderChannelWithRailyard(channel) {
  // ... existing renderChannel logic ...
  
  // Add railyard rendering
  if (channel.railyardActive) {
    renderRailyardTrains(channel);
  }
}

// Game state display overlay
function showRailyardGameState(channel) {
  if (!channel.railyardActive) return '';
  
  const entitiesLeft = countEntities(channel);
  const trainStatus = channel.trains.map(t => 
    `${t.name}: ${t.paused ? '⏸️' : '▶️'} ${t.mood}`
  ).join(' | ');
  
  return `
🎮 RAILYARD GAME
Turn: ${channel.railyardTurn}/${channel.railyardMaxTurns}
Entities: ${entitiesLeft}
${trainStatus}
  `;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderRailyardTrains,
    drawTargetLine,
    injectRailyardStyles,
    showRailyardGameState
  };
}
