import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import API from "../../API";
import NavigationBar from "../Navigationbar";
import SearchHuts from "./SearchHuts";

function HutsPage(props) {

  const [loading, setLoading] = useState(true);
  const [huts, setHuts] = useState([]);

  return (
    <>
      <Container fluid className={'vh-100'} >
        <NavigationBar logout={props.logout} />
        <p></p>
        <Row>
          <SearchHuts setHuts={setHuts} setLoading={setLoading} />
        </Row>
        {!loading &&
          <Row>
            <DisplayHuts huts={huts} />
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
  const hut = props.hut;
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
      </Card.Body>
    </Card>
  )
}

export default HutsPage;