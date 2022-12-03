import React, { useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import EmailIllustrationSrc from "../../images/email-illustration.svg";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import Header from "../headers/light.js";
import { Alert, Button, FloatingLabel, Row } from "react-bootstrap";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import AuthContext from "../../AuthContext.js";
import API from "../../API.js";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

function AddHike(props) {

  const auth = useContext(AuthContext);   // contains user information 
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [fileOk, setFileOk] = useState(false);
  const [fileString, setFileString] = useState("");
  const [dataFromGpx, setDataFromGpx] = useState(undefined);
  const [gpxPoints, setGpxPoints] = useState(undefined);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [startDescr, setStartDescr] = useState("");
  const [endDescr, setEndDescr] = useState("");
  const [description, setDescription] = useState("");
  const [startType, setStartType] = useState("");
  const [endType, setEndType] = useState("");
  const [coord, setCoord] = useState(null);
  const [coordChange, setCoordChange] = useState(false);
  const [refPointArray, setRefPointArray] = useState([]);
  const [refPType, setRefPType] = useState("");
  const [refPDesc, setRefPDesc] = useState("");


  const [heading, setHeading] = useState("Add a new hike here");
  const [subheading, setSubHeading] = useState("Select the gpx file.");
  const [submitButtonText, setSubmitButtonText] = useState("Add");

  const textOnLeft = true;
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  useEffect(() => {
    if (!auth.login || auth.user.Role !== 'L') {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if (fileString) {
      let gpxParser = require('gpxparser');
      var gpx = new gpxParser(); //Create gpxParser Object
      gpx.parse(fileString);

      setGpxPoints(gpx.tracks[0].points);

      setDataFromGpx(
        {
          Title: gpx.tracks[0].name,
          Length: gpx.tracks[0].distance.total.toFixed(2),
          Ascent: Math.round(gpx.tracks[0].elevation.pos),
          StartPoint: gpx.tracks[0].points[0],
          EndPoint: gpx.tracks[0].points.at(-1),
        }
      )

      getInfo(gpx.tracks[0].points[0].lat, gpx.tracks[0].points[0].lon)
        .then(informations => {
          setRegion(informations?.address?.state ? informations.address.state : '');
          setProvince(informations?.address?.county ? informations.address.county : '');
          setCountry(informations?.address?.country ? informations.address.country : '');
          setCity(informations?.address?.village ? informations.address.village : informations.address.town);
        })

      setHeading("New Hike");
      setSubHeading("Check, modify and add parameters")
      setSubmitButtonText("Save");
      setFileOk(true); // if nothing went wrong
    }

  }, [fileString]);

  useEffect(() => {
    if (coord) {
      setCoordChange(true);
    }
  }, [coord]);


  const handleSubmitFile = async (event) => {
    event.preventDefault();
    //setFile(event.target[0].files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileString(reader.result);
    };
    reader.readAsText(event.target[0].files[0]);
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const s = expectedTime.trim().split(":");
    const hike = {
      Title: title ? title : dataFromGpx.Title,
      Description: description,
      Ascent: parseInt(dataFromGpx.Ascent),
      Difficulty: difficulty,
      ExpectedTime: (parseInt(s[0]) * 24 + parseInt(s[1])) * 60 + parseInt(s[2]),
      Country: country,
      Province: province,
      Region: region,
      City: city ? city : province,
      GpxFile: "./gpx/" + file.name,
      Start: startDescr,
      End: endDescr,
      AssociatedGuide: 0 /* auth.user.Id*/,
      Length: parseFloat(dataFromGpx.Length / 1000).toFixed(2),
    }
    console.log(hike);
    const refP = {
      start: {
        description: startDescr,
        position: gpxPoints[0],
        Type: startType,
      },
      end: {
        description: endDescr,
        position: gpxPoints.at(-1),
        Type: endType,
      },
      otherPoints: refPointArray,
    }
    console.log(refP);
    try {
      const res = await API.addHike(hike, file, refP, auth.user.Id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitRefPoint = async (event) => {
    event.preventDefault();
    const refPObj = {
      position: coord,
      description: refPDesc,
      type: refPType,
    }
    setRefPointArray(old => [...old, refPObj]);
    setCoordChange(false);
  }

  const PointForm = (props) => {
    return (
      <>
        <Input type="text" name="lat" defaultValue={props.coord.lat} readOnly />
        <Input type="text" name="lng" defaultValue={props.coord.lng} readOnly />
      </>

    )
  }

  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      <Container>
        <TwoColumn>
          {!fileOk &&
            <ImageMapColumn>
              {/*put the picture or map here*/}
              <Image imageSrc={EmailIllustrationSrc} />
            </ImageMapColumn>
          }
          {fileOk &&
            <ImageMapColumn>
              <TextContent>
                <Heading>Map</Heading>
                <Description>Click on the map and insert the type, to add new Reference Point</Description>

                <MapContainer
                  center={[gpxPoints[Math.ceil(gpxPoints.length / 2)].lat, gpxPoints[Math.ceil(gpxPoints.length / 2)].lon]}
                  bounds={[gpxPoints[0], gpxPoints.at(-1),]}
                  scrollWheelZoom
                  style={{ height: 500 + "px", width: "100%", }}>
                  <ClickPickNearest points={gpxPoints} coord={coord} setCoord={setCoord} />
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={gpxPoints}
                  />
                  <StartPoint position={gpxPoints[0]} />
                  <EndPoint position={gpxPoints.at(-1)} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>

                {coordChange &&
                  <Form onSubmit={handleSubmitRefPoint}>
                    <PointForm coord={coord} />
                    <Input type="text" name="descr" placeholder="Point description" value={refPDesc} onChange={ev => setRefPDesc(ev.target.value)} required />
                    <Input type="text" name="startType" placeholder="Point type" value={refPType} onChange={ev => setRefPType(ev.target.value)} />
                    <SubmitButton type="submit">Add this Reference Point</SubmitButton>
                  </Form>
                }

              </TextContent>
            </ImageMapColumn>
          }
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              <Heading>{heading}</Heading>
              <Description>{subheading}</Description>

              {!fileOk &&
                <Form onSubmit={handleSubmitFile} >

                  <Input type="file" required onChange={event => setFile(event.target.files[0])} />

                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              }
              {fileOk &&
                <Form onSubmit={handleSubmitForm}>
                  <Input type="text" name="title" defaultValue={dataFromGpx.Title} onChange={ev => setTitle(ev.target.value)} />
                  <Input type="number" step="0.01" name="length" defaultValue={dataFromGpx.Length} readOnly />
                  <Input type="number" name="ascent" defaultValue={dataFromGpx.Ascent} readOnly />
                  <Input type="text" name="time" placeholder="dd:hh:mm" value={expectedTime} onChange={ev => setExpectedTime(ev.target.value)} required />
                  <Input as="select" value={difficulty} onChange={ev => setDifficulty(ev.target.value)} required >
                    <option hidden>Difficulty</option>
                    <option value="T">Tourist (T)</option>
                    <option value="H">Hiker (H)</option>
                    <option value="PH">Professional Hiker (PH)</option>
                  </Input>
                  <Input type="text" name="start" placeholder="Start description" value={startDescr} onChange={ev => setStartDescr(ev.target.value)} required />
                  <Input type="text" name="startType" placeholder="Start type" value={startType} onChange={ev => setStartType(ev.target.value)} />
                  <Input type="text" name="end" placeholder="End description" value={endDescr} onChange={ev => setEndDescr(ev.target.value)} required />
                  <Input type="text" name="endType" placeholder="End type" value={endType} onChange={ev => setEndType(ev.target.value)} />
                  <Textarea name="description" placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)} />
                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              }
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </AnimationRevealPage>
  );
};

async function getInfo(lat, lon) {
  let response = await fetch((`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`), {
    method: 'GET'
  });
  if (response.ok) {
    //console.log(response)
    const informations = await response.json();
    //console.log(informations);
    // setInformation(informations);
    return informations;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

function StartPoint(props) {
  return (
    <Marker position={props.position}>
      <Popup>
        This is the starting point
      </Popup>
    </Marker>
  );
}

function EndPoint(props) {
  return (
    <Marker position={props.position}>
      <Popup>
        This is the ending point
      </Popup>
    </Marker>
  );
}


function ClickPickNearest(props) {
  useMapEvents({
    click(e) {
      if (e !== undefined) {
        const p = calculateNearest(props.points, e.latlng);
        props.setCoord({ lat: p.lat, lng: p.lon });
      }
    }
  })
  return (
    <>
      {props.coord !== null &&
        <Marker position={{ lat: props.coord.lat, lng: props.coord.lng }}>
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

function distanceBetweenPoints(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export default AddHike;