import { format } from 'date-fns';
import { default as React, FunctionComponent } from 'react';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceBadgeImage } from './DiscordPresenceBadgeImage';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Discord badge for "MemberSince".
 */
export const DiscordPresenceBadgeMemberSince: FunctionComponent<{
  since: Date;
  format?: (
    badge: DiscordBadgeEnum | 'PremiumMemberSince' | 'MemberSince',
  ) => string;
}> = ({ since, format: inputFormatImageSrc }) => {
  const { classes } = useTheme();

  const className = classes['badgeMemberSince'];
  const source = !inputFormatImageSrc
    ? 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/member_since.webp'
    : inputFormatImageSrc('MemberSince');

  const hoverText = `Subscriber since ${format(since, 'LLL d, yyyy')}`;

  return (
    <DiscordPresenceBadgeImage
      className={className}
      src={source}
      hoverText={hoverText}
    />
  );
};
