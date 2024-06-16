import React from "react";

const Notification = ({ notification }) => {
  const NotificationStyle = {
    color: "red",
    border: "3px solid black",
    fontSize: "20px",
    padding: "10px",
  };

  if (notification === null) {
    return null;
  } else {
    return <div style={NotificationStyle}>{notification}</div>;
  }
};

export default Notification;
