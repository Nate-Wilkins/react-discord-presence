import { default as React, FunctionComponent } from 'react';
import fetchMock from 'fetch-mock';
import { createLanyardApiData } from '../test/create_lanyard_api_data';
import { discord } from './api';
import { DiscordPresence } from './DiscordPresence';
import { DiscordPresenceData } from './display/presence/types';

const data = {
  theme: {
    primary: 'rgba(38, 114, 195, 1)',
    accent: 'rgba(0, 26, 48, 1)',
  },
  aboutMe: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
  memberSince: 'June 21, 2016',
  premiumMemberSince: 'April 10, 2022',
};

/*
 * Mock the 'DiscordPresence' component for story development.
 *
 * Mocks self contained behavior:
 * - Loading.
 * - Error handling.
 */
export const MockDiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  args: { developerId: string };

  // Test State.
  state: 'actual' | 'happy' | 'load' | 'error';

  // Custom Formatters.
  formatActivityDuration?: (d1: Date, d2: Date) => string;
  formatBannerImageSrc?: (discordUserId: string) => string;
  formatAvatarImageSrc?: (
    discordUser: DiscordPresenceData['discord_user'],
  ) => string;
}> = ({
  classes,
  args,

  // Test State.
  state,

  // Custom Formatters.
  formatActivityDuration,
  formatBannerImageSrc,
  formatAvatarImageSrc,
}) => {
  const developerId = args.developerId;

  // Setup mocking.
  fetchMock.reset();

  // Mock external dependencies by state.
  if (state === 'actual') {
    // noop - no mocking.
  } else if (state === 'load') {
    const loadForever = () =>
      new Promise(res => setTimeout(res, 0x7fffffff)).then(() => ({
        status: 500,
      }));
    // Mock Lanyard API.
    fetchMock.mock(
      `${discord.Endpoints.V1ApiLanyard}/users/${developerId}`,
      loadForever,
    );
    // Mock Discord CDN API.
    fetchMock.mock(
      `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
      loadForever,
    );
  } else if (state === 'happy') {
    // Mock Lanyard API.
    fetchMock.get(`${discord.Endpoints.V1ApiLanyard}/users/${developerId}`, {
      success: true,
      data: {
        ...createLanyardApiData({ developerId }),
      },
    });
    // Mock Discord CDN API.
    fetchMock.get(
      `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
      {
        user: {
          id: developerId,
          banner_color: '#f32010',
          accent_color: '#f32010',
          bio: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
        },
      },
    );
  } else if (state === 'error') {
    // Mock Lanyard API.
    fetchMock.get(`${discord.Endpoints.V1ApiLanyard}/users/${developerId}`, {
      status: 400,
    });
    // Mock Discord CDN API.
    fetchMock.get(
      `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
      { status: 400 },
    );
  } else {
    throw new Error(`Invalid state '${state}' provided.`);
  }

  return (
    <DiscordPresence
      classes={classes}
      args={{ developerId }}
      data={data}
      formatActivityDuration={formatActivityDuration}
      formatBannerImageSrc={formatBannerImageSrc}
      formatAvatarImageSrc={formatAvatarImageSrc}
    />
  );
};
