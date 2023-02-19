import { Container, Window, Exit, Header } from "../Styled/StyledModal";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ children, showModal, openModal }) => {
  return showModal ? (
    <Container>
      <Window>
        <Header>
          <Exit onClick={() => openModal(false)}>
            <FaWindowClose />
          </Exit>
        </Header>
        {children}
      </Window>
    </Container>
  ) : null;
};

export { Modal };
