import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import BMIChart from "../components/BMICharts";
import "../assets/css/bmi.css"; // Assuming you have a CSS file for styling
const BMIApp = () => {
  const navigate = useNavigate();
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setRecords(saved);
  }, []);

  const convertToMeters = () => {
    if (heightUnit === "cm") {
      return parseFloat(heightCm) / 100;
    } else {
      const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn || 0);
      const heightInCm = totalInches * 2.54;
      return heightInCm / 100;
    }
  };

  const handleCalculate = () => {
    if (
      !weight ||
      (heightUnit === "cm" && !heightCm) ||
      (heightUnit === "ft" && !heightFt)
    )
      return;
    const h = convertToMeters();
    const w = parseFloat(weight);
    const value = w / (h * h);
    const formatted = value.toFixed(2);
    const status = getBMICategory(value);
    const newRecord = {
      id: uuidv4(),
      height:
        heightUnit === "cm"
          ? `${heightCm} cm`
          : `${heightFt} ft ${heightIn || 0} in`,
      weight,
      bmi: formatted,
      category: status,
      date: new Date().toLocaleString()
    };
    const updated = [newRecord, ...records];
    localStorage.setItem("bmiHistory", JSON.stringify(updated));
    setRecords(updated);
    setBmi(formatted);
    setCategory(status);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 24.9) return "Normal";
    else if (bmi < 29.9) return "Overweight";
    else return "Obese";
  };

  const clearHistory = () => {
    localStorage.removeItem("bmiHistory");
    setRecords([]);
    setBmi(null);
    setCategory("");
  };

  const exportCSV = () => {
    const csv = Papa.unparse(records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bmi-history.csv");
  };

  return (
    <main className="container">
      <button onClick={() => navigate("/")} className="back-button">
        🔙 Back
      </button>

      <h1>BMI Calculator</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Unit Selector */}
        <label>
          Select Height Unit:
          <select
            value={heightUnit}
            onChange={(e) => {
              setHeightUnit(e.target.value);
              setHeightCm("");
              setHeightFt("");
              setHeightIn("");
            }}
            style={{ marginLeft: "10px", padding: "0.4rem" }}
          >
            <option value="cm">Centimeters</option>
            <option value="ft">Feet & Inches</option>
          </select>
        </label>

        {/* Conditional Height Inputs */}
        {heightUnit === "cm" ? (
          <label>
            Height (cm):
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
          </label>
        ) : (
          <>
            <label>
              Height (ft):
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
            </label>
            <label>
              Height (in):
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </label>
          </>
        )}

        {/* Weight */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        <button type="submit" onClick={handleCalculate}>
          Calculate BMI
        </button>
      </form>

      {/* Output */}
      {bmi && (
        <article>
          <h3>Your BMI: {bmi}</h3>
          <p>
            Status: <strong>{category}</strong>
          </p>
        </article>
      )}

      {/* History */}
      {records.length > 0 && (
        <>
          <h2>History</h2>
          <button onClick={clearHistory} style={{ marginRight: "10px" }}>
            🗑️ Clear History
          </button>
          <button onClick={exportCSV}>⬇️ Export to CSV</button>

          <BMIChart records={records} />

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Height</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.date}</td>
                  <td>{rec.height}</td>
                  <td>{rec.weight}</td>
                  <td>{rec.bmi}</td>
                  <td>{rec.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default BMIApp;
