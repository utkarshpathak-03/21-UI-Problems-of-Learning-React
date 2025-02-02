import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
const CountDown = () => {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isEnabled, setEnabled] = useState(false);
  const [emptyValidation, setEmptyValidation] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (isEnabled) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 500);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (seconds === 0 && minutes === 0 && hour === 0) {
      clearInterval(timerRef.current);
    } else if (seconds === 0 && minutes === 0) {
      setSeconds(59);
      setMinutes(59);
      setHour((prev) => prev - 1);
    } else if (seconds === 0) {
      setSeconds(59);
      setMinutes((prev) => prev - 1);
    }
  });

  const handleinputEvent = (event) => {
    if (event.target.name === "hour" && event.target.value.length < 3) {
      setHour(event.target.value);
    }
    if (event.target.name === "minutes" && event.target.value.length < 3) {
      setMinutes(event.target.value);
    }
    if (event.target.name === "seconds" && event.target.value.length < 3) {
      setSeconds(event.target.value);
    }
  };
  const mouseLeave = (e) => {
    console.log("hey");
    if (e.target.name === "hour" && e.target.value.length === 1) {
      setHour("0" + e.target.value);
    }
    if (e.target.name === "minutes" && e.target.value.length === 1) {
      setMinutes("0" + e.target.value);
    }
    if (e.target.name === "seconds" && e.target.value.length === 1) {
      setSeconds("0" + e.target.value);
    }
  };

  const startButtonClick = () => {
    if (hour !== "" && minutes !== "" && seconds !== "") {
      setEmptyValidation(false);
      setEnabled(true);
    } else {
      setEmptyValidation(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setEnabled(false);
    setHour("");
    setMinutes("");
    setSeconds("");
  };
  const pauseTimer = () => {
    clearInterval(timerRef.current);
  };

  return (
    <div className="RootContainer">
      <h2>CountDown Begins!</h2>
      <div className="container">
        {isEnabled ? (
          <div className="countDownTimer">
            {`${hour > 9 ? hour : `0${Number(hour)}`} : 
          ${minutes > 9 ? minutes : `0${Number(minutes)}`} : 
          ${seconds > 9 ? seconds : `0${Number(seconds)}`}`}
          </div>
        ) : (
          <div className="countDownInput">
            <input
              type="number"
              placeholder="HH"
              aria-label="Hour"
              value={hour}
              onChange={handleinputEvent}
              onBlur={mouseLeave}
              name="hour"
              step={1}
              max={99}
              min={1}
            />{" "}
            :{" "}
            <input
              type="number"
              placeholder="MM"
              aria-label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              onBlur={mouseLeave}
              name="minutes"
              step={1}
              max={60}
              min={1}
            />{" "}
            :{" "}
            <input
              type="number"
              placeholder="SS"
              aria-label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              onBlur={mouseLeave}
              name="seconds"
              step={1}
              max={60}
              min={1}
            />
          </div>
        )}

        <div className="buttonContainer">
          {!isEnabled ? (
            <button onClick={startButtonClick}>Start</button>
          ) : (
            <>
              <button onClick={pauseTimer}>Pause</button>
              <button onClick={resetTimer}>Reset</button>
            </>
          )}
        </div>
        <br />
        {emptyValidation && (
          <div className="error"> Fields can't be empty !</div>
        )}
      </div>
    </div>
  );
};

export default CountDown;
