import React, { useEffect } from "react";
import { Page, Txt } from "../../components/Page";
import { fetchPocket } from "../../connect/fetchPocket";

export function AnalysisPage() {
  const [data, setData] = React.useState<any[]>([]);

  useEffect(() => {
    fetchPocket()
      .then((result) => {
        setData(result?.items || []);
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
        <Txt key={item.id}>{item.description}</Txt>
      ))}
    </Page>
  );
}
