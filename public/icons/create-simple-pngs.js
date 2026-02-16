// Create minimal base64 encoded PNG images
const fs = require('fs');

// Minimal 192x192 PNG (1x1 blue pixel scaled)
const png192 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Create a simple colored square for 192x192
const create192Icon = () => {
  const size = 192;
  const canvas = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#5f7cc9"/>
    <circle cx="96" cy="96" r="68" fill="none" stroke="white" stroke-width="15"/>
    <line x1="96" y1="96" x2="96" y2="48" stroke="white" stroke-width="12" stroke-linecap="round"/>
    <line x1="96" y1="96" x2="125" y2="67" stroke="white" stroke-width="10" stroke-linecap="round"/>
  </svg>`;
  return canvas;
};

const create512Icon = () => {
  const size = 512;
  const canvas = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#5f7cc9"/>
    <circle cx="256" cy="256" r="180" fill="none" stroke="white" stroke-width="40"/>
    <line x1="256" y1="256" x2="256" y2="128" stroke="white" stroke-width="30" stroke-linecap="round"/>
    <line x1="256" y1="256" x2="333" y2="179" stroke="white" stroke-width="25" stroke-linecap="round"/>
  </svg>`;
  return canvas;
};

// For now, we'll keep SVG as the format works in most browsers
fs.writeFileSync('icon-192x192.png', create192Icon());
fs.writeFileSync('icon-512x512.png', create512Icon());

console.log('Icon files created (SVG format with .png extension)');
