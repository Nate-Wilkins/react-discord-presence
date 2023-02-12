import { render, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { createLanyardApiData } from '../test/create_lanyard_api_data';
import { discord } from './api';
import { DiscordPresence } from './DiscordPresence';

const defaultClasses = {};

test('when using Discord presence component', async () => {
  // Given the Discord presence component.
  // And the user has a developer id.
  const developerId = '123';

  // And the Lanyard API server is providing valid data.
  const mockDataLanyard = {
    ...createLanyardApiData({ developerId }),
  };
  fetchMock.get(`${discord.Endpoints.V1ApiLanyard}/users/${developerId}`, {
    success: true,
    data: mockDataLanyard,
  });

  // And the CDN API server is providing valid data.
  const mockDataCdn = {
    user: {
      id: developerId,
      banner_color: '#f32010',
      accent_color: '#f32010',
      bio: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    },
  };
  fetchMock.get(
    `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
    mockDataCdn,
  );

  // And the user has overrides for Discord presence data (possibly not provided by the APIs).
  const data = {
    theme: {
      primary: 'rgba(38, 114, 195, 1)',
      accent: 'rgba(0, 26, 48, 1)',
    },
    premiumMemberSince: 'April 10, 2022',
    memberSince: 'June 21, 2016',
  };

  // When using the component.
  const queries = render(
    <DiscordPresence
      classes={defaultClasses}
      args={{ developerId }}
      data={data}
    />,
  );

  // Then the Discord presence is rendered.
  // Then the Discord presence will show a progress indicator while loading.
  queries.getByTestId('progress');
  // Then the Discord presence progress indicator will be removed.
  await waitForElementToBeRemoved(() => queries.getByTestId('progress'));
  // Then the Discord presence contains the user's Discord username.
  const $nameTag = queries.getByText(/nate-wilkins/);
  expect($nameTag).toBeTruthy();
});

test('when using Discord presence component with invalid Lanyard API data', async () => {
  // Given the Discord presence component.
  // And the user has a developer id.
  const developerId = '123';

  // And the Lanyard API server is providing invalid data.
  const mockDataLanyard = {
    ...createLanyardApiData({ developerId }),
    // Invalid property.
    discord_user: {},
  };
  fetchMock.get(`${discord.Endpoints.V1ApiLanyard}/users/${developerId}`, {
    success: true,
    data: mockDataLanyard,
  });

  // And the CDN API server is providing valid data.
  const mockDataCdn = {
    user: {
      id: developerId,
      bio: `Software Engineer.  Skier/Snowboarder. Photographer. Gamer.
NY 🌆 CA 🌁
PGP: F0EC3EA278223282B26CA4C1AAA34B2FC4B660C6`,
    },
  };
  fetchMock.get(
    `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
    mockDataCdn,
  );

  // And the user has overrides for Discord presence data (possibly not provided by the APIs).
  const data = {
    theme: {
      primary: 'rgba(38, 114, 195, 1)',
      accent: 'rgba(0, 26, 48, 1)',
    },
    premiumMemberSince: 'April 10, 2022',
    memberSince: 'June 21, 2016',
  };

  // When using the component.
  const queries = render(
    <DiscordPresence
      classes={defaultClasses}
      args={{ developerId }}
      data={data}
    />,
  );

  // Then the Discord presence error state is rendered.
  await queries.findByText('Sorry, An Error Has Occurred');
  expect(
    queries.getByText(/Unexpected response from Lanyard API\./),
  ).toBeTruthy();
});

test('when using Discord presence component with invalid Discord CDN API data', async () => {
  // Given the Discord presence component.
  // And the user has a developer id.
  const developerId = '123';

  // And the Lanyard API server is providing valid data.
  const mockDataLanyard = {
    ...createLanyardApiData({ developerId }),
  };
  fetchMock.get(`${discord.Endpoints.V1ApiLanyard}/users/${developerId}`, {
    success: true,
    data: mockDataLanyard,
  });

  // And the CDN API server is providing invalid data.
  const mockDataCdn = {
    // Missing properties.
  };
  fetchMock.get(
    `${discord.Endpoints.V1ApiDiscordCdnAlternative}/profile/${developerId}`,
    mockDataCdn,
  );

  // And the user has overrides for Discord presence data (possibly not provided by the APIs).
  const data = {
    theme: {
      primary: 'rgba(38, 114, 195, 1)',
      accent: 'rgba(0, 26, 48, 1)',
    },
    premiumMemberSince: 'April 10, 2022',
    memberSince: 'June 21, 2016',
  };

  // When using the component.
  const queries = render(
    <DiscordPresence
      classes={defaultClasses}
      args={{ developerId }}
      data={data}
    />,
  );

  // Then the Discord presence error state is rendered.
  await queries.findByText('Sorry, An Error Has Occurred');
  expect(
    queries.getByText(/Unexpected response from Discord CDN API\./),
  ).toBeTruthy();
});
