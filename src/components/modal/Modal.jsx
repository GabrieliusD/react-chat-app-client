import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";
export default function Modal(props) {
  return ReactDOM.createPortal(
    <div>
      {props.showModal ? (
        <div className="modalContainer">
          <div className="modalWrapper">
            <img src="" alt="" className="modalImg" />
            <div className="modalContent">
              <h1>Are you ready</h1>
              <p>Exclusive launch</p>
              <button>Join now</button>
              <button className="closeModalButton"></button>
            </div>
          </div>
        </div>
      ) : null}
    </div>,
    document.getElementById("modal")
  );
}
