import { UploadCloud, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function DocumentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard icon={UploadCloud} badge="Total" title="1,248" description="Total documents processed through the AI engine to date." glowColor="bg-finzo-primary" />
      <StatCard icon={CheckCircle} badge="Auto-Processed" title="1,092" description="Successfully processed with high confidence." glowColor="bg-finzo-primary" />
      <StatCard icon={AlertCircle} badge="Manual Review" title="156" description="Requires human input due to missing fields." glowColor="bg-finzo-secondary" />
      <StatCard icon={Clock} badge="Queue" title="3" description="Documents currently pending extraction." glowColor="bg-finzo-primary" />
    </div>
  );
}

function StatCard({ icon: Icon, badge, title, description, glowColor }) {
  return (
    <div className="relative overflow-hidden bg-[#050914] border border-finzo-white/5 rounded-[12px] p-6 flex flex-col group transition-all duration-300 hover:border-finzo-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-finzo-primary/10">
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${glowColor} blur-[50px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40`}></div>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-8 h-8 rounded-full ${glowColor} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <span className="text-xs font-semibold text-finzo-white/40 tracking-widest uppercase">{badge}</span>
      </div>
      <h3 className="text-xl font-bold text-finzo-white mb-2 tracking-wide">{title}</h3>
      <p className="text-[13px] text-finzo-white/40 leading-relaxed font-medium pr-2">{description}</p>
    </div>
  );
}