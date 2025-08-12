import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface ThemeState {
  isDarkMode: boolean;
}

type ThemeAction = { type: 'TOGGLE_DARK_MODE' } | { type: 'SET_DARK_MODE'; payload: boolean };

interface ThemeContextType {
  state: ThemeState;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'SET_DARK_MODE':
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    isDarkMode: false
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('chap_theme');
    if (savedTheme) {
      dispatch({ type: 'SET_DARK_MODE', payload: savedTheme === 'dark' });
    } else {
      // Check system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch({ type: 'SET_DARK_MODE', payload: systemDark });
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chap_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chap_theme', 'light');
    }
  }, [state.isDarkMode]);

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const setDarkMode = (isDark: boolean) => {
    dispatch({ type: 'SET_DARK_MODE', payload: isDark });
  };

  return (
    <ThemeContext.Provider value={{ state, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
