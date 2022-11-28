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

  const [hikes, setHikes] = useState([]); //empty array of hikes
  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const reloadHikes = async () => {
      const hikes_array = await API.getHikes();
      setHikes(hikes_array);
      setLoading(false);
    }
    try {
      reloadHikes();
    } catch (err) {
      // handling error
    }
  }, []);

  return (

      <AnimationRevealPage>
        <Hero />
      </AnimationRevealPage>

  );
}

export default MainLayout;