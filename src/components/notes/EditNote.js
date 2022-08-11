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
import config from '../headerConfig/FullConfig'
import {useNavigate,useParams} from 'react-router-dom'  

export default function EditNote(props) {

      const [values,setValues]=useState({
        title:'',
        body:'',
        user:'',
        imageurl:''
      })
      const [image,setImage]=useState(null);  
      const [isget, setisget] = useState(false);
      const [width,setWidth]=useState("");
      const [padd,setPadd]=useState("");
      let {id}=useParams();
      useEffect(()=>{
        if(localStorage.getItem('mobile')===1){
          setWidth("100%")
          setPadd("60px")
        }else{
          setWidth("550px");
          setPadd("90px")
        }
        if(!isget){
          
          Api.get('/notes/'+id,config).then(res=>{
            setValues({
              title:res.data.title,
              body:res.data.body,
              user:res.data.user,
              imageurl:res.data.image
            });
            setisget(true);
        });
        }
          
      });
      const handleChange=(props)=>(event)=>{
        setValues({...values,[props]:event.target.value});
      }
     
      let navigate=useNavigate();

  const editNote=()=>{
    const data=new FormData();
    data.append("title",values.title);
    data.append("body",values.body);
    if(image!==null){
      data.append("image",image,image.name);
    }
    Api.patch('/notes/'+id+"/",data,config).then(res=>{
        navigate('/');
    })
    
  }
  const close =()=>{
    navigate('/')
  }
  return (
   <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={Theme}>
      <center>
        <div dir="rtl" style={{width:width,paddingTop:padd}}>
          <Card style={{height:"500px"}}>
            <CardHeader title="ویرایش" color="secondary" style={{fontWeight:"Bold",backgroundColor:"#9c27b0",color:"white"}}/>
            <CardContent>
              <FormGroup style={{padding:'1%'}}>
              <TextField
                label="عنوان"
                size="small"
                value={values.title}
                onChange={handleChange('title')}
                color="secondary"
                variant="standard" 
              />
                </FormGroup>
              <FormGroup style={{padding:'1%'}}>
                <TextField
                label="متن"
                size="small"
                value={values.body}
                onChange={handleChange('body')}
                color="secondary"
                variant="standard" 
                multiline
                rows={5}
                />
            
              </FormGroup>
              <Typography variant='p' component="div" style={{padding:'10px',textAlign:"right"}}>
                تصویر 
              </Typography>
              <Typography variant='a' component="div" style={{padding:'5px',textAlign:"right"}}>
              {values.imageurl}
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
                <Button variant="contained" onClick={editNote}>تایید</Button>
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
