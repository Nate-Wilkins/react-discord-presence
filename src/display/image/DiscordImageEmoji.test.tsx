import { render } from '@testing-library/react';
import React from 'react';
import { DiscordImageEmoji } from './DiscordImageEmoji';
import DiscordPresenceClassesDefault from '../style/DiscordPresenceDefault.module.css';

test('when using the basic discord image emoji', async () => {
  // Given discord image emoji component.
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

  // Then the discord image emoji is rendered.
  const $img = queries.getByRole('img');
  expect($img.getAttribute('src')).toEqual(
    `https://cdn.discordapp.com/emojis/${id}.png`,
  );
});

test('when using the animated discord image emoji', async () => {
  // Given discord image emoji component.
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

  // Then the discord image emoji is rendered.
  const $img = queries.getByRole('img');
  expect($img.getAttribute('src')).toEqual(
    `https://cdn.discordapp.com/emojis/${id}.gif`,
  );
});
