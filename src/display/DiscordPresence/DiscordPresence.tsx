import { format } from 'date-fns';
import { default as React, FunctionComponent, useState } from 'react';
import cn from 'classnames';
import { createLinearGradientVertical } from '../create_linear_gradient_vertical';
import { DiscordImageEmoji, ErrorImage, Image } from '../image';
import { DiscordPresenceClassesDefault } from '../style';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceActivityDuration } from './DiscordPresenceActivityDuration';
import { DiscordPresenceBadge } from './DiscordPresenceBadge';
import { DiscordPresenceBadgeMemberSince } from './DiscordPresenceBadgeMemberSince';
import { DiscordPresenceBadgePremiumMemberSince } from './DiscordPresenceBadgePremiumMemberSince';
import { DiscordPresenceBadgeShowcase } from './DiscordPresenceBadgeShowcase';
import { DiscordPresenceLayout } from './DiscordPresenceLayout';
import { DiscordPresenceMarkdownDiscord } from './DiscordPresenceMarkdownDiscord';
import { DiscordPresenceSpotifySongDuration } from './DiscordPresenceSpotifySongDuration';
import { DiscordPresenceUserStatus } from './DiscordPresenceUserStatus';
import { getActivityImageSource } from './get_activity_image_source';
import { getDiscordBadges } from './get_discord_badges';
import { useTheme } from './ThemeDiscordPresence';
import { DiscordPresenceData } from './types';

/*
 * Discord presence.
 *
 * Data model is based on the Discord Lanyard presence API.
 */
