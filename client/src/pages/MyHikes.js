import React, { useState, useEffect,useContext } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "../components/headers/light.js";
import { SectionHeading } from "../components/misc/Headings";
import { PrimaryButton } from "../components/misc/Buttons";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext.js";
import API from "../API";

const HeadingRow = tw.div`flex  justify-center`;
const Heading = tw(SectionHeading)`text-gray-700  font-medium  `;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium `}
      }
    `}
`;
const Post = tw.div` flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-48 w-full bg-cover bg-center rounded-lg`}
`;
const Info = tw.div`p-8 border-2 rounded-lg`;
const Category = tw.div`text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-extrabold text-xl text-gray-900 group-hover:text-primary-500 transition duration-300 truncate `;
const Description = tw.div`truncate `;
const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;
const ShowButton = tw(PrimaryButton)`mt-4 mr-8 inline-block w-56 tracking-wide text-center py-5`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Input = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none text-sm font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `
const Instruction = tw.p` text-center md:text-left text-sm md:text-base lg:text-base  leading-relaxed  font-semibold text-base`
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-base`;

const FormContainer = styled.div`
  ${tw`p-5 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-100`}
    }
  }
`;
const InputContainer = tw.div`relative py-5 mt-6`;

const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const ThreeColumn = tw.div`mt-6 flex flex-col sm:flex-row justify-between`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-3/12 flex flex-col`;
const Column2 = tw.div`sm:w-1/2 flex flex-col `;

function MyHikeList(props) {

  const auth = useContext(AuthContext);
  const headingText = "My Hikes";
  //const hikes = props.hikes;

  const [visible, setVisible] = useState(6);

  //LOCATIONS AND FILTER'S DATA
  const [defaultHikes, setDefaultHikes] = useState(props.myHikes);
  const [locations, setLocations] = useState(undefined);
  const [hikes, setHikes] = useState(props.myHikes);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const updateData = async () => {
      setDefaultHikes(props.myHikes);
      setHikes(props.myHikes);
      console.log(props.myHikes);
      const hikeLocations = await API.getHikesLocations();
      setLocations(hikeLocations);
      setLoading(false);
    }

    updateData();
  }, [props.myHikes]);



  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
    if (visible > hikes.length) {
      setVisible(hikes.length)
    }
  };


  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          {!loading &&
            <Posts>
              {hikes.length > 0 ?
                hikes.slice(0, visible).map((hike, index) => (
                  <HikeElement key={index} hike={hike} />
                ))
                :
                <Heading>You don't have started hikes. Start and hike than return on this page</Heading>
              }

            </Posts>
          }
          {!loading && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
      {/*<Footer />*/}
    </AnimationRevealPage>
  )
}



function HikeElement(props) {

  const navigate = useNavigate();

  const hike = props.hike;
  //const imageSrc = "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";

  let hh = Math.floor(hike.ExpectedTime / 60);
  let mm = Math.floor(hike.ExpectedTime % 60);
  let dd = 0;
  let time = "";
  if (hh > 24) {
    dd = Math.floor(hh / 24);
    hh = Math.floor(hh % 24)
    time = dd + " days, " + hh + " hours, " + mm + " minutes";
  } else {
    time = hh + " hours, " + mm + " minutes";
  }



  return (
    <PostContainer key={props.index} >
      <Post className="group" as="a" >
        <Info>
        {<Image imageSrc={`http://localhost:3001/${hike.Picture}`} />
               }
          <Category>
            {
              hike.Difficulty === "T" ? "Tourist (T)"
                : hike.Difficulty === "H" ? "Hiker (H)"
                  : hike.Difficulty === "PH" ? "Professional Hiker (PH)" : ""
            }
          </Category>

          <CreationDate>dd/mm/yyyy</CreationDate>
          <Title>{hike.Title}</Title>

          <Description> <span tw="text-primary-500">Length:</span> {hike.Length} km</Description>
          <Description> <span tw="text-primary-500">Ascent:</span> {hike.Ascent} mt</Description>
          <Description> <span tw="text-primary-500">Expected Time:</span> {time}</Description>
          <Description>
            {hike.City ? hike.City : ""}{hike.Province ? " | " + hike.Province : ""}{hike.Region ? " | " + hike.Region : ""}{hike.Country ? " | " + hike.Country : ""}
          </Description>

          <PostAction onClick={() => { navigate('/myHike/' + hike.HikeID) }}>View details</PostAction>
        </Info>

      </Post>
    </PostContainer>
  )
}

export default MyHikeList;