import { useMemo } from 'react';
import { createTheme } from '@mui/material';

interface DefaultThemeProps {
    prefersDarkMode: boolean;
}

const theme = ({prefersDarkMode}: DefaultThemeProps) => createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: '#000000',
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#6b6b6b',
                        minHeight: 24
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: '#2b2b2b',
                    },
                },
            }
        }
    },
    palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
    },
});

const useDefaultTheme = ({prefersDarkMode}: DefaultThemeProps) => useMemo(() => theme({prefersDarkMode}), [prefersDarkMode]);

export default useDefaultTheme;
