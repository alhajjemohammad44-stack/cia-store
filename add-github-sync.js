const fs = require('fs');
const path = require('path');

// ============================================
// STEP 1: Update admin.js to add GitHub auto-sync
// ============================================

let adminJs = fs.readFileSync(path.join(__dirname, 'admin.js'), 'utf8');

// Add GitHub sync functions at the end of admin.js
const gitHubSyncCode = `
// ═══ CIA STORE — GitHub Auto-Sync ═══
// منتجاتك تظهر للعملاء فوراً بدون نشر/تصدير
(function(){
  const GITHUB = {
    REPO: 'alhajjemohammad44-stack/cia-store',
    BRANCH: 'main',
    FILE_PATH: 'data/products.json',
    RAW_URL: 'https://raw.githubusercontent.com/alhajjemohammad44-stack/cia-store/main/data/products.json',
    
    // Check if connected
    isConnected() {
      return !!localStorage.getItem('cia_github_token');
    },
    
    // Save token
    setToken(token) {
      localStorage.setItem('cia_github_token', token);
    },
    
    // Get the data as JSON
    getData() {
      return {
        products: (function() {
          try { return JSON.parse(localStorage.getItem('cia_admin_products') || '[]'); }
          catch(e) { return []; }
        })(),
        categories: (function() {
          try { return JSON.parse(localStorage.getItem('cia_admin_categories') || '[]'); }
          catch(e) { return []; }
        })()
      };
    },
    
    // Push data to GitHub
    async push() {
      const token = localStorage.getItem('cia_github_token');
      if (!token) return false;
      
      const data = this.getData();
      const jsonStr = JSON.stringify(data, null, 2);
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
      
      // First, get the current file's SHA to update it
      let sha = null;
      try {
        const resp = await fetch(\`https://api.github.com/repos/\${this.REPO}/contents/\${this.FILE_PATH}\`, {
          headers: { 'Authorization': \`token \${token}\`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (resp.ok) {
          const fileInfo = await resp.json();
          sha = fileInfo.sha;
        }
      } catch(e) {}
      
      // Create or update the file
      const body = {
        message: \`🔄 Auto-sync products: \${data.products.length} products, \${data.categories.length} categories\`,
        content: encoded,
        branch: this.BRANCH
      };
      if (sha) body.sha = sha;
      
      try {
        const resp = await fetch(\`https://api.github.com/repos/\${this.REPO}/contents/\${this.FILE_PATH}\`, {
          method: 'PUT',
          headers: { 'Authorization': \`token \${token}\`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
          body: JSON.stringify(body)
        });
        return resp.ok;
      } catch(e) {
        return false;
      }
    },
    
    // Auto-sync wrapper
    async autoSync() {
      if (!this.isConnected()) return false;
      const result = await this.push();
      if (result) {
        window.showToast?.('✅ تم المزامنة مع GitHub — المنتجات ظهرت للعملاء!', 'success');
      } else {
        window.showToast?.('❌ فشلت المزامنة مع GitHub', 'error');
      }
      return result;
    }
  };
  
  window.GitHubSync = GITHUB;
  
  // Override save functions to auto-sync
  const origSave = function(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    // Auto-sync if GitHub is connected
    setTimeout(() => { GITHUB.autoSync(); }, 500);
  };
  
  // Wait for DOM and patch the save function used in admin
  document.addEventListener('DOMContentLoaded', function() {
    // Find the save function reference and replace it
    // The admin uses save(key, val) internally
    // We'll add a GitHub connect button and auto-sync after each save
    
    // Add GitHub status indicator to admin dashboard
    const statGrid = document.querySelector('.page-main > div:first-child + div');
    if (statGrid) {
      const githubCard = document.createElement('div');
      githubCard.style.cssText = 'padding:1.25rem;border-radius:var(--radius);background:var(--card);border:1px solid var(--border)';
      githubCard.innerHTML = '<div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:600;margin-bottom:.25rem">🌐 GitHub Sync</div>' +
        '<div style="font-size:.875rem;font-weight:700;color:var(--green)" id="githubStatus">⚪ غير متصل</div>';
      statGrid.appendChild(githubCard);
    }
    
    // Add "Connect GitHub" button to admin controls
    const controls = document.querySelector('.owner-only div:last-child');
    if (controls) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-md btn-outline';
      btn.innerHTML = '🔗 ربط GitHub';
      btn.onclick = connectGitHub;
      btn.style.cssText += 'background:rgba(0,255,135,.05);border-color:rgba(0,255,135,.2);color:var(--green)';
      controls.insertBefore(btn, controls.querySelector('span'));
      
      // Update status
      updateGitHubStatus();
    }
  });
  
  function updateGitHubStatus() {
    const el = document.getElementById('githubStatus');
    if (!el) return;
    if (GITHUB.isConnected()) {
      el.innerHTML = '🟢 متصل — تزامن تلقائي';
      el.style.color = 'var(--green)';
    } else {
      el.innerHTML = '⚪ غير متصل';
      el.style.color = 'var(--text-muted)';
    }
  }
  
  window.connectGitHub = function() {
    const token = prompt('🔑 أدخل GitHub Personal Access Token:\n(صلاحية repo كاملة)\n\nممكن تسوي token من:\nhttps://github.com/settings/tokens');
    if (!token) return;
    GITHUB.setToken(token);
    updateGitHubStatus();
    
    // Push immediately
    GITHUB.autoSync();
  };
  
  // Override window.save and window.saveProduct to auto-sync
  const origSaveProduct = window.saveProduct;
  if (origSaveProduct) {
    const newSaveProduct = function() {
      origSaveProduct();
      setTimeout(() => GITHUB.autoSync(), 1000);
    };
    window.saveProduct = newSaveProduct;
  }
  
  const origSaveCategory = window.saveCategory;
  if (origSaveCategory) {
    const newSaveCategory = function() {
      origSaveCategory();
      setTimeout(() => GITHUB.autoSync(), 1000);
    };
    window.saveCategory = newSaveCategory;
  }
  
  const origDelProduct = window.delProduct;
  if (origDelProduct) {
    const newDelProduct = function(id) {
      origDelProduct(id);
      setTimeout(() => GITHUB.autoSync(), 1000);
    };
    window.delProduct = newDelProduct;
  }
  
  const origDelCategory = window.delCategory;
  if (origDelCategory) {
    const newDelCategory = function(id) {
      origDelCategory(id);
      setTimeout(() => GITHUB.autoSync(), 1000);
    };
    window.delCategory = newDelCategory;
  }
  
  // Expose toast function if not exists
  if (!window.showToast) {
    window.showToast = function(msg, type) {
      const t = document.createElement('div');
      t.textContent = msg;
      t.style.cssText = \`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);padding:1rem 2rem;border-radius:12px;font-weight:600;z-index:9999;animation:fadeUp .3s;\${
        type==='success'?'background:rgba(74,222,128,.15);color:var(--green);border:1px solid rgba(74,222,128,.3);':
        'background:rgba(248,113,113,.15);color:var(--red);border:1px solid rgba(248,113,113,.3);'
      }box-shadow:0 8px 30px rgba(0,0,0,.5)`;
      document.body.appendChild(t);
      setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),300); }, 2800);
    };
  }
})();
`;

adminJs = adminJs.trim() + '\n' + gitHubSyncCode.trim() + '\n';
fs.writeFileSync(path.join(__dirname, 'admin.js'), adminJs, 'utf8');
console.log('✅ Updated admin.js with GitHub auto-sync');

// ============================================
// STEP 2: Update build.js shop dynamic JS to fetch from GitHub
// ============================================

let buildJs = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');

// Add GitHub data loader to the shop page dynamic JS
// Find the shop page's inline script and add a fetch from GitHub

// The shop page dynamic JS has loadProducts/loadCategories that read from localStorage
// I need to also try fetching from GitHub raw URL

const githubDataLoader = `
/* ═══ CIA STORE — Live Data from GitHub ═══ */
// يحاول يجيب البيانات من GitHub مباشرة عشان الزبون يشوف اخر التحديثات
window.GH_PRODUCTS_URL = 'https://raw.githubusercontent.com/alhajjemohammad44-stack/cia-store/main/data/products.json';

