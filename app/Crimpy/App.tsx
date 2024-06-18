import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigation/TabNavigation";
import { useState } from "react";
import { Gym } from "./src/model/gym";
import { User } from "./src/model/user";
import { AppContext } from "./src/components/AppContext";
import { Session } from "./src/model/session";
import { styled } from "nativewind";

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentGym, setCurrentGym] = useState<Gym | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          gym: currentGym,
          setGym: setCurrentGym,
          user: currentUser,
          setUser: setCurrentUser,
          session: currentSession,
          setSession: setCurrentSession,
        }}
      >
        <Wrapper>
          <TabNavigation />
        </Wrapper>
      </AppContext.Provider>
    </NavigationContainer>
  );
}

const Wrapper = styled(View, "flex flex-1  bg-background");
