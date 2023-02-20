import {
  CSSProperties,
  default as React,
  FunctionComponent,
  ReactNode,
  useState,
} from 'react';

/*
 * Discord flavored Markdown spoiler.
 */
export const MarkdownDiscordSpoiler: FunctionComponent<{
  className?: string;
  style?: CSSProperties;
  styleHover?: CSSProperties;
  children: ReactNode;
}> = ({ className, style, styleHover, children }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Event Handlers.
  const onMouseOver = () => {
    setIsHovering(true);
  };
  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={className}
      style={!isHovering ? style : styleHover}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </div>
  );
};
