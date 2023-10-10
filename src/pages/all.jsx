import Layout from "@/components/Layout";
import { playClick, playHover } from "@/components/SoundEffect";
import VehicleButton from "@/components/VehicleButton";
import React, { useState } from "react";
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsDashLg,
} from "react-icons/bs";

export async function getServerSideProps() {
  try {
    const data = await fetch("https://gta.now.sh/api/vehicles/all");
    const jsonData = await data.json();
    // Joining the vehicles classes into a single object
    const vehiclesRemovedClass = Object.values(jsonData).reduce(
      (prev, curr) => {
        return { ...curr, ...prev };
      }
    );
    return { props: { allVehicles: [vehiclesRemovedClass, null] } };
  } catch (error) {
    return { props: { allVehicles: [null, error.message] } };
  }
}

export default function AllVehicles({ allVehicles }) {
  const [vehicleObjects, error] = allVehicles;

  // State for search input and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");

  const filterAndSortList = () => {
    let filtered = Object.entries(vehicleObjects);

    if (searchTerm) {
      filtered = filtered.filter(([vehicleName, vehicle]) => {
        return vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (sortByPrice === "asc") {
      filtered.sort((a, b) => a[1].price - b[1].price);
    } else if (sortByPrice === "desc") {
      filtered.sort((a, b) => b[1].price - a[1].price);
    }

    return filtered;
  };

  const vehicleList = filterAndSortList();

  // Function to handle search input change with debounce
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

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
      <h2 className="uppercase my-2 text-[24px]">All Vehicles</h2>
      <div className="mb-3 w-[90%] sm:w-full mx-auto flex justify-between flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Search by vehicle name"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="p-2 border-2 text-white bg-[#561a1d] border-[#901412] rounded"
        />
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
      <ul className="flex flex-wrap gap-[25px] justify-center">
        {error ? (
          <p>An error occurred when trying to fetch.</p>
        ) : (
          vehicleList.map(([vehicleName, vehicle]) => {
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
          })
        )}
      </ul>
    </Layout>
  );
}
