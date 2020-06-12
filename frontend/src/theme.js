import { createMuiTheme } from '@material-ui/core/styles'

export const palette = {
  primary: {
    main: '#6886c5',
    dark: '#4E5A7B',
  },
  secondary: {
    main: '#E7ECEF',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#3C3C3B',
    secondary: '#666666',
    disabled: '#B5C1C8',
  },
  background: {
    default: '#b8c6db',
  },
}

const defaultTheme = createMuiTheme()

const theme = createMuiTheme({
  palette,
  typography: {
    // fontFamily: "'DM Mono', monospace",
    subtitle1: {
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 1.2,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 25,
      },
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 500,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          minHeight: '100vh',
          background: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '.DateTimePicker .MuiTypography-subtitle1': {
          fontSize: 16,
        },
      },
    },
    MuiButton: {},
    MuiAppBar: {},
    MuiCheckbox: {
      root: {
        '& .MuiSvgIcon-root': {
          fontSize: '1.8rem',
        },
      },
    },
    MuiInputBase: {
      root: {
        background: '#fff',
        minHeight: 50,
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: palette.primary.dark,
        color: palette.secondary.contrastText,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.03)',
      },
      input: {
        padding: '15.5px 14px',
      },
      multiline: {
        padding: '15.5px 14px',
      },
      notchedOutline: {
        borderColor: palette.secondary.main,
      },
    },
    MuiInputLabel: {
      root: {
        color: palette.text.disabled,
      },
      outlined: {
        transform: 'translate(14px, 18px) scale(1)',
      },
    },
  },
})

export default theme
