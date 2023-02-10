# Customization

## Styling

- `DiscordPresenceCode.module.css`

```typescript
import { DiscordPresence } from 'react-discord-presence';
import discordPresenceClasses from 'react-discord-presence/dist/style/DiscordPresenceDefault.module.css';
import discordPresenceCodeClasses from 'react-discord-presence/dist/style/DiscordPresenceCode.module.css';
// ...
<DiscordPresence
  classes={Object.assign({}, discordPresenceClasses, discordPresenceCodeClasses}}
  args={{ developerId: "<your-developer-id>" }}
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
  args={{ developerId: "<your-developer-id>" }}
/>
```

## Data Access

The main entry point is great for embedded, self contained, components but if you want more fine
grained controls then you can use the composing components.

- `AccessorGetDiscordPresence`: Used to access Discord presence data from various public facing APIs.

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

- `Boundary`: Used to contain the error and loading states of the component. You can disregard this if you already have
  error and loading state handlers. (`ErrorBoundary` and `Suspense` components).
- `LoadingDiscordPresence`: Used to display a loading indicator when the `AccessorGetDiscordPresence` is retrieving data.
- `ErrorDiscordPresence`: Used to display errors that may occur within the `Boundary`.
- `DisplayDiscordPresence`: Used to display Discord presence data.
- `defaultTheme`: Has to be provided to set background color of error and loading components (no theme if no data is loaded).

```typescript
import { AccessorQuery } from 'data-accessor';
import {
  Boundary,
  AccessorGetDiscordPresence,
  ErrorDiscordPresence,
  DisplayDiscordPresence,
  createCache
} from 'react-accessor-discord-presence';
// ...
const createCache = () => {
  const cacheStore = {
    ...AccessorQuery.createCache(setter => {
      setter(cacheStore);
    }),
    ...createCache(),
  };
  return cacheStore;
};
// ...
<Boundary
  whenLoading={
    <LoadingDiscordPresence classes={classes} theme={defaultTheme} />
  }
  whenErroring={({ error }) => (
    <ErrorDiscordPresence
      classes={classes}
      theme={defaultTheme}
      error={error}
    />
  )}
>
  <AccessorGetDiscordPresence
    cache={() => cache}
    args={{ developerId: "<your-developer-id>" }}
  >
    {({ data }) =>
      !data || !data.discord_user ? (
        <ErrorDiscordPresence />
      ) : (
        <DisplayDiscordPresence
          classes={classes}
          data={data}
        />
      )
    }
  </AccessorGetDiscordPresence>
</Boundary>
