import { useContext, useEffect, useState, React } from "react";
import { Container, Form, Button, Alert, FloatingLabel, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios'
import NavigationBar from "./Navigationbar";
import API from "../API";

function AddHike() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [file, setFile] = useState(undefined);
  const [added, setAdded] = useState(false);
  const [hikeId, setHikeId] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", file);
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:3001/saveFile/${hikeId}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.log(err);
      //errors handling
    }
  }

  return (
    <Container fluid className={'vh-100'}>
      <NavigationBar />

      <AddForm added={added} setAdded={setAdded} setHikeId={setHikeId} />

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Insert the gpx file</Form.Label>
          <Form.Control type="file" onChange={(e) => { setFile(e.target.files[0]) }}
            disabled={!added} required
          />
        </Form.Group>

        <div className="d-grid"><Button type="submit" className="btn btn-success"
          disabled={!added}
        >
          Insert</Button></div>
      </Form>
    </Container>
  )
};

function AddForm(props) {


  const [title, setTitle] = useState("");
  const [length, setLength] = useState(0.0);
  const [time, setTime] = useState(0);
  const [ascent, setAscent] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hike = {
      Title: title,
      Length: length,
      ExpectedTime: time,
      Ascent: ascent,
      Difficulty: difficulty,
      Start: start,
      End: end,
      Description: description,
      City: city,
      Province: province,
    }
    //console.log(hike);
    const res = await API.addHike(hike);
    console.log("RES " + res.hikeId);
    if (res) {
      props.setHikeId(res.hikeId);
      setMsg("New hike inserted!\nNow you can insert the gpx file!");
      props.setAdded(true);
    }
  }

  return (
    <Row>
      <Row>
        <h2>Insert a new hike, then its gpx file</h2>
        <p></p>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Insert Title</Form.Label>
            <Form.Control type="text" placeholder="Name" required
              onChange={(event) => {
                setTitle(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="length">
            <Form.Label>Insert Length</Form.Label>
            <Form.Control placeholder="Length" type="number" step="0.01" required
              onChange={(event) => {
                setLength(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="time">
            <Form.Label>Insert Expected Time (mm)</Form.Label>
            <Form.Control placeholder="Time in minutes" type="number" required
              onChange={(event) => {
                setTime(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="length">
            <Form.Label>Insert Ascent (mt) </Form.Label>
            <Form.Control placeholder="Ascent in meters" type="number" required
              onChange={(event) => {
                setAscent(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="difficulty">
            <Form.Label>Insert Difficulty</Form.Label>
            <Form.Control as="select" value={difficulty} aria-label="Difficulty" required
              onChange={(event) => {
                setDifficulty(event.target.value)
              }}>
              <option>Select difficulty</option>
              <option value="T">Tourist (T)</option>
              <option value="H">Hiker (H)</option>
              <option value="PH">Professional Hiker (PH)</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="start">
            <Form.Label>Insert Start (name)</Form.Label>
            <Form.Control placeholder="Start" type="text" required
              onChange={(event) => {
                setStart(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="end">
            <Form.Label>Insert End (name)</Form.Label>
            <Form.Control placeholder="End" type="text" required
              onChange={(event) => {
                setEnd(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Insert City</Form.Label>
            <Form.Control placeholder="City" type="text" required
              onChange={(event) => {
                setCity(event.target.value)
              }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="province">
            <Form.Label>Insert Province</Form.Label>
            <Form.Control placeholder="Province" type="text" required
              onChange={(event) => {
                setProvince(event.target.value)
              }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Insert Description</Form.Label>
            <FloatingLabel controlId="description" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Insert description here" required
                style={{ height: '100px' }}
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <p></p>
          <div className="d-grid">
            <Button type="submit" className="btn btn-success" disabled={props.added}>
              Insert</Button></div>


        </Form>
      </Row>
      <Row>
        {msg &&
          <Alert variant="success">
            <p>{msg}</p>
          </Alert>
        }
      </Row>
    </Row>
  )
}

export default AddHike
