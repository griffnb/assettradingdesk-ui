import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  target: Date;
}

export const getNextInterval = (intervalAmount: number, now?: Date): Date => {
  if (!now) {
    now = new Date();
  }

  const minutes = now.getMinutes();

  // Calculate the next 15-minute interval
  let nextInterval = Math.ceil(minutes / intervalAmount) * intervalAmount;
  if (nextInterval == 0) {
    nextInterval = intervalAmount;
  }

  if (minutes % intervalAmount == 0) {
    nextInterval = minutes + intervalAmount;
  }

  // Set the minutes and seconds, adjusting the hour if needed
  if (nextInterval >= 60) {
    now.setHours(now.getHours() + 1, 0, 0, 0); // Move to the top of the next hour
  } else {
    now.setMinutes(nextInterval, 0, 0); // Set to the next 15-minute interval within the current hour
  }

  return now;
};

const calculateTimeLeft = (
  targetDate: string | Date,
  jitInterval: number,
): TimeLeft => {
  const now = new Date();
  let target = new Date(targetDate);
  let difference = target.getTime() - now.getTime(); // Difference in milliseconds

  // If the target time is in the past, reset to the next 30-minute interval
  if (difference <= 0) {
    target = getNextInterval(jitInterval);
    difference = target.getTime() - now.getTime();
  }

  // Calculate days, hours, minutes, and seconds accurately
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, target };
};

// Custom hook to handle countdown logic
const useCountdown = (
  targetDate: string | Date,
  jitInterval = 15,
): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate, jitInterval),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetDate, jitInterval);
      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;

/* interval tester
export const getNextInterval = (intervalAmount:number,now:Date): Date => {
  
  const minutes = now.getMinutes();

  // Calculate the next 15-minute interval
  let nextInterval = (Math.ceil(minutes / intervalAmount)) * intervalAmount;
  if(nextInterval == 0 ){
    nextInterval = intervalAmount
  }

  if(minutes%intervalAmount == 0){
    nextInterval = minutes+intervalAmount
  }
  
  // Set the minutes and seconds, adjusting the hour if needed
  if (nextInterval >=60) {
    now.setHours(now.getHours() + 1, 0, 0, 0); // Move to the top of the next hour
  } else {
    now.setMinutes(nextInterval, 0, 0); // Set to the next 15-minute interval within the current hour
  }

  return now;
};

  const currentHour = new Date();
currentHour.setSeconds(0, 0); // Reset seconds and milliseconds

const dates = [];
for (let i = 0; i < 60; i++) {
  const minuteDate = new Date(currentHour);
  minuteDate.setMinutes(i);
  dates.push(minuteDate);
}

dates.forEach((date)=>{
  const nowDate = new Date(date)
  const interval = getNextInterval(30,date)
  console.log(`${nowDate.getHours()}:${nowDate.getMinutes()} | ${interval.getHours()}:${interval.getMinutes()}`)
})
*/
