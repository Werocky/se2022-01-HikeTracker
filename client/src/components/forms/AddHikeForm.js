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
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw` rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(SectionHeading)`font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 mb-8 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed `

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-base`;

const Textarea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full  mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const SubmitButtonLarge = tw.button` w-full 2xl:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-3xl transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;


function AddHikeForm(props) {

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

  const [msgErr, setMsgErr] = useState("");

  const [heading, setHeading] = useState("Add a new hike here");
  const [subheading, setSubHeading] = useState("Select the gpx file.");
  const [submitButtonText, setSubmitButtonText] = useState("Add");

  const textOnLeft = false;
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
      setSubmitButtonText("Save All");
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
    if (file.name.split(".").at(-1) !== "gpx") {
      setMsgErr("The file must be a GPX!");
      return;
    }
    setMsgErr("");
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
        <InputContainer>
          <Label htmlFor="lat-input">Latitude</Label>
          <Input id="lat-input" type="text" name="lat" defaultValue={props.coord.lat} readOnly />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="lng-input">Longitude</Label>
          <Input id="lng-input" type="text" name="lng" defaultValue={props.coord.lng} readOnly />
        </InputContainer>
      </>

    )
  }

  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
        <Container>
          <Content>
            <FormContainer>
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
                <Description>To add new Reference Point, click on the map and insert the type.</Description>

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
                    <InputContainer>
                      <PointForm coord={coord} />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="Point description-input">Point Description</Label>
                      <Input id="Point description-input" type="text" name="descr" placeholder="Point description" value={refPDesc} onChange={ev => setRefPDesc(ev.target.value)} required />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="Point type-input">Point Type</Label>
                      <Input id= "Point type" type="text" name="startType" placeholder="Point type" value={refPType} onChange={ev => setRefPType(ev.target.value)} />
                    </InputContainer>
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
                  {msgErr &&
                    <Alert>{msgErr}</Alert>
                  }
                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              }
              {fileOk &&
                <Form onSubmit={handleSubmitForm}>
                  <InputContainer>
                    <Label htmlFor="title-input">Title</Label>
                    <Input id="title-input" type="text" name="title" defaultValue={dataFromGpx.Title} onChange={ev => setTitle(ev.target.value)} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="length-input">Length</Label>
                    <Input id="length-input" type="number" step="0.01" name="length" defaultValue={dataFromGpx.Length} readOnly />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="ascent-input">Ascent</Label>
                    <Input id="ascent-input" type="number" name="ascent" defaultValue={dataFromGpx.Ascent} readOnly />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="time-input">Time</Label>
                    <Input id="time-input" type="text" name="time" placeholder="dd:hh:mm" value={expectedTime} onChange={ev => setExpectedTime(ev.target.value)} required />
                  </InputContainer>

                    <InputOption  as="select" value={difficulty} onChange={ev => setDifficulty(ev.target.value)} required >
                      <option hidden>Difficulty</option>
                      <option value="T">Tourist (T)</option>
                      <option value="H">Hiker (H)</option>
                      <option value="PH">Professional Hiker (PH)</option>
                    </InputOption>

                  <InputContainer>
                    <Label htmlFor="start-input">Start</Label>
                    <Input id="start-input" type="text" name="start" placeholder="Start description" value={startDescr} onChange={ev => setStartDescr(ev.target.value)} required />
                  </InputContainer>
                  <InputContainer>
                  <Label htmlFor="startType-input">StartType</Label>
                    <Input id="startType-input" type="text" name="startType" placeholder="Start type" value={startType} onChange={ev => setStartType(ev.target.value)} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="end-input">End</Label>
                    <Input id="end-input" type="text" name="end" placeholder="End description" value={endDescr} onChange={ev => setEndDescr(ev.target.value)} required />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="endType-input">EndType</Label>
                    <Input id="endType-input" type="text" name="endType" placeholder="End type" value={endType} onChange={ev => setEndType(ev.target.value)} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="description-input">Description</Label>
                    <Textarea  id="description-input"  name="description" placeholder="Description..." value={description} onChange={ev => setDescription(ev.target.value)} />
                  </InputContainer>
                  <SubmitButtonLarge type="submit">{submitButtonText}</SubmitButtonLarge>
                </Form>
              }
            </TextContent>
          </TextColumn>
        </TwoColumn>
            </FormContainer>
          </Content>
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

export default AddHikeForm;