import { CSSProperties, default as React, FunctionComponent } from 'react';
import Color from 'color';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordPresenceBox } from './DiscordPresenceBox';

/*
 * Render error for Discord presence.
 */
export const ErrorDiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  theme: { primary: string; accent: string };
  error: string | Error;
}> = ({ classes, style, theme, error }) => {
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
      <div className={classes.error}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
          <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
        </svg>
        <h3>Sorry, An Error Has Occurred</h3>
        <p>{typeof error === 'string' ? error : error.message}</p>
      </div>
    </DiscordPresenceBox>
  );
};
