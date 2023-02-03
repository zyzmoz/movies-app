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
    id: "top_rated",
    label: "Top Rated",
  },
  {
    id: "popular",
    label: "Popular",
  },
  {
    id: "on_the_air",
    label: "On the Air",
  },
  {
    id: "airing_today",
    label: "Airing Today",
  },
];

const TvShowsTabView = ({ navigation }) => {
  const [selected, setSelected] = useState<Option>(options[1]);
  const [shows, setShows] = useState<any[]>([]);

  useEffect(() => {
    axiosClient.get("/tv/popular").then((res) => {
      setShows(res.data.results.splice(1, 10));
    });
  }, []);

  const onChangeOption = (option: string) => {
    axiosClient.get(`/tv/${option}`).then((res) => {
      setShows(res.data.results.splice(1, 10));
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
          {shows &&
            shows?.map((m, i) => (
              <Card
                key={i}
                id={m.id}
                image={`https://www.themoviedb.org/t/p/w185${m.poster_path}`}
                title={m.original_name}
                popularity={m.popularity}
                releaseDate={m.release_date}
                handleClick={() =>
                  navigation.navigate("Details", {
                    media: m,

                    name: m.original_name,
                  })
                }
              />
            ))}
        </Box>
      </Center>
    </ScrollView>
  );
};

export { TvShowsTabView };
