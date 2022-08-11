import React, { Component } from 'react'
import Note from './Note'
import Header from '../Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import config from "../headerConfig/TokenConfig";
import Api from '../Api';
import {Typography} from '@mui/material';
export default class ListNotes extends Component {


  
  constructor(props){
    super(props);
     this.state={
      notes:[],
      user:0,
      search:""
    }
    

  }
  componentDidMount(){
    this.getNotes();
    this.getUser();
    this.getDevice();
  }
  getNotes=async()=>{
    await Api.get('/notes/?search='+this.state.search,config).then(res=>{
      this.setState({notes:res.data});
     });
  }
  getDevice=()=>{
    Api.get('/device').then(res=>{
        localStorage('mobile','yes');
    }).catch(err=>{
      console.log(err.response.status)
    })
  }
  getUser=()=>{
    Api.get('/users/',config).then(res=>{
      if(res.status===200){
        this.setState({user:res.data.id});
        localStorage.setItem('userid',res.data.id);
      }else{
        localStorage.clear()
      }
     }).catch(err=>{
      console.log(err.response.status)
    })
  }
  handleSearch =(e)=>{
    this.setState({search:e.target.value});
    this.getNotes();
  }
  render() {
    return (
      <div>
     <Header
      search={this.state.search}
      gosearch={this.handleSearch}
    />
    <div className="columns is-multiline" style={{marginTop:'65px',padding:"5px"}}>
    {this.state.notes!==[]? (this.state.notes.map((note) =>(
          <div className='column is-2'>
            
            <Note 
                key={note.id}
                user={this.state.user}
                id={note.id}
                title={note.title}
                text={note.body} 
                colors={note.bg_color}
                image={note.image}
                getnotes={this.getNotes}
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
}
