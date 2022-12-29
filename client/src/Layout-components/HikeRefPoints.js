import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import tw from "twin.macro";
import styled from "styled-components";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import * as L from "leaflet";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../API";
import { StartPoint, EndPoint, RefPoint } from "./RefPointsTypes";
import distanceBetweenPoints from "../DistanceBeteenPoints";
import { Button } from "react-bootstrap";

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const InputContainer = tw.div`relative py-5 mt-6`;
const InputOption = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-medium text-lg`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const SubmitButton = tw.button`w-full  mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const MapColumn = tw(Column)`md:w-5/12 flex-shrink-0  md:h-auto relative `;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

function HikeRefPoints(props) {

  const params = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [refPoints, setRefPoints] = useState([]);
  const [gpxData, setGpxData] = useState();
  const [bounds, setBounds] = useState(undefined);

  const [coord, setCoord] = useState(null);
  const [coordChange, setCoordChange] = useState(false);
  const [refPType, setRefPType] = useState("");
  const [refPDesc, setRefPDesc] = useState("");
  const [refPStartEnd, setRefPStartEnd] = useState("");

  const [startPresent, setStartPresent] = useState(false);
  const [endPresent, setEndPresent] = useState(false);

  useEffect(() => {
    const load = async () => {
      //console.log(location);
      setLoading(true);
      setRefPoints(location.state.refPoints);
      //console.log(location.state.refPoints);
      setGpxData(location.state.gpxData);
      setBounds(location.state.bounds);
    }
    load();
    setLoading(false);

  }, [location])

  useEffect(() => {
    if (coord) {
      setCoordChange(true);
    }
  }, [coord]);

  useEffect(() => {
    console.log(refPoints)
    refPoints.forEach(rp => {
      if (rp.IsStart) {
        setStartPresent(true);
      }
      if (rp.IsEnd) {
        setEndPresent(true);
      }
    })
  }, [refPoints]);

  

  const handleSubmitRefPoint = async (event) => {
    event.preventDefault();
    const refPObj = {
      Lat: coord.Lat,
      Lng: coord.Lng,
      description: refPDesc,
      Type: refPType,
      IsStart: refPStartEnd === "start" ? 1 : 0,
      IsEnd: refPStartEnd === "end" ? 1 : 0,
      RefPointID: "N" + refPoints.length,
    }
    //console.log(refPObj);
    setRefPoints(old => [...old, refPObj]);
    setCoordChange(false);
  }

  const clickDelete = (id) => {
    let tmpRP = refPoints.filter(rp => {
      return rp.RefPointID !== id;
    });
    tmpRP = tmpRP.map((rp, i) => (
      { ...rp, RefPointID: isNaN(rp.RefPointID) ? "N" + i : rp.RefPointID }
    ));
    setStartPresent(false);
    setEndPresent(false);
    setRefPoints(tmpRP);

  }

  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      {!loading &&
        <Container>
          <TwoColumn>

            <MapColumn>
              <MapContainer
                bounds={bounds}
                scrollWheelZoom
                style={{ height: 500 + "px", width: "100%", }}>
                <ClickPickNearest points={gpxData} coord={coord} setCoord={setCoord} />
                <Polyline
                  pathOptions={{ fillColor: 'red', color: 'blue' }}
                  positions={gpxData}
                />
                {refPoints.map(rp => (

                  rp.IsStart ?
                    <StartPoint key={rp.refPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type} />
                    : rp.IsEnd ?
                      <EndPoint key={rp.refPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type} />
                      :
                      <RefPoint key={rp.refPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type} />

                ))}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
            </MapColumn>

            <TextColumn>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Type</th>
                    <th>Coords</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {refPoints.map(rp => (
                    <tr>
                      <td>
                        {rp.IsStart ? "start"
                          : rp.IsEnd ? "end"
                            : "general"}</td>
                      <td>{rp.Type}</td>
                      <td>
                        <small>{rp.Lat + " - " + rp.Lng}</small>
                      </td>
                      <td>
                        <Button variant="outline-danger" onClick={() => clickDelete(rp.RefPointID)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              {coordChange &&
                <Form onSubmit={handleSubmitRefPoint}>
                  <InputContainer>
                    <PointForm coord={coord} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="Point position">Point Position</Label>
                    <InputOption type="start-end" defaultValue={'general'} as="select" aria-label="select" onChange={ev => setRefPStartEnd(ev.target.value)} required={true} >
                      <option value='general' defaultChecked>General</option>
                      <option value='start' disabled={startPresent}>Start Point</option>
                      <option value='end' disabled={endPresent}>End Point</option>
                    </InputOption>
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="Point description-input">Point Description</Label>
                    <Input id="Point description-input" type="text" name="descr" placeholder="Point description" value={refPDesc} onChange={ev => setRefPDesc(ev.target.value)} required />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="Point type-input">Point Type</Label>
                    <Input id="Point type" type="text" name="startType" placeholder="Point type" value={refPType} onChange={ev => setRefPType(ev.target.value)} />
                  </InputContainer>
                  <SubmitButton type="submit">Add this Reference Point</SubmitButton>
                </Form>
              }

            </TextColumn>

          </TwoColumn>
        </Container>}
    </AnimationRevealPage>
  )
}

function PointForm(props) {
  return (
    <>
      <InputContainer>
        <Label htmlFor="lat-input">Latitude</Label>
        <Input id="lat-input" type="text" name="lat" defaultValue={props.coord.Lat} readOnly />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="lng-input">Longitude</Label>
        <Input id="lng-input" type="text" name="lng" defaultValue={props.coord.Lng} readOnly />
      </InputContainer>
    </>

  )
}

function ClickPickNearest(props) {
  useMapEvents({
    click(e) {
      if (e !== undefined) {
        const p = calculateNearest(props.points, e.latlng);
        props.setCoord({ Lat: p.lat, Lng: p.lon });
      }
    }
  })
  return (
    <>
      {props.coord !== null &&
        <Marker position={{ lat: props.coord.Lat, lng: props.coord.Lng }}>
          <Popup>
            You selected this point <br /> Click on another place to change it.
          </Popup>
        </Marker>
      }
    </>
  )
}

function calculateNearest(path, point) {
  let min_dist = Infinity;
  let pos = path[0];
  path.forEach(element => {
    let dist = distanceBetweenPoints(element.lat, element.lon, point.lat, point.lng);
    if (dist < min_dist) {
      min_dist = dist;
      pos = element;
    }
  });
  return pos;
}

export default HikeRefPoints;