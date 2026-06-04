import { Youtube, Twitter, Instagram, Github } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Integrations'],
  Resources: ['Blog', 'Tutorials', 'Templates', 'Community', 'Help Center'],
  Company: ['About', 'Careers', 'Press Kit', 'Contact', 'Partners'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
};

const socialLinks = [
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center mb-6">
              <img src="/logo.png" alt="CreatorFlow Logo" className="h-10 w-auto object-contain" />
            </a>
            <p className="text-sm text-zinc-500 mb-6 max-w-xs leading-relaxed">
              The visual workflow tool built specifically for content creators.
              Plan, create, and publish consistently.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} CreatorFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
