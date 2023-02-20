import { default as React, FunctionComponent, ReactNode } from 'react';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Discord presence badge showcase container for badges.
 */
export const DiscordPresenceBadgeShowcase: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const { classes, theme } = useTheme();

  return (
    <div
      className={classes.badges}
      style={{
        backgroundColor: theme.namePlate.backgroundColor.primary,
      }}
    >
      {children}
    </div>
  );
};
