import {  useState } from "react";
import { Modal } from "react-bootstrap";
import Signup from './Signup';
import Login from './Login';

function Token({ handleShow, handleClose }) {
    const [, setOpenModal] = useState(handleShow);
    const [isSignup, setIsSignup] = useState(false);
    
    const closeModal = () => {
        handleClose();
        setOpenModal(false);
    };

    return (
        <div className="container-fluid">
            <Modal
                show={handleShow}
                onHide={() => {
                    handleClose();
                    setOpenModal(false);
                }}
                centered
                className="custom-modal d-flex flex-wrap"
            >
                <div className="modal-content col-auto">
                    <div className={`form-container  ${isSignup ? 'flip-front' : 'flip-back'}`}>
                        {isSignup ? (
                            <div className="front"><Signup setIsSignup={setIsSignup} setOpenModal={closeModal}/></div>
                        ) : (
                            <div className="back"><Login setIsSignup={setIsSignup} setOpenModal={closeModal}/></div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default Token;