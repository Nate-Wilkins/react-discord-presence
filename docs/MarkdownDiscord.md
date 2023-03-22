# Markdown for Discord

> Discord flavored Markdown.

Currently this project uses [`discord-markdown-parser`](https://github.com/ItzDerock/discord-markdown-parser).
The rules for this can be found in their source and should support everything that Discord supports.

However, if it doesn't, we probably need to update that package or use a more versatile system to update markdown
syntax extensions like [`remark`](https://github.com/remarkjs/remark).

## TODO: Make sure the following works?

```
**Bold**
*italic*
***Bold and italic***
__underline__
_italic_
___undeeline and italic___
___**bold italic underline**___
~~strike through~~
||spoiler||

`code line`
'''
code block ''' (' is actually backtick `)'

> single quote
>>> multi line quote

[hyperlink](url "alt text")
[hyperlink_noembed](<url> "alt text")

<#channelID> //mentions channel
<@userID> //mentions user
<@&roleID> //mentions role
<a:_:emoji_id> //Animated Emoji
<:_:emoji_id> //static emoji
<t:unix_time_in_seconds> //Timestamp
</command_name:command_ID> //Mention slash command
</command_name subcommand_name:command_id> //Mention slash subcommand

<id:home> Mention Server Home Page
<id:customize> Mention Rolemenu
<id:browse> Mention Channel Toggle menu
```

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
