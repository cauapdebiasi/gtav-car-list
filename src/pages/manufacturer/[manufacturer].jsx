import VehicleButton from "@/components/VehicleButton";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { playHover, playClick } from "@/components/SoundEffect";
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsDashLg,
} from "react-icons/bs";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://gta.now.sh/api/vehicles/manufacturers/names"
  );
  const manufacturers = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = manufacturers.map((manufacturer) => ({
    params: { manufacturer },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://gta.now.sh/api/vehicles/manufacturer/${params.manufacturer}/vehicles`
  );
  const vehicleList = await res.json();

  // Pass post data to the page via props
  return { props: { vehicleList, manufacturer: params.manufacturer } };
}

export default function Manufacturer({ vehicleList, manufacturer }) {
  const [sortByPrice, setSortByPrice] = useState("");

  const filterAndSortList = () => {
    let filtered = Object.entries(vehicleList);

    if (sortByPrice === "asc") {
      filtered.sort((a, b) => a[1].price - b[1].price);
    } else if (sortByPrice === "desc") {
      filtered.sort((a, b) => b[1].price - a[1].price);
    }

    return filtered;
  };

  const filteredVehicles = filterAndSortList();

  // Function to handle sorting by price
  const handleSortByPrice = () => {
    if (sortByPrice === "asc") {
      setSortByPrice("desc");
    } else {
      setSortByPrice("asc");
    }
  };

  return (
    <Layout>
      <h2 className="uppercase my-2 text-[24px]">{manufacturer}</h2>
      <div className="mb-3 w-[90%] sm:w-full mx-auto flex justify-end flex-col sm:flex-row">
        <button
          onClick={handleSortByPrice}
          onMouseOver={playHover}
          onMouseDown={playClick}
          className="red-button-hoverable relative z-10 p-2 flex items-center justify-center"
        >
          <span className="mr-2">Sort by Price</span>
          {!sortByPrice && <BsDashLg />}
          {sortByPrice === "desc" && <BsChevronCompactUp />}
          {sortByPrice === "asc" && <BsChevronCompactDown />}
        </button>
      </div>
      <ul className="flex flex-wrap justify-center gap-[25px]">
        {filteredVehicles.map(([vehicleName, vehicle]) => {
          if (!vehicle["images"]["frontQuarter"] || !vehicle["price"])
            return null;
          return (
            <VehicleButton
              key={vehicleName}
              vehicleCover={vehicle["images"]["frontQuarter"]}
              vehicleName={vehicleName}
              seats={vehicle["seats"]}
              vehicleDLC=""
              vehiclePrice={vehicle["price"]}
            />
          );
        })}
      </ul>
    </Layout>
  );
}
