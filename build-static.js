/**
 * ⚡ CIA STORE — STATIC SITE BUILDER (v2 BEAUTIFUL)
 * Dark neon cyber gaming aesthetic — like mzzstore.com
 * Run: node build-static.js && npx surge dist/ gaming-arsenal.surge.sh
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  { id:'bloxfruit', name:'Blox Fruits', icon:'🐉', color:'#FF6B35', count:24, desc:'Rare fruits, accounts & gamepasses' },
  { id:'robux', name:'Robux', icon:'💰', color:'#00E5FF', count:12, desc:'Cheapest Robux top-up' },
  { id:'accounts', name:'Accounts', icon:'👤', color:'#A855F7', count:18, desc:'Max level & OG accounts' },
  { id:'gamepasses', name:'Gamepasses', icon:'🎯', color:'#FACC15', count:15, desc:'Unlock premium perks' },
];

const PRODUCTS = [
  { id:'p1', name:'Dragon Fruit', nameAr:'فاكهة التنين', cat:'bloxfruit', sub:'Fruits', price:32, orig:50, rarity:'Legendary', color:'#FF6B35', stock:67, desc:'Transform into a mighty dragon. Breathe fire and dominate the seas!', features:['Instant trade delivery','Level 700+ required','Full transformation','Best price guarantee'], img:'🐉', orders:234 },
  { id:'p2', name:'Venom Fruit', nameAr:'فاكهة السم', cat:'bloxfruit', sub:'Fruits', price:28, orig:45, rarity:'Mythical', color:'#A855F7', stock:34, desc:'Unleash toxic devastation! Turn into a venomous hydra.', features:['Instant trade','Level 700+','AOE poison','Great PvP'], img:'🐍', orders:189 },
  { id:'p3', name:'Kitsune Fruit', nameAr:'فاكهة كيتسوني', cat:'bloxfruit', sub:'Fruits', price:45, orig:70, rarity:'Mythical', color:'#EC4899', stock:22, desc:'Mythical fox-like abilities with devastating fire power.', features:['Instant trade','Level 700+','Fire transformation','Galaxy skin'], img:'🦊', orders:156 },
  { id:'p4', name:'Light Fruit', nameAr:'فاكهة الضوء', cat:'bloxfruit', sub:'Fruits', price:12, rarity:'Legendary', color:'#00E5FF', stock:89, desc:'Become light itself! Move at incredible speeds.', features:['Instant trade','Fast grinding','Speed buffs','Great for new'], img:'💡', orders:312 },
  { id:'p5', name:'Dragon Permanent', nameAr:'التنين الدائم', cat:'bloxfruit', sub:'Perms', price:42, orig:65, rarity:'Legendary', color:'#FF6B35', stock:45, desc:'Own the Dragon Fruit forever! Never lose it.', features:['Permanent','Gift delivery','No level req','Never expires'], img:'🐉', orders:98 },
  { id:'p6', name:'Venom Permanent', nameAr:'السم الدائم', cat:'bloxfruit', sub:'Perms', price:38, orig:55, rarity:'Mythical', color:'#A855F7', stock:31, desc:'Venom Fruit permanently! Own it forever.', features:['Permanent','Gift delivery','No level req','Safe'], img:'🐍', orders:76 },
  { id:'p7', name:'400 Robux', nameAr:'٤٠٠ روبوكس', cat:'robux', sub:'', price:3.50, orig:4.99, rarity:'Common', color:'#00E5FF', stock:999, desc:'400 Robux at the cheapest price!', features:['Instant delivery','Group funds','100% safe','Best price'], img:'💰', orders:567 },
  { id:'p8', name:'1700 Robux', nameAr:'١٧٠٠ روبوكس', cat:'robux', sub:'', price:12.99, orig:19.99, rarity:'Uncommon', color:'#00E5FF', stock:999, desc:'1700 Robux — most popular pack!', features:['Instant delivery','Group funds','Most popular','Best value'], img:'💰', orders:892 },
  { id:'p9', name:'4500 Robux', nameAr:'٤٥٠٠ روبوكس', cat:'robux', sub:'', price:29.99, orig:49.99, rarity:'Rare', color:'#FACC15', stock:500, desc:'Best value! 4500 Robux at unbeatable price.', features:['Instant delivery','Best value','Premium','Group funds'], img:'💎', orders:445 },
  { id:'p10', name:'Max Account', nameAr:'حساب ماكس', cat:'accounts', sub:'Blox Fruit', price:55, orig:85, rarity:'Legendary', color:'#FF6B35', stock:8, desc:'Max level Blox Fruit account, full stats.', features:['Max level 2550+','All fighting styles','Full stat reset','Email change'], img:'👤', orders:67 },
  { id:'p11', name:'OG Account 2018', nameAr:'حساب قديم', cat:'accounts', sub:'', price:120, orig:200, rarity:'Mythical', color:'#EC4899', stock:3, desc:'Rare OG Roblox account from 2018.', features:['Created 2018','Limited items','Rare skins','Email access'], img:'👑', orders:23 },
  { id:'p12', name:'2x Mastery', nameAr:'ضعف خبرة', cat:'gamepasses', sub:'', price:8.99, orig:12.99, rarity:'Rare', color:'#FACC15', stock:200, desc:'Double mastery gain! Level up faster.', features:['Permanent','Instant','All weapons','Stackable'], img:'⚡', orders:312 },
  { id:'p13', name:'2x Money', nameAr:'ضعف مال', cat:'gamepasses', sub:'', price:8.99, orig:12.99, rarity:'Rare', color:'#00E5FF', stock:200, desc:'Earn double Beli from all sources!', features:['Permanent','Instant','All Beli','Best grinding'], img:'💵', orders:289 },
  { id:'p14', name:'Dark Blade', nameAr:'السيف المظلم', cat:'gamepasses', sub:'', price:15, orig:25, rarity:'Legendary', color:'#A855F7', stock:50, desc:'Unlock the legendary Dark Blade!', features:['Legendary sword','Special Z attack','Increased damage','Instant'], img:'🗡️', orders:178 },
  { id:'p15', name:'Lightning Skin', nameAr:'سكن البرق', cat:'bloxfruit', sub:'Skins', price:32, rarity:'Legendary', color:'#00E5FF', stock:6, desc:'Rare Lightning Purple Skin for your fruit.', features:['Instant trade','Level 700+','Rare skin','Limited stock'], img:'⚡', orders:45 },
];

const REVIEWS = [
  { user:'ShadowX_Pro', avatar:'S', rating:5, text:'Best store on the market! Got my Dragon Fruit in under 5 minutes. Insane service!', date:'2 days ago' },
  { user:'ProGamer99', avatar:'P', rating:5, text:'Been buying here for months. Always reliable, best prices!', date:'1 week ago' },
  { user:'BloxKing99', avatar:'B', rating:5, text:'The Max Account I bought was stacked. Worth every penny.', date:'2 weeks ago' },
  { user:'NinjaWarrior', avatar:'N', rating:5, text:'Fast delivery even at 3AM! Highly recommend!', date:'3 weeks ago' },
  { user:'DragonSlayer', avatar:'D', rating:5, text:'Dragon Fruit was delivered instantly. Crazy fast!', date:'1 month ago' },
  { user:'RobuxMaster', avatar:'R', rating:4, text:'Great prices on Robux. Will buy again for sure.', date:'1 month ago' },
];

const CSS = `/* ═══════════════════════════════════════════════════
   ⚡ CIA STORE — MASTER STYLESHEET
   Dark Neon Cyber Gaming Aesthetic
   ═══════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
  --bg: #050B14;
  --bg2: #080F1E;
  --bg3: #0B1528;
  --bg4: #0F1D38;
  --card: #0A1428;
  --card-hover: #0F1D38;
  --electric: #00A3FF;
  --electric-dim: rgba(0,163,255,0.15);
  --cyan: #22D3EE;
  --purple: #A855F7;
  --pink: #EC4899;
  --orange: #FF6B35;
  --yellow: #FACC15;
  --green: #4ADE80;
  --red: #F87171;
  --gold: #FFD700;
  --text: rgba(255,255,255,0.9);
  --text-dim: rgba(255,255,255,0.5);
  --text-muted: rgba(255,255,255,0.3);
  --border: rgba(255,255,255,0.06);
  --border-light: rgba(255,255,255,0.1);
  --radius: 16px;
  --radius-sm: 10px;
  --radius-lg: 24px;
  --shadow: 0 4px 30px rgba(0,0,0,0.3);
  --glow-blue: 0 0 20px rgba(0,163,255,0.15), 0 0 40px rgba(0,163,255,0.05);
  --glow-purple: 0 0 20px rgba(168,85,247,0.15), 0 0 40px rgba(168,85,247,0.05);
}

*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:'Inter',sans-serif;
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
img{max-width:100%}
.container{max-width:1280px;margin:0 auto;padding:0 1.5rem}
@media(max-width:640px){.container{padding:0 1rem}}

/* ─── UTILITIES ─── */
.font-heading{font-family:'Orbitron',sans-serif}
.font-mono{font-family:'JetBrains Mono',monospace}
.text-electric{color:var(--electric)}
.text-gradient{background:linear-gradient(135deg,var(--electric),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-purple{background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-fire{background:linear-gradient(135deg,var(--orange),var(--yellow));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-gold{background:linear-gradient(135deg,var(--gold),var(--yellow));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glow{text-shadow:0 0 20px rgba(0,163,255,0.3),0 0 40px rgba(0,163,255,0.1)}
.glow-purple{text-shadow:0 0 20px rgba(168,85,247,0.3),0 0 40px rgba(168,85,247,0.1)}
.glow-orange{text-shadow:0 0 20px rgba(255,107,53,0.3),0 0 40px rgba(255,107,53,0.1)}

/* ─── GRID PATTERN ─── */
.bg-grid{
  background-image:
    linear-gradient(rgba(0,163,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,163,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: center center;
}
.bg-grid-dense{
  background-image:
    linear-gradient(rgba(0,163,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,163,255,0.04) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* ─── ANIMATIONS ─── */
@keyframes float{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-12px)}
}
@keyframes pulse-glow{
  0%,100%{opacity:0.6;transform:scale(1)}
  50%{opacity:1;transform:scale(1.05)}
}
@keyframes shimmer{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}
@keyframes fadeInUp{
  from{opacity:0;transform:translateY(30px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes fadeIn{
  from{opacity:0}to{opacity:1}
}
@keyframes scaleIn{
  from{opacity:0;transform:scale(0.9)}
  to{opacity:1;transform:scale(1)}
}
@keyframes border-run{
  0%{background-position:0% 0%}
  100%{background-position:200% 200%}
}
@keyframes twinkle{
  0%,100%{opacity:0.3;transform:scale(0.8)}
  50%{opacity:1;transform:scale(1.2)}
}
.animate-float{animation:float 3s ease-in-out infinite}
.animate-pulse-glow{animation:pulse-glow 4s ease-in-out infinite}
.animate-fade-in{animation:fadeIn 0.6s ease-out both}
.animate-fade-up{animation:fadeInUp 0.6s ease-out both}
.animate-scale{animation:scaleIn 0.5s ease-out both}
.anim-delay-1{animation-delay:0.1s}
.anim-delay-2{animation-delay:0.2s}
.anim-delay-3{animation-delay:0.3s}
.anim-delay-4{animation-delay:0.4s}
.anim-delay-5{animation-delay:0.5s}

/* ─── HEADER ─── */
.header{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(5,11,20,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  transition:all 0.3s;
}
.header.scrolled{background:rgba(5,11,20,0.95);box-shadow:0 4px 30px rgba(0,0,0,0.5)}
.header-inner{
  display:flex;align-items:center;justify-content:space-between;
  height:72px;
}
@media(min-width:768px){.header-inner{height:80px;padding:0 1.5rem}}

.logo{display:flex;align-items:center;gap:0.75rem}
.logo-icon{
  width:40px;height:40px;border-radius:var(--radius-sm);
  background:linear-gradient(135deg,var(--electric-dim),transparent);
  border:1px solid rgba(0,163,255,0.3);
  display:flex;align-items:center;justify-content:center;
  font-size:1.25rem;position:relative;
}
.logo-icon::after{
  content:'';position:absolute;inset:-1px;
  border-radius:var(--radius-sm);
  background:linear-gradient(135deg,var(--electric),var(--cyan),transparent);
  opacity:0;transition:opacity 0.3s;z-index:-1;
}
.logo:hover .logo-icon::after{opacity:0.5}
.logo-text{font-family:'Orbitron',sans-serif;font-size:1.25rem;font-weight:900;color:white;letter-spacing:-0.02em}

.nav{display:none;align-items:center;gap:0.25rem}
@media(min-width:1024px){.nav{display:flex}}
.nav-link{
  padding:0.5rem 1rem;border-radius:var(--radius-sm);
  font-size:0.875rem;font-weight:500;color:var(--text-dim);
  transition:all 0.2s;position:relative;
}
.nav-link:hover,.nav-link.active{color:white;background:rgba(255,255,255,0.04)}
.nav-link.active{color:var(--electric)}
.nav-link::after{
  content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);
  width:0;height:2px;border-radius:2px;
  background:var(--electric);transition:width 0.3s;
}
.nav-link:hover::after,.nav-link.active::after{width:60%}

.header-actions{display:flex;align-items:center;gap:0.5rem}

.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;
  font-weight:600;border-radius:var(--radius-sm);
  border:none;cursor:pointer;transition:all 0.3s;
  font-family:inherit;text-decoration:none;white-space:nowrap;
}
.btn-sm{height:36px;padding:0 1rem;font-size:0.8125rem}
.btn-md{height:44px;padding:0 1.5rem;font-size:0.875rem}
.btn-lg{height:52px;padding:0 2rem;font-size:1rem}
.btn-primary{
  background:linear-gradient(135deg,var(--electric),#0088CC);
  color:white;box-shadow:0 0 20px rgba(0,163,255,0.2);
}
.btn-primary:hover{box-shadow:0 0 40px rgba(0,163,255,0.4);transform:translateY(-1px)}
.btn-outline{
  background:transparent;border:1px solid var(--border-light);
  color:var(--text);
}
.btn-outline:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.2)}
.btn-ghost{background:transparent;color:var(--text-dim)}
.btn-ghost:hover{background:rgba(255,255,255,0.04);color:white}
.btn-icon{padding:0.5rem;border-radius:var(--radius-sm);background:transparent;color:var(--text-dim);border:none;cursor:pointer;transition:all 0.2s}
.btn-icon:hover{background:rgba(255,255,255,0.04);color:white}

/* ─── HERO ─── */
.hero{
  position:relative;min-height:100vh;display:flex;align-items:center;
  overflow:hidden;padding-top:80px;
}
.hero-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.particle{
  position:absolute;width:3px;height:3px;border-radius:50%;
  background:var(--electric);opacity:0;
  animation:twinkle 3s ease-in-out infinite;
}
.hero-glow{
  position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;
}
.hero-glow-1{top:10%;left:5%;width:40rem;height:40rem;background:rgba(0,163,255,0.06);animation:pulse-glow 6s ease-in-out infinite}
.hero-glow-2{bottom:10%;right:5%;width:35rem;height:35rem;background:rgba(168,85,247,0.05);animation:pulse-glow 8s ease-in-out 2s infinite}
.hero-glow-3{top:50%;left:50%;width:30rem;height:30rem;background:rgba(255,107,53,0.03);animation:pulse-glow 7s ease-in-out 4s infinite}
.hero-content{position:relative;z-index:10;display:grid;gap:3rem;align-items:center;padding:4rem 0}
@media(min-width:1024px){.hero-content{grid-template-columns:1.2fr 1fr;gap:4rem;padding:2rem 0}}
.hero-tag{
  display:inline-flex;align-items:center;gap:0.5rem;
  padding:0.375rem 1rem;border-radius:9999px;
  background:rgba(0,163,255,0.08);border:1px solid rgba(0,163,255,0.2);
  font-size:0.75rem;font-weight:700;color:var(--electric);text-transform:uppercase;letter-spacing:0.05em;
  width:fit-content;margin-bottom:1rem;
}
.hero-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--electric);animation:pulse-glow 2s ease-in-out infinite}
.hero-title{
  font-family:'Orbitron',sans-serif;font-weight:900;color:white;
  line-height:1.05;letter-spacing:-0.03em;margin-bottom:1.5rem;
  font-size:2.5rem;
}
@media(min-width:640px){.hero-title{font-size:3.5rem}}
@media(min-width:1024px){.hero-title{font-size:4.5rem}}
@media(min-width:1280px){.hero-title{font-size:5.5rem}}
.hero-desc{
  font-size:1.125rem;color:var(--text-dim);max-width:36rem;
  line-height:1.7;margin-bottom:2rem;
}
@media(min-width:768px){.hero-desc{font-size:1.25rem}}
.hero-actions{display:flex;flex-wrap:wrap;gap:1rem}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:24rem;margin-top:2.5rem}
.hero-stat{display:flex;align-items:center;gap:0.75rem}
.hero-stat-dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 8px rgba(74,222,128,0.4)}
.hero-stat-label{font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.03em}
.hero-stat-value{font-size:0.875rem;font-weight:700;color:white;margin-top:1px}

.hero-visual{display:none;justify-content:center}
@media(min-width:1024px){.hero-visual{display:flex}}
.hero-card{
  position:relative;width:100%;max-width:420px;aspect-ratio:1;
  border-radius:var(--radius-lg);
  background:linear-gradient(135deg,var(--bg3),var(--bg));
  border:1px solid var(--border);
  padding:2rem;display:flex;flex-direction:column;align-items:center;justify-content:center;
  overflow:hidden;
}
.hero-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,transparent,rgba(0,163,255,0.03));
  pointer-events:none;
}
.hero-card-glow{
  position:absolute;width:20rem;height:20rem;border-radius:50%;
  background:rgba(0,163,255,0.06);filter:blur(60px);
  top:50%;left:50%;transform:translate(-50%,-50%);
  animation:pulse-glow 4s ease-in-out infinite;
}
.hero-card-icon{
  width:5rem;height:5rem;border-radius:var(--radius);
  background:linear-gradient(135deg,rgba(0,163,255,0.12),rgba(0,163,255,0.05));
  border:1px solid rgba(0,163,255,0.25);
  display:flex;align-items:center;justify-content:center;
  font-size:2.5rem;margin-bottom:1.5rem;position:relative;z-index:1;
  animation:float 3s ease-in-out infinite;
}
.hero-card-title{font-family:'Orbitron',sans-serif;font-size:1.5rem;font-weight:700;color:white;margin-bottom:0.5rem;position:relative;z-index:1}
.hero-card-sub{font-size:0.875rem;color:var(--text-dim);margin-bottom:1.5rem;position:relative;z-index:1}
.hero-card-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;width:100%;position:relative;z-index:1}
.hero-card-item{
  padding:0.625rem 1rem;border-radius:var(--radius-sm);
  background:rgba(255,255,255,0.03);border:1px solid var(--border);
  color:var(--text-dim);font-size:0.875rem;font-weight:500;text-align:center;
}

/* ─── FEATURES ─── */
.features{padding:3rem 0;position:relative}
@media(min-width:768px){.features{padding:6rem 0}}
.features-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem}
@media(min-width:640px){.features-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.features-grid{grid-template-columns:repeat(6,1fr)}}
.feature-item{
  padding:1.5rem 1rem;border-radius:var(--radius);
  background:var(--card);border:1px solid var(--border);
  text-align:center;transition:all 0.3s;
}
.feature-item:hover{border-color:rgba(0,163,255,0.2);transform:translateY(-2px);box-shadow:var(--glow-blue)}
.feature-icon{font-size:1.75rem;margin-bottom:0.75rem}
.feature-title{font-size:0.875rem;font-weight:700;color:white;margin-bottom:0.25rem}
.feature-desc{font-size:0.75rem;color:var(--text-dim)}

