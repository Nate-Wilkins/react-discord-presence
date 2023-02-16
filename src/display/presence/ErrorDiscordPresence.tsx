import { CSSProperties, default as React, FunctionComponent } from 'react';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { ErrorImage } from '../image';
import { DiscordPresenceBox } from './DiscordPresenceBox';
import { getTheme } from './get_theme';

/*
 * Render error for Discord presence.
 */
export const ErrorDiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  theme: { primary: string; accent: string };
  error: string | Error;
}> = ({ classes, style, theme: inputTheme, error }) => {
  // Setup theme.
  const theme = getTheme(inputTheme);

  return (
    <DiscordPresenceBox
      classes={classes}
      styleRoot={{
        ...style,
        color: theme.root.color,
        background: createLinearGradientVertical(
          theme.root.backgroundColor.primary,
          0.5,
          theme.root.backgroundColor.accent,
        ),
      }}
      styleContent={{
        background: createLinearGradientVertical(
          theme.content.backgroundColor.primary,
          0.5,
          theme.content.backgroundColor.accent,
        ),
      }}
    >
      <div className={classes.error}>
        <ErrorImage
          style={{ stroke: theme.root.color, fill: theme.root.color }}
        />
        <h3>Sorry, An Error Has Occurred</h3>
        <p>{typeof error === 'string' ? error : error.message}</p>
      </div>
    </DiscordPresenceBox>
  );
};
