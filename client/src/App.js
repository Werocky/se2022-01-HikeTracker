import 'bootstrap/dist/css/bootstrap.min.css'
//import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import MainLayout from './Layout-components/MainLayout';
import API from './API';
import { LoginComponent } from './Layout-components/LoginComponent';
import { RegisterComponent } from './Layout-components/RegisterComponent';
import HikeDetails from './Layout-components/HikeDetails';
//import AddHikeForm from './Layout-components/AddHikeForm';
import ProfilePage from './Layout-components/ProfilePage';
import Profile from './pages/Profile'
import HutsPage from './Layout-components/Huts-components/HutsPage';
import ParkingForm from './Layout-components/ParkingForm';
import VerifiedMessage from './Layout-components/VerificationPage';
import HutForm from './Layout-components/AddHut';

import Register from "./pages/Signup";
import Login from './pages/Login'
import Hikes from './pages/Hikeslist'
import Huts from './pages/Hutslist'
import AddParkingLot from './components/forms/AddParkingLot';
import AddHikeForm from './components/forms/AddHikeForm'

import "./style.css"
import "tailwindcss/lib/css/preflight.css"
import AddHutForm from './components/forms/AddHutForm';
import HutDetails from './Layout-components/HutDetails';
import Sidebar from './Layout-components/Sidebar';
import SearchHuts from './Layout-components/Huts-components/SearchHuts';

function App() {

  const [message, setMessage] = useState(''); //message error state
  const [msgType, setMsgType] = useState('danger'); //change color of the message
  const [auth, setAuth] = useState({  // login information
    login: false,
    user: { Role: '' },
  });

  function errorHandler(err) {
    if (err.hasOwnProperty('error'))
      {setMessage(() => err.error.toString()); setMsgType('danger');}
    else if (err.hasOwnProperty('message'))
      {setMessage(() => err.message); setMsgType('danger');}
    else
      {setMessage(() => err.toString()); setMsgType('danger');}
  }

  const login = (email, password) => {
    API.logIn(email, password)
      .then(user => {
        setAuth({
          login: true,
          user: user,
        });
      }).catch(err => errorHandler(err));
  };

  const logout = async (navigate) => {
    await API.logOut();
    setAuth({
      login: false,
      user: { Role: '' },
    })
    navigate('/');
  };

  const register = (credentials) => {
    API.register(credentials)
      .then((res) => { console.log(res); if (res.hasOwnProperty('error')) errorHandler(res); else {setMessage('Registration successful! Check email for confirmation and follow the instruction.'); setMsgType('primary');} })
      .catch(err => errorHandler(err));
  }

  useEffect(() => {   // check login     
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      if (user) {
        setAuth({
          login: true,
          user: user,
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>   {/* this is used to pass user information*/}
        <AppLayout login={login} logout={logout} register={register} setLogged={setAuth} message={message} setMessage={setMessage} msgType={msgType} setMsgType={setMsgType} errorHandler={errorHandler}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

function AppLayout(props) {
  const auth = useContext(AuthContext);   // contains user information 

  const [hikes, setHikes] = useState([]);
  const [huts, setHuts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const reloadHikes = async () => {
      const hikes_array = await API.getHikes();
      console.log(hikes_array);
      setHikes(hikes_array);
    }
    const reloadHuts = async () => {
      const huts_array = await API.getHutsFilters();
      console.log(huts_array);
      setHuts(huts_array);
    }
    try {
      reloadHikes();
      reloadHuts();
      setLoading(false);
    } catch (err) {
      // handling error
    }
  }, []);

  return (
    <>
      <Container>
        <Row><Col>
          {props.message ? <Alert variant={props.msgType} onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : false}
        </Col></Row>
      </Container>
      <Routes>
        <Route path='/' element={
          <MainLayout
            logout={props.logout}
          />
        } />
        <Route path='/:hikeID' element={
          <HikeDetails logout={props.logout} />
        } />
        <Route path='/huts/:hutID' element={
          <HutDetails logout={props.logout} hikes={hikes} errorHandler={props.errorHandler}/>
        } />

        <Route path='/register' element={
          <Register register={props.register} />
          // <RegisterComponent register={props.register} />

        } />
        <Route path='/login' element={
          <Login login={props.login} />
          // < LoginComponent  login={props.login} />
        } />
        <Route path='/addHike' element={
          <AddHikeForm logout={props.logout} message={props.message} errorHandler={props.errorHandler} /> 
        } />
        <Route path='/hikes' element={
          <Hikes hikes={hikes} loading={loading} setHikes={setHikes} logout={props.logout} />
        } />
        <Route path='/huts' element={

          <Huts huts={huts} loading={loading} setHuts={setHuts} logout={props.logout} /> 
        } />

        <Route path='/profile/:userId' element={
          <Profile logout={props.logout} />

        } />
        {/*<Route path='/huts' element={*/}
        {/*  <HutsPage logout={props.logout} />*/}
        {/*} />*/}
        <Route path='/addParkingLot' element={
          <AddParkingLot logout={props.logout} message={props.message} errorHandler={props.errorHandler} setMessage={props.setMessage} setMsgType={props.setMsgType}/> 
        } />
        <Route path='/verify' element={
          < VerifiedMessage />
        } />
         <Route path='/addHut' element={
          < AddHutForm huts = {huts} setHuts={setHuts} message={props.message} errorHandler={props.errorHandler} logout={props.logout} /> 
        } />

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
    </>
  );
}



export default App;
