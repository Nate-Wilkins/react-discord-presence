import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { ErrorImage } from '../image';
import { MarkdownDiscord } from '../MarkdownDiscord';
import { DiscordPresenceClassesDefault } from '../style';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Wrapper around `MarkdownDiscord` to make it easier to work with styling specifically
 * for `DiscordPresence*` components.
 */
export const DiscordPresenceMarkdownDiscord: FunctionComponent<{
  children: string;
}> = ({ children }) => {
  const { classes, theme } = useTheme();

  return (
    <MarkdownDiscord
      emojiClassName={cn(DiscordPresenceClassesDefault.emoji, classes?.emoji)}
      blockQuoteClassName={cn(
        DiscordPresenceClassesDefault.blockquote,
        classes?.blockquote,
      )}
      blockQuoteBorderClassName={cn(
        DiscordPresenceClassesDefault.blockquoteBorder,
        classes?.blockquoteBorder,
      )}
      blockQuoteBorderStyle={{
        background: theme.blockquoteBorder.color,
      }}
      blockCodeClassName={cn(
        DiscordPresenceClassesDefault.blockCode,
        classes?.blockCode,
      )}
      blockCodeStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      inlineCodeClassName={cn(
        DiscordPresenceClassesDefault.inlineCode,
        classes?.inlineCode,
      )}
      inlineCodeStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      spoilerClassName={cn(
        DiscordPresenceClassesDefault.spoiler,
        classes?.spoiler,
      )}
      spoilerStyle={{
        color: theme.spoiler.backgroundColor,
        background: theme.spoiler.backgroundColor,
      }}
      spoilerStyleHover={{
        color: theme.spoiler.color,
        background: theme.spoiler.backgroundColor,
      }}
      timestampClassName={cn(
        DiscordPresenceClassesDefault.timestamp,
        classes?.timestamp,
      )}
      timestampStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      underlineClassName={cn(
        DiscordPresenceClassesDefault.underline,
        classes?.underline,
      )}
      renderEmojiError={() => (
        <ErrorImage
          className={cn(DiscordPresenceClassesDefault.emoji, classes?.emoji)}
          style={{
            stroke: theme.root.color,
            fill: theme.root.color,
          }}
        />
      )}
    >
      {children}
    </MarkdownDiscord>
  );
};
