import { default as React, FunctionComponent } from 'react';
import { ErrorImage } from '../image';
import { DiscordPresenceLayout } from './DiscordPresenceLayout';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Render error for Discord presence.
 */
export const ErrorDiscordPresence: FunctionComponent<{
  error: string | Error;
}> = ({ error }) => {
  const { classes, theme } = useTheme();

  return (
    <DiscordPresenceLayout>
      <div className={classes.error}>
        <ErrorImage
          style={{ stroke: theme.root.color, fill: theme.root.color }}
        />
        <h3>Sorry, An Error Has Occurred</h3>
        <p>{typeof error === 'string' ? error : error.message}</p>
      </div>
    </DiscordPresenceLayout>
  );
};
