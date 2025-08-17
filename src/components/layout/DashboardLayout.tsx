'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../components/icons/Logo';
import { UserMenu } from '../../components/auth/UserMenu';
import { Button } from '../../components/ui/Button';
import { Text } from '../../components/ui/Typography';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../lib/utils';
import {
  Home,
  BookOpen,
  Trophy,
  Users,
  FileText,
  TrendingUp,
  Settings,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Calendar,
  Target,
  Award,
  Zap,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  disabled?: boolean;
}

const navigation: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'My Journey', href: '/journey', icon: BookOpen, badge: 'Day 7' },
  { label: 'Startup Portfolio', href: '/portfolio', icon: Target },
  { label: 'Gamification', href: '/gamification', icon: Zap },
  { label: 'Community', href: '/community', icon: Users, badge: 'New' },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Resources', href: '/resources', icon: FileText },
  { label: 'Analytics', href: '/analytics', icon: TrendingUp, disabled: true },
];

const bottomNavigation: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Fetch user profile for sidebar stats
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserProfile(data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    if (item.disabled) {
      return (
        <div className="relative px-3 py-2 flex items-center gap-3 text-gray-400 cursor-not-allowed">
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{item.label}</span>
          <Badge size="sm" variant="default">Soon</Badge>
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "relative px-3 py-2 flex items-center gap-3 transition-all",
          "hover:bg-gray-100 group",
          active && "bg-black text-white hover:bg-gray-900"
        )}
      >
        <Icon className={cn(
          "w-5 h-5 flex-shrink-0",
          !active && "text-gray-600 group-hover:text-black"
        )} />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <Badge 
            size="sm" 
            variant={active ? "outline" : "default"}
          >
            {item.badge}
          </Badge>
        )}
        {active && (
          <div className="absolute inset-y-0 left-0 w-1 bg-white" />
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo variant="icon" className="h-8" />
          <UserMenu />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200",
        "transform transition-transform duration-200 ease-in-out lg:transform-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <Link href="/" className="text-black hover:opacity-80 transition-opacity">
            <Logo variant="full" className="h-8" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Stats Card */}
        {userProfile && (
          <div className="p-4 border-b border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  {userProfile.name?.charAt(0) || 'F'}
                </div>
                <div className="flex-1 min-w-0">
                  <Text weight="medium" className="truncate">
                    {userProfile.name || 'Founder'}
                  </Text>
                  <Text size="xs" color="muted" className="truncate">
                    {userProfile.portfolio?.startupName || 'Your Startup'}
                  </Text>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                  <Text size="xs" weight="bold">
                    {userProfile.totalXP || 0}
                  </Text>
                  <Text size="xs" color="muted">XP</Text>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </div>
                  <Text size="xs" weight="bold">
                    {userProfile.currentDay || 1}
                  </Text>
                  <Text size="xs" color="muted">Day</Text>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="w-4 h-4 text-purple-500" />
                  </div>
                  <Text size="xs" weight="bold">
                    {userProfile.badges?.length || 0}
                  </Text>
                  <Text size="xs" color="muted">Badges</Text>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Quick Action */}
        <div className="p-4 border-t border-gray-200">
          <Link href="/journey/day/7" onClick={() => setSidebarOpen(false)}>
            <Button variant="primary" className="w-full group">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Continue Journey</span>
              <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 px-2 py-2">
          {bottomNavigation.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Text weight="medium" color="muted">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              {userProfile?.currentStreak > 0 && (
                <Badge variant="warning" size="sm">
                  🔥 {userProfile.currentStreak} day streak
                </Badge>
              )}
            </div>
            <UserMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}