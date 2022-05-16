import './Timer.css';
import '../App.css';
import {useState, useEffect} from 'react';
import { Time } from '../utils/timeUtils'

interface Props {
  time: Time
}

const Timer: React.FC<Props> = (props) => {
  const [hours, setHours] = useState(props.time.hours);
  const [minutes, setMinutes] = useState(props.time.minutes);
  const [seconds, setSeconds] = useState(props.time.seconds);

  const updateTimeLeft = () => {
    if(seconds > 0) {
      setSeconds(seconds - 1);
    } else if (seconds === 0) {
      if(minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      }
    }
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    if(hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timeInterval);
    }

    return () => clearInterval(timeInterval);
  });

  return (
    <div className="Timer">
        <span className="Digit">{hours < 10 ? '0' + hours : hours}</span>
        <span className="Label">h</span>
        <span className="Digit">{minutes < 10 ? '0' + minutes : minutes}</span>
        <span className="Label">m</span>
        <span className="Digit">{seconds < 10 ? '0' + seconds : seconds}</span>
        <span className="Label">s</span>
    </div>
  )
}

export default Timer;