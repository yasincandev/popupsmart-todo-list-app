import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = ({ theme }) => {
  return (
    <div className="loading-screen" id={theme}>
      {theme === "light" ? (
        <ReactLoading type="balls" color="#201f1f4b" height={100} width={50} />
      ) : (
        <ReactLoading type="balls" color="#fff" height={100} width={50} />
      )}
    </div>
  );
};

export default Loading;
