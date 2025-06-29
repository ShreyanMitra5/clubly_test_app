"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ClerkProvider, UserButton, SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import LoadingScreen from './loading';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-rounded.png" type="image/png" />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased m-0 p-0 bg-white min-h-screen relative`}
        >
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
            <nav className="container-width py-4">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center justify-start">
                  <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="Clubly" width={36} height={36} className="rounded-xl" />
                    <span className="text-2xl font-black text-black">Clubly</span>
                  </a>
                </div>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                  <SignedIn>
                    <a href="/dashboard" className="nav-link">Dashboard</a>
                    <SignOutButton>
                      <button className="btn-ghost">Logout</button>
                    </SignOutButton>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="btn-ghost">Sign in</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn-primary">Get started</button>
                    </SignUpButton>
                  </SignedOut>
                </div>
                
                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                  <button
                    aria-label="Open menu"
                    className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen((v) => !v)}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  {/* Mobile Menu Dropdown */}
                  {mobileMenuOpen && (
                    <div ref={menuRef} className="absolute right-4 top-20 bg-white rounded-2xl shadow-modern-xl border border-gray-200 w-56 z-50 py-2 animate-slide-down">
                      <SignedIn>
                        <a href="/dashboard" className="block px-6 py-4 text-black font-semibold hover:bg-gray-50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          Dashboard
                        </a>
                        <SignOutButton>
                          <button className="block w-full text-left px-6 py-4 text-black hover:bg-gray-50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            Logout
                          </button>
                        </SignOutButton>
                        <div className="px-6 py-4 flex justify-start">
                          <UserButton />
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <SignInButton mode="modal">
                          <button className="block w-full text-left px-6 py-4 text-black hover:bg-gray-50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            Sign in
                          </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <button className="block w-full text-left px-6 py-4 text-black hover:bg-gray-50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            Get started
                          </button>
                        </SignUpButton>
                      </SignedOut>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </header>
          {loading ? <LoadingScreen /> : children}
        </body>
      </html>
    </ClerkProvider>
  );
}