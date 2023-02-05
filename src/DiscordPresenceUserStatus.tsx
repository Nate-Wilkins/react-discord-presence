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
      <div className={classes.statusBorder} style={style}>
        <div
          className={classes.status}
          style={{ backgroundColor: '#3ba55c' }}
        />
      </div>
    );
  }

  // Mobile.
  if (active_on_discord_mobile) {
    // TODO: This should look like a mobile icon.
    return (
      <div className={classes.statusBorder} style={style}>
        <div
          className={classes.status}
          style={{ backgroundColor: '#3ba55c' }}
        />
      </div>
    );
  }

  // Offline.
  return (
    <div className={classes.statusBorder} style={style}>
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
