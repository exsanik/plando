import React from 'react'
import { Box, Typography } from '@material-ui/core'

import MainLayout from '~/views/layouts/Main'
import FocusOnCard from '~/views/components/FocusOnCard'
import BigTodoForm from '~/views/components/BigTodoForm'

const Dashboard = () => {
  return (
    <MainLayout>
      <FocusOnCard />
      <Box mt={4} textAlign="center">
        <Typography variant="subtitle1" gutterBottom>
          Create new task!
        </Typography>
        <BigTodoForm />
      </Box>
    </MainLayout>
  )
}

export default Dashboard
