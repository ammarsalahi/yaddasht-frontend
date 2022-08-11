import {React,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Api from '../Api';
import Theme from '../Theme';
import cacheRTL from '../cacheRTL';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {Card,CardContent,CardActions,CardMedia,Typography,IconButton} from '@mui/material';
import config from '../headerConfig/TokenConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {Edit,Delete} from '@mui/icons-material';

export default function ViewNote() {
  const[note,setNote]=useState(null);
  const [width,setWidth]=useState("");
  const [padd,setPadd]=useState("");
  const[height,setHeight]=useState("")
  const [search, setSearch] = useState("");
  let {id}=useParams();
  useEffect(()=>{
        if(localStorage.getItem('mobile')===1){
          setWidth("100%")
          setPadd("60px")
        }else{
          setWidth("600px");
          setPadd("90px");
        }
     Api.get('/notes/'+id,config).then(res=>{
      setNote(res.data);
     });
  },[]);
  let navigate=useNavigate();
  const deleteNote=()=>{
    Swal.fire({
      icon:'error',
      title: 'می خوای حذفش کنی؟',
      showCancelButton: true,
      confirmButtonText: 'آره',
      cancelButtonText:'بی خیال'
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete('/notes/'+id,config).then(res=>{
          navigate('/');
        });
      }
    })
     
   }
   const editing=()=>{
    navigate(`/edit/${id}`);
   }
  const searching=(event)=>{
    navigate('/')
  }

  return (
    <div>
      <Header
        search={search}
        gosearch={searching}
      />
    {note !== null ? (

      <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={Theme}>
      <center>
        <div dir="rtl" style={{width:width,paddingTop:padd}}>
          <Card style={{backgroundColor:`${note.bg_color}`}}>
          {note.image?<CardMedia
              component="img"
              style={{height:"300px"}}
              image={note.image}
              alt="Paella dish"
              />:<div></div>}
              <CardContent style={{textAlign:"right",padding:"5%"}}> 
              
              <div>
              </div>
              <Typography variant="h4" component="div">
                {note.title}
              </Typography>
              <Typography variant="h6" component="div" className="text-right mt-5">
                {note.body}
              </Typography>
              </CardContent>
              <CardActions className="d-flex justify-content-evenly">
              <IconButton onClick={editing}>
                <Edit/>
                </IconButton>
              <IconButton onClick={deleteNote}>
                  <Delete/>
                </IconButton>
            </CardActions>
            </Card>
            </div>
            </center>
      </ThemeProvider>
      </CacheProvider>
    ) : (
      <div style={{paddingTop:"20%"}}>
        <center>
        <Typography variant="h4" component="div" style={{color:'red'}}>
                هیچ یادداشتی وجود ندارد
        </Typography>
        </center>
      </div>
    )}
    
    </div>
  );
}
