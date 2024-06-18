import React, { useContext } from "react";
import { AppContext } from "../components/AppContext";
import { View } from "react-native";
import { HeaderTitleProps } from "@react-navigation/elements";
import SessionIndicator from "./SessionIndicator";
import { styled } from "nativewind";
import { Txt } from "../components/Page";

export default function TitleComponent(props: HeaderTitleProps) {
  const appContext = useContext(AppContext);

  return (
    <TitleComponentContainer>
      {appContext?.gym ? <Txt className="font-bold">{appContext.gym.name}</Txt> : <Txt>Pick Gym</Txt>}
      <SessionIndicator session={appContext?.session || null} />
    </TitleComponentContainer>
  );
}

const TitleComponentContainer = styled(
  View,
  "flex flex-row justify-between w-full pr-3"
);
