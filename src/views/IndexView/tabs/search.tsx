import {
  Box,
  Button,
  Center,
  CheckIcon,
  HStack,
  Input,
  ScrollView,
  SearchIcon,
  Select,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../api/TMDB";
import { Card } from "../../../components/Card/Card";

type Option = {
  id: string;
  label: string;
};

const options: Option[] = [
  {
    id: "multi",
    label: "Multi",
  },
  {
    id: "movie",
    label: "Movie",
  },
];

const SearchTabView = ({ navigation }) => {
  const [selected, setSelected] = useState<Option>(options[1]);
  const [search, setSearch] = useState<any[]>([]);
  const [text, setText] = useState("");

  const handleSearch = () => {
    axiosClient.get(`/search/${selected.id}?query=${text}`).then((res) => {
      setSearch(res.data.results.splice(1, 10));
    });
  };

  const handleSelectChange = (id: string) => {
    setSelected(options.find((o) => o.id === id));
  };

  return (
    <ScrollView>
      <Center>
        <Box width="70%">
          <Text>Search Movie/TV Show</Text>
          <Input
            isRequired
            leftElement={<SearchIcon />}
            placeholder="i.e: James Bond"
            onChange={(e) => setText(e.nativeEvent.text)}
          />
        </Box>
        <Box>
          <Text>Choose Search Type</Text>
          <HStack>
            <Select
              selectedValue={selected?.id}
              minWidth="200"
              marginY="6"
              accessibilityLabel="Choose Filter"
              placeholder="Choose Filter"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={handleSelectChange}
            >
              {options.map((o, i) => (
                <Select.Item key={i} label={o.label} value={o.id} />
              ))}
            </Select>
            <Button
              marginY="6"
              leftIcon={<SearchIcon />}
              onPress={handleSearch}
            >
              Search
            </Button>
          </HStack>
        </Box>
        <Box>
          {search &&
            search?.map((m, i) => (
              <Card
                key={i}
                id={m.id}
                image={`https://www.themoviedb.org/t/p/w185${m.poster_path}`}
                title={m.original_name || m.original_title}
                popularity={m.popularity}
                releaseDate={m.release_date}
                handleClick={() =>
                  navigation.navigate("Details", {
                    media: m,

                    name: m.original_name || m.original_title
                  })
                }
              />
            ))}
        </Box>
      </Center>
    </ScrollView>
  );
};

export { SearchTabView };
