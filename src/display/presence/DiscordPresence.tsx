import React, { CSSProperties, FunctionComponent, useState } from 'react';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordImageEmoji, ErrorImage, Image } from '../image';
import { Text } from '../Text';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceActivityDuration } from './DiscordPresenceActivityDuration';
import { DiscordPresenceBadge } from './DiscordPresenceBadge';
import { DiscordPresenceBox } from './DiscordPresenceBox';
import { DiscordPresenceSpotifySongDuration } from './DiscordPresenceSpotifySongDuration';
import { DiscordPresenceUserStatus } from './DiscordPresenceUserStatus';
import { getDiscordBadges } from './get_discord_badges';
import { getTheme } from './get_theme';
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
  formatActivitySpotifyDuration?: (d1: Date, d2: Date) => string;
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
  formatActivitySpotifyDuration: inputFormatActivitySpotifyDuration,
  formatBannerImageSrc: inputFormatBannerSrc,
  formatAvatarImageSrc: inputFormatAvatarImageSrc,
}) => {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState<boolean>(false);

  // Setup formatters.
  const formatActivityDuration = inputFormatActivityDuration;
  const formatActivitySpotifyDuration = inputFormatActivitySpotifyDuration;
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

  // Activities without:
  // - Status.
  // - Spotify.
  const activities = data.activities.filter(
    activity =>
      activity.id !== 'custom' &&
      activity.id.toLowerCase().indexOf('spotify') !== 0,
  );

  // Badges.
  const badges: DiscordBadgeEnum[] = getDiscordBadges(
    data.discord_user.public_flags,
  );

  // Setup theme.
  const theme = getTheme(data.theme);

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
      <div className={classes.background}>
        {/* Banner */}
        <Image
          src={formatBannerImageSrc(data.discord_user.id)}
          width={300}
          height={105}
          className={classes.backgroundImage}
          renderError={() => (
            <ErrorImage
              className={classes.backgroundImage}
              style={{
                stroke: theme.root.color,
                fill: theme.root.color,
              }}
            />
          )}
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
              <Image
                onMouseOver={onAvatarMouseOver}
                onMouseOut={onAvatarMouseOut}
                alt="Discord Avatar"
                src={formatAvatarImageSrc(data.discord_user)}
                style={{ aspectRatio: 'auto 24 /24' }}
                width={24}
                height={24}
                draggable="false"
                renderError={() => (
                  <ErrorImage
                    style={{
                      position: 'absolute',
                      stroke: theme.root.color,
                      fill: theme.root.color,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
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
                backgroundColor: theme.namePlate.backgroundColor.primary,
              }}
              data={data}
            />
          </a>
        </div>

        {/* Badges */}
        <div
          className={classes.badges}
          style={{
            backgroundColor: theme.namePlate.backgroundColor.primary,
          }}
        >
          <>
            {badges.map(badge => (
              <DiscordPresenceBadge
                key={badge}
                classes={classes}
                badge={badge}
                stylePopover={{
                  color: theme.namePlateNameId.color,
                }}
              />
            ))}
            {!data.premiumMemberSince ? null : (
              <>
                {/* TODO: Member Since */}
                <DiscordPresenceBadge
                  classes={classes}
                  badge={'PremiumMemberSince'}
                  stylePopover={{
                    color: theme.namePlateNameId.color,
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
            theme.namePlate.backgroundColor.primary,
            0.7,
            theme.namePlate.backgroundColor.accent,
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
                color: theme.namePlateName.color,
              }}
            >
              {data.discord_user.username}
            </h1>
            <h2
              style={{
                fontSize: 'inherit',
                color: theme.namePlateNameId.color,
              }}
            >
              #{data.discord_user.discriminator}
            </h2>
          </div>
        </div>

        {/* Current Status */}
        {activityStatus ? (
          <div>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {activityStatus.emoji &&
              activityStatus.emoji.id &&
              typeof activityStatus.emoji.animated === 'boolean' ? (
                <span style={{ display: 'flex', marginRight: '0.5em' }}>
                  <DiscordImageEmoji
                    className={classes.emoji}
                    id={activityStatus.emoji.id}
                    animated={activityStatus.emoji.animated}
                    width={32}
                    height={32}
                    renderError={() => (
                      <ErrorImage
                        className={classes.emoji}
                        style={{
                          stroke: theme.root.color,
                          fill: theme.root.color,
                        }}
                      />
                    )}
                  />
                </span>
              ) : null}
              <Text style={{ display: 'flex' }} emojiClassName={classes.emoji}>
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
                color: theme.namePlateNameId.color,
              }}
            >
              <Text emojiClassName={classes.emoji}>{data.aboutMe}</Text>
            </p>
          </div>
        ) : null}

        {/* Member Since */}
        {data.memberSince ? (
          <div className={classes.memberSince}>
            <h3>Member Since</h3>

            <p
              style={{
                color: theme.namePlateNameId.color,
              }}
            >
              <Text emojiClassName={classes.emoji}>{data.memberSince}</Text>
            </p>
          </div>
        ) : null}

        {/* Spotify */}
        {!data.spotify ? null : (
          <div className={classes.listeningToSpotify}>
            <h3>Listening to Spotify</h3>

            <div className={classes.spotifySong}>
              <div className={classes.activity}>
                {/* Left */}
                <div className={classes.activityIcon}>
                  <Image
                    className={classes.activityIconImage}
                    src={data.spotify.album_art_url}
                    width={640}
                    height={640}
                    renderError={() => (
                      <ErrorImage
                        className={classes.activityIconImage}
                        style={{
                          stroke: theme.root.color,
                          fill: theme.root.color,
                        }}
                      />
                    )}
                  />
                </div>

                {/* Right */}
                <div className={classes.activityDetails}>
                  <h3>{data.spotify.song}</h3>

                  <p>by {data.spotify.artist}</p>
                  <p>on {data.spotify.album}</p>
                </div>
              </div>

              {/* Song Duration */}
              <DiscordPresenceSpotifySongDuration
                classes={classes}
                styleProgress={{ backgroundColor: theme.root.color }}
                styleTotal={{
                  backgroundColor:
                    theme.spotifyProgressBar.total.backgroundColor,
                }}
                start={data.spotify.timestamps.start}
                end={data.spotify.timestamps.end}
                format={formatActivitySpotifyDuration}
              />
            </div>
          </div>
        )}

        {/* Activities */}
        {activities.length > 0 ? (
          <div className={classes.activities}>
            <h3>Current Activity</h3>

            {activities.map(activity => (
              <div key={activity.id} className={classes.activity}>
                {/* Left */}
                {activity.assets ? (
                  <div className={classes.activityIcon}>
                    <Image
                      className={classes.activityIconImage}
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`}
                      width={40}
                      height={40}
                      renderError={() => (
                        <ErrorImage
                          className={classes.activityIconImage}
                          style={{
                            stroke: theme.root.color,
                            fill: theme.root.color,
                          }}
                        />
                      )}
                    />
                    {activity.assets.small_image ? (
                      <Image
                        className={classes.activityIconBadgeImage}
                        src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`}
                        width={128}
                        height={128}
                        style={{
                          backgroundColor:
                            theme.namePlate.backgroundColor.primary,
                        }}
                        renderError={() => (
                          <ErrorImage
                            className={classes.activityIconBadgeImage}
                            style={{
                              stroke: theme.root.color,
                              fill: theme.root.color,
                            }}
                          />
                        )}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className={classes.activityIcon}>
                    {/* NOTE: Images from the CDN are not very big and scaling them up looks bad. Padding is to reduce scaling. */}
                    <Image
                      className={classes.activityIconImage}
                      style={{ padding: '0.75em' }}
                      src={`https://dcdn.dstn.to/app-icons/${activity.application_id}`}
                      width={40}
                      height={40}
                      renderError={() => (
                        <ErrorImage
                          className={classes.activityIconImage}
                          style={{
                            stroke: theme.root.color,
                            fill: theme.root.color,
                          }}
                        />
                      )}
                    />
                  </div>
                )}

                {/* Right */}
                <div className={classes.activityDetails}>
                  <h3>
                    <Text emojiClassName={classes.emoji}>{activity.name}</Text>
                  </h3>

                  <p>
                    <Text emojiClassName={classes.emoji}>
                      {activity.details || ''}
                    </Text>
                  </p>
                  <p>
                    <Text emojiClassName={classes.emoji}>
                      {activity.state || ''}
                    </Text>
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
