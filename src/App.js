import React, { Fragment, useState, useEffect } from 'react';

function App() {
  const START_DURATION = 10;
  const [START_MINUTES, SET_MINUTE] = useState('00');
  const [START_SECOND, SET_SECOND] = useState('00');
  const [currentMinutes, setCurrentMinutes] = useState(START_MINUTES);
  const [currentSeconds, setCurrentSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));
    setIsRunning(true);
  };
  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setCurrentMinutes('00');
    SET_MINUTE('');
    SET_SECOND('');
    setCurrentSeconds('00');
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);
    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setCurrentMinutes(minutes);
          setCurrentSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Fragment>
      <label>
        <input type="number" onChange={(e) => SET_MINUTE(e.target.value)} />
        Minutes
      </label>
      <label>
        <input type="number" onChange={(e) => SET_SECOND(e.target.value)} />
        Seconds
      </label>

      <button onClick={startHandler}>START</button>
      <button onClick={!isStop ? stopHandler : resumeHandler}>
        PAUSE/RESUME
      </button>
      <button onClick={resetHandler}>RESET</button>
      <h1 data-testid="running-clock">
        {currentMinutes} {':'} {currentSeconds}
      </h1>
    </Fragment>
  );
}

export default App;
