import React, { useEffect } from "react";
import "./Mensajes.css";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const Mensajes = ({ mensaje, isRecievedMessage }) => {
  useEffect(() => { }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "no_recibido":
        return <BsCheck className="status-icon" />;
      case "recibido":
        return <BsCheckAll className="status-icon status-icon-gray" />;
      case "visto":
        return <BsCheckAll className="status-icon status-icon-blue" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "00:00";

    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="messages-container">
      <div
        className="content"
        style={{ justifyContent: isRecievedMessage ? "flex-end" : "flex-start" }}
      >
        <div
          className="mensaje"
          style={{ backgroundColor: isRecievedMessage ? "#D9FDD3" : "#FFFFFF" }}
        >
          <p className="texto">{mensaje?.content || "Sin contenido"}</p>
          <div className="content-lower">
            <span className="timeSince">
              {formatTime(mensaje?.created_at)}
            </span>
            {renderStatusIcon(mensaje?.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
