import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import NavigationBar from "../Navigationbar";

function HutsPage(props) {

  const [loading, setLoading] = useState(true);
  const [huts, setHuts] = useState([]);

  return (
    <>
      <Container fluid className={'vh-100'}>
        <NavigationBar logout={props.logout} />
        <p></p>
        <Row>
          <Col sm={9}>
            HUTS
          </Col>
          <Col sm={3}>
          <SearchHuts />
          </Col>
        </Row>

      </Container>
    </>
  );
}

function SearchHuts(props) {
  
  const handleSubmit = async (event) => {
    event.prevent.default();

  }

  return (
    <Form onSubmit={handleSubmit}>

    </Form>
  )
}

export default HutsPage;