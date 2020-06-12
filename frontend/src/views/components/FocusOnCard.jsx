import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardContent,
  Grow,
  makeStyles,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core'

import { Done, Delete, NavigateNext } from '@material-ui/icons'

import { getSortedTodos, getTodosState } from '~/state/modules/todos/selectors'
import { setDone, deleteTodo, handleDone } from '~/state/modules/todos'
import Plando from '~/services/Plando'

import sandClock from '~/static/sand-clock.png'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    position: 'relative',
    minHeight: 250,
  },

  content: {
    color: theme.palette.secondary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'inherit',
  },

  title: {
    fontWeight: 500,
  },

  sandClockImage: {
    width: 150,
    transform: 'rotate(-35deg)',
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(3),
    filter: 'drop-shadow(2px 4px 6px black)',
    opacity: 0.1,
  },

  todoInformation: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: theme.spacing(1),
  },

  buttonsWrapper: {
    display: 'flex',
    '& button': {
      marginRight: theme.spacing(2),
      '& svg': {
        marginRight: theme.spacing(0.5),
      },
    },
  },

  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  expireAt: {
    fontWeight: 700,
  },

  deleteBtn: {
    color: theme.palette.error.main,
  },
  doneBtn: {
    color: theme.palette.success.main,
  },
  skipBtn: {
    color: theme.palette.primary.light,
  },
}))

const FocusOnCard = ({
  sortedTodos,
  todosState: { loading, loaded },
  setDone,
  deleteTodo,
  setDoneAction,
}) => {
  const classes = useStyles()
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    if (loaded && sortedTodos.length) {
      const taskId = Number(localStorage.getItem('focusOnTask'))
      const task = sortedTodos.filter(({ id }) => id === taskId)
      if (!task?.length) {
        if (sortedTodos.length) {
          localStorage.setItem('focusOnTask', sortedTodos[0].id)
          setCurrentTask(
            sortedTodos.filter(({ id }) => id === sortedTodos[0].id)[0]
          )
        } else {
          localStorage.setItem('focusOnTask', null)
        }
      } else {
        setCurrentTask(task[0])
      }
    }
  }, [sortedTodos, setCurrentTask, loaded])

  const handleSkip = useCallback(() => {
    const { id } = currentTask

    const indexOfTask =
      (sortedTodos.findIndex(({ id: currId }) => currId === id) + 1) %
      sortedTodos.length
    setCurrentTask(sortedTodos[indexOfTask])
    localStorage.setItem('focusOnTask', sortedTodos[indexOfTask].id)
  }, [currentTask])

  const handleDone = useCallback(() => {
    const { id } = currentTask

    setDoneAction(id)
    handleSkip()
    setDone(id)
  }, [currentTask])

  const handleDelete = useCallback(() => {
    const { id } = currentTask
    deleteTodo(id)
    handleSkip()
  }, [currentTask])

  return (
    <>
      {loading ? (
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      ) : (
        loaded &&
        currentTask &&
        !!sortedTodos.length && (
          <Grow in={true}>
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography variant="h4" className={classes.title}>
                  Focus on:
                </Typography>
                <img
                  src={sandClock}
                  className={classes.sandClockImage}
                  alt="sand clock"
                />

                <Box className={classes.todoInformation}>
                  <Typography variant="subtitle2">
                    {currentTask.title}
                  </Typography>
                  <Typography className={classes.description}>
                    {currentTask.description}
                  </Typography>
                  <Typography className={classes.description}>
                    {currentTask.expireAt}
                  </Typography>
                </Box>

                <Box className={classes.buttonsWrapper}>
                  <Button className={classes.doneBtn} onClick={handleDone}>
                    <Done />
                    Done
                  </Button>

                  <Button className={classes.deleteBtn} onClick={handleDelete}>
                    <Delete />
                    Delete
                  </Button>

                  <Button className={classes.skipBtn} onClick={handleSkip}>
                    Skip
                    <NavigateNext />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grow>
        )
      )}
    </>
  )
}

const mapStateToProps = state => ({
  sortedTodos: getSortedTodos(state),
  todosState: getTodosState(state),
})

export default connect(mapStateToProps, {
  setDone,
  deleteTodo,
  setDoneAction: handleDone,
})(FocusOnCard)
