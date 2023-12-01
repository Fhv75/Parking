import {
  Button,
  useDisclosure,
  SimpleGrid,
  Box,
  Heading
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddModal from "./components/AddModal";
import CarCard from "./components/CarCard";
import DeleteModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";

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
  const {
    isOpen: isUpdOpen,
    onOpen: onUpdOpen,
    onClose: onUpdClose,
  } = useDisclosure();
  const userId = localStorage.getItem("userId");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/active-vehicles/" + userId, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error("There was an error!", error));
  }, [userId]);


  return (
    <>
      <Heading my={10} mx={28}>Mis Vehiculos</Heading>
      <Box mx={{ base: 10, "2xl": 20 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} gap={10} mt={10}>
          {

            vehicles.length > 0 ?
              vehicles.map((vehicle) => (
                <CarCard
                  key={vehicle.id}
                  marca={vehicle.marca}
                  modelo={vehicle.modelo}
                  patente={vehicle.patente}
                  color={vehicle.color}
                />
              )) :
              <Box ms={20}>No hay vehiculos registrados</Box>
          }
        </SimpleGrid>

        <AddModal isOpen={isAddOpen} onClose={onAddClose} />
        <DeleteModal isOpen={isDelOpen} onClose={onDelClose} />
        <UpdateModal isOpen={isUpdOpen} onClose={onUpdClose} />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} my={10} px={4} gap={6} w={{ base: "100%", sm: "85%", lg: "75%", xl: "50%" }}>
          <Button colorScheme="green" color="white" onClick={onAddOpen}>
            Agregar un vehiculo
          </Button>
          <Button onClick={onUpdOpen}>Actualizar un vehiculo</Button>
          <Button onClick={onDelOpen} colorScheme="red" color="white">
            Eliminar un vehiculo
          </Button>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default VehiclesMenu;
