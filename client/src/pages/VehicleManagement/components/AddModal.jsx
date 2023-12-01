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
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddModal({ isOpen, onClose, users}) {
  AddModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.post(
        "http://localhost:5000/vehicle",
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
        <ModalHeader>Agregar un vehiculo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Select {...register("user")} >
                  {
                    users.map((user) => (
                      <option key={user.id} value={user.id}>{user.correo_electronico}</option>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.patente}>
                <FormLabel>Patente</FormLabel>
                <Input
                  placeholder="AAAAAA"
                  {...register("patente", {
                    required: "La patente es obligatoria",
                  })}
                />
                <FormErrorMessage>
                  {errors.patente && errors.patente.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.marca}>
                <FormLabel>Marca</FormLabel>
                <Input
                  placeholder="Mazda"
                  {...register("marca", {
                    required: "La marca es obligatoria",
                  })}
                />
                <FormErrorMessage>
                  {errors.marca && errors.marca.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.modelo}>
                <FormLabel>Modelo</FormLabel>
                <Input
                  placeholder="Axela"
                  {...register("modelo", {
                    required: "El modelo es obligatorio",
                  })}
                />
                <FormErrorMessage>
                  {errors.modelo && errors.modelo.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.color}>
                <FormLabel>Color</FormLabel>
                <Input
                  placeholder="Azul"
                  {...register("color", {
                    required: "El color es obligatorio",
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
              >
                Agregar
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
