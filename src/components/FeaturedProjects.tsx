import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";

const projects = [
  {
    id: 1,
    title: "Green Valley Residential Complex",
    image: project1,
    category: "Real Estate",
    minInvestment: "$1,000",
    estimatedROI: "22%",
    progress: 78,
    totalInvestors: 342,
    fundingGoal: "$2.5M",
    timeLeft: "12 days",
    description: "Sustainable residential development with modern amenities in a prime location.",
  },
  {
    id: 2,
    title: "SolarTech Energy Farm",
    image: project2,
    category: "Renewable Energy",
    minInvestment: "$500",
    estimatedROI: "18%",
    progress: 65,
    totalInvestors: 587,
    fundingGoal: "$1.8M",
    timeLeft: "25 days",
    description: "Large-scale solar power installation supporting clean energy transition.",
  },
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-28 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-full mb-6 border border-purple-200">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-purple-700 font-semibold text-sm">Trending Opportunities</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
              Featured Investment
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Carefully selected opportunities with verified returns and transparent management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-indigo-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-emerald-600" />
                    <span className="font-semibold text-sm text-emerald-600">{project.estimatedROI}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-indigo-50 rounded-lg p-2.5 border border-indigo-100">
                    <div className="text-xs text-indigo-600 font-medium mb-0.5">Min. Investment</div>
                    <div className="text-base font-semibold text-gray-900">{project.minInvestment}</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                    <div className="text-xs text-emerald-600 font-medium mb-0.5">Est. ROI</div>
                    <div className="text-base font-semibold text-emerald-600 flex items-center gap-1">
                      <TrendingUp size={14} />
                      {project.estimatedROI}
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600 font-medium">Funding Progress</span>
                    <span className="font-semibold text-indigo-600">{project.progress}% of {project.fundingGoal}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-progress"
                      style={{ "--progress-width": `${project.progress}%` } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users size={14} className="text-indigo-600" />
                    <span className="font-medium">{project.totalInvestors} investors</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock size={14} className="text-purple-600" />
                    <span className="font-medium">{project.timeLeft} left</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <span className="flex items-center justify-center gap-1.5">
                    View Details
                    <ArrowRight className="group-hover:translate-x-0.5 transition-transform duration-300" size={16} />
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

            <div className="relative bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-10 border-2 border-purple-100 shadow-2xl backdrop-blur-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">🚀</span>
                  <span className="text-purple-700 font-bold text-sm">Premium Access</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Unlock Complete Project Database
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Access detailed analytics, historical data, and exclusive investment opportunities with our premium membership
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="font-medium">500+ Verified Projects</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="font-medium">Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="font-medium">Priority Support</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] hover:from-[#f093fb] hover:via-[#764ba2] hover:to-[#667eea] text-white font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Unlock Premium Access
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
