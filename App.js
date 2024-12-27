import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";
import RegistrationScreen from "./screens/RegistrationScreen"; 
import LoginScreen from "./screens/LoginScreen";
import CreateEvent from "./screens/CreateEvent";
import EventDetails from "./screens/EventDetails"; 
import EventList from "./screens/EventList";
import EditEventScreen from "./screens/EditEventScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login Screen", headerShown: false }}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ title: "Registration Screen", headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: "Main Screen", headerShown: false }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{ title: "Create Event", headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ title: "Event Details", headerShown: false }}
        />
        <Stack.Screen
          name="EventList"
          component={EventList}
          options={{ title: "Event List", headerShown: false }}
        />

        <Stack.Screen
          name="EditEventScreen"
          component={EditEventScreen}
          options={{ title: "Edit Event Screen", headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
