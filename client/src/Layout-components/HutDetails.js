import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import API from '../API';
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import StatsIllustrationSrc from "../images/pictures/map.webp";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';

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
const Messageheading = tw(SubheadingBase)`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed`;

const Subheading = tw(SubheadingBase)`text-center md:text-left mt-4`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-4xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

function HutDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hut, setHut] = useState({});
  const [coords, setCoords] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedHike, setSelectedHike] = useState({HikeID: undefined});

  const handleLinkHike = async (event) => {
    event.preventDefault();
    if(typeof selectedHike.HikeID !== "undefined")
    await API.linkHutToHike(params.hutID, selectedHike.HikeID).then((val) => {props.errorHandler(val);}).catch(err => {props.errorHandler(err)});
    else 
    props.errorHandler({error: "You must select an hike to link"});
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
   
     loadHut();
   
},[params.hutID, auth.login])


  const imageSrc = StatsIllustrationSrc;
  const imageCss = null;
  const imageContainerCss = null;
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
                <Messageheading> Login to see the map</Messageheading>
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
                  {auth.user.Role == 'L' ?  
                    <Dropdown as={ButtonGroup}>
                    <Button onClick={handleLinkHike} className="light__NavLink-sc-7yke5y-2 light__PrimaryLink-sc-7yke5y-5 light___StyledPrimaryLink-sc-7yke5y-7 hvlBUp htliCt" variant="success">Link to this Hut</Button>

                    <Dropdown.Toggle split className="light__NavLink-sc-7yke5y-2 light__PrimaryLink-sc-7yke5y-5 light___StyledPrimaryLink-sc-7yke5y-7 hvlBUp htliCt" variant="success" id="dropdown-split-basic" />
                    
                    <Dropdown.Menu>
                      {props.hikes.map((el) => {{
                          if(el.AssociatedGuide == auth.user.Id)
                           return <Dropdown.Item onClick={(ev) => handleSelection(ev, el)} key={el.Title}>{el.Title}</Dropdown.Item>}
                      })
                      }
                    </Dropdown.Menu>
                  </Dropdown> : null
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