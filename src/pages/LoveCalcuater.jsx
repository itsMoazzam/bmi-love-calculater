import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../assets/css/love.css";

const LoveCalculator = () => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loveHistory")) || [];
    setHistory(saved);
  }, []);

  const messages = [
    "A match made in heaven 💫",
    "Strong connection ❤️",
    "Needs a little spark 🔥",
    "Work is needed 🛠️",
    "Time will tell ⏳",
    "Maybe just friends 😅"
  ];

  const getMessage = (percent) => {
    if (percent > 90) return messages[0];
    if (percent > 75) return messages[1];
    if (percent > 50) return messages[2];
    if (percent > 35) return messages[3];
    if (percent > 20) return messages[4];
    return messages[5];
  };

  const handleCalculate = () => {
    if (!yourName || !partnerName) return;

    const percent = Math.floor(Math.random() * 51) + 50; // 50%–100%
    const msg = getMessage(percent);
    setPercentage(percent);
    setMessage(msg);

    const newRecord = {
      id: uuidv4(),
      yourName,
      partnerName,
      percent,
      msg,
      date: new Date().toLocaleString()
    };

    const updated = [newRecord, ...history];
    localStorage.setItem("loveHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const clearHistory = () => {
    localStorage.removeItem("loveHistory");
    setHistory([]);
  };

  return (
    <main className="love-container">
      <button onClick={() => navigate("/")} className="back-btn">
        🔙 Back
      </button>

      <h1>❤️ Love Calculator</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Your Name:
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />
        </label>
        <label>
          Partner's Name:
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleCalculate}>
          💘 Calculate Love
        </button>
      </form>

      {percentage !== null && (
        <article className="result">
          <h3>Love Match: {percentage}%</h3>
          <p>{message}</p>
        </article>
      )}

      {history.length > 0 && (
        <>
          <h2>Past Matches</h2>
          <button onClick={clearHistory} className="clear-btn">
            🗑️ Clear History
          </button>
          <ul className="history">
            {history.map((item) => (
              <li key={item.id}>
                <strong>{item.yourName}</strong> &{" "}
                <strong>{item.partnerName}</strong>:{item.percent}% - {item.msg}{" "}
                ({item.date})
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default LoveCalculator;
