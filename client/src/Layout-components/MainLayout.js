import AuthContext from '../AuthContext';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import HikeList from './HikeList';
import API from '../API';
import Sidebar from './Sidebar';
import { LoginComponent } from './LoginComponent';


function MainLayout(props) {
  const auth = useContext(AuthContext);

  const [hikes, setHikes] = useState([]); //empty array of hikes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reloadHikes = async () => {
      const hikes_array = await API.getHikes();/*[{ "k": "h1", "v": "hike 1" }, { "k": "h2", "v": "hike 2" }, { "k": "h3", "v": "hike 3" }]*/
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
    <>
      <Navigation login={props.login}/> {console.log(hikes)}
      <Container fluid className={'vh-100'}>
        <p></p>
        { !loading &&
        <Row>
          <Col sm={9}>
              <HikeList hikes={hikes} />
          </Col>
          <Col sm={3}>
            <Sidebar setHikes={setHikes}/>
          </Col>
        </Row>
        }
      </Container>
    </>
  );
}

function Navigation(props) {
  return (
    <Navbar bg="light">
      <LoginComponent login={props.login}/>
    </Navbar>
  );
}

export default MainLayout;