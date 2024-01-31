import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { DiscordPresenceClassesDefault } from '../style';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceBadgeImage } from './DiscordPresenceBadgeImage';
import { useTheme } from './ThemeDiscordPresence';

// Classes style interface.
const BadgeLookup: {
  [property in DiscordBadgeEnum]: {
    source: string;
    className: string;
    hoverText: string;
  };
} = {
  [DiscordBadgeEnum.Staff]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordstaff.svg',
    className: 'badgeStaff',
    hoverText: 'Discord Staff',
  },
  [DiscordBadgeEnum.Partner]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordpartner.svg',
    className: 'badgePartner',
    hoverText: '',
  },
  [DiscordBadgeEnum.Hypesquad]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/hypesquadevents.svg',
    className: 'badgeHypesquad',
    hoverText: '',
  },
  [DiscordBadgeEnum.BugHunterLevel1]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordbughunter1.svg',
    className: 'badgeBugHunterLevel1',
    hoverText: '',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse1]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/hypesquadbravery.svg',
    className: 'badgeHypeSquadOnlineHouse1',
    hoverText: 'HypeSquad Bravery',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse2]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/hypesquadbrilliance.svg',
    className: 'badgeHypeSquadOnlineHouse2',
    hoverText: 'HypeSquad Brilliance',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse3]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/hypesquadbalance.svg',
    className: 'badgeHypeSquadOnlineHouse3',
    hoverText: 'HypeSquad Balance',
  },
  [DiscordBadgeEnum.PremiumEarlySupporter]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordearlysupporter.svg',
    className: 'badgePremiumEarlySupporter',
    hoverText: '',
  },
  [DiscordBadgeEnum.TeamPseudoUser]: {
    /* TODO: Not Supported 'TeamPseudoUser'. */
    source: '',
    className: 'badgeTeamPseudoUser',
    hoverText: '',
  },
  [DiscordBadgeEnum.BugHunterLevel2]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordbughunter2.svg',
    className: 'badgeBugHunterLevel2',
    hoverText: '',
  },
  [DiscordBadgeEnum.VerifiedBot]: {
    /* TODO: Not Supported 'VerifiedBot'. */
    source: '',
    className: 'badgeVerifiedBot',
    hoverText: '',
  },
  [DiscordBadgeEnum.VerifiedDeveloper]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/discordbotdev.svg',
    className: 'badgeVerifiedDeveloper',
    hoverText: 'Early Verified Bot Developer',
  },
  [DiscordBadgeEnum.CertifiedModerator]: {
    /* TODO: Not Supported 'CertifiedModerator'. */
    source: '',
    className: 'badgeCertifiedModerator',
    hoverText: '',
  },
  [DiscordBadgeEnum.BotHTTPInteractions]: {
    /* TODO: Not Supported 'BotHTTPInteractions'. */
    source: '',
    className: 'badgeBotHTTPInteractions',
    hoverText: '',
  },
  [DiscordBadgeEnum.Spammer]: {
    /* TODO: Not Supported 'Spammer'. */
    source: '',
    className: 'badgeSpammer',
    hoverText: '',
  },
  [DiscordBadgeEnum.ActiveDeveloper]: {
    source:
      'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/activedeveloper.svg',
    className: 'badgeActiveDeveloper',
    hoverText: 'Active Developer',
  },
  [DiscordBadgeEnum.Quarantined]: {
    /* TODO: Not Supported 'Quarantined'. */
    source: '',
    className: 'badgeQuarantined',
    hoverText: '',
  },
};

/*
 * Discord presence badge.
 */
export const DiscordPresenceBadge: FunctionComponent<{
  badge: DiscordBadgeEnum;
  format?: (badge: DiscordBadgeEnum) => string;
}> = ({ badge, format }) => {
  const { classes } = useTheme();

  // Variant.
  const {
    source: defaultSource,
    className: classNameLookup,
    hoverText,
  } = BadgeLookup[badge];
  const className = cn(
    DiscordPresenceClassesDefault[classNameLookup],
    classes?.[classNameLookup],
  );
  const source = !format ? defaultSource : format(badge);

  return (
    <DiscordPresenceBadgeImage
      className={className}
      src={source}
      hoverText={hoverText}
    />
  );
};