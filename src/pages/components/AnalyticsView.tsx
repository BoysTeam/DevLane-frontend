import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import type { Card } from '../../query/card';

interface AnalyticsViewProps {
  cardsList: Card[];
}

export function AnalyticsView({ cardsList }: AnalyticsViewProps) {
  return (
    <motion.div
      key="analytics"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content Status</h2>
        <p className="text-sm text-zinc-400">Visual overview of your pipeline performance</p>
      </div>

      {/* Dynamic KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'IDEAS', count: cardsList.filter(c => c.status?.toUpperCase() === 'IDEA').length, color: 'text-purple-400' },
          { label: 'SCRIPTING', count: cardsList.filter(c => c.status?.toUpperCase() === 'SCRIPTING').length, color: 'text-blue-400' },
          { label: 'EDITING', count: cardsList.filter(c => c.status?.toUpperCase() === 'EDITING').length, color: 'text-amber-400' },
          { label: 'PUBLISHED', count: cardsList.filter(c => c.status?.toUpperCase() === 'PUBLISHED').length, color: 'text-emerald-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors duration-300">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">{kpi.label}</span>
            <span className={`text-4xl font-extrabold tracking-tight ${kpi.color}`}>
              {kpi.count}
            </span>
          </div>
        ))}
      </div>

      {/* Performance Chart Card */}
      <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
        <h3 className="font-bold text-base tracking-tight mb-6">Performance Trends</h3>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { name: 'Sun', value: 12 },
                { name: 'Mon', value: 34 },
                { name: 'Tue', value: 28 },
                { name: 'Wed', value: 72 },
                { name: 'Thu', value: 45 },
                { name: 'Fri', value: 58 },
                { name: 'Sat', value: 92 },
              ]}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                labelStyle={{ color: '#a1a1aa', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="value" stroke="#c084fc" strokeWidth={2.5} fillOpacity={1} fill="url(#purpleGlow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base tracking-tight">Recent Activity</h3>
          <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">Show all</button>
        </div>

        <div className="space-y-4">
          {cardsList.slice(0, 3).map((card) => (
            <div key={card.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-none last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-purple-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{card.title}</p>
                  <p className="text-xs text-zinc-500">Status changed to {card.status}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500">
                {new Date(card.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {cardsList.length === 0 && (
            <div className="text-center py-6 text-sm text-zinc-500">
              No recent activity recorded
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
