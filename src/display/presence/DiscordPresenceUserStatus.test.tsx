import { render } from '@testing-library/react';
import React from 'react';
import { DiscordPresenceUserStatus } from './DiscordPresenceUserStatus';

const defaultClasses = {};

test('when using the Discord presence user status component with the user offline', async () => {
  // Given the Discord presence user status component.
  // And the user is offline.
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus classes={defaultClasses} data={data} />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('offline');
});

test('when using the Discord presence user status component with the user online for desktop', async () => {
  // Given the Discord presence user status component.
  // And the user is online for desktop.
  const data = {
    active_on_discord_desktop: true,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus classes={defaultClasses} data={data} />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-desktop');
});

test('when using the Discord presence user status component with the user online for web', async () => {
  // Given the Discord presence user status component.
  // And the user is online for web.
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: true,
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus classes={defaultClasses} data={data} />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-web');
});

test('when using the Discord presence user status component with the user online for mobile', async () => {
  // Given the Discord presence user status component.
  // And the user is online for mobile.
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: true,
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus classes={defaultClasses} data={data} />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-web');
});
