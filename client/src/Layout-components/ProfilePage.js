import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function ProfilePage(props) {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <Container fluid className={'vh-100'}>
      <Row>
        <Col>
          {auth.user.Role === "H" ? "Hiker page"
            : auth.user.Role === "L" ? "Local Guide page"
              : "Other role to be implemented"}
        </Col>
        <Col>
          {auth.user.Id}
        </Col>
        <Col>
          <Logout logout={props.logout} navigate={navigate} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {auth.user.Role === "L" && <>
            <Button onClick={() => { navigate('/addHike') }}>New Hike</Button>
            <p></p>
            <Button onClick={()=> navigate('/addParkingLot')}>Add Parking Lot</Button>
            </>

          }
          <Button onClick={() => { navigate('/') }}>Home Page</Button>
        </Col>
      </Row>
    </Container>
  );
}

function Logout(props) {
  return <div className='col-4 d-flex flex-row-reverse'>
    <Button variant="outline-danger" onClick={() => props.logout(props.navigate)}>
      <span className='btn-icon'><i className="bi bi-box-arrow-left"></i></span><span>Logout</span>
    </Button>
  </div>
}

export default ProfilePage;