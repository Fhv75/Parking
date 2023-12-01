import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";
import buttons from "./buttons";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { useNavigate } from "react-router-dom";

export default function ResponsiveDrawer({ isOpen, onClose }) {
  ResponsiveDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const filteredButtons = buttons.filter((button) => {
    return localStorage.getItem("token") ? button.link : button.type;
  });

  let roleButtons = filteredButtons;

  const userRol = localStorage.getItem("userRol");
  if (localStorage.getItem("token")) {
    roleButtons = filteredButtons.filter((button) => {
      if (button.logout) return true;
      if (userRol === "admin") {
        return button.admin === true;
      } else {
        return button.admin !== true;
      }
    });
  }
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegación</DrawerHeader>
          <DrawerBody pt={6}>
            <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <VStack spacing={8} align="start">
              {
                roleButtons.map((button) => (
                  <Button
                    variant="link"
                    size="lg"
                    key={button.name}
                    onClick={() => {
                      if (button.type === "login") onLoginOpen();
                      else if (button.type === "register") onRegisterOpen();
                      else { button.link === "/" ? button.logout() : navigate(button.link) }
                    }}
                  >
                    {button.name}
                  </Button>
                ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
