import React, { CSSProperties, Fragment, ReactNode } from 'react';
import Twemoji from 'react-twemoji';
import { DiscordImageEmoji } from '../image';
import { MarkdownDiscordSpoiler } from './MarkdownDiscordSpoiler';
import { MarkdownDiscordTime } from './MarkdownDiscordTime';

type ASTNode = any;
type SingleASTNode = any;
type RuleTypesExtended = any;
type RenderContentContext = {
  emojiClassName: string;
  blockQuoteClassName: string;
  blockQuoteStyle?: CSSProperties;
  blockQuoteBorderClassName: string;
  blockQuoteBorderStyle?: CSSProperties;
  blockCodeClassName: string;
  blockCodeStyle?: CSSProperties;
  inlineCodeClassName: string;
  inlineCodeStyle?: CSSProperties;
  timestampClassName: string;
  timestampStyle?: CSSProperties;
  spoilerClassName: string;
  spoilerStyle?: CSSProperties;
  spoilerStyleHover?: CSSProperties;
  underlineClassName: string;
  renderEmojiError: () => ReactNode;
};

export const renderAst = async (
  nodes: ASTNode,
  context: RenderContentContext,
): Promise<React.ReactNode[]> =>
  Array.isArray(nodes)
    ? (
        await Promise.all(nodes.map(node => renderAstNode(node, context)))
      ).map((each, i) => <Fragment key={i}>{each}</Fragment>)
    : [await renderAstNode(nodes, context)];

const renderAstNode = async (
  node: SingleASTNode,
  context: RenderContentContext,
): Promise<ReactNode> => {
  if (!node) return null;

  const type = node.type as RuleTypesExtended;

  switch (type) {
    case 'text':
      return node.content;

    case 'link':
      return <a href={node.target}>{await renderAst(node.content, context)}</a>;

    case 'url':
    case 'autolink':
      return (
        <a href={node.target} target="_blank" rel="noreferrer">
          {await renderAst(node.content, context)}
        </a>
      );

    case 'blockQuote':
      return (
        <div className={context.blockQuoteClassName}>
          <div
            className={context.blockQuoteBorderClassName}
            style={context.blockQuoteBorderStyle}
          />
          <blockquote>{await renderAst(node.content, context)}</blockquote>
        </div>
      );

    case 'br':
    case 'newline':
      return <br />;

    case 'here':
    case 'everyone':
      return <div>@{type}</div>;

    case 'codeBlock':
      return (
        <div
          className={context.blockCodeClassName}
          style={context.blockCodeStyle}
        >
          <code>{node.content}</code>
        </div>
      );

    case 'inlineCode':
      return (
        <div
          className={context.inlineCodeClassName}
          style={context.inlineCodeStyle}
        >
          <code>{node.content}</code>
        </div>
      );

    case 'em':
      return <em>{await renderAst(node.content, context)}</em>;

    case 'strong':
      return <b>{await renderAst(node.content, context)}</b>;

    case 'underline':
      return (
        <span className={context.underlineClassName}>
          {await renderAst(node.content, context)}
        </span>
      );

    case 'strikethrough':
      return <s>{await renderAst(node.content, context)}</s>;

    case 'emoticon':
      return typeof node.content === 'string'
        ? node.content
        : await renderAst(node.content, context);

    case 'spoiler':
      return (
        <MarkdownDiscordSpoiler
          className={context.spoilerClassName}
          style={context.spoilerStyle}
          styleHover={context.spoilerStyleHover}
        >
          {await renderAst(node.content, context)}
        </MarkdownDiscordSpoiler>
      );

    case 'emoji':
      return (
        <DiscordImageEmoji
          className={context.emojiClassName}
          id={node.id}
          animated={node.animated}
          width={32}
          height={32}
          renderError={context.renderEmojiError}
        />
      );

    case 'twemoji':
      return (
        <Twemoji noWrapper options={{ className: context.emojiClassName }}>
          <span>{node.name}</span>
        </Twemoji>
      );

    case 'timestamp':
      return (
        <MarkdownDiscordTime
          className={context.timestampClassName}
          style={context.timestampStyle}
          timestamp={parseInt(node.timestamp) * 1000}
          format={node.format}
        />
      );

    default: {
      return typeof node.content === 'string'
        ? node.content
        : await renderAst(node.content, context);
    }
  }
};
