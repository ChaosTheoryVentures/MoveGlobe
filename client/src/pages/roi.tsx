import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";
import { Calculator, TrendingUp, DollarSign, Clock, CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from "react-router-dom";

interface ROICalculatorData {
  revenue: string;
  employees: string;
  challenges: string[];
}

interface ROIResults {
  annualSavings: number;
  implementationCost: number;
  roiPercentage: number;
  paybackMonths: number;
  productivityGain: number;
  breakdown: {
    laborSavings: number;
    efficiencyGains: number;
    errorReduction: number;
    revenueIncrease: number;
  };
}

export default function ROI() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState<ROICalculatorData>({
    revenue: '',
    employees: '',
    challenges: []
  });
  const [results, setResults] = useState<ROIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const challenges = [
    'manual-processes',
    'data-analysis', 
    'customer-service',
    'inventory',
    'compliance',
    'decision-making',
    'quality-control',
    'resource-planning'
  ];

  const handleChallengeToggle = (challenge: string) => {
    setCalculatorData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const calculateROI = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // ROI Calculation Logic
    const revenueMultipliers = {
      '500k-2m': { base: 1000000, multiplier: 0.15 },
      '2m-10m': { base: 6000000, multiplier: 0.20 },
      '10m-50m': { base: 30000000, multiplier: 0.25 },
      '50m+': { base: 75000000, multiplier: 0.30 }
    };

    const employeeMultipliers = {
      '1-10': 0.8,
      '11-50': 1.0,
      '51-200': 1.2,
      '201-500': 1.4,
      '500+': 1.6
    };

    const industryMultipliers = {
      'financial': 1.3,
      'healthcare': 1.1,
      'retail': 1.2,
      'manufacturing': 1.4,
      'technology': 1.5,
      'other': 1.0
    };

    const challengeValues = {
      'manual-processes': 0.15,
      'data-analysis': 0.12,
      'customer-service': 0.10,
      'inventory': 0.08,
      'compliance': 0.06,
      'decision-making': 0.10,
      'quality-control': 0.08,
      'resource-planning': 0.12
    };

    // Base calculations
    const revenueData = revenueMultipliers[calculatorData.revenue as keyof typeof revenueMultipliers];
    const baseSavings = revenueData.base * revenueData.multiplier;
    
    const employeeMultiplier = employeeMultipliers[calculatorData.employees as keyof typeof employeeMultipliers] || 1;
    const industryMultiplier = 1;
    
    const challengeMultiplier = calculatorData.challenges.reduce((sum, challenge) => {
      return sum + (challengeValues[challenge as keyof typeof challengeValues] || 0);
    }, 0.5); // Base multiplier of 0.5

    // Calculate total annual savings
    const annualSavings = Math.round(baseSavings * employeeMultiplier * industryMultiplier * challengeMultiplier);
    
    // Implementation cost (typically 20-40% of first year savings)
    const implementationCost = Math.round(annualSavings * 0.3);
    
    // ROI percentage
    const roiPercentage = Math.round(((annualSavings - implementationCost) / implementationCost) * 100);
    
    // Payback period in months
    const paybackMonths = Math.round((implementationCost / annualSavings) * 12);
    
    // Productivity gain percentage
    const productivityGain = Math.round(15 + (calculatorData.challenges.length * 5));

    // Breakdown of savings
    const laborSavings = Math.round(annualSavings * 0.4);
    const efficiencyGains = Math.round(annualSavings * 0.3);
    const errorReduction = Math.round(annualSavings * 0.15);
    const revenueIncrease = Math.round(annualSavings * 0.15);

    const calculatedResults: ROIResults = {
      annualSavings,
      implementationCost,
      roiPercentage,
      paybackMonths,
      productivityGain,
      breakdown: {
        laborSavings,
        efficiencyGains,
        errorReduction,
        revenueIncrease
      }
    };

    setResults(calculatedResults);
    setCurrentStep(3);
    setIsCalculating(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const canProceedToStep2 = calculatorData.revenue && calculatorData.employees;
  const canCalculate = canProceedToStep2 && calculatorData.challenges.length > 0;

  return (
    <div className="min-h-screen relative flex flex-col" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarsBackground />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-1 pt-24 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Calculator className="w-12 h-12 text-[#4746a4] mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {t('roi.title')}
                </h1>
              </div>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {t('roi.subtitle')}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step 
                        ? 'bg-[#4746a4] text-white' 
                        : 'bg-white/20 text-white/60'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-[#4746a4]' : 'bg-white/20'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  {t('roi.step1.title')}
                </h2>
                
                <div className="space-y-6">
                  {/* Revenue */}
                  <div>
                    <label className="block text-white/80 mb-3 text-lg font-medium">
                      {t('roi.revenue.label')}
                    </label>
                    <select
                      value={calculatorData.revenue}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, revenue: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4746a4] focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="">{t('roi.revenue.placeholder')}</option>
                      <option value="500k-2m">{t('roi.revenue.500k-2m')}</option>
                      <option value="2m-10m">{t('roi.revenue.2m-10m')}</option>
                      <option value="10m-50m">{t('roi.revenue.10m-50m')}</option>
                      <option value="50m+">{t('roi.revenue.50m+')}</option>
                    </select>
                  </div>

                  {/* Employees */}
                  <div>
                    <label className="block text-white/80 mb-3 text-lg font-medium">
                      {t('roi.employees.label')}
                    </label>
                    <select
                      value={calculatorData.employees}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, employees: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#4746a4] focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="">{t('roi.employees.placeholder')}</option>
                      <option value="1-10">{t('roi.employees.1-10')}</option>
                      <option value="11-50">{t('roi.employees.11-50')}</option>
                      <option value="51-200">{t('roi.employees.51-200')}</option>
                      <option value="201-500">{t('roi.employees.201-500')}</option>
                      <option value="500+">{t('roi.employees.500+')}</option>
                    </select>
                  </div>

                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      canProceedToStep2
                        ? 'bg-[#4746a4] hover:bg-[#4746a4]/80 text-white'
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    {t('common.next')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Challenges */}
            {currentStep === 2 && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  {t('roi.step2.title')}
                </h2>
                
                <div>
                  <label className="block text-white/80 mb-4 text-lg font-medium">
                    {t('roi.challenges.label')}
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge}
                        onClick={() => handleChallengeToggle(challenge)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          calculatorData.challenges.includes(challenge)
                            ? 'bg-[#4746a4]/20 border-[#4746a4] text-white'
                            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            calculatorData.challenges.includes(challenge)
                              ? 'border-[#4746a4] bg-[#4746a4]'
                              : 'border-white/40'
                          }`}>
                            {calculatorData.challenges.includes(challenge) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">
                            {t(`roi.challenge.${challenge}`)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('common.previous')}
                  </button>
                  <button
                    onClick={calculateROI}
                    disabled={!canCalculate || isCalculating}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      canCalculate && !isCalculating
                        ? 'bg-[#4746a4] hover:bg-[#4746a4]/80 text-white'
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                        {t('common.loading')}
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        {t('roi.calculate.button')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && results && (
              <div className="space-y-8">
                {/* Main Results */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" />
                    {t('roi.results.title')}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-[#4746a4] mb-2">
                        {formatCurrency(results.annualSavings)}
                      </div>
                      <div className="text-white/80 text-sm">
                        {t('roi.results.annual-savings')}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-white mb-2">
                        {results.roiPercentage}%
                      </div>
                      <div className="text-white/80 text-sm">
                        {t('roi.results.roi-percentage')}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-white mb-2">
                        {results.paybackMonths} mo
                      </div>
                      <div className="text-white/80 text-sm">
                        {t('roi.results.payback-period')}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-3xl font-bold text-white mb-2">
                        +{results.productivityGain}%
                      </div>
                      <div className="text-white/80 text-sm">
                        {t('roi.results.productivity-gain')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {t('roi.breakdown.title')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">{t('roi.breakdown.labor-savings')}</span>
                      <span className="text-white font-semibold">{formatCurrency(results.breakdown.laborSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">{t('roi.breakdown.efficiency-gains')}</span>
                      <span className="text-white font-semibold">{formatCurrency(results.breakdown.efficiencyGains)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">{t('roi.breakdown.error-reduction')}</span>
                      <span className="text-white font-semibold">{formatCurrency(results.breakdown.errorReduction)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">{t('roi.breakdown.revenue-increase')}</span>
                      <span className="text-white font-semibold">{formatCurrency(results.breakdown.revenueIncrease)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-white font-bold">{t('roi.results.implementation-cost')}</span>
                        <span className="text-red-300 font-semibold">-{formatCurrency(results.implementationCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consultation CTA */}
                <div className="bg-gradient-to-r from-[#4746a4]/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('roi.consultation.title')}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {t('roi.consultation.description')}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {t('roi.consultation.benefits')}
                    </h4>
                    <ul className="space-y-2">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-center text-white/80">
                          <CheckCircle className="w-5 h-5 text-[#4746a4] mr-2 flex-shrink-0" />
                          {t(`roi.consultation.benefit${num}`)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/consult"
                    className="inline-flex items-center bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
                  >
                    {t('roi.consultation.cta')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>

                {/* Disclaimer */}
                <div className="text-center">
                  <p className="text-white/60 text-sm">
                    {t('roi.disclaimer')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}