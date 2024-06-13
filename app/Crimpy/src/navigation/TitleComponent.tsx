import React, { useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Text, View } from "react-native";
import { HeaderTitleProps } from "@react-navigation/elements";
import styled from "styled-components";
import { T } from "../components/Page";
import SessionIndicator from "./SessionIndicator";

export default function TitleComponent(props: HeaderTitleProps) {
  const appContext = useContext(AppContext);

  return (
    <TitleComponentContainer>
      {appContext?.gym ? (
        <Title>{appContext.gym.name}</Title>
      ) : (
        <Title>Pick Gym</Title>
      )}
      <SessionIndicator session={appContext?.session || null} />
    </TitleComponentContainer>
  );
}

const TitleComponentContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.textLight};
`;
