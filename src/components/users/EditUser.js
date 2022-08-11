import React,{useState,useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import {
  TextField ,
  Card,
  CardHeader,
   CardContent,
   Button ,
    FormControl,
    FormGroup,
  } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import Theme from '../Theme';
import cacheRTL from '../cacheRTL'
import Header from '../Header'
import Api from '../Api';
import config from '../headerConfig/FullConfig';
import { useNavigate} from 'react-router-dom';

export default function EditUser() {
    const [values,setValues]=React.useState({
      username:'',
      email:'',
    });
    const [width,setWidth]=useState("");
    const [padd,setPadd]=useState("");
    const [isload, setisload] = useState(false)
    useEffect(() => {
      if(localStorage.getItem('mobile')===1){
        setWidth("100%")
        setPadd("60px")
      }else{
        setWidth("500px");
        setPadd("110px")
      }
      if(isload===false){
        Api.get('/users/detailupdate/',config).then(res=>{
          setValues({
            username:res.data.username,
            email:res.data.email
          });
          setisload(true);
        });
      }
      
    },[])
    
  const edit=()=>{
    console.log(config);
    const data=new FormData();
    data.append('email',values.email);
    data.append('username',values.username);
    Api.patch('/users/detailupdate/',data,config).then(res=>{
       console.log('y');
    }).catch(err=>{
      console.log(err);
    });
  }
  const handleChange=(props)=>(event)=>{
      setValues({...values,[props]:event.target.value});
  }
  
  return (
    <div>
      <Header/>
 <CacheProvider value={cacheRTL}>
    <ThemeProvider theme={Theme}>
      <center>
      <div dir="rtl" style={{width:width,paddingTop:padd}}>
        <Card>
          <CardHeader title="ویرایش حساب" style={{color:"white",fontWeight:"Bold",backgroundColor:"#9c27b0"}}/>
          <CardContent>
            <FormGroup style={{padding:'2%',marginTop:'4%'}}>
              <FormControl>
                <TextField 
                  fullWidth
                  value={values.email} 
                  onChange={handleChange('email')}
                  type={"email"}
                  size="small" 
                  color="secondary" 
                  variant="outlined" 
                  label="ایمیل"
                />
              </FormControl>
              </FormGroup>
              <FormGroup style={{padding:'2%'}}>
              <FormControl>
                <TextField 
                  fullWidth 
                  value={values.username} 
                  onChange={handleChange('username')}
                  size="small" 
                  color="secondary" 
                  variant="outlined" 
                  label="نام"
                />
              </FormControl>
              </FormGroup>
            <FormGroup style={{padding:'2%',marginTop:'2%'}}>
                <Button variant="contained" size="large" style={{backgroundColor:"#9c27b0"}} onClick={edit}>
                  تایید
                </Button>
            </FormGroup>
          </CardContent>
        </Card>
      </div>
      </center>
      
    </ThemeProvider>
  </CacheProvider>
    </div>
   
   
  )
}

