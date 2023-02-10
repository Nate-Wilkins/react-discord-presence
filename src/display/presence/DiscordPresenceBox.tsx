import {
  CSSProperties,
  default as React,
  FunctionComponent,
  ReactNode,
} from 'react';

/*
 * Render Discord presence box wrapper.
 *
 * Basically two different colored boxes that's reused for a few states:
 * - Loading.
 * - Error.
 * - Happy.
 */
export const DiscordPresenceBox: FunctionComponent<{
  classes: Record<string, string>;
  styleRoot?: CSSProperties;
  styleContent?: CSSProperties;
  children?: ReactNode;
}> = ({ classes, styleRoot, styleContent, children }) => {
  return (
    <div className={classes.root} style={styleRoot}>
      <div className={classes.content} style={styleContent}>
        {children}
      </div>
    </div>
  );
};
