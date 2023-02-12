import {
  CSSProperties,
  default as React,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

/*
 * Spotify song duration.
 */
export const DiscordPresenceSpotifySongDuration: FunctionComponent<{
  classes: Record<string, string>;
  styleProgress?: CSSProperties;
  styleTotal?: CSSProperties;
  start: number;
  end: number;
  format?: (d1: Date, d2: Date) => string;
}> = ({
  classes,
  styleProgress,
  styleTotal,
  start,
  end,
  format: inputFormat,
}) => {
  const [now, setNow] = useState(Date.now());
  const format = inputFormat
    ? inputFormat
    : (d1: Date, d2: Date) => {
        return getElapsedTimeFormat(d1, d2, 'stopwatch');
      };

  // Setup timer for song progression.
  useEffect(() => {
    const interval = setInterval(
      () => {
        setNow(Date.now());
      },
      // Set lower than Spotify's time update so it syncs better.
      500,
    );

    return () => {
      clearInterval(interval);
    };
  }, [start, end]);

  return (
    <div>
      <div className={classes.spotifySongProgressBar} style={styleTotal}>
        <div
          className={classes.spotifySongProgressBarProgress}
          style={{
            ...styleProgress,
            width: `${
              now < end ? ((now - start) / (end - start)) * 100 : 100
            }%`,
          }}
        />
      </div>

      <div className={classes.spotifySongProgressBarDetails}>
        <p>
          {now < end
            ? format(new Date(now), new Date(start))
            : format(new Date(end), new Date(start))}
        </p>
        <p>{format(new Date(end), new Date(start))}</p>
      </div>
    </div>
  );
};
