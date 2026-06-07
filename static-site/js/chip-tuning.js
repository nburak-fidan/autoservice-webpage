/* ══════════════════════════════════════════════
   Dr.Şair Chip Tuning Calculator  v4.0 — Cascading Wizard
   Marka → Model → Yıl → Motor → Sonuç
   Pure vanilla JS — no dependencies
   ══════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── State ── */
  var selectedBrand = null;
  var selectedModel = null;
  var selectedYear = null;
  var selectedEngine = null;
  var currentStep = 1; // 1=brand, 2=model, 3=year, 4=engine, 5=result

  /* ── DOM refs ── */
  var $calc, $brands, $models, $years, $engines, $result;
  var $panels = [], $steppers = [];
  var $brandLabel, $modelLabel, $yearLabel;
  var $searchInput, $btnBack, $btnReset;

  /* ── Stage Descriptions ── */
  var stageInfo = {
    stage1: { title: "Stage 1", color: "#22c55e" },
    stage2: { title: "Stage 2", color: "#f59e0b" },
    stage3: { title: "Stage 3", color: "#ef4444" }
  };

  /* ── Helpers ── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function escHtml(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  /* Build unique engine display name */
  function engineDisplayName(engine, allEngines) {
    var sameName = allEngines.filter(function (e) { return e.name === engine.name; });
    if (sameName.length > 1) return engine.name + " (" + engine.originalHP + " HP)";
    return engine.name;
  }

  /* Parse "2010-2024" → [2010, 2011, ..., 2024]   |   "2010" → [2010] */
  function parseYears(yearsStr) {
    if (!yearsStr) return [];
    var parts = String(yearsStr).split(/[-–—]/);
    if (parts.length === 1) return [parseInt(parts[0], 10)];
    var a = parseInt(parts[0], 10), b = parseInt(parts[1], 10);
    if (isNaN(a) || isNaN(b)) return [];
    var out = [];
    for (var y = a; y <= b; y++) out.push(y);
    return out;
  }

  /* ══════════════════════════════════════
     WIZARD NAVIGATION
     ══════════════════════════════════════ */
  function goToStep(n) {
    currentStep = n;
    $panels.forEach(function (p) { p.classList.remove("ct-panel--active"); });
    var panel = $calc.querySelector('[data-panel="' + (n === 5 ? "result" : n) + '"]');
    if (panel) panel.classList.add("ct-panel--active");

    $steppers.forEach(function (s) {
      var sn = parseInt(s.getAttribute("data-step"), 10);
      s.classList.remove("ct-stepper__step--active", "ct-stepper__step--complete", "ct-stepper__step--clickable");
      if (sn < n) {
        s.classList.add("ct-stepper__step--complete", "ct-stepper__step--clickable");
      } else if (sn === n) {
        s.classList.add("ct-stepper__step--active");
      }
    });

    // Progress bar update (n=5 → result, treat as 4 done)
    var progressStep = Math.min(n, 4);
    var pct = ((progressStep - 1) / 3) * 100;
    var line = $calc.querySelector(".ct-stepper__line");
    if (line) line.style.setProperty("--ct-progress", pct + "%");

    if ($btnBack) $btnBack.disabled = (n <= 1);

    // Smooth scroll wizard'a (mobile UX)
    if ($calc) {
      setTimeout(function () {
        $calc.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  function goBack() {
    if (currentStep > 1) goToStep(currentStep - 1);
  }

  function reset() {
    selectedBrand = null;
    selectedModel = null;
    selectedYear = null;
    selectedEngine = null;
    qsa(".ct-pill--active", $calc).forEach(function (p) { p.classList.remove("ct-pill--active"); });
    qsa(".ct-engine-card--active", $calc).forEach(function (p) { p.classList.remove("ct-engine-card--active"); });
    if ($searchInput) $searchInput.value = "";
    qsa(".ct-pill", $brands).forEach(function (p) { p.style.display = ""; });
    updateStepperLabels();
    goToStep(1);
  }

  /* Update labels in stepper bar */
  function updateStepperLabels() {
    var map = [
      { step: 1, value: selectedBrand ? selectedBrand.name : "" },
      { step: 2, value: selectedModel ? selectedModel.name : "" },
      { step: 3, value: selectedYear ? String(selectedYear) : "" },
      { step: 4, value: selectedEngine ? engineDisplayName(selectedEngine, selectedModel ? selectedModel.engines : []) : "" }
    ];
    map.forEach(function (m) {
      var s = $calc.querySelector('.ct-stepper__step[data-step="' + m.step + '"] .ct-stepper__value');
      if (s) s.textContent = m.value;
    });
  }

  /* Allow clicking stepper to go back */
  function bindStepperClicks() {
    $steppers.forEach(function (s) {
      s.addEventListener("click", function () {
        var n = parseInt(s.getAttribute("data-step"), 10);
        // Yalnız tamamlanmış adımlara dönüş
        if (n < currentStep) goToStep(n);
      });
    });
  }

  /* ══════════════════════════════════════
     SEARCH
     ══════════════════════════════════════ */
  function setupSearch() {
    if (!$searchInput) return;
    $searchInput.addEventListener("input", function () {
      var q = this.value.toLowerCase().trim();
      qsa(".ct-pill", $brands).forEach(function (pill) {
        var name = (pill.getAttribute("data-brand") || "").toLowerCase();
        pill.style.display = (q === "" || name.indexOf(q) !== -1) ? "" : "none";
      });
    });
  }

  /* ══════════════════════════════════════
     RENDER BRANDS — alfabetik A-Z index ile
     ══════════════════════════════════════ */
  function renderBrands() {
    $brands.innerHTML = "";

    // A-Z index üretimi
    var letters = {};
    chipTuningData.forEach(function (b) {
      var L = (b.name.charAt(0) || "?").toUpperCase();
      if (!letters[L]) letters[L] = [];
      letters[L].push(b);
    });
    var sortedLetters = Object.keys(letters).sort();

    // A-Z hızlı erişim çubuğu
    var alphaWrap = document.createElement("div");
    alphaWrap.className = "ct-alpha-index";
    sortedLetters.forEach(function (L) {
      var btn = document.createElement("button");
      btn.className = "ct-alpha-index__letter";
      btn.textContent = L;
      btn.setAttribute("type", "button");
      btn.addEventListener("click", function () {
        // İlgili harfle başlayan ilk markayı vurgula + smooth scroll
        var first = qs('[data-brand-letter="' + L + '"]', $brands);
        if (first) {
          first.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          first.classList.add("ct-pill--pulse");
          setTimeout(function () { first.classList.remove("ct-pill--pulse"); }, 1200);
        }
      });
      alphaWrap.appendChild(btn);
    });
    $brands.parentNode.insertBefore(alphaWrap, $brands);

    // Markaları render et (alfabetik sıralı)
    var allBrands = chipTuningData.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name, "tr");
    });

    allBrands.forEach(function (brand, i) {
      var L = brand.name.charAt(0).toUpperCase();
      var btn = document.createElement("button");
      btn.className = "ct-pill";
      btn.innerHTML = '<span class="ct-pill__name">' + escHtml(brand.name) + '</span><span class="ct-pill__count">' + brand.models.length + ' model</span>';
      btn.setAttribute("data-brand", brand.name);
      // Yalnız o harfin ilk markasına data-brand-letter işareti — index için hedef
      var sameLetterBrands = allBrands.filter(function (x) { return x.name.charAt(0).toUpperCase() === L; });
      if (sameLetterBrands[0] === brand) btn.setAttribute("data-brand-letter", L);
      btn.style.setProperty("--ct-pill-i", i);
      btn.addEventListener("click", function () { selectBrand(brand); });
      $brands.appendChild(btn);
    });
  }

  /* ══════════════════════════════════════
     SELECT BRAND
     ══════════════════════════════════════ */
  function selectBrand(brand) {
    selectedBrand = brand;
    selectedModel = null;
    selectedYear = null;
    selectedEngine = null;

    qsa(".ct-pill", $brands).forEach(function (b) { b.classList.remove("ct-pill--active"); });
    var active = qs('[data-brand="' + brand.name + '"]', $brands);
    if (active) active.classList.add("ct-pill--active");

    $brandLabel.textContent = brand.name;
    renderModels(brand.models);
    updateStepperLabels();
    goToStep(2);
  }

  /* ══════════════════════════════════════
     RENDER MODELS
     ══════════════════════════════════════ */
  function renderModels(models) {
    $models.innerHTML = "";
    models.forEach(function (model, i) {
      var btn = document.createElement("button");
      btn.className = "ct-pill";
      var yearRange = "";
      if (typeof model.years === "string") {
        yearRange = model.years;
      } else if (model.years && model.years.length) {
        yearRange = model.years[0] + "–" + model.years[model.years.length - 1];
      }
      btn.innerHTML = '<span class="ct-pill__name">' + escHtml(model.name) + '</span>' +
        (yearRange ? '<span class="ct-pill__count">' + yearRange + '</span>' : '') +
        '<span class="ct-pill__count">' + model.engines.length + ' motor</span>';
      btn.setAttribute("data-model", model.name);
      btn.style.setProperty("--ct-pill-i", i);
      btn.addEventListener("click", function () { selectModel(model); });
      $models.appendChild(btn);
    });
  }

  /* ══════════════════════════════════════
     SELECT MODEL
     ══════════════════════════════════════ */
  function selectModel(model) {
    selectedModel = model;
    selectedYear = null;
    selectedEngine = null;

    qsa(".ct-pill", $models).forEach(function (b) { b.classList.remove("ct-pill--active"); });
    var active = qs('[data-model="' + model.name + '"]', $models);
    if (active) active.classList.add("ct-pill--active");

    $modelLabel.textContent = model.name;
    renderYears(model);
    updateStepperLabels();
    goToStep(3);
  }

  /* ══════════════════════════════════════
     RENDER YEARS
     ══════════════════════════════════════ */
  function renderYears(model) {
    $years.innerHTML = "";
    var years = parseYears(model.years);
    if (years.length === 0) {
      selectedYear = null;
      renderEngines(model.engines);
      goToStep(4);
      return;
    }
    years.slice().reverse().forEach(function (yr, i) {
      var btn = document.createElement("button");
      btn.className = "ct-pill ct-pill--year";
      btn.innerHTML = '<span class="ct-pill__name">' + yr + '</span>';
      btn.setAttribute("data-year", yr);
      btn.style.setProperty("--ct-pill-i", i);
      btn.addEventListener("click", function () { selectYear(yr); });
      $years.appendChild(btn);
    });
  }

  /* ══════════════════════════════════════
     SELECT YEAR
     ══════════════════════════════════════ */
  function selectYear(yr) {
    selectedYear = yr;
    selectedEngine = null;

    qsa(".ct-pill", $years).forEach(function (b) { b.classList.remove("ct-pill--active"); });
    var active = qs('[data-year="' + yr + '"]', $years);
    if (active) active.classList.add("ct-pill--active");

    if ($yearLabel) $yearLabel.textContent = String(yr);
    renderEngines(selectedModel.engines);
    updateStepperLabels();
    goToStep(4);
  }

  /* ══════════════════════════════════════
     RENDER ENGINE CARDS
     ══════════════════════════════════════ */
  function renderEngines(engines) {
    $engines.innerHTML = "";
    engines.forEach(function (engine) {
      var card = document.createElement("button");
      card.className = "ct-engine-card";

      var maxStage = "Stage 1";
      var maxStageColor = stageInfo.stage1.color;
      if (engine.stage3HP) { maxStage = "Stage 3"; maxStageColor = stageInfo.stage3.color; }
      else if (engine.stage2HP) { maxStage = "Stage 2"; maxStageColor = stageInfo.stage2.color; }

      var bestHP = engine.stage3HP || engine.stage2HP || engine.stage1HP;
      var hpGain = bestHP - engine.originalHP;
      var hpPct = Math.round((hpGain / engine.originalHP) * 100);

      var dName = engineDisplayName(engine, engines);

      card.innerHTML =
        '<div class="ct-engine-card__top">' +
          '<div class="ct-engine-card__name">' + escHtml(dName) + '</div>' +
          '<div class="ct-engine-card__badge" style="background:' + maxStageColor + '20;color:' + maxStageColor + ';border-color:' + maxStageColor + '40">' + maxStage + '</div>' +
        '</div>' +
        '<div class="ct-engine-card__meta">' +
          '<span class="ct-engine-card__tag ct-engine-card__tag--' + (engine.fuelType === "Dizel" ? "diesel" : "petrol") + '">' + engine.fuelType + '</span>' +
          '<span class="ct-engine-card__tag">' + engine.displacement + '</span>' +
          (engine.motorCode ? '<span class="ct-engine-card__tag ct-engine-card__tag--code" title="Motor Kodu">⚙ ' + escHtml(engine.motorCode) + '</span>' : '') +
          (engine.ecuType ? '<span class="ct-engine-card__tag ct-engine-card__tag--ecu" title="ECU">' + escHtml(engine.ecuType) + '</span>' : '') +
        '</div>' +
        '<div class="ct-engine-card__stats">' +
          '<div class="ct-engine-card__stat">' +
            '<span class="ct-engine-card__stat-label">Orijinal</span>' +
            '<span class="ct-engine-card__stat-value">' + engine.originalHP + ' HP</span>' +
          '</div>' +
          '<div class="ct-engine-card__stat-arrow">→</div>' +
          '<div class="ct-engine-card__stat">' +
            '<span class="ct-engine-card__stat-label">' + maxStage + '</span>' +
            '<span class="ct-engine-card__stat-value" style="color:' + maxStageColor + '">' + bestHP + ' HP</span>' +
          '</div>' +
          '<div class="ct-engine-card__gain">+' + hpPct + '%</div>' +
        '</div>';

      card.addEventListener("click", function () { selectEngine(engine, card); });
      // Spotlight mouse-tracking — engine kartında ışık efekti
      card.addEventListener("mousemove", function (ev) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((ev.clientX - rect.left) / rect.width * 100) + "%");
        card.style.setProperty("--my", ((ev.clientY - rect.top) / rect.height * 100) + "%");
      });
      $engines.appendChild(card);
    });
  }

  /* ══════════════════════════════════════
     SELECT ENGINE
     ══════════════════════════════════════ */
  function selectEngine(engine, cardEl) {
    selectedEngine = engine;

    qsa(".ct-engine-card", $engines).forEach(function (c) { c.classList.remove("ct-engine-card--active"); });
    if (cardEl) cardEl.classList.add("ct-engine-card--active");

    renderResult(engine);
    updateStepperLabels();
    goToStep(5);
  }

  /* ══════════════════════════════════════
     RENDER RESULT — v3.0 Cinematic
     Animated dyno gauges + interactive stage tabs + count-up
     ══════════════════════════════════════ */
  var _resultState = null; // { engine, stages, activeIdx, dName, ... }

  function renderResult(e) {
    var stages = [
      { label: "Orijinal", hp: e.originalHP, tq: e.originalTorque, cls: "original", key: "original", color: "#94a3b8" }
    ];
    if (e.stage1HP) stages.push({ label: "Stage 1", hp: e.stage1HP, tq: e.stage1Torque, cls: "stage1", key: "stage1", color: "#22c55e" });
    if (e.stage2HP) stages.push({ label: "Stage 2", hp: e.stage2HP, tq: e.stage2Torque, cls: "stage2", key: "stage2", color: "#f59e0b" });
    if (e.stage3HP) stages.push({ label: "Stage 3", hp: e.stage3HP, tq: e.stage3Torque, cls: "stage3", key: "stage3", color: "#ef4444" });

    var maxHP = 0, maxTQ = 0;
    stages.forEach(function (s) {
      if (s.hp > maxHP) maxHP = s.hp;
      if (s.tq > maxTQ) maxTQ = s.tq;
    });

    // Gauge max — orijinalin 1.6x'ı veya en yüksek stage'in 1.1x'ı, hangisi büyükse
    var gaugeMaxHP = Math.ceil(Math.max(maxHP * 1.1, e.originalHP * 1.6) / 50) * 50;
    var gaugeMaxTQ = Math.ceil(Math.max(maxTQ * 1.1, e.originalTorque * 1.6) / 50) * 50;

    var dName = engineDisplayName(e, selectedModel ? selectedModel.engines : []);
    var defaultIdx = stages.length > 1 ? 1 : 0; // Default Stage 1 (en gerçekçi/yasal)

    _resultState = {
      engine: e,
      stages: stages,
      activeIdx: defaultIdx,
      gaugeMaxHP: gaugeMaxHP,
      gaugeMaxTQ: gaugeMaxTQ,
      dName: dName
    };

    var html = '';

    /* ── HEADER (car identity) ── */
    html += '<div class="ct-result__header">';
    html += '<div class="ct-result__car">';
    html += '<span class="ct-result__brand">' + escHtml(selectedBrand.name) + '</span>';
    html += '<span class="ct-result__model">' + escHtml(selectedModel.name) + ' — ' + escHtml(dName) + '</span>';
    if (e.motorCode || e.ecuType) {
      html += '<div class="ct-result__badges">';
      if (e.motorCode) html += '<span class="ct-badge ct-badge--code" title="Motor Kodu">⚙ ' + escHtml(e.motorCode) + '</span>';
      if (e.ecuType) html += '<span class="ct-badge ct-badge--ecu" title="ECU Birimi">🖥 ' + escHtml(e.ecuType) + '</span>';
      if (e.fuelType) html += '<span class="ct-badge ct-badge--fuel">⛽ ' + escHtml(e.fuelType) + '</span>';
      if (e.displacement) html += '<span class="ct-badge ct-badge--disp">🔧 ' + escHtml(e.displacement) + '</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';

    /* ── DYNO GAUGE — twin needles ── */
    html += '<div class="ct-dyno">';
    html += '<div class="ct-dyno__title">Performans Göstergesi</div>';
    html += '<div class="ct-dyno__wrap">';
    /* HP gauge */
    html += buildGaugeSvg("hp", "BEYGİR", "HP", gaugeMaxHP, e.originalHP);
    /* Tork gauge */
    html += buildGaugeSvg("tq", "TORK", "Nm", gaugeMaxTQ, e.originalTorque);
    html += '</div>';
    /* Live readout strip */
    html += '<div class="ct-dyno__readout">';
    html += '  <div class="ct-dyno__cell"><span class="ct-dyno__cell-label">Orijinal</span><span class="ct-dyno__cell-value" data-rd="origHP">' + e.originalHP + '</span><span class="ct-dyno__cell-unit">HP</span></div>';
    html += '  <div class="ct-dyno__arrow">→</div>';
    html += '  <div class="ct-dyno__cell ct-dyno__cell--gain"><span class="ct-dyno__cell-label">Tuned</span><span class="ct-dyno__cell-value" data-rd="newHP">0</span><span class="ct-dyno__cell-unit">HP</span></div>';
    html += '  <div class="ct-dyno__cell ct-dyno__cell--delta"><span class="ct-dyno__cell-label">Kazanç</span><span class="ct-dyno__cell-value ct-dyno__cell-value--plus" data-rd="gainHP">+0</span><span class="ct-dyno__cell-unit" data-rd="pctHP">+0%</span></div>';
    html += '</div>';
    html += '<div class="ct-dyno__readout">';
    html += '  <div class="ct-dyno__cell"><span class="ct-dyno__cell-label">Orijinal</span><span class="ct-dyno__cell-value" data-rd="origTQ">' + e.originalTorque + '</span><span class="ct-dyno__cell-unit">Nm</span></div>';
    html += '  <div class="ct-dyno__arrow">→</div>';
    html += '  <div class="ct-dyno__cell ct-dyno__cell--gain"><span class="ct-dyno__cell-label">Tuned</span><span class="ct-dyno__cell-value" data-rd="newTQ">0</span><span class="ct-dyno__cell-unit">Nm</span></div>';
    html += '  <div class="ct-dyno__cell ct-dyno__cell--delta"><span class="ct-dyno__cell-label">Kazanç</span><span class="ct-dyno__cell-value ct-dyno__cell-value--plus" data-rd="gainTQ">+0</span><span class="ct-dyno__cell-unit" data-rd="pctTQ">+0%</span></div>';
    html += '</div>';
    html += '</div>';

    /* ── STAGE TABS ── */
    html += '<div class="ct-stage-tabs" role="tablist">';
    stages.forEach(function (s, idx) {
      if (s.key === "original") return;
      var isActive = (idx === defaultIdx);
      html += '<button class="ct-stage-tab ct-stage-tab--' + s.cls + (isActive ? ' ct-stage-tab--active' : '') + '" data-stage-idx="' + idx + '" role="tab" aria-selected="' + isActive + '">';
      html += '  <span class="ct-stage-tab__dot" style="background:' + s.color + '"></span>';
      html += '  <span class="ct-stage-tab__label">' + s.label + '</span>';
      html += '  <span class="ct-stage-tab__hp">' + s.hp + ' HP</span>';
      html += '</button>';
    });
    html += '</div>';

    /* ── STAGE DESCRIPTION (dynamic) ── */
    html += '<div class="ct-stage-desc" data-stage-desc></div>';

    /* ── BARS (comparison) ── */
    html += '<div class="ct-result__bars">';
    html += '<div class="ct-result__section-title">Beygir Gücü Karşılaştırma</div>';
    stages.forEach(function (s) {
      var pct = Math.round((s.hp / maxHP) * 100);
      html += '<div class="ct-result__bar-row" data-bar-row="hp-' + s.cls + '">';
      html += '<div class="ct-result__bar-label">' + s.label + '</div>';
      html += '<div class="ct-result__bar-track"><div class="ct-result__bar-fill ct-result__bar-fill--' + s.cls + '" style="width:0%" data-width="' + pct + '%"></div></div>';
      html += '<div class="ct-result__bar-value">' + s.hp + ' HP</div>';
      html += '</div>';
    });
    html += '<div class="ct-result__section-title" style="margin-top:1.5rem;">Tork Karşılaştırma</div>';
    stages.forEach(function (s) {
      var pct = Math.round((s.tq / maxTQ) * 100);
      html += '<div class="ct-result__bar-row" data-bar-row="tq-' + s.cls + '">';
      html += '<div class="ct-result__bar-label">' + s.label + '</div>';
      html += '<div class="ct-result__bar-track"><div class="ct-result__bar-fill ct-result__bar-fill--' + s.cls + '" style="width:0%" data-width="' + pct + '%"></div></div>';
      html += '<div class="ct-result__bar-value">' + s.tq + ' Nm</div>';
      html += '</div>';
    });
    html += '</div>';

    /* ── INFO GRID — price/duration/warranty/savings/ROI ── */
    if (e.priceStage1 || e.durationHours || e.fuelEconomy) {
      var avgKm = 20000;
      var avgConsumption = (e.fuelType === "Dizel") ? 6.5 : 7.5;
      var avgFuelPrice = (e.fuelType === "Dizel") ? 46 : 44;
      var yearlyFuelCost = (avgKm / 100) * avgConsumption * avgFuelPrice;
      var yearlySaving = (e.fuelEconomy || 0.10) * yearlyFuelCost;
      var paybackMonths = e.priceStage1 ? Math.ceil((e.priceStage1 / yearlySaving) * 12) : 0;

      html += '<div class="ct-info-grid">';
      if (e.priceStage1) {
        html += '<div class="ct-info-card"><div class="ct-info-card__icon">💰</div><div class="ct-info-card__label">Stage 1 Fiyat</div><div class="ct-info-card__value">' + e.priceStage1.toLocaleString("tr-TR") + ' ₺</div><div class="ct-info-card__hint">KDV dahil</div></div>';
      }
      if (e.durationHours) {
        html += '<div class="ct-info-card"><div class="ct-info-card__icon">⏱</div><div class="ct-info-card__label">İşlem Süresi</div><div class="ct-info-card__value">' + e.durationHours + ' saat</div><div class="ct-info-card__hint">Aynı gün teslim</div></div>';
      }
      html += '<div class="ct-info-card"><div class="ct-info-card__icon">🛡</div><div class="ct-info-card__label">Yazılım Garantisi</div><div class="ct-info-card__value">24 ay</div><div class="ct-info-card__hint">Dr.Şair garantili</div></div>';
      if (e.fuelEconomy && e.fuelEconomy > 0) {
        html += '<div class="ct-info-card ct-info-card--saving"><div class="ct-info-card__icon">⛽</div><div class="ct-info-card__label">Yıllık Tasarruf</div><div class="ct-info-card__value">~' + Math.round(yearlySaving).toLocaleString("tr-TR") + ' ₺</div><div class="ct-info-card__hint">%' + Math.round(e.fuelEconomy * 100) + ' yakıt tasarrufu</div></div>';
      }
      if (paybackMonths && paybackMonths < 60) {
        html += '<div class="ct-info-card ct-info-card--roi"><div class="ct-info-card__icon">📈</div><div class="ct-info-card__label">Geri Ödeme Süresi</div><div class="ct-info-card__value">~' + paybackMonths + ' ay</div><div class="ct-info-card__hint">Yakıt tasarrufuyla</div></div>';
      }
      html += '</div>';
    }

    /* ── Disclaimer ── */
    html += '<div class="ct-disclaimer">';
    html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
    html += '<span>Gösterilen değerler yaklaşık olup araç durumu, kilometre, bakım geçmişi ve çevre koşullarına göre farklılık gösterebilir. Kesin sonuçlar dyno testi ile belirlenir.</span>';
    html += '</div>';

    /* ── CTA ── */
    html += '<div class="ct-result__cta">';
    html += '<p class="ct-result__cta-text">Bu araç için chip tuning hakkında detaylı bilgi alın</p>';
    html += '<div class="ct-result__cta-btns">';
    var waMsg = encodeURIComponent(selectedBrand.name + " " + selectedModel.name + " " + dName + " chip tuning hakkinda bilgi almak istiyorum.");
    html += '<a href="https://wa.me/905393424246?text=Merhaba%2C%20' + waMsg + '" target="_blank" rel="noopener noreferrer" class="btn" style="background:#22c55e;color:#fff;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:6px;"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>WhatsApp ile İletişim</a>';
    html += '<a href="tel:02124820790" class="btn btn--brand"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:6px;"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>0212 482 07 90</a>';
    html += '</div>';
    html += '</div>';

    /* ── Legal / Meta footer ── */
    var meta = window.chipTuningMeta;
    if (meta) {
      html += '<div class="ct-legal-footer">';
      html += '<div class="ct-legal-footer__row"><strong>Veritabanı Versiyonu:</strong> v' + escHtml(meta.version || "2.0") + ' &nbsp;•&nbsp; <strong>Son Güncelleme:</strong> ' + escHtml(meta.lastUpdated || "") + ' &nbsp;•&nbsp; <strong>Kapsam:</strong> ' + (meta.totalEngines || 0) + ' motor / ' + (meta.totalBrands || 0) + ' marka</div>';
      if (meta.disclaimer) html += '<div class="ct-legal-footer__row ct-legal-footer__row--muted">' + escHtml(meta.disclaimer) + '</div>';
      if (meta.legalNotice) html += '<div class="ct-legal-footer__row ct-legal-footer__row--muted">' + escHtml(meta.legalNotice) + '</div>';
      html += '</div>';
    }

    $result.innerHTML = html;

    /* Bind stage tab clicks */
    qsa(".ct-stage-tab", $result).forEach(function (tab) {
      tab.addEventListener("click", function () {
        var idx = parseInt(tab.getAttribute("data-stage-idx"), 10);
        setActiveStage(idx);
      });
    });

    /* Initial activation */
    requestAnimationFrame(function () {
      setTimeout(function () { setActiveStage(defaultIdx); }, 80);
    });
  }

  /* ══════════════════════════════════════
     SVG GAUGE BUILDER
     270° arc, animated needle (CSS rotate transition)
     ══════════════════════════════════════ */
  function buildGaugeSvg(id, label, unit, max, origValue) {
    // 270° arc starts at 135° (lower-left) ends at 405° (lower-right)
    var ticks = 10;
    var tickHtml = '';
    for (var i = 0; i <= ticks; i++) {
      var ang = -135 + (270 * i / ticks); // -135° → +135°
      var rad = ang * Math.PI / 180;
      var r1 = 88, r2 = (i % 2 === 0) ? 78 : 82;
      var x1 = 100 + Math.sin(rad) * r1, y1 = 100 - Math.cos(rad) * r1;
      var x2 = 100 + Math.sin(rad) * r2, y2 = 100 - Math.cos(rad) * r2;
      var labelR = 66;
      var lx = 100 + Math.sin(rad) * labelR, ly = 100 - Math.cos(rad) * labelR;
      var labelVal = Math.round(max * i / ticks);
      tickHtml += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="rgba(255,255,255,0.35)" stroke-width="' + (i % 2 === 0 ? 2 : 1) + '" stroke-linecap="round"/>';
      if (i % 2 === 0) {
        tickHtml += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.55)" font-size="8" font-weight="600" font-family="ui-monospace,Menlo,monospace">' + labelVal + '</text>';
      }
    }

    // Original "ghost" needle position
    var origAng = -135 + (270 * origValue / max);

    return (
      '<div class="ct-gauge" data-gauge="' + id + '" data-max="' + max + '" data-orig="' + origValue + '">' +
        '<svg viewBox="0 0 200 200" class="ct-gauge__svg" aria-hidden="true">' +
          '<defs>' +
            '<linearGradient id="ctGradGreen" x1="0" x2="1"><stop offset="0" stop-color="#16a34a"/><stop offset="1" stop-color="#4ade80"/></linearGradient>' +
            '<linearGradient id="ctGradAmber" x1="0" x2="1"><stop offset="0" stop-color="#d97706"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>' +
            '<linearGradient id="ctGradRed" x1="0" x2="1"><stop offset="0" stop-color="#dc2626"/><stop offset="1" stop-color="#f87171"/></linearGradient>' +
            '<filter id="ctGlow' + id + '" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>' +
          '</defs>' +
          // Outer arc track (dimmed)
          '<path d="M 32 162 A 80 80 0 1 1 168 162" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="14" stroke-linecap="round"/>' +
          // Active arc (will be set via stroke-dasharray via JS)
          '<path class="ct-gauge__arc" d="M 32 162 A 80 80 0 1 1 168 162" fill="none" stroke="url(#ctGradGreen)" stroke-width="10" stroke-linecap="round" stroke-dasharray="0 999" filter="url(#ctGlow' + id + ')"/>' +
          tickHtml +
          // Original (ghost) needle
          '<line class="ct-gauge__needle ct-gauge__needle--ghost" x1="100" y1="100" x2="100" y2="34" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3" style="transform:rotate(' + origAng + 'deg);transform-origin:100px 100px;"/>' +
          // Active needle
          '<line class="ct-gauge__needle ct-gauge__needle--active" x1="100" y1="100" x2="100" y2="28" stroke="#fff" stroke-width="3" stroke-linecap="round" style="transform:rotate(-135deg);transform-origin:100px 100px;"/>' +
          // Hub
          '<circle cx="100" cy="100" r="9" fill="#0f172a" stroke="#fff" stroke-width="2"/>' +
          '<circle cx="100" cy="100" r="3" fill="#fff"/>' +
        '</svg>' +
        '<div class="ct-gauge__caption">' +
          '<span class="ct-gauge__label">' + label + '</span>' +
          '<span class="ct-gauge__unit">' + unit + '</span>' +
        '</div>' +
      '</div>'
    );
  }

  /* ══════════════════════════════════════
     SET ACTIVE STAGE — animate gauges, count-up, bar fills
     ══════════════════════════════════════ */
  function setActiveStage(idx) {
    if (!_resultState) return;
    var st = _resultState;
    var stage = st.stages[idx];
    if (!stage) return;
    st.activeIdx = idx;

    /* Update tab visual state */
    qsa(".ct-stage-tab", $result).forEach(function (t) {
      var ti = parseInt(t.getAttribute("data-stage-idx"), 10);
      t.classList.toggle("ct-stage-tab--active", ti === idx);
      t.setAttribute("aria-selected", ti === idx ? "true" : "false");
    });

    /* Update result wrapper data-stage for color theming */
    $result.setAttribute("data-active-stage", stage.cls);

    /* Confetti burst for Stage 3 */
    if (stage.cls === "stage3") {
      fireConfetti(["#ef4444", "#ff6b35", "#f5b731", "#fbbf24"]);
    }

    /* Update stage description */
    var descEl = qs("[data-stage-desc]", $result);
    if (descEl) {
      var info = (window.stageDescriptions && window.stageDescriptions[stage.key]) || null;
      if (info) {
        descEl.innerHTML = '<div class="ct-stage-desc__inner ct-stage-desc--' + stage.cls + '"><div class="ct-stage-desc__title">' + escHtml(info.title || stage.label) + '</div><p class="ct-stage-desc__summary">' + escHtml(info.summary || "") + '</p>' + (info.detail ? '<p class="ct-stage-desc__detail">' + escHtml(info.detail) + '</p>' : '') + '</div>';
      } else {
        descEl.innerHTML = '<div class="ct-stage-desc__inner ct-stage-desc--' + stage.cls + '"><div class="ct-stage-desc__title">' + stage.label + '</div></div>';
      }
    }

    /* Animate gauges */
    animateGauge("hp", stage.hp, st.gaugeMaxHP, stage.color);
    animateGauge("tq", stage.tq, st.gaugeMaxTQ, stage.color);

    /* Animate readout count-up */
    var hpGain = stage.hp - st.engine.originalHP;
    var tqGain = stage.tq - st.engine.originalTorque;
    var hpPct = st.engine.originalHP ? Math.round((hpGain / st.engine.originalHP) * 100) : 0;
    var tqPct = st.engine.originalTorque ? Math.round((tqGain / st.engine.originalTorque) * 100) : 0;

    countUp(qs('[data-rd="newHP"]', $result), stage.hp, 1100);
    countUp(qs('[data-rd="newTQ"]', $result), stage.tq, 1100);
    countUp(qs('[data-rd="gainHP"]', $result), hpGain, 1100, "+");
    countUp(qs('[data-rd="gainTQ"]', $result), tqGain, 1100, "+");
    var pctHpEl = qs('[data-rd="pctHP"]', $result);
    var pctTqEl = qs('[data-rd="pctTQ"]', $result);
    if (pctHpEl) pctHpEl.textContent = "+" + hpPct + "%";
    if (pctTqEl) pctTqEl.textContent = "+" + tqPct + "%";

    /* Animate bars (re-trigger) */
    qsa(".ct-result__bar-fill", $result).forEach(function (bar) {
      bar.style.width = "0%";
    });
    requestAnimationFrame(function () {
      setTimeout(function () {
        qsa(".ct-result__bar-fill", $result).forEach(function (bar) {
          bar.style.width = bar.getAttribute("data-width");
        });
      }, 60);
    });
  }

  /* Animate gauge needle + arc fill */
  function animateGauge(id, value, max, color) {
    var gauge = qs('[data-gauge="' + id + '"]', $result);
    if (!gauge) return;
    var needle = qs(".ct-gauge__needle--active", gauge);
    var arc = qs(".ct-gauge__arc", gauge);
    if (!needle || !arc) return;

    var ratio = Math.max(0, Math.min(1, value / max));
    var ang = -135 + (270 * ratio);
    needle.style.transform = "rotate(" + ang + "deg)";
    needle.style.stroke = color;

    // Arc length: 80px radius × 270° = ~377px arc length total
    var arcLen = 2 * Math.PI * 80 * (270 / 360); // ≈ 377
    var dash = arcLen * ratio;
    arc.style.strokeDasharray = dash + " 999";
    arc.style.stroke = color;
  }

  /* Count-up easing animation */
  function countUp(el, target, duration, prefix) {
    if (!el) return;
    prefix = prefix || "";
    var start = parseFloat((el.textContent || "0").replace(/[^\d.-]/g, "")) || 0;
    var diff = target - start;
    if (diff === 0) { el.textContent = prefix + target; return; }
    var startTime = null;
    function tick(t) {
      if (!startTime) startTime = t;
      var p = Math.min(1, (t - startTime) / duration);
      // easeOutExpo
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      var current = Math.round(start + diff * eased);
      el.textContent = (current >= 0 && prefix === "+" ? "+" : "") + current;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (target >= 0 && prefix === "+" ? "+" : "") + target;
    }
    requestAnimationFrame(tick);
  }


  /* ══════════════════════════════════════
     CONFETTI — Stage 3 particle burst
     ══════════════════════════════════════ */
  var _confettiCanvas = null;
  var _confettiCtx = null;
  var _confettiParticles = [];
  var _confettiRaf = 0;

  function fireConfetti(colors) {
    if (!_confettiCanvas) {
      _confettiCanvas = document.getElementById("ctConfetti");
      if (!_confettiCanvas) return;
      _confettiCtx = _confettiCanvas.getContext("2d");
    }
    var c = _confettiCanvas;
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    var palette = colors || ["#ef4444", "#f5b731", "#ff9a3c", "#22c55e", "#3b82f6", "#a855f7"];
    var originX = c.width / 2;
    var originY = c.height * 0.35;

    for (var i = 0; i < 90; i++) {
      var ang = Math.random() * Math.PI * 2;
      var speed = 6 + Math.random() * 10;
      _confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - 4,
        gravity: 0.25,
        size: 4 + Math.random() * 6,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 80 + Math.random() * 40
      });
    }

    if (!_confettiRaf) tickConfetti();
  }

  function tickConfetti() {
    if (!_confettiCtx) return;
    var ctx = _confettiCtx;
    ctx.clearRect(0, 0, _confettiCanvas.width, _confettiCanvas.height);

    _confettiParticles = _confettiParticles.filter(function (p) {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.life++;
      var alpha = Math.max(0, 1 - p.life / p.maxLife);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
      return p.life < p.maxLife && p.y < _confettiCanvas.height + 40;
    });

    if (_confettiParticles.length > 0) {
      _confettiRaf = requestAnimationFrame(tickConfetti);
    } else {
      _confettiRaf = 0;
      _confettiCtx.clearRect(0, 0, _confettiCanvas.width, _confettiCanvas.height);
    }
  }

  /* ══════════════════════════════════════
     INIT
     ══════════════════════════════════════ */
  function init() {
    $calc = document.getElementById("chipCalculator");
    if (!$calc) return;

    $brands = qs(".ct-brands", $calc);
    $models = qs(".ct-models", $calc);
    $years = qs(".ct-years", $calc);
    $engines = qs(".ct-engines", $calc);
    $result = qs(".ct-result", $calc);
    $panels = qsa(".ct-panel", $calc);
    $steppers = qsa(".ct-stepper__step", $calc);
    $brandLabel = qs(".ct-brand-label", $calc);
    $modelLabel = qs(".ct-model-label", $calc);
    $yearLabel = qs(".ct-year-label", $calc);
    $searchInput = qs(".ct-search__input", $calc);
    $btnBack = qs(".ct-nav__back", $calc);
    $btnReset = qs(".ct-nav__reset", $calc);

    if ($btnBack) $btnBack.addEventListener("click", goBack);
    if ($btnReset) $btnReset.addEventListener("click", reset);

    bindStepperClicks();
    renderBrands();
    setupSearch();
    goToStep(1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
