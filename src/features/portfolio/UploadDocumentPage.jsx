import { useState } from 'react';
import { FileUp, FileText, CheckCircle, AlertCircle, Clock, UploadCloud, Eye, Check, ChevronRight } from 'lucide-react';

// --- MOCK DATA ---
const recentDocuments = [
  { id: 1, name: 'INV-TechCorp-May26.pdf', score: 98, sender: 'TechCorp Solutions', issuer: 'Finance Dept', recipient: 'Procurement' },
  { id: 2, name: 'PO-Logistics-774.pdf', score: 85, sender: 'Global Transit', issuer: 'John Smith', recipient: 'Warehouse' },
  { id: 3, name: 'AWS-Billing-Q2.pdf', score: 100, sender: 'Amazon Web Services', issuer: 'Automated', recipient: 'IT Dept' },
  { id: 4, name: 'Contract_Vendor_Agmt.pdf', score: 72, sender: 'Alpha Industries', issuer: 'Legal Dept', recipient: 'Operations' },
];

export default function UploadDocumentPage() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const emptyData = {
    invoiceNumber: '', vendorName: '', date: '', dueDate: '', 
    totalAmount: '', taxAmount: '', poNumber: '',
  };
  const [extractedData, setExtractedData] = useState(emptyData);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      setExtractedData(emptyData);
      
      setTimeout(() => {
        setIsProcessing(false);
        setExtractedData({
          invoiceNumber: 'INV-2026-8942',
          vendorName: 'TechCorp Solutions Pvt Ltd',
          date: '2026-06-15',
          dueDate: '', 
          totalAmount: '45,200.00',
          taxAmount: '8,136.00',
          poNumber: '', 
        });
      }, 2000);
    }
  };

  const handleReset = () => { setFile(null); setExtractedData(emptyData); };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractedData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-8 min-h-screen">
      
      {/* 1. TOP KPI DASHBOARD */}
      <div>
        <h1 className="text-2xl font-bold text-finzo-white mb-6">Document Processing Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={UploadCloud} badge="Total" title="1,248" description="Total documents processed." glowColor="bg-finzo-primary" />
          <StatCard icon={CheckCircle} badge="Auto-Processed" title="1,092" description="High confidence matches." glowColor="bg-finzo-primary" />
          <StatCard icon={AlertCircle} badge="Manual Review" title="156" description="Requires human intervention." glowColor="bg-finzo-secondary" />
          <StatCard icon={Clock} badge="Queue" title="3" description="Pending extraction." glowColor="bg-finzo-primary" />
        </div>
      </div>

      {/* 2. DYNAMIC WORKSPACE */}
      {!file ? (
        <div className="w-full max-w-2xl mx-auto mt-4 bg-black/40 backdrop-blur-md border border-finzo-white/10 rounded-[10px] p-8 flex flex-col items-center shadow-2xl">
          <h2 className="text-sm font-bold text-finzo-white/40 uppercase tracking-widest mb-6">Upload Source Document</h2>
          <label className="w-full flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-finzo-white/10 rounded-[10px] bg-finzo-white/5 hover:bg-finzo-white/10 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-[10px] bg-finzo-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileUp size={32} className="text-finzo-primary" />
            </div>
            <p className="text-finzo-white font-medium text-lg">Click to upload or drag & drop</p>
            <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[600px]">
          {/* Left: Viewer */}
          <div className="lg:col-span-5 bg-black/40 border border-finzo-white/10 rounded-[10px] p-6 flex flex-col shadow-2xl">
            <h2 className="text-sm font-bold text-finzo-white/40 uppercase tracking-widest mb-4">Source Document</h2>
            <div className="flex-1 bg-finzo-white/5 flex items-center justify-center rounded-[10px] border border-finzo-white/10 relative">
              <Eye size={48} className="text-finzo-white/10" />
            </div>
            <button onClick={handleReset} className="mt-4 w-full text-xs text-finzo-white/40 hover:text-finzo-white transition-colors cursor-pointer">Close File</button>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 bg-black/40 border border-finzo-white/10 rounded-[10px] p-6 flex flex-col relative shadow-2xl">
             {isProcessing && (
              <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-[10px]">
                <div className="w-12 h-12 rounded-full border-4 border-finzo-primary/20 border-t-finzo-primary animate-spin mb-4"></div>
                <p className="text-sm font-bold text-finzo-white animate-pulse">Finzo AI reading...</p>
              </div>
            )}
            <h2 className="text-sm font-bold text-finzo-white/40 uppercase tracking-widest mb-6">Extracted Data</h2>
            <div className="flex-1 space-y-4">
              <SmartField label="Vendor Name" name="vendorName" value={extractedData.vendorName} onChange={handleInputChange} />
              <div className="grid grid-cols-2 gap-4">
                <SmartField label="Invoice Number" name="invoiceNumber" value={extractedData.invoiceNumber} onChange={handleInputChange} />
                <SmartField label="P.O. Number" name="poNumber" value={extractedData.poNumber} onChange={handleInputChange} />
              </div>
            </div>
            <button className="bg-finzo-primary text-white w-full py-3 rounded-[10px] mt-6 font-bold hover:bg-finzo-secondary transition-all">Verify & Save</button>
          </div>
        </div>
      )}

      {/* 3. RECENT DOCUMENTS TABLE */}
      <RecentDocumentsTable data={recentDocuments} />
    </div>
  );
}

