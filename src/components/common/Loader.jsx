import React from "react";
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="flex parentDiv justify-center bg-gray-900 bg-opacity-70 w-full absolute items-center min-h-[100vh] inset-0 z-10">
      <div className="w-full h-full bg-white bg-opacity-40 blur-sm absolute"></div>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
