import { useContext, useEffect, useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';
import NavigationBar from "./Navigationbar";

function HikeDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hike, setHike] = useState(undefined);
  const [gpxData, setGpxData] = useState(undefined);  // array of [p.lat, p.lon]
  const [loading, setLoading] = useState(true);
  const [startSelection, setStartSelection] = useState('');
  const [endSelection, setEndSelection] = useState('');
  const [locations, setLocations] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    const loadHike = async () => {
      const hikeObj = await API.getHike(params.hikeID);
      //console.log(hikeObj);
      setHike(hikeObj);
      if (auth.login) {
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
        console.log(gpxObj[0].lat + "\t" + gpxObj[0].lon + "\n" + gpxObj.at(-1).lat + "\t" + gpxObj.at(-1).lon);
      }

      //NOT WORKING FOR WHATEVER REASON
      // const hikeInfo = await API.getHutsAndParks(params.hikeID);
      // setLocations(hikeInfo);
      // console.log(hikeInfo);
      setLoading(false);
    }
    try {
      loadHike();
    } catch (err) {
      //handling error
    }
  }, [params.hikeID, auth.login])

  function handleSubmit(){
    //TODO: handle data and submit to the server to store into db
  }

  return (
    <>
      <NavigationBar logout={props.logout} />
        <Container fluid className={'vh-100'}>
        {!loading && <>
          <Row>
            <Col>Title: {hike.Title}</Col>
            <Col>Length: {hike.Length} km</Col>
            <Col>Expected Time: {
              Math.floor(hike.ExpectedTime / 60) < 10 ?
                "0" + Math.floor(hike.ExpectedTime / 60) : Math.floor(hike.ExpectedTime / 60)}:{
                Math.floor(hike.ExpectedTime % 60) < 10 ?
                  "0" + Math.floor(hike.ExpectedTime % 60) : Math.floor(hike.ExpectedTime % 60)}</Col>
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
            
          </Row>
          <p></p>
          <hr />
          <p></p>
          {auth.login &&
            <Row>
              <Col xs={1}></Col>
              <Col>
                <MapContainer
                  center={[gpxData[Math.ceil(gpxData.length / 2)].lat, gpxData[Math.ceil(gpxData.length / 2)].lon]}
                  bounds={[gpxData[0], gpxData.at(-1),]}
                  scrollWheelZoom
                  style={{ height: 500 + "px", width: "100%", }}>
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
          {!loading && auth.user && auth.user.Role === 'H' && <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                  <Form.Group className='mb-3' controlId='StartPoint'>
                  <Form.Label>Hike's start point</Form.Label>
                  <Form.Control as="select" value={startSelection} aria-label='Start Point' onChange={(event) => {
                    setStartSelection(event.target.value)
                  }}>
                  <option>Select the start point of the hike</option>
                  {startSelection && locations.map((location) =>{
                    return <option key={location} value={location}></option>
                  })}
                  </Form.Control>
                  </Form.Group> 
              </Col>
            </Row>
            <Row>
              <Col>
                  <Form.Group className='mb-3' controlId='EndPoint'>
                  <Form.Label>Hike's End point</Form.Label>
                  <Form.Control as="select" value={endSelection} aria-label='End Point' onChange={(event) => {
                    setEndSelection(event.target.value)
                  }}>
                  <option>Select the end point of the hike</option>
                  {endSelection && locations.map((location) =>{
                    return <option key={location} value={location}></option>
                  })}
                  </Form.Control>
                  </Form.Group> 
              </Col>
            </Row>
            <Col>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Col>
            </Form>}
          {!auth.login &&
            <Row>
              <Col>You should be logged to see the map</Col>
            </Row>}

        </>}
      </Container>

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