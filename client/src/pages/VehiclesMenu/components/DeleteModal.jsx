import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Card,
  Text,
  HStack,
  Checkbox,
  SimpleGrid
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

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
  }, [userId]);

  const handleDeleteSelected = async () => {
    try {
      for (let id of selectedVehicles) {
        await axios.delete(`http://localhost:5000/vehicle/${id}`
          , {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setVehicles(vehicles.filter(property => property.id !== id));

      }
      setSelectedVehicles([]);
      onClose();
      location.reload()
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedVehicles(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Eliminar vehiculos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            vehicles.length > 0 ?
              vehicles.map((vehicle, index) => {
                let v = vehicle || {};
                v.marca = vehicle.marca[0].toUpperCase() + vehicle.marca.slice(1);
                v.modelo = vehicle.modelo[0].toUpperCase() + vehicle.modelo.slice(1);
                v.patente = vehicle.patente.toUpperCase();
                v.color = vehicle.color[0].toUpperCase() + vehicle.color.slice(1);
                return (
                  <Card key={index} my={4} d="flex" py={3}>
                    <SimpleGrid gap={4} align={"start"} ps={10} columns={4}>
                      <Text>
                        {v.marca + " " + v.modelo}
                      </Text>
                      <HStack color="gray">
                        <Text size="md">
                          {v.patente}
                        </Text>
                      </HStack>
                      <Text>
                        {v.color}
                      </Text>
                      <Checkbox
                        borderColor="red"
                        colorScheme="red"
                        onChange={() => handleCheckboxChange(vehicle.id)}
                        isChecked={selectedVehicles.includes(vehicle.id)}
                      />
                    </SimpleGrid>
                  </Card>

                )
              }) :
              (
                <VStack my={4} align={"start"} ps={10}>
                  <Text>
                    No hay vehiculos para mostrar
                  </Text>
                </VStack>
              )


          }
          <Button
            w={"100%"}
            my={4}
            colorScheme="red"
            type="submit"
            isLoading={isLoading}
            onClick={handleDeleteSelected}
          >
            Eliminar Selección
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
