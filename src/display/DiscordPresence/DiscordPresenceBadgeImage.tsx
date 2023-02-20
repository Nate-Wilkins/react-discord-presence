import {
  CSSProperties,
  default as React,
  FunctionComponent,
  useState,
} from 'react';
import { ErrorImage, Image } from '../image';
import { useTheme } from './ThemeDiscordPresence';

/*
 * Render a Discord badge image.
 */
export const DiscordPresenceBadgeImage: FunctionComponent<{
  className?: string;
  style?: CSSProperties;
  src: string;
  hoverText: string;
}> = ({ className, style, src, hoverText }) => {
  const { classes, theme } = useTheme();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Event Handlers.
  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <span
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        className={`${classes.badge} ${className}`}
        style={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        src={src}
        width={21}
        height={21}
        renderError={() => (
          <ErrorImage
            className={`${classes.badge} ${className}`}
            style={{
              stroke: theme.root.color,
              fill: theme.root.color,
            }}
          />
        )}
      />

      {!hoverText || !isHovering ? null : (
        <div
          className={classes.popover}
          style={{
            backgroundColor: theme.popover.backgroundColor,
            color: theme.popover.color,
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              className={classes.popoverTail}
              style={{
                borderColor: `transparent ${theme.popover.backgroundColor} transparent transparent`,
              }}
            />
            {hoverText}
          </div>
        </div>
      )}
    </span>
  );
};
