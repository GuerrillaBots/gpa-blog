import Image from "next/image";

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
        <Image
          src="/images/pranav.png"
          alt="Pranav Neeli"
          width={40}
          height={40}
          className="rounded-full object-cover flex-shrink-0 mt-0.5"
        />
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
