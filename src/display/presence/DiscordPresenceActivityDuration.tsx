import React, { FunctionComponent, useEffect, useState } from 'react';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

/*
 * Discord presence activity duration.
 */
export const DiscordPresenceActivityDuration: FunctionComponent<{
  start: number;
  end?: number | null;
  format?: (d1: Date, d2: Date) => string;
}> = ({ start, end, format: inputFormat }) => {
  const [now, setNow] = useState(end ? end : Date.now());
  const format = inputFormat ? inputFormat : getElapsedTimeFormat;

  // Setup timer for activity duration that hasn't ended.
  useEffect(() => {
    if (end !== null) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [start, end]);

  return <p>{format(new Date(now), new Date(start))}</p>;
};
