import styled from "styled-components";
import { families, tags } from "./theme";

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(200, 200, 200, 0.9);
`;

const Window = styled.div`
  background-color: #fff;
  position: relative;
  padding: 20px;
  border-radius: 8px;
`;

const Exit = styled.div`
  color: ${tags.exit.color.default};
  &:hover {
    color: ${tags.exit.color.hover};
  }
  font-size: 32px;
  padding: 5px;
  display: inline-block;
  border-radius: 3px;
`;

/*
  color: rgb(71, 155, 9);
  &:hover {
    color: rgb(51, 107, 11);
  }
  */

/*
background-color: rgb(0, 255, 255);
background-color: rgba(0, 255, 255, 0.25);
*/

const Header = styled.div`
  text-align: right;
  margin-bottom: 8px;
`;

export { Container, Window, Exit, Header };
