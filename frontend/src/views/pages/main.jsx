import React from 'react'
import MainLayout from '../layouts/Main'
import { Box, Typography, Button, Grid, makeStyles } from '@material-ui/core'

import HeroImage from '~/static/main.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${HeroImage})`,
      backgroundSize: 'cover',
      filter: 'blur(5px)',
      backgroundPositionX: 'center',
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: `rgba(104, 134, 197, 0.2)`,
    },
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  textBlock: {
    zIndex: 10,
    position: 'absolute',
    top: '24%',
    left: '12%',

    [theme.breakpoints.down('xs')]: {
      left: '22%',
    },
  },
  textTitle: {
    fontSize: 60,
    [theme.breakpoints.down('xs')]: {
      fontSize: 50,
    },
  },
  textSubtitle: {
    fontSize: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
}))

const MainPage = ({ history }) => {
  const classes = useStyles()
  // const [interval, setIntervalValue] = useState(null)
  // const [bgImg, setbgImage] = useState(null)

  // useEffect(() => {
  //   setIntervalValue(
  //     setInterval(() => {
  //       Axios.get(
  //         `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/1103088/one-color`
  //       ).then((res) => {
  //         setbgImage(res.request.responseURL)
  //         console.log('res :>> ', res)
  //       })
  //     }, 3000)
  //   )
  // }, [])
  return (
    <MainLayout hideMenu hideNav overflow="hidden">
      <Box component="section" className={classes.root}>
        <Box className={classes.textBlock}>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.textTitle}
          >
            Plando
          </Typography>
          <Typography variant="subtitle2" className={classes.textSubtitle}>
            Be productive with
            <br /> yet another one todo app
          </Typography>
          <Box display="flex" mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push('/sign-up')}
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  onClick={() => history.push('/log-in')}
                  variant="outlined"
                  fontWeight="bold"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default MainPage
