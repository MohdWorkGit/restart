import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-tabs/style/react-tabs.css';



import React, { useEffect, useState} from "react";
import './App.css';
import './Form.css';

import {BrowserRouter as Router, Routes,  Route } from "react-router-dom";

import Servers from "./pages/Servers";
import SingleServer from "./pages/SingleServer";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Users from "./pages/Users";
import AllServers from './pages/AllServers';
import NewPassword from './pages/NewPassword';
import AddNewServerAdmin from './components/AddNewServerAdmin';

import Cookie from 'universal-cookie'
import NavbarMenu from "./components/NavbarMenu";
import { UserContext } from "./contexts/UserContext";



// import ProtectedRoutes from "./ProtectedRoutes";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (new Cookie().get("userID") === undefined){
      setIsLoggedIn(false);
      }
    else{
      setIsLoggedIn(true);
      }        
  });

  return (
    <>
      
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
        <NavbarMenu/>
        <Router>
          <Routes>
          {
            isLoggedIn ?
            <>
                <Route  path="/" element={<Servers/>} />
            </> : <Route  path="/" element={<Login/>} />
          }
            
            <Route  path='/servers' element={<Servers/>} />
            <Route  path='/SingleServer/:id' element={<SingleServer/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/logout' element={<Logout/>} />
            <Route  path='/register' element={<Register/>} />
            <Route  path='/users' element={<Users/>} />
            <Route  path='/all-servers' element={<AllServers/>} />
            <Route  path='/new-password/:token' element={<NewPassword/>} />
            <Route  path='/newServerAdmin' element={<AddNewServerAdmin/>} />
            <Route component={<Error/>} />
          </Routes>
        </Router>
      </UserContext.Provider>

      {/* <ProtectedRoutes/> */}

    </>
  );
}

export default App;
