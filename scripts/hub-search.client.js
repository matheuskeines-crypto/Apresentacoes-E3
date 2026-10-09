/* Busca do Hub E3 (texto completo). Injetada pelo build.mjs, que preenche o mapa de ícones abaixo. */
(function(){
  var ICONS = /*ICONS*/{};
  var ARROW = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
  var q = document.getElementById('q'), kbd = document.getElementById('kbd');
  var results = document.getElementById('results');
  var normal = [document.querySelector('.hero'), document.getElementById('conhecimento'), document.getElementById('produtos')];
  var pills = [].slice.call(document.querySelectorAll('.pill'));
  var cards = [].slice.call(document.querySelectorAll('.pcard'));
  var filter = 'all', DATA = null, waiting = null, timer = null;
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) kbd.textContent = 'Ctrl K';

  function norm(t){ return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function esc(s){ return s.replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function has(txt, alts){ for (var i = 0; i < alts.length; i++) if (txt.indexOf(alts[i]) > -1) return true; return false; }
  function cnt(txt, alts){
    var best = 0;
    alts.forEach(function(w){ var n = 0, k = 0; while ((k = txt.indexOf(w, k)) > -1) { n++; k += w.length; } if (n > best) best = n; });
    return best;
  }
  function ico(k){ return '<span class="ico ico-' + k + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[k] || ICONS.doc) + '</svg></span>'; }

  /* ---------- índice (carregado só na primeira busca) ---------- */
  function load(cb){
    if (DATA) return cb(true);
    if (waiting) { waiting.push(cb); return; }
    waiting = [cb];
    var s = document.createElement('script');
    s.src = './search-index.js';
    s.onload = function(){
      DATA = window.__SEARCH || [];
      DATA.forEach(function(m){
        m._m = norm(m.t + ' ' + m.s + ' ' + m.g);
        m._t = norm(m.t);
        m.p.forEach(function(p){ p._h = norm(p.h); p._b = norm(p.t); });
      });
      var w = waiting; waiting = null; w.forEach(function(f){ f(true); });
    };
    s.onerror = function(){ var w = waiting; waiting = null; w.forEach(function(f){ f(false); }); };
    document.head.appendChild(s);
  }

  /* ---------- busca e ranking ---------- */
  function tokens(term){
    return norm(term).split(/\s+/).filter(Boolean).map(function(t){
      var a = [t]; if (t.length > 3 && t.charAt(t.length - 1) === 's') a.push(t.slice(0, -1)); return a;
    });
  }
  function run(term, toks){
    var phrase = norm(term).trim().replace(/\s+/g, ' '), out = [];
    DATA.forEach(function(m){
      var metaHit = toks.every(function(a){ return has(m._m, a); });
      var titleHit = toks.every(function(a){ return has(m._t, a); });
      var hits = [];
      m.p.forEach(function(p){
        var inPart = toks.some(function(a){ return has(p._h, a) || has(p._b, a); });
        var ok = inPart && toks.every(function(a){ return has(p._h, a) || has(p._b, a) || has(m._m, a); });
        if (!ok) return;
        var sc = 0;
        toks.forEach(function(a){ if (has(p._h, a)) sc += 6; sc += Math.min(cnt(p._b, a), 5); });
        if (toks.length > 1) { if (p._h.indexOf(phrase) > -1) sc += 10; else if (p._b.indexOf(phrase) > -1) sc += 6; }
        hits.push({ p: p, sc: sc });
      });
      if (!hits.length && !metaHit) return;
      hits.sort(function(a, b){ return b.sc - a.sc; });
      var score = (hits[0] ? hits[0].sc : 0) + (titleHit ? 20 : (metaHit ? 8 : 0));
      for (var i = 1; i < Math.min(hits.length, 4); i++) score += hits[i].sc * 0.1;
      out.push({ m: m, parts: hits.slice(0, 3), total: hits.length, score: score });
    });
    out.sort(function(a, b){ return b.score - a.score; });
    return out;
  }

  /* ---------- trechos com destaque ---------- */
  function hl(s, toks){
    var ns = norm(s);
    if (ns.length !== s.length) return esc(s);
    var mark = [], h = '', open = false, i;
    toks.forEach(function(a){ a.forEach(function(w){
      var k = 0; while ((k = ns.indexOf(w, k)) > -1) { for (var j = k; j < k + w.length; j++) mark[j] = 1; k += w.length; }
    }); });
    for (i = 0; i < s.length; i++) {
      if (mark[i] && !open) { h += '<mark>'; open = true; }
      if (!mark[i] && open) { h += '</mark>'; open = false; }
      h += esc(s.charAt(i));
    }
    return open ? h + '</mark>' : h;
  }
  function snippet(p, toks){
    var txt = p.t, pos = -1;
    if (p._b.length === txt.length) {
      toks.forEach(function(a){ a.forEach(function(w){ var i = p._b.indexOf(w); if (i > -1 && (pos < 0 || i < pos)) pos = i; }); });
    }
    if (pos < 0) pos = 0;
    var start = Math.max(0, pos - 70), end = Math.min(txt.length, pos + 150), sp;
    if (start > 0) { sp = txt.indexOf(' ', start); if (sp > -1 && sp < pos) start = sp + 1; }
    if (end < txt.length) { sp = txt.lastIndexOf(' ', end); if (sp > pos) end = sp; }
    return (start > 0 ? '… ' : '') + hl(txt.slice(start, end), toks) + (end < txt.length ? ' …' : '');
  }

  function render(list, term, toks){
    var html = '<div class="res-head"><h2>Resultados</h2><p>';
    html += list.length ? list.length + (list.length === 1 ? ' material' : ' materiais') + ' para “' + esc(term) + '”'
                        : 'Nada encontrado para “' + esc(term) + '”';
    html += '</p></div>';
    if (!list.length) html += '<p class="empty-res">Tente outra palavra ou uma parte do que procura — a busca varre o conteúdo de todos os materiais, mesmo sem acento.</p>';
    list.slice(0, 40).forEach(function(r){
      var m = r.m, ext = /^https?:/.test(m.u);
      html += '<article class="res"><a class="res-top" href="' + esc(m.u) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + ico(m.k) +
        '<span class="res-t"><span class="res-name">' + hl(m.t, toks) + '</span><span class="res-g">' + esc(m.g) + (m.s ? ' · ' + esc(m.s) : '') + '</span></span>' + ARROW + '</a>';
      if (r.parts.length) {
        html += '<div class="res-parts">';
        r.parts.forEach(function(x){
          var p = x.p, lab = (p.n ? m.un + ' ' + p.n : '') + (p.h ? (p.n ? ' · ' : '') + esc(p.h) : '');
          html += '<a class="res-p" href="' + esc(m.u) + (p.n ? '#p=' + p.n : '') + '">' + (lab ? '<span class="res-pl">' + lab + '</span>' : '') + '<span class="res-s">' + snippet(p, toks) + '</span></a>';
        });
        if (r.total > r.parts.length) html += '<span class="res-more">+ ' + (r.total - r.parts.length) + (r.total - r.parts.length === 1 ? ' outro trecho' : ' outros trechos') + ' neste material</span>';
        html += '</div>';
      }
      html += '</article>';
    });
    results.innerHTML = html;
  }

  /* ---------- tela: resultados x conteúdo normal ---------- */
  function show(on){
    results.classList.toggle('hide', !on);
    normal.forEach(function(el){ if (el) el.classList.toggle('hide', on); });
  }
  function persist(term){
    try { history.replaceState(null, '', term ? '#q=' + encodeURIComponent(term) : location.pathname + location.search); } catch (e) {}
  }
  function apply(){
    var term = q.value.trim();
    persist(term);
    if (!term) { show(false); return; }
    load(function(ok){
      if (q.value.trim() !== term) return;
      if (!ok) { results.innerHTML = '<p class="empty-res">Não foi possível carregar o índice de busca. Recarregue a página.</p>'; show(true); return; }
      var toks = tokens(term);
      render(run(term, toks), term, toks);
      show(true);
      window.scrollTo(0, 0);
    });
  }

  /* ---------- filtro por produto (sem busca ativa) ---------- */
  function applyFilter(){
    cards.forEach(function(c){ c.classList.toggle('hide', filter !== 'all' && c.dataset.p !== filter); });
  }
  pills.forEach(function(p){ p.addEventListener('click', function(){
    filter = p.dataset.f; pills.forEach(function(x){ x.classList.toggle('on', x === p); }); applyFilter();
  }); });

  q.addEventListener('focus', function(){ load(function(){}); });
  q.addEventListener('input', function(){ clearTimeout(timer); timer = setTimeout(apply, 90); });
  document.addEventListener('keydown', function(e){
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); q.focus(); q.select(); }
    else if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); }
    else if (e.key === 'Escape' && document.activeElement === q) { q.value = ''; apply(); q.blur(); }
    else if (e.key === 'Enter' && document.activeElement === q) {
      var first = results.querySelector('.res-p, .res-top'); if (first) { e.preventDefault(); first.click(); }
    }
  });

  var init = /^#q=(.*)$/.exec(location.hash);
  if (init) { try { q.value = decodeURIComponent(init[1]); } catch (e) { q.value = init[1]; } apply(); }
})();
