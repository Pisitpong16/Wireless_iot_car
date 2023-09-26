import React, { useState } from "react";
import "./CameraComponent.css";
import DirectionControl from "../DirectionControl/DirectionalControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function CameraComponent() {
  const [socket, setSocket] = useState(null);
  const [cameraName, setCameraName] = useState("");
  const [cmdMode, setCmdMode] = useState("");
  const [cmdText, setCmdText] = useState("");
  const [imageData, setImageData] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const blobToBase64 = async (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const sendCommand = (mode, text) => {
    console.log(mode + " " + text);
    socket.send(String.fromCharCode(mode) + text);
  };

  const connectCamera = () => {
    if (socket !== null) {
      socket.close();
      setImageData("");
    }
    const newSocket = new WebSocket(
      `ws://192.168.33.152:3000/controller/${cameraName}`
    );
    newSocket.addEventListener("message", async (e) => {
      const dataURL = await blobToBase64(e.data);
      setImageData(dataURL);
    });
    setSocket(newSocket);
  };

  const handleButtonClick = (mode, text) => {
    setCmdMode(mode);
    setCmdText(text);
    console.log(text, cmdText);
    sendCommand(mode, text);
  };

  const handleSliderChange = (event, newValue) => {
    console.log(newValue);
    setSliderValue(newValue);
    sendCommand(1, newValue.toString());
  };

  return (
    <div className="camera-container">
      <img src={imageData} alt="Stream" height="500px" />
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
        <DirectionControl sendCommand={sendCommand} socket={socket} />
      </div>
      <div className="slider-container">
        <Typography variant="h6" gutterBottom>
          Light
        </Typography>
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={200}
          step={1}
          valueLabelDisplay="auto"
          aria-label="slider"
        />
        <Typography variant="body2" color="textSecondary" align="center">
          Light: {sliderValue}
        </Typography>
      </div>
    </div>
  );
}

export default CameraComponent;