/* ─── SECTION ─── */
.section{padding:4rem 0;position:relative}
@media(min-width:768px){.section{padding:6rem 0}}
.section-header{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:3rem}
@media(min-width:768px){.section-header{flex-direction:row;align-items:flex-end;justify-content:space-between}}
.section-tag{
  display:inline-flex;align-items:center;gap:0.5rem;
  padding:0.25rem 0.75rem;border-radius:9999px;
  font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;
  width:fit-content;margin-bottom:0.5rem;
}
.section-tag-blue{background:rgba(0,163,255,0.08);border:1px solid rgba(0,163,255,0.2);color:var(--electric)}
.section-tag-purple{background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);color:var(--purple)}
.section-tag-orange{background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.2);color:var(--orange)}
.section-tag-yellow{background:rgba(250,204,21,0.08);border:1px solid rgba(250,204,21,0.2);color:var(--yellow)}
.section-heading{font-family:'Orbitron',sans-serif;font-weight:900;color:white;line-height:1.1;font-size:1.75rem}
@media(min-width:768px){.section-heading{font-size:2.5rem}}
@media(min-width:1024px){.section-heading{font-size:3rem}}
.section-desc{color:var(--text-dim);max-width:32rem;font-size:0.875rem;line-height:1.625}

/* ─── PRODUCT CARD ─── */
.product-grid{display:grid;grid-template-columns:repeat(1,1fr);gap:1.25rem}
@media(min-width:500px){.product-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:900px){.product-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1200px){.product-grid{grid-template-columns:repeat(4,1fr)}}

