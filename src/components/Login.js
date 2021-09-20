import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { Link as RouterLink, useHistory } from 'react-router-dom'

// style
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControlLabel } from '@mui/material'

const theme = createTheme()

export default function Login() {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const { login } = useAuth()

  const history = useHistory()


  // console.log(watch())
  const onSubmit = async data => {

    try {
      const res = await login(data.email, data.password)
      console.log('ok',res)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  error={errors.email?.type === 'pattern' && true}
                  helperText={errors.email?.type === 'pattern' && 'Email is not well formatted.'}
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register('email', { required:true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password?.type === 'minLength' && true}
                  helperText={errors.password?.type === 'minLength' && 'At least 6 charactor long.'}
                  fullWidth
                  {...register('password',{ required:true, minLength:6 })}
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/signup">
                  <Link variant="body2">
                  Need an account? Sign up
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}