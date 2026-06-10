import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#07060e",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(139,92,246,0.50), transparent 45%), radial-gradient(circle at 88% 90%, rgba(34,211,238,0.42), transparent 45%)",
          color: "#ededf8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 18,
              backgroundColor: "rgba(139,92,246,0.22)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9ea2bc" }}>
            github.com/newdawnera
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              color: "#22d3ee",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 10,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#9ea2bc",
              marginTop: 22,
              maxWidth: 980,
            }}
          >
            Building data-driven web and mobile products, often with AI at the core.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              height: 12,
              width: 12,
              borderRadius: 12,
              backgroundColor: "#22d3ee",
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: "#9ea2bc" }}>
            {site.status}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
