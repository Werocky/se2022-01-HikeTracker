import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import API from '../API';

import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import StatsIllustrationSrc from "../images/pictures/profile.jpeg";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
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
const DecoratorBlob = styled(SvgDotPattern);



function Profile(props) {
    const auth = useContext(AuthContext);
    const params = useParams();
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
                return <HikeRow key={hike.HikeID + Math.random()} hike={hike}></HikeRow>
            })}
            </Table>
            </>}
        </Container>
        </AnimationRevealPage>
    );

}

function HikeRow(props){
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
        <>
          <tbody>
            <tr>
              <td>{props.hike.HikeID}</td>
              <td>{props.hike.Title}</td>
              <td>{props.hike.City}</td>
              <td>{Math.floor(props.hike.ExpectedTime/60)}h:{props.hike.ExpectedTime%60}m</td>
              <td>{props.hike.Ascent}</td>
              <td>{msToTime(props.hike.CompletionTime)}</td>
            </tr>
          </tbody>
        </>
      );
}


export default Profile;