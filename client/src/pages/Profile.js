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
import StatsIllustrationSrc from "../images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "../images/dot-pattern.svg";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "../components/headers/light.js";
import Slider from "react-slick";


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
    const imageCss = null;
    const imageContainerCss = null;
    const imageDecoratorBlob = false;
    const imageDecoratorBlobCss = null;
    const imageInsideDiv = true;
    const textOnLeft = false;


    return (
        <AnimationRevealPage>
        <Header logout={props.logout} />
        <Container>
            <Heading> Hello, Customer </Heading>
            <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
                <ImageColumn css={imageContainerCss}>
                    {imageInsideDiv ? <Image imageSrc={imageSrc} css={imageCss} /> : <img src={imageSrc} css={imageCss} alt="" />}
                    {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
                </ImageColumn>
                <TextColumn textOnLeft={textOnLeft}>
                    <TextContent>
                        <Subheading>Name: name</Subheading>
                        <Subheading>Name: name</Subheading>
                        <Subheading>Name: name</Subheading>
                        <Subheading>Name: name</Subheading>


                    </TextContent>
                </TextColumn>
            </TwoColumn>
        </Container>
        </AnimationRevealPage>
    );

}


export default Profile;