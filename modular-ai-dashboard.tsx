import React, { useState, useEffect } from 'react';
import { ArrowRight, Building2, Users, DollarSign, Clock, TrendingUp, Settings, Play, Edit3, CheckCircle, X, Calculator, Zap, Target } from 'lucide-react';

const DynamicBusinessDemo = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">
              Let's Build <span className="text-green-400">Your AI</span>
            </h1>
            <p className="text-xl text-slate-400">
              3 quick questions to calculate your exact ROI
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl border border-slate-600 p-8 space-y-8">
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
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
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-semibold">{industry.name}</div>
                    <div className="text-sm text-slate-400 mt-1">
                      ~{industry.volume} requests/month • €{industry.cost} avg cost
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {demo.businessData.industry && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
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
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-2xl font-bold">{volume}</div>
                      <div className="text-sm text-slate-400">per month</div>
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
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-slate-400">
                    Custom: {demo.businessData.monthlyVolume} requests/month
                  </div>
                </div>
              </div>
            )}

            {demo.businessData.monthlyVolume > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
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
                          : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-2xl font-bold">€{cost}</div>
                      <div className="text-sm text-slate-400">per request</div>
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
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-slate-400">
                    Custom: €{demo.businessData.avgCostPerRequest} per request
                  </div>
                </div>
              </div>
            )}

            {demo.businessData.avgCostPerRequest > 0 && (
              <div className="pt-6 border-t border-slate-700">
                <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-white mb-3">Your Current Situation:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Industry: </span>
                      <span className="text-white">{demo.businessData.industry}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Monthly Volume: </span>
                      <span className="text-white">{demo.businessData.monthlyVolume} requests</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Cost per Request: </span>
                      <span className="text-white">€{demo.businessData.avgCostPerRequest}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Monthly Cost: </span>
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
    );
  }

  // Step 2: Interactive Workflow Builder
  if (demo.currentStep === 1) {
    const enabledSteps = demo.workflow.filter(step => step.enabled);
    const totalTime = enabledSteps.reduce((sum, step) => sum + step.timeSeconds, 0);
    const totalCost = enabledSteps.reduce((sum, step) => sum + step.costEuro, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Your AI Workflow for <span className="text-green-400">{demo.businessData.industry}</span>
            </h1>
            <p className="text-slate-400">Customize how your AI handles each request</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Workflow Steps</h2>
                  <button
                    onClick={() => setDemo(prev => ({ ...prev, showCustomization: !prev.showCustomization }))}
                    className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-all flex items-center space-x-2"
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
                        !step.enabled ? 'border-slate-700 bg-slate-700/30 opacity-50' :
                        isActive ? 'border-blue-500 bg-blue-500/10' :
                        isCompleted ? 'border-green-500 bg-green-500/10' :
                        'border-slate-600 bg-slate-700/50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              !step.enabled ? 'bg-slate-600 text-slate-400' :
                              isCompleted ? 'bg-green-500 text-white' :
                              isActive ? 'bg-blue-500 text-white' :
                              'bg-slate-600 text-slate-300'
                            }`}>
                              {!step.enabled ? '−' : isCompleted ? '✓' : index + 1}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${step.enabled ? 'text-white' : 'text-slate-500'}`}>
                                {step.name}
                              </h3>
                              <p className={`text-sm ${step.enabled ? 'text-slate-300' : 'text-slate-500'}`}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right text-sm">
                              <div className={step.enabled ? 'text-slate-300' : 'text-slate-500'}>
                                {step.timeSeconds}s • €{step.costEuro.toFixed(2)}
                              </div>
                            </div>
                            
                            {demo.showCustomization && step.customizable && (
                              <button
                                onClick={() => toggleWorkflowStep(step.id)}
                                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                                  step.enabled 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                    : 'bg-slate-600/50 text-slate-400 border border-slate-600'
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

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={runWorkflow}
                    disabled={demo.isRunning}
                    className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                  >
                    {demo.isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Demo</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={nextStep}
                    className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <span>See Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-6">
                <h3 className="text-lg font-semibold mb-4">Workflow Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Time</span>
                    <span className="font-bold text-blue-400">{totalTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Usage Cost per Request</span>
                    <span className="font-bold text-blue-400">€{totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Monthly Usage Cost</span>
                    <span className="font-bold text-blue-400">
                      €{(totalCost * demo.businessData.monthlyVolume).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Platform Fee</span>
                    <span className="font-bold text-purple-400">€1,500</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                    <span className="text-slate-400 font-semibold">Total Monthly Cost</span>
                    <span className="font-bold text-white">
                      €{((totalCost * demo.businessData.monthlyVolume) + 1500).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                    <span className="text-slate-400">vs Current Cost</span>
                    <span className="font-bold text-red-400">
                      €{(demo.businessData.avgCostPerRequest * demo.businessData.monthlyVolume).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h3 className="font-semibold text-white mb-2">Monthly Investment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Usage costs:</span>
                    <span className="text-white">€{(totalCost * demo.businessData.monthlyVolume).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platform fee:</span>
                    <span className="text-white">€1,500</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-slate-600">
                    <span className="text-white">Total monthly:</span>
                    <span className="text-white">€{((totalCost * demo.businessData.monthlyVolume) + 1500).toFixed(0)}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <div className="text-lg font-bold text-white">
                    Net Savings: €{(demo.businessData.avgCostPerRequest * demo.businessData.monthlyVolume - ((totalCost * demo.businessData.monthlyVolume) + 1500)).toFixed(0)}/month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Results & ROI
  if (demo.currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Your <span className="text-green-400">AI ROI</span> Calculation
            </h1>
            <p className="text-xl text-slate-400">Based on your actual business data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/90 border-l-4 border-green-500 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">
                €{demo.results.monthlySavings.toFixed(0)}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Monthly Savings</div>
            </div>
            
            <div className="bg-slate-800/90 border-l-4 border-blue-500 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">
                {demo.results.timeSaved}s
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Time Saved per Request</div>
            </div>
            
            <div className="bg-slate-800/90 border-l-4 border-red-500 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">
                €{demo.results.totalMonthlyAiCost.toFixed(0)}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Total Monthly Cost</div>
              <div className="text-xs text-slate-500 mt-1">Usage + Platform Fee</div>
            </div>
            
            <div className="bg-slate-800/90 border-l-4 border-yellow-500 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">
                {demo.results.roiPercent.toFixed(0)}%
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Annual ROI</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-6">
              <h3 className="text-xl font-semibold mb-6">Investment Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <span className="text-slate-300">Setup & Implementation</span>
                  <span className="font-bold text-blue-400">€{demo.results.setupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <span className="text-slate-300">Monthly Platform Fee</span>
                  <span className="font-bold text-purple-400">€{demo.results.monthlyPlatformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <span className="text-slate-300">Monthly Usage Cost</span>
                  <span className="font-bold text-slate-300">
                    €{(demo.results.aiCost * demo.businessData.monthlyVolume).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <span className="text-slate-300">Current Monthly Cost</span>
                  <span className="font-bold text-red-400">
                    €{(demo.businessData.avgCostPerRequest * demo.businessData.monthlyVolume).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <span className="text-slate-300 font-semibold">Net Monthly Savings</span>
                  <span className="font-bold text-green-400">
                    €{demo.results.monthlySavings.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-6">
              <h3 className="text-xl font-semibold mb-6">Annual Projection</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Setup Investment</span>
                  <span className="font-bold text-blue-400">
                    €{demo.results.setupFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Platform Fee</span>
                  <span className="font-bold text-purple-400">
                    €{demo.results.monthlyPlatformFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Annual Net Savings</span>
                  <span className="font-bold text-green-400">
                    €{(demo.results.monthlySavings * 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Time Saved Annually</span>
                  <span className="font-bold text-blue-400">
                    {Math.round(demo.results.timeSaved * demo.businessData.monthlyVolume * 12 / 3600)} hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Payback Period</span>
                  <span className="font-bold text-purple-400">
                    {demo.results.monthlySavings > 0 ? 
                      Math.ceil(demo.results.setupFee / demo.results.monthlySavings) + ' months'
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400 font-semibold">3-Year Net Value</span>
                  <span className="font-bold text-green-400 text-xl">
                    €{(demo.results.monthlySavings * 36 - demo.results.setupFee).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to save €{demo.results.monthlySavings.toFixed(0)} per month?
            </h3>
            <p className="text-slate-400 mb-6">
              Book a free 30-minute consultation to discuss implementation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button
                onClick={() => setDemo(prev => ({ 
                  ...prev, 
                  currentStep: 0, 
                  businessData: { industry: '', monthlyVolume: 0, avgCostPerRequest: 0, currentResponseTime: 0 } 
                }))}
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-all"
              >
                Try Different Scenario
              </button>
              <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2">
                <span>View Demo Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DynamicBusinessDemo;