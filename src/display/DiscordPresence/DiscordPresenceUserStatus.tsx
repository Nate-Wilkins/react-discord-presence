import React, { CSSProperties, FunctionComponent } from 'react';
import { useTheme } from './ThemeDiscordPresence';

const UserStatusOffline: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
}> = ({ classes, style }) => {
  return (
    <div data-status="offline" className={classes.statusBorder} style={style}>
      <div
        className={classes.status}
        style={{ backgroundColor: 'rgb(116 127 141)' }}
      />
    </div>
  );
};

/*
 * Discord presence user status to show the status of the user.
 *
 * Whether they're online/offline and what device they're using.
 */
export const DiscordPresenceUserStatus: FunctionComponent<{
  data: {
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_web: boolean;
    discord_status: string;
  };
}> = ({
  data: {
    active_on_discord_web,
    active_on_discord_desktop,
    active_on_discord_mobile,
    discord_status: inputStatus,
  },
}) => {
  const { classes, theme } = useTheme();
  const style = {
    backgroundColor: theme.namePlate.backgroundColor.primary,
  };

  let status: 'online' | 'idle' | 'dnd' | 'offline';
  if (
    inputStatus == 'online' ||
    inputStatus == 'idle' ||
    inputStatus == 'dnd' ||
    inputStatus == 'offline'
  ) {
    status = inputStatus;
  } else {
    // Should never happen.
    throw new Error(
      "'discord_status' must be 'online', 'idle', 'dnd', or 'offline'.",
    );
  }

  // Offline.
  if (status === 'offline') {
    return <UserStatusOffline classes={classes} style={style} />;
  }

  // Do Not Disturb.
  if (status === 'dnd') {
    return (
      <div data-status={`dnd`} className={classes.statusBorder} style={style}>
        <svg
          className={classes.status}
          style={{ stroke: '#ed4244', fill: '#ed4244' }}
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
        </svg>
      </div>
    );
  }

  // Idle.
  if (status === 'idle') {
    return (
      <div data-status="idle" className={classes.statusBorder} style={style}>
        <svg
          style={{ fill: '#faa61a' }}
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="discordStatusAwayMask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <circle cx="0" cy="0" r="14" fill="black" />
          </mask>

          <circle
            cx="12"
            cy="12"
            r="10"
            fill="currentFill"
            mask="url(#discordStatusAwayMask)"
          />
        </svg>
      </div>
    );
  }

  // Desktop || Web.
  if (active_on_discord_desktop || active_on_discord_web) {
    return (
      <div
        data-status={`online-${active_on_discord_desktop ? 'desktop' : 'web'}`}
        className={classes.statusBorder}
        style={style}
      >
        <div
          className={classes.status}
          style={{ backgroundColor: '#3ba55c' }}
        />
      </div>
    );
  }

  // Mobile.
  if (active_on_discord_mobile) {
    return (
      <div
        data-status={`online-mobile`}
        className={classes.statusBorder}
        style={style}
      >
        {/* Material UI - Icon - PhoneAndroid */}
        <svg
          className={`${classes.status} ${classes.statusMobile}`}
          style={{ stroke: '#3ba55c', fill: '#3ba55c' }}
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"></path>
        </svg>
      </div>
    );
  }

  // Undefined - Offline.
  return <UserStatusOffline classes={classes} style={style} />;
};
