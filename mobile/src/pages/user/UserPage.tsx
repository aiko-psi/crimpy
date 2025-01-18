import React, { useContext } from "react";
import { Page, Txt } from "../../components/Page";
import { AppContext } from "../../components/AppContext";

export function UserPage() {
  const user = useContext(AppContext)?.user;

  return (
    <Page>
      <Txt>User</Txt>
      <Txt>This is the user page</Txt>
    </Page>
  );
}
