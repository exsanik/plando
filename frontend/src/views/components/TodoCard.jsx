import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Box,
  Checkbox,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core'
import {
  ExpandMore,
  RadioButtonUnchecked as UncheckedCircle,
  CheckCircle,
  Delete,
} from '@material-ui/icons'
import cx from 'classnames'

import { handleDone, deleteTodo } from '~/state/modules/todos'

const useStyles = makeStyles(theme => ({
  checkedWrapper: {
    backgroundColor: theme.palette.primary.main,
    transition: 'background-color 300ms cubic-bezier(0, 0, .58, 1) 0ms',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  titleChecked: {
    textDecoration: 'line-through',
  },

  checkedIcon: {
    color: theme.palette.primary.dark,
  },

  descriptionWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },

  assignedWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      marginLeft: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
  },

  descriptionBold: {
    fontWeight: 700,
  },

  deleteBtn: {
    color: theme.palette.error.main,
  },

  descriptionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
  },
}))

const TodoCard = ({
  title,
  description,
  expire_at,
  is_done,
  assigned_users,
  id,

  handleDone,
  deleteTodo,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState(is_done)

  const classes = useStyles()

  const getAvatarLetter = useCallback(
    email => (email[0] + email[1]).toLocaleUpperCase(),
    []
  )

  const userAvatars = useMemo(
    () =>
      assigned_users.map(email => (
        <Avatar key={email}>{getAvatarLetter(email)}</Avatar>
      )),
    [assigned_users]
  )

  useEffect(() => {
    setChecked(is_done)
  }, [is_done])

  return (
    <Card>
      <ExpansionPanel
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        className={cx({ [classes.checkedWrapper]: checked })}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Box className={classes.titleWrapper}>
            <Checkbox
              checked={checked}
              onChange={() => handleDone(id)}
              onClick={e => e.stopPropagation()}
              inputProps={{ checked }}
              icon={<UncheckedCircle />}
              checkedIcon={<CheckCircle className={classes.checkedIcon} />}
            />
            <Typography
              variant="subtitle2"
              className={cx({
                [classes.titleText]: true,
                [classes.titleChecked]: checked,
              })}
            >
              {title}
            </Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box className={classes.descriptionWrapper}>
            <Box className={classes.assignedWrapper}>
              <Typography className={classes.descriptionBold}>
                Assigned:
              </Typography>
              {userAvatars}
            </Box>
            <Typography>{description}</Typography>

            <Box className={classes.descriptionFooter}>
              <Typography className={classes.descriptionBold}>
                {expire_at}
              </Typography>
              <Button
                className={classes.deleteBtn}
                onClick={() => deleteTodo(id)}
              >
                <Delete />
                Delete
              </Button>
            </Box>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  )
}

export default connect(null, {
  handleDone,
  deleteTodo,
})(TodoCard)
