import Navbar from "./Components/Navbar"
import { Box, useColorModeValue } from "@chakra-ui/react"
import CreateProduct from "./pages/CreateProduct"

function App() {

  return (
    <>
     <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<CreateProduct />
		</Box>
    </>
  )
}

export default App
