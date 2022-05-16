import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import formatTimeInput from '../utils/timeUtils';
import { Time } from '../utils/timeUtils'

interface Props {
  getTime: (time: Time) => void
}

const TimeManager: React.FC<Props> = (props) => {
  const defTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  const [timeLimit, setTimeLimit] = useState('');
  const [time, setTime] = useState(defTime);

  return (
    <div>
      <h3>Enter time limit:</h3>
      <TextField 
        name="vanityName" 
        type="text"
        placeholder="hh:mm:ss" 
        onChange={e => setTimeLimit(e.target.value)}
        id="outlined-basic" 
        variant="outlined"
      />
      <div style={{marginTop: "10px", marginBottom: "10px" }}>
        <Button variant="outlined" onClick={() => props.getTime(formatTimeInput(timeLimit))}>Set Time</Button>
      </div>
    </div>
  )
}

export default TimeManager;