import {
  default as React,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { DiscordPresenceClassesDefault } from '../style';
import { getElapsedTimeFormat } from './get_elapsed_time_format';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Spotify song duration.
 */
export const DiscordPresenceSpotifySongDuration: FunctionComponent<{
  start: number;
  end: number;
  format?: (d1: Date, d2: Date) => string;
}> = ({ start, end, format: inputFormat }) => {
  const { classes, theme } = useTheme();

  const styleProgress = { backgroundColor: theme.root.color };
  const styleTotal = {
    backgroundColor: theme.spotifyProgressBar.total.backgroundColor,
  };

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
      <div
        className={cn(
          DiscordPresenceClassesDefault.spotifySongProgressBar,
          classes?.spotifySongProgressBar,
        )}
        style={styleTotal}
      >
        <div
          className={cn(
            DiscordPresenceClassesDefault.spotifySongProgressBarProgress,
            classes?.spotifySongProgressBarProgress,
          )}
          style={{
            ...styleProgress,
            width: `${
              now < end ? ((now - start) / (end - start)) * 100 : 100
            }%`,
          }}
        />
      </div>

      <div
        className={cn(
          DiscordPresenceClassesDefault.spotifySongProgressBarDetails,
          classes?.spotifySongProgressBarDetails,
        )}
      >
        <p>
          {now < end
            ? format(new Date(start), new Date(now))
            : format(new Date(start), new Date(end))}
        </p>
        <p>{format(new Date(start), new Date(end))}</p>
      </div>
    </div>
  );
};
