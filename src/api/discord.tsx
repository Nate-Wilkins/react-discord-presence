import {
  DiscordPresence,
  SchemaDiscordPresence,
} from 'schema-lanyard-discord-presence';
import Color from 'color';
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
    theme?: {
      primary: string;
      accent: string;
    };
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
    aboutMe?: string;
    theme?: {
      primary: string;
      accent: string;
    };
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
    if (responseContentDiscordCdn.user.id !== developerId) {
      throw new Error('Invalid response object.');
    }
    discordCdninfo = {
      ...(typeof responseContentDiscordCdn.user.bio == 'string'
        ? { aboutMe: responseContentDiscordCdn.user.bio }
        : {}),
      ...(responseContentDiscordCdn.user_profile &&
      responseContentDiscordCdn.user_profile.theme_colors instanceof Array &&
      responseContentDiscordCdn.user_profile.theme_colors.length === 2
        ? {
            theme: {
              primary: Color(
                responseContentDiscordCdn.user_profile.theme_colors[0],
              )
                .hsl()
                .toString(),
              accent: Color(
                responseContentDiscordCdn.user_profile.theme_colors[1],
              )
                .hsl()
                .toString(),
            },
          }
        : {}),
      ...(typeof responseContentDiscordCdn.premium_since === 'string'
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
