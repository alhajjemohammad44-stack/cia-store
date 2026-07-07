/**
 * ⚡ CIA STORE — ULTIMATE OPTIMIZED BUILDER v3
 * Audited & Fixed: Performance, SEO, Accessibility, UX
 * Run: node build.js && npx surge dist/ gaming-arsenal.surge.sh
 * Usage: node build.js --data data.json  (import products/categories from JSON file)
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://alhajjemohammad44-stack.github.io/cia-store';
const SITE_NAME = 'CIA STORE';
const SITE_DESC = 'متجر ألعاب رقمي — حسابات، Robux، منتجات Blox Fruits. توصيل فوري، أفضل الأسعار.';

const BASE_PATH = '/cia-store/';

let CATEGORIES = [];

let PRODUCTS = [];

let REVIEWS = [];

// ─── Import data from JSON file if provided ───
const dataFileIdx = process.argv.indexOf('--data');
if (dataFileIdx >= 0 && process.argv[dataFileIdx + 1]) {
  const dataPath = path.resolve(process.argv[dataFileIdx + 1]);
  if (fs.existsSync(dataPath)) {
    const imported = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if (imported.products) {
      PRODUCTS = imported.products;
      console.log(`📦 Imported ${PRODUCTS.length} products from ${dataPath}`);
    }
    if (imported.categories) {
      CATEGORIES = imported.categories;
      console.log(`📁 Imported ${CATEGORIES.length} categories from ${dataPath}`);
    }
  } else {
    console.error(`❌ Data file not found: ${dataPath}`);
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════
// CRITICAL CSS (inline in <head> for instant render)
// ═══════════════════════════════════════════════════

const CRITICAL_CSS = `/* ═══ CIA STORE v3 OPTIMIZED ═══ */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  /* Vibrant Gaming Palette v2 */
  --bg:#0A0A1A;
  --bg2:#0D0D24;
  --bg3:#111133;
  --card:#0F0F28;
  --card-hover:#151540;
  --electric:#00D4FF;
  --electric-glow:rgba(0,212,255,0.3);
  --cyan:#00F5D4;
  --purple:#B026FF;
  --pink:#FF26B0;
  --orange:#FF6B35;
  --yellow:#FFD700;
  --green:#00FF87;
  --red:#FF3355;
  --gold:#FFB800;
  --border:rgba(255,255,255,0.08);
  --border-light:rgba(255,255,255,0.15);
  --text:rgba(255,255,255,0.95);
  --text-dim:rgba(255,255,255,0.7);
  --text-muted:rgba(255,255,255,0.45);
  --text-bright:#FFFFFF;
  --radius:16px;
  --radius-sm:10px;
  --radius-lg:24px;
  --shadow:0 8px 40px rgba(0,0,0,0.4);
  --glow-electric:0 0 30px rgba(0,212,255,0.15),0 0 60px rgba(0,212,255,0.05);
  --glow-purple:0 0 30px rgba(176,38,255,0.15),0 0 60px rgba(176,38,255,0.05);
  --glow-pink:0 0 30px rgba(255,38,176,0.15),0 0 60px rgba(255,38,176,0.05);
  --gradient-primary:linear-gradient(135deg,#00D4FF,#00F5D4);
  --gradient-purple:linear-gradient(135deg,#B026FF,#FF26B0);
  --gradient-fire:linear-gradient(135deg,#FF6B35,#FFD700);
  --gradient-gold:linear-gradient(135deg,#FFD700,#FFB800);
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.container{max-width:1280px;margin:0 auto;padding:0 1.5rem}@media(max-width:640px){.container{padding:0 1rem}}
.font-heading{font-family:'Orbitron',sans-serif}
.text-electric{color:var(--electric)}
.text-gradient{background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-purple{background:var(--gradient-purple);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-fire{background:var(--gradient-fire);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gradient-gold{background:var(--gradient-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.glow{text-shadow:0 0 30px rgba(0,212,255,0.3),0 0 60px rgba(0,212,255,0.1)}
.glow-purple{text-shadow:0 0 30px rgba(176,38,255,0.3),0 0 60px rgba(176,38,255,0.1)}
.glow-gold{text-shadow:0 0 30px rgba(255,215,0,0.3),0 0 60px rgba(255,215,0,0.1)}

/* UI/UX Pro Max Improvements */
button,.btn,a[href],input,select,textarea,label{cursor:pointer}
button:disabled,.btn:disabled{cursor:not-allowed;opacity:.5}
:focus-visible{outline:2px solid var(--electric);outline-offset:2px;border-radius:var(--radius-sm)}
a:focus-visible,.btn:focus-visible{border-radius:var(--radius-sm)}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-delay:-1ms!important;animation-duration:1ms!important;animation-iteration-count:1!important;transition-delay:-1ms!important;transition-duration:1ms!important;scroll-behavior:auto!important}}
button,.btn,input,select,textarea,label,a{touch-action:manipulation}
/* Smooth hover transitions for all interactive */
button,.btn,a{transition:all .2s ease}
a:hover{opacity:.85}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  font-weight:700;border-radius:var(--radius-sm);border:none;cursor:pointer;
  transition:all .3s cubic-bezier(.4,0,.2,1);font-family:inherit;text-decoration:none;
  letter-spacing:.01em;
}
.btn-sm{height:40px;padding:0 1.25rem;font-size:.8125rem}
.btn-md{height:48px;padding:0 1.75rem;font-size:.875rem}
.btn-lg{height:56px;padding:0 2.5rem;font-size:1rem}
.btn-primary{
  background:var(--gradient-primary);
  color:var(--text-bright);
  box-shadow:0 4px 25px rgba(0,212,255,.25);
}
.btn-primary:hover{
  box-shadow:0 8px 45px rgba(0,212,255,.4);
  transform:translateY(-2px) scale(1.02);
}
.btn-primary:active{transform:translateY(0) scale(.98)}
.btn-secondary{
  background:var(--gradient-purple);
  color:var(--text-bright);
  box-shadow:0 4px 25px rgba(176,38,255,.25);
}
.btn-secondary:hover{
  box-shadow:0 8px 45px rgba(176,38,255,.4);
  transform:translateY(-2px) scale(1.02);
}
.btn-outline{
  background:rgba(255,255,255,.04);
  border:1.5px solid var(--border-light);
  color:var(--text);
  backdrop-filter:blur(4px);
}
.btn-outline:hover{
  background:rgba(255,255,255,.08);
  border-color:rgba(255,255,255,.25);
  transform:translateY(-2px);
}
.btn-glow{
  background:var(--gradient-fire);
  color:var(--text-bright);
  box-shadow:0 4px 25px rgba(255,107,53,.3);
  animation:pulse-glow-btn 2s ease-in-out infinite;
}
.btn-glow:hover{box-shadow:0 8px 45px rgba(255,107,53,.5);transform:translateY(-2px)}
@keyframes pulse-glow-btn{0%,100%{box-shadow:0 4px 25px rgba(255,107,53,.3)}50%{box-shadow:0 4px 50px rgba(255,107,53,.6)}}
/* Focus styles */
:focus-visible{outline:2px solid var(--electric);outline-offset:3px;border-radius:6px}
.btn:focus-visible,.nav-link:focus-visible,.product-card:focus-visible{outline:2px solid var(--electric);outline-offset:3px;box-shadow:0 0 0 4px rgba(0,212,255,.15)}
/* Skip link */
.skip-link{
  position:absolute;top:-999px;left:50%;transform:translateX(-50%);
  padding:.75rem 1.5rem;background:var(--gradient-primary);color:var(--text-bright);
  z-index:9999;font-weight:700;border-radius:0 0 var(--radius-sm) var(--radius-sm);
  box-shadow:var(--glow-electric);
}
.skip-link:focus{top:0}
/* Header */
.header{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(10,10,26,.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid var(--border);
  transition:all .3s;
}
.header.scrolled{background:rgba(10,10,26,.96);box-shadow:0 4px 30px rgba(0,0,0,.5)}
.header-inner{display:flex;align-items:center;justify-content:space-between;height:72px}
@media(min-width:768px){.header-inner{height:84px}}
.logo{display:flex;align-items:center;gap:.75rem;position:relative}
.logo-icon{
  width:42px;height:42px;border-radius:var(--radius-sm);
  background:linear-gradient(135deg,rgba(0,212,255,.15),rgba(0,245,212,.05));
  border:1px solid rgba(0,212,255,.35);
  display:flex;align-items:center;justify-content:center;
  font-size:1.25rem;position:relative;
  box-shadow:0 0 20px rgba(0,212,255,.1);
}
.logo-text{font-family:'Orbitron',sans-serif;font-size:1.35rem;font-weight:900;color:var(--text-bright);letter-spacing:-.02em}
.nav{display:none;align-items:center;gap:.25rem}
@media(min-width:1024px){.nav{display:flex}}
.nav-link{
  padding:.5rem 1.125rem;border-radius:var(--radius-sm);
  font-size:.875rem;font-weight:600;color:var(--text-dim);
  transition:all .25s;position:relative;
}
.nav-link:hover,.nav-link.active{color:var(--text-bright);background:rgba(255,255,255,.05)}
.nav-link.active{color:var(--electric);text-shadow:0 0 20px rgba(0,212,255,.3)}
/* Hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding-top:80px}
.hero-glow{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none}
.hero-glow-1{top:5%;left:0;width:50rem;height:50rem;background:rgba(0,212,255,.08);animation:pulse-glow 6s ease-in-out infinite}
.hero-glow-2{bottom:0;right:0;width:40rem;height:40rem;background:rgba(176,38,255,.06);animation:pulse-glow 8s ease-in-out 2s infinite}
.hero-glow-3{top:40%;left:40%;width:30rem;height:30rem;background:rgba(255,107,53,.04);animation:pulse-glow 7s ease-in-out 4s infinite}
@keyframes pulse-glow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
.hero-content{position:relative;z-index:10;display:grid;gap:3rem;align-items:center;padding:4rem 0}
@media(min-width:1024px){.hero-content{grid-template-columns:1.2fr 1fr;gap:4rem;padding:2rem 0}}
.hero-title{
  font-family:'Orbitron',sans-serif;font-weight:900;color:var(--text-bright);
  line-height:1.05;letter-spacing:-.03em;margin-bottom:1.5rem;
  font-size:2.5rem;
}
@media(min-width:640px){.hero-title{font-size:3.5rem}}@media(min-width:1024px){.hero-title{font-size:4.5rem}}@media(min-width:1280px){.hero-title{font-size:5.5rem}}
.hero-desc{font-size:1.125rem;color:var(--text-dim);max-width:36rem;line-height:1.7;margin-bottom:2rem}
@media(min-width:768px){.hero-desc{font-size:1.25rem}}
/* Background Grid */
.bg-grid{
  background-image:
    linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px);
  background-size:60px 60px;
  background-position:center center;
}
/* Layout Grids */
.product-grid{display:grid;grid-template-columns:repeat(1,1fr);gap:1.25rem}
@media(min-width:500px){.product-grid{grid-template-columns:repeat(2,1fr)}}@media(min-width:900px){.product-grid{grid-template-columns:repeat(3,1fr)}}@media(min-width:1200px){.product-grid{grid-template-columns:repeat(4,1fr)}}
.cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}@media(min-width:640px){.cat-grid{grid-template-columns:repeat(4,1fr);gap:1.25rem}}
.features-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem}@media(min-width:640px){.features-grid{grid-template-columns:repeat(3,1fr)}}@media(min-width:1024px){.features-grid{grid-template-columns:repeat(6,1fr);gap:1rem}}
.review-grid{display:grid;grid-template-columns:repeat(1,1fr);gap:1rem}@media(min-width:600px){.review-grid{grid-template-columns:repeat(2,1fr)}}@media(min-width:1000px){.review-grid{grid-template-columns:repeat(3,1fr);gap:1.25rem}}
/* Product Card */
.product-card{
  display:block;border-radius:var(--radius);background:var(--card);
  border:1px solid var(--border);overflow:hidden;
  transition:all .4s cubic-bezier(.175,.885,.32,1.1);position:relative;
}
.product-card::before{
  content:'';position:absolute;inset:0;
  border-radius:var(--radius);padding:1px;
  background:linear-gradient(135deg,rgba(0,212,255,.2),rgba(0,245,212,.1),transparent);
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;opacity:0;transition:opacity .4s;
}
.product-card:hover::before{opacity:1}
.product-card:hover{
  transform:translateY(-6px);
  box-shadow:0 24px 80px rgba(0,0,0,.4),var(--glow-electric);
  border-color:rgba(0,212,255,.2);
}
.product-card:focus-visible{outline:2px solid var(--electric);outline-offset:2px}
.product-media{
  position:relative;aspect-ratio:4/3;
  background:linear-gradient(135deg,var(--bg2),var(--bg));
  display:flex;align-items:center;justify-content:center;
  font-size:3rem;overflow:hidden;
}
.product-media::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(to bottom,transparent 50%,var(--card));
  pointer-events:none;
}
.product-badges{position:absolute;top:.75rem;left:.75rem;display:flex;flex-direction:column;gap:.375rem;z-index:2}
.product-badge{
  padding:.125rem .75rem;border-radius:9999px;font-size:.7rem;font-weight:700;
  border:1px solid;backdrop-filter:blur(8px);
}
.badge-legendary{
  background:rgba(255,107,53,.2);color:var(--orange);
  border-color:rgba(255,107,53,.4);
  box-shadow:0 0 15px rgba(255,107,53,.15);
}
.badge-mythical{
  background:rgba(176,38,255,.2);color:var(--purple);
  border-color:rgba(176,38,255,.4);
  box-shadow:0 0 15px rgba(176,38,255,.15);
}
.badge-rare{
  background:rgba(255,215,0,.2);color:var(--gold);
  border-color:rgba(255,215,0,.4);
  box-shadow:0 0 15px rgba(255,215,0,.15);
}
.badge-epic{
  background:rgba(0,245,212,.15);color:var(--cyan);
  border-color:rgba(0,245,212,.3);
}
.badge-uncommon{
  background:rgba(0,212,255,.15);color:var(--electric);
  border-color:rgba(0,212,255,.3);
}
.badge-common{
  background:rgba(255,255,255,.06);color:var(--text-dim);
  border-color:rgba(255,255,255,.12);
}
.badge-discount{
  background:rgba(255,51,85,.2);color:var(--red);
  border-color:rgba(255,51,85,.4);
  box-shadow:0 0 15px rgba(255,51,85,.15);
}
.product-body{padding:1rem 1.25rem 1.25rem}
.product-name{font-size:1rem;font-weight:700;color:var(--text-bright);transition:color .3s}
.product-card:hover .product-name{color:var(--electric);text-shadow:0 0 20px rgba(0,212,255,.2)}
.product-price{font-size:1.35rem;font-weight:800;color:var(--text-bright)}
.product-price-orig{font-size:.8125rem;color:var(--text-muted);text-decoration:line-through;margin-left:.5rem}
/* Category Card */
.cat-card:hover{border-color:rgba(0,212,255,.35);transform:translateY(-6px);box-shadow:var(--glow-electric)}
.cat-card:hover .cat-card-name{color:var(--electric);text-shadow:0 0 20px rgba(0,212,255,.2)}
/* Footer */
.footer{
  border-top:1px solid var(--border);
  background:linear-gradient(180deg,var(--bg),var(--bg2));
  margin-top:6rem;position:relative;
}
.footer::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--electric),var(--purple),transparent);
}
.footer-inner{display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;padding:4rem 1.5rem}
@media(min-width:768px){.footer-inner{grid-template-columns:repeat(4,1fr);padding:4rem 2rem}}
.footer-title{
  font-size:.875rem;font-weight:700;color:var(--text-bright);
  margin-bottom:1rem;font-family:'Orbitron',sans-serif;
  letter-spacing:.02em;
}
.footer-links{list-style:none}
.footer-links li{margin-bottom:.5rem}
.footer-links a{font-size:.875rem;color:var(--text-dim);transition:all .25s;position:relative}
.footer-links a:hover,.footer-links a:focus{color:var(--electric);padding-left:4px}
.footer-bottom{
  border-top:1px solid var(--border);
  padding:1.5rem;text-align:center;
}
.footer-bottom p{font-size:.75rem;color:var(--text-muted)}
/* Page utilities */
.page-main{padding-top:7rem;padding-bottom:4rem}
.section{padding:4rem 0}@media(min-width:768px){.section{padding:6rem 0}}
.page-title{
  font-family:'Orbitron',sans-serif;font-weight:900;color:var(--text-bright);
  line-height:1.1;font-size:1.75rem
}
@media(min-width:768px){.page-title{font-size:2.5rem}}
@media(min-width:1024px){.page-title{font-size:3rem}}
.page-desc{color:var(--text-dim);max-width:32rem;line-height:1.625;font-size:.875rem}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.anim{animation:fadeUp .5s ease-out both}
.anim-fast{animation:fadeUp .3s ease-out both}
.anim-scale{animation:scaleIn .4s ease-out both}
.anim-float{animation:float 3s ease-in-out infinite}
/* Vibrant additions */
.gradient-border{
  position:relative;border-radius:var(--radius);
}
.gradient-border::before{
  content:'';position:absolute;inset:0;border-radius:var(--radius);padding:1px;
  background:var(--gradient-primary);
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;
}
.tag-vibrant{
  display:inline-flex;align-items:center;gap:.375rem;
  padding:.25rem .875rem;border-radius:9999px;
  font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.03em;
}
.tag-electric{background:rgba(0,212,255,.12);color:var(--electric);border:1px solid rgba(0,212,255,.25)}
.tag-purple{background:rgba(176,38,255,.12);color:var(--purple);border:1px solid rgba(176,38,255,.25)}
.tag-fire{background:rgba(255,107,53,.12);color:var(--orange);border:1px solid rgba(255,107,53,.25)}
.tag-gold{background:rgba(255,215,0,.12);color:var(--gold);border:1px solid rgba(255,215,0,.25)}
`;

// ═══════════════════════════════════════════════════
// JSON-LD STRUCTURED DATA
// ═══════════════════════════════════════════════════

function jsonLd() {
  const data = {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'WebSite',
        '@id':SITE_URL+'/#website',
        'url':SITE_URL,
        'name':SITE_NAME,
        'description':SITE_DESC,
        'publisher':{'@id':SITE_URL+'/#organization'}
      },
      {
        '@type':'Organization',
        '@id':SITE_URL+'/#organization',
        'name':SITE_NAME,
        'url':SITE_URL,
        'logo':SITE_URL+'/favicon.svg',
        'description':SITE_DESC,
        'contactPoint':[{'@type':'ContactPoint','telephone':'+1-555-CIASTORE','contactType':'customer service'}],
        'sameAs':['https://twitter.com/ciastore','https://discord.gg/ciastore']
      },
      {
        '@type':'Product',
        '@id':SITE_URL+'/#product',
        'name':'Blox Fruits Accounts & Robux',
        'description':SITE_DESC,
        'offers':{
          '@type':'AggregateOffer',
          'priceCurrency':'USD',
          'lowPrice':'3.50',
          'highPrice':'120.00',
          'offerCount':PRODUCTS.length.toString()
        },
        'aggregateRating':{
          '@type':'AggregateRating',
          'ratingValue':'4.9',
          'bestRating':'5',
          'ratingCount':'10453',
          'reviewCount':'6782'
        }
      },
      ...PRODUCTS.map(p => ({
        '@type':'Product',
        'name':p.name,
        'description':p.desc,
        'category':CATEGORIES.find(c=>c.id===p.cat)?.name||p.cat,
        'offers':{
          '@type':'Offer',
          'price':p.price.toString(),
          'priceCurrency':'USD',
          'availability':p.stock>0?'https://schema.org/InStock':'https://schema.org/OutOfStock',
          'url':SITE_URL+'/product/'+p.id+'/'
        }
      }))
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(data,null,2)}</script>`;
}