.product-card{
  display:block;border-radius:var(--radius);background:var(--card);
  border:1px solid var(--border);
  overflow:hidden;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.1);
  position:relative;
}
.product-card::before{
  content:'';position:absolute;inset:0;
  border-radius:var(--radius);padding:1px;
  background:linear-gradient(135deg,transparent,transparent);
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;transition:all 0.4s;
}
.product-card:hover::before{
  background:linear-gradient(135deg,rgba(0,163,255,0.3),rgba(0,163,255,0.1),transparent);
}
.product-card:hover{
  border-color:rgba(0,163,255,0.15);
  transform:translateY(-4px);
  box-shadow:0 20px 60px rgba(0,0,0,0.3),0 0 40px rgba(0,163,255,0.05);
}
.product-media{
  position:relative;aspect-ratio:4/3;
  background:linear-gradient(135deg,var(--bg2),var(--bg));
  display:flex;align-items:center;justify-content:center;
  font-size:3rem;overflow:hidden;
}
.product-media::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(to bottom,transparent 60%,var(--card));
  pointer-events:none;
}
.product-badges{position:absolute;top:0.75rem;left:0.75rem;display:flex;flex-direction:column;gap:0.375rem;z-index:2}
.product-badge{
  padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.7rem;font-weight:700;
  border:1px solid;display:inline-flex;align-items:center;gap:0.25rem;
  backdrop-filter:blur(4px);
}
.badge-legendary{background:rgba(255,107,53,0.15);color:var(--orange);border-color:rgba(255,107,53,0.3)}
.badge-mythical{background:rgba(168,85,247,0.15);color:var(--purple);border-color:rgba(168,85,247,0.3)}
.badge-rare{background:rgba(250,204,21,0.15);color:var(--yellow);border-color:rgba(250,204,21,0.3)}
.badge-epic{background:rgba(168,85,247,0.1);color:#c084fc;border-color:rgba(168,85,247,0.2)}
.badge-uncommon{background:rgba(0,229,255,0.1);color:var(--cyan);border-color:rgba(0,229,255,0.2)}
.badge-common{background:rgba(255,255,255,0.05);color:var(--text-dim);border-color:rgba(255,255,255,0.1)}
.badge-discount{background:rgba(248,113,113,0.15);color:var(--red);border-color:rgba(248,113,113,0.3)}
.badge-new{background:rgba(74,222,128,0.15);color:var(--green);border-color:rgba(74,222,128,0.3)}

.product-body{padding:1rem 1.25rem 1.25rem;display:flex;flex-direction:column;gap:0.75rem}
.product-cat{font-size:0.7rem;color:var(--electric);font-weight:600;text-transform:uppercase;letter-spacing:0.05em}
.product-name{font-size:1rem;font-weight:700;color:white;transition:color 0.3s}
.product-card:hover .product-name{color:var(--electric)}
.product-desc{font-size:0.8125rem;color:var(--text-dim);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.product-footer{display:flex;align-items:center;justify-content:space-between;padding-top:0.25rem}
.product-price{font-size:1.25rem;font-weight:800;color:white}
.product-price-orig{font-size:0.8125rem;color:var(--text-muted);text-decoration:line-through;margin-left:0.5rem}
.product-buy{
  width:36px;height:36px;border-radius:50%;
  background:rgba(0,163,255,0.12);border:1px solid rgba(0,163,255,0.25);
  display:flex;align-items:center;justify-content:center;
  color:var(--electric);font-size:1rem;cursor:pointer;transition:all 0.3s;
  opacity:0;transform:translateX(10px);
}
.product-card:hover .product-buy{opacity:1;transform:translateX(0)}
.product-buy:hover{background:var(--electric);color:white}
.product-tags{display:flex;flex-wrap:wrap;gap:0.375rem}
.product-tag{
  font-size:0.625rem;padding:0.125rem 0.5rem;border-radius:9999px;
  background:rgba(255,255,255,0.04);color:var(--text-muted);
}

/* ─── CATEGORIES ─── */
.cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
@media(min-width:640px){.cat-grid{grid-template-columns:repeat(4,1fr)}}
.cat-card{
  display:block;position:relative;border-radius:var(--radius);
  overflow:hidden;aspect-ratio:3/4;
  background:var(--card);border:1px solid var(--border);
  transition:all 0.4s;
}
.cat-card:hover{border-color:rgba(0,163,255,0.3);transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.cat-card-bg{position:absolute;inset:0;background:linear-gradient(135deg,var(--bg2),var(--bg),var(--bg))}
.cat-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 20%,transparent 60%);z-index:1}
.cat-card-icon{position:absolute;top:1.5rem;right:1.5rem;font-size:3rem;z-index:2}
.cat-card-body{position:absolute;bottom:0;left:0;right:0;padding:1.5rem;z-index:2}
.cat-card-count{padding:0.125rem 0.625rem;border-radius:9999px;font-size:0.7rem;font-weight:700;background:rgba(0,163,255,0.1);color:var(--electric);border:1px solid rgba(0,163,255,0.2);display:inline-flex;margin-bottom:0.5rem}
.cat-card-name{font-family:'Orbitron',sans-serif;font-size:1.25rem;font-weight:700;color:white;margin-bottom:0.25rem;transition:color 0.3s}
.cat-card:hover .cat-card-name{color:var(--electric)}
.cat-card-desc{font-size:0.8125rem;color:var(--text-dim);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

/* ─── REVIEWS ─── */
.review-grid{display:grid;grid-template-columns:repeat(1,1fr);gap:1rem}
@media(min-width:600px){.review-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1000px){.review-grid{grid-template-columns:repeat(3,1fr)}}
.review-card{
  padding:1.5rem;border-radius:var(--radius);
  background:var(--card);border:1px solid var(--border);
  transition:all 0.3s;
}
.review-card:hover{border-color:rgba(0,163,255,0.15);box-shadow:var(--glow-blue)}
.review-header{display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem}
.review-avatar{
  width:40px;height:40px;border-radius:50%;
  background:linear-gradient(135deg,var(--electric),var(--purple));
  display:flex;align-items:center;justify-content:center;
  font-size:0.875rem;font-weight:700;color:white;
}
.review-author{font-size:0.875rem;font-weight:600;color:white}
.review-date{font-size:0.75rem;color:var(--text-muted)}
.review-stars{display:flex;gap:0.125rem;margin-bottom:0.75rem;color:var(--yellow);font-size:0.875rem}
.review-text{font-size:0.875rem;color:var(--text-dim);line-height:1.625;margin-bottom:0.75rem;font-style:italic}
.review-tag{font-size:0.75rem;color:rgba(0,163,255,0.5)}

/* ─── FOOTER ─── */
.footer{
  position:relative;border-top:1px solid var(--border);
  background:var(--bg2);margin-top:6rem;
}
.footer-inner{
  display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;
  padding:4rem 1.5rem;
}
@media(min-width:768px){.footer-inner{grid-template-columns:repeat(4,1fr);padding:4rem 2rem}}
.footer-title{font-size:0.875rem;font-weight:700;color:white;margin-bottom:1rem}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:0.625rem}
.footer-links a{font-size:0.875rem;color:var(--text-dim);transition:color 0.2s}
.footer-links a:hover{color:var(--electric)}
.footer-bottom{border-top:1px solid var(--border);padding:1.5rem;text-align:center}
.footer-bottom p{font-size:0.75rem;color:var(--text-muted)}

/* ─── SHOP ─── */
.page-main{padding-top:6rem;padding-bottom:4rem}
@media(min-width:768px){.page-main{padding-top:7rem}}
.filters{display:flex;gap:0.5rem;margin-bottom:2rem;overflow-x:auto;padding-bottom:0.5rem;-webkit-overflow-scrolling:touch}
.filter-btn{
  height:38px;padding:0 1.125rem;border-radius:9999px;
  font-size:0.8125rem;font-weight:600;border:none;cursor:pointer;
  transition:all 0.2s;white-space:nowrap;font-family:inherit;
}
.filter-btn.active{background:var(--electric);color:white;box-shadow:0 0 20px rgba(0,163,255,0.2)}
.filter-btn:not(.active){background:var(--card);color:var(--text-dim);border:1px solid var(--border)}
.filter-btn:not(.active):hover{background:var(--card-hover);color:white;border-color:var(--border-light)}

/* ─── PRODUCT DETAIL ─── */
.breadcrumb{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--text-muted);margin-bottom:2rem;flex-wrap:wrap}
.breadcrumb a:hover{color:var(--electric)}
.detail-grid{display:grid;gap:2rem;margin-bottom:4rem}
@media(min-width:1024px){.detail-grid{grid-template-columns:1fr 1fr;gap:4rem}}
.detail-image{
  aspect-ratio:1;border-radius:var(--radius-lg);
  background:linear-gradient(135deg,var(--bg2),var(--bg));
  border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  font-size:6rem;position:relative;
}
@media(min-width:768px){.detail-image{font-size:8rem}}
.detail-image-badges{position:absolute;top:1rem;left:1rem;display:flex;flex-direction:column;gap:0.5rem}
.detail-info{display:flex;flex-direction:column;gap:1.5rem}
.detail-cat{font-size:0.875rem;color:var(--electric);font-weight:600;text-transform:uppercase;letter-spacing:0.05em}
.detail-name{font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:900;color:white;line-height:1.1}
@media(min-width:768px){.detail-name{font-size:2.75rem}}
.detail-pricing{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
.detail-price{font-size:2.5rem;font-weight:900;color:var(--electric)}
.detail-price-orig{font-size:1.125rem;color:var(--text-muted);text-decoration:line-through}
.detail-stock{display:inline-flex;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:600}
.detail-stock.in{background:rgba(74,222,128,0.1);color:var(--green);border:1px solid rgba(74,222,128,0.2)}
.detail-stock.out{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.2)}
.detail-desc{color:var(--text-dim);line-height:1.75;font-size:1rem}
.detail-features{display:grid;grid-template-columns:repeat(1,1fr);gap:0.625rem}
@media(min-width:640px){.detail-features{grid-template-columns:repeat(2,1fr)}}
.detail-feature{display:flex;align-items:center;gap:0.625rem;font-size:0.875rem;color:var(--text-dim)}
.detail-feature-check{color:var(--green);font-weight:700}
.detail-guarantee{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)}
.detail-guarantee-item{text-align:center}
.detail-guarantee-icon{font-size:1.5rem;margin-bottom:0.25rem}
.detail-guarantee-label{font-size:0.875rem;font-weight:600;color:white}
.detail-guarantee-sub{font-size:0.75rem;color:var(--text-dim)}
.detail-input-wrap{display:flex;flex-direction:column;gap:0.5rem}
.detail-input-label{font-size:0.8125rem;font-weight:600;color:var(--text-dim);display:flex;align-items:center;gap:0.375rem;text-transform:uppercase;letter-spacing:0.03em}
.detail-input-hint{font-size:0.75rem;color:var(--text-muted);font-weight:400;text-transform:none;letter-spacing:normal}
.detail-input{height:48px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:0.875rem;outline:none;transition:border-color 0.2s;width:100%}
.detail-input:focus{border-color:rgba(0,163,255,0.4)}
.detail-input::placeholder{color:var(--text-muted)}
.detail-actions{display:flex;gap:0.75rem;padding-top:0.5rem}
.detail-btn-primary{flex:1;height:52px;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--electric),#0088CC);color:white;font-weight:700;font-size:1rem;border:none;cursor:pointer;box-shadow:0 0 20px rgba(0,163,255,0.2);transition:all 0.3s}
.detail-btn-primary:hover{box-shadow:0 0 40px rgba(0,163,255,0.4);transform:translateY(-1px)}
.detail-btn-secondary{height:52px;padding:0 1.5rem;border-radius:var(--radius-sm);background:rgba(255,255,255,0.04);border:1px solid var(--border);color:white;font-weight:600;cursor:pointer;transition:all 0.2s;font-size:0.875rem}
.detail-btn-secondary:hover{background:rgba(255,255,255,0.08)}
.detail-security{display:flex;align-items:center;gap:1rem;font-size:0.75rem;color:var(--text-muted);padding-top:0.5rem}

