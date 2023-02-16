import { render } from '@testing-library/react';
import React from 'react';
import { DiscordPresenceUserStatus } from './DiscordPresenceUserStatus';
import DiscordPresenceClassesDefault from '../style/DiscordPresenceDefault.module.css';

test('when using the Discord presence user status component with the user "Offline"', async () => {
  // Given the Discord presence user status component.
  // And the user is "Offline".
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
    discord_status: 'offline',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('offline');
});

test('when using the Discord presence user status component with the user "Online" for desktop', async () => {
  // Given the Discord presence user status component.
  // And the user is "Online" for desktop.
  const data = {
    active_on_discord_desktop: true,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
    discord_status: 'online',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-desktop');
});

test('when using the Discord presence user status component with the user "Online" for web', async () => {
  // Given the Discord presence user status component.
  // And the user is "Online" for web.
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: true,
    discord_status: 'online',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-web');
});

test('when using the Discord presence user status component with the user "Online" for mobile', async () => {
  // Given the Discord presence user status component.
  // And the user is "Online" for mobile.
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: true,
    discord_status: 'online',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('online-web');
});

test('when using the Discord presence user status component with the user "Idle"', async () => {
  // Given the Discord presence user status component.
  // And the user is set to "Idle".
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
    discord_status: 'idle',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('idle');
});

test('when using the Discord presence user status component with the user in "Do Not Disturb"', async () => {
  // Given the Discord presence user status component.
  // And the user is set to "Do Not Disturb".
  const data = {
    active_on_discord_desktop: false,
    active_on_discord_mobile: false,
    active_on_discord_web: false,
    discord_status: 'dnd',
  };

  // When using the component.
  const queries = render(
    <DiscordPresenceUserStatus
      classes={DiscordPresenceClassesDefault}
      data={data}
    />,
  );

  // Then the Discord presence user status is rendered.
  const $status = queries.baseElement.querySelector('[data-status]');
  expect($status?.getAttribute('data-status')).toEqual('dnd');
});
