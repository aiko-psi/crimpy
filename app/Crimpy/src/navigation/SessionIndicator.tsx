import React from "react";
import { Session } from "../model/session";
import { Pressable, View } from "react-native";
import styled from "styled-components";
import { theme } from "../style/theme";

type Props = {
  session: Session | null;
};

export default function SessionIndicator(props: Props) {
  const active = props.session !== null && props.session.active;
  return (
    <Container>
      <Indicator $active={active} />
    </Container>
  );
}

const Container = styled(View)`
  padding: 3px;
`;

const Indicator = styled(Pressable)<{ $active?: boolean }>`
  background-color: ${(props) => (props.$active ? theme.main : theme.mainLight)};
  width: 14px;
  height: 14px;
  border-radius: 7px;
`;
