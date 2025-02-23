import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/Product";
import { useState, useCallback } from "react";

const UpdateProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onUpdate(updatedProduct);
  }, [updatedProduct, onUpdate]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={handleChange}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProductCard = ({ product }) => {
  const { _id, name, price, image } = product;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = useCallback(async () => {
    setIsDeleting(true);
    const { success, message } = await deleteProduct(_id);
    setIsDeleting(false);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  }, [_id, deleteProduct, toast]);

  const handleUpdateProduct = useCallback(
    async (updatedProduct) => {
      setIsUpdating(true);
      const { success, message } = await updateProduct(_id, updatedProduct);
      setIsUpdating(false);
      onClose();
      toast({
        title: success ? "Success" : "Error",
        description: success ? "Product updated successfully" : message,
        status: success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    },
    [_id, updateProduct, onClose, toast]
  );

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={image}
        alt={name}
        h={48}
        w="full"
        objectFit="cover"
        loading="lazy"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
            aria-label="Edit Product"
            isLoading={isUpdating}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={handleDeleteProduct}
            colorScheme="red"
            aria-label="Delete Product"
            isLoading={isDeleting}
          />
        </HStack>
      </Box>

      <UpdateProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={product}
        onUpdate={handleUpdateProduct}
      />
    </Box>
  );
};

export default ProductCard;
