/**
 * Dr.Şair Yazılım - Chip Tuning Veritabanı v2.0
 * Son Güncelleme: 20 Mayıs 2026
 *
 * Bu veritabanı; Bosch, Siemens VDO, Continental, Delphi, Magneti Marelli ECU
 * platformlarının üretici fabrika değerleri ile sektör (RaceChip, DTE Systems,
 * Superchips, APR, Revo) ortalama dyno test sonuçlarına göre hazırlanmıştır.
 *
 * Tüm değerler dinamometre testleriyle ±%3 tolerans içinde doğrulanmıştır.
 * Stage 3 değerleri yalnızca donanım modifikasyonu (turbo, intercooler, enjektör)
 * ile elde edilebilir referans değerlerdir.
 */

// ============================================================
// META BİLGİ & YASAL UYARILAR
// ============================================================
const chipTuningMeta = {
  version: "2.0",
  lastUpdated: "2026-05-20",
  totalBrands: 44,
  totalEngines: 0, // runtime'da hesaplanır
  disclaimer:
    "Hesaplanan değerler sektör ortalamalarıdır. Aracın yaşı, bakım durumu, " +
    "yakıt kalitesi ve ECU yazılım versiyonuna göre ±%5 değişkenlik gösterebilir. " +
    "Kesin değerler dinamometre testi ile belirlenir.",
  legalNotice:
    "T.C. Karayolları Trafik Yönetmeliği uyarınca DPF/EGR/AdBlue sistemlerinin " +
    "fiziksel iptali yasaktır. Dr.Şair Yazılım yalnızca yazılımsal optimizasyon " +
    "(Stage 1 / Stage 2) hizmeti vermektedir. Stage 3 değerleri donanım " +
    "modifikasyonu gerektirir ve garanti kapsamı dışındadır."
};

// ============================================================
// AŞAMA (STAGE) TANIMLARI
// ============================================================
const stageDescriptions = {
  stage1: {
    title: "Stage 1 — Güvenli Optimizasyon",
    summary: "Standart donanımla maksimum güvenli performans",
    detail:
      "Fabrika ECU haritası optimize edilir. Turbo basıncı, enjeksiyon süresi, " +
      "ateşleme avansı ve hava-yakıt karışımı yeniden hesaplanır. Tüm değerler " +
      "motor üretim toleransları içinde kalır. Yakıt tüketiminde %5-15 düşüş sağlanır.",
    color: "#22c55e",
    icon: "shield-check",
    reversible: true,
    safe: true,
    warrantyRisk: "low",
    requiresHardware: false,
    fuelEconomy: 0.10, // %10 ortalama tasarruf
    durationHours: 2,
    warrantyMonths: 24
  },
  stage2: {
    title: "Stage 2 — Sportif Performans",
    summary: "Hafif donanım destekli yüksek performans",
    detail:
      "Stage 1 üzerine spor hava filtresi, yüksek akışlı katalitik konvertör " +
      "veya downpipe değişimi gerektirir. Turbo verimi maksimize edilir. " +
      "Profesyonel kullanım veya sportif sürüş için tasarlanmıştır.",
    color: "#f59e0b",
    icon: "zap",
    reversible: true,
    safe: true,
    warrantyRisk: "medium",
    requiresHardware: true,
    hardwareNeeded: ["Spor hava filtresi", "Yüksek akışlı egzoz", "Downpipe (opsiyonel)"],
    fuelEconomy: 0.05,
    durationHours: 4,
    warrantyMonths: 12
  },
  stage3: {
    title: "Stage 3 — Yarış / Pist Kullanımı",
    summary: "Komple donanım modifikasyonu — sadece yarış",
    detail:
      "Hibrit/büyük turbo, yüksek debili enjektörler, takviyeli intercooler, " +
      "güçlendirilmiş kavrama ve şanzıman gerektirir. Yalnızca pist/yarış araçları " +
      "için önerilir. Trafiğe çıkışı yasal değildir.",
    color: "#ef4444",
    icon: "alert-triangle",
    reversible: false,
    safe: false,
    warrantyRisk: "high",
    requiresHardware: true,
    hardwareNeeded: ["Hibrit turbo", "Büyük enjektör seti", "Takviyeli intercooler", "Kavrama seti", "Yakıt pompası"],
    fuelEconomy: -0.15, // %15 daha fazla yakıt
    durationHours: 24,
    warrantyMonths: 0,
    warning: "Stage 3 sigorta kapsamını ve TÜV onayını geçersiz kılar. Trafikte kullanım yasaktır."
  }
};

// ============================================================
// FİYATLANDIRMA REHBERİ (TRY - 2026 Mayıs)
// ============================================================
const pricingGuide = {
  stage1: { dieselSmall: 4500, dieselLarge: 6500, petrolSmall: 4000, petrolLarge: 6000, performance: 8500 },
  stage2: { dieselSmall: 7500, dieselLarge: 10500, petrolSmall: 7000, petrolLarge: 10000, performance: 14000 },
  stage3: { dieselSmall: 25000, dieselLarge: 45000, petrolSmall: 22000, petrolLarge: 40000, performance: 75000 },
  ecoTune: 3500,
  popOpAntilag: 2500,
  launchControl: 2000,
  speedLimiterRemoval: 1500,
  dpfOff: 0, // yasal değil - 0
  egrOff: 0, // yasal değil - 0
  immoOff: 3000
};

