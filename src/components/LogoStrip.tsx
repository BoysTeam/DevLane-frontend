import { motion } from 'framer-motion';
import { Youtube, Instagram, Twitch, Podcast, Clapperboard, Camera, Mic2, PenTool } from 'lucide-react';

const platforms = [
  { name: 'YouTube', icon: Youtube },
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitch', icon: Twitch },
  { name: 'Podcast', icon: Podcast },
  { name: 'TikTok', icon: Clapperboard },
  { name: 'Photography', icon: Camera },
  { name: 'Voice', icon: Mic2 },
  { name: 'Blogging', icon: PenTool },
];

export default function LogoStrip() {
  return (
    <section className="relative py-16 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-zinc-500 uppercase tracking-[0.2em]"
        >
          Trusted by creators across every platform
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          {[...platforms, ...platforms].map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div
                key={`${platform.name}-${index}`}
                className="flex items-center gap-3 px-10 py-4 group"
              >
                <Icon className="w-6 h-6 text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300" />
                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300 whitespace-nowrap">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
