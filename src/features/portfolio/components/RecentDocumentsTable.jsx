import { FileText, ChevronRight } from 'lucide-react';

export default function RecentDocumentsTable({ data }) {
  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-finzo-white/10 rounded-[10px] p-6 shadow-2xl mt-4">
      <h2 className="text-lg font-bold text-finzo-white mb-6">Recent Uploads</h2>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-finzo-white/10 text-finzo-white/40 text-[11px] uppercase tracking-widest">
              <th className="pb-3 px-4 font-medium">S.No</th>
              <th className="pb-3 px-4 font-medium">Document Name</th>
              <th className="pb-3 px-4 font-medium">Match %</th>
              <th className="pb-3 px-4 font-medium">Sender</th>
              <th className="pb-3 px-4 font-medium">Issuer</th>
              <th className="pb-3 px-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-finzo-white/80">
            {data.map((doc, index) => (
              <tr key={doc.id} className="border-b border-finzo-white/5 hover:bg-finzo-white/5 transition-colors group">
                <td className="py-4 px-4 font-medium text-finzo-white/50">0{index + 1}</td>
                <td className="py-4 px-4 font-medium text-finzo-white flex items-center gap-2">
                  <FileText size={14} className="text-finzo-white/30 group-hover:text-finzo-primary transition-colors" />
                  {doc.name}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border ${
                    doc.score >= 90 ? 'bg-finzo-primary/10 text-finzo-primary border-finzo-primary/20' : 'bg-finzo-secondary/10 text-finzo-secondary border-finzo-secondary/20'
                  }`}>
                    {doc.score}%
                  </span>
                </td>
                <td className="py-4 px-4">{doc.sender}</td>
                <td className="py-4 px-4">{doc.issuer}</td>
                <td className="py-4 px-4 text-right">
                  <button className="px-3 py-1.5 bg-finzo-white/5 hover:bg-finzo-primary hover:text-finzo-white text-finzo-white/70 text-xs font-medium rounded-[10px] transition-all cursor-pointer flex items-center gap-1 ml-auto">
                    Details <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}