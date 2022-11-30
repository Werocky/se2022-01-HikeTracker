import React, { useState,useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import EmailIllustrationSrc from "../../images/email-illustration.svg";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import Header from "../headers/light.js";
import { Alert, Button, FloatingLabel, Row } from "react-bootstrap";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

function AddHike(props) {

  const [file, setFile] = useState();
  const [fileOk, setFileOk] = useState(false);

  //subheading = "Add a hike here",
  const heading = <>Add a hike here</>;
  const description = "Add a hike with following parameters and the gpx file.";
  const submitButtonText = "Confirm";
  const formAction = "#";
  const formMethod = "get";
  const textOnLeft = true;
  let f;
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.


  const handleSubmitFile = async (event) => {
    event.preventDefault();
    /**
     * PARSE THE FILE
     */
    setFile(event.target[0].files[0]);
    f=event.target[0].files[0];
    setFile(f);
   
    setFileOk(true); // if nothing went wrong
  //  console.log("HET");
    //console.log(f);
  }

  useEffect(()=>{
  console.log(file);
}, [file])

  return (
    <AnimationRevealPage>
      <Header logout={props.logout} />
      <Container>
        <TwoColumn>
          <ImageColumn>
            {/*put the picture or map here*/}
            <Image imageSrc={EmailIllustrationSrc} />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {/*{subheading && <Subheading>{subheading}</Subheading>}*/}
              <Heading>{heading}</Heading>
              {description && <Description>{description}</Description>}
            
              {!fileOk &&
                <Form onSubmit={handleSubmitFile} >
                  <div>Insert GPX file</div>
                  
                  // PROBLEMS HERE
                  
                  <Input type="file" required />
                  
                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              }
              {fileOk &&
                <Form>
                  <Input type="text" name="title" placeholder="title" />
                  <Input type="text" name="city" placeholder="city" />
                  <Input type="text" name="length" placeholder="length" />
                  <Textarea name="time" placeholder="time" />
                </Form>
              }
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </AnimationRevealPage>
  );
};

export default AddHike;