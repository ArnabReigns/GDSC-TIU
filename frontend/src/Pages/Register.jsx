import React,{useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import { LoadingButton } from '@mui/lab';

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RLink,useNavigate} from "react-router-dom";



const theme = createTheme();

export default function Register() {

  const [emailError,setEmailError ]= useState(null);
  const [idError,setidError ]= useState(null);
  const [loading,setLoading ]= useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const reqData = {
      'name':data.get('firstName')+' '+data.get('lastName'),
      'email':data.get('email'),
      'batch':data.get('batch'),
      'year':data.get('year'),
      'department':data.get('department'),
      'studentId':data.get('studentId'),
      'password':data.get('password'),
    }

    console.log(reqData)
    // register user
    setLoading(true)
    const req = await fetch('http://localhost:8000/api/accounts/register/',
    {
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData)
    });

    console.log(req);
    const res = await req.json();
    console.log(res);
    if (req.statusText === "Bad Request") 
    {
      if (res.email) setEmailError(res.email[0]) 
      if (res.studentId) setidError(res.studentId[0]) 
    }
    else if (req.status === 200) navigate('/login/');
    setLoading(false)

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}

          mb={4}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box  component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container minWidth={'40vw'} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="year"
                  label="Year"
                  defaultValue={''}
                  required
                >
                  <MenuItem value={'1'}>First Year</MenuItem>
                  <MenuItem value={'2'}>Second Year</MenuItem>
                  <MenuItem value={'3'}>Third Year</MenuItem>
                  <MenuItem value={'4'}>Fourth Year</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="batch"
                  label="Batch"
                  name="batch"
                  placeholder="F4"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="Student Id"
                  name="studentId"
                />
                <FormHelperText error={true}>{idError}</FormHelperText>
              </Grid>

              

              <Grid item xs={12}>
                <TextField
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <FormHelperText error={true}>{emailError}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{ minLength: 6, autoComplete: "off" }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loadingIndicator='registering...'
              loading = {loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>



            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RLink} to="/login/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
