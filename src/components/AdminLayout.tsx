import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Upload,
  Shield,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      description: 'Overview & Analytics',
    },
    {
      name: 'Projects',
      icon: FolderKanban,
      path: '/admin/projects',
      description: 'Manage Projects',
    },
    {
      name: 'Users',
      icon: Users,
      path: '/admin/users',
      description: 'User Management',
    },
    {
      name: 'Investments',
      icon: DollarSign,
      path: '/admin/investments',
      description: 'Transactions & Payments',
    },
    {
      name: 'Import',
      icon: Upload,
      path: '/admin/import',
      description: 'Import Projects',
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
      description: 'Detailed Reports',
    },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Elegant deep indigo sidebar with luxurious feel */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white transition-all duration-500 ease-in-out z-50 border-r border-indigo-900/30
          w-72
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${!isSidebarOpen && 'md:!w-20'}`}
      >
        {/* Elegant overlay with subtle shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),rgba(0,0,0,0))] pointer-events-none" />

        {/* Header - Elegant branding */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-indigo-800/30 relative backdrop-blur-sm">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden md:hidden'} ${isMobileMenuOpen && 'flex md:hidden'} ${isSidebarOpen && 'hidden md:flex'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-400/50 hover:scale-105">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">
                  Admin Panel
                </h1>
                <p className="text-xs text-indigo-300/70 font-medium">Investment Platform</p>
              </div>
          </div>
          <button
            onClick={() => {
              // On mobile, close the menu; on desktop, toggle sidebar width
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(false);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="p-2 hover:bg-indigo-800/30 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {(window.innerWidth >= 768 && isSidebarOpen) || (window.innerWidth < 768) ? <X size={20} className="text-indigo-200" /> : <Menu size={20} className="text-indigo-200" />}
          </button>
        </div>

        {/* User Info - Elegant user profile section */}
        <div className={`px-6 py-5 border-b border-indigo-800/30 relative ${!isSidebarOpen && 'hidden md:hidden'} ${isMobileMenuOpen && 'block md:hidden'} ${isSidebarOpen && 'hidden md:block'}`}>
            <div className="flex items-center gap-3 group cursor-pointer hover:bg-indigo-800/20 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-semibold text-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-400/50">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#1e1b4b]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-white text-sm">{user?.name}</p>
                <p className="text-xs text-indigo-300/70 truncate">{user?.email}</p>
                <div className="mt-1 inline-flex items-center gap-1.5 bg-indigo-900/40 px-2 py-0.5 rounded-md border border-indigo-700/30">
                  <Shield size={10} className="text-amber-400" />
                  <span className="text-[10px] text-indigo-200 font-medium">Administrator</span>
                </div>
              </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto relative">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40'
                    : 'hover:bg-indigo-800/30 hover:translate-x-0.5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-200 rounded-r-full shadow-sm shadow-indigo-300" />
                )}
                <div className={`relative ${isActive ? '' : 'text-indigo-300/60 group-hover:text-indigo-100'} transition-colors duration-300`}>
                  <Icon
                    size={20}
                    className={`${isActive ? 'text-white' : ''}`}
                  />
                </div>
                {/* Show text on mobile when menu is open, on desktop when sidebar is expanded */}
                <div className={`flex-1 relative ${!isSidebarOpen && 'hidden md:hidden'} ${isMobileMenuOpen && 'block md:hidden'} ${isSidebarOpen && 'hidden md:block'}`}>
                  <p
                    className={`font-medium text-sm ${
                      isActive ? 'text-white' : 'text-indigo-100/80 group-hover:text-white'
                    } transition-colors`}
                  >
                    {item.name}
                  </p>
                  <p className={`text-[11px] ${isActive ? 'text-indigo-200/80' : 'text-indigo-300/40 group-hover:text-indigo-200/60'} transition-colors mt-0.5`}>
                    {item.description}
                  </p>
                </div>
                {!isSidebarOpen && (
                  <div className="hidden md:block absolute left-full ml-3 px-3 py-2 bg-indigo-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl border border-indigo-700/50">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-indigo-900 rotate-45 border-l border-b border-indigo-700/50"></div>
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout - Elegant logout button */}
        <div className="p-3 border-t border-indigo-800/30 relative">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-indigo-300/60 hover:text-red-400 transition-all duration-300 group relative"
          >
            <LogOut size={20} className="transition-transform group-hover:translate-x-0.5" />
            {/* Show text on mobile when menu is open, on desktop when sidebar is expanded */}
            <span className={`font-medium text-sm ${!isSidebarOpen && 'hidden md:hidden'} ${isMobileMenuOpen && 'block md:hidden'} ${isSidebarOpen && 'hidden md:block'}`}>Logout</span>
            {!isSidebarOpen && (
              <div className="hidden md:block absolute left-full ml-3 px-3 py-2 bg-indigo-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-xl border border-indigo-700/50">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-indigo-900 rotate-45 border-l border-b border-indigo-700/50"></div>
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content - No margin on mobile, responsive margin on desktop */}
      <main
        className={`transition-all duration-300 ml-0 md:ml-20 ${isSidebarOpen && 'md:!ml-72'}`}
      >
        {/* Top Bar - Clean and professional header */}
        <div className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 md:hidden active:scale-95"
            >
              <Menu size={22} className="text-slate-600" />
            </button>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-2xl font-semibold text-slate-900 truncate tracking-tight">
                {menuItems.find((item) => isActivePath(item.path))?.name || 'Admin Dashboard'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium hidden sm:block">
                {menuItems.find((item) => isActivePath(item.path))?.description || 'Welcome back'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-3 px-3 md:px-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-white text-sm shadow-sm shadow-indigo-500/20">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 truncate max-w-[120px]">{user?.name}</p>
                <p className="text-[11px] text-indigo-600 font-medium">Administrator</p>
              </div>
            </div>
            {/* Mobile User Avatar */}
            <div className="sm:hidden w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-semibold text-white shadow-lg shadow-indigo-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
