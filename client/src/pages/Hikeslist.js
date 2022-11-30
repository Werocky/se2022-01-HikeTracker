import React, { useState, useEffect } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "../components/headers/light.js";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "../components/misc/Headings";
import { PrimaryButton } from "../components/misc/Buttons";
import { PrimaryButton as PrimaryButtonBase } from "../components/misc/Buttons.js";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
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
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div` flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-48 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-xl text-gray-900 group-hover:text-primary-500 transition duration-300 truncate `;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;

const FormContainer = tw.div`w-full flex-1 mt-8 mx-auto max-w-3xl `;

function HikeList(props) {

  const headingText = "Hikes";
  const hikes = props.hikes;

  const [visible, setVisible] = useState(6);

  const [sortTypeDesc, setSortTypeDesc] = useState('TitleAsc');

  useEffect(() => {
    if (sortTypeDesc !== "") {
      const sortArray = type => {
        const types = {
          TitleAsc: 'Title-Asc',
          TitleDesc: 'Title-Desc',
          LengthAsc: 'Length-Asc',
          LengthDesc: 'Length-Desc',
          AscentAsc: 'Ascent-Asc',
          AscentDesc: 'Ascent-Desc',
          DifficultyAsc: 'Difficulty-Asc',
          DifficultyDesc: 'Difficulty-Desc',
          ExpectedTimeAsc: 'ExpectedTime-Asc',
          ExpectedTimeDesc: 'ExpectedTime-Desc',
        };
        let sortProperty = types[type].split("-")[0];
        let sorted;
        if (types[type].split("-")[1] === "Desc") {
          if (sortProperty === "Title" || sortProperty === "Difficulty")
            sorted = [...props.hikes].sort((a, b) => {
              if (a[sortProperty].trim() > b[sortProperty].trim()) { return -1 }
              if (a[sortProperty].trim() < b[sortProperty].trim())
                return 1
              return 0
            });
          else {
            sorted = [...props.hikes].sort((a, b) => b[sortProperty] - a[sortProperty]);
          }
        }

        else {
          if (sortProperty === "Title" || sortProperty === "Difficulty")
            sorted = [...props.hikes].sort((a, b) => {
              if (a[sortProperty].trim() > b[sortProperty].trim()) { return 1 }
              if (a[sortProperty].trim() < b[sortProperty].trim())
                return -1
              return 0
            });
          else
            sorted = [...props.hikes].sort((a, b) => a[sortProperty] - b[sortProperty]);
        }


        props.setHikes(sorted);
      };
      sortArray(sortTypeDesc);
      setSortTypeDesc("");
    }
  }, [sortTypeDesc]);


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
          <FormContainer>
            <Form.Select aria-label="Default select example" onChange={(event) => {
              setSortTypeDesc(event.target.value);
            }}>
              <option value="TitleAsc">Title (Ascendent)</option>
              <option value="TitleDesc">Title  (Descendent)</option>
              <option value="LengthAsc" >Length - km (Ascendent)</option>
              <option value="LengthDesc" >Length - km (Descendent)</option>
              <option value="AscentAsc" >Ascent - m (Ascendent)</option>
              <option value="AscentDesc" >Ascent - m (Descendent)</option>
              <option value="DifficultyAsc" >Difficulty (Ascendent)</option>
              <option value="DifficultyDesc" >Difficulty (Descendent) </option>
              <option value="ExpectedTimeAsc" >Expected time - h:m (Ascendent)</option>
              <option value="ExpectedTimeDesc" >Expected time - h:m (Descendent)</option>
            </Form.Select>
          </FormContainer>
          {!props.loading &&
            <Posts>
              {hikes.slice(0, visible).map((hike, index) => (
                <HikeElement key={index} hike={hike} />
              ))}

            </Posts>
          }
          {!props.loading && (
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
  const imageSrc = "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";

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
        <Image imageSrc={imageSrc} />
        <Info>
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
          <Description>City/Province/Region/Country</Description>

          <PostAction onClick={() => { navigate('/' + hike.HikeID) }}>View details</PostAction>
        </Info>

      </Post>
    </PostContainer>
  )
}

export default HikeList;