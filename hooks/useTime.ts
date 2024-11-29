// hooks/useTime.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTime(setCurrentTime: (time: number) => void) {
  const [time, setTime] = useState('');

  const changeTime = (stamp: number) => {
    const date = new Date(stamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  const getHour = (stamp: number) => {
    const date = new Date(stamp * 1000);
    return date.getHours();
  };

  const getTime = async () => {
    try {
      const response = await axios.get('https://api.keybit.ir/time/');
      const timestamp = response.data.timestamp.en;
      setTime(changeTime(timestamp));
      setCurrentTime(getHour(timestamp));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return { time };
}
