import { addHours, addMinutes, addSeconds } from 'date-fns';
import { getElapsedTimeFormat } from './get_elapsed_time_format';

test(`when getting the elapsed time format for 'clock'`, async () => {
  // Given two date times.
  const d2 = new Date();
  const d1 = addHours(d2, 5);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'clock');

  // Then the elapsed time format is returned.
  expect(output).toBe('05:00:00');
});

test(`when getting the elapsed time format for 'stopwatch'`, async () => {
  // Given two date times.
  const d2 = new Date();
  const d1 = addSeconds(addMinutes(d2, 5), 4);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'stopwatch');

  // Then the elapsed time format is returned.
  expect(output).toBe('5:04');
});

test(`when getting the elapsed time format for 'human'`, async () => {
  // Given two date times.
  const d2 = new Date();
  const d1 = addHours(d2, 5);

  // When getting the elapsed time format.
  const output = getElapsedTimeFormat(d1, d2, 'human');

  // Then the elapsed time format is returned.
  expect(output).toBe('About 5 hours');
});
