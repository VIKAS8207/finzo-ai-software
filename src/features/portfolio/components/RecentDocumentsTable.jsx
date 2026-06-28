import { useState } from 'react';
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react';

export default function RecentDocumentsTable({ data = [] }) {
  // --- PAGINATION STATE & LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this number to show more/less rows

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calculate which items to show on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Handlers for buttons
  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

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
            {/* Map over currentData instead of the full data array */}
            {currentData.map((doc, index) => (
              <tr key={doc.id} className="border-b border-finzo-white/5 hover:bg-finzo-white/5 transition-colors group">
                <td className="py-4 px-4 font-medium text-finzo-white/50">
                  {/* Calculate actual serial number across pages */}
                  {String(startIndex + index + 1).padStart(2, '0')}
                </td>
                <td className="py-4 px-4 font-medium text-finzo-white flex items-center gap-2">
                  <FileText size={14} className="text-finzo-white/30 group-hover:text-finzo-primary transition-colors" />
                  {doc.name}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-[10px] text-xs font-bold border ${
                    doc.score >= 90 
                      ? 'bg-finzo-primary/10 text-finzo-primary border-finzo-primary/20' 
                      : 'bg-finzo-secondary/10 text-finzo-secondary border-finzo-secondary/20'
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

        {/* Empty State Fallback (Just in case) */}
        {currentData.length === 0 && (
          <div className="w-full text-center py-8 text-finzo-white/40 text-sm">
            No documents found.
          </div>
        )}
      </div>

      {/* --- PAGINATION FOOTER --- */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between pt-5 mt-2">
          
          {/* Left Side: Counter indicator */}
          <div className="text-xs font-medium text-finzo-white/40 tracking-wide">
            Showing <span className="text-finzo-white">{startIndex + 1}</span> to <span className="text-finzo-white">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="text-finzo-white">{totalItems}</span> entries
          </div>

          {/* Right Side: Page Controls */}
          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-[8px] border border-finzo-white/10 flex items-center justify-center transition-all ${
                currentPage === 1 
                  ? 'opacity-30 cursor-not-allowed text-finzo-white/50' 
                  : 'hover:bg-finzo-white/10 text-finzo-white cursor-pointer'
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-finzo-primary text-white shadow-[0_0_10px_rgba(23,70,234,0.3)] border-none'
                    : 'text-finzo-white/50 hover:bg-finzo-white/10 hover:text-finzo-white border border-transparent'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-[8px] border border-finzo-white/10 flex items-center justify-center transition-all ${
                currentPage === totalPages 
                  ? 'opacity-30 cursor-not-allowed text-finzo-white/50' 
                  : 'hover:bg-finzo-white/10 text-finzo-white cursor-pointer'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
        </div>
      )}
      
    </div>
  );
}