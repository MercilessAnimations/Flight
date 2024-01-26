// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

// Create player object
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
camera.position.z = 5;

// Add gravity
const gravity = 0.01;
let playerVelocityY = 0;

// Gliding physics variables
let gliding = false;
const glideForce = 0.05;

// Mouse movement variables
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;

// Terrain generation
const terrainSize = 20;
const terrainHeight = 5;

for (let x = -terrainSize / 2; x < terrainSize / 2; x++) {
  for (let z = -terrainSize / 2; z < terrainSize / 2; z++) {
    const cubeGeometry = new THREE.BoxGeometry(1, Math.random() * terrainHeight, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(x, cube.geometry.parameters.height / 2, z);
    scene.add(cube);
  }
}

// Mouse movement controls
document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const movementX = event.movementX || event.mozMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || 0;
    mouseX += movementX;
    mouseY += movementY;
  }
});

document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

// Basic movement controls
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      player.position.z -= 0.1;
      break;
    case 's':
      player.position.z += 0.1;
      break;
    case 'a':
      player.position.x -= 0.1;
      break;
    case 'd':
      player.position.x += 0.1;
      break;
    case ' ':
      // Start gliding
      gliding = true;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === ' ') {
    // Stop gliding
    gliding = false;
  }
});

// Update function for animation
function animate() {
  requestAnimationFrame(animate);

  // Apply gravity
  if (!gliding) {
    player.position.y -= playerVelocityY;
    playerVelocityY += gravity;
  }

  // Apply gliding force based on mouse movement
  if (gliding && mouseY !== 0) {
    playerVelocityY -= mouseY * 0.0005;
    mouseY = 0;
  }

  // Prevent player from falling through the ground
  if (player.position.y < 0) {
    player.position.y = 0;
    playerVelocityY = 0;
  }

  // Rotate player based on mouse movement
  player.rotation.y += mouseX * 0.005;
  mouseX = 0;

  renderer.render(scene, camera);
}

animate();
