/**
 * CORE: thousand-tetrad-00.html
 * Stripped to essentials for integration
 * 
 * GENETIC MATERIAL:
 * - Channel system (multi-conversation threads)
 * - Fork logic (8 modes: continue, enhance, reverse, retrieve, obsolesce, perspective, snapshot, blank)
 * - Message history management
 * - OpenAI integration (callOpenAI)
 * - Tetrad generation (McLuhan's 4 laws)
 * - Scene assembly
 * - Entity/LEGOS grid system
 * - Render functions (messages, grid, tetrad)
 */

// ========================================
// CORE CONFIGURATION
// ========================================

const TETRAD_CONFIG = {
    gridSize: 9,
    maxPlacements: 18,
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4',
    temperature: 0.8
};

// ========================================
// FORK MODES
// ========================================

const FORK_MODES = {
    continue: {
        label: 'Continue',
        symbol: '↔',
        description: 'Natural continuation of conversation'
    },
    enhance: {
        label: 'Enhance',
        symbol: '⋔',
        description: 'What does this amplify?'
    },
    reverse: {
        label: 'Reverse',
        symbol: '⋔',
        description: 'What does this flip into?'
    },
    retrieve: {
        label: 'Retrieve',
        symbol: '⋔',
        description: 'What obsolete thing does this bring back?'
    },
    obsolesce: {
        label: 'Obsolesce',
        symbol: '⋔',
        description: 'What does this push into obsolescence?'
    },
    perspective: {
        label: 'Perspective',
        symbol: '◎',
        description: 'View from entity perspective'
    },
    snapshot: {
        label: 'Snapshot',
        symbol: '⧉',
        description: 'Freeze current state'
    },
    blank: {
        label: 'New Blank',
        symbol: '+',
        description: 'Start fresh'
    }
};

// ========================================
// CHANNEL STRUCTURE
// ========================================

function createChannel(parentId = null, forkMode = null) {
    return {
        id: generateId(),
        name: `Channel ${Date.now()}`,
        parentId: parentId,
        forkMode: forkMode,
        messages: [],
        tetrad: null,
        lastScene: null,
        entities: [],
        pending: false,
        scenario: 'default',
        tetradPerspective: null
    };
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// ========================================
// MESSAGE MANAGEMENT
// ========================================

function addMessage(channel, role, content) {
    const message = {
        id: generateId(),
        role: role, // 'user', 'assistant', 'system'
        text: content,
        timestamp: Date.now()
    };
    
    channel.messages.push(message);
    return message;
}

// ========================================
// FORK LOGIC (CORE)
// ========================================

function forkChannel(channel, message, mode, options = {}) {
    const messageId = message?.id ?? null;
    const idx = channel.messages.findIndex(m => m.id === messageId);
    
    // Copy history up to fork point
    const history = idx >= 0 ? channel.messages.slice(0, idx + 1) : channel.messages.slice();
    
    // Create new channel
    const newChannel = createChannel(channel.id, mode);
    newChannel.messages = [...history];
    newChannel.scenario = channel.scenario;
    newChannel.lastScene = channel.lastScene;
    
    // Add mode-specific context
    switch(mode) {
        case 'continue':
            // No additional context
            break;
            
        case 'enhance':
            if (channel.tetrad?.enhance) {
                addMessage(newChannel, 'system', `ENHANCE: ${channel.tetrad.enhance.text}`);
            }
            break;
            
        case 'reverse':
            if (channel.tetrad?.reverse) {
                addMessage(newChannel, 'system', `REVERSE: ${channel.tetrad.reverse.text}`);
            }
            break;
            
        case 'retrieve':
            if (channel.tetrad?.retrieve) {
                addMessage(newChannel, 'system', `RETRIEVE: ${channel.tetrad.retrieve.text}`);
            }
            break;
            
        case 'obsolesce':
            if (channel.tetrad?.obsolesce) {
                addMessage(newChannel, 'system', `OBSOLESCE: ${channel.tetrad.obsolesce.text}`);
            }
            break;
            
        case 'perspective':
            if (options.perspectiveEntity) {
                newChannel.tetradPerspective = options.perspectiveEntity;
                addMessage(newChannel, 'system', `Viewing from perspective of: ${options.perspectiveEntity}`);
            }
            break;
            
        case 'snapshot':
            newChannel.isSnapshot = true;
            newChannel.snapshotId = options.snapshotId;
            break;
            
        case 'blank':
            newChannel.messages = [];
            break;
    }
    
    return newChannel;
}

// ========================================
// OPENAI INTEGRATION (CORE)
// ========================================

async function callOpenAI(apiKey, kind, payload) {
    if (!apiKey) {
        throw new Error('Missing API key');
    }
    
    const prompts = {
        'SceneAssembler': {
            system: `You are LEGOS-G - a world sculptor. Return valid JSON matching the schema. 
Place 8-14 elements on a 9x9 grid. BE TRANSFORMATIVE, NOT CONSERVATIVE.`,
            userTemplate: `Scenario: {{scenario}}
Current State: {{currentState}}
Message: {{message}}
History: {{history}}

Generate scene.`
        },
        'TetradGenerator': {
            system: `You are a McLuhan tetrad analyzer. Generate a tetrad using four laws:
1. ENHANCE - What does it amplify?
2. REVERSE - What does it flip into when pushed to extremes?
3. RETRIEVE - What obsolete thing does it bring back?
4. OBSOLESCE - What does it push into obsolescence?

Return JSON:
{
  "enhance": {"text": "...", "score": 0.0-1.0},
  "reverse": {"text": "...", "score": 0.0-1.0},
  "retrieve": {"text": "...", "score": 0.0-1.0},
  "obsolesce": {"text": "...", "score": 0.0-1.0}
}`,
            userTemplate: `Scenario: {{scenario}}
Scene: {{scene}}
History: {{history}}

Generate tetrad.`
        }
    };
    
    const selectedPrompt = prompts[kind];
    if (!selectedPrompt) {
        throw new Error(`Unsupported OpenAI call kind: ${kind}`);
    }
    
    // Fill template
    let userContent = selectedPrompt.userTemplate;
    Object.keys(payload).forEach(key => {
        const value = typeof payload[key] === 'object' ? JSON.stringify(payload[key]) : payload[key];
        userContent = userContent.replace(`{{${key}}}`, value);
    });
    
    const messages = [
        { role: 'system', content: selectedPrompt.system },
        { role: 'user', content: userContent }
    ];
    
    const response = await fetch(TETRAD_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: TETRAD_CONFIG.model,
            messages: messages,
            temperature: TETRAD_CONFIG.temperature,
            response_format: { type: 'json_object' }
        })
    });
    
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return JSON.parse(content);
}

