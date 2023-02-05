# react-discord-presence

[![Version](http://img.shields.io/npm/v/react-discord-presence.svg?style=flat-square)](https://www.npmjs.org/package/react-discord-presence)
[![Build](https://img.shields.io/travis/Nate-Wilkins/react-discord-presence/main?style=flat-square)](https://app.travis-ci.com/github/Nate-Wilkins/react-discord-presence)
[![Open Issues](https://img.shields.io/github/issues-raw/Nate-Wilkins/react-discord-presence?style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/issues)
[![License](https://img.shields.io/github/license/Nate-Wilkins/react-discord-presence?color=%2308F&style=flat-square)](https://github.com/Nate-Wilkins/react-discord-presence/blob/main/LICENSE)

> Display your discord presence in react.

```
yarn add react-discord-presence
```

## Usage

In a `react` with CSS modules you just need to include the component:

```typescript
import classes from 'react-discord-presence/DiscordPresenceDefault.module.css';
// ...
<DiscordPresence
  classes={Object.assign(classes, classesCustom)}
  theme={{
    primary: 'rgba(38, 114, 195, 1)',
    accent: 'rgba(0, 26, 48, 1)',
  }}
  data={{
    // Trigger Lazy Load.
    ...JSON.parse(JSON.stringify(data)),
    status: 'online',
    background: {
      src: background,
      width: 1450,
      height: 350,
    },
    badges: [
      {
        src: discord_badge_hypesquad_bravery,
        width: 21,
        height: 21,
      },
      {
        src: discord_badge_subscriber_since,
        width: 256,
        height: 256,
      },
      {
        src: discord_badge_boosting_1month,
        width: 18,
        height: 17,
      },
    ],
    aboutMe: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    memberSince: 'June 21, 2016',
  }}
/>
```

