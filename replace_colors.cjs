const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /bg-\[#0b1220\]/g, replacement: 'bg-bg-card' },
  { regex: /bg-\[#090f1d\]/g, replacement: 'bg-bg-card' },
  { regex: /bg-\[#070b14\]/g, replacement: 'bg-bg-sidebar' },
  { regex: /bg-gray-950\/40/g, replacement: 'bg-bg-hover' },
  { regex: /bg-gray-900\/60/g, replacement: 'bg-bg-hover' },
  { regex: /bg-gray-950/g, replacement: 'bg-bg-card' },
  { regex: /bg-gray-900\/20/g, replacement: 'bg-bg-hover' },
  { regex: /bg-gray-900/g, replacement: 'bg-bg-card' },
  { regex: /bg-gray-800\/50/g, replacement: 'bg-bg-hover' },
  { regex: /bg-\[linear-gradient\(135deg,#0b1220,#07101f_55%,#05131a\)\]/g, replacement: 'bg-bg-card' },

  { regex: /border-gray-800\/80/g, replacement: 'border-border-main' },
  { regex: /border-gray-800\/60/g, replacement: 'border-border-sub' },
  { regex: /border-gray-800\/40/g, replacement: 'border-border-sub' },
  { regex: /border-gray-700\/60/g, replacement: 'border-border-sub' },
  { regex: /border-gray-800/g, replacement: 'border-border-main' },

  { regex: /text-white/g, replacement: 'text-text-main' },
  { regex: /hover:text-white/g, replacement: 'hover:text-text-main' },
  { regex: /text-gray-200/g, replacement: 'text-text-main' },
  { regex: /text-gray-300/g, replacement: 'text-text-sub' },
  { regex: /text-gray-400/g, replacement: 'text-text-sub' },
  { regex: /text-gray-500/g, replacement: 'text-text-dim' },
  { regex: /text-gray-600/g, replacement: 'text-text-dim' },

  { regex: /bg-\[#00C969\]\/10/g, replacement: 'bg-accent-muted' },
  { regex: /border-\[#00C969\]\/20/g, replacement: 'border-accent/20' },
  { regex: /text-\[#40e682\]/g, replacement: 'text-accent' },
  { regex: /text-\[#00C969\]/g, replacement: 'text-accent' },
  { regex: /bg-\[#00C969\]/g, replacement: 'bg-accent' },
  { regex: /border-\[#00C969\]\/40/g, replacement: 'border-accent/40' },
  { regex: /border-\[#00C969\]\/50/g, replacement: 'border-accent/50' },
  { regex: /focus:border-\[#00C969\]\/50/g, replacement: 'focus:border-accent/50' },
  { regex: /hover:border-\[#00C969\]\/40/g, replacement: 'hover:border-accent/40' }
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replacement);
  });
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
