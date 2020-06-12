import React from 'react'
import { SwipeableDrawer, Box, makeStyles, Typography } from '@material-ui/core'
import { DoneAll, PlaylistAddCheck, Schedule } from '@material-ui/icons'

import NavLink from '~/views/shared/NavLink'

const useStyles = makeStyles(theme => ({
  boxWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(5),
  },
}))

const DrawerMenu = ({ isOpen, handleOpenState }) => {
  const classes = useStyles()

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={handleOpenState}
      onOpen={handleOpenState}
    >
      <Box className={classes.boxWrapper}>
        <NavLink to="/all" Icon={PlaylistAddCheck}>
          All
        </NavLink>
        <NavLink to="/planed" Icon={Schedule}>
          Planed
        </NavLink>
        <NavLink to="/done" Icon={DoneAll}>
          Done
        </NavLink>
      </Box>
    </SwipeableDrawer>
  )
}

export default DrawerMenu
