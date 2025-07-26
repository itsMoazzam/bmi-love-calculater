import React from "react";
import BMIApp from "./pages/BMIAPP";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import "./App.css";
import LoveCalculator from "./pages/LoveCalcuater";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/bmi" element={<BMIApp />} />
          <Route path="/love" element={<LoveCalculator />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
