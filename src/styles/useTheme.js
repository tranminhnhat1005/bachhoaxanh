import {useTheme as useThemeWithoutDefault} from './Diginet-Core-UI/Diginet-Core-UI-styles/useTheme/useTheme';
import {useDebugValue} from 'react';
import defaultTheme from './defaultTheme';

const useTheme = () => {
  const theme = useThemeWithoutDefault () || defaultTheme;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebugValue (theme);
  }

  return theme;
};

export default useTheme;
