import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  DoneOutline as DoneOutlineIcon,
} from '@material-ui/icons'

import useRouter from '~/views/utils/hooks/useRouter'
import { getLoggedInUser } from '~/state/modules/user/selectors'
import { logOutUser } from '~/state/modules/user'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 65,
  },
  appbar: {
    backgroundColor: 'rgba(104,134,197, 0.5)',
    backdropFilter: 'blur(10px)',
    height: 65,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: 25,
      fontWeight: 'bold',
    },
    '& p': {
      marginLeft: theme.spacing(1),
      fontSize: 25,
      fontWeight: 'bolder',
    },
  },
}))

const Header = ({ hideMenu, hideNav, isLogged, logOutAction }) => {
  const { push } = useRouter()
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {!hideMenu && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            <Box className={classes.logo} component={Link} to="/">
              <DoneOutlineIcon />
              <Typography>Plando</Typography>
            </Box>
          </Typography>
          {!hideNav && (
            <Box>
              {isLogged ? (
                <Button color="inherit" onClick={logOutAction}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button color="inherit" onClick={() => push('/log-in')}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => push('/sign-up')}>
                    Sign up
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  isLogged: getLoggedInUser(state),
})

export default connect(mapStateToProps, { logOutAction: logOutUser })(Header)
