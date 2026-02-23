"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { 
  chipTuningData, 
  stageDescriptions
} from "@/lib/content/chip-tuning-data";
import { 
  Car, 
  Gauge, 
  Zap, 
  TrendingUp, 
  ChevronDown,
  Check,
  MessageCircle,
  RotateCcw
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/content/site-config";
import { cn } from "@/lib/utils";

export function ChipTuningCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  // Dropdown open states
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [engineOpen, setEngineOpen] = useState(false);

  // Get available models based on selected brand
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    const brand = chipTuningData.find(b => b.name === selectedBrand);
    return brand?.models || [];
  }, [selectedBrand]);

  // Get available years based on selected model
  const availableYears = useMemo(() => {
    if (!selectedModel) return [];
    const model = availableModels.find(m => m.name === selectedModel);
    return model?.years || [];
  }, [selectedModel, availableModels]);

  // Get available engines based on selected model
  const availableEngines = useMemo(() => {
    if (!selectedModel) return [];
    const model = availableModels.find(m => m.name === selectedModel);
    return model?.engines || [];
  }, [selectedModel, availableModels]);

  // Get selected engine data
  const engineData = useMemo(() => {
    if (!selectedEngine) return null;
    return availableEngines.find(e => `${e.name} - ${e.originalHP}HP` === selectedEngine);
  }, [selectedEngine, availableEngines]);

  // Reset downstream selections when parent changes
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setShowResults(false);
    setBrandOpen(false);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear("");
    setSelectedEngine("");
    setShowResults(false);
    setModelOpen(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedEngine("");
    setShowResults(false);
    setYearOpen(false);
  };

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine);
    setShowResults(false);
    setEngineOpen(false);
  };

  const handleCalculate = () => {
    if (selectedBrand && selectedModel && selectedYear && selectedEngine) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedEngine("");
    setShowResults(false);
  };

  // Calculate percentage increases
  const calculateIncrease = (original: number, tuned: number) => {
    return Math.round(((tuned - original) / original) * 100);
  };

  return (
    <SectionWrapper id="chip-tuning-calculator" className="noise-overlay">
      {/* Decorative */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-brand/3 rounded-full blur-[100px]" />

      <SectionHeader
        title="Chip Tuning Hesaplama"
        subtitle="Aracınızı seçin, yazılım sonrası güç ve tork değerlerini anında görün."
      />

      <div className="max-w-5xl mx-auto">
        {/* Selection Form */}
        <ScrollReveal>
          <div className="bg-black/40 backdrop-blur-sm border border-brand/20 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Brand Select */}
              <div className="relative">
                <label className="block text-xs font-semibold text-brand/80 mb-2 uppercase tracking-wider">
                  1. Marka Seçin
                </label>
                <button
                  onClick={() => setBrandOpen(!brandOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300",
                    "bg-black/50 text-left",
                    brandOpen ? "border-brand ring-2 ring-brand/20" : "border-white/10 hover:border-brand/50"
                  )}
                >
                  <span className={selectedBrand ? "text-white" : "text-white/50"}>
                    {selectedBrand || "Marka seçin"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-brand transition-transform", brandOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {brandOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 w-full bg-black border border-brand/30 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {chipTuningData.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => handleBrandChange(brand.name)}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-brand/10 transition-colors flex items-center gap-2",
                            selectedBrand === brand.name && "bg-brand/20 text-brand"
                          )}
                        >
                          <Car className="h-4 w-4" />
                          {brand.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Model Select */}
              <div className="relative">
                <label className="block text-xs font-semibold text-brand/80 mb-2 uppercase tracking-wider">
                  2. Model Seçin
                </label>
                <button
                  onClick={() => selectedBrand && setModelOpen(!modelOpen)}
                  disabled={!selectedBrand}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300",
                    "bg-black/50 text-left",
                    !selectedBrand && "opacity-50 cursor-not-allowed",
                    modelOpen ? "border-brand ring-2 ring-brand/20" : "border-white/10 hover:border-brand/50"
                  )}
                >
                  <span className={selectedModel ? "text-white" : "text-white/50"}>
                    {selectedModel || "Önce marka seçin"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-brand transition-transform", modelOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {modelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 w-full bg-black border border-brand/30 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                      {availableModels.map((model) => (
                        <button
                          key={model.name}
                          onClick={() => handleModelChange(model.name)}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-brand/10 transition-colors",
                            selectedModel === model.name && "bg-brand/20 text-brand"
                          )}
                        >
                          {model.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Year Select */}
              <div className="relative">
                <label className="block text-xs font-semibold text-brand/80 mb-2 uppercase tracking-wider">
                  3. Yıl Seçin
                </label>
                <button
                  onClick={() => selectedModel && setYearOpen(!yearOpen)}
                  disabled={!selectedModel}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300",
                    "bg-black/50 text-left",
                    !selectedModel && "opacity-50 cursor-not-allowed",
                    yearOpen ? "border-brand ring-2 ring-brand/20" : "border-white/10 hover:border-brand/50"
                  )}
                >
                  <span className={selectedYear ? "text-white" : "text-white/50"}>
                    {selectedYear || "Önce model seçin"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-brand transition-transform", yearOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {yearOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 w-full bg-black border border-brand/30 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearChange(year)}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-brand/10 transition-colors",
                            selectedYear === year && "bg-brand/20 text-brand"
                          )}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Engine Select */}
              <div className="relative">
                <label className="block text-xs font-semibold text-brand/80 mb-2 uppercase tracking-wider">
                  4. Motor Seçin
                </label>
                <button
                  onClick={() => selectedYear && setEngineOpen(!engineOpen)}
                  disabled={!selectedYear}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300",
                    "bg-black/50 text-left",
                    !selectedYear && "opacity-50 cursor-not-allowed",
                    engineOpen ? "border-brand ring-2 ring-brand/20" : "border-white/10 hover:border-brand/50"
                  )}
                >
                  <span className={selectedEngine ? "text-white" : "text-white/50"}>
                    {selectedEngine || "Önce yıl seçin"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-brand transition-transform", engineOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {engineOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 w-full bg-black border border-brand/30 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                      {availableEngines.map((engine, idx) => (
                        <button
                          key={`${engine.name}-${engine.originalHP}-${idx}`}
                          onClick={() => handleEngineChange(`${engine.name} - ${engine.originalHP}HP`)}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-brand/10 transition-colors flex items-center justify-between",
                            selectedEngine === `${engine.name} - ${engine.originalHP}HP` && "bg-brand/20 text-brand"
                          )}
                        >
                          <span>{engine.name} - {engine.originalHP}HP</span>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded",
                            engine.fuelType === "Dizel" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
                          )}>
                            {engine.fuelType}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleCalculate}
                disabled={!selectedEngine}
                className="flex-1 bg-brand hover:bg-brand-light text-black font-bold h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Gauge className="mr-2 h-5 w-5" />
                Hesapla
              </Button>
              {showResults && (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-white/20 hover:bg-white/5"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Sıfırla
                </Button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && engineData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {/* Vehicle Info Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedBrand} {selectedModel}
                </h3>
                <p className="text-brand">
                  {selectedYear} • {engineData.name} • {engineData.displacement} • {engineData.fuelType}
                </p>
              </div>

              {/* Original Values */}
              <ScrollReveal delay={0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-white/80 mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-white/60" />
                    Orijinal Fabrika Değerleri
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-3xl md:text-4xl font-black text-white/60">
                        {engineData.originalHP}
                      </div>
                      <div className="text-sm text-white/40 font-medium">HP (Beygir)</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-3xl md:text-4xl font-black text-white/60">
                        {engineData.originalTorque}
                      </div>
                      <div className="text-sm text-white/40 font-medium">Nm (Tork)</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Stage Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stage 1 */}
                <ScrollReveal delay={0.2}>
                  <StageCard
                    stage={stageDescriptions.stage1}
                    originalHP={engineData.originalHP}
                    originalTorque={engineData.originalTorque}
                    tunedHP={engineData.stage1HP}
                    tunedTorque={engineData.stage1Torque}
                    calculateIncrease={calculateIncrease}
                  />
                </ScrollReveal>

                {/* Stage 2 */}
                <ScrollReveal delay={0.3}>
                  {engineData.stage2HP && engineData.stage2Torque ? (
                    <StageCard
                      stage={stageDescriptions.stage2}
                      originalHP={engineData.originalHP}
                      originalTorque={engineData.originalTorque}
                      tunedHP={engineData.stage2HP}
                      tunedTorque={engineData.stage2Torque}
                      calculateIncrease={calculateIncrease}
                    />
                  ) : (
                    <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="text-white/30 mb-2">Stage 2</div>
                      <div className="text-white/50 text-sm">Bu motor için Stage 2 yazılımı mevcut değil</div>
                    </div>
                  )}
                </ScrollReveal>

                {/* Stage 3 */}
                <ScrollReveal delay={0.4}>
                  {engineData.stage3HP && engineData.stage3Torque ? (
                    <StageCard
                      stage={stageDescriptions.stage3}
                      originalHP={engineData.originalHP}
                      originalTorque={engineData.originalTorque}
                      tunedHP={engineData.stage3HP}
                      tunedTorque={engineData.stage3Torque}
                      calculateIncrease={calculateIncrease}
                    />
                  ) : (
                    <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="text-white/30 mb-2">Stage 3</div>
                      <div className="text-white/50 text-sm">Bu motor için Stage 3 yazılımı mevcut değil</div>
                    </div>
                  )}
                </ScrollReveal>
              </div>

              {/* CTA */}
              <ScrollReveal delay={0.5}>
                <div className="mt-8 bg-gradient-to-r from-brand/20 to-brand/5 border border-brand/30 rounded-2xl p-6 md:p-8 text-center">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Aracınız için teklif almak ister misiniz?
                  </h4>
                  <p className="text-white/60 mb-6">
                    WhatsApp üzerinden hemen iletişime geçin, size özel fiyat teklifimizi sunalım.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white font-bold h-12 px-8"
                      asChild
                    >
                      <a 
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumbers[0]?.raw}?text=Merhaba, ${selectedBrand} ${selectedModel} ${selectedYear} ${engineData.name} aracım için chip tuning teklifi almak istiyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp ile Teklif Al
                      </a>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

// Stage Card Component
interface StageCardProps {
  stage: typeof stageDescriptions.stage1;
  originalHP: number;
  originalTorque: number;
  tunedHP: number;
  tunedTorque: number;
  calculateIncrease: (original: number, tuned: number) => number;
}

function StageCard({ stage, originalHP, originalTorque, tunedHP, tunedTorque, calculateIncrease }: StageCardProps) {
  const hpIncrease = calculateIncrease(originalHP, tunedHP);
  const hpGain = tunedHP - originalHP;
  const torqueGain = tunedTorque - originalTorque;

  return (
    <div className={cn(
      "h-full border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]",
      stage.bgColor,
      stage.borderColor
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className={cn("text-lg font-bold", stage.textColor)}>{stage.title}</h4>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-bold",
          `bg-gradient-to-r ${stage.color} text-white`
        )}>
          +{hpIncrease}%
        </div>
      </div>

      {/* Values */}
      <div className="space-y-4 mb-6">
        {/* HP */}
        <div>
          <div className="flex items-center justify-between text-sm text-white/60 mb-1">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Güç (HP)
            </span>
            <span className="text-green-400">+{hpGain} HP</span>
          </div>
          <div className="relative h-8 bg-black/30 rounded-lg overflow-hidden">
            {/* Original bar */}
            <div 
              className="absolute inset-y-0 left-0 bg-white/20"
              style={{ width: `${(originalHP / tunedHP) * 100}%` }}
            />
            {/* Tuned bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className={cn("absolute inset-y-0 left-0 bg-gradient-to-r", stage.color)}
              style={{ opacity: 0.8 }}
            />
            {/* Value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {originalHP} → {tunedHP} HP
              </span>
            </div>
          </div>
        </div>

        {/* Torque */}
        <div>
          <div className="flex items-center justify-between text-sm text-white/60 mb-1">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Tork (Nm)
            </span>
            <span className="text-green-400">+{torqueGain} Nm</span>
          </div>
          <div className="relative h-8 bg-black/30 rounded-lg overflow-hidden">
            {/* Original bar */}
            <div 
              className="absolute inset-y-0 left-0 bg-white/20"
              style={{ width: `${(originalTorque / tunedTorque) * 100}%` }}
            />
            {/* Tuned bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className={cn("absolute inset-y-0 left-0 bg-gradient-to-r", stage.color)}
              style={{ opacity: 0.8 }}
            />
            {/* Value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {originalTorque} → {tunedTorque} Nm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        {stage.benefits.slice(0, 3).map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
            <Check className={cn("h-3 w-3", stage.textColor)} />
            {benefit}
          </div>
        ))}
      </div>
    </div>
  );
}
