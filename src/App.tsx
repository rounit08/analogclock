import { useState, useEffect } from "react";
import "./App.css";
interface ElemntProps {
  type: string;
  angle: number;
}

const Mark: React.FC<ElemntProps> = ({ type, angle }) => {
  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={`clock__face-mark clock__face-mark--${type} `}
    >
      <div
        style={{
          width: "5px",
          height: type === "hour" ? "28px" : "10px",
          background: type === "hour" ? "yellow" : "white",
        }}
      ></div>
    </div>
  );
};

const Hand: React.FC<ElemntProps> = ({ type, angle }) => {
  return (
    <div className="clock__hand" style={{ transform: `rotate(${angle}deg)` }}>
      <div className={`clock__hand-body clock__hand-body--${type}`} />
    </div>
  );
};

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderFaceMarks = () => {
    const marks = [];
    for (let i = 0; i <= 60; i++) {
      marks.push(
        <Mark angle={i * 6} type={i % 5 === 0 ? "hour" : "minutes"} />
      );
    }
    return marks;
  };
  return (
    <div className="container">
      <div className="clock">
        <div className="clock__face">
          <div className="clock__face-mark">{renderFaceMarks()}</div>
          <Hand type="hour" angle={30 * currentTime?.getHours()} />
          <Hand type="minute" angle={6 * currentTime?.getMinutes()} />
          <Hand type="second" angle={6 * currentTime?.getSeconds()} />
        </div>
      </div>
    </div>
  );
};

export default App;
