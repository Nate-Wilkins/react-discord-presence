import React, { CSSProperties, FunctionComponent, useState } from 'react';
import { DiscordBadgeEnum } from '../types';

// Classes style interface.
const BadgeLookup: {
  [property in DiscordBadgeEnum]: { className: string; hoverText: string };
} = {
  [DiscordBadgeEnum.Staff]: {
    className: 'badgeStaff',
    hoverText: 'Discord Staff',
  },
  [DiscordBadgeEnum.Partner]: { className: 'badgePartner', hoverText: '' },
  [DiscordBadgeEnum.Hypesquad]: { className: 'badgeHypesquad', hoverText: '' },
  [DiscordBadgeEnum.BugHunterLevel1]: {
    className: 'badgeBugHunterLevel1',
    hoverText: '',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse1]: {
    className: 'badgeHypeSquadOnlineHouse1',
    hoverText: 'HypeSquad Bravery',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse2]: {
    className: 'badgeHypeSquadOnlineHouse2',
    hoverText: 'HypeSquad Brilliance',
  },
  [DiscordBadgeEnum.HypeSquadOnlineHouse3]: {
    className: 'badgeHypeSquadOnlineHouse3',
    hoverText: 'HypeSquad Balance',
  },
  [DiscordBadgeEnum.PremiumEarlySupporter]: {
    className: 'badgePremiumEarlySupporter',
    hoverText: '',
  },
  [DiscordBadgeEnum.TeamPseudoUser]: {
    className: 'badgeTeamPseudoUser',
    hoverText: '',
  },
  [DiscordBadgeEnum.BugHunterLevel2]: {
    className: 'badgeBugHunterLevel2',
    hoverText: '',
  },
  [DiscordBadgeEnum.VerifiedBot]: {
    className: 'badgeVerifiedBot',
    hoverText: '',
  },
  [DiscordBadgeEnum.VerifiedDeveloper]: {
    className: 'badgeVerifiedDeveloper',
    hoverText: 'Early Verified Bot Developer',
  },
  [DiscordBadgeEnum.CertifiedModerator]: {
    className: 'badgeCertifiedModerator',
    hoverText: '',
  },
  [DiscordBadgeEnum.BotHTTPInteractions]: {
    className: 'badgeBotHTTPInteractions',
    hoverText: '',
  },
  [DiscordBadgeEnum.Spammer]: { className: 'badgeSpammer', hoverText: '' },
  [DiscordBadgeEnum.ActiveDeveloper]: {
    className: 'badgeActiveDeveloper',
    hoverText: 'Active Developer',
  },
  [DiscordBadgeEnum.Quarantined]: {
    className: 'badgeQuarantined',
    hoverText: '',
  },
};

/*
 * Discord presence badge to display from provided classes.
 */
export const DiscordPresenceBadge: FunctionComponent<{
  classes: Record<string, string>;
  stylePopover?: CSSProperties;
  badge: DiscordBadgeEnum | 'PremiumMemberSince';
}> = ({ classes, stylePopover, badge }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Variant.
  let className;
  let hoverText;
  if (badge === 'PremiumMemberSince') {
    // TODO: Support hover text for premium member since.
    //       "Subscriber since ${Oct 19, 2022}"
    className = classes['badgePremiumMemberSince'];
    hoverText = null;
  } else {
    const badgeData = BadgeLookup[badge];
    className = classes[badgeData.className];
    hoverText = badgeData.hoverText;
  }

  // Event Handlers.
  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <span
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={`${classes.badge} ${className}`}
      />

      {!hoverText || !isHovering ? null : (
        <div className={classes.popover} style={stylePopover}>
          {hoverText}
        </div>
      )}
    </span>
  );
};
