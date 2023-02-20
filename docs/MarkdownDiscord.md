# Markdown for Discord

> Discord flavored Markdown.

Currently this project uses [`discord-markdown-parser`](https://github.com/ItzDerock/discord-markdown-parser).
The rules for this can be found in their source and should support everything that Discord supports.

However, if it doesn't, we probably need to update that package or use a more versatile system to update markdown
syntax extensions like [`remark`](https://github.com/remarkjs/remark).

---

## External Resources

### Documentation

- [Bots Discord XYZ - Discord Markdown Guide](https://bots.ondiscord.xyz/info/markdown): Guide to Discord flavored Markdown.
- [MarkdownGuide - Discord Markdown Support](https://www.markdownguide.org/tools/discord/)
- [Discord - How Discord Renders Markdown](https://discord.com/blog/how-discord-renders-rich-messages-on-the-android-app): Discord's approach to render Discord flavored Markdown.
- [Discord Formatting](https://c.r74n.com/discord/formatting)

### Libraries

- [`discord-markdown-parser`](https://github.com/ItzDerock/discord-markdown-parser): Parse Discord flavored Markdown.
  - [`discord-html-transcripts`](https://github.com/ItzDerock/discord-html-transcripts): Transform Discord flavored Markdown AST to HTML.
- [`discord-markdown`](https://github.com/brussell98/discord-markdown): Parse Discord flavored Markdown.
- [`remark`](https://github.com/remarkjs/remark)
  - [`mdast`](https://github.com/syntax-tree/mdast)
  - [`mdast-util-directive`](https://github.com/syntax-tree/mdast-util-directive)
