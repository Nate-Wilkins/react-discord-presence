import React, { FunctionComponent, useEffect, useState } from 'react';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

/*
 * Discord presence activity duration.
 */
export const DiscordPresenceActivityDuration: FunctionComponent<{
  start: number;
  end: number | null;
}> = ({ start, end }) => {
  const [now, setNow] = useState(end ? new Date(end) : new Date());

  // Setup timer for activity duration that hasn't ended.
  useEffect(() => {
    if (end !== null) return;

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  return <p>{getElapsedTimeFormat(now, new Date(start))}</p>;
};
