import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";

const VehiclesMenu = () => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();
  const userId = localStorage.getItem("userId");
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/vehicles/" + userId, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, [userId]);

  return (
    <>
      <TableContainer bg="gray.100" m={10} borderRadius={20}>
        <Table variant="striped" colorScheme="telegram">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Patente</Th>
              <Th>Marca</Th>
              <Th>Modelo</Th>
              <Th>Color</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vehicles &&
              vehicles.map((vehicle) => (
                <Tr key={vehicle.id}>
                  <Td>{vehicle.id}</Td>
                  <Td>{vehicle.patente}</Td>
                  <Td>{vehicle.marca}</Td>
                  <Td>{vehicle.modelo}</Td>
                  <Td>{vehicle.color}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddModal isOpen={isAddOpen} onClose={onAddClose} />
      <DeleteModal isOpen={isDelOpen} onClose={onDelClose} />
      <VStack>
        <Button colorScheme="telegram" onClick={onAddOpen}>
          Agregar un vehiculo
        </Button>
        <Button>Actualizar un vehiculo</Button>
        <Button onClick={onDelOpen} colorScheme="telegram">
          Eliminar un vehiculo
        </Button>
      </VStack>
    </>
  );
};

export default VehiclesMenu;
