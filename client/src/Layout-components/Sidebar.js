import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import API from '../API';

function Sidebar(props) {

  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [minDist, setMinDist] = useState(undefined);
  const [maxDist, setMaxDist] = useState(undefined);
  const [minAscent, setMinAscent] = useState(undefined);
  const [maxAscent, setMaxAscent] = useState(undefined);
  const [minExTime, setMinExTime] = useState(undefined);
  const [maxExTime, setMaxExTime] = useState(undefined);

  // Need to reset the filter params with useEffect

  const handleSubmit = async (event) => {
    event.preventDefault();
    // call the API and pass all the filter params
    console.log(city+"\n"+province+"\n"+difficulty+"\n"+minDist+"\n"+maxDist+"\n"+minAscent+"\n"+maxAscent+"\n"+minExTime+"\n"+maxExTime);
    API.getFilteredHikes(minExTime, maxExTime, minAscent, maxAscent, minDist, maxDist, difficulty).then(array => props.setHikes(array));
  }


  return (
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
          <Button variant="primary" type="reset">
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Sidebar;