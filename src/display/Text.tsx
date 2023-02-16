import React, { CSSProperties, FunctionComponent } from 'react';
import Twemoji from 'react-twemoji';

/*
 * Text with Emoji support.
 */
export const Text: FunctionComponent<{
  className?: string;
  style?: CSSProperties;
  emojiClassName: string;
  children: string;
}> = ({ className, style, emojiClassName, children }) => (
  <Twemoji noWrapper options={{ className: emojiClassName }}>
    <span className={className} style={style}>
      {children}
    </span>
  </Twemoji>
);
