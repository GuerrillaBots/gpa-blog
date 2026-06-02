export default function AuthorBadge() {
  return (
    <div className="flex items-center gap-3 my-6 py-4 border-y border-[#d0cbbf]">
      <div
        className="w-9 h-9 rounded-full bg-[#1b2f1a] flex items-center justify-center text-[#f0ede5] text-xs font-bold flex-shrink-0"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        PN
      </div>
      <div>
        <p className="text-sm font-semibold text-[#1a2a12]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Pranav Neeli
        </p>
        <p className="text-xs text-[#6b7a55]">
          12 years enterprise RPA — developer to architect to manager. Founder, Guerrilla Bots.
        </p>
      </div>
    </div>
  );
}
