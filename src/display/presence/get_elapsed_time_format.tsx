import { formatDistance } from 'date-fns';

/*
 * Get the elapsed time format for the provided duration in milliseconds.
 *
 * Format:
 *   {hh:}{mm:}ss
 *
 * https://stackoverflow.com/a/16767434/422312
 */
export const getElapsedTimeFormat = (
  date1: Date,
  date2: Date,
  type?: 'clock' | 'human',
) => {
  if (type === 'clock') {
    let difference = date1.getTime() - date2.getTime();

    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(difference / 1000 / 60 / 60);
    difference -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(difference / 1000 / 60);
    difference -= minutes * 1000 * 60;
    const seconds = Math.floor(difference / 1000);

    return `${days > 0 ? `${String(days).padStart(2, '0')}:` : ''}${
      hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''
    }${minutes > 0 ? `${String(minutes).padStart(2, '0')}:` : ''}${String(
      seconds,
    ).padStart(2, '0')}`;
  } else {
    const formattedDistance = formatDistance(date1, date2);
    if (formattedDistance.length <= 1) return formattedDistance;
    return formattedDistance[0].toUpperCase() + formattedDistance.substring(1);
  }
};
