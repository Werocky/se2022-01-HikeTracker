import { useEffect } from 'react';
import API from '../API';
import "../style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "../helpers/AnimationRevealPage"
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/login-illustration.svg";
import logo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";
import Header from "../components/headers/light.js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function VerifiedMessage(props) {

  const logoLinkUrl = "#";
  const illustrationImageSrc = illustration;
  const headingText = "You're account has been verified! Go to the Main Page to start.";


  const handleMessage = (message) => {
    props.errorHandler(message);
  }

  const navigate = useNavigate();
    useEffect(() => {

      async function verification(){
        try {
          await API.verify();
        } catch (err) {
          handleMessage(err);
        }
       }

       verification();
      },);
      return(
      <AnimationRevealPage>
        <Header logout={props.logout} />
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo}onClick={()=>navigate('/')} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
      );
    }
  
  export default VerifiedMessage;