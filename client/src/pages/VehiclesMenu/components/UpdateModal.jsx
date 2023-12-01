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
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";

export default function UpdateModal({ isOpen, onClose }) {
    UpdateModal.propTypes = {


    };

    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const userId = localStorage.getItem("userId");
    const [selectedV, setSelectedV] = useState({})

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
                "http://localhost:5000/vehicle/" + selectedV.id,
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
                <ModalHeader>Actualizar un vehiculo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack gap={4} mb={4}>
                            <Select
                                {...register("arriendo_venta")} onChange={
                                    (e) => {
                                        setSelectedV(vehicles.filter(vehicle => vehicle.id == e.target.value)[0] || {})
                                    }
                                }>
                                <option value={null}>Seleccione un vehiculo</option>
                                {
                                    vehicles.length > 0 ?
                                        vehicles.map((vehicle, index) => {
                                            return <option key={index} value={vehicle.id}>{vehicle.marca + " " + vehicle.modelo + " (" + vehicle.patente + ")"}</option>
                                        }) :
                                        <option value={null}>No hay vehiculos</option>
                                }
                            </Select>
                            {
                                selectedV.id &&
                                <>
                                    <FormControl isInvalid={!!errors.patente}>
                                        <FormLabel>Patente</FormLabel>
                                        <Input
                                            placeholder={selectedV.patente}
                                            {...register("patente", {

                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.patente && errors.patente.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.marca}>
                                        <FormLabel>Marca</FormLabel>
                                        <Input
                                            placeholder={selectedV.marca}
                                            {...register("marca", {
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.marca && errors.marca.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.modelo}>
                                        <FormLabel>Modelo</FormLabel>
                                        <Input
                                            placeholder={selectedV.modelo}
                                            {...register("modelo", {

                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors.modelo && errors.modelo.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={!!errors.color}>
                                        <FormLabel>Color</FormLabel>
                                        <Input
                                            placeholder={selectedV.color}
                                            {...register("color", {

                                            })}
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
                                            location.reload()
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
