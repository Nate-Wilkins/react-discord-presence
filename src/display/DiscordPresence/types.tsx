import { DiscordPresence as IDiscordPresence } from 'schema-lanyard-discord-presence';

export type DiscordPresenceData = IDiscordPresence & {
  aboutMe?: string;
  memberSince?: Date;
  premiumMemberSince?: Date;
};
