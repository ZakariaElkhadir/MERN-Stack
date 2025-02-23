import Navbar from "./Components/Navbar"
import { Box, useColorModeValue } from "@chakra-ui/react"
import CreateProduct from "./pages/CreateProduct"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <>
     <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
      <Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreateProduct />} />
			</Routes>
		</Box>
    </>
  )
}

export default App
