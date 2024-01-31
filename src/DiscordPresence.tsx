import { AccessorQuery } from 'data-accessor';
import { default as React, FunctionComponent } from 'react';
import { DiscordPresence as IDiscordPresence } from 'schema-lanyard-discord-presence';
import { AccessorGetDiscordPresence, createCache } from './accessor';
import { Boundary } from './Boundary';
import {
  DiscordPresence as DisplayDiscordPresence,
  DiscordPresenceData,
  ErrorDiscordPresence,
  LoadingDiscordPresence,
  ThemeDiscordPresence,
  ThemeDiscordPresenceOverride,
} from './display';

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
  classes?: Record<string, string>;
  theme?: { primary: string; accent: string };
  args: { developerId: string };
  data?: Partial<IDiscordPresence> & {
    theme?: {
      primary: string;
      accent: string;
    };
    aboutMe?: string;
    memberSince?: Date;
    premiumMemberSince?: Date;
  };

  // Custom Formatters.
  formatActivityDuration?: (d1: Date, d2: Date) => string;
  formatBannerImageSrc?: (discordUserId: string) => string;
  formatAvatarImageSrc?: (
    discordUser: DiscordPresenceData['discord_user'],
  ) => string;
}> = ({
  classes,
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

  return (
    <ThemeDiscordPresence
      classes={classes}
      theme={
        theme
          ? theme
          : {
              primary: '#36393f',
              accent: '#2f3136',
            }
      }
    >
      <Boundary
        onLoading={<LoadingDiscordPresence />}
        onError={({ error }) => <ErrorDiscordPresence error={error} />}
      >
        <AccessorGetDiscordPresence cache={() => cacheStore} args={args}>
          {({ data: dataAccessor }) =>
            !dataAccessor || !dataAccessor.discord_user ? (
              // Should never happen.
              <ErrorDiscordPresence error="Unknown Error." />
            ) : (
              <ThemeDiscordPresenceOverride
                theme={data && data.theme ? data.theme : dataAccessor.theme}
              >
                <DisplayDiscordPresence
                  data={{
                    ...dataAccessor,
                    ...data,
                  }}
                  formatActivityDuration={formatActivityDuration}
                  formatAvatarImageSrc={formatAvatarImageSrc}
                  formatBannerImageSrc={formatBannerImageSrc}
                />
              </ThemeDiscordPresenceOverride>
            )
          }
        </AccessorGetDiscordPresence>
      </Boundary>
    </ThemeDiscordPresence>
  );
};
