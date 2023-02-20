import { default as React, FunctionComponent, ReactNode } from 'react';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Render Discord presence layout wrapper.
 *
 * Two different colored boxes that's reused in these states:
 * - Loading.
 * - Error.
 * - Happy.
 */
export const DiscordPresenceLayout: FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => {
  const { classes, theme } = useTheme();

  return (
    <div
      className={classes.layer1}
      style={{
        background: createLinearGradientVertical(
          theme.root.backgroundColor.primary,
          0.5,
          theme.root.backgroundColor.accent,
        ),
      }}
    >
      <div
        className={classes.layer2}
        style={{
          background: createLinearGradientVertical(
            theme.content.backgroundColor.primary,
            0.5,
            theme.content.backgroundColor.accent,
          ),
        }}
      >
        {children}
      </div>
    </div>
  );
};
