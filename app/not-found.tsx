import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      {/* Aesthetic Background Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-white/[0.02] uppercase tracking-tighter select-none">
          Atelier
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-amber-100/50 font-light">
          Error 404
        </h2>
        
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
          Piece Not Found
        </h1>
        
        <p className="max-w-md mx-auto text-[11px] md:text-sm text-white/40 leading-relaxed uppercase tracking-widest font-light">
          The collection you are looking for has been moved, <br /> 
          archived, or never existed in our archive.
        </p>

        <div className="pt-8">
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-4 border border-white/10 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            Return to Shop
            <MoveRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 left-0 w-full text-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
          GF Deuche Collection © 2026
        </span>
      </div>
    </div>
  );
}