export default function AuthorBadge() {
  return (
    <div className="flex items-center gap-3 my-6 py-4 border-y border-[#2d4020]">
      <div className="w-9 h-9 rounded-full bg-[#1b2f1a] border border-[#2d4020] flex items-center justify-center text-[#8b9b6a] text-sm font-bold flex-shrink-0"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        PN
      </div>
      <div>
        <p className="text-sm font-semibold text-[#e8e4d8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Pranav Neeli
        </p>
        <p className="text-xs text-[#8a9a72]">
          12 years enterprise RPA — developer to architect to manager. Founder, Guerrilla Bots.
        </p>
      </div>
    </div>
  );
}
