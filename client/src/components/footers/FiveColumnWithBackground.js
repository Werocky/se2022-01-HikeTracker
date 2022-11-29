import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import LogoImage from "images/logo-light.svg";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative bg-primary-500 text-gray-100 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const FiveColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column = tw.div`px-4 sm:px-0 sm:w-1/3 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-100 pb-1 transition duration-300`;

const Divider = tw.div`my-16 border-b-2 border-primary-400 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-100`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-400`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute top-0 left-0 w-80 h-80 transform -translate-x-20 -translate-y-32 text-primary-700 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 right-0 w-80 h-80 transform  translate-x-32 translate-y-48 text-primary-700 opacity-50`;

function FiveColumnWithBackground(props){
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <FiveColumns>
          <Column>
            <ColumnHeading>Main</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Blog</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>FAQs</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Support</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>About Us</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Product</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Log In</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Personal</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Business</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Team</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Press</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Logos</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Events</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Stories</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Office</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Team</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Career</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Founders</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Culture</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Onboarding</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>GDPR</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Privacy Policy</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Terms of Service</Link>
              </LinkListItem>
              <LinkListItem>
                <Link onClick={ () => navigate("#")}>Disclaimer</Link>
              </LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
        <Divider />
        <ThreeColRow>
          <LogoContainer>
            <LogoImg src={LogoImage} />
            <LogoText>Treact Inc.</LogoText>
          </LogoContainer>
          <CopywrightNotice>&copy; 2018 Treact Inc. All Rights Reserved.</CopywrightNotice>
          <SocialLinksContainer>
            <SocialLink onClick={ () => navigate("https://facebook.com")}>
              <FacebookIcon />
            </SocialLink>
            <SocialLink onClick={ () => navigate("https://twitter.com")}>
              <TwitterIcon />
            </SocialLink>
            <SocialLink onClick={ () => navigate("https://youtube.com")}>
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </ThreeColRow>
      </Content>
      <DecoratorBlobContainer>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </DecoratorBlobContainer>
    </Container>
  );
}

export default FiveColumnWithBackground;