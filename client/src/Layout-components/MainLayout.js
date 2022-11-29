import AuthContext from '../AuthContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import HikeList from './HikeList';
import API from '../API';
import Sidebar from './Sidebar';
import NavigationBar from './Navigationbar';
import { useNavigate } from 'react-router-dom';


import "../style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "../helpers/AnimationRevealPage"
import Hero from "../components/hero/LandingPage"

function MainLayout(props) {

 
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  

  return (

      <AnimationRevealPage>
        <Hero />
      </AnimationRevealPage>

  );
}

export default MainLayout;