// --- SUB-COMPONENTS (Keep these at the bottom of the same file) ---

function StatCard({ icon: Icon, badge, title, description, glowColor }) {
  return (
    <div className="relative overflow-hidden bg-[#050914] border border-finzo-white/5 rounded-[12px] p-6 flex flex-col">
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${glowColor} blur-[50px] opacity-20`}></div>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-8 h-8 rounded-full ${glowColor} flex items-center justify-center text-white`}><Icon size={16} /></div>
        <span className="text-xs font-semibold text-finzo-white/40 uppercase tracking-widest">{badge}</span>
      </div>
      <h3 className="text-xl font-bold text-finzo-white mb-2">{title}</h3>
      <p className="text-[13px] text-finzo-white/40">{description}</p>
    </div>
  );
}

function SmartField({ label, name, value, onChange, type = "text", prefix }) {
  const isMissing = value === '';
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-xs text-finzo-white/60">{label} {isMissing && <span className="text-finzo-secondary">*</span>}</label>
        {isMissing && <span className="text-[9px] text-finzo-secondary animate-pulse">Needs Input</span>}
      </div>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full bg-finzo-white/5 border border-finzo-white/10 rounded-[10px] p-2.5 text-sm text-finzo-white outline-none focus:border-finzo-primary" />
    </div>
  );
}

function RecentDocumentsTable({ data }) {
  return (
    <div className="w-full bg-black/40 border border-finzo-white/10 rounded-[10px] p-6 mt-4">
      <h2 className="text-lg font-bold text-finzo-white mb-6">Recent Uploads</h2>
      <table className="w-full text-left whitespace-nowrap">
        <thead className="text-[11px] uppercase text-finzo-white/40">
          <tr><th className="pb-3 px-4">S.No</th><th className="pb-3 px-4">Name</th><th className="pb-3 px-4">Match %</th><th className="pb-3 px-4">Action</th></tr>
        </thead>
        <tbody>
          {data.map((doc, idx) => (
            <tr key={doc.id} className="border-t border-finzo-white/5 text-sm text-finzo-white/80">
              <td className="py-4 px-4">0{idx + 1}</td>
              <td className="py-4 px-4">{doc.name}</td>
              <td className="py-4 px-4"><span className="px-2 py-1 bg-finzo-primary/10 text-finzo-primary rounded-[10px] text-xs">{doc.score}%</span></td>
              <td className="py-4 px-4 text-right"><button className="text-finzo-primary text-xs font-bold">Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}