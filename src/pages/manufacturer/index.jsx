import Layout from "@/components/Layout";
import ItemButton from "@/components/ItemButton";
import React from "react";

export async function getServerSideProps() {
  try {
    const data = await fetch("https://gta.now.sh/api/vehicles/manufacturers");
    const jsonData = await data.json();
    return { props: { manufacturers: [jsonData, null] } };
  } catch (error) {
    return { props: { manufacturers: [null, error.message] } };
  }
}

export default function Manufacturers({ manufacturers }) {
  const [manufacturerList, error] = manufacturers;
  return (
    <Layout>
      <h2 className="uppercase my-2 text-[24px]">Manufacturers</h2>
      <ul className="flex flex-wrap gap-[25px] justify-center">
        {error ? (
          <p>An error ocurred when trying to fetch.</p>
        ) : (
          Object.entries(manufacturerList).map(
            ([manufacturerName, manufacturerImage]) => (
              <ItemButton
                key={manufacturerName}
                uniqueName={manufacturerName}
                imgSrc={manufacturerImage}
                linkTo={`/manufacturer/${manufacturerName}`}
              />
            )
          )
        )}
      </ul>
    </Layout>
  );
}
