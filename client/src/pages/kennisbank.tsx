import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";
import { FileText, Brain, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

export default function Kennisbank() {
  const { t } = useLanguage();
  
  const articles = [
    {
      category: "AI Fundamentals",
      icon: Brain,
      title: "Wat is Agentic AI?",
      excerpt: "Ontdek hoe autonome AI-agenten de toekomst van bedrijfsprocessen vormgeven.",
      readTime: "5 min",
      date: "2024-01-15"
    },
    {
      category: "Best Practices",
      icon: Lightbulb,
      title: "AI Implementatie Roadmap",
      excerpt: "Een stapsgewijze gids voor succesvolle AI-integratie in uw organisatie.",
      readTime: "8 min",
      date: "2024-01-12"
    },
    {
      category: "Case Studies",
      icon: TrendingUp,
      title: "60% Kostenbesparing met AI",
      excerpt: "Hoe een financiële dienstverlener hun operationele kosten halveerde.",
      readTime: "6 min",
      date: "2024-01-10"
    },
    {
      category: "Technology",
      icon: FileText,
      title: "LLMs vs Traditional ML",
      excerpt: "De verschillen en wanneer welke technologie in te zetten.",
      readTime: "7 min",
      date: "2024-01-08"
    }
  ];

  const categories = [
    t('kennisbank.categories.all'),
    t('kennisbank.categories.fundamentals'), 
    t('kennisbank.categories.practices'),
    t('kennisbank.categories.cases'),
    t('kennisbank.categories.technology')
  ];

  return (
    <div className="min-h-screen relative" style={{ 
      background: 'radial-gradient(ellipse at center, #1a2855 0%, #0f1d3a 40%, #081426 100%)'
    }}>
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('kennisbank.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {t('kennisbank.subtitle')}
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => {
                const Icon = article.icon;
                return (
                  <article 
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#4746a4] text-sm font-medium">{article.category}</span>
                      <Icon className="w-5 h-5 text-white/60" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#4746a4] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-white/50">
                      <span>{article.readTime} leestijd</span>
                      <span>{new Date(article.date).toLocaleDateString('nl-NL')}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-16 bg-gradient-to-r from-[#4746a4]/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Blijf op de hoogte van de laatste AI-ontwikkelingen
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Ontvang maandelijks onze beste artikelen, praktische tips en exclusieve inzichten direct in uw inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="uw@email.nl"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                />
                <button className="bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Aanmelden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}