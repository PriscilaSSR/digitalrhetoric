const container = document.querySelector('.container');
const leftContent = document.querySelector('.left');
const rightContent = document.querySelector('.right');
const divider = document.querySelector('.divider');

let isDragging = false;

// Function to initialize the divider's position
function initializeDivider() {
  const containerWidth = container.getBoundingClientRect().width;
  const initialX = containerWidth / 2;

  // Set the divider's initial position
  divider.style.left = `${initialX}px`;

  // Set the initial clip-path values
  const percentage = (initialX / containerWidth) * 100;
  leftContent.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  rightContent.style.clipPath = `inset(0 0 0 ${percentage}%)`;
}

// Mouse down to start dragging
divider.addEventListener('mousedown', () => {
  isDragging = true;
});

// Mouse move to drag
document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const containerRect = container.getBoundingClientRect();
  const x = event.clientX - containerRect.left; // Get mouse position relative to container

  // Restrict movement within the container
  const clampedX = Math.max(0, Math.min(x, containerRect.width));

  // Update positions
  const percentage = (clampedX / containerRect.width) * 100;
  leftContent.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  rightContent.style.clipPath = `inset(0 0 0 ${percentage}%)`;
  divider.style.left = `${clampedX}px`;
});

// Mouse up to stop dragging
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Initialize the divider's position on page load
window.addEventListener('load', initializeDivider);
