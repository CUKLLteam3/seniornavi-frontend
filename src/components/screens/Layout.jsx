import React from "react";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <main className="frame">{children}</main>
    </div>
  );
}
