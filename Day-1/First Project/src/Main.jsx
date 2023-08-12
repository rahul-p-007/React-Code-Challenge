import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  Text,
  Image,
  Container,
  Button,
} from "@chakra-ui/react";

export default function Main() {
  const [advice, setAdvice] = useState("");
  const [image, setImage] = useState(null);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
  }

  async function fetchNewImage() {
    const API_KEY = "z0D_C6sYYMuJPZYERjG2v-IeC0gpGxkCn6Hmn_te3f8";
    const BASE_URL = "https://api.unsplash.com";

    try {
      const response = await axios.get(
        `${BASE_URL}/photos/random/?client_id=${API_KEY}`
      );
      setImage(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  useEffect(() => {
    getAdvice();
    fetchNewImage();
  }, []);

  return (
    <Container padding={"12"}>
      <Card
        maxW="md"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"
      >
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name="Author"
                src="https://img.freepik.com/premium-vector/cute-boy-face-cartoon_18591-41509.jpg?w=2000"
              />
              <Box>
                <Heading size="sm">Sam</Heading>
                <Text>Author</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text fontSize={"16px"} fontFamily={"cursive"}>
            {advice}
          </Text>
        </CardBody>
        {image && (
          <div className="image-container">
            <Image
              objectFit="cover"
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
        )}
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              getAdvice();
              fetchNewImage();
            }}
          >
            Click for New Advice
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
