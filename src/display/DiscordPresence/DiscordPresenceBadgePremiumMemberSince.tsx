import { differenceInMonths, format } from 'date-fns';
import { default as React, FunctionComponent } from 'react';
import { DiscordBadgeEnum } from '../types';
import { DiscordPresenceBadgeImage } from './DiscordPresenceBadgeImage';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Discord badge for "PremiumMemberSince".
 */
export const DiscordPresenceBadgePremiumMemberSince: FunctionComponent<{
  since: Date;
  format?: (
    badge: DiscordBadgeEnum | 'PremiumMemberSince' | 'MemberSince',
  ) => string;
}> = ({ since, format: inputFormatImageSrc }) => {
  const { classes } = useTheme();

  const defaultFormat = () => {
    const months = differenceInMonths(new Date(), since);

    // 24 Months.
    if (months >= 24) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost9.svg';
    }
    // 18 Months.
    else if (months >= 18) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost8.svg';
    }
    // 15 Months.
    else if (months >= 15) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost7.svg';
    }
    // 12 Months.
    else if (months >= 12) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost6.svg';
    }
    // 9 Months.
    else if (months >= 9) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost5.svg';
    }
    // 6 Months.
    else if (months >= 6) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost4.svg';
    }
    // 3 Months.
    else if (months >= 3) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost3.svg';
    }
    // 2 Months.
    else if (months >= 2) {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost2.svg';
    }
    // 1 Month.
    else {
      return 'https://raw.githubusercontent.com/Nate-Wilkins/discord-badges/main/assets/boosts/discordboost1.svg';
    }
  };

  const className = classes['badgePremiumMemberSince'];
  const source = !inputFormatImageSrc
    ? defaultFormat()
    : inputFormatImageSrc('PremiumMemberSince');

  const hoverText = `Server boosting since ${format(since, 'LLL d, yyyy')}`;

  return (
    <DiscordPresenceBadgeImage
      className={className}
      src={source}
      hoverText={hoverText}
    />
  );
};
