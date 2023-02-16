import React, { FunctionComponent, ReactNode } from 'react';
import { Image } from './Image';

/*
 * Discord image emoji.
 */
export const DiscordImageEmoji: FunctionComponent<{
  className: string;
  id: string;
  animated: boolean;
  width: number;
  height: number;
  renderError?: (renderErrorProps: {
    width: number;
    height: number;
  }) => ReactNode;
}> = ({ className, id, animated, width, height, renderError }) => {
  return (
    <Image
      className={className}
      alt={`emoji ${id}`}
      width={width}
      height={height}
      src={`https://cdn.discordapp.com/emojis/${id}${
        animated ? '.gif' : '.png'
      }`}
      renderError={renderError}
    />
  );
};
