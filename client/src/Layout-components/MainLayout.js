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
    <>
      <Navigation login={props.login} logout={props.logout} />
      <Container fluid className={'vh-100'}>
        <p></p>
        {!loading &&
          <Row>
            <Col sm={9}>
              <HikeList hikes={hikes} />
            </Col>
            <Col sm={3}>
              <Sidebar setHikes={setHikes} />
            </Col>
          </Row>
        }
      </Container>
    </>
  );
}

function Navigation(props) {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="light">
      <LoginComponent login={props.login} />
    </Navbar>
  );
}

export default MainLayout;