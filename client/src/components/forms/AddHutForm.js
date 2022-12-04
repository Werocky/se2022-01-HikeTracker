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
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
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
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`
const B=tw(PrimaryButtonBase)`inline-block mt-8`

function AddHutForm(props){
  const auth = useContext(AuthContext);   // contains user information 
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.login || auth.user.Role !== 'HW') {
      navigate('/');
    }
  }, [])

  //subheading = "Add a hut here",
  const heading = <>Add a hut here</>;
  const description = "Add geographical info and name of the hut here";
  const submitButtonText = "Confirm";
  const formAction = "#";
  const formMethod = "get";
  const textOnLeft = true;

// The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

const [name,setName]=useState("");
const [elevation,setElevation]=useState();
const [city,setCity]=useState("");
const [province,setProvince]=useState("");
const [region,setRegion]=useState("");
const [country,setCountry]=useState("");
const [geoOk,setGeoOk]=useState(false);
const [coord,setCoord]=useState(null);
const [errorMsg,setErrorMsg]=useState("");
const [phone,setPhone]=useState("");
const [website,setWebsite]=useState('');
const [email,setEmail]=useState("");
const [whenOpen,setWhenOpen]=useState("");
const [beds,setBeds]=useState();
const [descr,setDescr]=useState("");
const [avgPrice,setAvgPrice]=useState();

useEffect(()=>{
  if(coord!=null){
      getInfo(coord.lat, coord.lng)
.then(informations => {
  setRegion(informations?.address?.state? informations.address.state : '');
  setProvince(informations?.address?.county? informations.address.county : '');
  setCountry(informations?.address?.country? informations.address.country : '');
  setCity( informations?.address?.city? informations.address.city : informations?.address?.village? informations.address.village: informations?.address?.town? informations.address.town : '');
})
  }
}, [coord])

async function getInfo(lat, lon) {
  let response = await fetch((`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`), {
    method: 'GET'
  });
  if (response.ok) {
    console.log(response)
    const informations = await response.json();
    console.log(informations);
    // setInformation(informations);
    return informations;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}
const submitGeoForm = async (event) => {
  event.preventDefault();
  if( !name || name.trim().length===""){
      setErrorMsg("insert a name");
  }
  else  if( !elevation){
      setErrorMsg("insert an elevation");
  }
  else if( !city || city.trim().length===""){
      setErrorMsg("insert a city");
  }
  else if( !province || province.trim().length===""){
      setErrorMsg("insert a province");
  }
  else if( !region || region.trim().length===""){
      setErrorMsg("insert a region");
  }
  else if( !country || country.trim().length===""){
      setErrorMsg("insert a coutry");
  }
  else 
  {
    setGeoOk(true);
  }
}

const submitForm = async (event) => {
  event.preventDefault();
  if( !name || name.trim().length===""){
      setErrorMsg("insert a name");
  }
  else  if( !beds){
      setErrorMsg("insert beds number");
  }
  else if( !phone || phone.trim().length===""){
      setErrorMsg("insert a phone number");
  }
  else if( !email || email.trim().length===""){
      setErrorMsg("insert an email");
  }
  else if( !whenOpen || whenOpen.trim().length===""){
      setErrorMsg("select when it's open");
  }
  else if( !avgPrice){
      setErrorMsg("select the averagePrice");
  }
  else 
  {
    let h={
      Name:name,
      Elevation:elevation,
      City:city,
      Province:province,
      Region:region,
      Country:country,
      WhenOpen:whenOpen,
      Beds:beds,
      AvgPrice:avgPrice,
      Description:descr,
      Email:email,
      Phone:phone,
      Website:website,
      Coord:coord
  }
  API.addHut(h)
    .then( () => {
      props.setHuts({...props.huts, h});
    })//setDirty(true)})
    .catch( err => setErrorMsg(err));
    
   setErrorMsg("Hut aggiunto");
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
    <TwoColumn>
    {
      geoOk &&      <TextContent>
      {/*{subheading && <Subheading>{subheading}</Subheading>}*/}
      <Heading>Recap</Heading>
      {description && <Description>recap of your hut</Description>}
      <label>Name:{name}</label><br/>
      <label>Elevation:{elevation} mt</label><br/>
      <label>City:{city}  &nbsp;</label>
      <label>Province:{province}  </label><br/>
      <label>Region:{region} &nbsp; </label>
      <label>Country:{country}</label><br/>
      { descr.trim().length!=0 && <><label>description:{descr}</label><br/></>}
      { phone!=undefined && <><label>phone:{phone}</label><br/></>}
      {whenOpen!="" && <><label>When open:{whenOpen}</label><br/></>}
      {avgPrice!=undefined && <><label>Average price:{avgPrice}</label><br/></>}
      {beds!=undefined && <><label>number of beds:{beds}</label><br/></>}
      {email.trim().length!=0 && <><label>email:{email}</label><br/></>}
      {website.trim().length!=0 && <><label>website:{website}</label></>}
      </TextContent>
    }
  
    {!geoOk &&
            <ImageMapColumn>
              <TextContent>
                <Heading>Map</Heading>
                <Description>Click on the map and insert the type, to add new Reference Point</Description>

                <MapContainer
                  center={{ lat: 45.063128, lng: 7.661272 }} zoom={8} scrollWheelZoom style={{ height: 420 + "px", width: "100%", }}>
                  <ClickPick />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
                </TextContent>
            </ImageMapColumn>
          }
    <TextColumn textOnLeft={textOnLeft}>
    <TextContent>
    {/*{subheading && <Subheading>{subheading}</Subheading>}*/}
    <Heading>{heading}</Heading>
    {description && <Description>{description}</Description>}
    {
      !geoOk &&
   
    <Form onSubmit={submitGeoForm}>
      <Input type="text" name="name" value={name} placeholder="name" onChange={ev => setName(ev.target.value)}/>
      <Input type="number" step="1" name="elevation" value={elevation} min={0} placeholder="elevation" onChange={ev=>setElevation(ev.target.value)}  />
      <Input type="text" name="city"  value={city} placeholder="select a point on the map to select the city"  onChange={ev => setCity(ev.target.value)} />
      <Input type="text" name="province" value={province} placeholder="select a point on the map to select the province"  onChange={ev => setProvince(ev.target.value)}/>
      <Input type="text" name="region" value={region} placeholder="select a point on the map to select the region"  onChange={ev => setRegion(ev.target.value)} />
      <Input type="text" name="country" value={country} placeholder="select a point on the map to select the country" onChange={ev => setCountry(ev.target.value)} />
     
    <SubmitButton type="submit">Next</SubmitButton>
    </Form>
 }

 { geoOk && 
  <Form onSubmit={submitForm}>
  <Textarea name="description" placeholder="Description" value={descr} onChange={ev => setDescr(ev.target.value)}  required={true}/>
   <br/><br/><PhoneInput placeholder="Enter phone number"value={phone} onChange={setPhone}  required={true}/> 
 
  <Input type="number" step="1" name="numberOfBeds" value={beds} min={0} placeholder="insert number of beds" onChange={ev=>setBeds(ev.target.value)}  required={true} />
  <Input type="whenOpen" defaultValue={'DEFAULT'} as="select" aria-label="select" onChange={ev => setWhenOpen(ev.target.value)} required={true} >
        <option value='DEFAULT' hidden>Select when it's open</option>
        <option value="W">Winter</option>
        <option value="S">Summer</option>
        <option value="WS">Winter & Summer</option>
        <option value="N">Never</option>
      </Input>
  <Input type="number" step="0.5" name="avgprice" value={avgPrice} min={0} placeholder="insert average price for a room" onChange={ev=>setAvgPrice(ev.target.value)}  required={true} />
  <Input type="email"name="email" value={email}  placeholder="insert email of the hut" onChange={ev=>setEmail(ev.target.value)}  required={true} />
  <Input type="text"name="webSite" value={website}  placeholder="insert website of the hut (optional)" onChange={ev=>setWebsite(ev.target.value)}  required={false} />
  <B onClick={()=>setGeoOk(false)}>Back</B>
  <SubmitButton type="submit">Confirm</SubmitButton>
</Form>
 }

    </TextContent>
    </TextColumn>
    </TwoColumn>
    </Container>
    </AnimationRevealPage>
  );
}

export default AddHutForm;