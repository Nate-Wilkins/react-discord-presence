# react-discord-presence

[![Version](http://img.shields.io/npm/v/react-discord-presence.svg?style=flat-square)](https://www.npmjs.org/package/react-discord-presence)
[![Open Issues](https://img.shields.io/github/issues-raw/Nate-Wilkins/react-discord-presence?style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/issues)
[![License](https://img.shields.io/github/license/Nate-Wilkins/react-discord-presence?color=%2308F&style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/blob/main/LICENSE)

> Display your Discord presence.

```
yarn add react-discord-presence
```

## Example

Check it out on [StackBlitz](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx).

[![Screenshot React Discord Presence](./__screenshots__/Display/DiscordPresence/CustomCode_small.png)](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx)

__Loading State__

[![Screenshot Loading React Discord Presence](./__screenshots__/Display/LoadingDiscordPresence/Custom_small.png)](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx)

__Error State__

[![Screenshot Loading React Discord Presence](./__screenshots__/Display/ErrorDiscordPresence/Custom_small.png)](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx)

You can find more examples in [`docs/Examples.md`](./docs/Examples.md).

## Features

- Self Contained
- Banner
- Avatar
- User Online Status
- User Status
- Badges (Boost badge will match `premium_since`)
- About Me
- Member Since (Mostly, icons are on the Roadmap)
- Spotify
- Activity
- Customization

Please note that this component is only possible by the [Lanyard API](https://github.com/Phineas/lanyard) and the work done to get the correct data
pulled into the display components.

## Requirements

This solution uses the [Lanyard API](https://github.com/Phineas/lanyard) which will require the Discord user your
displaying presence for be in the [Lanyard API Discord](https://discord.gg/UrXF2cfJ7F). You will also have to have
"Developer Mode" on for the user.

If they're not in the Discord server, you'll get a response error from their API.

## Usage

You can use the self contained `DiscordPresence` component which will handle
data retrieval, loading, error, and display states automatically for you.

### React

```typescript
import { DiscordPresence } from 'react-discord-presence';
import discordPresenceClasses from 'react-discord-presence/dist/src/display/style/DiscordPresenceDefault.module.css';
// ...
<DiscordPresence
  classes={discordPresenceClasses}
  args={{ developerId: "<your-developer-id>" }}
/>
```

### Custom

For fine grained control see [`docs/Customization.md`](./docs/Customization.md).

## Development

Written in Typescript. Workflows are defined in `.envrc.sh`.

## External Resources

- [Schema Lanyard API Discord Presence](https://github.com/Nate-Wilkins/schema-lanyard-discord-presence): Schema for the
  Lanyard API.
- [Lanyard API](https://github.com/Phineas/lanyard): REST and WS API that provides Discord presence data.
- [Discord CDN Alternative](https://gist.github.com/dustinrouillard/04be36180ed80db144a4857408478854): REST API the
  provides Discord presence data.

## Roadmap

### Display

- Support for idle status.
- Support for do not disturb status.
- Fix "About Me" to support "`" (code quotes), "*" (italics), "**" (bold).
- Fix `premiumMemberSince` and `memberSince`.
- Support code splitting.
- Support for failing image downloads/errors.
- Support for overflow in activities & activity details? Should this be a custom scrollbar?
- Add tails to hover popovers.
- Talk with `@salvage_dev` about using `discord-presence` package name.
- Find SVG badges for 'TeamPseudoUser', 'VerifiedBot', 'CertifiedModerator', 'BotHTTPInteractions', 'Spammer', and 'Quarantined'

### Accessor

- Support for realtime presence data with the web socket API.
- Support for automated queries on an interval.
- Support for custom `maxDelay` on call site.
