const fs = require('fs');
let s = fs.readFileSync('build.js', 'utf8');

// Find and remove the broken leftover category section between the reviews section and the products section
// Pattern: after reviews .join('')} there's leftover category closing tags
const target1 = '`).join(\'\')}\n        </div>\n            </div>\n          </a>`).join(\'\')}\n        </div>\n      </div></section>\n\n      <section class="section" aria-labelledby="prod-title"><div class="container">\n        <div style="margin-bottom:3rem">\n          <h2 id="prod-title" class="page-title">Premium <span class="text-gradient glow">Products</span></h2>\n        </div>\n        <div class="product-grid" role="list">${feat.map(card).join(\'\')}</div>\n        <div style="text-align:center;margin-top:3rem">\n          <a href="/shop/" class="btn btn-lg btn-primary">View All Products →</a>\n        </div>\n      </div></section>\n\n      <section class="section" aria-labelledby="rev-title"><div class="container">\n        <div style="text-align:center;margin-bottom:3rem">\n          <h2 id="rev-title" class="page-title">What Our <span class="text-gradient glow">Customers Say</span></h2>\n          <p class="page-desc" style="margin:0 auto">Join 10,000+ happy customers.</p>\n        </div>\n        <div class="review-grid" role="list">${REVIEWS.map((r,i)=>`\n          <div class="anim" role="listitem" style="padding:1.5rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)">\n            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">\n              <div aria-hidden="true" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--electric),var(--purple));display:flex;align-items:center;justify-content:center;font-size:.875rem;font-weight:700;color:white">${r.avatar}</div>\n              <div><div style="font-size:.875rem;font-weight:600;color:white">${r.user}</div><div style="font-size:.75rem;color:var(--text-muted)">${r.date}</div></div>\n            </div>\n            <div style="display:flex;gap:.125rem;margin-bottom:.75rem;color:var(--yellow)" aria-label="${r.rating} out of 5 stars">${"\'★\'".repeat(r.rating)}${"\'☆\'".repeat(5-r.rating)}</div>\n            <p style="font-size:.875rem;color:var(--text-dim);line-height:1.625;font-style:italic">"${r.text}"</p>\n          </div>`).join('')}\n        </div>';

const rep1 = '`).join(\'\')}\n        </div>\n      </div></section>\n\n      <section class="section" aria-labelledby="prod-title"><div class="container">';

const idx = s.indexOf(target1);
if (idx >= 0) {
  s = s.substring(0, idx) + rep1 + s.substring(idx + target1.length);
  fs.writeFileSync('build.js', s, 'utf8');
  console.log('Fixed!');
  process.exit(0);
}

// Try with simpler match
const target2 = '</a>`).join(\'\')}\n        </div>\n      </div></section>\n\n      <section class="section" aria-labelledby="prod-title"><div class="container">\n        <div style="margin-bottom:3rem">\n          <h2 id="prod-title" class="page-title">Premium <span class="text-gradient glow">Products</span></h2>';
const rep2 = '</div></section>\n\n      <section class="section" aria-labelledby="prod-title"><div class="container">';
const idx2 = s.indexOf(target2);
if (idx2 >= 0) {
  s = s.substring(0, idx2) + rep2 + s.substring(idx2 + target2.length);
  fs.writeFileSync('build.js', s, 'utf8');
  console.log('Fixed with target2!');
  process.exit(0);
}

console.log('Could not fix automatically');