// ========================================
// TETRAD GENERATION
// ========================================

async function generateTetrad(apiKey, channel) {
    if (!channel.lastScene) return null;
    
    const tetrad = await callOpenAI(apiKey, 'TetradGenerator', {
        scenario: channel.scenario,
        scene: channel.lastScene,
        history: channel.messages.slice(-2).map(m => ({ role: m.role, text: m.text })),
        perspective: channel.tetradPerspective || null
    });
    
    channel.tetrad = tetrad;
    return tetrad;
}

// ========================================
// SCENE ASSEMBLY
// ========================================

async function assembleScene(apiKey, channel, userMessage) {
    const scene = await callOpenAI(apiKey, 'SceneAssembler', {
        scenario: channel.scenario,
        currentState: channel.lastScene,
        message: userMessage,
        history: channel.messages.slice(-6).map(m => ({ role: m.role, text: m.text }))
    });
    
    channel.lastScene = scene;
    channel.entities = scene.entities || [];
    
    return scene;
}

// ========================================
// RENDER FUNCTIONS (INTERFACE)
// ========================================

function renderMessages(channel, containerElement) {
    containerElement.innerHTML = '';
    
    channel.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role}`;
        messageDiv.dataset.messageId = msg.id;
        
        const header = document.createElement('div');
        header.className = 'message-header';
        header.textContent = msg.role.toUpperCase();
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = msg.text;
        
        messageDiv.appendChild(header);
        messageDiv.appendChild(content);
        containerElement.appendChild(messageDiv);
    });
    
    containerElement.scrollTop = containerElement.scrollHeight;
}

function renderTetrad(channel, containerElement) {
    if (!channel.tetrad) {
        containerElement.innerHTML = '<div class="no-tetrad">No tetrad generated yet</div>';
        return;
    }
    
    containerElement.innerHTML = '';
    
    const modes = ['enhance', 'reverse', 'retrieve', 'obsolesce'];
    modes.forEach(mode => {
        const entry = channel.tetrad[mode];
        if (!entry) return;
        
        const chip = document.createElement('div');
        chip.className = `tetrad-chip ${mode}`;
        chip.innerHTML = `
            <div class="chip-label">${mode.toUpperCase()}</div>
            <div class="chip-text">${entry.text}</div>
            <div class="chip-score">Score: ${(entry.score * 100).toFixed(0)}%</div>
        `;
        
        chip.addEventListener('click', () => {
            // Trigger fork on this mode
            const newChannel = forkChannel(channel, null, mode);
            console.log('Forked to', mode, newChannel);
        });
        
        containerElement.appendChild(chip);
    });
}

// ========================================
// EXPORT CORE FUNCTIONS
// ========================================

const CORE_TETRAD = {
    config: TETRAD_CONFIG,
    forkModes: FORK_MODES,
    createChannel,
    addMessage,
    forkChannel,
    callOpenAI,
    generateTetrad,
    assembleScene,
    renderMessages,
    renderTetrad
};

// For Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CORE_TETRAD;
}