/* ─── RELATED ─── */
.related-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
@media(min-width:640px){.related-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.related-grid{grid-template-columns:repeat(4,1fr)}}
.related-card{display:block;padding:1rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);transition:all 0.3s}
.related-card:hover{border-color:rgba(0,163,255,0.2);transform:translateY(-2px)}
.related-icon{font-size:1.5rem;margin-bottom:0.5rem}
.related-name{font-weight:600;color:white;font-size:0.875rem;margin-bottom:0.25rem;transition:color 0.3s}
.related-card:hover .related-name{color:var(--electric)}
.related-desc{font-size:0.75rem;color:var(--text-dim);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:0.5rem}
.related-foot{display:flex;align-items:center;justify-content:space-between}
.related-price{font-weight:700;color:white;font-size:1rem}
.related-price-orig{font-size:0.75rem;color:var(--text-muted);text-decoration:line-through}

/* ─── CART / AUTH / STATIC ─── */
.page-center{max-width:32rem;margin:0 auto;padding:4rem 1rem;text-align:center}
.page-icon{font-size:4rem;margin-bottom:1.5rem}
.page-title{font-family:'Orbitron',sans-serif;font-size:2.25rem;font-weight:900;color:white;margin-bottom:0.75rem}
.page-desc{color:var(--text-dim);margin-bottom:2rem;line-height:1.625}
.card-form{padding:2rem;border-radius:var(--radius-lg);background:var(--card);border:1px solid var(--border)}
.form-group{margin-bottom:1.25rem}
.form-label{font-size:0.8125rem;font-weight:600;color:var(--text-dim);margin-bottom:0.5rem;display:block}
.form-input{width:100%;height:48px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:0.875rem;outline:none}

