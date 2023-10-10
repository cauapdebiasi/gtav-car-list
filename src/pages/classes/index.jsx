import Layout from "@/components/Layout";
import React from "react";
import ItemButton from "@/components/ItemButton";

export async function getServerSideProps() {
  try {
    const data = await fetch("https://gta.vercel.app/api/vehicles/classes");
    const jsonData = await data.json();
    return { props: { classes: [jsonData, null] } };
  } catch (error) {
    return { props: { classes: [null, error.message] } };
  }
}

export default function Classes({ classes }) {
  const [classList, error] = classes;
  return (
    <Layout>
      <h2 className="uppercase my-2 text-[24px]">Classes</h2>
      <ul className="flex flex-wrap gap-[25px] justify-center">
        {error ? (
          <p>An error ocurred when trying to fetch.</p>
        ) : (
          Object.entries(classList).map(([className, classImage]) => (
            <ItemButton
              key={className}
              uniqueName={className}
              imgSrc={classImage}
              linkTo={`/classes/${className}`}
            />
          ))
        )}
      </ul>
    </Layout>
  );
}
