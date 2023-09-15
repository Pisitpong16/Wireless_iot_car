import React, { useState } from "react";
import "./CameraComponent.css";

function CameraComponent() {
  const [socket, setSocket] = useState(null);
  const [cameraName, setCameraName] = useState("");
  const [cmdMode, setCmdMode] = useState("");
  const [cmdText, setCmdText] = useState("");
  const [imageData, setImageData] = useState("");

  const blobToBase64 = async (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const sendCommand = () => {
    const mode = parseInt(cmdMode);
    const text = cmdText;
    socket.send(String.fromCharCode(mode) + text);
  };

  const connectCamera = () => {
    if (socket !== null) {
      socket.close();
      setImageData("");
    }
    const newSocket = new WebSocket(
      `ws://localhost:3000/controller/${cameraName}`
    );
    newSocket.addEventListener("message", async (e) => {
      const dataURL = await blobToBase64(e.data);
      setImageData(dataURL);
    });
    setSocket(newSocket);
  };

  return (
    <div className="camera-container">
      <div>
        <div>Camera Name</div>
        <input
          type="text"
          value={cameraName}
          onChange={(e) => setCameraName(e.target.value)}
        />
        <button onClick={connectCamera}>Connect Camera</button>
      </div>
      <div>
        <div>Command Mode</div>
        <input
          type="number"
          value={cmdMode}
          onChange={(e) => setCmdMode(e.target.value)}
        />
      </div>
      <div>
        <div>Command Text</div>
        <input
          type="text"
          value={cmdText}
          onChange={(e) => setCmdText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={sendCommand}>Send Command</button>
      </div>
    </div>
  );
}

export default CameraComponent;
