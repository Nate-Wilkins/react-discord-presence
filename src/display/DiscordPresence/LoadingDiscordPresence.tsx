import { default as React, FunctionComponent } from 'react';
import { DiscordPresenceLayout } from './DiscordPresenceLayout';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Render loading state for Discord presence.
 */
export const LoadingDiscordPresence: FunctionComponent = () => {
  const { classes, theme } = useTheme();

  return (
    <DiscordPresenceLayout>
      <div
        className={`${classes.loading} ${
          theme.primary.isDark() ? classes.loadingWhite : classes.loadingBlack
        }`}
        data-testid="progress"
      />
    </DiscordPresenceLayout>
  );
};
