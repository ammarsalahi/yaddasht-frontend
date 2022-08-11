import React from 'react'
import ReactDom from 'react-dom';
import Signin from './users/Signin';
import Signup from './users/Signup';
import PrivateRoute from './PrivateRoute';
import ListNotes2 from "./notes/ListNotes2";
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";
import ViewNote from './notes/ViewNote';
import EditUser from './users/EditUser';
import EditNote from './notes/EditNote';
import AddNote from './notes/AddNote'
export default function Main() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="signup" element={<Signup/>} />
        <Route path="signin" element={<Signin/>} />
        <Route path="/" exact element={
        <PrivateRoute>
        <ListNotes2/>
        </PrivateRoute>
        
        } />
        <Route path="/:id" element={
        <PrivateRoute>
        <ViewNote/>
        </PrivateRoute>
        }/>
       
        <Route path="settings" element={
        <PrivateRoute>
          <EditUser/>
        </PrivateRoute>
        } />
        <Route path="add" element={
        <PrivateRoute>
          <AddNote/>
        </PrivateRoute>
        } />
        <Route path="edit/:id" element={
        <PrivateRoute>
          <EditNote/>
        </PrivateRoute>
        } />

    </Routes>
    </BrowserRouter>
    </>
  )
}
ReactDom.render(<Main/>, document.getElementById('root'));