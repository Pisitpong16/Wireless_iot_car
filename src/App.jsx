import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CameraComponent from "./component/CameraComponent/CameraComponent";
import DirectionControl from "./component/DirectionControl/DirectionalControl";

function App() {
  return (
    <div>
      <CameraComponent />
      <DirectionControl />
    </div>
  );
}

export default App;
