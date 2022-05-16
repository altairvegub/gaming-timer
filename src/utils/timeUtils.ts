export interface Time {
  hours: number,
  minutes: number,
  seconds: number
}

export const formatTimeInput = (timeInput: string) => {
  const onlyNum = timeInput.replace(/\D/g, '');
  let numTime = parseInt(onlyNum);

  const time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  time.seconds = numTime % 100;
  if(time.seconds >= 60) {
    time.seconds -= 60;
    time.minutes += 1;
  }
  
  numTime = Math.floor(numTime / 100);

  time.minutes += numTime % 100;
  if(time.minutes >= 60) {
    time.minutes -= 60;
    time.hours += 1;
  }
  numTime = Math.floor(numTime / 100);

  time.hours += numTime % 100;
  return time;
}

export const fmtTimeToSeconds = (time: Time) => {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

export const secondsToFmtTime = (seconds: number) => {
  const time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  time.hours = Math.floor(seconds / 3600);
  seconds = Math.floor(seconds % 3600);
  console.log(seconds);

  time.minutes =  Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  time.seconds = seconds;
}

export default formatTimeInput;