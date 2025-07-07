import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Consult() {
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
      
      <div className="relative z-10 h-screen overflow-y-auto">
        <Navbar />
        <div className="pt-20 pb-16 px-4 min-h-full">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-[#4746a4] to-purple-600 bg-clip-text text-transparent">
                  4 laser-focused hours
                </span>{" "}
                with our AI experts
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                Spend 4 laser-focused hours with our AI experts to uncover every hidden bottleneck draining your time, money, and momentum.
              </p>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                The next day, you'll receive a no-fluff implementation playbook—packed with ROI projections—showing exactly which automations to deploy, what they'll cost, and how fast they'll pay off.
              </p>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                While your competitors waste months guessing, you'll have a clear, profit-driven roadmap to slash inefficiency, boost margins, and scale faster.
              </p>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-semibold">
                It's the fastest way to professionalize operations, unlock cash flow, and make your business AI-ready—before the rest even know what hit them.
              </p>
            </div>
            
            {/* Form Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Request Your AI Consultation</h2>
                  <div className="inline-flex items-center gap-3 bg-[#4746a4]/20 px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-[#4746a4]">€750</span>
                    <span className="text-white/80">Investment for complete audit</span>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 font-medium">First Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Last Name *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">Company Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">Business Email *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="+31 6 12345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">Number of Employees</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#4746a4] focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-gray-800">Select range</option>
                      <option value="1-10" className="bg-gray-800">1-10</option>
                      <option value="11-50" className="bg-gray-800">11-50</option>
                      <option value="51-200" className="bg-gray-800">51-200</option>
                      <option value="200+" className="bg-gray-800">200+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">What's your biggest operational challenge? *</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder="Describe the main inefficiencies or bottlenecks in your business..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 font-medium">Preferred consultation date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#4746a4] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4746a4] to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Request Your €750 AI Consultation
                  </button>
                  
                  <p className="text-white/60 text-sm text-center">
                    After submission, we'll contact you within 24 hours to schedule your consultation and discuss payment details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}