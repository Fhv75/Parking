import { Button, Card, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/fontawesome-free-solid";

export default function CarCard({ marca, modelo, patente, color }) {
    marca = marca[0].toUpperCase() + marca.slice(1);
    modelo = modelo[0].toUpperCase() + modelo.slice(1);
    patente = patente.toUpperCase();
    color = color[0].toUpperCase() + color.slice(1);
    return (
        <Card d="flex" py={6}>
            <VStack gap={4} align={"start"} ps={10}>
                <Heading color={"blue.400"}>
                    {marca + " " + modelo}
                </Heading>
                <HStack color="gray">
                    <FontAwesomeIcon icon={faIdCard} size="lg" />
                    <Heading size="md">
                        {patente}
                    </Heading>
                </HStack>
                <Text>
                    {color}
                </Text>
                <Button w={100} colorScheme="linkedin" color="white">Ingresar</Button>
            </VStack>
        </Card>
    )
}