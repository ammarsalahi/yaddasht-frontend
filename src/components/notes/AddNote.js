import React,{useState,useEffect} from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {
  TextField ,
  Card,
  CardHeader,
   CardContent,
   CardActions,
    FormGroup,
    Typography
  } from '@mui/material';
  import Theme from '../Theme';
  import cacheRTL from '../cacheRTL';
import Api from '../Api';
import config from '../headerConfig/FullConfig';
import {useNavigate} from 'react-router-dom'  
export default function AddNote(props) {

      const [values,setValues]=useState({
        title:'',
        body:'',
        user:localStorage.getItem('userid')
      })
      const [image,setImage]=useState(null);  
      const [width,setWidth]=useState("");
      const [padd,setPadd]=useState("");
      const handleChange=(props)=>(event)=>{
         setValues({...values,[props]:event.target.value});
      }

     useEffect(() => {
       if(localStorage.getItem('mobile')===1){
        setWidth("100%")
        setPadd("60px")
      }else{
        setWidth("550px");
        setPadd("90px")
      }
     }, []);
      
    let navigate=useNavigate();
    const addNote=()=>{
        const data=new FormData();
        data.append("title",values.title);
        data.append("body",values.body);
        data.append("user",values.user);
        if (image !== null){
          data.append('image',image,image.name);
        }
        Api.post('/notes/',data,config).then(res=>{
          console.log(res.data);
          navigate('/');
        }).catch(err=>{
          console.log(err)
        })
      }
      const close=()=>{
        navigate('/')
      }
  return (
   <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={Theme}>
      <center>
        <div dir="rtl" style={{width:width,paddingTop:padd}}>

          <Card>

            <CardHeader title="افزودن" color="secondary" style={{fontWeight:"Bold",backgroundColor:"#9c27b0",color:"white"}}/>
            <CardContent>

              <FormGroup style={{padding:'1%'}}>
              <TextField
                onChange={handleChange('title')}
                value={values.title}
                label="عنوان"
                size="small"
                color="secondary"
                variant="standard" 
              />
                </FormGroup>
              <FormGroup style={{padding:'1%'}}>
                <TextField
                onChange={handleChange('body')}
                value={values.body}
                label="متن"
                size="small"
                color="secondary"
                variant="standard" 
                multiline
                rows={4}
                />
              
              </FormGroup>
              <Typography variant='p' component="div" style={{padding:'10px',textAlign:"right"}}>
                تصویر
              </Typography>
              <input 
                type="file" 
                className="form-control" 
                id="inputGroupFile04" 
                onChange={(e)=>{setImage(e.target.files[0])}}
                aria-describedby="inputGroupFileAddon04" 
                aria-label="Upload"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              </CardContent>
              <CardActions className='justify-content-center p-3'>
              <div className="row row-cols-2">
                <div className='col'>
                <Button variant="contained" onClick={addNote}>افزودن</Button>
                </div>
                <div className='col'>
                <Button variant="contained" onClick={close}>انصراف</Button>
                </div>
              
              </div>
              </CardActions>
            </Card>
            </div>
            </center>
      </ThemeProvider>
      </CacheProvider>
  )
}
