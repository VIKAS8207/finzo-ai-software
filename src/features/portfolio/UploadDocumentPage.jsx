import { useState } from 'react';
import { 
  FileUp, FileText, CheckCircle, AlertCircle, 
  Eye, Check 
} from 'lucide-react';

// --- IMPORT YOUR COMPONENTS ---
import DocumentStats from './components/DocumentStats';
import RecentDocumentsTable from './components/RecentDocumentsTable';
import BreadcrumbNav from '../../components/ui/BreadcrumbNav'; // Adjust path based on your folder structure

const recentDocumentsData = [
  { id: 1, name: 'INV-TechCorp-May26.pdf', score: 98, sender: 'TechCorp Solutions', issuer: 'Finance Dept' },
  { id: 2, name: 'PO-Logistics-774.pdf', score: 85, sender: 'Global Transit', issuer: 'John Smith' },
  { id: 3, name: 'AWS-Billing-Q2.pdf', score: 100, sender: 'Amazon Web Services', issuer: 'Automated' },
  { id: 4, name: 'Contract_Vendor_Agmt.pdf', score: 72, sender: 'Alpha Industries', issuer: 'Legal Dept' },
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
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 flex flex-col gap-6 min-h-screen font-spline-sans">
      
      {/* --- IMPORTED BREADCRUMB NAVIGATION --- */}
      <BreadcrumbNav 
        paths={[
          { label: 'Portfolio' }, 
          { label: 'Upload Document' }
        ]}
      >
        {/* Later, if you want a button on the right side, you just put it here! */}
        {/* <button className="px-3 py-1 bg-finzo-primary text-white rounded">Action</button> */}
      </BreadcrumbNav>

      {/* --- PAGE HEADER & IMPORTED STATS --- */}
      <div>
        <h1 className="text-2xl font-bold text-finzo-white mb-6">Document Processing Center</h1>
        <DocumentStats />
      </div>

      {/* --- DYNAMIC WORKSPACE (Slim vs Expanded) --- */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 w-full transition-all duration-700 ease-in-out ${file ? 'min-h-[600px]' : 'min-h-[260px]'}`}>
        
        {/* LEFT PANEL: Uploader OR Viewer */}
        <div className="lg:col-span-5 bg-black/40 border border-finzo-white/10 rounded-[10px] p-6 flex flex-col shadow-2xl transition-all duration-700 h-full">
          <h2 className="text-sm font-bold text-finzo-white/40 uppercase tracking-widest mb-4">
            {!file ? "Upload Source Document" : "Source Document"}
          </h2>
          
          {!file ? (
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-finzo-white/10 rounded-[10px] bg-finzo-white/5 hover:bg-finzo-white/10 transition-all cursor-pointer group min-h-[180px]">
              <FileUp size={28} className="text-finzo-primary mb-3 group-hover:-translate-y-1 transition-transform" />
              <p className="text-finzo-white font-medium text-sm">Drag & drop document</p>
              <p className="text-[10px] text-finzo-white/40 mt-1">PDF, PNG, JPG (Max 10MB)</p>
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg" />
            </label>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-500">
              <div className="flex-1 bg-finzo-white/5 flex items-center justify-center rounded-[10px] border border-finzo-white/10 relative overflow-hidden">
                <Eye size={48} className="text-finzo-white/10" />
                <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center text-finzo-white/30 text-sm font-medium">
                  <span>{file.name}</span>
                  <span className="text-xs mt-2 opacity-50">Preview generated</span>
                </div>
              </div>
              <button onClick={handleReset} className="mt-4 w-full py-2.5 bg-red-500/10 text-red-400 rounded-[10px] text-xs font-bold hover:bg-red-500/20 transition-colors cursor-pointer">
                Remove Document
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Empty State OR Extracted Form */}
        <div className="lg:col-span-7 bg-black/40 border border-finzo-white/10 rounded-[10px] p-6 flex flex-col relative shadow-2xl transition-all duration-700 h-full">
          <h2 className="text-sm font-bold text-finzo-white/40 uppercase tracking-widest mb-6">Extracted Data</h2>
          
          {!file ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-finzo-white/5 rounded-[10px] bg-[#0a0a0a] min-h-[150px]">
              <FileText size={32} className="text-finzo-white/10 mb-3" />
              <p className="text-xs font-medium text-finzo-white/30 uppercase tracking-wider">Awaiting Document Upload</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-500 relative">
              
              {isProcessing && (
                <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-[10px]">
                  <div className="w-12 h-12 rounded-full border-4 border-finzo-primary/20 border-t-finzo-primary animate-spin mb-4"></div>
                  <p className="text-sm font-bold text-finzo-white animate-pulse">Finzo AI extracting parameters...</p>
                </div>
              )}

              <div className="flex-1 space-y-5">
                <SmartField label="Vendor Name" name="vendorName" value={extractedData.vendorName} onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <SmartField label="Invoice Number" name="invoiceNumber" value={extractedData.invoiceNumber} onChange={handleInputChange} />
                  <SmartField label="P.O. Number" name="poNumber" value={extractedData.poNumber} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SmartField label="Invoice Date" name="date" type="date" value={extractedData.date} onChange={handleInputChange} />
                  <SmartField label="Due Date" name="dueDate" type="date" value={extractedData.dueDate} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SmartField label="Total Amount" name="totalAmount" prefix="₹" value={extractedData.totalAmount} onChange={handleInputChange} />
                  <SmartField label="Tax Amount" name="taxAmount" prefix="₹" value={extractedData.taxAmount} onChange={handleInputChange} />
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-finzo-white/10">
                <button 
                  disabled={isProcessing}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] font-bold transition-all shadow-[0_0_20px_rgba(23,70,234,0.3)] ${
                    !isProcessing ? 'bg-finzo-primary hover:bg-finzo-secondary text-finzo-white cursor-pointer' : 'bg-finzo-white/5 text-finzo-white/30 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check size={18} strokeWidth={2.5} />
                  Verify & Save Document
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- IMPORTED RECENT DOCUMENTS TABLE --- */}
      <RecentDocumentsTable data={recentDocumentsData} />
      
    </div>
  );
}

// ---------------------------------------------------------
// Helper Component: SmartField 
// ---------------------------------------------------------

function SmartField({ label, name, value, onChange, type = "text", prefix }) {
  const isMissing = value === '';
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-medium text-finzo-white/60">{label} {isMissing && <span className="text-finzo-secondary ml-1">*</span>}</label>
        {isMissing ? (
          <span className="text-[9px] uppercase tracking-wider text-finzo-secondary animate-pulse flex items-center gap-1">
            <AlertCircle size={10} /> Needs Input
          </span>
        ) : (
          <span className="text-[9px] uppercase tracking-wider text-finzo-primary flex items-center gap-1">
             <CheckCircle size={10} /> Extracted
          </span>
        )}
      </div>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-finzo-white/50 text-sm">{prefix}</span>
          </div>
        )}
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          className={`w-full bg-finzo-white/5 border rounded-[10px] p-2.5 text-sm text-finzo-white outline-none transition-all
            ${prefix ? 'pl-8' : ''} 
            ${isMissing ? 'border-finzo-secondary/50 focus:border-finzo-secondary shadow-[0_0_12px_rgba(168,85,247,0.15)] bg-finzo-secondary/5' : 'border-finzo-white/10 focus:border-finzo-primary'}
          `} 
        />
      </div>
    </div>
  );
}