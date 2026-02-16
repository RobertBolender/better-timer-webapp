const fs = require('fs');

function createSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5f7cc9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b6bbd;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.35}" fill="none" stroke="white" stroke-width="${size*0.08}"/>
  <line x1="${size/2}" y1="${size/2}" x2="${size/2}" y2="${size*0.25}" stroke="white" stroke-width="${size*0.06}" stroke-linecap="round"/>
  <line x1="${size/2}" y1="${size/2}" x2="${size*0.65}" y2="${size*0.35}" stroke="white" stroke-width="${size*0.05}" stroke-linecap="round"/>
</svg>`;
}

fs.writeFileSync('icon-192x192.svg', createSVGIcon(192));
fs.writeFileSync('icon-512x512.svg', createSVGIcon(512));

console.log('SVG icons created');
