import AuthContext from '../AuthContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import API from '../API';
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
        <Hero logout={props.logout}/>
      </AnimationRevealPage>

  );
}

export default MainLayout;