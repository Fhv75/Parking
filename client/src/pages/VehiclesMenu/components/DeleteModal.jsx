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
    VStack,
  } from "@chakra-ui/react";
  import axios from "axios";
  import PropTypes from "prop-types";
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  
  export default function LoginModal({ isOpen, onClose }) {
    LoginModal.propTypes = {
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
      try {
        setIsLoading(true);
        const response = await axios.delete(
          "http://localhost:5000/vehicle/" + data.id,
        );
        if (response.status === 201) {
          console.log("success");
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
                <FormControl isInvalid={!!errors.id}>
                  <FormLabel>id</FormLabel>
                  <Input
                    placeholder="1"
                    {...register("id", {
                      required: "El id es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.id && errors.id.message}
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
                  Eliminar
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  