import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { Pressable, View } from "react-native";
import { HeaderTitleProps } from "@react-navigation/elements";
import SessionIndicator from "./SessionIndicator";
import { styled } from "nativewind";
import { Txt } from "../components/Page";
import { fetchBackend } from "../connect/fetch";
import { Gym } from "../model/gym";

export default function TitleComponent(props: HeaderTitleProps) {
  const [availableGyms, setAvailableGyms] = useState<Gym[] | null>(null);
  const { gym, setGym, session } = useContext(AppContext) || {};

  useEffect(() => {
    if (availableGyms == null) {
      fetchBackend<Gym[]>("/gym").then((gyms) => {
        console.log(gyms);
        setAvailableGyms(gyms);
      });
    }
  }, [availableGyms]);

  const pickGym = () => {
    if (availableGyms && availableGyms?.length > 0 && setGym) {
      setGym(availableGyms[0]);
    }
  };

  return (
    <TitleComponentContainer>
      <Pressable onPress={pickGym}>
        {gym ? (
          <Txt className="font-bold">{gym.name}</Txt>
        ) : (
          <Txt>Pick Gym</Txt>
        )}
        <SessionIndicator session={session || null} />
      </Pressable>
    </TitleComponentContainer>
  );
}

const TitleComponentContainer = styled(
  View,
  "flex flex-row justify-between w-full pr-3"
);
