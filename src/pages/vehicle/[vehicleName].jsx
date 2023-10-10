import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import formatPrice from "@/components/PriceFormatter";
import { playClick, playHover } from "@/components/SoundEffect";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://gta.now.sh/api/vehicles/names");
  let vehicleNames = await res.json();
  delete vehicleNames["brioso r/a"]
  
  // Get the paths we want to pre-render based on posts
  const paths = vehicleNames.map((vehicleName) => {
    return {
      params: { vehicleName },
    }
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  try {
    const res = await fetch(
      `https://gta.vercel.app/api/vehicles/${params.vehicleName}`
    );
    const vehicleDetails = await res.json();
    const manufacturerRes = await fetch(
      `https://gta.vercel.app/api/vehicles/manufacturer/${vehicleDetails["manufacturer"]}`
    );
    const manufacturerImage = await manufacturerRes.text();
    return {
      props: {
        vehicleResponse: [{
        vehicleName: params.vehicleName,
        vehicleDetails,
        manufacturerImage,
      },null]},
    };
  } catch (error) {
    return {
      props: {
        vehicleResponse:[null,error] 
      },
    };
  }
  
  // Pass post data to the page via props
  
}

export default function VehicleName({
  vehicleResponse
}) {

  const [{vehicleName,vehicleDetails,manufacturerImage},error] = vehicleResponse

  

  return (
    error ? (
      <p>An error ocurred when trying to fetch.</p>
    ) : (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[20px]">
          <Image
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] object-contain"
            src={manufacturerImage}
            alt={vehicleDetails["manufacturer"]}
            width={50}
            height={70}
          />
          <h1 className="text-2xl sm:text-3xl">{vehicleName}</h1>
        </div>

        <strong className="text-2xl sm:text-3xl font-normal">
          {formatPrice(vehicleDetails["price"])}
        </strong>
      </div>
      <section className="grid xmd:grid-cols-[30%_70%] mt-[20px] gap-[10px] overflow-hidden">
        <aside>
          <p>
            Car description should have gone here, however i am a dumbass that
            does not know how to make it happen :)
          </p>

          <h2 className="mt-[20px] text-xl">
            SELECT FROM AVAILABLE COLORS TO ORDER
          </h2>
          <div className="mt-[20px] grid grid-cols-4 place-items-center gap-[20px] flex-wrap">
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#cd0001] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#ff009b] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#ffff00] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#ffac09] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#67cb33] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#0065cc] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#1a171a] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
            <button
              onClick={playClick}
              onMouseEnter={playHover}
              className="rounded-full bg-[#ffffff] w-[50px] h-[50px] focus:outline-3 outline-none focus:outline-[#9c8e90]"
            ></button>
          </div>

          <p className="text-xl mt-[20px]">Vehicle Stats</p>

          <ul className="flex flex-col gap-[5px] mt-[10px]">
            <li className="grid grid-cols-2 items-center">
              <p>Top Speed</p>
              <meter
                className="w-full"
                min="0"
                max="100"
                value={vehicleDetails["speed"]}
              />
            </li>
            <li className="grid grid-cols-2 items-center">
              <p>Acceleration</p>
              <meter
                className="w-full"
                min="0"
                max="100"
                value={vehicleDetails["acceleration"]}
              />
            </li>
            <li className="grid grid-cols-2 items-center">
              <p>Braking</p>
              <meter
                className="w-full"
                min="0"
                max="100"
                value={vehicleDetails["braking"]}
              />
            </li>
            <li className="grid grid-cols-2 items-center">
              <p>Traction</p>
              <meter
                className="w-full"
                min="0"
                max="100"
                value={vehicleDetails["handling"]}
              />
            </li>
          </ul>
          <a
            onClick={playClick}
            onMouseEnter={playHover}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="block text-center text-[18px] red-button-hoverable p-2 w-full mt-[20px]"
          >
            ORDER
          </a>
        </aside>
        <div className="grid grid-cols-[50%_50%] bg-black gap-[5px] overflow-hidden">
          <Image
            className="col-span-full w-full object-contain"
            src={vehicleDetails["images"]["frontQuarter"].replace(
              "/210",
              "/400"
            )}
            width={400}
            height={300}
            alt="Car front quarter"
          />
          <Image
            className="w-full object-contain"
            src={vehicleDetails["images"]["rearQuarter"]}
            width={400}
            height={300}
            alt="Car rear quarter"
          />
          <Image
            className="w-full object-contain"
            src={vehicleDetails["images"]["side"]}
            width={400}
            height={300}
            alt="Car side"
          />
        </div>
      </section>
    </Layout>)
  )
}
