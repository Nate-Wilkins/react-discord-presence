import { render } from '@testing-library/react';
import React from 'react';
import { MarkdownDiscordTime } from './MarkdownDiscordTime';

test(`when using the markdown Discord time with a format of 'd'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'd'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="d" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('04/10/1994');
});

test(`when using the markdown Discord time with a format of 'f'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'f'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="f" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('April 10, 1994 6:26 PM');
});

test(`when using the markdown Discord time with a format of 't'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 't'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="t" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('6:26 PM');
});

test(`when using the markdown Discord time with a format of 'D'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'D'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="D" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('April 10, 1994');
});

test(`when using the markdown Discord time with a format of 'F'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'F'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="F" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('Sunday, April 10, 1994 6:26 PM');
});

test(`when using the markdown Discord time with a format of 'R'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'R'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="R" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('Over 30 years ago');
});

test(`when using the markdown Discord time with a format of 'T'`, async () => {
  // Given the markdown Discord time component.
  // And a timestamp.
  const timestamp = 766016789000;

  // When using the component with a format of 'T'.
  const queries = render(
    <MarkdownDiscordTime timestamp={timestamp} format="T" />,
  );

  // Then the markdown Discord time format is rendered.
  const $root = queries.baseElement;
  expect($root.textContent).toEqual('6:26:29 PM');
});
