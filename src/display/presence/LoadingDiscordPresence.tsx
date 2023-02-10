import { CSSProperties, default as React, FunctionComponent } from 'react';
import Color from 'color';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordPresenceBox } from './DiscordPresenceBox';

/*
 * Render loading state for Discord presence.
 */
export const LoadingDiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  theme: { primary: string; accent: string };
}> = ({ classes, style, theme }) => {
  // Setup theming colors.
  const rootColorPrimary = Color(theme.primary);
  const rootColorAccent = Color(theme.accent);
  // TODO: Light theme testing.
  const contentPrimaryColor = !rootColorPrimary.isDark()
    ? rootColorPrimary.lighten(0.6)
    : rootColorPrimary.darken(0.6);
  const contentAccentColor = !rootColorAccent.isDark()
    ? rootColorAccent.lighten(0.4)
    : rootColorAccent.darken(0.4);

  return (
    <DiscordPresenceBox
      classes={classes}
      styleRoot={{
        ...style,
        background: createLinearGradientVertical(
          rootColorPrimary.hsl().string(),
          0.65,
          rootColorAccent.hsl().string(),
        ),
      }}
      styleContent={{
        background: createLinearGradientVertical(
          contentPrimaryColor.hsl().string(),
          0.65,
          contentAccentColor.hsl().string(),
        ),
      }}
    >
      <div className={classes.loading} data-testid="progress" />
    </DiscordPresenceBox>
  );
};
