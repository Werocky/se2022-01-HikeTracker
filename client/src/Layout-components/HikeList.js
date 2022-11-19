import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function HikeList(props) {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('Title');
  useEffect(() => {
    if (sortType !== "") {
      const sortArray = type => {
        const types = {
          Title: 'Title',
          Length: 'Length',
          Ascent: 'Ascent',
          Difficulty: 'Difficulty',
          ExpectedTime: 'ExpectedTime'
        };
        const sortProperty = types[type];
        let sorted;
        if (sortProperty === "Title" || sortProperty === "Difficulty")
          sorted = [...props.hikes].sort((a, b) => {
            if (a[sortProperty] > b[sortProperty]) { return -1 }
            if (a[sortProperty] < b[sortProperty])
              return 1
            return 0

          });

        else
          sorted = [...props.hikes].sort((a, b) => b[sortProperty] - a[sortProperty]);
        props.setHikes(sorted);
      };
      sortArray(sortType);
      setSortType("");
    }
  }, [sortType]);

  return (
    <Table >
      <thead>
        <tr>
          <th onClick={() => { setSortType("Title"); }}>Title</th>
          <th onClick={() => { setSortType("Length") }}>Length (km)</th>
          <th onClick={() => { setSortType("Ascent") }}>Ascent (m)</th>
          <th onClick={() => { setSortType("Difficulty") }}>Difficulty</th>
          <th onClick={() => { setSortType("ExpectedTime") }}>Expected time (h:m)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          props.hikes.map((hike) => (
            <HikeElement key={hike.HikeID} hike={hike} />
          ))
        }
      </tbody>
    </Table>
  );
}

function HikeElement(props) {
  const navigate = useNavigate();

  const hike = props.hike;
  console.log(hike);

  const hh = Math.floor(hike.ExpectedTime / 60);
  const mm = Math.floor(hike.ExpectedTime % 60);

  return (
    <tr>
      <td>{hike.Title}</td>
      <td>{hike.Length}</td>
      <td>{hike.Ascent}</td>
      <td>{hike.Difficulty}</td>
      <td>{hh < 10 ? "0" + hh : hh}:{mm < 10 ? "0" + mm : mm}</td>
      <td>
        <Button onClick={() => navigate("/" + hike.HikeID)} >Details</Button>
      </td>
    </tr>
  );
}

export default HikeList;