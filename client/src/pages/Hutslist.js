import React, { useEffect, useState } from "react";
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
import API from "../API.js";

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

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `

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
      ${tw`text-gray-500`}
    }
  }
`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-base`;

const Textarea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full  mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const SubmitButtonLarge = tw.button` w-full 2xl:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-3xl transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;



const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300 truncate `;
const Description = tw.div`truncate `;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;


function Huts(props) {
    const headingText = "Huts";
    
    //FORM VARIABLES
    const [visible, setVisible] = useState(6);
    const [heading, setHeading] = useState("Hut's filters");
    const [submitButtonText, setSubmitButtonText] = useState('Submit');
    const [resetButtonText, setResetButtonText] = useState('Reset');
    const [loading, setLoading] = useState(true);

    //LOCATIONS AND FILTER'S DATA
    const [locations, setLocations] = useState(undefined);
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');

    //FILTERS FOR HUTS
    const [whenOpen, setWhenOpen] = useState('');
    const [beds, setBeds] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [name, setName] = useState('')

    const [huts, setHuts] = useState(props.huts);

    useEffect(() => {
        const loadLocation = async () => {
          const locationObj = await API.getHutsLocations();
          //console.log(locationObj);
          setLocations(locationObj);
          setLoading(false);
        }
        try {
          loadLocation();
        } catch (err) {
          //handling err
        }
      }, []);

    const onLoadMoreClick = () => {
        setVisible(v => v + 6);
        if (visible > huts.length) {
            setVisible(huts.length);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loc = filterValue ? { locationType: filterType, location: filterValue } : null;
        const huts = await API.getHutsFilters(name ? name : null, loc, whenOpen ? whenOpen : null, beds ? beds : null, price ? price : null);
        console.log(huts);
        setHuts(huts);
        setLoading(false);
      }
    
      const handleReset = (event) => {
        props.setLoading(true);
        setFilterType('');
        setFilterValue('');
        setWhenOpen('');
        setBeds(0);
        setPrice(0.0);
        setName('');
      }
    
    function Filters(props){
        return(
            <>
            {!loading && <FormContainer>
            <TextContent>
            <Heading>{heading}</Heading>
    
            <Form onSubmit={handleSubmit}>
                {/* SELECTS THE TYPE OF FILTER (CITY, PROVINCE, ETC) */}
                <InputOption  as="select" value={filterType} onChange={ev => setFilterType(ev.target.value)} >
                    <option hidden>Filter type</option>
                    <option value="City">City</option>
                    <option value="Province">Province</option>
                    <option value="Region">Region</option>
                    <option value="Country">Country</option>
                </InputOption>

                { /* SELECTS THE VALUE BASED ON THE FILTER SELECTED (SHOWS ALL CITIES IN DB IF CITY FILTER IS SELECTED, PROVINCES IF PROVINCE IS SELECTED AND SO ON) */}
                <InputOption  as="select" value={filterValue} onChange={ev => setFilterValue(ev.target.value)} >
                    <option hidden>Select {filterType}</option>
                    {
                    filterType === 'City' ?
                        locations.City.map((el) => {
                            console.log(el)
                            return <option key={el} value={el}>{el}</option>
                        })
                    : 
                    filterType === 'Province' ?
                        locations.Province.map((el) => {
                          return <option key={el} value={el}>{el}</option>
                        })
                    : 
                    filterType === 'Region' ?
                        locations.Region.map((el) => {
                            return <option key={el} value={el}>{el}</option>
                        })
                    :
                    filterType === 'Country' ?
                        locations.Country.map((el) => {
                            return <option key={el} value={el}>{el}</option>
                        })
                    : <></>
                  }
                </InputOption>

                <InputOption  as="select" value={whenOpen} onChange={ev => setWhenOpen(ev.target.value)} >
                    <option hidden>Select the opening period</option>
                    <option value="S">Summer</option>
                    <option value="SW">Summer and Winter</option>
                    <option value="W">Winter</option>
                    <option value="Y">All year</option>
                    <option value="C">closed</option>
                </InputOption>
    
                <InputContainer>
                <Label htmlFor="start-input">Number of beds</Label>
                <Input id="start-input" type="number" name="beds" placeholder="Insert the number of beds" value={beds} onChange={ev => setBeds(ev.target.value)} />
                </InputContainer>

                <InputContainer>
                <Label htmlFor="startType-input">Average price</Label>
                <Input id="startType-input" type="number" name="avgPrice" placeholder="Insert the average price" value={price} onChange={ev => setPrice(ev.target.value)} />
                </InputContainer>

                <InputContainer>
                <Label htmlFor="end-input">Hut's Name</Label>
                <Input id="end-input" type="text" name="hutName" placeholder="Insert Hut's name" value={name} onChange={ev => setName(ev.target.value)} />
                </InputContainer>

                <SubmitButtonLarge type="submit">{submitButtonText}</SubmitButtonLarge>
                <SubmitButton type="reset" onClick={handleReset}>{resetButtonText}</SubmitButton>
            </Form>
        </TextContent>
        </FormContainer>}
        </>)
    }


    return (
        <AnimationRevealPage>
            <Header logout={props.logout} />
            <Container>
                <ContentWithPaddingXl>
                    <HeadingRow>
                        <Heading>{headingText}</Heading>
                        <Filters/>
                    </HeadingRow>
                    {!props.loading &&
                        <Posts>
                            {huts.slice(0, visible).map((hut, index) => (
                                <HutElement key={index} hut={hut} />
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
    );
}

function HutElement(props) {

    const hut = props.hut;
    const imageSrc = "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";
    
    const navigate = useNavigate();

    let loc = hut.City?hut.City+", ":"" ;
    loc += hut.Province?hut.Province+", ":"";
    loc += hut.Region?hut.Region+", ":""
    loc += hut.Country?hut.Country:"";

    return (
        <PostContainer key={props.index}>
            <Post className="group" as="a">
                <Image imageSrc={imageSrc} />
                <Info>
                    <Title>{hut.Name}</Title>
                    <Category>{hut.Elevation} mt</Category>
                    <CreationDate>date</CreationDate>
                    <Description>{loc}</Description>
                    <PostAction onClick={ () => navigate('/huts/' + hut.RefPointID)}>View details</PostAction>
                </Info>
            </Post>
        </PostContainer>
    )
}


export default Huts;