import React, { useEffect } from "react";
import { Page, Txt } from "../../components/Page";
import { getAllGyms } from "../../connect/fetchPocket";
import { GymRecord } from "../../connect/schemas/zod-pocketbase";

export function AnalysisPage() {
  const [data, setData] = React.useState<GymRecord[]>([]);

  useEffect(() => {
    getAllGyms()
      .then((result) => {
        setData(result || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Page>
      <Txt>Analysis</Txt>
      <Txt>This is the analysis page</Txt>
      {data.map((item) => (
        <Txt key={item.id}>{item.name}</Txt>
      ))}
    </Page>
  );
}
