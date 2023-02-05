import React, { FunctionComponent, useEffect, useState } from 'react';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

/*
 * Discord presence activity duration.
 */
export const DiscordPresenceActivityDuration: FunctionComponent<{
  start: number;
  end?: number | null;
}> = ({ start, end }) => {
  const [now, setNow] = useState(end ? end : Date.now());

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

  return <p>{getElapsedTimeFormat(new Date(now), new Date(start))}</p>;
};
