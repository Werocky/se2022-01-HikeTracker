import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

function HikeDetails(props) {
  const auth = useContext(AuthContext);

  const params = useParams();
  const [hike, setHike] = useState(
    {
      Ascent: 2,
      City: "City1",
      Description: "a simple test description added with API and after modified",
      Difficulty: "T",
      ExpectedTime: "3",
      HikeId: "1",
      Length: 1.1,
      Province: "Province1",
      ReferencePoints: "none",
      Title: "Hike1",
      end: "none",
      start: "none",
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHike = async () => {    // NEED API TO GET HIKE GIVEN ID
      /*const hikeObj = await API.getHike(params.hikeID);
      setHike(hikeObj);
      setLoading(false);*/
    }
    try {
      loadHike();
    } catch (err) {
      //handling error
    }
  }, [])

  return (
    <Container fluid className={'vh-100'}>
      <Row>
        <Col>Title: {hike.Title}</Col>
        <Col>Length: {hike.Length} km</Col>
        <Col>Expected Time: {hike.ExpectedTime} mm</Col>
        <Col>Ascent: {hike.Ascent} m</Col>
        <Col>Difficulty: {hike.Difficulty}</Col>
      </Row>
      <Row>
        <Col>City: {hike.City}</Col>
        <Col>Province: {hike.Province}</Col>
        <Col>Start: {hike.start}</Col>
        <Col>End: {hike.end}</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>Description: {hike.Description}</Col>
      </Row>
      <p></p>
      <Row>
        <Col xs={1}></Col>
        <Col>

          <MapContainer center={[45.063, 7.661]} zoom={90} scrollWheelZoom={false} style={{ height: '90vh', width: '90wh' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[45.063, 7.661]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>

        </Col>
        <Col xs={1}></Col>

      </Row>


    </Container>
  );
}

export default HikeDetails;