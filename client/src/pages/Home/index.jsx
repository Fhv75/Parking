import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginModal from "../../components/LoginModal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [slots, setSlots] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/available-slots")
      .then((response) => {
        setSlots(response.data.slots_disponibles);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Hubo un error en la carga de slots disponibles", error)
      );
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.35)), url('/bg.jpg')"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <LoginModal isOpen={isOpen} onClose={onClose} />
      <Center h={"calc(100vh - 56px)"}>
        <Flex maxW="460px">
          <VStack borderRadius={20} bg="white" gap={6} p={10}>
            <Heading fontSize="2.2rem">Espacios Disponibles:</Heading>
            <Text fontSize="8rem" color="blue.500">
              {isLoading ? (
                <Spinner
                  width="5.5rem"
                  height="5.5rem"
                  thickness="4px"
                  emptyColor="gray.200"
                />
              ) : (
                slots
              )}
            </Text>
            <Button size="lg" colorScheme="telegram" onClick={() => { localStorage.getItem("token") ? navigate("/vehiculos") : onOpen }}>
              Solicitar Acceso
            </Button>
          </VStack>
        </Flex>
      </Center>
    </Box>
  );
}
