import { Box, Button, Center, Divider, HStack, Image, Text } from "native-base";
import { FC } from "react";

interface ICardProps {
  id: String;
  image: string;
  title: String;
  popularity: String;
  releaseDate: String;
  handleClick: () => void;
}

export const Card: FC<ICardProps> = ({
  id,
  image,
  title,
  popularity,
  releaseDate,
  handleClick,
}) => {
  return (
    <Box borderRadius="md" p="2">
      <HStack>
        <Box w="25%">
          <Center>
            <Image
              source={{
                uri: image,
              }}
              alt="Alternate Text"
              size="lg"
            />
          </Center>
        </Box>
        <Box w="75%">
          <Text bold>{title}</Text>
          <Text>Popularity: {popularity}</Text>
          <Text>Release Date: {releaseDate}</Text>

          <Button onPress={handleClick}>
            <Text>Movie Details</Text>
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
