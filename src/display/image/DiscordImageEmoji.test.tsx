import { render } from '@testing-library/react';
import React from 'react';
import { DiscordImageEmoji } from './DiscordImageEmoji';
import DiscordPresenceClassesDefault from '../style/DiscordPresenceDefault.module.css';

test('when using the basic Discord image emoji', async () => {
  // Given the Discord image emoji component.
  // And a emoji id
  const id = '49n2j';

  // When using the component.
  const queries = render(
    <DiscordImageEmoji
      className={DiscordPresenceClassesDefault.emoji}
      id={id}
      animated={false}
      width={32}
      height={32}
    />,
  );

  // Then the Discord image emoji is rendered.
  const $img = queries.getByRole('img');
  expect($img.getAttribute('src')).toEqual(
    `https://cdn.Discordapp.com/emojis/${id}.png`,
  );
});

test('when using the animated Discord image emoji', async () => {
  // Given the Discord image emoji component.
  // And a emoji id
  const id = '49n2j';

  // When using the component.
  const queries = render(
    <DiscordImageEmoji
      className={DiscordPresenceClassesDefault.emoji}
      id={id}
      animated
      width={32}
      height={32}
    />,
  );

  // Then the Discord image emoji is rendered.
  const $img = queries.getByRole('img');
  expect($img.getAttribute('src')).toEqual(
    `https://cdn.Discordapp.com/emojis/${id}.gif`,
  );
});
