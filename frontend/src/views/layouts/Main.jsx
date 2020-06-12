import React, { useState, useCallback, useEffect } from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'

import Header from '~/views/components/Header'
import DrawerMenu from '~/views/components/DrawerMenu'
import useRouter from '~/views/utils/hooks/useRouter'

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
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuState = useCallback(() => setIsOpen(!isOpen), [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Box
      component="main"
      overflow={overflow}
      className={classes.root}
      background={bgColor}
    >
      <Header
        hideMenu={hideMenu}
        hideNav={hideNav}
        handleMenuOpen={handleMenuState}
      />
      <DrawerMenu isOpen={isOpen} handleOpenState={handleMenuState} />
      <Container className={classes.container}>{children}</Container>
    </Box>
  )
}

export default MainLayout
