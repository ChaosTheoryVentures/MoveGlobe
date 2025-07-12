import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  MessageCircle, 
  Mail, 
  FileText, 
  Mic, 
  Database,
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  MessageSquare,
  Workflow,
  Link
} from 'lucide-react';

export default function Oplossingen() {
  const { t } = useLanguage();
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
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Cut Communication Costs by 60%
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8">
                Stop losing money on manual email, chat, and document processing. Our AI handles it automatically.
              </p>
              <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>24hr setup</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>No technical team needed</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span>Immediate ROI</span>
                </div>
              </div>
            </div>

            {/* Core Platform Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="text-center mb-8">
                  <MessageSquare className="w-16 h-16 text-[#4746a4] mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Your Communication Problems → Solved
                  </h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto">
                    Stop paying staff to manually read, sort, and respond to communications. Our system does it faster, cheaper, and never misses anything.
                  </p>
                </div>

                {/* Input Sources */}
                <div className="grid md:grid-cols-5 gap-4 mb-8">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Mail className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">Email</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <MessageCircle className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">Chat & SMS</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Mic className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">Transcriptions</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <FileText className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">Documents</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Database className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">JSON/Data</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center mb-8">
                  <ArrowRight className="w-8 h-8 text-[#4746a4] mx-auto" />
                </div>

                {/* Platform Features */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <Workflow className="w-10 h-10 text-[#4746a4] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Proven System</h3>
                    <p className="text-white/70 text-sm">Battle-tested with real businesses over 2+ years. No experimental technology - just reliable results.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <Zap className="w-10 h-10 text-[#4746a4] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Works Like Your Best Employee</h3>
                    <p className="text-white/70 text-sm">Understands context, follows your business rules, and never makes mistakes or takes sick days.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <BarChart3 className="w-10 h-10 text-[#4746a4] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">See Your Savings</h3>
                    <p className="text-white/70 text-sm">Clear dashboards showing exactly how much time and money you're saving every month.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Stop Wasting Money on These Tasks
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Stop Hiring More Support Staff</h3>
                  <p className="text-white/70 mb-4">Your customer volume is growing but you don't want to hire more support staff. Our AI handles the load increase.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">E-commerce Company</p>
                    <p className="text-white/70 text-sm italic mb-2">"When is my order shipping?" → Auto-lookup + tracking info</p>
                    <p className="text-white/60 text-xs">ROI: 60% cost reduction, 3x faster responses</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Multi-channel integration
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Smart escalation workflows
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">End Email Chaos</h3>
                  <p className="text-white/70 mb-4">Important emails get buried in inboxes. Wrong people handle urgent requests. Our AI sorts and routes everything instantly.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">Insurance Company</p>
                    <p className="text-white/70 text-sm italic mb-2">Claims emails → Auto-sort by urgency + route to specialists</p>
                    <p className="text-white/60 text-xs">ROI: 50% faster processing, 90% accuracy</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Smart categorization
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Priority detection
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Stop Reading Every Document</h3>
                  <p className="text-white/70 mb-4">Contracts, proposals, reports pile up. Staff spend hours reading. Our AI extracts what matters in seconds.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">Legal Firm</p>
                    <p className="text-white/70 text-sm italic mb-2">Contract reviews → Extract terms, risks, deadlines</p>
                    <p className="text-white/60 text-xs">ROI: 70% time savings, zero missed deadlines</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Key information extraction
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Automated summaries
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <Mic className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Never Miss Follow-ups Again</h3>
                  <p className="text-white/70 mb-4">Important decisions get forgotten after meetings. Action items slip through cracks. Our AI captures everything automatically.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">Consulting Agency</p>
                    <p className="text-white/70 text-sm italic mb-2">Client calls → Auto-extract deliverables + deadlines</p>
                    <p className="text-white/60 text-xs">ROI: 80% admin time saved, 100% follow-up rate</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Action item detection
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Decision tracking
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Spot Problems Before Customers Leave</h3>
                  <p className="text-white/70 mb-4">Unhappy customers don't always complain - they just leave. Our AI detects early warning signs in all communications.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">SaaS Company</p>
                    <p className="text-white/70 text-sm italic mb-2">Customer feedback → Real-time sentiment + churn alerts</p>
                    <p className="text-white/60 text-xs">ROI: 25% churn reduction, 40% CSAT improvement</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Performance metrics
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Sentiment analysis
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center mb-4">
                    <Workflow className="w-6 h-6 text-[#4746a4]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Automate Your Unique Processes</h3>
                  <p className="text-white/70 mb-4">Every business has unique communication workflows. Our AI learns your specific processes and handles them automatically.</p>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-[#4746a4]/50">
                    <p className="text-white/80 text-sm font-medium mb-1">Manufacturing Company</p>
                    <p className="text-white/70 text-sm italic mb-2">Supplier emails → Auto-update ERP + schedule reviews</p>
                    <p className="text-white/60 text-xs">ROI: 90% process automation, 45% cost reduction</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Business-specific logic
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Integration ready
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Integrates with All Modern Systems
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Works seamlessly with your existing business tools. No disruption to your current workflow.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                  {/* Slack */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Slack</span>
                  </div>

                  {/* Microsoft Teams */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M1.5 0h12c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5h-12C.67 15 0 14.33 0 13.5v-12C0 .67.67 0 1.5 0z" fill="#5059C9"/>
                        <path d="M22.5 9h-6c-.83 0-1.5.67-1.5 1.5v12c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5z" fill="#7B83EB"/>
                        <path d="M9 22.5v-6c0-.83.67-1.5 1.5-1.5h12c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-12c-.83 0-1.5-.67-1.5-1.5z" fill="#A6A8E6"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Teams</span>
                  </div>

                  {/* Gmail */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.318.077-.61.212-.872a1.636 1.636 0 0 1 1.424-.585h.001L12 10.545 22.362 4A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Gmail</span>
                  </div>

                  {/* Outlook */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M0 4.167A2.167 2.167 0 0 1 2.167 2h19.666A2.167 2.167 0 0 1 24 4.167v15.666A2.167 2.167 0 0 1 21.833 22H2.167A2.167 2.167 0 0 1 0 19.833V4.167z" fill="#0078D4"/>
                        <path d="M12 12.5c2.167 0 4-1.833 4-4s-1.833-4-4-4-4 1.833-4 4 1.833 4 4 4z" fill="#40E0D0"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Outlook</span>
                  </div>

                  {/* Salesforce */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001z" fill="#00A1E0"/>
                        <path d="M8.29 14.311c-.478 0-.917-.24-1.175-.64-.257-.4-.257-.895 0-1.296.258-.4.697-.64 1.175-.64.478 0 .917.24 1.174.64.258.401.258.896 0 1.296-.257.4-.696.64-1.174.64z" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Salesforce</span>
                  </div>

                  {/* HubSpot */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#FF7A59"/>
                        <path d="M8.5 8.5h7v7h-7z" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">HubSpot</span>
                  </div>

                  {/* Zendesk */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" fill="#03363D"/>
                        <path d="M16 8L8 16M8 8l8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Zendesk</span>
                  </div>

                  {/* Zapier */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#FF4A00"/>
                        <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Zapier</span>
                  </div>

                  {/* ServiceNow */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#62D84E"/>
                        <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">ServiceNow</span>
                  </div>

                  {/* Zoom */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#2D8CFF"/>
                        <path d="M8 10h8v4H8z" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Zoom</span>
                  </div>

                  {/* API Symbol */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center border border-[#4746a4]/30">
                      <Link className="w-6 h-6 text-[#4746a4]" />
                    </div>
                    <span className="text-white/70 text-xs font-medium">+1000s more</span>
                  </div>

                  {/* Custom API */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-[#4746a4]/20 rounded-lg flex items-center justify-center border border-[#4746a4]/30">
                      <Database className="w-6 h-6 text-[#4746a4]" />
                    </div>
                    <span className="text-white/70 text-xs font-medium">Your Systems</span>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-white/60 text-sm">
                    If it has an API, we can connect to it. Custom integrations available.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#4746a4]/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See Your Potential Savings in 24 Hours
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                We'll analyze your current communication costs and show you exactly how much you could save. No technical knowledge required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consult" 
                  className="inline-flex items-center justify-center bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Calculate My Savings
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg border border-white/20"
                >
                  See 5-Minute Demo
                </a>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">60%</div>
                  <div className="text-white/70 text-sm">Average cost reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">24hrs</div>
                  <div className="text-white/70 text-sm">Implementation time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">0</div>
                  <div className="text-white/70 text-sm">Technical staff needed</div>
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