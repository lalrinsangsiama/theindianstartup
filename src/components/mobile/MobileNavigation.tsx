'use client';

import React from 'react';
import { Home, BookOpen, User, Settings } from 'lucide-react';

export default function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
      <div className="flex justify-around items-center">
        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs mt-1">Courses</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900">
          <Settings className="w-5 h-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  );
}
