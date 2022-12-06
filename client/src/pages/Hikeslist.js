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
import { useNavigate } from "react-router-dom";
import API from "../API";

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
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium `}
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
const Description = tw.div`truncate `;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;
const ShowButton = tw(PrimaryButton)`mt-4 inline-block w-56 tracking-wide text-center py-5`;

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `
const Instruction = tw.p` text-center md:text-left text-sm md:text-base lg:text-lg  leading-relaxed  font-semibold text-base`
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-base`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
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

function HikeList(props) {

  const headingText = "Hikes";
  //const hikes = props.hikes;

  const [visible, setVisible] = useState(6);

  const [sortTypeDesc, setSortTypeDesc] = useState('TitleAsc');

  //LOCATIONS AND FILTER'S DATA
  const [defaultHikes, setDefaultHikes] = useState(props.hikes);
  const [locations, setLocations] = useState(undefined);
  const [hikes, setHikes] = useState(props.hikes);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const updateData = async () =>{
      setDefaultHikes(props.hikes);
      setHikes(props.hikes)

      const hikeLocations = await API.getHikesLocations();
      setLocations(hikeLocations);
      setLoading(false);
    }

    updateData();
  }, [props.hikes]);

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
          { /* OLD FILTER COMPONENT */}
          { /* ------------------------------------------------------- */}
          {/* <FormContainer>
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
          </FormContainer> */}
          { /* ------------------------------------------------------- */}
          <div>
            <ShowButton onClick={() => setShow(!show)}>{show ? 'Close The Filter' : 'Select The Filter'}</ShowButton>
            {show && <div>
              <Filters
                sortTypeDesc={sortTypeDesc}
                setSortTypeDesc={setSortTypeDesc}
                locations={locations}
                setHikes={setHikes}
                setLoading={setLoading}
                loading={loading}
                defaultHikes={defaultHikes}
              />
            </div>}
          </div>
          {!loading &&
            <Posts>
              {hikes.slice(0, visible).map((hike, index) => (
                <HikeElement key={index} hike={hike} />
              ))}

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

function Filters(props) {

  const [submitButtonText, setSubmitButtonText] = useState('Submit');
  const [resetButtonText, setResetButtonText] = useState('Reset');

  //FILTERS LOCATION
  const [filterType, setFilterType] = useState(undefined);
  const [filterValue, setFilterValue] = useState(undefined);

  //FILTERS FOR HIKES
  const [difficulty, setDifficulty] = useState(undefined);
  const [minDist, setMinDist] = useState(undefined);
  const [maxDist, setMaxDist] = useState(undefined);
  const [minAscent, setMinAscent] = useState(undefined);
  const [maxAscent, setMaxAscent] = useState(undefined);
  const [minExTime, setMinExTime] = useState(undefined);
  const [maxExTime, setMaxExTime] = useState(undefined);

  const [msgLength, setMsgLength] = useState('');
  const [msgAscent, setMsgAscent] = useState('');
  const [msgExTime, setMsgExTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let t_minExTime = minExTime;
    let t_maxExTime = maxExTime;
    let t_minAscent = minAscent;
    let t_maxAscent = maxAscent;
    const t_filterType = filterType;
    let t_minDist = minDist;
    let t_maxDist = maxDist;
    const t_filterValue = filterValue;
    const t_difficulty = difficulty;

    if (t_minExTime === "" || t_minExTime === undefined)
      t_minExTime = 0;
    if (t_maxExTime === "")
      t_maxExTime = undefined;
    if (t_minAscent === "" || t_minAscent === undefined)
      t_minAscent = 0;
    if (t_maxAscent === "")
      t_maxAscent = undefined;
    if (t_minDist === "" || t_minDist === undefined)
      t_minDist = 0;
    if (t_maxDist === "")
      t_maxDist = undefined;

    const data = await API.getFilteredHikes(t_minExTime, t_maxExTime, t_minAscent, t_maxAscent, t_filterType, t_filterValue, t_minDist, t_maxDist, t_difficulty);
      if (props.sortTypeDesc !== "") {
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
              sorted = [...data].sort((a, b) => {
                if (a[sortProperty].trim() > b[sortProperty].trim()) return -1
                if (a[sortProperty].trim() < b[sortProperty].trim()) return 1
                return 0
              });
            else
              sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
          }else {
            if (sortProperty === "Title" || sortProperty === "Difficulty")
              sorted = [...data].sort((a, b) => {
                if (a[sortProperty].trim() > b[sortProperty].trim()) return 1 
                if (a[sortProperty].trim() < b[sortProperty].trim()) return -1
                return 0
              });
            else
              sorted = [...data].sort((a, b) => a[sortProperty] - b[sortProperty]);
          }
          console.log(sorted)
          props.setHikes(sorted);
        };
      sortArray(props.sortTypeDesc);
    }
  }

  const handleReset = (event) => {
    setFilterType(undefined);
    setFilterValue(undefined);
    setMinExTime(undefined);
    setMinDist(undefined);
    setMinAscent(undefined);
    setDifficulty(undefined);
    setMaxDist(undefined);
    setMaxAscent(undefined);
    setMaxExTime(undefined);

    setMsgLength('');
    setMsgAscent('');
    setMsgExTime('');

    props.setHikes(props.defaultHikes);
  }

  return (
      <>
          {!props.loading &&
              <Container>
                  <Content>
                      <FormContainer>
                          {/*<Heading2>{heading}</Heading2>*/}
                          <div tw="mx-auto max-w-4xl">
                              <form onSubmit={handleSubmit}>
                                  {/* SELECTS THE TYPE OF FILTER (CITY, PROVINCE, ETC) */}
                                  <ThreeColumn>
                                      <Column>
                                      <Instruction>
                                              Sorting
                                          </Instruction>
                                          <InputOption as="select" value={props.sortTypeDesc} onChange={ev => props.setSortTypeDesc(ev.target.value)} >
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
                                          </InputOption>

                                          <Instruction>
                                              Location Type
                                          </Instruction>
                                          <InputOption as="select" value={filterType} onChange={ev => setFilterType(ev.target.value)} >
                                              <option hidden>Location</option>
                                              <option value="City">City</option>
                                              <option value="Province">Province</option>
                                              <option value="Region">Region</option>
                                              <option value="Country">Country</option>
                                          </InputOption>

                                          <Instruction>
                                              {filterType === 'City' ? 'City'
                                                  : filterType === 'Province' ? 'Province'
                                                      : filterType === 'Region' ? 'Region'
                                                          : filterType === 'Country' ? 'Country'
                                                              : "Select location first"}
                                          </Instruction>
                                          { /* SELECTS THE VALUE BASED ON THE FILTER SELECTED (SHOWS ALL CITIES IN DB IF CITY FILTER IS SELECTED, PROVINCES IF PROVINCE IS SELECTED AND SO ON) */}
                                          <InputOption as="select" value={filterValue} onChange={ev => setFilterValue(ev.target.value)} >
                                              <option hidden>Select {filterType ? filterType : "location first"}</option>
                                              {
                                                  filterType === 'City' ?
                                                      props.locations.City.map((el) => {
                                                          return <option key={el} value={el}>{el}</option>
                                                      })
                                                      :
                                                      filterType === 'Province' ?
                                                          props.locations.Province.map((el) => {
                                                              return <option key={el} value={el}>{el}</option>
                                                          })
                                                          :
                                                          filterType === 'Region' ?
                                                              props.locations.Region.map((el) => {
                                                                  return <option key={el} value={el}>{el}</option>
                                                              })
                                                              :
                                                              filterType === 'Country' ?
                                                                  props.locations.Country.map((el) => {
                                                                      return <option key={el} value={el}>{el}</option>
                                                                  })
                                                                  : <></>
                                              }
                                          </InputOption>

                                          <Instruction>
                                              Hike's Difficulty
                                          </Instruction>
                                          <InputOption as="select" value={difficulty} onChange={ev => setDifficulty(ev.target.value)} >
                                              <option hidden>Difficulty</option>
                                              <option value="T">Tourist (T)</option>
                                              <option value="H">Hiker (H)</option>
                                              <option value="PH">Professional Hiker (PH)</option>
                                          </InputOption>

                                      </Column>
                                      <Column>
                                          <InputContainer>
                                              <Label htmlFor="price-input">Lenght filter(min)[in KM]</Label>
                                              <Input id="price-input" type="number" name="minLenghtFilter" placeholder="Insert the minimum distance (in km)" value={minDist} onChange={ev => setMinDist(ev.target.value)} />
                                          </InputContainer>
                                          <InputContainer>
                                              <Label htmlFor="price-input">Ascent filter(min)[in M]</Label>
                                              <Input id="price-input" type="number" name="minAscentFilter" placeholder="Insert the minimum ascent (in m)" value={minAscent} onChange={ev => setMinAscent(ev.target.value)} />
                                          </InputContainer>
                                          <InputContainer>
                                              <Label htmlFor="price-input">Expected Time(min)[in Mins]</Label>
                                              <Input id="price-input" type="number" name="minExpTime" placeholder="Insert the minimum expected time (in mins)" value={minExTime} onChange={ev => setMinExTime(ev.target.value)} />
                                          </InputContainer>
                                      </Column>

                                      <Column>
                                      <InputContainer>
                                              <Label htmlFor="price-input">Lenght filter(max)[in KM]</Label>
                                              <Input id="price-input" type="number" name="maxLenghtFilter" placeholder="Insert the maximum distance (in km)" value={maxDist} onChange={ev => setMaxDist(ev.target.value)} />
                                          </InputContainer>
                                          <InputContainer>
                                              <Label htmlFor="price-input">Ascent filter(max)[in M]</Label>
                                              <Input id="price-input" type="number" name="maxAscentFilter" placeholder="Insert the maximum ascent (in m)" value={maxAscent} onChange={ev => setMaxAscent(ev.target.value)} />
                                          </InputContainer>
                                          <InputContainer>
                                              <Label htmlFor="price-input">Expected Time(max)[in Mins]</Label>
                                              <Input id="price-input" type="number" name="maxExpTime" placeholder="Insert the maximum expected time (in mins)" value={maxExTime} onChange={ev => setMaxExTime(ev.target.value)} />
                                          </InputContainer>
                                      </Column>

                                  </ThreeColumn>
                                  <TwoColumn>
                                      <Column2>
                                          <ButtonContainer>
                                              <SubmitButton type="reset" onClick={handleReset}>{resetButtonText}</SubmitButton>
                                          </ButtonContainer>
                                      </Column2>
                                      <Column2>
                                          <ButtonContainer>
                                              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                                          </ButtonContainer>
                                      </Column2>
                                  </TwoColumn>
                              </form>
                          </div>

                      </FormContainer>
                  </Content>
              </Container>
          }
      </>)
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
        <Image imageSrc={hike.image === undefined ? hike.Picture : hike.image} />
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
          <Description>
            {hike.City?hike.City:""}{hike.Province?" | "+hike.Province:""}{hike.Region?" | "+hike.Region:""}{hike.Country?" | "+hike.Country:""}
            </Description>

          <PostAction onClick={() => { navigate('/' + hike.HikeID) }}>View details</PostAction>
        </Info>

      </Post>
    </PostContainer>
  )
}

export default HikeList;