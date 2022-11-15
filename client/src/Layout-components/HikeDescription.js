import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState, React } from "react";
import { Container, Form, Button, Alert, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import API from '../API';
import axios from 'axios'

function HikeDescription() {
  const params = useParams();
  const hikeId = params.hikeId;
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(undefined);

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Insert description</Form.Label>
          <Form.Control type="text" placeholder="Hike description" onChange={(e) => setDescription(e.target.value)} value={description} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Insert the file</Form.Label>
          <Form.Control type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
        </Form.Group>

        <div className="d-grid"><Button type="submit" className="btn btn-success">Insert</Button></div>
      </Form>
    </Container>
  )
};

export { HikeDescription }
