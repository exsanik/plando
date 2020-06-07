import React from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'

import Header from '~/views/components/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - 65px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const MainLayout = ({ children, hideMenu, overflow, hideNav, bgColor }) => {
  const classes = useStyles()
  return (
    <Box
      component="main"
      overflow={overflow}
      className={classes.root}
      background={bgColor}
    >
      <Header hideMenu={hideMenu} hideNav={hideNav} />
      <Container className={classes.container}>{children}</Container>
    </Box>
  )
}

export default MainLayout
