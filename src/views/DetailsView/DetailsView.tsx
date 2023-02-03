import { Box, Button, Center, Image, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/TMDB";

const DetailsView = ({ navigation, route }) => {
  const { media } = route.params;


  return (
    <Box>
      <Center>
        <Box>
          <Text m="4" fontSize="xl" bold textAlign="center">
            {media?.original_name || media?.original_title}
          </Text>
          <Box justifyContent="center" alignItems="center">
            <Image             
              w="100%"
              source={{
                uri: `https://www.themoviedb.org/t/p/original${media.poster_path}`,
              }}
              alt="Alternate Text"
              size="3/4"
            />
            <Text>{media?.overview}</Text>
          </Box>
          <Text textAlign="center">
            Popularity: {media?.popularity} | Release Date:{" "}
            {media?.release_date}
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

DetailsView.navigationOptions = ({ navigation }) => {
  const name = navigation.getParam("name");

  return {
    title: name,
  };
};

export default DetailsView;
