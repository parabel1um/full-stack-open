import React from "react";

const Notification = ({ notification, type }) => {
  const GeneralMessageStyle = {
    color: "green",
    border: "3px solid black",
    fontSize: "20px",
    padding: "10px",
  };

  const ErrorMessageStyle = {
    color: "red",
    border: "3px solid black",
    fontSize: "20px",
    padding: "10px",
  };

  if (notification === null) {
    return null;
  } else {
    return (
      <div style={type === "message" ? GeneralMessageStyle : ErrorMessageStyle}>
        {notification}
      </div>
    );
  }
};

export default Notification;
