'use client';

import React, { useState, useEffect, useRef } from 'react';
import { logger } from '@/lib/logger';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useClientOnly } from '@/hooks/useClientOnly';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  Trophy,
  BookOpen,
  Zap,
  Award,
  HelpCircle,
  ExternalLink,
  UserCircle
} from 'lucide-react';

export function UserMenu() {
  const router = useRouter();
  const { user, signOut, loading } = useAuthContext();
  const mounted = useClientOnly();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch user profile for XP and badges
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUserProfile(data.user);
      } catch (error) {
        logger.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Show loading state to prevent hydration mismatch
  if (loading || !mounted) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary" size="sm">
            Start Journey
          </Button>
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      logger.error('Error signing out:', error);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  const userName = userProfile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Founder';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar
          size="sm"
          fallback={userInitial}
          src={user.user_metadata?.avatar_url}
        />
        <div className="hidden md:flex flex-col items-start">
          <span className="font-medium text-sm">
            {userName}
          </span>
          {userProfile?.activePurchases?.some((p: any) => p.product?.code === 'ALL_ACCESS') && (
            <span className="text-xs text-purple-600 font-medium">All Access</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border-2 border-black shadow-lg z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <Avatar
                size="md"
                fallback={userInitial}
                src={user.user_metadata?.avatar_url}
              />
              <div className="flex-1 min-w-0">
                <Text className="font-semibold">{userName}</Text>
                <Text size="sm" color="muted" className="truncate">
                  {user.email}
                </Text>
                {userProfile && (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <Text size="xs" weight="medium">{userProfile.totalXP} XP</Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-500" />
                      <Text size="xs" weight="medium">{userProfile.badges?.length || 0} Badges</Text>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="p-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/journey"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Journey</span>
            </Link>

            <Link
              href="/portfolio"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              <span>My Portfolio</span>
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserCircle className="w-4 h-4" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            <hr className="my-2 border-gray-200" />

            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </Link>

            <hr className="my-2 border-gray-200" />

            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 transition-colors text-left disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
            </button>
          </nav>

        </div>
      )}
    </div>
  );
}