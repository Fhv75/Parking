import { useEffect, useState } from 'react';
import { Button, HStack, Heading, Checkbox, Text, Box } from "@chakra-ui/react";
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import EditUserModal from './components/EditUserModal';

export default function VehicleManagement() {
    const [users, setusers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isEditOpen, setisEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        const fetchusers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user');
                //ordenar por id
                setusers(
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
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchusers();
    }, []);

    const handleEditClose = () => setisEditOpen(false);

    const handleDeleteSelected = async () => {
        try {
            selectedUsers.forEach(async (id) => {
                if (id === localStorage.getItem("userId")) {
                    alert("No puedes eliminar tu propio usuario");
                }
                else {
                    await axios.delete(`http://localhost:5000/user/${id}`);
                }
                location.reload()
            })
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateuser = async (user) => {
        setSelectedUser(user);
        setisEditOpen(true);
    };

    const handleCheckboxChange = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    return (
        <>
            <Heading pt={10} mx={20}>Gestión de Usuarios</Heading>
            {
                users.length !== 0 ?
                    <Box maxH="60vh" overflow="scroll" my={10} mx={20} borderRadius={20}>
                        <Table variant="striped" colorScheme='gray' bg="white" borderRadius={20}>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Correo</Th>
                                    <Th>Nombre</Th>
                                    <Th>Rut</Th>
                                    <Th>Teléfono</Th>
                                    <Th>Rol</Th>
                                    <Th>Penalizado</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map(user => (
                                    <Tr key={user.id}>
                                        <Td>{user.id}</Td>
                                        <Td>{user.correo_electronico}</Td>
                                        <Td>{user.nombre}</Td>
                                        <Td>{user.rut}</Td>
                                        <Td>{user.telefono}</Td>
                                        <Td>{user.rol}</Td>
                                        <Td>{user.penalizado}</Td>
                                        <Td>
                                            <Checkbox
                                                colorScheme='red'
                                                borderColor="red.400"
                                                onChange={() => handleCheckboxChange(user.id)}
                                                isChecked={selectedUsers.includes(user.id)}
                                            />
                                        </Td>
                                        <Td>
                                            <Button colorScheme='green' color="white" onClick={() => { }}>Check In</Button>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='linkedin' color="white" onClick={() => handleUpdateuser(user)}>Editar</Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    : <Text m={24}>No hay usuarios ingresados en el sistema</Text>
            }
            <HStack mx={20}>
                <Button colorScheme="red" onClick={handleDeleteSelected}>Penalizar Selección</Button>
            </HStack>
            <EditUserModal isOpen={isEditOpen} onClose={handleEditClose} user={selectedUser} />
        </>
    );
}
