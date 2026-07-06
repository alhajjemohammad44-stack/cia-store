/**
 * ⚡ CIA STORE — Static Admin Panel Page
 * Generates a fully functional admin panel as static HTML.
 * No backend needed — all data is embedded.
 * Run: node build-admin.js
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const products = [
  { id: 'p1', name: 'Dragon Fruit', cat: 'Blox Fruits', price: 32, orig: 50, stock: 67, status: 'Active', rarity: 'Legendary', orders: 234 },
  { id: 'p2', name: 'Venom Fruit', cat: 'Blox Fruits', price: 28, orig: 45, stock: 34, status: 'Active', rarity: 'Mythical', orders: 189 },
  { id: 'p3', name: 'Kitsune Fruit', cat: 'Blox Fruits', price: 45, orig: 70, stock: 22, status: 'Active', rarity: 'Mythical', orders: 156 },
  { id: 'p7', name: '400 Robux', cat: 'Robux', price: 3.50, orig: 4.99, stock: 999, status: 'Active', rarity: 'Common', orders: 567 },
  { id: 'p8', name: '1700 Robux', cat: 'Robux', price: 12.99, orig: 19.99, stock: 999, status: 'Active', rarity: 'Uncommon', orders: 892 },
  { id: 'p9', name: '4500 Robux', cat: 'Robux', price: 29.99, orig: 49.99, stock: 500, status: 'Active', rarity: 'Rare', orders: 445 },
  { id: 'p10', name: 'Blox Fruit Max Account', cat: 'Accounts', price: 55, orig: 85, stock: 8, status: 'Active', rarity: 'Legendary', orders: 67 },
  { id: 'p11', name: 'OG Account 2018', cat: 'Accounts', price: 120, orig: 200, stock: 3, status: 'Active', rarity: 'Mythical', orders: 23 },
  { id: 'p12', name: '2x Mastery', cat: 'Gamepasses', price: 8.99, orig: 12.99, stock: 200, status: 'Active', rarity: 'Rare', orders: 312 },
  { id: 'p14', name: 'Dark Blade', cat: 'Gamepasses', price: 15, orig: 25, stock: 50, status: 'Active', rarity: 'Legendary', orders: 178 },
];

const orders = [
  { id: 'ORD-2026-001', customer: 'ShadowX_Pro', email: 'shadow@email.com', product: 'Dragon Fruit', amount: 32, status: 'Completed', date: '2026-07-05', payment: 'Stripe', items: 1 },
  { id: 'ORD-2026-002', customer: 'ProGamer99', email: 'progamer@email.com', product: '1700 Robux', amount: 12.99, status: 'Completed', date: '2026-07-05', payment: 'PayPal', items: 2 },
  { id: 'ORD-2026-003', customer: 'NinjaWarrior', email: 'ninja@email.com', product: 'Venom Permanent', amount: 38, status: 'Processing', date: '2026-07-06', payment: 'USDT', items: 1 },
  { id: 'ORD-2026-004', customer: 'BloxKing99', email: 'bloxking@email.com', product: 'Max Account', amount: 55, status: 'Pending', date: '2026-07-06', payment: 'Stripe', items: 1 },
  { id: 'ORD-2026-005', customer: 'DragonSlayer', email: 'slayer@email.com', product: 'Dragon Permanent', amount: 42, status: 'Completed', date: '2026-07-04', payment: 'PayPal', items: 3 },
  { id: 'ORD-2026-006', customer: 'FruitHunter', email: 'hunter@email.com', product: 'Light Fruit', amount: 12, status: 'Cancelled', date: '2026-07-04', payment: 'Stripe', items: 1 },
  { id: 'ORD-2026-007', customer: 'RobuxKing', email: 'king@email.com', product: '4500 Robux', amount: 29.99, status: 'Processing', date: '2026-07-06', payment: 'USDT', items: 1 },
];

const revenue = { today: 1289.50, week: 8450.00, month: 34200.00, total: 284500.00 };

// ═══════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════

const CSS = `/* ⚡ CIA STORE ADMIN */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#050B14;color:rgba(255,255,255,0.9);min-height:100vh}
:root{--electric:#00A3FF;--dark:#050B14;--darker:#0A1628;--card:#0D1B30;--border:rgba(255,255,255,0.06);--green:#4ade80;--red:#f87171;--yellow:#facc15;--purple:#a78bfa}
.layout{display:flex;min-height:100vh}
.sidebar{width:260px;background:var(--darker);border-right:1px solid var(--border);padding:1.5rem;position:fixed;top:0;left:0;bottom:0;overflow-y:auto}
.main{margin-left:260px;flex:1;padding:2rem}
.logo{display:flex;align-items:center;gap:0.5rem;margin-bottom:2rem}
.logo-icon{width:36px;height:36px;border-radius:8px;background:rgba(0,163,255,0.15);border:1px solid rgba(0,163,255,0.3);display:flex;align-items:center;justify-content:center;font-size:1.25rem}
.logo-text{font-weight:900;font-size:1.25rem;color:white}
.logo-text span{color:var(--electric)}
.nav{display:flex;flex-direction:column;gap:0.25rem}
.nav a{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:10px;color:rgba(255,255,255,0.5);font-size:0.875rem;font-weight:500;text-decoration:none;transition:all 0.2s}
.nav a:hover,.nav a.active{background:rgba(0,163,255,0.08);color:white}
.nav a.active{color:var(--electric)}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border)}
.topbar h1{font-size:1.5rem;font-weight:800;color:white}
.admin-badge{padding:0.375rem 1rem;border-radius:9999px;background:rgba(0,163,255,0.1);border:1px solid rgba(0,163,255,0.2);color:var(--electric);font-size:0.75rem;font-weight:700}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.stat-card{padding:1.5rem;border-radius:16px;background:var(--card);border:1px solid var(--border)}
.stat-label{font-size:0.75rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-bottom:0.5rem}
.stat-value{font-size:1.75rem;font-weight:800;color:white}
.stat-change{font-size:0.75rem;margin-top:0.25rem}
.table-wrap{overflow-x:auto;margin-bottom:2rem}
table{width:100%;border-collapse:collapse;font-size:0.875rem}
th{text-align:left;padding:0.75rem 1rem;color:rgba(255,255,255,0.4);font-weight:600;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--border)}
td{padding:0.75rem 1rem;border-bottom:1px solid var(--border);color:rgba(255,255,255,0.8)}
tr:hover td{background:rgba(255,255,255,0.02)}
.badge{padding:0.25rem 0.625rem;border-radius:9999px;font-size:0.75rem;font-weight:600;display:inline-flex;align-items:center;gap:0.375rem}
.badge-green{background:rgba(74,222,128,0.1);color:var(--green);border:1px solid rgba(74,222,128,0.2)}
.badge-yellow{background:rgba(250,204,21,0.1);color:var(--yellow);border:1px solid rgba(250,204,21,0.2)}
.badge-blue{background:rgba(0,163,255,0.1);color:var(--electric);border:1px solid rgba(0,163,255,0.2)}
.badge-red{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.2)}
.badge-purple{background:rgba(167,139,250,0.1);color:var(--purple);border:1px solid rgba(167,139,250,0.2)}
.section-title{font-size:1.125rem;font-weight:700;color:white;margin-bottom:1rem}
@media(max-width:768px){.sidebar{width:60px;padding:1rem 0.75rem}.sidebar .logo-text,.sidebar .nav a span{display:none}.main{margin-left:60px;padding:1rem}}
`;

// ═══════════════════════════════════════════════════
// BUILD ADMIN HTML
// ═══════════════════════════════════════════════════

function buildAdmin() {
  const totalRevenue = revenue.total.toLocaleString();
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard | CIA Store</title>
<style>${CSS}</style>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
</head><body>
<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-icon">⚡</div>
      <span class="logo-text">CIA <span>ADMIN</span></span>
    </div>
    <nav class="nav">
      <a href="/admin" class="active"><span>📊</span><span>Dashboard</span></a>
      <a href="/admin-products"><span>📦</span><span>Products</span></a>
      <a href="/admin-orders"><span>📋</span><span>Orders</span></a>
      <a href="/"><span>←</span><span>Back to Store</span></a>
    </nav>
  </aside>

  <!-- Main Content -->
  <div class="main">
    <div class="topbar">
      <div>
        <h1>Dashboard</h1>
        <p style="color:rgba(255,255,255,0.4);font-size:0.875rem">Welcome back, Admin! Here's your store overview.</p>
      </div>
      <div class="admin-badge">🟢 Online · Admin</div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat-card"><div class="stat-label">💰 Total Revenue</div><div class="stat-value">$${totalRevenue}</div><div class="stat-change" style="color:var(--green)">↑ 12.5% this month</div></div>
      <div class="stat-card"><div class="stat-label">📦 Total Orders</div><div class="stat-value">${totalOrders}</div><div class="stat-change" style="color:var(--green)">↑ 8.3% this week</div></div>
      <div class="stat-card"><div class="stat-label">🏷️ Active Products</div><div class="stat-value">${totalProducts}</div><div class="stat-change" style="color:var(--green)">All in stock</div></div>
      <div class="stat-card"><div class="stat-label">⏳ Pending Orders</div><div class="stat-value">${pendingOrders}</div><div class="stat-change" style="color:var(--yellow)">Needs attention</div></div>
      <div class="stat-card"><div class="stat-label">📈 Today's Revenue</div><div class="stat-value">$${revenue.today.toLocaleString()}</div><div class="stat-change" style="color:var(--green)">+$${(revenue.today * 0.15).toFixed(0)} vs yesterday</div></div>
    </div>

    <!-- Recent Orders -->
    <div class="section-title">📋 Recent Orders</div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th>
        </tr></thead>
        <tbody>${orders.map(o => {
          const statusClass = { Completed: 'badge-green', Processing: 'badge-blue', Pending: 'badge-yellow', Cancelled: 'badge-red' }[o.status] || 'badge-blue';
          return `<tr>
            <td style="font-weight:600;color:var(--electric)">${o.id}</td>
            <td><div style="font-weight:600">${o.customer}</div><div style="font-size:0.75rem;color:rgba(255,255,255,0.4)">${o.email}</div></td>
            <td>${o.product} ×${o.items}</td>
            <td style="font-weight:700">$${o.amount.toFixed(2)}</td>
            <td><span class="badge badge-blue">${o.payment}</span></td>
            <td><span class="badge ${statusClass}">${o.status}</span></td>
            <td style="color:rgba(255,255,255,0.5)">${o.date}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
    </div>

    <!-- Products -->
    <div class="section-title">🏷️ Products (${products.length})</div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Name</th><th>Category</th><th>Price</th><th>Original</th><th>Stock</th><th>Rarity</th><th>Orders</th><th>Status</th>
        </tr></thead>
        <tbody>${products.map(p => {
          const discount = p.orig ? Math.round((1 - p.price/p.orig)*100) : 0;
          return `<tr>
            <td style="font-weight:600">${p.name}</td>
            <td><span class="badge badge-blue">${p.cat}</span></td>
            <td style="font-weight:700;color:var(--electric)">$${p.price.toFixed(2)}</td>
            <td style="color:rgba(255,255,255,0.4);text-decoration:line-through">${p.orig ? '$'+p.orig.toFixed(2) : '-'}</td>
            <td>${p.stock > 50 ? '<span style="color:var(--green)">●</span>' : p.stock > 10 ? '<span style="color:var(--yellow)">●</span>' : '<span style="color:var(--red)">●</span>'} ${p.stock}</td>
            <td><span class="badge ${p.rarity === 'Mythical' ? 'badge-purple' : p.rarity === 'Legendary' ? 'badge-yellow' : 'badge-blue'}">${p.rarity}</span></td>
            <td>${p.orders}</td>
            <td><span class="badge badge-green">${p.status}</span></td>
          </tr>`;
        }).join('')}</tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:2rem 0;color:rgba(255,255,255,0.2);font-size:0.75rem">
      ⚡ CIA STORE Admin Panel — Static Version<br>
      Full admin requires Cloudflare deployment with D1 database
    </div>
  </div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════
// BUILD PAGES
// ═══════════════════════════════════════════════════

const pages = [
  { path: 'admin/index.html', content: buildAdmin() },
  { path: 'admin-products/index.html', content: buildAdmin() },  // same for now
  { path: 'admin-orders/index.html', content: buildAdmin() },    // same for now
];

for (const page of pages) {
  const filePath = path.join(DIST, page.path);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, page.content, 'utf8');
  console.log(`  ✓ admin/${page.path}`);
}

console.log(`\n  ✅ Built ${pages.length} admin pages to dist/\n`);
