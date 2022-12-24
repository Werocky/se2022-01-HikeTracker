import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import * as L from "leaflet";
import API from '../API';
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import StatsIllustrationSrc from "../images/pictures/map.webp";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import distanceBetweenPoints from "../DistanceBeteenPoints";
import { Button } from "react-bootstrap";


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
const PostAction = tw(PrimaryButtonBase)`mt-8 mb-10 mr-8 inline-block w-56 tracking-wide text-center py-5`;
function HikeDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hike, setHike] = useState(undefined);
  const [gpxData, setGpxData] = useState();  // array of [p.lat, p.lon]
  const [bounds, setBounds] = useState(undefined);  // map bounds
  const [refPoints, setRefPoints] = useState([]);  // array of ref points
  const [loading, setLoading] = useState(true);
  const [canStart,setCanStart]=useState(true);

  useEffect(() => {
    const loadHike = async () => {
      setLoading(true);
      const hikeObj = await API.getHike(params.hikeID);
      console.log(hikeObj);
      setHike(hikeObj);
      if (auth.login) {
        if(auth.user.Role=="H" && props.myHikes.length>0)
        {
          props.myHikes.forEach(h => {
            if(h.HikeID==params.hikeID){
              setCanStart(false);
            }          
          });
        }
        else if (auth.user.Role=="H" && props.myHikes.length==0)
          setCanStart(true);
        else
          setCanStart(false);

        console.log(props.myHikes);
        const rp = await API.getHikeRefPoints(params.hikeID);
        console.log(rp);
        setRefPoints(rp);
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
        console.log("Start\n" + gpxObj[0].lat + "\t" + gpxObj[0].lon + "\nEnd\n" + gpxObj.at(-1).lat + "\t" + gpxObj.at(-1).lon);
      } else {
        setCanStart(false);
        setLoading(false)
      }

    }
    loadHike();
 
  }, [params.hikeID, auth.login])

  useEffect(() => {
    if (gpxData) {
      const b = calculateMapBounds(gpxData);
      setBounds(b);
      setLoading(false);
    }
  }, [gpxData])

  const startHike = () => {
    props.setMyHikes(oldHikes => [...oldHikes, hike]);
    setCanStart(false);
  };

  const imageSrc = StatsIllustrationSrc;
  const textOnLeft = false;
  const navigate = useNavigate();

  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      {!loading &&
        <Container>
          <TwoColumn>
            {!auth.login &&
              <ImageMapColumn>
                <Messageheading> Login to see the map</Messageheading>
                <Image imageSrc={imageSrc} />
              </ImageMapColumn>
            }
            {auth.login &&
              <ImageMapColumn>
                {/*<PostAction onClick={() => { navigate('/startHike') }}>Start A New Hike</PostAction>*/}
                <MapContainer
                  bounds={bounds}
                  scrollWheelZoom
                  style={{ height: 500 + "px", width: "100%", }}>
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={gpxData}
                  />

                  {refPoints!=undefined && !refPoints.length && gpxData!=undefined && gpxData.length!=0 &&
                    <>
                      <StartPoint position={gpxData[0]} />
                      <EndPoint position={gpxData.at(-1)} />
                    </>
                  }

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
                <p>Green: Parking Lot</p>
                <p>Yellow: Hut</p>
                <p>Red: Peak</p>
                <p>Blue: Default - Not Specified</p>
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
             { canStart &&<Button onClick={startHike}>Start Hike</Button>}
            </TextColumn>


          </TwoColumn>
        </Container>
      }
    </AnimationRevealPage>
  );

}

function calculateMapBounds(gpxData) {
  const start = gpxData[0];
  let far = undefined;
  let dist = 0.0;
  for (const i in gpxData) {
    let val = distanceBetweenPoints(start.lat, start.lon, gpxData[i].lat, gpxData[i].lon);
    if (val > dist) {
      dist = val;
      far = gpxData[i];
    }
  }
  return [gpxData[0], far]
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


function MarkerColor(rpType) {
  let iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";
  if (rpType === "parking") {
    iconUrl += "marker-icon-2x-green.png";
  } else if (rpType === "hut") {
    iconUrl += "marker-icon-2x-yellow.png";
  } else if (rpType === "peak") {
    iconUrl += "marker-icon-2x-red.png";
  } else {
    iconUrl += "marker-icon-2x-blue.png";

  }
  var icon = new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return icon;
}

function StartPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is the starting point
      </Popup>
    </Marker>
  );
}

function EndPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is the ending point
      </Popup>
    </Marker>
  );
}

function RefPoint(props) {
  const icon = MarkerColor(props.type);
  return (
    <Marker position={props.position} icon={icon}>
      <Popup>
        This is a reference point
      </Popup>
    </Marker>
  );
}

export default HikeDetails;