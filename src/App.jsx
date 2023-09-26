import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CameraComponent from "./component/CameraComponent/CameraComponent";
import DirectionControl from "./component/DirectionControl/DirectionalControl";
import MyComponent from "./component/TemperatureChart/TemperatureChart";
import SimpleCharts from "./component/TemperatureChart/TemperatureChart";

function App() {
  return (
    <div>
      <CameraComponent />

      <SimpleCharts />
    </div>
  );
}

export default App;
