import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = (product) => {
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      ></Image>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize= 'xl' color={textColor} mb={4}>
            ${product.price}
        </Text>

      <HStack spacing={2}>
        <IconButton icon={<FaEdit />} colorScheme='blue' />
        <IconButton icon={<FaTrash />} colorScheme='blue' />
      </HStack>

      </Box>
    </Box>
  );
};

export default ProductCard;
