# react-discord-presence

[![Version](http://img.shields.io/npm/v/react-discord-presence.svg?style=flat-square)](https://www.npmjs.org/package/react-discord-presence)
[![Open Issues](https://img.shields.io/github/issues-raw/Nate-Wilkins/react-discord-presence?style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/issues)
[![License](https://img.shields.io/github/license/Nate-Wilkins/react-discord-presence?color=%2308F&style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/blob/main/LICENSE)

> Display your Discord presence.

```
yarn add react-discord-presence
```

## Example

[![Screenshot React Discord Presence](./__screenshots__/Display/DiscordPresence/DiscordPresence_small.png)](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx)

Check it out on [StackBlitz](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx).

## Usage

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

- Fix `premiumMemberSince` and `memberSince`.
- Support code splitting.
- Support for light theme.
- Support for screencapture of storybook components.
- Support for failing image downloads/errors.
- Support for Spotify.
- Support for overflow in activities & activity details? Should this be a custom scrollbar?
- Add tails to hover popovers.
- Talk with `@salvage_dev` about using `discord-presence` package name.

### Accessor

- Support for realtime presence data with the web socket API.
- Support for automated queries on an interval.
- Support for custom `maxDelay` on call site.
