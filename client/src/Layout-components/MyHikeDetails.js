import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
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
import { StartPoint, EndPoint, RefPoint,MyStartPoint, MyEndPoint, MyRefPoint } from "./RefPointsTypes";
import { css } from "styled-components/macro";
import { marker } from "leaflet";
import dayjs from 'dayjs';

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
function MyHikeDetails(props) {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [hike, setHike] = useState(undefined);
  const [gpxData, setGpxData] = useState();  // array of [p.lat, p.lon]
  const [bounds, setBounds] = useState(undefined);  // map bounds
  const [refPoints, setRefPoints] = useState([]);  // array of ref points della hike
  const [loading, setLoading] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const [myPoints,setMyPoints]=useState([]); //tutti i punti raggiunti dall hiker in questa hike
  const [show,setShow]=useState(false);
  const [text,setText]=useState("");
  const [startDate,setStartDate]=useState(new Date());
  const [startTime,setStartTime]=useState('10:00');
  const [endDate,setEndDate]=useState(new Date());
  const [endTime,setEndTime]=useState('10:00')
  const [canTerminate, setCanTerminate] = useState(true);

  useEffect(() => {
    const loadHike = async () => {
      setLoading(true);
      const hikeObj = await API.getHike(params.hikeID);
      setHike(hikeObj);
      const pointsOfHike = await API.getHikerPointsOfHike(params.hikeID);
      let check = await API.getHikeInfo(params.hikeID);
      let check2 = check.filter(val => val.IsStart != 0);
      check = check.filter(val => val.IsEnd != 0);
      console.log(pointsOfHike, check, check2);
      pointsOfHike.forEach(point => {if(point.PointID == check[0].RefPointID) setCanTerminate(false)});
      let endPoint = pointsOfHike.filter(point => point.PointID == check[0].RefPointID);
      console.log(endPoint);
      if(endPoint.length > 0)
        pointsOfHike.forEach(point => {if(point.PointID == check2[0].RefPointID && point.ActiveHikeID > endPoint[0].ActiveHikeID ) setCanTerminate(true)});
      let exit=true;
      if (auth.login) {
        if (auth.user.Role == "H" && props.myHikes.length > 0) {
          props.myHikes.forEach(h => {
            if (h.HikeID == params.hikeID) {
                exit=false;
            }
          });
          if(exit===true)
            navigate("/");
        }
        else
        {
          navigate("/");
        }
        const rp = await API.getHikeRefPoints(params.hikeID);
        setRefPoints(rp);
        
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
       // console.log("Start\n" + gpxObj[0].lat + "\t" + gpxObj[0].lon + "\nEnd\n" + gpxObj.at(-1).lat + "\t" + gpxObj.at(-1).lon);
      } else {
        navigate("/");
      }

    }
    loadHike();
    API.getHikerPointsOfHike(params.hikeID).then((res)=>
      {
        setMyPoints(res);
       // console.log(res);
      });


    
    

  }, [params.hikeID, auth.login])


  useEffect(() => {
    if (gpxData) {
      const b = calculateMapBounds(gpxData);
      setBounds(b);
      setLoading(false);
    }
  }, [gpxData])

  const imageSrc = StatsIllustrationSrc;
  const textOnLeft = false;
  const navigate = useNavigate();

 /* const markerInfo=(rp)=>
  {
    console.log('questo è l rp');
    console.log(rp);
    refPoints.forEach(refP => {
     if (refP.refPointID ==rp.RefPointID) {
          setShow(false);
          setText(refP.ArrivalTime);
      }
    });
  }
*/
  const terminateHikeCurrent = async () => {
    let i=0;
    let rp;
    //console.log(refPoints);
    for (i=0;i<refPoints.length;i++)
    {
      if(refPoints[i].IsEnd){
        rp=refPoints[i];
      }
    }
    //console.log(rp);
    if(rp==undefined)
    {
      //TODO
      console.log(undefined)
    }
    else
    { 
      let Time = new Date();
      const pointsOfHike = await API.getHikerPointsOfHike(params.hikeID);
      let check = await API.getHikeInfo(params.hikeID);
      check = check.filter(val => val.IsEnd == 0);
      let startingTimestamp = pointsOfHike.filter(point => point.PointID == check[0].RefPointID)[0].ArrivalTime;
      console.log(startingTimestamp);
      let time = new Date(startingTimestamp);
      if(startingTimestamp - Time.getTime() >= 0)
        props.errorHandler({error: "Cannot end The hike before the Starting Time! Starting Time for this Hike:" + time});
      else{
            API.terminateHike(hike.HikeID,rp, null).then(()=>
          { setCanTerminate(false);
           // props.setMyHikes((oldHikes) => oldHikes.filter((val) => val.HikeID != hike.HikeID));
            navigate("/myHikes");
          });
        }
      
    }
    
   
    
  };
  const terminateHikeSelected = async () => {
    let i=0;
    let rp;
    //console.log(refPoints);
    for (i=0;i<refPoints.length;i++)
    {
      if(refPoints[i].IsEnd){
        rp=refPoints[i];
      }
    }
    //console.log(rp);
    
    if(rp==undefined)
    {
      //TODO
      
    }
    else
    {
      const pointsOfHike = await API.getHikerPointsOfHike(params.hikeID);
      let check = await API.getHikeInfo(params.hikeID);
      check = check.filter(val => val.IsEnd == 0);
      console.log(pointsOfHike, check);
      let startingTimestamp = pointsOfHike.filter(point => point.PointID == check[0].RefPointID)[0].ArrivalTime;
      console.log(startingTimestamp);
      let end_Date = new Date(endDate);
      end_Date.setHours(endTime.split(':')[0], endTime.split(':')[1]);
      console.log(end_Date.getTime());
      console.log(startingTimestamp - end_Date.getTime());
      let time = new Date(startingTimestamp);
      if(startingTimestamp - end_Date.getTime() >= 0)
        props.errorHandler({error: "Cannot end The hike before the Starting Time! Starting Time for this Hike:" + time});
      else {
        API.terminateHike(hike.HikeID,rp,end_Date.getTime()).then(()=>
        {
          setCanTerminate(false);
          //props.setMyHikes((oldHikes) => oldHikes.filter((val) => val.HikeID != hike.HikeID));
          navigate("/myHikes");
        });
      }
  
    }
  };
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

                  {/*refPoints != undefined && !refPoints.length && gpxData != undefined && gpxData.length != 0 &&
                    <>
                      <StartPoint position={gpxData[0]} />
                      <EndPoint position={gpxData.at(-1)} />
                    </>
            */}

                  {refPoints.map(rp => (
                    rp.IsStart ?
                      <MyStartPoint key={rp.RefPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type}  text={text}  rp={rp}  myPoints={myPoints} setShow={setShow} setText={setText}/>
                      : rp.IsEnd ?
                        <MyEndPoint key={rp.RefPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type} text={text}  rp={rp}  myPoints={myPoints} setShow={setShow} setText={setText}/>
                        :
                        <MyRefPoint key={rp.RefPointsID} position={{ lat: rp.Lat, lon: rp.Lng }} type={rp.Type} text={text}  rp={rp}  myPoints={myPoints} setShow={setShow} setText={setText}/>

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

                {canTerminate && <>

                  <Popup trigger={<PrimaryLink> End Hike</PrimaryLink>} position="right center">
                  <Container>
                  <Calendar onChange={setEndDate} value={endDate}></Calendar>
                    <TimePicker onChange={setEndTime} value={endTime} />
                    <PrimaryLink onClick={terminateHikeSelected}>Use selected date and hour</PrimaryLink>
                    <PrimaryLink onClick={terminateHikeCurrent}>Use current date and hour</PrimaryLink>
                  </Container>
                  </Popup>

                  </>
                  }

                {/*show && <>

                  <Popup trigger={<PrimaryLink> point reached</PrimaryLink>} position="right center">
                  <Container>
                  <Calendar onChange={setStartDate} value={startDate}></Calendar>
                    <TimePicker onChange={setStartTime} value={startTime} />
                    <PrimaryLink onClick={startHikeSelected}>Use selected date and hour</PrimaryLink>
                    <PrimaryLink onClick={startHikeCurrent}>Use current date and hour</PrimaryLink>
                  </Container>
                  </Popup>

                  </>
                */}
              </TextContent>
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

export default MyHikeDetails;