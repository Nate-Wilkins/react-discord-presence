import { render } from '@testing-library/react';
import {
  DiscordPresence as IDiscordPresence,
  SchemaDiscordPresence,
} from 'schema-lanyard-discord-presence';
import React from 'react';
import { DiscordPresence } from './DiscordPresence';

const defaultClasses = {};

const defaultTheme = {
  primary: 'rgba(38, 114, 195, 1)',
  accent: 'rgba(0, 26, 48, 1)',
};

const createLanyardApiData = (): IDiscordPresence =>
  SchemaDiscordPresence.validateSync({
    spotify: null,
    listening_to_spotify: false,
    kv: {},
    discord_user: {
      username: 'nate-wilkins',
      public_flags: 64,
      id: '194976024457510912',
      display_name: null,
      discriminator: '5455',
      bot: false,
      avatar_decoration: null,
      avatar: 'abe8b7a14d105e50135dc08c9611d380',
    },
    discord_status: 'online',
    activities: [
      {
        type: 4,
        state: '😼',
        name: 'Custom Status',
        id: 'custom',
        emoji: {
          name: 'eyesshaking',
          id: '662645652668547083',
          animated: true,
        },
        created_at: 1675542370754,
      },
      {
        type: 0,
        timestamps: {
          start: 1675547220000,
        },
        state: 'Editing DiscordPresence.test.tsx',
        name: 'Neovim',
        id: 'adcc4377e4f48e4d',
        details: 'Working on react-discord-presence',
        created_at: 1675547708661,
        assets: {
          small_text: 'React',
          small_image: '794715645786587137',
          large_text: 'Neovide',
          large_image: '794715651365273600',
        },
        application_id: '793271441293967371',
      },
    ],
    active_on_discord_web: false,
    active_on_discord_mobile: false,
    active_on_discord_desktop: true,
  });

test('when using discord presence component', async () => {
  // Given discord presence component.
  // And discord presence data.
  const data = {
    ...createLanyardApiData(),

    // TODO: The lanyard API has some of this data.
    status: 'online',
    background: {
      src: './banner.gif',
      width: 1450,
      height: 350,
    },
    badges: [
      {
        src: './badge_0.webp',
        width: 21,
        height: 21,
      },
      {
        src: './badge_1.webp',
        width: 256,
        height: 256,
      },
      {
        src: './badge_2.webp',
        width: 18,
        height: 17,
      },
    ],
    aboutMe: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    memberSince: 'June 21, 2016',
  };

  // When using the component.
  const queries = render(
    <DiscordPresence
      classes={defaultClasses}
      data={data}
      theme={defaultTheme}
    />,
  );

  // Then the discord presence is rendered.
  // Then the discord presence contains the user's discord username.
  const $nameTag = queries.getByText(/nate-wilkins/);
  expect($nameTag).toBeTruthy();
});
