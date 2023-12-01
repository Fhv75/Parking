import { useForm } from "react-hook-form";
import { FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, SimpleGrid, Select, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper, InputGroup, InputRightAddon } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

const EditUserModal = ({ isOpen, onClose, user }) => {
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    async function onSubmit(data) {
        try {
            const response = await axios.put('http://localhost:5000/user/' + user.id, data);
            console.log(response);
            toast({
                title: "Usuario actualizado.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => {
                location.reload()
            }, 2000);
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
            toast({
                title: "Error al actualizar usuario.",
                description: error.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
        console.log(data);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        <ModalHeader>Editar Usuario</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input name="nombre" placeholder={user.nombre} {...register("nombre")} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <Input name="descripcion" placeholder={user.correo_electronico} {...register("correo_electronico")} />
                            </FormControl>
                            <SimpleGrid columns={2} spacing={4} pt={4}>
                                <FormControl>
                                    <FormLabel>Rut</FormLabel>
                                    <Input {...register("rut")} name="rut" placeholder={user.rut} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Teléfono</FormLabel>
                                    <Input {...register("telefono")} name="telefono" placeholder={user.telefono} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Rol</FormLabel>
                                    <Select {...register("rol")} placeholder={user.comuna}>
                                        <option value="alumno">Alumno</option>
                                        <option value="academico">Academico</option>
                                        <option value="funcionario">Funcionario</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>
                        </ModalBody>
                        <ModalFooter>
                            <Button mx={4} colorScheme="green" type="submit">Guardar</Button>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal >
        </>
    );
};

export default EditUserModal;