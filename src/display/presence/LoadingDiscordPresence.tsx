import { CSSProperties, default as React, FunctionComponent } from 'react';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordPresenceBox } from './DiscordPresenceBox';
import { getTheme } from './get_theme';

/*
 * Render loading state for Discord presence.
 */
export const LoadingDiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  theme: { primary: string; accent: string };
}> = ({ classes, style, theme: inputTheme }) => {
  // Setup theme.
  const theme = getTheme(inputTheme);

  return (
    <DiscordPresenceBox
      classes={classes}
      styleRoot={{
        ...style,
        color: theme.root.color,
        background: createLinearGradientVertical(
          theme.root.backgroundColor.primary.hsl().string(),
          0.5,
          theme.root.backgroundColor.accent.hsl().string(),
        ),
      }}
      styleContent={{
        background: createLinearGradientVertical(
          theme.content.backgroundColor.primary.hsl().string(),
          0.5,
          theme.content.backgroundColor.accent.hsl().string(),
        ),
      }}
    >
      <div
        className={`${classes.loading} ${
          theme.primary.isDark() ? classes.loadingWhite : classes.loadingBlack
        }`}
        data-testid="progress"
      />
    </DiscordPresenceBox>
  );
};
