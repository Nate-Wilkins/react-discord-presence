import { formatDistance } from 'date-fns';

// https://stackoverflow.com/a/16767434/422312
const getElapsedTime = (d1: Date, d2: Date) => {
  let difference = d1.getTime() - d2.getTime();

  const days = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(difference / 1000 / 60 / 60);
  difference -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(difference / 1000 / 60);
  difference -= minutes * 1000 * 60;
  const seconds = Math.floor(difference / 1000);

  return { days, hours, minutes, seconds };
};

/*
 * Get the elapsed time format for the provided duration in milliseconds.
 */
export const getElapsedTimeFormat = (
  d1: Date,
  d2: Date,
  type?: 'clock' | 'stopwatch' | 'human',
) => {
  if (type === 'clock') {
    const { days, hours, minutes, seconds } = getElapsedTime(d1, d2);
    return `${days > 0 ? `${String(days).padStart(2, '0')}:` : ''}${
      hours > 0 || days > 0 ? `${String(hours).padStart(2, '0')}:` : ''
    }${
      minutes > 0 || hours > 0 || days > 0
        ? `${String(minutes).padStart(2, '0')}:`
        : ''
    }${String(seconds).padStart(2, '0')}`;
  } else if (type === 'stopwatch') {
    const { days, hours, minutes, seconds } = getElapsedTime(d1, d2);
    return `${days > 0 ? `${String(days)}:` : ''}${
      hours > 0 || days > 0
        ? `${String(hours).padStart(days <= 0 ? 1 : 2, '0')}:`
        : ''
    }${`${String(minutes).padStart(
      hours <= 0 && days <= 0 ? 1 : 2,
      '0',
    )}:`}${String(seconds).padStart(2, '0')}`;
  } else {
    const formattedDistance = formatDistance(d1, d2);
    if (formattedDistance.length <= 1) return formattedDistance;
    return formattedDistance[0].toUpperCase() + formattedDistance.substring(1);
  }
};
