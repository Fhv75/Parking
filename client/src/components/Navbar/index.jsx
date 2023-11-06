import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
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

  return (
    <Box
      w="100%"
      bg="white"
      color="black"
      px={{ base: 10, xl: 28 }}
      py={2}
      shadow={"0px 0px 5px 0px rgba(0,0,0,0.15)"}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Button variant="none" color="black">
            <Heading as="h1" fontSize="1.65rem">
              Parking UTA
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
          columns={2}
          spacing={10}
          display={{ base: "none", lg: "grid" }}
        >
          <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
          <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
          {buttons.map((button) => (
            <Button
              variant="link"
              size="lg"
              key={button.name}
              onClick={button.type === "login" ? onLoginOpen : onRegisterOpen}
            >
              {button.name}
            </Button>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
