'use strict';
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import API from "../../API";
import AuthContext from "../../AuthContext";
import NavigationBar from "../Navigationbar";
import SearchHuts from "./SearchHuts";

function HutsPage(props) {

  const [huts, setHuts] = useState(props.huts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHuts = async () => {
      const prov_huts = await API.getHutsFilters();
      console.log(prov_huts);
      setHuts(prov_huts);
    }
    loadHuts();
  }, []);

  return (
    <>
      <NavigationBar logout={props.logout} />
        <Container fluid className={'vh-100'} >
        <p></p>
        <Row>
          <SearchHuts setHuts={props.setHuts} setLoading={setLoading} />
        </Row>
        {!loading &&
          <Row>
            <DisplayHuts huts={huts}/>
          </Row>
        }
      </Container>
    </>
  );
}

function DisplayHuts(props) {
  return (
    <Row lg={3}>
      {
        props.huts.map((hut) => (
          <Col className="d-flex" key={hut.RefPointID}>
            <HutCard key={hut.RefPointID} hut={hut} />
          </Col>
        ))
      }
    </Row>
  )
}

function HutCard(props) {
  const auth = useContext(AuthContext);
  const hut = props.hut;
  const [descr, setDescr] = useState('');
  const navigate = useNavigate();
  
  const handleSave = (event) => {
    event.preventDefault();
    API.setHutDescription(descr, props.hut.RefPointID).then(() => {navigate('/huts')}).catch(err => console.log(err));
    navigate('/huts');
  }

  return (
    <Card style={{ width: '18rem' }} className="flex-fill">
      <Card.Header>
        <Row>
          <Col>
            {hut.Name}
          </Col>
          <Col>
            Elevation: {hut.Elevation}mt.
          </Col>
          <Col>
            {hut.City}, {hut.Province}, {hut.Region}, {hut.Country}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            The hut is {
              hut.WhenOpen === 'C' ? "permanently closed"
                : "open "}
            {
              hut.WhenOpen === 'Y' ? "all year"
                : hut.WhenOpen === 'S' ? "during summer"
                  : hut.WhenOpen === 'W' ? "during winter"
                    : hut.WhenOpen === 'SW' ? "during both summer and winter"
                      : ""}
          </Col>
          <Col>
             Here are available {hut.Beds} beds and the average price for a nigth is {hut.AvgPrice} euros 
          </Col>
        </Row>
        <Row>
          {hut.Description}
        </Row>
        <Row>
        {auth.user.Role == 'L' ? <>
          <Form.Control
            id="description" onChange={ev => setDescr(ev.target.value)}
          />
          <Form.Text id="descriptionhelp" muted>
            Insert here a description for the current hut.
          </Form.Text>
        </>: <></>}
          {auth.user.Role == 'L' ? <Col>
          <Button variant="secondary" onClick={handleSave} >Set Description</Button>
          </Col> : <></>}
        </Row>
      </Card.Body>
    </Card>
  )
}

export default HutsPage;