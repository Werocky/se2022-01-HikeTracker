import { Table } from "react-bootstrap";

function HikeList(props) {
  console.log(props.hikes);
  return (
    <Table >
      <thead>
        <tr>
          <th>Title</th>
          <th>Length</th>
          <th>Ascent</th>
          <th>Difficulty</th>
          <th>Expected time</th>
          <th>Start</th>
          <th>End</th>
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
    </tr>
  );
}

export default HikeList;