import { DiscordPresence as IDiscordPresence } from 'schema-lanyard-discord-presence';

export type DiscordPresenceData = IDiscordPresence & {
  theme: {
    primary: string;
    accent: string;
  };
  aboutMe?: string;
  memberSince?: string;
  premiumMemberSince?: string;
};
