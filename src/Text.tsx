import React, { FunctionComponent, ReactNode } from 'react';
import Twemoji from 'react-twemoji';

/*
 * Text with Emoji support.
 */
export const Text: FunctionComponent<{
  classes: Record<string, string>;
  children: ReactNode;
}> = ({ classes, children }) => (
  <Twemoji options={{ className: classes.emoji }}>{children}</Twemoji>
);
