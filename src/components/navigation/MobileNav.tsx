'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  User,
  Menu,
  X,
  LogOut,
  Settings,
  HelpCircle,
  Briefcase,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Logo } from '@/components/icons/Logo';
import { useAuthContext } from '@/contexts/AuthContext';
import { cn } from '@/lib/cn';

const mobileNavItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Courses',
    icon: BookOpen,
    href: '/pricing',
  },
  {
    label: 'Portfolio',
    icon: Briefcase,
    href: '/portfolio/portfolio-dashboard',
  },
  {
    label: 'Community',
    icon: Users,
    href: '/community',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/profile',
  }
];

// Pages where mobile nav should be hidden
const AUTH_PAGES = [
  '/signup',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/auth/error',
  '/signup/verify-email',
  '/onboarding'
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuthContext();

  // Hide on auth pages
  if (AUTH_PAGES.some(page => pathname?.startsWith(page))) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      {/* Mobile Header with Glass Effect */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center group hover:opacity-80 transition-opacity">
            <Logo variant="full" className="h-8 text-black" />
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            {isOpen ? (
              <X className="w-5 h-5 rotate-0 transition-transform duration-300" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Animation */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)} 
      />

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "lg:hidden fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Text weight="bold" size="lg">Menu</Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {user && (
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {(user.user_metadata?.name || user.email)?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <Text weight="semibold" className="text-gray-900">
                      {user.user_metadata?.name || user.email?.split('@')[0] || 'Founder'}
                    </Text>
                    <Text size="xs" color="muted">{user.email}</Text>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-gradient-to-r from-gray-800 to-black text-white shadow-md" 
                        : "hover:bg-gray-50 hover:shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Text weight={isActive ? "semibold" : "medium"}>
                      {item.label}
                    </Text>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-2">
            <Link
              href="/help"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <HelpCircle className="w-5 h-5" />
              <Text>Help & Support</Text>
            </Link>
            
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
              <Text>Settings</Text>
            </Link>
            
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 w-full text-left text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <Text>Sign Out</Text>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation with Glass Effect */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-30 safe-area-inset-bottom shadow-lg">
        <nav className="grid grid-cols-5 gap-1 px-3 py-2 pb-safe">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all duration-300 min-h-[60px] group",
                  isActive 
                    ? "text-black" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl -z-10 shadow-sm" />
                )}
                
                <div className={cn(
                  "transition-all duration-300",
                  isActive ? "transform scale-110" : "group-active:scale-95"
                )}>
                  <Icon className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                </div>
                
                <Text 
                  size="xs" 
                  weight={isActive ? "semibold" : "medium"} 
                  className={cn(
                    "leading-tight transition-all duration-300",
                    isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                  )}
                >
                  {item.label}
                </Text>
                
                {/* Active Dot Indicator */}
                {isActive && (
                  <div className="absolute -top-1 right-1/2 transform translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};