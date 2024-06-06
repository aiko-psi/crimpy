import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { User } from "./src/pages/User";
import { Session } from "./src/pages/Session";
import { Gym } from "./src/pages/Gym";
import { Analysis } from "./src/pages/Analysis";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Session"
          component={Session}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="play-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Gym"
          component={Gym}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Analysis"
          component={Analysis}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
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
