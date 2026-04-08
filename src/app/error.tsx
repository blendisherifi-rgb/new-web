"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error.tsx]", error);
  }, [error]);

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "96px 24px",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: 26, fontWeight: 600, color: "#0a0f2e" }}>
        Something went wrong.
      </p>
      <p style={{ marginTop: 12, fontSize: 15, color: "#6b7280" }}>
        Please try again. If the issue continues, contact SoftCo support.
      </p>
      <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16 }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "12px 20px",
            borderRadius: 5,
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href="/"
          style={{
            padding: "12px 20px",
            borderRadius: 5,
            border: "2px solid #0070f3",
            color: "#0070f3",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
}
