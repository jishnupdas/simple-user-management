import React from "react";

const Modal = ({ visible, setVisible, children }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full shadow-lg bg-gray-600/25"
      onClick={() => setVisible(false)}
    >
      <div className="inline-block overflow-hidden align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        {children}
      </div>
    </div>
  );
};

export default Modal;
