import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  direction: 'rtl',
  shape: { borderRadius: 12 },
  palette: {
    primary: { main: '#20c4c6' },
    secondary: { main: '#1e90ff' }
  },
  typography: {
    fontFamily: ['BYekan','Vazirmatn','IRANSans','Roboto','Arial','sans-serif'].join(',')
  }
})

export default theme
