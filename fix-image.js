const fs = require('fs');
const s = fs.readFileSync('/data/data/com.termux/files/home/cia-store/build.js', 'utf8');

// The exact pattern to find: the span with emoji
const oldText = `'<span aria-hidden="true" style="z-index:1">'+(p.img||'🛒')+'</span>'`;
const newText = `((p.img&&p.img.startsWith('data:image/'))?'<img src="'+p.img+'" alt="" style="width:48px;height:48px;border-radius:8px;object-fit:cover">':'<span aria-hidden="true" style="z-index:1">'+(p.img||'🛒')+'</span>')`;

if (s.includes(oldText)) {
  const result = s.replace(oldText, newText);
  fs.writeFileSync('/data/data/com.termux/files/home/cia-store/build.js', result, 'utf8');
  console.log('✅ Fixed shop image rendering');
  console.log('Occurrences:', s.split(oldText).length - 1);
} else {
  console.log('❌ Pattern not found');
  // Try to find it differently - search for the text around it
  const idx = s.indexOf('z-index:1');
  if (idx >= 0) {
    console.log('Found z-index:1 at', idx);
    console.log('Context:', s.substring(idx, idx + 80));
  }
}
