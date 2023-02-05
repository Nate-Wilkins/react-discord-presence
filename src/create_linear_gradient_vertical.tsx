/*
 * Creates a consistent CSS linear gradient for Discord presence.
 *
 * @param color1 - CSS color.
 * @param turnPoint - Ratio.
 * @param color2 - CSS color.
 */
export const createLinearGradientVertical = (
  color1: string,
  turnPoint: number,
  color2: string,
) => {
  return `linear-gradient(180deg, ${color1} ${turnPoint *
    100}%, ${color2} 100%)`;
};
