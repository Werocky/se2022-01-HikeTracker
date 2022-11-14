import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HikeList(props) {
  return (
    <Table >
      <thead>
        <tr>
          <th>Title</th>
          <th>Length (km)</th>
          <th>Ascent (m)</th>
          <th>Difficulty</th>
          <th>Expected time (mm)</th>
          <th>Start</th>
          <th>End</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          props.hikes.map((hike) => (
            <HikeElement key={hike.HikeId} hike={hike} />
          ))
        }
      </tbody>
    </Table>
  );
}

function HikeElement(props) {
  const navigate = useNavigate();

  const hike = props.hike;

  return (
    <tr>
      <td>{hike.Title}</td>
      <td>{hike.Length}</td>
      <td>{hike.Ascent}</td>
      <td>{hike.Difficulty}</td>
      <td>{hike.ExpectedTime}</td>
      <td>{hike.start}</td>
      <td>{hike.end}</td>
      <td>
        <Button onClick={() => navigate("/" + hike.HikeId)} >Details</Button>
      </td>
    </tr>
  );
}

export default HikeList;