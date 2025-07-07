import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Privacy Policy
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Protection</h2>
              <p className="text-white/90 mb-6">
                We are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
              <p className="text-white/80 mb-4">
                We collect information you provide directly to us, such as when you contact us for consultation services.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Information</h3>
              <p className="text-white/80 mb-4">
                We use the information we collect to provide, maintain, and improve our services and communicate with you.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
              <p className="text-white/80 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-white/80">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}