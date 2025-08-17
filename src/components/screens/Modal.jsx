import { SCREENS } from '../../constants/screens';
import '../../styles/modal.css';

const Modal = ({ onClose, onNavigate }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <img src="src/components/screens/icon/modal-logo.png" width={"142px"}/>
        <p className="modal-text">저장이 완료되었습니다!</p>

        <button className="modal-btn1" onClick={() => onNavigate(SCREENS.HOME)}>
          홈으로 가기
        </button>
        <button className="modal-btn2" onClick={onClose}>계속 둘러보기</button>
      </div>
    </div>
  );
};

export default Modal;
