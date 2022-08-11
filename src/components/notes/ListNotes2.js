import React, { useEffect, useState } from 'react'
import Note from './Note'
import Header from '../Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import config from "../headerConfig/TokenConfig";
import Api from '../Api';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function ListNotes2() {
  const [notes,setNotes]=useState([]);
  const [user,setUser]=useState(0);
  const [search,setSearch]=useState("");
  const [width,setWidth]=useState("");
  let navigate=useNavigate();
  useEffect(()=>{
      getDevice();
      getUser();
      getNotes();
  },[]);
  
  const getDevice=()=>{
    Api.get('/users/device/').then(res=>{
      localStorage.setItem('mobile',1);
      setWidth("100%");
    }).catch(err=>{
      localStorage.setItem('desktop',1);
      setWidth("auto");

    });
  }
  const getUser=()=>{
    Api.get('/users/detailupdate/',config).then(res=>{
        setUser(res.data.id);
        localStorage.setItem('userid',res.data.id);      
     }).catch(err=>{
        if(err.response.status===401){
          navigate('/signin');
        }
    })
  }
  const getNotes=()=>{
    Api.get('/notes/?search='+search,config).then(res=>{
      setNotes(res.data);
     });
  }
  const searching=(event)=>{
      setSearch(event.target.value);
      getNotes();
  }
  return (
    <div>
      <Header
      search={search}
      gosearch={searching}
      />
      <div className="columns is-multiline" style={{marginTop:'65px',padding:"5px",width:{width}}}>
    {notes!==[]? (notes.map((note) =>(
          <div className='column is-2'>
            
            <Note 
                key={note.id}
                user={user}
                id={note.id}
                title={note.title}
                text={note.body} 
                colors={note.bg_color}
                image={note.image}
                getnotes={getNotes}
                />
              
          </div>
          ))
    ):(
      <div style={{paddingTop:"20%"}}>
    <center>
    <Typography variant="h4" component="div" style={{color:'red'}}>
            هیچ یادداشتی وجود ندارد
    </Typography>
    </center>
    </div>
    )}
    </div>
    </div>
  )
}
