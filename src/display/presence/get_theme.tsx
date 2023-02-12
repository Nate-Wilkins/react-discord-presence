import Color from 'color';

/*
 * Get color lighten step.
 */
const getColorLightnessStep = (
  color: Color,
  totalSteps: number,
  step: number,
) => {
  const remainder = 100 - color.lightness();
  return (step / totalSteps) * remainder;
};

/*
 * Get color darken step.
 */
const getColorDarkenStep = (color: Color, totalSteps: number, step: number) => {
  const remainder = color.lightness();
  return (step / totalSteps) * remainder;
};

/*
 * Get theme colors.
 *
 * This is a best estimate of how the theming function is that Discord uses.
 */
export const getTheme = (theme: { primary: string; accent: string }) => {
  const totalSteps = 40; // How many content boxes there are overlayed in the DOM.
  const colorPrimary = Color(theme.primary);
  const colorAccent = Color(theme.accent);

  // Root Colors.
  const rootColor = colorPrimary.isDark() ? '#ffffff' : 'rgb(6, 6, 7)';
  const rootPrimaryBackgroundColorStepDark = 2;
  const rootPrimaryBackgroundColorStepLight = 19;
  const rootPrimaryBackgroundColor = !colorPrimary.isDark()
    ? colorPrimary.lightness(
        colorPrimary.lightness() +
          getColorLightnessStep(
            colorPrimary,
            totalSteps,
            rootPrimaryBackgroundColorStepLight,
          ),
      )
    : colorPrimary.lightness(
        colorPrimary.lightness() -
          getColorDarkenStep(
            colorPrimary,
            totalSteps,
            rootPrimaryBackgroundColorStepDark,
          ),
      );
  const rootAccentBackgroundColor = !colorAccent.isDark()
    ? colorAccent.lightness(
        colorAccent.lightness() +
          getColorLightnessStep(
            colorAccent,
            totalSteps,
            rootPrimaryBackgroundColorStepLight,
          ),
      )
    : colorAccent.lightness(
        colorAccent.lightness() -
          getColorDarkenStep(
            colorAccent,
            totalSteps,
            rootPrimaryBackgroundColorStepDark,
          ),
      );

  // Content Colors.
  const contentPrimaryBackgroundColorStepLight = 20;
  const contentPrimaryBackgroundColorStepDark = 24;
  const contentPrimaryBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() +
          getColorLightnessStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepLight,
          ),
      )
    : rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() -
          getColorDarkenStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepDark,
          ),
      );
  const contentAccentBackgroundColor = !rootAccentBackgroundColor.isDark()
    ? rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() +
          getColorLightnessStep(
            rootAccentBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepLight,
          ),
      )
    : rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() -
          getColorDarkenStep(
            rootAccentBackgroundColor,
            totalSteps,
            contentPrimaryBackgroundColorStepDark,
          ),
      );

  // Name Plate Colors.
  const namePlatePrimaryBackgroundColorStepLight = 34;
  const namePlatePrimaryBackgroundColorStepDark = 32;
  const namePlatePrimaryBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() +
          getColorLightnessStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepLight,
          ),
      )
    : rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() -
          getColorDarkenStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepDark,
          ),
      );
  const namePlateAccentBackgroundColor = !rootAccentBackgroundColor.isDark()
    ? rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() +
          getColorLightnessStep(
            rootAccentBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepLight,
          ),
      )
    : rootAccentBackgroundColor.lightness(
        rootAccentBackgroundColor.lightness() -
          getColorDarkenStep(
            rootAccentBackgroundColor,
            totalSteps,
            namePlatePrimaryBackgroundColorStepDark,
          ),
      );
  const namePlateNameColor = rootColor;
  const namePlateNameIdColor = !rootPrimaryBackgroundColor.isDark()
    ? 'rgba(79, 86, 96, 1)'
    : 'rgba(185, 185, 185, 1)';

  // Spotify Progress Bar Colors.
  const spotifyProgressBarBackgroundColorStepLight = 26;
  const spotifyProgressBarBackgroundColorStepDark = 26;
  const spotifyProgressBarTotalBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() +
          getColorLightnessStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            spotifyProgressBarBackgroundColorStepLight,
          ),
      )
    : rootPrimaryBackgroundColor.lightness(
        rootPrimaryBackgroundColor.lightness() -
          getColorDarkenStep(
            rootPrimaryBackgroundColor,
            totalSteps,
            spotifyProgressBarBackgroundColorStepDark,
          ),
      );
  const spotifyProgressBarProgressBackgroundColor = rootColor;

  // Theme normalized.
  return {
    // Colors.
    primary: colorPrimary,
    accent: colorAccent,

    // Elements.
    root: {
      color: rootColor,
      backgroundColor: {
        primary: rootPrimaryBackgroundColor.hsl().string(),
        accent: rootAccentBackgroundColor.hsl().string(),
      },
    },
    content: {
      backgroundColor: {
        primary: contentPrimaryBackgroundColor.hsl().string(),
        accent: contentAccentBackgroundColor.hsl().string(),
      },
    },
    namePlate: {
      backgroundColor: {
        primary: namePlatePrimaryBackgroundColor.hsl().string(),
        accent: namePlateAccentBackgroundColor.hsl().string(),
      },
    },
    namePlateName: {
      color: namePlateNameColor,
    },
    namePlateNameId: { color: namePlateNameIdColor },
    spotifyProgressBar: {
      total: {
        backgroundColor: spotifyProgressBarTotalBackgroundColor.hsl().string(),
      },
      progress: {
        backgroundColor: spotifyProgressBarProgressBackgroundColor,
      },
    },
  };
};
