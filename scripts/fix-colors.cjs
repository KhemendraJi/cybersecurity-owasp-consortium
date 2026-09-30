const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace text-shadow
  content = content.replace(/text-shadow:[^;]+;/gi, '');
  
  // Replace drop-shadow
  content = content.replace(/drop-shadow\([^)]+\)/gi, '');
  
  // Replace mix-blend-mode
  content = content.replace(/mix-blend-mode:[^;]+;/gi, '');
  
  // Replace gradients
  content = content.replace(/linear-gradient\([^)]+\)/gi, 'rgba(0,0,0,0)');
  content = content.replace(/radial-gradient\([^)]+\)/gi, 'rgba(0,0,0,0)');
  content = content.replace(/background-image:\s*conic-gradient[^;]+;/gi, '');
  
  // Replace specific hex/rgba
  content = content.replace(/#27c93f/gi, '#ffffff'); // green status
  content = content.replace(/#ff5f56/gi, 'rgba(255,255,255,0.15)'); // os-window red
  content = content.replace(/#ffbd2e/gi, 'rgba(255,255,255,0.15)'); // os-window yellow
  content = content.replace(/#0a0b0b/gi, '#050505'); // dark non-grayscale
  content = content.replace(/#000a00/gi, '#000000'); // dark green
  content = content.replace(/#00ff88/gi, '#ffffff'); // bright green
  content = content.replace(/#ffd700/gi, '#ffffff'); // gold
  content = content.replace(/#ff6b6b/gi, '#ffffff'); // red
  content = content.replace(/#cd7f32/gi, '#ffffff'); // bronze

  // Replace rgbas
  content = content.replace(/rgba\(5,\s*6,\s*6,\s*([\d.]+)\)/gi, 'rgba(0,0,0,$1)');
  content = content.replace(/rgba\(0,\s*180,\s*216,\s*([\d.]+)\)/gi, 'rgba(255,255,255,$1)');
  content = content.replace(/rgba\(0,\s*245,\s*160,\s*([\d.]+)\)/gi, 'rgba(255,255,255,$1)');
  content = content.replace(/rgba\(255,\s*215,\s*0,\s*([\d.]+)\)/gi, 'rgba(255,255,255,$1)');
  content = content.replace(/rgba\(255,\s*107,\s*107,\s*([\d.]+)\)/gi, 'rgba(255,255,255,$1)');
  content = content.replace(/rgba\(0,\s*20,\s*0,\s*([\d.]+)\)/gi, 'rgba(0,0,0,$1)');

  // Fix os-window hovers which used backgrounds of red/yellow
  content = content.replace(/\.os-window:hover \.os-window__dot:nth-child\(1\) \{ background: [^;]+; \}/g, '.os-window:hover .os-window__dot { background: rgba(255,255,255,0.5); }');
  content = content.replace(/\.os-window:hover \.os-window__dot:nth-child\(2\) \{ background: [^;]+; \}/g, '');
  content = content.replace(/\.os-window:hover \.os-window__dot:nth-child\(3\) \{ background: [^;]+; \}/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      fixFile(fullPath);
    }
  }
}

walkDir(srcDir);
