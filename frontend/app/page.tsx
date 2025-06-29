"use client";

import React, { useEffect, useState } from 'react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, SignOutButton, useUser, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="feature-card group animate-fade-in-scale">
    <div className="feature-icon group-hover:bg-black group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
    <p className="body-sm text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center animate-fade-in-up">
    <div className="text-5xl font-black text-black mb-3">{number}</div>
    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{label}</div>
  </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="text-center animate-fade-in-up">
    <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-modern-lg">
      {number}
    </div>
    <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
    <p className="body-sm text-gray-600">{description}</p>
  </div>
);

export default function HomePage() {
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { sessionId } = useAuth();

  useEffect(() => {
    if (isSignedIn && user && sessionId && typeof window !== 'undefined' && !localStorage.getItem(`onboardingComplete_${user.id}`)) {
      router.push('/onboarding');
    }
  }, [isSignedIn, user, sessionId, router]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSignInPrompt(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding hero-gradient grid-bg relative overflow-hidden flex flex-col items-center text-center">
        {/* Decorative School-Themed Icons - enhanced positioning */}
        <Image 
          src="/rocket.png" 
          alt="Rocket" 
          width={80} 
          height={80} 
          className="absolute left-[10%] bottom-[15%] opacity-20 rotate-[-12deg] hidden lg:block animate-fade-in-scale" 
          style={{ animationDelay: '0.5s' }}
        />
        <Image 
          src="/paper-plane.png" 
          alt="Paper Plane" 
          width={85} 
          height={85} 
          className="absolute right-[15%] bottom-[20%] opacity-20 rotate-[8deg] hidden lg:block animate-fade-in-scale" 
          style={{ animationDelay: '0.7s' }}
        />
        <Image 
          src="/open-book.png" 
          alt="Open Book" 
          width={75} 
          height={75} 
          className="absolute right-[8%] top-[20%] opacity-20 rotate-[-5deg] hidden lg:block animate-fade-in-scale" 
          style={{ animationDelay: '0.3s' }}
        />
        <Image 
          src="/math.png" 
          alt="Math" 
          width={65} 
          height={65} 
          className="absolute left-[20%] top-[35%] opacity-20 rotate-[15deg] hidden lg:block animate-fade-in-scale" 
          style={{ animationDelay: '0.9s' }}
        />
        
        {/* Main hero content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-20 md:py-32">
          <div className="badge mb-8 animate-fade-in-up">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Made by Those Who Know the Struggle 🧠
          </div>
          
          <h1 className="heading-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Plan Better Club Meetings.<br />
            <span className="text-gray-500">Instantly.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Clubly helps you plan, organize, and run your high school club with ease. Instantly generate presentations, track attendance, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {isSignedIn ? (
              <Link href="/dashboard" className="flex-1">
                <button className="btn-primary w-full">Start Creating</button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary w-full">Start Creating</button>
              </SignInButton>
            )}
            <a href="#features" className="btn-secondary flex-1">Learn More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-width">
          <div className="text-center mb-20">
            <h2 className="heading-lg mb-8">All-in-one Club Management</h2>
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-black rounded-full"></div>
            </div>
            <p className="body-lg max-w-3xl mx-auto">
              Clubly gives you everything you need to run a high-impact club, all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
              title="AI Presentation Generation"
              description="Create stunning, interactive slides for every meeting in seconds."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2a4 4 0 014-4h4" /></svg>}
              title="Semester Roadmap"
              description="Plan your club's semester with AI-powered scheduling and milestones."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
              title="Attendance & Notes"
              description="Track attendance and keep meeting notes organized for every session."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3" /></svg>}
              title="Event Ideas"
              description="Get creative, AI-powered ideas for impactful club events."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
              title="Club Website"
              description="Auto-generate a beautiful website for your club in one click."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /></svg>}
              title="Social Media Posts"
              description="Generate and schedule posts to keep your club active online."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 7h18M3 12h18M3 17h18" /></svg>}
              title="Templates"
              description="Access a library of templates for meetings, events, and more."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
              title="Settings"
              description="Customize your club experience and manage preferences."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-20">
            <h2 className="heading-lg mb-8">How it works</h2>
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-black rounded-full"></div>
            </div>
            <p className="body-lg max-w-3xl mx-auto">
              Creating professional presentations has never been easier. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid-3">
            <StepCard
              number="1"
              title="Describe your topic"
              description="Tell us about your club, topic, and week number. Choose from our professional themes."
            />
            <StepCard
              number="2"
              title="AI creates your slides"
              description="Our AI generates content, finds relevant images, and creates a complete presentation in seconds."
            />
            <StepCard
              number="3"
              title="Download and present"
              description="Download your PowerPoint file and wow your audience with a professional presentation."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-8">Trusted by club leaders everywhere</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Presentations Created" />
            <StatCard number="500+" label="Active Clubs" />
            <StatCard number="50+" label="Schools" />
            <StatCard number="99%" label="Satisfaction Rate" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding cta-gradient text-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px'
          }} 
        />
        
        <div className="container-width text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white leading-tight">
            Ready to transform your presentations?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of educators and club leaders who are already creating amazing presentations with Clubly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            {isSignedIn ? (
              <Link href="/dashboard" className="flex-1">
                <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 w-full shadow-modern-lg hover:shadow-modern-xl hover:scale-105">
                  Start creating for free
                </button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 w-full shadow-modern-lg hover:shadow-modern-xl hover:scale-105">
                  Start creating for free
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-width">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            {/* Logo and Clubly name */}
            <div className="flex items-center justify-center md:justify-start">
              <img src="/logo.png" alt="Clubly" width={32} height={32} className="rounded-lg mr-3" />
              <span className="font-black text-black text-xl">Clubly</span>
            </div>
            
            {/* Links */}
            <div className="flex flex-col items-center gap-2 text-sm text-gray-500 sm:flex-row sm:gap-8 md:justify-center">
              <a href="/privacy" className="hover:text-black transition-colors font-medium">Privacy Policy</a>
              <a href="/terms" className="hover:text-black transition-colors font-medium">Terms of Service</a>
              <a href="mailto:hello@getclubly.com" className="hover:text-black transition-colors font-medium">Contact</a>
            </div>
            
            {/* Social icons */}
            <div className="flex flex-row gap-6 justify-center md:justify-end">
              <a href="https://www.linkedin.com/company/get-clubly/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                <svg width="28" height="28" fill="currentColor" className="text-gray-400 hover:text-blue-700 transition-colors duration-200">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/clubly.tech/" target="_blank" rel="noopener" aria-label="Instagram" className="hover:scale-110 transition-transform">
                <svg width="28" height="28" fill="currentColor" className="text-gray-400 hover:text-pink-500 transition-colors duration-200" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.8.31 4.01.54c-.8.23-1.48.54-2.16 1.22-.68.68-.99 1.36-1.22 2.16-.23.79-.412 1.76-.47 3.04C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.16.51 2.91.29.8.67 1.48 1.34 2.15.67.67 1.35 1.05 2.15 1.34.75.27 1.63.452 2.91.51C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.16-.24 2.91-.51.8-.29 1.48-.67 2.15-1.34.67-.67 1.05-1.35 1.34-2.15.27-.75.452-1.63.51-2.91.058-1.28.07-1.684.07-4.948 0-3.264-.012-3.668-.07-4.948-.058-1.28-.24-2.16-.51-2.91-.29-.8-.67-1.48-1.34-2.15-.67-.67-1.35-1.05-2.15-1.34-.75-.27-1.63-.452-2.91-.51C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener" aria-label="Discord" className="hover:scale-110 transition-transform">
                <img src="/discord.png" alt="Discord" width={32} height={32} className="opacity-40 hover:opacity-70 transition-opacity duration-200" />
              </a>
            </div>
          </div>
          
          <div className="divider my-8"></div>
          
          <div className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Clubly. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sign In Prompt Modal */}
      {!isSignedIn && showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-scale">
          <div className="bg-white rounded-3xl shadow-modern-xl p-10 max-w-md w-full mx-4 relative animate-fade-in-scale">
            <button 
              onClick={() => setShowSignInPrompt(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-3xl transition-colors"
            >
              ×
            </button>
            
            <div className="text-center">
              <h3 className="text-3xl font-bold text-black mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sign up to save your presentations and access all features.
              </p>
              
              <SignUpButton mode="modal">
                <button className="btn-primary w-full mb-4">Create free account</button>
              </SignUpButton>
              
              <SignInButton mode="modal">
                <button className="btn-secondary w-full">Sign in instead</button>
              </SignInButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}