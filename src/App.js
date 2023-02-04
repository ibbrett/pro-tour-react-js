import styled, { css } from "styled-components";
import { GiWaveSurfer } from "react-icons/gi";
import GlobalStyle from "./style/GlobalStyle";

const App = () => {
  const margin = css`
    margin: 5px;
  `;

  const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `;

  const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  `;

  const HeaderLabel = styled.div`
    ${margin}
    padding: 10px;
    font-family: Righteous, Sans-Serif;
    font-size: 32px;
  `;

  const IconContainer = styled.div`
    ${margin}
    padding: 10px;
    font-size: 64px;
  `;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <IconContainer>
            <GiWaveSurfer />
          </IconContainer>
          <HeaderLabel>Pro Tour</HeaderLabel>
        </Header>
      </Container>
    </>
  );
};

export default App;