export const DiscordPresence: FunctionComponent<{
  data: DiscordPresenceData;

  // Custom Formatters.
  // Mostly used for testing, bc URLs by default point to some Discord assets.
  formatActivityDuration?: (d1: Date, d2: Date) => string;
  formatActivitySpotifyDuration?: (d1: Date, d2: Date) => string;
  formatBannerImageSrc?: (discordUserId: string) => string;
  formatAvatarImageSrc?: (
    discordUser: DiscordPresenceData['discord_user'],
  ) => string;
  formatBadgeImageSrc?: (
    badge: DiscordBadgeEnum | 'PremiumMemberSince' | 'MemberSince',
  ) => string;
}> = ({
  data,

  // Custom Formatters.
  formatActivityDuration: inputFormatActivityDuration,
  formatActivitySpotifyDuration: inputFormatActivitySpotifyDuration,
  formatBannerImageSrc: inputFormatBannerSrc,
  formatAvatarImageSrc: inputFormatAvatarImageSrc,
  formatBadgeImageSrc: inputFormatBadgeImageSrc,
}) => {
  const { classes, theme } = useTheme();
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
  const formatBadgeImageSrc = inputFormatBadgeImageSrc;

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

  // Event Handlers.
  const onAvatarMouseOver = () => {
    setIsHoveringAvatar(true);
  };
  const onAvatarMouseOut = () => {
    setIsHoveringAvatar(false);
  };

  return (
    <DiscordPresenceLayout>
      <div
        className={cn(
          DiscordPresenceClassesDefault.background,
          classes?.background,
        )}
      >
        {/* Banner */}
        <Image
          src={formatBannerImageSrc(data.discord_user.id)}
          width={300}
          height={105}
          className={cn(
            DiscordPresenceClassesDefault.backgroundImage,
            classes?.backgroundImage,
          )}
          renderError={() => (
            <ErrorImage
              className={cn(
                DiscordPresenceClassesDefault.backgroundImage,
                classes?.backgroundImage,
              )}
              style={{
                stroke: theme.root.color,
                fill: theme.root.color,
              }}
            />
          )}
        />

        {/* Avatar */}
        <div
          className={cn(DiscordPresenceClassesDefault.avatar, classes?.avatar)}
        >
          <a
            href={`https://discord.com/users/${data.discord_user.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                DiscordPresenceClassesDefault.avatarViewProfileContainer,
                classes?.avatarViewProfileContainer,
              )}
            >
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
                className={cn(
                  DiscordPresenceClassesDefault.avatarViewProfile,
                  classes?.avatarViewProfile,
                )}
                style={{ opacity: !isHoveringAvatar ? 0 : 1 }}
              >
                View Profile
              </div>
            </div>

            <DiscordPresenceUserStatus data={data} />
          </a>
        </div>

        {/* Badges */}
        <DiscordPresenceBadgeShowcase>
          {badges.map(badge => (
            <DiscordPresenceBadge
              key={badge}
              badge={badge}
              format={formatBadgeImageSrc}
            />
          ))}
          {!data.memberSince ? null : (
            <DiscordPresenceBadgeMemberSince
              since={data.memberSince}
              format={formatBadgeImageSrc}
            />
          )}
          {!data.premiumMemberSince ? null : (
            <DiscordPresenceBadgePremiumMemberSince
              since={data.premiumMemberSince}
              format={formatBadgeImageSrc}
            />
          )}
        </DiscordPresenceBadgeShowcase>
      </div>

      {/* Name + ID */}
      <div
        className={cn(
          DiscordPresenceClassesDefault.namePlate,
          classes?.namePlate,
        )}
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
            className={cn(
              DiscordPresenceClassesDefault.namePlateHeader,
              classes?.namePlateHeader,
            )}
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
                    className={cn(
                      DiscordPresenceClassesDefault.emoji,
                      classes?.emoji,
                    )}
                    id={activityStatus.emoji.id}
                    animated={activityStatus.emoji.animated}
                    width={32}
                    height={32}
                    renderError={() => (
                      <ErrorImage
                        className={cn(
                          DiscordPresenceClassesDefault.emoji,
                          classes?.emoji,
                        )}
                        style={{
                          stroke: theme.root.color,
                          fill: theme.root.color,
                        }}
                      />
                    )}
                  />
                </span>
              ) : null}
              <DiscordPresenceMarkdownDiscord>
                {`${
                  activityStatus.details ? `${activityStatus.details} ` : ''
                }${activityStatus.state ? `${activityStatus.state}` : ''}`}
              </DiscordPresenceMarkdownDiscord>
            </p>
          </div>
        ) : null}

        <hr className={cn(DiscordPresenceClassesDefault.hr, classes?.hr)} />

        {/* About */}
        {data.aboutMe ? (
          <div
            className={cn(DiscordPresenceClassesDefault.about, classes?.about)}
          >
            <h3>About Me</h3>

            <p
              style={{
                color: theme.namePlateNameId.color,
              }}
            >
              <DiscordPresenceMarkdownDiscord>
                {data.aboutMe}
              </DiscordPresenceMarkdownDiscord>
            </p>
          </div>
        ) : null}

        {/* Member Since */}
        {data.memberSince ? (
          <div
            className={cn(
              DiscordPresenceClassesDefault.memberSince,
              classes?.memberSince,
            )}
          >
            <h3>Member Since</h3>

            <p
              style={{
                color: theme.namePlateNameId.color,
              }}
            >
              <DiscordPresenceMarkdownDiscord>
                {format(data.memberSince, 'LLL d, yyyy')}
              </DiscordPresenceMarkdownDiscord>
            </p>
          </div>
        ) : null}

        {/* Spotify */}
        {!data.spotify ? null : (
          <div
            className={cn(
              DiscordPresenceClassesDefault.listeningToSpotify,
              classes?.listeningToSpotify,
            )}
          >
            <h3>Listening to Spotify</h3>

            <div
              className={cn(
                DiscordPresenceClassesDefault.spotifySong,
                classes?.spotifySong,
              )}
            >
              <div
                className={cn(
                  DiscordPresenceClassesDefault.activity,
                  classes?.activity,
                )}
              >
                {/* Left */}
                <div
                  className={cn(
                    DiscordPresenceClassesDefault.activityIcon,
                    classes?.activityIcon,
                  )}
                >
                  <Image
                    className={cn(
                      DiscordPresenceClassesDefault.activityIconImage,
                      classes?.activityIconImage,
                    )}
                    src={data.spotify.album_art_url}
                    width={640}
                    height={640}
                    renderError={() => (
                      <ErrorImage
                        className={cn(
                          DiscordPresenceClassesDefault.activityIconImage,
                          classes?.activityIconImage,
                        )}
                        style={{
                          stroke: theme.root.color,
                          fill: theme.root.color,
                        }}
                      />
                    )}
                  />
                </div>

                {/* Right */}
                <div
                  className={cn(
                    DiscordPresenceClassesDefault.activityDetails,
                    classes?.activityDetails,
                  )}
                >
                  <h3>{data.spotify.song}</h3>

                  <p>by {data.spotify.artist}</p>
                  <p>on {data.spotify.album}</p>
                </div>
              </div>

              {/* Song Duration */}
              <DiscordPresenceSpotifySongDuration
                start={data.spotify.timestamps.start}
                end={data.spotify.timestamps.end}
                format={formatActivitySpotifyDuration}
              />
            </div>
          </div>
        )}

        {/* Activities */}
        {activities.length > 0 ? (
          <div
            className={cn(
              DiscordPresenceClassesDefault.activities,
              classes?.activities,
            )}
          >
            <h3>Current Activity</h3>

            {activities.map(activity => (
              <div
                key={activity.id}
                className={cn(
                  DiscordPresenceClassesDefault.activity,
                  classes?.activity,
                )}
              >
                {/* Left */}
                {activity.assets ? (
                  <div
                    className={cn(
                      DiscordPresenceClassesDefault.activityIcon,
                      classes?.activityIcon,
                    )}
                  >
                    <Image
                      className={cn(
                        DiscordPresenceClassesDefault.activityIconImage,
                        classes?.activityIconImage,
                      )}
                      src={getActivityImageSource({
                        type: 'large',
                        activity: {
                          ...activity,
                          assets: activity.assets,
                        },
                      })}
                      width={40}
                      height={40}
                      renderError={() => (
                        <ErrorImage
                          className={cn(
                            DiscordPresenceClassesDefault.activityIconImage,
                            classes?.activityIconImage,
                          )}
                          style={{
                            stroke: theme.root.color,
                            fill: theme.root.color,
                          }}
                        />
                      )}
                    />
                    {activity.assets.small_image ? (
                      <Image
                        className={cn(
                          DiscordPresenceClassesDefault.activityIconBadgeImage,
                          classes?.activityIconBadgeImage,
                        )}
                        src={getActivityImageSource({
                          type: 'small',
                          activity: {
                            ...activity,
                            assets: activity.assets,
                          },
                        })}
                        width={128}
                        height={128}
                        style={{
                          backgroundColor:
                            theme.namePlate.backgroundColor.primary,
                        }}
                        renderError={() => (
                          <ErrorImage
                            className={cn(
                              DiscordPresenceClassesDefault.activityIconBadgeImage,
                              classes?.activityIconBadgeImage,
                            )}
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
                  <div
                    className={cn(
                      DiscordPresenceClassesDefault.activityIcon,
                      classes?.activityIcon,
                    )}
                  >
                    {/* NOTE: Images from the CDN are not very big and scaling them up looks bad. Padding is to reduce scaling. */}
                    <Image
                      className={cn(
                        DiscordPresenceClassesDefault.activityIconImage,
                        classes?.activityIconImage,
                      )}
                      style={{ padding: '0.75em' }}
                      src={`https://dcdn.dstn.to/app-icons/${activity.application_id}`}
                      width={40}
                      height={40}
                      renderError={() => (
                        <ErrorImage
                          className={cn(
                            DiscordPresenceClassesDefault.activityIconImage,
                            classes?.activityIconImage,
                          )}
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
                <div
                  className={cn(
                    DiscordPresenceClassesDefault.activityDetails,
                    classes?.activityDetails,
                  )}
                >
                  <h3>
                    <DiscordPresenceMarkdownDiscord>
                      {activity.name}
                    </DiscordPresenceMarkdownDiscord>
                  </h3>

                  <p>
                    <DiscordPresenceMarkdownDiscord>
                      {activity.details || ''}
                    </DiscordPresenceMarkdownDiscord>
                  </p>
                  <p>
                    <DiscordPresenceMarkdownDiscord>
                      {activity.state || ''}
                    </DiscordPresenceMarkdownDiscord>
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
    </DiscordPresenceLayout>
  );
};