/* ─── FAQ ─── */
.faq-list{display:flex;flex-direction:column;gap:0.75rem;max-width:48rem;margin:0 auto}
.faq-item{padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);cursor:pointer;transition:all 0.2s}
.faq-item:hover{border-color:rgba(0,163,255,0.15)}
.faq-question{font-weight:600;color:white;font-size:0.9375rem}
.faq-answer{margin-top:0.75rem;color:var(--text-dim);line-height:1.625;font-size:0.875rem}

/* ─── 404 ─── */
.error-page{text-align:center;padding:6rem 1rem}
.error-code{font-family:'Orbitron',sans-serif;font-size:8rem;font-weight:900;background:linear-gradient(135deg,var(--electric),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:1rem}

/* ─── RESPONSIVE ─── */
@media(max-width:640px){
  .hero-title{font-size:2rem}
  .section-heading{font-size:1.5rem}
  .detail-name{font-size:1.5rem}
  .detail-price{font-size:1.75rem}
}
`;

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

function html(title, content, extra='') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | CIA STORE</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<style>${CSS}</style>
${extra}
</head>
<body class="bg-grid">${content}
<script>document.querySelector('.header').classList.add('scrolled')</script>
</body></html>`;
}

function header(active='') {
  return `<header class="header">
    <div class="container header-inner">
      <a href="/" class="logo">
        <div class="logo-icon">⚡</div>
        <span class="logo-text">CIA <span class="text-gradient glow">STORE</span></span>
      </a>
      <nav class="nav">${[
        ['Home','/'],
        ['Shop','/shop'],
        ['Blox Fruits','/shop/bloxfruit'],
        ['Robux','/shop/robux'],
        ['Accounts','/shop/accounts'],
      ].map(([l,h])=>`<a href="${h}" class="nav-link${active===h?' active':''}">${l}</a>`).join('')}</nav>
      <div class="header-actions">
        <a href="/cart" class="btn-icon">🛒</a>
        <a href="/auth" class="btn btn-sm btn-outline">Sign In</a>
        <a href="/shop" class="btn btn-sm btn-primary">Shop Now</a>
      </div>
    </div>
  </header>`;
}

