/* ═══ CIA STORE — Admin Panel (بالعربية) ═══ */
window.ADMIN_DEFAULTS = window.ADMIN_DEFAULTS || { products: [], categories: [] };

function getSession(){
  try{ return JSON.parse(localStorage.getItem('cia_session')); }catch(e){ return null; }
}

// ─── Main ───
document.addEventListener('DOMContentLoaded', function(){
  const app = document.getElementById('adminApp'); if(!app) return;
  const session = getSession();
  const role = session ? session.role : null;
  const isOwner = role === 'owner';
  const isAdmin = role === 'admin' || role === 'owner';
  const canEdit = isAdmin;

  // Badge
  const badge = document.getElementById('roleBadge');
  if(badge){
    if(isOwner){
      badge.textContent = '👑 Owner';
      Object.assign(badge.style, { background:'rgba(255,215,0,.15)', color:'var(--gold)', borderColor:'rgba(255,215,0,.3)' });
    } else if(isAdmin){
      badge.textContent = '👑 Admin';
      Object.assign(badge.style, { background:'rgba(0,212,255,.1)', color:'var(--electric)', borderColor:'rgba(0,212,255,.2)' });
    } else {
      badge.textContent = '🔒 زائر';
      Object.assign(badge.style, { background:'rgba(255,51,85,.1)', color:'var(--red)', borderColor:'rgba(255,51,85,.2)' });
    }
  }

  // ─── Helpers ───
  function load(key, def) {
    try { const x = localStorage.getItem(key); return x ? JSON.parse(x) : def; } catch(e){ return def; }
  }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function loadProducts() {
    const stored = load('cia_admin_products', []);
    const defs = (window.ADMIN_DEFAULTS.products || []).map(p => ({...p}));
    return [...defs, ...stored.filter(sp => {
      const i = defs.findIndex(m => m.id === sp.id);
      if(i >= 0){ defs[i] = {...defs[i], ...sp}; return false }
      return true;
    })];
  }
  function loadCategories() {
    const stored = load('cia_admin_categories', []);
    const defs = (window.ADMIN_DEFAULTS.categories || []).map(c => ({...c}));
    return [...defs, ...stored.filter(sc => {
      const i = defs.findIndex(m => m.id === sc.id);
      if(i >= 0){ defs[i] = {...defs[i], ...sc}; return false }
      return true;
    })];
  }

  function $(id) { return document.getElementById(id); }

  // Helper: render image (emoji or <img> for data URLs)
  function imgHtml(src) {
    if (!src) return '📦';
    if (src.startsWith('data:image/')) {
      return '<img src="'+src+'" style="width:36px;height:36px;border-radius:6px;object-fit:cover" alt="">';
    }
    return src; // emoji or URL
  }

  // ─── Render ───
  function render(){
    const prods = loadProducts();
    const cats = loadCategories();
    const orders = load('cia_cart', []);
    const users = load('cia_users', []);

    // Stats
    $('statProducts').textContent = prods.length;
    $('statCategories').textContent = cats.length;
    $('statOrders').textContent = orders.length;
    $('statUsers').textContent = users.length + 2;

    // Orders table
    const ot = $('ordersBody');
    if(ot){
      if(!orders.length){
        ot.innerHTML = '<tr><td colspan="5" style="padding:2rem;text-align:center;color:var(--text-muted)">لا توجد طلبات بعد</td></tr>';
      } else {
        ot.innerHTML = orders.map((o,i) => {
          const disc = o.discord || '—';
          const rob = o.roblox || '—';
          return '<tr>'+
            '<td style="padding:.75rem 1rem;color:var(--electric);font-weight:600">ORD-'+(1000+i)+'</td>'+
            '<td style="padding:.75rem 1rem"><div style="font-weight:600">'+(o.name||'منتج')+'</div><div style="font-size:.75rem;color:var(--text-muted)">x'+o.qty+'</div></td>'+
            '<td style="padding:.75rem 1rem;font-size:.8125rem"><div>🎮 '+disc+'</div><div>🎮 '+rob+'</div></td>'+
            '<td style="padding:.75rem 1rem;font-weight:700">$'+(o.price*o.qty).toFixed(2)+'</td>'+
            '<td style="padding:.75rem 1rem"><span style="padding:.25rem .625rem;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(250,204,21,.1);color:var(--yellow);border:1px solid rgba(250,204,21,.2)">قيد الانتظار</span></td>'+
            '</tr>';
        }).join('');
      }
    }

    // Products table
    const pt = $('prodBody');
    if(pt){
      let h = '';
      prods.forEach(p => {
        const acts = canEdit
          ? '<button class="btn btn-sm btn-outline" onclick="editProduct(\''+p.id+'\')" style="padding:0 .625rem" title="تعديل">✏️</button><button class="btn btn-sm btn-outline" onclick="delProduct(\''+p.id+'\')" style="padding:0 .625rem;color:var(--red)" title="حذف">🗑</button>'
          : '<span style="font-size:.75rem;color:var(--text-muted)">عرض</span>';
        h += '<tr>'+
          '<td style="padding:.75rem 1rem"><div style="display:flex;align-items:center;gap:.5rem">'+imgHtml(p.img)+'<div><div style="font-weight:600;color:var(--text-bright)">'+p.name+'</div><div style="font-size:.75rem;color:var(--text-muted)">'+p.cat+(p.sub?' • '+p.sub:'')+'</div></div></div></td>'+
          '<td style="padding:.75rem 1rem;color:var(--electric);font-weight:700">$'+Number(p.price).toFixed(2)+'</td>'+
          '<td style="padding:.75rem 1rem">'+(p.stock||0)+'</td>'+
          '<td style="padding:.75rem 1rem"><span style="padding:.25rem .625rem;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(0,212,255,.1);color:var(--electric);border:1px solid rgba(0,212,255,.2)">'+(p.rarity||'Common')+'</span></td>'+
          '<td style="padding:.75rem 1rem">'+(p.orders||0)+'</td>'+
          '<td style="padding:.75rem 1rem">'+acts+'</td>'+
          '</tr>';
      });
      pt.innerHTML = h;
    }

    // Categories table
    const ct = $('catBody');
    if(ct){
      let h = '';
      cats.forEach(c => {
        const acts = canEdit
          ? '<button class="btn btn-sm btn-outline" onclick="delCategory(\''+c.id+'\')" style="padding:0 .625rem;color:var(--red)" title="حذف">🗑</button>'
          : '<span style="font-size:.75rem;color:var(--text-muted)">عرض</span>';
        h += '<tr>'+
          '<td style="padding:.75rem 1rem"><div style="display:flex;align-items:center;gap:.5rem"><span style="font-size:1.5rem">'+(c.icon||'📁')+'</span><span style="font-weight:600;color:var(--text-bright)">'+c.name+'</span></div></td>'+
          '<td style="padding:.75rem 1rem"><code style="font-size:.8125rem;color:var(--text-dim)">'+c.id+'</code></td>'+
          '<td style="padding:.75rem 1rem;color:var(--text-dim);font-size:.875rem">'+(c.desc||'')+'</td>'+
          '<td style="padding:.75rem 1rem">'+(c.count||0)+'</td>'+
          '<td style="padding:.75rem 1rem">'+acts+'</td>'+
          '</tr>';
      });
      ct.innerHTML = h;
    }

    // Users table
    const ut = $('usersBody');
    if(ut){
      if(!users.length){
        ut.innerHTML = '<tr><td colspan="4" style="padding:2rem;text-align:center;color:var(--text-muted)">لا يوجد مستخدمين مسجلين بعد</td></tr>';
      } else {
        ut.innerHTML = users.map(u =>
          '<tr>'+
            '<td style="padding:.75rem 1rem"><div style="font-weight:600;color:var(--text-bright)">'+(u.name||u.email)+'</div></td>'+
            '<td style="padding:.75rem 1rem;color:var(--text-dim)">'+u.email+'</td>'+
            '<td style="padding:.75rem 1rem"><span style="padding:.25rem .625rem;border-radius:9999px;font-size:.75rem;font-weight:600;background:rgba(0,212,255,.1);color:var(--electric);border:1px solid rgba(0,212,255,.2)">'+(u.role||'user')+'</span></td>'+
            '<td style="padding:.75rem 1rem;color:var(--text-muted);font-size:.8125rem">'+(u.created?new Date(u.created).toLocaleDateString('ar'):'—')+'</td>'+
            '</tr>'
        ).join('');
      }
    }

    // Show/hide admin controls
    document.querySelectorAll('.owner-only').forEach(el => el.style.display = canEdit ? '' : 'none');
  }

  // ─── Form helpers ───
  function showForm(html, title){
    $('formOverlay').style.display = 'flex';
    $('modalTitle').textContent = title || 'نموذج';
    $('formBody').innerHTML = html;
  }
  function closeForm(){
    $('formOverlay').style.display = 'none';
  }

  // ─── Export ───
  function exportData(){
    const data = { products: loadProducts(), categories: loadCategories() };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cia-store-data.json'; a.click();
    URL.revokeObjectURL(url);
    showForm(
      '<div style="margin-bottom:1rem">'+
        '<p style="color:var(--text-dim);font-size:.875rem;margin-bottom:1rem">✅ تم تحميل ملف JSON. أرسل هذا الملف لبناء الموقع وجعله مرئياً للجميع.</p>'+
        '<textarea style="width:100%;height:200px;padding:.75rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:var(--text);font-size:.75rem;font-family:monospace;resize:vertical" readonly onclick="this.select()">'+json.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>'+
        '<p style="font-size:.75rem;color:var(--text-muted);margin-top:.5rem">💡 اضغط داخل المربع لتحديد الكل، ثم انسخ (Ctrl+C)</p>'+
      '</div>',
      '📤 تصدير البيانات — انشر للجميع'
    );
  }

  // ─── Category CRUD ───
  function addCategory(){
    showForm(
      '<input id="fc_id" placeholder="المعرف (مثلاً: weapons)" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<input id="fc_name" placeholder="اسم التصنيف" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<input id="fc_icon" placeholder="الأيقونة (مثلاً: 🗡️)" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<textarea id="fc_desc" placeholder="الوصف" rows="2" style="width:100%;padding:.75rem 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit"></textarea>'+
      '<div style="display:flex;gap:.75rem"><button class="btn btn-lg btn-primary" style="flex:1" onclick="saveCategory()">💾 حفظ</button><button class="btn btn-lg btn-outline" onclick="closeForm()">إلغاء</button></div>',
      '📁 إضافة تصنيف'
    );
  }

  window.saveCategory = function(){
    const id = $('fc_id').value.trim();
    if(!id){ alert('معرف التصنيف مطلوب'); return; }
    const cats = loadCategories();
    if(cats.find(x => x.id === id)){ alert('التصنيف "'+id+'" موجود بالفعل!'); return; }
    cats.push({
      id: id,
      name: $('fc_name').value.trim() || 'بدون اسم',
      icon: $('fc_icon').value || '📁',
      desc: $('fc_desc').value.trim(),
      count: 0
    });
    save('cia_admin_categories', cats);
    closeForm();
    render();
  };

  window.delCategory = function(id){
    if(!confirm('حذف التصنيف "'+id+'" وكل منتجاته؟')) return;
    let cats = loadCategories().filter(x => x.id !== id);
    save('cia_admin_categories', cats);
    let prods = loadProducts().filter(x => x.cat !== id);
    save('cia_admin_products', prods);
    render();
  };

  // ─── Product CRUD ───
  function addProduct(){
    const cats = loadCategories();
    const rarities = ['Legendary','Mythical','Epic','Rare','Uncommon','Common'];
    showForm(
      '<input id="f_id" placeholder="المعرف (مثلاً: p1)" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<input id="f_name" placeholder="اسم المنتج" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<select id="f_cat" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
        (cats.length ? cats.map(c => '<option value="'+c.id+'">'+c.icon+' '+c.name+'</option>').join('') : '<option value="">— لا توجد تصنيفات —</option>')+
      '</select>'+
      '<input id="f_price" type="number" step="0.01" placeholder="السعر $" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<input id="f_stock" type="number" placeholder="المخزون" value="10" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<select id="f_rarity" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
        rarities.map(r => '<option value="'+r+'">'+r+'</option>').join('')+
      '</select>'+
      '<textarea id="f_desc" placeholder="الوصف" rows="3" style="width:100%;padding:.75rem 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit"></textarea>'+
      '<div style="margin-bottom:.75rem"><label style="font-size:.8125rem;color:var(--text-dim);display:block;margin-bottom:.375rem">الصورة / الأيقونة</label>'+
      '<div style="display:flex;gap:.5rem;align-items:center"><span id="f_imgPreview" style="font-size:2rem;min-width:40px;text-align:center">📦</span>'+
      '<input id="f_img" placeholder="🐉 أو رابط صورة" value="" style="flex:1;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;font-family:inherit">'+
      '<input type="file" id="f_imgFile" accept="image/*" style="display:none">'+
      '<button type="button" class="btn btn-sm btn-outline" id="f_uploadBtn">📁 رفع</button></div></div>'+
      '<input id="f_sub" placeholder="تصنيف فرعي (اختياري)" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<div style="display:flex;gap:.75rem"><button class="btn btn-lg btn-primary" style="flex:1" onclick="saveProduct()">💾 حفظ</button><button class="btn btn-lg btn-outline" onclick="closeForm()">إلغاء</button></div>',
      '➕ إضافة منتج'
    );
    setTimeout(() => {
      const up = $('f_uploadBtn');
      if(up) up.onclick = function(){ $('f_imgFile').click(); };
      const fi = $('f_imgFile');
      if(fi) fi.onchange = function(e){
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader();
        r.onload = function(ev){
          $('f_img').value = ev.target.result;
          $('f_imgPreview').innerHTML = '<img src="'+ev.target.result+'" style="width:36px;height:36px;border-radius:6px;object-fit:cover">';
        };
        r.readAsDataURL(f);
      };
    }, 100);
  }

  window.editProduct = function(id){
    const prods = loadProducts();
    const p = prods.find(x => x.id === id);
    if(!p) return;
    const cats = loadCategories();
    const rarities = ['Legendary','Mythical','Epic','Rare','Uncommon','Common'];
    showForm(
      '<input id="f_id" value="'+p.id+'" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:var(--text-muted);font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit" readonly>'+
      '<input id="f_name" value="'+(p.name||'')+'" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<select id="f_cat" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
        (cats.length ? cats.map(c => '<option value="'+c.id+'"'+(p.cat===c.id?' selected':'')+'>'+c.icon+' '+c.name+'</option>').join('') : '<option value="">— لا توجد تصنيفات —</option>')+
      '</select>'+
      '<input id="f_price" type="number" step="0.01" value="'+(p.price||'')+'" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<input id="f_stock" type="number" value="'+(p.stock||'')+'" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<select id="f_rarity" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
        rarities.map(r => '<option value="'+r+'"'+(p.rarity===r?' selected':'')+'>'+r+'</option>').join('')+
      '</select>'+
      '<textarea id="f_desc" rows="3" style="width:100%;padding:.75rem 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+(p.desc||'')+'</textarea>'+
      '<div style="margin-bottom:.75rem"><label style="font-size:.8125rem;color:var(--text-dim);display:block;margin-bottom:.375rem">الصورة</label>'+
      '<div style="display:flex;gap:.5rem;align-items:center"><span id="f_imgPreview" style="font-size:2rem;min-width:40px;text-align:center">'+imgHtml(p.img)+'</span>'+
      '<input id="f_img" value="'+(p.img||'')+'" style="flex:1;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;font-family:inherit">'+
      '<input type="file" id="f_imgFile" accept="image/*" style="display:none">'+
      '<button type="button" class="btn btn-sm btn-outline" id="f_uploadBtn">📁 رفع</button></div></div>'+
      '<input id="f_sub" value="'+(p.sub||'')+'" style="width:100%;height:44px;padding:0 1rem;border-radius:var(--radius-sm);background:var(--bg);border:1px solid var(--border);color:white;font-size:.875rem;outline:none;margin-bottom:.75rem;font-family:inherit">'+
      '<div style="display:flex;gap:.75rem"><button class="btn btn-lg btn-primary" style="flex:1" onclick="saveProduct()">💾 حفظ</button><button class="btn btn-lg btn-outline" onclick="closeForm()">إلغاء</button></div>',
      '✏️ تعديل المنتج'
    );
    setTimeout(() => {
      const up = $('f_uploadBtn');
      if(up) up.onclick = function(){ $('f_imgFile').click(); };
      const fi = $('f_imgFile');
      if(fi) fi.onchange = function(e){
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader();
        r.onload = function(ev){
          $('f_img').value = ev.target.result;
          $('f_imgPreview').innerHTML = '<img src="'+ev.target.result+'" style="width:36px;height:36px;border-radius:6px;object-fit:cover">';
        };
        r.readAsDataURL(f);
      };
    }, 100);
  };

  window.saveProduct = function(){
    const id = $('f_id').value.trim();
    if(!id){ alert('معرف المنتج مطلوب'); return; }
    const prods = loadProducts();
    const idx = prods.findIndex(x => x.id === id);
    const data = {
      id: id,
      name: $('f_name').value.trim() || 'بدون اسم',
      cat: $('f_cat').value,
      price: parseFloat($('f_price').value) || 0,
      stock: parseInt($('f_stock').value) || 0,
      rarity: $('f_rarity').value || 'Common',
      desc: $('f_desc').value.trim(),
      img: $('f_img').value || '📦',
      sub: $('f_sub').value.trim(),
      orders: idx >= 0 ? (prods[idx].orders || 0) : 0
    };
    if(idx >= 0) prods[idx] = {...prods[idx], ...data};
    else prods.push(data);
    save('cia_admin_products', prods);
    closeForm();
    render();
  };

  window.delProduct = function(id){
    if(!confirm('حذف "'+id+'"؟ لا يمكن التراجع.')) return;
    let prods = loadProducts().filter(x => x.id !== id);
    save('cia_admin_products', prods);
    render();
  };

  // ─── Button handlers ───
  window.addProduct = addProduct;
  window.addCategory = addCategory;
  window.exportData = exportData;
  window.closeForm = closeForm;

  // ─── Initial render ───
  render();
});

