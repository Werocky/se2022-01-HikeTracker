import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function HikeList(props) {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('title');
  useEffect(() => {
    if(sortType!="")
    {
    const sortArray = type => {
      const types = {
        Title: 'Title',
        Length: 'Length',
        Ascent: 'Ascent',
        Difficulty:'Difficulty',
        ExpectedTime:'ExpectedTime'
      };
      const sortProperty = types[type];
      const sorted = [...props.hikes].sort((a, b) => b[sortProperty] - a[sortProperty]);
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
          <th onClick={()=> {setSortType("Title");}}>Title</th>
          <th onClick={()=> {setSortType("Length")}}>Length (km)</th>
          <th onClick={()=> {setSortType("Ascent")}}>Ascent (m)</th>
          <th onClick={()=> {setSortType("Difficulty")}}>Difficulty</th>
          <th onClick={()=> {setSortType("ExpectedTime")}}>Expected time (mm)</th>
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
      <td>
        <Button onClick={() => navigate("/" + hike.HikeId)} >Details</Button>
      </td>
    </tr>
  );
}

export default HikeList;