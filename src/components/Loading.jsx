import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <h2>Loading Your App</h2>
      <ReactLoading type="balls" color="#201f1f4b" height={100} width={50} />
    </div>
  );
};

export default Loading;
