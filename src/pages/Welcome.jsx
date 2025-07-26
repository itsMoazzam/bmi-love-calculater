import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Stack, Title, MantineProvider } from "@mantine/core";
import "../assets/css/welcome.css";

const sentence = "Welcome to the world of calculation";

const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#9D4EDD",
    "#FF9F1C"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Welcome = () => {
  const [visibleChars, setVisibleChars] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleChars((prev) => [
        ...prev,
        { char: sentence[index], color: getRandomColor() }
      ]);
      index++;
      if (index >= sentence.length) {
        clearInterval(interval);
        setTimeout(() => setShowButtons(true), 1000);
      }
    }, 8000 / sentence.length);
    return () => clearInterval(interval);
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="welcome-wrapper">
        <div className="animated-bg" />
        <div className="zigzag-lines" />
        <div className="curved-line" />

        <Center className="content-center">
          {!showButtons ? (
            <Title order={2} className="animated-text">
              {visibleChars.map((item, index) => (
                <span key={index} style={{ color: item.color }}>
                  {item.char === " " ? "\u00A0" : item.char}
                </span>
              ))}
            </Title>
          ) : (
            <Stack align="center" spacing="md">
              <Button color="grape" size="lg" onClick={() => navigate("/love")}>
                ❤️ Love Calculator
              </Button>
              {`  `}
              <Button color="indigo" size="lg" onClick={() => navigate("/bmi")}>
                ⚖️ BMI Calculator
              </Button>
            </Stack>
          )}
        </Center>
      </div>
    </MantineProvider>
  );
};

export default Welcome;
