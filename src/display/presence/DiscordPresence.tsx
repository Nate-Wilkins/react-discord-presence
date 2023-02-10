import React, { CSSProperties, FunctionComponent, useState } from 'react';
import Color from 'color';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordImageEmoji } from '../image';
import { Text } from '../Text';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceActivityDuration } from './DiscordPresenceActivityDuration';
import { DiscordPresenceBadge } from './DiscordPresenceBadge';
import { DiscordPresenceBox } from './DiscordPresenceBox';
import { DiscordPresenceUserStatus } from './DiscordPresenceUserStatus';
import { getDiscordBadges } from './get_discord_badges';
import { DiscordPresenceData } from './types';

/*
 * Discord presence.
 *
 * Data model is based on the Discord Lanyard presence API.
 */
export const DiscordPresence: FunctionComponent<{
  data: DiscordPresenceData;
  classes: Record<string, string>;
  style?: CSSProperties;

  // Custom Formatters.
  // Mostly used for testing, bc URLs by default point to some Discord assets.
  formatActivityDuration?: (d1: Date, d2: Date) => string;
  formatBannerImageSrc?: (discordUserId: string) => string;
  formatAvatarImageSrc?: (
    discordUser: DiscordPresenceData['discord_user'],
  ) => string;
}> = ({
  data,
  classes,
  style,

  // Custom Formatters.
  formatActivityDuration: inputFormatActivityDuration,
  formatBannerImageSrc: inputFormatBannerSrc,
  formatAvatarImageSrc: inputFormatAvatarImageSrc,
}) => {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState<boolean>(false);

  // Setup formatters.
  const formatActivityDuration = inputFormatActivityDuration;
  const formatBannerImageSrc = inputFormatBannerSrc
    ? inputFormatBannerSrc
    : (discordUserId: string) =>
        `https://dcdn.dstn.to/banners/${discordUserId}`;
  const formatAvatarImageSrc = inputFormatAvatarImageSrc
    ? inputFormatAvatarImageSrc
    : (discordUser: DiscordPresenceData['discord_user']) =>
        `https://cdn.discordapp.com/avatars/${discordUser.id}/${
          discordUser.avatar
        }${!discordUser.avatar.startsWith('a_') ? '.png' : '.gif'}`;

  // Pull out activity status.
  const activityStatus = data.activities.find(
    activity => activity.id === 'custom',
  );

  // Activities w/ activity status.
  const activities = data.activities.filter(
    activity => activity.id !== 'custom',
  );

  // Badges.
  const badges: DiscordBadgeEnum[] = getDiscordBadges(
    data.discord_user.public_flags,
  );

  // Setup theming colors.
  const rootColorPrimary = Color(data.theme.primary);
  const rootColorAccent = Color(data.theme.accent);
  // TODO: Light theme testing.
  const contentPrimaryColor = !rootColorPrimary.isDark()
    ? rootColorPrimary.lighten(0.6)
    : rootColorPrimary.darken(0.6);
  const contentAccentColor = !rootColorAccent.isDark()
    ? rootColorAccent.lighten(0.4)
    : rootColorAccent.darken(0.4);
  const namePlatePrimaryColor = !contentPrimaryColor.isDark()
    ? contentPrimaryColor.lighten(0.4)
    : contentPrimaryColor.darken(0.5);
  const namePlateAccentColor = !contentAccentColor.isDark()
    ? contentAccentColor.lighten(0.4)
    : contentAccentColor.darken(0.5);
  const namePlateNameColor = 'rgba(255, 255, 255, 1)';
  const namePlateNameIdColor = 'rgba(185, 185, 185, 1)';

  // Event Handlers.
  const onAvatarMouseOver = () => {
    setIsHoveringAvatar(true);
  };
  const onAvatarMouseOut = () => {
    setIsHoveringAvatar(false);
  };

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
      <div className={classes.background}>
        {/* Banner */}
        <img
          src={formatBannerImageSrc(data.discord_user.id)}
          width={300}
          height={105}
          className={classes.backgroundImage}
        />

        {/* Avatar */}
        <div className={classes.avatar}>
          <a
            href={`https://discord.com/users/${data.discord_user.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.avatarViewProfileContainer}>
              {/* TODO: Add in avatar decoration? What is this? */}
              <img
                onMouseOver={onAvatarMouseOver}
                onMouseOut={onAvatarMouseOut}
                alt="Discord Avatar"
                src={formatAvatarImageSrc(data.discord_user)}
                style={{ aspectRatio: 'auto 24 /24' }}
                width="24"
                height="24"
                draggable="false"
              />
              <div
                className={classes.avatarViewProfile}
                style={{ opacity: !isHoveringAvatar ? 0 : 1 }}
              >
                View Profile
              </div>
            </div>

            <DiscordPresenceUserStatus
              classes={classes}
              style={{
                backgroundColor: namePlatePrimaryColor.hsl().string(),
              }}
              data={data}
            />
          </a>
        </div>

        {/* Badges */}
        <div
          className={classes.badges}
          style={{
            backgroundColor: namePlatePrimaryColor.hsl().string(),
          }}
        >
          <>
            {badges.map(badge => (
              <DiscordPresenceBadge
                key={badge}
                classes={classes}
                badge={badge}
                stylePopover={{
                  color: namePlateNameIdColor,
                }}
              />
            ))}
            {!data.premiumMemberSince ? null : (
              <>
                {/* Member Since */}
                <DiscordPresenceBadge
                  classes={classes}
                  badge={'PremiumMemberSince'}
                  stylePopover={{
                    color: namePlateNameIdColor,
                  }}
                />
              </>
            )}
          </>
        </div>
      </div>

      {/* Name + ID */}
      <div
        className={classes.namePlate}
        style={{
          background: createLinearGradientVertical(
            namePlatePrimaryColor.hsl().string(),
            0.7,
            namePlateAccentColor.hsl().string(),
          ),
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className={classes.namePlateHeader}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 'inherit',
                color: namePlateNameColor,
              }}
            >
              {data.discord_user.username}
            </h1>
            <h2
              style={{
                fontSize: 'inherit',
                color: namePlateNameIdColor,
              }}
            >
              #{data.discord_user.discriminator}
            </h2>
          </div>
        </div>

        {/* Current Status */}
        {activityStatus ? (
          <div>
            <p style={{ display: 'inline-flex' }}>
              {activityStatus.emoji &&
              activityStatus.emoji.id &&
              typeof activityStatus.emoji.animated === 'boolean' ? (
                <span style={{ marginRight: '0.5em' }}>
                  <DiscordImageEmoji
                    classes={classes}
                    id={activityStatus.emoji.id}
                    animated={activityStatus.emoji.animated}
                  />
                </span>
              ) : null}
              <Text classes={classes}>
                {`${
                  activityStatus.details ? `${activityStatus.details} ` : ''
                }${activityStatus.state ? `${activityStatus.state}` : ''}`}
              </Text>
            </p>
          </div>
        ) : null}

        <hr className={classes.hr} />

        {/* About */}
        {data.aboutMe ? (
          <div className={classes.about}>
            <h3>About Me</h3>

            <p
              style={{
                color: namePlateNameIdColor,
              }}
            >
              <Text classes={classes}>{data.aboutMe}</Text>
            </p>
          </div>
        ) : null}

        {/* Member Since */}
        {data.memberSince ? (
          <div className={classes.memberSince}>
            <h3>Discord Member Since</h3>

            <p
              style={{
                color: namePlateNameIdColor,
              }}
            >
              <Text classes={classes}>{data.memberSince}</Text>
            </p>
          </div>
        ) : null}

        {/* Activities */}
        {activities.length > 0 ? (
          <div className={classes.activities}>
            <h3>Current Activiy</h3>

            {activities.map(activity => (
              <div key={activity.id} className={classes.activity}>
                {activity.assets ? (
                  <div className={classes.activityIcon}>
                    <img
                      className={classes.activityIconImage}
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`}
                    />
                    {activity.assets.small_image ? (
                      <img
                        className={classes.activityIconBadgeImage}
                        src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`}
                        style={{
                          backgroundColor: namePlatePrimaryColor.hsl().string(),
                        }}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className={classes.activityIcon}>
                    {/* NOTE: Images from the CDN are not very big and scaling them up looks bad. Padding is to reduce scaling. */}
                    <img
                      className={classes.activityIconImage}
                      style={{ padding: '1.5em' }}
                      src={`https://dcdn.dstn.to/app-icons/${activity.application_id}`}
                      width={40}
                      height={40}
                    />
                  </div>
                )}

                <div className={classes.activityDetails}>
                  <h3>
                    <Text classes={classes}>{activity.name}</Text>
                  </h3>

                  <p>
                    <Text classes={classes}>{activity.details || ''}</Text>
                  </p>
                  <p>
                    <Text classes={classes}>{activity.state || ''}</Text>
                  </p>
                  {activity.timestamps &&
                  typeof activity.timestamps.start === 'number' ? (
                    <DiscordPresenceActivityDuration
                      start={activity.timestamps.start}
                      end={
                        typeof activity.timestamps.end === 'number'
                          ? activity.timestamps.end
                          : null
                      }
                      format={formatActivityDuration}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </DiscordPresenceBox>
  );
};