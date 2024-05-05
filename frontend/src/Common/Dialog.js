import { useState } from "react";
import { Modal } from "react-bootstrap";

const Dialog = (props) => {
    const [show, setOpenModal] = useState(true);

    const closeModal = () => {
        setOpenModal(false);
        props.setOpenModal(false);
    };
    return (
        <Modal
            show={show}
            onHide={() => {
                closeModal();
            }}
            centered
            className="custom-modal d-flex flex-wrap bg-transparent "
        >

            <div className="modal-dialog ">
                <div className="modal-content bg-primary p-8">
                    <div className="d-flex justify-content-end">
                        <a className='btn btn-outline-dark rounded-circle' onClick={() => closeModal()}>
                            <i className=" fas fa-times icon"></i>
                        </a>
                    </div>
                    {props.children}
                </div>
            </div>
        </Modal>
    );
}

export default Dialog;