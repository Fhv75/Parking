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
    Select,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

export default function UpdateModal({ isOpen, onClose, vehicle }) {

    const [isLoading, setIsLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userId = localStorage.getItem("userId");
        const dataWithUserId = { ...data, userId };
        console.log(data)
        try {
            setIsLoading(true);
            const response = await axios.put(
                "http://localhost:5000/vehicle/" + vehicle.id,
                dataWithUserId,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log("success");
                onClose();
                toast({
                    title: "Vehiculo actualizado.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                

            } else {
                console.error("Error en la autenticación:", response.data);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast({
                title: "Error al actualizar vehiculo.",
                description: error.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Actualizar un vehiculo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={4} mb={4}>
                            {
                                vehicle.id &&
                                <>
                                    <FormControl isInvalid={!!errors.patente}>
                                        <FormLabel>Patente</FormLabel>
                                        <Input
                                            placeholder={vehicle.patente}
                                            {...register("patente")}
                                        />
                                        <FormErrorMessage>
                                            {errors.patente && errors.patente.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.marca}>
                                        <FormLabel>Marca</FormLabel>
                                        <Input
                                            placeholder={vehicle.marca}
                                            {...register("marca")}
                                        />
                                        <FormErrorMessage>
                                            {errors.marca && errors.marca.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.modelo}>
                                        <FormLabel>Modelo</FormLabel>
                                        <Input
                                            placeholder={vehicle.modelo}
                                            {...register("modelo")}
                                        />
                                        <FormErrorMessage>
                                            {errors.modelo && errors.modelo.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.color}>
                                        <FormLabel>Color</FormLabel>
                                        <Input
                                            placeholder={vehicle.color}
                                            {...register("color")}
                                        />
                                        <FormErrorMessage>
                                            {errors.color && errors.color.message}
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
                                            setTimeout(() => {
                                                location.reload()
                                            }, 2000);
                                        }}
                                    >
                                        Actualizar
                                    </Button>
                                </>
                            }
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
