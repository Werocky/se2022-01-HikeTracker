import AuthContext from '../AuthContext';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import HikeList from './HikeList';
import API from '../API';


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
      <Container fluid className={'vh-100'}>
        <Row>
          <Col>
            <Sidebar /> {console.log(hikes)}
          </Col>
          <Col>
            {!loading &&
              <HikeList hikes={hikes} />
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

function Sidebar(props) {
  return (
    <>LOGIN</>
  );
}

export default MainLayout;