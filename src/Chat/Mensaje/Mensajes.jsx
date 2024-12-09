import React, { useEffect } from "react";
import "./Mensajes.css";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const Mensajes = ({ mensaje, isRecievedMessage }) => {
  useEffect(() => { }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'no_recibido':
        return <BsCheck className="status-icon" />;
      case 'recibido':
        return <BsCheckAll className="status-icon status-icon-gray" />;
      case 'visto':
        return <BsCheckAll className="status-icon status-icon-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="messages-container">
      <div className="content" style={{ justifyContent: isRecievedMessage ? "flex-end" : "flex-start" }}>
        <div className="mensaje" style={{ backgroundColor: isRecievedMessage ? "#D9FDD3" : "#FFFFFF" }}>
          <p className="texto">{mensaje?.text || "Sin contenido"}</p>
          <div className="content-lower">
            <span className="timeSince">{mensaje?.hour || "00:00"}</span>
            {renderStatusIcon(mensaje?.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
