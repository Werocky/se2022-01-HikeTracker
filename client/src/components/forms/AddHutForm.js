import { React, useState, useEffect, useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import EmailIllustrationSrc from "../../images/email-illustration.svg";
import AnimationRevealPage from "../../pages/AnimationRevealPage.js";
import Header from "../headers/light.js";
import { Alert, Row, Col } from "react-bootstrap";
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
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4  font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 mb-12 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-300`
const ImageMapColumn = tw(Column)`md:w-6/12 flex-shrink-0 md:h-auto`;
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw` rounded bg-contain bg-no-repeat bg-center h-full`,
]);
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
const Recap = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-200`
const Instruction = tw.p`text-center md:text-left text-sm md:text-sm lg:text-lg  font-bold text-sm`


const Textarea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full  mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const B = tw(PrimaryButtonBase)`inline-block mt-8`

function AddHutForm(props) {
  const auth = useContext(AuthContext);   // contains user information 
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.login || auth.user.Role !== 'HW') {
      navigate('/');
    }
  }, [])

  const heading = <>Add a hut here</>;
  const submitButtonText = "Confirm";
  const textOnLeft = false;

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const [description, setDescription] = useState("Add the hut cover picture here");
  const [name, setName] = useState("");
  const [elevation, setElevation] = useState(1000);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [geoOk, setGeoOk] = useState(false);
  const [coord, setCoord] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msgState, setmsgState] = useState("danger");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState("");
  const [whenOpen, setWhenOpen] = useState("");
  const [beds, setBeds] = useState();
  const [descr, setDescr] = useState("");
  const [avgPrice, setAvgPrice] = useState(10);
  const [picture, setPicture] = useState();
  const [pictureOk, setPictureOk] = useState();
  const [msgErr, setMsgErr] = useState("");

  useEffect(() => {
    if (coord != null) {
      getInfo(coord.lat, coord.lng)
        .then(informations => {
          setRegion(informations?.address?.state ? informations.address.state : '');
          setProvince(informations?.address?.county ? informations.address.county : '');
          setCountry(informations?.address?.country ? informations.address.country : '');
          setCity(informations?.address?.city ? informations.address.city : informations?.address?.village ? informations.address.village : informations?.address?.town ? informations.address.town : informations?.address?.municipality ? informations.address.municipality : informations?.address?.isolated_dwelling ? informations.address.isolated_dwelling : informations?.address?.croft ? informations.address.croft : informations?.address?.hamlet ? informations.address.hamlet : "");
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
      return informations;
    } else {
      const errDetail = await response.json();
      throw errDetail.message;
    }
  }
  const submitGeoForm = async (event) => {
    event.preventDefault();
    if (!name || name.trim().length === "") {
      setErrorMsg("insert a title");
    }
    else if (!elevation) {
      setErrorMsg("insert an elevation");
    }
    else if (!city || city.trim().length === "") {
      setErrorMsg("insert a city");
    }
    else if (!province || province.trim().length === "") {
      setErrorMsg("insert a province");
    }
    else if (!region || region.trim().length === "") {
      setErrorMsg("insert a region");
    }
    else if (!country || country.trim().length === "") {
      setErrorMsg("insert a coutry");
    }
    else {
      setGeoOk(true);
    }
  }
  const handleSubmitFile = async (event) => {
    event.preventDefault();
    if (picture.name.toLowerCase().split(".").at(-1) !== "jpg" && picture.name.toLowerCase().split(".").at(-1) !== "jpeg" && picture.name.toLowerCase().split(".").at(-1) !== "png") {
      setMsgErr("The file must be jpg or jpeg or png!");
      return;
    }
    setMsgErr("");
    setPictureOk(true);
    setDescription("Add geographical info and name of the hut here");
  }

  const submitForm = async (event) => {
    event.preventDefault();
   /* if (!name || name.trim().length === "") {
      setErrorMsg("insert a name");
    }
    else*/
    if (!beds) {
      setErrorMsg("insert beds number");
    }
    else if (!phone || phone.trim().length === "") {
      setErrorMsg("insert a phone number");
    }
    else if (!email || email.trim().length === "") {
      setErrorMsg("insert an email");
    }
    else if (!whenOpen || whenOpen.trim().length === "") {
      setErrorMsg("select when it's open");
    }
    else if (!avgPrice) {
      setErrorMsg("select the averagePrice");
    }
    else {
      let h = {
        Name: name,
        Elevation: elevation,
        City: city,
        Province: province,
        Region: region,
        Country: country,
        WhenOpen: whenOpen,
        Beds: beds,
        AvgPrice: avgPrice,
        Description: descr,
        Email: email,
        Phone: phone,
        Website: website,
        Coord: coord,
        Picture: picture,
        description: name
      }
      API.addHut(h, picture)
        .then((res) => {
          setErrorMsg(res.message);
          let newHut = res.hut;
          console.log(newHut);
          console.log(res);
          setmsgState('primary');
          props.setHuts(oldHuts => [...oldHuts, newHut]);
          navigate("/huts");
          
        })
        .catch(err => setErrorMsg(err.error));
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
      <Container>
        <Row><Col>
          {errorMsg ? <Alert variant={msgState} onClose={() => { setErrorMsg(''); setmsgState('danger'); }} dismissible>{errorMsg}</Alert> : false}
        </Col></Row>
      </Container>
      <Header logout={props.logout} />
      <Container>
        <Content>
          <FormContainer>
            <TwoColumn>
              {!pictureOk && !geoOk &&
                <ImageMapColumn>
                  <Image imageSrc={EmailIllustrationSrc} />
                </ImageMapColumn>
              }
              {
                geoOk && pictureOk &&
                <TextColumn textOnLeft={textOnLeft}>
                  <TextContent>
                    <Heading>Recap of your hut</Heading>
                    <Recap>Name : {name}</Recap>
                    <Recap>Elevation : {elevation} mt</Recap>
                    <Recap>City : {city}  &nbsp;</Recap>
                    <Recap>Province : {province}  </Recap>
                    <Recap>Region : {region} &nbsp; </Recap>
                    <Recap>Country : {country}</Recap>
                    {phone !== undefined && <Recap>Phone : {phone}</Recap>}
                    {whenOpen !== "" && <Recap>Opening Session : {whenOpen}</Recap>}
                    {avgPrice !== undefined && <Recap>Average price : {avgPrice}</Recap>}
                    {beds !== undefined && <Recap>Number of beds : {beds}</Recap>}
                    {email.trim().length !== 0 && <Recap>Email : {email}</Recap>}
                    {website.trim().length !== 0 && <Recap>Website : {website}</Recap>}
                    {descr.trim().length !== 0 && <Recap>Description : {descr}</Recap>}
                  </TextContent>
                </TextColumn>
              }

              {!geoOk && pictureOk &&
                <ImageMapColumn>
                  <TextContent>
                    <Heading>Map</Heading>
                    <Description>Click on the map to add new Hut Point</Description>

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
              }
              <TextColumn textOnLeft={textOnLeft}>
                <TextContent>
                  {/*{subheading && <Subheading>{subheading}</Subheading>}*/}
                  <Heading>{heading}</Heading>
                  {description && <Description>{description}</Description>}
                  {!pictureOk && !geoOk &&
                    <Form onSubmit={handleSubmitFile} >

                      <Input type="file" required onChange={event => setPicture(event.target.files[0])} />
                      {msgErr &&
                        <Alert>{msgErr}</Alert>
                      }
                      <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                    </Form>
                  }
                  {
                    !geoOk && pictureOk &&

                    <Form onSubmit={submitGeoForm}>
                      <InputContainer>
                        <Label htmlFor="name-input">Title</Label>
                        <Input id="name-input" type="text" name="title" value={name} placeholder="name" onChange={ev => setName(ev.target.value)} required />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="elevation-input">Elevation</Label>
                        <Input id="elevation-input" type="number" step="1" name="elevation" value={elevation} min={0} placeholder="elevation" onChange={ev => setElevation(ev.target.value)} required/>
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="city-input">City</Label>
                        <Input id="city-input" type="text" name="city" value={city} placeholder="select a point on the map to select the city" onChange={ev => setCity(ev.target.value)} readOnly />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="province-input">Province</Label>
                        <Input id="province-input" type="text" name="province" value={province} placeholder="select a point on the map to select the province" onChange={ev => setProvince(ev.target.value)} readOnly />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="region-input">Region</Label>
                        <Input id="region-input" type="text" name="region" value={region} placeholder="select a point on the map to select the region" onChange={ev => setRegion(ev.target.value)} readOnly />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="country-input">Country</Label>
                        <Input id="country-input" type="text" name="country" value={country} placeholder="select a point on the map to select the country" onChange={ev => setCountry(ev.target.value)} readOnly />
                      </InputContainer>
                      <SubmitButton type="submit">Next</SubmitButton>
                    </Form>
                  }

                  {geoOk && pictureOk &&
                    <Form onSubmit={submitForm}>
                      <InputContainer>
                        <Label htmlFor="phone-input">Phone Number</Label>
                        <PhoneInput id="phone-input" placeholder="Enter phone number" value={phone} onChange={setPhone} required={true} />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="numberOfBeds-input">Number Of Beds</Label>
                        <Input id="numberOfBeds-input" type="number" step="1" name="numberOfBeds" value={beds} min={0} placeholder="insert number of beds" onChange={ev => setBeds(ev.target.value)} required={true} />
                      </InputContainer>
                      <Instruction>
                        Opening Session
                      </Instruction>

                      <InputOption id="open-input" type="whenOpen" defaultValue={'DEFAULT'} as="select" aria-label="select" onChange={ev => setWhenOpen(ev.target.value)} required={true} >
                        <option value='DEFAULT' hidden>Select when it's open</option>
                        <option value="W">Winter</option>
                        <option value="S">Summer</option>
                        <option value="WS">Winter & Summer</option>
                        <option value="N">Never</option>
                      </InputOption>

                      <InputContainer>
                        <Label htmlFor="avgprice-input">Average Price</Label>
                        <Input id="avgprice-input" type="number" step="0.5" name="avgprice" value={avgPrice} min={0} placeholder="insert average price for a room" onChange={ev => setAvgPrice(ev.target.value)} required={true} />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="email-input">Email</Label>
                        <Input id="email-input" type="email" name="email" value={email} placeholder="insert email of the hut" onChange={ev => setEmail(ev.target.value)} required={true} />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="website-input">Website</Label>
                        <Input id="website-input" type="text" name="webSite" value={website} placeholder="insert website of the hut (optional)" onChange={ev => setWebsite(ev.target.value)} required={false} />
                      </InputContainer>
                      <InputContainer>
                        <Label htmlFor="description-input">Description</Label>
                        <Textarea id="description-input" name="description" placeholder="Description" value={descr} onChange={ev => setDescr(ev.target.value)} required={true} />
                      </InputContainer>
                      <B onClick={() => setGeoOk(false)}>Back</B>
                      <SubmitButton type="submit">Confirm</SubmitButton>
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
}

export default AddHutForm;