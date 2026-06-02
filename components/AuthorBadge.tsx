export default function AuthorBadge() {
  return (
    <div className="mt-14 pt-8 border-t border-[#d0cbbf]">
      <p
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-xs font-bold tracking-widest uppercase text-[#8b9b6a] mb-4"
      >
        Written by
      </p>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full bg-[#1b2f1a] flex items-center justify-center text-[#f0ede5] text-xs font-bold flex-shrink-0 mt-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          PN
        </div>
        <div>
          <p className="text-base font-bold text-[#1a2a12]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Pranav Neeli
          </p>
          <p className="text-sm text-[#6b7a55] mt-1 leading-relaxed">
            12 years enterprise RPA — developer to architect to manager.
            Worked at Accenture, EY, Fossil, Alcon, HP.
            Now building Guerrilla Bots to fix the last mile.
          </p>
        </div>
      </div>
    </div>
  );
}
