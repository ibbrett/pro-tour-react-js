import React from "react"; /* 'React' must be in scope when using JSX  */
import { FaSlackHash } from "react-icons/fa";
import {
  Container,
  Flag,
  FlagWrapper,
  Image,
  ImageWrapper,
  Name,
  NamePoints,
  Points,
  Rank,
  RankWrapper,
} from "../Styled/StyledMobileSurferListItem";

export const MobileSurferListItem = ({ surfer }) => {
  const { rank, image, name, flag, country, points } = surfer;

  return (
    <Container>
      <RankWrapper>
        <FaSlackHash />
        <Rank>{rank}</Rank>
      </RankWrapper>
      <NamePoints>
        <Name>{name}</Name>
        <Points>{points} points</Points>
      </NamePoints>
      <ImageWrapper>
        <Image src={image} />
      </ImageWrapper>
      <FlagWrapper>
        <Flag title={country} src={flag} />
      </FlagWrapper>
    </Container>
  );
};
