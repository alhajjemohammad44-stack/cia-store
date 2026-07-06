/**
 * ⚡ CIA STORE — Production Server
 * Self-contained Node.js HTTP server. No build step needed.
 * Run: node server.js
 * Then tunnel: ./cloudflared tunnel --url http://localhost:3456
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3456;
const PUBLIC_DIR = path.join(__dirname, 'public');

// ═══════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════

const categories = [
  { id: 'cat-bloxfruit', name: 'Blox Fruits', nameAr: 'بلوكس فروت', slug: 'bloxfruit', desc: 'Premium Blox Fruits accounts, fruits, and gamepasses. Dominate the seas with the rarest items.', descAr: 'حسابات بلوكس فروت الممتازة والفواكه وجيم باسات.', count: 24, image: '🎮' },
  { id: 'cat-robux', name: 'Robux', nameAr: 'روبوكس', slug: 'robux', desc: 'Cheapest Robux top-up in the market. Fast delivery.', descAr: 'أرخص شحن روبوكس في السوق.', count: 12, image: '💰' },
  { id: 'cat-accounts', name: 'Accounts', nameAr: 'حسابات', slug: 'accounts', desc: 'Max level accounts with rare skins and full inventories.', descAr: 'حسابات ماكس ليفل مع سكنات نادرة.', count: 18, image: '👤' },
  { id: 'cat-gamepasses', name: 'Gamepasses', nameAr: 'جيم باسات', slug: 'gamepasses', desc: 'Unlock premium gamepasses at the best prices.', descAr: 'افتح جيم باسات المتميزة بأفضل الأسعار.', count: 15, image: '🎯' },
];

const products = [
  { id: 'p1', name: 'Dragon Fruit', nameAr: 'فاكهة التنين', cat: 'bloxfruit', sub: 'Fruits', price: 32, orig: 50, rarity: 'Legendary', stock: 67, desc: 'The legendary Dragon Fruit transforms you into a mighty dragon. Breathe fire and dominate the seas!', descAr: 'فاكهة التنين الأسطورية تحولك إلى تنين جبار.', features: ['Instant delivery via trade', 'Level 700+ required', 'Full transformation', 'Best price'], img: '🐉' },
  { id: 'p2', name: 'Venom Fruit', nameAr: 'فاكهة السم', cat: 'bloxfruit', sub: 'Fruits', price: 28, orig: 45, rarity: 'Mythical', stock: 34, desc: 'Unleash toxic devastation with the Venom Fruit. Turn into a venomous hydra!', descAr: 'أطلق العنان للدمار السام بفاكهة السم.', features: ['Instant trade', 'Level 700+', 'AOE poison', 'Great PvP'], img: '🐍' },
  { id: 'p3', name: 'Kitsune Fruit', nameAr: 'فاكهة كيتسوني', cat: 'bloxfruit', sub: 'Fruits', price: 45, orig: 70, rarity: 'Mythical', stock: 22, desc: 'The mythical Kitsune Fruit grants fox-like abilities with devastating fire power.', descAr: 'فاكهة كيتسوني الأسطورية تمنح قدرات الثعلب.', features: ['Instant trade', 'Level 700+', 'Fire transformation', 'Galaxy skin'], img: '🦊' },
  { id: 'p4', name: 'Light Fruit', nameAr: 'فاكهة الضوء', cat: 'bloxfruit', sub: 'Fruits', price: 12, rarity: 'Legendary', stock: 89, desc: 'Become light itself! Move at incredible speeds and blind your enemies.', descAr: 'كن أنت الضوء! تحرك بسرعات لا تصدق.', features: ['Instant trade', 'Fast grinding', 'Speed buffs', 'Great for new'], img: '💡' },
  { id: 'p5', name: 'Dragon Permanent', nameAr: 'التنين الدائم', cat: 'bloxfruit', sub: 'Perms', price: 42, orig: 65, rarity: 'Legendary', stock: 45, desc: 'Own the Dragon Fruit forever! Never lose your favorite fruit.', descAr: 'امتلك فاكهة التنين للأبد!', features: ['Permanent', 'Gift delivery', 'No level req', 'Never expires'], img: '🐉' },
  { id: 'p6', name: 'Venom Permanent', nameAr: 'السم الدائم', cat: 'bloxfruit', sub: 'Perms', price: 38, orig: 55, rarity: 'Mythical', stock: 31, desc: 'Get the Venom Fruit permanently. Own it forever!', descAr: 'احصل على فاكهة السم بشكل دائم.', features: ['Permanent', 'Gift delivery', 'No level req', 'Safe'], img: '🐍' },
  { id: 'p7', name: '400 Robux', nameAr: '٤٠٠ روبوكس', cat: 'robux', sub: '', price: 3.50, orig: 4.99, rarity: 'Common', stock: 999, desc: 'Get 400 Robux at the cheapest price. Instant delivery.', descAr: 'احصل على ٤٠٠ روبوكس بأرخص سعر.', features: ['Instant', 'Group funds', 'Safe', 'Best price'], img: '💰' },
  { id: 'p8', name: '1700 Robux', nameAr: '١٧٠٠ روبوكس', cat: 'robux', sub: '', price: 12.99, orig: 19.99, rarity: 'Uncommon', stock: 999, desc: 'Get 1700 Robux at an unbeatable price. Most popular!', descAr: 'احصل على ١٧٠٠ روبوكس بسعر لا يقبل المنافسة.', features: ['Instant', 'Group funds', 'Safe', 'Most popular'], img: '💰' },
  { id: 'p9', name: '4500 Robux', nameAr: '٤٥٠٠ روبوكس', cat: 'robux', sub: '', price: 29.99, orig: 49.99, rarity: 'Rare', stock: 500, desc: 'Best value! Get 4500 Robux at the best price per Robux.', descAr: 'أفضل قيمة! احصل على ٤٥٠٠ روبوكس.', features: ['Instant', 'Group funds', 'Best value', 'Premium'], img: '💎' },
  { id: 'p10', name: 'Blox Fruit Max Account', nameAr: 'حساب بلوكس فروت ماكس', cat: 'accounts', sub: 'Blox Fruit', price: 55, orig: 85, rarity: 'Legendary', stock: 8, desc: 'Max level Blox Fruit account with full stats and rare items.', descAr: 'حساب بلوكس فروت ماكس ليفل مع إحصائيات كاملة.', features: ['Max level 2550+', 'All fighting styles', 'Full stat reset', 'Rare items', 'Email change'], img: '👤' },
  { id: 'p11', name: 'OG Account 2018', nameAr: 'حساب قديم ٢٠١٨', cat: 'accounts', sub: '', price: 120, orig: 200, rarity: 'Mythical', stock: 3, desc: 'Rare OG Roblox account from 2018 with limited items.', descAr: 'حساب روبلوكس قديم نادر من ٢٠١٨.', features: ['Created 2018', 'Limited items', 'Rare skins', 'Email access', 'Premium'], img: '👑' },
  { id: 'p12', name: '2x Mastery', nameAr: 'ضعف الخبرة', cat: 'gamepasses', sub: '', price: 8.99, orig: 12.99, rarity: 'Rare', stock: 200, desc: 'Double your mastery gain in Blox Fruits. Level up faster!', descAr: 'ضاعف اكتساب الخبرة في بلوكس فروت.', features: ['Permanent', 'Instant', 'All weapons', 'Stackable'], img: '⚡' },
  { id: 'p13', name: '2x Money', nameAr: 'ضعف المال', cat: 'gamepasses', sub: '', price: 8.99, orig: 12.99, rarity: 'Rare', stock: 200, desc: 'Earn double Beli from all sources. Become rich faster!', descAr: 'اكسب ضعف البيلي من جميع المصادر.', features: ['Permanent', 'Instant', 'All Beli', 'Best grinding'], img: '💵' },
  { id: 'p14', name: 'Dark Blade', nameAr: 'السيف المظلم', cat: 'gamepasses', sub: '', price: 15, orig: 25, rarity: 'Legendary', stock: 50, desc: 'Unlock the legendary Dark Blade. One of the most iconic swords!', descAr: 'افتح السيف المظلم الأسطوري.', features: ['Legendary sword', 'Special Z attack', 'Increased damage', 'Instant'], img: '🗡️' },
  { id: 'p15', name: 'Lightning Purple Skin', nameAr: 'سكن البرق البنفسجي', cat: 'bloxfruit', sub: 'Fruits', price: 32, rarity: 'Legendary', stock: 6, desc: 'Rare Lightning Purple Skin for your fruit. Look legendary!', descAr: 'سكن البرق البنفسجي النادر لفاكهتك.', features: ['Instant trade', 'Level 700+', 'Rare skin', 'Limited stock'], img: '⚡' },
];

const reviews = [
  { id: 1, user: 'ShadowX_Pro', avatar: 'S', rating: 5, text: 'Best store on the market! Got my Dragon Fruit in under 5 minutes. Insane service!', product: 'Dragon Fruit', date: '2 days ago' },
  { id: 2, user: 'ProGamer99', avatar: 'P', rating: 5, text: 'Been buying here for months. Always reliable, best prices, and support is super fast.', product: '1700 Robux', date: '1 week ago' },
  { id: 3, user: 'BloxKing99', avatar: 'B', rating: 5, text: 'The Max Account I bought was stacked. All fighting styles maxed. Worth every penny.', product: 'Max Account', date: '2 weeks ago' },
  { id: 4, user: 'NinjaWarrior', avatar: 'N', rating: 5, text: 'Fast delivery even at 3AM! These guys never sleep. Highly recommend!', product: 'Venom Permanent', date: '3 weeks ago' },
];

// ═══════════════════════════════════════════════════
// HTML TEMPLATES
// ═══════════════════════════════════════════════════

const CSS = fs.readFileSync(path.join(__dirname, 'src', 'app', 'globals.css'), 'utf8')
  .replace(/@tailwind.*?;/g, '')
  .replace(/@import.*?;/g, '')
  .replace(/@layer.*?\{/g, '')
  .replace(/\}$/g, '');

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;

function html(title, content, extraHead = '') {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr" class="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | CIA Store</title>
${FONTS}
${extraHead}
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #050B14; color: rgba(255,255,255,0.9); min-height: 100vh; }
${CSS}
</style>
</head>
<body>
<div class="min-h-screen bg-dark bg-grid">
<div class="fixed inset-0 bg-gradient-conic pointer-events-none"></div>
${content}
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

function header(active = '') {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/shop?cat=bloxfruit', label: 'Blox Fruits' },
    { href: '/shop?cat=robux', label: 'Robux' },
    { href: '/shop?cat=accounts', label: 'Accounts' },
  ];
  return `<header class="fixed top-0 left-0 right-0 z-50 glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <a href="/" class="flex items-center gap-2 group">
          <div class="w-9 h-9 rounded-lg bg-electric/20 border border-electric/30 flex items-center justify-center group-hover:bg-electric/30 transition-all">
            <span class="text-electric text-lg">⚡</span>
          </div>
          <span class="text-xl font-heading font-black text-white tracking-tight">CIA <span class="text-electric glow-text">STORE</span></span>
        </a>
        <nav class="hidden lg:flex items-center gap-1">
          ${links.map(l => `<a href="${l.href}" class="px-4 py-2 text-sm font-medium ${active === l.href ? 'text-electric' : 'text-white/60 hover:text-white'} hover:bg-white/5 rounded-lg transition-all">${l.label}</a>`).join('')}
        </nav>
        <div class="flex items-center gap-2">
          <a href="/cart"><button class="p-2.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all relative"><span>🛒</span></button></a>
          <a href="/auth/login"><button class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all">Sign In</button></a>
          <a href="/shop"><button class="px-4 py-2 rounded-xl bg-electric text-white text-sm font-bold shadow-[0_0_20px_rgba(0,163,255,0.2)] hover:shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all">Shop Now</button></a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="relative border-t border-white/5 bg-dark-200 mt-16">
    <div class="absolute inset-0 bg-gradient-to-t from-electric/[0.02] to-transparent pointer-events-none"></div>
    <div class="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div class="col-span-2 md:col-span-1">
          <a href="/" class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-electric/20 border border-electric/30 flex items-center justify-center"><span class="text-electric">⚡</span></div>
            <span class="text-lg font-heading font-black text-white">CIA <span class="text-electric">STORE</span></span>
          </a>
          <p class="text-sm text-white/40 leading-relaxed mb-4">Premium gaming digital goods store. Fast delivery, best prices, 100% secure.</p>
        </div>
        <div><h4 class="text-sm font-bold text-white mb-3">Shop</h4>
          <ul class="space-y-2">${['All Products','Blox Fruits','Robux','Accounts','Gamepasses'].map(l => `<li><a href="/shop?cat=${l.toLowerCase().replace(/\s/g,'')}" class="text-sm text-white/40 hover:text-electric transition-colors">${l}</a></li>`).join('')}</ul>
        </div>
        <div><h4 class="text-sm font-bold text-white mb-3">Support</h4>
          <ul class="space-y-2">${['Contact Us','FAQ','Delivery Info','Refund Policy'].map(l => `<li><a href="/${l.toLowerCase().replace(/\s/g,'-')}" class="text-sm text-white/40 hover:text-electric transition-colors">${l}</a></li>`).join('')}</ul>
        </div>
        <div><h4 class="text-sm font-bold text-white mb-3">Company</h4>
          <ul class="space-y-2">${['About Us','Terms of Service','Privacy Policy','Reviews'].map(l => `<li><a href="/${l.toLowerCase().replace(/\s/g,'-').replace(/ of /g,'-')}" class="text-sm text-white/40 hover:text-electric transition-colors">${l}</a></li>`).join('')}</ul>
        </div>
      </div>
      <div class="pt-8 border-t border-white/5 text-center">
        <p class="text-xs text-white/30">© ${new Date().getFullYear()} CIA Store. All rights reserved. Made with ❤️ for gamers.</p>
      </div>
    </div>
  </footer>`;
}

function productCard(p, featured = false) {
  const discount = p.orig ? Math.round((1 - p.price/p.orig)*100) : 0;
  const rarityColors = { Common: 'bg-white/10 text-white/70', Uncommon: 'bg-green-500/10 text-green-400', Rare: 'bg-blue-500/10 text-blue-400', Epic: 'bg-purple-500/10 text-purple-400', Legendary: 'bg-orange-500/10 text-orange-400', Mythical: 'bg-pink-500/10 text-pink-400' };
  return `<a href="/product/${p.id}" class="group block">
    <div class="rounded-2xl bg-dark-100 border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-electric/30 group-hover:shadow-[0_0_40px_rgba(0,163,255,0.08)]">
      <div class="relative aspect-[4/3] bg-gradient-to-br from-dark-50 to-dark flex items-center justify-center">
        <span class="text-5xl">${p.img}</span>
        <div class="absolute top-3 left-3 flex flex-col gap-2">
          ${p.rarity ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${rarityColors[p.rarity] || ''} border border-current/20">${p.rarity}</span>` : ''}
          ${discount > 0 ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">-${discount}%</span>` : ''}
        </div>
      </div>
      <div class="p-4 md:p-5 space-y-3">
        <div><p class="text-xs text-electric/70 font-medium mb-1">${categories.find(c=>c.slug===p.cat)?.name || p.cat}</p><h3 class="text-base md:text-lg font-bold text-white group-hover:text-electric transition-colors">${p.name}</h3></div>
        <p class="text-sm text-white/40 line-clamp-2">${p.desc}</p>
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-baseline gap-2"><span class="text-xl font-black text-white">$${p.price.toFixed(2)}</span>${p.orig ? `<span class="text-sm text-white/30 line-through">$${p.orig.toFixed(2)}</span>` : ''}</div>
          <span class="px-3 py-1.5 rounded-lg bg-electric/20 text-electric text-xs font-bold border border-electric/30 opacity-0 group-hover:opacity-100 transition-opacity">🛒 Add</span>
        </div>
        <div class="flex flex-wrap gap-1.5">${p.features.slice(0,2).map(f => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">${f}</span>`).join('')}${p.features.length > 2 ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">+${p.features.length-2}</span>` : ''}</div>
      </div>
    </div>
  </a>`;
}

// ═══════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════

function homePage() {
  const featured = products.slice(0, 6);
  return html('Premium Gaming Digital Goods', `
    ${header('/')}
    <main>
      <!-- Hero -->
      <section class="relative min-h-[90vh] flex items-center overflow-hidden">
        <div class="absolute inset-0"><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-[120px] animate-pulse-slow"></div><div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow" style="animation-delay:2s"></div></div>
        <div class="container mx-auto px-4 md:px-6 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-8 animate-in">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-sm font-bold"><span>⚡</span> Premium Gaming Digital Store</div>
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight">Level Up Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400 glow-text">Gaming Arsenal</span></h1>
              <p class="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">Premium accounts, rare in-game items, currency packs, and exclusive gamepasses at unbeatable prices. Instant delivery, 100% secure.</p>
              <div class="flex flex-wrap gap-4">
                <a href="/shop"><button class="h-14 px-10 rounded-2xl bg-electric text-white font-bold text-base shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(0,163,255,0.5)] transition-all">Explore Store →</button></a>
                <a href="/shop?cat=bloxfruit"><button class="h-14 px-10 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 transition-all">Blox Fruits</button></a>
              </div>
              <div class="grid grid-cols-3 gap-6 pt-4">
                ${[{icon:'⚡',label:'Instant',sub:'Delivery'},{icon:'🛡️',label:'100%',sub:'Secure'},{icon:'🕐',label:'24/7',sub:'Support'}].map(s => `<div class="flex items-center gap-3"><div class="p-2 rounded-lg bg-electric/10 border border-electric/20"><span class="text-electric">${s.icon}</span></div><div><div class="text-sm font-bold text-white">${s.label}</div><div class="text-xs text-white/40">${s.sub}</div></div></div>`).join('')}
              </div>
            </div>
            <div class="hidden lg:flex items-center justify-center">
              <div class="relative w-full max-w-lg aspect-square">
                <div class="absolute inset-0 bg-gradient-to-br from-electric/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div class="relative w-full h-full rounded-3xl border border-white/10 bg-dark-100/80 backdrop-blur-sm flex items-center justify-center">
                  <div class="text-center p-8">
                    <div class="w-20 h-20 mx-auto rounded-2xl bg-electric/20 border border-electric/30 flex items-center justify-center mb-6 animate-float"><span class="text-4xl text-electric">⚡</span></div>
                    <h3 class="text-2xl font-heading font-bold text-white mb-2">CIA STORE</h3>
                    <p class="text-white/40 text-sm mb-6">Premium Gaming Digital Goods</p>
                    <div class="grid grid-cols-2 gap-3">${['Accounts','Robux','Skins','Gamepasses'].map(i => `<div class="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/70 text-sm font-medium">${i}</div>`).join('')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-12 md:py-16"><div class="container mx-auto px-4 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          ${[{icon:'⚡',label:'Instant Delivery',desc:'Within minutes'},{icon:'🛡️',label:'100% Secure',desc:'Gold guarantee'},{icon:'🕐',label:'24/7 Support',desc:'Always online'},{icon:'👥',label:'Trusted Community',desc:'10K+ customers'},{icon:'✨',label:'Best Prices',desc:'Price match'},{icon:'💎',label:'Premium Quality',desc:'Verified items'}].map(f => `
            <div class="group p-4 md:p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-white/10 transition-all text-center">
              <div class="text-2xl mb-3">${f.icon}</div>
              <h4 class="text-sm font-bold text-white mb-0.5">${f.label}</h4>
              <p class="text-xs text-white/40">${f.desc}</p>
            </div>`).join('')}
        </div>
      </div></section>

      <!-- Categories -->
      <section class="py-16 md:py-24"><div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4"><span>📋</span> Categories</div>
            <h2 class="text-3xl md:text-5xl font-heading font-black text-white leading-tight">Browse by <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 glow-text">Category</span></h2>
          </div>
          <a href="/shop"><button class="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all">All Categories →</button></a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          ${categories.map(c => `
            <a href="/shop?cat=${c.slug}" class="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-dark-100 hover:border-electric/30 transition-all">
              <div class="absolute inset-0 bg-gradient-to-br from-dark-50 via-dark-100 to-dark"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10"></div>
              <div class="absolute top-6 right-6 z-20"><div class="text-4xl">${c.image}</div></div>
              <div class="absolute bottom-0 left-0 right-0 p-5 z-20">
                <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-electric/10 text-electric border border-electric/20 mb-2">${c.count} Products</span>
                <h3 class="text-xl font-heading font-bold text-white mb-1 group-hover:text-electric transition-colors">${c.name}</h3>
                <p class="text-sm text-white/40 line-clamp-2">${c.desc}</p>
              </div>
            </a>`).join('')}
        </div>
      </div></section>

      <!-- Featured Products -->
      <section class="py-16 md:py-24"><div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-bold mb-4"><span>✨</span> Top Picks</div>
            <h2 class="text-3xl md:text-5xl font-heading font-black text-white leading-tight">Premium <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400 glow-text">Products</span></h2>
          </div>
          <a href="/shop"><button class="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all">View All →</button></a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          ${featured.map(p => productCard(p)).join('')}
        </div>
      </div></section>

      <!-- Reviews -->
      <section class="py-16 md:py-24"><div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mb-4"><span>⭐</span> Trusted by Gamers</div>
          <h2 class="text-3xl md:text-5xl font-heading font-black text-white leading-tight">What Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400 glow-text">Customers Say</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${reviews.map(r => `
            <div class="p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/20 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-purple-500 flex items-center justify-center text-sm font-bold text-white">${r.avatar}</div>
                <div><div class="text-sm font-bold text-white">${r.user}</div><div class="text-xs text-white/30">${r.date}</div></div>
              </div>
              <div class="flex gap-0.5 mb-3">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
              <p class="text-sm text-white/60 leading-relaxed mb-3">"${r.text}"</p>
              <span class="text-xs text-electric/60">${r.product}</span>
            </div>`).join('')}
        </div>
      </div></section>
    </main>
    ${footer()}
  `);
}

function shopPage(cat = '') {
  let filtered = products;
  if (cat) filtered = filtered.filter(p => p.cat === cat);
  const catInfo = cat ? categories.find(c => c.slug === cat) : null;
  
  return html('Shop — Gaming Digital Goods', `
    ${header('/shop')}
    <main class="pt-24 md:pt-28 pb-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mb-8">
          <h1 class="text-3xl md:text-5xl font-heading font-black text-white mb-3">${catInfo ? catInfo.name : 'Products'} <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400 glow-text">Store</span></h1>
          <p class="text-white/50 max-w-xl">${catInfo ? catInfo.desc : 'Browse our collection of premium gaming digital goods.'}</p>
        </div>
        <div class="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          <a href="/shop"><button class="h-10 px-4 rounded-xl text-sm font-bold transition-all ${!cat ? 'bg-electric text-white' : 'bg-dark-100 text-white/60 border border-white/10 hover:border-white/30'}">All</button></a>
          ${categories.map(c => `<a href="/shop?cat=${c.slug}"><button class="h-10 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${cat === c.slug ? 'bg-electric text-white' : 'bg-dark-100 text-white/60 border border-white/10 hover:border-white/30'}">${c.name}</button></a>`).join('')}
        </div>
        <p class="text-sm text-white/30 mb-6">Showing ${filtered.length} of ${products.length} products</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          ${filtered.map(p => productCard(p)).join('')}
        </div>
      </div>
    </main>
    ${footer()}
  `);
}

function productPage(id) {
  const p = products.find(x => x.id === id);
  if (!p) return html('Product Not Found', `${header()}<main class="pt-24 pb-16 text-center py-20"><h1 class="text-3xl font-bold text-white mb-4">Product Not Found</h1><a href="/shop"><button class="px-5 py-2.5 rounded-xl bg-electric text-white font-bold">Back to Shop</button></a></main>${footer()}`);
  
  const discount = p.orig ? Math.round((1 - p.price/p.orig)*100) : 0;
  const related = products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const rarityColors = { Common: 'bg-white/10 text-white/70', Uncommon: 'bg-green-500/10 text-green-400', Rare: 'bg-blue-500/10 text-blue-400', Epic: 'bg-purple-500/10 text-purple-400', Legendary: 'bg-orange-500/10 text-orange-400', Mythical: 'bg-pink-500/10 text-pink-400' };

  return html(p.name, `
    ${header()}
    <main class="pt-24 md:pt-28 pb-16">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex items-center gap-2 text-sm text-white/30 mb-6">
          <a href="/" class="hover:text-electric">Home</a><span>/</span>
          <a href="/shop" class="hover:text-electric">Shop</a><span>/</span>
          <a href="/shop?cat=${p.cat}" class="hover:text-electric">${categories.find(c=>c.slug===p.cat)?.name||p.cat}</a><span>/</span>
          <span class="text-white/50">${p.name}</span>
        </div>
        <div class="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div class="relative aspect-square rounded-3xl bg-gradient-to-br from-dark-50 to-dark border border-white/5 flex items-center justify-center">
            <span class="text-8xl">${p.img}</span>
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              ${p.rarity ? `<span class="px-3 py-1 rounded-full text-sm font-bold ${rarityColors[p.rarity] || ''} border border-current/20">${p.rarity}</span>` : ''}
              ${discount > 0 ? `<span class="px-3 py-1 rounded-full text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20">-${discount}% OFF</span>` : ''}
            </div>
          </div>
          <div class="space-y-6">
            <div>
              <p class="text-sm text-electric font-medium mb-2">${categories.find(c=>c.slug===p.cat)?.name||p.cat} ${p.sub ? '• '+p.sub : ''}</p>
              <h1 class="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-3">${p.name}</h1>
              <div class="flex items-center gap-4">
                <span class="text-3xl md:text-4xl font-black text-electric glow-text">$${p.price.toFixed(2)}</span>
                ${p.orig ? `<span class="text-lg text-white/30 line-through">$${p.orig.toFixed(2)}</span>` : ''}
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${p.stock > 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}">${p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
            <p class="text-white/60 leading-relaxed">${p.desc}</p>
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-white/70 uppercase tracking-wider">What's Included</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${p.features.map(f => `<div class="flex items-center gap-2 text-sm text-white/60"><span class="text-electric">✓</span> ${f}</div>`).join('')}
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-dark-100 border border-white/5">
              ${[{icon:'⚡',label:'Instant',sub:'Delivery'},{icon:'🛡️',label:'100%',sub:'Secure'},{icon:'🕐',label:'24/7',sub:'Support'}].map(s => `<div class="text-center"><div class="text-xl mb-1">${s.icon}</div><div class="text-sm font-bold text-white">${s.label}</div><div class="text-xs text-white/40">${s.sub}</div></div>`).join('')}
            </div>
            <div class="space-y-3">
              <label class="flex items-center gap-1.5 text-sm font-bold text-white/70 uppercase tracking-wider">In-Game Username / Player ID <span class="text-xs text-white/30 font-normal">(required for delivery)</span></label>
              <input type="text" placeholder="Enter your Roblox/Game username" class="w-full h-12 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50">
            </div>
            <div class="flex gap-3 pt-2">
              <button class="flex-1 h-14 rounded-2xl bg-electric text-white font-bold text-base shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(0,163,255,0.5)] transition-all">🛒 Add to Cart — $${p.price.toFixed(2)}</button>
              <button class="px-6 h-14 rounded-2xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">Buy Now</button>
            </div>
            <div class="flex items-center gap-4 text-xs text-white/30 pt-2">
              <span>🔒 Secure checkout</span>
              <span>💳 Stripe • PayPal • USDT</span>
            </div>
          </div>
        </div>
        ${related.length > 0 ? `
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-6">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${related.map(r => `<a href="/product/${r.id}" class="group p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/30 transition-all">
            <div class="text-3xl mb-3">${r.img}</div>
            <h3 class="font-bold text-white group-hover:text-electric transition-colors mb-1">${r.name}</h3>
            <p class="text-sm text-white/40 line-clamp-2 mb-3">${r.desc}</p>
            <div class="flex items-center justify-between"><span class="text-lg font-black text-white">$${r.price.toFixed(2)}</span>${r.orig ? `<span class="text-xs text-white/30 line-through">$${r.orig.toFixed(2)}</span>` : ''}</div>
          </a>`).join('')}
        </div>` : ''}
      </div>
    </main>
    ${footer()}
  `);
}

// ═══════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════

function serveStatic(res, filepath) {
  const ext = path.extname(filepath).toLowerCase();
  const mimes = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2' };
  try {
    const data = fs.readFileSync(filepath);
    res.writeHead(200, { 'Content-Type': mimes[ext] || 'application/octet-stream', 'Cache-Control': 'public, max-age=3600' });
    res.end(data);
  } catch { return false; }
  return true;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const params = Object.fromEntries(url.searchParams);

  // Static files
  if (pathname.startsWith('/public/') || pathname.startsWith('/images/') || pathname.startsWith('/icons/')) {
    const filepath = path.join(__dirname, pathname);
    if (serveStatic(res, filepath)) return;
  }

  // Serve manifest.json
  if (pathname === '/manifest.json') {
    const m = fs.readFileSync(path.join(PUBLIC_DIR, 'manifest.json'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(m);
  }

  // Routes
  let content;
  switch (pathname) {
    case '/':
    case '/home':
      content = homePage();
      break;
    case '/shop':
      content = shopPage(params.cat || '');
      break;
    default:
      if (pathname.startsWith('/product/')) {
        const id = pathname.split('/')[2];
        content = productPage(id);
      } else {
        content = html('Page Not Found', `${header()}<main class="pt-24 pb-16 text-center py-20"><h1 class="text-3xl font-bold text-white mb-4">404 — Page Not Found</h1><p class="text-white/50 mb-6">The page you're looking for doesn't exist.</p><a href="/"><button class="px-5 py-2.5 rounded-xl bg-electric text-white font-bold">Back to Home</button></a></main>${footer()}`);
      }
  }

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-cache',
  });
  res.end(content);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  ⚡ CIA STORE server running at:`);
  console.log(`  ─────────────────────────────────────`);
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log(`  📋  ${products.length} products · ${categories.length} categories`);
  console.log(`  ─────────────────────────────────────\n`);
});
