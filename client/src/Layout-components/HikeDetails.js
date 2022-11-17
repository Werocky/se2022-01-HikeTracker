import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';

function HikeDetails(props) {
  const auth = useContext(AuthContext);

  const params = useParams();
  const [hike, setHike] = useState(undefined);
  const [gpxData, setGpxData] = useState(undefined);  // array of [p.lat, p.lon]
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadHike = async () => {
      const hikeObj = await API.getHike(params.hikeID);
      //console.log(hikeObj);
      setHike(hikeObj);
      if (auth.login) {
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
      }
      setLoading(false);

    }
    try {
      loadHike();
    } catch (err) {
      //handling error
    }
  }, [params.hikeID, auth.login])

  const hh = Math.ceil(hike.ExpectedTime / 60);
  const mm = Math.ceil(hike.ExpectedTime % 60);

  return (
    <>
      {!loading &&
        <Container fluid className={'vh-100'}>
          <Row>
            <Col>Title: {hike.Title}</Col>
            <Col>Length: {hike.Length} km</Col>
            <Col>Expected Time: {hh < 10 ? "0" + hh : hh}:{mm < 10 ? "0" + mm : mm}</Col>
            <Col>Ascent: {hike.Ascent} m</Col>
            <Col>Difficulty: {hike.Difficulty}</Col>
          </Row>
          <Row>
            <Col>City: {hike.City}</Col>
            <Col>Province: {hike.Province}</Col>
            <Col>Start: {hike.Start}</Col>
            <Col>End: {hike.End}</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>Description: {hike.Description}</Col>
            {auth.user.role === 'l' &&
              <Col>
                <Button onClick={() => navigate("/modifyHikeDesc/" + params.hikeID)}>Modify</Button>
              </Col>
            }
          </Row>
          <p></p>
          <hr />
          <p></p>
          {auth.login &&
            <Row>
              <Col xs={1}></Col>
              <Col>
                <MapContainer center={[gpxData[Math.ceil(gpxData.length / 2)].lat, gpxData[Math.ceil(gpxData.length / 2)].lon]} zoom={14} scrollWheelZoom style={{ height: 500 + "px", width: "100%", }}>
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={gpxData}
                  />
                  <StartPoint position={gpxData[0]} />
                  <EndPoint position={gpxData.at(-1)} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>

              </Col>
              <Col xs={1}></Col>

            </Row>
          }
          {!auth.login &&
            <Row>
              <Col>You should be logged to see the map</Col>
            </Row>}


        </Container>
      }
    </>
  );
}

function StartPoint(props) {
  return (
    <Marker position={props.position}>
      <Popup>
        This is the starting point
      </Popup>
    </Marker>
  );
}

function EndPoint(props) {
  return (
    <Marker position={props.position}>
      <Popup>
        This is the ending point
      </Popup>
    </Marker>
  );
}

export default HikeDetails;