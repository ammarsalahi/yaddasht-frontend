import React,{useState,useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import {
  TextField ,
  Card,
  CardHeader,
   CardContent,
   CardActions ,
   Button ,
    FormControl,
    FormGroup,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    Typography,
    Grid
  } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { CacheProvider } from '@emotion/react';
import Theme from '../Theme';
import cacheRTL from '../cacheRTL'
import Api from '../Api'
import config from '../headerConfig/Config';
import {useNavigate,Link} from 'react-router-dom'
export default function Signup() {
  const [values, setValues] = React.useState({
    email: '',
    username:'',
    password: '',
    repassword:'',
    showPassword: false,
    showsuccess:false
  });
  const [width,setWidth]=useState("");
  const [padd,setPadd]=useState("");
  useEffect(() => {
    if(localStorage.getItem('mobile')===1){
      setWidth("100%")
      setPadd("60px")
    }else{
      setWidth("500px");
      setPadd("90px")
    }
  },[])
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let navigate=useNavigate();
  const handleCreate =()=>{
    const data=new FormData();
    data.append('email',values.email);
    data.append('username',values.username);
    data.append('password',values.password)
    Api.post('/users/signup/',data,config).then(res=>{
       localStorage.clear();
       localStorage.setItem('token-auth',res.data.token);
       navigate('/signin');
    });
  }
  
  return (
    <div>
   <CacheProvider value={cacheRTL}>
    <ThemeProvider theme={Theme}>
      <center>
      <div dir="rtl" style={{width:'500px',paddingTop:"5%"}}>
        <Card>
        <CardHeader title="یادداشت" style={{backgroundColor:"#9c27b0",color:"white",fontWeight:"Bold"}}/>
          <CardContent>
          <Typography variant='h5' style={{margin:'2%'}}>
           ایجاد حساب
            </Typography>
            <FormGroup style={{padding:'2%'}}>
              <FormControl>
                <TextField 
                  fullWidth 
                  type={"email"}
                  size="small"
                  color="secondary" 
                  variant="outlined"
                   label="ایمیل"
                  value={values.email}
                  onChange={handleChange('email')}
                />
              </FormControl>
              </FormGroup>
              <FormGroup style={{padding:'2%'}}>
              <FormControl>
                <TextField 
                  fullWidth
                  size="small"
                  color="secondary"
                  variant="outlined"
                  label="نام کاربری"
                  value={values.username}
                  onChange={handleChange('username')}
                />
              </FormControl>
              </FormGroup>
              <FormGroup style={{padding:'2%'}}>
              <FormControl size="small" color="secondary" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">گذرواژه</InputLabel>
                <OutlinedInput
                  id="password-id"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
               </FormGroup>
               <FormGroup style={{padding:'2%'}}>
                <FormControl size="small" color="secondary" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">تکرار گذرواژه</InputLabel>
                  <OutlinedInput
                    id="repassword-id"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.repassword}
                    onChange={handleChange('repassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
            </FormGroup>
            <FormGroup style={{padding:'2%',marginTop:'2%'}}>
                <Button onClick={handleCreate} variant="contained" color="secondary" size="large" style={{fontSize:"large"}}>
                  ایجاد
                </Button>
            </FormGroup>
          </CardContent>
          <CardActions>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={3}>
              <Button size="large">
              <Typography variant="h6">
              <Link to="/signin">ورود به حساب</Link>
              </Typography>
              </Button> 
              </Grid>   
              
            </Grid>
          </CardActions>
        </Card>
      </div>
      </center>
      
    </ThemeProvider>
  </CacheProvider>
    </div>
  )
}