// Enhanced loadProducts that tries GitHub first, falls back to localStorage
const _origLoadProducts = window.loadProducts || function(){ return []; };
const _origLoadCategories = window.loadCategories || function(){ return []; };

// Try loading from GitHub on page load
(async function(){
  try {
    const resp = await fetch(window.GH_PRODUCTS_URL);
    if (resp.ok) {
      const data = await resp.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        // Cache in localStorage for offline
        try { localStorage.setItem('cia_github_products', JSON.stringify(data.products)); } catch(e) {}
        try { localStorage.setItem('cia_github_categories', JSON.stringify(data.categories)); } catch(e) {}
        console.log('📦 Loaded', data.products.length, 'products from GitHub');
      }
    }
  } catch(e) {}
})();

// Override loadProducts to merge GitHub + local
window.loadProducts = function() {
  const local = _origLoadProducts();
  try {
    const gh = JSON.parse(localStorage.getItem('cia_github_products') || '[]');
    if (gh.length > 0) return gh; // GitHub data takes priority
  } catch(e) {}
  return local;
};

window.loadCategories = function() {
  const local = _origLoadCategories();
  try {
    const gh = JSON.parse(localStorage.getItem('cia_github_categories') || '[]');
    if (gh.length > 0) return gh;
  } catch(e) {}
  return local;
};
`;

// Insert the GitHub data loader right before the cart system in the HTML template
// The CART_JS starts with "/* ═══ CIA STORE — Shopping Cart System ═══ */"
const cartJsMarker = '/* ═══ CIA STORE — Shopping Cart System ═══ */';
if (buildJs.includes(cartJsMarker)) {
  buildJs = buildJs.replace(cartJsMarker, githubDataLoader + cartJsMarker);
  console.log('✅ Added GitHub data loader to shop page');
} else {
  console.log('❌ Cart JS marker not found in build.js');
}

// Also update the CART_JS constant's inline loadProducts/loadCategories
// Find the loadProducts/loadCategories in the cart JS and enhance them
const cartLoadProducts = `window.loadProducts = function() {
  try {
    const stored = JSON.parse(localStorage.getItem('cia_admin_products') || '[]');
    return stored;
  } catch(e) { return []; }
};`;

const cartLoadCategories = `window.loadCategories = function() {
  try {
    const stored = JSON.parse(localStorage.getItem('cia_admin_categories') || '[]');
    return stored;
  } catch(e) { return []; }
};`;

const enhancedLoadProducts = `window.loadProducts = function() {
  try {
    const local = JSON.parse(localStorage.getItem('cia_admin_products') || '[]');
    try {
      const gh = JSON.parse(localStorage.getItem('cia_github_products') || '[]');
      if (gh.length > 0) return gh;
    } catch(e) {}
    return local;
  } catch(e) { return []; }
};`;

const enhancedLoadCategories = `window.loadCategories = function() {
  try {
    const local = JSON.parse(localStorage.getItem('cia_admin_categories') || '[]');
    try {
      const gh = JSON.parse(localStorage.getItem('cia_github_categories') || '[]');
      if (gh.length > 0) return gh;
    } catch(e) {}
    return local;
  } catch(e) { return []; }
};`;

buildJs = buildJs.replace(cartLoadProducts, enhancedLoadProducts);
buildJs = buildJs.replace(cartLoadCategories, enhancedLoadCategories);
console.log('✅ Enhanced loadProducts/loadCategories to check GitHub data');

// ============================================
// STEP 3: Create the data directory in git
// ============================================

// Create data directory with initial empty products.json
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify({ products: [], categories: [] }, null, 2));
console.log('✅ Created data/products.json');

// ============================================
// STEP 4: Update build.js to copy data file to dist
// ============================================

// Find the part where admin.js is copied to dist
const adminCopyMarker = "const adminJsDst = path.join(DIST, 'admin', 'admin.js');";
if (buildJs.includes(adminCopyMarker)) {
  // Add data file copy after admin.js copy
  const dataCopyCode = `
