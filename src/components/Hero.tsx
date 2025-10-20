import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Modern Elegant Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Financial cityscape"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_70%)]" />
      </div>

      {/* Floating Orbs - Modern & Smooth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center relative">
        <div className="max-w-5xl mx-auto">
          {/* Badge - Modern glassmorphism */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full mb-6 border border-white/30 animate-fade-in-down shadow-lg shadow-indigo-900/20">
            <TrendingUp className="text-emerald-300" size={18} strokeWidth={2.5} />
            <span className="text-white/95 font-medium text-sm tracking-wide">Trusted by 10,000+ investors worldwide</span>
          </div>

          {/* Main Heading - Modern typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.15] animate-fade-in-up tracking-tight">
            Invest in Real Projects.
            <br />
            <span className="relative inline-block mt-3">
              <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                Build Real Wealth.
              </span>
            </span>
          </h1>

          {/* Subtitle - Refined and professional */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed font-normal animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Transparent investments managed by our expert team. Join today and start growing your capital with verified, high-potential projects.
          </p>

          {/* CTA Buttons - Modern clean design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-white hover:bg-white/95 text-indigo-600 font-semibold px-8 py-6 text-base rounded-xl shadow-xl shadow-indigo-900/20 hover:shadow-2xl hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="flex items-center">
                Explore Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
            </Button>
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 py-6 text-base rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 font-semibold"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Modern badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/30 shadow-lg shadow-indigo-900/10">
              <Shield className="text-emerald-300" size={16} strokeWidth={2.5} />
              <span className="text-white/90 text-sm font-medium">SEC Regulated</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/30 shadow-lg shadow-indigo-900/10">
              <Zap className="text-amber-300" size={16} strokeWidth={2.5} />
              <span className="text-white/90 text-sm font-medium">Instant Verification</span>
            </div>
          </div>

          {/* Stats Grid - Modern clean cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="group backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-indigo-900/10 hover:shadow-xl hover:shadow-indigo-900/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-200 to-indigo-300 bg-clip-text text-transparent mb-2">
                $125M+
              </div>
              <div className="text-white/90 text-base font-semibold">Total Invested</div>
              <div className="text-white/60 text-xs mt-1">Across all platforms</div>
            </div>
            <div className="group backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-indigo-900/10 hover:shadow-xl hover:shadow-indigo-900/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-emerald-200 to-emerald-300 bg-clip-text text-transparent mb-2">
                18.5%
              </div>
              <div className="text-white/90 text-base font-semibold">Avg. Annual Return</div>
              <div className="text-white/60 text-xs mt-1">Historical performance</div>
            </div>
            <div className="group backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-indigo-900/10 hover:shadow-xl hover:shadow-indigo-900/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-200 to-purple-300 bg-clip-text text-transparent mb-2">
                240+
              </div>
              <div className="text-white/90 text-base font-semibold">Active Projects</div>
              <div className="text-white/60 text-xs mt-1">Vetted opportunities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