function footer() {
  const cols = [
    ['Shop', 'All Products','Blox Fruits','Robux','Accounts','Gamepasses'],
    ['Support','Contact Us','FAQ','Delivery Info','Refund Policy'],
    ['Company','About Us','Terms','Privacy','Reviews'],
  ];
  return `<footer class="footer">
    <div class="footer-inner container">
      <div>
        <a href="/" class="logo" style="margin-bottom:1rem">
          <div class="logo-icon">⚡</div>
          <span class="logo-text">CIA <span class="text-gradient glow">STORE</span></span>
        </a>
        <p style="font-size:0.875rem;color:var(--text-dim);line-height:1.625">Premium gaming digital goods. Fast delivery, best prices, 100% secure.</p>
        <div style="margin-top:1rem;display:flex;gap:0.5rem">${['💬','🐦','📧','▶️'].map(i=>`<span style="font-size:1.25rem;cursor:pointer">${i}</span>`).join('')}</div>
      </div>
      ${cols.map(([t,...links])=>`<div><h4 class="footer-title">${t}</h4><ul class="footer-links">${links.map(l=>`<li><a href="/${l.toLowerCase().replace(/ /g,'-')}">${l}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="footer-bottom"><p>© ${new Date().getFullYear()} CIA STORE. All rights reserved. ⚡ Made for gamers.</p></div>
  </footer>`;
}

function badge(p) {
  const map = { Legendary:'legendary',Mythical:'mythical',Rare:'rare',Epic:'epic',Uncommon:'uncommon',Common:'common' };
  return `badge-${map[p.rarity]||'common'}`;
}

function card(p) {
  const d = p.orig ? Math.round((1-p.price/p.orig)*100) : 0;
  return `<a href="/product/${p.id}" class="product-card animate-fade-up">
    <div class="product-media">
      <span style="z-index:1">${p.img}</span>
      <div class="product-badges">
        ${p.rarity?`<span class="product-badge ${badge(p)}">${p.rarity}</span>`:''}
        ${d>0?`<span class="product-badge badge-discount">-${d}%</span>`:''}
        ${p.stock<10?`<span class="product-badge badge-new">🔥 Low stock</span>`:''}
      </div>
    </div>
    <div class="product-body">
      <div><span class="product-cat">${PRODUCTS.find(x=>x.id===p.id).cat}</span><h3 class="product-name">${p.name}</h3></div>
      <p class="product-desc">${p.desc}</p>
      <div class="product-tags">${p.features.slice(0,2).map(f=>`<span class="product-tag">${f}</span>`).join('')}${p.features.length>2?`<span class="product-tag">+${p.features.length-2}</span>`:''}</div>
      <div class="product-footer">
        <div><span class="product-price">$${p.price.toFixed(2)}</span>${p.orig?`<span class="product-price-orig">$${p.orig.toFixed(2)}</span>`:''}</div>
        <span class="product-buy">🛒</span>
      </div>
    </div>
  </a>`;
}

// ═══════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════

function buildHome() {
  const particles = Array.from({length:20},(_,i)=>`<div class="particle" style="top:${Math.random()*100}%;left:${Math.random()*100}%;animation-delay:${Math.random()*5}s;animation-duration:${2+Math.random()*3}s;width:${2+Math.random()*3}px;height:${2+Math.random()*3}px"></div>`).join('');
  const feat = PRODUCTS.slice(0,8);
  return html('Premium Gaming Digital Goods', `
    ${header('/')}
    <section class="hero">
      <div class="hero-particles">${particles}</div>
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="hero-glow hero-glow-3"></div>
      <div class="hero-content container">
        <div class="animate-fade-up">
          <div class="hero-tag"><span class="hero-tag-dot"></span> Premium Gaming Digital Store</div>
          <h1 class="hero-title">Level Up Your<br><span class="text-gradient glow">Gaming Arsenal</span></h1>
          <p class="hero-desc">Premium accounts, rare in-game items, currency packs, and exclusive gamepasses at unbeatable prices. <span class="text-electric glow">Instant delivery</span>, 100% secure.</p>
          <div class="hero-actions">
            <a href="/shop" class="btn btn-lg btn-primary">🚀 Explore Store</a>
            <a href="/shop/bloxfruit" class="btn btn-lg btn-outline">🐉 Blox Fruits</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><div><span class="hero-stat-dot"></span></div><div><div class="hero-stat-value">10K+</div><div class="hero-stat-label">Customers</div></div></div>
            <div class="hero-stat"><div><span class="hero-stat-dot"></span></div><div><div class="hero-stat-value">15 min</div><div class="hero-stat-label">Avg Delivery</div></div></div>
            <div class="hero-stat"><div><span class="hero-stat-dot"></span></div><div><div class="hero-stat-value">4.9 ⭐</div><div class="hero-stat-label">Rating</div></div></div>
          </div>
        </div>
        <div class="hero-visual animate-fade-up anim-delay-2">
          <div class="hero-card">
            <div class="hero-card-glow"></div>
            <div class="hero-card-icon">⚡</div>
            <h3 class="hero-card-title">CIA <span class="text-gradient glow">STORE</span></h3>
            <p class="hero-card-sub">Premium Gaming Digital Goods</p>
            <div class="hero-card-grid">${['Accounts','Robux','Skins','Gamepasses'].map(i=>`<div class="hero-card-item">${i}</div>`).join('')}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="features"><div class="container">
      <div class="features-grid">${[
        ['⚡','Instant Delivery','Within minutes'],
        ['🛡️','100% Secure','Gold guarantee'],
        ['🕐','24/7 Support','Always online'],
        ['👥','Trusted','10K+ customers'],
        ['✨','Best Prices','Price match'],
        ['💎','Premium Quality','Verified items'],
      ].map(([i,t,d])=>`<div class="feature-item animate-fade-up"><div class="feature-icon">${i}</div><h4 class="feature-title">${t}</h4><p class="feature-desc">${d}</p></div>`).join('')}
      </div>
    </div></section>

    <section class="section"><div class="container">
      <div class="section-header">
        <div>
          <div class="section-tag section-tag-blue"><span>📋</span> Categories</div>
          <h2 class="section-heading">Browse by <span class="text-gradient glow">Category</span></h2>
          <p class="section-desc">Find exactly what you need from our curated categories.</p>
        </div>
        <a href="/shop" class="btn btn-md btn-outline">All Categories →</a>
      </div>
      <div class="cat-grid">${CATEGORIES.map(c=>`
        <a href="/shop/${c.id}" class="cat-card animate-fade-up">
          <div class="cat-card-bg"></div>
          <div class="cat-card-overlay"></div>
          <div class="cat-card-icon" style="filter:drop-shadow(0 0 10px ${c.color}40)">${c.icon}</div>
          <div class="cat-card-body">
            <span class="cat-card-count">${c.count} Products</span>
            <h3 class="cat-card-name">${c.name}</h3>
            <p class="cat-card-desc">${c.desc}</p>
          </div>
        </a>`).join('')}
      </div>
    </div></section>

    <section class="section"><div class="container">
      <div class="section-header">
        <div>
          <div class="section-tag section-tag-orange"><span>✨</span> Featured Products</div>
          <h2 class="section-heading">Premium <span class="text-gradient glow">Picks</span></h2>
          <p class="section-desc">Hand-picked premium items at the best prices.</p>
        </div>
        <a href="/shop" class="btn btn-md btn-outline">View All →</a>
      </div>
      <div class="product-grid">${feat.map(card).join('')}</div>
    </div></section>

    <section class="section"><div class="container">
      <div class="section-header" style="text-align:center;flex-direction:column;align-items:center">
        <div class="section-tag section-tag-yellow" style="margin:0 auto">⭐ Trusted by Gamers</div>
        <h2 class="section-heading" style="text-align:center">What Our <span class="text-gradient glow">Customers Say</span></h2>
        <p class="section-desc" style="text-align:center">Join 10,000+ happy customers.</p>
      </div>
      <div class="review-grid">${REVIEWS.map(r=>`
        <div class="review-card animate-fade-up">
          <div class="review-header">
            <div class="review-avatar">${r.avatar}</div>
            <div><div class="review-author">${r.user}</div><div class="review-date">${r.date}</div></div>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          <p class="review-text">"${r.text}"</p>
        </div>`).join('')}
      </div>
    </div></section>
    ${footer()}
  `);
}

function buildShop(cat='') {
  let f = PRODUCTS;
  if(cat) f = f.filter(p=>p.cat===cat);
  const ci = CATEGORIES.find(c=>c.id===cat);
  return html(`Shop${ci?' — '+ci.name:''}`, `
    ${header('/shop')}
    <main class="page-main">
      <div class="container">
        <div style="margin-bottom:2rem">
          <h1 class="hero-title" style="font-size:2.5rem;margin-bottom:0.75rem">${ci?ci.name:'Products'} <span class="text-gradient glow">Store</span></h1>
          <p style="color:var(--text-dim);max-width:36rem">${ci?ci.desc:'Browse our collection of premium gaming digital goods.'}</p>
        </div>
        <div class="filters">
          <a href="/shop" class="filter-btn ${!cat?'active':''}">All</a>
          ${CATEGORIES.map(c=>`<a href="/shop/${c.id}" class="filter-btn ${cat===c.id?'active':''}">${c.icon} ${c.name}</a>`).join('')}
        </div>
        <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:1.5rem">Showing ${f.length} of ${PRODUCTS.length} products</p>
        <div class="product-grid">${f.map(card).join('')}</div>
      </div>
    </main>
    ${footer()}
  `);
}

function buildProduct(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return build404();
  const d = p.orig ? Math.round((1-p.price/p.orig)*100) : 0;
  const related = PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  const ci = CATEGORIES.find(c=>c.id===p.cat);
  return html(p.name, `
    ${header()}
    <main class="page-main">
      <div class="container">
        <div class="breadcrumb">
          <a href="/">Home</a><span>/</span>
          <a href="/shop">Shop</a><span>/</span>
          <a href="/shop/${p.cat}">${ci?.name||p.cat}</a><span>/</span>
          <span>${p.name}</span>
        </div>
        <div class="detail-grid">
          <div class="detail-image">
            <span>${p.img}</span>
            <div class="detail-image-badges">
              ${p.rarity?`<span class="product-badge ${badge(p)}">${p.rarity}</span>`:''}
              ${d>0?`<span class="product-badge badge-discount">-${d}% OFF</span>`:''}
            </div>
          </div>
          <div class="detail-info">
            <div>
              <p class="detail-cat">${ci?.name||p.cat} ${p.sub?'• '+p.sub:''}</p>
              <h1 class="detail-name">${p.name}</h1>
              <div class="detail-pricing">
                <span class="detail-price">$${p.price.toFixed(2)}</span>
                ${p.orig?`<span class="detail-price-orig">$${p.orig.toFixed(2)}</span>`:''}
                <span class="detail-stock ${p.stock>0?'in':'out'}">${p.stock>0?'✓ In Stock':'✗ Out of Stock'}</span>
              </div>
            </div>
            <p class="detail-desc">${p.desc}</p>
            <div>
              <h3 style="font-size:0.8125rem;font-weight:600;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.75rem">What's Included</h3>
              <div class="detail-features">${p.features.map(f=>`<div class="detail-feature"><span class="detail-feature-check">✓</span> ${f}</div>`).join('')}</div>
            </div>
            <div class="detail-guarantee">${[
              ['⚡','Instant','Delivery'],
              ['🛡️','100%','Secure'],
              ['🕐','24/7','Support'],
            ].map(([i,l,s])=>`<div class="detail-guarantee-item"><div class="detail-guarantee-icon">${i}</div><div class="detail-guarantee-label">${l}</div><div class="detail-guarantee-sub">${s}</div></div>`).join('')}</div>
            <div class="detail-input-wrap">
              <label class="detail-input-label">In-Game Username / Player ID <span class="detail-input-hint">(required for delivery)</span></label>
              <input type="text" placeholder="Enter your Roblox/Game username" class="detail-input" disabled>
            </div>
            <div class="detail-actions">
              <button class="detail-btn-primary" disabled>🛒 Add to Cart — $${p.price.toFixed(2)}</button>
              <button class="detail-btn-secondary" disabled>Buy Now</button>
            </div>
            <div class="detail-security"><span>🔒 Secure checkout</span><span>💳 Stripe • PayPal • USDT</span></div>
          </div>
        </div>
        ${related.length?`
        <h2 style="font-family:'Orbitron',sans-serif;font-size:1.5rem;font-weight:700;color:white;margin-bottom:1.5rem">Related Products</h2>
        <div class="related-grid">${related.map(r=>`
          <a href="/product/${r.id}" class="related-card">
            <div class="related-icon">${r.img}</div>
            <div class="related-name">${r.name}</div>
            <p class="related-desc">${r.desc}</p>
            <div class="related-foot"><span class="related-price">$${r.price.toFixed(2)}</span>${r.orig?`<span class="related-price-orig">$${r.orig.toFixed(2)}</span>`:''}</div>
          </a>`).join('')}
        </div>`:''}
      </div>
    </main>
    ${footer()}
  `);
}

function buildCart() {
  return html('Cart', `${header()}<main class="page-main"><div class="page-center"><div class="page-icon">🛒</div><h1 class="page-title">Your Cart</h1><p class="page-desc">Your shopping cart is empty. Start browsing our premium products!</p><a href="/shop" class="btn btn-lg btn-primary">Browse Products →</a></div></main>${footer()}`);
}

function buildAuth() {
  return html('Sign In', `${header()}<main class="page-main"><div class="page-center"><div style="font-size:3rem;margin-bottom:1rem">⚡</div><h1 class="page-title">Welcome Back</h1><p class="page-desc">Sign in to your CIA STORE account</p><div class="card-form"><div class="form-group"><label class="form-label">Email</label><input type="email" placeholder="you@example.com" class="form-input" disabled></div><div class="form-group"><label class="form-label">Password</label><input type="password" placeholder="••••••••" class="form-input" disabled></div><button class="btn btn-lg btn-primary" style="width:100%" disabled>Sign In</button><p style="margin-top:1.5rem;font-size:0.875rem;color:var(--text-dim)">Don't have an account? <a href="/auth" style="color:var(--electric)">Register</a></p></div></div></main>${footer()}`);
}

function buildFaq() {
  const faqs = [
    ['How long does delivery take?','Most orders delivered instantly or within 5-15 minutes. Complex orders like accounts may take up to 24 hours.'],
    ['Is it safe to buy from CIA STORE?','Absolutely! Encrypted payments via Stripe/PayPal. 10,000+ satisfied customers trust us.'],
    ['Do I need a specific level for Blox Fruits?','Most fruits require Level 700+ to trade. Check product descriptions for requirements.'],
    ['What payment methods do you accept?','Stripe (credit/debit cards), PayPal, and USDT (crypto).'],
    ['Can I get a refund?','Digital goods are non-refundable once delivered. Contact support within 24 hours if there\'s an issue.'],
  ];
  return html('FAQ', `${header()}<main class="page-main"><div class="container"><div style="text-align:center;margin-bottom:3rem"><h1 class="page-title">FAQ</h1><p class="page-desc">Frequently asked questions.</p></div><div class="faq-list">${faqs.map(([q,a])=>`<details class="faq-item"><summary class="faq-question" style="outline:none">${q}</summary><p class="faq-answer">${a}</p></details>`).join('')}</div></div></main>${footer()}`);
}

function buildContact() {
  return html('Contact', `${header()}<main class="page-main"><div class="container" style="max-width:32rem;margin:0 auto;padding:2rem 0;text-align:center"><h1 class="page-title">Contact Us</h1><p class="page-desc">Get in touch 24/7.</p><div style="display:flex;flex-direction:column;gap:1rem">${[
    ['📧','Email','support@ciastore.com'],
    ['💬','Live Chat','Available 24/7'],
    ['🐦','Twitter','@ciastore'],
  ].map(([i,l,v])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);display:flex;align-items:center;gap:1rem"><span style="font-size:1.5rem">${i}</span><div><div style="font-size:0.875rem;color:var(--text-dim)">${l}</div><div style="font-weight:700;color:var(--electric)">${v}</div></div></div>`).join('')}</div></div></main>${footer()}`);
}

function buildPrivacy() {
  return html('Privacy', `${header()}<main class="page-main"><div class="container" style="max-width:48rem;margin:0 auto"><h1 class="page-title">Privacy Policy</h1><p style="color:var(--text-muted);margin-bottom:2rem">Last updated: ${new Date().toLocaleDateString()}</p><div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1.5rem">${[
    ['What We Collect','Email, username, and Roblox ID for orders. Payment data handled by Stripe/PayPal.'],
    ['Data Protection','HTTPS encryption. No data shared with third parties.'],
    ['Cookies','Essential cookies only. No tracking without consent.'],
    ['Contact','privacy@ciastore.com for any concerns.'],
  ].map(([t,d])=>`<div><h3 style="color:white;font-weight:700;margin-bottom:0.5rem">${t}</h3><p>${d}</p></div>`).join('')}</div></div></main>${footer()}`);
}

function buildTerms() {
  return html('Terms', `${header()}<main class="page-main"><div class="container" style="max-width:48rem;margin:0 auto"><h1 class="page-title">Terms of Service</h1><p style="color:var(--text-muted);margin-bottom:2rem">Last updated: ${new Date().toLocaleDateString()}</p><div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1.5rem">${[
    ['Delivery','Digital goods delivered within timeframe on each product page. Most items are instant.'],
    ['Refunds','All sales final for digital goods. Refunds if undelivered within 48 hours.'],
    ['Account Safety','Users responsible for account security after delivery.'],
  ].map(([t,d])=>`<div><h3 style="color:white;font-weight:700;margin-bottom:0.5rem">${t}</h3><p>${d}</p></div>`).join('')}</div></div></main>${footer()}`);
}

function buildAbout() {
  return html('About', `${header()}<main class="page-main"><div class="container" style="max-width:48rem;margin:0 auto"><h1 class="page-title">About CIA STORE</h1><p class="page-desc">Your premium gaming digital goods destination.</p><div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1rem"><p>CIA STORE was founded by passionate gamers who understand the struggle of finding reliable, affordable gaming digital goods.</p><p>We source the best prices on accounts, Robux, game currencies, and gamepasses — delivering them instantly with 24/7 support.</p><p>With thousands of satisfied customers, we're the most trusted gaming marketplace online.</p></div></div></main>${footer()}`);
}

