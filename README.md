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

In `react` with CSS modules:

```typescript
import { DiscordPresence } from 'react-discord-presence';
import discordPresenceClasses from 'react-discord-presence/dist/style/DiscordPresenceDefault.module.css';
// ...
// API Data can come from anywhere but this component was built for the Lanyard API response.
<DiscordPresence
  classes={discordPresenceClasses}
  data={apiData}
/>
```

## Customization

### Data Access

The main entry point is great for embedded, self contained, components but if you want more fine
grained controls then you can use the composing components.

 `AccessorGetDiscordPresence`

```typescript
import { AccessorGetDiscordPresence } from 'react-accessor-discord-presence';
// ...
<AccessorGetDiscordPresence>
  {({ data }) => (
    <code style={{ whiteSpace: 'pre' }}>
      {JSON.stringify(data, null, "  ")}
    </code>
  )}
</AccessorGetDiscordPresence>
```

- `DisplayDiscordPresence`

```typescript
<AccessorGetDiscordPresence
  cache={() => cache}
  args={{ developerId: '194976024457510912' }}
>
  {({ data }) =>
    !data || !data.discord_user ? (
      <ErrorDiscordPresence />
    ) : (
      <DisplayDiscordPresence
        classes={classes}
        data={{
          ...data,
          theme: {
            primary: 'rgba(38, 114, 195, 1)',
            accent: 'rgba(0, 26, 48, 1)',
          },
          memberSince: 'June 21, 2016',
        }}
      />
    )
  }
</AccessorGetDiscordPresence>
```

### Styling

- `DiscordPresenceCode.module.css`

```typescript
import { DiscordPresence } from 'react-discord-presence';
import discordPresenceClasses from 'react-discord-presence/dist/style/DiscordPresenceDefault.module.css';
import discordPresenceCodeClasses from 'react-discord-presence/dist/style/DiscordPresenceCode.module.css';
// ...
<DiscordPresence
  classes={Object.assign({}, discordPresenceClasses, discordPresenceCodeClasses}}
  data={data}
/>
```

- Custom

__`./DiscordPresenceCustom.module.css`__

```css
.hr {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
  border: none;
  height: 1px;
  background-repeat: no-repeat;
  background-size: 100% 0.05em;
  background-position: center;
  background-image: linear-gradient(
    90deg,
    rgba(0,0,0,0)                                                            0%,
    hsl(0, 0%, 90%)                                                         10%,
    hsl(0, 0%, 90%)                                                         48%,
    rgba(0,0,0,0)                                                           48%,
    rgba(0,0,0,0)                                                           50%,
    rgba(0,0,0,0)                                                           52%,
    hsl(0, 0%, 90%)                                                         52%,
    hsl(0, 0%, 90%)                                                         90%,
    rgba(0,0,0,0)                                                           100%);
  color: hsl(0, 0%, 20%);
  text-align: center;

  height: 0.75em;
}

.hr:after {
  content:" ";
  display: inline-block;
  position: relative;
  top: -0.375em;
  padding: 0.75em;
  /* react-icons: Code */
  background-image: url('data:image/svg+xml;,<svg stroke="rgb(195, 195, 195)" fill="rgb(195, 195, 195)" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.75em auto;
}
```

__`./index.tsx`__

```typescript
import { DiscordPresence } from 'react-discord-presence';
import discordPresenceClasses from 'react-discord-presence/dist/style/DiscordPresenceDefault.module.css';
import customClasses from './DiscordPresenceCustom.module.css';
// ...
<DiscordPresence
  classes={Object.assign({}, discordPresenceClasses, customClasses}}
  data={apiData}
/>
```
## Development

Written in typescript. Workflows are defined in `.envrc.sh`.

## External Resources

- [Schema Lanyard API Discord Presence](https://github.com/Nate-Wilkins/schema-lanyard-discord-presence):
- [Lanyard API](https://github.com/Phineas/lanyard): REST and WS API that provides Discord presence data.
- [Discord CDN Alternative](https://gist.github.com/dustinrouillard/04be36180ed80db144a4857408478854)

## Roadmap

### Display

- Add backround color (statusBorder) to secondary image of activity.
- Support for light theme.
- Support for screencapture of storybook components.
- Support for failing image downloads/errors.
- Support for Spotify.
- Support for overflow in activities & activity details? Should this be a custom scrollbar?
- Add tails to hover popovers.

### Accessor

- Support for realtime presence data with the web socket API.
- Support for automated queries on an interval.
