// Test admin logic
const fs = require('fs');
const path = require('path');

// Build and serve test
const adminHtml = fs.readFileSync(path.join(__dirname, 'dist/admin/index.html'), 'utf8');
const adminJs = fs.readFileSync(path.join(__dirname, 'dist/admin/admin.js'), 'utf8');

// Check for issues in the HTML
const issues = [];
if (!adminHtml.includes('id="formOverlay"')) issues.push('Missing formOverlay');
if (!adminHtml.includes('id="modalTitle"')) issues.push('Missing modalTitle');
if (!adminHtml.includes('id="formBody"')) issues.push('Missing formBody');
if (!adminHtml.includes('id="prodBody"')) issues.push('Missing prodBody');
if (!adminHtml.includes('id="catBody"')) issues.push('Missing catBody');
if (!adminHtml.includes('id="ordersBody"')) issues.push('Missing ordersBody');
if (!adminHtml.includes('id="usersBody"')) issues.push('Missing usersBody');
if (!adminHtml.includes('id="roleBadge"')) issues.push('Missing roleBadge');
if (!adminHtml.includes('id="statProducts"')) issues.push('Missing statProducts');
if (!adminHtml.includes('id="statCategories"')) issues.push('Missing statCategories');
if (!adminHtml.includes('class="owner-only"')) issues.push('Missing owner-only');

if (issues.length) {
  console.log('❌ Issues found:', issues.join(', '));
} else {
  console.log('✅ All HTML elements present');
}

// Check admin JS for critical functions
const jsChecks = [
  'getSession', 'loadProd', 'loadCat', 'saveProd', 'saveCat',
  'showForm', 'closeForm', 'exportData', 'render',
  'addProduct', 'editProduct', 'saveProduct', 'delProduct',
  'addCategory', 'saveCategory', 'delCategory',
  'canEdit'
];

const missing = jsChecks.filter(fn => !adminJs.includes(fn));
if (missing.length) {
  console.log('❌ Missing JS functions:', missing.join(', '));
} else {
  console.log('✅ All JS functions present');
}

// Check JS syntax
try {
  new Function(adminJs);
  console.log('✅ admin.js syntax valid');
} catch (e) {
  console.log('❌ admin.js syntax error:', e.message);
}

console.log('\nAdmin HTML size:', adminHtml.length, 'bytes');
console.log('Admin JS size:', adminJs.length, 'bytes');

// Check that the shop page has the dynamic loader
const shopHtml = fs.readFileSync(path.join(__dirname, 'dist/shop/index.html'), 'utf8');
if (shopHtml.includes('window.loadProducts')) {
  console.log('✅ Shop page has dynamic product loader');
} else {
  console.log('❌ Shop page missing dynamic product loader');
}
