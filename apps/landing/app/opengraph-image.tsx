import { ImageResponse } from "next/og";
import { PIN_PATH, SMILE_PATH } from "@/components/Logo";

export const alt = "Partyu: o rolê certo, com a galera certa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F5F1EF",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 56, fontWeight: 700, color: "#1F1A1C" }}>
        <svg width="72" height="72" viewBox="0 0 1024 1024">
          <rect width="1024" height="1024" rx="230" fill="#FF4D80" />
          <path d={PIN_PATH} fill="#fff" />
          <path d={SMILE_PATH} fill="#FF4D80" />
        </svg>
        partyu
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#1F1A1C", lineHeight: 1.1 }}>
          O rolê certo,
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#FF4D80", lineHeight: 1.1 }}>
          já com a galera certa.
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#5C5357", marginTop: 28 }}>
          Eventos reais · com seus amigos ou com gente compatível
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          background: "#FF4D80",
          color: "#fff",
          fontSize: 30,
          fontWeight: 700,
          borderRadius: 999,
          padding: "14px 32px",
        }}
      >
        Lista de espera aberta
      </div>
    </div>,
    size,
  );
}
