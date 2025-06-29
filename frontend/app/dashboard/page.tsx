"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const [clubs, setClubs] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const storedClubs = localStorage.getItem(`userClubs_${user.id}`);
    const storedName = localStorage.getItem(`userName_${user.id}`);
    
    if (storedClubs) setClubs(JSON.parse(storedClubs));
    if (storedName) setName(storedName);
    
    setIsLoading(false);
  }, [user]);

  const handleClubClick = (club: string) => {
    router.push(`/clubs/${encodeURIComponent(club)}`);
  };

  const handleCreateNewClub = () => {
    router.push('/onboarding');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="pt-16 pb-12">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Welcome back!
            </div>
            
            <h1 className="heading-lg mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Dashboard
            </h1>
            
            <p className="text-2xl text-gray-600 font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Welcome back, <span className="text-black font-bold">{name || 'there'}</span>!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-width pb-20">
        {/* Quick Actions */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link href="/generate" className="flex-1">
              <button className="btn-primary w-full flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Generate Presentation
              </button>
            </Link>
            
            <button 
              onClick={handleCreateNewClub}
              className="btn-secondary flex-1 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Club
            </button>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">Your Clubs</h2>
          <p className="text-lg text-gray-600">
            {clubs.length > 0 
              ? `Manage your ${clubs.length} club${clubs.length > 1 ? 's' : ''} and create amazing presentations`
              : 'Get started by adding your first club'
            }
          </p>
        </div>

        {clubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {clubs.map((club, index) => (
              <div
                key={club}
                className="club-card animate-fade-in-scale"
                onClick={() => handleClubClick(club)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3">{club}</h3>
                  <p className="text-gray-600 font-medium">Click to manage this club</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-black mb-4">No clubs yet</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Get started by adding your first club. You'll be able to generate presentations, track attendance, and manage all your club activities.
            </p>
            
            <button 
              onClick={handleCreateNewClub}
              className="btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Club
            </button>
          </div>
        )}

        {/* Features Preview */}
        {clubs.length > 0 && (
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-black mb-4">What you can do with Clubly</h3>
              <p className="text-gray-600">Explore all the features available for your clubs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h4 className="font-bold text-black mb-2">AI Presentations</h4>
                <p className="text-sm text-gray-600">Generate professional slides in seconds</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-black mb-2">Attendance Tracking</h4>
                <p className="text-sm text-gray-600">Keep track of member participation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4" />
                  </svg>
                </div>
                <h4 className="font-bold text-black mb-2">Semester Planning</h4>
                <p className="text-sm text-gray-600">Plan your entire semester with AI</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}