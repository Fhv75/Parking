import { Button, Card, CardBody, Text } from "@chakra-ui/react";

export default function VehicleCard() {
	return (
		<Card>
			<CardBody>
				<Text>Mazda Demio</Text>
				<Text>Placa: ABC-123</Text>
				<Text>Color: Rojo</Text>
				<Text>Marca: Mazda</Text>
				<Text>Modelo: Demio</Text>
				<Text>Propietario: Juan Perez</Text>
				<Text>Fecha de Registro: 01/01/2021</Text>
                <Button>Editar</Button>
                <Button>Eliminar</Button>
			</CardBody>
		</Card>
	);
}
