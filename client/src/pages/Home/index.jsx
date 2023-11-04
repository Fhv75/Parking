import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import LoginModal from "../../components/LoginModal";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.35)), url('/bg.jpg')"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex m="auto" w="460px" h={"calc(100vh - 104px)"}>
        <LoginModal isOpen={isOpen} onClose={onClose} />
        <Center>
          <VStack borderRadius={20} bg="white" gap={6} p={10}>
            <Heading fontSize="2.2rem">Espacios Disponibles</Heading>
            <Heading fontSize="8rem" color="blue.500">
              30
            </Heading>
            <Button size="lg" colorScheme="telegram" onClick={onOpen}>
              Solicitar Acceso
            </Button>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
}
