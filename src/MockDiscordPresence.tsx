import { default as React, FunctionComponent } from 'react';
import { DiscordPresence as IDiscordPresence } from 'schema-lanyard-discord-presence';
import fetchMock from 'fetch-mock';
import { createLanyardApiData } from '../test/create_lanyard_api_data';
import { discord } from './api';
import { DiscordPresence } from './DiscordPresence';
import { DiscordPresenceData } from './display';
import ImageAvatar from '../test/avatar.gif';
import ImageBanner from '../test/banner.jpeg';

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
  data?: Partial<IDiscordPresence> & {
    theme?: {
      primary: string;
      accent: string;
    };
    aboutMe?: string;
    memberSince?: string;
    premiumMemberSince?: string;
  };

  // Test State.
  state: 'actual' | 'happy' | 'load' | 'error';
}> = ({
  classes,
  args,
  data,

  // Test State.
  state,
}) => {
  const developerId = args.developerId;

  // Setup mocking.
  fetchMock.reset();

  // Mock external dependencies by state.
  let formatAvatarImageSrc:
    | null
    | ((input: DiscordPresenceData['discord_user']) => string) = null;
  let formatBannerImageSrc: null | ((discordUserId: string) => string) = null;
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
          bio: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
        },
      },
    );
    // Mock Image Sources.
    formatBannerImageSrc = () => ImageBanner;
    formatAvatarImageSrc = () => ImageAvatar;
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
      {...(formatAvatarImageSrc ? { formatAvatarImageSrc } : {})}
      {...(formatBannerImageSrc ? { formatBannerImageSrc } : {})}
    />
  );
};
