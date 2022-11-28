import { useState } from "react";
import { Alert, Button, Col, Form, Row ,Container} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import API from '../API';

function HutForm() {

   const [errorMsg,setErrorMsg]=useState("");
   const [name,setName]=useState("");
   const [elevation,setElevation]=useState();
   const [city,setCity]=useState("");
   const [province,setProvince]=useState("");
   const [region,setRegion]=useState("");
   const [country,setCountry]=useState("");
   const [whenOpen,setWhenOpen]=useState("");
   const [beds,setBeds]=useState();
   const [description,setDescription]=useState("");
   const [avgPrice,setAvgPrice]=useState();
   const [coord,setCoord]=useState(null);
  // Need to reset the filter params with useEffect

  const handleSubmit = async (event) => {

    event.preventDefault();
    if( !name || name.trim().length===""){
        setErrorMsg("insert a name");
    }
    else  if( !elevation){
        setErrorMsg("insert an elevation");
    }
    else if( !city || city.trim().length===""){
        setErrorMsg("insert a city");
    }
    else if( !province || province.trim().length===""){
        setErrorMsg("insert a province");
    }
    else if( !region || region.trim().length===""){
        setErrorMsg("insert a region");
    }
    else if( !country || country.trim().length===""){
        setErrorMsg("insert a coutry");
    }
    else if(!whenOpen || whenOpen.trim().length===0)
    {
        setErrorMsg("select when it s open");
    }
    else  if( !beds){
        setErrorMsg("insert the number of beds");
    }
    else  if( !setAvgPrice){
        setErrorMsg("insert the average price");
    }
    else  if( !description || description.trim().length===0){
        setErrorMsg("insert a description");
    }
    else if (coord === null) {
        setErrorMsg("You did not selected any point!");
        
  }
  else
  {
    let h={
        name:name,
        elevation:elevation,
        city:city,
        province:province,
        region:region,
        country:country,
        whenOpen:whenOpen,
        beds:beds,
        avgPrice:avgPrice,
        description:description,
        coord:coord
    }
  /*  API.addHut(h)
      .then( () => {
        console.log("ok");
      })//setDirty(true)})
      .catch( err => setErrorMsg(err));
      */
     setErrorMsg("Hut aggiunto");
  }
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
   return (
        <>
         <Container>
        <Row>
          <Col>
            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>name</Form.Label>
                <Form.Control type='text' value={name} onChange={ev => setName(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Elevation</Form.Label>
                <Form.Control type='number' min={0} value={elevation} onChange={ev => setElevation(ev.target.value)} />
              </Form.Group>
              <Form.Group>
              <Form.Label>City</Form.Label>
                <Form.Control type='text' value={city} onChange={ev => setCity(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
              <Form.Label>Province</Form.Label>
                <Form.Control type='text' value={province} onChange={ev => setProvince(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
              <Form.Label>Region</Form.Label>
                <Form.Control type='text' value={region} onChange={ev => setRegion(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
              <Form.Label>Country</Form.Label>
                <Form.Control type='text' value={country} onChange={ev => setCountry(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
              <Form.Label>whenOpen
              </Form.Label>
              <Form.Select aria-label="Default select example" onChange={ev=>setWhenOpen(ev.target.value)}>
              <option value="W">Winter</option>
              <option value="S">Summer</option>
              <option value="WS">Winter and summer</option>
              <option value="N">Never</option>
              </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of beds</Form.Label>
                <Form.Control type='number' min={0} value={beds} onChange={ev => setBeds(ev.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Average price for person</Form.Label>
                <Form.Control type='number' min={0} value={avgPrice} onChange={ev => setAvgPrice(ev.target.value)} />
              </Form.Group>
              <Form.Group>
              <Form.Label>Description</Form.Label>
                <Form.Control type='text' value={description} onChange={ev => setDescription(ev.target.value)}>
                </Form.Control>
              </Form.Group>
              <Form.Group>
            <MapContainer center={{ lat: 45.063128, lng: 7.661272 }} zoom={8} scrollWheelZoom style={{ height: 250 + "px", width: "100%", }}>
                <ClickPick />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </Form.Group>
              <Button type='submit' >Save</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
   }


export default HutForm