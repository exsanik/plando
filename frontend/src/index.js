import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import App from './App'
import theme from './theme'
import store from './state/store'
import history from './history'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Router>
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
