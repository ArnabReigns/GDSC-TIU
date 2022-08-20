import {Stack, Typography, ButtonGroup, Button, Box} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {useContext} from 'react'
import AuthContext from '../Context/AuthContext';



function Navbar() {

  
  const {user,logoutUser} = useContext(AuthContext);
  




  return (
    <Stack mx={5} py={3} direction={'row'} borderBottom={'2px solid black'}>
      
            
            <Typography variant='h5' fontSize={'1.7rem'} flexGrow={1}> 
            <Link to='/' style={{'textDecoration':'none','color':'transarent'}}>
            <span style={{color:'#E94235'}}>G</span>
            <span style={{color:'#FABB05'}}>D</span>
            <span style={{color:'#34A853'}}>S</span>
            <span style={{color:'#4285F4'}}>C </span> 
            TIU</Link></Typography>
        <Stack spacing={2} direction={'row'} alignItems="center">
           { !user ? (
           <ButtonGroup >
                  <Button color='secondary' component={Link} to={'/register/'}>Sign Up</Button>
                  <Button component={Link} to={'/login/'}>Log in</Button>
            </ButtonGroup>
            ): 
            (
              <Stack direction={'row'} spacing={2}>
              <ButtonGroup >
                  <Button color='secondary' onClick={logoutUser}>Log Out</Button>
              </ButtonGroup>
              <Stack  component={Link}  to={'/profile/'} direction={'row'}>
                <AccountCircleIcon fontSize={'large'} color={'primary'}/>
              </Stack>
              </Stack>
            )}
        </Stack>
    </Stack>
  )
}

export default Navbar