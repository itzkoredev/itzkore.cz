import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "itzKORE";
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
          background: "#0b0f19",
          color: "#e5e7eb",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        itzKORE
      </div>
    ),
    { ...size }
  );
}
