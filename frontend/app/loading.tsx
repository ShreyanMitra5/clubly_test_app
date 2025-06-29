"use client";

import React from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        
        {/* Inner logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-modern">
            <Image 
              src="/logo.png" 
              alt="Clubly" 
              width={32} 
              height={32} 
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
      
      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-black mb-3">Loading Clubly</h2>
        <p className="text-gray-600 font-medium">Preparing your workspace...</p>
      </div>
      
      {/* Loading dots */}
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;