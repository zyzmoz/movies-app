import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsView from "../views/DetailsView/DetailsView";
import IndexView from "../views/IndexView";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={IndexView}
        options={{
          title: "Movies App",
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsView}
        // options={({ route }) => ({
        //   ...route
        // })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppStack;
