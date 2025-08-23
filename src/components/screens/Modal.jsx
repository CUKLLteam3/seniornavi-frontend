// src/components/screens/Modal.jsx
export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={backdrop} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}


const backdrop = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 28,
  zIndex: 10000,
};

const sheet = {
  width: "min(420px, 94vw)",
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 12px 40px rgba(0,0,0,.22)",
  overflow: "hidden",
};
