import { useEffect, useState } from 'react';
import { Button, HStack, Heading, Checkbox, Text, Box } from "@chakra-ui/react";
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function VehicleManagement() {
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose,
    } = useDisclosure();

    const {
        isOpen: isUpdOpen,
        onOpen: onUpdOpen,
        onClose: onUpdClose,
    } = useDisclosure();
    const vehicleId = localStorage.getItem("vehicleId");
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios
            .get("http://localhost:5000/vehicles", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                //ordenar por id
                setVehicles(
                    response.data.sort((a, b) => {
                        if (a.id > b.id) {
                            return 1;
                        }
                        if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    }
                    )
                );
            })
            .catch((error) => console.error("There was an error!", error));
        axios
            .get("http://localhost:5000/user", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                //ordenar por id
                setUsers(
                    response.data.sort((a, b) => {
                        if (a.id > b.id) {
                            return 1;
                        }
                        if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    })
                );
            })
            .catch((error) => console.error("There was an error!", error));
    }, [vehicleId]);
    const [selectedvehicles, setSelectedvehicles] = useState([]);
    const [selectedvehicle, setSelectedvehicle] = useState({});

    const handleAddvehicle = async () => {
        onAddOpen(true);
    };

    const handleDeleteSelected = async () => {
        try {
            selectedvehicles.forEach(async (id) => {
                if (id === localStorage.getItem("vehicleId")) {
                    alert("No puedes eliminar tu propio usuario");
                }
                else {
                    await axios.delete(`http://localhost:5000/vehicle/${id}`,
                        {
                            headers: {
                                Authorization: `${localStorage.getItem("token")}`,
                            },
                        }
                    );
                }
                toast({
                    title: "Vehiculo desactivado.",
                    description: "El vehiculo ha sido desactivado.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                setTimeout(() => {
                    location.reload()
                }, 2000);
            })
            setSelectedvehicles([]);
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            toast({
                title: "Error al desactivar vehiculo.",
                description: error.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleUpdatevehicle = async (vehicle) => {
        setSelectedvehicle(vehicle);
        onUpdOpen(true);
    };

    const handleCheckboxChange = (id) => {
        setSelectedvehicles(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    return (
        <>
            <Heading pt={10} mx={20}>Gestión de Vehiculos</Heading>
            {
                vehicles.length !== 0 ?
                    <Box maxH="60vh" overflow="scroll" my={10} mx={20} borderRadius={20}>
                        <Table variant="striped" colorScheme='gray' bg="white" borderRadius={20}>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Patente</Th>
                                    <Th>Marca</Th>
                                    <Th>Modelo</Th>
                                    <Th>Color</Th>
                                    <Th>Activo</Th>
                                    <Th>Usuario</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {vehicles.map(vehicle => (
                                    <Tr key={vehicle.id}>
                                        <Td>{vehicle.id}</Td>
                                        <Td>{vehicle.patente}</Td>
                                        <Td>{vehicle.marca}</Td>
                                        <Td>{vehicle.modelo}</Td>
                                        <Td>{vehicle.color}</Td>
                                        <Td>{vehicle.esta_activo}</Td>
                                        <Td>{users.
                                            filter(user => user.id === vehicle.user_id)
                                            .map(user => user.correo_electronico)
                                        }</Td>
                                        <Td>
                                            <Checkbox
                                                colorScheme='red'
                                                borderColor="red.400"
                                                onChange={() => handleCheckboxChange(vehicle.id)}
                                                isChecked={selectedvehicles.includes(vehicle.id)}
                                            />
                                        </Td>

                                        <Td>
                                            <Button colorScheme='linkedin' color="white" onClick={() => handleUpdatevehicle(vehicle)}>Editar</Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    : <Text m={24}>No hay vehiculos ingresados en el sistema</Text>
            }
            <HStack mx={20}>
                <Button colorScheme="green" onClick={handleAddvehicle}>Agregar un Vehiculo</Button>
                <Button colorScheme="red" onClick={handleDeleteSelected}>Desactivar Selección</Button>
            </HStack>
            <UpdateModal isOpen={isUpdOpen} onClose={onUpdClose} vehicle={selectedvehicle} />
            <AddModal isOpen={isAddOpen} onClose={onAddClose} users={users} />
        </>
    );
}
