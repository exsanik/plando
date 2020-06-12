import React, { useState } from 'react'
import { Chip, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
}))

const ChipsArray = ({ data, setData, userEmail }) => {
  const classes = useStyles()

  const handleDelete = chipToDelete => () => {
    setData(prev => prev.filter(chip => chip !== chipToDelete))
  }

  return (
    <Box className={classes.root}>
      {data.map(label => (
        <Chip
          key={label}
          label={label}
          onDelete={label !== userEmail ? handleDelete(label) : undefined}
          className={classes.chip}
        />
      ))}
    </Box>
  )
}

export default ChipsArray
