import { default as React, FunctionComponent, ReactNode } from 'react';
import cn from 'classnames';
import { DiscordPresenceClassesDefault } from '../style';
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
      className={cn(DiscordPresenceClassesDefault.badges, classes?.badges)}
      style={{
        backgroundColor: theme.namePlate.backgroundColor.primary,
      }}
    >
      {children}
    </div>
  );
};
