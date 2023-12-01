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
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userRol", response.data.userRol);
        response.data.userRol === "admin"
          ? navigate("/dashboard")
          :
          navigate("/vehiculos");
        toast({
          title: "Sesión iniciada.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        console.error("Error en la autenticación:", response.data);
        toast({
          title: "Error en la autenticación.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:");
      toast({
        title: "Error al iniciar sesión.",
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
        <ModalHeader>Iniciar Sesión</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <FormControl isInvalid={!!errors.email}>
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
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.pass}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="********"
                  {...register("contraseña", {
                    required: "La contraseña es obligatoria",
                  })}
                />
                <FormErrorMessage>
                  {errors.pass && errors.pass.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                w={"16rem"}
                py={6}
                mt={4}
                colorScheme="telegram"
                type="submit"
                isLoading={isLoading}
                onClick={useEffect(() => {
                  isLoading ? null : onClose();
                }, [isLoading, onClose])}
              >
                Iniciar Sesión
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
                Registrate
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
