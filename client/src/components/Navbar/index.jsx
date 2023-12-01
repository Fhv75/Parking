import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import ResponsiveDrawer from "./ResponsiveDrawer";
import buttons from "./buttons";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box
      w="100%"
      bg="white"
      color="black"
      px={{ base: 10, xl: 28 }}
      py={2}
      shadow={"md"}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Button variant="none" color="black">
            <Heading
              as="h1"
              fontSize="1.65rem"
              onClick={() => {
                navigate("/");
              }}
            >
              COMPARK
            </Heading>
          </Button>
        </Box>
        <Button
          display={{ base: "block", lg: "none" }}
          size="lg"
          variant="outline"
          onClick={onOpen}
        >
          <HamburgerIcon w={8} h={8} />
        </Button>
        <ResponsiveDrawer isOpen={isOpen} onClose={onClose} />
        <SimpleGrid
          columns={localStorage.getItem("token") ? 4 : 2}
          spacing={10}
          display={{ base: "none", lg: "grid" }}
        >
          <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
          <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
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
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
