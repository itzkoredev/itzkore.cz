import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CyberSurvivor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b0f19,#1c2333)",
          color: "#e5e7eb",
          fontSize: 68,
          fontWeight: 800,
        }}
      >
        CyberSurvivor
      </div>
    ),
    { ...size }
  );
}
