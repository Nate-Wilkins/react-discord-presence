import { parse } from 'discord-markdown-parser';
import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { renderAst } from './render_ast';

/*
 * User text with support for:
 *
 * - Emojis
 * - Time         : <t:1680955200:d>
 * - Quotes       : >
 * - Code Quotes  : ``
 * - Italics      : *
 * - Bold         : **
 */
export const MarkdownDiscord: FunctionComponent<{
  className?: string;
  style?: CSSProperties;
  emojiClassName: string;
  blockQuoteClassName: string;
  blockQuoteBorderClassName: string;
  blockQuoteBorderStyle?: CSSProperties;
  blockCodeClassName: string;
  blockCodeStyle?: CSSProperties;
  inlineCodeClassName: string;
  inlineCodeStyle?: CSSProperties;
  spoilerClassName: string;
  spoilerStyle?: CSSProperties;
  spoilerStyleHover?: CSSProperties;
  timestampClassName: string;
  timestampStyle?: CSSProperties;
  underlineClassName: string;
  renderEmojiError: () => ReactNode;
  children: string;
}> = ({
  className,
  style,
  emojiClassName,
  blockQuoteClassName,
  blockQuoteBorderClassName,
  blockQuoteBorderStyle,
  blockCodeClassName,
  blockCodeStyle,
  inlineCodeClassName,
  inlineCodeStyle,
  renderEmojiError,
  spoilerClassName,
  spoilerStyle,
  spoilerStyleHover,
  timestampClassName,
  timestampStyle,
  underlineClassName,
  children,
}) => {
  const [content, setContent] = useState<null | ReactNode[]>(null);

  useEffect(() => {
    (async () => {
      const astMarkdown = parse(children);
      const content = await renderAst(astMarkdown, {
        emojiClassName,
        blockQuoteClassName,
        blockQuoteBorderClassName,
        blockQuoteBorderStyle,
        blockCodeClassName,
        blockCodeStyle,
        inlineCodeClassName,
        inlineCodeStyle,
        spoilerClassName,
        spoilerStyle,
        spoilerStyleHover,
        timestampClassName,
        timestampStyle,
        underlineClassName,
        renderEmojiError,
      });
      setContent(content);
    })();
  }, [
    children,
    emojiClassName,
    blockQuoteClassName,
    blockQuoteBorderClassName,
    blockQuoteBorderStyle,
    blockCodeClassName,
    blockCodeStyle,
    inlineCodeClassName,
    inlineCodeStyle,
    spoilerClassName,
    spoilerStyle,
    spoilerStyleHover,
    timestampClassName,
    timestampStyle,
    underlineClassName,
    renderEmojiError,
  ]);

  return (
    <span className={className} style={style}>
      {content}
    </span>
  );
};
