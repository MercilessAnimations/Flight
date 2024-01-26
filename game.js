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
const gravity = 0.1;
let playerVelocityY = 0;

// Gliding physics variables
let gliding = false;
let glideForce = 0.02;

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
  player.position.y -= playerVelocityY;
  playerVelocityY -= gravity;

  // Prevent player from falling through the ground
  if (player.position.y < 0) {
    player.position.y = 0;
    playerVelocityY = 0;
  }

  // Apply gliding force
  if (gliding && playerVelocityY < 0.5) {
    playerVelocityY += glideForce;
  }

  renderer.render(scene, camera);
}

animate();
