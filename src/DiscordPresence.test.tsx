import { render } from '@testing-library/react';
import React from 'react';
import { createLanyardApiData } from '../test/create_lanyard_api_data';
import { DiscordPresence } from './DiscordPresence';

const defaultClasses = {};

const defaultTheme = {
  primary: 'rgba(38, 114, 195, 1)',
  accent: 'rgba(0, 26, 48, 1)',
};

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
