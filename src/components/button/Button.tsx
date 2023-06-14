import React from "react";

const Button = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      className={["filterButton", isActive ? "active" : ""].join(" ")}
      onClick={onClick}
    >
      {text && <span className="text">{text}</span>}
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
