import React, { useEffect } from "react";
import "./DirectionalControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const DirectionControl = ({ sendCommand, socket }) => {
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

  useEffect(() => {
    const handleArrowKeyPress = (event) => {
      switch (event.key) {
        case "w":
          handleArrowUp();
          break;
        case "s":
          handleArrowDown();
          break;
        case "a":
          handleArrowLeft();
          break;
        case "d":
          handleArrowRight();
          break;
        default:
          break;
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleArrowKeyPress);

    // Clean up the event listener on unmount
    return () => {
      console.log("weofpk");
      document.removeEventListener("keydown", handleArrowKeyPress);
    };
  }, []);

  return (
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
  );
};

export default DirectionControl;
