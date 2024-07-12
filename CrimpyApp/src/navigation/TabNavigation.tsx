import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { UserPage } from "../pages/user/UserPage";
import { SessionPage } from "../pages/session/SessionPage";
import { GymPage } from "../pages/gym/GymPage";
import { AnalysisPage } from "../pages/analytics/AnalysisPage";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TitleComponent from "./TitleComponent";
import { colors } from "../style/theme";

const Tab = createBottomTabNavigator();

export default function TabNavigation(props: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleComponent {...props} />,
        headerStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.mainLight,
        tabBarInactiveTintColor: colors.secondary,
      }}
    >
      <Tab.Screen
        name="User"
        component={UserPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Session"
        component={SessionPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="play-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gym"
        component={GymPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
