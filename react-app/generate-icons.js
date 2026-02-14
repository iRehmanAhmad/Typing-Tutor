import fs from 'fs';
import { createCanvas } from 'canvas';

const createIcon = (size) => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);

    // Border
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = size * 0.05;
    ctx.strokeRect(size * 0.025, size * 0.025, size * 0.95, size * 0.95);

    // Text (Keyboard Icon representation)
    ctx.fillStyle = '#eab308';
    ctx.font = `${size * 0.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⌨️', size / 2, size / 2);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/pwa-${size}x${size}.png`, buffer);
    console.log(`Created pwa-${size}x${size}.png`);
};

// Check if public dir exists
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// Create icons
// Note: This script requires 'canvas' package. 
// If 'canvas' is not available, we will skip generation and assume placeholders or use a simplified SVG-to-PNG approach if possible.
// For this environment, we might not have 'canvas' installed. 
// Let's simpler create an SVG file and save it as .svg, allowing the user to convert or the browser to use if supported (though manifest usually wants png).
// Actually, I'll just create a simple SVG for now as a placeholder since I can't guarantee 'canvas' is installed or installable easily on windows without build tools.

const svgContent = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0f172a"/>
  <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.9}" height="${size * 0.9}" fill="none" stroke="#eab308" stroke-width="${size * 0.05}"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="${size * 0.5}" fill="#eab308" text-anchor="middle" dominant-baseline="middle">TM</text>
</svg>
`;

fs.writeFileSync(`public/pwa-192x192.svg`, svgContent(192));
fs.writeFileSync(`public/pwa-512x512.svg`, svgContent(512));

console.log('Created SVG icons. NOTE: Real PWA requires PNGs. Please convert these SVGs to PNGs or use a tool.');
