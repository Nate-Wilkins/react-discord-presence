import { render } from '@testing-library/react';
import React from 'react';
import { DiscordImageEmoji } from './DiscordImageEmoji';

const defaultClasses = {};

test('when using the basic discord image emoji', async () => {
  // Given discord image emoji component.
  // And a emoji id
  const id = '49n2j';

  // When using the component.
  const queries = render(
    <DiscordImageEmoji classes={defaultClasses} id={id} animated={false} />,
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
    <DiscordImageEmoji classes={defaultClasses} id={id} animated />,
  );

  // Then the discord image emoji is rendered.
  const $img = queries.getByRole('img');
  expect($img.getAttribute('src')).toEqual(
    `https://cdn.discordapp.com/emojis/${id}.gif`,
  );
});
