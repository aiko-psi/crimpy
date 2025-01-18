import React from "react";
import { Session } from "../model/session";
import { Pressable, View } from "react-native";
import { colors } from "../style/theme";
import { styled } from "nativewind";

type Props = {
  session: Session | null;
};

export default function SessionIndicator(props: Props) {
  const active = props.session !== null && props.session.active;
  return (
    <Container>
      <Indicator />
    </Container>
  );
}

const Container = styled(View, "p-1");

const Indicator = styled(Pressable, "w-4 h-4 rounded-full bg-main");
