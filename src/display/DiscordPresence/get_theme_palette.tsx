import Color from 'color';

export type ThemePalette = {
  // Colors.
  primary: Color;
  accent: Color;

  // Elements.
  root: {
    color: string;
    backgroundColor: {
      primary: string;
      accent: string;
    };
  };
  content: {
    backgroundColor: {
      primary: string;
      accent: string;
    };
  };
  namePlate: {
    backgroundColor: {
      primary: string;
      accent: string;
    };
  };
  namePlateName: {
    color: string;
  };
  namePlateNameId: { color: string };
  spotifyProgressBar: {
    total: {
      backgroundColor: string;
    };
    progress: {
      backgroundColor: string;
    };
  };
  popover: { color: string; backgroundColor: string; boxShadowColor: string };
  blockquoteBorder: { color: string };
  spoiler: { color: string; backgroundColor: string };
  timestamp: { backgroundColor: string };
};

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
 * Get theme palette colors.
 *
 * This is a best estimate of how the theming function is that Discord uses.
 *
 * TODO: Honestly, blending modes would make this easier and more maintainable.
 */
export const getThemePalette = (theme: {
  primary: string;
  accent: string;
}): ThemePalette => {
  const totalSteps = 40; // How many content boxes there are overlayed in the DOM.
  const colorPrimary = Color(theme.primary);
  const colorAccent = Color(theme.accent);

  // Root Colors.
  const rootColor = colorPrimary.isDark()
    ? Color('#ffffff')
    : Color('rgb(6, 6, 7)');
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
    ? Color('rgba(79, 86, 96, 1)')
    : Color('rgba(185, 185, 185, 1)');

  // Popover Colors.
  const popoverBackgroundColor = Color('#202225');
  const popoverColor = Color('rgba(255, 255, 255, 1)');

  // Spotify Progress Bar Colors.
  const spotifyProgressBarTotalBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? Color(namePlateNameIdColor).alpha(0.2)
    : Color(namePlateNameIdColor).alpha(0.15);
  const spotifyProgressBarProgressBackgroundColor = rootColor;

  // Blockquote Colors.
  const blockquoteBorderColor = !rootPrimaryBackgroundColor.isDark()
    ? namePlateNameIdColor.lighten(1.35)
    : namePlateNameIdColor.darken(0.6);

  // Spoiler Colors.
  const spoilerColor = Color('rgba(255, 255, 255, 1)');
  const spoilerBackgroundColor = Color('rgba(0, 0, 0, 1)');

  // Timestamp Colors.
  const timestampBackgroundColor = !rootPrimaryBackgroundColor.isDark()
    ? namePlateNameIdColor.lighten(1.5)
    : namePlateNameIdColor.darken(0.6);

  // Theme normalized.
  return {
    // Colors.
    primary: colorPrimary,
    accent: colorAccent,

    // Elements.
    root: {
      color: rootColor.hsl().toString(),
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
      color: namePlateNameColor.hsl().toString(),
    },
    namePlateNameId: { color: namePlateNameIdColor.hsl().string() },
    popover: {
      color: popoverColor.hsl().toString(),
      backgroundColor: popoverBackgroundColor.hsl().toString(),
      boxShadowColor: popoverBackgroundColor
        .alpha(0.85)
        .hsl()
        .toString(),
    },
    spotifyProgressBar: {
      total: {
        backgroundColor: spotifyProgressBarTotalBackgroundColor.hsl().string(),
      },
      progress: {
        backgroundColor: spotifyProgressBarProgressBackgroundColor
          .hsl()
          .toString(),
      },
    },
    blockquoteBorder: { color: blockquoteBorderColor.hsl().string() },
    spoiler: {
      color: spoilerColor.hsl().toString(),
      backgroundColor: spoilerBackgroundColor.hsl().toString(),
    },
    timestamp: { backgroundColor: timestampBackgroundColor.hsl().string() },
  };
};
