export default function BackgroundCanvas() {
  return (
    // CHANGED: "fixed" to "absolute" and added "overflow-hidden"
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-tl-[15px]">
      <div className="absolute inset-0 bg-finzo-fourth"></div>
      
      {/* Ambient Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-finzo-third/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-finzo-primary/20 blur-[120px]"></div>
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-finzo-secondary/10 blur-[100px]"></div>
      
      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, var(--color-finzo-white) 1px, transparent 1px), linear-gradient(to bottom, var(--color-finzo-white) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-finzo-fourth)_100%)] opacity-80"></div>
    </div>
  );
}