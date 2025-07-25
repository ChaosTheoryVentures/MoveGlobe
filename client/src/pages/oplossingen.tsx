import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarsBackground } from "../components/StarsBackground";
import { useLanguage } from "../contexts/LanguageContext";
import { GlowButton } from "../components/ui/glow-button";
import { 
  Mail, 
  Calendar,
  FileText,
  TrendingUp,
  Users,
  Bot,
  Brain,
  Sparkles,
  Zap,
  Shield,
  Gauge,
  Trophy
} from 'lucide-react';

export default function Oplossingen() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'individuals' | 'teams' | 'enterprises'>('teams');

  const agents = [
    {
      id: 'inbox',
      icon: Mail,
      title: 'Inbox Assistant',
      subtitle: 'Manages emails, drafts replies, flags urgency',
      description: 'Delegating your inbox has never been this safe and effective.',
      category: ['individuals', 'teams']
    },
    {
      id: 'meeting',
      icon: Calendar,
      title: 'Meeting Summarizer',
      subtitle: 'Records, transcribes, and recaps your calls',
      description: 'Never take notes again—get action items in seconds.',
      category: ['teams', 'enterprises']
    },
    {
      id: 'report',
      icon: FileText,
      title: 'Report Generator',
      subtitle: 'Creates detailed reports from raw data',
      description: 'Transform data into insights with professional reports.',
      category: ['teams', 'enterprises']
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      title: 'Analytics Agent',
      subtitle: 'Tracks KPIs and generates insights',
      description: 'Real-time business intelligence at your fingertips.',
      category: ['enterprises']
    },
    {
      id: 'customer',
      icon: Users,
      title: 'Customer Success Bot',
      subtitle: 'Handles support tickets and FAQs',
      description: '24/7 customer support that learns and improves.',
      category: ['teams', 'enterprises']
    },
    {
      id: 'workflow',
      icon: Bot,
      title: 'Workflow Automator',
      subtitle: 'Streamlines repetitive processes',
      description: 'Build custom workflows without coding.',
      category: ['individuals', 'teams', 'enterprises']
    }
  ];

  const filteredAgents = agents.filter(agent => agent.category.includes(activeCategory));

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
          <div className="max-w-5xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Hire AI Agents to Supercharge Your Workflow
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Each agent is specialized, efficient, and ready to execute tasks like a team member—only faster.
              </p>
            </div>

            {/* Categories Section */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              <button
                onClick={() => setActiveCategory('individuals')}
                className={`px-6 py-2 font-semibold text-sm uppercase tracking-wider transition-all ${
                  activeCategory === 'individuals' 
                    ? 'text-white border-b-2 border-[#4746a4]' 
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                For Individuals
              </button>
              <button
                onClick={() => setActiveCategory('teams')}
                className={`px-6 py-2 font-semibold text-sm uppercase tracking-wider transition-all ${
                  activeCategory === 'teams' 
                    ? 'text-white border-b-2 border-[#4746a4]' 
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                For Teams
              </button>
              <button
                onClick={() => setActiveCategory('enterprises')}
                className={`px-6 py-2 font-semibold text-sm uppercase tracking-wider transition-all ${
                  activeCategory === 'enterprises' 
                    ? 'text-white border-b-2 border-[#4746a4]' 
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                For Enterprises
              </button>
            </div>

            {/* Agent Profiles Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {filteredAgents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div 
                    key={agent.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4746a4]/20 to-blue-600/20 flex items-center justify-center mb-4">
                        <Icon className="w-12 h-12 text-[#4746a4]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {agent.title}
                      </h3>
                      <h4 className="text-sm font-medium text-white/60 mb-3">
                        {agent.subtitle}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <Zap className="w-8 h-8 text-[#4746a4] mx-auto mb-2" />
                <div className="font-semibold text-white">Fast Setup</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <Shield className="w-8 h-8 text-[#4746a4] mx-auto mb-2" />
                <div className="font-semibold text-white">Data Safe</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <Brain className="w-8 h-8 text-[#4746a4] mx-auto mb-2" />
                <div className="font-semibold text-white">Smart Logic</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                <Trophy className="w-8 h-8 text-[#4746a4] mx-auto mb-2" />
                <div className="font-semibold text-white">Pro Results</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
              <GlowButton 
                to="/ai-analyse"
                showArrow={true}
              >
                Try Your First Agent
              </GlowButton>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}