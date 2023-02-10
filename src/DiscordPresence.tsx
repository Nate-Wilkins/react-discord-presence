import { AccessorQuery } from 'data-accessor';
import React, { CSSProperties, FunctionComponent } from 'react';
import { DiscordPresence as IDiscordPresence } from 'schema-lanyard-discord-presence';
import { AccessorGetDiscordPresence, createCache } from './accessor';
import { Boundary } from './Boundary';
import {
  DiscordPresence as DisplayDiscordPresence,
  ErrorDiscordPresence,
  LoadingDiscordPresence,
} from './display/presence';
import { DiscordPresenceData } from './display/presence/types';

/*
 * Render self contained Discord presence.
 *
 * Handles:
 * - Loading Discord data along with displaying loading indicator.
 * - Errors that occur during loading along with displaying error indicator.
 * - Caching Discord presence data.
 * - Displaying Discord presence data.
 */
export const DiscordPresence: FunctionComponent<{
  classes: Record<string, string>;
  style?: CSSProperties;
  theme?: { primary: string; accent: string };
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

  // Custom Formatters.
  formatActivityDuration?: (d1: Date, d2: Date) => string;
  formatBannerImageSrc?: (discordUserId: string) => string;
  formatAvatarImageSrc?: (
    discordUser: DiscordPresenceData['discord_user'],
  ) => string;
}> = ({
  classes,
  style,
  theme,
  args,
  data,

  // Custom formatters.
  formatActivityDuration,
  formatBannerImageSrc,
  formatAvatarImageSrc,
}) => {
  // Localized cache store.
  const cacheStore = {
    ...AccessorQuery.createCache(setter => {
      setter(cacheStore);
    }),
    ...createCache(),
  };

  // Localized theme.
  const defaultTheme = theme
    ? theme
    : {
        primary: '#36393f',
        accent: '#2f3136',
      };

  return (
    <Boundary
      whenLoading={
        <LoadingDiscordPresence classes={classes} theme={defaultTheme} />
      }
      whenErroring={({ error }) => (
        <ErrorDiscordPresence
          classes={classes}
          theme={defaultTheme}
          error={error}
        />
      )}
    >
      <AccessorGetDiscordPresence cache={() => cacheStore} args={args}>
        {({ data: dataAccessor }) =>
          !dataAccessor || !dataAccessor.discord_user ? (
            // Should never happen.
            <ErrorDiscordPresence
              classes={classes}
              theme={defaultTheme}
              error="Unkown Error."
            />
          ) : (
            <DisplayDiscordPresence
              classes={classes}
              style={style}
              data={{
                ...dataAccessor,
                ...data,
                // TODO: When data accessor supports getting user's theme this should also be checked before using default theme.
                ...(data && data.theme
                  ? { theme: data.theme }
                  : { theme: defaultTheme }),
              }}
              formatActivityDuration={formatActivityDuration}
              formatAvatarImageSrc={formatAvatarImageSrc}
              formatBannerImageSrc={formatBannerImageSrc}
            />
          )
        }
      </AccessorGetDiscordPresence>
    </Boundary>
  );
};
