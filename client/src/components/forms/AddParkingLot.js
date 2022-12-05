import React from "react";
import { useState,useEffect,useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import EmailIllustrationSrc from "../../images/email-illustration.svg";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import Header from "../headers/light.js";
import {Alert, Button, FloatingLabel, FormLabel, Row} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import AuthContext from "../../AuthContext.js";
import API from "../../API.js";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0 `,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);


const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4  font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 mb-12 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-300`
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0 md:h-auto mr-12`;
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `;
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
      ${tw`text-gray-400`}
    }
  }
`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-base`;
const Textarea = tw.textarea`mt-6 h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full  mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

function AddParkingLot(props){
  const auth = useContext(AuthContext);   // contains user information 
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.login || auth.user.Role !== 'L') {
      navigate('/');
    }
  }, [])

  //subheading = "Add a hut here",
  const heading = <>Add a parking lot here</>;
  const description = "Add parking lot details  here";
  const submitButtonText = "Confirm";
  const formAction = "#";
  const formMethod = "get";
  const textOnLeft = false;

    const [descr,setDescr]=useState("");
    const [coord, setCoord] = useState(null);
    const [msg, setMsg] = useState('');
    const [numAuto,setNumAuto]=useState();
    const [gratis,setGratis]=useState("");


const submitForm = async (event) => {
  event.preventDefault();
  if(descr===''){
    setMsg("Insert a description or a name for the parking");}
  else if(gratis==="" || gratis===null || gratis===undefined){
    setMsg("select if the parking is gratis or not");}
  else if (coord === null) {
    setMsg("You did not selected any point!");
  }
  else if(numAuto===0 || numAuto===undefined)
  {
    setMsg("select a number of auto");
  }
  else {
    setMsg('');
    let p={
      Description:descr,
      Free:gratis,
      Coord:coord,
      NumAuto:numAuto

    }
    API.createParkingLot(p).then(setMsg("Parking Lot added")).catch(err => err);
}
}

const ClickPick = () => {
  useMapEvents({
    click(e) {
      if (e !== undefined) {
        setCoord(e.latlng);
      }
    }
  })
  return (
      <>
        {coord !== null &&
          <Marker position={{ lat: coord.lat, lng: coord.lng }}>
            <Popup>
            <p>This is your point, select another if you want</p> 
            </Popup>
          </Marker>
        }
      </>
    )
  }
  return (
    <AnimationRevealPage>
    <Header logout={props.logout}/>
    <Container>
        <Content>
          <FormContainer>
    <TwoColumn>
            <ImageMapColumn>
              <TextContent>
                <Heading>Map</Heading>
                <Description>Click on the map to add new Parking Lot</Description>

                <MapContainer
                  center={{ lat: 45.063128, lng: 7.661272 }}
                  zoom={8}
                  scrollWheelZoom
                  style={{ height: 420 + "px", width: "100%", }}>
                  <ClickPick />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
                </TextContent>
            </ImageMapColumn>
    <TextColumn textOnLeft={textOnLeft}>
    <TextContent>
    <Heading>{heading}</Heading>
    {description && <Description>{description}</Description>}
  <Form onSubmit={submitForm}>

    <InputContainer>
      <Label htmlFor="capacity-input">Capacity</Label>
      <Input id="capacity" type="number" step="1" name="capacity" value={numAuto} min={0} placeholder="insert the amount of cars that can fit" onChange={ev=>setNumAuto(ev.target.value)}  required={true} />
    </InputContainer>
      <InputOption type="gratis" defaultValue={'DEFAULT'} as="select" aria-label="select" onChange={ev => setGratis(ev.target.value)} required={true} >
        <option value='DEFAULT' hidden>Select if it's free or not</option>
        <option value='1'>Free</option>
        <option value='0'>for a fee</option>
      </InputOption>
    <InputContainer>
      <Label htmlFor="description-input">Description</Label>
      <Textarea id="description-input" name="description" placeholder="Description" value={descr} onChange={ev => setDescr(ev.target.value)}  required={true}/>
    </InputContainer>

  <SubmitButton type="submit">Confirm</SubmitButton>
</Form>
    </TextContent>
    </TextColumn>
    </TwoColumn>
          </FormContainer>
        </Content>
    </Container>
    </AnimationRevealPage>
  );
}

export default AddParkingLot;