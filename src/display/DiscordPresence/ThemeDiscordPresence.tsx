import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { DiscordPresenceClassesDefault } from '../style';
import { getThemePalette, ThemePalette } from './get_theme_palette';

type Theme = {
  primary: string;
  accent: string;
};

export const ThemeProviderContext = createContext<null | {
  classes?: Record<string, string>;
  theme: ThemePalette;
  setTheme: (theme: Theme) => void;
}>(null);

/*
 * Discord presence theme provider.
 *
 * Used to provide default styles and a "theme" palette.
 */
export const ThemeDiscordPresence: FunctionComponent<{
  classes?: Record<string, string>;
  theme: { primary: string; accent: string };
  children: ReactNode;
}> = ({ classes, theme: inputTheme, children }) => {
  const [theme, setTheme] = useState(getThemePalette(inputTheme));

  /*
   * Sets the current theme.
   */
  const onSetTheme = useCallback(
    (inputTheme: { primary: string; accent: string }) => {
      setTheme(getThemePalette(inputTheme));
    },
    [],
  );

  return (
    <ThemeProviderContext.Provider
      value={{ classes, theme, setTheme: onSetTheme }}
    >
      <div
        className={cn(DiscordPresenceClassesDefault.root, classes?.root)}
        style={{
          color: theme.root.color,
        }}
      >
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
};

/*
 * Discord presence theme override.
 *
 * Used to override the `ThemeDiscordPresence` current theme which is usually because the user
 * has their own theme they want to use.
 */
export const ThemeDiscordPresenceOverride: FunctionComponent<{
  theme?: { primary: string; accent: string };
  children: ReactNode;
}> = ({ theme, children }) => {
  const { setTheme } = useTheme();

  // Override theme.
  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [setTheme, theme]);

  return <>{children}</>;
};

/*
 * Access the Discord presence theme.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error(
      `No theme provider found. A 'ThemeProvider' must be defined.`,
    );
  }
  return context;
};