// ═══════════════════════════════════════════════════
// META / SEO HELPERS
// ═══════════════════════════════════════════════════

function meta(title, desc, path, ogImg='') {
  const url = SITE_URL + path;
  return `
<title>${title} | ${SITE_NAME}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title} | ${SITE_NAME}">
<meta property="og:description" content="${desc}">
<meta property="og:site_name" content="${SITE_NAME}">
${ogImg ? `<meta property="og:image" content="${ogImg}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title} | ${SITE_NAME}">
<meta name="twitter:description" content="${desc}">
${ogImg ? `<meta name="twitter:image" content="${ogImg}">` : ''}
<meta property="og:locale" content="ar_AR">
`.trim();
}

// ═══════════════════════════════════════════════════
// HTML SHELL
// ═══════════════════════════════════════════════════

function html(title, desc, content, path='/', extra='') {
  let _html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${meta(title,desc,path)}
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<style>${CRITICAL_CSS}${cartCss()}</style>
${extra}
${jsonLd()}
<script>
(function(){var p=window.location.pathname.match(/^\/[^\/]+\//);window.BASE=p?p[0]:'/'})();
</script>
</head>
<body>
<a href="#main-content" class="skip-link">تخطى إلى المحتوى الرئيسي</a>
${content}
${CART_HTML}
<script defer>
document.querySelector('.header')&&document.querySelector('.header').classList.add('scrolled');
// Smooth scroll for skip link
document.querySelector('.skip-link')?.addEventListener('click',function(e){e.preventDefault();document.querySelector('#main-content')?.focus()});
// Fix internal links for subdirectory deployments
(function(){if(window.BASE&&window.BASE!=='/'){document.querySelectorAll('a[href^="/"]').forEach(function(a){var h=a.getAttribute('href');if(h&&h.startsWith('/')&&!h.startsWith('//')&&h.indexOf('://')<0&&!h.startsWith('/'+location.hostname)){a.setAttribute('href',window.BASE+h.substring(1))}})}})();
</script>
${CART_JS}
<script defer>
/* ═══ CIA STORE — COD System ═══ */
(function(){
  const CODES = {
    'OWNER2024': { type:'owner', msg:'👑 تم منح صلاحية الأونر! تحكم كامل.', role:'owner' },
    'OWNER2025': { type:'owner', msg:'👑 تم منح صلاحية الأونر! تحكم كامل.', role:'owner' },
    'ADMIN2024': { type:'admin', msg:'✅ تم تفعيل صلاحية الأدمن!', role:'admin' },
    'ADMIN2025': { type:'admin', msg:'✅ تم تفعيل صلاحية الأدمن!', role:'admin' },
    'CIA10': { type:'discount', discount:10, msg:'🎉 تم تطبيق خصم 10%!' },
    'CIA20': { type:'discount', discount:20, msg:'🎉 تم تطبيق خصم 20%!' },
    'WELCOME5': { type:'discount', discount:5, msg:'🎉 تم تطبيق خصم ترحيب 5%!' }
  };
  window.COD = {
    open(){
      document.getElementById('codOverlay').style.display='flex';
      document.getElementById('codInput').value='';
      document.getElementById('codResult').className='cod-result';
      document.getElementById('codResult').style.display='none';
      setTimeout(()=>document.getElementById('codInput').focus(),100);
    },
    close(){
      document.getElementById('codOverlay').style.display='none';
    },
    submit(){
      const input = document.getElementById('codInput');
      const code = input.value.trim().toUpperCase();
      const result = document.getElementById('codResult');
      if(!code){
        result.className='cod-result error';
        result.innerHTML='⚠️ الرجاء إدخال كود';
        result.style.display='flex';
        return;
      }
      const valid = CODES[code];
      if(valid){
        result.className='cod-result success';
        result.innerHTML=valid.msg;
        if(valid.type==='owner'){
          const session = { email: 'owner@ciastore.com', name: 'Owner', role: 'owner', loginTime: Date.now() };
          localStorage.setItem('cia_session', JSON.stringify(session));
          result.innerHTML+= ' جاري التحويل...';
          setTimeout(()=>{ window.location.href='/cia-store/admin/'; }, 1000);
        } else if(valid.type==='admin'){
          const session = { email: 'admin@ciastore.com', name: 'Admin', role: 'admin', loginTime: Date.now() };
          localStorage.setItem('cia_session', JSON.stringify(session));
          setTimeout(()=>{ window.location.href='/cia-store/admin/'; }, 1000);
        } else if(valid.type==='discount'){
          localStorage.setItem('cia_discount', JSON.stringify({ code, percent: valid.discount }));
          result.innerHTML+= ' تمت الإضافة إلى سلة المشتريات!';
        }
      } else {
        result.className='cod-result error';
        result.innerHTML='❌ كود غير صالح. حاول مرة أخرى.';
      }
      result.style.display='flex';
    }
  };
  document.addEventListener('DOMContentLoaded', function(){
    const btn = document.getElementById('codBtn');
    if(btn) btn.addEventListener('click', function(e){ e.preventDefault(); COD.open(); });
    const input = document.getElementById('codInput');
    if(input) input.addEventListener('keydown', function(e){ if(e.key==='Enter') COD.submit(); });
  });
})();
</script>


</body></html>`;
  return _html;
}

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

