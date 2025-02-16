import React from "react";
import { useState } from "react";
import { Container, VStack, Heading, Box, Input, Button, useToast , useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "../store/Product";

export default function CreateProduct() {
  const Toast = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    if (!success) {
      Toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      Toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

  };

  return (
    <div>
      <Container maxW="container.sm">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8}>
            Create a new product
          </Heading>
          <Box
            w="full"
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            color="white"
            rounded="lg"
            shadow="md"
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <Button
                colorScheme="cyan"
                onClick={handleAddProduct}
                w="full"
              >
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </div>
  );
}