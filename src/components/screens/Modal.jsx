import { SCREENS } from '../../constants/screens';
import '../../styles/modal.css';

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

export default Modal;
