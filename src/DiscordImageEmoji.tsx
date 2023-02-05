import React, { FunctionComponent } from 'react';

/*
 * Discord image emoji.
 */
export const DiscordImageEmoji: FunctionComponent<{
  classes: Record<string, string>;
  id: string;
  animated: boolean;
}> = ({ classes, id, animated }) => {
  return (
    <img
      className={classes.emoji}
      alt={`emoji ${id}`}
      width={20}
      src={`https://cdn.discordapp.com/emojis/${id}${
        animated ? '.gif' : '.png'
      }`}
    />
  );
};
