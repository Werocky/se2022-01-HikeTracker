import { useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import API from '../API';


function ParkingForm() {

    const [description,setDescription]=useState("");
    const [coord, setCoord] = useState(null);
    const [radius, setRadius] = useState(undefined);
    const [msg, setMsg] = useState('');
    const [gratis,setGratis]=useState("");

  // Need to reset the filter params with useEffect

  const handleSubmit = async (event) => {

    event.preventDefault();
    //console.log("Radius " + radius + "\nCoord: " + coord.lat + " " + coord.lng);
   
    if (coord === null) {
      setMsg("You did not selected any point!");
    } else if (radius === undefined) {
      setMsg("You did not select a distance!");
    } 
     // API.getNearHikes(radius, coord.lat, coord.lng).then(array => props.setHikes(array));
    
    else if(description===''){
      setMsg("Insert a description or a name for the parking");}
    else if(gratis==="" || gratis===null || gratis===undefined){
      setMsg("select if the parking is gratis or not");}
    else {
      setMsg('');
    }
    API.createParkingLot(description,gratis,coord).then(setMsg("ciao"));
  
  }

  const ClickPick = () => {
    useMapEvents({
      click(e) {
        if (e !== undefined) {
          setCoord(e.latlng);
        }
      }
    })
    return (
        <>
          {coord !== null &&
            <Marker position={{ lat: coord.lat, lng: coord.lng }}>
              <Popup>
                You selected this point <br /> Click on another place to change it.
              </Popup>
            </Marker>
          }
        </>
      )
    }
    const handleChange = (event) => {
        setGratis(event.target.value)
      }
  return (
    <>
     {msg &&
          <Alert variant="danger" onClose={() => setMsg('')} dismissible>
            {msg}
          </Alert>
        }

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formParking">
          <Form.Label>Geographical filter</Form.Label>
          <Form.Control type="text" value={description} placeholder="Insert description"
            onChange={(event) => {
              setDescription(event.target.value);
            }} />
         <Form.Label>Select if gratis or not</Form.Label>
         <div>
        <input
          type="radio"
          value='1'
          checked={gratis === '1'}
          onChange={handleChange}
        /> free
      </div>
      <div>
        <input
          type="radio"
          value='0'
          checked={gratis === '0'}
          onChange={handleChange}
        /> for a fee
      </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLength">
          <Form.Label>Geographical filter</Form.Label>
          <Col>
            <InputGroup>
              <Form.Control
                placeholder="Radius"
                onChange={(event) => {
                  setRadius(event.target.value);
                }}
              />
              <InputGroup.Text id="basic-addon2">km</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              Distance from selected point
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group>
          <MapContainer center={{ lat: 45.063128, lng: 7.661272 }} zoom={8} scrollWheelZoom style={{ height: 250 + "px", width: "100%", }}>
            <ClickPick />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </Form.Group>
      
      <hr style={{
        background: 'black',
        height: '10px',
      }} />
         <Row>
          <Col>
            <Button variant="primary" type="submit">Submit</Button>
          </Col>
        </Row>
      
        </Form>

    </>
  );
}


export {ParkingForm}