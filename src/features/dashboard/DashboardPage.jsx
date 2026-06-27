export default function DashboardPage() {
  return (
    // Removed the rounded corner, ensured full width/height
    <div className="relative w-full h-full min-h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      
      

      {/* --- ACTUAL PAGE CONTENT --- */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold leading-tight mb-4 text-finzo-white">
          Welcome to the Dashboard
        </h1>
        <p className="text-finzo-white/60 leading-normal max-w-md mx-auto">
          Your ambient grid and gradient canvas is ready. All your upcoming UI cards and charts will float beautifully on top of this full-bleed background.
        </p>
      </div>

    </div>
  );
}