import styled, { css } from "styled-components";

const wrapperHeight = 64;
const imageSize = 64;
const flagWidth = 60;
const flagHeight = (flagWidth * 2) / 3;

const margin = css`
  margin: 0 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
  padding: 10px;
  align-items: center;
`;

const Rank = styled.div``;

const RankWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  margin-right: 13px;
`;

const ImageWrapper = styled.span`
  ${margin}
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  height: ${wrapperHeight}px;
`;

const Image = styled.span`
  background-image: url("${(props) => props.src + "px"}");
  background-size: ${imageSize}px ${imageSize}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  background-repeat: no-repeat;
  display: inline-block;
  border-radius: 50%;
`;

const FlagWrapper = styled.div`
  margin-left: 8px;
  border-radius: 8px;
  height: ${wrapperHeight}px;
  width: ${flagWidth}px;
  position: relative;
`;

const Flag = styled.span`
  background-image: url("${(props) => props.src + "px"}");
  background-size: "cover";
  height: ${flagHeight}px;
  width: ${flagWidth}px;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: center center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NamePoints = styled.div`
  ${margin}
  flex: 1;
  margin: 0 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 1.5em;
`;

const Points = styled.div`
  color: #333;
`;

export {
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
};
