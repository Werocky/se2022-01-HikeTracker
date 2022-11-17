import { useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import API from '../API';


function Sidebar(props) {

  const [city, setCity] = useState(undefined);
  const [province, setProvince] = useState(undefined);
  const [difficulty, setDifficulty] = useState(undefined);
  const [minDist, setMinDist] = useState(undefined);
  const [maxDist, setMaxDist] = useState(undefined);
  const [minAscent, setMinAscent] = useState(undefined);
  const [maxAscent, setMaxAscent] = useState(undefined);
  const [minExTime, setMinExTime] = useState(undefined);
  const [maxExTime, setMaxExTime] = useState(undefined);

  // Need to reset the filter params with useEffect

  const handleSubmit = async (event) => {
    event.preventDefault();
    let t_minExTime = minExTime;
    let t_maxExTime = maxExTime;
    let t_minAscent = minAscent;
    let t_maxAscent = maxAscent;
    const t_province = province;
    let t_minDist = minDist;
    let t_maxDist = maxDist;
    const t_city = city;
    const t_difficulty = difficulty;

    if(t_minExTime=="" || t_minExTime==undefined)
      t_minExTime=0;
    if(t_maxExTime=="" )
      t_maxExTime=undefined;
    if(t_minAscent=="" || t_minAscent==undefined)
      t_minAscent=0;
    if(t_maxAscent=="")
      t_maxAscent=undefined;
    if(t_minDist=="" || t_minDist==undefined)
      t_minDist=0;
    if(t_maxDist=="")
      t_maxDist=undefined;

    //console.log(city+"\n"+province+"\n"+difficulty+"\n"+minDist+"\n"+maxDist+"\n"+minAscent+"\n"+maxAscent+"\n"+minExTime+"\n"+maxExTime);
    // call the API and pass all the filter params
    API.getFilteredHikes(t_minExTime, t_maxExTime, t_minAscent, t_maxAscent, t_province, t_city, t_minDist, t_maxDist, t_difficulty).then(array => props.setHikes(array));
  }

  const handleReset = (event) => {
    setCity(() => undefined);
    setProvince(() => undefined);
    setMinExTime(() => undefined);
    setMinDist(() => undefined);
    setMinAscent(() => undefined);
    setDifficulty(() => undefined);
    setMaxDist(() => undefined);
    setMaxAscent(() => undefined);
    setMaxExTime(() => undefined);

    API.getHikes().then(array=>props.setHikes(array));
  }


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGeographical">
          <Form.Label>Geographical filter</Form.Label>
          <Form.Control type="text" placeholder="Insert City"
            onChange={(event) => {
              setCity(event.target.value)
            }} />
          <Form.Control type="text" placeholder="Insert Province"
            onChange={(event) => {
              setProvince(event.target.value)
            }} />
          <Form.Text className="text-muted">
            City or Province
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label>Difficulty filter</Form.Label>
          <Form.Control as="select" value={difficulty} aria-label="Select Difficulty"
            onChange={(event) => {
              setDifficulty(event.target.value)
            }}>
            <option>Select difficulty</option>
            <option value="T">Tourist</option>
            <option value="H">Hiker</option>
            <option value="PH">Professional Hiker</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLength">
          <Form.Label>Length filter</Form.Label>
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Distance"
                  onChange={(event) => {
                    setMinDist(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">km</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Min dist.
              </Form.Text>
            </Col>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Distance"
                  onChange={(event) => {
                    setMaxDist(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">km</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Max dist.
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAscent">
          <Form.Label>Ascent filter</Form.Label>
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Ascent"
                  onChange={(event) => {
                    setMinAscent(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">m</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Min asc.
              </Form.Text>
            </Col>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Ascent"
                  onChange={(event) => {
                    setMaxAscent(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">m</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Max asc.
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formExpectedTime">
          <Form.Label>Expected Time filter</Form.Label>
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Time"
                  onChange={(event) => {
                    setMinExTime(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">mins</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Min Time.
              </Form.Text>
            </Col>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Time"
                  onChange={(event) => {
                    setMaxExTime(event.target.value)
                  }}
                />
                <InputGroup.Text id="basic-addon2">mins</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                Max Time.
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="reset" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      <hr style={{
        background: 'black',
        height: '10px',
      }} />

      <GeogForm setHikes={props.setHikes} />

    </>
  );
}

function GeogForm(props) {

  const [coord, setCoord] = useState(null);
  const [radius, setRadius] = useState(undefined);
  const [msg, setMsg] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Radius " + radius + "\nCoord: " + coord);
    if (coord === null) {
      setMsg("You did not selected any point!");
    } else if(radius === undefined) {
      setMsg("You did not select a distance!");
    } else {
      setMsg('');
      //API.getNearHikes(radius, coord);
    }
  }


  return (
    <>
      <Form onSubmit={handleSubmit}>
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

        <br />

        {msg &&
          <Alert variant="danger" onClose={() => setMsg('')} dismissible>
            {msg}
          </Alert>
        }

        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="reset" /*onClick={}*/>
              Reset
            </Button>
          </Col>
        </Row>

      </Form>

      <br />
    </>
  );
}

export default Sidebar;