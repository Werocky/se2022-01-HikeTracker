import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { ContentWithPaddingXl } from "../components/misc/Layouts";
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

const HeadingRow = tw.div`flex  justify-center`;
const Heading = tw(SectionHeading)`text-gray-700  font-medium `;
const Heading2 = tw(SectionHeading)`text-gray-100`;
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
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const InputOption = tw.input`mt-2 first:mt-0 border-b-2 py-3 focus:outline-none text-sm font-medium transition duration-300 hocus:border-gray-300 text-gray-700 `
const Instruction = tw.p` text-center md:text-left text-sm md:text-base lg:text-base  leading-relaxed  font-semibold text-base`
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

const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-48 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-extrabold text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300 truncate `;
const Description = tw.div`truncate `;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const PostAction = tw(PrimaryButtonBase)`w-full mt-8`;
const ShowButton = tw(PrimaryButton)`mt-4 inline-block w-56 tracking-wide text-center py-5`;


function Huts(props) {
    const headingText = "Huts";

    //FORM VARIABLES
    const [visible, setVisible] = useState(6);
    const [heading, setHeading] = useState("Hut's filters");
    const [loading, setLoading] = useState(true);

    //LOCATIONS AND FILTER'S DATA
    const [defaultHuts, setDefaultHuts] = useState(props.huts);
    const [locations, setLocations] = useState(undefined);
    const [huts, setHuts] = useState(props.huts);
    const [show, setShow] = useState(false);

    useEffect(async() => {
        const loadLocation = async () => {
            const locationObj = await API.getHutsLocations();
            //console.log(locationObj);
            setLocations(locationObj);
            setLoading(false);
        }
        try {
            await loadLocation();
        } catch (err) {
            //handling err
        }
    }, []);

    useEffect(() => {        
        setHuts(props.huts);
        console.log(props.huts)
    }, [props.huts]);

    const onLoadMoreClick = () => {
        setVisible(v => v + 6);
        if (visible > huts.length) {
            setVisible(huts.length);
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
                    <div>
                        <ShowButton onClick={() => setShow(!show)}>{show ? 'Close The Filter' : 'Select The Filter'}</ShowButton>
                        {show && <div>
                            <Filters
                                locations={locations}
                                setHuts={setHuts}
                                setLoading={setLoading}
                                loading={loading}
                                defaultHuts={defaultHuts}
                                />
                        </div>}
                    </div>
                    {!props.loading &&
                        <Posts>
                            {huts.length > 0 ?
                            huts.slice(0, visible).map((hut, index) => (
                                <HutElement key={index} hut={hut} />
                            ))
                            :
                            <Heading>No huts satisfy the filter's parameters</Heading>
                            }
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

function Filters(props) {

    const [submitButtonText, setSubmitButtonText] = useState('Submit');
    const [resetButtonText, setResetButtonText] = useState('Reset');

    //FILTERS LOCATION
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');

    //FILTERS FOR HUTS
    const [whenOpen, setWhenOpen] = useState('');
    const [beds, setBeds] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [name, setName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loc = filterValue ? { locationType: filterType, location: filterValue } : null;
        const huts = await API.getHutsFilters(name ? name : null, loc, whenOpen ? whenOpen : null, beds ? beds : null, price ? price : null);
        console.log(huts);
        props.setHuts(huts);
        props.setLoading(false);
    }

    const handleReset = (event) => {
        setFilterType('');
        setFilterValue('');
        setWhenOpen('');
        setBeds(undefined);
        setPrice(undefined);
        setName('');
        props.setHuts(props.defaultHuts);
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
                                                Location Type
                                            </Instruction>
                                            <InputOption as="select" value={filterType} onChange={ev => setFilterType(ev.target.value)} >
                                                <option hidden>Location</option>
                                                <option value="City">City</option>
                                                <option value="Province">Province</option>
                                                <option value="Region">Region</option>
                                                <option value="Country">Country</option>
                                            </InputOption>

                                            <InputContainer>
                                                <Label htmlFor="number-input">Number of beds</Label>
                                                <Input id="number-input" type="number" name="beds" placeholder="number" value={beds} onChange={ev => setBeds(ev.target.value)} />
                                            </InputContainer>

                                        </Column>
                                        <Column>
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
                                                            console.log(el)
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
                                            <InputContainer>
                                                <Label htmlFor="price-input">Average price</Label>
                                                <Input id="price-input" type="number" name="avgPrice" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)} />
                                            </InputContainer>
                                        </Column>

                                        <Column>
                                            <Instruction>
                                                Opening Session
                                            </Instruction>
                                            <InputOption as="select" value={whenOpen} onChange={ev => setWhenOpen(ev.target.value)} >
                                                <option hidden>Period</option>
                                                <option value="S">Summer</option>
                                                <option value="SW">Summer and Winter</option>
                                                <option value="W">Winter</option>
                                                <option value="Y">All year</option>
                                                <option value="C">closed</option>
                                            </InputOption>
                                            <InputContainer>
                                                <Label htmlFor="name-input">Hut's Name</Label>
                                                <Input id="name-input" type="text" name="hutName" placeholder="name" value={name} onChange={ev => setName(ev.target.value)} />
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



function HutElement(props) {

    const hut = props.hut;
    const imageSrc = "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80";
    const navigate = useNavigate();

    let loc = hut.City ? hut.City + ", " : "";
    loc += hut.Province ? hut.Province + ", " : "";
    loc += hut.Region ? hut.Region + ", " : ""
    loc += hut.Country ? hut.Country : "";

    return (
        <PostContainer key={props.index}>
            <Post className="group" as="a">
                <Image imageSrc={process.env.PUBLIC_URL+"/"+hut.Picture} />
                <Info>
                    <Title>{hut.Name}</Title>
                    <Category>{hut.Elevation} mt</Category>
                    <CreationDate>date</CreationDate>
                    <Description>{loc}</Description>
                    <PostAction onClick={() => navigate('/huts/' + hut.RefPointID)}>View details</PostAction>
                </Info>
            </Post>
        </PostContainer>
    )
}


export default Huts;