// Logo do Partyu (pin com sorriso), redesenhada em SVG a partir do logo.png original.
export const PIN_PATH = "M514 934 L267 687 A350 350 0 1 1 761 687 Z";
export const SMILE_PATH = "M295 485 A220 220 0 0 0 735 485 L647 485 A132 132 0 0 1 383 485 Z";

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <rect width="1024" height="1024" rx="230" fill="#FF4D80" />
      <path d={PIN_PATH} fill="#fff" />
      <path d={SMILE_PATH} fill="#FF4D80" />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span>partyu</span>
    </span>
  );
}