function buildDelivery() {
  const items = [
    ['Instant Digital','Digital items delivered within minutes via trade or code.'],
    ['Account Delivery','Account purchases include email access transfer within 24h.'],
    ['Trade System','Our team joins your game and trades items.'],
    ['Requirements','Provide your Roblox username. Level 700+ for fruit trades.'],
  ];
  return html('Delivery Info', `${header()}<main class="page-main"><div class="container" style="max-width:48rem;margin:0 auto"><h1 class="page-title">Delivery Info</h1><p class="page-desc">How delivery works.</p><div style="display:flex;flex-direction:column;gap:0.75rem">${items.map(([t,d])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><h3 style="color:white;font-weight:700;margin-bottom:0.5rem;font-size:0.9375rem">${t}</h3><p style="color:var(--text-dim);line-height:1.625;font-size:0.875rem">${d}</p></div>`).join('')}</div></div></main>${footer()}`);
}

function buildRefund() {
  return html('Refund Policy', `${header()}<main class="page-main"><div class="container" style="max-width:48rem;margin:0 auto"><h1 class="page-title">Refund Policy</h1><p class="page-desc">Our guarantee.</p><div style="display:flex;flex-direction:column;gap:0.75rem">${[
    ['30-Day Guarantee','Full refund if product doesn\'t work within 30 days.'],
    ['Non-Refundable','Used codes and accessed accounts cannot be refunded.'],
    ['How to Request','Email support@ciastore.com with your order ID.'],
  ].map(([t,d])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><h3 style="color:white;font-weight:700;margin-bottom:0.5rem;font-size:0.9375rem">${t}</h3><p style="color:var(--text-dim);line-height:1.625;font-size:0.875rem">${d}</p></div>`).join('')}</div></div></main>${footer()}`);
}

function buildReviews() {
  return html('Reviews', `${header()}<main class="page-main"><div class="container"><div style="text-align:center;margin-bottom:3rem"><h1 class="page-title">Customer Reviews</h1><p class="page-desc">What our community says.</p></div><div class="review-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">${REVIEWS.map(r=>`
    <div class="review-card"><div class="review-header"><div class="review-avatar">${r.avatar}</div><div><div class="review-author">${r.user}</div><div class="review-date">${r.date}</div></div></div><div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p class="review-text">"${r.text}"</p></div>`).join('')}</div></div></main>${footer()}`);
}

function build404() {
  return html('Not Found', `${header()}<main class="page-main"><div class="error-page"><div class="error-code">404</div><h1 class="hero-title" style="margin-bottom:1rem">Page Not <span class="text-gradient glow">Found</span></h1><p style="color:var(--text-dim);margin-bottom:2rem">The page you're looking for doesn't exist.</p><a href="/" class="btn btn-lg btn-primary">Back to Home</a></div></main>${footer()}`);
}

