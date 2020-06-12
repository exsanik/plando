import React from 'react'
import { Link as BrowserLink } from 'react-router-dom'
import { Link, Box, Typography, makeStyles } from '@material-ui/core'
import cx from 'classnames'
import { fade } from '@material-ui/core/styles/colorManipulator'

import useRouter from '~/views/utils/hooks/useRouter'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
  active: {
    color: theme.palette.primary.main,
    backgroundColor: fade(theme.palette.primary.main, 0.3),
  },

  linkWrapper: {
    display: 'flex',
    minWidth: 200,
    padding: theme.spacing(2),
    '& svg': {
      marginRight: theme.spacing(2),
      fontSize: 22,
    },
  },
}))

const NavLink = ({ to = '/', children, Icon, ...props }) => {
  const classes = useStyles()
  const { pathname } = useRouter()

  const isActive = pathname === to

  return (
    <BrowserLink to={to}>
      <Link
        className={cx({ [classes.active]: isActive, [classes.root]: true })}
        component={'div'}
        {...props}
      >
        <Box className={classes.linkWrapper}>
          {Icon && <Icon />}
          <Typography variant="subtitle2">{children}</Typography>
        </Box>
      </Link>
    </BrowserLink>
  )
}

export default NavLink