// Copy data/products.json to dist for local fallback
const dataSrc = path.join(__dirname, 'data', 'products.json');
const dataDst = path.join(DIST, 'data', 'products.json');
if (fs.existsSync(dataSrc)) {
  fs.mkdirSync(path.dirname(dataDst), { recursive: true });
  fs.copyFileSync(dataSrc, dataDst);
  console.log('  ✓ data/products.json');
}`;
  
  buildJs = buildJs.replace(adminCopyMarker, adminCopyMarker + dataCopyCode);
  console.log('✅ Added data file copy to build process');
}

fs.writeFileSync(path.join(__dirname, 'build.js'), buildJs, 'utf8');
console.log('✅ Updated build.js');

// ============================================
// STEP 5: Update .gitignore to include data/
// ============================================

let gitignore = '';
try {
  gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf8');
} catch(e) { gitignore = ''; }

if (!gitignore.includes('data/products.json')) {
  // Don't ignore the data file - it needs to be committed
  console.log('✅ data/products.json will be tracked by git');
}

console.log('\n🎉 All done! Now:');
console.log('1. git add -A && git commit -m "Add GitHub auto-sync"');
console.log('2. git push origin main');
console.log('3. Deploy admin panel');
console.log('4. Admin enters GitHub PAT once → products appear to customers immediately!');
