import {
  DiscordPresence,
  SchemaDiscordPresence,
} from 'schema-lanyard-discord-presence';
import { Response } from './types';

export const Endpoints = {
  // V1 API Lanyard.
  V1ApiLanyard: 'https://api.lanyard.rest/v1',

  // V1 Discord CDN Alternative.
  V1ApiDiscordCdnAlternative: `https://dcdn.dstn.to`,
};

export type DiscordGetPresenceRequest = {
  developerId: string;
};

export type DiscordGetPresenceResponse = {
  presence: DiscordPresence & {
    aboutMe?: string;
    premiumMemberSince?: string;
  };
};

/*
 * Get Discord presence for a particular user.
 *
 * Uses the lanyard API for getting a user's discord presence.
 *
 * API:
 *   https://api.lanyard.rest/v1/users/{developerId}
 */
export const getDiscordPresence = async ({
  developerId,
}: DiscordGetPresenceRequest): Promise<Response<
  DiscordGetPresenceResponse
>> => {
  const [responseLanyard, responseDiscordCdn] = await Promise.all([
    fetch(`${Endpoints.V1ApiLanyard}/users/${developerId}`),
    fetch(`${Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`),
  ]);

  // Did an error occur? (Lanyard API)
  if (responseLanyard.status !== 200) {
    return {
      status: responseLanyard.status,
      data: null,
    };
  }
  // Did an error occur? (Discord CDN API)
  if (responseDiscordCdn.status !== 200) {
    return {
      status: responseDiscordCdn.status,
      data: null,
    };
  }

  // Lanyard API.
  let lanyardPresence: DiscordPresence;
  try {
    // Parse. (Lanyard API)
    const responseContentLanyard = await responseLanyard.json();

    // Validate. (Lanyard API)
    if (
      !responseContentLanyard ||
      typeof responseContentLanyard.success !== 'boolean'
    ) {
      throw new Error('Invalid response object.');
    }
    if (!responseContentLanyard.success) {
      throw new Error(
        `Unable to find Discord presence for user '${developerId}'.`,
      );
    }
    lanyardPresence = await SchemaDiscordPresence.validate(
      responseContentLanyard.data,
    );
  } catch (e) {
    throw new Error(`Unexpected response from Lanyard API.\n\n${e}`);
  }

  // Discord CDN.
  let discordCdninfo: {
    aboutMe: string;
    premiumMemberSince?: string;
  };
  try {
    // Parse. (Discord CDN API)
    const responseContentDiscordCdn = await responseDiscordCdn.json();

    // Validate. (Discord CDN API)
    if (!responseContentDiscordCdn || !responseContentDiscordCdn.user) {
      throw new Error(
        `Unable to find Discord presence for user '${developerId}'.`,
      );
    }
    if (
      responseContentDiscordCdn.user.id !== developerId ||
      typeof responseContentDiscordCdn.user.banner_color !== 'string' ||
      // TODO: Banner theme colors not provided correctly right now.
      // (typeof responseContentDiscordCdn.user.accent_color !== 'string' &&
      //   typeof responseContentDiscordCdn.user.accent_color !== 'number') ||
      typeof responseContentDiscordCdn.user.bio !== 'string' ||
      (!!responseContentDiscordCdn.premium_since &&
        typeof responseContentDiscordCdn.premium_since !== 'string')
    ) {
      throw new Error('Invalid response object.');
    }
    discordCdninfo = {
      aboutMe: responseContentDiscordCdn.user.bio,
      // TODO: Banner theme colors not provided correctly right now.
      // theme: {
      //   primary: Color(responseContentDiscordCdn.user.banner_color)
      //     .hsl()
      //     .toString(),
      //   accent: Color(responseContentDiscordCdn.user.accent_color)
      //     .hsl()
      //     .toString(),
      // },
      ...(responseContentDiscordCdn.premium_since
        ? { premiumMemberSince: responseContentDiscordCdn.premium_since }
        : {}),
    };
  } catch (e) {
    throw new Error(`Unexpected response from Discord CDN API.\n\n${e}`);
  }

  return {
    status: 200,
    data: {
      presence: {
        ...lanyardPresence,
        ...discordCdninfo,
      },
    },
  };
};
