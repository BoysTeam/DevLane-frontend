import { motion } from 'framer-motion';

export function SettingsView() {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-sm text-zinc-400">Manage integrations, preferences, and details</p>
      </div>

      <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-6">
        <h3 className="font-bold text-base tracking-tight border-b border-white/5 pb-4">Profile Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Username</span>
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-3.5 text-sm text-zinc-300">
              testuser_gemini
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Email Address</span>
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-3.5 text-sm text-zinc-300">
              testuser_gemini@example.com
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-6">
        <h3 className="font-bold text-base tracking-tight border-b border-white/5 pb-4">Social Integrations</h3>
        <div className="space-y-4">
          {[
            { platform: 'YouTube', status: 'Connected', details: 'Publish video uploads automatically' },
            { platform: 'TikTok', status: 'Connected', details: 'Post shortform reels' },
            { platform: 'Instagram', status: 'Disconnected', details: 'Cross-post media stories' },
          ].map((item) => (
            <div key={item.platform} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-none last:pb-0">
              <div>
                <p className="text-sm font-semibold text-white">{item.platform}</p>
                <p className="text-xs text-zinc-500">{item.details}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                item.status === 'Connected'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-zinc-900 border-white/5 text-zinc-500'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
