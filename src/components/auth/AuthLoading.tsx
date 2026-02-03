'use client';

import React from 'react';
import { Logo } from '@/components/icons/Logo';
import { Text } from '@/components/ui/Typography';

interface AuthLoadingProps {
  message?: string;
  showStats?: boolean;
}

export const AuthLoading: React.FC<AuthLoadingProps> = ({
  message = "Setting up your founder journey..."
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
        <div className="relative w-16 h-16 border-2 border-black bg-white rounded-full flex items-center justify-center">
          <Logo className="w-8 h-8 text-black" />
        </div>
      </div>

      {/* Loading Dots */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Message */}
      <Text className="text-center max-w-md">
        {message}
      </Text>

      {/* Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-1 mt-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full animate-pulse w-3/4"></div>
      </div>
    </div>
  );
};

export default AuthLoading;