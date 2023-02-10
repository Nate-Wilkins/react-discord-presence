import { render, waitFor } from '@testing-library/react';
import { AccessorQuery } from 'data-accessor';
import { DiscordPresence } from 'schema-lanyard-discord-presence';
import fetchMock from 'fetch-mock';
import React from 'react';
import { createLanyardApiData } from '../../test/create_lanyard_api_data';
import { discord } from '../api';
import { Boundary } from '../Boundary';
import {
  AccessorGetDiscordPresence,
  CacheStoreDiscordPresence,
  createCache,
} from './AccessorGetDiscordPresence';

const createCacheStore = (): CacheStoreDiscordPresence => {
  const cacheStore = {
    ...AccessorQuery.createCache(setter => {
      setter(cacheStore);
    }),
    ...createCache(),
  };
  return cacheStore;
};

test('when using the accessor get discord presence with valid API data', async () => {
  // Given the accessor get discord presence component.
  // And there's a error handler.
  const mockErrorHandler = jest.fn();

  // And a place to store discord presence data.
  const cacheStore = createCacheStore();

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

  // When using the component.
  const queries = render(
    <Boundary whenLoading={null} whenErroring={mockErrorHandler}>
      <AccessorGetDiscordPresence
        cache={() => cacheStore}
        args={{ developerId }}
      >
        {({ data }) => {
          return data ? (
            // prettier-ignore
            <code data-testid="code" style={{ whiteSpace: 'pre' }}>{JSON.stringify(data, null, '  ')}</code>
          ) : null;
        }}
      </AccessorGetDiscordPresence>
    </Boundary>,
  );

  // Then the accessor get discord presence gets the data.
  await waitFor(async () => {
    const $code = queries.getByTestId('code');
    expect($code.textContent).toBe(
      JSON.stringify(
        {
          ...mockDataLanyard,
          ...{
            aboutMe: mockDataCdn.user.bio,
          },
        },
        null,
        '  ',
      ),
    );
  });

  // Then the error handler is never called.
  expect(mockErrorHandler).not.toHaveBeenCalled();
});

test('when using the accessor get discord presence with invalid CDN API data', async () => {
  // Given the accessor get discord presence component.
  // And a place to store discord presence data.
  const cacheStore = createCacheStore();

  // And the user has a developer id.
  const developerId = '123';

  // And the Lanyard API server is providing valid data.
  const mockDataLanyard: DiscordPresence = {
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

  // When using the component.
  const mockRender = jest.fn();
  const queries = render(
    <Boundary
      whenLoading={null}
      whenErroring={({ error }) => (
        <div data-testid="error">
          {typeof error === 'string' ? error : error.message}
        </div>
      )}
    >
      <AccessorGetDiscordPresence
        cache={() => cacheStore}
        args={{ developerId }}
      >
        {({ data }) => (
          // Trigger accessor.
          <>{!data || !data.discord_user ? mockRender() : mockRender()}</>
        )}
      </AccessorGetDiscordPresence>
    </Boundary>,
  );

  // Then the accessor get discord presence errors when getting the data.
  await waitFor(async () => {
    const $div = queries.getByTestId('error');
    expect($div.textContent).toBe(
      'Unexpected response from Discord CDN API.\n\n' +
        `Error: Unable to find Discord presence for user '${developerId}'.`,
    );
  });

  // Then the component's children never render with data populated.
  expect(mockRender).not.toHaveBeenCalled();
});

test('when using the accessor get discord presence with invalid Lanyard API data', async () => {
  // Given the accessor get discord presence component.
  // And a place to store discord presence data.
  const cacheStore = createCacheStore();

  // And the user has a developer id.
  const developerId = '123';

  // And the Lanyard API server is providing invalid data.
  const mockDataLanyard = {
    // Missing properties.
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

  // When using the component.
  const mockRender = jest.fn();
  const queries = render(
    <Boundary
      whenLoading={null}
      whenErroring={({ error }) => (
        <div data-testid="error">
          {typeof error === 'string' ? error : error.message}
        </div>
      )}
    >
      <AccessorGetDiscordPresence
        cache={() => cacheStore}
        args={{ developerId }}
      >
        {({ data }) => (
          // Trigger accessor.
          <>{!data || !data.discord_user ? mockRender() : mockRender()}</>
        )}
      </AccessorGetDiscordPresence>
    </Boundary>,
  );

  // Then the accessor get discord presence errors when getting the data.
  await waitFor(async () => {
    const $div = queries.getByTestId('error');
    expect($div.textContent).toBe(
      'Unexpected response from Lanyard API.\n\n' +
        `ValidationError: active_on_discord_desktop must be defined`,
    );
  });

  // Then the component's branches never render with data populated.
  expect(mockRender).not.toHaveBeenCalled();
});
