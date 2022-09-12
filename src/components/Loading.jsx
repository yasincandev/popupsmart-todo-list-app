import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = ({ theme, isLight }) => {
  return (
    <div className="loading-screen" id={theme}>
      <ReactLoading type="balls" color="white" height={100} width={50} />
    </div>
  );
};

export default Loading;
