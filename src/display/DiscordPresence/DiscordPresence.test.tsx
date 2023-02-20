import { render } from '@testing-library/react';
import React from 'react';
import { createLanyardApiData } from '../../../test/create_lanyard_api_data';
import { DiscordPresence } from './DiscordPresence';
import { ThemeDiscordPresence } from './ThemeDiscordPresence';
import DiscordPresenceClassesDefault from '../style/DiscordPresenceDefault.module.css';

test('when using Discord presence component', async () => {
  // Given Discord presence component.
  // And Discord presence data.
  const data = {
    ...createLanyardApiData({ developerId: '345' }),
    aboutMe: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    memberSince: new Date('6/21/2016'),
    premiumMemberSince: new Date('4/10/2022'),
  };

  // When using the component.
  const queries = render(
    <ThemeDiscordPresence
      classes={DiscordPresenceClassesDefault}
      theme={{
        primary: 'rgba(38, 114, 195, 1)',
        accent: 'rgba(0, 26, 48, 1)',
      }}
    >
      <DiscordPresence data={data} />
    </ThemeDiscordPresence>,
  );

  // Then the Discord presence is rendered.
  // Then the Discord presence contains the user's discord username.
  const $nameTag = await queries.findByText(/nate-wilkins/);
  expect($nameTag).toBeTruthy();
});
