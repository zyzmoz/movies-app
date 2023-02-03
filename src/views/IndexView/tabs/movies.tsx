import { Box, Center, CheckIcon, ScrollView, Select } from "native-base";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../api/TMDB";
import { Card } from "../../../components/Card/Card";

type Option = {
  id: string;
  label: string;
};

const options: Option[] = [
  {
    id: "now_playing",
    label: "Now Playing",
  },
  {
    id: "popular",
    label: "Popular",
  },
  {
    id: "top_rated",
    label: "Top Rated",
  },
  {
    id: "upcoming",
    label: "Upcoming",
  },
];

const MoviesTabView = ({ navigation }) => {
  const [selected, setSelected] = useState<Option>(options[1]);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    axiosClient.get("/movie/popular").then((res) => {
      setMovies(res.data.results.splice(1, 10));
    });
  }, []);

  const onChangeOption = (option: string) => {
    axiosClient.get(`/movie/${option}`).then((res) => {
      setMovies(res.data.results.splice(1, 10));
    });
  };

  const handleSelectChange = (id: string) => {
    setSelected(options.find((o) => o.id === id));
    onChangeOption(id);
  };

  return (
    <ScrollView>
      <Center>
        <Box maxW="300">
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
        </Box>
        <Box>
          {movies &&
            movies?.map((m, i) => (
              <Card
                key={i}
                id={m.id}
                image={`https://www.themoviedb.org/t/p/w185${m.poster_path}`}
                title={m.title}
                popularity={m.popularity}
                releaseDate={m.release_date}
                handleClick={() =>
                  navigation.navigate("Details", {
                    media: m,
                    name: m.title,
                  })
                }
              />
            ))}
        </Box>
      </Center>
    </ScrollView>
  );
};

export { MoviesTabView };
