import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#0a0a09", color: "#e7e0ca", fontFamily: "serif", fontSize: 43, fontStyle: "italic", fontWeight: 700 }}>
      K
    </div>,
    size,
  );
}