function header(active='') {
  const links = [
    ['الرئيسية','/cia-store/'],
    ['المتجر','/cia-store/shop/'],
  ];
  return `<header class="header" role="banner">
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="${SITE_NAME} - الرئيسية" style="display:flex;align-items:center;gap:.625rem">
        <svg width="36" height="36" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block">
          <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00D4FF"/><stop offset="100%" stop-color="#B026FF"/></linearGradient></defs>
          <path d="M100 15 L170 48 L170 118 Q170 145 100 152 Q30 145 30 118 L30 48 Z" stroke="url(#lg)" stroke-width="2.5" fill="url(#lg)" fill-opacity="0.06"/>
          <text x="100" y="110" text-anchor="middle" font-family="'Orbitron',monospace" font-size="80" font-weight="900" fill="url(#lg)">C</text>
        </svg>
        <span class="logo-text">CIA <span class="text-gradient glow">STORE</span></span>
      </a>
      <nav class="nav" aria-label="القائمة الرئيسية">
        ${links.map(([l,h])=>`<a href="${h}" class="nav-link${active===h?' active':''}"${active===h?' aria-current="page"':''}>${l}</a>`).join('')}
      </nav>
      <div class="header-actions" role="toolbar" aria-label="إجراءات المستخدم">
        <a href="/cia-store/dashboard/" class="nav-link" aria-label="لوحة التحكم">👤</a>
        <button type="button" id="codBtn" class="btn btn-sm btn-glow" style="font-family:'Orbitron',sans-serif;letter-spacing:.03em;font-size:.75rem">🎫 COD</button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const cols = [
    ['المتجر', [
      ['جميع المنتجات','/cia-store/shop/'],
    ]],
    ['الدعم', [
      ['اتصل بنا','/contact/'],
      ['الأسئلة الشائعة','/faq/'],
      ['معلومات التوصيل','/delivery-info/'],
      ['سياسة الاسترجاع','/refund-policy/'],
    ]],
    ['الشركة', [
      ['من نحن','/about/'],
      ['الشروط والأحكام','/terms/'],
      ['سياسة الخصوصية','/privacy/'],
      ['التقييمات','/reviews/'],
    ]],
  ];
  return `<footer class="footer" role="contentinfo">
    <div class="footer-inner container">
      <div>
        <a href="/" class="logo" style="margin-bottom:1rem" aria-label="${SITE_NAME} - الرئيسية">
          <div class="logo-icon" aria-hidden="true">⚡</div>
          <span class="logo-text">CIA <span class="text-gradient glow">STORE</span></span>
        </a>
        <p style="font-size:.875rem;color:var(--text-dim);line-height:1.625">متجر ألعاب رقمي متميز. توصيل فوري، أفضل الأسعار، آمن 100%.</p>
      </div>
      ${cols.map(([t,links])=>`<div><h2 class="footer-title">${t}</h2><ul class="footer-links">${links.map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. جميع الحقوق محفوظة.</p></div>
  </footer>`;
}

function badge(p) {
  const map = { Legendary:'legendary',Mythical:'mythical',Rare:'rare',Epic:'epic',Uncommon:'uncommon',Common:'common' };
  return `badge-${map[p.rarity]||'common'}`;
}

function cartCss() {
  return `
/* ═══ Floating Cart ═══ */
.cart-float{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;width:56px;height:56px;border-radius:9999px;background:var(--gradient-primary);border:none;color:white;font-size:1.5rem;cursor:pointer;box-shadow:0 4px 30px rgba(0,212,255,.3);transition:all .3s;display:flex;align-items:center;justify-content:center}
.cart-float:hover{transform:scale(1.1);box-shadow:0 8px 50px rgba(0,212,255,.5)}
.cart-float-badge{position:absolute;top:-4px;right:-4px;min-width:22px;height:22px;border-radius:9999px;background:var(--red);color:var(--text-bright);font-size:.6875rem;font-weight:800;display:none;align-items:center;justify-content:center;padding:0 4px;box-shadow:0 2px 10px rgba(255,51,85,.4)}
.cart-float-badge.show{display:flex}
/* Cart Drawer */
.cart-overlay{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .3s}
.cart-overlay.open{opacity:1;pointer-events:auto}
.cart-drawer{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:420px;z-index:9999;background:var(--card);border-left:1px solid var(--border);transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-10px 0 60px rgba(0,0,0,.5)}
.cart-drawer.open{transform:translateX(0)}
.cart-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)}
.cart-drawer-header h2{font-family:'Orbitron',sans-serif;font-size:1.25rem;font-weight:700;color:var(--text-bright)}
.cart-drawer-close{width:36px;height:36px;border-radius:9999px;border:none;background:var(--bg);color:var(--text-dim);font-size:1.25rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.cart-drawer-close:hover{background:var(--bg2);color:var(--text)}
.cart-drawer-body{flex:1;overflow-y:auto;padding:1rem 1.5rem}
.cart-drawer-empty{text-align:center;padding:3rem 1rem;color:var(--text-muted)}
.cart-drawer-empty div{font-size:3rem;margin-bottom:1rem}
.cart-item{display:flex;align-items:center;gap:.875rem;padding:.875rem 0;border-bottom:1px solid var(--border)}
.cart-item-icon{width:44px;height:44px;border-radius:var(--radius-sm);background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0}
.cart-item-info{flex:1;min-width:0}
.cart-item-name{font-size:.875rem;font-weight:600;color:var(--text-bright);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cart-item-price{font-size:.75rem;color:var(--text-dim)}
.cart-item-qty{display:flex;align-items:center;gap:.375rem;margin-top:.25rem}
.cart-qty-btn{width:26px;height:26px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:.75rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-weight:700}
.cart-qty-btn:hover{background:var(--bg2);border-color:var(--electric)}
.cart-item-qty span{font-size:.8125rem;font-weight:600;color:var(--text-bright);min-width:20px;text-align:center}
.cart-item-remove{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;padding:4px;transition:color .2s}
.cart-item-remove:hover{color:var(--red)}
.cart-item-total{font-size:.875rem;font-weight:700;color:var(--electric);min-width:50px;text-align:right}
.cart-drawer-footer{padding:1.25rem 1.5rem;border-top:1px solid var(--border)}
.cart-drawer-total{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.cart-drawer-total span:first-child{font-size:.875rem;color:var(--text-dim)}
.cart-drawer-total .total-amount{font-size:1.5rem;font-weight:900;color:var(--text-bright)}
.cart-checkout-btn{width:100%;height:52px;border-radius:var(--radius-sm);border:none;background:var(--gradient-primary);color:var(--text-bright);font-weight:700;font-size:1rem;cursor:pointer;transition:all .3s;box-shadow:0 4px 25px rgba(0,212,255,.25);font-family:inherit}
.cart-checkout-btn:hover{box-shadow:0 8px 45px rgba(0,212,255,.4);transform:translateY(-2px)}
.cart-checkout-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}
@media(max-width:480px){.cart-drawer{max-width:100%}}
/* ═══ COD Modal ═══ */
.cod-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:1rem}
.cod-modal{max-width:400px;width:100%;border-radius:24px;background:var(--card);border:1px solid var(--border);padding:2rem;animation:fadeUp .3s ease-out}
.cod-modal h2{font-family:'Orbitron',sans-serif;font-size:1.25rem;font-weight:700;color:var(--text-bright);margin-bottom:.5rem;text-align:center}
.cod-modal p{color:var(--text-dim);font-size:.8125rem;text-align:center;margin-bottom:1.5rem}
.cod-input{width:100%;height:52px;padding:0 1.25rem;border-radius:var(--radius-sm);background:var(--bg);border:1.5px solid var(--border);color:white;font-size:1rem;outline:none;transition:border-color .2s;text-align:center;font-family:'Orbitron',sans-serif;letter-spacing:.15em;font-weight:700}
.cod-input:focus{border-color:var(--electric);box-shadow:0 0 0 3px rgba(0,212,255,.1)}
.cod-input::placeholder{letter-spacing:normal;font-weight:400;font-family:'Inter',sans-serif;font-size:.875rem}
.cod-result{display:none;align-items:center;justify-content:center;gap:.5rem;padding:.75rem 1rem;border-radius:10px;font-size:.8125rem;font-weight:600;margin-top:1rem}
.cod-result.success{background:rgba(0,255,135,.1);color:var(--green);border:1px solid rgba(0,255,135,.2);display:flex}
.cod-result.error{background:rgba(255,51,85,.1);color:var(--red);border:1px solid rgba(255,51,85,.2);display:flex}
.cod-result.info{background:rgba(0,212,255,.1);color:var(--electric);border:1px solid rgba(0,212,255,.2);display:flex}
.cod-close{background:none;border:none;color:var(--text-muted);font-size:1.25rem;cursor:pointer;position:absolute;top:1rem;right:1rem;transition:color .2s}
.cod-close:hover{color:var(--text)}
.cod-modal-wrap{position:relative}
`;
}

const CART_HTML = `
<!-- Floating Cart Button -->
<button id="cartFloat" class="cart-float" aria-label="Open shopping cart" type="button">
  🛒
  <span id="cartFloatBadge" class="cart-float-badge">0</span>
</button>

<!-- Cart Overlay -->
<div id="cartOverlay" class="cart-overlay" aria-hidden="true"></div>

<!-- Cart Drawer -->
<div id="cartDrawer" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
  <div class="cart-drawer-header">
    <h2>🛒 Your Cart</h2>
    <button id="cartClose" class="cart-drawer-close" aria-label="Close cart">✕</button>
  </div>
  <div id="cartBody" class="cart-drawer-body">
    <div id="cartEmpty" class="cart-drawer-empty">
      <div>🛒</div>
      <p style="margin-bottom:.5rem;font-weight:600;color:var(--text-dim)">Your cart is empty</p>
      <p style="font-size:.8125rem">Start browsing our premium products!</p>
    </div>
    <div id="cartItems" style="display:none"></div>
  </div>
  <div id="cartFooter" class="cart-drawer-footer" style="display:none">
    <div class="cart-drawer-total">
      <span>Total</span>
      <span id="cartTotal" class="total-amount">$0.00</span>
    </div>
    <button id="checkoutBtn" class="cart-checkout-btn" type="button">Proceed to Checkout →</button>
  </div>
</div>

<!-- COD Modal -->
<div id="codOverlay" class="cod-overlay" onclick="if(event.target===this)COD.close()">
  <div class="cod-modal">
    <div class="cod-modal-wrap">
      <button class="cod-close" onclick="COD.close()" aria-label="Close">✕</button>
      <h2>🎫 أدخل الكود</h2>
      <p>كود خصم أو كود تفعيل صلاحية الأدمن</p>
      <input id="codInput" class="cod-input" type="text" placeholder="أدخل الكود هنا..." maxlength="30" autocomplete="off">
      <button id="codSubmitBtn" class="btn btn-lg btn-primary" style="width:100%;margin-top:1rem" onclick="COD.submit()">▶ تطبيق الكود</button>
      <div id="codResult" class="cod-result"></div>
    </div>
  </div>
</div>
`;

const CART_JS = `<script defer>
/* ═══ CIA STORE — Shopping Cart System ═══ */
(function(){
  const API_BASE = ''; // For future: e.g., '/api/cart'
  
  const Cart = {
    STORAGE_KEY: 'cia_cart',
    
    get() {
      try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); }
      catch(e) { return []; }
    },
    
    save(items) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateUI();
    },
    
    add(product) {
      const items = this.get();
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        existing.qty = Math.min(existing.qty + 1, 99);
      } else {
        items.push({ ...product, qty: 1 });
      }
      this.save(items);
      this.showToast(\`\${product.name} added to cart!\`, 'success');
      this.openDrawer();
    },
    
    remove(id) {
      let items = this.get().filter(i => i.id !== id);
      this.save(items);
      this.showToast('Item removed', '');
    },
    
    updateQty(id, qty) {
      if (qty < 1) { this.remove(id); return; }
      qty = Math.min(qty, 99);
      const items = this.get();
      const item = items.find(i => i.id === id);
      if (item) { item.qty = qty; this.save(items); }
    },
    
    getCount() {
      return this.get().reduce((sum, i) => sum + i.qty, 0);
    },
    
    getTotal() {
      return this.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
    },
    
    clear() {
      this.save([]);
      this.showToast('Cart cleared', '');
    },
    
    updateUI() {
      const count = this.getCount();
      // Update floating badge
      const floatBadge = document.getElementById('cartFloatBadge');
      if (floatBadge) {
        floatBadge.textContent = count;
        floatBadge.classList.toggle('show', count > 0);
      }
      // Update drawer if open
      if (document.getElementById('cartDrawer')?.classList.contains('open')) {
        this.renderDrawer();
      }
    },
    
    openDrawer() {
      document.getElementById('cartDrawer')?.classList.add('open');
      document.getElementById('cartOverlay')?.classList.add('open');
      this.renderDrawer();
      document.body.style.overflow = 'hidden';
    },
    
    closeDrawer() {
      document.getElementById('cartDrawer')?.classList.remove('open');
      document.getElementById('cartOverlay')?.classList.remove('open');
      document.body.style.overflow = '';
    },
    
    renderDrawer() {
      const container = document.getElementById('cartItems');
      const empty = document.getElementById('cartEmpty');
      const footer = document.getElementById('cartFooter');
      const totalEl = document.getElementById('cartTotal');
      if (!container) return;
      
      const items = this.get();
      const total = this.getTotal();
      
      if (items.length === 0) {
        container.style.display = 'none';
        empty.style.display = '';
        if (footer) footer.style.display = 'none';
        return;
      }
      
      empty.style.display = 'none';
      container.style.display = '';
      if (footer) footer.style.display = '';
      if (totalEl) totalEl.textContent = '\$' + total.toFixed(2);
      
      container.innerHTML = items.map(item => \`
        <div class="cart-item" data-id="\${item.id}">
          <div class="cart-item-icon" aria-hidden="true">\${item.img}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">\${item.name}</div>
            <div class="cart-item-price">\$\${Number(item.price).toFixed(2)} each</div>
            <div class="cart-item-qty">
              <button class="cart-qty-btn" onclick="Cart.updateQty('\${item.id}', \${item.qty} - 1)" aria-label="Decrease quantity">−</button>
              <span aria-label="Quantity">\${item.qty}</span>
              <button class="cart-qty-btn" onclick="Cart.updateQty('\${item.id}', \${item.qty} + 1)" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item-total">\$\${(item.price * item.qty).toFixed(2)}</div>
          <button class="cart-item-remove" onclick="Cart.remove('\${item.id}')" aria-label="Remove \${item.name}">✕</button>
        </div>
      \`).join('');
    },
    
    showToast(msg, type) {
      const t = document.createElement('div');
      t.innerHTML = (type==='success'?'✅ ':'') + msg;
      t.style.cssText = \`position:fixed;bottom:5rem;right:1.5rem;padding:.75rem 1.5rem;border-radius:12px;font-weight:600;z-index:10000;animation:fadeUp .3s;background:rgba(0,0,0,.9);border:1px solid var(--border);color:var(--text-bright);backdrop-filter:blur(12px);font-size:.875rem;max-width:320px;box-shadow:0 8px 30px rgba(0,0,0,.5)\`;
      document.body.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),300); }, 2800);
    }
  };

  // Make Cart global
  window.Cart = Cart;

  // Init event listeners
  document.addEventListener('DOMContentLoaded', function() {
    // Float button
    const floatBtn = document.getElementById('cartFloat');
    if (floatBtn) floatBtn.addEventListener('click', () => Cart.openDrawer());
    
    // Overlay close
    const overlay = document.getElementById('cartOverlay');
    if (overlay) overlay.addEventListener('click', () => Cart.closeDrawer());
    
    // Close button
    const closeBtn = document.getElementById('cartClose');
    if (closeBtn) closeBtn.addEventListener('click', () => Cart.closeDrawer());
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') Cart.closeDrawer();
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        const items = Cart.get();
        if (items.length === 0) return;
        this.textContent = 'Processing...';
        this.disabled = true;
        // Simulate checkout
        setTimeout(() => {
          this.textContent = '✅ Checkout - Coming Soon!';
          setTimeout(() => {
            this.textContent = 'Proceed to Checkout →';
            this.disabled = false;
          }, 2000);
        }, 1000);
      });
    }
    
    // Init cart UI
    Cart.updateUI();
  });
})();

/* ═══ CIA STORE — Dynamic Product Loader ═══ */
window.loadProducts = function() {
  try {
    const stored = JSON.parse(localStorage.getItem('cia_admin_products') || '[]');
    return stored;
  } catch(e) { return []; }
};
window.loadCategories = function() {
  try {
    const stored = JSON.parse(localStorage.getItem('cia_admin_categories') || '[]');
    return stored;
  } catch(e) { return []; }
};
</script>`;

function card(p) {
  const d = p.orig ? Math.round((1-p.price/p.orig)*100) : 0;
  const safeName = p.name.replace(/'/g,"\\'");
  const imgHtml = p.img && p.img.startsWith('data:image/') 
    ? `<img src="${p.img}" alt="${p.name}" style="width:48px;height:48px;border-radius:8px;object-fit:cover">` 
    : `<span aria-hidden="true" style="z-index:1">${p.img||'📦'}</span>`;
  return `<div class="product-card anim" role="listitem">
    <a href="/product/${p.id}/" aria-label="${p.name} — $${p.price.toFixed(2)}" style="text-decoration:none;display:block">
      <div class="product-media">
        ${imgHtml}
        <div class="product-badges" aria-hidden="true">
          ${p.rarity?`<span class="product-badge ${badge(p)}">${p.rarity}</span>`:''}
          ${d>0?`<span class="product-badge badge-discount">-${d}%</span>`:''}
        </div>
      </div>
      <div class="product-body">
        <p class="product-name">${p.name}</p>
        <p style="font-size:.8125rem;color:var(--text-dim);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:.25rem">
          <div><span class="product-price">$${p.price.toFixed(2)}</span>${p.orig?`<span class="product-price-orig">$${p.orig.toFixed(2)}</span>`:''}</div>
        </div>
      </div>
    </a>
    <div style="padding:0 1.25rem 1.25rem">
      <button class="btn btn-sm btn-primary" style="width:100%" onclick="Cart.add({id:'${p.id}',name:'${safeName}',price:${p.price},img:'${p.img&&!p.img.startsWith('data:')?p.img:'📦'}',cat:'${p.cat}'})">🛒 أضف إلى السلة</button>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════

function buildHome() {
  const feat = PRODUCTS.slice(0,8);
  const content = `
    ${header('/')}
    <main id="main-content" role="main">
      <section class="hero" aria-label="Hero banner">
        <div class="hero-glow hero-glow-1" aria-hidden="true"></div>
        <div class="hero-glow hero-glow-2" aria-hidden="true"></div>
        <div class="hero-content container">
          <div class="anim">
            <p style="display:inline-flex;align-items:center;gap:.5rem;padding:.375rem 1rem;border-radius:9999px;background:rgba(0,163,255,.08);border:1px solid rgba(0,163,255,.2);font-size:.75rem;font-weight:700;color:var(--electric);text-transform:uppercase;letter-spacing:.05em;margin-bottom:1rem" aria-hidden="true">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--electric)"></span> 🎮 متجر ألعاب رقمي
            </p>
            <h1 class="hero-title">ارفع مستواك<br>في <span class="text-gradient glow">عالم الألعاب</span></h1>
            <p class="hero-desc">منتجات رقمية متميزة — حسابات، Robux، عناصر نادرة. <strong class="text-electric">توصيل فوري</strong>، آمن 100%.</p>
            <div class="btn-group" style="display:flex;flex-wrap:wrap;gap:1rem" role="group" aria-label="روابط سريعة">
              <a href="/cia-store/shop/" class="btn btn-lg btn-primary">🚀 استعرض المتجر</a>
              <a href="/cia-store/auth/register/" class="btn btn-lg btn-outline">📝 إنشاء حساب</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="feat-title"><div class="container">
        <h2 id="feat-title" class="sr-only">المميزات</h2>
        <div class="features-grid">${[
          ['⚡','توصيل فوري','في دقائق'],
          ['🛡️','آمن 100%','ضمان الذهب'],
          ['🕐','دعم 24/7','متواجدون دائماً'],
          ['👥','موثوق','أكثر من 10 آلاف عميل'],
          ['✨','أفضل الأسعار','نضمن أقل سعر'],
          ['💎','منتجات متميزة','عناصر موثقة'],
        ].map(([i,t,d])=>`<div class="${i==='⚡'||i==='🛡️'?'anim':''}" style="padding:1.5rem 1rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);text-align:center" role="article"><div aria-hidden="true" style="font-size:1.75rem;margin-bottom:.75rem">${i}</div><h3 style="font-size:.875rem;font-weight:700;color:white;margin-bottom:.25rem">${t}</h3><p style="font-size:.75rem;color:var(--text-dim)">${d}</p></div>`).join('')}
        </div>
      </div></section>

      <section class="section" aria-labelledby="prod-title"><div class="container">
        <div style="margin-bottom:3rem">
          <h2 id="prod-title" class="page-title">أحدث <span class="text-gradient glow">المنتجات</span></h2>
          <p class="page-desc" style="margin:0 auto">تصفح مجموعتنا المتميزة من المنتجات الرقمية.</p>
        </div>
        <div class="product-grid" role="list">${feat.map(card).join('')}</div>
        <div style="text-align:center;margin-top:3rem">
          <a href="/cia-store/shop/" class="btn btn-lg btn-primary">عرض الكل ←</a>
        </div>
      </div></section>

      <section class="section" aria-labelledby="rev-title"><div class="container">
        <div style="text-align:center;margin-bottom:3rem">
          <h2 id="rev-title" class="page-title">ماذا يقول <span class="text-gradient glow">عملاؤنا</span></h2>
          <p class="page-desc" style="margin:0 auto">انضم إلى أكثر من 10,000 عميل سعيد.</p>
        </div>
        <div class="review-grid" role="list">${REVIEWS.length===0?'<p style="color:var(--text-dim);text-align:center;grid-column:1/-1">لا توجد تقييمات بعد. كن أول من يقيم!</p>':REVIEWS.map((r,i)=>`
          <div class="anim" role="listitem" style="padding:1.5rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
              <div aria-hidden="true" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--electric),var(--purple));display:flex;align-items:center;justify-content:center;font-size:.875rem;font-weight:700;color:white">${r.avatar}</div>
              <div><div style="font-size:.875rem;font-weight:600;color:white">${r.user}</div><div style="font-size:.75rem;color:var(--text-muted)">${r.date}</div></div>
            </div>
            <div style="display:flex;gap:.125rem;margin-bottom:.75rem;color:var(--yellow)" aria-label="${r.rating} من 5 نجوم">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
            <p style="font-size:.875rem;color:var(--text-dim);line-height:1.625;font-style:italic">"${r.text}"</p>
          </div>`).join('')}
        </div></section>
    </main>
    ${footer()}`;
  return html('سي آي إيه ستور — متجر ألعاب رقمي', SITE_DESC, content, '/');
}

function buildShop(cat='') {
  let f = PRODUCTS;
  if(cat) f = f.filter(p=>p.cat===cat);
  const ci = CATEGORIES.find(c=>c.id===cat);
  const t = ci ? `${ci.name} — المتجر` : 'جميع المنتجات — المتجر';
  const d = ci ? ci.desc : 'تصفح مجموعتنا المتميزة من المنتجات الرقمية.';
  const content = `
    ${header('/shop/')}
    <main id="main-content" role="main">
      <div class="container page-main">
        <h1 class="page-title" style="margin-bottom:.75rem">${ci?ci.name:'المنتجات'} <span class="text-gradient glow">المتجر</span></h1>
        <p style="color:var(--text-dim);max-width:36rem;margin-bottom:2rem">${d}</p>
        <nav aria-label="تصفية الفئات">
          <div style="display:flex;gap:.5rem;margin-bottom:2rem;overflow-x:auto;padding-bottom:.5rem" role="tablist">
            <a href="/cia-store/shop/" role="tab" aria-selected="${!cat}" style="padding:.5rem 1.125rem;border-radius:9999px;font-size:.8125rem;font-weight:600;text-decoration:none;white-space:nowrap;${!cat?'background:var(--electric);color:white':'background:var(--card);color:var(--text-dim);border:1px solid var(--border)'}">الكل</a>
            ${CATEGORIES.map(c=>`<a href="/shop/${c.id}/" role="tab" aria-selected="${cat===c.id}" style="padding:.5rem 1.125rem;border-radius:9999px;font-size:.8125rem;font-weight:600;text-decoration:none;white-space:nowrap;${cat===c.id?'background:var(--electric);color:white':'background:var(--card);color:var(--text-dim);border:1px solid var(--border)'}">${c.icon} ${c.name}</a>`).join('')}
          </div>
        </nav>
        <p style="font-size:.8125rem;color:var(--text-muted);margin-bottom:1.5rem" role="status" id="prodCount">عرض ${f.length} من ${PRODUCTS.length} منتج</p>
        <div class="product-grid" role="list" id="prodGrid">${f.map(card).join('')}</div>
        <div id="noProducts" style="display:none;text-align:center;padding:4rem 1rem;color:var(--text-dim)">
          <div style="font-size:4rem;margin-bottom:1rem">📦</div>
          <h3 style="color:var(--text-bright);margin-bottom:.5rem">لا توجد منتجات بعد</h3>
          <p style="font-size:.875rem">سيتم إضافة المنتجات قريباً من قبل الإدارة.</p>
        </div>
      </div>
    </main>
    ${footer()}
    <script defer>
    /* Dynamic product loader for shop */
    (function(){
      const prods = window.loadProducts();
      const cats = window.loadCategories();
      const grid = document.getElementById('prodGrid');
      const countEl = document.getElementById('prodCount');
      const noEl = document.getElementById('noProducts');
      if(!prods || prods.length === 0) {
        if(grid && grid.children.length === 0) {
          grid.style.display = 'none';
          if(noEl) noEl.style.display = '';
        }
        return;
      }
      // Filter by category if specified
      const catFilter = '${cat}';
      const filtered = catFilter ? prods.filter(p => p.cat === catFilter) : prods;
      if(filtered.length === 0 && (!grid || grid.children.length === 0)) {
        grid.style.display = 'none';
        if(noEl) { noEl.style.display = ''; noEl.innerHTML = '<div style="font-size:4rem;margin-bottom:1rem">📦</div><h3 style="color:var(--text-bright);margin-bottom:.5rem">لا توجد منتجات في هذه الفئة</h3><p style="font-size:.875rem">جرب فئة أخرى.</p>'; }
        if(countEl) countEl.textContent = 'عرض 0 منتج';
        return;
      }
      // Render dynamically
      if(grid) {
        grid.style.display = '';
        grid.innerHTML = filtered.map(p => {
          const d = p.orig ? Math.round((1-p.price/p.orig)*100) : 0;
          const safeName = (p.name||'').replace(/'/g,"\\'");
          return '<div class="product-card anim" role="listitem"><a href="/product/'+p.id+'/" aria-label="'+p.name+' — $'+p.price.toFixed(2)+'" style="text-decoration:none;display:block"><div class="product-media"><span aria-hidden="true" style="z-index:1">'+((p.img&&p.img.startsWith('data:image/'))?'<img src="'+p.img+'" alt="" style="width:32px;height:32px;border-radius:4px;object-fit:cover">':'<span>'+(p.img||'🛒')+'</span>')+'</span><div class="product-badges" aria-hidden="true">'+(p.rarity?'<span class="product-badge '+(p.rarity==='Legendary'?'badge-legendary':p.rarity==='Mythical'?'badge-mythical':'badge-common')+'">'+p.rarity+'</span>':'')+(d>0?'<span class="product-badge badge-discount">-'+d+'%</span>':'')+'</div></div><div class="product-body"><p class="product-name">'+p.name+'</p><p style="font-size:.8125rem;color:var(--text-dim);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+(p.desc||'')+'</p><div style="display:flex;align-items:center;justify-content:space-between;padding-top:.25rem"><div><span class="product-price">$'+p.price.toFixed(2)+'</span>'+(p.orig?'<span class="product-price-orig">$'+p.orig.toFixed(2)+'</span>':'')+'</div></div></div></a><div style="padding:0 1.25rem 1.25rem"><button class="btn btn-sm btn-primary" style="width:100%" onclick="Cart.add({id:\''+p.id+'\',name:\''+safeName+'\',price:'+p.price+',img:\'+((p.img&&p.img.startsWith("data:"))?"🛒":(p.img||"🛒"))+'\',cat:\''+(p.cat||'')+'\'})">🛒 أضف إلى السلة</button></div></div>';
        }).join('');
        if(countEl) countEl.textContent = 'عرض '+filtered.length+' من '+prods.length+' منتج';
      }
    })();
    </script>`;
  return html(t, d, content, cat?'/shop/${cat}/':'/shop/');
}

function buildProduct(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return build404();
  const d = p.orig ? Math.round((1-p.price/p.orig)*100) : 0;
  const related = PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  const ci = CATEGORIES.find(c=>c.id===p.cat);
  const content = `
    ${header()}
    <main id="main-content" role="main">
      <div class="container page-main">
        <nav aria-label="Breadcrumb">
          <div style="display:flex;align-items:center;gap:.5rem;font-size:.8125rem;color:var(--text-muted);margin-bottom:2rem;flex-wrap:wrap">
            <a href="/" style="color:inherit;text-decoration:none">Home</a><span aria-hidden="true">/</span>
            <a href="/cia-store/shop/" style="color:inherit;text-decoration:none">Shop</a><span aria-hidden="true">/</span>
            <a href="/shop/${p.cat}/" style="color:inherit;text-decoration:none">${ci?.name||p.cat}</a><span aria-hidden="true">/</span>
            <span style="color:var(--text)" aria-current="page">${p.name}</span>
          </div>
        </nav>
        <div style="display:grid;gap:2rem;margin-bottom:4rem" class="detail-grid">
          <div style="aspect-ratio:1;border-radius:24px;background:linear-gradient(135deg,var(--bg2),var(--bg));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:6rem;position:relative" aria-hidden="true">
            ${p.img&&p.img.startsWith('data:image/')?`<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;border-radius:24px;object-fit:cover;max-width:400px">`:`<span>${p.img||'📦'}</span>`}
            <div style="position:absolute;top:1rem;left:1rem;display:flex;flex-direction:column;gap:.5rem">
              ${p.rarity?`<span class="product-badge ${badge(p)}">${p.rarity}</span>`:''}
              ${d>0?`<span class="product-badge badge-discount">-${d}% OFF</span>`:''}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:1.5rem">
            <div>
              <p style="font-size:.875rem;color:var(--electric);font-weight:600;text-transform:uppercase;letter-spacing:.05em">${ci?.name||p.cat} ${p.sub?'• '+p.sub:''}</p>
              <h1 style="font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:900;color:white;line-height:1.1">${p.name}</h1>
              <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-top:1rem">
                <span style="font-size:2.5rem;font-weight:900;color:var(--electric)">$${p.price.toFixed(2)}</span>
                ${p.orig?`<span style="font-size:1.125rem;color:var(--text-muted);text-decoration:line-through">$${p.orig.toFixed(2)}</span>`:''}
                <span style="padding:.25rem .75rem;border-radius:9999px;font-size:.75rem;font-weight:600;${p.stock>0?'background:rgba(74,222,128,.1);color:var(--green);border:1px solid rgba(74,222,128,.2)':'background:rgba(248,113,113,.1);color:var(--red);border:1px solid rgba(248,113,113,.2)'}">${p.stock>0?'✓ In Stock':'✗ Out of Stock'}</span>
              </div>
            </div>
            <p style="color:var(--text-dim);line-height:1.75;font-size:1rem">${p.desc}</p>
            <div>
              <h2 style="font-size:.8125rem;font-weight:600;color:var(--text-dim);text-transform:uppercase;letter-spacing:.03em;margin-bottom:.75rem">What's Included</h2>
              <div style="display:grid;grid-template-columns:repeat(1,1fr);gap:.625rem">${p.features.map(f=>`<div style="display:flex;align-items:center;gap:.625rem;font-size:.875rem;color:var(--text-dim)"><span style="color:var(--green);font-weight:700" aria-hidden="true">✓</span> ${f}</div>`).join('')}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)">${[
              ['⚡','Instant','Delivery'],
              ['🛡️','100%','Secure'],
              ['🕐','24/7','Support'],
            ].map(([i,l,s])=>`<div style="text-align:center"><div aria-hidden="true" style="font-size:1.5rem;margin-bottom:.25rem">${i}</div><div style="font-size:.875rem;font-weight:600;color:white">${l}</div><div style="font-size:.75rem;color:var(--text-dim)">${s}</div></div>`).join('')}</div>
            <div style="display:flex;flex-direction:column;gap:.625rem">
              <label style="font-size:.8125rem;font-weight:600;color:var(--text-dim);display:flex;align-items:center;gap:.375rem;text-transform:uppercase;letter-spacing:.03em">🎮 Discord Username <span style="font-size:.75rem;color:var(--text-muted);font-weight:400;text-transform:none;letter-spacing:normal">(required for delivery)</span></label>
              <input id="discordInput" type="text" placeholder="Your Discord username (e.g. ShadowX#0001)" style="height:48px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;width:100%" autocomplete="off" onchange="localStorage.setItem('cia_discord',this.value)">
              <label style="font-size:.8125rem;font-weight:600;color:var(--text-dim);display:flex;align-items:center;gap:.375rem;text-transform:uppercase;letter-spacing:.03em">🎮 Roblox Username <span style="font-size:.75rem;color:var(--text-muted);font-weight:400;text-transform:none;letter-spacing:normal">(required for delivery)</span></label>
              <input id="robloxInput" type="text" placeholder="Your Roblox username" style="height:48px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;width:100%" autocomplete="off" onchange="localStorage.setItem('cia_roblox',this.value)">
            </div>
            <div style="display:flex;gap:.75rem;padding-top:.5rem">
              <button class="btn btn-lg btn-primary" style="flex:1" onclick="Cart.add({id:'${p.id}',name:'${p.name.replace(/'/g,"\\'")}',price:${p.price},img:'${p.img&&!p.img.startsWith("data:")?p.img:"📦"}',cat:'${p.cat}'})">🛒 Add to Cart — $${p.price.toFixed(2)}</button>
              <button class="btn btn-lg btn-glow" onclick="Cart.add({id:'${p.id}',name:'${p.name.replace(/'/g,"\\'")}',price:${p.price},img:'${p.img&&!p.img.startsWith("data:")?p.img:"📦"}',cat:'${p.cat}'});document.getElementById('checkoutBtn')?.click()">⚡ Buy Now</button>
            </div>
            <div style="display:flex;align-items:center;gap:1rem;font-size:.75rem;color:var(--text-muted);padding-top:.5rem"><span aria-hidden="true">🔒</span> Secure checkout <span aria-hidden="true">💳</span> Stripe • PayPal • USDT</div>
          </div>
        </div>
        ${related.length?`
        <h2 style="font-family:'Orbitron',sans-serif;font-size:1.5rem;font-weight:700;color:white;margin-bottom:1.5rem">Related Products</h2>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem" class="related-grid">${related.map(r=>`
          <a href="/product/${r.id}/" class="anim" style="display:block;padding:1rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);text-decoration:none;transition:all .3s">
            <div aria-hidden="true" style="font-size:1.5rem;margin-bottom:.5rem">${r.img}</div>
            <h3 style="font-weight:600;color:white;font-size:.875rem;margin-bottom:.25rem">${r.name}</h3>
            <p style="font-size:.75rem;color:var(--text-dim);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:.5rem">${r.desc}</p>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-weight:700;color:white;font-size:1rem">$${r.price.toFixed(2)}</span>${r.orig?`<span style="font-size:.75rem;color:var(--text-muted);text-decoration:line-through">$${r.orig.toFixed(2)}</span>`:''}</div>
          </a>`).join('')}
        </div>`:''}
      </div>
    </main>
    ${footer()}`;
  return html(p.name, p.desc, content, `/product/${p.id}/`);
}

function buildCart() {
  const CART_PAGE_JS = `<script defer>
