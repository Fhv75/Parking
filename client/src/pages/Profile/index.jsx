import { Box, SimpleGrid, Heading, Text, Button } from "@chakra-ui/react";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import UpdateModal from "./components/UpdateModal";

export default function Profile() {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const {
        isOpen: isUpdOpen,
        onOpen: onUpdOpen,
        onClose: onUpdClose,
    } = useDisclosure();

    useEffect(() => {
        axios
            .get("http://localhost:5000/user/" + userId, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
                setIsLoading(false);
            })
            .catch((error) => console.error("There was an error!", error));
    }, [userId]);

    return (
        <Box mx={{ base: 8, lg: 20 }} my={10}>
            <Heading mb={10} ms={10}>Mis Datos</Heading>
            <Box shadow="lg" w={{ base: "100%", sm: "max-content" }}>
                <Box px={{ base: 8, sm: 20 }} py={10}>
                    <SimpleGrid columns={2} py={2.5}>
                        <Heading fontSize="xl" w="6rem">Nombre</Heading>
                        {
                            isLoading ? <Text>Cargando...</Text> : <Text>{user.nombre}</Text>
                        }
                    </SimpleGrid>
                    <SimpleGrid columns={2} py={2.5}>
                        <Heading fontSize="xl" w="6rem">Correo</Heading>
                        {
                            isLoading ? <Text>Cargando...</Text> : <Text>{user.correo_electronico}</Text>
                        }
                    </SimpleGrid>
                    <SimpleGrid columns={2} py={2.5}>
                        <Heading fontSize="xl" w="6rem">Telefono</Heading>
                        {
                            isLoading ? <Text>Cargando...</Text> : <Text>{user.telefono}</Text>
                        }
                    </SimpleGrid>
                    <SimpleGrid columns={2} py={2.5}>
                        <Heading fontSize="xl" w="6rem">Rol</Heading>
                        {
                            isLoading ? <Text>Cargando...</Text> : <Text>{user.rol}</Text>
                        }
                    </SimpleGrid>
                    <Button colorScheme="green" mt={10} w="100%" onClick={onUpdOpen}>Editar</Button>
                    <UpdateModal isOpen={isUpdOpen} onClose={onUpdClose} user={user} />
                </Box>
            </Box>
        </Box>
    )
}