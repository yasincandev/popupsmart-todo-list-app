import React from "react";

const DarkModeSwitch = (props) => {
  return (
    <div className="dark-mode-container">
      <button className="dark-mode-switch" onClick={props.toggleDarkMode}>
        <i className="fa-regular fa-moon"></i>
      </button>
    </div>
  );
};

export default DarkModeSwitch;
