import React, { CSSProperties, FunctionComponent } from 'react';

/*
 * Discord presence user status to show the status of the user.
 *
 * Whether they're online/offline and what device they're using.
 */
export const DiscordPresenceUserStatus: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  data: {
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_web: boolean;
  };
}> = ({
  classes,
  style,
  data: {
    active_on_discord_web,
    active_on_discord_desktop,
    active_on_discord_mobile,
  },
}) => {
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

  // Offline.
  return (
    <div data-status="offline" className={classes.statusBorder} style={style}>
      <div
        className={classes.status}
        style={{ backgroundColor: 'rgb(116 127 141)' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% - 0.50em / 2)',
            left: 'calc(50% - 0.50em / 2)',
            display: 'block',
            width: '0.50em',
            height: '0.50em',
            borderRadius: '50%',
            ...style,
          }}
        ></div>
      </div>
    </div>
  );
};
