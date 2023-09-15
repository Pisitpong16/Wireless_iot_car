import React, { useEffect } from "react";
import "./DirectionalControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const DirectionControl = () => {
  const handleArrowUp = () => {
    console.log("Arrow Up clicked");
    // Add your specific functionality for arrow up
  };

  const handleArrowDown = () => {
    console.log("Arrow Down clicked");
    // Add your specific functionality for arrow down
  };

  const handleArrowLeft = () => {
    console.log("Arrow Left clicked");
    // Add your specific functionality for arrow left
  };

  const handleArrowRight = () => {
    console.log("Arrow Right clicked");
    // Add your specific functionality for arrow right
  };

  useEffect(() => {
    const handleArrowKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleArrowUp();
          break;
        case "ArrowDown":
          handleArrowDown();
          break;
        case "ArrowLeft":
          handleArrowLeft();
          break;
        case "ArrowRight":
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
