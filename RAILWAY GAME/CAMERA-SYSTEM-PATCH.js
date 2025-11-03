// 🎥 CAMERA SYSTEM PATCH for railway-full-integration.html
// Add this code to enable /camera commands and entity POV switching

// Camera modes for each channel
const CAMERA_MODES = {
  overview: {
    name: 'Overview',
    position: (channel) => {
      const radius = 20;
      channel.camera.position.set(radius * 1.5, radius * 0.8, radius * 1.5);
      channel.controls.target.set(0, 0, 0);
      channel.controls.enabled = true;
    }
  },
  side: {
    name: 'Side View',
    position: (channel) => {
      const radius = 20;
      channel.camera.position.set(0, radius * 0.5, radius * 2);
      channel.controls.target.set(0, 0, 0);
      channel.controls.enabled = true;
    }
  },
  top: {
    name: 'Top View',
    position: (channel) => {
      const radius = 20;
      channel.camera.position.set(0, radius * 2, 0);
      channel.controls.target.set(0, 0, 0);
      channel.controls.enabled = true;
    }
  },
  track: {
    name: 'Track Level',
    position: (channel) => {
      const radius = 20;
      channel.camera.position.set(radius * 0.7, 0.2, 0);
      channel.camera.lookAt(0, 0.2, 0);
      channel.controls.enabled = false;
    }
  },
  follow: {
    name: 'Follow Train',
    position: (channel) => {
      // Will be updated in animation loop
      channel.cameraFollowMode = true;
      channel.controls.enabled = false;
    }
  },
  entity: {
    name: 'Entity POV',
    position: (channel, entityLabel) => {
      const entities = appState.gridEntities.get(channel.id) || [];
      const entity = entities.find(e => e.label.toLowerCase().includes(entityLabel.toLowerCase()));
      
      if (entity) {
        // Position camera at entity's grid position
        const cell = channel.gridCells[entity.row * 9 + entity.col];
        if (cell && cell.mesh) {
          const pos = cell.mesh.position;
          channel.camera.position.set(pos.x, 3, pos.z + 2); // Slightly elevated and offset
          channel.camera.lookAt(pos.x, 1, pos.z);
          channel.controls.enabled = false;
          return `Camera positioned at ${entity.label}'s perspective`;
        }
      }
      return `Entity "${entityLabel}" not found on grid`;
    }
  }
};

// Add /camera command handler
function handleCameraCommand(channel, command) {
  const parts = command.toLowerCase().split(' ');
  const cameraCmd = parts[0];
  const mode = parts[1];
  const param = parts.slice(2).join(' ');
  
  if (cameraCmd !== '/camera') return false;
  
  if (!mode || mode === 'help' || mode === 'list') {
    const modeList = Object.keys(CAMERA_MODES).map(m => `- ${m}: ${CAMERA_MODES[m].name}`).join('\n');
    addMessage(channel, 'system', `🎥 CAMERA MODES:\n\n${modeList}\n\nUsage: /camera [mode] [entity name for entity mode]\n\nExample: /camera entity Paul\nExample: /camera overview`);
    renderMessages(channel);
    return true;
  }
  
  const cameraMode = CAMERA_MODES[mode];
  if (!cameraMode) {
    addMessage(channel, 'system', `❌ Unknown camera mode: "${mode}"\n\nType "/camera help" to see available modes.`);
    renderMessages(channel);
    return true;
  }
  
  // Apply camera mode
  if (mode === 'entity') {
    if (!param) {
      addMessage(channel, 'system', `❌ Entity mode requires an entity name.\n\nExample: /camera entity Paul`);
      renderMessages(channel);
      return true;
    }
    const result = cameraMode.position(channel, param);
    addMessage(channel, 'system', `🎥 ${result || 'Camera switched to Entity POV'}`);
  } else {
    cameraMode.position(channel);
    addMessage(channel, 'system', `🎥 Camera switched to: ${cameraMode.name}`);
  }
  
  renderMessages(channel);
  return true;
}

// Integrate into sendMessageWithLEGOS
// Add this check before AI API call:
/*
// CHECK FOR /CAMERA COMMAND
if (userText.startsWith('/camera')) {
  handleCameraCommand(channel, userText);
  return;
}
*/

// Add camera follow mode to animation loop
// In the animate() function for each channel:
/*
if (channel.cameraFollowMode && channel.trainCars && channel.trainCars.length > 0) {
  const train = channel.trainCars[0];
  const trainPos = train.group.position;
  const offset = new THREE.Vector3(0, 5, 10);
  channel.camera.position.copy(trainPos).add(offset);
  channel.camera.lookAt(trainPos);
}
*/

console.log('📹 Camera system patch loaded. Use /camera [mode] to switch views.');
