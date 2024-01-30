import { AccessorQuery } from 'data-accessor';
import { discord } from '../api';

export interface CacheStoreDiscordPresence
  extends AccessorQuery.AccessorQueryCacheStore {
  discordPresence: Map<string, discord.DiscordGetPresenceResponse['presence']>;
}

/*
 * Cache entries for discord presence.
 */
export const createCache = () => ({
  discordPresence: new Map<
    string,
    discord.DiscordGetPresenceResponse['presence']
  >(),
});

/*
 * Get discord presence for a particular Discord Lanyard user.
 *
 * Uses the lanyard API for getting a user's discord presence.
 *
 * API:
 *   https://api.lanyard.rest/v1/users/{developerId}
 *
 * Example:
 *   https://api.lanyard.rest/v1/users/194976024457510912
 *
 * TODO: Support WebSocket and or automated query intervals.
 */
export const AccessorGetDiscordPresence = AccessorQuery.createComponent<
  CacheStoreDiscordPresence,
  discord.DiscordGetPresenceRequest,
  discord.DiscordGetPresenceResponse,
  discord.DiscordGetPresenceResponse['presence']
>({
  debug: false,
  constraints: { enforce: false },
  cache: {
    duration: 1000 * 60 * 1, // 1min
    isPrimableFromCache: false,
    id: ({ args }) => `getDiscordPresence#developerId#${args.developerId}`,
    set: ({
      cache,
      response,
    }): { data: discord.DiscordGetPresenceResponse['presence'] } => {
      const store = cache();

      // Parse.
      const presence = response.data.presence;

      // Set cache.
      store.discordPresence.set(presence.discord_user.id, presence);

      return { data: presence };
    },
    get: ({
      cache,
      args,
    }): AccessorQuery.AccessorQueryResult<
      discord.DiscordGetPresenceResponse['presence']
    > | null => {
      const store = cache();

      // Get cache.
      const cacheResult = store.discordPresence.get(args.developerId);

      // Do we have a cache result?
      if (typeof cacheResult !== 'undefined') {
        return { data: cacheResult };
      }

      return null;
    },
  },
  query: discord.getDiscordPresence,
});
