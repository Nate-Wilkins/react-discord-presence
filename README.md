# react-discord-presence

[![Version](http://img.shields.io/npm/v/react-discord-presence.svg?style=flat-square)](https://www.npmjs.org/package/react-discord-presence)
[![Open Issues](https://img.shields.io/github/issues-raw/Nate-Wilkins/react-discord-presence?style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/issues)
[![License](https://img.shields.io/github/license/Nate-Wilkins/react-discord-presence?color=%2308F&style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/blob/main/LICENSE)

> Display your Discord presence in react.

```
yarn add react-discord-presence
```

## Example

[![Screenshot React Discord Presence](./screenshot.png)](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx)

Check it out on [StackBlitz](https://stackblitz.com/edit/react-ts-nfdx3w?file=App.tsx).

## Usage

There are three forms of Discord presence. (iframe, react, and custom)

### iframe

```
TODO:
```

### React

```typescript
import { DiscordPresence } from 'react-discord-presence';
// ...
<DiscordPresence args={{ developerId: "<your-developer-id>" }} />
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
- <iframe src="data:text/html;charset=utf-8;base64,PGh0bWw+DQogIDxwPkhlbGxvIHdvcmxkPzwvcD4NCjwvaHRtbD4=" />
  https://dopiaza.org/tools/datauri/index.php
- Support code splitting.
- Support for light theme.
- Support for screencapture of storybook components.
- Support for failing image downloads/errors.
- Support for Spotify.
- Support for overflow in activities & activity details? Should this be a custom scrollbar?
- Add tails to hover popovers.
- Flatten CSS and image assets in distributable.
- Possibly use webpack to move CSS and image assets to distributable.
- Talk with `@salvage_dev` about using `discord-presence` package name.

### Accessor

- Support for realtime presence data with the web socket API.
- Support for automated queries on an interval.
- Support for custom `maxDelay` on call site.
