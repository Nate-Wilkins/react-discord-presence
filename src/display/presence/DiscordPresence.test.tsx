import { render } from '@testing-library/react';
import React from 'react';
import { createLanyardApiData } from '../../../test/create_lanyard_api_data';
import { DiscordPresence } from './DiscordPresence';

const defaultClasses = {};

test('when using Discord presence component', async () => {
  // Given Discord presence component.
  // And Discord presence data.
  const data = {
    ...createLanyardApiData({ developerId: '345' }),
    theme: {
      primary: 'rgba(38, 114, 195, 1)',
      accent: 'rgba(0, 26, 48, 1)',
    },
    aboutMe: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    memberSince: 'June 21, 2016',
    premiumMemberSince: 'April 10, 2022',
  };

  // When using the component.
  const queries = render(
    <DiscordPresence classes={defaultClasses} data={data} />,
  );

  // Then the Discord presence is rendered.
  // Then the Discord presence contains the user's discord username.
  const $nameTag = queries.getByText(/nate-wilkins/);
  expect($nameTag).toBeTruthy();
});
