import { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import Features from '@/components/Features';
import Workflow from '@/components/Workflow';
import PainPoints from '@/components/PainPoints';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useLenis();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <LogoStrip />
      <Features />
      <Workflow />
      <PainPoints />
      <CTA />
      <Footer />
    </div>
  );
}
