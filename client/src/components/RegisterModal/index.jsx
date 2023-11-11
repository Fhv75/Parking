import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RegisterModal({ isOpen, onClose }) {
  RegisterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/user", data);

      const responseData = await response.data;

      if (response.status === 201) {
        localStorage.setItem("token", responseData.token);
        navigate("/vehiculos");
        toast({
          title: "Registro exitoso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("Error en el registro:", responseData.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      console.log(error.response.data.target[0]);
      toast({
        title: "Error en el registro.",
        description:
          error.response.data.target.length != 0
            ? "Ya existe una cuenta registrada con este " +
              error.response.data.target[0]
            : null,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrarse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <FormControl isInvalid={!!errors.correo_electronico}>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input
                  placeholder="example@mail.com"
                  {...register("correo_electronico", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email inválido",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.correo_electronico &&
                    errors.correo_electronico.message}
                </FormErrorMessage>
              </FormControl>

              <HStack gap={6}>
                <FormControl isInvalid={!!errors.nombre}>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input
                    placeholder="Floripondio Pancracio"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.rut}>
                  <FormLabel>Rut</FormLabel>
                  <Input
                    placeholder="12345678-9"
                    {...register("rut", {
                      required: "El rut es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.rut && errors.rut.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack gap={6}>
                <FormControl isInvalid={!!errors.telefono}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    placeholder="+56912345678"
                    {...register("telefono", {
                      required: "El teléfono es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.telefono && errors.telefono.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.contraseña}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    placeholder="********"
                    {...register("contraseña", {
                      required: "La contraseña es obligatoria",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.contraseña && errors.contraseña.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <Button
                w={"16rem"}
                py={6}
                mt={4}
                colorScheme="telegram"
                type="submit"
                isLoading={isLoading}
              >
                Registrarse
              </Button>

              <Text fontWeight={"100"} color="gray" fontSize={"xl"}>
                o
              </Text>
              <Button
                w={"16rem"}
                py={6}
                mb={4}
                type="button"
                isLoading={isLoading}
              >
                Iniciar Sesión
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
