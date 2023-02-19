import styled, { css } from "styled-components";
import { families, tags } from "./theme";

const margin = css`
  margin: 5px;
`;

const backgrounds = {
  container: {
    default: css`
      background: linear-gradient(45deg, #54a707, yellow, #fdab09);
    `,
  },
  header: {
    other: css`
      background: linear-gradient(180deg, white, red);
    `,
  },
  body: {
    other: css`
      background: linear-gradient(180deg, red, white, blue);
    `,
  },
};

const Select = styled.select`
  background-color: ${tags.select.bg.default};
  &:hover {
    background-color: ${tags.select.bg.hover};
  }
  width: 100%;
  border-radius: 3px;
  padding: 3px;
`;

const Option = styled.option``;

const Label = styled.span`
  font-family: ${families.label};
  margin-right: 8px;
`;

const ChangeContainer = styled.div`
  margin: 8px;
`;

const ChangeColumn = styled.div`
  display: inline-block;
  padding: 3px;
  width: 120px;
`;

const IconContainer = styled.div`
  ${margin}
  padding: 10px;
  font-size: 64px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  ${(props) => (props.bg ? null : backgrounds.container.default)};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const HeaderLabel = styled.div`
  ${margin}
  padding: 10px;
  font-family: Righteous, Sans-Serif;
  font-size: 32px;
`;

const Link = styled.a`
  margin-left: 3px;
  font-family: ${families.header};
  font-size: 16px;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.55);
    cursor: pointer;
  }
`;

const RankingsWrapper = styled.div`
  ${(props) => (props.bg ? backgrounds.body.other : null)};
`;

const Header = styled.header`
  ${(props) => (props.bg ? backgrounds.header.other : null)};
`;

const HeaderChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: auto;
  flex-direction: row;
  padding-bottom: 20px;
`;

const HeaderInfo = styled.div`
  margin: 0 20px;
`;

const HeaderColumn = styled.div`
  font-size: ${(props) => props.fontSize};
  display: flex;
`;

const Icon = styled.div`
  color: ${(props) => props.color || null};
  display: inline-block;
  margin: auto;
`;

export {
  ChangeContainer,
  ChangeColumn,
  Container,
  Header,
  HeaderChild,
  HeaderColumn,
  HeaderInfo,
  HeaderLabel,
  Icon,
  IconContainer,
  Label,
  Link,
  Option,
  RankingsWrapper,
  Select,
  Wrapper,
};
