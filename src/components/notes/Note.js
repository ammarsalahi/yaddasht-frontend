import React,{useState} from 'react'
import {Card,CardActions,CardHeader,CardContent,Button,Typography,IconButton} from '@mui/material'
import {Edit,Delete,SmartDisplay} from '@mui/icons-material';
import Api from '../Api';
import config from '../headerConfig/TokenConfig';
import { useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Note(props) {
   const deleteNote=()=>{
    Swal.fire({
      icon:'error',
      title: 'می خوای حذفش کنی؟',
      showCancelButton: true,
      confirmButtonText: 'آره',
      cancelButtonText:'بی خیال'
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete('/notes/'+props.id,config).then(res=>{
          props.getnotes();
        });
      }
    })
     
   }
   let navigate=useNavigate();
   const editing=()=>{
    navigate(`/edit/${props.id}`);
   }
   const showing=()=>{
    navigate(`/${props.id}`);

   }
  return (
    <div>
   <Card style={{backgroundColor:`${props.colors}`}}>
      <CardHeader title={props.title} />
       <CardContent>
       </CardContent>
       <CardActions className="d-flex justify-content-evenly">
        
        <IconButton onClick={showing}>
          <SmartDisplay/>
        </IconButton>
        <IconButton onClick={editing}>
          <Edit/>
          </IconButton>
         <IconButton onClick={deleteNote}>
            <Delete/>
          </IconButton>
       </CardActions>
    </Card>
         
    </div>
 
  )
}
