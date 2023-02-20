import React, { FunctionComponent } from 'react';
import { ErrorImage } from '../image';
import { MarkdownDiscord } from '../MarkdownDiscord';
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
      emojiClassName={classes.emoji}
      blockQuoteClassName={classes.blockquote}
      blockQuoteBorderClassName={classes.blockquoteBorder}
      blockQuoteBorderStyle={{
        background: theme.blockquoteBorder.color,
      }}
      blockCodeClassName={classes.blockCode}
      blockCodeStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      inlineCodeClassName={classes.inlineCode}
      inlineCodeStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      spoilerClassName={classes.spoiler}
      spoilerStyle={{
        color: theme.spoiler.backgroundColor,
        background: theme.spoiler.backgroundColor,
      }}
      spoilerStyleHover={{
        color: theme.spoiler.color,
        background: theme.spoiler.backgroundColor,
      }}
      timestampClassName={classes.timestamp}
      timestampStyle={{
        background: theme.timestamp.backgroundColor,
      }}
      underlineClassName={classes.underline}
      renderEmojiError={() => (
        <ErrorImage
          className={classes.emoji}
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
