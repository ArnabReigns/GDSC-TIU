import { Button, Stack, Typography } from '@mui/material'
import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../Context/AuthContext'
import './home.css'


function Home() {

    const [today,setToday] = useState([])
    const [upcoming,setUpcoming] = useState([])
    const {token,logoutUser} = useContext(AuthContext)
  
    const todaySessions =  async () =>
        {
        const res = await fetch('http://127.0.0.1:8000/api/sessions/today/',
        {
        method:'GET',
        headers:{
            Authorization:'Bearer ' + String(token.access)
        }
        })
        if(res.status === 200)
        {
            const data = await res.json() 
            setToday(data);
        }
        else if(res.status === 401)
        {
            logoutUser()
        }

    };
    const upcomingSessions =  async () =>
        {
        const res = await fetch('http://127.0.0.1:8000/api/sessions/upcoming/',
        {
        method:'GET',
        headers:{
            Authorization:'Bearer ' + String(token.access)
        }
        })
        if(res.status == 200)
        {
        const data = await res.json() 
        // console.log(data)
        setUpcoming(data);
        }
        else if(res.status === 401)
        {
            logoutUser()
        }

    };

    useEffect(()=>{

        todaySessions()
        upcomingSessions()
    },[])


  return (
    <Stack p={5} >
        {today.length > 0 && (<Typography variant='h5' mb={1}>TODAY</Typography>)}
        <Stack  spacing={1} mb={5}>
            { today.length > 0 &&  today.map((i)=>(
                <Stack key={i.id} className={'sessionCard'} p={2} spacing={1} direction={'row'} alignItems={'center'}>
                    <Typography variant='h6' flexGrow={1} color={'white'}>{i.title}</Typography>
                    <Typography   color={'white'} pr='2rem' >{i.time.substring(0,5)}</Typography>
                    <Typography   color={'white'} pr='2rem' >{(i.date).split('-')[1]}.{(i.date).split('-')[2]}.{(i.date).split('-')[0]}</Typography>
                    <Button variant='labeled' style={{backgroundColor:'#F4B142',border:'1px solid #F4B142',color:'white'}}>Details</Button>
                    <Button variant='outlined' style={{borderColor:'white ',color:'white'}}>Register</Button>
                </Stack>
            ))}
            
        </Stack>
        {upcoming.length > 0 && (<Typography variant='h5' mb={1}>UPCOMING</Typography>)}
        <Stack spacing={1}>
            { upcoming.length > 0 &&  upcoming.map((i)=>(
                <Stack key={i.id} p={2} className={'sessionCard'} spacing={1} direction={'row'} alignItems={'center'}>
                    <Typography variant='h6' flexGrow={1} color={'white'}>{i.title}</Typography>
                    <Typography   color={'white'} pr='2rem' >{i.time.substring(0,5)}</Typography>
                    <Typography   color={'white'} pr='2rem' >{(i.date).split('-')[1]}.{(i.date).split('-')[2]}.{(i.date).split('-')[0]}</Typography>
                    <Button variant='labeled' style={{backgroundColor:'#F4B142',border:'1px solid #F4B142',color:'white'}}>Details</Button>
                    <Button variant='outlined' style={{borderColor:'white ',color:'white'}}>Register</Button>
                </Stack>
            ))}
            
        </Stack>
    </Stack>
  )
}

export default Home