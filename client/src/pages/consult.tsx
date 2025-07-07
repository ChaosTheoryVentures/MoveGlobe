import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";

export default function Consult() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Consult
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-white/90 text-lg mb-6">
              Get expert consultation on implementing AI solutions for your business.
            </p>
            <p className="text-white/80 mb-8">
              Our team of AI specialists will work with you to identify opportunities, 
              develop strategies, and implement cutting-edge AI automations that drive 
              real business results.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Strategy Development</h3>
                <p className="text-white/80">
                  Custom AI strategy aligned with your business goals and operational needs.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Implementation Support</h3>
                <p className="text-white/80">
                  End-to-end support from concept to deployment and optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}