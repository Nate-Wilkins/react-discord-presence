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
 * Get color lighten step.
 */
const getColorLightnessStep = (
  color: Color,
  totalSteps: number,
  step: number,
) => {
  const remainder = 100 - color.lightness();
  return (step / totalSteps) * remainder;
};

/*
 * Get color darken step.
 */
const getColorDarkenStep = (color: Color, totalSteps: number, step: number) => {
  const remainder = color.lightness();
  return (step / totalSteps) * remainder;
};

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
  // This is a best estimate to how the theming function that Discord uses.
  const totalSteps = 40; // How many content boxes there are overlayed in the DOM.
  const colorPrimary = Color(data.theme.primary);
  const colorAccent = Color(data.theme.accent);

  // Root Colors.
  const rootPrimaryColor = colorPrimary.isDark() ? '#ffffff' : 'rgb(6, 6, 7)';
  const rootPrimaryBackgroundColorStepDark = 2;
  const rootPrimaryBackgroundColorStepLight = 19;
  const rootPrimaryBackgroundColor = !colorPrimary.isDark()
    ? colorPrimary.lightness(
        colorPrimary.lightness() +
          getColorLightnessStep(
            colorPrimary,
            totalSteps,
            rootPrimaryBackgroundColorStepLight,
          ),
      )
    : colorPrimary.lightness(
        colorPrimary.lightness() -
          getColorDarkenStep(
            colorPrimary,
            totalSteps,
            rootPrimaryBackgroundColorStepDark,
          ),
      );
  const rootAccentBackgroundColor = !colorAccent.isDark()
    ? colorAccent.lightness(
        colorAccent.lightness() +
          getColorLightnessStep(
            colorAccent,
            totalSteps,
            rootPrimaryBackgroundColorStepLight,
          ),
      )
    : colorAccent.lightness(
        colorAccent.lightness() -
          getColorDarkenStep(
            colorAccent,
            totalSteps,
            rootPrimaryBackgroundColorStepDark,
          ),
      );

  // Content Colors.
  const contentPrimaryBackgroundColorStepLight = 20;
  const contentPrimaryBackgroundColorStepDark = 24;
  const contentPrimaryBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() +
          getColorLightnessStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepLight,
          ),
      )
    : rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() -
          getColorDarkenStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepDark,
          ),
      );
  const contentAccentBackgroundColor = !rootAccentBackgroundColor.isDark()
    ? rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() +
          getColorLightnessStep(
            rootAccentBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepLight,
          ),
      )
    : rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() -
          getColorDarkenStep(
            rootAccentBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepDark,
          ),
      );

  // Name Plate Colors.
  const namePlatePrimaryBackgroundColorStepLight = 34;
  const namePlatePrimaryBackgroundColorStepDark = 32;
  const namePlatePrimaryBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() +
          getColorLightnessStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepLight,
          ),
      )
    : rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() -
          getColorDarkenStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepDark,
          ),
      );
  const namePlateAccentBackgroundColor = !rootAccentBackgroundColor.isDark()
    ? rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() +
          getColorLightnessStep(
            rootAccentBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepLight,
          ),
      )
    : rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() -
          getColorDarkenStep(
            rootAccentBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepDark,
          ),
      );
  const namePlateNameColor = rootPrimaryColor;
  const namePlateNameIdColor = !rootPrimaryBackgroundColor.isDark()
    ? 'rgba(79, 86, 96, 1)'
    : 'rgba(185, 185, 185, 1)';

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

        color: rootPrimaryColor,
        background: createLinearGradientVertical(
          rootPrimaryBackgroundColor.hsl().string(),
          0.5,
          rootAccentBackgroundColor.hsl().string(),
        ),
      }}
      styleContent={{
        background: createLinearGradientVertical(
          contentPrimaryBackgroundColor.hsl().string(),
          0.5,
          contentAccentBackgroundColor.hsl().string(),
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
                backgroundColor: namePlatePrimaryBackgroundColor.hsl().string(),
              }}
              data={data}
            />
          </a>
        </div>

        {/* Badges */}
        <div
          className={classes.badges}
          style={{
            backgroundColor: namePlatePrimaryBackgroundColor.hsl().string(),
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
                {/* TODO: Member Since */}
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
            namePlatePrimaryBackgroundColor.hsl().string(),
            0.7,
            namePlateAccentBackgroundColor.hsl().string(),
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
            <h3>Member Since</h3>

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
            <h3>Current Activity</h3>

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
                          backgroundColor: namePlatePrimaryBackgroundColor
                            .hsl()
                            .string(),
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
