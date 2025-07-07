import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";
import { StarField } from "../components/StarField";

export default function Contact() {
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Contact
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Email</h3>
                    <a href="mailto:info@move.ai" className="text-[#4746a4] hover:text-white transition-colors">
                      info@move.ai
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
                    <a href="tel:+31123456789" className="text-[#4746a4] hover:text-white transition-colors">
                      +31 (0) 12 345 6789
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Address</h3>
                    <p className="text-white/80">
                      Science Park 904<br/>
                      1098 XH Amsterdam<br/>
                      Netherlands
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Business Hours</h3>
                    <p className="text-white/80">
                      Monday - Friday: 9:00 - 18:00<br/>
                      Weekend: By appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-6">Send Message</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#4746a4] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#4746a4] hover:bg-[#4746a4]/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
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