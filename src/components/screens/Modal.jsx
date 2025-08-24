// src/components/screens/Modal.jsx
import { SCREENS } from '../../constants/screens';
import '../../styles/modal.css';

// HEAD 버전을 기본 export로 유지 (기존 import 호환성)
const Modal = ({ onNavigate, onClose, message }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <img src="/icon/modal-logo.png" width={"142px"}/>
        <p className="modal-text">{message}</p>

        <button className="modal-btn1" onClick={() => onNavigate(SCREENS.HOME)}>
          홈으로 가기
        </button>
        <button className="modal-btn2" onClick={onClose}>계속 둘러보기</button>
      </div>
    </div>
  );
};

// origin/main 버전을 BaseModal로 named export
export function BaseModal({ open, onClose, children }) {
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

export default Modal;