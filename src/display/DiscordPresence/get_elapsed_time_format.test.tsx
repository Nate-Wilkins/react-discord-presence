import { addHours, addMinutes, addSeconds } from 'date-fns';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

test(`when getting the elapsed time format for 'clock'`, async () => {
  // Given two date times.
  const d1 = new Date();
  const d2 = addHours(d1, 5);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'clock');

  // Then the elapsed time format is returned.
  expect(output).toBe('05:00:00');
});

test(`when getting the elapsed time format for 'stopwatch'`, async () => {
  // Given two date times.
  const d1 = new Date();
  const d2 = addSeconds(addMinutes(d1, 5), 4);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'stopwatch');

  // Then the elapsed time format is returned.
  expect(output).toBe('5:04');
});

test(`when getting the elapsed time format for 'human'`, async () => {
  // Given two date times.
  const d1 = new Date();
  const d2 = addHours(d1, 5);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'human');

  // Then the elapsed time format is returned.
  expect(output).toBe('5 hours ago');
});
