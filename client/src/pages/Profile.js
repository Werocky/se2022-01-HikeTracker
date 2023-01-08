import { useContext, useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';

import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import StatsIllustrationSrc from "../images/pictures/profile.jpeg";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import Slider from "react-slick";
import { Table } from "react-bootstrap";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-contain bg-no-repeat bg-center h-full  `
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left mt-4 sm:text-3xl`;
const Heading = tw(
    SectionHeading
)`mt-8 font-black text-left text-3xl sm:text-4xl lg:text-3xl text-center md:text-left leading-tight`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
    tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);



function Profile(props) {
    const auth = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();

    const imageSrc = StatsIllustrationSrc;
    const imageDecoratorBlob = false;
    const imageDecoratorBlobCss = null;
    const imageInsideDiv = true;
    const textOnLeft = false;
    const [completedHikes, setCompletedHikes] = useState([]);

    let role = auth.user.Role === 'H' ? 'Hiker' : (auth.user.Role === 'L' ? 'Local guide' : 'Hut Manager');

    useEffect(() => {
        const loadCompletedHikes = async () => {
            await API.getCompletedHikes().then(list => {
                setCompletedHikes(list);
            }).catch(err => {
                console.log(err);
            })
        }
        loadCompletedHikes();
    },[])

    function msToTime(msDurata) {
        var millisecondi = parseInt((msDurata%1000)/100)
            , secondi = parseInt((msDurata/1000)%60)
            , minuti = parseInt((msDurata/(1000*60))%60)
            , ore = parseInt((msDurata/(1000*60*60)));
    
        ore = (ore < 10) ? "0" + ore : ore;
        minuti = (minuti < 10) ? "0" + minuti : minuti;
        secondi = (secondi < 10) ? "0" + secondi : secondi;
    
        return ore + ":" + minuti + ":" + secondi + "." + millisecondi;
    }

    return (
        <AnimationRevealPage>
        <Header logout={props.logout} />
        <Container>
            <Heading> Hello, {role} </Heading>
            <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
                <ImageColumn >
                    {imageInsideDiv ? <Image imageSrc={imageSrc} /> : <img src={imageSrc}  alt="" />}
                    {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Subheading>Name: {params.userId}</Subheading>
                        <Subheading>Role: {role}</Subheading>
                    </TextContent>
                </TextColumn>
            </TwoColumn>
            
            {auth.user.Role === 'H' && <><TextColumn textOnLeft={!textOnLeft}>
                    <TextContent>
                        <Subheading>Completed Hikes:</Subheading>
                    </TextContent>
                </TextColumn>
            <Table striped>
            <thead>
                <tr>
                    <th>HikeID</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Expected Time</th>
                    <th>Ascent</th>
                    <th>Completion time</th>
                </tr>
            </thead>
            {completedHikes.map(hike => {
                console.log(hike);
                return (
                    <>
                      <tbody>
                        <tr>
                          <td>{hike.HikeID}</td>
                          <td>{hike.Title}</td>
                          <td>{hike.City}</td>
                          <td>{Math.floor(hike.ExpectedTime/60)}h:{hike.ExpectedTime%60}m</td>
                          <td>{hike.Ascent}</td>
                          <td>{msToTime(hike.CompletionTime)}</td>
                        </tr>
                      </tbody>
                    </>
                  );
            })}
            </Table>
            </>}
        </Container>
        </AnimationRevealPage>
    );

}


export default Profile;