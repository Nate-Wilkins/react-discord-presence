import { DiscordBadgeEnum } from '../types';

/*
 * Get the corresponding badge types from the encoded badges flags.
 */
export const getDiscordBadges = (encoding: number) => {
  const badges: DiscordBadgeEnum[] = [];

  for (const badgeValue in DiscordBadgeEnum) {
    if ((encoding & Number(DiscordBadgeEnum[badgeValue])) !== 0) {
      const badge: DiscordBadgeEnum =
        DiscordBadgeEnum[badgeValue as keyof typeof DiscordBadgeEnum];
      if (
        badge === DiscordBadgeEnum.TeamPseudoUser ||
        badge === DiscordBadgeEnum.VerifiedBot ||
        badge === DiscordBadgeEnum.CertifiedModerator ||
        badge === DiscordBadgeEnum.BotHTTPInteractions ||
        badge === DiscordBadgeEnum.Spammer ||
        badge === DiscordBadgeEnum.Quarantined
      ) {
        continue;
      }
      badges.push(badge);
    }
  }

  return badges;
};
