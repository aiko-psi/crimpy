import React from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components";

export function Page({ children }: { children: React.ReactNode[] }) {
  return <PageContainer>{children}</PageContainer>;
}

const PageContainer = styled(ScrollView)`
  background-color: ${(props) => props.theme.background};
  padding: 20px;
`;

export const T = styled(Text)`
  color: ${(props) => props.theme.secondary};
`;
