import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";
import buttons from "./buttons";

export default function ResponsiveDrawer({ isOpen, onClose }) {
  ResponsiveDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Drawer isOpen={isOpen} placement="right" size="xs" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegación</DrawerHeader>
          <DrawerBody pt={6}>
            <VStack spacing={8} align="start">
              {buttons.map((button) => (
                <Button variant="link" size="lg" key={button.name}>
                  {button.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
