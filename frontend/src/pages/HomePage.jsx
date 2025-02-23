import {
  Container,
  Text,
  textDecoration,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product";
import ProductCard from "../Components/ProductCard";

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight={"bold"}
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          textAlign={"center"}
        >
          Curent Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={"full"}
        >
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>
        <Text fontSize="20" fontWeight={"bold"} color={"gray.500"}>
          No products available{" "}
          <Link to="/create">
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a new product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
}

export default HomePage;
