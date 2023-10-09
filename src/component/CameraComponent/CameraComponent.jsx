import React, { useState } from "react";
import "./CameraComponent.css";
import DirectionControl from "../DirectionControl/DirectionalControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
function CameraComponent() {
  const [socket, setSocket] = useState(null);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [cameraName, setCameraName] = useState("");
  const [cmdMode, setCmdMode] = useState("");
  const [cmdText, setCmdText] = useState("");
  const [imageData, setImageData] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const handleArrowUp = () => {
    sendCommand(2, "F");
  };

  const handleArrowDown = () => {
    sendCommand(2, "B");
  };

  const handleArrowLeft = () => {
    sendCommand(2, "L");
  };

  const handleArrowRight = () => {
    sendCommand(2, "R");
  };

  const handleArrowKeyPress = (event) => {
    switch (event.key) {
      case "W":
        handleArrowUp();
        break;
      case "S":
        handleArrowDown();
        break;
      case "A":
        handleArrowLeft();
        break;
      case "D":
        handleArrowRight();
        break;
      default:
        break;
    }
  };
  const handleKeyUp = (event) => {
    sendCommand(2, "X");
  };

  // Attach the event listener
  document.addEventListener("keydown", handleArrowKeyPress);
  //document.addEventListener("keyup", handleKeyUp);

  // Clean up the event listener on unmount
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
    const newSocket = new WebSocket(`ws://${ip}:${port}/controller/${cameraName}`);
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
        <div>Host</div>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
        <div>Port</div>
        <input type="text" value={port} onChange={(e) => setPort(e.target.value)} />
        <div>Camera Name</div>
        <input type="text" value={cameraName} onChange={(e) => setCameraName(e.target.value)} />
        <button onClick={connectCamera}>Connect Camera</button>
      </div>
      <div>
        <div className="navigation-component">
          <button className="up" onClick={handleArrowUp}>
            <FontAwesomeIcon icon={faArrowUp} className="icon" />
          </button>
          <div className="button-group">
            <button className="left" onClick={handleArrowLeft}>
              <FontAwesomeIcon icon={faArrowLeft} className="icon" />
            </button>
            <button className="right" onClick={handleArrowRight}>
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </button>
          </div>
          <button className="down" onClick={handleArrowDown}>
            <FontAwesomeIcon icon={faArrowDown} className="icon" />
          </button>
        </div>
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
