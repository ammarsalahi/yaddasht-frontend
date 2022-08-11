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
    Grid,
    InputAdornment,
    IconButton,
    Typography
  } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { CacheProvider } from '@emotion/react';
import { Link ,useNavigate} from 'react-router-dom';
import Theme from '../Theme';
import cacheRTL from '../cacheRTL'
import Api from '../Api'
import config from '../headerConfig/Config';
import Swal from 'sweetalert2'
export default function Signin() {
   const [values,setValues]=React.useState({
      email:'',
      password:'',
      showpassword:false
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
  
  const handleChange=(props)=>(event)=>{
     setValues({...values,[props]:event.target.value});
  };
  const handleShowPassword=()=>{
    setValues({...values,showpassword:!values.showpassword});
  }
  let navigate = useNavigate();
  const login=event=>{
    event.preventDefault();
    const data=new FormData();
    data.append('email',values.email);
    data.append('password',values.password);
    Api.post('/users/signin/',data,config).then(res=>{
      localStorage.clear();
      localStorage.setItem('token-auth',res.data.token);
      navigate("/");
      
    }).catch(err=>{
      if (err.response.status===400){
        Swal.fire({
          icon: 'error',
          title: 'خطا',
          text: 'ایمیل یا گذرواژه اشتباه است',
        })
      }
    })

  }
  return (
    <CacheProvider value={cacheRTL}>
    <ThemeProvider theme={Theme}>
      <center>
      <div dir="rtl" style={{width:width,paddingTop:padd}}>
        <Card>
          <CardHeader title="یادداشت" color='secondary' style={{backgroundColor:"#9c27b0",color:"white",fontWeight:"Bold"}}/>
          <CardContent>
            <Typography variant='h5' style={{margin:'2%'}}>
            ورود به برنامه
            </Typography>
            <form onSubmit={login} method="post">
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
            <TextField
              label="گذرواژه"
              size="small"
              color="secondary"
              value={values.password}
              onChange={handleChange('password')}
              type={values.showpassword ? 'text': 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                    onClick={handleShowPassword}
                    >
                      {values.showpassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          
            </FormGroup>
            <FormGroup style={{padding:'2%',marginTop:'2%'}}>
                <Button type='submit' variant="contained" style={{fontSize:"large"}} size="large" color="secondary">
                  ورود
                </Button>
            </FormGroup>
            </form>
          
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
              <Link to="/signup">ایجاد حساب</Link>

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
   
  )
}
