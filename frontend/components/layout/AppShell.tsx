'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from '../shared/CommandPalette';
import { X } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-brand-bg text-brand-navy overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar onOpenCommand={() => setCommandPaletteOpen(true)} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fadeIn">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex flex-col w-64 max-w-[80%] bg-white h-full z-10 shadow-2xl animate-slideInRight">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-3 p-1 text-slate-500 hover:text-brand-navy rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar
              onCloseMobile={() => setMobileOpen(false)}
              onOpenCommand={() => {
                setMobileOpen(false);
                setCommandPaletteOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-brand-bg">
        <TopBar
          onOpenMobile={() => setMobileOpen(true)}
          onOpenCommand={() => setCommandPaletteOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-7xl w-full mx-auto animate-fadeIn">
          {children}
        </main>
      </div>

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};

