#!/usr/bin/env node
/**
 * Chip Tuning Database — Completeness Audit
 * ─────────────────────────────────────────
 * NHTSA vPIC API'sini kullanarak (ABD devlet, ücretsiz, anahtarsız)
 * her markanın gerçek model listesini çeker, bizim DB ile karşılaştırır.
 *
 * Kullanım:  node scripts/audit-models.js
 *            node scripts/audit-models.js Honda     (tek marka)
 */
const https = require('https');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

// Sadece otomobil — motorsiklet/ATV/scooter regex
const BIKE_REGEX = /^(C[BX]\d|CRF|CR\d|XR\d|XL\d|VT\d|VF\d|NSR|VTX|GL\d|ST\d|RC\d|FourTrax|TRX|Sportrax|Foreman|Rincon|Rubicon|Rancher|Recon|Pilot \d|SXS|Pioneer|Talon|Africa Twin|Gold ?Wing|Goldwing|Valkyrie|Fury|Rebel|Shadow|Magna|Sabre|Aero|Interceptor|Super ?Hawk|Hawk|Hornet|Fireblade|Monkey|Grom|Navi|Ruckus|Reflex|Forza|Silver ?Wing|Silverwing|Helix|Spree|PCX|ADV|Cota|Big |Trail|Express|Elite|Metropolitan|Jazz \d|Giorno|EZ\d|NB\d|NC\d|NCH|NCW|NPS|NQ\d|NRX|NSS|NT\d|NU\d|NX\d|PC\d|SA\d|SB\d|SCL|SE\d|SH\d|TG\d|TLR|WW\d|Z\d{2,}|FCX|del Sol|ATV|CRF\d|Z125)/i;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'audit-script' } }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

function loadOurDb() {
  const ctx = vm.createContext({ window: {}, document: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js/chip-tuning-data.js'), 'utf8'), ctx);
  return ctx.window.chipTuningData;
}

async function nhtsaModels(make) {
  const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/' + encodeURIComponent(make) + '?format=json';
  const res = await fetchJson(url);
  const all = (res.Results || []).map(r => r.Model_Name);
  // Filter: only cars, dedupe, sort
  const cars = [...new Set(all)].filter(m => !BIKE_REGEX.test(m)).sort();
  return cars;
}

function normalizeModelName(s) {
  return s.toLowerCase().replace(/[\s\-_/().]/g, '');
}

function ourHas(ourModelGroups, nhtsaModel) {
  const target = normalizeModelName(nhtsaModel);
  return ourModelGroups.some(group => {
    // Group name like "Civic Type R" or "Jazz / HR-V" — split on /
    const parts = group.name.split('/').map(p => normalizeModelName(p.trim()));
    return parts.some(p => p === target || p.includes(target) || target.includes(p));
  });
}

async function auditBrand(brand, nhtsaMake) {
  try {
    const nhtsaList = await nhtsaModels(nhtsaMake);
    const ourList = brand.models;
    const missing = nhtsaList.filter(m => !ourHas(ourList, m));
    return { brand: brand.name, ourCount: ourList.length, nhtsaCount: nhtsaList.length, missing, nhtsaList };
  } catch (e) {
    return { brand: brand.name, error: e.message };
  }
}

// Marka adı → NHTSA make adı eşleştirme
const NHTSA_MAP = {
  'Opel': 'Opel',
  'Chevrolet': 'Chevrolet',
  'Volkswagen': 'Volkswagen',
  'BMW': 'BMW',
  'Mercedes-Benz': 'Mercedes-Benz',
  'Audi': 'Audi',
  'Ford': 'Ford',
  'Renault': 'Renault',
  'Peugeot': 'Peugeot',
  'Citroën': 'Citroen',
  'Fiat': 'Fiat',
  'Toyota': 'Toyota',
  'Hyundai': 'Hyundai',
  'Kia': 'Kia',
  'Škoda': 'Skoda',
  'SEAT': 'SEAT',
  'Dacia': 'Dacia',
  'Volvo': 'Volvo',
  'Honda': 'Honda',
  'Nissan': 'Nissan',
  'MINI': 'MINI',
  'Porsche': 'Porsche',
  'Land Rover': 'Land Rover',
  'Mazda': 'Mazda',
  'Mitsubishi': 'Mitsubishi',
  'Suzuki': 'Suzuki',
  'Alfa Romeo': 'Alfa Romeo',
  'Jaguar': 'Jaguar',
  'Lexus': 'Lexus',
  'Subaru': 'Subaru',
  'Jeep': 'Jeep',
  'Smart': 'Smart',
  'MG': 'MG',
  'Isuzu': 'Isuzu',
  'SsangYong': 'Ssangyong',
  'Iveco': 'Iveco',
  'Ferrari': 'Ferrari',
  'Lamborghini': 'Lamborghini',
  'Maserati': 'Maserati',
  'Aston Martin': 'Aston Martin',
  'Bentley': 'Bentley'
};

(async () => {
  const db = loadOurDb();
  const targetBrand = process.argv[2];
  const brands = targetBrand ? db.filter(b => b.name.toLowerCase() === targetBrand.toLowerCase()) : db;

  console.log('═══════════════════════════════════════════════════');
  console.log('  CHIP TUNING DATABASE — COMPLETENESS AUDIT');
  console.log('  Source: NHTSA vPIC API (free, no key)');
  console.log('═══════════════════════════════════════════════════\n');

  let totalMissing = 0;
  for (const brand of brands) {
    const nhtsa = NHTSA_MAP[brand.name];
    if (!nhtsa) { console.log('⚠  Skip ' + brand.name + ' (no NHTSA mapping)'); continue; }
    process.stdout.write('  Checking ' + brand.name.padEnd(20) + '... ');
    const r = await auditBrand(brand, nhtsa);
    if (r.error) { console.log('❌ ' + r.error); continue; }
    if (r.missing.length === 0) {
      console.log('✅ Tam (' + r.ourCount + ' grup / NHTSA ' + r.nhtsaCount + ')');
    } else {
      console.log('🟡 ' + r.missing.length + ' eksik (bizde ' + r.ourCount + ' / NHTSA ' + r.nhtsaCount + ')');
      console.log('     EKSIK: ' + r.missing.join(', '));
      totalMissing += r.missing.length;
    }
    await new Promise(r => setTimeout(r, 250)); // NHTSA rate-limit nezaket
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  TOPLAM EKSIK MODEL ADAYI: ' + totalMissing);
  console.log('  NOT: NHTSA ABD pazarı ağırlıklıdır. Avrupa-özel modeller');
  console.log('  (FR-V, Stream, Stilo gibi) NHTSA listesinde bulunmayabilir.');
  console.log('═══════════════════════════════════════════════════');
})().catch(e => { console.error(e); process.exit(1); });
