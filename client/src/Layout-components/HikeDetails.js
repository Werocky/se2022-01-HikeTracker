import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import StatsIllustrationSrc from "../images/pictures/map.webp";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0  md:h-auto relative `;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left mt-4`;
const Messageheading = tw(SubheadingBase)`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-4xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

function HikeDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hike, setHike] = useState(undefined);
  const [gpxData, setGpxData] = useState(undefined);  // array of [p.lat, p.lon]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHike = async () => {
      const hikeObj = await API.getHike(params.hikeID);
      console.log(hikeObj);
      setHike(hikeObj);
      if (auth.login) {
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
        console.log(gpxObj[0].lat + "\t" + gpxObj[0].lon + "\n" + gpxObj.at(-1).lat + "\t" + gpxObj.at(-1).lon);
      }

      setLoading(false);
    }
    try {
      loadHike();
    } catch (err) {
      //handling error
    }
  }, [params.hikeID, auth.login])



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
                  center={[gpxData[Math.ceil(gpxData.length / 2)].lat, gpxData[Math.ceil(gpxData.length / 2)].lon]}
                  bounds={[gpxData[0], gpxData.at(-1),]}
                  scrollWheelZoom
                  style={{ height: 500 + "px", width: "100%", }}>
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={gpxData}
                  />
                  <StartPoint position={gpxData[0]} />
                  <EndPoint position={gpxData.at(-1)} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
              </ImageMapColumn>
            }
            <TextColumn textOnLeft={textOnLeft}>
              <TextContent>
                <Subheading>
                  Difficulty:
                  {
                    hike.Difficulty === "T" ? " Tourist (T)"
                      : hike.Difficulty === "H" ? " Hiker (H)"
                        : hike.Difficulty === "PH" ? " Professional Hiker (PH)" : ""
                  }
                </Subheading>
                <Heading>{hike.Title}</Heading>
                <Subheading>
                  Start: {hike.Start}
                </Subheading>
                <Subheading>
                  End: {hike.End}
                </Subheading>
                <Statistics>
                  <Statistic>
                    <Value>{hike.Length} km</Value>
                    <Key>Length</Key>
                  </Statistic>

                  <Statistic>
                    <Value>{hike.Ascent} mt</Value>
                    <Key>Ascent</Key>
                  </Statistic>

                  <Statistic>
                    <Value>{exp_time(hike.ExpectedTime)}</Value>
                    <Key>Expected Time</Key>
                  </Statistic>


                </Statistics>
                <Description>{hike.Description}</Description>
              </TextContent>
            </TextColumn>


          </TwoColumn>
        </Container>
      }
    </AnimationRevealPage>
  );

}


function exp_time(time) {
  let hh = Math.floor(time / 60);
  let mm = Math.floor(time % 60);
  let dd = 0;
  let res = "";
  if (hh > 24) {
    dd = Math.floor(hh / 24);
    hh = Math.floor(hh % 24)
    res = dd + " d " + hh + " h " + mm + " m";
  } else if (hh < 1) {
    res = mm + " m";
  } else {
    res = hh + " h " + mm + " m";
  }
  return res
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

export default HikeDetails;