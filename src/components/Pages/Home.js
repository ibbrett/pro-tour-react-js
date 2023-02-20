import { useState } from "react";
import { GiWaveSurfer } from "react-icons/gi";
import { FaCog, FaMale, FaFemale, FaPaintBrush } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { ImListNumbered } from "react-icons/im";
import { Rankings } from "../Lists/Rankings";
import { Modal } from "../Modals/Modal";
import {
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
} from "../Styled/StyledHome";
import { surfers as data } from "../../data/surfers.js";

const firstPlace = 1;
const topCount = 5;
const showMenu = process.env?.REACT_APP_SHOW_MENU === "true" ? true : false;

const rankEventCount = data.length;
const themes = ["default", "hot to cold"];
const genders = ["top dogs", "men", "women"];
const listSize = ["all", "top five", "above the cut", "below the cut"];
const rankEvents = data.map((event) => event.label);

const Home = () => {
  // local state
  const [gender, setGender] = useState(0);
  const [theme, setTheme] = useState(0);
  const [rankIndex, setRankIndex] = useState(rankEventCount - 1);
  const [howMany, setHowMany] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // handlers
  const openModal = (isOpen) => {
    setShowModal(isOpen);
  };

  // add drop lists to modal, these update local (component) state
  const ChangeItem = (
    label,
    selected,
    setSelected,
    options,
    disabled = false
  ) => {
    const handler = (event) => {
      setSelected(+event.target.value);
    };

    return (
      <ChangeContainer>
        {label.length ? (
          <ChangeColumn>
            <Label>{label}: </Label>
          </ChangeColumn>
        ) : null}
        <ChangeColumn>
          <Select
            value={selected ? selected : ""}
            onChange={handler}
            disabled={disabled}
          >
            {options.map((option, i) => (
              <Option key={option} value={i}>
                {option}
              </Option>
            ))}
          </Select>
        </ChangeColumn>
      </ChangeContainer>
    );
  };

  const GetItems = () => {
    return gender
      ? howMany === 0
        ? data[rankIndex][genders[gender]]
        : howMany === 1
        ? data[rankIndex][genders[gender]].filter(
            (surfer) => surfer.rank <= topCount
          )
        : howMany === 2
        ? data[rankIndex][genders[gender]].filter(
            (surfer) => surfer.makingTheCut === true
          )
        : howMany === 3
        ? data[rankIndex][genders[gender]].filter(
            (surfer) => surfer.makingTheCut === false
          )
        : []
      : data[rankIndex]["men"]
          .filter((surfer) => surfer.rank <= firstPlace)
          .concat(
            data[rankIndex]["women"].filter(
              (surfer) => surfer.rank <= firstPlace
            )
          );
  };

  const iconFontSize = "42px";

  return (
    <>
      <Wrapper>
        <Container bg={theme}>
          <Header bg={theme}>
            <HeaderChild>
              <IconContainer>
                <GiWaveSurfer />
              </IconContainer>
              <HeaderLabel>2023 Pro Tour</HeaderLabel>
              {!showMenu && (
                <Link onClick={() => openModal(true)}>
                  <FaCog />
                </Link>
              )}
            </HeaderChild>
            {showMenu && (
              <HeaderChild>
                <HeaderInfo>
                  <HeaderColumn fontSize={iconFontSize}>
                    <Icon color={genders[gender] === "women" ? "pink" : null}>
                      <FaFemale />
                    </Icon>
                    <Icon color={genders[gender] === "men" ? "blue" : null}>
                      <FaMale />
                    </Icon>
                  </HeaderColumn>
                  <HeaderColumn>
                    {ChangeItem("", gender, setGender, genders)}
                  </HeaderColumn>
                </HeaderInfo>

                <HeaderInfo>
                  <HeaderColumn fontSize={iconFontSize}>
                    <Icon color={"orange"}>
                      <FaPaintBrush />
                    </Icon>
                  </HeaderColumn>
                  <HeaderColumn>
                    {ChangeItem("", theme, setTheme, themes)}
                  </HeaderColumn>
                </HeaderInfo>

                <HeaderInfo>
                  <HeaderColumn fontSize={iconFontSize}>
                    <Icon color={"cyan"}>
                      <CiCalendarDate />
                    </Icon>
                  </HeaderColumn>
                  <HeaderColumn>
                    {ChangeItem("", rankIndex, setRankIndex, rankEvents)}
                  </HeaderColumn>
                </HeaderInfo>

                <HeaderInfo>
                  <HeaderColumn fontSize={iconFontSize}>
                    <Icon color={"brown"}>
                      <ImListNumbered />
                    </Icon>
                  </HeaderColumn>
                  <HeaderColumn>
                    {ChangeItem("", howMany, setHowMany, listSize)}
                  </HeaderColumn>
                </HeaderInfo>
              </HeaderChild>
            )}
          </Header>
          <RankingsWrapper bg={theme}>
            <Rankings items={GetItems()} />
          </RankingsWrapper>
        </Container>
      </Wrapper>
      <Modal showModal={showModal} openModal={openModal}>
        {ChangeItem("Theme", theme, setTheme, themes)}
        {ChangeItem("Gender", gender, setGender, genders)}
        {ChangeItem("Rank Event", rankIndex, setRankIndex, rankEvents)}
        {ChangeItem(
          "How Many",
          howMany,
          setHowMany,
          listSize,
          genders[gender] === "top dogs"
        )}
      </Modal>
    </>
  );
};

export default Home;