// ═══════════════════════════════════════════════════
// BUILD
// ═══════════════════════════════════════════════════

const DIST = path.join(__dirname, 'dist');
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });

const pages = [];
function add(p, c) { pages.push({ path: p, content: c }) }

add('index.html', buildHome());
add('shop/index.html', buildShop());
add('cart/index.html', buildCart());
add('auth/index.html', buildAuth());
add('contact/index.html', buildContact());
add('faq/index.html', buildFaq());
add('privacy/index.html', buildPrivacy());
add('terms/index.html', buildTerms());
add('about/index.html', buildAbout());
add('delivery-info/index.html', buildDelivery());
add('refund-policy/index.html', buildRefund());
add('reviews/index.html', buildReviews());
add('404.html', build404());

for (const c of CATEGORIES) {
  add(`shop/${c.id}/index.html`, buildShop(c.id));
}

for (const p of PRODUCTS) {
  add(`product/${p.id}/index.html`, buildProduct(p.id));
}

// Admin
add('admin/index.html', buildAdmin());

// Copy public
const PUBLIC = path.join(__dirname, 'public');
if (fs.existsSync(PUBLIC)) {
  function cp(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      const s = path.join(src, item);
      const d = path.join(dest, item);
      if (fs.statSync(s).isDirectory()) cp(s, d);
      else fs.copyFileSync(s, d);
    }
  }
  cp(PUBLIC, path.join(DIST, 'public'));
}

// Fallback for SPA
add('200.html', buildHome());

for (const page of pages) {
  const fp = path.join(DIST, page.path);
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, page.content, 'utf8');
  console.log(`  ✓ ${page.path}`);
}

console.log(`\n  ✅ Built ${pages.length} pages (${(fs.statSync(path.join(DIST)).blocks||0)*512/1024} KB)`);

// ═══════════════════════════════════════════════════
// ADMIN PAGE
// ═══════════════════════════════════════════════════

function buildAdmin() {
  const totalRev = 284500;
  const totalOrd = 7;
  const totalProd = PRODUCTS.length;
  const pendingOrd = 1;
  const A_CSS = `body{background:#050B14;font-family:'Inter',sans-serif;color:rgba(255,255,255,0.9);margin:0}
:root{--e:#00A3FF;--c:#0D1B30;--b:rgba(255,255,255,0.06);--g:#4ade80;--r:#f87171;--y:#facc15}
.layout{display:flex;min-height:100vh}
.side{width:240px;background:#0A1628;border-right:1px solid var(--b);padding:1.5rem;position:fixed;top:0;left:0;bottom:0}
.main{margin-left:240px;padding:2rem;flex:1}
.lg{display:flex;align-items:center;gap:0.5rem;margin-bottom:2rem;font-weight:900;font-size:1.25rem}
.nv{display:flex;flex-direction:column;gap:0.25rem}
.nv a{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:10px;color:rgba(255,255,255,0.5);font-size:0.875rem;text-decoration:none;transition:all 0.2s}
.nv a:hover,.nv a.active{background:rgba(0,163,255,0.08);color:white}
.nv a.active{color:var(--e)}
.gr{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem}
.gc{padding:1.5rem;border-radius:16px;background:var(--c);border:1px solid var(--b)}
.gl{font-size:0.75rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-bottom:0.5rem}
.gv{font-size:1.75rem;font-weight:800;color:white}
.tw{overflow-x:auto;margin-bottom:2rem}
table{width:100%;border-collapse:collapse;font-size:0.875rem}
th{text-align:left;padding:0.75rem 1rem;color:rgba(255,255,255,0.4);font-weight:600;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--b)}
td{padding:0.75rem 1rem;border-bottom:1px solid var(--b);color:rgba(255,255,255,0.8)}
.bd{padding:0.25rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:600;display:inline-flex}
.bg{background:rgba(74,222,128,0.1);color:var(--g);border:1px solid rgba(74,222,128,0.2)}
.by{background:rgba(250,204,21,0.1);color:var(--y);border:1px solid rgba(250,204,21,0.2)}
.bb{background:rgba(0,163,255,0.1);color:var(--e);border:1px solid rgba(0,163,255,0.2)}
.br{background:rgba(248,113,113,0.1);color:var(--r);border:1px solid rgba(248,113,113,0.2)}
.sh{font-size:1.125rem;font-weight:700;color:white;margin-bottom:1rem}
@media(max-width:768px){.side{width:60px;padding:1rem}.side .lg span,.side .nv a span{display:none}.main{margin-left:60px;padding:1rem}}
`;
  const orders = [
    {id:'ORD-001',customer:'ShadowX_Pro',email:'shadow@email.com',product:'Dragon Fruit',amount:32,status:'Completed',payment:'Stripe',date:'2026-07-05'},
    {id:'ORD-002',customer:'ProGamer99',email:'pro@email.com',product:'1700 Robux',amount:12.99,status:'Completed',payment:'PayPal',date:'2026-07-05'},
    {id:'ORD-003',customer:'NinjaWarrior',email:'ninja@email.com',product:'Venom Permanent',amount:38,status:'Processing',payment:'USDT',date:'2026-07-06'},
    {id:'ORD-004',customer:'BloxKing99',email:'king@email.com',product:'Max Account',amount:55,status:'Pending',payment:'Stripe',date:'2026-07-06'},
    {id:'ORD-005',customer:'DragonSlayer',email:'slayer@email.com',product:'Dragon Permanent',amount:42,status:'Completed',payment:'PayPal',date:'2026-07-04'},
  ];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin | CIA STORE</title><style>${A_CSS}</style><link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"></head><body><div class="layout"><aside class="side"><div class="lg"><span style="font-size:1.25rem">⚡</span><span>CIA <span style="color:var(--e)">ADMIN</span></span></div><nav class="nv"><a href="/admin" class="active"><span>📊</span><span>Dashboard</span></a><a href="/admin"><span>📦</span><span>Products</span></a><a href="/admin"><span>📋</span><span>Orders</span></a><a href="/"><span>←</span><span>Store</span></a></nav></aside><div class="main"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;border-bottom:1px solid var(--b);padding-bottom:1.5rem"><div><h1 style="font-size:1.5rem;font-weight:800;color:white">Dashboard</h1><p style="color:rgba(255,255,255,0.4);font-size:0.875rem">Welcome back, Admin!</p></div><div class="bd bb">🟢 Online</div></div>
<div class="gr">
<div class="gc"><div class="gl">💰 Revenue</div><div class="gv">$${totalRev.toLocaleString()}</div></div>
<div class="gc"><div class="gl">📦 Orders</div><div class="gv">${totalOrd}</div></div>
<div class="gc"><div class="gl">🏷️ Products</div><div class="gv">${totalProd}</div></div>
<div class="gc"><div class="gl">⏳ Pending</div><div class="gv">${pendingOrd}</div></div>
</div>
<div class="sh">📋 Recent Orders</div>
<div class="tw"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>${orders.map(o=>{
  const sc = {Completed:'bg',Processing:'bb',Pending:'by',Cancelled:'br'}[o.status]||'bb';
  return `<tr><td style="color:var(--e);font-weight:600">${o.id}</td><td><div style="font-weight:600">${o.customer}</div><div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">${o.email}</div></td><td>${o.product}</td><td style="font-weight:700">$${o.amount.toFixed(2)}</td><td><span class="bd ${sc}">${o.status}</span></td><td style="color:rgba(255,255,255,0.5)">${o.date}</td></tr>`;
}).join('')}</tbody></table></div>
<div class="sh">🏷️ Products (${totalProd})</div>
<div class="tw"><table><thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Rarity</th><th>Orders</th></tr></thead><tbody>${PRODUCTS.map(p=>{
  const rc = {Legendary:'by',Mythical:'bb',Rare:'by',Uncommon:'bb',Common:'bg'}[p.rarity]||'bb';
  return `<tr><td style="font-weight:600">${p.name}</td><td style="color:var(--e);font-weight:700">$${p.price.toFixed(2)}</td><td>${p.stock>50?'● ':'● '}${p.stock}</td><td><span class="bd ${rc}">${p.rarity}</span></td><td>${p.orders}</td></tr>`;
}).join('')}</tbody></table></div>
<div style="text-align:center;padding:2rem 0;color:rgba(255,255,255,0.2);font-size:0.75rem">⚡ CIA STORE Admin — Static Version<br>Full admin requires Cloudflare deployment</div>
</div></div></body></html>`;
}
