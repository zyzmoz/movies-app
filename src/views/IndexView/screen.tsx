import { useState } from "react";
import { Box } from "native-base";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MoviesTabView } from "./tabs/movies";
import { TvShowsTabView } from "./tabs/tvshows";
import { SearchTabView } from "./tabs/search";

const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      renderLabel={({ focused, route }) => {
        return <Box color={focused ? "BLACK" : "GRAY3"}>{route.title}</Box>;
      }}
      indicatorStyle={{
        backgroundColor: "teal",
      }}
      style={{
        backgroundColor: "white",
      }}
    />
  );
};

export default function TabViewExample({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "movies", title: "Movies" },
    { key: "second", title: "Second" },
    { key: "tvShows", title: "TV Shows" },
  ]);

  const renderScene = SceneMap({
    movies: () => <MoviesTabView navigation={navigation} />,
    second: () => <SearchTabView navigation={navigation} />,
    tvShows: () => <TvShowsTabView navigation={navigation} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
