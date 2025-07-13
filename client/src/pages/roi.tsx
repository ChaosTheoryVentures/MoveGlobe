import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight, Building2, Users, DollarSign, Clock, TrendingUp, Settings, Play, Edit3, CheckCircle, X, Calculator, Zap, Target } from 'lucide-react';

const DynamicBusinessDemo = () => {
  const { t } = useLanguage();
  const [demo, setDemo] = useState({
    currentStep: 0,
    businessData: {
      industry: '',
      monthlyVolume: 0,
      avgCostPerRequest: 0,
      currentResponseTime: 0
    },
    workflow: [
      { id: '1', name: 'Receive & Parse', description: 'AI reads and understands request', timeSeconds: 2, costEuro: 0.25, enabled: true, customizable: false },
      { id: '2', name: 'Data Lookup', description: 'Check CRM, knowledge base, inventory', timeSeconds: 3, costEuro: 0.85, enabled: true, customizable: true },
      { id: '3', name: 'Business Rules', description: 'Apply your custom logic and policies', timeSeconds: 1, costEuro: 0.15, enabled: true, customizable: true },
      { id: '4', name: 'Generate Response', description: 'Create personalized, branded reply', timeSeconds: 4, costEuro: 1.20, enabled: true, customizable: true },
      { id: '5', name: 'Human Review', description: 'Optional approval before sending', timeSeconds: 0, costEuro: 0, enabled: false, customizable: true },
      { id: '6', name: 'Send & Track', description: 'Deliver response and log analytics', timeSeconds: 1, costEuro: 0.35, enabled: true, customizable: false }
    ],
    isRunning: false,
    currentWorkflowStep: 0,
    results: {
      aiCost: 0,
      timeSaved: 0,
      monthlySavings: 0,
      roiPercent: 0,
      monthlyPlatformFee: 1500,
      setupFee: 9500,
      totalMonthlyAiCost: 0
    },
    showCustomization: false
  });

  const industries = [
    { name: 'E-commerce', volume: 500, cost: 18, responseTime: 180 },
    { name: 'SaaS/Tech', volume: 200, cost: 28, responseTime: 240 },
    { name: 'Professional Services', volume: 150, cost: 45, responseTime: 300 },
    { name: 'Healthcare', volume: 300, cost: 22, responseTime: 120 },
    { name: 'Real Estate', volume: 100, cost: 55, responseTime: 360 },
    { name: 'Financial Services', volume: 250, cost: 38, responseTime: 180 }
  ];

  const calculateResults = () => {
    const enabledSteps = demo.workflow.filter(step => step.enabled);
    const totalAiTime = enabledSteps.reduce((sum, step) => sum + step.timeSeconds, 0);
    const totalAiCostPerRequest = enabledSteps.reduce((sum, step) => sum + step.costEuro, 0);
    
    const monthlyUsageCost = totalAiCostPerRequest * demo.businessData.monthlyVolume;
    const monthlyPlatformFee = 1500;
    const totalMonthlyAiCost = monthlyUsageCost + monthlyPlatformFee;
    const setupFee = 9500;
    
    const currentMonthlyCost = demo.businessData.avgCostPerRequest * demo.businessData.monthlyVolume;
    const timeSavedPerRequest = demo.businessData.currentResponseTime - totalAiTime;
    const monthlySavings = currentMonthlyCost - totalMonthlyAiCost;
    
    const annualSavings = monthlySavings * 12;
    const totalFirstYearCost = totalMonthlyAiCost * 12 + setupFee;
    const roiPercent = annualSavings > 0 ? Math.min(((annualSavings - setupFee) / totalFirstYearCost) * 100, 450) : 0;

    setDemo(prev => ({
      ...prev,
      results: {
        aiCost: totalAiCostPerRequest,
        timeSaved: timeSavedPerRequest,
        monthlySavings: monthlySavings,
        roiPercent: roiPercent,
        monthlyPlatformFee: monthlyPlatformFee,
        setupFee: setupFee,
        totalMonthlyAiCost: totalMonthlyAiCost
      }
    }));
  };

  useEffect(() => {
    if (demo.currentStep >= 2) {
      calculateResults();
    }
  }, [demo.workflow, demo.businessData, demo.currentStep]);

  const runWorkflow = async () => {
    setDemo(prev => ({ ...prev, isRunning: true, currentWorkflowStep: 0 }));
    
    const enabledSteps = demo.workflow.filter(step => step.enabled);
    for (let i = 0; i < enabledSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, enabledSteps[i].timeSeconds * 200));
      setDemo(prev => ({ ...prev, currentWorkflowStep: i + 1 }));
    }
    
    setDemo(prev => ({ ...prev, isRunning: false }));
  };

  const toggleWorkflowStep = (stepId) => {
    setDemo(prev => ({
      ...prev,
      workflow: prev.workflow.map(step => 
        step.id === stepId ? { ...step, enabled: !step.enabled } : step
      )
    }));
  };

  const nextStep = () => setDemo(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));

  // Step 1: Business Questions
  if (demo.currentStep === 0) {
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
          <div className="flex-1 pt-24 pb-24 px-4 flex items-center justify-center">
            <div className="max-w-3xl w-full">
              <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4 text-white">
                  Let's Build <span className="text-green-400">Your AI</span>
                </h1>
                <p className="text-xl text-white/80">
                  3 quick questions to calculate your exact ROI
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 space-y-8">
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <Building2 className="w-6 h-6 mr-3 text-blue-400" />
                    What's your industry?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {industries.map((industry) => (
                      <button
                        key={industry.name}
                        onClick={() => setDemo(prev => ({
                          ...prev,
                          businessData: {
                            industry: industry.name,
                            monthlyVolume: industry.volume,
                            avgCostPerRequest: industry.cost,
                            currentResponseTime: industry.responseTime
                          }
                        }))}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          demo.businessData.industry === industry.name
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="font-semibold text-white">{industry.name}</div>
                        <div className="text-sm text-white/60 mt-1">
                          ~{industry.volume} requests/month • €{industry.cost} avg cost
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {demo.businessData.industry && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                      <Users className="w-6 h-6 mr-3 text-purple-400" />
                      How many customer requests do you handle monthly?
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {[50, 150, 500, 1000].map((volume) => (
                        <button
                          key={volume}
                          onClick={() => setDemo(prev => ({
                            ...prev,
                            businessData: { ...prev.businessData, monthlyVolume: volume }
                          }))}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            demo.businessData.monthlyVolume === volume
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}
                        >
                          <div className="text-2xl font-bold text-white">{volume}</div>
                          <div className="text-sm text-white/60">per month</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={demo.businessData.monthlyVolume}
                        onChange={(e) => setDemo(prev => ({
                          ...prev,
                          businessData: { ...prev.businessData, monthlyVolume: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center mt-2 text-white/60">
                        Custom: {demo.businessData.monthlyVolume} requests/month
                      </div>
                    </div>
                  </div>
                )}

                {demo.businessData.monthlyVolume > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                      <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                      What does each request cost you now?
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {[15, 35, 65, 120].map((cost) => (
                        <button
                          key={cost}
                          onClick={() => setDemo(prev => ({
                            ...prev,
                            businessData: { ...prev.businessData, avgCostPerRequest: cost }
                          }))}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            demo.businessData.avgCostPerRequest === cost
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}
                        >
                          <div className="text-2xl font-bold text-white">€{cost}</div>
                          <div className="text-sm text-white/60">per request</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="range"
                        min="10"
                        max="250"
                        step="5"
                        value={demo.businessData.avgCostPerRequest}
                        onChange={(e) => setDemo(prev => ({
                          ...prev,
                          businessData: { ...prev.businessData, avgCostPerRequest: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center mt-2 text-white/60">
                        Custom: €{demo.businessData.avgCostPerRequest} per request
                      </div>
                    </div>
                  </div>
                )}

                {demo.businessData.avgCostPerRequest > 0 && (
                  <div className="pt-6 border-t border-white/20">
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-white mb-3">Your Current Situation:</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Industry: </span>
                          <span className="text-white">{demo.businessData.industry}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Monthly Volume: </span>
                          <span className="text-white">{demo.businessData.monthlyVolume} requests</span>
                        </div>
                        <div>
                          <span className="text-white/60">Cost per Request: </span>
                          <span className="text-white">€{demo.businessData.avgCostPerRequest}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Monthly Cost: </span>
                          <span className="text-red-400 font-bold">
                            €{(demo.businessData.monthlyVolume * demo.businessData.avgCostPerRequest).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={nextStep}
                      className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-lg transition-all flex items-center justify-center space-x-3"
                    >
                      <span>Build My AI Workflow</span>
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Step 2: Interactive Workflow Builder
  if (demo.currentStep === 1) {
    const enabledSteps = demo.workflow.filter(step => step.enabled);
    const totalTime = enabledSteps.reduce((sum, step) => sum + step.timeSeconds, 0);
    const totalCost = enabledSteps.reduce((sum, step) => sum + step.costEuro, 0);

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
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">
                  Your AI Workflow for <span className="text-green-400">{demo.businessData.industry}</span>
                </h1>
                <p className="text-white/60">Watch how AI processes your requests faster than any human team</p>
                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-white/80">Lightning Fast: {totalTime}s average</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-white/80">Always Available: 24/7/365</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-white/80">Zero Errors: 100% consistent</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">Workflow Steps</h2>
                      <button
                        onClick={() => setDemo(prev => ({ ...prev, showCustomization: !prev.showCustomization }))}
                        className="px-4 py-2 border border-white/20 text-white/80 rounded-lg hover:border-white/40 transition-all flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Customize</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {demo.workflow.map((step, index) => {
                        const isActive = demo.isRunning && demo.currentWorkflowStep === index + 1;
                        const isCompleted = demo.currentWorkflowStep > index;
                        
                        return (
                          <div key={step.id} className={`p-4 rounded-lg border transition-all ${
                            !step.enabled ? 'border-white/20 bg-white/5 opacity-50' :
                            isActive ? 'border-blue-500 bg-blue-500/10' :
                            isCompleted ? 'border-green-500 bg-green-500/10' :
                            'border-white/20 bg-white/5'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  !step.enabled ? 'bg-white/20 text-white/40' :
                                  isCompleted ? 'bg-green-500 text-white' :
                                  isActive ? 'bg-blue-500 text-white' :
                                  'bg-white/20 text-white/60'
                                }`}>
                                  {!step.enabled ? '−' : isCompleted ? '✓' : index + 1}
                                </div>
                                <div>
                                  <h3 className={`font-semibold ${step.enabled ? 'text-white' : 'text-white/50'}`}>
                                    {step.name}
                                  </h3>
                                  <p className={`text-sm ${step.enabled ? 'text-white/70' : 'text-white/40'}`}>
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="text-right text-sm">
                                  <div className={step.enabled ? 'text-white/70' : 'text-white/40'}>
                                    {step.timeSeconds}s • €{step.costEuro.toFixed(2)}
                                  </div>
                                </div>
                                
                                {demo.showCustomization && step.customizable && (
                                  <button
                                    onClick={() => toggleWorkflowStep(step.id)}
                                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                                      step.enabled 
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                        : 'bg-white/10 text-white/60 border border-white/20'
                                    }`}
                                  >
                                    {step.enabled ? 'Enabled' : 'Disabled'}
                                  </button>
                                )}
                                
                                {isActive && (
                                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-4 border border-blue-500/30">
                        <div className="text-center mb-2">
                          <h4 className="font-semibold text-white">AI Processing Performance</h4>
                          <p className="text-sm text-white/60">Current workflow completes in {totalTime} seconds</p>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000" 
                            style={{ width: `${Math.min((totalTime / 15) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-white/60 text-center">
                          Faster than 95% of manual processes
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button
                          onClick={runWorkflow}
                          disabled={demo.isRunning}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:bg-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                        >
                          {demo.isRunning ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing at AI Speed...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>▶ Watch AI in Action</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={nextStep}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                        >
                          <span>💰 Calculate My Savings</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">AI Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Processing Speed</span>
                        <span className="font-bold text-green-400">{totalTime}s per request</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">AI Usage Cost</span>
                        <span className="font-bold text-blue-400">€{totalCost.toFixed(2)} per request</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Steps Enabled</span>
                        <span className="font-bold text-purple-400">{enabledSteps.length} of {demo.workflow.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Automation Level</span>
                        <span className="font-bold text-green-400">
                          {Math.round((enabledSteps.length / demo.workflow.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                    <h3 className="font-semibold text-white mb-4">Speed Comparison</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">Current Manual Process</span>
                          <span className="text-red-400">{demo.businessData.currentResponseTime}s</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-red-400 h-2 rounded-full" 
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">AI Workflow</span>
                          <span className="text-green-400">{totalTime}s</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: `${Math.min((totalTime / demo.businessData.currentResponseTime) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/20">
                        <div className="text-center">
                          <span className="text-white/60 text-sm">
                            {Math.round(((demo.businessData.currentResponseTime - totalTime) / demo.businessData.currentResponseTime) * 100)}% faster
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h3 className="font-semibold text-white mb-2">AI Capabilities</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        24/7 availability
                      </div>
                      <div className="flex items-center text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Consistent quality
                      </div>
                      <div className="flex items-center text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Instant scalability
                      </div>
                      <div className="flex items-center text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Zero training time
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Step 3: Results & ROI
  if (demo.currentStep === 2) {
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  💰 Your <span className="text-green-400">AI ROI</span> Results 💰
                </h1>
                <p className="text-xl text-white/80">Here's exactly how much you'll save with AI</p>
                <div className="mt-4 inline-flex items-center bg-green-500/20 border border-green-500/50 rounded-full px-6 py-2">
                  <span className="text-green-400 font-semibold">
                    🎯 Based on {demo.businessData.monthlyVolume} monthly requests for {demo.businessData.industry}
                  </span>
                </div>
              </div>

              {/* Big Impact Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-l-4 border-green-500 rounded-2xl p-8 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-green-400 mb-3">
                    €{demo.results.monthlySavings.toFixed(0)}
                  </div>
                  <div className="text-lg text-white font-semibold mb-2">Monthly Savings</div>
                  <div className="text-sm text-green-300">
                    €{(demo.results.monthlySavings * 12).toLocaleString()} per year
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-l-4 border-blue-500 rounded-2xl p-8 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3">
                    {demo.results.roiPercent.toFixed(0)}%
                  </div>
                  <div className="text-lg text-white font-semibold mb-2">Annual ROI</div>
                  <div className="text-sm text-blue-300">
                    {demo.results.monthlySavings > 0 ? Math.ceil(demo.results.setupFee / demo.results.monthlySavings) : 'N/A'} month payback
                  </div>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {demo.results.timeSaved}s
                    </div>
                    <div className="text-sm text-white/60">Time Saved per Request</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {Math.round(demo.results.timeSaved * demo.businessData.monthlyVolume * 12 / 3600)}
                    </div>
                    <div className="text-sm text-white/60">Hours Saved Annually</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">
                      €{demo.results.totalMonthlyAiCost.toFixed(0)}
                    </div>
                    <div className="text-sm text-white/60">Total Monthly AI Cost</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      €{(demo.results.monthlySavings * 36 - demo.results.setupFee).toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60">3-Year Net Value</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-xl font-semibold mb-6 text-white">Investment Breakdown</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <span className="text-white/80">Setup & Implementation</span>
                      <span className="font-bold text-blue-400">€{demo.results.setupFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <span className="text-white/80">Monthly Platform Fee</span>
                      <span className="font-bold text-purple-400">€{demo.results.monthlyPlatformFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/20 rounded-lg">
                      <span className="text-white/80">Monthly Usage Cost</span>
                      <span className="font-bold text-white/80">
                        €{(demo.results.aiCost * demo.businessData.monthlyVolume).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <span className="text-white/80">Current Monthly Cost</span>
                      <span className="font-bold text-red-400">
                        €{(demo.businessData.avgCostPerRequest * demo.businessData.monthlyVolume).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="text-white/80 font-semibold">Net Monthly Savings</span>
                      <span className="font-bold text-green-400">
                        €{demo.results.monthlySavings.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-xl font-semibold mb-6 text-white">Annual Projection</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Setup Investment</span>
                      <span className="font-bold text-blue-400">
                        €{demo.results.setupFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Monthly Platform Fee</span>
                      <span className="font-bold text-purple-400">
                        €{demo.results.monthlyPlatformFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Annual Net Savings</span>
                      <span className="font-bold text-green-400">
                        €{(demo.results.monthlySavings * 12).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Time Saved Annually</span>
                      <span className="font-bold text-blue-400">
                        {Math.round(demo.results.timeSaved * demo.businessData.monthlyVolume * 12 / 3600)} hours
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Payback Period</span>
                      <span className="font-bold text-purple-400">
                        {demo.results.monthlySavings > 0 ? 
                          Math.ceil(demo.results.setupFee / demo.results.monthlySavings) + ' months'
                          : 'N/A'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/20">
                      <span className="text-white/60 font-semibold">3-Year Net Value</span>
                      <span className="font-bold text-green-400 text-xl">
                        €{(demo.results.monthlySavings * 36 - demo.results.setupFee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl border border-green-500/30 p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-2 text-white">
                    🚀 Ready to save €{demo.results.monthlySavings.toFixed(0)} every month?
                  </h3>
                  <p className="text-lg text-white/80 mb-2">
                    That's €{(demo.results.monthlySavings * 12).toLocaleString()} per year in your pocket!
                  </p>
                  <div className="inline-flex items-center bg-green-500/30 border border-green-400/50 rounded-full px-4 py-2">
                    <span className="text-green-300 text-sm font-semibold">
                      ⚡ Payback in just {demo.results.monthlySavings > 0 ? Math.ceil(demo.results.setupFee / demo.results.monthlySavings) : 'N/A'} months
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <p className="text-white/90 font-medium">
                    💼 Our €1,200 AI Readiness Assessment includes everything you need to get started
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
                  <button
                    onClick={() => setDemo(prev => ({ 
                      ...prev, 
                      currentStep: 0, 
                      businessData: { industry: '', monthlyVolume: 0, avgCostPerRequest: 0, currentResponseTime: 0 } 
                    }))}
                    className="px-6 py-3 border border-white/30 text-white/80 rounded-lg hover:border-white/50 hover:bg-white/5 transition-all"
                  >
                    🔄 Try Different Scenario
                  </button>
                  <a
                    href="/oplossingen"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <span>🔧 View Our Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/consult"
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2 text-lg"
                  >
                    <span>💬 Book Free €1,200 Assessment</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return null;
};

export default function ROI() {
  return <DynamicBusinessDemo />;
}