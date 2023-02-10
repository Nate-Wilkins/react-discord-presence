import React, { FunctionComponent } from 'react';
import Twemoji from 'react-twemoji';

/*
 * Text with Emoji support.
 */
export const Text: FunctionComponent<{
  classes: Record<string, string>;
  children: string;
}> = ({ classes, children }) => (
  <Twemoji options={{ className: classes.emoji }} tag="span">
    {children}
  </Twemoji>
);
