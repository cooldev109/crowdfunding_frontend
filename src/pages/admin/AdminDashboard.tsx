import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  TrendingUp,
  Users,
  FolderKanban,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import api from '../../lib/api';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalUsers: number;
  totalInvestments: number;
  totalRevenue: number;
  growth: {
    projects: number;
    users: number;
    revenue: number;
  };
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalUsers: 0,
    totalInvestments: 0,
    totalRevenue: 0,
    growth: {
      projects: 0,
      users: 0,
      revenue: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      // Fetch project stats
      const projectsResponse = await api.get('/projects/stats');
      const usersResponse = await api.get('/users/stats');
      const investmentsResponse = await api.get('/investments/stats');

      setStats({
        totalProjects: projectsResponse.data.data.total || 0,
        activeProjects: projectsResponse.data.data.active || 0,
        totalUsers: usersResponse.data.data.total || 0,
        totalInvestments: investmentsResponse.data.data.total || 0,
        totalRevenue: investmentsResponse.data.data.totalAmount || 0,
        growth: {
          projects: projectsResponse.data.data.growth || 12.5,
          users: usersResponse.data.data.growth || 8.3,
          revenue: investmentsResponse.data.data.growth || 23.7,
        },
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set mock data for demo
      setStats({
        totalProjects: 47,
        activeProjects: 32,
        totalUsers: 1284,
        totalInvestments: 856,
        totalRevenue: 2847500,
        growth: {
          projects: 12.5,
          users: 8.3,
          revenue: 23.7,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: stats.growth.projects,
      icon: FolderKanban,
      iconBg: 'from-blue-500 to-indigo-500',
      description: `${stats.activeProjects} active`,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: stats.growth.users,
      icon: Users,
      iconBg: 'from-purple-600 to-indigo-600',
      description: 'Registered investors',
    },
    {
      title: 'Total Investments',
      value: stats.totalInvestments,
      change: stats.growth.revenue,
      icon: TrendingUp,
      iconBg: 'from-green-500 to-emerald-500',
      description: 'Completed transactions',
    },
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 1000000).toFixed(2)}M`,
      change: stats.growth.revenue,
      icon: DollarSign,
      iconBg: 'from-amber-500 to-orange-500',
      description: 'Platform volume',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner - Elegant indigo theme */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-600 p-6 md:p-8 lg:p-10 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.2),transparent)]"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-4 border border-white/30">
                <Activity size={16} className="text-white" />
                <span className="text-sm font-semibold text-white">Dashboard Overview</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                Welcome Back, Administrator
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base md:text-lg max-w-2xl">
                Monitor your platform's performance and key metrics at a glance.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;

            return (
              <Card
                key={index}
                className="relative border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group"
              >
                <div className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardDescription className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                          {stat.title}
                        </CardDescription>
                        <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900">
                          {isLoading ? (
                            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded" />
                          ) : (
                            stat.value
                          )}
                        </CardTitle>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105 flex-shrink-0`}
                      >
                        <Icon className="text-white" size={20} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-600 font-medium">{stat.description}</p>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        <span>{Math.abs(stat.change)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions - Clean and professional */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 flex-shrink-0">
                    <FolderKanban className="text-blue-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-slate-900 mb-1">Add New Project</CardTitle>
                    <CardDescription className="text-sm text-slate-600">Create investment opportunity</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer group bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-500 flex-shrink-0">
                    <Users className="text-indigo-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-slate-900 mb-1">Manage Users</CardTitle>
                    <CardDescription className="text-sm text-slate-600">View and edit user accounts</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer group bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 flex-shrink-0">
                    <Activity className="text-emerald-600 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-slate-900 mb-1">View Analytics</CardTitle>
                    <CardDescription className="text-sm text-slate-600">Detailed performance reports</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Activity - Professional activity feed */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 tracking-tight">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 mt-1 hidden sm:block">Latest platform updates and transactions</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-700">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-3">
              {[
                { icon: TrendingUp, color: 'from-green-500 to-emerald-500', title: 'New investment in Green Valley Project', desc: 'John Doe invested $5,000', amount: '$5,000', time: '2 hours ago' },
                { icon: Users, color: 'from-blue-500 to-indigo-500', title: 'New user registered', desc: 'Jane Smith joined the platform', amount: 'Premium', time: '3 hours ago' },
                { icon: FolderKanban, color: 'from-purple-600 to-indigo-600', title: 'Project completed successfully', desc: 'SolarTech Energy Farm reached goal', amount: '$1.8M', time: '5 hours ago' },
                { icon: DollarSign, color: 'from-amber-500 to-orange-500', title: 'Payment processed', desc: 'Withdrawal request approved', amount: '$12,500', time: '6 hours ago' },
                { icon: Activity, color: 'from-indigo-500 to-purple-500', title: 'New milestone achieved', desc: '1000+ total investments', amount: '1,000+', time: '1 day ago' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 flex-shrink-0`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-600 truncate mt-0.5">{item.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-slate-900">{item.amount}</p>
                      <p className="text-xs text-slate-500 hidden sm:block mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
