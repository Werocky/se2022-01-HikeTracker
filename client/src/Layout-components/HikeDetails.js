import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
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
import { StartPoint, EndPoint, RefPoint } from "./RefPointsTypes";
import { css } from "styled-components/macro";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export const NavLink = tw.button`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageMapColumn = tw(Column)`md:w-5/12 flex-shrink-0  md:h-auto relative `;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const CoverImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-48 w-full bg-cover bg-center rounded-lg`}
`;

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
  const [canStart, setCanStart] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const [startDate,setStartDate]=useState(new Date());
  const [startTime,setStartTime]=useState('10:00')

  useEffect(() => {
    const loadHike = async () => {
      setLoading(true);
      const hikeObj = await API.getHike(params.hikeID);
      console.log(hikeObj);
      setHike(hikeObj);
      if (auth.login) {
        if (auth.user.Role == "H" && props.myHikes.length > 0) {
          props.myHikes.forEach(h => {
            if (h.HikeID == params.hikeID) {
              setCanStart(false);
            }
          });
        }
        else if (auth.user.Role == "H" && props.myHikes.length == 0)
          setCanStart(true);
        else
          setCanStart(false);

        console.log(props.myHikes);
      const rp = await API.getHikeRefPoints(params.hikeID);
       setRefPoints(rp);
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
       // console.log("Start\n" + gpxObj[0].lat + "\t" + gpxObj[0].lon + "\nEnd\n" + gpxObj.at(-1).lat + "\t" + gpxObj.at(-1).lon);
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

  const startHikeCurrent = () => {
    let i=0;
    let rp;
    //console.log(refPoints);
    for (i=0;i<refPoints.length;i++)
    {
      if(refPoints[i].IsStart){
        rp=refPoints[i];
      }
    }
    //console.log(rp);
    if(rp==undefined)
    {
      //TODO
      props.errorHandler({error: "This hike cannot be started now! Soon it will be possible..."});
    }
    else
    {
      API.startHike(hike.HikeID,rp,null).then(()=>
      {
        props.setMyHikes(oldHikes => [...oldHikes, hike]);
        setCanStart(false);
        navigate("/myHikes");
      });
  
    }
    
   
    
  };
  const startHikeSelected = () => {
    let i=0;
    let rp;
    //console.log(refPoints);
    for (i=0;i<refPoints.length;i++)
    {
      if(refPoints[i].IsStart){
        rp=refPoints[i];
      }
    }
    //console.log(rp);
    
    
    if(rp==undefined)
    {
      //TODO
      props.errorHandler({error: "This hike cannot be started now! Soon it will be possible..."});
    }
    else
    {
      let start_Date = new Date(startDate);
      start_Date.setHours(startTime.split(':')[0], startTime.split(':')[1]);
      console.log(start_Date);
      API.startHike(hike.HikeID,rp,start_Date.getTime()).then(()=>
      {
        props.setMyHikes(oldHikes => [...oldHikes, hike]);
        setCanStart(false);
        navigate("/myHikes");
      });
  
    }
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

                  {refPoints != undefined && !refPoints.length && gpxData != undefined && gpxData.length != 0 &&
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
                <br/>
                <div>
                  <p>Green: Parking Lot</p>
                  <p>Yellow: Hut</p>
                  <p>Red: Peak</p>
                  <p>Blue: Default - Not Specified</p>
                </div>
                <br/>
                <CoverImage imageSrc={`http://localhost:3001/${hike.Picture}`} onClick={() => setShowImg(true)} />

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

              {canStart && <>

                <Popup trigger={<PrimaryLink> Start Hike</PrimaryLink>} position="right center">
                <Container>
                <Calendar onChange={setStartDate} value={startDate}></Calendar>
                  <TimePicker onChange={setStartTime} value={startTime} />
                  <PrimaryLink onClick={startHikeSelected}>Use selected date and hour</PrimaryLink>
                  <PrimaryLink onClick={startHikeCurrent}>Use current date and hour</PrimaryLink>
                </Container>
                </Popup>
             
               </>
                }

              {hike.AssociatedGuide === auth.user.Id &&
                <PrimaryLink onClick={() => navigate("/" + hike.HikeID + "/edit", { state: { hikeId: hike.HikeID, refPoints: refPoints, gpxData: gpxData, bounds: bounds } })}> 
                 Modify Reference Points
                </PrimaryLink>}

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

export default HikeDetails;