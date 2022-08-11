import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {FormGroup,TextField,IconButton,InputAdornment} from '@mui/material'
import {AccountCircle,Add, Search,Close} from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link,useNavigate} from 'react-router-dom';
import Api from './Api';

export default function Header(props) {
  let navigate=useNavigate()

  const [header,setHeader]=useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout=()=>{
    Api.post('/users/logout/').then(res=>{
      localStorage.clear();
      navigate('/signin');
    })
  }
  const showsetting=()=>{
    navigate('/settings');
  }
  const adding=()=>{
    navigate('/add');
  }
  const home=()=>{
    navigate('/');
  }
  const searchHandle=()=>{
    setHeader(false)
    navigate('/')
  }
  const getHead=()=>{
    return (
      <Box sx={{ flexGrow: 1 }} style={{width:"100%"}}>
      <AppBar color='secondary'>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <a onClick={home}>
            یادداشت
            </a>
          </Typography>
          <Box sx={{display:'inline-flex'}}>
        <IconButton style={{color:'white',fontSize:"20px"}} onClick={adding}>
          <Add/>
        </IconButton>
         
        <IconButton style={{color:'white'}} onClick={searchHandle}>
        <Search />
        </IconButton>
        <IconButton 
        style={{color:'white'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          <AccountCircle/>
        </IconButton>
          </Box>
         
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={showsetting}>تنظیمات</MenuItem>
        <MenuItem onClick={logout}>خروج</MenuItem>
      </Menu>
    </Box>
    );
  }
  const getSearch=()=>{
    return(
      <Box sx={{ flexGrow: 1 }} style={{width:"100%"}}>
      <AppBar color='secondary'>
        <Toolbar>
          <TextField
          fullWidth
          placeholder='عنوان یا متن را وارد کنید...'
          variant='standard'
          value={props.searchs}
          onChange={props.gosearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          />
         <IconButton style={{color:'white'}} onClick={()=>{setHeader(true)}}>
          <Close/>
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    );
  }
  return (
    <div>
      {header === true ?getHead():getSearch()}
    </div>
     
  );
}