/* Cart page — loads items from localStorage */
(function(){
  const container = document.getElementById('cartPageContainer');
  const emptyEl = document.getElementById('cartPageEmpty');
  const itemsEl = document.getElementById('cartPageItems');
  const totalEl = document.getElementById('cartPageTotal');
  
  function render() {
    const items = window.Cart ? Cart.get() : [];
    if (items.length === 0) {
      if (emptyEl) emptyEl.style.display = '';
      if (itemsEl) itemsEl.style.display = 'none';
      if (totalEl) totalEl.style.display = 'none';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (itemsEl) { itemsEl.style.display = ''; itemsEl.innerHTML = ''; }
    if (totalEl) totalEl.style.display = '';
    
    let html = '';
    let total = 0;
    items.forEach(item => {
      total += item.price * item.qty;
      html += \`<div class="cart-page-item">
        <div class="cart-page-item-icon" aria-hidden="true">\${item.img}</div>
        <div class="cart-page-item-info">
          <div class="cart-page-item-name">\${item.name}</div>
          <div class="cart-page-item-price">\$\${Number(item.price).toFixed(2)} each</div>
        </div>
        <div class="cart-page-item-qty">
          <button class="cart-qty-btn" onclick="Cart.updateQty('\${item.id}', \${item.qty} - 1);render()" aria-label="Decrease">−</button>
          <span>\${item.qty}</span>
          <button class="cart-qty-btn" onclick="Cart.updateQty('\${item.id}', \${item.qty} + 1);render()" aria-label="Increase">+</button>
        </div>
        <div class="cart-page-item-total">\$\${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-page-item-remove" onclick="Cart.remove('\${item.id}');render()" aria-label="Remove \${item.name}">✕</button>
      </div>\`;
    });
    if (itemsEl) itemsEl.innerHTML = html;
    if (totalEl) totalEl.querySelector('.total-amount').textContent = '\$' + total.toFixed(2);
  }
  
  // Expose render globally for onclick handlers
  window.renderCartPage = render;
  
  // Wait for Cart to be ready
  if (window.Cart) { render(); }
  else {
    document.addEventListener('DOMContentLoaded', function() {
      // Cart may not be loaded yet if defer, wait
      const check = setInterval(() => {
        if (window.Cart) { render(); clearInterval(check); }
      }, 100);
      setTimeout(() => clearInterval(check), 5000);
    });
  }
})();
</script>
<style>
.cart-page-item{display:grid;grid-template-columns:auto 1fr auto auto auto;gap:.875rem;align-items:center;padding:1rem;border-radius:var(--radius-sm);background:var(--card);border:1px solid var(--border);margin-bottom:.75rem}
.cart-page-item-icon{width:44px;height:44px;border-radius:var(--radius-sm);background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:1.25rem}
.cart-page-item-name{font-size:.9375rem;font-weight:600;color:var(--text-bright)}
.cart-page-item-price{font-size:.75rem;color:var(--text-dim)}
.cart-page-item-qty{display:flex;align-items:center;gap:.375rem}
.cart-page-item-total{font-size:1rem;font-weight:700;color:var(--electric)}
.cart-page-item-remove{background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;font-size:1rem;transition:color .2s}
.cart-page-item-remove:hover{color:var(--red)}
.cart-page-summary{padding:1.5rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);margin-top:1.5rem}
.cart-page-summary-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem}
.cart-page-summary-row:last-child{margin-bottom:0;padding-top:.75rem;border-top:1px solid var(--border)}
@media(max-width:600px){.cart-page-item{grid-template-columns:auto 1fr auto;grid-template-rows:auto auto;gap:.5rem}.cart-page-item-total{grid-column:2;grid-row:2}.cart-page-item-remove{grid-column:3;grid-row:2}}
</style>
`;
  return html('Shopping Cart', 'Your shopping cart at CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:2rem">🛒 Shopping Cart</h1>
      
      <div id="cartPageEmpty" class="page-center" style="text-align:center;padding:3rem 1rem">
        <div aria-hidden="true" style="font-size:4rem;margin-bottom:1.5rem">🛒</div>
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:.5rem">Your Cart is Empty</h2>
        <p class="page-desc" style="margin:0 auto 2rem">Start browsing our premium products!</p>
        <a href="/cia-store/shop/" class="btn btn-lg btn-primary">Browse Products →</a>
      </div>
      
      <div id="cartPageItems" style="display:none">
        <div id="cartPageItemsList"></div>
        <div id="cartPageTotal" class="cart-page-summary" style="display:none">
          <div class="cart-page-summary-row">
            <span style="color:var(--text-dim)">Subtotal</span>
            <span class="total-amount" style="font-size:1.25rem;font-weight:700;color:var(--text-bright)">\$0.00</span>
          </div>
          <div class="cart-page-summary-row">
            <span style="color:var(--text-dim)">Delivery</span>
            <span style="color:var(--green);font-weight:600">Free</span>
          </div>
          <div class="cart-page-summary-row">
            <span style="font-size:1rem;font-weight:700;color:var(--text-bright)">Total</span>
            <span style="font-size:1.5rem;font-weight:900;color:var(--electric)" id="cartPageTotalAmount">\$0.00</span>
          </div>
          <a href="/cia-store/cart/" class="btn btn-lg btn-primary" style="width:100%;margin-top:1rem" id="cartCheckoutBtn">Proceed to Checkout →</a>
          <button class="btn btn-sm btn-outline" style="width:100%;margin-top:.5rem" onclick="Cart.clear();window.renderCartPage&&renderCartPage()">Clear Cart</button>
        </div>
      </div>
    </div></main>
    ${footer()}
    ${CART_PAGE_JS}`, '/cart/');
}

function buildAuth() {
  const AUTH_JS = `
<script defer>
(function(){
  const API = {
    // ─── Firebase/Supabase مستقبلاً ───
    // async login(email, pass) { return await firebase.auth().signInWithEmailAndPassword(email, pass); }
    // async register(email, pass) { return await firebase.auth().createUserWithEmailAndPassword(email, pass); }
    
    // ─── حالياً: محاكاة بـ localStorage ───
    login(email, pass) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('cia_users') || '[]');
          const user = users.find(u => u.email === email && u.password === pass);
          if (user) {
            const session = { email: user.email, name: user.name, role: user.role || 'user', loginTime: Date.now() };
            localStorage.setItem('cia_session', JSON.stringify(session));
            resolve(session);
          } else if (email === 'admin@ciastore.com' && pass === 'Admin123!') {
            const session = { email, name: 'Admin', role: 'admin', loginTime: Date.now() };
            localStorage.setItem('cia_session', JSON.stringify(session));
            resolve(session);
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 800);
      });
    },
    register(email, pass, name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('cia_users') || '[]');
          if (users.find(u => u.email === email)) {
            reject(new Error('Email already registered'));
          } else {
            users.push({ email, password: pass, name, role: 'user', created: Date.now() });
            localStorage.setItem('cia_users', JSON.stringify(users));
            resolve({ email, name });
          }
        }, 800);
      });
    },
    logout() {
      localStorage.removeItem('cia_session');
      window.location.href = '/cia-store/';
    },
    getSession() {
      try { return JSON.parse(localStorage.getItem('cia_session')); } catch(e) { return null; }
    },
    isLoggedIn() { return !!this.getSession(); }
  };

  // ─── Form handling ───
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('pass');
  const errorEl = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginBtn');
  const loadingEl = document.getElementById('loginLoading');
  
  if (!form) return;

  // Remove disabled — enable form
  emailInput.disabled = false;
  passInput.disabled = false;
  submitBtn.disabled = false;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate
    let hasError = false;
    const email = emailInput.value.trim();
    const pass = passInput.value;
    
    emailInput.style.borderColor = 'var(--border)';
    passInput.style.borderColor = 'var(--border)';
    errorEl.style.display = 'none';
    
    if (!email) { emailInput.style.borderColor = 'var(--red)'; hasError = true; }
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { 
      emailInput.style.borderColor = 'var(--red)'; 
      showError('Please enter a valid email address');
      hasError = true;
    }
    if (!pass || pass.length < 6) { 
      passInput.style.borderColor = 'var(--red)'; 
      if (!hasError) showError('Password must be at least 6 characters');
      hasError = true;
    }
    if (hasError) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    loadingEl.style.display = 'flex';

    try {
      const session = await API.login(email, pass);
      showToast(\`Welcome back, \${session.name || session.email}!\`, 'success');
      setTimeout(() => {
        window.location.href = session.role === 'admin' ? '/cia-store/admin/' : '/cia-store/dashboard/';
      }, 1000);
    } catch(err) {
      showError(err.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Sign In';
      loadingEl.style.display = 'none';
    }
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = 'flex';
  }

  function showToast(msg, type) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = \`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);padding:1rem 2rem;border-radius:12px;font-weight:600;z-index:9999;animation:fadeUp .3s;\` + (type==='success'?\`background:rgba(74,222,128,.15);color:var(--green);border:1px solid rgba(74,222,128,.3);\`:\`background:rgba(248,113,113,.15);color:var(--red);border:1px solid rgba(248,113,113,.3);\`);
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),300); }, 3000);
  }
  
  // Demo credentials hint
  const demo = document.getElementById('demoHint');
  if (demo) {
    demo.addEventListener('click', function() {
      emailInput.value = 'admin@ciastore.com';
      passInput.value = 'Admin123!';
      emailInput.style.borderColor = 'var(--green)';
      passInput.style.borderColor = 'var(--green)';
    });
  }
})();
</script>
<style>
.auth-card { padding:2rem; border-radius:24px; background:var(--card); border:1px solid var(--border); }
.auth-input { width:100%; height:48px; padding:0 1rem; border-radius:var(--radius-sm); background:var(--bg); border:1px solid var(--border); color:white; font-size:.875rem; outline:none; transition:border-color .2s; font-family:inherit; }
.auth-input:focus { border-color:var(--electric); }
.auth-input::placeholder { color:var(--text-muted); }
.auth-label { font-size:.8125rem; font-weight:600; color:var(--text-dim); margin-bottom:.5rem; display:block; }
.auth-error { display:none; align-items:center; gap:.5rem; padding:.75rem 1rem; border-radius:10px; background:rgba(248,113,113,.1); border:1px solid rgba(248,113,113,.2); color:var(--red); font-size:.8125rem; margin-bottom:1rem; }
.auth-loading { display:none; align-items:center; justify-content:center; gap:.5rem; padding:.5rem 0; font-size:.8125rem; color:var(--text-dim); }
.auth-loading .spinner { width:16px; height:16px; border:2px solid var(--border); border-top-color:var(--electric); border-radius:50%; animation:spin .6s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.auth-divider { display:flex; align-items:center; gap:1rem; margin:1.5rem 0; color:var(--text-muted); font-size:.75rem; }
.auth-divider::before, .auth-divider::after { content:''; flex:1; height:1px; background:var(--border); }
.demo-btn { background:none; border:none; color:var(--electric); cursor:pointer; font-size:.8125rem; padding:0; text-decoration:underline; font-family:inherit; }
.demo-btn:hover { color:var(--cyan); }
</style>
`;

  return html('Sign In', 'Sign in to your CIA STORE account', `${header()}
    <main id="main-content" role="main"><div class="page-center" style="max-width:28rem;margin:0 auto;padding:4rem 1rem">
      <div aria-hidden="true" style="font-size:3rem;margin-bottom:1rem;text-align:center">⚡</div>
      <h1 class="page-title" style="text-align:center;margin-bottom:.75rem">Welcome Back</h1>
      <p class="page-desc" style="text-align:center;margin:0 auto 2rem">Sign in to your account</p>
      
      <form id="loginForm" class="auth-card" novalidate>
        <div id="loginError" class="auth-error" role="alert"><span>⚠️</span> <span id="errorMsg">Invalid email or password</span></div>
        
        <div style="margin-bottom:1.25rem">
          <label for="email" class="auth-label">Email Address</label>
          <input id="email" type="email" placeholder="you@example.com" class="auth-input" autocomplete="email" required>
        </div>
        
        <div style="margin-bottom:.75rem">
          <label for="pass" class="auth-label">Password</label>
          <input id="pass" type="password" placeholder="••••••••" class="auth-input" autocomplete="current-password" minlength="6" required>
        </div>
        
        <div style="text-align:right;margin-bottom:1.5rem">
          <a href="/cia-store/auth/" style="color:var(--text-muted);font-size:.75rem;text-decoration:none">Forgot password?</a>
        </div>
        
        <button id="loginBtn" type="submit" class="btn btn-lg btn-primary" style="width:100%">Sign In</button>
        
        <div id="loginLoading" class="auth-loading"><div class="spinner"></div> Signing in...</div>
        
        <div style="margin-top:1.5rem;text-align:center">
          <a href="/cia-store/auth/register/" class="btn btn-md btn-outline" style="width:100%">📝 Create New Account</a>
        </div>
        
        <div class="auth-divider"><span>or</span></div>
        
        <p style="text-align:center;font-size:.75rem;color:var(--text-muted);margin-top:1rem">
          🔑 Demo: <button type="button" id="demoHint" class="demo-btn">admin@ciastore.com / Admin123!</button>
        </p>
      </form>
    </div></main>
    ${footer()}
    ${AUTH_JS}`, '/auth/');
}

function buildFaq() {
  const faqs = [
    ['How long does delivery take?','Most orders delivered instantly or within 5-15 minutes. Complex orders like accounts may take up to 24 hours.'],
    ['Is it safe to buy from CIA STORE?','Absolutely! Encrypted payments via Stripe/PayPal. 10,000+ satisfied customers trust us.'],
    ['Do I need a specific level for Blox Fruits?','Most fruits require Level 700+ to trade. Check product descriptions for requirements.'],
    ['What payment methods do you accept?','Stripe (credit/debit cards), PayPal, and USDT (crypto).'],
    ['Can I get a refund?','Digital goods are non-refundable once delivered. Contact support within 24 hours if there\'s an issue.'],
  ];
  return html('FAQ — Frequently Asked Questions', 'Frequently asked questions about CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="text-align:center;margin-bottom:.75rem">FAQ</h1>
      <p class="page-desc" style="text-align:center;margin:0 auto 3rem">Frequently asked questions.</p>
      <div role="list">${faqs.map(([q,a])=>`
        <details style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);margin-bottom:.75rem;cursor:pointer" role="listitem">
          <summary style="font-weight:600;color:white;font-size:.9375rem;outline:none">${q}</summary>
          <p style="margin-top:.75rem;color:var(--text-dim);line-height:1.625;font-size:.875rem">${a}</p>
        </details>`).join('')}
      </div>
    </div></main>
    ${footer()}`, '/faq/');
}

function buildContact() {
  return html('Contact Us', 'Get in touch with CIA STORE support', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:32rem;margin:0 auto;text-align:center">
      <h1 class="page-title" style="margin-bottom:.75rem">Contact Us</h1>
      <p class="page-desc" style="margin:0 auto 2rem">We're available 24/7.</p>
      <div style="display:flex;flex-direction:column;gap:1rem">${[
        ['📧','Email','support@ciastore.com'],
        ['💬','Live Chat','Available 24/7'],
        ['🐦','Twitter','@ciastore'],
      ].map(([i,l,v])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border);display:flex;align-items:center;gap:1rem"><span aria-hidden="true" style="font-size:1.5rem">${i}</span><div><div style="font-size:.875rem;color:var(--text-dim)">${l}</div><div style="font-weight:700;color:var(--electric)">${v}</div></div></div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/contact/');
}

function buildPrivacy() {
  return html('Privacy Policy', 'CIA STORE privacy policy', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:.5rem">Privacy Policy</h1>
      <p style="color:var(--text-muted);margin-bottom:2rem;font-size:.875rem">Last updated: ${new Date().toLocaleDateString()}</p>
      <div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1.5rem">${[
        ['What We Collect','Email, username, and Roblox ID for orders. Payment data handled by Stripe/PayPal — never stored on our servers.'],
        ['Data Protection','All connections use HTTPS encryption. We do not share your personal information with third parties.'],
        ['Cookies','Essential cookies only. No tracking or analytics without your explicit consent.'],
        ['Contact','Email privacy@ciastore.com for any concerns or data deletion requests.'],
      ].map(([t,d])=>`<div><h2 style="color:white;font-weight:700;margin-bottom:.5rem;font-size:1.125rem">${t}</h2><p>${d}</p></div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/privacy/');
}

function buildTerms() {
  return html('Terms of Service', 'CIA STORE terms of service', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:.5rem">Terms of Service</h1>
      <p style="color:var(--text-muted);margin-bottom:2rem;font-size:.875rem">Last updated: ${new Date().toLocaleDateString()}</p>
      <div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1.5rem">${[
        ['Delivery','Digital goods delivered within timeframe on each product page. Most items are delivered instantly via in-game trade.'],
        ['Refunds','All sales final for digital goods. Full refund if product cannot be delivered within 48 hours.'],
        ['Account Safety','Users are responsible for account security after delivery. We are not liable for bans or item loss.'],
      ].map(([t,d])=>`<div><h2 style="color:white;font-weight:700;margin-bottom:.5rem;font-size:1.125rem">${t}</h2><p>${d}</p></div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/terms/');
}

function buildAbout() {
  return html('About Us', 'About CIA STORE — premium gaming digital goods', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:.75rem">About CIA STORE</h1>
      <p class="page-desc" style="margin-bottom:2rem">Your premium gaming digital goods destination.</p>
      <div style="color:var(--text-dim);line-height:1.75;display:flex;flex-direction:column;gap:1rem">
        <p>CIA STORE was founded by passionate gamers who understand the struggle of finding reliable, affordable gaming digital goods.</p>
        <p>We source the best prices on accounts, Robux, game currencies, and gamepasses — delivering them instantly with 24/7 support.</p>
        <p>With thousands of satisfied customers, we're the most trusted gaming marketplace online.</p>
      </div>
    </div></main>
    ${footer()}`, '/about/');
}

function buildDelivery() {
  return html('Delivery Information', 'How delivery works at CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:.75rem">Delivery Info</h1>
      <p class="page-desc" style="margin-bottom:2rem">How your purchases are delivered.</p>
      <div style="display:flex;flex-direction:column;gap:.75rem">${[
        ['Instant Digital','Digital items delivered within minutes via in-game trade or code delivery.'],
        ['Account Delivery','Account purchases include email access transfer. You receive login credentials within 24h.'],
        ['Trade System','Our team joins your game and trades items directly to you. Be in the same server.'],
        ['Requirements','Provide your Roblox username at checkout. Level 700+ required for fruit trades.'],
      ].map(([t,d])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><h2 style="color:white;font-weight:700;margin-bottom:.5rem;font-size:.9375rem">${t}</h2><p style="color:var(--text-dim);line-height:1.625;font-size:.875rem">${d}</p></div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/delivery-info/');
}

function buildRefund() {
  return html('Refund Policy', 'CIA STORE refund policy — 30-day guarantee', `${header()}
    <main id="main-content" role="main"><div class="container page-main" style="max-width:48rem;margin:0 auto">
      <h1 class="page-title" style="margin-bottom:.75rem">Refund Policy</h1>
      <p class="page-desc" style="margin-bottom:2rem">Our 30-day satisfaction guarantee.</p>
      <div style="display:flex;flex-direction:column;gap:.75rem">${[
        ['30-Day Guarantee','Full refund if the product cannot be delivered within 48 hours. 30-day window for claims.'],
        ['Non-Refundable Items','Used codes, redeemed items, and accounts already accessed cannot be refunded.'],
        ['How to Request','Email support@ciastore.com with your order ID. We respond within 12 hours.'],
      ].map(([t,d])=>`<div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><h2 style="color:white;font-weight:700;margin-bottom:.5rem;font-size:.9375rem">${t}</h2><p style="color:var(--text-dim);line-height:1.625;font-size:.875rem">${d}</p></div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/refund-policy/');
}

function buildReviews() {
  return html('Customer Reviews', 'What our customers say about CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="container page-main">
      <h1 class="page-title" style="text-align:center;margin-bottom:.75rem">Customer Reviews</h1>
      <p class="page-desc" style="text-align:center;margin:0 auto 3rem">What our community says about us.</p>
      <div class="review-grid" role="list">${REVIEWS.map(r=>`
        <div role="listitem" style="padding:1.5rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
            <div aria-hidden="true" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--electric),var(--purple));display:flex;align-items:center;justify-content:center;font-size:.875rem;font-weight:700;color:white">${r.avatar}</div>
            <div><div style="font-size:.875rem;font-weight:600;color:white">${r.user}</div><div style="font-size:.75rem;color:var(--text-muted)">${r.date}</div></div>
          </div>
          <div style="display:flex;gap:.125rem;margin-bottom:.75rem;color:var(--yellow)" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          <p style="font-size:.875rem;color:var(--text-dim);line-height:1.625;font-style:italic">"${r.text}"</p>
        </div>`).join('')}</div>
    </div></main>
    ${footer()}`, '/reviews/');
}

function buildRegister() {
  const REG_JS = `<script defer>
(function(){
  const form = document.getElementById('registerForm');
  if (!form) return;
  
  // Remove disabled
  document.querySelectorAll('#registerForm input').forEach(i => i.disabled = false);
  document.querySelector('#registerForm button').disabled = false;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regConfirm').value;
    const errorEl = document.getElementById('regError');
    const btn = document.getElementById('regBtn');
    
    // Reset
    errorEl.style.display = 'none';
    document.querySelectorAll('#registerForm input').forEach(i => i.style.borderColor = 'var(--border)');
    
    // Validate
    if (!name) { document.getElementById('regName').style.borderColor = 'var(--red)'; showError('Name is required'); return; }
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { document.getElementById('regEmail').style.borderColor = 'var(--red)'; showError('Valid email required'); return; }
    if (!pass || pass.length < 6) { document.getElementById('regPass').style.borderColor = 'var(--red)'; showError('Password must be 6+ characters'); return; }
    if (pass !== confirm) { document.getElementById('regConfirm').style.borderColor = 'var(--red)'; showError('Passwords do not match'); return; }
    
    btn.disabled = true; btn.textContent = 'Creating account...';
    
    try {
      // Check if using external API or localStorage
      if (window.API && window.API.register) {
        await window.API.register(email, pass, name);
      } else {
        // Fallback: localStorage
        const users = JSON.parse(localStorage.getItem('cia_users') || '[]');
        if (users.find(u => u.email === email)) {
          showError('Email already registered');
          btn.disabled = false; btn.textContent = 'Create Account';
          return;
        }
        users.push({ email, password: pass, name, role: 'user', created: Date.now() });
        localStorage.setItem('cia_users', JSON.stringify(users));
      }
      
      // Auto-login and redirect
      const session = { email, name, role: 'user', loginTime: Date.now() };
      localStorage.setItem('cia_session', JSON.stringify(session));
      
      btn.textContent = '✅ Account created!';
      setTimeout(() => { window.location.href = '/cia-store/dashboard/'; }, 800);
    } catch(err) {
      showError(err.message);
      btn.disabled = false; btn.textContent = 'Create Account';
    }
  });
  
  function showError(msg) {
    errorEl = document.getElementById('regError');
    errorEl.textContent = msg;
    errorEl.style.display = 'flex';
  }
})();
</script>
<style>
.reg-card { padding:2rem; border-radius:24px; background:var(--card); border:1px solid var(--border); }
</style>
`;
  return html('Create Account', 'Register at CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="page-center" style="max-width:28rem;margin:0 auto;padding:4rem 1rem">
      <div aria-hidden="true" style="font-size:3rem;margin-bottom:1rem;text-align:center">📝</div>
      <h1 class="page-title" style="text-align:center;margin-bottom:.75rem">Create Account</h1>
      <p class="page-desc" style="text-align:center;margin:0 auto 2rem">Join CIA STORE today</p>
      
      <form id="registerForm" class="reg-card" novalidate>
        <div id="regError" class="auth-error" role="alert" style="display:none"><span>⚠️</span> <span id="errorMsg">Error</span></div>
        
        <div style="margin-bottom:1.25rem">
          <label for="regName" class="auth-label">Full Name</label>
          <input id="regName" type="text" placeholder="Your name" class="auth-input" autocomplete="name" required>
        </div>
        
        <div style="margin-bottom:1.25rem">
          <label for="regEmail" class="auth-label">Email Address</label>
          <input id="regEmail" type="email" placeholder="you@example.com" class="auth-input" autocomplete="email" required>
        </div>
        
        <div style="margin-bottom:1.25rem">
          <label for="regPass" class="auth-label">Password</label>
          <input id="regPass" type="password" placeholder="At least 6 characters" class="auth-input" autocomplete="new-password" minlength="6" required>
        </div>
        
        <div style="margin-bottom:1.5rem">
          <label for="regConfirm" class="auth-label">Confirm Password</label>
          <input id="regConfirm" type="password" placeholder="Repeat password" class="auth-input" autocomplete="new-password" minlength="6" required>
        </div>
        
        <button id="regBtn" type="submit" class="btn btn-lg btn-primary" style="width:100%">📝 Create Account</button>
        
        <div class="auth-divider"><span>or</span></div>
        
        <p style="text-align:center;font-size:.875rem;color:var(--text-dim)">
          Already have an account? <a href="/cia-store/auth/" style="color:var(--electric);font-weight:600">Sign In</a>
        </p>
      </form>
    </div></main>
    ${footer()}
    ${REG_JS}`, '/auth/register/');
}

function buildRegister() {
  const REG_JS = `<script defer>
(function(){
  const form = document.getElementById('registerForm');
  if (!form) return;
  document.querySelectorAll('#registerForm input').forEach(i => i.disabled = false);
  document.querySelector('#registerForm button').disabled = false;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;
    const confirm = document.getElementById('regConfirm').value;
    const errorEl = document.getElementById('regError');
    const btn = document.getElementById('regBtn');
    errorEl.style.display = 'none';
    document.querySelectorAll('#registerForm input').forEach(i => i.style.borderColor = 'var(--border)');
    if (!name) { document.getElementById('regName').style.borderColor = 'var(--red)'; errorEl.textContent='Name is required'; errorEl.style.display='flex'; return; }
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { document.getElementById('regEmail').style.borderColor = 'var(--red)'; errorEl.textContent='Valid email required'; errorEl.style.display='flex'; return; }
    if (!pass || pass.length < 6) { document.getElementById('regPass').style.borderColor = 'var(--red)'; errorEl.textContent='Password must be 6+ characters'; errorEl.style.display='flex'; return; }
    if (pass !== confirm) { document.getElementById('regConfirm').style.borderColor = 'var(--red)'; errorEl.textContent='Passwords do not match'; errorEl.style.display='flex'; return; }
    btn.disabled = true; btn.textContent = 'Creating account...';
    const users = JSON.parse(localStorage.getItem('cia_users') || '[]');
    if (users.find(u => u.email === email)) {
      errorEl.textContent='Email already registered'; errorEl.style.display='flex';
      btn.disabled = false; btn.textContent = 'Create Account';
      return;
    }
    users.push({ email, password: pass, name, role: 'user', created: Date.now() });
    localStorage.setItem('cia_users', JSON.stringify(users));
    const session = { email, name, role: 'user', loginTime: Date.now() };
    localStorage.setItem('cia_session', JSON.stringify(session));
    btn.textContent = '✅ Account created!';
    setTimeout(() => { window.location.href = '/cia-store/dashboard/'; }, 800);
  });
})();
</script>`;
  return html('Create Account', 'Register at CIA STORE', `${header()}
    <main id="main-content" role="main"><div class="page-center" style="max-width:28rem;margin:0 auto;padding:4rem 1rem">
      <div aria-hidden="true" style="font-size:3rem;margin-bottom:1rem;text-align:center">📝</div>
      <h1 class="page-title" style="text-align:center;margin-bottom:.75rem">Create Account</h1>
      <p class="page-desc" style="text-align:center;margin:0 auto 2rem">Join CIA STORE today</p>
      <form id="registerForm" style="padding:2rem;border-radius:24px;background:var(--card);border:1px solid var(--border)" novalidate>
        <div id="regError" class="auth-error" role="alert" style="display:none"><span>⚠️</span> <span>Error</span></div>
        <div style="margin-bottom:1.25rem"><label class="auth-label">Full Name</label><input id="regName" type="text" placeholder="Your name" class="auth-input" autocomplete="name" required></div>
        <div style="margin-bottom:1.25rem"><label class="auth-label">Email</label><input id="regEmail" type="email" placeholder="you@example.com" class="auth-input" autocomplete="email" required></div>
        <div style="margin-bottom:1.25rem"><label class="auth-label">Password</label><input id="regPass" type="password" placeholder="6+ characters" class="auth-input" autocomplete="new-password" minlength="6" required></div>
        <div style="margin-bottom:1.5rem"><label class="auth-label">Confirm Password</label><input id="regConfirm" type="password" placeholder="Repeat password" class="auth-input" autocomplete="new-password" minlength="6" required></div>
        <button id="regBtn" type="submit" class="btn btn-lg btn-primary" style="width:100%">📝 Create Account</button>
        <div class="auth-divider"><span>or</span></div>
        <p style="text-align:center;font-size:.875rem;color:var(--text-dim)">Already have an account? <a href="/cia-store/auth/" style="color:var(--electric);font-weight:600">Sign In</a></p>
      </form>
    </div></main>
    ${footer()}
    ${REG_JS}`, '/auth/register/');
}

function buildAdmin() {
  const ADMIN_DATA_JS = `<script defer>
  window.ADMIN_DEFAULTS = ${JSON.stringify({products: PRODUCTS, categories: CATEGORIES})};
</script>
<script src="/cia-store/admin/admin.js" defer></script>`;
  return html('Admin Dashboard', 'CIA STORE admin panel', `${header()}
    <main id="main-content" role="main"><div class="container page-main" id="adminApp">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1rem">
        <h1 class="page-title" style="margin:0">⚡ Admin Dashboard</h1>
        <div style="display:flex;gap:.5rem;align-items:center">
          <span id="roleBadge" style="padding:.375rem .875rem;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(0,212,255,.1);color:var(--electric);border:1px solid rgba(0,212,255,.2)">👑 Admin</span>
          <button class="btn btn-sm btn-outline" style="color:var(--red)" onclick="localStorage.removeItem('cia_session');window.location.href='/cia-store/'">🚪 Sign Out</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:2rem">
        <div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:600;margin-bottom:.25rem">📦 Products</div><div style="font-size:1.75rem;font-weight:900;color:var(--electric)" id="statProducts">0</div></div>
        <div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:600;margin-bottom:.25rem">📁 Categories</div><div style="font-size:1.75rem;font-weight:900;color:var(--purple)" id="statCategories">0</div></div>
        <div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:600;margin-bottom:.25rem">🛒 Orders</div><div style="font-size:1.75rem;font-weight:900;color:var(--yellow)" id="statOrders">0</div></div>
        <div style="padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)"><div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:600;margin-bottom:.25rem">👥 Users</div><div style="font-size:1.75rem;font-weight:900;color:var(--green)" id="statUsers">0</div></div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:2rem">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)"><h2 style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">🛒 Orders</h2></div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.875rem">
          <thead><tr><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Order</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Product</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Qty</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Amount</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Status</th></tr></thead>
          <tbody id="ordersBody"></tbody>
        </table></div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:2rem">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)"><h2 style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">📦 Products</h2></div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.875rem">
          <thead><tr><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Product</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Price</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Stock</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Rarity</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Orders</th></tr></thead>
          <tbody id="prodBody"></tbody>
        </table></div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:2rem">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)"><h2 style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">📁 Categories</h2></div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.875rem">
          <thead><tr><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Category</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">ID</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Description</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Products</th></tr></thead>
          <tbody id="catBody"></tbody>
        </table></div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)"><h2 style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">👥 Users</h2></div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.875rem">
          <thead><tr><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Name</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Email</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Role</th><th style="text-align:left;padding:.75rem 1rem;color:var(--text-muted);font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)">Joined</th></tr></thead>
          <tbody id="usersBody"></tbody>
        </table></div>
      </div>
      <!-- Owner controls -->
      <div class="owner-only" style="display:none;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-top:2rem">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)"><h2 style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">👑 Admin Controls</h2></div>
        <div style="padding:1.25rem 1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn-md btn-primary" onclick="addProduct()">➕ إضافة منتج</button>
          <button class="btn btn-md btn-secondary" onclick="addCategory()">📁 إضافة تصنيف</button>
          <button class="btn btn-md btn-glow" onclick="exportData()">📤 نشر / تصدير</button>
          <span style="font-size:.8125rem;color:var(--text-muted);display:flex;align-items:center;gap:.375rem">💡 Click ✏️ to edit, 🗑 to delete</span>
        </div>
      </div>
      <!-- Form Overlay -->
      <div id="formOverlay" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:1rem" onclick="if(event.target===this)closeForm()">
        <div style="max-width:500px;width:100%;border-radius:24px;background:var(--card);border:1px solid var(--border);padding:1.5rem;max-height:90vh;overflow-y:auto">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem">
            <h2 id="modalTitle" style="font-size:1.125rem;font-weight:700;color:var(--text-bright);margin:0">Form</h2>
            <button class="btn btn-sm btn-outline" onclick="closeForm()" style="padding:0 .5rem;font-size:1.25rem">✕</button>
          </div>
          <div id="formBody"></div>
        </div>
      </div>
    </div></main>
    ${footer()}
    ${ADMIN_DATA_JS}`, '/admin/');
}

function build404() {
  return html('Page Not Found', '404 — This page does not exist', `${header()}
    <main id="main-content" role="main"><div style="text-align:center;padding:6rem 1rem">
      <div style="font-family:'Orbitron',sans-serif;font-size:8rem;font-weight:900;background:linear-gradient(135deg,var(--electric),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:1rem" aria-hidden="true">404</div>
      <h1 class="page-title" style="margin-bottom:1rem">Page Not <span class="text-gradient glow">Found</span></h1>
      <p style="color:var(--text-dim);margin-bottom:2rem">The page you're looking for doesn't exist.</p>
      <a href="/" class="btn btn-lg btn-primary">Back to Home</a>
    </div></main>
    ${footer()}`, '/404/');
}

// ═══════════════════════════════════════════════════
// BUILD ENGINE
// ═══════════════════════════════════════════════════

const DIST = path.join(__dirname, 'dist');
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });

const pages = [];
function add(p, c) { pages.push({ path: p, content: c }) }

// Main pages
add('index.html', buildHome());
add('shop/index.html', buildShop());
add('cart/index.html', buildCart());
add('auth/index.html', buildAuth());
add('auth/register/index.html', buildRegister());
add('contact/index.html', buildContact());
add('faq/index.html', buildFaq());
add('privacy/index.html', buildPrivacy());
add('terms/index.html', buildTerms());
add('about/index.html', buildAbout());
add('delivery-info/index.html', buildDelivery());
add('refund-policy/index.html', buildRefund());
add('reviews/index.html', buildReviews());
add('admin/index.html', buildAdmin());
add('404.html', build404());

// Category shop pages
for (const c of CATEGORIES) {
  add(`shop/${c.id}/index.html`, buildShop(c.id));
}

// Product detail pages
for (const p of PRODUCTS) {
  add(`product/${p.id}/index.html`, buildProduct(p.id));
}

// ─── Sitemap XML ───
function buildSitemap() {
  const urls = [
    '', '/shop/', '/cart/', '/auth/', '/contact/', '/faq/',
    '/privacy/', '/terms/', '/about/', '/delivery-info/', '/refund-policy/', '/reviews/', '/admin/',
    ...CATEGORIES.map(c => `/shop/${c.id}/`),
    ...PRODUCTS.map(p => `/product/${p.id}/`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE_URL}${u}</loc><changefreq>${u.includes('/product/')?'weekly':'monthly'}</changefreq><priority>${u===''?'1.0':u==='/shop/'?'0.9':'0.7'}</priority></url>`).join('\n')}
</urlset>`;
}
add('sitemap.xml', buildSitemap());

// ─── Robots.txt ───
add('robots.txt', `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`);

// ─── Surge SPA fallback ───
add('200.html', buildHome());

// Write all files
for (const page of pages) {
  const fp = path.join(DIST, page.path);
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, page.content, 'utf8');
  console.log(`  ✓ ${page.path}`);
}

// Copy admin.js
const adminJsSrc = path.join(__dirname, 'admin.js');
const adminJsDst = path.join(DIST, 'admin', 'admin.js');
// Copy data/products.json to dist
var dataSrc2 = path.join(__dirname, 'data', 'products.json');
var dataDst2 = path.join(DIST, 'data', 'products.json');
if (fs.existsSync(dataSrc2)) {
  fs.mkdirSync(path.dirname(dataDst2), { recursive: true });
  fs.copyFileSync(dataSrc2, dataDst2);
  console.log('  ✓ data/products.json');
}
if (fs.existsSync(adminJsSrc)) {
  fs.copyFileSync(adminJsSrc, adminJsDst);
  console.log('  ✓ admin/admin.js');
}

// Stats
let totalBytes = 0;
function countSize(dir) {
  for (const item of fs.readdirSync(dir)) {
    const fp = path.join(dir, item);
    if (fs.statSync(fp).isDirectory()) countSize(fp);
    else totalBytes += fs.statSync(fp).size;
  }
}
countSize(DIST);

console.log(`\n  ✅ Built ${pages.length} pages (${(totalBytes/1024).toFixed(0)} KB)`);
console.log(`  📦 Deploy: npx surge dist/ gaming-arsenal.surge.sh\n`);
