import { Button, Heading } from "@chakra-ui/react";
import VehicleCard from "./components/VehicleCard";

function App() {
	return (
		<>
			<Heading size='2xl' my='10'>PARKING</Heading>
            <Heading size='lg'>Mis Vehículos</Heading>
            <VehicleCard />
            <Button>Agregar Vehículo</Button>
		</>
	);
}

export default App;
