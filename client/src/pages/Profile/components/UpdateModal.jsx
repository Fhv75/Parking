import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";

export default function UpdateModal({ isOpen, onClose, user }) {

    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios
            .get("http://localhost:5000/active-vehicles/" + userId, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setVehicles(response.data);
                console.log(vehicles.length)

            })
            .catch((error) => console.error("There was an error!", error));
    }, [userId, vehicles.length]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userId = localStorage.getItem("userId");
        const dataWithUserId = { ...data, userId };
        try {
            setIsLoading(true);
            const response = await axios.put(
                "http://localhost:5000/user/" + userId,
                dataWithUserId,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 201) {
                console.log("success");
                onClose();
                location.reload()
            } else {
                console.error("Error en la autenticación:", response.data);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        setIsLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Perfil</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={4} mb={4}>
                            <FormControl isInvalid={!!errors.nombre}>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    placeholder={user.nombre}
                                    {...register("nombre", {

                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.nombre && errors.nombre.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={!!errors.telefono}>
                                <FormLabel>Teléfono</FormLabel>
                                <Input
                                    placeholder={user.telefono}
                                    {...register("telefono", {
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.telefono && errors.telefono.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={!!errors.contraseña}>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type="password"
                                    placeholder={user.contraseña}
                                    {...register("contrasena", {

                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.contraseña && errors.contraseña.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Button
                                w={"16rem"}
                                py={6}
                                mt={4}
                                colorScheme="telegram"
                                type="submit"
                                isLoading={isLoading}
                                onClick={() => {
                                            onClose();
                                            location.reload()
                                        }}
                            >
                                Actualizar
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
