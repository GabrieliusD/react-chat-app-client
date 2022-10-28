import React, { useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { ReactComponent as CrossIcon } from "../../icons/cross.svg";

export default function Modal(props) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.setShowModal(false);
    }
  };

  return ReactDOM.createPortal(
    <div>
      {props.showModal ? (
        <div
          className="modalContainer"
          ref={modalRef}
          onClick={closeModal}
          style={{ zIndex: props.zIndex }}
        >
          <div className="modalWrapper" style={{ zIndex: props.zIndex }}>
            <div className="modalContent">
              <h1 className="title">{props.title || "Modal Title"}</h1>
              {props.children}
              <button
                className="closeModalButton"
                onClick={() => props.setShowModal((prev) => !prev)}
              >
                <CrossIcon></CrossIcon>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>,
    document.getElementById("modal")
  );
}
