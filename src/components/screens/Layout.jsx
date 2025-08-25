import React from "react";
import "../../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div
      className="app-shell"
      style={{ backgroundColor: "#fff", paddingBottom: "84px" }}
    >
      <main className="frame" style={{ maxWidth: "401px", width: "401px", margin: "0 auto" }}>{children}</main>
    </div>
  );
}