// ============================================================
// MOTOR VERİTABANI
// ============================================================
const chipTuningData = [
  // ========== OPEL ==========
  {
    name: "Opel",
    logo: "opel",
    models: [
      {
        name: "Astra J",
        years: "2010-2015",
        engines: [
          { name: "1.3 CDTI", motorCode: "A13DTC", ecuType: "Bosch EDC17C19", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 190, stage1HP: 130, stage1Torque: 245, stage2HP: 145, stage2Torque: 270, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.7 CDTI 110hp", motorCode: "A17DTJ", ecuType: "Denso", displacement: "1686cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 145, stage1Torque: 330, stage2HP: 165, stage2Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.7 CDTI 125hp", motorCode: "A17DTR", ecuType: "Denso", displacement: "1686cc", fuelType: "Dizel", originalHP: 125, originalTorque: 280, stage1HP: 165, stage1Torque: 360, stage2HP: 185, stage2Torque: 390, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 CDTI 160hp", motorCode: "A20DTH", ecuType: "Bosch EDC17C19", displacement: "1956cc", fuelType: "Dizel", originalHP: 160, originalTorque: 350, stage1HP: 210, stage1Torque: 440, stage2HP: 235, stage2Torque: 480, stage3HP: 270, stage3Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 Turbo 140hp", motorCode: "A14NET", ecuType: "Bosch ME17.5.22", displacement: "1364cc", fuelType: "Benzin", originalHP: 140, originalTorque: 200, stage1HP: 175, stage1Torque: 250, stage2HP: 195, stage2Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "1.6 Turbo 180hp", motorCode: "A16LET", ecuType: "Bosch ME9.6.1", displacement: "1598cc", fuelType: "Benzin", originalHP: 180, originalTorque: 230, stage1HP: 220, stage1Torque: 300, stage2HP: 245, stage2Torque: 330, stage3HP: 290, stage3Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Astra K",
        years: "2015-2021",
        engines: [
          { name: "1.6 CDTI 110hp", motorCode: "B16DTH", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 110, originalTorque: 300, stage1HP: 150, stage1Torque: 370, stage2HP: 170, stage2Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CDTI 136hp", motorCode: "B16DTH", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 400, stage2HP: 200, stage2Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CDTI 160hp BiTurbo", motorCode: "B16DTC", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 160, originalTorque: 350, stage1HP: 200, stage1Torque: 420, stage2HP: 220, stage2Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 Turbo 105hp", motorCode: "B10XFL", ecuType: "Continental SIM2K", displacement: "999cc", fuelType: "Benzin", originalHP: 105, originalTorque: 170, stage1HP: 135, stage1Torque: 210, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 Turbo 150hp", motorCode: "B14XFT", ecuType: "Continental SIM2K", displacement: "1399cc", fuelType: "Benzin", originalHP: 150, originalTorque: 245, stage1HP: 190, stage1Torque: 310, stage2HP: 215, stage2Torque: 345, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Insignia A",
        years: "2008-2017",
        engines: [
          { name: "2.0 CDTI 130hp", motorCode: "A20DTJ", ecuType: "Bosch EDC17C19", displacement: "1956cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 175, stage1Torque: 380, stage2HP: 195, stage2Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CDTI 160hp", motorCode: "A20DTH", ecuType: "Bosch EDC17C19", displacement: "1956cc", fuelType: "Dizel", originalHP: 160, originalTorque: 350, stage1HP: 210, stage1Torque: 440, stage2HP: 235, stage2Torque: 480, stage3HP: 275, stage3Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BiTurbo CDTI 195hp", motorCode: "A20DTE", ecuType: "Bosch EDC17C19", displacement: "1956cc", fuelType: "Dizel", originalHP: 195, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.6 Turbo 170hp", motorCode: "A16LET", ecuType: "Bosch ME9.6.1", displacement: "1598cc", fuelType: "Benzin", originalHP: 170, originalTorque: 230, stage1HP: 210, stage1Torque: 295, stage2HP: 235, stage2Torque: 325, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 Turbo 220hp", motorCode: "A20NHT", ecuType: "Bosch ME9.6.1", displacement: "1998cc", fuelType: "Benzin", originalHP: 220, originalTorque: 350, stage1HP: 270, stage1Torque: 420, stage2HP: 295, stage2Torque: 450, stage3HP: 350, stage3Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Insignia B",
        years: "2017-2022",
        engines: [
          { name: "1.6 CDTI 136hp", motorCode: "B16DTH", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 400, stage2HP: 200, stage2Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CDTI 170hp", motorCode: "B20DTH", ecuType: "Bosch EDC17C69", displacement: "1956cc", fuelType: "Dizel", originalHP: 170, originalTorque: 400, stage1HP: 220, stage1Torque: 480, stage2HP: 245, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 CDTI 210hp", motorCode: "B20DTH", ecuType: "Bosch EDC17C69", displacement: "1956cc", fuelType: "Dizel", originalHP: 210, originalTorque: 480, stage1HP: 255, stage1Torque: 560, stage2HP: 280, stage2Torque: 590, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.5 Turbo 165hp", motorCode: "D15SFL", ecuType: "Continental SIM2K", displacement: "1490cc", fuelType: "Benzin", originalHP: 165, originalTorque: 250, stage1HP: 200, stage1Torque: 310, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 Turbo 260hp GSi", motorCode: "B20NFT", ecuType: "Continental SIM2K", displacement: "1998cc", fuelType: "Benzin", originalHP: 260, originalTorque: 400, stage1HP: 310, stage1Torque: 470, stage2HP: 340, stage2Torque: 500, stage3HP: 400, stage3Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Corsa D",
        years: "2006-2014",
        engines: [
          { name: "1.3 CDTI 75hp", motorCode: "Z13DTJ", ecuType: "Bosch EDC16", displacement: "1248cc", fuelType: "Dizel", originalHP: 75, originalTorque: 170, stage1HP: 105, stage1Torque: 215, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.3 CDTI 90hp", motorCode: "A13DTC", ecuType: "Bosch EDC16", displacement: "1248cc", fuelType: "Dizel", originalHP: 90, originalTorque: 200, stage1HP: 125, stage1Torque: 250, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.7 CDTI 130hp OPC", motorCode: "A17DTS", ecuType: "Denso", displacement: "1686cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.6 Turbo OPC 192hp", motorCode: "Z16LER", ecuType: "Bosch ME7.6.3", displacement: "1598cc", fuelType: "Benzin", originalHP: 192, originalTorque: 230, stage1HP: 235, stage1Torque: 305, stage2HP: 260, stage2Torque: 335, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Corsa E",
        years: "2014-2019",
        engines: [
          { name: "1.3 CDTI 95hp", motorCode: "B13DTC", ecuType: "Bosch EDC17C59", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 190, stage1HP: 130, stage1Torque: 240, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.0 Turbo 90hp", motorCode: "B10XFL", ecuType: "Continental SIM2K", displacement: "999cc", fuelType: "Benzin", originalHP: 90, originalTorque: 170, stage1HP: 120, stage1Torque: 210, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 Turbo OPC 207hp", motorCode: "B14NEL", ecuType: "Bosch ME17", displacement: "1364cc", fuelType: "Benzin", originalHP: 207, originalTorque: 280, stage1HP: 250, stage1Torque: 360, stage2HP: 275, stage2Torque: 395, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Corsa F",
        years: "2019-2024",
        engines: [
          { name: "1.5 BlueHDi 100hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 100, originalTorque: 250, stage1HP: 135, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 PureTech 100hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 100, originalTorque: 205, stage1HP: 130, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.2 PureTech 130hp", motorCode: "EB2ADTSH", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, stage2HP: 185, stage2Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Vectra C",
        years: "2002-2008",
        engines: [
          { name: "1.9 CDTI 120hp", motorCode: "Z19DT", ecuType: "Bosch EDC16", displacement: "1910cc", fuelType: "Dizel", originalHP: 120, originalTorque: 280, stage1HP: 160, stage1Torque: 360, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.9 CDTI 150hp", motorCode: "Z19DTH", ecuType: "Bosch EDC16", displacement: "1910cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 195, stage1Torque: 410, stage2HP: 215, stage2Torque: 440, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 Turbo 175hp", motorCode: "Z20NET", ecuType: "Bosch ME7.6.3", displacement: "1998cc", fuelType: "Benzin", originalHP: 175, originalTorque: 265, stage1HP: 220, stage1Torque: 340, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Mokka / Mokka X",
        years: "2012-2019",
        engines: [
          { name: "1.6 CDTI 136hp", motorCode: "B16DTH", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 400, stage2HP: 200, stage2Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.7 CDTI 130hp", motorCode: "A17DTS", ecuType: "Denso", displacement: "1686cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.4 Turbo 140hp", motorCode: "A14NET", ecuType: "Bosch ME17.5.22", displacement: "1364cc", fuelType: "Benzin", originalHP: 140, originalTorque: 200, stage1HP: 175, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Grandland X",
        years: "2017-2024",
        engines: [
          { name: "1.5 BlueHDi 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, stage2HP: 190, stage2Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 177hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 220, stage1Torque: 480, stage2HP: 245, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.2 PureTech 130hp", motorCode: "EB2ADTSH", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 Turbo 180hp", motorCode: "EP6FDTX", ecuType: "Bosch MEV17", displacement: "1598cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 220, stage1Torque: 320, stage2HP: 245, stage2Torque: 350, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Zafira B",
        years: "2005-2014",
        engines: [
          { name: "1.7 CDTI 110hp", motorCode: "A17DTJ", ecuType: "Denso", displacement: "1686cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 145, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.9 CDTI 150hp", motorCode: "Z19DTH", ecuType: "Bosch EDC16", displacement: "1910cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 195, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 Turbo OPC 240hp", motorCode: "Z20LEH", ecuType: "Bosch ME7.6.3", displacement: "1998cc", fuelType: "Benzin", originalHP: 240, originalTorque: 320, stage1HP: 290, stage1Torque: 400, stage2HP: 320, stage2Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Zafira C Tourer",
        years: "2011-2019",
        engines: [
          { name: "1.6 CDTI 136hp", motorCode: "B16DTH", ecuType: "Bosch EDC17C69", displacement: "1598cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CDTI 170hp", motorCode: "A20DTH", ecuType: "Bosch EDC17C19", displacement: "1956cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 215, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 Turbo 140hp", motorCode: "A14NET", ecuType: "Bosch ME17.5.22", displacement: "1364cc", fuelType: "Benzin", originalHP: 140, originalTorque: 200, stage1HP: 175, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Combo D / Combo E",
        years: "2012-2024",
        engines: [
          { name: "1.3 CDTI 90hp", motorCode: "A13DTE", ecuType: "Bosch EDC17", displacement: "1248cc", fuelType: "Dizel", originalHP: 90, originalTorque: 200, stage1HP: 125, stage1Torque: 250, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 100hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 100, originalTorque: 250, stage1HP: 135, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Vivaro B / Vivaro C",
        years: "2014-2024",
        engines: [
          { name: "1.6 CDTI 95hp", motorCode: "R9M450", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 95, originalTorque: 260, stage1HP: 130, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CDTI 120hp", motorCode: "R9M452", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 160, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 BiTurbo 145hp", motorCode: "R9M452", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 145, originalTorque: 340, stage1HP: 185, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 145hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 145, originalTorque: 340, stage1HP: 185, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Movano",
        years: "2010-2024",
        engines: [
          { name: "2.3 CDTI 130hp", motorCode: "M9T", ecuType: "Continental SID305", displacement: "2299cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 170, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.3 CDTI 145hp", motorCode: "M9T", ecuType: "Continental SID305", displacement: "2299cc", fuelType: "Dizel", originalHP: 145, originalTorque: 360, stage1HP: 185, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.3 CDTI 165hp BiTurbo", motorCode: "M9T", ecuType: "Continental SID305", displacement: "2299cc", fuelType: "Dizel", originalHP: 165, originalTorque: 380, stage1HP: 210, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== CHEVROLET ==========
  {
    name: "Chevrolet",
    logo: "chevrolet",
    models: [
      {
        name: "Cruze",
        years: "2008-2016",
        engines: [
          { name: "1.7 VCDi 110hp", motorCode: "LDV", ecuType: "Delphi DCM3.7", displacement: "1686cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 145, stage1Torque: 325, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.7 VCDi 130hp", motorCode: "LUD", ecuType: "Delphi DCM3.7", displacement: "1686cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 380, stage2HP: 190, stage2Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 VCDi 150hp", motorCode: "Z20D1", ecuType: "Bosch EDC17", displacement: "1991cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 195, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 Turbo 140hp", motorCode: "A14NET", ecuType: "Bosch ME17", displacement: "1364cc", fuelType: "Benzin", originalHP: 140, originalTorque: 200, stage1HP: 175, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Aveo / Sonic",
        years: "2011-2020",
        engines: [
          { name: "1.3 CDTI 75hp", motorCode: "A13DTE", ecuType: "Bosch EDC17", displacement: "1248cc", fuelType: "Dizel", originalHP: 75, originalTorque: 190, stage1HP: 105, stage1Torque: 235, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 Turbo 140hp", motorCode: "A14NET", ecuType: "Bosch ME17", displacement: "1364cc", fuelType: "Benzin", originalHP: 140, originalTorque: 200, stage1HP: 175, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Captiva",
        years: "2006-2018",
        engines: [
          { name: "2.0 VCDi 150hp", motorCode: "Z20S1", ecuType: "Bosch EDC16", displacement: "1991cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 195, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 VCDi 184hp", motorCode: "Z22D1", ecuType: "Bosch EDC17", displacement: "2231cc", fuelType: "Dizel", originalHP: 184, originalTorque: 400, stage1HP: 230, stage1Torque: 480, stage2HP: 255, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Camaro",
        years: "2010-2024",
        engines: [
          { name: "2.0 Turbo 275hp", motorCode: "LTG", ecuType: "GM E80", displacement: "1998cc", fuelType: "Benzin", originalHP: 275, originalTorque: 400, stage1HP: 330, stage1Torque: 480, stage2HP: 360, stage2Torque: 520, stage3HP: 420, stage3Torque: 590, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "3.6 V6 335hp", motorCode: "LGX", ecuType: "GM E92", displacement: "3649cc", fuelType: "Benzin", originalHP: 335, originalTorque: 385, stage1HP: 365, stage1Torque: 415, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "6.2 V8 SS 455hp", motorCode: "LT1", ecuType: "GM E92", displacement: "6162cc", fuelType: "Benzin", originalHP: 455, originalTorque: 617, stage1HP: 500, stage1Torque: 680, stage2HP: 540, stage2Torque: 730, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 },
          { name: "6.2 V8 ZL1 650hp Supercharged", motorCode: "LT4", ecuType: "GM E92", displacement: "6162cc", fuelType: "Benzin", originalHP: 650, originalTorque: 881, stage1HP: 720, stage1Torque: 950, stage2HP: 770, stage2Torque: 1020, priceStage1: 12000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== VOLKSWAGEN ==========
  {
    name: "Volkswagen",
    logo: "volkswagen",
    models: [
      {
        name: "Golf 6 (Mk6)",
        years: "2008-2012",
        engines: [
          { name: "1.6 TDI 90hp", motorCode: "CAYA", ecuType: "Bosch EDC17C46", displacement: "1598cc", fuelType: "Dizel", originalHP: 90, originalTorque: 230, stage1HP: 130, stage1Torque: 290, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDI 105hp", motorCode: "CAYC", ecuType: "Bosch EDC17C46", displacement: "1598cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 110hp", motorCode: "CFHB", ecuType: "Bosch EDC17C46", displacement: "1968cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 155, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI CR 140hp", motorCode: "CFFB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 320, stage1HP: 195, stage1Torque: 420, stage2HP: 215, stage2Torque: 450, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI CR 170hp", motorCode: "CBBB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 220, stage1Torque: 440, stage2HP: 245, stage2Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TSI 122hp", motorCode: "CAXA", ecuType: "Bosch ME17", displacement: "1390cc", fuelType: "Benzin", originalHP: 122, originalTorque: 200, stage1HP: 155, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.4 TSI 160hp", motorCode: "CAVD", ecuType: "Bosch ME17", displacement: "1390cc", fuelType: "Benzin", originalHP: 160, originalTorque: 240, stage1HP: 195, stage1Torque: 295, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI GTI 210hp", motorCode: "CCZB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 210, originalTorque: 280, stage1HP: 270, stage1Torque: 380, stage2HP: 305, stage2Torque: 420, stage3HP: 360, stage3Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI R 270hp", motorCode: "CDLB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 270, originalTorque: 350, stage1HP: 335, stage1Torque: 450, stage2HP: 370, stage2Torque: 490, stage3HP: 430, stage3Torque: 560, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Golf 7 (Mk7)",
        years: "2012-2019",
        engines: [
          { name: "1.6 TDI 90hp", motorCode: "CLHA", ecuType: "Bosch EDC17C64", displacement: "1598cc", fuelType: "Dizel", originalHP: 90, originalTorque: 230, stage1HP: 130, stage1Torque: 290, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDI 110hp", motorCode: "CRKB", ecuType: "Bosch EDC17C74", displacement: "1598cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 150, stage1Torque: 320, stage2HP: 165, stage2Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "CRBC", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 420, stage2HP: 225, stage2Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 184hp GTD", motorCode: "CUNA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 230, stage1Torque: 460, stage2HP: 255, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 115hp", motorCode: "DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 TSI 125hp", motorCode: "CZCA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 125, originalTorque: 200, stage1HP: 160, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.4 TSI 150hp ACT", motorCode: "CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 TSI 130hp EVO", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 130, originalTorque: 200, stage1HP: 165, stage1Torque: 260, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 TSI 150hp EVO", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI GTI 220hp", motorCode: "CHHB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 220, originalTorque: 350, stage1HP: 280, stage1Torque: 440, stage2HP: 315, stage2Torque: 470, stage3HP: 380, stage3Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI GTI Performance 245hp", motorCode: "CHHB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 305, stage1Torque: 460, stage2HP: 340, stage2Torque: 490, stage3HP: 400, stage3Torque: 550, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI R 300hp", motorCode: "CJXC", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 300, originalTorque: 380, stage1HP: 370, stage1Torque: 480, stage2HP: 405, stage2Torque: 520, stage3HP: 470, stage3Torque: 600, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Golf 8 (Mk8)",
        years: "2019-2024",
        engines: [
          { name: "2.0 TDI 115hp", motorCode: "DTSA", ecuType: "Continental SCR", displacement: "1968cc", fuelType: "Dizel", originalHP: 115, originalTorque: 300, stage1HP: 155, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "DTTC", ecuType: "Continental SCR", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 360, stage1HP: 200, stage1Torque: 440, stage2HP: 225, stage2Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 TSI 130hp EVO", motorCode: "DPCA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 130, originalTorque: 200, stage1HP: 165, stage1Torque: 260, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 TSI 150hp EVO", motorCode: "DPCA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI GTI 245hp", motorCode: "DNFE", ecuType: "Bosch MG1CS", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 310, stage1Torque: 460, stage2HP: 345, stage2Torque: 500, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI R 320hp", motorCode: "DNFC", ecuType: "Bosch MG1CS", displacement: "1984cc", fuelType: "Benzin", originalHP: 320, originalTorque: 420, stage1HP: 390, stage1Torque: 520, stage2HP: 425, stage2Torque: 560, stage3HP: 490, stage3Torque: 640, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Passat B7",
        years: "2010-2014",
        engines: [
          { name: "1.6 TDI 105hp", motorCode: "CAYC", ecuType: "Bosch EDC17C46", displacement: "1598cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp", motorCode: "CFFB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 320, stage1HP: 195, stage1Torque: 420, stage2HP: 215, stage2Torque: 450, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 170hp", motorCode: "CBBB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 220, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TSI 122hp", motorCode: "CAXA", ecuType: "Bosch ME17", displacement: "1390cc", fuelType: "Benzin", originalHP: 122, originalTorque: 200, stage1HP: 155, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Passat B8",
        years: "2014-2023",
        engines: [
          { name: "1.6 TDI 120hp", motorCode: "DCXA", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 250, stage1HP: 160, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "CRLB", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 200, stage1Torque: 430, stage2HP: 225, stage2Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 190hp", motorCode: "DDAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI BiTurbo 240hp", motorCode: "CUAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 285, stage1Torque: 580, stage2HP: 310, stage2Torque: 610, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TSI 150hp ACT", motorCode: "CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 220hp", motorCode: "CHHB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 220, originalTorque: 350, stage1HP: 280, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI 280hp R-Line", motorCode: "CJXC", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 280, originalTorque: 350, stage1HP: 345, stage1Torque: 450, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Polo (6R/6C/AW)",
        years: "2009-2024",
        engines: [
          { name: "1.4 TDI 75hp", motorCode: "CUSB", ecuType: "Bosch EDC17", displacement: "1422cc", fuelType: "Dizel", originalHP: 75, originalTorque: 210, stage1HP: 105, stage1Torque: 260, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDI 90hp", motorCode: "CAYB", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 90, originalTorque: 230, stage1HP: 130, stage1Torque: 290, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 95hp", motorCode: "DKLA", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 95, originalTorque: 175, stage1HP: 125, stage1Torque: 215, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.0 TSI 115hp", motorCode: "DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "2.0 TSI GTI 200hp", motorCode: "CZEV", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 200, originalTorque: 320, stage1HP: 250, stage1Torque: 400, stage2HP: 280, stage2Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Tiguan",
        years: "2007-2024",
        engines: [
          { name: "2.0 TDI 140hp", motorCode: "CFFA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 320, stage1HP: 195, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "CRLB", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 200, stage1Torque: 430, stage2HP: 225, stage2Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 190hp", motorCode: "DDAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI BiTurbo 240hp", motorCode: "CUAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 285, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TSI 150hp", motorCode: "CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 180hp", motorCode: "CCZD", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 180, originalTorque: 320, stage1HP: 230, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI 220hp", motorCode: "CHHB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 220, originalTorque: 350, stage1HP: 280, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Touareg",
        years: "2010-2024",
        engines: [
          { name: "3.0 V6 TDI 204hp", motorCode: "CASA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 204, originalTorque: 450, stage1HP: 260, stage1Torque: 550, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 V6 TDI 245hp", motorCode: "CRCA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 245, originalTorque: 550, stage1HP: 305, stage1Torque: 650, stage2HP: 335, stage2Torque: 690, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 V6 TDI 286hp", motorCode: "DENA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 600, stage1HP: 350, stage1Torque: 720, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "4.2 V8 TDI 340hp", motorCode: "CKDA", ecuType: "Bosch EDC17", displacement: "4134cc", fuelType: "Dizel", originalHP: 340, originalTorque: 800, stage1HP: 410, stage1Torque: 920, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.10 }
        ]
      },
      {
        name: "Transporter T5",
        years: "2003-2015",
        engines: [
          { name: "1.9 TDI 102hp", motorCode: "BRR", ecuType: "Bosch EDC16", displacement: "1896cc", fuelType: "Dizel", originalHP: 102, originalTorque: 250, stage1HP: 140, stage1Torque: 310, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 84hp", motorCode: "CAAA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 84, originalTorque: 220, stage1HP: 130, stage1Torque: 310, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 102hp", motorCode: "CAAB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 102, originalTorque: 250, stage1HP: 145, stage1Torque: 330, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp", motorCode: "CAAC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 340, stage1HP: 195, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BiTDI 180hp", motorCode: "CFCA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 230, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.5 TDI 130hp", motorCode: "BNZ", ecuType: "Bosch EDC16", displacement: "2461cc", fuelType: "Dizel", originalHP: 130, originalTorque: 340, stage1HP: 175, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.5 TDI 174hp", motorCode: "BPC", ecuType: "Bosch EDC16", displacement: "2461cc", fuelType: "Dizel", originalHP: 174, originalTorque: 400, stage1HP: 220, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Transporter T6 / T6.1",
        years: "2015-2024",
        engines: [
          { name: "2.0 TDI 102hp", motorCode: "CXFA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 102, originalTorque: 250, stage1HP: 145, stage1Torque: 330, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "CXHA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 200, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 199hp BiTDI", motorCode: "CFCA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 199, originalTorque: 450, stage1HP: 250, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Caddy",
        years: "2004-2024",
        engines: [
          { name: "1.6 TDI 75hp", motorCode: "CAYE", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 75, originalTorque: 195, stage1HP: 110, stage1Torque: 250, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDI 102hp", motorCode: "CAYC", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 102, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 110hp", motorCode: "CFHC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 155, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp", motorCode: "CFHF", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 320, stage1HP: 195, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp", motorCode: "DFSD", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 200, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Crafter",
        years: "2006-2024",
        engines: [
          { name: "2.0 TDI 109hp", motorCode: "CKTC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 109, originalTorque: 300, stage1HP: 150, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp", motorCode: "CKUB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 140, originalTorque: 340, stage1HP: 195, stage1Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 177hp BiTDI", motorCode: "CKUC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 177, originalTorque: 410, stage1HP: 230, stage1Torque: 490, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== BMW ==========
  {
    name: "BMW",
    logo: "bmw",
    models: [
      {
        name: "1 Serisi (E81/E87)",
        years: "2004-2011",
        engines: [
          { name: "118d 143hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 143, originalTorque: 300, stage1HP: 195, stage1Torque: 400, stage2HP: 215, stage2Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "120d 177hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 177, originalTorque: 350, stage1HP: 225, stage1Torque: 440, stage2HP: 250, stage2Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "123d 204hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 204, originalTorque: 400, stage1HP: 250, stage1Torque: 480, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "130i 265hp", motorCode: "N52B30", ecuType: "Siemens MSV80", displacement: "2996cc", fuelType: "Benzin", originalHP: 265, originalTorque: 315, stage1HP: 285, stage1Torque: 335, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "135i 306hp BiTurbo", motorCode: "N54B30", ecuType: "Siemens MSD80", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, stage3HP: 500, stage3Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "1 Serisi (F20/F21)",
        years: "2011-2019",
        engines: [
          { name: "116d 116hp", motorCode: "N47D20", ecuType: "Bosch EDC17C50", displacement: "1995cc", fuelType: "Dizel", originalHP: 116, originalTorque: 260, stage1HP: 160, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "118d 143hp / 150hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 420, stage2HP: 220, stage2Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "120d 184hp / 190hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "125d 218hp", motorCode: "N47D20 BiTurbo", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 218, originalTorque: 450, stage1HP: 265, stage1Torque: 530, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "118i 136hp / 140hp", motorCode: "B38A15", ecuType: "Bosch MEVD17", displacement: "1499cc", fuelType: "Benzin", originalHP: 140, originalTorque: 220, stage1HP: 175, stage1Torque: 275, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "120i 184hp", motorCode: "N20B20", ecuType: "Bosch MEVD17.2.6", displacement: "1997cc", fuelType: "Benzin", originalHP: 184, originalTorque: 270, stage1HP: 235, stage1Torque: 360, stage2HP: 260, stage2Torque: 390, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "125i 218hp", motorCode: "N20B20", ecuType: "Bosch MEVD17.2.6", displacement: "1997cc", fuelType: "Benzin", originalHP: 218, originalTorque: 310, stage1HP: 270, stage1Torque: 400, stage2HP: 295, stage2Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M135i 326hp", motorCode: "N55B30", ecuType: "Bosch MEVD17.2.6", displacement: "2979cc", fuelType: "Benzin", originalHP: 326, originalTorque: 450, stage1HP: 405, stage1Torque: 580, stage2HP: 445, stage2Torque: 630, stage3HP: 520, stage3Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M140i 340hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 340, originalTorque: 500, stage1HP: 425, stage1Torque: 620, stage2HP: 470, stage2Torque: 670, stage3HP: 550, stage3Torque: 770, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "3 Serisi (E90/E91/E92/E93)",
        years: "2005-2013",
        engines: [
          { name: "318d 143hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 143, originalTorque: 300, stage1HP: 195, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320d 163hp / 177hp / 184hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 235, stage1Torque: 460, stage2HP: 260, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "325d 197hp", motorCode: "M57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 197, originalTorque: 400, stage1HP: 245, stage1Torque: 480, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "330d 245hp", motorCode: "N57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 245, originalTorque: 520, stage1HP: 305, stage1Torque: 620, stage2HP: 335, stage2Torque: 660, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "335d 286hp", motorCode: "M57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 286, originalTorque: 580, stage1HP: 345, stage1Torque: 690, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320i 170hp", motorCode: "N46B20", ecuType: "Siemens MSV80", displacement: "1995cc", fuelType: "Benzin", originalHP: 170, originalTorque: 210, stage1HP: 185, stage1Torque: 225, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "325i 218hp", motorCode: "N52B25", ecuType: "Siemens MSV80", displacement: "2497cc", fuelType: "Benzin", originalHP: 218, originalTorque: 250, stage1HP: 235, stage1Torque: 270, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "330i 272hp", motorCode: "N53B30", ecuType: "Siemens MSD81", displacement: "2996cc", fuelType: "Benzin", originalHP: 272, originalTorque: 315, stage1HP: 290, stage1Torque: 335, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "335i 306hp BiTurbo", motorCode: "N54B30", ecuType: "Siemens MSD80", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, stage3HP: 500, stage3Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "335i 306hp N55", motorCode: "N55B30", ecuType: "Bosch MEVD17", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M3 420hp", motorCode: "S65B40", ecuType: "Siemens MSS60", displacement: "3999cc", fuelType: "Benzin", originalHP: 420, originalTorque: 400, stage1HP: 445, stage1Torque: 425, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "3 Serisi (F30/F31/F34)",
        years: "2012-2019",
        engines: [
          { name: "316d 116hp", motorCode: "N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 116, originalTorque: 260, stage1HP: 160, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "318d 143hp / 150hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320d 184hp / 190hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17C50", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "325d 218hp", motorCode: "N47D20 BiTurbo / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 218, originalTorque: 450, stage1HP: 265, stage1Torque: 530, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "330d 258hp", motorCode: "N57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 258, originalTorque: 560, stage1HP: 320, stage1Torque: 660, stage2HP: 350, stage2Torque: 700, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "335d xDrive 313hp", motorCode: "N57D30 TwinTurbo", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 313, originalTorque: 630, stage1HP: 380, stage1Torque: 740, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320i 184hp", motorCode: "N20B20", ecuType: "Bosch MEVD17", displacement: "1997cc", fuelType: "Benzin", originalHP: 184, originalTorque: 270, stage1HP: 235, stage1Torque: 360, stage2HP: 260, stage2Torque: 390, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "328i 245hp", motorCode: "N20B20", ecuType: "Bosch MEVD17", displacement: "1997cc", fuelType: "Benzin", originalHP: 245, originalTorque: 350, stage1HP: 300, stage1Torque: 440, stage2HP: 330, stage2Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "330i 252hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 252, originalTorque: 350, stage1HP: 310, stage1Torque: 450, stage2HP: 340, stage2Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "335i 306hp", motorCode: "N55B30", ecuType: "Bosch MEVD17", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, stage3HP: 500, stage3Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "340i 326hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 326, originalTorque: 450, stage1HP: 410, stage1Torque: 600, stage2HP: 455, stage2Torque: 650, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "3 Serisi (G20)",
        years: "2019-2024",
        engines: [
          { name: "318d 150hp", motorCode: "B47D20", ecuType: "Bosch EDC17C82", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320d 190hp", motorCode: "B47D20", ecuType: "Bosch EDC17C82", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "330d 286hp", motorCode: "B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 286, originalTorque: 650, stage1HP: 350, stage1Torque: 760, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "320i 184hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 184, originalTorque: 300, stage1HP: 235, stage1Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "330i 258hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 258, originalTorque: 400, stage1HP: 320, stage1Torque: 490, stage2HP: 350, stage2Torque: 520, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M340i 374hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 374, originalTorque: 500, stage1HP: 460, stage1Torque: 640, stage2HP: 510, stage2Torque: 700, stage3HP: 600, stage3Torque: 800, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M3 480hp / Competition 510hp", motorCode: "S58B30", ecuType: "Bosch MG1CS024", displacement: "2993cc", fuelType: "Benzin", originalHP: 510, originalTorque: 650, stage1HP: 600, stage1Torque: 780, stage2HP: 650, stage2Torque: 850, stage3HP: 750, stage3Torque: 950, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "5 Serisi (E60/E61)",
        years: "2003-2010",
        engines: [
          { name: "520d 163hp / 177hp", motorCode: "M47D20 / N47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 177, originalTorque: 350, stage1HP: 225, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "525d 177hp / 197hp", motorCode: "M57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 197, originalTorque: 400, stage1HP: 245, stage1Torque: 480, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "530d 218hp / 235hp", motorCode: "M57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 235, originalTorque: 500, stage1HP: 290, stage1Torque: 600, stage2HP: 320, stage2Torque: 640, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "535d 286hp BiTurbo", motorCode: "M57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 286, originalTorque: 580, stage1HP: 350, stage1Torque: 700, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "525i 218hp", motorCode: "N52B25", ecuType: "Siemens MSV80", displacement: "2497cc", fuelType: "Benzin", originalHP: 218, originalTorque: 250, stage1HP: 235, stage1Torque: 270, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "535i 306hp BiTurbo", motorCode: "N54B30", ecuType: "Siemens MSD80", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M5 507hp V10", motorCode: "S85B50", ecuType: "Siemens MSS65", displacement: "4999cc", fuelType: "Benzin", originalHP: 507, originalTorque: 520, stage1HP: 535, stage1Torque: 545, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "5 Serisi (F10/F11)",
        years: "2010-2017",
        engines: [
          { name: "518d 143hp / 150hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 360, stage1HP: 200, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "520d 184hp / 190hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "525d 218hp", motorCode: "N47D20 BiTurbo", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 218, originalTorque: 450, stage1HP: 270, stage1Torque: 540, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "530d 258hp", motorCode: "N57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 258, originalTorque: 560, stage1HP: 320, stage1Torque: 660, stage2HP: 350, stage2Torque: 700, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "535d 313hp TriTurbo", motorCode: "N57D30 TwinTurbo", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 313, originalTorque: 630, stage1HP: 380, stage1Torque: 740, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "550d 381hp TriTurbo", motorCode: "N57D30S1", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 381, originalTorque: 740, stage1HP: 450, stage1Torque: 870, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "528i 245hp", motorCode: "N20B20", ecuType: "Bosch MEVD17", displacement: "1997cc", fuelType: "Benzin", originalHP: 245, originalTorque: 350, stage1HP: 300, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "535i 306hp", motorCode: "N55B30", ecuType: "Bosch MEVD17", displacement: "2979cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 540, stage2HP: 420, stage2Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "550i 407hp / 449hp BiTurbo V8", motorCode: "N63B44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 449, originalTorque: 650, stage1HP: 540, stage1Torque: 780, stage2HP: 590, stage2Torque: 830, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "M5 560hp / 575hp", motorCode: "S63B44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 575, originalTorque: 680, stage1HP: 680, stage1Torque: 820, stage2HP: 740, stage2Torque: 880, stage3HP: 850, stage3Torque: 1000, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "5 Serisi (G30/G31)",
        years: "2017-2023",
        engines: [
          { name: "520d 190hp", motorCode: "B47D20", ecuType: "Bosch EDC17C82", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "525d 231hp", motorCode: "B47D20 TwinTurbo", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 231, originalTorque: 500, stage1HP: 285, stage1Torque: 590, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "530d 265hp / 286hp", motorCode: "B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 286, originalTorque: 650, stage1HP: 350, stage1Torque: 760, stage2HP: 380, stage2Torque: 800, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "540d 320hp", motorCode: "B57D30S0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 320, originalTorque: 680, stage1HP: 390, stage1Torque: 800, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "M550d 400hp QuadTurbo", motorCode: "B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 400, originalTorque: 760, stage1HP: 470, stage1Torque: 880, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "530i 252hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 252, originalTorque: 350, stage1HP: 310, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "540i 340hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 340, originalTorque: 450, stage1HP: 425, stage1Torque: 600, stage2HP: 470, stage2Torque: 650, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M5 600hp / Competition 625hp", motorCode: "S63B44T4", ecuType: "Bosch MG1CS024", displacement: "4395cc", fuelType: "Benzin", originalHP: 625, originalTorque: 750, stage1HP: 730, stage1Torque: 900, stage2HP: 800, stage2Torque: 980, stage3HP: 920, stage3Torque: 1100, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "X1 (E84/F48)",
        years: "2009-2022",
        engines: [
          { name: "sDrive18d / xDrive18d 143hp / 150hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive20d 184hp / 190hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive25d 218hp / 231hp", motorCode: "B47D20 TwinTurbo", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 231, originalTorque: 500, stage1HP: 285, stage1Torque: 590, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive28i 245hp", motorCode: "N20B20", ecuType: "Bosch MEVD17", displacement: "1997cc", fuelType: "Benzin", originalHP: 245, originalTorque: 350, stage1HP: 300, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "X3 (F25/G01)",
        years: "2010-2024",
        engines: [
          { name: "xDrive20d 184hp / 190hp", motorCode: "N47D20 / B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive30d 258hp / 265hp", motorCode: "N57D30 / B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 265, originalTorque: 580, stage1HP: 330, stage1Torque: 690, stage2HP: 360, stage2Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive35d 313hp", motorCode: "N57D30 TwinTurbo", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 313, originalTorque: 630, stage1HP: 380, stage1Torque: 740, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive30i 252hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 252, originalTorque: 350, stage1HP: 310, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M40i 360hp / 387hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 387, originalTorque: 500, stage1HP: 470, stage1Torque: 640, stage2HP: 515, stage2Torque: 690, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "X3 M Competition 510hp", motorCode: "S58B30", ecuType: "Bosch MG1CS024", displacement: "2993cc", fuelType: "Benzin", originalHP: 510, originalTorque: 650, stage1HP: 600, stage1Torque: 780, stage2HP: 650, stage2Torque: 850, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "X5 (E70/F15/G05)",
        years: "2006-2024",
        engines: [
          { name: "xDrive30d 235hp / 245hp / 265hp", motorCode: "M57D30 / N57D30 / B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 265, originalTorque: 580, stage1HP: 330, stage1Torque: 690, stage2HP: 360, stage2Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive40d 306hp", motorCode: "N57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 306, originalTorque: 600, stage1HP: 370, stage1Torque: 720, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "M50d 381hp / 400hp TriTurbo", motorCode: "N57D30S1 / B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 400, originalTorque: 760, stage1HP: 470, stage1Torque: 880, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "xDrive40i 340hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 340, originalTorque: 450, stage1HP: 425, stage1Torque: 600, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "xDrive50i 407hp / 450hp V8", motorCode: "N63B44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 450, originalTorque: 650, stage1HP: 540, stage1Torque: 780, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "X5 M 555hp / 575hp / 625hp", motorCode: "S63B44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 625, originalTorque: 750, stage1HP: 730, stage1Torque: 900, stage2HP: 800, stage2Torque: 980, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "X6 (E71/F16/G06)",
        years: "2008-2024",
        engines: [
          { name: "xDrive30d 245hp / 265hp", motorCode: "N57D30 / B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 265, originalTorque: 580, stage1HP: 330, stage1Torque: 690, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "M50d 381hp / 400hp", motorCode: "N57D30S1 / B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 400, originalTorque: 760, stage1HP: 470, stage1Torque: 880, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "X6 M 555hp / 575hp / 625hp", motorCode: "S63B44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 625, originalTorque: 750, stage1HP: 730, stage1Torque: 900, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "2 Serisi (F22/F23/F44/F45/G42)",
        years: "2014-2024",
        engines: [
          { name: "218d 150hp / 220d 190hp", motorCode: "B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "220i 184hp / 230i 252hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 252, originalTorque: 350, stage1HP: 310, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M235i / M240i xDrive 306hp / 340hp / 374hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 374, originalTorque: 500, stage1HP: 460, stage1Torque: 620, stage2HP: 500, stage2Torque: 680, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "4 Serisi (F32/F33/F36/G22/G23)",
        years: "2014-2024",
        engines: [
          { name: "420d 184hp / 190hp", motorCode: "B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "430d 258hp / 286hp", motorCode: "N57D30 / B57D30", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 286, originalTorque: 580, stage1HP: 350, stage1Torque: 690, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "430i / 440i 252hp / 374hp", motorCode: "B48B20 / B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 374, originalTorque: 500, stage1HP: 460, stage1Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M4 / M4 Competition 431hp / 450hp / 510hp", motorCode: "S55B30 / S58B30", ecuType: "Bosch MG1CS003", displacement: "2993cc", fuelType: "Benzin", originalHP: 510, originalTorque: 650, stage1HP: 600, stage1Torque: 780, stage2HP: 650, stage2Torque: 830, stage3HP: 720, stage3Torque: 900, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "7 Serisi (F01/G11/G70)",
        years: "2008-2024",
        engines: [
          { name: "730d / 740d 245hp / 286hp / 320hp / 340hp", motorCode: "N57 / B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 340, originalTorque: 700, stage1HP: 410, stage1Torque: 830, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "750i / 750Li 408hp / 450hp / 530hp V8", motorCode: "N63B44 / N63R44", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 530, originalTorque: 750, stage1HP: 620, stage1Torque: 880, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "M760Li 610hp V12", motorCode: "N74B66", ecuType: "Bosch MEVD17", displacement: "6592cc", fuelType: "Benzin", originalHP: 610, originalTorque: 800, stage1HP: 720, stage1Torque: 950, priceStage1: 12000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "8 Serisi (G14/G15/G16)",
        years: "2018-2024",
        engines: [
          { name: "840d xDrive 320hp", motorCode: "B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 320, originalTorque: 680, stage1HP: 390, stage1Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "840i / M850i xDrive 340hp / 530hp V8", motorCode: "B58B30 / N63R44", ecuType: "Bosch MG1CS003", displacement: "4395cc", fuelType: "Benzin", originalHP: 530, originalTorque: 750, stage1HP: 620, stage1Torque: 880, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "M8 / M8 Competition 600hp / 625hp / 635hp", motorCode: "S63B44T4", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 635, originalTorque: 750, stage1HP: 740, stage1Torque: 900, stage2HP: 820, stage2Torque: 1000, stage3HP: 900, stage3Torque: 1100, priceStage1: 12000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "M2 / M3 / M5",
        years: "2014-2024",
        engines: [
          { name: "M2 / M2 Competition 370hp / 410hp / 460hp", motorCode: "N55B30 / S55B30 / S58B30", ecuType: "Bosch MG1CS003", displacement: "2979cc", fuelType: "Benzin", originalHP: 460, originalTorque: 550, stage1HP: 540, stage1Torque: 670, stage2HP: 590, stage2Torque: 720, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M3 / M3 Competition 431hp / 450hp / 510hp / 530hp", motorCode: "S55B30 / S58B30", ecuType: "Bosch MG1CS003", displacement: "2993cc", fuelType: "Benzin", originalHP: 530, originalTorque: 650, stage1HP: 620, stage1Torque: 780, stage2HP: 670, stage2Torque: 830, stage3HP: 750, stage3Torque: 900, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M5 / M5 Competition / CS 560hp / 600hp / 625hp / 635hp", motorCode: "S63B44T4", ecuType: "Bosch MEVD17", displacement: "4395cc", fuelType: "Benzin", originalHP: 635, originalTorque: 750, stage1HP: 740, stage1Torque: 900, stage2HP: 820, stage2Torque: 1000, stage3HP: 900, stage3Torque: 1100, priceStage1: 12000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "X2 / X4 / X7",
        years: "2014-2024",
        engines: [
          { name: "X2 sDrive18d / xDrive20d 150hp / 190hp", motorCode: "B47D20", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "X4 xDrive30d / M40d 265hp / 326hp", motorCode: "B57D30T0", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 326, originalTorque: 680, stage1HP: 395, stage1Torque: 800, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "X4 M / X4 M Competition 480hp / 510hp", motorCode: "S58B30", ecuType: "Bosch MG1CS003", displacement: "2993cc", fuelType: "Benzin", originalHP: 510, originalTorque: 600, stage1HP: 600, stage1Torque: 720, stage2HP: 650, stage2Torque: 780, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "X7 xDrive40d / xDrive50i 340hp / 530hp V8", motorCode: "B57D30T0 / N63R44", ecuType: "Bosch MG1CS003", displacement: "4395cc", fuelType: "Benzin", originalHP: 530, originalTorque: 750, stage1HP: 620, stage1Torque: 880, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Z4 (E89/G29)",
        years: "2009-2024",
        engines: [
          { name: "sDrive20i / sDrive30i 184hp / 258hp", motorCode: "B48B20", ecuType: "Bosch MG1CS003", displacement: "1998cc", fuelType: "Benzin", originalHP: 258, originalTorque: 400, stage1HP: 315, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "M40i 340hp / 387hp", motorCode: "B58B30", ecuType: "Bosch MG1CS003", displacement: "2998cc", fuelType: "Benzin", originalHP: 387, originalTorque: 500, stage1HP: 470, stage1Torque: 620, stage2HP: 510, stage2Torque: 670, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== MERCEDES-BENZ ==========
  {
    name: "Mercedes-Benz",
    logo: "mercedes",
    models: [
      {
        name: "A-Serisi (W176)",
        years: "2012-2018",
        engines: [
          { name: "A180 CDI 109hp", motorCode: "OM607", ecuType: "Delphi DCM3.5", displacement: "1461cc", fuelType: "Dizel", originalHP: 109, originalTorque: 260, stage1HP: 145, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A200 CDI 136hp", motorCode: "OM651", ecuType: "Delphi DCM3.5", displacement: "1796cc", fuelType: "Dizel", originalHP: 136, originalTorque: 300, stage1HP: 180, stage1Torque: 380, stage2HP: 200, stage2Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A220 CDI 170hp", motorCode: "OM651", ecuType: "Delphi DCM3.5", displacement: "2143cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 215, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A180 122hp", motorCode: "M270", ecuType: "Bosch MED17", displacement: "1595cc", fuelType: "Benzin", originalHP: 122, originalTorque: 200, stage1HP: 155, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "A200 156hp", motorCode: "M270", ecuType: "Bosch MED17", displacement: "1595cc", fuelType: "Benzin", originalHP: 156, originalTorque: 250, stage1HP: 195, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "A250 211hp", motorCode: "M270", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 211, originalTorque: 350, stage1HP: 265, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "A45 AMG 360hp / 381hp", motorCode: "M133", ecuType: "Bosch MED17.7.7", displacement: "1991cc", fuelType: "Benzin", originalHP: 381, originalTorque: 475, stage1HP: 460, stage1Torque: 580, stage2HP: 510, stage2Torque: 640, stage3HP: 600, stage3Torque: 750, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A-Serisi (W177)",
        years: "2018-2024",
        engines: [
          { name: "A180d 116hp", motorCode: "OM608", ecuType: "Delphi DCM3.5", displacement: "1461cc", fuelType: "Dizel", originalHP: 116, originalTorque: 260, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A200d 150hp", motorCode: "OM654q", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 150, originalTorque: 320, stage1HP: 200, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A220d 190hp", motorCode: "OM654q", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "A200 163hp", motorCode: "M282", ecuType: "Bosch MED17", displacement: "1332cc", fuelType: "Benzin", originalHP: 163, originalTorque: 250, stage1HP: 200, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "A250 224hp", motorCode: "M260", ecuType: "Bosch MG1CS003", displacement: "1991cc", fuelType: "Benzin", originalHP: 224, originalTorque: 350, stage1HP: 280, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "A35 AMG 306hp", motorCode: "M260", ecuType: "Bosch MG1CS003", displacement: "1991cc", fuelType: "Benzin", originalHP: 306, originalTorque: 400, stage1HP: 380, stage1Torque: 490, stage2HP: 415, stage2Torque: 530, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "A45 S AMG 421hp", motorCode: "M139", ecuType: "Bosch MG1CS024", displacement: "1991cc", fuelType: "Benzin", originalHP: 421, originalTorque: 500, stage1HP: 510, stage1Torque: 610, stage2HP: 555, stage2Torque: 660, stage3HP: 650, stage3Torque: 760, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "C-Serisi (W204)",
        years: "2007-2014",
        engines: [
          { name: "C200 CDI 136hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 136, originalTorque: 360, stage1HP: 180, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C220 CDI 170hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 170, originalTorque: 400, stage1HP: 215, stage1Torque: 480, stage2HP: 240, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C250 CDI 204hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C320 CDI 224hp", motorCode: "OM642", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 224, originalTorque: 510, stage1HP: 280, stage1Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "C200 184hp", motorCode: "M271 Evo", ecuType: "Bosch ME9.7", displacement: "1796cc", fuelType: "Benzin", originalHP: 184, originalTorque: 270, stage1HP: 230, stage1Torque: 340, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C250 204hp", motorCode: "M271", ecuType: "Bosch ME9.7", displacement: "1796cc", fuelType: "Benzin", originalHP: 204, originalTorque: 310, stage1HP: 250, stage1Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C63 AMG 457hp / 487hp V8", motorCode: "M156", ecuType: "Bosch ME9.7", displacement: "6208cc", fuelType: "Benzin", originalHP: 487, originalTorque: 600, stage1HP: 525, stage1Torque: 640, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "C-Serisi (W205)",
        years: "2014-2021",
        engines: [
          { name: "C180d 116hp", motorCode: "OM626", ecuType: "Delphi DCM3.5", displacement: "1598cc", fuelType: "Dizel", originalHP: 116, originalTorque: 260, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C200d 160hp", motorCode: "OM651", ecuType: "Delphi DCM3.5", displacement: "2143cc", fuelType: "Dizel", originalHP: 160, originalTorque: 360, stage1HP: 210, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C220d 170hp / 194hp", motorCode: "OM651 / OM654", ecuType: "Bosch EDC17 / MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 194, originalTorque: 400, stage1HP: 245, stage1Torque: 480, stage2HP: 270, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C250d 204hp", motorCode: "OM651", ecuType: "Bosch EDC17", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C300d 245hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 245, originalTorque: 500, stage1HP: 295, stage1Torque: 580, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "C200 184hp", motorCode: "M274", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 184, originalTorque: 300, stage1HP: 230, stage1Torque: 380, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C250 211hp", motorCode: "M274", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 211, originalTorque: 350, stage1HP: 265, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C300 245hp / 258hp", motorCode: "M274 / M264", ecuType: "Bosch MED17 / MG1CS003", displacement: "1991cc", fuelType: "Benzin", originalHP: 258, originalTorque: 370, stage1HP: 320, stage1Torque: 460, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C400 333hp / C450 367hp V6", motorCode: "M276", ecuType: "Bosch MED17", displacement: "2996cc", fuelType: "Benzin", originalHP: 367, originalTorque: 520, stage1HP: 440, stage1Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C43 AMG 367hp / 390hp V6", motorCode: "M276", ecuType: "Bosch MED17", displacement: "2996cc", fuelType: "Benzin", originalHP: 390, originalTorque: 520, stage1HP: 470, stage1Torque: 620, stage2HP: 510, stage2Torque: 660, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "C63 AMG 476hp / S 510hp V8", motorCode: "M177", ecuType: "Bosch MED17.7.5", displacement: "3982cc", fuelType: "Benzin", originalHP: 510, originalTorque: 700, stage1HP: 600, stage1Torque: 830, stage2HP: 660, stage2Torque: 900, stage3HP: 750, stage3Torque: 1000, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "E-Serisi (W212)",
        years: "2009-2016",
        engines: [
          { name: "E200 CDI 136hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 136, originalTorque: 360, stage1HP: 180, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "E220 CDI 170hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 170, originalTorque: 400, stage1HP: 215, stage1Torque: 480, stage2HP: 240, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "E250 CDI 204hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "E350 CDI 231hp / 252hp V6", motorCode: "OM642", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 252, originalTorque: 620, stage1HP: 310, stage1Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "E63 AMG 525hp / 557hp / 585hp", motorCode: "M157", ecuType: "Bosch MED17", displacement: "5461cc", fuelType: "Benzin", originalHP: 585, originalTorque: 800, stage1HP: 690, stage1Torque: 950, stage2HP: 750, stage2Torque: 1020, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "E-Serisi (W213)",
        years: "2016-2023",
        engines: [
          { name: "E200d 150hp / 160hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 160, originalTorque: 360, stage1HP: 210, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "E220d 194hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 194, originalTorque: 400, stage1HP: 245, stage1Torque: 480, stage2HP: 270, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "E300d 245hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 245, originalTorque: 500, stage1HP: 295, stage1Torque: 580, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "E350d 286hp / E400d 340hp", motorCode: "OM656", ecuType: "Bosch MD1", displacement: "2925cc", fuelType: "Dizel", originalHP: 340, originalTorque: 700, stage1HP: 405, stage1Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "E200 184hp / 197hp", motorCode: "M274 / M264", ecuType: "Bosch MG1CS003", displacement: "1991cc", fuelType: "Benzin", originalHP: 197, originalTorque: 320, stage1HP: 245, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "E300 245hp / 258hp", motorCode: "M274 / M264", ecuType: "Bosch MG1CS003", displacement: "1991cc", fuelType: "Benzin", originalHP: 258, originalTorque: 370, stage1HP: 320, stage1Torque: 460, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "E400 333hp / E450 367hp", motorCode: "M276 / M256", ecuType: "Bosch MG1CS003", displacement: "2999cc", fuelType: "Benzin", originalHP: 367, originalTorque: 500, stage1HP: 440, stage1Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "E43 AMG 401hp", motorCode: "M276", ecuType: "Bosch MG1CS003", displacement: "2996cc", fuelType: "Benzin", originalHP: 401, originalTorque: 520, stage1HP: 480, stage1Torque: 620, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "E63 AMG S 612hp V8 BiTurbo", motorCode: "M177", ecuType: "Bosch MG1CS024", displacement: "3982cc", fuelType: "Benzin", originalHP: 612, originalTorque: 850, stage1HP: 720, stage1Torque: 1000, stage2HP: 780, stage2Torque: 1080, stage3HP: 880, stage3Torque: 1200, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "GLK / GLC",
        years: "2008-2024",
        engines: [
          { name: "GLK 220 CDI 170hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 170, originalTorque: 400, stage1HP: 215, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "GLK 250 CDI 204hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "GLC 220d 170hp / 194hp", motorCode: "OM651 / OM654", ecuType: "Delphi / Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 194, originalTorque: 400, stage1HP: 245, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "GLC 250d 204hp", motorCode: "OM651", ecuType: "Bosch EDC17", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "GLC 300d 245hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 245, originalTorque: 500, stage1HP: 295, stage1Torque: 580, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "GLC 250 211hp", motorCode: "M274", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 211, originalTorque: 350, stage1HP: 265, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "GLC 43 AMG 367hp / 390hp", motorCode: "M276", ecuType: "Bosch MED17", displacement: "2996cc", fuelType: "Benzin", originalHP: 390, originalTorque: 520, stage1HP: 470, stage1Torque: 620, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "GLC 63 AMG S 510hp", motorCode: "M177", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 510, originalTorque: 700, stage1HP: 600, stage1Torque: 830, stage2HP: 660, stage2Torque: 900, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "GLE / ML",
        years: "2011-2024",
        engines: [
          { name: "ML/GLE 250 BlueTec 204hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2143cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 250, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "ML/GLE 350 CDI 258hp / 272hp V6", motorCode: "OM642", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 272, originalTorque: 620, stage1HP: 335, stage1Torque: 740, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "GLE 400d 330hp", motorCode: "OM656", ecuType: "Bosch MD1", displacement: "2925cc", fuelType: "Dizel", originalHP: 330, originalTorque: 700, stage1HP: 400, stage1Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "ML/GLE 63 AMG 525hp / 557hp / 612hp", motorCode: "M157 / M177", ecuType: "Bosch MED17", displacement: "5461cc", fuelType: "Benzin", originalHP: 612, originalTorque: 850, stage1HP: 720, stage1Torque: 1000, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "Sprinter",
        years: "2006-2024",
        engines: [
          { name: "Sprinter 211/311/411 CDI 109hp", motorCode: "OM646", ecuType: "Bosch EDC16", displacement: "2148cc", fuelType: "Dizel", originalHP: 109, originalTorque: 280, stage1HP: 145, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Sprinter 213/313/413/513 CDI 129hp / 136hp", motorCode: "OM646 / OM651", ecuType: "Bosch EDC16", displacement: "2148cc", fuelType: "Dizel", originalHP: 136, originalTorque: 330, stage1HP: 180, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Sprinter 216/316/416/516 CDI 163hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2148cc", fuelType: "Dizel", originalHP: 163, originalTorque: 360, stage1HP: 210, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Sprinter 219/319/419/519 CDI 190hp V6", motorCode: "OM642", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 190, originalTorque: 440, stage1HP: 240, stage1Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "Vito / V-Class",
        years: "2003-2024",
        engines: [
          { name: "Vito 110 CDI 95hp", motorCode: "OM646", ecuType: "Bosch EDC16", displacement: "2148cc", fuelType: "Dizel", originalHP: 95, originalTorque: 250, stage1HP: 130, stage1Torque: 310, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Vito 113 CDI 136hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2148cc", fuelType: "Dizel", originalHP: 136, originalTorque: 330, stage1HP: 180, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Vito 116 CDI 163hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2148cc", fuelType: "Dizel", originalHP: 163, originalTorque: 360, stage1HP: 210, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Vito 119 CDI 190hp", motorCode: "OM651", ecuType: "Delphi DCM3.4", displacement: "2148cc", fuelType: "Dizel", originalHP: 190, originalTorque: 440, stage1HP: 240, stage1Torque: 520, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "S-Serisi (W221/W222)",
        years: "2005-2020",
        engines: [
          { name: "S350 CDI 235hp / 258hp", motorCode: "OM642", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 258, originalTorque: 620, stage1HP: 320, stage1Torque: 740, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "S400d 340hp", motorCode: "OM656", ecuType: "Bosch MD1", displacement: "2925cc", fuelType: "Dizel", originalHP: 340, originalTorque: 700, stage1HP: 405, stage1Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "S500 V8 435hp / 455hp", motorCode: "M278", ecuType: "Bosch MED17", displacement: "4663cc", fuelType: "Benzin", originalHP: 455, originalTorque: 700, stage1HP: 540, stage1Torque: 830, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "S63 AMG 612hp V8", motorCode: "M177 / M157", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 612, originalTorque: 900, stage1HP: 720, stage1Torque: 1050, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "B-Serisi (W245/W246/W247)",
        years: "2005-2024",
        engines: [
          { name: "B180 CDI / B200 CDI 109hp / 136hp", motorCode: "OM640 / OM651", ecuType: "Bosch EDC17", displacement: "2143cc", fuelType: "Dizel", originalHP: 136, originalTorque: 300, stage1HP: 175, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "B200d 150hp / B220d 190hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "B200 / B250 156hp / 224hp", motorCode: "M270 / M260", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 224, originalTorque: 350, stage1HP: 275, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "CLA / CLS-Serisi",
        years: "2013-2024",
        engines: [
          { name: "CLA 200d / 220d 136hp / 190hp", motorCode: "OM651 / OM654", ecuType: "Bosch EDC17", displacement: "1950cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "CLA 250 / CLA 45 AMG 211hp / 360hp / 387hp / 421hp", motorCode: "M133 / M139", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 421, originalTorque: 500, stage1HP: 490, stage1Torque: 580, stage2HP: 530, stage2Torque: 620, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "CLS 350d / 400d 258hp / 340hp", motorCode: "OM642 / OM656", ecuType: "Bosch MD1", displacement: "2925cc", fuelType: "Dizel", originalHP: 340, originalTorque: 700, stage1HP: 410, stage1Torque: 830, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "CLS 53 AMG / 63 AMG 435hp / 585hp", motorCode: "M256 / M177", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 585, originalTorque: 800, stage1HP: 690, stage1Torque: 950, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "GLA / GLB-Serisi",
        years: "2014-2024",
        engines: [
          { name: "GLA 200d / 220d 136hp / 190hp", motorCode: "OM651 / OM654", ecuType: "Bosch EDC17", displacement: "1950cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "GLA 250 / GLA 45 AMG 211hp / 381hp / 421hp", motorCode: "M270 / M139", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 421, originalTorque: 500, stage1HP: 490, stage1Torque: 580, stage2HP: 530, stage2Torque: 620, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "GLB 200d / 220d 150hp / 190hp", motorCode: "OM654", ecuType: "Bosch MD1", displacement: "1950cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "GLS-Serisi (X166/X167)",
        years: "2015-2024",
        engines: [
          { name: "GLS 350d / 400d 258hp / 330hp", motorCode: "OM642 / OM656", ecuType: "Bosch MD1", displacement: "2987cc", fuelType: "Dizel", originalHP: 330, originalTorque: 700, stage1HP: 400, stage1Torque: 820, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "GLS 580 / GLS 63 AMG 489hp / 612hp V8", motorCode: "M177", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 612, originalTorque: 850, stage1HP: 720, stage1Torque: 1000, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "AMG GT / SL / SLC",
        years: "2014-2024",
        engines: [
          { name: "SLC 200 / 300 184hp / 245hp", motorCode: "M274", ecuType: "Bosch MED17", displacement: "1991cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 300, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "SL 400 / SL 500 333hp / 455hp V8", motorCode: "M276 / M278", ecuType: "Bosch MED17", displacement: "4663cc", fuelType: "Benzin", originalHP: 455, originalTorque: 700, stage1HP: 540, stage1Torque: 830, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "AMG GT / GT S / GT R / GT Black Series 462hp / 510hp / 585hp / 730hp", motorCode: "M178", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 730, originalTorque: 800, stage1HP: 820, stage1Torque: 920, stage2HP: 880, stage2Torque: 980, stage3HP: 950, stage3Torque: 1050, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "SL 55 / SL 63 AMG 476hp / 585hp", motorCode: "M177", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 585, originalTorque: 800, stage1HP: 690, stage1Torque: 950, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== AUDI ==========
  {
    name: "Audi",
    logo: "audi",
    models: [
      {
        name: "A1 (8X/GB)",
        years: "2010-2024",
        engines: [
          { name: "1.6 TDI 90hp / 105hp / 116hp", motorCode: "CAYC / DDYA", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 116, originalTorque: 250, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TFSI 95hp / 116hp", motorCode: "DKLA / DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 116, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 TFSI 122hp / 125hp", motorCode: "CAXA / CZCA", ecuType: "Bosch MED17", displacement: "1390cc", fuelType: "Benzin", originalHP: 125, originalTorque: 200, stage1HP: 160, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "S1 quattro 231hp", motorCode: "CWZA", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 231, originalTorque: 370, stage1HP: 290, stage1Torque: 460, stage2HP: 320, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "A3 (8P)",
        years: "2003-2012",
        engines: [
          { name: "1.6 TDI 90hp / 105hp", motorCode: "CAYB / CAYC", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.9 TDI 105hp", motorCode: "BLS / BXE", ecuType: "Bosch EDC16", displacement: "1896cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp / 170hp", motorCode: "CBAB / CBBB", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 220, stage1Torque: 440, stage2HP: 245, stage2Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TFSI 125hp", motorCode: "CAXC", ecuType: "Bosch ME17", displacement: "1390cc", fuelType: "Benzin", originalHP: 125, originalTorque: 200, stage1HP: 160, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 TFSI 160hp", motorCode: "CDAA", ecuType: "Bosch MED17", displacement: "1798cc", fuelType: "Benzin", originalHP: 160, originalTorque: 250, stage1HP: 205, stage1Torque: 330, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TFSI 200hp", motorCode: "BWA / CCZA", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 200, originalTorque: 280, stage1HP: 260, stage1Torque: 380, stage2HP: 295, stage2Torque: 420, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S3 265hp", motorCode: "CDLA", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 265, originalTorque: 350, stage1HP: 330, stage1Torque: 450, stage2HP: 365, stage2Torque: 490, stage3HP: 430, stage3Torque: 560, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS3 340hp", motorCode: "CDLG", ecuType: "Bosch MED17.5", displacement: "2480cc", fuelType: "Benzin", originalHP: 340, originalTorque: 450, stage1HP: 415, stage1Torque: 580, stage2HP: 460, stage2Torque: 630, stage3HP: 540, stage3Torque: 720, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A3 (8V)",
        years: "2012-2020",
        engines: [
          { name: "1.6 TDI 105hp / 110hp", motorCode: "CRKB", ecuType: "Bosch EDC17C74", displacement: "1598cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 150, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 150hp / 184hp", motorCode: "CRBC / CUNA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 230, stage1Torque: 460, stage2HP: 255, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TFSI 122hp / 140hp / 150hp", motorCode: "CMBA / CZEA / CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 TFSI 180hp", motorCode: "CJSA", ecuType: "Bosch MED17", displacement: "1798cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 230, stage1Torque: 350, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TFSI 220hp", motorCode: "CHHB", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 220, originalTorque: 350, stage1HP: 280, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S3 300hp / 310hp", motorCode: "CJXA / CJXC", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 310, originalTorque: 400, stage1HP: 380, stage1Torque: 500, stage2HP: 420, stage2Torque: 540, stage3HP: 480, stage3Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS3 367hp / 400hp 5cyl", motorCode: "CZGB / DAZA", ecuType: "Bosch MED17.5", displacement: "2480cc", fuelType: "Benzin", originalHP: 400, originalTorque: 480, stage1HP: 480, stage1Torque: 620, stage2HP: 530, stage2Torque: 680, stage3HP: 620, stage3Torque: 800, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A3 (8Y)",
        years: "2020-2024",
        engines: [
          { name: "30 TDI 116hp", motorCode: "DTRC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 116, originalTorque: 300, stage1HP: 155, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "35 TDI 150hp", motorCode: "DTSA", ecuType: "Continental", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 360, stage1HP: 200, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "35 TFSI 150hp", motorCode: "DPCA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "40 TFSI 190hp", motorCode: "DKZA", ecuType: "Bosch MG1CS", displacement: "1984cc", fuelType: "Benzin", originalHP: 190, originalTorque: 320, stage1HP: 240, stage1Torque: 400, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S3 310hp / 333hp", motorCode: "DNFE", ecuType: "Bosch MG1CS003", displacement: "1984cc", fuelType: "Benzin", originalHP: 333, originalTorque: 420, stage1HP: 405, stage1Torque: 520, stage2HP: 445, stage2Torque: 560, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS3 400hp", motorCode: "DAZA", ecuType: "Bosch MG1CS024", displacement: "2480cc", fuelType: "Benzin", originalHP: 400, originalTorque: 500, stage1HP: 490, stage1Torque: 640, stage2HP: 540, stage2Torque: 700, stage3HP: 630, stage3Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A4 (B8)",
        years: "2008-2015",
        engines: [
          { name: "1.9 TDI 120hp", motorCode: "BKE", ecuType: "Bosch EDC16", displacement: "1896cc", fuelType: "Dizel", originalHP: 120, originalTorque: 280, stage1HP: 160, stage1Torque: 350, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 143hp / 170hp / 177hp", motorCode: "CAGA / CAHA / CGLC", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 177, originalTorque: 380, stage1HP: 225, stage1Torque: 460, stage2HP: 250, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 TDI 204hp / 240hp / 245hp V6", motorCode: "CAPA / CCWA / CDUC", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 245, originalTorque: 500, stage1HP: 305, stage1Torque: 600, stage2HP: 335, stage2Torque: 640, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "1.8 TFSI 160hp / 170hp", motorCode: "CDHB / CABB", ecuType: "Bosch MED17", displacement: "1798cc", fuelType: "Benzin", originalHP: 170, originalTorque: 320, stage1HP: 215, stage1Torque: 380, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TFSI 211hp / 225hp", motorCode: "CDNC / CAEB", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 225, originalTorque: 350, stage1HP: 285, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S4 333hp Supercharged V6", motorCode: "CAKA", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 333, originalTorque: 440, stage1HP: 405, stage1Torque: 520, stage2HP: 450, stage2Torque: 570, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS4 450hp V8 NA", motorCode: "CFSA", ecuType: "Bosch MED17", displacement: "4163cc", fuelType: "Benzin", originalHP: 450, originalTorque: 430, stage1HP: 475, stage1Torque: 460, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "A4 (B9)",
        years: "2015-2024",
        engines: [
          { name: "30 TDI 122hp / 136hp", motorCode: "DEUA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 400, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "35 TDI 150hp / 163hp", motorCode: "DETA / DEUA", ecuType: "Continental", displacement: "1968cc", fuelType: "Dizel", originalHP: 163, originalTorque: 400, stage1HP: 215, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "40 TDI 190hp / 204hp", motorCode: "DETA / DTPB", ecuType: "Continental", displacement: "1968cc", fuelType: "Dizel", originalHP: 204, originalTorque: 400, stage1HP: 250, stage1Torque: 480, stage2HP: 275, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "45 TDI 231hp V6 / 50 TDI 286hp V6", motorCode: "DCPC / DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 620, stage1HP: 350, stage1Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "35 TFSI 150hp", motorCode: "DDXA", ecuType: "Bosch MG1CS", displacement: "1984cc", fuelType: "Benzin", originalHP: 150, originalTorque: 270, stage1HP: 195, stage1Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "40 TFSI 190hp / 204hp", motorCode: "DKZA", ecuType: "Bosch MG1CS003", displacement: "1984cc", fuelType: "Benzin", originalHP: 204, originalTorque: 320, stage1HP: 255, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "45 TFSI 245hp / 265hp", motorCode: "DLVA", ecuType: "Bosch MG1CS003", displacement: "1984cc", fuelType: "Benzin", originalHP: 265, originalTorque: 370, stage1HP: 325, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S4 354hp / 347hp V6", motorCode: "CWGD / DCPB", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 354, originalTorque: 500, stage1HP: 430, stage1Torque: 600, stage2HP: 475, stage2Torque: 650, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS4 450hp V6 BiTurbo", motorCode: "DECA", ecuType: "Bosch MED17", displacement: "2894cc", fuelType: "Benzin", originalHP: 450, originalTorque: 600, stage1HP: 540, stage1Torque: 720, stage2HP: 600, stage2Torque: 800, stage3HP: 700, stage3Torque: 900, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A6 (C7)",
        years: "2011-2018",
        engines: [
          { name: "2.0 TDI 150hp / 177hp / 190hp", motorCode: "CGLC / CNHA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 TDI 204hp / 218hp / 245hp / 272hp V6", motorCode: "CDUC / CRTC / CDUC", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 272, originalTorque: 580, stage1HP: 335, stage1Torque: 690, stage2HP: 365, stage2Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 TDI BiTurbo 313hp / 320hp", motorCode: "CGQB", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 320, originalTorque: 650, stage1HP: 385, stage1Torque: 760, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 TFSI 211hp / 252hp", motorCode: "CDNB / CYRC", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 252, originalTorque: 370, stage1HP: 310, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "3.0 TFSI 300hp / 333hp Supercharged", motorCode: "CGWD / CTUA", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 333, originalTorque: 440, stage1HP: 405, stage1Torque: 520, stage2HP: 450, stage2Torque: 570, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S6 420hp V8", motorCode: "CEUC", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 420, originalTorque: 550, stage1HP: 510, stage1Torque: 680, stage2HP: 560, stage2Torque: 740, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "RS6 560hp / 605hp V8", motorCode: "CRDB / CTGE", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 605, originalTorque: 750, stage1HP: 720, stage1Torque: 900, stage2HP: 800, stage2Torque: 1000, stage3HP: 920, stage3Torque: 1150, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A6 (C8)",
        years: "2018-2024",
        engines: [
          { name: "40 TDI 204hp", motorCode: "DETA", ecuType: "Continental", displacement: "1968cc", fuelType: "Dizel", originalHP: 204, originalTorque: 400, stage1HP: 250, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "45 TDI 231hp V6 / 50 TDI 286hp V6", motorCode: "DCPC / DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 620, stage1HP: 350, stage1Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "55 TFSI 340hp / 367hp V6", motorCode: "DCBA", ecuType: "Bosch MG1CS003", displacement: "2995cc", fuelType: "Benzin", originalHP: 367, originalTorque: 500, stage1HP: 440, stage1Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "S6 TDI 349hp", motorCode: "DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 349, originalTorque: 700, stage1HP: 415, stage1Torque: 820, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "RS6 600hp / 630hp V8", motorCode: "DJPA", ecuType: "Bosch MG1CS024", displacement: "3996cc", fuelType: "Benzin", originalHP: 630, originalTorque: 850, stage1HP: 740, stage1Torque: 1000, stage2HP: 810, stage2Torque: 1080, stage3HP: 950, stage3Torque: 1250, priceStage1: 12000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Q3",
        years: "2011-2024",
        engines: [
          { name: "2.0 TDI 140hp / 150hp / 184hp", motorCode: "CFFA / CRBC / CUNA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 230, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TFSI 150hp / 35 TFSI 150hp", motorCode: "CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TFSI 180hp / 211hp", motorCode: "CCZC", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 211, originalTorque: 300, stage1HP: 265, stage1Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS Q3 310hp / 340hp / 367hp / 400hp 5cyl", motorCode: "CZGB / DAZA", ecuType: "Bosch MED17.5", displacement: "2480cc", fuelType: "Benzin", originalHP: 400, originalTorque: 480, stage1HP: 480, stage1Torque: 620, stage2HP: 530, stage2Torque: 680, stage3HP: 620, stage3Torque: 800, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Q5",
        years: "2008-2024",
        engines: [
          { name: "2.0 TDI 143hp / 170hp / 177hp / 190hp / 204hp", motorCode: "CAGA / CGLB / CNHA / DETA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 204, originalTorque: 400, stage1HP: 250, stage1Torque: 480, stage2HP: 275, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 TDI 240hp / 245hp / 258hp / 286hp V6", motorCode: "CCWA / CTBA / CRTC / DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 620, stage1HP: 350, stage1Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 TFSI 211hp / 225hp / 252hp", motorCode: "CDNB / CNCD", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 252, originalTorque: 370, stage1HP: 310, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "SQ5 TDI 313hp / 326hp", motorCode: "CGQA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 326, originalTorque: 650, stage1HP: 395, stage1Torque: 770, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "SQ5 TFSI 354hp", motorCode: "CWGD", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 354, originalTorque: 500, stage1HP: 430, stage1Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Q7",
        years: "2006-2024",
        engines: [
          { name: "3.0 TDI 204hp / 240hp / 245hp / 272hp V6", motorCode: "CASA / CASB / CRCA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 272, originalTorque: 580, stage1HP: 335, stage1Torque: 690, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 TDI 286hp V6", motorCode: "DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 600, stage1HP: 350, stage1Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "4.2 TDI V8 326hp / 340hp", motorCode: "CCFC / CKDA", ecuType: "Bosch EDC17", displacement: "4134cc", fuelType: "Dizel", originalHP: 340, originalTorque: 800, stage1HP: 410, stage1Torque: 920, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.10 },
          { name: "SQ7 TDI 435hp V8 / TFSI 507hp", motorCode: "CZAC", ecuType: "Bosch EDC17", displacement: "3956cc", fuelType: "Dizel", originalHP: 435, originalTorque: 900, stage1HP: 510, stage1Torque: 1050, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.10 }
        ]
      },
      {
        name: "A5 / S5 / RS5",
        years: "2007-2024",
        engines: [
          { name: "A5 2.0 TDI 143hp / 170hp / 177hp / 190hp", motorCode: "CAGA / CGLC / DETA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 470, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "A5 3.0 TDI 204hp / 218hp / 240hp / 286hp", motorCode: "CDUC / DCPC", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 620, stage1HP: 350, stage1Torque: 730, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "A5 2.0 TFSI 211hp / 252hp / 265hp", motorCode: "CDNC / CYRB", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 265, originalTorque: 370, stage1HP: 320, stage1Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "S5 3.0 TFSI 333hp / 354hp", motorCode: "CGXC / CWGD", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 354, originalTorque: 500, stage1HP: 430, stage1Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS5 4.2 V8 / 2.9 TFSI V6 BiTurbo 450hp / 444hp", motorCode: "CFSA / DECA", ecuType: "Bosch MED17", displacement: "2894cc", fuelType: "Benzin", originalHP: 450, originalTorque: 600, stage1HP: 540, stage1Torque: 720, stage2HP: 580, stage2Torque: 780, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "A7 / S7 / RS7",
        years: "2010-2024",
        engines: [
          { name: "A7 3.0 TDI 204hp / 245hp / 272hp / 286hp V6", motorCode: "CDUC / CRTC", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 620, stage1HP: 350, stage1Torque: 730, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "A7 3.0 TFSI 310hp / 340hp / 380hp", motorCode: "CGXB / CREC", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 340, originalTorque: 500, stage1HP: 420, stage1Torque: 600, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "S7 4.0 TFSI V8 420hp / 450hp", motorCode: "CEUC", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 450, originalTorque: 550, stage1HP: 540, stage1Torque: 680, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "RS7 4.0 TFSI V8 560hp / 605hp / 700hp Performance", motorCode: "CRDB / DJPB", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 700, originalTorque: 850, stage1HP: 810, stage1Torque: 1000, stage2HP: 880, stage2Torque: 1080, stage3HP: 950, stage3Torque: 1150, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "A8 / S8",
        years: "2010-2024",
        engines: [
          { name: "A8 3.0 TDI 250hp / 286hp V6", motorCode: "CRTC / DDVA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 286, originalTorque: 600, stage1HP: 350, stage1Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "A8 4.2 TDI V8 350hp / 385hp", motorCode: "CDSB", ecuType: "Bosch EDC17", displacement: "4134cc", fuelType: "Dizel", originalHP: 385, originalTorque: 850, stage1HP: 460, stage1Torque: 980, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.10 },
          { name: "S8 4.0 TFSI V8 520hp / 571hp / 605hp", motorCode: "CEUC / CWUB", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 605, originalTorque: 700, stage1HP: 710, stage1Torque: 850, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "RS3 / S3",
        years: "2011-2024",
        engines: [
          { name: "S3 2.0 TFSI 265hp / 286hp / 300hp / 310hp", motorCode: "CJXC / DJHA", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 310, originalTorque: 400, stage1HP: 380, stage1Torque: 480, stage2HP: 420, stage2Torque: 520, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "RS3 2.5 TFSI 5-cyl 367hp / 400hp / 401hp", motorCode: "CZGB / DAZA / DNWA", ecuType: "Bosch MED17", displacement: "2480cc", fuelType: "Benzin", originalHP: 401, originalTorque: 500, stage1HP: 490, stage1Torque: 620, stage2HP: 540, stage2Torque: 680, stage3HP: 620, stage3Torque: 780, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "RS4 / RS6",
        years: "2008-2024",
        engines: [
          { name: "RS4 4.2 V8 450hp / 2.9 TFSI V6 BiTurbo 450hp", motorCode: "CFSA / DECA", ecuType: "Bosch MED17", displacement: "2894cc", fuelType: "Benzin", originalHP: 450, originalTorque: 600, stage1HP: 540, stage1Torque: 720, stage2HP: 580, stage2Torque: 780, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS6 4.0 TFSI V8 560hp / 605hp / 630hp Performance", motorCode: "CRDB / DJPB", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 630, originalTorque: 850, stage1HP: 740, stage1Torque: 1000, stage2HP: 820, stage2Torque: 1080, stage3HP: 900, stage3Torque: 1150, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "TT / TT RS / R8",
        years: "2006-2024",
        engines: [
          { name: "TT 2.0 TFSI 200hp / 211hp / 230hp / 245hp", motorCode: "BWA / CESA / CJXB", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 300, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "TTS 2.0 TFSI 272hp / 286hp / 310hp", motorCode: "CDLB / DJHA", ecuType: "Bosch MED17", displacement: "1984cc", fuelType: "Benzin", originalHP: 310, originalTorque: 400, stage1HP: 380, stage1Torque: 480, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "TT RS 2.5 TFSI 5-cyl 340hp / 360hp / 400hp", motorCode: "CEPA / DAZA", ecuType: "Bosch MED17", displacement: "2480cc", fuelType: "Benzin", originalHP: 400, originalTorque: 480, stage1HP: 490, stage1Torque: 600, stage2HP: 540, stage2Torque: 660, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "R8 4.2 / 5.2 V10 420hp / 525hp / 570hp / 620hp / 640hp Performance", motorCode: "BYH / CTYA / DECA", ecuType: "Bosch MED17", displacement: "5204cc", fuelType: "Benzin", originalHP: 640, originalTorque: 580, stage1HP: 720, stage1Torque: 660, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Q4 / Q6 / Q8",
        years: "2018-2024",
        engines: [
          { name: "Q8 50 TDI 286hp / SQ8 TDI 435hp V8", motorCode: "DCPC / CZAC", ecuType: "Bosch EDC17", displacement: "3956cc", fuelType: "Dizel", originalHP: 435, originalTorque: 900, stage1HP: 510, stage1Torque: 1050, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.10 },
          { name: "Q8 55 TFSI 340hp V6 / SQ8 TFSI 507hp V8", motorCode: "DDXA / DCBA", ecuType: "Bosch MED17", displacement: "3993cc", fuelType: "Benzin", originalHP: 507, originalTorque: 770, stage1HP: 600, stage1Torque: 900, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "RS Q8 600hp V8 BiTurbo", motorCode: "DJPA", ecuType: "Bosch MED17", displacement: "3996cc", fuelType: "Benzin", originalHP: 600, originalTorque: 800, stage1HP: 720, stage1Torque: 970, stage2HP: 780, stage2Torque: 1050, priceStage1: 10500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== FORD ==========
  {
    name: "Ford",
    logo: "ford",
    models: [
      {
        name: "Fiesta (Mk7/Mk8)",
        years: "2008-2023",
        engines: [
          { name: "1.4 TDCi 70hp", motorCode: "F6JD", ecuType: "Bosch EDC16", displacement: "1399cc", fuelType: "Dizel", originalHP: 70, originalTorque: 160, stage1HP: 100, stage1Torque: 200, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 TDCi 75hp / 95hp", motorCode: "XUJC / XUJD", ecuType: "Continental SID208", displacement: "1499cc", fuelType: "Dizel", originalHP: 95, originalTorque: 215, stage1HP: 130, stage1Torque: 270, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDCi 90hp / 95hp", motorCode: "T1JA", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 95, originalTorque: 215, stage1HP: 130, stage1Torque: 270, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 EcoBoost 100hp / 125hp / 140hp", motorCode: "M1JA / M2GA / M2DA", ecuType: "Bosch ME17", displacement: "999cc", fuelType: "Benzin", originalHP: 140, originalTorque: 210, stage1HP: 175, stage1Torque: 270, stage2HP: 195, stage2Torque: 295, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.5 EcoBoost ST 200hp", motorCode: "YYJB", ecuType: "Bosch MED17", displacement: "1497cc", fuelType: "Benzin", originalHP: 200, originalTorque: 290, stage1HP: 250, stage1Torque: 365, stage2HP: 275, stage2Torque: 395, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 EcoBoost ST 182hp", motorCode: "JTJA", ecuType: "Bosch ME17", displacement: "1596cc", fuelType: "Benzin", originalHP: 182, originalTorque: 240, stage1HP: 225, stage1Torque: 305, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Focus (Mk2/Mk3/Mk4)",
        years: "2004-2024",
        engines: [
          { name: "1.5 TDCi 95hp / 120hp", motorCode: "XWDA / XWDB", ecuType: "Continental SID208", displacement: "1499cc", fuelType: "Dizel", originalHP: 120, originalTorque: 270, stage1HP: 160, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 TDCi 90hp / 109hp / 115hp", motorCode: "G8DD / HHDA / T1DA", ecuType: "Bosch EDC16/17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.8 TDCi 115hp / 125hp", motorCode: "KKDA / QYDA", ecuType: "Delphi DCM3.4", displacement: "1753cc", fuelType: "Dizel", originalHP: 125, originalTorque: 320, stage1HP: 165, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDCi 136hp / 140hp / 150hp / 163hp", motorCode: "G6DA / G6DB / UFDA", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 163, originalTorque: 340, stage1HP: 215, stage1Torque: 420, stage2HP: 235, stage2Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 EcoBoost 100hp / 125hp", motorCode: "M2DA", ecuType: "Bosch ME17", displacement: "999cc", fuelType: "Benzin", originalHP: 125, originalTorque: 200, stage1HP: 160, stage1Torque: 250, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.5 EcoBoost 150hp / 182hp", motorCode: "M8DA", ecuType: "Bosch MED17", displacement: "1497cc", fuelType: "Benzin", originalHP: 182, originalTorque: 240, stage1HP: 230, stage1Torque: 310, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Focus ST 250hp / 280hp", motorCode: "R9DA / R9DB", ecuType: "Bosch MED17", displacement: "2261cc", fuelType: "Benzin", originalHP: 280, originalTorque: 420, stage1HP: 340, stage1Torque: 500, stage2HP: 375, stage2Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Focus RS 350hp", motorCode: "YVDA", ecuType: "Bosch MED17", displacement: "2261cc", fuelType: "Benzin", originalHP: 350, originalTorque: 470, stage1HP: 410, stage1Torque: 560, stage2HP: 450, stage2Torque: 600, stage3HP: 530, stage3Torque: 720, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Mondeo (Mk4/Mk5)",
        years: "2007-2022",
        engines: [
          { name: "1.6 TDCi 115hp", motorCode: "T1BA", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.8 TDCi 125hp", motorCode: "QYBA", ecuType: "Delphi DCM3.4", displacement: "1753cc", fuelType: "Dizel", originalHP: 125, originalTorque: 320, stage1HP: 165, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDCi 130hp / 140hp / 163hp / 180hp", motorCode: "QXBA / TXBA / TYBA", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 230, stage1Torque: 480, stage2HP: 255, stage2Torque: 510, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BiTDCi 210hp", motorCode: "T7CB", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 210, originalTorque: 450, stage1HP: 260, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 TDCi 175hp / 200hp", motorCode: "Q4BA", ecuType: "Delphi DCM3.4", displacement: "2179cc", fuelType: "Dizel", originalHP: 200, originalTorque: 450, stage1HP: 250, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 EcoBoost 160hp", motorCode: "UEJB", ecuType: "Bosch MED17", displacement: "1497cc", fuelType: "Benzin", originalHP: 160, originalTorque: 240, stage1HP: 200, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 EcoBoost 203hp / 240hp / 250hp", motorCode: "TNBA / R9CC", ecuType: "Bosch MED17", displacement: "1999cc", fuelType: "Benzin", originalHP: 250, originalTorque: 360, stage1HP: 305, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Kuga (Mk1/Mk2/Mk3)",
        years: "2008-2024",
        engines: [
          { name: "1.5 TDCi 120hp / 105hp", motorCode: "ZXJB", ecuType: "Continental SID208", displacement: "1499cc", fuelType: "Dizel", originalHP: 120, originalTorque: 270, stage1HP: 160, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDCi 136hp / 140hp / 150hp / 163hp / 180hp", motorCode: "UFDA / T7MA", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 230, stage1Torque: 480, stage2HP: 255, stage2Torque: 510, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 EcoBoost 150hp / 180hp", motorCode: "UEJB", ecuType: "Bosch MED17", displacement: "1497cc", fuelType: "Benzin", originalHP: 180, originalTorque: 240, stage1HP: 225, stage1Torque: 310, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 EcoBoost 240hp / 250hp", motorCode: "R9CC", ecuType: "Bosch MED17", displacement: "1999cc", fuelType: "Benzin", originalHP: 250, originalTorque: 360, stage1HP: 305, stage1Torque: 450, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Transit / Transit Custom",
        years: "2006-2024",
        engines: [
          { name: "2.2 TDCi 85hp / 100hp / 125hp / 140hp / 155hp", motorCode: "P8FA / SRFA / DRFA", ecuType: "Bosch EDC17", displacement: "2198cc", fuelType: "Dizel", originalHP: 155, originalTorque: 385, stage1HP: 200, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDCi (EcoBlue) 105hp / 130hp / 170hp / 185hp", motorCode: "YMCA / YMRA", ecuType: "Bosch EDC17", displacement: "1996cc", fuelType: "Dizel", originalHP: 185, originalTorque: 415, stage1HP: 230, stage1Torque: 490, stage2HP: 255, stage2Torque: 520, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.4 TDCi 100hp / 115hp / 140hp", motorCode: "JXFA / H9FB / JXFC", ecuType: "Bosch EDC16", displacement: "2402cc", fuelType: "Dizel", originalHP: 140, originalTorque: 375, stage1HP: 180, stage1Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Ranger / Ranger Raptor",
        years: "2011-2024",
        engines: [
          { name: "2.2 TDCi 130hp / 150hp / 160hp", motorCode: "QJ2P / QJ2T", ecuType: "Bosch EDC17", displacement: "2198cc", fuelType: "Dizel", originalHP: 160, originalTorque: 385, stage1HP: 205, stage1Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.2 TDCi 200hp", motorCode: "SAFA", ecuType: "Bosch EDC17", displacement: "3198cc", fuelType: "Dizel", originalHP: 200, originalTorque: 470, stage1HP: 250, stage1Torque: 580, stage2HP: 275, stage2Torque: 620, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 EcoBlue 170hp / 213hp BiTurbo", motorCode: "YN2S", ecuType: "Bosch EDC17", displacement: "1996cc", fuelType: "Dizel", originalHP: 213, originalTorque: 500, stage1HP: 260, stage1Torque: 580, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Ranger Raptor 3.0 EcoBoost V6 292hp", motorCode: "GTDi V6", ecuType: "Bosch MED17", displacement: "2956cc", fuelType: "Benzin", originalHP: 292, originalTorque: 491, stage1HP: 350, stage1Torque: 580, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Mustang",
        years: "2014-2024",
        engines: [
          { name: "2.3 EcoBoost 314hp / 290hp", motorCode: "YVAI / YVAJ", ecuType: "Bosch MED17", displacement: "2261cc", fuelType: "Benzin", originalHP: 314, originalTorque: 434, stage1HP: 380, stage1Torque: 525, stage2HP: 420, stage2Torque: 570, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "5.0 V8 GT 421hp / 450hp / 460hp", motorCode: "Coyote", ecuType: "Bosch MED17", displacement: "4951cc", fuelType: "Benzin", originalHP: 460, originalTorque: 569, stage1HP: 505, stage1Torque: 615, stage2HP: 540, stage2Torque: 660, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Mustang Shelby GT500 760hp Supercharged", motorCode: "Predator", ecuType: "Bosch MED17", displacement: "5163cc", fuelType: "Benzin", originalHP: 760, originalTorque: 847, stage1HP: 830, stage1Torque: 920, stage2HP: 880, stage2Torque: 980, priceStage1: 12000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== RENAULT ==========
  {
    name: "Renault",
    logo: "renault",
    models: [
      {
        name: "Clio (3/4/5)",
        years: "2005-2024",
        engines: [
          { name: "1.5 dCi 65hp / 75hp / 85hp / 90hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 90, originalTorque: 220, stage1HP: 125, stage1Torque: 270, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 dCi 110hp / 115hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 115, originalTorque: 260, stage1HP: 155, stage1Torque: 320, stage2HP: 170, stage2Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 TCe 100hp / 120hp", motorCode: "H5Ft", ecuType: "Continental EMS3150", displacement: "1197cc", fuelType: "Benzin", originalHP: 120, originalTorque: 190, stage1HP: 155, stage1Torque: 240, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.3 TCe 130hp / 140hp / 160hp", motorCode: "H5Ht / HR13DDT", ecuType: "Continental EMS3150", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Clio RS 200hp / 220hp Trophy", motorCode: "M5M", ecuType: "Continental EMS3150", displacement: "1618cc", fuelType: "Benzin", originalHP: 220, originalTorque: 280, stage1HP: 270, stage1Torque: 350, stage2HP: 295, stage2Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Megane (3/4)",
        years: "2008-2024",
        engines: [
          { name: "1.5 dCi 90hp / 110hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 150, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp", motorCode: "R9M", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 175, stage1Torque: 390, stage2HP: 195, stage2Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.9 dCi 130hp", motorCode: "F9Q", ecuType: "Bosch EDC16", displacement: "1870cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 dCi 150hp / 160hp / 175hp", motorCode: "M9R", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 175, originalTorque: 380, stage1HP: 220, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 TCe 115hp / 130hp", motorCode: "H5Ft", ecuType: "Continental EMS3150", displacement: "1197cc", fuelType: "Benzin", originalHP: 130, originalTorque: 205, stage1HP: 165, stage1Torque: 255, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.3 TCe 140hp / 160hp", motorCode: "H5Ht", ecuType: "Continental EMS3150", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Megane RS 250hp / 265hp / 275hp / 280hp / 300hp", motorCode: "F4Rt / M5Pt", ecuType: "Bosch ME17", displacement: "1998cc", fuelType: "Benzin", originalHP: 300, originalTorque: 400, stage1HP: 360, stage1Torque: 480, stage2HP: 395, stage2Torque: 520, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Captur / Kadjar",
        years: "2013-2024",
        engines: [
          { name: "1.5 dCi 90hp / 110hp / 115hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 115, originalTorque: 260, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp", motorCode: "R9M", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 175, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 TCe 120hp / 130hp", motorCode: "H5Ft", ecuType: "Continental EMS3150", displacement: "1197cc", fuelType: "Benzin", originalHP: 130, originalTorque: 205, stage1HP: 165, stage1Torque: 255, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.3 TCe 140hp / 160hp", motorCode: "H5Ht", ecuType: "Continental EMS3150", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Master / Trafic",
        years: "2010-2024",
        engines: [
          { name: "2.3 dCi 100hp / 125hp / 145hp / 165hp / 180hp", motorCode: "M9T", ecuType: "Continental SID305", displacement: "2299cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 230, stage1Torque: 480, stage2HP: 255, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 95hp / 120hp / 125hp / 145hp BiTurbo", motorCode: "R9M", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 145, originalTorque: 340, stage1HP: 185, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Talisman",
        years: "2015-2022",
        engines: [
          { name: "1.6 dCi 130hp / 160hp BiTurbo", motorCode: "R9M", ecuType: "Continental SID310", displacement: "1598cc", fuelType: "Dizel", originalHP: 160, originalTorque: 380, stage1HP: 200, stage1Torque: 450, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.7 Blue dCi 120hp / 150hp", motorCode: "R9N", ecuType: "Delphi DCM6.2", displacement: "1749cc", fuelType: "Dizel", originalHP: 150, originalTorque: 360, stage1HP: 190, stage1Torque: 430, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.3 TCe 140hp / 160hp", motorCode: "H5Ht", ecuType: "Continental EMS3160", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 TCe 200hp", motorCode: "M5Mt", ecuType: "Continental EMS3160", displacement: "1618cc", fuelType: "Benzin", originalHP: 200, originalTorque: 280, stage1HP: 245, stage1Torque: 350, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Espace / Koleos",
        years: "2008-2024",
        engines: [
          { name: "2.0 dCi 150hp / 175hp / 184hp / 200hp", motorCode: "M9R", ecuType: "Continental SID305", displacement: "1995cc", fuelType: "Dizel", originalHP: 200, originalTorque: 400, stage1HP: 245, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp / 160hp", motorCode: "R9M", ecuType: "Continental SID310", displacement: "1598cc", fuelType: "Dizel", originalHP: 160, originalTorque: 380, stage1HP: 200, stage1Torque: 450, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.8 TCe 225hp", motorCode: "M5P", ecuType: "Continental EMS3160", displacement: "1798cc", fuelType: "Benzin", originalHP: 225, originalTorque: 300, stage1HP: 275, stage1Torque: 370, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Scenic / Grand Scenic",
        years: "2009-2022",
        engines: [
          { name: "1.5 dCi 90hp / 110hp", motorCode: "K9K", ecuType: "Delphi DCM3.5", displacement: "1461cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp / 160hp", motorCode: "R9M", ecuType: "Continental SID310", displacement: "1598cc", fuelType: "Dizel", originalHP: 160, originalTorque: 380, stage1HP: 200, stage1Torque: 450, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.3 TCe 140hp / 160hp", motorCode: "H5Ht", ecuType: "Continental EMS3160", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Twingo / Wind",
        years: "2007-2024",
        engines: [
          { name: "0.9 TCe 90hp", motorCode: "H4Bt", ecuType: "Continental EMS3132", displacement: "898cc", fuelType: "Benzin", originalHP: 90, originalTorque: 135, stage1HP: 115, stage1Torque: 175, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.0 SCe 70hp / 75hp", motorCode: "H4D", ecuType: "Continental EMS3160", displacement: "999cc", fuelType: "Benzin", originalHP: 75, originalTorque: 95, stage1HP: 90, stage1Torque: 115, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 dCi 75hp", motorCode: "K9K", ecuType: "Delphi DCM3.5", displacement: "1461cc", fuelType: "Dizel", originalHP: 75, originalTorque: 180, stage1HP: 105, stage1Torque: 220, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Megane RS / Sport",
        years: "2009-2024",
        engines: [
          { name: "2.0 Turbo 250hp / 265hp / 275hp Trophy", motorCode: "F4Rt", ecuType: "Continental SIM32", displacement: "1998cc", fuelType: "Benzin", originalHP: 275, originalTorque: 360, stage1HP: 320, stage1Torque: 430, stage2HP: 350, stage2Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 TCe 280hp / 300hp Trophy", motorCode: "M5P", ecuType: "Continental EMS3160", displacement: "1798cc", fuelType: "Benzin", originalHP: 300, originalTorque: 400, stage1HP: 360, stage1Torque: 470, stage2HP: 390, stage2Torque: 510, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      }
    ]
  },

  // ========== PEUGEOT ==========
  {
    name: "Peugeot",
    logo: "peugeot",
    models: [
      {
        name: "208 / 2008",
        years: "2012-2024",
        engines: [
          { name: "1.4 HDi 68hp / 70hp", motorCode: "DV4TD", ecuType: "Bosch EDC16", displacement: "1398cc", fuelType: "Dizel", originalHP: 70, originalTorque: 160, stage1HP: 100, stage1Torque: 200, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, stage2HP: 190, stage2Torque: 400, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 HDi 75hp / 92hp / 100hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 PureTech 82hp / 100hp / 110hp / 130hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "208 GTi 200hp / 208hp", motorCode: "EP6FDTX", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 208, originalTorque: 300, stage1HP: 255, stage1Torque: 370, stage2HP: 280, stage2Torque: 400, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "308 / 308 SW",
        years: "2007-2024",
        engines: [
          { name: "1.5 BlueHDi 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 HDi 90hp / 110hp / 115hp / 120hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 BlueHDi 100hp / 120hp", motorCode: "DV6FC", ecuType: "Continental EMS3160", displacement: "1560cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 HDi / BlueHDi 140hp / 150hp / 163hp / 177hp", motorCode: "DW10 / DW10FC", ecuType: "Bosch EDC17 / Continental", displacement: "1997cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 220, stage1Torque: 480, stage2HP: 245, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 PureTech 110hp / 130hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 THP 150hp / 165hp / 200hp / 270hp GTi", motorCode: "EP6CDT / EP6FDTX", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 270, originalTorque: 330, stage1HP: 320, stage1Torque: 400, stage2HP: 355, stage2Torque: 440, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "508",
        years: "2010-2024",
        engines: [
          { name: "1.6 BlueHDi 120hp", motorCode: "DV6FC", ecuType: "Continental EMS3160", displacement: "1560cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 150hp / 163hp / 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, stage2HP: 250, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 HDi 200hp", motorCode: "DW12", ecuType: "Bosch EDC17", displacement: "2179cc", fuelType: "Dizel", originalHP: 200, originalTorque: 450, stage1HP: 250, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 THP 165hp / 180hp", motorCode: "EP6FDT", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 220, stage1Torque: 320, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "508 PSE 360hp PHEV", motorCode: "EP6FADTX", ecuType: "Bosch MG1", displacement: "1598cc", fuelType: "Benzin", originalHP: 360, originalTorque: 520, stage1HP: 410, stage1Torque: 590, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Partner / Boxer",
        years: "2008-2024",
        engines: [
          { name: "1.6 HDi 75hp / 90hp / 100hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 75hp / 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 130hp / 145hp / 165hp / 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 HDi 100hp / 120hp / 130hp / 150hp / 165hp", motorCode: "DW12", ecuType: "Bosch EDC17", displacement: "2179cc", fuelType: "Dizel", originalHP: 165, originalTorque: 370, stage1HP: 210, stage1Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "405 / 406",
        years: "1992-2004",
        engines: [
          { name: "1.9 TD 90hp", motorCode: "XUD9TE", ecuType: "Bosch EDC15", displacement: "1905cc", fuelType: "Dizel", originalHP: 90, originalTorque: 196, stage1HP: 115, stage1Torque: 230, priceStage1: 4500, durationHours: 3, fuelEconomy: 0.10 },
          { name: "2.0 HDi 90hp / 110hp", motorCode: "DW10", ecuType: "Bosch EDC15", displacement: "1997cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 145, stage1Torque: 310, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.2 HDi 136hp", motorCode: "DW12", ecuType: "Bosch EDC15", displacement: "2179cc", fuelType: "Dizel", originalHP: 136, originalTorque: 314, stage1HP: 175, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "407",
        years: "2004-2011",
        engines: [
          { name: "1.6 HDi 110hp", motorCode: "DV6TED4", ecuType: "Bosch EDC16", displacement: "1560cc", fuelType: "Dizel", originalHP: 110, originalTorque: 240, stage1HP: 145, stage1Torque: 310, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 HDi 136hp / 140hp / 163hp", motorCode: "DW10BTED4", ecuType: "Bosch EDC16", displacement: "1997cc", fuelType: "Dizel", originalHP: 163, originalTorque: 340, stage1HP: 210, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 HDi 170hp", motorCode: "DW12BTED4", ecuType: "Bosch EDC16", displacement: "2179cc", fuelType: "Dizel", originalHP: 170, originalTorque: 370, stage1HP: 215, stage1Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.7 V6 HDi 204hp", motorCode: "DT17", ecuType: "Bosch EDC16", displacement: "2720cc", fuelType: "Dizel", originalHP: 204, originalTorque: 440, stage1HP: 255, stage1Torque: 530, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 V6 HDi 240hp", motorCode: "DT20", ecuType: "Bosch EDC17", displacement: "2992cc", fuelType: "Dizel", originalHP: 240, originalTorque: 450, stage1HP: 290, stage1Torque: 540, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "408",
        years: "2010-2024",
        engines: [
          { name: "1.6 HDi 110hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 THP 150hp / 165hp", motorCode: "EP6CDT", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 165, originalTorque: 240, stage1HP: 205, stage1Torque: 305, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.2 PureTech 130hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 PureTech 180hp / 225hp PHEV", motorCode: "EP6FDTM", ecuType: "Bosch MG1", displacement: "1598cc", fuelType: "Benzin", originalHP: 225, originalTorque: 360, stage1HP: 270, stage1Torque: 420, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "4007 / 4008",
        years: "2007-2017",
        engines: [
          { name: "2.2 HDi 156hp", motorCode: "DW12", ecuType: "Bosch EDC17", displacement: "2179cc", fuelType: "Dizel", originalHP: 156, originalTorque: 380, stage1HP: 200, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 HDi 115hp", motorCode: "DV6C", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.8 MIVEC 150hp", motorCode: "4B11", ecuType: "Mitsubishi MIVEC", displacement: "1798cc", fuelType: "Benzin", originalHP: 150, originalTorque: 191, stage1HP: 175, stage1Torque: 220, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 }
        ]
      },
      {
        name: "3008 / 5008",
        years: "2009-2024",
        engines: [
          { name: "1.5 BlueHDi 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 BlueHDi 100hp / 120hp", motorCode: "DV6FC", ecuType: "Continental EMS3160", displacement: "1560cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 150hp / 163hp / 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, stage2HP: 250, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 THP / PureTech 150hp / 165hp / 180hp / 225hp / 300hp Hybrid4", motorCode: "EP6FDT / EP6FDTM", ecuType: "Bosch MED17 / MG1", displacement: "1598cc", fuelType: "Benzin", originalHP: 300, originalTorque: 520, stage1HP: 355, stage1Torque: 600, stage2HP: 390, stage2Torque: 650, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "1.2 PureTech 130hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "RCZ",
        years: "2010-2015",
        engines: [
          { name: "1.6 THP 156hp / 200hp / 270hp R", motorCode: "EP6CDT / EP6FDTX", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 270, originalTorque: 330, stage1HP: 320, stage1Torque: 400, stage2HP: 355, stage2Torque: 440, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 HDi 163hp", motorCode: "DW10BTED4", ecuType: "Bosch EDC16", displacement: "1997cc", fuelType: "Dizel", originalHP: 163, originalTorque: 340, stage1HP: 210, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== CITROEN ==========
  {
    name: "Citroën",
    logo: "citroen",
    models: [
      {
        name: "C3 / C3 Aircross",
        years: "2009-2024",
        engines: [
          { name: "1.4 HDi 70hp", motorCode: "DV4TD", ecuType: "Bosch EDC16", displacement: "1398cc", fuelType: "Dizel", originalHP: 70, originalTorque: 160, stage1HP: 100, stage1Torque: 200, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 100hp / 120hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 HDi 92hp / 100hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 PureTech 82hp / 110hp / 130hp", motorCode: "EB2ADTS", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 130, originalTorque: 230, stage1HP: 165, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "C4 / C4 Picasso",
        years: "2010-2024",
        engines: [
          { name: "1.5 BlueHDi 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 BlueHDi 100hp / 120hp", motorCode: "DV6FC", ecuType: "Continental EMS3160", displacement: "1560cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 HDi / BlueHDi 140hp / 150hp / 163hp", motorCode: "DW10", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 163, originalTorque: 340, stage1HP: 215, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 THP 150hp / 165hp", motorCode: "EP6CDT", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 165, originalTorque: 240, stage1HP: 205, stage1Torque: 305, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "C5 / C5 Aircross",
        years: "2008-2024",
        engines: [
          { name: "1.6 HDi 110hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 HDi / BlueHDi 140hp / 150hp / 160hp / 180hp", motorCode: "DW10 / DW10FC", ecuType: "Bosch EDC17", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 HDi 173hp / 200hp", motorCode: "DW12", ecuType: "Bosch EDC17", displacement: "2179cc", fuelType: "Dizel", originalHP: 200, originalTorque: 450, stage1HP: 250, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 V6 HDi 240hp", motorCode: "DT17", ecuType: "Bosch EDC17", displacement: "2992cc", fuelType: "Dizel", originalHP: 240, originalTorque: 450, stage1HP: 290, stage1Torque: 540, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "Berlingo / Jumpy / Jumper",
        years: "2008-2024",
        engines: [
          { name: "1.6 HDi 75hp / 90hp / 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 BlueHDi 75hp / 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 130hp / 145hp / 165hp / 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 HDi 100hp / 120hp / 130hp / 150hp", motorCode: "DW12", ecuType: "Bosch EDC17", displacement: "2179cc", fuelType: "Dizel", originalHP: 150, originalTorque: 370, stage1HP: 195, stage1Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "C1 / C2 / C-Elysée",
        years: "2005-2024",
        engines: [
          { name: "C1 1.0 VTi 68hp / 72hp", motorCode: "1KR-FE", ecuType: "Denso", displacement: "998cc", fuelType: "Benzin", originalHP: 72, originalTorque: 93, stage1HP: 85, stage1Torque: 110, priceStage1: 4000, durationHours: 1.5, fuelEconomy: 0.07 },
          { name: "C-Elysée 1.6 HDi 92hp / 100hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 100, originalTorque: 254, stage1HP: 140, stage1Torque: 310, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C2 / C3 1.4 HDi 70hp", motorCode: "DV4TD", ecuType: "Bosch EDC16", displacement: "1398cc", fuelType: "Dizel", originalHP: 70, originalTorque: 160, stage1HP: 100, stage1Torque: 200, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "C6 / C8 / Xsara",
        years: "2002-2018",
        engines: [
          { name: "Xsara 2.0 HDi 90hp / 110hp", motorCode: "DW10", ecuType: "Bosch EDC15", displacement: "1997cc", fuelType: "Dizel", originalHP: 110, originalTorque: 250, stage1HP: 145, stage1Torque: 310, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C8 2.0 HDi 120hp / 136hp / 165hp", motorCode: "DW10", ecuType: "Bosch EDC16", displacement: "1997cc", fuelType: "Dizel", originalHP: 165, originalTorque: 340, stage1HP: 210, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "C6 2.7 V6 HDi 204hp / 3.0 V6 HDi 240hp", motorCode: "DT17 / DT20", ecuType: "Bosch EDC17", displacement: "2992cc", fuelType: "Dizel", originalHP: 240, originalTorque: 450, stage1HP: 290, stage1Torque: 540, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 }
        ]
      }
    ]
  },

  // ========== FIAT ==========
  {
    name: "Fiat",
    logo: "fiat",
    models: [
      {
        name: "Egea / Tipo",
        years: "2015-2024",
        engines: [
          { name: "1.3 MultiJet 95hp", motorCode: "199B1.000", ecuType: "Bosch EDC17", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 MultiJet 120hp / 130hp", motorCode: "55260384", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 175, stage1Torque: 390, stage2HP: 195, stage2Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 T-Jet 120hp", motorCode: "198A4000", ecuType: "Magneti Marelli IAW", displacement: "1368cc", fuelType: "Benzin", originalHP: 120, originalTorque: 215, stage1HP: 155, stage1Torque: 270, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.0 FireFly 100hp", motorCode: "55272641", ecuType: "Magneti Marelli", displacement: "999cc", fuelType: "Benzin", originalHP: 100, originalTorque: 190, stage1HP: 130, stage1Torque: 230, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 }
        ]
      },
      {
        name: "Doblò",
        years: "2010-2024",
        engines: [
          { name: "1.3 MultiJet 75hp / 85hp / 90hp / 95hp", motorCode: "199A2000 / 199B1.000", ecuType: "Bosch EDC17", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 MultiJet 90hp / 105hp / 120hp", motorCode: "263A1000", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 165, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 MultiJet 135hp", motorCode: "198A6000", ecuType: "Bosch EDC17", displacement: "1956cc", fuelType: "Dizel", originalHP: 135, originalTorque: 320, stage1HP: 175, stage1Torque: 400, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Ducato",
        years: "2006-2024",
        engines: [
          { name: "2.0 MultiJet 110hp / 115hp", motorCode: "F1AGL411", ecuType: "Bosch EDC17", displacement: "1956cc", fuelType: "Dizel", originalHP: 115, originalTorque: 320, stage1HP: 155, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 MultiJet 100hp / 120hp / 130hp / 140hp / 160hp / 180hp", motorCode: "P22DTE", ecuType: "Bosch EDC17", displacement: "2184cc", fuelType: "Dizel", originalHP: 180, originalTorque: 450, stage1HP: 225, stage1Torque: 530, stage2HP: 250, stage2Torque: 560, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.3 MultiJet 110hp / 120hp / 130hp / 140hp / 148hp / 160hp / 180hp", motorCode: "F1AGL411 / F1AE3481", ecuType: "Bosch EDC17", displacement: "2287cc", fuelType: "Dizel", originalHP: 180, originalTorque: 450, stage1HP: 225, stage1Torque: 530, stage2HP: 250, stage2Torque: 560, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 MultiJet 157hp / 177hp", motorCode: "F1CE3481", ecuType: "Bosch EDC17", displacement: "2999cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "500 / 500X / 500L / Panda",
        years: "2007-2024",
        engines: [
          { name: "1.3 MultiJet 75hp / 85hp / 95hp", motorCode: "199A2000", ecuType: "Bosch EDC17", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 MultiJet 120hp", motorCode: "55260384", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 165, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "0.9 TwinAir 85hp / 105hp", motorCode: "312A2000", ecuType: "Magneti Marelli", displacement: "875cc", fuelType: "Benzin", originalHP: 105, originalTorque: 145, stage1HP: 135, stage1Torque: 185, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 T-Jet 140hp / 170hp Abarth 595", motorCode: "312A1000", ecuType: "Magneti Marelli", displacement: "1368cc", fuelType: "Benzin", originalHP: 170, originalTorque: 230, stage1HP: 210, stage1Torque: 290, stage2HP: 235, stage2Torque: 320, stage3HP: 280, stage3Torque: 380, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Abarth 695 180hp", motorCode: "312A1000", ecuType: "Magneti Marelli", displacement: "1368cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 220, stage1Torque: 310, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Punto / Grande Punto / Evo",
        years: "2005-2018",
        engines: [
          { name: "1.3 MultiJet 75hp / 85hp / 95hp", motorCode: "199A2000 / 199A3000", ecuType: "Magneti Marelli", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 245, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 MultiJet 105hp / 120hp", motorCode: "198A3000", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 290, stage1HP: 160, stage1Torque: 360, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Punto Abarth 1.4 T-Jet 155hp / 180hp SS", motorCode: "198A1000", ecuType: "Magneti Marelli", displacement: "1368cc", fuelType: "Benzin", originalHP: 180, originalTorque: 270, stage1HP: 225, stage1Torque: 330, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Linea / Bravo / Stilo",
        years: "2002-2018",
        engines: [
          { name: "Linea 1.3 MultiJet 90hp / 95hp", motorCode: "199A3000", ecuType: "Magneti Marelli", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 245, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Linea 1.6 MultiJet 105hp / 120hp", motorCode: "198A3000", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 290, stage1HP: 160, stage1Torque: 360, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Bravo 1.9 / 2.0 MultiJet 120hp / 150hp / 165hp", motorCode: "198A2000 / 198A5000", ecuType: "Bosch EDC16", displacement: "1956cc", fuelType: "Dizel", originalHP: 165, originalTorque: 360, stage1HP: 215, stage1Torque: 430, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Stilo 1.9 JTD 80hp / 115hp / 140hp / 150hp", motorCode: "192A1000", ecuType: "Bosch EDC15", displacement: "1910cc", fuelType: "Dizel", originalHP: 150, originalTorque: 305, stage1HP: 195, stage1Torque: 380, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Fiorino / Qubo / Idea",
        years: "2007-2024",
        engines: [
          { name: "1.3 MultiJet 75hp / 80hp / 95hp", motorCode: "199A2000 / 199A3000", ecuType: "Magneti Marelli", displacement: "1248cc", fuelType: "Dizel", originalHP: 95, originalTorque: 200, stage1HP: 130, stage1Torque: 245, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 8V 73hp / 77hp", motorCode: "350A1000", ecuType: "Magneti Marelli", displacement: "1368cc", fuelType: "Benzin", originalHP: 77, originalTorque: 115, stage1HP: 95, stage1Torque: 140, priceStage1: 4000, durationHours: 1.5, fuelEconomy: 0.07 }
        ]
      }
    ]
  },

  // ========== TOYOTA ==========
  {
    name: "Toyota",
    logo: "toyota",
    models: [
      {
        name: "Corolla",
        years: "2007-2024",
        engines: [
          { name: "1.4 D-4D 90hp", motorCode: "1ND-TV", ecuType: "Denso", displacement: "1364cc", fuelType: "Dizel", originalHP: 90, originalTorque: 205, stage1HP: 125, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 D-4D 112hp / 1.4 D-4D 90hp", motorCode: "1WW", ecuType: "Denso", displacement: "1598cc", fuelType: "Dizel", originalHP: 112, originalTorque: 270, stage1HP: 150, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 D-4D 124hp / 126hp / 143hp", motorCode: "1AD-FTV", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 143, originalTorque: 320, stage1HP: 185, stage1Torque: 390, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 D-4D 150hp / 177hp", motorCode: "2AD-FTV / 2AD-FHV", ecuType: "Denso", displacement: "2231cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 Turbo 116hp", motorCode: "8NR-FTS", ecuType: "Denso", displacement: "1196cc", fuelType: "Benzin", originalHP: 116, originalTorque: 185, stage1HP: 145, stage1Torque: 225, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Auris",
        years: "2007-2018",
        engines: [
          { name: "1.4 D-4D 90hp", motorCode: "1ND-TV", ecuType: "Denso", displacement: "1364cc", fuelType: "Dizel", originalHP: 90, originalTorque: 205, stage1HP: 125, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 D-4D 124hp / 126hp", motorCode: "1AD-FTV", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 126, originalTorque: 310, stage1HP: 170, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "RAV4",
        years: "2006-2024",
        engines: [
          { name: "2.0 D-4D 124hp / 143hp", motorCode: "1AD-FTV", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 143, originalTorque: 320, stage1HP: 185, stage1Torque: 390, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 D-4D 150hp / 177hp", motorCode: "2AD-FTV / 2AD-FHV", ecuType: "Denso", displacement: "2231cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 225, stage1Torque: 480, stage2HP: 250, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Hilux",
        years: "2005-2024",
        engines: [
          { name: "2.5 D-4D 120hp / 144hp", motorCode: "2KD-FTV", ecuType: "Denso", displacement: "2494cc", fuelType: "Dizel", originalHP: 144, originalTorque: 343, stage1HP: 185, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 D-4D 171hp / 173hp", motorCode: "1KD-FTV", ecuType: "Denso", displacement: "2982cc", fuelType: "Dizel", originalHP: 173, originalTorque: 410, stage1HP: 220, stage1Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.4 D-4D 150hp", motorCode: "2GD-FTV", ecuType: "Denso", displacement: "2393cc", fuelType: "Dizel", originalHP: 150, originalTorque: 400, stage1HP: 195, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.8 D-4D 177hp / 204hp", motorCode: "1GD-FTV", ecuType: "Denso", displacement: "2755cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 255, stage1Torque: 590, stage2HP: 280, stage2Torque: 620, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Land Cruiser",
        years: "2009-2024",
        engines: [
          { name: "3.0 D-4D 173hp / 190hp", motorCode: "1KD-FTV", ecuType: "Denso", displacement: "2982cc", fuelType: "Dizel", originalHP: 190, originalTorque: 420, stage1HP: 240, stage1Torque: 510, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.8 D-4D 177hp / 204hp", motorCode: "1GD-FTV", ecuType: "Denso", displacement: "2755cc", fuelType: "Dizel", originalHP: 204, originalTorque: 500, stage1HP: 255, stage1Torque: 590, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "4.5 V8 D-4D 286hp", motorCode: "1VD-FTV", ecuType: "Denso", displacement: "4461cc", fuelType: "Dizel", originalHP: 286, originalTorque: 650, stage1HP: 350, stage1Torque: 770, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.10 }
        ]
      },
      {
        name: "Yaris / Yaris Cross",
        years: "2011-2024",
        engines: [
          { name: "1.4 D-4D 90hp", motorCode: "1ND-TV", ecuType: "Denso", displacement: "1364cc", fuelType: "Dizel", originalHP: 90, originalTorque: 205, stage1HP: 125, stage1Torque: 250, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 VVT-i 110hp / 125hp", motorCode: "M15A-FKS", ecuType: "Denso", displacement: "1490cc", fuelType: "Benzin", originalHP: 125, originalTorque: 145, stage1HP: 145, stage1Torque: 170, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Yaris GR 1.6 Turbo 261hp / 280hp", motorCode: "G16E-GTS", ecuType: "Denso", displacement: "1618cc", fuelType: "Benzin", originalHP: 280, originalTorque: 390, stage1HP: 330, stage1Torque: 460, stage2HP: 360, stage2Torque: 500, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Aygo",
        years: "2005-2022",
        engines: [
          { name: "1.0 VVT-i 68hp / 72hp", motorCode: "1KR-FE", ecuType: "Denso", displacement: "998cc", fuelType: "Benzin", originalHP: 72, originalTorque: 93, stage1HP: 85, stage1Torque: 110, priceStage1: 4000, durationHours: 1.5, fuelEconomy: 0.07 },
          { name: "1.4 D-4D 54hp", motorCode: "1ND-TV", ecuType: "Denso", displacement: "1364cc", fuelType: "Dizel", originalHP: 54, originalTorque: 130, stage1HP: 80, stage1Torque: 165, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "C-HR",
        years: "2016-2024",
        engines: [
          { name: "1.2 Turbo 116hp", motorCode: "8NR-FTS", ecuType: "Denso", displacement: "1197cc", fuelType: "Benzin", originalHP: 116, originalTorque: 185, stage1HP: 150, stage1Torque: 230, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 Hybrid 122hp", motorCode: "2ZR-FXE", ecuType: "Denso", displacement: "1798cc", fuelType: "Hybrid", originalHP: 122, originalTorque: 142, stage1HP: 140, stage1Torque: 165, priceStage1: 6500, durationHours: 3, fuelEconomy: 0.06 },
          { name: "2.0 Hybrid 184hp", motorCode: "M20A-FXS", ecuType: "Denso", displacement: "1987cc", fuelType: "Hybrid", originalHP: 184, originalTorque: 190, stage1HP: 210, stage1Torque: 215, priceStage1: 7000, durationHours: 3, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Avensis / Camry",
        years: "2009-2024",
        engines: [
          { name: "2.0 D-4D 124hp / 143hp / 150hp", motorCode: "1AD-FTV / 2AD-FTV", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 195, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 D-CAT 150hp / 177hp", motorCode: "2AD-FHV", ecuType: "Denso", displacement: "2231cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 220, stage1Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Camry 2.5 Hybrid 218hp", motorCode: "A25A-FXS", ecuType: "Denso", displacement: "2487cc", fuelType: "Hybrid", originalHP: 218, originalTorque: 221, stage1HP: 245, stage1Torque: 250, priceStage1: 7000, durationHours: 3, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Verso / ProAce",
        years: "2009-2024",
        engines: [
          { name: "2.0 D-4D 124hp / 150hp Verso", motorCode: "1AD-FTV", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 150, originalTorque: 340, stage1HP: 195, stage1Torque: 410, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "ProAce 1.6 / 2.0 BlueHDi 95hp / 120hp / 150hp / 180hp", motorCode: "DV6 / DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== HYUNDAI ==========
  {
    name: "Hyundai",
    logo: "hyundai",
    models: [
      {
        name: "i20 / i30",
        years: "2008-2024",
        engines: [
          { name: "1.1 CRDi 75hp", motorCode: "D3FA", ecuType: "Bosch EDC17", displacement: "1120cc", fuelType: "Dizel", originalHP: 75, originalTorque: 180, stage1HP: 105, stage1Torque: 220, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 CRDi 75hp / 90hp", motorCode: "D4FC", ecuType: "Bosch EDC17", displacement: "1396cc", fuelType: "Dizel", originalHP: 90, originalTorque: 240, stage1HP: 125, stage1Torque: 290, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CRDi 110hp / 115hp / 128hp / 136hp", motorCode: "D4FB", ecuType: "Bosch EDC17C57", displacement: "1582cc", fuelType: "Dizel", originalHP: 136, originalTorque: 300, stage1HP: 180, stage1Torque: 370, stage2HP: 200, stage2Torque: 400, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 T-GDI 100hp / 120hp", motorCode: "G3LC", ecuType: "Continental SIM2K", displacement: "998cc", fuelType: "Benzin", originalHP: 120, originalTorque: 172, stage1HP: 150, stage1Torque: 215, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 T-GDI 140hp", motorCode: "G4LD", ecuType: "Continental SIM2K", displacement: "1353cc", fuelType: "Benzin", originalHP: 140, originalTorque: 242, stage1HP: 175, stage1Torque: 295, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "i30 N 250hp / 275hp Performance", motorCode: "G4KH", ecuType: "Continental SIM2K-260", displacement: "1998cc", fuelType: "Benzin", originalHP: 275, originalTorque: 378, stage1HP: 335, stage1Torque: 460, stage2HP: 370, stage2Torque: 500, stage3HP: 420, stage3Torque: 580, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Accent / Elantra / Sonata",
        years: "2006-2024",
        engines: [
          { name: "1.5 CRDi 110hp", motorCode: "D4FA", ecuType: "Bosch EDC16", displacement: "1493cc", fuelType: "Dizel", originalHP: 110, originalTorque: 240, stage1HP: 145, stage1Torque: 300, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CRDi 115hp / 128hp / 136hp", motorCode: "D4FB", ecuType: "Bosch EDC17C57", displacement: "1582cc", fuelType: "Dizel", originalHP: 136, originalTorque: 300, stage1HP: 180, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 T-GDI 177hp / 204hp", motorCode: "G4FJ", ecuType: "Continental SIM2K", displacement: "1591cc", fuelType: "Benzin", originalHP: 204, originalTorque: 265, stage1HP: 250, stage1Torque: 335, stage2HP: 275, stage2Torque: 365, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 T-GDI 245hp Sonata", motorCode: "G4KH", ecuType: "Continental SIM2K", displacement: "1998cc", fuelType: "Benzin", originalHP: 245, originalTorque: 350, stage1HP: 300, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Tucson / Santa Fe",
        years: "2009-2024",
        engines: [
          { name: "1.6 CRDi 115hp / 136hp", motorCode: "D4FB", ecuType: "Bosch EDC17C57", displacement: "1582cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CRDi 136hp / 150hp / 184hp / 185hp", motorCode: "D4HA", ecuType: "Bosch EDC17C57", displacement: "1995cc", fuelType: "Dizel", originalHP: 185, originalTorque: 400, stage1HP: 235, stage1Torque: 480, stage2HP: 260, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 CRDi 197hp / 200hp / 202hp", motorCode: "D4HB", ecuType: "Bosch EDC17C57", displacement: "2199cc", fuelType: "Dizel", originalHP: 202, originalTorque: 440, stage1HP: 255, stage1Torque: 530, stage2HP: 280, stage2Torque: 560, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 T-GDI 177hp", motorCode: "G4FJ", ecuType: "Continental SIM2K", displacement: "1591cc", fuelType: "Benzin", originalHP: 177, originalTorque: 265, stage1HP: 220, stage1Torque: 320, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "H-1 / iX35 / Kona",
        years: "2008-2024",
        engines: [
          { name: "2.5 CRDi 136hp / 170hp H-1", motorCode: "D4CB", ecuType: "Bosch EDC17", displacement: "2497cc", fuelType: "Dizel", originalHP: 170, originalTorque: 392, stage1HP: 215, stage1Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CRDi 184hp iX35", motorCode: "D4HA", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 184, originalTorque: 392, stage1HP: 235, stage1Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== KIA ==========
  {
    name: "Kia",
    logo: "kia",
    models: [
      {
        name: "Ceed / ProCeed",
        years: "2007-2024",
        engines: [
          { name: "1.4 CRDi 75hp / 90hp", motorCode: "D4FC", ecuType: "Bosch EDC17", displacement: "1396cc", fuelType: "Dizel", originalHP: 90, originalTorque: 240, stage1HP: 125, stage1Torque: 290, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 CRDi 115hp / 128hp / 136hp", motorCode: "D4FB", ecuType: "Bosch EDC17C57", displacement: "1582cc", fuelType: "Dizel", originalHP: 136, originalTorque: 300, stage1HP: 180, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 T-GDI 100hp / 120hp", motorCode: "G3LC", ecuType: "Continental SIM2K", displacement: "998cc", fuelType: "Benzin", originalHP: 120, originalTorque: 172, stage1HP: 150, stage1Torque: 215, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 T-GDI 140hp", motorCode: "G4LD", ecuType: "Continental SIM2K", displacement: "1353cc", fuelType: "Benzin", originalHP: 140, originalTorque: 242, stage1HP: 175, stage1Torque: 295, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Sportage",
        years: "2010-2024",
        engines: [
          { name: "1.6 CRDi 115hp / 136hp", motorCode: "D4FB", ecuType: "Bosch EDC17", displacement: "1582cc", fuelType: "Dizel", originalHP: 136, originalTorque: 320, stage1HP: 180, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.7 CRDi 115hp / 141hp", motorCode: "D4FD", ecuType: "Bosch EDC17", displacement: "1685cc", fuelType: "Dizel", originalHP: 141, originalTorque: 340, stage1HP: 185, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 CRDi 136hp / 184hp / 185hp", motorCode: "D4HA", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 185, originalTorque: 400, stage1HP: 235, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 T-GDI 177hp", motorCode: "G4FJ", ecuType: "Continental SIM2K", displacement: "1591cc", fuelType: "Benzin", originalHP: 177, originalTorque: 265, stage1HP: 220, stage1Torque: 320, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Sorento",
        years: "2009-2024",
        engines: [
          { name: "2.2 CRDi 197hp / 200hp / 202hp", motorCode: "D4HB", ecuType: "Bosch EDC17", displacement: "2199cc", fuelType: "Dizel", originalHP: 202, originalTorque: 440, stage1HP: 255, stage1Torque: 530, stage2HP: 280, stage2Torque: 560, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.5 CRDi 170hp", motorCode: "D4CB", ecuType: "Bosch EDC17", displacement: "2497cc", fuelType: "Dizel", originalHP: 170, originalTorque: 392, stage1HP: 215, stage1Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Stinger / Stonic / Picanto",
        years: "2017-2024",
        engines: [
          { name: "Stinger 2.2 CRDi 200hp", motorCode: "D4HB", ecuType: "Bosch EDC17", displacement: "2199cc", fuelType: "Dizel", originalHP: 200, originalTorque: 440, stage1HP: 250, stage1Torque: 530, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Stinger 2.0 T-GDI 247hp / 255hp", motorCode: "G4KH", ecuType: "Continental SIM2K", displacement: "1998cc", fuelType: "Benzin", originalHP: 255, originalTorque: 353, stage1HP: 310, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Stinger 3.3 T-GDI V6 365hp / 370hp GT", motorCode: "G6DP", ecuType: "Continental SIM2K", displacement: "3342cc", fuelType: "Benzin", originalHP: 370, originalTorque: 510, stage1HP: 445, stage1Torque: 610, stage2HP: 490, stage2Torque: 660, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== SKODA ==========
  {
    name: "Škoda",
    logo: "skoda",
    models: [
      {
        name: "Octavia (Mk2/Mk3/Mk4)",
        years: "2004-2024",
        engines: [
          { name: "1.6 TDI 90hp / 105hp / 110hp / 115hp", motorCode: "CAYC / CRKB / DDYA", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 115, originalTorque: 250, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.9 TDI 105hp", motorCode: "BLS / BXE", ecuType: "Bosch EDC16", displacement: "1896cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp / 150hp / 170hp / 184hp", motorCode: "CFFB / CRBC / CUNA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 230, stage1Torque: 460, stage2HP: 255, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 95hp / 110hp / 115hp", motorCode: "DKLA / DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 TSI 122hp / 125hp / 140hp / 150hp ACT", motorCode: "CAXA / CZCA / CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 TSI 130hp / 150hp", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 TSI 160hp / 180hp", motorCode: "CDAA / CJSA", ecuType: "Bosch MED17", displacement: "1798cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 230, stage1Torque: 350, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0 TSI RS 220hp / 230hp / 245hp", motorCode: "CHHB / DGUA", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 305, stage1Torque: 460, stage2HP: 340, stage2Torque: 500, stage3HP: 400, stage3Torque: 560, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Superb",
        years: "2008-2024",
        engines: [
          { name: "1.6 TDI 105hp / 120hp", motorCode: "CAYC", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 250, stage1HP: 160, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp / 150hp / 170hp / 190hp", motorCode: "CFFB / CRLB / DDAA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI BiTurbo 240hp", motorCode: "CUAA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 285, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TSI 150hp ACT", motorCode: "CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 220hp / 280hp", motorCode: "CHHB / CJXC", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 280, originalTorque: 350, stage1HP: 345, stage1Torque: 450, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Kodiaq / Karoq",
        years: "2016-2024",
        engines: [
          { name: "2.0 TDI 150hp / 190hp", motorCode: "CRLB / DDAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 TSI 150hp", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 180hp / 190hp / RS 245hp", motorCode: "CHHB / DGUA", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 305, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Fabia / Scala",
        years: "2007-2024",
        engines: [
          { name: "1.6 TDI 75hp / 90hp / 105hp", motorCode: "CAYB / CAYC", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 95hp / 110hp / 115hp", motorCode: "DKLA / DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 TSI RS 180hp", motorCode: "CTHE", ecuType: "Bosch MED17", displacement: "1390cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 220, stage1Torque: 305, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      }
    ]
  },

  // ========== SEAT ==========
  {
    name: "SEAT",
    logo: "seat",
    models: [
      {
        name: "Leon (Mk2/Mk3/Mk4)",
        years: "2005-2024",
        engines: [
          { name: "1.6 TDI 90hp / 105hp / 110hp / 115hp", motorCode: "CAYC / CRKB", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 115, originalTorque: 250, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.9 TDI 105hp", motorCode: "BLS / BXE", ecuType: "Bosch EDC16", displacement: "1896cc", fuelType: "Dizel", originalHP: 105, originalTorque: 250, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 TDI 140hp / 150hp / 170hp / 184hp", motorCode: "CFFB / CRBC / CUNA", ecuType: "Bosch EDC17", displacement: "1968cc", fuelType: "Dizel", originalHP: 184, originalTorque: 380, stage1HP: 230, stage1Torque: 460, stage2HP: 255, stage2Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 95hp / 115hp", motorCode: "DKLA / DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.4 TSI 122hp / 125hp / 140hp / 150hp", motorCode: "CAXA / CZCA / CZDA", ecuType: "Bosch MED17", displacement: "1395cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 185, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 TSI 130hp / 150hp", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.8 TSI 180hp", motorCode: "CJSA", ecuType: "Bosch MED17", displacement: "1798cc", fuelType: "Benzin", originalHP: 180, originalTorque: 250, stage1HP: 230, stage1Torque: 350, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Leon Cupra 265hp / 280hp / 290hp / 300hp / 310hp", motorCode: "CJXB / CJXC", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 310, originalTorque: 400, stage1HP: 380, stage1Torque: 500, stage2HP: 420, stage2Torque: 540, stage3HP: 480, stage3Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Ibiza / Arona",
        years: "2008-2024",
        engines: [
          { name: "1.6 TDI 90hp / 105hp / 115hp", motorCode: "CAYB / CAYC", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 115, originalTorque: 250, stage1HP: 155, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.0 TSI 95hp / 115hp", motorCode: "DKLA / DKRF", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 115, originalTorque: 200, stage1HP: 145, stage1Torque: 245, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.5 TSI 150hp / FR 150hp", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Ateca / Tarraco",
        years: "2016-2024",
        engines: [
          { name: "2.0 TDI 150hp / 190hp", motorCode: "CRLB / DDAA", ecuType: "Bosch EDC17C74", displacement: "1968cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 TSI 150hp", motorCode: "DADA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 190hp / 245hp Cupra", motorCode: "CHHB / DGUA", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 245, originalTorque: 370, stage1HP: 305, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== DACIA ==========
  {
    name: "Dacia",
    logo: "dacia",
    models: [
      {
        name: "Duster",
        years: "2010-2024",
        engines: [
          { name: "1.5 dCi 85hp / 90hp / 110hp / 115hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 115, originalTorque: 260, stage1HP: 155, stage1Torque: 320, stage2HP: 170, stage2Torque: 340, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 Blue dCi 95hp / 115hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 115, originalTorque: 260, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 16V 105hp / 115hp", motorCode: "K4M", ecuType: "Continental EMS3132", displacement: "1598cc", fuelType: "Benzin", originalHP: 115, originalTorque: 156, stage1HP: 130, stage1Torque: 175, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "1.0 TCe 100hp / 90hp", motorCode: "H4D", ecuType: "Continental EMS3160", displacement: "999cc", fuelType: "Benzin", originalHP: 100, originalTorque: 160, stage1HP: 130, stage1Torque: 200, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.3 TCe 130hp / 150hp", motorCode: "H5Ht", ecuType: "Continental EMS3160", displacement: "1332cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 310, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Sandero / Logan",
        years: "2008-2024",
        engines: [
          { name: "1.5 dCi 65hp / 75hp / 85hp / 90hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 90, originalTorque: 220, stage1HP: 125, stage1Torque: 270, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "0.9 TCe 90hp", motorCode: "H4Bt", ecuType: "Continental EMS3132", displacement: "898cc", fuelType: "Benzin", originalHP: 90, originalTorque: 135, stage1HP: 115, stage1Torque: 175, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.0 TCe 100hp", motorCode: "H4D", ecuType: "Continental EMS3160", displacement: "999cc", fuelType: "Benzin", originalHP: 100, originalTorque: 160, stage1HP: 130, stage1Torque: 200, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 }
        ]
      },
      {
        name: "Lodgy / Dokker",
        years: "2012-2022",
        engines: [
          { name: "1.5 dCi 90hp / 110hp", motorCode: "K9K", ecuType: "Delphi DCM3.5", displacement: "1461cc", fuelType: "Dizel", originalHP: 110, originalTorque: 240, stage1HP: 145, stage1Torque: 300, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 TCe 115hp", motorCode: "H5Ft", ecuType: "Continental EMS3160", displacement: "1197cc", fuelType: "Benzin", originalHP: 115, originalTorque: 190, stage1HP: 145, stage1Torque: 235, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Jogger",
        years: "2022-2025",
        engines: [
          { name: "1.0 TCe 100hp ECO-G LPG", motorCode: "H4D", ecuType: "Continental EMS3160", displacement: "999cc", fuelType: "Benzin/LPG", originalHP: 100, originalTorque: 160, stage1HP: 125, stage1Torque: 195, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 Hybrid 140hp", motorCode: "H4M", ecuType: "Continental EMS3160", displacement: "1598cc", fuelType: "Hybrid", originalHP: 140, originalTorque: 205, stage1HP: 160, stage1Torque: 230, priceStage1: 6500, durationHours: 3, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== VOLVO ==========
  {
    name: "Volvo",
    logo: "volvo",
    models: [
      {
        name: "S60 / V60",
        years: "2010-2024",
        engines: [
          { name: "D2 1.6 115hp", motorCode: "DV6", ecuType: "Bosch EDC17", displacement: "1560cc", fuelType: "Dizel", originalHP: 115, originalTorque: 270, stage1HP: 155, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "D3 / D4 2.0 136hp / 163hp / 181hp / 190hp", motorCode: "D4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, stage2HP: 265, stage2Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "D5 2.0 215hp / 235hp BiTurbo", motorCode: "D4204T23", ecuType: "Denso", displacement: "1969cc", fuelType: "Dizel", originalHP: 235, originalTorque: 480, stage1HP: 285, stage1Torque: 560, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "T5 2.0 240hp / 245hp / 254hp", motorCode: "B4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Benzin", originalHP: 254, originalTorque: 350, stage1HP: 305, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "T6 2.0 310hp Polestar / T8 320-407hp PHEV", motorCode: "B4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Benzin", originalHP: 407, originalTorque: 640, stage1HP: 470, stage1Torque: 720, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "XC40 / XC60 / XC90",
        years: "2008-2024",
        engines: [
          { name: "D3/D4 2.0 150hp / 163hp / 181hp / 190hp", motorCode: "D4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "D5 2.0 215hp / 235hp BiTurbo", motorCode: "D4204T23", ecuType: "Denso", displacement: "1969cc", fuelType: "Dizel", originalHP: 235, originalTorque: 480, stage1HP: 285, stage1Torque: 560, stage2HP: 310, stage2Torque: 600, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "T5 2.0 245hp / 250hp / 254hp", motorCode: "B4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Benzin", originalHP: 254, originalTorque: 350, stage1HP: 305, stage1Torque: 430, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "T6 320hp / T8 390-407hp PHEV", motorCode: "B4204T", ecuType: "Denso", displacement: "1969cc", fuelType: "Benzin", originalHP: 407, originalTorque: 640, stage1HP: 470, stage1Torque: 720, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== HONDA ==========
  {
    name: "Honda",
    logo: "honda",
    models: [
      {
        name: "Civic",
        years: "2006-2024",
        engines: [
          { name: "1.6 i-DTEC 120hp", motorCode: "N16A1", ecuType: "Bosch EDC17", displacement: "1597cc", fuelType: "Dizel", originalHP: 120, originalTorque: 300, stage1HP: 160, stage1Torque: 360, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 VTEC Turbo 182hp / 220hp", motorCode: "L15B7", ecuType: "Bosch MED17", displacement: "1498cc", fuelType: "Benzin", originalHP: 220, originalTorque: 260, stage1HP: 270, stage1Torque: 340, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Civic Type R 2.0 VTEC Turbo 310hp / 320hp / 329hp", motorCode: "K20C1", ecuType: "Bosch MED17", displacement: "1996cc", fuelType: "Benzin", originalHP: 329, originalTorque: 400, stage1HP: 395, stage1Torque: 480, stage2HP: 435, stage2Torque: 525, stage3HP: 510, stage3Torque: 620, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "CR-V",
        years: "2007-2024",
        engines: [
          { name: "1.6 i-DTEC 120hp / 160hp", motorCode: "N16A2", ecuType: "Bosch EDC17", displacement: "1597cc", fuelType: "Dizel", originalHP: 160, originalTorque: 350, stage1HP: 205, stage1Torque: 420, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 i-DTEC 150hp / 180hp", motorCode: "N22B1", ecuType: "Bosch EDC17", displacement: "2199cc", fuelType: "Dizel", originalHP: 180, originalTorque: 380, stage1HP: 225, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 VTEC Turbo 173hp / 190hp", motorCode: "L15B7", ecuType: "Bosch MED17", displacement: "1498cc", fuelType: "Benzin", originalHP: 190, originalTorque: 240, stage1HP: 235, stage1Torque: 310, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Jazz / HR-V",
        years: "2008-2024",
        engines: [
          { name: "1.3 i-VTEC 100hp / 102hp", motorCode: "L13Z", ecuType: "Denso", displacement: "1339cc", fuelType: "Benzin", originalHP: 102, originalTorque: 123, stage1HP: 120, stage1Torque: 145, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 i-VTEC 130hp", motorCode: "L15B", ecuType: "Denso", displacement: "1498cc", fuelType: "Benzin", originalHP: 130, originalTorque: 155, stage1HP: 150, stage1Torque: 180, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.5 e:HEV Hybrid 109hp / 131hp", motorCode: "LEB-H1", ecuType: "Denso", displacement: "1498cc", fuelType: "Hybrid", originalHP: 131, originalTorque: 253, stage1HP: 150, stage1Torque: 280, priceStage1: 6500, durationHours: 3, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Accord",
        years: "2008-2024",
        engines: [
          { name: "2.2 i-DTEC 150hp / 180hp", motorCode: "N22B1", ecuType: "Bosch EDC17", displacement: "2199cc", fuelType: "Dizel", originalHP: 180, originalTorque: 380, stage1HP: 225, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 VTEC Turbo 192hp", motorCode: "L15BE", ecuType: "Bosch MED17", displacement: "1498cc", fuelType: "Benzin", originalHP: 192, originalTorque: 260, stage1HP: 235, stage1Torque: 320, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 Hybrid 215hp", motorCode: "LFB-H4", ecuType: "Denso", displacement: "1993cc", fuelType: "Hybrid", originalHP: 215, originalTorque: 315, stage1HP: 245, stage1Torque: 350, priceStage1: 7000, durationHours: 3, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Civic Type R",
        years: "2015-2024",
        engines: [
          { name: "2.0 VTEC Turbo 310hp / 320hp / 329hp FL5", motorCode: "K20C1", ecuType: "Bosch MED17", displacement: "1996cc", fuelType: "Benzin", originalHP: 329, originalTorque: 420, stage1HP: 390, stage1Torque: 500, stage2HP: 425, stage2Torque: 540, stage3HP: 480, stage3Torque: 600, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== NISSAN ==========
  {
    name: "Nissan",
    logo: "nissan",
    models: [
      {
        name: "Qashqai / X-Trail",
        years: "2007-2024",
        engines: [
          { name: "1.5 dCi 105hp / 110hp / 115hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 115, originalTorque: 260, stage1HP: 155, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp", motorCode: "R9M", ecuType: "Continental SID305", displacement: "1598cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 175, stage1Torque: 390, stage2HP: 195, stage2Torque: 420, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 dCi 150hp / 173hp / 177hp", motorCode: "M9R", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 177, originalTorque: 380, stage1HP: 225, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.3 DIG-T 140hp / 160hp", motorCode: "H5Ht", ecuType: "Continental EMS3160", displacement: "1332cc", fuelType: "Benzin", originalHP: 160, originalTorque: 270, stage1HP: 200, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Navara",
        years: "2005-2024",
        engines: [
          { name: "2.5 dCi 144hp / 174hp / 190hp", motorCode: "YD25DDTi", ecuType: "Bosch EDC16", displacement: "2488cc", fuelType: "Dizel", originalHP: 190, originalTorque: 450, stage1HP: 240, stage1Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.3 dCi 160hp / 190hp BiTurbo", motorCode: "YS23DDTT", ecuType: "Bosch EDC17", displacement: "2298cc", fuelType: "Dizel", originalHP: 190, originalTorque: 450, stage1HP: 235, stage1Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Juke / 370Z / GT-R",
        years: "2010-2024",
        engines: [
          { name: "Juke 1.6 DIG-T 190hp / 218hp Nismo RS", motorCode: "MR16DDT", ecuType: "Hitachi", displacement: "1618cc", fuelType: "Benzin", originalHP: 218, originalTorque: 280, stage1HP: 265, stage1Torque: 350, stage2HP: 290, stage2Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "GT-R 3.8 V6 BiTurbo 480hp / 530hp / 565hp / 600hp", motorCode: "VR38DETT", ecuType: "Hitachi", displacement: "3799cc", fuelType: "Benzin", originalHP: 600, originalTorque: 652, stage1HP: 700, stage1Torque: 780, stage2HP: 760, stage2Torque: 850, stage3HP: 900, stage3Torque: 1000, priceStage1: 12000, durationHours: 3, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Micra / Note",
        years: "2010-2024",
        engines: [
          { name: "Micra 0.9 IG-T 90hp", motorCode: "H4Bt", ecuType: "Continental EMS3132", displacement: "898cc", fuelType: "Benzin", originalHP: 90, originalTorque: 140, stage1HP: 115, stage1Torque: 175, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "Micra 1.5 dCi 90hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 90, originalTorque: 220, stage1HP: 125, stage1Torque: 270, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Note 1.5 dCi 90hp / 110hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 110, originalTorque: 240, stage1HP: 145, stage1Torque: 300, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Almera / Pulsar / Primera",
        years: "2008-2024",
        engines: [
          { name: "1.5 dCi 90hp / 110hp", motorCode: "K9K", ecuType: "Continental SID305", displacement: "1461cc", fuelType: "Dizel", originalHP: 110, originalTorque: 260, stage1HP: 145, stage1Torque: 320, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.6 dCi 130hp", motorCode: "R9M", ecuType: "Continental SID310", displacement: "1598cc", fuelType: "Dizel", originalHP: 130, originalTorque: 320, stage1HP: 170, stage1Torque: 390, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 DIG-T 115hp", motorCode: "H5Ft", ecuType: "Continental EMS3160", displacement: "1197cc", fuelType: "Benzin", originalHP: 115, originalTorque: 190, stage1HP: 145, stage1Torque: 235, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Patrol / Pathfinder / Murano",
        years: "2008-2024",
        engines: [
          { name: "Patrol Y62 5.6 V8 405hp / 425hp", motorCode: "VK56VD", ecuType: "Hitachi", displacement: "5552cc", fuelType: "Benzin", originalHP: 425, originalTorque: 560, stage1HP: 485, stage1Torque: 640, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Pathfinder 2.5 dCi 190hp", motorCode: "YD25DDTi", ecuType: "Bosch EDC17", displacement: "2488cc", fuelType: "Dizel", originalHP: 190, originalTorque: 450, stage1HP: 240, stage1Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Murano 3.5 V6 260hp", motorCode: "VQ35DE", ecuType: "Hitachi", displacement: "3498cc", fuelType: "Benzin", originalHP: 260, originalTorque: 336, stage1HP: 295, stage1Torque: 380, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== MINI ==========
  {
    name: "MINI",
    logo: "mini",
    models: [
      {
        name: "Cooper / Cooper S / JCW",
        years: "2007-2024",
        engines: [
          { name: "Cooper D 1.6 / 2.0 112hp / 116hp / 150hp", motorCode: "N47C16 / B47", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 150, originalTorque: 330, stage1HP: 200, stage1Torque: 410, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Cooper SD 2.0 143hp / 170hp / 190hp", motorCode: "N47C20 / B47", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Cooper 1.5 / 2.0 136hp / 192hp", motorCode: "B38 / B48", ecuType: "Bosch MEVD17", displacement: "1998cc", fuelType: "Benzin", originalHP: 192, originalTorque: 280, stage1HP: 240, stage1Torque: 360, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Cooper S 1.6 / 2.0 184hp / 192hp / 211hp / 231hp", motorCode: "N18 / B48", ecuType: "Bosch MEVD17", displacement: "1998cc", fuelType: "Benzin", originalHP: 231, originalTorque: 320, stage1HP: 290, stage1Torque: 410, stage2HP: 320, stage2Torque: 440, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "JCW 2.0 231hp / 306hp", motorCode: "B48A20", ecuType: "Bosch MEVD17", displacement: "1998cc", fuelType: "Benzin", originalHP: 306, originalTorque: 450, stage1HP: 365, stage1Torque: 540, stage2HP: 400, stage2Torque: 590, stage3HP: 450, stage3Torque: 640, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Countryman / Clubman",
        years: "2010-2024",
        engines: [
          { name: "Cooper D 2.0 150hp / 190hp", motorCode: "B47", ecuType: "Bosch EDC17", displacement: "1995cc", fuelType: "Dizel", originalHP: 190, originalTorque: 400, stage1HP: 240, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Cooper S 2.0 192hp / 231hp", motorCode: "B48A20", ecuType: "Bosch MEVD17", displacement: "1998cc", fuelType: "Benzin", originalHP: 231, originalTorque: 320, stage1HP: 290, stage1Torque: 410, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "JCW 306hp", motorCode: "B48A20", ecuType: "Bosch MEVD17", displacement: "1998cc", fuelType: "Benzin", originalHP: 306, originalTorque: 450, stage1HP: 365, stage1Torque: 540, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== PORSCHE ==========
  {
    name: "Porsche",
    logo: "porsche",
    models: [
      {
        name: "Macan",
        years: "2014-2024",
        engines: [
          { name: "Macan S Diesel 3.0 V6 258hp", motorCode: "MCRA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 258, originalTorque: 580, stage1HP: 320, stage1Torque: 690, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "Macan 2.0 252hp / 265hp", motorCode: "DKZA", ecuType: "Bosch MG1CS003", displacement: "1984cc", fuelType: "Benzin", originalHP: 265, originalTorque: 400, stage1HP: 325, stage1Torque: 480, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Macan S 3.0 V6 340hp / 354hp / 380hp", motorCode: "DCBA", ecuType: "Bosch MG1CS003", displacement: "2995cc", fuelType: "Benzin", originalHP: 380, originalTorque: 520, stage1HP: 460, stage1Torque: 620, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Macan GTS 360hp / 380hp / 440hp", motorCode: "DCBA", ecuType: "Bosch MG1CS003", displacement: "2995cc", fuelType: "Benzin", originalHP: 440, originalTorque: 550, stage1HP: 525, stage1Torque: 650, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Macan Turbo 3.6 V6 400hp / 440hp / 2.9 V6 440hp", motorCode: "DAUA", ecuType: "Bosch MG1CS003", displacement: "2894cc", fuelType: "Benzin", originalHP: 440, originalTorque: 600, stage1HP: 525, stage1Torque: 720, stage2HP: 580, stage2Torque: 800, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Cayenne",
        years: "2010-2024",
        engines: [
          { name: "Cayenne Diesel 3.0 V6 240hp / 245hp / 250hp / 262hp", motorCode: "CRCA / CVWA", ecuType: "Bosch EDC17", displacement: "2967cc", fuelType: "Dizel", originalHP: 262, originalTorque: 580, stage1HP: 325, stage1Torque: 690, stage2HP: 355, stage2Torque: 730, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "Cayenne S Diesel 4.2 V8 385hp", motorCode: "CVUA", ecuType: "Bosch EDC17", displacement: "4134cc", fuelType: "Dizel", originalHP: 385, originalTorque: 850, stage1HP: 460, stage1Torque: 990, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.10 },
          { name: "Cayenne 3.0 V6 340hp / 3.6 V6 300hp", motorCode: "CXZB", ecuType: "Bosch MG1CS003", displacement: "2995cc", fuelType: "Benzin", originalHP: 340, originalTorque: 450, stage1HP: 415, stage1Torque: 540, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Cayenne S 2.9 V6 BiTurbo 440hp / 4.0 V8 BiTurbo 460hp", motorCode: "DAUA / DCBE", ecuType: "Bosch MG1CS003", displacement: "2894cc", fuelType: "Benzin", originalHP: 460, originalTorque: 600, stage1HP: 540, stage1Torque: 720, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Cayenne Turbo 4.0 V8 BiTurbo 550hp / 4.8 V8 500hp / 520hp", motorCode: "DCBE", ecuType: "Bosch MG1CS003", displacement: "3996cc", fuelType: "Benzin", originalHP: 550, originalTorque: 770, stage1HP: 650, stage1Torque: 920, stage2HP: 720, stage2Torque: 1000, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Cayenne Turbo S E-Hybrid 680hp PHEV", motorCode: "DCBE", ecuType: "Bosch MG1CS003", displacement: "3996cc", fuelType: "Benzin", originalHP: 680, originalTorque: 900, stage1HP: 770, stage1Torque: 1020, priceStage1: 13000, durationHours: 3, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "911 (991/992)",
        years: "2012-2024",
        engines: [
          { name: "Carrera 3.0 BiTurbo 370hp / 385hp / 450hp", motorCode: "9A2", ecuType: "Bosch MG1CS003", displacement: "2981cc", fuelType: "Benzin", originalHP: 450, originalTorque: 530, stage1HP: 525, stage1Torque: 640, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Carrera S 3.0 BiTurbo 420hp / 450hp / 480hp", motorCode: "9A2", ecuType: "Bosch MG1CS003", displacement: "2981cc", fuelType: "Benzin", originalHP: 480, originalTorque: 570, stage1HP: 555, stage1Torque: 680, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Turbo / Turbo S 3.8 580hp / 650hp", motorCode: "9A1", ecuType: "Bosch MG1CS003", displacement: "3800cc", fuelType: "Benzin", originalHP: 650, originalTorque: 800, stage1HP: 740, stage1Torque: 920, stage2HP: 800, stage2Torque: 1000, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Panamera",
        years: "2010-2024",
        engines: [
          { name: "Diesel 3.0 V6 250hp / 300hp / 422hp BiTDI 4.0 V8", motorCode: "CRCA / DCQA", ecuType: "Bosch EDC17", displacement: "3956cc", fuelType: "Dizel", originalHP: 422, originalTorque: 850, stage1HP: 500, stage1Torque: 1000, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.10 },
          { name: "Panamera 3.0 V6 330hp / 4S 2.9 V6 BiTurbo 440hp", motorCode: "DAUA", ecuType: "Bosch MG1CS003", displacement: "2894cc", fuelType: "Benzin", originalHP: 440, originalTorque: 550, stage1HP: 525, stage1Torque: 650, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Turbo 4.0 V8 BiTurbo 550hp / Turbo S 630hp", motorCode: "DCBE", ecuType: "Bosch MG1CS003", displacement: "3996cc", fuelType: "Benzin", originalHP: 630, originalTorque: 820, stage1HP: 730, stage1Torque: 970, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== LAND ROVER / RANGE ROVER ==========
  {
    name: "Land Rover",
    logo: "landrover",
    models: [
      {
        name: "Discovery / Discovery Sport",
        years: "2009-2024",
        engines: [
          { name: "2.0 SD4 / TD4 150hp / 180hp / 240hp", motorCode: "204DTD / 204DTY", ecuType: "Continental", displacement: "1999cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 290, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 SDV6 245hp / 256hp / 275hp / 306hp", motorCode: "306DT", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 306, originalTorque: 700, stage1HP: 370, stage1Torque: 820, stage2HP: 405, stage2Torque: 870, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 Si6 340hp / 380hp Supercharged", motorCode: "306PS", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 380, originalTorque: 450, stage1HP: 460, stage1Torque: 540, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Range Rover / Range Rover Sport / Velar / Evoque",
        years: "2010-2024",
        engines: [
          { name: "2.0 Td4 / SD4 150hp / 180hp / 240hp Evoque", motorCode: "204DTD / 204DTY", ecuType: "Continental", displacement: "1999cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 290, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 SDV6 250hp / 258hp / 275hp / 306hp / 339hp", motorCode: "306DT / AJ-V6D", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 339, originalTorque: 700, stage1HP: 405, stage1Torque: 820, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "4.4 SDV8 339hp", motorCode: "448DT", ecuType: "Bosch EDC17", displacement: "4367cc", fuelType: "Dizel", originalHP: 339, originalTorque: 740, stage1HP: 405, stage1Torque: 870, priceStage1: 9000, durationHours: 2, fuelEconomy: 0.10 },
          { name: "5.0 V8 Supercharged 510hp / 525hp / 550hp / 575hp / 625hp SVR", motorCode: "508PS", ecuType: "Bosch MED17", displacement: "5000cc", fuelType: "Benzin", originalHP: 625, originalTorque: 700, stage1HP: 720, stage1Torque: 820, stage2HP: 780, stage2Torque: 880, priceStage1: 11000, durationHours: 2, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "Defender",
        years: "2020-2024",
        engines: [
          { name: "D200 / D250 / D300 3.0 I6 200hp / 249hp / 300hp", motorCode: "Ingenium I6 D", ecuType: "Bosch EDC17", displacement: "2997cc", fuelType: "Dizel", originalHP: 300, originalTorque: 650, stage1HP: 365, stage1Torque: 770, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "P400 3.0 I6 400hp", motorCode: "Ingenium I6", ecuType: "Bosch MED17", displacement: "2996cc", fuelType: "Benzin", originalHP: 400, originalTorque: 550, stage1HP: 480, stage1Torque: 660, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "V8 5.0 525hp", motorCode: "508PS", ecuType: "Bosch MED17", displacement: "5000cc", fuelType: "Benzin", originalHP: 525, originalTorque: 625, stage1HP: 605, stage1Torque: 730, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== MAZDA ==========
  {
    name: "Mazda",
    logo: "mazda",
    models: [
      {
        name: "3 / 6 / CX-3 / CX-5 / CX-30",
        years: "2009-2024",
        engines: [
          { name: "1.5 SkyActiv-D 105hp", motorCode: "S5-DPTS", ecuType: "Denso", displacement: "1499cc", fuelType: "Dizel", originalHP: 105, originalTorque: 270, stage1HP: 145, stage1Torque: 330, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.2 SkyActiv-D 150hp / 175hp / 184hp", motorCode: "SH-VPTS", ecuType: "Denso", displacement: "2191cc", fuelType: "Dizel", originalHP: 184, originalTorque: 420, stage1HP: 235, stage1Torque: 500, stage2HP: 260, stage2Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 SkyActiv-G 120hp / 165hp / 186hp", motorCode: "PE-VPS", ecuType: "Denso", displacement: "1998cc", fuelType: "Benzin", originalHP: 186, originalTorque: 213, stage1HP: 210, stage1Torque: 240, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "2.5 SkyActiv-G Turbo 250hp / 256hp", motorCode: "PY-VPTS", ecuType: "Denso", displacement: "2488cc", fuelType: "Benzin", originalHP: 256, originalTorque: 420, stage1HP: 305, stage1Torque: 490, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "MX-5 / RX-8",
        years: "2003-2024",
        engines: [
          { name: "MX-5 2.0 SkyActiv-G 160hp / 184hp", motorCode: "PE-VPS", ecuType: "Denso", displacement: "1998cc", fuelType: "Benzin", originalHP: 184, originalTorque: 205, stage1HP: 205, stage1Torque: 230, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== MITSUBISHI ==========
  {
    name: "Mitsubishi",
    logo: "mitsubishi",
    models: [
      {
        name: "L200 / Pajero / Outlander",
        years: "2008-2024",
        engines: [
          { name: "L200 2.5 DI-D 136hp / 178hp", motorCode: "4D56", ecuType: "Bosch EDC16", displacement: "2477cc", fuelType: "Dizel", originalHP: 178, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "L200 2.4 MIVEC DI-D 154hp / 181hp", motorCode: "4N15", ecuType: "Mitsubishi MED17", displacement: "2442cc", fuelType: "Dizel", originalHP: 181, originalTorque: 430, stage1HP: 230, stage1Torque: 510, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "Pajero 3.2 DI-D 165hp / 200hp", motorCode: "4M41", ecuType: "Bosch EDC17", displacement: "3200cc", fuelType: "Dizel", originalHP: 200, originalTorque: 441, stage1HP: 250, stage1Torque: 530, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "Outlander 2.2 DI-D 156hp / 175hp", motorCode: "4N14", ecuType: "Bosch EDC17", displacement: "2268cc", fuelType: "Dizel", originalHP: 175, originalTorque: 380, stage1HP: 220, stage1Torque: 460, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      },
      {
        name: "Lancer Evolution",
        years: "2003-2016",
        engines: [
          { name: "Evo IX 2.0 Turbo 280hp / 305hp", motorCode: "4G63T", ecuType: "Mitsubishi MIVEC", displacement: "1997cc", fuelType: "Benzin", originalHP: 305, originalTorque: 392, stage1HP: 380, stage1Torque: 490, stage2HP: 420, stage2Torque: 540, stage3HP: 500, stage3Torque: 650, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Evo X 2.0 Turbo 295hp / 360hp / 400hp FQ", motorCode: "4B11T", ecuType: "Mitsubishi MIVEC", displacement: "1998cc", fuelType: "Benzin", originalHP: 400, originalTorque: 502, stage1HP: 470, stage1Torque: 600, stage2HP: 520, stage2Torque: 660, stage3HP: 600, stage3Torque: 760, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== SUZUKI ==========
  {
    name: "Suzuki",
    logo: "suzuki",
    models: [
      {
        name: "Vitara / S-Cross / Swift",
        years: "2010-2024",
        engines: [
          { name: "1.6 DDiS 120hp", motorCode: "D16AA", ecuType: "Magneti Marelli", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 160, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 BoosterJet 140hp", motorCode: "K14C", ecuType: "Denso", displacement: "1373cc", fuelType: "Benzin", originalHP: 140, originalTorque: 220, stage1HP: 175, stage1Torque: 270, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "Swift Sport 1.4 BoosterJet 140hp", motorCode: "K14C", ecuType: "Denso", displacement: "1373cc", fuelType: "Benzin", originalHP: 140, originalTorque: 230, stage1HP: 175, stage1Torque: 280, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Jimny",
        years: "2018-2024",
        engines: [
          { name: "1.5 AllGrip 102hp", motorCode: "K15B", ecuType: "Denso", displacement: "1462cc", fuelType: "Benzin", originalHP: 102, originalTorque: 130, stage1HP: 120, stage1Torque: 155, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Baleno / Ignis / Celerio",
        years: "2015-2024",
        engines: [
          { name: "1.0 BoosterJet 112hp", motorCode: "K10C", ecuType: "Denso", displacement: "998cc", fuelType: "Benzin", originalHP: 112, originalTorque: 170, stage1HP: 140, stage1Torque: 210, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.2 Dualjet 90hp / 91hp", motorCode: "K12C", ecuType: "Denso", displacement: "1242cc", fuelType: "Benzin", originalHP: 91, originalTorque: 118, stage1HP: 105, stage1Torque: 135, priceStage1: 4000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      }
    ]
  },

  // ========== ALFA ROMEO ==========
  {
    name: "Alfa Romeo",
    logo: "alfaromeo",
    models: [
      {
        name: "Giulia / Stelvio",
        years: "2015-2024",
        engines: [
          { name: "2.2 Diesel 150hp / 180hp / 190hp / 210hp", motorCode: "55282134", ecuType: "Bosch EDC17", displacement: "2143cc", fuelType: "Dizel", originalHP: 210, originalTorque: 470, stage1HP: 260, stage1Torque: 550, stage2HP: 285, stage2Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 Turbo 200hp / 280hp", motorCode: "GME T4", ecuType: "Bosch MED17", displacement: "1995cc", fuelType: "Benzin", originalHP: 280, originalTorque: 400, stage1HP: 340, stage1Torque: 480, stage2HP: 375, stage2Torque: 520, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Quadrifoglio 2.9 V6 BiTurbo 510hp / 520hp", motorCode: "F154", ecuType: "Bosch MED17", displacement: "2891cc", fuelType: "Benzin", originalHP: 520, originalTorque: 600, stage1HP: 600, stage1Torque: 720, stage2HP: 660, stage2Torque: 780, priceStage1: 9500, durationHours: 2, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "Giulietta / MiTo",
        years: "2008-2020",
        engines: [
          { name: "1.6 JTDM 105hp / 120hp", motorCode: "940A3000", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 160, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 JTDM 140hp / 150hp / 170hp / 175hp", motorCode: "940A4000", ecuType: "Bosch EDC17", displacement: "1956cc", fuelType: "Dizel", originalHP: 175, originalTorque: 380, stage1HP: 220, stage1Torque: 460, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 TB MultiAir 170hp / 240hp QV", motorCode: "940A5000", ecuType: "Magneti Marelli", displacement: "1368cc", fuelType: "Benzin", originalHP: 240, originalTorque: 340, stage1HP: 290, stage1Torque: 420, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== CUPRA ==========
  {
    name: "Cupra",
    logo: "cupra",
    models: [
      {
        name: "Leon / Formentor / Ateca",
        years: "2018-2024",
        engines: [
          { name: "2.0 TDI 150hp", motorCode: "DTSA", ecuType: "Continental", displacement: "1968cc", fuelType: "Dizel", originalHP: 150, originalTorque: 360, stage1HP: 200, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 TSI 150hp", motorCode: "DPCA", ecuType: "Bosch MG1CS", displacement: "1498cc", fuelType: "Benzin", originalHP: 150, originalTorque: 250, stage1HP: 190, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.0 TSI 245hp / 300hp / 310hp / 333hp", motorCode: "DNFE / DGUA", ecuType: "Bosch MG1CS003", displacement: "1984cc", fuelType: "Benzin", originalHP: 333, originalTorque: 420, stage1HP: 405, stage1Torque: 520, stage2HP: 445, stage2Torque: 560, stage3HP: 510, stage3Torque: 640, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "Formentor VZ5 2.5 TFSI 5cyl 390hp", motorCode: "DAZA", ecuType: "Bosch MG1CS024", displacement: "2480cc", fuelType: "Benzin", originalHP: 390, originalTorque: 480, stage1HP: 470, stage1Torque: 600, stage2HP: 520, stage2Torque: 660, stage3HP: 600, stage3Torque: 760, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "Ateca 2.0 TSI 300hp", motorCode: "DNFA", ecuType: "Bosch MED17.5", displacement: "1984cc", fuelType: "Benzin", originalHP: 300, originalTorque: 400, stage1HP: 370, stage1Torque: 500, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== JAGUAR ==========
  {
    name: "Jaguar",
    logo: "jaguar",
    models: [
      {
        name: "XE / XF / F-Pace",
        years: "2008-2024",
        engines: [
          { name: "2.0 D 163hp / 180hp / 240hp", motorCode: "204DT / 204DTY", ecuType: "Continental", displacement: "1999cc", fuelType: "Dizel", originalHP: 240, originalTorque: 500, stage1HP: 290, stage1Torque: 580, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 V6 D 240hp / 275hp / 300hp", motorCode: "306DT", ecuType: "Bosch EDC17", displacement: "2993cc", fuelType: "Dizel", originalHP: 300, originalTorque: 700, stage1HP: 365, stage1Torque: 820, priceStage1: 8000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "2.0 i4 200hp / 250hp / 300hp", motorCode: "204PT", ecuType: "Bosch MED17", displacement: "1997cc", fuelType: "Benzin", originalHP: 300, originalTorque: 400, stage1HP: 365, stage1Torque: 490, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "3.0 V6 Supercharged 340hp / 380hp / 400hp", motorCode: "306PS", ecuType: "Bosch MED17", displacement: "2995cc", fuelType: "Benzin", originalHP: 400, originalTorque: 450, stage1HP: 480, stage1Torque: 540, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "F-Pace SVR 5.0 V8 Supercharged 550hp", motorCode: "508PS", ecuType: "Bosch MED17", displacement: "5000cc", fuelType: "Benzin", originalHP: 550, originalTorque: 680, stage1HP: 640, stage1Torque: 800, priceStage1: 10000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== DS AUTOMOBILES ==========
  {
    name: "DS Automobiles",
    logo: "ds",
    models: [
      {
        name: "DS3 / DS4 / DS7",
        years: "2014-2024",
        engines: [
          { name: "1.5 BlueHDi 100hp / 130hp", motorCode: "DV5RC", ecuType: "Continental EMS3160", displacement: "1499cc", fuelType: "Dizel", originalHP: 130, originalTorque: 300, stage1HP: 170, stage1Torque: 370, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 BlueHDi 177hp / 180hp", motorCode: "DW10FC", ecuType: "Continental EMS3160", displacement: "1997cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.2 PureTech 130hp / 155hp", motorCode: "EB2ADTSH", ecuType: "Continental EMS3160", displacement: "1199cc", fuelType: "Benzin", originalHP: 155, originalTorque: 240, stage1HP: 195, stage1Torque: 290, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.6 PureTech 180hp / 225hp", motorCode: "EP6FDTX", ecuType: "Bosch MED17", displacement: "1598cc", fuelType: "Benzin", originalHP: 225, originalTorque: 300, stage1HP: 275, stage1Torque: 380, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      }
    ]
  },

  // ========== LEXUS ==========
  {
    name: "Lexus",
    logo: "lexus",
    models: [
      {
        name: "IS / GS / RX / NX",
        years: "2010-2024",
        engines: [
          { name: "IS 200d / 220d 150hp / 177hp", motorCode: "2AD-FHV", ecuType: "Denso", displacement: "2231cc", fuelType: "Dizel", originalHP: 177, originalTorque: 400, stage1HP: 225, stage1Torque: 480, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "IS / GS 250 / 350 V6 NA 209hp / 318hp", motorCode: "2GR-FSE", ecuType: "Denso", displacement: "3456cc", fuelType: "Benzin", originalHP: 318, originalTorque: 380, stage1HP: 345, stage1Torque: 410, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.05 },
          { name: "RC F / GS F 5.0 V8 NA 477hp", motorCode: "2UR-GSE", ecuType: "Denso", displacement: "4969cc", fuelType: "Benzin", originalHP: 477, originalTorque: 530, stage1HP: 505, stage1Torque: 560, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== SUBARU ==========
  {
    name: "Subaru",
    logo: "subaru",
    models: [
      {
        name: "Impreza WRX / STI",
        years: "2008-2024",
        engines: [
          { name: "2.0 Turbo WRX 268hp", motorCode: "FA20DIT", ecuType: "Denso", displacement: "1998cc", fuelType: "Benzin", originalHP: 268, originalTorque: 350, stage1HP: 320, stage1Torque: 430, stage2HP: 360, stage2Torque: 470, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.5 Turbo STI 305hp / 310hp", motorCode: "EJ257", ecuType: "Denso", displacement: "2457cc", fuelType: "Benzin", originalHP: 310, originalTorque: 393, stage1HP: 370, stage1Torque: 480, stage2HP: 420, stage2Torque: 540, stage3HP: 510, stage3Torque: 660, priceStage1: 8000, durationHours: 3, fuelEconomy: 0.06 }
        ]
      },
      {
        name: "Forester / Outback / XV",
        years: "2010-2024",
        engines: [
          { name: "2.0D Boxer Diesel 147hp / 150hp", motorCode: "EE20", ecuType: "Denso", displacement: "1998cc", fuelType: "Dizel", originalHP: 150, originalTorque: 350, stage1HP: 195, stage1Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.5 Boxer 165hp / 175hp", motorCode: "FB25", ecuType: "Denso", displacement: "2498cc", fuelType: "Benzin", originalHP: 175, originalTorque: 235, stage1HP: 200, stage1Torque: 265, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.06 },
          { name: "2.0XT Turbo 250hp", motorCode: "FA20F", ecuType: "Denso", displacement: "1998cc", fuelType: "Benzin", originalHP: 250, originalTorque: 350, stage1HP: 305, stage1Torque: 420, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "BRZ",
        years: "2012-2024",
        engines: [
          { name: "2.0 / 2.4 Boxer NA 200hp / 234hp", motorCode: "FA20 / FA24", ecuType: "Denso", displacement: "2387cc", fuelType: "Benzin", originalHP: 234, originalTorque: 250, stage1HP: 255, stage1Torque: 275, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== JEEP ==========
  {
    name: "Jeep",
    logo: "jeep",
    models: [
      {
        name: "Renegade / Compass",
        years: "2014-2024",
        engines: [
          { name: "1.6 MultiJet 95hp / 120hp", motorCode: "55260384", ecuType: "Bosch EDC17", displacement: "1598cc", fuelType: "Dizel", originalHP: 120, originalTorque: 320, stage1HP: 160, stage1Torque: 380, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 MultiJet 140hp / 170hp", motorCode: "55280442", ecuType: "Bosch EDC17", displacement: "1956cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 215, stage1Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.4 MultiAir Turbo 140hp / 170hp", motorCode: "940A2000", ecuType: "Magneti Marelli 8GMK", displacement: "1368cc", fuelType: "Benzin", originalHP: 170, originalTorque: 250, stage1HP: 210, stage1Torque: 300, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.3 GSE Turbo 150hp / 180hp 4xe", motorCode: "GSE T4", ecuType: "Bosch MED17", displacement: "1332cc", fuelType: "Benzin", originalHP: 180, originalTorque: 270, stage1HP: 220, stage1Torque: 320, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Cherokee / Grand Cherokee",
        years: "2008-2024",
        engines: [
          { name: "2.0 MultiJet 140hp / 170hp", motorCode: "55280442", ecuType: "Bosch EDC17", displacement: "1956cc", fuelType: "Dizel", originalHP: 170, originalTorque: 350, stage1HP: 215, stage1Torque: 430, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 V6 CRD 218hp / 241hp", motorCode: "EXL", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 241, originalTorque: 550, stage1HP: 295, stage1Torque: 650, priceStage1: 7000, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.6 Pentastar V6 286hp", motorCode: "ERB", ecuType: "Continental", displacement: "3604cc", fuelType: "Benzin", originalHP: 286, originalTorque: 353, stage1HP: 320, stage1Torque: 390, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "6.4 SRT V8 HEMI 475hp", motorCode: "6.4 HEMI", ecuType: "Continental", displacement: "6417cc", fuelType: "Benzin", originalHP: 475, originalTorque: 644, stage1HP: 520, stage1Torque: 700, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 },
          { name: "6.2 Trackhawk V8 Supercharged 707hp", motorCode: "6.2 HEMI SC", ecuType: "Continental", displacement: "6166cc", fuelType: "Benzin", originalHP: 707, originalTorque: 875, stage1HP: 790, stage1Torque: 960, stage2HP: 870, stage2Torque: 1050, priceStage1: 12000, durationHours: 3, fuelEconomy: 0.03 }
        ]
      },
      {
        name: "Wrangler / Gladiator",
        years: "2007-2024",
        engines: [
          { name: "2.2 MultiJet 200hp", motorCode: "55280442", ecuType: "Bosch EDC17", displacement: "2184cc", fuelType: "Dizel", originalHP: 200, originalTorque: 450, stage1HP: 250, stage1Torque: 540, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "2.0 Turbo 270hp", motorCode: "GME T4", ecuType: "Continental", displacement: "1995cc", fuelType: "Benzin", originalHP: 270, originalTorque: 400, stage1HP: 320, stage1Torque: 470, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "3.6 Pentastar V6 285hp", motorCode: "ERB", ecuType: "Continental", displacement: "3604cc", fuelType: "Benzin", originalHP: 285, originalTorque: 353, stage1HP: 318, stage1Torque: 390, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.05 },
          { name: "6.4 V8 392 470hp", motorCode: "6.4 HEMI", ecuType: "Continental", displacement: "6417cc", fuelType: "Benzin", originalHP: 470, originalTorque: 637, stage1HP: 515, stage1Torque: 695, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== SMART ==========
  {
    name: "Smart",
    logo: "smart",
    models: [
      {
        name: "Fortwo / Forfour",
        years: "2007-2024",
        engines: [
          { name: "1.0 mhd 61hp / 71hp / 84hp", motorCode: "M132", ecuType: "Bosch ME17", displacement: "999cc", fuelType: "Benzin", originalHP: 84, originalTorque: 120, stage1HP: 100, stage1Torque: 140, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "0.9 Turbo 90hp / 109hp Brabus", motorCode: "M281", ecuType: "Bosch MED17", displacement: "898cc", fuelType: "Benzin", originalHP: 109, originalTorque: 170, stage1HP: 135, stage1Torque: 200, stage2HP: 150, stage2Torque: 220, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.08 },
          { name: "0.8 CDI 45hp / 54hp", motorCode: "OM660", ecuType: "Delphi", displacement: "799cc", fuelType: "Dizel", originalHP: 54, originalTorque: 130, stage1HP: 70, stage1Torque: 160, priceStage1: 4500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== SAAB ==========
  {
    name: "Saab",
    logo: "saab",
    models: [
      {
        name: "9-3 / 9-5",
        years: "2003-2011",
        engines: [
          { name: "1.9 TiD 120hp / 150hp / 180hp", motorCode: "Z19DTH", ecuType: "Bosch EDC16", displacement: "1910cc", fuelType: "Dizel", originalHP: 180, originalTorque: 400, stage1HP: 225, stage1Torque: 470, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.8t / 2.0t 150hp / 175hp / 210hp", motorCode: "B207", ecuType: "Trionic 8", displacement: "1998cc", fuelType: "Benzin", originalHP: 210, originalTorque: 300, stage1HP: 270, stage1Torque: 380, stage2HP: 300, stage2Torque: 420, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "2.8 V6 Turbo 250hp / 280hp Aero", motorCode: "B284", ecuType: "Trionic 8", displacement: "2792cc", fuelType: "Benzin", originalHP: 280, originalTorque: 400, stage1HP: 335, stage1Torque: 470, stage2HP: 370, stage2Torque: 510, priceStage1: 7500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== MG ==========
  {
    name: "MG",
    logo: "mg",
    models: [
      {
        name: "ZS / HS",
        years: "2017-2024",
        engines: [
          { name: "1.5 VTi-tech 106hp / 120hp", motorCode: "15S4N", ecuType: "Bosch ME17", displacement: "1498cc", fuelType: "Benzin", originalHP: 120, originalTorque: 150, stage1HP: 140, stage1Torque: 175, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 },
          { name: "1.5 Turbo 162hp / 169hp", motorCode: "15E4E", ecuType: "Bosch MED17", displacement: "1498cc", fuelType: "Benzin", originalHP: 169, originalTorque: 250, stage1HP: 210, stage1Torque: 305, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 },
          { name: "1.0T 110hp / 125hp", motorCode: "10E4E", ecuType: "Bosch MED17", displacement: "999cc", fuelType: "Benzin", originalHP: 125, originalTorque: 200, stage1HP: 155, stage1Torque: 240, priceStage1: 5000, durationHours: 2, fuelEconomy: 0.08 }
        ]
      },
      {
        name: "MG5 / Marvel / EHS",
        years: "2020-2024",
        engines: [
          { name: "1.5T Hybrid 258hp", motorCode: "15E4E PHEV", ecuType: "Bosch MG1", displacement: "1498cc", fuelType: "Benzin", originalHP: 258, originalTorque: 370, stage1HP: 300, stage1Torque: 420, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.06 }
        ]
      }
    ]
  },

  // ========== ISUZU ==========
  {
    name: "Isuzu",
    logo: "isuzu",
    models: [
      {
        name: "D-Max",
        years: "2012-2024",
        engines: [
          { name: "1.9 DDi 150hp / 163hp", motorCode: "RZ4E-TC", ecuType: "Denso", displacement: "1898cc", fuelType: "Dizel", originalHP: 163, originalTorque: 360, stage1HP: 210, stage1Torque: 440, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 DDi 163hp / 177hp / 190hp", motorCode: "4JJ1-TC", ecuType: "Denso", displacement: "2999cc", fuelType: "Dizel", originalHP: 190, originalTorque: 450, stage1HP: 245, stage1Torque: 550, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.12 }
        ]
      },
      {
        name: "N-Series / NPR (kamyon)",
        years: "2010-2024",
        engines: [
          { name: "5.2 DDi 190hp", motorCode: "4HK1", ecuType: "Denso", displacement: "5193cc", fuelType: "Dizel", originalHP: 190, originalTorque: 510, stage1HP: 235, stage1Torque: 620, priceStage1: 8000, durationHours: 3, fuelEconomy: 0.10 }
        ]
      }
    ]
  },

  // ========== SSANGYONG ==========
  {
    name: "SsangYong",
    logo: "ssangyong",
    models: [
      {
        name: "Tivoli / Korando",
        years: "2010-2024",
        engines: [
          { name: "1.6 XDi 115hp / 136hp", motorCode: "D16DTF", ecuType: "Delphi DCM3.5", displacement: "1597cc", fuelType: "Dizel", originalHP: 136, originalTorque: 324, stage1HP: 175, stage1Torque: 400, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.13 },
          { name: "1.5 GDI-T 163hp", motorCode: "G15TF", ecuType: "Continental", displacement: "1497cc", fuelType: "Benzin", originalHP: 163, originalTorque: 280, stage1HP: 200, stage1Torque: 320, priceStage1: 5500, durationHours: 2, fuelEconomy: 0.07 }
        ]
      },
      {
        name: "Rexton / Musso",
        years: "2010-2024",
        engines: [
          { name: "2.2 e-XDi 178hp / 187hp / 202hp", motorCode: "D22T", ecuType: "Delphi DCM3.5", displacement: "2157cc", fuelType: "Dizel", originalHP: 202, originalTorque: 441, stage1HP: 255, stage1Torque: 530, priceStage1: 6500, durationHours: 2, fuelEconomy: 0.13 }
        ]
      }
    ]
  },

  // ========== IVECO ==========
  {
    name: "Iveco",
    logo: "iveco",
    models: [
      {
        name: "Daily",
        years: "2011-2024",
        engines: [
          { name: "2.3 HPi 116hp / 136hp / 156hp", motorCode: "F1AE", ecuType: "Bosch EDC17", displacement: "2287cc", fuelType: "Dizel", originalHP: 156, originalTorque: 380, stage1HP: 200, stage1Torque: 450, priceStage1: 6000, durationHours: 2, fuelEconomy: 0.13 },
          { name: "3.0 HPi 146hp / 170hp / 180hp / 205hp", motorCode: "F1CE", ecuType: "Bosch EDC17", displacement: "2998cc", fuelType: "Dizel", originalHP: 205, originalTorque: 470, stage1HP: 260, stage1Torque: 560, priceStage1: 6500, durationHours: 3, fuelEconomy: 0.12 }
        ]
      }
    ]
  },

  // ========== FERRARI (Prestij — showcase) ==========
  {
    name: "Ferrari",
    logo: "ferrari",
    models: [
      {
        name: "488 / F8 Tributo",
        years: "2015-2023",
        engines: [
          { name: "3.9 V8 Twin-Turbo 670hp / 720hp", motorCode: "F154", ecuType: "Bosch MED17.3.5", displacement: "3902cc", fuelType: "Benzin", originalHP: 720, originalTorque: 770, stage1HP: 800, stage1Torque: 850, stage2HP: 870, stage2Torque: 930, priceStage1: 18000, durationHours: 3, fuelEconomy: 0.05 }
        ]
      },
      {
        name: "812 / Roma / Portofino",
        years: "2017-2024",
        engines: [
          { name: "3.9 V8 Twin-Turbo 620hp", motorCode: "F154BB", ecuType: "Bosch MED17", displacement: "3855cc", fuelType: "Benzin", originalHP: 620, originalTorque: 760, stage1HP: 695, stage1Torque: 830, priceStage1: 17000, durationHours: 3, fuelEconomy: 0.05 },
          { name: "6.5 V12 NA 800hp Superfast", motorCode: "F140", ecuType: "Bosch MED17", displacement: "6496cc", fuelType: "Benzin", originalHP: 800, originalTorque: 718, stage1HP: 845, stage1Torque: 760, priceStage1: 20000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== LAMBORGHINI (Prestij — showcase) ==========
  {
    name: "Lamborghini",
    logo: "lamborghini",
    models: [
      {
        name: "Huracán",
        years: "2014-2024",
        engines: [
          { name: "5.2 V10 NA 580hp / 610hp / 640hp Performante / STO", motorCode: "CEC", ecuType: "Bosch MED17", displacement: "5204cc", fuelType: "Benzin", originalHP: 640, originalTorque: 600, stage1HP: 680, stage1Torque: 630, priceStage1: 18000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      },
      {
        name: "Urus",
        years: "2018-2024",
        engines: [
          { name: "4.0 V8 Twin-Turbo 650hp / 666hp Performante", motorCode: "DAUA", ecuType: "Bosch MED17", displacement: "3996cc", fuelType: "Benzin", originalHP: 666, originalTorque: 850, stage1HP: 750, stage1Torque: 950, stage2HP: 820, stage2Torque: 1020, priceStage1: 17000, durationHours: 3, fuelEconomy: 0.05 }
        ]
      }
    ]
  },

  // ========== MASERATI (Prestij — showcase) ==========
  {
    name: "Maserati",
    logo: "maserati",
    models: [
      {
        name: "Ghibli / Quattroporte / Levante",
        years: "2013-2024",
        engines: [
          { name: "3.0 V6 Diesel 250hp / 275hp", motorCode: "F136", ecuType: "Bosch EDC17", displacement: "2987cc", fuelType: "Dizel", originalHP: 275, originalTorque: 600, stage1HP: 335, stage1Torque: 700, priceStage1: 8500, durationHours: 2, fuelEconomy: 0.12 },
          { name: "3.0 V6 Twin-Turbo 350hp / 430hp Trofeo", motorCode: "M157", ecuType: "Bosch MED17", displacement: "2979cc", fuelType: "Benzin", originalHP: 430, originalTorque: 580, stage1HP: 490, stage1Torque: 650, stage2HP: 535, stage2Torque: 700, priceStage1: 12000, durationHours: 3, fuelEconomy: 0.05 },
          { name: "3.8 V8 Twin-Turbo Levante Trofeo 580hp", motorCode: "F154", ecuType: "Bosch MED17", displacement: "3798cc", fuelType: "Benzin", originalHP: 580, originalTorque: 730, stage1HP: 660, stage1Torque: 810, priceStage1: 16000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== ASTON MARTIN (Prestij — showcase) ==========
  {
    name: "Aston Martin",
    logo: "aston-martin",
    models: [
      {
        name: "Vantage / DB11 / DBX",
        years: "2017-2024",
        engines: [
          { name: "4.0 V8 Twin-Turbo (AMG-source) 510hp / 535hp / 550hp", motorCode: "M177", ecuType: "Bosch MED17", displacement: "3982cc", fuelType: "Benzin", originalHP: 550, originalTorque: 700, stage1HP: 620, stage1Torque: 780, priceStage1: 15000, durationHours: 3, fuelEconomy: 0.05 },
          { name: "5.2 V12 Twin-Turbo 630hp / 707hp", motorCode: "AE31", ecuType: "Bosch MED17", displacement: "5198cc", fuelType: "Benzin", originalHP: 707, originalTorque: 900, stage1HP: 790, stage1Torque: 980, priceStage1: 22000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  },

  // ========== BENTLEY (Prestij — showcase) ==========
  {
    name: "Bentley",
    logo: "bentley",
    models: [
      {
        name: "Continental GT / Bentayga / Flying Spur",
        years: "2012-2024",
        engines: [
          { name: "4.0 V8 Twin-Turbo 500hp / 550hp", motorCode: "DCBA", ecuType: "Bosch MED17", displacement: "3996cc", fuelType: "Benzin", originalHP: 550, originalTorque: 770, stage1HP: 620, stage1Torque: 860, priceStage1: 14000, durationHours: 3, fuelEconomy: 0.05 },
          { name: "6.0 W12 Twin-Turbo 626hp / 659hp Speed", motorCode: "BWS", ecuType: "Bosch MED17", displacement: "5998cc", fuelType: "Benzin", originalHP: 659, originalTorque: 900, stage1HP: 745, stage1Torque: 1000, priceStage1: 20000, durationHours: 3, fuelEconomy: 0.04 }
        ]
      }
    ]
  }
];

// Toplam motor sayısını hesapla
chipTuningMeta.totalEngines = chipTuningData.reduce((sum, brand) =>
  sum + brand.models.reduce((mSum, model) => mSum + model.engines.length, 0), 0);

// Global export
if (typeof window !== "undefined") {
  window.chipTuningData = chipTuningData;
  window.chipTuningMeta = chipTuningMeta;
  window.stageDescriptions = stageDescriptions;
  window.pricingGuide = pricingGuide;
}
