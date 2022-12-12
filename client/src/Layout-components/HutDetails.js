import { useContext, useEffect, useState } from "react";
import { Button, Form, Col, Row, ButtonGroup, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';
import NavigationBar from "./Navigationbar";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import StatsIllustrationSrc from "../images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
//how to insert a file on react client
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0  md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8  md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left mt-4`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-4xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

function HutDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hut, setHut] = useState({});
  const [coords, setCoords] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedHike, setSelectedHike] = useState({});
  const navigate = useNavigate();


  const handleLinkHike = async (event) => {
    event.preventDefault();
    await API.linkHutToHike(params.hutID, selectedHike.HikeID).then((val) => {props.errorHandler(val);}).catch(err => {props.errorHandler(err)});
  }

  const handleSelection = (ev, el) => {
    setSelectedHike(el);
  }

  useEffect(() => {
    const loadHut = async () => {
      const hutObj = await API.getHut(params.hutID);
      const coord = await API.getHutCoords(params.hutID);
      setHut(hutObj);
      setCoords(coord);

      setLoading(false);
    }
    try {
        loadHut();
    } catch (err) {
        
    }
  }, [params.hutID, auth.login])


  const subheading = "Learn more";
  const heading = (
    <>
      Hut title
    </>
  );
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  //primaryButtonText = "Learn More",
  //primaryButtonUrl = "https://timerse.com",
  const imageSrc = StatsIllustrationSrc;
  const imageCss = null;
  const imageContainerCss = null;
  const imageDecoratorBlob = false;
  const imageDecoratorBlobCss = null;
  const imageInsideDiv = false;
  let statistics = null;
  const textOnLeft = false;

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  const defaultStatistics = [
    {
      key: "length",
      value: "228"
    },
    {
      key: "height",
      value: "389"
    },
    {
      key: "difficulty",
      value: "10"
    }
  ];

  if (!statistics) statistics = defaultStatistics;


  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      {!loading &&
        <Container>
          <TwoColumn>
          {!auth.login &&
              <ImageMapColumn css={imageContainerCss}>
                You should be logged to see the map
                <Image imageSrc={imageSrc} css={imageCss} />
              </ImageMapColumn>
            }
            {auth.login &&
              <ImageMapColumn css={imageContainerCss}>
                <MapContainer
                  center={[coords.Lat, coords.Lng]}
                  zoom={14}
                  scrollWheelZoom
                  style={{ height: 500 + "px", width: "100%", }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[coords.Lat, coords.Lng]}>
                    <Popup>
                        Hut's location
                    </Popup>
                  </Marker>
                </MapContainer>
              </ImageMapColumn>
            }
            <TextColumn textOnLeft={textOnLeft}>
              <TextContent>
                <Heading>{hut.Name}</Heading>
                <Subheading>
                  Website: {hut.Website === undefined ? 'None' : hut.Website}
                </Subheading>
                <Subheading>
                  Phone number: {hut.Phone === undefined ? 'None' : hut.Phone}
                </Subheading>
                <Statistics>
                  <Statistic>
                    <Value>{hut.AvgPrice}</Value>
                    <Key>Average Price</Key>
                  </Statistic>

                  <Statistic>
                    <Value>{hut.WhenOpen === 'W' ? 'Winter Only' :
                    hut.WhenOpen === 'SW' ? 'Summer and Winter' :
                    hut.WhenOpen === 'S' ? 'Summer only' :
                    hut.WhenOpen === 'Y' ? 'All year' : 'Permanently closed'}</Value>
                    <Key>Opening session</Key>
                  </Statistic>

                  <Statistic>
                    <Value>{hut.Elevation} mt</Value>
                    <Key>Elevation</Key>
                  </Statistic>

                  <Statistic>
                    <Value>{hut.Beds}</Value>
                    <Key>Beds</Key>
                  </Statistic>

                </Statistics>

                <Description>{hut.Description}</Description>
                  { 
                    <Dropdown as={ButtonGroup}>
                    <Button onClick={handleLinkHike} className="light__NavLink-sc-7yke5y-2 light__PrimaryLink-sc-7yke5y-5 light___StyledPrimaryLink-sc-7yke5y-7 hvlBUp htliCt" variant="success">Link to this Hut</Button>

                    <Dropdown.Toggle split className="light__NavLink-sc-7yke5y-2 light__PrimaryLink-sc-7yke5y-5 light___StyledPrimaryLink-sc-7yke5y-7 hvlBUp htliCt" variant="success" id="dropdown-split-basic" />
                    
                    <Dropdown.Menu>
                      {props.hikes.map((el) => {
                           return <Dropdown.Item onClick={(ev) => handleSelection(ev, el)} key={el.Title}>{el.Title}</Dropdown.Item>
                      })
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  }
              </TextContent>
            </TextColumn>
          </TwoColumn>
        </Container>
      }
    </AnimationRevealPage>
  );

}

export default HutDetails;