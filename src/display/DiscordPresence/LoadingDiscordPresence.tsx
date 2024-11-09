import { default as React, FunctionComponent } from 'react';
import cn from 'classnames';
import { DiscordPresenceClassesDefault } from '../style';
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
        className={`${cn(
          DiscordPresenceClassesDefault.loading,
          classes?.loading,
        )} ${
          theme.primary.isDark()
            ? cn(
                DiscordPresenceClassesDefault.loadingWhite,
                classes?.loadingWhite,
              )
            : cn(
                DiscordPresenceClassesDefault.loadingBlack,
                classes?.loadingBlack,
              )
        }`}
        data-testid="progress"
      />
    </DiscordPresenceLayout>
  );
};
